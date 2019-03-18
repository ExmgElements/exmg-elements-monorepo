import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import '../src/table/exmg-grid';
import '../src/table/exmg-grid-paging';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

type Income = {
  month: string;
  amount: number;
};

const generateRows = (): Income[] => {
  const source: Income[] = [
    {month: 'January', amount: 1},
    {month: 'February', amount: 2},
    {month: 'March', amount: 3},
  ];

  const rows: Income[] = [];
  while (rows.length < 1000) {
    rows.push(...source);
  }

  return rows;
};

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends LitElement {
  static styles = [tableStyles];

  @property({type: Object})
  items: Income[] = generateRows();

  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 10;

  private deleteItems(): void {
    // do nothing
  }

  protected render(): TemplateResult | void {
    return html`
      <exmg-grid>
        <table role="grid" aria-labelledby="grid1Label" class="data">
          <thead>
           <tr>
             <th colspan=”2”>
               <exmg-toolbar>
                 <div slot="actions">
                   <button @click=${this.deleteItems}>Delete Items</button>
                   <button>Move To Items</button>
                 </div>
                 <div slot="title">Monthly Income</div>
                 <div slot="filters"></div>
               </exmg-toolbar>
             </th>
           </tr>
           <tr class="columns">
             <th></th>
             <th sort="month">Month</th>
             <th>Income</th>
           </tr>
          </thead>
          <tbody>
           ${this.items.map(i => html`
                 <tr>
                   <td><paper-checkbox></paper-checkbox></td>
                   <td>${i.month}</td>
                   <td>${i.amount}</td>
                 </tr>
               `)}
          </tbody>
          <tfoot>
           <tr>
             <td colspan=”2”>
               <exmg-grid-paging
                 align-right
                 page-index=${this.pageIndex}
                 page-size=${this.pageSize}
                 total-pages="${10}"
               >
               </exmg-grid-paging>
             </td>
           </tr>
          </tfoot>
        </table>
      </exmg-grid>
`;
      }
}
