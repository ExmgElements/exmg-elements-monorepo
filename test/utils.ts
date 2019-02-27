import {AnyAction, Store, Action} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';
import {RouterState} from '../src/reducers/router';

export const mockStore = <S = any, A extends Action = AnyAction>(state: S): Store<S> & LazyStore => {
  return {
    getState: (): S => {
      return state;
    },
    replaceReducer: () => {},
    subscribe: (cb: Function) => () => {},
    dispatch: (action => action),
    addReducers: newReducers => {},
  };
};

export const createInitialRouterState = (state: Partial<RouterState> = {}): RouterState => {
  return {
    baseUrl: '',
    pathname: '/home',
    component: '',
    params: {},
    data: {},
    breadcrumbs: [],
    queryParams: {},
    ...state,
  };
};
