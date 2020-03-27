// it just create better type definition than lit-element type PropertyValues
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
  action: Function;
  className: string;
  title: string;
}

export const isToolBarConfigItem = (item: Record<string, any>): item is ToolBarConfigItem => item.hasOwnProperty('name');

export type AvailableMarkdownExtension = 'underline' | 'indent-in' | 'indent-out';
export const availableMarkdownExtensions: AvailableMarkdownExtension[] = ['underline', 'indent-in', 'indent-out'];

declare global {
  interface Window {
    markdownEditorConfig: {
      extensions: AvailableMarkdownExtension[];
    };
  }
}
