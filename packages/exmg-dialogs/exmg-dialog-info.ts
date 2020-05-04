import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-dialog';
import '@polymer/paper-dialog-scrollable';
import '@exmg/exmg-button';
import '@polymer/iron-form';
import '@material/mwc-icon-button';
import {style} from './styles/exmg-dialog-styles';
import {PaperDialogElement} from '@polymer/paper-dialog';
import {closeIcon} from './exmg-dialog-icons';

@customElement('exmg-dialog-info')
export class ExmgInfoDialog extends LitElement {
  /**
   * Title of the dialog
   */
  @property({type: String})
  public title = '';

  /**
   * Copy for done button
   */
  @property({type: String, attribute: 'button-copy'})
  private buttonCopy = '';

  /**
   * Hide close button ?
   */
  @property({type: Boolean, attribute: 'hide-close-button'})
  private hideCloseButton = false;

  /**
   * Secondary attribute propagation
   */
  @property({type: Boolean, attribute: 'button-secondary'})
  private buttonSecondary?: boolean = false;

  @query('#dialog')
  private dialogNode?: PaperDialogElement;

  static styles = [style];

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

  done() {
    // dispatch event 'done'
    this.dispatchEvent(new CustomEvent('done'));
  }

  protected render() {
    return html`
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click>
        ${this.hideCloseButton
          ? ''
          : html`
              <mwc-icon-button @click=${this.close} class="close-button">${closeIcon}</mwc-icon-button>
            `}
        ${this.title
          ? html`
              <header>
                <h2 class="title">${this.title}</h2>
              </header>
            `
          : html`
              <div class="empty-header"></div>
            `}
        <paper-dialog-scrollable>
          <slot></slot>
        </paper-dialog-scrollable>
        <div class="actions">
          <exmg-button id="doneBtn" @click=${this.done} ?unelevated=${!this.buttonSecondary}>${this.buttonCopy}</exmg-button>
        </div>
      </paper-dialog>
    `;
  }
}
