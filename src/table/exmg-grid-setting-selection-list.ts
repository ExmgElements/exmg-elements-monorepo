import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-dialog/paper-dialog.js';
import '@material/mwc-icon';
import './exmg-grid-setting';
import {style} from './exmg-grid-setting-selection-list-styles';
import {MDCList} from '@material/list';
import '@material/mwc-checkbox/mwc-checkbox';
import {SettingSelectionListItem} from './types/exmg-grid-toolbar-types';

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
  icon: string = 'filter_list';

  @property({type: Object})
  settingData: SettingSelectionListItem[] = [];

  async handleListAction(e: CustomEvent) {
    const index = e.detail.index;
    this.settingData[index].selected = !this.settingData[index].selected;
    await this.requestUpdate();

    this.dispatchEvent(new CustomEvent(
      'exmg-grid-setting-changed',
      {
        bubbles: true,
        composed: true,
        detail: {
          value: this.settingData,
        },
      }
    ));
  }

  static styles = [
    style,
  ];

  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    new MDCList(this.shadowRoot!.querySelector('.mdc-list')!);
  }

  render() {
    return html`
      <exmg-grid-setting
        class="setting"
        tooltip="${this.tooltip}"
        icon="${this.icon}"
      >
        <h2>${this.dialogTitle}</h2>
        <ul class="mdc-list mdc-list--dense" @MDCList:action="${this.handleListAction}">
          ${repeat(
            this.settingData,
          (item) => item.id,
          item => html`
            <li class="mdc-list-item">
              <mwc-checkbox class="mdc-list-item__graphic" ?checked="${item.selected}"></mwc-checkbox>
              <span class="mdc-list-item__text">${item.title}</span>
            </li>
          `
          )}
        </ul>
      </exmg-grid-setting>
    `;
  }
}
