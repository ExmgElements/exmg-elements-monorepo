import {LitElement} from 'lit-element';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const promisifyFlush = (flush: any) => () => new Promise((resolve) => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any> = (eventName: string) => (
  element: LitElement,
  shouldResolve: boolean,
) =>
  new Promise((resolve, reject) => {
    console.log('Promise');
    element.addEventListener(eventName, (event: Event) => (shouldResolve ? resolve(event) : reject(event)));
  });

export const onExmgFormSubmit: (element: LitElement, shouldResolve: boolean) => Promise<any> = onEvent('submit');

export const onExmgFormCancel: (element: LitElement, shouldResolve: boolean) => Promise<any> = onEvent('cancel');

export const onExmgFormDirty: (element: LitElement, shouldResolve: boolean) => Promise<any> = onEvent('dirty');
