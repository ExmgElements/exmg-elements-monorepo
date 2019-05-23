import {css} from 'lit-element';

export const style = css`
  exmg-button {
    text-transform: initial;
    text-transform: none;
    letter-spacing: .25px;
    min-width: 60px;
  }
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
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin: 0 32px 16px 0;
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
  .error {
    display: none;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0,0,0,0.54);
    padding: 0;
  }
  .error > span {
    display: flex;
    background-color: #fbe9e7;
    color: #ff5252;
    padding: 0 0 0 16px;
    margin: 0 0 12px;
    min-height: 48px;
    align-items: center;
    justify-content: center;
  }
  .error svg {
    margin-right: 12px;
    fill: #ff5252;
  }
  .error.show {
    display: block;
  }
`;
