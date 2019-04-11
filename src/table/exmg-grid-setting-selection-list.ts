import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-dialog/paper-dialog.js';
import '@material/mwc-button';
import '@material/mwc-icon';
import './exmg-grid-setting';
import {style} from './exmg-grid-setting-selection-list-styles';
import {MDCList} from '@material/list';
import '@material/mwc-checkbox';

@customElement('exmg-grid-setting-selection-list')
export class ExmgGridSettingSelectionList extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  @property({type: Boolean, attribute: 'no-cancel-on-outside-click'})
  noCancelOnOutsideClick: boolean = false;

  @property({type: String, attribute: 'dialog-title'})
  dialogTitle: string = '';

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

  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    new MDCList(this.shadowRoot!.querySelector('.mdc-list')!);
  }

  render() {
    console.log(this.items);
    return html`
      <exmg-grid-setting
        class="setting"
        tooltip="${this.tooltip}"
        icon="${this.icon}"
      >
        <h2>${this.dialogTitle}</h2>
        <ul class="mdc-list">
          ${repeat(
            this.items,
          (item) => item.id,
          item => html`
            <li class="mdc-list-item">
              <span class="mdc-list-item__text">${item.title}</span>
              <mwc-checkbox class="mdc-list-item__meta"></mwc-checkbox>
            </li>
          `
          )}
        </ul>
      </exmg-grid-setting>
    `;
  }
}
