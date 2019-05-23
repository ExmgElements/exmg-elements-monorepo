import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
 * The `<exmg-sortable>` displays a card header including a search function.
 *
 * See card demo page for an working exmaple on how to use
 *
 * ```html
 * <exmg-paper-search-header filter-value="{{filterValue}}" place-holder="Search user">
 *   <paper-button raised>Add Item</paper-button>
 * </exmg-paper-search-header>
 * ```
 *
 * @customElement
 * @polymer
 * @memberof Exmg
 * @element exmg-paper-search-header
 * @group Exmg Paper Elements
 * @demo demo/search-header.html
 */
class SearchHeaderElement extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host > div {
            @apply --layout-horizontal;
        }
        h2 {
          max-width: 936px;
          width: 100%;
          margin: 20px auto;
        }
        iron-input {
          width: 100%;
        }
        iron-icon {
          margin: 16px 0px 16px 16px;
        }
        ::slotted(*) {
          margin: 8px 4px;
        }
        span.interactive-content {
          margin-left: 10px;
          white-space: nowrap;
          overflow: hidden;
          color: rgba(0,0,0,0.38);
          font-size: 14px;
          text-overflow: ellipsis;
          letter-spacing: .005em;
          box-sizing: border-box;
          line-height: 56px;
          font-weight: 400;
          cursor: pointer;
          width: 100%;
          @apply --layout-flex;
        }
        .search {
          background: white;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          outline-color: rgb(77, 144, 254);
          outline-offset: -2px;
          outline-style: auto;
          outline-width: 5px;
        }
        .search input {
          font-size: 14px;
          margin: 15px 0px;
          padding: 4px;
          border: 0px;
          width: 100%;
          outline: none;
          box-sizing: border-box;
        }
      </style>

      <div class$="[[_computeSearchClasses(_isSearch)]]">
        <template is="dom-if" if="[[_isSearch]]" restamp="true">
          <iron-icon icon="[[icon]]"></iron-icon>
          <iron-input bind-value="{{filterValue}}">
            <input id="searchInput" placeholder="[[placeHolder]]" on-keyup="_handleKeyUp" on-blur="_handleInputBlur">
          </iron-input>
        </template>
        <template is="dom-if" if="[[!_isSearch]]" restamp="true">
          <iron-icon icon="[[icon]]"></iron-icon>
          <span class="interactive-content" on-tap="_showSearch">[[_getFilterValue(filterValue)]]</span>
          <slot><slot>
        </slot></slot></template>
      </div>
    `;
  }
  static get is() {
    return 'exmg-paper-search-header';
  }
  static get properties() {
    return {
      /**
      * Field that will contain the search value
      */
      filterValue: {
        type: String,
        notify: true,
        value: '',
      },
      /**
      * Placeholder value to display in search field
      */
      placeHolder: {
        type: String,
        value: '',
      },
      _isSearch: {
        type: Boolean,
        value: false,
      },
      icon: {
        type: String,
        value: 'exmg-icons:search',
      },
    };
  }
  _getFilterValue(filterValue) {
    return filterValue || this.placeHolder;
  }
  _handleKeyUp(e) {
    if (e.keyCode === 27) {
      this._hideSearch();
    }
  }
  _handleInputBlur() {
    this._hideSearch();
  }
  _hideSearch() {
    this.set('_isSearch', false);
  }
  _showSearch() {
    this.set('_isSearch', true);
    setTimeout(() => this.shadowRoot.querySelector('#searchInput').focus(), 200);
  }
  _computeSearchClasses(_isSearch) {
    return _isSearch ? 'search' : '';
  }
}

window.customElements.define(SearchHeaderElement.is, SearchHeaderElement);

Exmg.SearchHeaderElement = SearchHeaderElement;

