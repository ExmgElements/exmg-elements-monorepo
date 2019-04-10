import {LitElement, html, customElement, property, query} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';
import './exmg-drawer';
import './exmg-form-drawer-button';
import {style} from './exmg-form-drawer-styles';
import {ExmgForm} from '@exmg/exmg-form/exmg-form';
import '@material/mwc-button';

/**
 * ### Styling
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--mdc-theme-primary` | primary color for drawer header buttons |
 */
@customElement('exmg-form-drawer' as any)
export class ExmgFormDrawer extends LitElement {
  @property({type: Boolean})
  public opened: boolean = false;

  @property({type: String, attribute: 'submit-btn-title'})
  public submitBtnTitle: string = 'Submit';

  @property({type: String, attribute: 'cancel-btn-title'})
  public cancelBtnTitle: string = 'Cancel';

  @property({type: Boolean, attribute: 'keep-opened-on-submit-success'})
  public keepOpenedOnSubmitSuccess: boolean = false;

  @property({type: Boolean, attribute: 'reset-form-on-submit-success'})
  public resetFormOnSubmitSuccess: boolean = false;

  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  @query('exmg-form')
  private form?: ExmgForm;

  public done(): void {
    this.submitting = false;

    if (!this.keepOpenedOnSubmitSuccess) {
      this.opened = false;
    }

    if (this.resetFormOnSubmitSuccess) {
      this.form!.reset();
    }

    this.form!.done();
  }

  public error(errorMessage: string): void {
    this.submitting = false;
    this.form!.error(errorMessage);
  }

  private handleSubmitBtnClick() {
    this.form!.submit();
  }

  private handleCancelBtnClick() {
    this.form!.cancel();
  }

  private handleFormSubmit(e: CustomEvent) {
    this.submitting = true;
    this.dispatchEvent(
      new CustomEvent(
        'submit',
        {
          bubbles: false,
          composed: false,
          detail: e.detail,
        }
      )
    );
  }

  private handleFormCancel() {
    this.submitting = false;
    this.opened = false;
    this.dispatchEvent(
      new CustomEvent(
        'cancel',
        {
          bubbles: false,
          composed: false,
        }
      )
    );
  }

  static styles = [
    style,
  ];

  render () {
    // language=html
    return html`
      <exmg-drawer ?opened="${this.opened}" style="max-width: ${this.style.maxWidth || '547px'}">
        <div class="header">
          <slot name="title" class="title"></slot>
          <div class="header-buttons">
            <exmg-form-drawer-button
              title="${this.cancelBtnTitle}"
              @click="${this.handleCancelBtnClick}"
            >
              ${this.cancelBtnTitle}
            </exmg-form-drawer-button>
            <exmg-form-drawer-button
              unelevated
              ?loading="${this.submitting}"
              ?disabled="${this.submitting}"
              title="${this.submitBtnTitle}"
              @click="${this.handleSubmitBtnClick}"
            >
              ${this.submitBtnTitle}
            </exmg-form-drawer-button>
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
