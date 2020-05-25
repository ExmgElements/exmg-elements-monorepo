import {LitElement} from 'lit-element';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any> = (eventName: string) => (
  element: LitElement,
  shouldResolve: boolean,
) =>
  new Promise((resolve, reject) => {
    element.addEventListener(eventName, (event: Event) => (shouldResolve ? resolve(event) : reject(event)));
  });

export const onExmgSearchbarQueryChange: (element: LitElement, shouldResolve: boolean) => Promise<CustomEvent<{value: string}>> = onEvent(
  'query-change',
);

export const onExmgSearchbarQuerySubmit: (element: LitElement, shouldResolve: boolean) => Promise<CustomEvent<{value: string}>> = onEvent(
  'query-submit',
);

export const onExmgSearchbarSuggestionSelect: (
  element: LitElement,
  shouldResolve: boolean,
) => Promise<CustomEvent<{value: any; index: number}>> = onEvent('suggestion-select');
