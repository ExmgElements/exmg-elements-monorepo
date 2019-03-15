import {LitElement, html, customElement} from 'lit-element';
import {Action, Filter, FilterType, SingleSelectFilterExtraOptions} from '../src/table/exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar-demo')
export class ExmgGridToolbarDemo extends LitElement {
  private actions: Action[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
    },
  ];

  private tableTitle: string = 'Table 1';

  private filters: Filter<SingleSelectFilterExtraOptions>[] = [
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
        <exmg-grid-toolbar
            .actions="${this.actions}"
            title="${this.tableTitle}"
            .filters="${this.filters}"
            @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
            @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exmg-grid-toolbar>
    `;
  }
}
