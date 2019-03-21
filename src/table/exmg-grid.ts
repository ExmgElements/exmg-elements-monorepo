import {property, customElement, html, LitElement} from 'lit-element';
import {cache} from 'lit-html/directives/cache';
import '@exmg/exmg-sortable';
import {style as exmgGridTableStyles} from './exmg-grid-styles';

type GenericPropertyValues<T, V = unknown> = Map<T, V>;
type Props = Exclude<keyof ExmgGrid, number | Symbol>;

type SmartPropertyValue = GenericPropertyValues<Props>;

export type EventDetailSortChange = {
  column: string;
  sortDirection?: string;
};

export type EventDetailSelectedRowsChange = {
  rows: HTMLTableRowElement[];
};

const checkCheckbox = (checkboxElement: HTMLInputElement) => {
    checkboxElement.setAttribute('checked', 'checked');
    checkboxElement.checked = true;
};

const uncheckCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.removeAttribute('checked');
  checkboxElement.checked = false;
};

/**
 * @exmg-grid-sort-change
 * @exmg-grid-selected-rows-change
 * Questions:
 * - shall we keep selected items on page changed ?
 * - shall we keep selected items on filter changed ? probably not
 * Required
 * <table>
 *     <thead>
 *         <tr class="columns"><th /><tr/>
 *     </thead>
 *     <tbody class="data"><tbody>
 * </table>

 * TR -> TH - must have class ".columns"
 * TH:
 * [F] column manager
 * - data-column-key
 * [F]sortable:
 *  - data-sort
 *  - data-sort-direction?
 *  [F] ExpandedRow: Must have class ".row-detail"
 *  [F] Row sortable
 *  - hast to handle event @exmg-grid-update-items - event return updated order of items - consumer needs to reiterate tbody
 *  - handler element should has class `row-drag-handler`
 *  - element should use repeat function - it matter in terms of performance and will persist node's state properly like selected row
 */
@customElement('exmg-grid')
export class ExmgGrid extends LitElement {
  static styles = [
    exmgGridTableStyles,
  ];

  @property({type: Object})
  items: object[] = [];

  @property({type: Boolean, reflect: true})
  sortable: boolean = false;

  /**
   * Feature that turn on sort by column
   */
  @property({type: Boolean, reflect: true})
  selectable: boolean = false;

  /**
   * Feature that allow sort rows
   * If table table has turn on feature `selectable` then it takes precedence and `rowSelectable` will be ignored
   */
  @property({type: Boolean, reflect: true, attribute: 'rows-sortable'})
  rowsSelectable: boolean = false;

  /**
   * Map of column names that should be hidden
   */
  @property({type: Object})
  hiddenColumnNames: Record<string, string> = {};

  @property({type: Object})
  private tableBody?: HTMLTableSectionElement;

  private table?: HTMLTableElement;

  private selectedRows: HTMLTableRowElement[] = [];

  private allCheckbox?: HTMLInputElement;

  private componentReady: boolean = false;

  private getTable(): HTMLTableElement {
    if (!this.table) {
      throw new Error(`Element table not found. Slot hast to define <table>`);
    }
    return this.table!;
  }

  private getTableBody(): HTMLTableSectionElement {
    if (!this.tableBody) {
      throw new Error(`Element tbody not found. Slot hast to define <tbody class="data">`);
    }

    return this.tableBody!;
  }

  private getColumns(selector: string = 'th'): NodeListOf<HTMLTableHeaderCellElement> {
    return this.getTable().querySelectorAll<HTMLTableHeaderCellElement>(`.columns ${selector}`);
  }

  private canSortRows(): boolean {
    return !this.sortable && this.rowsSelectable;
  }

  private orderChange(e: CustomEvent): void {
    console.log('order change', e.detail);
    setTimeout(() => {
      console.log('order change', e.detail);
      const {sourceIndex, targetIndex} = e.detail;
      const items = [...this.items];
      const movedElement = items[sourceIndex];

      items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, movedElement);

      this.dispatchEvent(new CustomEvent('exmg-grid-update-items', {composed: true, bubbles: true, detail: {items}}));
    }, 0);
  }

  private updateColumnVisibility(previousHiddenColumnNames: Record<string, string> = {}): void {
    this.getColumns().forEach((column, index) => {
      const columnKey = column.getAttribute('data-column-key');
      if (columnKey && previousHiddenColumnNames[columnKey] !== this.hiddenColumnNames[columnKey]) {
        const nextDisplayValue = this.hiddenColumnNames[columnKey] ? 'none' : 'table-cell';
        column.style.display = nextDisplayValue;
        this.getTable().querySelectorAll<HTMLInputElement>(`tbody.data tr:not(.row-detail) td:nth-child(${index + 1})`)
          .forEach(cell => {
            cell.style.display = nextDisplayValue;
          });
      }
    });
  }

  private turnOnSortable(): void {
    this.getColumns('th[data-sort]').forEach((column  => {
      const columnId = column.getAttribute('data-sort') || column.getAttribute('data-column-key')!;
      column.addEventListener('click', () => {
        const columnSortDirection = column.getAttribute('data-sort-direction');
        const nextSortDirection = columnSortDirection === 'ASC' ? 'DESC' : columnSortDirection === 'DESC' ? '' : 'ASC';
        column.setAttribute('data-sort-direction', nextSortDirection);
        console.log('sortable clicked', columnId, nextSortDirection);
        this.fireSortChanged(columnId, nextSortDirection);
      });
    }));
  }

  private fireSortChanged(columnId: string, sortDirection: string): void {
    console.log('dispatch exmg-grid-selected-rows-change', this.selectedRows);
    this.dispatchEvent(new CustomEvent<EventDetailSortChange>(
      'exmg-grid-sort-change',
      {
        bubbles: true,
        composed: true,
        detail: {
          column: columnId,
          sortDirection: !sortDirection ? sortDirection : undefined,
        },
      }
    ));
  }

  private fireSelectableRows() {
    console.log('dispatch exmg-grid-selected-rows-change', this.selectedRows);
    this.dispatchEvent(new CustomEvent<EventDetailSelectedRowsChange>(
      'exmg-grid-selected-rows-change',
      {
        bubbles: true,
        composed: true,
        detail: {
          rows: [...this.selectedRows],
        },
      }
    ));
  }

  private turnOnSelectable(): void {
    const checkboxTemplate = html`<input class="selection-checkbox" type="checkbox" />`;
    const rowColumns = this.componentReady ? null : this.getTable().querySelector('tr.columns');
    if (rowColumns) {
      const th = document.createElement('th');
      th.setAttribute('class', 'selectable-cell');
      th.innerHTML = checkboxTemplate.getHTML();
      rowColumns.prepend(th);
      this.allCheckbox = th.querySelector<HTMLInputElement>('.selection-checkbox')!;
      this.allCheckbox.addEventListener('change', () => {
        if (this.allCheckbox!.checked) {
          this.getTableBody().querySelectorAll<HTMLTableRowElement>('tr:not(.row-detail)').forEach(row => {
            row.setAttribute('data-selected', '');
            this.selectedRows.push(row);
          });
          this.getTableBody().querySelectorAll<HTMLInputElement>('.selection-checkbox').forEach(checkbox => {
            checkCheckbox(checkbox);
          });
        } else {
          this.selectedRows = [];
          this.getTableBody().querySelectorAll<HTMLTableRowElement>('tr[data-selected]').forEach(row => {
            row.removeAttribute('data-selected');
          });
          this.getTableBody().querySelectorAll<HTMLInputElement>('.selection-checkbox').forEach(checkbox => {
            uncheckCheckbox(checkbox);
          });
        }
        this.fireSelectableRows();
      });
    }

    this.getTableBody().querySelectorAll<HTMLTableRowElement>('tr:not(.row-detail):not([data-is-selectable])')!.forEach((row => {
      const td = document.createElement('td');
      td.setAttribute('class', 'selectable-cell');
      td.innerHTML = checkboxTemplate.getHTML();
      row.prepend(td);
      row.setAttribute('data-is-selectable', '');

      row.addEventListener('click', (e: Event) => {
        const index = this.selectedRows.indexOf(row);
        const isRowAlreadySelected = index > -1;
        const checkbox = row.querySelector<HTMLInputElement>('.selection-checkbox');
        if (isRowAlreadySelected) {
          row.removeAttribute('data-selected');
          this.selectedRows.splice(index, 1);
        } else {
          row.setAttribute('data-selected', '');
          this.selectedRows.push(row);
        }

        if (checkbox && checkbox !== e.target) {
          if (isRowAlreadySelected) {
            uncheckCheckbox(checkbox);
          } else {
            checkCheckbox(checkbox);
          }
        }

        this.updateSelectAllCheckbox();
        console.log('row clicked', isRowAlreadySelected, this.selectedRows);
        this.fireSelectableRows();
      });
    }));
  }

  private updateSelectAllCheckbox(): void {
    const selectedRowsCount = this.selectedRows.length;
    if (this.allCheckbox) {
      if (!this.allCheckbox.checked && selectedRowsCount === this.getTableBody().querySelectorAll('tr').length) {
        checkCheckbox(this.allCheckbox);
      } else if (this.allCheckbox.checked && selectedRowsCount < this.getTableBody().querySelectorAll('tr').length) {
        uncheckCheckbox(this.allCheckbox);
      }
    }
  }

  protected async firstUpdated(changedProps: SmartPropertyValue): Promise<void> {
    const debug = Array.from(changedProps.keys()).map(key => ({key, oldV: changedProps.get(key), newV: this[key]}));
    console.log('FIRST changedProps', changedProps, debug);
    this.table = this.shadowRoot!.host.querySelector<HTMLTableElement>('table')!;
    this.tableBody = this.getTable().querySelector<HTMLTableSectionElement>('tbody.data')!;

    if (this.sortable) {
      this.turnOnSortable();
    }

    if (this.selectable) {
      this.turnOnSelectable();
    }

    await this.updateComplete;
    this.componentReady = true;
  }

  protected updated(changedProps: SmartPropertyValue): void {
    console.log('changedProps', changedProps);
    if (changedProps.has('hiddenColumnNames') || changedProps.has('items')) {
      this.updateColumnVisibility(changedProps.get('hiddenColumnNames') as Record<string, string>);
    }

    if (this.componentReady && changedProps.has('items')) {
      console.log('turn on sortable???');
      if (this.selectable) {
        this.turnOnSelectable();
        this.updateSelectAllCheckbox();
      }
    }
  }

  private renderWithoutSortable() {
    return html`<slot></slot>`;
  }

  private renderWithSortable() {
    return html`
        <exmg-sortable
          orientation="${'vertical'}"
          item-selector="tbody.data tr:not(.row-detail)"
          handle-selector=".row-drag-handler"
          .sortableHostNode="${this.tableBody}"
          @dom-order-change="${this.orderChange}"
        >
          <slot></slot>
        </exmg-sortable>
    `;
  }

  protected render() {
    return html`
      <div class="table-container">
        ${cache(this.canSortRows() ? this.renderWithSortable() : this.renderWithoutSortable())}
      </div>
    `;
  }
}
