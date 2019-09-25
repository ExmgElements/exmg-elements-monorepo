import {LitElement, html, customElement, query, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {classMap} from 'lit-html/directives/class-map';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/marked-element/marked-element';

import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';

import './exmg-markdown-editor-icons';
import {style as codeMirrorStylesText} from './styles/exmg-markdown-codemirror-styles';
import {GenericPropertyValues, ToolBarOption, ToolBarConfigItem, isToolBarConfigItem} from './exmg-custom-types';

import Editor = CodeMirror.Editor;

type PrivateProps = 'toolbarButtonsConfig';

type Props = Exclude<keyof EditorElement, number | symbol> | PrivateProps;

type ChangedProps = GenericPropertyValues<Props>;

interface Position {
  ch: number;
  line: number;
  sticky?: string;
}

interface MarkdownElement extends HTMLElement {
  markdown?: string;
}

const isMac = /Mac/.test(navigator.platform);
const convertShortcut = (name: string): string => {
  return isMac ? name : name.replace('Cmd', 'Ctrl');
};
const insertBlocks = {
  hr: '---',
  link: (text?: string) => `[${text !== '' ? text : 'Link description'}](https://www.exmachinagroup.com/)`,
  image: (text?: string) =>
    `![${text !== '' ? text : 'ExMachina'}](https://pbs.twimg.com/profile_images/748525267153477632/5BistsD7_400x400.jpg)`,
  table: '| Column 1 | Column 2 |\n| -------- | -------- |\n| Text     | Text     |',
};

const debounce = (time: number) => {
  let timer: number;

  return (cb?: Function): void => {
    clearTimeout(timer);
    if (cb) {
      timer = window.setTimeout(cb, time);
    }
  };
};

const ENTER_KEY_CODE = 13;

/**
 * Markdown WYSIWYG editor element.
 * This editor element is a wrapper element for the markdown-element which will enable editing
 * the markdown data. See [marked-element](https://www.webcomponents.org/element/PolymerElements/marked-element/)
 * for more details on how to use this element.
 *
 * ```
 * <exmg-markdown-editor markdown="{{markdown}}">
 *   <marked-element markdown="{{markdown}}">
 *     <div slot="markdown-html"></div>
 *     <script type="text/markdown"\>
 *     # Header
 *     ...
 *     </script\>
 *   </marked-element>
 * </exmg-markdown-editor>
 * ```
 *
 * ## Custom Toolbar
 * Add attribute toolbar-buttons to adjust the toolbar buttons. The array values should match
 * the _toolbarButtons item name values.
 *
 * ```html
 * <exmg-markdown-editor toolbar-buttons='["strong","italic","strikethrough","|","quote","hr","table"]'>
 *  ...
 * </exmg-markdown-editor>
 * ```
 *
 * ### Styling
 *
 * The preview panel markdown output can be styled from outside th element. See the demo/styling.html example
 * on how to do this. In this demo the github-markdown-css project is used for styling the html output.
 *
 * `<exmg-markdown-editor>` provides the following custom properties and mixins
 *  for styling:
 *
 *  Custom property | Description | Default
 *  ----------------|-------------|----------
 *  `--exmg-markdown-editor-border` | Border Color | `#ddd`
 *  `--exmg-markdown-editor-background-color` | Editor Background Color | `white`
 *  `--exmg-markdown-editor-fullscreen-top-offset` | Top offset in fullscreen mode | `0px`
 *  `--exmg-markdown-editor-toolbar-background` | Toolbar background color | `#fafafa`
 *  `--exmg-markdown-editor-toolbar-color` | Toolbar text color | `87% black`
 *  `--exmg-markdown-editor-toolbar-color-disabled` | Toolbar text color disabled | `54% black`
 *  `--exmg-markdown-editor-preview-background` | Preview background color | `white`
 *  `--exmg-markdown-editor-toolbar-button-background-hover` | Toolbar icon border color | `#fafafa`
 *  `--exmg-markdown-editor-toolbar-seperator-color` | Toolbar seperator color | `#ddd`
 *  `--exmg-markdown-editor-code-hover` | Editor code part hover background color | `white`
 *
 *  # Events:
 *  - value-change - where detail is current markdown value
 *  - exmg-markdown-editor-fullscreen where detail is boolean with current fullscreen state
 *
 * @customElement
 * @polymer
 * @litElement
 * @group Exmg Core Elements
 * @element exmg-markdown-editor
 * @demo demo/index.html
 * @memberof Exmg
 * @extends LitElement
 * @summary Markdown editor element
 */
@customElement('exmg-markdown-editor')
export class EditorElement extends LitElement {
  @property({type: Boolean, attribute: 'auto-focus'})
  autoFocus: boolean = false;

  @property({type: Number, attribute: 'height'})
  height?: number = undefined;

  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers: boolean = false;

  @property({type: Boolean, attribute: 'indent-with-tabs'})
  indentWithTabs: boolean = true;

  @property({type: String})
  markdown?: string;

  @property({type: Boolean, attribute: 'show-helper-label'})
  showHelperLabel: boolean = false;

  @property({type: Boolean, reflect: true, attribute: 'split-view'})
  splitView: boolean = true;

  @property({type: Boolean, reflect: true, attribute: 'fullscreen'})
  fullscreen: boolean = false;

  @property({type: Array, attribute: 'toolbar-buttons'})
  toolbarButtons: ToolBarOption[] = [
    'undo',
    'redo',
    '|',
    'header_one',
    'header_two',
    'header_three',
    'strong',
    'italic',
    'strikethrough',
    '|',
    'link',
    'image',
    '|',
    'quote',
    'hr',
    'table',
    'code',
    '|',
    'unordered-list',
    'ordered-list',
    '|',
    'fullscreen',
    'split-view',
  ];

  @property({type: String})
  public name?: string;

  @property({type: Boolean, attribute: 'required'})
  public required: boolean = false;

  @property({type: Boolean, reflect: true, attribute: 'invalid'})
  // @ts-ignore
  private invalid = false;

  public validate(): boolean {
    this.invalid = this.required && !this.markdown;

    return !this.invalid;
  }

  @property({type: Array})
  private toolbarButtonsConfig: ToolBarConfigItem[] = [
    {
      name: 'undo',
      icon: 'exmg-markdown-editor-icons:undo',
      action: this.undo,
      className: 'btn-undo',
      title: 'Undo',
    },
    {
      name: 'redo',
      icon: 'exmg-markdown-editor-icons:redo',
      action: this.redo,
      className: 'btn-redo',
      title: 'Redo',
    },
    {
      name: 'header_one',
      icon: 'exmg-markdown-editor-icons:header-one',
      action: this.toggleHeaderOne,
      className: 'btn-header',
      title: 'Header 1',
    },
    {
      name: 'header_two',
      icon: 'exmg-markdown-editor-icons:header-two',
      action: this.toggleHeaderTwo,
      className: 'btn-header',
      title: 'Header 2',
    },
    {
      name: 'header_three',
      icon: 'exmg-markdown-editor-icons:header-three',
      action: this.toggleHeaderThree,
      className: 'btn-header',
      title: 'Header 3',
    },
    {
      name: 'strong',
      icon: 'exmg-markdown-editor-icons:format-bold',
      action: this.toggleBold,
      className: 'btn-bold',
      title: 'Bold',
    },
    {
      name: 'italic',
      icon: 'exmg-markdown-editor-icons:format-italic',
      action: this.toggleItalic,
      className: 'btn-italic',
      title: 'Italic',
    },
    {
      name: 'strikethrough',
      icon: 'exmg-markdown-editor-icons:format-strikethrough',
      action: this.toggleStrikethrough,
      className: 'btn-strikethrough',
      title: 'Strikethrough',
    },
    {
      name: 'quote',
      icon: 'exmg-markdown-editor-icons:format-quote',
      action: this.toggleBlockquote,
      className: 'btn-quote-left',
      title: 'Quote',
    },
    {
      name: 'hr',
      icon: 'exmg-markdown-editor-icons:trending-flat',
      action: this.toggleHorizontalRule,
      className: 'btn-horizontal-rule',
      title: 'Horizontal Rule',
    },
    {
      name: 'code',
      icon: 'exmg-markdown-editor-icons:code',
      action: this.toggleCode,
      className: 'btn-code',
      title: 'Code',
    },
    {
      name: 'table',
      icon: 'exmg-markdown-editor-icons:grid-on',
      action: this.insertTable,
      className: 'btn-table',
      title: 'Table',
    },
    {
      name: 'link',
      icon: 'exmg-markdown-editor-icons:link',
      action: this.insertLink,
      className: 'btn-link',
      title: 'Link',
    },
    {
      name: 'image',
      icon: 'exmg-markdown-editor-icons:image',
      action: this.insertImage,
      className: 'btn-image',
      title: 'Image',
    },
    {
      name: 'unordered-list',
      icon: 'exmg-markdown-editor-icons:format-list-bulleted',
      action: this.toggleUnorderedList,
      className: 'btn-list-ul',
      title: 'Generic List',
    },
    {
      name: 'ordered-list',
      icon: 'exmg-markdown-editor-icons:format-list-numbered',
      action: this.toggleOrderedList,
      className: 'btn-list-ol',
      title: 'Numbered List',
    },
    {
      name: 'fullscreen',
      icon: 'exmg-markdown-editor-icons:fullscreen',
      action: this.toggleFullscreen,
      className: 'btn-fullscreen',
      title: 'Fullscreen',
    },
    {
      name: 'split-view',
      icon: 'exmg-markdown-editor-icons:chrome-reader-mode',
      action: this.toggleSplitView,
      className: 'btn-split-view',
      title: 'Split View',
    },
  ];

  @property({type: Object, attribute: 'shortcuts'})
  shortcuts: Record<string, string> = {
    undo: 'Cmd-Z',
    redo: 'Cmd-Y',
    strong: 'Cmd-B',
    italic: 'Cmd-I',
    quote: "Cmd-'",
    'unordered-list': 'Cmd-Alt-L',
    'ordered-list': 'Cmd-L',
    'split-view': 'F9',
    fullscreen: 'F11',
  };

  get markdownElement(): MarkdownElement | null {
    return this.querySelector<MarkdownElement>('marked-element');
  }

  @query('#editor')
  editorElement?: HTMLElement;

  private codeMirrorEditor?: Editor;

  private normalizedToolBarConfig: Map<ToolBarOption, ToolBarConfigItem> = new Map();

  private dispatchMarkdownUpdatedDebounce: (cb?: Function) => void = debounce(300);

  private isElementInitialized: boolean = false;

  get value() {
    return this.markdown;
  }

  set value(value) {
    this.markdown = value;
  }

  /**
   * When ready check if markdown property is set or otherwise look for script tag
   */
  private ready(): void {
    this.setupEditor();

    const markedElement = this.markdownElement;
    if (!markedElement) {
      throw new Error('Missing children <marked-element>');
    }

    if (markedElement.markdown) {
      this.codeMirrorEditor!.setValue(markedElement.markdown);
      setTimeout(() => {
        this.codeMirrorEditor!.refresh();
      }, 0);
    } else {
      const onMarkedLoadend = () => {
        markedElement.removeEventListener('marked-render-complete', onMarkedLoadend);
        this.markdown = markedElement.markdown;
      };
      markedElement.addEventListener('marked-render-complete', onMarkedLoadend);
    }
  }

  /**
   * Helper method that creates button array from toolbar config property
   * @param {Array} toolBarOptions
   * @return {Array}
   */
  private getToolbar(toolBarOptions: ToolBarOption[] = []): (ToolBarConfigItem | Record<string, any>)[] {
    return toolBarOptions.map((optionName: ToolBarOption) => {
      if (optionName === '|') {
        return {};
      }

      return this.normalizedToolBarConfig.get(optionName) || {};
    });
  }

  /**
   * Manages the undo/redo disabled state based upon the available history in code mirror
   */
  private updateDocHistory(): void {
    if (!this.codeMirrorEditor) {
      return;
    }
    const {undo, redo} = this.codeMirrorEditor.getDoc().historySize();

    const undoEl = this.shadowRoot!.querySelector('.btn-undo');
    if (undoEl) {
      if (undo > 0) {
        undoEl.removeAttribute('disabled');
      } else {
        undoEl.setAttribute('disabled', 'disabled');
      }
    }

    const redoEl = this.shadowRoot!.querySelector('.btn-redo');
    if (redoEl) {
      if (redo > 0) {
        redoEl.removeAttribute('disabled');
      } else {
        redoEl.setAttribute('disabled', 'disabled');
      }
    }
  }

  /********* Observers *************/

  private observeFullscreen(): void {
    if (!this.codeMirrorEditor) {
      return;
    }
    this.codeMirrorEditor.setOption('fullScreen', this.fullscreen);

    if (this.isElementInitialized) {
      this.dispatchEvent(new CustomEvent('exmg-markdown-editor-fullscreen', {detail: !!this.fullscreen, composed: true, bubbles: true}));
    }
  }

  private observeMarkdownChanged(): void {
    if (this.codeMirrorEditor) {
      if (this.codeMirrorEditor.getValue() !== this.markdown) {
        this.codeMirrorEditor.setValue(this.markdown || '');
      }
    }

    if (this.markdownElement) {
      this.markdownElement!.markdown = this.markdown;
    }

    this.updateDocHistory();
  }

  /********* TOOL BAR HANDLERS *************/

  private toggleFullscreen(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.fullscreen = !this.fullscreen;
  }

  private toggleSplitView(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.splitView = !this.splitView;
  }

  setupEditor(): Editor {
    /* initialize key map */
    const keyMaps: Record<string, Function> = {
      Tab: (codeMirror: Editor) => {
        const ranges = codeMirror.getDoc().listSelections();
        const pos = ranges[0].head;
        const eolState = codeMirror.getStateAfter(pos.line);
        const inList = eolState.list !== false;

        if (inList) {
          codeMirror.execCommand('indentMore');
          return;
        }

        if (codeMirror.getOption('indentWithTabs')) {
          codeMirror.execCommand('insertTab');
        } else {
          const spaces = Array(codeMirror.getOption('tabSize') + 1).join(' ');
          codeMirror.getDoc().replaceSelection(spaces);
        }
      },
      'Shift-Tab': (codeMirror: Editor) => {
        const ranges = codeMirror.getDoc().listSelections();
        const pos = ranges[0].head;
        const eolState = codeMirror.getStateAfter(pos.line);
        const inList = eolState.list !== false;

        if (inList) {
          codeMirror.execCommand('indentLess');
          return;
        }

        if (codeMirror.getOption('indentWithTabs')) {
          codeMirror.execCommand('insertTab');
        } else {
          const spaces = Array(codeMirror.getOption('tabSize') + 1).join(' ');
          codeMirror.getDoc().replaceSelection(spaces);
        }
      },
      Esc: (codeMirror: Editor) => {
        if (codeMirror.getOption('fullScreen')) {
          this.fullscreen = false;
        }
      },
    };

    Object.keys(this.shortcuts).forEach(shortcut => {
      const actionBtn = this.normalizedToolBarConfig.get(shortcut as ToolBarOption);
      if (actionBtn && !!this.shortcuts[shortcut]) {
        keyMaps[convertShortcut(this.shortcuts[shortcut])] = () => actionBtn.action.bind(this)();
      }
    });

    /* initialize code mirror */
    // @ts-ignore
    const codeMirrorEditor: Editor = CodeMirror(this.editorElement, {
      mode: 'markdown',
      value: this.markdown || '',
      tabSize: 2,
      indentUnit: 2,
      indentWithTabs: this.indentWithTabs,
      lineNumbers: this.lineNumbers,
      autofocus: this.autoFocus,
      extraKeys: keyMaps,
      lineWrapping: true,
      allowDropFileTypes: ['text/plain'],
    });

    /* Update markdown property with latest changes */
    codeMirrorEditor.on('change', (editor: Editor) => {
      if (this.markdown === editor.getValue()) {
        return;
      }
      this.markdown = editor.getValue();
      this.dispatchMarkdownUpdatedDebounce(() => {
        this.dispatchEvent(new CustomEvent('value-change', {bubbles: true, composed: true, detail: editor.getValue()}));
        this.dispatchEvent(new CustomEvent('change', {bubbles: true, composed: true, detail: editor.getValue()}));
      });
    });

    afterNextRender(this, () => this.updateDocHistory());

    this.codeMirrorEditor = codeMirrorEditor;

    return codeMirrorEditor;
  }

  private replaceRangeLine(text: string, lineNumber: number): void {
    this.codeMirrorEditor!.getDoc().replaceRange(text, {line: lineNumber, ch: 0}, {line: lineNumber, ch: 99999999999999});
  }

  private insertAtCursor(text: string, selectionOffset?: number, selectionLength?: number): void {
    this.codeMirrorEditor!.getDoc().replaceSelection(text, 'start');

    const cursorStart = this.codeMirrorEditor!.getDoc().getCursor();
    cursorStart.ch += selectionOffset || 0;
    this.codeMirrorEditor!.getDoc().setSelection(cursorStart, {
      line: cursorStart.line,
      ch: cursorStart.ch + (selectionLength || text.length),
    });
    this.codeMirrorEditor!.focus();
  }

  private hasType(states: string[], type: string): boolean {
    const mappings = [
      {
        key: 'code',
        value: 'comment',
      },
      {
        key: 'inline-code',
        value: 'comment',
      },
    ];

    if (states.includes(type)) {
      return true;
    }

    const result = mappings.find(m => {
      return m.key === type;
    });
    return result ? states.includes(result.value) : false;
  }

  private processBlock(type: string, newLine: boolean = false): void {
    const codeMirror = this.codeMirrorEditor!;
    const states = this.getStates();
    const blockStyles: Record<string, string> = {
      strong: '**',
      'inline-code': '`',
      code: '```',
      em: '*',
      strikethrough: '~~',
    };

    const cursorStart = codeMirror.getDoc().getCursor('start');
    const cursorEnd = codeMirror.getDoc().getCursor('end');
    const multiLineSelection = cursorStart.line !== cursorEnd.line;
    const selectionText = codeMirror.getDoc().getSelection();
    const emptySelection = selectionText === '';
    if (this.hasType(states, type)) {
      let start = {
        ...cursorStart,
        ch: cursorStart.ch - blockStyles[type].length,
      };
      let end = {
        ...cursorEnd,
        ch: cursorEnd.ch + blockStyles[type].length,
      };
      codeMirror.getDoc().setSelection(start, end);
      //this.replaceRangeLine(start + selectionText + end, cursorStart.line);
      codeMirror.getDoc().replaceSelection(selectionText);
      cursorStart.ch = start.ch;
    } else {
      const text =
        blockStyles[type] +
        (type === 'code' ? '\n' : '') +
        (emptySelection ? `${type} text` : selectionText) +
        (type === 'code' ? '\n' : '') +
        blockStyles[type];
      codeMirror.getDoc().replaceSelection(text);
      if (newLine) {
        cursorStart.line += 1;
        cursorEnd.line += 1;
      } else {
        cursorStart.ch += blockStyles[type].length;
        if (!multiLineSelection) {
          cursorEnd.ch += emptySelection ? `${type} text`.length + blockStyles[type].length : blockStyles[type].length;
        }
      }
    }

    codeMirror.getDoc().setSelection(cursorStart, cursorEnd);
    codeMirror.focus();
  }

  private processLine(type: string, symbol?: string): void {
    const codeMirror = this.codeMirrorEditor!;
    const cursorStart = codeMirror.getDoc().getCursor('start');
    const cursorEnd = codeMirror.getDoc().getCursor('end');

    let lineCount = 0;
    for (let i = cursorStart.line; i <= cursorEnd.line; i += 1) {
      const lineStart = Object.assign(Object.assign({}, cursorStart), {line: i, ch: 0, sticky: 'after'});
      const states = this.getStates(lineStart);
      let text = codeMirror.getDoc().getLine(i);
      const stateFound = states.includes(type);

      switch (type) {
        case 'header': {
          const result = /(^[\#]+)/.exec(text);
          if (result === null) {
            text = `${symbol} ${text}`;
          } else {
            text = result[0].length === 6 ? text.substring(7) : `${symbol}${text}`;
          }
          break;
        }
        case 'quote':
        case 'unordered-list':
          text = stateFound ? text.substring(2) : `${symbol} ${text}`;
          break;
        case 'ordered-list':
          text = stateFound ? text.substring(3) : `${lineCount + 1}. ${text}`;
          break;
      }
      this.replaceRangeLine(text, i);
      lineCount += 1;
    }

    codeMirror.getDoc().setSelection(cursorStart, cursorEnd);
    codeMirror.focus();
  }

  private isSelectionInline(): boolean {
    const codeMirror = this.codeMirrorEditor!;
    const cursorStart = codeMirror.getDoc().getCursor('start');
    const cursorEnd = codeMirror.getDoc().getCursor('end');
    const lineLength = codeMirror.getDoc().getLine(cursorStart.line).length;
    return cursorStart.line === cursorEnd.line && cursorEnd.ch - cursorStart.ch !== lineLength;
  }

  private getSelectedText(): string {
    const codeMirror = this.codeMirrorEditor;
    const doc = codeMirror!.getDoc()!;
    return doc.getSelection();
  }

  private getStates(position?: Position): string[] {
    const codeMirror = this.codeMirrorEditor!;
    const pos: Position = position || {...codeMirror.getDoc().getCursor('start')};
    if (pos.sticky === 'after') {
      pos.ch = +1;
    }

    const cursor = codeMirror.getTokenAt(pos);
    cursor.string === '~' ? (cursor.type = 'strikethrough') : '';
    if (!cursor.type) {
      return [];
    }

    const states = cursor.type.split(' ');

    if (states.includes('variable-2')) {
      const text = codeMirror.getDoc().getLine(pos.line);
      const index = states.indexOf('variable-2');
      states[index] = /^\s*\d+\.\s/.test(text) ? 'ordered-list' : 'unordered-list';
    }
    return states;
  }

  private toggleHorizontalRule(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const codeMirrorEditor = this.codeMirrorEditor!;
    const cursorStart = codeMirrorEditor.getDoc().getCursor('start');
    const lineLength = codeMirrorEditor
      .getDoc()
      .getLine(cursorStart.line)
      .trim().length;
    const newLine = cursorStart.ch === 0 && lineLength === 0;
    const appendStr = newLine ? '\n' : '\n\n';
    this.insertAtCursor(appendStr + insertBlocks.hr + appendStr);
    cursorStart.line += newLine ? 1 : 2;
    codeMirrorEditor.getDoc().setSelection(cursorStart, cursorStart);
    codeMirrorEditor.focus();
  }

  private toggleStrikethrough(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processBlock('strikethrough');
  }

  private toggleBold(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processBlock('strong');
  }

  private toggleItalic(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processBlock('em');
  }

  private toggleBlockquote(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processLine('quote', '>');
  }

  private toggleUnorderedList(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.processLine('unordered-list', '*');
  }

  private toggleOrderedList(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processLine('ordered-list');
  }

  private toggleHeaderOne(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processLine('header', '#');
  }

  private toggleHeaderTwo(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processLine('header', '##');
  }

  private toggleHeaderThree(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.processLine('header', '###');
  }

  private insertLink(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const selection = this.getSelectedText();
    this.insertAtCursor(insertBlocks.link(selection), 2, 8);
  }

  private insertImage(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const selection = this.getSelectedText();
    this.insertAtCursor(insertBlocks.image(selection), 2, 8);
  }

  private insertTable(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.insertAtCursor(insertBlocks.table, 2, 8);
  }

  private toggleCode(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (this.isSelectionInline()) {
      this.processBlock('inline-code');
    } else {
      this.processBlock('code', true);
    }
  }

  private undo(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.codeMirrorEditor!.getDoc().undo();
    this.codeMirrorEditor!.focus();
  }

  private redo(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.codeMirrorEditor!.getDoc().redo();
    this.codeMirrorEditor!.focus();
  }

  private onKeyPressed(e: KeyboardEvent) {
    switch (e.code || e.keyCode) {
      case ENTER_KEY_CODE:
      case 'Enter':
      case 'NumpadEnter':
        if (!e.ctrlKey) {
          e.stopPropagation();
        }
        break;
    }
  }

  /*****  LIT ELEMENT HOOKS ******/
  connectedCallback() {
    super.connectedCallback();

    const markedElement = this.markdownElement;

    if (markedElement) {
      this.markdown = markedElement.getAttribute('markdown') || undefined;
    }

    this.addEventListener('keydown', this.onKeyPressed);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onKeyPressed);
    this.dispatchMarkdownUpdatedDebounce();

    super.disconnectedCallback();
  }

  protected update(changedProperties: ChangedProps): void {
    if (changedProperties.has('toolbarButtonsConfig')) {
      const normalizedToolBartConfig: Map<ToolBarOption, ToolBarConfigItem> = new Map();
      (this.toolbarButtonsConfig || []).forEach(it => normalizedToolBartConfig.set(it.name, it));
      this.normalizedToolBarConfig = normalizedToolBartConfig;
    }

    super.update(changedProperties);
  }

  protected async firstUpdated(): Promise<void> {
    await this.updateComplete;
    this.ready();
    this.isElementInitialized = true;
  }

  protected updated(changedProperties: ChangedProps): void {
    if (changedProperties.has('fullscreen')) {
      this.observeFullscreen();
    }

    if (changedProperties.has('markdown')) {
      this.observeMarkdownChanged();
    }
  }

  protected render() {
    const classes = {fullscreen: this.fullscreen, labels: true};
    // noinspection CssUnresolvedCustomPropertySet
    return html`
      <!--suppress CssUnresolvedCustomProperty -->
      <style>
        ${codeMirrorStylesText} :host {
          display: block;
          border: 1px solid var(--exmg-markdown-editor-border, #ddd);
          overflow: hidden;
          font-family: 'Roboto', 'Noto', sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
        :host([invalid]) {
          border: 1px solid red;
        }
        #editor {
          overflow: hidden;
        }
        .labels {
          background: transparent;
          position: relative;
          width: 100%;
          z-index: 10;
          height: 0;
        }
        .labels.fullscreen {
          height: 30px;
          position: fixed;
        }
        .labels > * {
          box-sizing: border-box;
          display: inline-block;
          width: 49%;
          height: 30px;
          line-height: 30px;
          color: var(--exmg-markdown-editor-label-color, #ddd);
          font-size: 12px;
          font-weight: 500;
          padding-left: 12px;
          padding-top: 8px;
        }
        .labels > .preview {
          padding-left: 0;
        }
        ::slotted(*) {
          display: none;
          overflow: auto;
        }
        ::slotted(marked-element) {
          margin-top: ${this.showHelperLabel ? '30px' : '0'};
        }
        :host([split-view]) ::slotted(*) {
          display: block;
          background: var(--exmg-markdown-editor-preview-background, white);
          padding: 16px;
        }
        .container {
          box-sizing: border-box;
          background: var(--exmg-markdown-editor-background-color, #f1f1f1);
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
        /* No importants! */
        :host([fullscreen]) .container {
          position: fixed !important;
          top: calc(50px + var(--exmg-markdown-editor-fullscreen-top-offset, 0px));
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9;
        }
        :host([split-view]) ::slotted(*),
        .container > * {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        :host([line-numbers]) .container #editor {
          padding: 0;
        }
        /* No importants! */
        .CodeMirror {
          height: calc(100% - 16px) !important;
          min-height: 300px;
          font: inherit;
          z-index: 1;
          padding: 16px;
          padding-bottom: 0;
          background: var(--exmg-markdown-editor-code-background, #f4f5f7);
        }
        .CodeMirror-scroll {
          min-height: 300px;
          margin-top: ${this.showHelperLabel ? '15px' : '0'};
        }
        .CodeMirror:not(.CodeMirror-focused):hover {
          background: var(--exmg-markdown-editor-code-hover, white);
        }
        .CodeMirror-focused {
          box-shadow: inset 0 0 0 2px Highlight;
          box-shadow: inset 0 0 0 2px -webkit-focus-ring-color;
          overflow: hidden;
          background: white;
        }
        .toolbar {
          position: relative;
          padding: 8px 10px;
          border-bottom: 1px solid var(--exmg-markdown-editor-border, #ddd);
          background: var(--exmg-markdown-editor-toolbar-background, #fafafa);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }
        :host([fullscreen]) .toolbar {
          width: 100%;
          box-sizing: border-box;
          height: 50px;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          padding: 10px 10px;
          position: fixed;
          top: calc(0px + var(--exmg-markdown-editor-fullscreen-top-offset, 0px));
          left: 0;
          z-index: 12;
        }
        .toolbar a {
          display: inline-block;
          text-align: center;
          text-decoration: none;
          margin: 0;
          border-radius: 4px;
          color: var(--exmg-markdown-editor-toolbar-color, rgba(0, 0, 0, 0.87));
          border: 1px solid transparent;
          cursor: pointer;
        }
        .toolbar a iron-icon {
          margin: 4px;
          width: 22px;
          height: 22px;
        }
        .toolbar a[disabled] {
          color: var(--exmg-markdown-editor-toolbar-color-disabled, rgba(0, 0, 0, 0.54));
        }
        .toolbar a:hover {
          background: var(--exmg-markdown-editor-toolbar-button-background-hover, #fafafa);
        }
        .toolbar .seperator {
          margin: 0 8px;
          border-left: 1px solid var(--exmg-markdown-editor-toolbar-seperator-color, #ddd);
        }
      </style>

      <div id="toolbar" class="toolbar">
        ${repeat<ToolBarConfigItem | Record<string, any>>(
          this.getToolbar(this.toolbarButtons),
          (it, index: number) => (isToolBarConfigItem(it) ? it.name : `empty_${index}`),
          it => {
            if (isToolBarConfigItem(it)) {
              return html`
                <a href="#" title="${it.name}" class="${it.className}" @click="${it.action}">
                  <iron-icon icon="${it.icon}"></iron-icon>
                </a>
              `;
            }
            return html`
              <span class="seperator"></span>
            `;
          },
        )}

        <div class=${classMap(classes)}>
          <div>EDITOR</div>
          ${this.splitView
            ? html`
                <div class="preview">PREVIEW</div>
              `
            : ''}
        </div>
      </div>
      <div class="container" style="height: ${this.height && !this.fullscreen ? `${this.height}px` : 'inherit'};">
        <div id="editor"></div>
        <slot> </slot>
      </div>
    `;
  }
}
