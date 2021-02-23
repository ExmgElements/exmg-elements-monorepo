import {LitElement} from 'lit-element';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const promisifyFlush = (flush: any) => () => new Promise((resolve) => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any> = (eventName: string) => (
  element: LitElement,
  shouldResolve: boolean,
) =>
  new Promise((resolve, reject) => {
    element.addEventListener(eventName, (event: Event) => (shouldResolve ? resolve(event) : reject(event)));
  });

export const onExmgRadioGroupChanged: (element: LitElement, shouldResolve: boolean) => Promise<any> = onEvent('exmg-radio-group-changed');
