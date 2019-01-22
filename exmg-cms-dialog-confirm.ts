import {customElement, html, LitElement, property} from 'lit-element';
import '@polymer/paper-dialog';
import '@polymer/paper-button';
import '@polymer/paper-progress';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
import {exmgDialogStyles} from './exmg-cms-dialog-styles';

@customElement('exmg-cms-dialog-confirm')
export class ExmgConfirmDialog extends LitElement {
  /**
   * Title of the dialog
   */
  @property({type: String})
  public title: string = '';

  /**
   * Dialog message to display as confirmation question
   */
  @property({type: String})
  private message: string = '';

  /**
   * Copy for submit button
   */
  @property({type: String})
  private buttonCopy: string = '';

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

  constructor() {
    super();

    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.submit = this.submit.bind(this);
  }


  private onCloseDialog() {
    this.reset();
  }

  protected getElementBySelector(selector: string): HTMLElement|null {
    return this.shadowRoot ? this.shadowRoot.querySelector(selector) : null;
  }

  private reset() {
    const submitBtnElem = this.getElementBySelector('#submitBtn');

    this.submitting = false;
    this.errorMessage = undefined;

    if (submitBtnElem) {
      submitBtnElem.removeAttribute('disabled');
    }
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

// error(error) {
//   const {submitBtn} = this.$;
//
//   // Reset properties when submit is finished
//   this.set('submitting', false);
//   submitBtn.removeAttribute('disabled');
//
//   this.set('errorMessage', error.message);
// }
// done() {
//   const {submitBtn} = this.$;
//
//   // Reset properties when submit is finished
//   this.set('submitting', false);
//   submitBtn.removeAttribute('disabled');
//
//   // Close dialog
//   this.close();
// }
  private submit() {
    const submitBtnElem = this.getElementBySelector('#submitBtn');

    // reset error message on new submit
    this.errorMessage = undefined;

    // Disabled submit button + display progress bar
    this.submitting = true;

    if (submitBtnElem) {
      submitBtnElem.setAttribute('disabled', 'disabled');
    }

    // dispatch event
    this.dispatchEvent(new CustomEvent('submit', {bubbles: false, composed: true}));
  }

  protected render() {
    return html`
  ${exmgDialogStyles}

  <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click on-iron-overlay-closed="${this.onCloseDialog}">
    <header>
      <h2 class="title">${this.title}</h2>
      <paper-icon-button icon="em-icons:close" dialog-dismiss></paper-icon-button>
    </header>
    <div class="body">
      <div class$="error [[_hasErrorMessage(errorMessage)]]">
        <span class="body">
          <span>
            <iron-icon icon="exmg-icons:warning"></iron-icon>
            <span class="msg">${this.errorMessage}</span>
          </span>
        </span>
      </div>
      <p>${this.message}</p>
    </div>
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
