import {customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

import '@material/mwc-icon-button';
import '@material/mwc-checkbox/mwc-checkbox';
import {MDCMenu} from '@material/menu';
import {DefaultFocusState} from '@material/menu/constants';
import {Corner} from '@material/menu-surface/constants';

import {SettingSelectionListItem} from './types/exmg-grid-toolbar-types';
import {style} from './exmg-grid-setting-selection-list-styles';

@customElement('exmg-grid-setting-selection-list')
export class ExmgGridSettingSelectionList extends LitElement {
  @property({type: String})
  tooltip = '';

  @property({type: String})
  icon = 'filter_list';

  @property({type: Object})
  settingData: SettingSelectionListItem[] = [];

  private menu?: MDCMenu;

  private toggleMenuOpenState() {
    this.menu!.open = !this.menu!.open;
  }

  private handleListAction(e: CustomEvent) {
    this.blockEventPropagation(e);
    const index = e.detail.index;
    this.settingData[index].selected = !this.settingData[index].selected;
    this.settingData = [...this.settingData];
    this.saveSettingsListToLocalStorage();

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

  static styles = [style];

  protected async firstUpdated(): Promise<void> {
    await this.updateComplete;
    const menuElement = this.shadowRoot!.querySelector('.mdc-menu');
    if (menuElement) {
      this.menu = new MDCMenu(menuElement)!;
      this.menu.setDefaultFocusState(DefaultFocusState.FIRST_ITEM);
      this.menu.setIsHoisted(false);
      this.menu.setAnchorCorner(Corner.BOTTOM_RIGHT);
    }
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
    this.settingData = this.settingData.map((sd) => {
      if (selectedSettings.indexOf(sd.id) !== -1) {
        sd.selected = true;
      }
      return sd;
    });
  }

  private blockEventPropagation(e: Event) {
    // by preventing events menu remains open after selecting single option - we can do multiple selection
    e.stopPropagation();
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

      <div class="mdc-menu-surface--anchor">
        <div class="mdc-menu mdc-menu-surface" @MDCMenu:selected="${this.blockEventPropagation}">
          <ul
            class="mdc-list mdc-list--dense"
            role="menu"
            @MDCList:action="${this.handleListAction}"
            @click="${this.blockEventPropagation}"
          >
            ${repeat(
              this.settingData,
              (item) => item.id,
              (item) => html`
                <li class="mdc-list-item">
                  <mwc-checkbox class="mdc-list-item__graphic" ?checked="${item.selected}"></mwc-checkbox>
                  <span class="mdc-list-item__text">${item.title}</span>
                </li>
              `,
            )}
          </ul>
        </div>
      </div>
    `;
  }
}
