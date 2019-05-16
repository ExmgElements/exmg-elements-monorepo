import {html, customElement, TemplateResult, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-checkbox';
import '@exmg/exmg-paper-combobox';
import '@polymer/paper-item';
import '@material/mwc-icon';
import '@exmg/exmg-button';

import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';
import '../src/table/exmg-grid-base-toolbar';
import {style as demoStyles} from './styles/demo-styles';

import {createIcon} from './exmg-icons';
import {DEFAULT_SORT_COLUMN, DEFAULT_SORT_DIRECTION, ExmgBaseGridDemo} from './exmg-base-grid-demo';

@customElement('demo-complex-grid-with-slotted-toolbar')
export class ExmgComplexGridWithSlottedToolbar extends ExmgBaseGridDemo {
  static styles = [
    tableStyles,
    demoStyles,
    // language=CSS
    css`
      :host {
        --mdc-theme-primary: #0070db;
        --mdc-theme-on-surface: #091e2e;
        --exmg-grid-toolbar-active-bg-color: #e1f0fe;
        --exmg-grid-toolbar-filter-item-active-bg-color: #B8DDFE;
        --exmg-grid-pagination-bg-color: #4A4A4A;
        --exmg-grid-pagination-color: #ffffff;
      }
      table {
        --exmg-table-color: #000;
        --exmg-table-card-background-color: #4A4A4A;
        --exmg-table-border-color: white;
        --exmg-table-row-divider-color: white;
        --exmg-table-row-selected-color: white;
        --exmg-table-row-selected-background-color: #850E13;
        --exmg-table-row-hover-color: white;
        --exmg-table-row-hover-background-color: #B42636;
        --exmg-table-row-dragged-background-color: #f1f1f1;
        --exmg-table-th-color: #0071dc;
        --exmg-table-columns-background-color: #4A4A4A;
        --exmg-table-th-sortable-hover-color: #0092FF;
      }
      table .expandable-toggle > svg {
        fill: white;
      }
    `,
  ];

  private renderTableBody() {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td class="grid-checkbox-cell"><paper-checkbox class="selectable-checkbox"></paper-checkbox></td>
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
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
      <h1>Complex table with slotted toolbar and custom styles</h1>
      <ul>
        <li>Some custom styles</li>
        <li>Implemented toolbar with slots exmg-grid-base-toolbar</li>
        <li>auto table layout</li>
      </ul>
      <exmg-grid
        table-layout="auto"
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
        <exmg-grid-base-toolbar slot="toolbar">
          <div slot="actions">
            ${this.selectedRows.length ? html`<exmg-button
              class="action"
              title="Merge"
              @click="${this.onActionDelegate('merge')}"
            >
              <mwc-icon>merge_type</mwc-icon>
                Merge
            </exmg-button>` : null}
          </div>
          <div slot="description">Income table</div>
          <div slot="filters">
            <exmg-paper-combobox
              attr-for-selected="data-id"
              selected="all"
              @exmg-combobox-select="${this.onFilterChangedComboboxDelegate('month')}"
            >
              <paper-item data-id="all">Month: All</paper-item>
              <paper-item data-id="january">Month: January</paper-item>
              <paper-item data-id="february">Month: February</paper-item>
              <paper-item data-id="march">Month: March</paper-item>
            </exmg-paper-combobox>
          </div>
        </exmg-grid-base-toolbar>
        <table>
          <thead>
           <tr class="grid-columns">
             <th class="grid-checkbox-cell"><paper-checkbox class="selectable-checkbox"></paper-checkbox></th>
             <th><span>ID</span></th>
             <th data-column-key="month" data-sort><span>Month</span></th>
             <th class="grid-col-number" data-column-key="year" data-sort><span>Year</span></th>
             <th class="grid-col-number" data-column-key="amount" data-sort=""><span>Income</span></th>
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
       >
       </exmg-grid-pagination>
      </exmg-grid>
`;
  }
}
