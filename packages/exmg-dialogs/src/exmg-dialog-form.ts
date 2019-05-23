import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-dialog';
import '@polymer/paper-dialog-scrollable';
import '@exmg/exmg-button';
import '@polymer/iron-form';
import {style} from './exmg-dialog-styles';

@customElement('exmg-dialog-form')
export class ExmgFormDialog extends LitElement {
  /**
   * Title of the dialog
   */
  @property({type: String})
  public title: string = '';

  /**
   * Copy for submit button
   */
  @property({type: String, attribute: 'button-copy'})
  public buttonCopy: string = '';

  /**
   * Indicator if submit is in progress This boolean will display the progress
   * bar at the bottom of the dialog
   */
  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  /**
   * When set this will be shown in the error section of the dialog
   */
  @property({type: String, attribute: 'error-message'})
  private errorMessage?: string;

  @query('#dialog')
  private dialogNode?: HTMLElement | any;

  @query('#form')
  private formNode?: HTMLElement | any;

  @query('#submitBtn')
  private submitBtnNode?: HTMLElement | any;

  static styles = [
    style,
  ];

  constructor() {
    super();
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.submit = this.submit.bind(this);
  }

  private onCloseDialog(e: any) {
    /* only reset form if close event originates from dialog */
    if (e.path[0].tagName === 'PAPER-DIALOG') {
      this.reset();
    }
  }

  public open() {
    if (this.dialogNode) {
      this.dialogNode.open();
    }
  }

  public close() {
   if (this.dialogNode) {
      this.dialogNode.close();
    }
  }

  private reset() {
    this.submitting = false;
    this.errorMessage = undefined;

    if (this.submitBtnNode) {
      this.submitBtnNode.removeAttribute('disabled');
    }

    if (this.formNode) {
      this.formNode.reset();
    }
  }

  public error(error: Error) {
    this.submitting = false;
    this.errorMessage = error.message;

    if (this.submitBtnNode) {
      this.submitBtnNode.removeAttribute('disabled');
    }
  }

  public done() {
    // Reset properties when submit is finished
    this.submitting = false;

    if (this.submitBtnNode) {
      this.submitBtnNode.removeAttribute('disabled');
    }

    // Close dialog
    this.close();
  }

  submit() {
    // reset error message on new submit
    this.errorMessage = undefined;

    // Validate form elements
    if (!this.formNode.validate()) {
      return;
    }

    // Disabled submit button + display progress bar
    this.submitting = true;

    if (this.submitBtnNode) {
      this.submitBtnNode.setAttribute('disabled', 'disabled');
    }

    // dispatch event containing the serialized form data
    this.dispatchEvent(new CustomEvent('submit', {bubbles: false, composed: true, detail: this.formNode.serializeForm()}));
  }

  protected render() {
    return html`
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click @iron-overlay-closed="${this.onCloseDialog}">
        <header>
          <h2 class="title">${this.title}</h2>
        </header>
        <paper-dialog-scrollable>
          <div class="body">
            <div class="error ${ !!this.errorMessage ? 'show' : '' }">
              <span class="body">
                <svg height="24" viewBox="0 0 24 24" width="24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                <span class="msg">${this.errorMessage}</span>
              </span>
            </div>
            <iron-form id="form">
              <form>
                <slot></slot>
              </form>
            </iron-form>
          </div>
        </paper-dialog-scrollable>
        <div class="actions">
          <exmg-button dialog-dismiss>Cancel</exmg-button>
          <exmg-button id="submitBtn" @click="${this.submit}" ?loading="${this.submitting}" unelevated>${this.buttonCopy}</exmg-button>
        </div>
      </paper-dialog>
    `;
  }
}
