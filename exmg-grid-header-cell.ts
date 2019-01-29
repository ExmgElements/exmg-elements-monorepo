import {customElement, html, LitElement, property} from 'lit-element';

const arrowUpward = html`<svg height="18" width="18" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></svg>`;
const arrowDownward = html`<svg height="18" width="18" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>`;

@customElement('exmg-grid-header-cell')
export class ExmgGridHeaderCell extends LitElement {

  /**
   * if not undefined sorting is enabled
   */
  @property({type: String})
  public sortable?: string;

  /**
   * Active sorting property
   */
  @property({type: String})
  public sorted?: string;

  /**
   * Sorting direction
   */
  @property({type: String})
  public sortDirection?: string;

  private _boundClick?: any; 

  protected render() {
    return html`
      <style>
        :host {
          display: table-cell;
          font-weight: 500;
          border-bottom: 1px solid #ddd;
          user-select: none;
          height: 36px;
          box-sizing: border-box;
          background-color: #f5f5f5;
          overflow: hidden;
          text-align: left;
          padding: 0px 6px;
          line-height: 36px;
          color: rgba(0,0,0,.64);
        }
        :host([align='right']) {
          text-align: right;
        }
        :host > span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          pointer-events: none;
        }
        svg {
          display: inline-block;
          vertical-align: middle;
        }
      </style>
      <span><slot></slot></span>
      ${this.displaySorting()}
    `;
  }

  constructor() {
    super();
    this._boundClick = this._handleClick.bind(this);
    this.addEventListener('click', this._boundClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._boundClick);
  }

  private _handleClick() {
    if(!this.sorted) return;

    if(this.sorted !== this.sortable) {
      this.dispatchEvent(new CustomEvent('sort-change', {
        detail: {
          sorted: this.sortable,
          sortDirection: 'ASC',
        },
        bubbles: true, 
        composed: true
      }));
      return;
    }

    this.dispatchEvent(new CustomEvent('sort-change', {
      detail: {
        sorted: this.sortable,
        sortDirection: this.sortDirection === 'ASC' ? 'DESC' : 'ASC',
      },
      bubbles: true, 
      composed: true
    }));
  }

  private displaySorting() {
    const {sorted, sortable, sortDirection} = this;
    if(!sorted || sorted !== sortable) return;
    return sortDirection === 'ASC' ? arrowUpward : arrowDownward;
  }
}