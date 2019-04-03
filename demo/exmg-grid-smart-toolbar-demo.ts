import {customElement, html, LitElement, property} from 'lit-element';
import {Filter, FilterSingleSelectConfig, FilterConfigType} from '../src/table/types/exmg-grid-toolbar-types';
import {
  ActionAmountSelectedItemsCondition,
  ActionWithCondition,
  ActionConditionType
} from '../src/table/types/exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-smart-toolbar-demo')
export class ExmgGridSmartToolbarDemo extends LitElement {
  private actions: ActionWithCondition<ActionAmountSelectedItemsCondition>[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 1,
      },
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
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 3,
      },
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

  @property({type: Number})
  private amountOfSelectedItems: number = 2;

  private onActionExecuted(e: CustomEvent) {
    console.log('onActionExecuted', e.detail);
  }

  private onFilterChanged(e: CustomEvent) {
    console.log('onFilterChanged', e.detail);
  }

  private updateSelectedItems() {
    this.amountOfSelectedItems = parseInt(this.shadowRoot!.querySelector<HTMLInputElement>('#amount-of-selected-items')!.value, 10);
  }

  render() {
    return html`
        <style>
          :host {
            --mdc-theme-primary: #0071dc;
            --mdc-theme-surface: #fff;
            --mdc-theme-on-surface: #02182B;
            --exmg-grid-active-color: #e2f1fe;

            padding: 10px;
            display: block;
            background-color: #f6f6f6;
          }
        </style>
        <h1>With actions</h1>
        <input id="amount-of-selected-items" value="${this.amountOfSelectedItems}">
        <button @click="${this.updateSelectedItems}">Update selected items</button>
        <hr>
        <exmg-grid-smart-toolbar
            amount-of-selected-items="${this.amountOfSelectedItems}"
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
