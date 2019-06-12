import {createStore, compose, applyMiddleware, combineReducers, StoreEnhancer} from 'redux';
import reduxThunk, {ThunkMiddleware} from 'redux-thunk';
import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';

import {connectStore, StateWithRouter} from '../src/router/connect';

import app, {AppState} from './reducers/app';
import {CounterState} from './reducers/counter';
import {ShopState} from './reducers/shop';
import {AppAction} from './actions/app';
import {CounterAction} from './actions/counter';
import {ShopAction} from './actions/shop';

import {routerReducer as router, RouterState} from '../src/reducers/router';
import {RouterAction} from '../src/actions/router';

declare global {
  interface Window {
    process?: Record<string, any>;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Overall state extends static states and partials lazy states.
export interface RootState extends StateWithRouter {
  app?: AppState;
  counter?: CounterState;
  shop?: ShopState;
  router: RouterState;
}

export type RootAction = AppAction | CounterAction | ShopAction | RouterAction;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>,
  f2: StoreEnhancer<Ext1, StateExt1>,
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management

const rootReducer = combineReducers<RootState>({
  router,
});

export const store = createStore(
  rootReducer,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootAction>),
  ),
);

// Initially loaded reducers.
store.addReducers({
  app,
  router,
});

// Router must be connected with store
connectStore(store);
