import {html, customElement, TemplateResult, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/paper-checkbox';
import '../src/table/exmg-grid.js';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

import '../src/table/exmg-grid-smart-toolbar';
import {ExmgBaseGridDemo} from './exmg-base-grid-demo';

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends ExmgBaseGridDemo {
  static styles = [
    tableStyles,
    css`
      :host {
        --mdc-theme-primary: #0070db;
        --mdc-theme-on-surface: #091e2e;
        --exmg-grid-active-color: #e1f0fe;
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
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td>${i.year}</td>
            <td>${i.amount}</td>
          </tr>
        `;
      }
    );
  }

  protected render(): TemplateResult | void {
    return html`
      <h1>Sortable rows table</h1>
      <exmg-grid
        .items=${this.items}
      >
        <table>
          <thead>
           <tr class="grid-columns">
             <th>ID</th>
             <th>Month</th>
             <th>Year</th>
             <th>Income</th>
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
