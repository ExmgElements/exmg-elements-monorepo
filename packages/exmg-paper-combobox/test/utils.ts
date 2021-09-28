import {LitElement} from 'lit';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const promisifyFlush = (flush: any) => () => new Promise((resolve) => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement) => Promise<any> = (eventName: string) => (element: LitElement) =>
  new Promise((resolve) => {
    element.addEventListener(eventName, (event: Event) => resolve(event));
  });

export const onExmgComboboxSelected: (element: LitElement) => Promise<any> = onEvent('exmg-combobox-select');

export const onExmgComboboxDeselected: (element: LitElement) => Promise<any> = onEvent('exmg-combobox-deselect');

export const onExmgComboboxChange: (element: LitElement) => Promise<any> = onEvent('change');
