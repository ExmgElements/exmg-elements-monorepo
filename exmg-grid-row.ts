import {customElement, html, LitElement} from 'lit-element';

@customElement('exmg-grid-row')
export class ExmgGridRow extends LitElement {

  protected render() {
    return html`
      <style>
        :host {
          display: table-row;
          box-sizing: border-box;
          border-bottom: 1px solid #ddd;
        }
        :host(:hover) {
          background: #eee;
        }
        ::slotted(*:first-child) {
          padding-left:16px;
        }
        ::slotted(*:last-child) {
          padding-right:16px;
        }
        :host([hidden]) {
          display: none;
        }
      </style>
      <slot></slot>
    `;
  }
}