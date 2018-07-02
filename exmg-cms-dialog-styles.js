import {html} from '@polymer/polymer/polymer-element.js';

export const sharedDialogStyles = html`
  <style>
    paper-dialog {
      border-radius: 8px;
      min-width: 500px;
      box-shadow: var(--shadow-elevation-8dp_-_box-shadow);
    }
    paper-dialog > .actions {
      margin: 24px 0;
      text-align: right;
    }
    paper-dialog > header {
      -webkit-box-flex: 0 0 auto;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      padding: 4px 24px 0 24px;
      @apply --layout-horizontal;
    }
    paper-dialog > header > .title {
      @apply --layout-flex;
    }
    paper-dialog > header > paper-icon-button {
      position: relative;
      top: -8px;
    }
    paper-dialog > header > .title {
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      color: #000;
      font-family: 'Google Sans',sans-serif;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin: 0 32px 16px 0;
    }
  </style>
`;
