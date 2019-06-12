import {LitElement} from 'lit-element';
import {EventDetailSelectedRowsChange, EventDetailSortChange} from '../src/table/types/exmg-grid-types';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

type OnEventType = <T extends Event = CustomEvent>(
  eventName: string,
) => (element: LitElement, shouldResolve: boolean) => Promise<T>;

const onEvent: OnEventType = (eventName: string) => (element: LitElement, shouldResolve: boolean) =>
  new Promise<any>((resolve, reject) => {
    element.addEventListener(eventName, (event: Event) => (shouldResolve ? resolve(event) : reject(event)));
  });

interface EventListenerResult<T extends Event = Event> {
  flush: () => T[];
  unsubscribe: () => void;
}

const onEventListener = <T extends Event = CustomEvent>(eventName: string) => (
  element: LitElement,
): EventListenerResult<T> => {
  let results: T[] = [];
  const handler = (event: Event) => results.push(event as T);
  element.addEventListener(eventName, handler);

  return {
    flush: () => {
      const resultsToFlush = results;
      results = [];
      return resultsToFlush;
    },
    unsubscribe: () => element.removeEventListener(eventName, handler),
  };
};

export const onExmgGridToolbarActionExecuted = onEvent('exmg-grid-toolbar-action-executed');

export const onExmgGridToolbarFilterChanged = onEvent('exmg-grid-toolbar-filter-changed');

export const onExmgGridPaginationPageChanged = onEvent('exmg-grid-pagination-page-changed');

export const onExmgGridPaginationPageSizeChanged = onEvent('exmg-grid-pagination-page-size-changed');

export const onExmgGridSortChange = onEvent<CustomEvent<EventDetailSortChange>>('exmg-grid-sort-change');

export const onExmgGridSelectedRowsChange = onEvent<CustomEvent<EventDetailSelectedRowsChange>>(
  'exmg-grid-selected-rows-change',
);
export const onEventListenerExmgGridSelectedRowsChange = onEventListener<CustomEvent<EventDetailSelectedRowsChange>>(
  'exmg-grid-selected-rows-change',
);
