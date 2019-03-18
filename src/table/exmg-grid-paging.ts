import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {style} from './exmg-grid-paging-styles';

@customElement('exmg-grid-paging')
export class ExmgGridPaging extends LitElement {

  static styles = [
    style,
  ];

  @property({type: Array, attribute: 'page-size-config'})
  private pageSizeOptions: number[] = [10, 20, 30];

  @property({type: Number, attribute: 'page-index'})
  private pageIndex: number = 0;

  @property({type: Number, attribute: 'page-size'})
  private pageSize: number = this.pageSizeOptions[0];

  @property({type: Number, attribute: 'total-pages'})
  private totalPages?: number;

  private renderPageIndicator() {
    if (this.totalPages) {
      return html`
        <span>Page ${this.pageIndex + 1} of ${this.totalPages}</span>
      `;
    }

    return html`
        <span>Page ${this.pageIndex + 1}</span>
      `;
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

  private renderPrevPage() {
    if (this.pageIndex > 0) {
      return html`<a href="" @click="${this.handleOnClickPrev}">Prev<a>`;
    }

    return html`<a disabled href="#" @click="javascript:void(0)" >Prev<a>`;
  }

  private renderNextPage() {
    if (this.totalPages && this.totalPages > this.pageIndex + 1) {
      return html`<a href="#" @click="${this.handleOnClickNext}">Next<a>`;
    }

    return html`<a disabled href="#" @click="javascript:void(0)" >Next<a>`;
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
      <div>
        ${this.renderPageIndicator()}
        ${this.renderPrevPage()}
        ${this.renderNextPage()}
        <select @change="${this.handleOnPageSizeChanged}">
          ${repeat(
            this.pageSizeOptions,
            (it) => it,
            it => html`<option ?selected="${it === this.pageSize}" value="${it}">${it}</option>`
          )}
        </select>
      <div>
    `;
  }
}
