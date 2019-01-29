import {customElement, html, LitElement} from 'lit-element';

@customElement('exmg-grid')
export class ExmgGrid extends LitElement {

  protected render() {
    return html`
      <style>
        :host{
          display: table;
          border-collapse: collapse;
          font-size: 12px;
          color: rgba(0,0,0,.78);
          font-family: 'Roboto', 'Noto', sans-serif;
          -webkit-font-smoothing: antialiased;
          background: var(--exmg-paper-datatable-background-color, none);
          color: var(--exmg-paper-datatable-text-color, rgba(0,0,0,.87));
        }
      </style>
      <slot></slot>
    `;
  }
}