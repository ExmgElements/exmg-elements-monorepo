import {html, customElement, TemplateResult} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '../src/table/exmg-grid';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';
import {style as exmgThemeStyles} from '../src/table/theme/exmg-theme-styles';

import {ExmgBaseGridDemo} from './exmg-base-grid-demo';

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends ExmgBaseGridDemo {
  static styles = [
    exmgThemeStyles,
    tableStyles,
  ];

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
      }
    );
  }

  protected render(): TemplateResult | void {
    return html`
      <h1>Simple table</h1>
      <h2>Exmg Theme</h2>
      <exmg-grid
        .items="${this.items}"
      >
        <table>
          <thead>
           <tr class="grid-columns">
             <th><span>ID</span></th>
             <th><span>Month</span></th>
             <th class="grid-col-number"><span>Year</span></th>
             <th class="grid-col-number"><span>Income</span></th>
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
