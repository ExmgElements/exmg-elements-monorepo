import {customElement, html, LitElement, property} from 'lit-element';

@customElement('exmg-grid-pagination-demo')
export class ExmgGridSmartToolbarDemo extends LitElement {
  @property({type: Number})
  private pageIndex: number = 0;

  @property({type: Number})
  private pageSize: number = 20;

  @property({type: Number})
  private itemCount: number = 50;

  private onGridPageSizeChanged(e: CustomEvent) {
    console.log('onGridPageSizeChanged', e.detail);
  }

  private onGridPageChanged(e: CustomEvent) {
    console.log('onGridPageChanged', e.detail);
  }

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
          @exmg-grid-page-size-changed="${this.onGridPageSizeChanged}"
          @exmg-grid-page-changed="${this.onGridPageChanged}"
        >
        </exmg-grid-pagination>
    `;
  }
}
