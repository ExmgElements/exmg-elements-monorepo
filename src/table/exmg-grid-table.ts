import {property, customElement, html, LitElement} from 'lit-element';
// import {repeat} from 'lit-html/directives/repeat';
import {style as exmgGridTableStyles} from './exmg-grid-table-styles';

@customElement('exmg-grid-table')
export class ExmgRadioGroup extends LitElement {
  static styles = [
    exmgGridTableStyles,
  ];

  @property({type: Object})
  items: object[] = [];

  @property({type: Boolean})
  sortable: boolean = true;

  @property({type: Boolean})
  selectable: boolean = true;

  private selectedRows: HTMLTableRowElement[] = [];

  private allCheckbox?: HTMLInputElement;

  protected firstUpdated(): void {
    const table = this.shadowRoot!.host.querySelector<HTMLTableElement>('table')!;
    if (this.sortable) {
      table.querySelectorAll<HTMLTableHeaderCellElement>('th[sort]')!.forEach((column  => {
        const columnId = column.getAttribute('sort');
        console.log('sortable', column);
        column.addEventListener('click', () => {
          const columnSortDirection = column.getAttribute('data-sort-direction');
          const nextSortDirection = columnSortDirection === 'ASC' ? 'DESC' : columnSortDirection === 'DESC' ? '' : 'ASC';
          column.setAttribute('data-sort-direction', nextSortDirection);
          console.log('sortable clicked', columnId, nextSortDirection);
          // fire event!
        });
      }));
    }

    if (this.selectable) {
      const checkboxTemplate = html`<input class="selection-checkbox" type="checkbox" />`;
      const rowColumns = table.querySelector('thead tr:last-child');
      if (rowColumns) {
        const th = document.createElement('th');
        th.innerHTML = checkboxTemplate.getHTML();
        rowColumns.prepend(th);
        this.allCheckbox = th.querySelector<HTMLInputElement>('.selection-checkbox')!;
        this.allCheckbox.addEventListener('change', () => {
          if (this.allCheckbox!.checked) {
            table.querySelectorAll<HTMLTableRowElement>('tbody tr').forEach(row => {
              row.setAttribute('data-selected', '');
              this.selectedRows.push(row);
            });
            table.querySelectorAll<HTMLInputElement>('tbody .selection-checkbox').forEach(checkbox => {
              checkbox.setAttribute('checked', 'checked');
              checkbox.checked = true;
            });
          } else {
            this.selectedRows = [];
            table.querySelectorAll<HTMLTableRowElement>('tbody tr').forEach(row => {
              row.removeAttribute('data-selected');
            });
            table.querySelectorAll<HTMLInputElement>('tbody .selection-checkbox').forEach(checkbox => {
              checkbox.removeAttribute('checked');
              checkbox.checked = false;
            });
          }
        });
      }

      console.log('last row columns', rowColumns);
      table.querySelectorAll<HTMLTableRowElement>('tbody tr')!.forEach((row => {
        console.log('row', row);
        const td = document.createElement('td');
        td.innerHTML = checkboxTemplate.getHTML();
        row.prepend(td);

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
              checkbox.removeAttribute('checked');
              checkbox.checked = false;
            } else {
              checkbox.setAttribute('checked', 'checked');
              checkbox.checked = true;
            }
          }

          if (this.allCheckbox && !this.allCheckbox.checked && this.selectedRows.length === table.querySelectorAll('tbody tr').length) {
            this.allCheckbox.setAttribute('checked', 'checked');
            this.allCheckbox.checked = true;
          } else if (this.allCheckbox && this.allCheckbox.checked && this.selectedRows.length < table.querySelectorAll('tbody tr').length) {
            this.allCheckbox.removeAttribute('checked');
            this.allCheckbox.checked = false;
          }
          console.log('row clicked', isRowAlreadySelected, this.selectedRows);
        });
      }));
    }
  }

  protected updated(): void {

  }

  render() {
    return html`
      <div>
        Here is table
        <slot></slot>
      </div>
    `;
  }
}
