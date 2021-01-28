import {customElement, html, LitElement, property, query, TemplateResult} from 'lit-element';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon-button';

import {SettingSelectionListItem} from './types/exmg-grid-toolbar-types';
import {style} from './exmg-grid-setting-selection-list-styles';
import { Menu } from '@material/mwc-menu';

@customElement('exmg-grid-setting-selection-list')
export class ExmgGridSettingSelectionList extends LitElement {
  @property({type: String})
  tooltip = '';

  @property({type: String})
  icon = 'filter_list';

  @property({type: Object})
  settingData: SettingSelectionListItem[] = [];

  @query('#menu')
  private menu?: Menu;

  private toggleMenuOpenState(e: Event) {
    e.stopPropagation();
    if(!this.menu) {
      return;
    }
    this.menu.anchor = e.target as HTMLElement;
    this.menu.open =  true;
  }

  private dispatchSettingsChanged() {
    this.dispatchEvent(
      new CustomEvent<{value: SettingSelectionListItem[]}>('exmg-grid-setting-changed', {
        bubbles: true,
        composed: true,
        detail: {
          value: [...this.settingData],
        },
      }),
    );
  }

  private handleListAction(e: CustomEvent) {
    e.stopPropagation();
    const index = e.detail.index;
    this.settingData[index].selected = !this.settingData[index].selected;
    this.settingData = [...this.settingData];
    this.saveSettingsListToLocalStorage();

    this.dispatchSettingsChanged();
  }

  static styles = [style];

  protected async firstUpdated(): Promise<void> {
    await this.updateComplete;
    this.getSettingsListFromLocalStorage();
  }

  private saveSettingsListToLocalStorage() {
    const key = `columnSettings:${window.location.pathname}`;
    const value = this.settingData
      .filter((d) => d.selected)
      .map((d) => d.id)
      .join(',');
    localStorage.setItem(key, value);
  }

  private getSettingsListFromLocalStorage() {
    const key = `columnSettings:${window.location.pathname}`;
    const value = localStorage.getItem(key);
    if (!value) {
      return;
    }
    const selectedSettings = value.split(',');
    for (const setting of this.settingData) {
      setting.selected = selectedSettings.includes(setting.id);
    }
    this.settingData = [...this.settingData];
    this.dispatchSettingsChanged();
  }

  render(): TemplateResult {
    return html`
      <mwc-icon-button
        icon="${this.icon}"
        @click="${this.toggleMenuOpenState}"
        class="mdc-icon-button material-icons action"
        title="${this.tooltip}"
        data-mdc-ripple-is-unbounded="true"
      ></mwc-icon-button>

      <mwc-menu
        id="menu"
        absolute
        activatable
        multi
        @action="${this.handleListAction}">
        ${this.settingData.map((item) => html`
          <mwc-list-item ?selected=${item.selected} ?activated=${item.selected}>
            ${item.title}
          </mwc-list-item>`)}
      </mwc-menu>
    `;
  }
}
