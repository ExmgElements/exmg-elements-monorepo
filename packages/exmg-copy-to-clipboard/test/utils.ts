import {LitElement} from 'lit-element';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

type onEventType = (eventName: string) => (element: LitElement, shouldResolve: boolean) => Promise<any>;

const onEvent: onEventType = (eventName: string) => (element: LitElement, shouldResolve: boolean) =>
  new Promise((resolve, reject) => {
    element.addEventListener(eventName, (event: Event) => (shouldResolve ? resolve(event) : reject(event)));
  });

export const onCopied = onEvent('exmg-copy-to-clipboard-copied');
