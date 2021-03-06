import {customElement, html, TemplateResult} from 'lit-element';
import {
  ActionAmountSelectedItemsCondition,
  ActionWithCondition,
  ActionConditionType,
} from '../src/table/types/exmg-grid-smart-toolbar-types';
import '../src/table/exmg-grid-smart-toolbar.js';
import '../src/table/exmg-grid-smart-toolbar.js';
import {repeat} from 'lit-html/directives/repeat';
import {ExmgBaseGridDemo} from './exmg-base-grid-demo';
import '../src/table/exmg-grid';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';
import {style as demoStyles} from './styles/demo-styles';

@customElement('search-toolbar-demo')
export class SearchToolbarDemo extends ExmgBaseGridDemo {
  static styles = [demoStyles, tableStyles];
  protected actions: ActionWithCondition<ActionAmountSelectedItemsCondition>[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 0,
      },
    },
    {
      id: 'merge',
      text: '',
      tooltip: 'Merge',
      icon: 'merge_type',
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 1,
      },
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
      condition: {
        type: ActionConditionType.AmountOfSelectedItemsRange,
        min: 2,
      },
    },
  ];

  private description = 'Table 1';

  private renderTableBody() {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
          </tr>
        `;
      },
    );
  }

  render(): TemplateResult {
    return html`
      <style>
        :host {
          --mdc-theme-primary: #0071dc;
          --exmg-theme-grid-setting-checkbox-bg-color: #0071dc;
          --exmg-theme-table-toolbar-setting-list-item-active-bg-color: #0071dc;
          --exmg-theme-table-toolbar-background-color: none;
          --exmg-theme-table-surface: none;
          --exmg-theme-table-pagination-bg-color: none;

          padding: 10px;
          display: block;
          background-color: #f6f6f6;
          height: 100vh;
        }

        table {
          background: white;
        }
      </style>
      <button class="demo-button" @click="${this.toggleMonthColumn}">Toggle Month</button>
      <h1>With search</h1>

      <br /><br /><br />
      <exmg-grid .items="${this.items}" .hiddenColumnNames="${this.hiddenColumns}">
        <exmg-grid-smart-toolbar
          searchEnabled
          searchPlaceholder="Search for income by month or year"
          .actions="${this.actions}"
          description="${this.description}"
          .filters="${this.filters}"
          show-column-filter
          .columnFilterColumns="${this.columns}"
          @exmg-grid-toolbar-action-executed="${this.onActionExecuted}"
          @exmg-grid-toolbar-filter-changed="${this.onFilterChanged}"
          @exmg-grid-toolbar-setting-changed="${this.onSettingChanged}"
          @exmg-grid-toolbar-search-changed="${this.onSearchChanged}"
        ></exmg-grid-smart-toolbar>
        <table>
          <thead>
            <tr class="grid-columns">
              <th><span>ID</span></th>
              <th data-column-key="month"><span>Month</span></th>
              <th data-column-key="year" class="grid-col-number"><span>Year</span></th>
              <th data-column-key="amount" class="grid-col-number"><span>Income</span></th>
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
          item-count="${this.getTotalCount()}"
          @exmg-grid-pagination-page-changed="${this.onPageChange}"
          @exmg-grid-pagination-page-size-changed="${this.onPageSizeChange}"
        >
        </exmg-grid-pagination>
      </exmg-grid>
    `;
  }
}
