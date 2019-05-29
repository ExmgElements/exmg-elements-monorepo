/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {Reducer} from 'redux';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  ShopAction
} from '../actions/shop';
import {createSelector} from 'reselect';
import {RootState, RootAction} from '../store';

export interface ShopState {
  products: ProductsState;
  cart: CartState;
  error: string;
}

export interface ProductsState {
  [index: string]: ProductState;
}

export interface ProductState {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export interface CartState {
  [index: string]: number;
}

export interface CartItem {
  id: number;
  title: string;
  amount: number;
  price: number;
}

const INITIAL_STATE: ShopState = {
  products: {},
  cart: {},
  error: '',
};

const shop: Reducer<ShopState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        products: products(state.products, action),
        cart: cart(state.cart, action),
        error: '',
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        error: 'Checkout failed. Please try again',
      };
    default:
      return state;
  }
};

// Slice reducer: it only reduces the bit of the state it's concerned about.
const products = (state: ProductsState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      const productId = action.productId;
      return {
        ...state,
        [productId]: product(state[productId], action),
      };
    default:
      return state;
  }
};

const product = (state: ProductState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: state.inventory + 1,
      };
    default:
      return state;
  }
};

const cart = (state: CartState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addId = action.productId;
      return {
        ...state,
        [addId]: (state[addId] || 0) + 1,
      };
    case REMOVE_FROM_CART:
      const removeId = action.productId;
      const quantity = (state[removeId] || 0) - 1;
      if (quantity <= 0) {
        const newState = {
          ...state,
        };
        delete newState[removeId];
        return newState;
      }

      return {
        ...state,
        [removeId]: quantity,
      };
    case CHECKOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default shop;

// Per Redux best practices, the shop data in our store is structured
// for efficiency (small size and fast updates).
//
// The _selectors_ below transform store data into specific forms that
// are tailored for presentation. Putting this logic here keeps the
// layers of our app loosely coupled and easier to maintain, since
// views don't need to know about the store's internal data structures.
//
// We use a tiny library called `reselect` to create efficient
// selectors. More info: https://github.com/reduxjs/reselect.

const cartSelector = (state: RootState) => state.shop!.cart;
const productsSelector = (state: RootState) => state.shop!.products;

// Return a flattened array representation of the items in the cart
export const cartItemsSelector = createSelector(
  cartSelector,
  productsSelector,
  (cartState, productsState) => {
    return Object.keys(cartState).map(id => {
      const item = productsState[id];
      return {id: item.id, title: item.title, amount: cartState[id], price: item.price};
    });
  }
);

// Return the total cost of the items in the cart
export const cartTotalSelector = createSelector(
  cartSelector,
  productsSelector,
  (cartState, productsState) => {
    let total = 0;
    Object.keys(cartState).forEach(id => {
      const item = productsState[id];
      total += item.price * cartState[id];
    });
    return Math.round(total * 100) / 100;
  }
);

// Return the number of items in the cart
export const cartQuantitySelector = createSelector(
  cartSelector,
  cartState => {
    let num = 0;
    Object.keys(cartState).forEach(id => {
      num += cartState[id];
    });
    return num;
  }
);