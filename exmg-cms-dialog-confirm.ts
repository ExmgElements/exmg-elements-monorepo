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
  @property({type: String, attribute: 'button-copy'})
  private buttonCopy: string = '';

  /**
   * Indicator if submit is in progress This boolean will display the progress
   * bar at the bottom of the dialog
   */
  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  /**
   * Close icon. Default the close icon from the exmg-icons set. Set this property
   * if you want to use a different icon set
   */
  @property({type: String, attribute: 'close-icon'})
  private closeIcon: string = 'exmg-icons:close';

  /**
   * When set this will be shown in the error section of the dialog
   */
  @property({type: String, attribute: 'error-message'})
  private errorMessage?: string;

  constructor() {
    super();

    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.submit = this.submit.bind(this);
  }


  private onCloseDialog() {
    this.reset();
  }

  private hasErrorMessage(message?: string) {
    return !!message ? 'show' : '';
  }

  protected getElementBySelector(selector: string): HTMLElement | null {
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
    const dialogNodeElem = this.getElementBySelector('#dialog') as HTMLElement | any;

    if (dialogNodeElem) {
      dialogNodeElem.open();
    }

    // this.$.dialog.open();
  }

  close() {
    const dialogNodeElem = this.getElementBySelector('#dialog') as HTMLElement | any;

    if (dialogNodeElem) {
      dialogNodeElem.close();
    }

    // this.$.dialog.close();
  }

  error(error: Error) {
    const submitBtnElem = this.getElementBySelector('#submitBtn');

    this.submitting = false;
    this.errorMessage = error.message;

    if (submitBtnElem) {
      submitBtnElem.removeAttribute('disabled');
    }
  }

  done() {
    const submitBtnElem = this.getElementBySelector('#submitBtn');

    // Reset properties when submit is finished
    this.submitting = false;

    if (submitBtnElem) {
      submitBtnElem.removeAttribute('disabled');
    }

    // Close dialog
    this.close();
  }

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
      <style>
          paper-dialog {
      border-radius: 8px;
      min-width: 500px;
      box-shadow: var(--shadow-elevation-8dp_-_box-shadow);
    }
    paper-dialog > .actions {
      margin: 24px 0;
      text-align: right;
    }
    paper-dialog > header {
      -webkit-box-flex: 0 0 auto;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      padding: 4px 24px 0 24px;
      @apply --layout-horizontal;
    }
    paper-dialog > header > .title {
      @apply --layout-flex;
    }
    paper-dialog > header > paper-icon-button {
      position: relative;
      top: -8px;
    }
    paper-dialog > header > .title {
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      color: #000;
      font-family: 'Google Sans',sans-serif;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin: 0 32px 16px 0;
    }
    
    
    
    
    
    paper-button.primary {
      background: var(--primary-color);
      color: white;
    }
    paper-button {
      border-radius: 6px;
      text-transform: initial;
      padding-left: 16px;
      padding-right: 16px;
      -webkit-border-radius: 8px;
      border-radius: 8px;
      text-transform: none;
      letter-spacing: .25px;
      min-width: 60px;
    }
    paper-button[disabled] {
      opacity: 0.5;
    }
    paper-button.error,
    paper-button.alert {
      color: white;
      background: var(--error-color);
    }
    
    
      
      
      
    paper-progress {
      width: 100%;
      margin-top: 0px;
      box-sizing: border-box;
    }
    paper-dialog{
      max-width: 512px;
      box-sizing: border-box;
    }
    :host([large]) paper-dialog{
      max-width: 810px;
      width: 100%;
    }
    paper-dialog > .actions {
      margin: 24px 0 24px;
    }
    ::slotted(hr) {
      border: none;
      height: 1px;
      background: var(--divider-color);
      margin: 16px 0 8px;
    }
    :host([submitting]) paper-dialog > .actions {
      margin: 24px 0 20px;
    }
    p,
    ::slotted(p) {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.54);
    }
    ::slotted(label) {
      font-size:12px;
      font-weight:400;
      height:20px;
      justify-content:normal;
      letter-spacing:0.132px;
      line-height:20px;
      text-overflow:ellipsis;
      color: var(--secondary-text-color);
    }
    ::slotted(p.help) {
      margin-top: -2px;
      font-size: 0.8em;
    }
    .error {
      display: none;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.54);
      -webkit-box-flex: 0 0 auto;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      padding: 0;
    }
    .error > span {
      background-color: #fbe9e7;
      color: #ff5252;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 0 0 24px;
      margin: 0 0 12px;
      min-height: 48px;
    }
    .error > span > span {
      padding-left: 36px;
      margin-right: 24px;
      position: relative;
      padding: 12px 0;
      line-height: 20px;
      font-size: 14px;
      white-space: normal;
      font-weight: 500;
      display: inline-block;
      vertical-align: middle;
    }
    .error iron-icon {
      margin-right: 12px;
      color: #ff5252;
    }
    .error.show {
      display: block;
    }
    .body {
      margin-top: 0px;
      margin-bottom: 24px;
    }    
    paper-dialog > .actions {
      margin: 18px 0 18px;
    }
    :host([submitting]) paper-dialog > .actions {
      margin: 18px 0 14px;
    }
    paper-dialog-scrollable {
      margin-top: 4px;
    }
  </style>
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click on-iron-overlay-closed="${this.onCloseDialog}">
        <header>
          <h2 class="title">${this.title}</h2>
          <paper-icon-button icon="${this.closeIcon}" dialog-dismiss></paper-icon-button>
        </header>
        <div class="body">
          <div class="error ${this.hasErrorMessage(this.errorMessage)}">
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
          <paper-button id="submitBtn" @click="${this.submit}" class="primary">${this.buttonCopy}</paper-button>
        </div>
        ${this.submitting ? html`<paper-progress indeterminate></paper-progress>` : ''}
      </paper-dialog>
    `;
  }
}
