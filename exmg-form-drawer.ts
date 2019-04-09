import {LitElement, html, customElement, property, query} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';
import './exmg-drawer';
import {style} from './exmg-form-drawer-styles';
import {ExmgForm} from '@exmg/exmg-form/exmg-form';
import '@material/mwc-button';

@customElement('exmg-form-drawer' as any)
export class ExmgFormDrawer extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  @property({type: String, attribute: 'submit-btn-title'})
  submitBtnTitle: string = 'Submit';

  @property({type: String, attribute: 'cancel-btn-title'})
  cancelBtnTitle: string = 'Cancel';

  @query('exmg-form')
  private form?: ExmgForm;

  handleSubmitBtnClick() {
    this.form!.submit();
  }

  handleCancelBtnClick() {
    this.form!.cancel();
  }

  handleFormSubmit(e: CustomEvent) {
    console.log('handleFormSubmit', e.detail);
  }

  handleFormCancel(e: CustomEvent) {
    console.log('handleFormCancel', e.detail);
    this.opened = false;
  }

  static styles = [
    style,
  ];

  render () {
    // language=html
    return html`
      <exmg-drawer ?opened="${this.opened}">
        <div class="header">
          <slot name="title" class="title"></slot>
          <div class="header-buttons">
            <mwc-button
              title="${this.cancelBtnTitle}"
              @click="${this.handleCancelBtnClick}"
            >
              ${this.cancelBtnTitle}
            </mwc-button>
            <mwc-button
              unelevated
              title="${this.submitBtnTitle}"
              @click="${this.handleSubmitBtnClick}"
            >
              ${this.submitBtnTitle}
            </mwc-button>
          </div>
        </div>
        <div class="form-elements">
          <exmg-form
            @submit="${this.handleFormSubmit}"
            @cancel="${this.handleFormCancel}"
            hide-submit-button
            hide-cancel-button
          >
            <slot></slot>
          </exmg-form>
        </div>
      </exmg-drawer>
    `;
  }
}
