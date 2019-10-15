import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@exmg/exmg-button';
import '@material/mwc-icon-button';
import '@exmg/exmg-paper-combobox';
import '@polymer/paper-item';
import {style} from './exmg-grid-pagination-styles';

/**
 * ### Styling
 * The following custom properties  are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-grid-pagination-bg-color` | pagination background color | `var(--mdc-theme-surface, #ffffff);`
 * `--exmg-grid-pagination-color` | pagination foreground (mostly text) color | `var(--mdc-theme-on-surface, #02182b);`
 */
@customElement('exmg-grid-pagination')
export class ExmgGridPagination extends LitElement {
  static styles = [style];

  @property({type: String, attribute: 'page-size-label'})
  pageSizeLabel: string = 'Rows per page:';

  @property({type: Array, attribute: 'page-size-options'})
  pageSizeOptions: number[] = [10, 20, 30];

  @property({type: Number, attribute: 'page-size'})
  pageSize: number = this.pageSizeOptions[0];

  @property({type: Number, attribute: 'page-index'})
  pageIndex: number = 0;

  @property({type: Number, attribute: 'item-count'})
  itemCount: number = 0;

  private renderPageSizeLabel() {
    return html`
      ${this.pageSizeLabel}
    `;
  }

  private renderPageSizeOptions() {
    return html`
      <exmg-paper-combobox
        id="pageSizeOptions"
        attr-for-selected="data-id"
        selected="${this.pageSize}"
        @exmg-combobox-select="${this.handleOnPageSizeChanged}"
        style="display: inline-block;min-width: 0;"
      >
        ${repeat(
          this.pageSizeOptions,
          item => item,
          item =>
            html`
              <paper-item data-id="${item}">${item}</paper-item>
            `,
        )}
      </exmg-paper-combobox>
    `;
  }

  private renderPageRangeLabel() {
    if (this.itemCount > 0) {
      return html`
        <span>
          ${this.pageIndex * this.pageSize + 1}- ${Math.min((this.pageIndex + 1) * this.pageSize, this.itemCount)} of ${this.itemCount}
        </span>
      `;
    }

    return html`
      <span>${this.pageIndex * this.pageSize + 1}-${(this.pageIndex + 1) * this.pageSize}</span>
    `;
  }

  private renderPageRangeActions() {
    return html`
      ${this.renderPrevPage()} ${this.renderNextPage()}
    `;
  }

  private renderPrevPage() {
    const enabled = this.pageIndex > 0;

    return html`
      <mwc-icon-button
        icon="navigate_before"
        id="prevPageBtn"
        ?disabled="${!enabled}"
        class="actions"
        title="Previous page"
        @click="${enabled ? this.handleOnClickPrev : undefined}"
      ></mwc-icon-button>
    `;
  }

  private renderNextPage() {
    const enabled = this.itemCount && this.itemCount > (this.pageIndex + 1) * this.pageSize;

    return html`
      <mwc-icon-button
        icon="navigate_next"
        id="nextPageBtn"
        ?disabled="${!enabled}"
        class="actions"
        title="Next page"
        @click="${enabled ? this.handleOnClickNext : undefined}"
      ></mwc-icon-button>
    `;
  }

  private fireEventPageChanged(page: number) {
    this.dispatchEvent(new CustomEvent('exmg-grid-pagination-page-changed', {bubbles: true, composed: true, detail: {page}}));
  }

  private handleOnClickPrev(e: Event): boolean {
    e.preventDefault();
    this.pageIndex = this.pageIndex - 1;
    this.fireEventPageChanged(this.pageIndex);
    return false;
  }

  private handleOnClickNext(e: Event): boolean {
    e.preventDefault();
    this.pageIndex = this.pageIndex + 1;
    this.fireEventPageChanged(this.pageIndex);

    return false;
  }

  private handleOnPageSizeChanged(e: CustomEvent) {
    const {value} = e.detail;

    if (typeof value !== 'undefined') {
      this.pageSize = parseInt(value, 10);
      this.pageIndex = 0;

      this.dispatchEvent(
        new CustomEvent('exmg-grid-pagination-page-size-changed', {
          bubbles: true,
          composed: true,
          detail: {pageSize: this.pageSize, page: this.pageIndex},
        }),
      );
    }
  }

  protected render(): TemplateResult | void {
    // tslint:disable:max-line-length
    return html`
      <style>
        :host {
          --paper-item-focused: {
            background-color: var(
              --exmg-grid-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-item-selected: {
            background-color: var(
              --exmg-grid-toolbar-filter-item-active-bg-color,
              var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-button-ink-color: var(--exmg-grid-toolbar-filter-item-active-bg-color, var(--mdc-theme-surface));

          --exmg-paper-combobox-selected-item-color: var(--exmg-grid-pagination-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-selected-item-bg-color: var(--exmg-grid-pagination-bg-color, transparent);
          --exmg-paper-combobox-dropdown-button-color: var(--exmg-grid-pagination-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-button-bg-color: var(--exmg-grid-pagination-bg-color, transparent);
          --exmg-paper-combobox-dropdown-list-color: var(--exmg-grid-pagination-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-list-bg-color: var(--exmg-grid-pagination-bg-color, var(--mdc-theme-surface));
        }
      </style>
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
        <div></div>
      </div>
    `;
    // tslint:enable:max-line-length
  }
}
