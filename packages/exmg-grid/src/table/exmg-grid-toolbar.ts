import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-icon-button';
import './exmg-grid-toolbar-combobox';
import '@polymer/paper-item';
import './exmg-grid-base-toolbar';
import './exmg-grid-setting-selection-list';
import '../search/exmg-toolbar-search.js';

import {
  Action,
  BaseFilterConfig,
  BaseSettingConfig,
  EventDetailGridToolbarSettingChanged,
  Filter,
  FilterConfigType,
  FilterSingleSelectConfig,
  Setting,
  SettingConfigType,
  SettingSelectionListConfig,
  SettingSelectionListItem,
} from './types/exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar')
export class ExmgGridToolbar extends LitElement {
  static styles = [
    css`
      exmg-grid-toolbar-combobox {
        padding-left: 10px;
        border-radius: 4px;
        --paper-icon-button-ink-color: var(--mdc-theme-primary);
      }
    `,
  ];
  @property({type: String})
  description = '';

  @property({type: Object})
  actions: Action[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Object})
  settings: Setting[] = [];

  @property({type: Boolean})
  searchEnabled = false;

  private emitActionExecutedEvent(action: Action) {
    return () => {
      this.dispatchEvent(
        new CustomEvent('exmg-grid-toolbar-action-executed', {
          detail: {
            id: action.id,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private emitFilterChangedEvent(filter: Filter) {
    return (event: CustomEvent) => {
      this.saveFilterInLocalStorage(filter.id, event.detail.value);
      this.dispatchEvent(
        new CustomEvent('exmg-grid-toolbar-filter-changed', {
          detail: {
            id: filter.id,
            value: event.detail.value,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private saveFilterInLocalStorage(filterId: string, value: string) {
    if (filterId.length > 0) {
      const key = `${filterId}${window.location.pathname}`;
      localStorage.setItem(key, value);
    }
  }

  private getFilterFromLocalStorage(filterId: string): string | null {
    if (filterId.length > 0) {
      const key = `${filterId}${window.location.pathname}`;
      return localStorage.getItem(key);
    }
    return null;
  }

  private emitSettingChangedEvent(setting: Setting) {
    return (event: CustomEvent<{value: SettingSelectionListItem[]}>) => {
      this.dispatchEvent(
        new CustomEvent<EventDetailGridToolbarSettingChanged>('exmg-grid-toolbar-setting-changed', {
          detail: {
            id: setting.id,
            value: event.detail.value,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private renderActions() {
    return repeat(
      this.actions,
      (action) => html`
        <mwc-icon-button
          class="action"
          icon="${action.icon}"
          title="${action.tooltip}"
          @click="${this.emitActionExecutedEvent(action)}"
        ></mwc-icon-button>
      `,
    );
  }

  private renderSearch() {
    return html`<exmg-toolbar-search></exmg-toolbar-search> `;
  }

  private renderDescription() {
    return html` ${this.description} `;
  }

  private renderFilters() {
    return repeat(this.filters, (filter) => this.renderFilter(filter));
  }

  private renderFilter(filter: Filter) {
    if (this.isFilterSingleSelectConfig(filter)) {
      return this.renderSingleSelectFilter(filter);
    }

    return undefined;
  }

  private isFilterSingleSelectConfig(filter: Filter<BaseFilterConfig>): filter is Filter<FilterSingleSelectConfig> {
    return filter.config.type === FilterConfigType.SingleSelect;
  }

  private getSelectedFilter(filter: Filter<FilterSingleSelectConfig>) {
    return this.getFilterFromLocalStorage(filter.id) || filter.config.data[0].id || 0;
  }

  private renderSingleSelectFilter(filter: Filter<FilterSingleSelectConfig>) {
    return html`
      <exmg-grid-toolbar-combobox
        class="filter"
        attr-for-selected="data-id"
        ?disabled="${!!filter.disabled}"
        selected=${this.getSelectedFilter(filter)}
        @exmg-combobox-select="${this.emitFilterChangedEvent(filter)}"
      >
        ${repeat(
          filter.config.data,
          (item: any) => item,
          (item) => html` <paper-item data-id="${item.id}">${item.title}</paper-item> `,
        )}
      </exmg-grid-toolbar-combobox>
    `;
  }

  private renderSettings() {
    return repeat(this.settings, (setting) => this.renderSetting(setting));
  }

  private renderSetting(setting: Setting) {
    if (this.isSettingSelectionListConfig(setting)) {
      return this.renderSelectionListSetting(setting);
    }

    return undefined;
  }

  private isSettingSelectionListConfig(setting: Setting<BaseSettingConfig>): setting is Setting<SettingSelectionListConfig> {
    return setting.config.type === SettingConfigType.SelectionList;
  }

  private renderSelectionListSetting(setting: Setting<SettingSelectionListConfig>) {
    return html`
      <exmg-grid-setting-selection-list
        class="setting"
        setting-id="${setting.id}"
        dialog-title="${setting.dialogTitle}"
        tooltip="${setting.tooltip}"
        icon="${setting.icon}"
        .settingData="${setting.config.data}"
        @exmg-grid-setting-changed="${this.emitSettingChangedEvent(setting)}"
      >
      </exmg-grid-setting-selection-list>
    `;
  }

  render(): TemplateResult {
    return html`
      <style>
        :host {
          --paper-item-focused: {
            background-color: var(
              --exmg-theme-table-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-item-selected: {
            background-color: var(
              --exmg-theme-table-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-button-ink-color: var(--exmg-theme-table-toolbar-filter-item-active-bg-color, var(--mdc-theme-surface));
          --paper-input-container-color: var(--exmg-grid-toolbar-on-surface-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(--exmg-grid-toolbar-on-surface-color, var(--mdc-theme-primary));

          --exmg-paper-combobox-selected-item-color: var(--exmg-grid-toolbar-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-selected-item-bg-color: var(--exmg-grid-toolbar-surface-color, transparent);
          --exmg-paper-combobox-dropdown-button-color: var(--exmg-grid-toolbar-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-button-bg-color: var(--exmg-grid-toolbar-surface-color, transparent);
          --exmg-paper-combobox-dropdown-list-color: var(--exmg-grid-toolbar-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-list-bg-color: var(--exmg-grid-toolbar-surface-color, var(--mdc-theme-surface));
        }
        :host exmg-grid-base-toolbar[active] {
          --paper-item-focused: {
            background-color: var(
              --exmg-theme-table-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-item-selected: {
            background-color: var(
              --exmg-theme-table-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-button-ink-color: var(--exmg-theme-table-toolbar-filter-item-active-bg-color, var(--mdc-theme-secondary));
          --paper-input-container-color: var(--exmg-grid-toolbar-active-on-surface-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(--exmg-grid-toolbar-active-on-surface-color, var(--mdc-theme-primary));

          --exmg-paper-combobox-selected-item-color: var(--exmg-grid-toolbar-active-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-selected-item-bg-color: var(--exmg-grid-toolbar-bg-active-surface-color, transparent);
          --exmg-paper-combobox-dropdown-button-color: var(--exmg-grid-toolbar-active-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-button-bg-color: var(--exmg-grid-toolbar-bg-active-surface-color, transparent);
          --exmg-paper-combobox-dropdown-list-color: var(--exmg-grid-toolbar-active-on-surface-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-list-bg-color: var(--exmg-grid-toolbar-bg-active-surface-color, var(--mdc-theme-surface));
        }
      </style>
      <exmg-grid-base-toolbar>
        <div slot="actions">${this.renderActions()}</div>
        ${this.searchEnabled
          ? html`<div slot="description">${this.renderSearch()}</div>`
          : html`<div slot="description">${this.renderDescription()}</div>`}

        <div slot="filters">${this.renderFilters()}</div>
        <div slot="settings">${this.renderSettings()}</div>
      </exmg-grid-base-toolbar>
    `;
  }
}
