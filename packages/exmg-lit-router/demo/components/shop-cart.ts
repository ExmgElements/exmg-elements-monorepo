/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators';
import {connect} from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import {store, RootState} from '../store.js';

// These are the elements needed by this element.
import {removeFromCartIcon} from './my-icons.js';
import './shop-item.js';

// These are the actions needed by this element.
import {removeFromCart} from '../actions/shop.js';

// These are the reducers needed by this element.
import {CartItem, cartItemsSelector, cartTotalSelector} from '../reducers/shop.js';

// These are the shared styles needed by this element.
import {ButtonSharedStyles} from './button-shared-styles.js';

class ShopCart extends connect(store)(LitElement) {
  @property({type: Array})
  private items: CartItem[] = [];

  @property({type: Number})
  private total = 0;

  static styles = [
    ButtonSharedStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  protected render() {
    return html`
      <p ?hidden="${this.items.length !== 0}">Please add some products to cart.</p>
      ${this.items.map(
        item =>
          html`
            <div>
              <shop-item .name="${item.title}" .amount="${item.amount}" .price="${item.price}"></shop-item>
              <button @click="${this.removeButtonClicked}" data-index="${item.id}" title="Remove from cart">
                ${removeFromCartIcon}
              </button>
            </div>
          `,
      )}
      <p ?hidden="${!this.items.length}"><b>Total:</b> ${this.total}</p>
    `;
  }

  private removeButtonClicked(e: Event) {
    store.dispatch(removeFromCart((e.currentTarget as HTMLButtonElement).dataset['index']));
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this.items = cartItemsSelector(state);
    this.total = cartTotalSelector(state);
  }
}

window.customElements.define('shop-cart', ShopCart);
