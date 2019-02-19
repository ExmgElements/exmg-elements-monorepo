/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, css, property, LitElement} from 'lit-element';
import {BeforeLeaveCommand, Location, PreventResult, RouteItem, Router} from '@vaadin/router';

// This element is connected to the Redux store.
import {store, RootState} from '../store';

// These are the actions needed by this element.
import {checkout} from '../actions/shop';

// We are lazy loading its reducer.
import shop, {cartQuantitySelector} from '../reducers/shop';

store.addReducers({
  shop,
});

// These are the elements needed by this element.
import '../components/shop-products';
import '../components/shop-cart';

// These are the shared styles needed by this element.
import {SharedStyles} from '../components/shared-styles';
import {ButtonSharedStyles} from '../components/button-shared-styles';
import {addToCartIcon} from '../components/my-icons';

import {BaseClassConnectedLitElement, connect} from '../../src/router/connect';

class MyView3 extends (<BaseClassConnectedLitElement<RootState>>connect(store)(LitElement)) {
  @property({type: Number})
  private quantity = 0;

  @property({type: String})
  private error = '';

  static styles = [
    SharedStyles,
    ButtonSharedStyles,
    css`
      button {
        border: 2px solid var(--app-dark-text-color);
        border-radius: 3px;
        padding: 8px 16px;
      }

      button:hover {
        border-color: var(--app-primary-color);
        color: var(--app-primary-color);
      }

      .cart,
      .cart svg {
        fill: var(--app-primary-color);
        width: 64px;
        height: 64px;
      }

      .circle.small {
        margin-top: -72px;
        width: 28px;
        height: 28px;
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
      }
    `,
  ];

  protected render() {
    return html`
      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this.quantity}</div></div>
        <p>This is a slightly more advanced Redux example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, as well as its 2 child elements, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${this.error}</div>
        <br>
        <p>
          <button ?hidden="${this.quantity === 0}" @click="${this.checkoutButtonClicked}">
            Checkout
          </button>
        </p>
      </section>
    `;
  }

  private checkoutButtonClicked() {
    store.dispatch(checkout());
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this.quantity = cartQuantitySelector(state);
    this.error = state.shop!.error;
  }

  onBeforeLeave(location: Location, command: BeforeLeaveCommand, router: Router): PreventResult | void {
    if (this.quantity > 0) {
      alert('Cart is not empty. Please checkout or empty you cart before navigate away.');
      window.history.back();
      return command.prevent();
    }
  }
}

window.customElements.define('my-view3', MyView3);

export const routes: RouteItem[] = [
  {
    path: '/details',
    component: 'my-view3',
    breadcrumb: {label: 'Shop'},
  },
];
