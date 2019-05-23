import {LitElement} from 'lit-element';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any> =
  (eventName: string) => (element: LitElement, shouldResolve: boolean) => new Promise((resolve, reject) => {
    element.addEventListener(eventName, (event: Event) => shouldResolve ? resolve(event) : reject(event));
  });

export const onExmgRadioGroupChanged: (element: LitElement, shouldResolve: boolean) => Promise<any> = onEvent('exmg-radio-group-changed');
