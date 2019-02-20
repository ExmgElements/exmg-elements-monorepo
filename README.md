# EXMG LIT ROUTER
## exmg-lit-router is powered by:
* pwa-helpers/router
* redux
* @vaadin/router

Please visit the [API Documentation and demo](https://bitbucket.org/exmachina/exmg-lit-router) page for more information.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
or
$ npm run start
```

## Running Tests

```
$ polymer test
or 
$ npm run test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## Intro

@exmg-lit-router is based on:
* [@vaadin/router redux](https://vaadin.github.io/vaadin-router/vaadin-router/demo/#vaadin-router-getting-started-demos)

  Most important role play vaadin router. Above documentation is also valid for this repository and 
  is recommended to read it. This library add some features on top on vaadin router but not changing behaviour.
  Here is the list of added features 
  * router is manged by redux and is placed in object state.router 
  * component connected with router have hook methods stateChanged and routeChanged
  * supported queryParams - can available in state.router
  * supported params - can available in state.router
  * possible to add title to route with placeholder for params
  * possible to add breadcrumbs to route
* [pwa-helpers](https://github.com/Polymer/pwa-helpers) 
* [Redux](https://redux.js.org/) 

## First of all you need to install router
```bash
npm i @exmg/exmg-lit-router -S
```

## Creating store with routerReducer and connect store with router

### Add to the file where you configure redux store router stuff
```typescript
import {createStore, Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

import {
  connectStore,
  StateWithRouter,
  RouterAction,
  routerReducer as router,
  RouterState,
} from '@exmg/exmg-lit-router'

export interface RootState extends StateWithRouter {
  // define more states
  router: RouterState;
}

export type RootAction = RouterAction;

// createStore goes here
const store: LazyStore & Store<RootState, any> = createStore();

// Initially loaded reducers.
store.addReducers({
  router,
});

// and finally connect store with router
connectStore(store);
```

## Create and install router config

### You need to have routes configuration file like

#### Statically imported components
```typescript
import {RouteItem} from '@vaadin/router';

export const appRoutes: RouteItem[] = [
  {
    path: '', name: 'home', component: 'my-component',
  },
  {
    path: 'users', name: 'user-list', component: 'user-list'
  },
];
```
or you can also import dynamically

```typescript
import {RouteItem} from '@vaadin/router';

export const appRoutes: RouteItem[] = [
  {
    // just import component dynamically
    path: '',
    component: 'my-component',
    action: () => import('./pages/my-component.js') as Promise<any>,
  },
  {
    // load children dynamically
    path: 'users',
    children: () => import('./shared_pages/user/routes.js').then(module => {
      return module.routes;
    }),
  },
    {
      // load module dynamically and define children config manually
      path: 'users2',
      action: () => import('./shared_pages/user/routes.js') as Promise<any>,
      children: [
        {
          path: '',
          component: 'user-list'
        },
        {
          path: 'details/:id',
          component: 'user-detail'
        }
      ],
    },
];
```

Once you have defined routes you have to install them in app

```typescript
import {LitElement, html} from 'lit-element';
import {installRouter} from '@exmg/exmg-lit-router';
import {store} from './store';
import {appRoutes} from './app-routes';

export class MyApp extends LitElement {
  private unsubscribe: Function[] = [];

  protected firstUpdated() {
    const outlet = this.shadowRoot!.querySelector<HTMLElement>('#outlet')!;
    const installationResult = installRouter(
      store,
      outlet,
      appRoutes,
      () => {/*This callback will be called whenever router changed*/},
    );
    // store unsubscribe function to release resources
    this.unsubscribe.push(installationResult.unsubscribe);
  }
    
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe.forEach(fn => fn());
  }
    
  render() {
    return html`<div id="outlet"></div>`;
  }
}
```

Router config has been extended by:
* title
```typescript
const routerItme = {
  path: 'details/:name',
  title: 'User detail {name}',
};
```
entering route `/details/john` you should have value of state.router.title equal to `User detail john`
* breadcrumb
```typescript
const routerItme = {
  path: 'details/:name',
  component: 'exmg-user-detail',
  breadcrumb: {label: 'User {name}'},
};
```
entering route `/details/john` you should have value of state.router.breadcrumbs equal to
```json
[
  {
    "path": "/detail/:name",
    "href": "/detail/john",
    "label": "User john",
    "disabled": false
  }
]

```
You can also pass custom href
```typescript
const routerItme = {
  path: 'details/:name',
  component: 'exmg-user-detail',
  breadcrumb: {label: 'User {name}', href: '/custom/path/to/'},
};
```
* data

You can pass anything (what is serializable) to the route which will be accessible in element
```typescript
const routerItme = {
  path: 'details/:name',
  data: {
    showAge: true,
    supervisorId: 123,
  },
};
```

## Pages
Generally element class should inherit form `ConnectedLitElement`.
That base class is already connected with store.
You can override hook methods:
* routeChanged(state: StateWithRouter, prevState: StateWithRouter): void

It is triggered whenever reducer router is updated in state

* stateChanged*state: StateWithRouter): void
It is triggered whenever any reducer update state

If you will update class property decorated by `@property` then automatically
element will be rerender.

### Page from external repository
```typescript
import {property} from 'lit-element';
import {ConnectedLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

export class ExternalPage extends ConnectedLitElement<StateWithRouter> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  
  routeChanged(state: StateWithRouter, prevState: StateWithRouter) {
    this.router = state.router;
  }
}
```

You can pass wider state type 

```typescript
import {property} from 'lit-element';
import {ConnectedLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

interface ExtendedState extends StateWithRouter {
  myReducer: object,
} 

export class Page extends ConnectedLitElement<ExtendedState> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  @property({type: Object}) private app: any;
  
  routeChanged(state: ExtendedState, prevState: ExtendedState) {
    this.router = state.router;
    this.app = state.myReducer;
  }
}
```

