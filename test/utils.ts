import {LitElement} from 'lit-element';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

type onEventType = (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any>;

const onEvent: onEventType =
  (eventName: string) =>
    (element: LitElement, shouldResolve: boolean) =>
      new Promise((resolve, reject) => {
        element.addEventListener(eventName, (event: Event) => shouldResolve ? resolve(event) : reject(event));
      });

export const onExmgGridToolbarActionExecuted = onEvent('exmg-grid-toolbar-action-executed');

export const onExmgGridToolbarFilterChanged = onEvent('exmg-grid-toolbar-filter-changed');

export const onExmgGridPaginationPageChanged = onEvent('exmg-grid-pagination-page-changed');

export const onExmgGridPaginationPageSizeChanged = onEvent('exmg-grid-pagination-page-size-changed');
