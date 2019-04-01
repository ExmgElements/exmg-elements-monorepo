import {html, customElement, TemplateResult, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-checkbox';

import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';
import '../src/table/exmg-grid-smart-toolbar';
import {demoStyles} from './demo-styles';

import {createIcon} from './exmg-icons';
import {DEFAULT_SORT_COLUMN, DEFAULT_SORT_DIRECTION, ExmgBaseGridDemo} from './exmg-base-grid-demo';

@customElement('demo-complex-grid')
export class ExmgComplexGrid extends ExmgBaseGridDemo {
  static styles = [
    tableStyles,
    demoStyles,
    // language=CSS
    css`
      :host {
        --mdc-theme-primary: #0070db;
        --mdc-theme-on-surface: #091e2e;
        --exmg-grid-active-color: #e1f0fe;
        --exmg-filter-background-color: #B8DDFE;
      }
    `,
  ];

  constructor() {
    super();
    this.selectedRowIds = this.items.slice(0, 3)
      .map(({id}) => id.toString())
      .reduce((acc, item: string) => ({...acc, [item]: true}), {});
    this.expandedRowIds = this.items.slice(3, 5)
      .map(({id}) => id.toString())
      .reduce((acc, item: string) => ({...acc, [item]: true}), {});
  }

  private renderTableBody() {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td><paper-checkbox class="selectable-checkbox"></paper-checkbox></td>
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td>${i.year}</td>
            <td>${i.amount}</td>
            <td class="grid-cell-visible-on-hover"><span class="expandable-toggle">${createIcon}</span></td>
          </tr>
          <tr class="grid-row-detail" data-row-detail-key="${i.id}">
            <td data-auto-colspan>
              <p>Here is expanded content for row id <b>${i.id}</b></p>
              <button class="demo-button" @click="${() => this.collapseRow(i.id.toString())}">Done</button>
            </td>
          </tr>
        `;
      }
    );
  }

  protected render(): TemplateResult | void {
    return html`
      <div>
        <button class="demo-button" @click="${this.toggleMonthColumn}">Toggle Month</button>
        <button class="demo-button" @click="${this.toggleYearColumn}">Toggle Year</button>
        <button class="demo-button" @click="${this.refreshTable}">Refresh Table</button>
        <button class="demo-button" @click="${this.expandFirstRows}">Expand first Rows</button>
        <button class="demo-button" @click="${this.collapseFirstRows}">Collapse first Rows</button>
        <button class="demo-button" @click="${this.selectFirstRows}">Select first rows</button>
        <button class="demo-button" @click="${this.unSelectFirstRows}">Unselect first rows</button>
      </div>
      <h1>Complex table with sortable columns</h1>
      <ul>
        <li>default sort column</li>
        <li>preselected rows</li>
        <li>expanded rows</li>
      </ul>
      <exmg-grid
        .items="${this.items}"
        .hiddenColumnNames="${this.hiddenColumns}"
        .expandedRowIds="${this.expandedRowIds}"
        .selectedRowIds="${this.selectedRowIds}"
        selectable-checkbox-selector=".selectable-checkbox"
        ?rows-selectable="${true}"
        expandable-toggle-selector=".expandable-toggle"
        @exmg-grid-selected-rows-change="${this.onSelectedRowsChange}"
        default-sort-column="${DEFAULT_SORT_COLUMN}"
        default-sort-direction="${DEFAULT_SORT_DIRECTION}"
        ?sortable="${true}"
        @exmg-grid-sort-change="${this.onSortChange}"
      >
        <table>
          <thead>
           <tr class="grid-toolbar">
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
             <th width="5%"><paper-checkbox class="selectable-checkbox"></paper-checkbox></th>
             <th>ID</th>
             <th data-column-key="month" data-sort>Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th data-column-key="amount" data-sort="">Income</th>
             <th></th>
           </tr>
          </thead>
          <tbody class="grid-data">
            ${this.renderTableBody()}
          </tbody>
          <tfoot>
           <tr>
             <td data-auto-colspan>
               <exmg-grid-pagination
                 page-index=${this.pageIndex}
                 page-size=${this.pageSize}
                 .pageSizeOptions="${[10, 20, 30, 50, 100]}"
                 item-count="${this.getTotalCount()}"
                 @exmg-grid-pagination-page-changed="${this.onPageChange}"
                 @exmg-grid-pagination-page-size-changed="${this.onPageSizeChange}"
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
