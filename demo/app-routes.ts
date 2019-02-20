import {RouteItem} from '@vaadin/router';

export const appRoutes: RouteItem[] = [
  {
    path: '', breadcrumb: {label: 'HOME', href: 'view1'}, name: 'home',
    // component: 'my-view1', action: () => import('./pages/my-view1.js') as Promise<any>,
    children: [
      {path: '', redirect: 'view1'},
      {path: 'view1/:user?/:name?', title: 'View 1', component: 'my-view1', action: () => import('./pages/my-view1.js') as Promise<any>},
      /**
       * !!NOTE: Leveraging bundle.module import is not working
       * {path: 'view2/:color?', component: 'my-view2', bundle: {module: './pages/my-view2.js'}},
       * This is not working in mobile mode when <base href="/demo/" /> then dependencies are imported
       * without prefix which end up with 404 - not found network response
       * Recommended to use dynamic import
       */
      {
        path: 'view2/:color?',
        component: 'my-view2',
        action: () => import('./pages/my-view2.js') as Promise<any>,
        breadcrumb: {label: 'Counter'},
      },
      {
        path: 'view3', children: () => import('./pages/my-view3.js').then(module => module.routes),
      },
      {
        path: 'users-with-predefined-router',
        children: () => import('./shared_pages/user/routes.js').then(module => {
          return module.routes;
        }),
      },
      {
        path: 'users-lazy',
        breadcrumb: {label: 'Users'},
        action: () => import('./shared_pages/user/routes.js') as Promise<any>,
        children: (): RouteItem[] => (
          [
            {
              path: '',
              breadcrumb: {label: 'User List'},
              component: 'exmg-user-list',
              title: 'User lazy',
              name: 'user-list-lazy',
              data: {
                someData: true,
              },
            },
            {
              path: 'details/:name',
              component: 'exmg-user-detail',
              breadcrumb: {label: 'User {name}'},
              name: 'exmg-user-detail',
              title: 'User detail {name}',
              data: {
                userListName: 'user-list-lazy',
              },
            },
          ]
        ),
      },
    ],
  },
  {path: 'index.html', redirect: ''},
  {path: '404-not-found', component: 'my-view404', name: 'not-found'},
  {path: '(.*)', component: 'my-view404'},
];
