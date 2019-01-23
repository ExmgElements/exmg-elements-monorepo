import {customElement, html, LitElement, property} from 'lit-element';
import '@polymer/paper-dialog';
import '@polymer/paper-dialog-scrollable';
import '@polymer/paper-button';
import '@polymer/paper-progress';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
import {exmgDialogStyles} from './exmg-cms-dialog-styles';

@customElement('exmg-cms-dialog-form')
export class ExmgFormDialog extends LitElement {
  /**
   * Title of the dialog
   */
  @property({type: String})
  public title: string = '';

  /**
   * Copy for submit button
   */
  @property({type: String})
  public buttonCopy: string = '';

  /**
   * Indicator if submit is in progress This boolean will display the progress
   * bar at the bottom of the dialog
   */
  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  /**
   * Close icon. Default the close icon from the em-icons set. Set this property
   * if you want to use a different icon set
   */
  @property({type: String})
  private closeIcon: string = 'em-icons:close';

  /**
   * When set this will be shown in the error section of the dialog
   */
  @property({type: String})
  private errorMessage?: string;

  @property({type: Boolean})
  private large: boolean = false;

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

  private hasErrorMessage(message: string) {
    return !!message ? 'show' : '';
  }

  protected getElementBySelector(selector: string): HTMLElement|null {
    return this.shadowRoot ? this.shadowRoot.querySelector(selector) : null;
  }

  open() {
    const dialogNodeElem = this.getElementBySelector('#dialog');

    if (dialogNodeElem) {
      dialogNodeElem.open();
    }

    // this.$.dialog.open();
  }

  close() {
    const dialogNodeElem = this.getElementBySelector('#dialog');

    if (dialogNodeElem) {
      dialogNodeElem.close();
    }

    // this.$.dialog.close();
  }

  private reset() {
    const submitBtnElem = this.getElementBySelector('#submitBtn');
    const formElem = this.getElementBySelector('#form');

    this.submitting = false;
    this.errorMessage = undefined;

    if (submitBtnElem) {
      submitBtnElem.removeAttribute('disabled');
    }

    if (formElem) {
      formElem.reset();
    }
  }

  error(error) {
    const submitBtnElem = this.getElementBySelector('#submitBtn');

    this.submitting = false;
    this.errorMessage = error.message;

    if (submitBtnElem) {
      submitBtnElem.removeAttribute('disabled');
    }
  }

  done() {
    // Close dialog
    this.close();
  }

  submit() {
    const submitBtnElem = this.getElementBySelector('#submitBtn');
    const formElem = this.getElementBySelector('#form');


    // reset error message on new submit
    this.errorMessage = undefined;

    // Validate form elements
    if(!formElem.validate()) {
      return;
    }

    // Disabled submit button + display progress bar
    this.submitting = true;

    if (submitBtnElem) {
      submitBtnElem.setAttribute('disabled', 'disabled');
    }

    // dispatch event containing the serialized form data
    this.dispatchEvent(new CustomEvent('submit', {bubbles: false, composed: true, detail: formElem.serializeForm()}));
  }

  protected render() {
    return html`
      ${exmgDialogStyles}
      
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click on-iron-overlay-closed="${this.onCloseDialog}">
        <header>  
          <h2 class="title">${this.title}</h2>
          <paper-icon-button icon="${this.closeIcon}" dialog-dismiss></paper-icon-button>
        </header>
        <paper-dialog-scrollable>
          <div class="body">
            <div class$="error ${this.hasErrorMessage(this.errorMessage)}">
              <span class="body">
                <span>
                  <iron-icon icon="exmg-icons:warning"></iron-icon>
                  <span class="msg">${this.errorMessage}</span>
                </span>
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
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button id="submitBtn" on-click="${this.submit}" class="primary">${this.buttonCopy}</paper-button>
        </div>
        ${this.submitting ?
          html`
      
              <template is="dom-if" restamp>
                <paper-progress indeterminate></paper-progress>
              </template>
              ` : ''
            }
      </paper-dialog>
`;
  }
}
