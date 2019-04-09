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
  public opened: boolean = false;

  @property({type: String, attribute: 'submit-btn-title'})
  public submitBtnTitle: string = 'Submit';

  @property({type: String, attribute: 'cancel-btn-title'})
  public cancelBtnTitle: string = 'Cancel';

  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

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
    this.submitting = true;
  }

  handleFormCancel(e: CustomEvent) {
    console.log('handleFormCancel', e.detail);
    this.submitting = false;
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
              ?disabled="${this.submitting}"
              title="${this.submitBtnTitle}"
              @click="${this.handleSubmitBtnClick}"
            >
              ${this.submitBtnTitle}${this.submitting ? html`<paper-spinner-lite active></paper-spinner-lite>` : ''}
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
