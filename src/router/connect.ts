import {Constructor, LitElement} from 'lit-element';
import {Store, Unsubscribe} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

import {RouterState} from '../reducers/router';
import {BeforeEnterCommand, BeforeLeaveCommand, EmptyCommand, Location, Router, RedirectResult, PreventResult} from '@vaadin/router';

export type StateWithRouter = {
  router: RouterState;
};

export type Constructor<T> = Constructor<T>;

export interface Connect<S extends StateWithRouter = StateWithRouter> {
  connectedCallback(): void;
  disconnectedCallback(): void;
  stateChanged(state: S): void;
  routeChanged(state: S, prevState?: S): void;
  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): Promise<any> | RedirectResult | PreventResult | any;
  onAfterEnter(location: Location, command: EmptyCommand, router: Router): void;
  onBeforeLeave(location: Location, command: BeforeLeaveCommand, router: Router): Promise<any> | PreventResult | any;
  onAfterLeave(location: Location, command: EmptyCommand, router: Router): void;
}

export type BaseClassConnectedLitElement<S extends StateWithRouter = StateWithRouter, T extends LitElement = LitElement> =
  Constructor<LitElement & Connect<S> & T> & LitElement & Connect<S> & T;

export const connect =
  <S extends StateWithRouter>(store: Store<S, any> & LazyStore) =>
  <T extends LitElement = LitElement>(baseElement: Constructor<T>): BaseClassConnectedLitElement =>
  // @ts-ignore
  class extends baseElement implements Connect<S> {
    private storeUnsubscribe?: Unsubscribe;
    private lastState?: S;
    private ownPath?: string;

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.storeUnsubscribe = store.subscribe(
        () => {
          const nextState = store.getState();
          this.stateChanged(nextState);
          if (this.ownPath === nextState.router.pathname && this.lastState && this.lastState.router !== nextState.router) {
            this.routeChanged(nextState, this.lastState);
          }
          this.lastState = nextState;
        }
      );

      const state = store.getState();
      this.stateChanged(state);
      this.routeChanged(state);
      this.lastState = state;
      this.ownPath = state.router.pathname;
    }

    disconnectedCallback(): void {
      this.storeUnsubscribe && this.storeUnsubscribe();

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * The `stateChanged(state)` method will be called when the state is updated.
     *
     */
    stateChanged(state: S) {}

    /**
     * The `routeChanged(state, prevState)` method will be called when the state.router is updated
     */
    routeChanged(state: S, prevState?: S): void {}

    /**** VAADIN LIFECYCLE CALLBACKS ****/
    /* @see https://vaadin.github.io/vaadin-router/vaadin-router/demo/#vaadin-router-lifecycle-callbacks-demos */

    onBeforeLeave(location: Location, command: BeforeLeaveCommand, router: Router): Promise<any> | PreventResult | any {}

    onAfterLeave(location: Location, command: EmptyCommand, router: Router): void {}

    onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): Promise<any> | RedirectResult | PreventResult | any {}

    onAfterEnter(location: Location, command: EmptyCommand, router: Router): void {}
  };
