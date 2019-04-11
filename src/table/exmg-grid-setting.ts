import {customElement, html, LitElement, property} from 'lit-element';
import '@polymer/paper-dialog/paper-dialog.js';
import '@material/mwc-button';
import '@material/mwc-icon';
import {style} from './exmg-grid-setting-styles';

@customElement('exmg-grid-setting')
export class ExmgGridSetting extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  @property({type: Boolean, attribute: 'no-cancel-on-outside-click'})
  noCancelOnOutsideClick: boolean = false;

  @property({type: String})
  tooltip: string = '';

  @property({type: String})
  icon: string = 'get_app';

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;

    this.dispatchEvent(new CustomEvent(
      'exmg-drawer-opened-changed',
      {
        bubbles: true,
        composed: true,
        detail: {
          value: e.detail.value,
        },
      }
    ));
  }

  openDialog() {
    this.opened = true;
  }

  static styles = [
    style,
  ];

  render() {
    return html`
      <mwc-button
        class="action"
        title="${this.tooltip}"
        @click="${this.openDialog}"
      >
        <mwc-icon>${this.icon}</mwc-icon>
      </mwc-button>
      <paper-dialog
        ?opened="${this.opened}"
        ?no-cancel-on-outside-click="${this.noCancelOnOutsideClick}"
        @opened-changed="${this.handleOpenedChanged}"
      >
        <slot></slot>
      </paper-dialog>
    `;
  }
}
