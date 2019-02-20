import {RouteItem} from '@vaadin/router';
import '../user/user-list';
import '../user/user-detail';

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
