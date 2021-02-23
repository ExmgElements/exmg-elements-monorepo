import {LitElement} from 'lit-element';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const promisifyFlush = (flush: any) => () => new Promise((resolve) => flush(resolve));

const onEvent: (eventName: string) => (element: LitElement) => Promise<any> = (eventName: string) => (element: LitElement) =>
  new Promise((resolve) => {
    element.addEventListener(eventName, (event: Event) => resolve(event));
  });

export const onExmgMarkdownEditorFullscreen: (element: LitElement) => Promise<any> = onEvent('exmg-markdown-editor-fullscreen');

export const onValueChange: (element: LitElement) => Promise<any> = onEvent('value-change');
