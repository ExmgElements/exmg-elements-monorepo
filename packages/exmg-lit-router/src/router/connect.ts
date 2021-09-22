import {LitElement} from 'lit';
import {Store, Unsubscribe} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

import {RouterState} from '../reducers/router';
import {BeforeEnterCommand, BeforeLeaveCommand, EmptyCommand, Location, Router, RedirectResult, PreventResult} from '@vaadin/router';

export interface StateWithRouter {
  router: RouterState;
}

type StoreWithRouter<S extends StateWithRouter> = Store<S, any> & LazyStore;

let connectedStore: StoreWithRouter<StateWithRouter>;

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

export const connectStore = <S extends StateWithRouter = StateWithRouter>(store: StoreWithRouter<S>) => {
  connectedStore = store;
};

const getConnectedStore = <S extends StateWithRouter>(): StoreWithRouter<S> => {
  if (!connectedStore) {
    throw new Error('Store must be connected with router! Use src/router/connect#connectStore as soon as store is created');
  }

  return connectedStore as StoreWithRouter<S>;
};

export abstract class ConnectedLitElement<S extends StateWithRouter = StateWithRouter> extends LitElement implements Connect<S> {
  /**
   * Keep information perhaps connected component is page.
   * Navigating between pages cause that at some point we have instantiated 2 pages during transition.
   * Page which we navigate from shouldn't have called hooks stateChanged and routerChanged.
   * For none page component id doesn't matter.
   * Based on this flag we need to determine what hooks needs to be called
   */
  protected readonly isPage: boolean = false;
  public routeDebug = false;
  private storeUnsubscribe?: Unsubscribe;
  private lastState?: S;
  /**
   * Copy and store router pathname value once component is connecting
   */
  private initialPathname?: string;

  constructor() {
    super();
  }

  connectedCallback() {
    this.connectedCallback();

    this.storeUnsubscribe = this.getStore().subscribe(() => {
      const nextState = this.getStore().getState();
      const routerChanged = !this.lastState || this.lastState.router !== nextState.router;

      if (routerChanged) {
        /**
         * When route changed trigger hooks only if not page component or is navigation target page component
         */
        const triggerHooks = !this.isPage || this.initialPathname === nextState.router.pathname;
        if (triggerHooks) {
          this.stateChanged(nextState);
          this.routeChanged(nextState, this.lastState);
        }
      } else {
        this.stateChanged(nextState);
      }

      this.lastState = nextState;
    });

    const state = this.getStore().getState();
    this.stateChanged(state);
    this.routeChanged(state);
    this.lastState = state;
    this.initialPathname = state.router.pathname;
  }

  disconnectedCallback(): void {
    this.storeUnsubscribe && this.storeUnsubscribe();
    this.disconnectedCallback();
  }

  /**
   * The `stateChanged(state)` method will be called when the state is updated.
   *
   */
  stateChanged(state: S) {
    if (this.routeDebug) {
      console.log('stateChanged', state);
    }
  }

  /**
   * The `routeChanged(state, prevState)` method will be called when the state.router is updated
   */
  routeChanged(state: S, prevState?: S): void {
    if (this.routeDebug) {
      console.log('routeChanged', state, prevState);
    }
  }

  protected getStore(): StoreWithRouter<S> {
    return getConnectedStore();
  }

  /**** VAADIN LIFECYCLE CALLBACKS ****/
  /* @see https://vaadin.github.io/vaadin-router/vaadin-router/demo/#vaadin-router-lifecycle-callbacks-demos */

  onBeforeLeave(location: Location, command: BeforeLeaveCommand, router: Router): Promise<any> | PreventResult | any {
    if (this.routeDebug) {
      console.log('onBeforeLeave', location, command, router);
    }
  }

  onAfterLeave(location: Location, command: EmptyCommand, router: Router): void {
    if (this.routeDebug) {
      console.log('onAfterLeave', location, command, router);
    }
  }

  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): Promise<any> | RedirectResult | PreventResult | any {
    if (this.routeDebug) {
      console.log('onBeforeEnter', location, command, router);
    }
  }

  onAfterEnter(location: Location, command: EmptyCommand, router: Router): void {
    if (this.routeDebug) {
      console.log('onAfterEnter', location, command, router);
    }
  }
}

export abstract class PageLitElement<S extends StateWithRouter = StateWithRouter> extends ConnectedLitElement<S> {
  protected readonly isPage: boolean = true;
}
