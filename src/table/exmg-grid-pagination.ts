import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {style} from './exmg-grid-pagination-styles';

@customElement('exmg-grid-pagination')
export class ExmgGridPagination extends LitElement {

  static styles = [
    style,
  ];

  @property({type: String, attribute: 'page-size-label'})
  pageSizeLabel: string = 'Rows per page:';

  @property({type: Array, attribute: 'page-size-options'})
  pageSizeOptions: number[] = [10, 20, 30];

  @property({type: Number, attribute: 'page-index'})
  pageIndex: number = 0;

  @property({type: Number, attribute: 'page-size'})
  pageSize: number = this.pageSizeOptions[0];

  @property({type: Number, attribute: 'item-count'})
  itemCount: number = 0;

  private renderPageSizeLabel() {
    return html`${this.pageSizeLabel}`;
  }

  private renderPageSizeOptions() {
    return html`
        <select @change="${this.handleOnPageSizeChanged}">
          ${repeat(
            this.pageSizeOptions,
            (it) => it,
            it => html`<option ?selected="${it === this.pageSize}" value="${it}">${it}</option>`
          )}
        </select>
    `;
  }

  private renderPageRangeLabel() {
    if (this.itemCount > 0) {
      return html`
        <span>
          ${this.pageIndex * this.pageSize + 1}-
          ${Math.min((this.pageIndex + 1) * this.pageSize, this.itemCount)} of ${this.itemCount}
        </span>
      `;
    }

    return html`
        <span>${this.pageIndex * this.pageSize + 1}-${(this.pageIndex + 1) * this.pageSize}</span>
      `;
  }

  private renderPageRangeActions() {
    return html`
      ${this.renderPrevPage()}
      ${this.renderNextPage()}
    `;
  }

  private renderPrevPage() {
    if (this.pageIndex > 0) {
      return html`<a href="" @click="${this.handleOnClickPrev}">Prev<a>`;
    }

    return html`<a disabled href="#" @click="javascript:void(0)" >Prev<a>`;
  }

  private renderNextPage() {
    if (this.itemCount && this.itemCount > (this.pageIndex + 1) * this.pageSize) {
      return html`<a href="#" @click="${this.handleOnClickNext}">Next<a>`;
    }

    return html`<a disabled href="#" @click="javascript:void(0)" >Next<a>`;
  }

  private fireEventPageChanged(page: number) {
    this.dispatchEvent(new CustomEvent('exmg-grid-page-changed', {bubbles: true, composed: true, detail: {page}}));
  }

  private handleOnClickPrev(e: Event): boolean {
    console.log('prev clicked');
    e.preventDefault();
    this.pageIndex = this.pageIndex - 1;
    this.fireEventPageChanged(this.pageIndex);
    return false;
  }

  private handleOnClickNext(e: Event): boolean {
    e.preventDefault();
    this.pageIndex = this.pageIndex + 1;
    this.fireEventPageChanged(this.pageIndex);
    console.log('next clicked');
    return false;
  }

  private handleOnPageSizeChanged(e: Event) {
    e.preventDefault();
    const paths = e.composedPath();
    const value = paths.length ? (<HTMLSelectElement>paths[0]).value : undefined;
    if (typeof value !== 'undefined') {
      this.pageSize = parseInt(value, 10);
      this.pageIndex = 0;
      console.log('page size is', this.pageSize);
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-page-size-changed',
          {bubbles: true, composed: true, detail: {pageSize: this.pageSize, page: this.pageIndex}}
        )
      );
    }
  }

  protected render(): TemplateResult | void {
    return html`
      <div class="wrapper">
        <div class="page-size">
            <div class="page-size-label">
                ${this.renderPageSizeLabel()}
            </div>
            <div class="page-size-options">
                ${this.renderPageSizeOptions()}
            </div>
        </div>
        <div class="page-range">
            <div class="page-range-label">
                ${this.renderPageRangeLabel()}
            </div>
            <div class="page-range-actions">
                ${this.renderPageRangeActions()}
            </div>
        </div>
      <div>
    `;
  }
}
