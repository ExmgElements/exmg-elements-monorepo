import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

import {dragIcon} from './exmg-icons';
import '../src/table/exmg-grid-smart-toolbar';
import {
  ActionAmountSelectedItemsCondition,
  ActionConditionType,
  ActionWithCondition
} from '../src/table/exmg-grid-smart-toolbar-types';
import {Filter, FilterConfigType, FilterSingleSelectConfig} from '../src/table/exmg-grid-toolbar-types';
import {EventDetailSelectedRowsChange, EventDetailSortChange} from '../src/table/exmg-grid';

type Income = {
  id: number;
  month: string;
  amount: number;
  year: number;
};

const generateRows = (length: number = 50, startId: number = 1): Income[] => {
  const source: Income[] = [
    {id: 1, month: 'January', amount: 1, year: 2000},
    {id: 2, month: 'February', amount: 2, year: 2000},
    {id: 3, month: 'March', amount: 3, year: 2000},
  ];

  const rows: Income[] = [];
  let id: number = startId;
  while (rows.length < length) {
    id = id + 1;
    const items = source.map(it => {
      id = id + 1;
      return {...it, id};
    });
    rows.push(...items);
  }

  return rows;
};

const allItems: Income[] = generateRows(500);

const getItemByPage = (pageIndex: number, pageSize: number): Income[] => {
  const startIndex: number = pageIndex * pageSize;
  const endIndex: number = Math.min(startIndex + pageSize, allItems.length);
  return allItems.slice(startIndex, endIndex);
};

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends LitElement {
  static styles = [tableStyles];

  @property({type: Object})
  items: Income[] = getItemByPage(0, 10);

  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 10;

  @property({type: Object})
  private hiddenColumns: Record<string, string> = {};

  @property({type: Boolean})
  private selectable: boolean = true;

  @property({type: Array})
  private selectedRows: any[] = [];

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
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 1,
        max: 10,
      },
    },
  ];

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

  private toggleMonthColumn(event: Event) {
    event.preventDefault();
    const {month, ...rest} = this.hiddenColumns;
    this.hiddenColumns = month ? {...rest} : {...rest, month: 'month'};
  }

  private toggleYearColumn(event: Event) {
    event.preventDefault();
    const {year, ...rest} = this.hiddenColumns;
    this.hiddenColumns = year ? {...rest} : {...rest, year: 'year'};
  }

  private toggleSelectable(event: Event) {
    event.preventDefault();
    this.selectable = !this.selectable;
  }

  private loadMore(event: Event): void {
    event.preventDefault();
    this.items = [...this.items, ...generateRows(10, this.items.length + 1)];
  }

  private updateItems(event: CustomEvent): void {
    console.log('on update items', event);
    this.items = [...event.detail.items];
  }

  private onSelectedRowsChange(event: CustomEvent<EventDetailSelectedRowsChange>) {
    console.log('rows selected', event);
    this.selectedRows = event.detail.rows;
  }

  private onSortChange(event: CustomEvent<EventDetailSortChange>): void {
    console.log('onSortChange', event);
  }

  private onPageChange(event: CustomEvent) {
    this.pageIndex = event.detail.page;
    this.items = getItemByPage(this.pageIndex, this.pageSize);
  }

  private onPageSizeChange(event: CustomEvent) {
    this.pageIndex = 0;
    this.pageSize = event.detail.pageSize;
    this.items = getItemByPage(this.pageIndex, this.pageSize);
  }

  private renderTableBody(sortableRow: boolean) {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            ${sortableRow ? html`<td class="handle"><span class="row-drag-handler">${dragIcon}</span></td>` : null}
            <td><paper-checkbox></paper-checkbox></td>
            <td>${i.month}</td>
            <td>${i.year}</td>
            <td>${i.amount}</td>
            <td></td>
          </tr>
          <tr class="row-detail" style="display: none">
            <td colspan="5">Expandable</td>
          </tr>
        `;
      }
    );
  }

  protected render(): TemplateResult | void {
    return html`
      <style>
        :host {
          --mdc-theme-primary: #0070db;
          --mdc-theme-on-surface: #091e2e;
          --exmg-grid-active-color: #e1f0fe;
        }
      </style>
      <div>
        <button @click="${this.toggleMonthColumn}">Hide Month</button>
        <button @click="${this.toggleYearColumn}">Hide Year</button>
        <button @click="${this.toggleSelectable}">Toggle selectable</button>
        <button @click="${this.loadMore}">Load More</button>
      </div>
      <h1>Sortable rows table</h1>
      <exmg-grid
        .items=${this.items}
        .hiddenColumnNames="${this.hiddenColumns}"
        ?selectable="${true}"
        ?sortable="${false}"
        ?rows-sortable="${true}"
        @exmg-grid-update-items="${this.updateItems}"
        @exmg-grid-selected-rows-change="${this.onSelectedRowsChange}"
        @exmg-grid-sort-change="${this.onSortChange}"
      >
        <table role="grid" aria-labelledby="grid1Label" class="data">
          <thead>
           <tr>
             <th colspan="6">
              <exmg-grid-smart-toolbar
                  amount-of-selected-items="${this.selectedRows.length}"
                  .actions="${this.actions}"
                  description="Income table"
                  .filters="${this.filters}"
                  @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
                  @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
              ></exmg-grid-smart-toolbar>
             </th>
           </tr>
           <tr class="columns">
             <th></th>
             <th></th>
             <th data-column-key="month" data-sort="month">Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th>Income</th>
           </tr>
          </thead>
          <tbody class="data">
            ${this.renderTableBody(true)}
          </tbody>
          <tfoot>
           <tr>
             <td colspan=”5”>
               <exmg-grid-pagination
                 page-index=${this.pageIndex}
                 page-size=${this.pageSize}
                 item-count="${allItems.length}"
                 @exmg-grid-page-changed="${this.onPageChange}"
                 @exmg-grid-page-size-changed="${this.onPageSizeChange}"
               >
               </exmg-grid-pagination>
             </td>
           </tr>
          </tfoot>
        </table>
      </exmg-grid>

      <h1>Sortable columns table</h1>
      <exmg-grid
        .items=${this.items}
        .hiddenColumnNames="${this.hiddenColumns}"
        ?selectable="${true}"
        ?sortable="${true}"
      >
        <table role="grid" aria-labelledby="grid1Label" class="data">
          <thead>
           <tr class="columns">
             <th></th>
             <th data-column-key="month" data-sort>Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th>Income</th>
           </tr>
          </thead>
          <tbody class="data">
            ${this.renderTableBody(false)}
          </tbody>
          <tfoot>
           <tr>
             <td colspan=”2”>
               <exmg-grid-pagination
                 page-index=${this.pageIndex}
                 page-size=${this.pageSize}
                 item-count="${10}"
               >
               </exmg-grid-pagination>
             </td>
           </tr>
          </tfoot>
        </table>
      </exmg-grid>
`;
  }
}
