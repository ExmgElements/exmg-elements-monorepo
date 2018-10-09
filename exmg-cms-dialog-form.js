import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog';
import '@polymer/paper-dialog-scrollable';
import '@polymer/paper-button';
import '@polymer/paper-progress';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
import {exmgDialogStyles} from './exmg-cms-dialog-styles.js';

/**
 * `exmg-form-dialog`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ExmgFormDialog extends PolymerElement {
  static get template() {
    return html`
      ${exmgDialogStyles}
      
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click on-iron-overlay-closed="_onCloseDialog">
        <header>  
          <h2 class="title">[[title]]</h2>
          <paper-icon-button icon="[[closeIcon]]" dialog-dismiss></paper-icon-button>
        </header>
        <paper-dialog-scrollable>
          <div class="body">
            <div class$="error [[_hasErrorMessage(errorMessage)]]">
              <span class="body">
                <span>
                  <iron-icon icon="exmg-icons:warning"></iron-icon>
                  <span class="msg">[[errorMessage]]</span>
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
          <paper-button id="submitBtn" on-click="_submit" class="primary">[[buttonCopy]]</paper-button>
        </div>
        <template is="dom-if" if="[[submitting]]" restamp>
          <paper-progress indeterminate></paper-progress>
        </template>
      </paper-dialog>
    `;
  }
  static get properties() {
    return {
      /*
      * Title of the dialog
      */
      title: String,
      /*
      * Copy for submit button
      */
      buttonCopy: String,
      /*
      * Indicator if submit is in progress This boolean will display the progress 
      * bar at the bottom of the dialog
      */
      submitting: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
      },
      /*
      * Close icon. Default the close icon from the em-icons set. Set this property 
      * if you want to use a different icon set
      */
      closeIcon: {
        type: String,
        value: 'exmg-icons:close',
      },
      /*
      * When set this will be shown in the error section of the dialog
      */
      errorMessage: String,
      large: Boolean,
    };
  }
  _onCloseDialog(e) {
    /* only reset form if close event originates from dialog */
    if (e.path[0].tagName === 'PAPER-DIALOG') {
      this._reset();
    }
  }
  _hasErrorMessage(message) {
    return !!message ? 'show' : '';
  }
  open() {
    this.$.dialog.open();
  }
  close() {
    this.$.dialog.close();
  }
  _reset() {
    const {submitBtn, form} = this.$;

    this.set('submitting', false);
    this.set('errorMessage', null);

    submitBtn.removeAttribute('disabled');
    
    form.reset();
  } 
  error(error) {
    const {submitBtn, form} = this.$;

    // Reset properties when submit is finished
    this.set('submitting', false);
    submitBtn.removeAttribute('disabled');

    this.set('errorMessage', error.message);
  }
  done() {
    // Close dialog
    this.close();
  }
  _submit() {
    const {submitBtn, form} = this.$;

    // reset error message on new submit
    this.set('errorMessage', null);

    // Validate form elements
    if(!form.validate()) {
      return;
    }

    // Disbaled submit button + diaply progress bar
    this.set('submitting', true);
    submitBtn.setAttribute('disabled', true);

    // dispatch event containing the serialized form data
    this.dispatchEvent(new CustomEvent('submit', {bubbles: false, composed: true, detail: form.serializeForm()}));
  }
}

window.customElements.define('exmg-cms-dialog-form', ExmgFormDialog);
