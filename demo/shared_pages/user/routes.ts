import {Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

import {RouteItem} from '@vaadin/router';
import {StateWithRouter} from '../../../src/router/connect';
import {connectUserDetail} from './user-detail';
import {connectUserList} from './user-list';

export const routes: RouteItem[] = [
  {
    path: '',
    component: 'exmg-user-list',
    name: 'user-list',
    breadcrumb: {label: 'User List'},
  },
  {
    path: 'details/:name',
    component: 'exmg-user-detail',
    name: 'exmg-user-detail',
    breadcrumb: {label: 'User Details {name}'},
  },
];

export const connect = (store: Store<StateWithRouter, any> & LazyStore) => {
  connectUserList(store);
  connectUserDetail(store);
};
