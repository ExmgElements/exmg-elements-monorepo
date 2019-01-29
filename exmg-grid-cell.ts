import {customElement, html, LitElement} from 'lit-element';

@customElement('exmg-grid-cell')
export class ExmgGridCell extends LitElement {

  protected render() {
    return html`
      <style>
        :host{
          display: table-cell;
          height: 48px;
          line-height: 48px;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0 6px;
        }
        :host([align='right']) {
          text-align: right;
        }
        :host > span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      </style>
      <span>
        <slot></slot>
      </span>
    `;
  }
}