import {customElement, html, LitElement} from 'lit-element';
import {Filter, FilterSingleSelectConfig, FilterConfigType} from '../src/table/exmg-grid-toolbar-types';
import {
  ActionAmountSelectedItemsCondition,
  ActionWithCondition,
  ActionConditionType
} from '../src/table/exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-toolbar-demo')
export class ExmgGridToolbarDemo extends LitElement {
  private actions: ActionWithCondition<ActionAmountSelectedItemsCondition>[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
    },
    {
      id: 'merge',
      text: '',
      tooltip: 'Merge',
      icon: 'merge_type',
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 2,
      },
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
    },
  ];

  private description: string = 'Table 1';

  private filters: Filter<FilterSingleSelectConfig>[] = [
    {
      id: 'status',
      name: 'Status',
      config: {
        type: FilterConfigType.SingleSelect,
        data: [
          {
            id: 'active',
            title: 'Active',
          },
          {
            id: 'inactive',
            title: 'Inactive',
          },
          {
            id: 'archived',
            title: 'Archived',
          },
        ],
      },
    },
  ];

  private onActionExecuted(e: CustomEvent) {
    console.log('onActionExecuted', e.detail);
  }

  private onFilterChanged(e: CustomEvent) {
    console.log('onFilterChanged', e.detail);
  }

  render() {
    return html`
        <style>
          :host {
            --mdc-theme-primary: #0070db;
            --mdc-theme-on-surface: #091e2e;
            --exmg-grid-active-color: red;
          }
        </style>
        <h1>With actions</h1>
        <exmg-grid-smart-toolbar
            amount-of-selected-items="1"
            .actions="${this.actions}"
            description="${this.description}"
            .filters="${this.filters}"
            @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
            @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exmg-grid-smart-toolbar>
        <h1>Without actions</h1>
        <exmg-grid-smart-toolbar
            amount-of-selected-items="1"
            description="${this.description}"
            .filters="${this.filters}"
            @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
            @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exmg-grid-smart-toolbar>
    `;
  }
}
