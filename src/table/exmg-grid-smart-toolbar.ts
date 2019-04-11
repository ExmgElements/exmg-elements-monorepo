import {customElement, html, LitElement, property} from 'lit-element';
import './exmg-grid-toolbar';
import {Filter, Setting, SettingConfigType, SettingSelectionListConfig} from './types/exmg-grid-toolbar-types';
import {
  ActionAmountSelectedItemsCondition,
  ActionConditionType,
  ActionWithCondition,
  BaseActionCondition
} from './types/exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-smart-toolbar')
export class ExmgGridSmartToolbar extends LitElement {
  @property({type: String})
  description: string = '';

  @property({type: Object})
  actions: ActionWithCondition[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Object})
  settings: Setting[] = [];

  @property({type: Number, attribute: 'amount-of-selected-items'})
  amountOfSelectedItems: number = 0;

  @property({type: Boolean, attribute: 'show-column-filter'})
  showColumnFilter: boolean = false;

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
    action: ActionWithCondition<BaseActionCondition>
  ): action is ActionWithCondition<ActionAmountSelectedItemsCondition> {
    return !!action.condition && (action.condition!.type === ActionConditionType.AmountOfSelectedItemsRange);
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
        id: 'column-selector',
        dialogTitle: 'Column selection',
        tooltip: 'Select columns',
        icon: 'filter_list',
        config: {
          type: SettingConfigType.SelectionList,
          data: [
            {
              id: 'col1',
              title: 'column 1',
            },
            {
              id: 'col2',
              title: 'column 2',
            },
            {
              id: 'col3',
              title: 'column 3',
            },
          ],
        },
      },
    ];
  }

  render() {
    return html`
      <exmg-grid-toolbar
        .actions="${this.getActions()}"
        description="${this.description}"
        .filters="${this.getFilters()}"
        .settings="${this.getSettings()}"
      ></exmg-grid-toolbar>
    `;
  }
}
