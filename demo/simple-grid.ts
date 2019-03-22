import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

import {dragIcon, arrowUpward} from './exmg-icons';
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
  let id: number = startId - 1;
  while (rows.length < length) {
    const items = source.map(it => {
      id = id + 1;
      return {...it, id};
    });
    rows.push(...items);
  }

  return rows.slice(0, length);
};

const allItems: Income[] = generateRows(4);

const DEFAULT_SORT_COLUMN = 'amount';
const DEFAULT_SORT_DIRECTION = 'ASC';

const getItemByPage = (pageIndex: number, pageSize: number): Income[] => {
  const startIndex: number = pageIndex * pageSize;
  const endIndex: number = Math.min(startIndex + pageSize, allItems.length);
  return allItems.slice(startIndex, endIndex);
};

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends LitElement {
  static styles = [tableStyles];

  @property({type: Object})
  items: Income[];

  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 10;

  @property({type: Object})
  private hiddenColumns: Record<string, string> = {};

  @property({type: Array})
  private selectedRows: any[] = [];

  @property({type: Object})
  private expandedRowIds: Record<string, boolean> = {};

  @property({type: Object})
  private selectedRowIds: Record<string, boolean> = {};

  constructor() {
    super();
    this.sortItems(DEFAULT_SORT_COLUMN, DEFAULT_SORT_DIRECTION);
    this.items = getItemByPage(this.pageIndex, this.pageSize);
  }

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

  private refreshTable() {
    const copy = [...this.items];
    this.items = [];
    setTimeout(() => {
      console.log('refreshing table');
      this.items = copy;
    });
  }

  private createRowIdToStateMap(state: boolean, start: number = 0, end: number = 3): Record<string, boolean> {
    return this.items.slice(start, end).reduce((acc, it) => ({...acc, [it.id.toString()]: state}), {});
  }

  private collapseRow(rowId: string) {
    this.expandedRowIds = {[rowId]: false};
  }

  private expandFirstRows() {
    this.expandedRowIds = this.createRowIdToStateMap(true);
  }

  private collapseFirstRows() {
    this.expandedRowIds = this.createRowIdToStateMap(false);
  }

  private selectFirstRows() {
    this.selectedRowIds = this.createRowIdToStateMap(true);
  }

  private unSelectFirstRows() {
    this.selectedRowIds = this.createRowIdToStateMap(false);
  }

  private updateItems(event: CustomEvent): void {
    console.log('on update items', event);
    this.items = [...event.detail.items];
  }

  private onSelectedRowsChange(event: CustomEvent<EventDetailSelectedRowsChange>) {
    console.log('rows selected', event);
    this.selectedRows = event.detail.rows;
  }

  private sortItems(column: string, sortDirection?: 'ASC' | 'DESC'): void {
    if (!sortDirection) {
      // reset - sort by ID
      allItems.sort(({id: xId}, {id: yId}) => xId > yId ? 1 : xId < yId ? -1 : 0);
    } else {
      const comparisonValue = sortDirection === 'ASC' ? 1 : -1;
      allItems.sort((x: Record<string, any>, y: Record<string, any>) => {
        const xValue = x[column];
        const yValue = y[column];
        return xValue > yValue ? comparisonValue : xValue < yValue ? (comparisonValue * -1) : 0;
      });
    }
  }

  private onSortChange(event: CustomEvent<EventDetailSortChange>): void {
    console.log('onSortChange', event);
    const {column, sortDirection} = event.detail;
    this.sortItems(column, sortDirection);
    this.pageIndex = 0;
    this.items = getItemByPage(this.pageIndex, this.pageSize);
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
            <td><input class="selectable-checkbox" type="checkbox" checked="checked"/></td>
            ${sortableRow ? html`<td class="handle"><span class="row-drag-handler">${dragIcon}</span></td>` : html`<td></td>`}
            <td>${i.id}</td>
            <td>${i.month}</td>
            <td>${i.year}</td>
            <td>${i.amount}</td>
            <td><span class="expandable-toggle">${arrowUpward}</span></td>
          </tr>
          <tr class="grid-row-detail" data-row-detail-key="${i.id}">
            <td data-auto-colspan>
              <p>Here is expanded content for row id <b>${i.id}</b></p>
              <button @click="${() => this.collapseRow(i.id.toString())}">Done</button>
            </td>
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
        <button @click="${this.refreshTable}">Refresh Table</button>
        <button @click="${this.expandFirstRows}">Expand first Rows</button>
        <button @click="${this.collapseFirstRows}">Collapse first Rows</button>
        <button @click="${this.selectFirstRows}">Select first rows</button>
        <button @click="${this.unSelectFirstRows}">Select first rows</button>
      </div>
      <h1>Sortable rows table</h1>
      <exmg-grid
        .items=${this.items}
        .hiddenColumnNames="${this.hiddenColumns}"
        .expandedRowIds="${this.expandedRowIds}"
        .selectedRowIds="${this.selectedRowIds}"
        ?selectable="${true}"
        selectable-checkbox-selector="input.selectable-checkbox"
        ?sortable="${false}"
        ?rows-sortable="${true}"
        expandable-toggle-selector=".expandable-toggle"
        @exmg-grid-update-items="${this.updateItems}"
        @exmg-grid-selected-rows-change="${this.onSelectedRowsChange}"
      >
        <table role="grid" aria-labelledby="grid1Label" class="data">
          <thead>
           <tr>
             <th data-auto-colspan>
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
           <tr class="grid-columns">
             <th><input class="selectable-checkbox" type="checkbox" /></th>
             <th></th>
             <th>ID</th>
             <th data-column-key="month" data-sort="month">Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th>Income</th>
             <th></th>
           </tr>
          </thead>
          <tbody class="grid-data">
            ${this.renderTableBody(true)}
          </tbody>
          <tfoot>
           <tr>
             <td colspan="6">
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
        default-sort-column="${DEFAULT_SORT_COLUMN}"
        default-sort-direction="${DEFAULT_SORT_DIRECTION}"
        ?sortable="${true}"
        @exmg-grid-selected-rows-change="${this.onSelectedRowsChange}"
        @exmg-grid-sort-change="${this.onSortChange}"
      >
        <table role="grid" aria-labelledby="grid1Label" class="data">
          <thead>
           <tr class="grid-columns">
             <th></th>
             <th data-column-key="month" data-sort>Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th data-column-key="amount" data-sort>Income</th>
           </tr>
          </thead>
          <tbody class="grid-data">
            ${this.renderTableBody(false)}
          </tbody>
          <tfoot>
           <tr>
             <td colspan="6">
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
`;
  }
}
