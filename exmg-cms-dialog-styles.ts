import {html} from 'lit-element';
import {sharedDialogStyles} from '@exmg/exmg-cms-styles/exmg-cms-dialog-styles.js';
import {sharedButtonStyles} from '@exmg/exmg-cms-styles/exmg-cms-button-styles.js';

export const exmgDialogStyles = html`
  ${sharedDialogStyles}
  ${sharedButtonStyles}
  <style>
    paper-progress {
      width: 100%;
      margin-top: 0px;
      box-sizing: border-box;
    }
    paper-dialog{
      max-width: 512px;
      box-sizing: border-box;
    }
    :host([large]) paper-dialog{
      max-width: 810px;
      width: 100%;
    }
    paper-dialog > .actions {
      margin: 24px 0 24px;
    }
    ::slotted(hr) {
      border: none;
      height: 1px;
      background: var(--divider-color);
      margin: 16px 0 8px;
    }
    :host([submitting]) paper-dialog > .actions {
      margin: 24px 0 20px;
    }
    p,
    ::slotted(p) {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.54);
    }
    ::slotted(label) {
      font-size:12px;
      font-weight:400;
      height:20px;
      justify-content:normal;
      letter-spacing:0.132px;
      line-height:20px;
      text-overflow:ellipsis;
      color: var(--secondary-text-color);
    }
    ::slotted(p.help) {
      margin-top: -2px;
      font-size: 0.8em;
    }
    .error {
      display: none;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.54);
      -webkit-box-flex: 0 0 auto;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      padding: 0;
    }
    .error > span {
      background-color: #fbe9e7;
      color: #ff5252;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 0 0 24px;
      margin: 0 0 12px;
      min-height: 48px;
    }
    .error > span > span {
      padding-left: 36px;
      margin-right: 24px;
      position: relative;
      padding: 12px 0;
      line-height: 20px;
      font-size: 14px;
      white-space: normal;
      font-weight: 500;
      display: inline-block;
      vertical-align: middle;
    }
    .error iron-icon {
      margin-right: 12px;
      color: #ff5252;
    }
    .error.show {
      display: block;
    }
    .body {
      margin-top: 0px;
      margin-bottom: 24px;
    }    
    paper-dialog > .actions {
      margin: 18px 0 18px;
    }
    :host([submitting]) paper-dialog > .actions {
      margin: 18px 0 14px;
    }
    paper-dialog-scrollable {
      margin-top: 4px;
    }
  </style>
`;