import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-dialog/paper-dialog.js';
import '@material/mwc-button';
import '@material/mwc-icon';
import './exmg-grid-setting';
import {style} from './exmg-grid-setting-styles';

@customElement('exmg-grid-setting-selection-list')
export class ExmgGridSettingSelectionList extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  @property({type: Boolean, attribute: 'no-cancel-on-outside-click'})
  noCancelOnOutsideClick: boolean = false;

  @property({type: String})
  text: string = '';

  @property({type: String})
  tooltip: string = '';

  @property({type: String})
  icon: string = 'get_app';

  @property({type: Object})
  items: { id: string; title: string }[] = [];

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
    console.log(this.items);
    return html`
      <exmg-grid-setting
        class="setting"
        text="${this.text}"
        tooltip="${this.tooltip}"
        icon="${this.icon}"
      >
        ${repeat(
        this.items,
        (item) => item.id,
        item => html`${item.title}<br>`
        )}
      </exmg-grid-setting>
    `;
  }
}
