import {LitElement, html, customElement} from 'lit-element';
import {Filter, FilterType, FilterSingleSelectExtraOptions} from '../src/table/exmg-grid-toolbar-types';
import {ActionAmountSelectedItemsCondition, ActionWithCondition} from '../src/table/exmg-grid-smart-toolbar-types';

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

  private filters: Filter<FilterSingleSelectExtraOptions>[] = [
    {
      id: 'status',
      type: FilterType.SingleSelect,
      name: 'Status',
      extraOptions: {
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
        <exmg-grid-smart-toolbar
            amount-of-selected-items="1"
            .actions="${this.actions}"
            description="${this.description}"
            .filters="${this.filters}"
            @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
            @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exmg-grid-smart-toolbar>
    `;
  }
}
