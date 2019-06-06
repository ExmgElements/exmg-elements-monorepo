import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-dialog';
import '@exmg/exmg-button';
import '@polymer/iron-form';
import {style} from './styles/exmg-dialog-styles';

@customElement('exmg-dialog-info')
export class ExmgInfoDialog extends LitElement {
  /**
   * Copy for done button
   */
  @property({type: String, attribute: 'button-copy'})
  private buttonCopy: string = '';

  /**
   * With close button ?
   */
  @property({type: Boolean, attribute: 'with-close-button'})
  private withCloseButton: boolean = false;

  /**
   * Secondary attribute propagation
   */
  @property({type: Boolean, attribute: 'button-secondary'})
  private buttonSecondary?: boolean = false;

  @query('#dialog')
  private dialogNode?: HTMLElement | any;

  static styles = [
    style,
  ];

  constructor() {
    super();
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

  done() {
    // dispatch event 'done'
    this.dispatchEvent(new CustomEvent('done'));
  }

  protected render() {
    return html`
      <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click>
        ${this.withCloseButton ? html`<span @click=${this.close} class="close-button">✕</span>` : ''}
        <slot></slot>
        <div class="actions">
          <exmg-button id="doneBtn" @click="${this.done}" ?unelevated=${!this.buttonSecondary}>${this.buttonCopy}</exmg-button>
        </div>
      </paper-dialog>
    `;
  }
}
