import {html, customElement, TemplateResult, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-checkbox';
import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

import {dragIcon, expandIcon} from './exmg-icons';
import '../src/table/exmg-grid-smart-toolbar';
import {ExmgBaseGridDemo} from './exmg-base-grid-demo';
import {style as demoStyles} from './styles/demo-styles';
import {style as themeStyles} from './styles/dynamic-theme';

@customElement('demo-complex-grid-sortable')
export class ExmgComplexGridWithSortableRows extends ExmgBaseGridDemo {
  static styles = [
    themeStyles,
    tableStyles,
    demoStyles,
    // language=CSS
    css`
      exmg-grid {
        --exmg-table-card-width: 800px;
        --exmg-table-width: 900px;
      }
    `,
  ];

  constructor() {
    super();
  }

  private renderTableBody() {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td><paper-checkbox class="selectable-checkbox"></paper-checkbox></td>
            <td><span class="grid-row-drag-handler">${dragIcon}</span></td>
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
            <td class="grid-cell-visible-on-hover"><span class="expandable-toggle grid-icon-rotate">${expandIcon}</span></td>
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
        <button class="demo-button" @click="${this.toggleTheme}">Toggle theme</button>
      </div>
      <h1>Complex table with sortable rows</h1>
      <h2>Current theme ${this.theme}</h2>
      <exmg-grid
         data-theme="${this.theme}"
        .items="${this.items}"
        .hiddenColumnNames="${this.hiddenColumns}"
        .expandedRowIds="${this.expandedRowIds}"
        .selectedRowIds="${this.selectedRowIds}"
        ?rows-sortable="${true}"
        selectable-checkbox-selector=".selectable-checkbox"
        ?rows-selectable="${true}"
        expandable-toggle-selector=".expandable-toggle"
        @exmg-grid-rows-order-changed="${this.onRowsOrderChanged}"
        @exmg-grid-selected-rows-change="${this.onSelectedRowsChange}"
      >
        <exmg-grid-smart-toolbar
            slot="toolbar"
            amount-of-selected-items="${this.selectedRows.length}"
            .actions="${this.actions}"
            description="Income table"
            .filters="${this.filters}"
            @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
            @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exmg-grid-smart-toolbar>
        <table>
          <thead>
           <tr class="grid-columns">
             <th width="5%"><paper-checkbox class="selectable-checkbox"></paper-checkbox></th>
             <th width="5%"></th>
             <th title="ID">ID</th>
             <th title="Month" data-column-key="month">Month</th>
             <th class="grid-col-number" title="Year" data-column-key="year">Year</th>
             <th class="grid-col-number" title="Income">Income</th>
             <th></th>
           </tr>
          </thead>
          <tbody class="grid-data">
            ${this.renderTableBody()}
          </tbody>
        </table>
        <exmg-grid-pagination
          slot="pagination"
          page-index=${this.pageIndex}
          page-size=${this.pageSize}
          .pageSizeOptions="${[10, 20, 30, 50, 100]}"
          item-count="${this.getTotalCount()}"
          @exmg-grid-pagination-page-changed="${this.onPageChange}"
          @exmg-grid-pagination-page-size-changed="${this.onPageSizeChange}"
         ></exmg-grid-pagination>
      </exmg-grid>
`;
  }
}
