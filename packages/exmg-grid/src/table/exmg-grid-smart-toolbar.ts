import {customElement, html, LitElement, property, TemplateResult, css} from 'lit-element';
import './exmg-grid-toolbar';
import {
  Filter,
  Setting,
  SettingConfigId,
  SettingConfigType,
  SettingSelectionListConfig,
  SettingSelectionListItem,
} from './types/exmg-grid-toolbar-types';
import {
  ActionAmountSelectedItemsCondition,
  ActionConditionType,
  ActionWithCondition,
  BaseActionCondition,
} from './types/exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-smart-toolbar')
export class ExmgGridSmartToolbar extends LitElement {
  @property({type: String})
  description = '';

  @property({type: Object})
  actions: ActionWithCondition[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Object})
  settings: Setting[] = [];

  @property({type: Number, attribute: 'amount-of-selected-items'})
  amountOfSelectedItems = 0;

  @property({type: Boolean, attribute: 'show-column-filter'})
  showColumnFilter = false;

  @property({type: String, attribute: 'column-filter-button-tooltip'})
  columnFilterButtonTooltip = 'Column selection';

  @property({type: String, attribute: 'column-filter-dialog-title'})
  columnFilterDialogTitle = 'Select columns';

  @property({type: Object, attribute: 'column-filter-columns'})
  columnFilterColumns: SettingSelectionListItem[] = [];

  @property({type: Boolean})
  searchEnabled = false;

  @property({type: String})
  searchPlaceholder = 'Search';

  @property({type: Boolean})
  disableSeperator = false;

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  private getActions() {
    return this.actions.filter((action) => {
      return this.shouldActionBeVisible(action);
    });
  }

  private shouldActionBeVisible(action: ActionWithCondition) {
    if (this.isActionAmountSelectedItemsCondition(action)) {
      return this.checkAmountOfSelectedItemsRangeCondition(action);
    }

    return true;
  }

  private isActionAmountSelectedItemsCondition(
    action: ActionWithCondition<BaseActionCondition>,
  ): action is ActionWithCondition<ActionAmountSelectedItemsCondition> {
    return !!action.condition && action.condition!.type === ActionConditionType.AmountOfSelectedItemsRange;
  }

  private checkAmountOfSelectedItemsRangeCondition(action: ActionWithCondition<ActionAmountSelectedItemsCondition>): boolean {
    const condition = action.condition;
    const min = condition!.min;

    if (min !== undefined && this.amountOfSelectedItems < min) {
      return false;
    }

    const max = condition!.max;

    if (max !== undefined && this.amountOfSelectedItems > max) {
      return false;
    }

    return true;
  }

  private getFilters() {
    return this.filters.map((filter) => {
      return {
        ...filter,
        disabled: this.amountOfSelectedItems > 0,
      };
    });
  }
  private getSettings(): Setting<SettingSelectionListConfig>[] {
    if (!this.showColumnFilter) {
      return [];
    }

    return [
      {
        id: SettingConfigId.ColumnSelector,
        dialogTitle: this.columnFilterDialogTitle,
        tooltip: this.columnFilterButtonTooltip,
        icon: 'filter_list',
        config: {
          type: SettingConfigType.SelectionList,
          data: this.columnFilterColumns,
        },
      },
    ];
  }

  render(): TemplateResult {
    return html`
      <exmg-grid-toolbar
        searchPlaceholder=${this.searchPlaceholder}
        .searchEnabled=${this.searchEnabled}
        .actions="${this.getActions()}"
        description="${this.description}"
        .filters="${this.getFilters()}"
        .settings="${this.getSettings()}"
        ?disableSeperator=${this.disableSeperator}
      >
        <slot name="extra" slot="extra"></slot>
      </exmg-grid-toolbar>
    `;
  }
}
