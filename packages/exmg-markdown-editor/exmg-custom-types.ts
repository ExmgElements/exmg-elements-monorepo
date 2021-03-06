// it just create better type definition than lit-element type PropertyValues

import {EditorElement} from 'exmg-markdown-editor';

// now editor should show what kind of field names are allowed
export type GenericPropertyValues<T extends PropertyKey, V = unknown> = Map<T, V>;

export type ToolBarOption =
  | 'undo'
  | 'redo'
  | '|'
  | 'header_one'
  | 'header_two'
  | 'header_three'
  | 'strong'
  | 'italic'
  | 'strikethrough'
  | 'quote'
  | 'hr'
  | 'table'
  | 'table-paste'
  | 'code'
  | 'unordered-list'
  | 'ordered-list'
  | 'link'
  | 'image'
  | 'fullscreen'
  | 'split-view'
  | AvailableMarkdownExtension;

export interface ToolBarConfigItem extends Object {
  name: ToolBarOption;
  icon: string;
  action: unknown;
  className: string;
  title: string;
}

export const isToolBarConfigItem = (item: Record<string, any>): item is ToolBarConfigItem => item.hasOwnProperty('name');

export type AvailableMarkdownExtension = 'indent-in' | 'indent-out';
export const availableMarkdownExtensions: AvailableMarkdownExtension[] = ['indent-in', 'indent-out'];

export type PrivateProps = 'toolbarButtonsConfig';

export type Props = Exclude<keyof EditorElement, number | symbol> | PrivateProps;

export type ChangedProps = GenericPropertyValues<Props>;

export interface Position {
  ch: number;
  line: number;
  sticky?: string;
}

export interface MarkdownElement extends HTMLElement {
  markdown?: string;
}

declare global {
  interface Window {
    marked: MarkdownElement;
    markdownEditorConfig: {
      extensions: AvailableMarkdownExtension[];
      renderer: unknown;
    };
  }
}
