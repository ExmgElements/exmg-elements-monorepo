import {customElement, html, LitElement, property, query} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {observer} from '@material/mwc-base/base-element';
import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
import {timeOut} from '@polymer/polymer/lib/utils/async.js';
import '@polymer/iron-form';
import '@exmg/exmg-button';
import {style} from './styles/exmg-form-styles';
import {IronFormElement} from '@polymer/iron-form/iron-form';

const ENTER_KEY_CODE = 13;

interface InputDefault {
  value?: string | string[];
  checked?: boolean;
}

const warningIcon = html`
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
  </svg>
`;

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  static styles = [style];

  /**
   * Option to hide submit button
   */
  @property({type: Boolean, attribute: 'hide-submit-button'})
  public hideSubmitButton = false;

  /**
   * Option to hide reset button
   */
  @property({type: Boolean, attribute: 'hide-reset-button'})
  public hideResetButton = false;

  /**
   * default submit button copy
   */
  @property({type: String, attribute: 'submit-button-copy'})
  public submitButtonCopy = 'Submit';

  /**
   * default reset button copy
   */
  @property({type: String, attribute: 'reset-button-copy'})
  public resetButtonCopy = 'Reset';

  /**
   * with this option the disable button will be disabled while there are no changes in the form
   */
  @property({type: Boolean, reflect: true, attribute: 'disable-submit-no-changes'})
  public disableSubmitNoChanges = false;

  /**
   * Indicator of the form has pending changes
   */
  @property({type: Boolean})
  @observer(function(this: ExmgForm, dirty: boolean) {
    this.dispatchEvent(
      new CustomEvent('dirty-change', {
        bubbles: false,
        composed: false,
        detail: {
          dirty,
        },
      }),
    );
  })
  private dirty = false;

  get isDirty(): boolean {
    return this.dirty;
  }

  @property({type: String, attribute: 'error-message'})
  private errorMessage = '';

  @property({type: Boolean, reflect: true})
  private submitting = false;

  @query('#ironForm')
  private ironFormElem?: IronFormElement;

  private _debouncer: any;
  private observer?: MutationObserver;

  private _defaults = new WeakMap();

  public done(): void {
    this.submitting = false;
  }

  addInput(node: any, overwriteValues = false) {
    if (!this._defaults.has(node) || overwriteValues) {
      const defaults: InputDefault = {
        value: node.value === undefined || node.value === null ? '' : node.value,
      };
      if ('_hasIronCheckedElementBehavior' in node || (node.type && node.type === 'checkbox')) {
        defaults.checked = node.checked;
      }
      this._defaults.set(node, defaults);
    }
  }

  public saveDefaults(overwriteValues = false) {
    // After first render save original form data for later dirdty checks
    const nodes = Array.from(this.querySelectorAll<any>('*') || []).filter(n => !!n.name);
    for (let i = 0; i < nodes.length; i++) {
      const node: any = nodes[i];
      this.addInput(node, overwriteValues);
    }
  }

  firstUpdated() {
    this.saveDefaults();
  }

  public error(errorMessage: string): void {
    this.submitting = false;
    this.errorMessage = errorMessage;
  }

  public submit(): void {
    if (this.ironFormElem && this.ironFormElem.validate()) {
      this.submitting = true;
      this.errorMessage = '';
      this.dispatchEvent(
        new CustomEvent('submit', {
          bubbles: false,
          composed: false,
          detail: this.ironFormElem.serializeForm(),
        }),
      );
    }
  }

  public validate(): void {
    this.ironFormElem && this.ironFormElem.validate();
  }

  public reset(): void {
    this.ironFormElem && this.ironFormElem.reset();
    this.submitting = false;
    this.errorMessage = '';
    this.dispatchEvent(
      new CustomEvent('form-reset', {
        bubbles: false,
        composed: false,
      }),
    );
    this.checkDirty();
  }

  public serializeForm(): {[key: string]: any} | undefined {
    return this.ironFormElem && this.ironFormElem.serializeForm();
  }

  private onSubmitBtnClick() {
    this.submit();
  }

  private onResetBtnClick() {
    this.reset();
  }

  private checkDirty() {
    this._debouncer = Debouncer.debounce(this._debouncer, timeOut.after(200), () => {
      let dirty = false;
      // Select all slot nodes and filter out the input based on a existing name property on the node
      const nodes = Array.from(this.querySelectorAll<any>('*') || []).filter(n => !!n.name && !n.disabled);

      for (const node of nodes) {
        const def: InputDefault = this._defaults.get(node);
        if (!def) {
          throw Error('Unable to check dirty due to missing default');
        }
        // Special case for token input which has a array value
        if (node.tagName === 'EXMG-PAPER-TOKEN-INPUT') {
          if (!Array.isArray(node.value) || !Array.isArray(def.value)) {
            throw Error('Expected value of token input not an array');
          }
          if (def.value.sort().join(',') !== [...node.value].sort().join(',')) {
            dirty = true;
          }
        } else {
          if (
            ('checked' in def && def.checked !== node.checked) ||
            def.value !== (node.value === undefined || node.value === null ? '' : node.value)
          ) {
            dirty = true;
          }
        }
      }
      this.dirty = dirty;
    });
  }

  private onKeyUp(e: KeyboardEvent) {
    switch (e.code || e.keyCode) {
      case ENTER_KEY_CODE:
      case 'Enter':
      case 'NumpadEnter':
        e.stopPropagation();
        this.submit();
        break;
      default:
        this.checkDirty();
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Options for the observer (which mutations to observe)
    const config = {attributes: false, childList: true, subtree: false};

    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver((list: MutationRecord[]) => {
      for (const mutation of list) {
        if (mutation.type === 'childList') {
          // Monitor slot for nodes created later
          mutation.addedNodes.forEach((node: any) => {
            if (!!node.name) {
              this.addInput(node);
            }
          });
        }
      }
    });

    // Start observing the target node for configured mutations
    this.observer!.observe(this, config);

    this.addEventListener('keyup', this.onKeyUp);
    this.addEventListener('change', this.handleOnChange);
  }

  disconnectedCallback() {
    this.removeEventListener('keyup', this.onKeyUp);
    this.removeEventListener('change', this.handleOnChange);

    // Clean observer if needed
    if (this.observer) {
      this.observer.disconnect();
    }

    super.disconnectedCallback();
  }

  private handleOnChange() {
    this.checkDirty();
  }

  private renderResetButton() {
    return !this.hideResetButton
      ? html`
          <exmg-button class="reset" @click="${this.onResetBtnClick}">${this.resetButtonCopy}</exmg-button>
        `
      : '';
  }

  private renderSubmitButton() {
    return !this.hideSubmitButton
      ? html`
          <exmg-button
            unelevated
            @click="${this.onSubmitBtnClick}"
            ?disabled="${this.submitting || (this.disableSubmitNoChanges && !this.dirty)}"
            ?loading=${this.submitting}
            >${this.submitButtonCopy}</exmg-button
          >
        `
      : '';
  }

  private renderActions() {
    if (this.hideSubmitButton && this.hideResetButton) {
      return '';
    }

    return html`
      <div class="actions">
        ${this.renderResetButton()} ${this.renderSubmitButton()}
      </div>
    `;
  }

  protected render() {
    const classes = {
      showError: !!this.errorMessage,
    };
    return html`
      <div class="error ${classMap(classes)}">
        <span class="body">
          <span class="body-content">
            ${warningIcon}
            <span class="msg">${this.errorMessage}</span>
          </span>
        </span>
      </div>
      <iron-form id="ironForm">
        <form id="form">
          <slot></slot>
        </form>
      </iron-form>
      ${this.renderActions()}
    `;
  }
}
