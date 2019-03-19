import {customElement, html, LitElement, property} from 'lit-element';

@customElement('exmg-grid-pagination-demo')
export class ExmgGridSmartToolbarDemo extends LitElement {
  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 20;

  @property({type: Number})
  private itemCount: number = 50;

  render() {
    return html`
        <style>
          :host {
            --mdc-theme-primary: #0070db;
            --mdc-theme-on-surface: #091e2e;
            --exmg-grid-active-color: #e1f0fe;
          }
        </style>
        <exmg-grid-pagination
          page-index=${this.pageIndex}
          page-size=${this.pageSize}
          item-count="${this.itemCount}"
        >
        </exmg-grid-pagination>
    `;
  }
}
