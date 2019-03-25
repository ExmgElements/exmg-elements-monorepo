import {ExmgQuerySelectors} from '../exmg-query-selectors';
import {EventDetailSelectedRowsChange} from '../exmg-grid';

const checkCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.setAttribute('checked', 'checked');
  checkboxElement.checked = true;
};

const uncheckCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.removeAttribute('checked');
  checkboxElement.checked = false;
};

export class ExmgRowSelectable {
  allCheckbox?: HTMLInputElement;

  selectedRows: HTMLTableRowElement[] = [];

  constructor(
    private querySelectors: ExmgQuerySelectors,
    private dispatchEvent: (event: Event) => boolean,
    private selectableCheckboxSelector?: string,
  ) {
  }

  initFeature(bodyRows: NodeListOf<HTMLTableRowElement>): void {
    const fireEvent = this.initAllCheckboxes();
    const fireEvent2 = this.initBodyCheckboxes();
    this.updateBodyRowsListeners(bodyRows);
    if (fireEvent || fireEvent2) {
      this.fireSelectableRows();
    }
  }

  updateFeature(bodyRows: NodeListOf<HTMLTableRowElement>): void {
    this.updateBodyRowsListeners(bodyRows);
    this.updateSelectAllCheckbox();
  }

  private updateBodyRowsListeners(bodyRows: NodeListOf<HTMLTableRowElement>): void {
    bodyRows.forEach((row => {
      row.setAttribute('data-is-selectable', '');

      row.addEventListener('click', (e: Event) => {
        const index = this.selectedRows.indexOf(row);
        const isRowAlreadySelected = index > -1;
        const tmpRow = isRowAlreadySelected ? this.selectedRows[index] : undefined;
        console.log('really clicked', {index, isRowAlreadySelected, tmpRow, selectedRows: [...this.selectedRows]});
        if (isRowAlreadySelected) {
          row.removeAttribute('data-selected');
          this.selectedRows.splice(index, 1);
        } else {
          row.setAttribute('data-selected', '');
          this.selectedRows.push(row);
        }

        const rowCheckbox = this.selectableCheckboxSelector && row.querySelector<HTMLInputElement>(this.selectableCheckboxSelector);
        if (rowCheckbox && rowCheckbox !== e.target) {
          if (isRowAlreadySelected) {
            uncheckCheckbox(rowCheckbox);
          } else {
            checkCheckbox(rowCheckbox);
          }
        }

        this.updateSelectAllCheckbox();
        console.log('row clicked', isRowAlreadySelected, this.selectedRows);
        this.fireSelectableRows();
      });
    }));
  }

  private initAllCheckboxes(): boolean {
    let fireEvent = false;
    this.allCheckbox = this.selectableCheckboxSelector ?
      this.querySelectors.getColumn<HTMLInputElement>(this.selectableCheckboxSelector) :
      undefined;

    if (this.allCheckbox) {
      if (this.allCheckbox.checked) {
        this.handleAllCheckboxStateChange();
        fireEvent = true;
      }

      this.allCheckbox.addEventListener('change', () => {
        this.handleAllCheckboxStateChange();
        this.fireSelectableRows();
      });
    }

    return fireEvent;
  }

  private initBodyCheckboxes(): boolean {
    let fireEvent = false;

    if (this.selectableCheckboxSelector && !(this.allCheckbox && this.allCheckbox.checked)) {
      this.selectedRows = [];
      const checkedCheckboxes = this.querySelectors.getTableBody()
        .querySelectorAll(`${this.selectableCheckboxSelector}[checked]`);
      checkedCheckboxes.forEach(checkedCheckbox => {
        const row = checkedCheckbox.closest('tr');
        if (row) {
          console.log(row);
          this.selectedRows.push(row);
          row.setAttribute('data-selected', '');
          fireEvent = true;
        }
      });

      if (this.allCheckbox && !this.allCheckbox.checked) {
        const bodyRows = this.querySelectors.getTableBody()
          .querySelectorAll<HTMLTableRowElement>('tr:not(.grid-row-detail):not([data-is-selectable])');

        if (bodyRows.length === checkedCheckboxes.length && bodyRows.length) {
          checkCheckbox(this.allCheckbox);
        }
      }
    }

    return fireEvent;
  }

  private getBodyCheckboxes(): HTMLInputElement[] {
    return this.selectableCheckboxSelector ?
      Array.from(this.querySelectors.getTableBody().querySelectorAll<HTMLInputElement>(this.selectableCheckboxSelector)) :
      [];
  }

  private handleAllCheckboxStateChange(): void {
    if (this.allCheckbox!.checked) {
      this.selectedRows = [];
      this.querySelectors.getBodyRows().forEach(row => {
        row.setAttribute('data-selected', '');
        this.selectedRows.push(row);
      });
      this.getBodyCheckboxes().forEach(checkbox => {
        checkCheckbox(checkbox);
      });
    } else {
      this.selectedRows = [];
      this.querySelectors.getTableBody().querySelectorAll<HTMLTableRowElement>('tr[data-selected]').forEach(row => {
        row.removeAttribute('data-selected');
      });
      this.getBodyCheckboxes().forEach(checkbox => {
        uncheckCheckbox(checkbox);
      });
    }
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

  private updateSelectAllCheckbox(): void {
    const selectedRowsCount = this.selectedRows.length;
    if (this.allCheckbox) {
      if (!this.allCheckbox.checked && selectedRowsCount === this.querySelectors.getBodyRows().length) {
        checkCheckbox(this.allCheckbox);
      } else if (this.allCheckbox.checked && selectedRowsCount < this.querySelectors.getBodyRows().length) {
        uncheckCheckbox(this.allCheckbox);
      }
    }
  }
}
