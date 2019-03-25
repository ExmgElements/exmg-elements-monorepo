import {ExmgQuerySelectors} from '../exmg-query-selectors';
import {EventDetailSortChange, SORT_DIRECTION} from '../exmg-grid';

export class ExmgColumnSortable {
  constructor(
    private querySelectors: ExmgQuerySelectors,
    private dispatchEvent: (event: Event) => boolean,
    private defaultSortColumn?: string,
    private defaultSortDirection?: SORT_DIRECTION,
  ) {}

  initFeature(): void {
    this.querySelectors.getColumns('th[data-sort]').forEach((column  => {
      const columnId = column.getAttribute('data-sort') || column.getAttribute('data-column-key')!;

      //  set default sort column if any
      if (!!this.defaultSortColumn && !!this.defaultSortDirection && this.defaultSortColumn === columnId) {
        column.setAttribute('data-sort-direction', this.defaultSortDirection);
      }

      this.registerListeners(column, columnId);
    }));
  }

  private registerListeners(column: HTMLTableCellElement, columnId: string): void {
    column.addEventListener('click', () => {
      const columnSortDirection = column.getAttribute('data-sort-direction');
      const nextSortDirection = columnSortDirection === 'ASC' ? 'DESC' : columnSortDirection === 'DESC' ? undefined : 'ASC';
      // reset previous
      this.querySelectors.getColumns('th[data-sort-direction=ASC], th[data-sort-direction=DESC]')
        .forEach(alreadySortedColumn => {
          if (alreadySortedColumn !== column) {
            alreadySortedColumn.removeAttribute('data-sort-direction');
          }
        });

      column.setAttribute('data-sort-direction', nextSortDirection || '');
      console.log('sortable clicked', columnId, nextSortDirection);
      this.fireSortChanged(columnId, nextSortDirection);
    });
  }

  private fireSortChanged(columnId: string, sortDirection?: SORT_DIRECTION): void {
    console.log('exmg-grid-sort-change', {columnId, sortDirection});
    this.dispatchEvent(new CustomEvent<EventDetailSortChange>(
      'exmg-grid-sort-change',
      {
        bubbles: true,
        composed: true,
        detail: {
          column: columnId,
          sortDirection: !!sortDirection ? sortDirection : undefined,
        },
      }
    ));
  }

}
