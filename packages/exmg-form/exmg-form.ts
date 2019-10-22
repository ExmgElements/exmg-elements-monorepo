import {customElement, html, LitElement, property, PropertyValues, query} from 'lit-element';
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

  public done(): void {
    this.dirty = false;
    this.submitting = false;
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

  private onSubmitBtnClick(): void {
    this.submit();
  }

  private onCancelBtnClick(): void {
    this.cancel();
  }

  private onEnterPressed(e: KeyboardEvent) {
    switch (e.code || e.keyCode) {
      case ENTER_KEY_CODE:
      case 'Enter':
      case 'NumpadEnter':
        e.stopPropagation();
        this.submit();
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this.onEnterPressed);
    this.addEventListener('change', this.handleOnChange);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onEnterPressed);
    this.removeEventListener('change', this.handleOnChange);

    super.disconnectedCallback();
  }

  protected updated(_: PropertyValues): void {
    if (this.inline) {
      Array.from(this.children).forEach((elem: Element) => {
        (elem as HTMLElement).style.display = 'inline-block';
      });
    } else {
      Array.from(this.children).forEach((elem: Element) => {
        (elem as HTMLElement).style.display = null;
      });
    }
  }

  private handleOnChange(_e: Event): void {
    if (this.dirty) {
      return;
    }
    this.dirty = true;
    this.dispatchEvent(
      new CustomEvent('dirty', {
        bubbles: false,
        composed: false,
        detail: {
          dirty: true,
        },
      }),
    );
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
        </form>
      </iron-form>
      ${this.renderActions()}
    `;
  }
}
