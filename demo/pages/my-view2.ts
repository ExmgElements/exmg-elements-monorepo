/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, property} from 'lit-element';

// This element is connected to the Redux store.
import {store, RootState} from '../store';

// These are the actions needed by this element.
import {increment, decrement} from '../actions/counter';

// We are lazy loading its reducer.
import counter from '../reducers/counter';

store.addReducers({
  counter,
});

// These are the elements needed by this element.
import '../components/counter-element';

// These are the shared styles needed by this element.
import {SharedStyles} from '../components/shared-styles';

import {PageLitElement} from '../../index';

class MyView2 extends PageLitElement<RootState> {
  @property({type: Number})
  private clicks = 0;

  @property({type: Number})
  private value = 0;

  static styles = SharedStyles;

  protected render() {
    return html`
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${this.value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is connected to the
        Redux store. When the element updates its counter, this page updates the values
        in the Redux store, and you can see the current value of the counter reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element
              value="${this.value}"
              clicks="${this.clicks}"
              @counter-incremented="${this.counterIncremented}"
              @counter-decremented="${this.counterDecremented}">
          </counter-element>
        </p>
      </section>
    `;
  }

  private counterIncremented() {
    store.dispatch(increment());
  }

  private counterDecremented() {
    store.dispatch(decrement());
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this.clicks = state.counter!.clicks;
    this.value = state.counter!.value;
  }
}

window.customElements.define('my-view2', MyView2);
