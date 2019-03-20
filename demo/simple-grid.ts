import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '../src/table/exmg-grid';
import '../src/table/exmg-grid-pagination';
import {style as tableStyles} from '../src/table/exmg-grid-styles';

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

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends LitElement {
  static styles = [tableStyles];

  @property({type: Object})
  items: Income[] = generateRows(20);

  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 10;

  @property({type: Object})
  private hiddenColumns: Record<string, string> = {};

  @property({type: Boolean})
  private selectable: boolean = true;

  private deleteItems(): void {
    // do nothing
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

  private renderTableBody() {
    return repeat(
      this.items,
      ({id}) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td class="handle"><span class="row-sortable-handler">MOVE</span></td>
            <td><paper-checkbox></paper-checkbox></td>
            <td>${i.month}</td>
            <td>${i.year}</td>
            <td>${i.amount}</td>
            <td></td>
          </tr>
          <tr class="row-detail" style="display: none;">
            <td colspan="3">Expandable</td>
          </tr>
        `;
      }
    );
  }

  protected render(): TemplateResult | void {
    return html`
      <div>
        <button @click="${this.toggleMonthColumn}">Hide Month</button>
        <button @click="${this.toggleYearColumn}">Hide Year</button>
        <button @click="${this.toggleSelectable}">Toggle selectable</button>
        <button @click="${this.loadMore}">Load More</button>
      </div>
      <exmg-grid
        .items=${this.items}
        .hiddenColumnNames="${this.hiddenColumns}"
        ?selectable="${false}"
        ?sortable="${false}"
        ?rows-sortable="${true}"
        @exmg-grid-update-items="${this.updateItems}"
      >
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
             <th></th>
             <th data-column-key="month" data-sort>Month</th>
             <th data-column-key="year" data-sort>Year</th>
             <th>Income</th>
           </tr>
          </thead>
          <tbody class="data">
            ${this.renderTableBody()}
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
