import {css} from 'lit';

export const style = css`
  .CodeMirror {
    font-family: monospace;
    height: 300px;
    color: #000;
    direction: ltr;
  }
  .CodeMirror-lines {
    padding: 0;
  }
  .CodeMirror pre {
    padding: 0 4px;
  }
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    background-color: #fff;
  }
  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }
  .CodeMirror-guttermarker {
    color: #000;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }
  .CodeMirror-cursor {
    border-left: 1px solid #000;
    border-right: none;
    width: 0;
  }
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }
  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }
  @-moz-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @-webkit-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }
  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: -20px;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .cm-s-default .cm-header {
    color: blue;
  }
  .cm-s-default .cm-quote {
    color: #090;
  }
  .cm-negative {
    color: #d44;
  }
  .cm-positive {
    color: #292;
  }
  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }
  .cm-s-default .cm-keyword {
    color: #708;
  }
  .cm-s-default .cm-atom {
    color: #219;
  }
  .cm-s-default .cm-number {
    color: #164;
  }
  .cm-s-default .cm-def {
    color: blue;
  }
  .cm-s-default .cm-variable-2 {
    color: #05a;
  }
  .cm-s-default .cm-variable-3,
  .cm-s-default .cm-type {
    color: #085;
  }
  .cm-s-default .cm-comment {
    color: #a50;
  }
  .cm-s-default .cm-string {
    color: #a11;
  }
  .cm-s-default .cm-string-2 {
    color: #f50;
  }
  .cm-s-default .cm-meta {
    color: #555;
  }
  .cm-s-default .cm-qualifier {
    color: #555;
  }
  .cm-s-default .cm-builtin {
    color: #30a;
  }
  .cm-s-default .cm-bracket {
    color: #997;
  }
  .cm-s-default .cm-tag {
    color: #170;
  }
  .cm-s-default .cm-attribute {
    color: #00c;
  }
  .cm-s-default .cm-hr {
    color: #999;
  }
  .cm-s-default .cm-link {
    color: #00c;
  }
  .cm-s-default .cm-error {
    color: red;
  }
  .cm-invalidchar {
    color: red;
  }
  .CodeMirror-composing {
    border-bottom: 2px solid;
  }
  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }
  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .CodeMirror-scroll {
    overflow: scroll !important;
    margin-bottom: -30px;
    margin-right: -30px;
    padding-bottom: 30px;
    height: 100%;
    outline: none;
    position: relative;
    box-sizing: border-box;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 30px solid transparent;
  }
  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 6;
    display: none;
  }
  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }
  .CodeMirror-gutter-filler {
    left: 0;
    bottom: 0;
  }
  .CodeMirror-gutters {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3;
  }
  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -30px;
  }
  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: none !important;
    border: none !important;
  }
  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
  }
  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }
  .CodeMirror-gutter-wrapper ::selection {
    background-color: transparent;
  }
  .CodeMirror-gutter-wrapper ::-moz-selection {
    background-color: transparent;
  }
  .CodeMirror-lines {
    cursor: text;
    min-height: 1px;
  }
  .CodeMirror pre {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: inherit;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }
  .CodeMirror-wrap pre {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }
  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }
  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: 0.1px;
  }
  .CodeMirror-rtl pre {
    direction: rtl;
  }
  .CodeMirror-code {
    outline: none;
  }
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
  }
  .CodeMirror-measure pre {
    position: static;
  }
  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }
  div.CodeMirror-dragcursors {
    visibility: visible;
  }
  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }
  .CodeMirror-selected {
    background: #d9d9d9;
  }
  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0;
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: #d7d4f0;
  }
  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: #d7d4f0;
  }
  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255, 255, 0, 0.4);
  }
  .cm-force-border {
    padding-right: 0.1px;
  }
  @media print {
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden;
    }
  }
  .cm-tab-wrap-hack:after {
    content: '';
  }
  span.CodeMirror-selectedtext {
    background: none;
  }
  :host {
    display: block;
    border: 1px solid var(--exmg-markdown-editor-border, #ddd);
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
    position: relative;
    width: calc(100% + 20px);
    height: 30px;
    display: none;
    top: 8px;
    margin: 0px -10px;
    color: var(--exmg-markdown-editor-label-color, rgba(0, 0, 0, 0.54));
    background: var(--exmg-markdown-editor-toolbar-label-background, #fafafa);
    border-top: 1px solid var(--exmg-markdown-editor-border, #ddd);
  }
  .labels > * {
    box-sizing: border-box;
    display: inline-block;
    height: 30px;
    flex: 1 1 0%;
    line-height: 30px;
    font-size: 12px;
    font-weight: 500;
    padding: 0px 8px;
  }
  .labels > .preview {
    padding-left: 0;
  }
  ::slotted(*) {
    display: none;
    overflow: auto;
  }
  :host([show-helper-label]) .labels {
    display: flex;
  }
  .preview-html {
    overflow: scroll;
    background-color: #fff;
  }
  :host([show-helper-label]) .preview-html {
    padding-top: 0px;
    margin-top: 0px;
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
  :host([fullscreen]) .container {
    position: fixed !important;
    top: calc(50px + var(--exmg-markdown-editor-fullscreen-top-offset, 0px));
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    margin-top: 3px;
  }
  :host([fullscreen][show-helper-label]) .container {
    margin-top: 33px;
  }
  .container > * {
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
  }
  .container > .preview-html {
    display: none;
  }
  :host([split-view]) .container > * {
    display: block;
  }
  :host([line-numbers]) .container #editor {
    padding: 0;
  }
  .CodeMirror {
    height: calc(100% - 16px) !important;
    min-height: 300px;
    font: inherit;
    z-index: 1;
    padding: 16px;
    padding-bottom: 0;
    background: var(--exmg-markdown-editor-code-background, #f9f9f9);
  }
  :host([show-helper-label]) .CodeMirror-scroll {
    margin-top: 15px;
  }
  .CodeMirror:not(.CodeMirror-focused):hover {
    background: var(--exmg-markdown-editor-code-hover, white);
    cursor: text;
  }
  .CodeMirror-focused {
    box-shadow: inset 0 0 0 2px Highlight;
    box-shadow: inset 0 0 0 2px -webkit-focus-ring-color;
    overflow: hidden;
    background: #fff;
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
`;
export default style;
