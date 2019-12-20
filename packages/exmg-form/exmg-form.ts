import {customElement, html, LitElement, property, query} from 'lit-element';
import {observer} from '@material/mwc-base/base-element';
import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
import {timeOut} from '@polymer/polymer/lib/utils/async.js';
import '@polymer/iron-form';
import '@exmg/exmg-button';
import {style} from './styles/exmg-form-styles';
import {IronFormElement} from '@polymer/iron-form/iron-form';

const ENTER_KEY_CODE = 13;

const warningIcon = html`
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
  </svg>
`;

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  static styles = [style];

  @property({type: Boolean, attribute: 'hide-submit-button'})
  public hideSubmitButton = false;

  @property({type: Boolean, attribute: 'hide-cancel-button'})
  public hideCancelButton = false;

  @property({type: String, attribute: 'submit-button-copy'})
  public submitButtonCopy = 'Submit';

  @property({type: String, attribute: 'cancel-button-copy'})
  public cancelButtonCopy = 'Reset';

  @property({type: Boolean})
  public inline = false;

  @property({type: Boolean})
  @observer(function(this: ExmgForm, dirty: boolean) {
    this.dispatchEvent(
      new CustomEvent('dirty', {
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


  @query('#form')
  private form?: HTMLFormElement;

  private _debouncer: any;
  private observer?: FlattenedNodesObserver;

  private originalState?: any;

  createRenderRoot() {
    return this;
  }

  public done(): void {
    this.dirty = false;
    this.submitting = false;
  }

  updateOriginalState() {
    console.log('_updateOriginalState');

    var thisData = new FormData(this.form)
    console.log('sssssss', thisData);

    // After first render save original form data for later dirdty checks
    this.ironFormElem!.reset()
    this.originalState = this.serializeForm();

    for (const key in this.originalState) {
      if (this.originalState.hasOwnProperty(key)) {
        let prop = this.originalState[key];
        if(prop === undefined || prop == null) {
          this.originalState[key] = '';
        }
      }
    }
    console.log('_updateOriginalState', this.originalState);
  }

  firstUpdated() {
    this.updateOriginalState();
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

  public cancel(): void {
    this.submitting = false;
    this.errorMessage = '';
    this.reset();
    this.dispatchEvent(
      new CustomEvent('cancel', {
        bubbles: false,
        composed: false,
      }),
    );
  }

  public validate(): void {
    if (this.ironFormElem) {
      this.ironFormElem.validate();
    }
  }

  public reset(): void {
    if (this.ironFormElem) {
      this.ironFormElem.reset();
    }

    this.dirty = false;
    this.submitting = false;
    this.errorMessage = '';
  }

  public serializeForm(): {[key: string]: any} | undefined {
    if (this.ironFormElem) {
      return this.ironFormElem.serializeForm();
    }

    return;
  }

  private onSubmitBtnClick() {
    this.submit();
  }

  private onCancelBtnClick() {
    this.cancel();
  }

  private checkDirty() {
    this._debouncer = Debouncer.debounce(
      this._debouncer,
      timeOut.after(200),
      () => {

        const state = this.serializeForm();
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            let prop = state[key];
            if(prop === undefined || prop == null) {
              state[key] = '';
            }
          }
        }

        this.dirty = !(JSON.stringify(this.originalState) === JSON.stringify(state));
        console.log(this.originalState, state);
        console.log(this.dirty);
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
          console.log('A child node has been added or removed.');
          this.updateOriginalState();
        } else if (mutation.type === 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
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

  protected updated() {
    if (this.inline) {
      Array.from(this.children).forEach((elem: Element) => {
        (elem as HTMLElement).style.display = 'inline-block';
      });
    } else {
      Array.from(this.children).forEach((elem: Element) => {
        (elem as HTMLElement).style.display = '';
      });
    }
  }

  private handleOnChange() {
    this.checkDirty();
  }

  private renderCancelButton() {
    return !this.hideCancelButton
      ? html`
          <exmg-button class="cancel" @click="${this.onCancelBtnClick}">${this.cancelButtonCopy}</exmg-button>
        `
      : '';
  }

  private renderSubmitButton() {
    return !this.hideSubmitButton
      ? html`
          <exmg-button unelevated @click="${this.onSubmitBtnClick}" ?disabled="${this.submitting}" ?loading=${this.submitting}
            >${this.submitButtonCopy}</exmg-button
          >
        `
      : '';
  }

  private renderActions() {
    if (this.hideSubmitButton && this.hideCancelButton) {
      return '';
    }

    return html`
      <div class="actions ${this.inline ? 'inline' : ''}">
        ${this.renderCancelButton()} ${this.renderSubmitButton()}
      </div>
    `;
  }

  protected render() {
    return html`
      <div class="error ${!!this.errorMessage ? 'show' : ''}">
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
          <input name="test" type="text" />
        </form>
      </iron-form>
      ${this.renderActions()}
    `;
  }
}
