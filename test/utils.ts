import {AnyAction, Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

export const promisifyFlush = (flush: Function) => () => new Promise(resolve => flush(resolve));

export const mockStore = <S = any, Action = AnyAction>(state: S): Store<S> & LazyStore => {
  return {
    getState: (): S => {
      return state;
    },
    replaceReducer: () => {},
    subscribe: (cb: Function) => {
      return () => {};
    },
    dispatch: action => action,
    addReducers: newReducers => {},
  };
};
