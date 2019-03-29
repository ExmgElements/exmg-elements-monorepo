export type SORT_DIRECTION = 'ASC' | 'DESC';

export type EventDetailSortChange = {
  column: string;
  sortDirection?: SORT_DIRECTION;
};

export type EventDetailSelectedRowsChange = {
  rows: HTMLTableRowElement[];
};
