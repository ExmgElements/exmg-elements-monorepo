import { LitElement, html } from 'lit-element';

const lookupValueByPath = (o:any, path:string) => path.split('.').reduce((r, p) => r[p], o);

// @ts-ignore
class FixedLitElement extends LitElement {}

type Constructor<T> = { new (...args: any[]): T };

export function ExmgGridUtil<B extends Constructor<any>>(base: B) {
  return class extends base {
    static get properties() {
      return {
        sorted: String,
        sortDirection: { 
          type: String,
          value: 'ASC',
        },
        items: Array,
      };
    }

    firstUpdated() {
      debugger;
      console.log('firstUpdated');
      this.gridHeader = this.shadowRoot.querySelector('exmg-grid-header-cell').parentElement;
      this._sortChange = this._handleSortChange.bind(this);
      this.gridHeader.addEventListener('sort-change', this._sortChange);
    }

    disconnectedCallback() {
      console.log('disconnectedCallback');
      super.disconnectedCallback();
      console.log('disconnectedCallback');
      debugger;
      this.gridHeader.removeEventListener('sort-change', this._sortChange);
    }

    loading() {
      return this.items === undefined ? html`<div class="loading">Loading...</div>` : '';
    }

    grid() {
      const items = this.items || [];
      if(!this.sorted) {
        return items;
      }

      const sortRows = (a:any, b:any) => {
        let fieldA:any = lookupValueByPath(a, this.sorted);
        let fieldB:any = lookupValueByPath(b, this.sorted);
        if (typeof fieldA === 'number' || typeof fieldA === 'boolean') {
          return this.sortDirection === 'ASC' ? fieldA - fieldB : fieldB - fieldA;
        } else {
          fieldA = fieldA ? fieldA.toLowerCase() : '';
          fieldB = fieldB ? fieldB.toLowerCase() : '';
          if (fieldA < fieldB) {
            return this.sortDirection === 'ASC' ? -1 : 1;
          }
          if (fieldA > fieldB) {
            return this.sortDirection === 'ASC' ? 1 : -1;
          }
        }
        return 0;
      };

      return items.sort(sortRows);
    }

    _handleSortChange(e:any) {
      const {detail} = e;
      this.sortDirection = detail.sortDirection;
      this.sorted = detail.sorted;
    }
  };
}