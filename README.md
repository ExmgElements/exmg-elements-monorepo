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

* vaadin/router [@vaadin/router](https://vaadin.github.io/vaadin-router/vaadin-router/demo/#vaadin-router-getting-started-demos)

  Most important role play vaadin router. Above documentation is also valid for this repository and 
  is recommended to read it. This library add some features on top on vaadin router but not changing behaviour.
  Here is the list of added features
  1 router is manged by redux and is placed in object state.router
 
  2 component connected with router have hook methods stateChanged and routeChanged

  3 supported queryParams - can obtained from state.router

  4 supported params - can obtained from state.router

  5 possible to add title to route with placeholder for params

  6 possible to add breadcrumbs to route

* pwa-helpers [pwa-helpers](https://github.com/Polymer/pwa-helpers)
 
* redux - [Redux](https://redux.js.org/) 

## First of all you need to install router package
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

### Set base href
Inside index.html in head section setup
```html
<base href="/">
```
or prefixed
```html
<base href="/demo/">
```

### You need to have routes configuration file

#### Route NOT FOUND
You have to define route where user will be redirected once page not found.
Then set route name to `not-found`. Base on this name we can later on programmatically redirect user to this page  

```typescript
const routeItems = [
     // this path may be used explicitly to redirect user
    {path: '404-not-found', component: 'my-view404', name: 'not-found'},
    // pattern for any path - should be defined as te last entry
    {path: '(.*)', component: 'my-view404'},
];
```

#### Statically imported components
```typescript
import {RouteItem} from '@vaadin/router';
// import my-component and user-list here

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

```text
!!NOTE: Leveraging bundle.module import is not working
{path: 'view2/:color?', component: 'my-view2', bundle: {module: './pages/my-view2.js'}},
This is not working in chrome mobile mode when <base href="/demo/" \/> then dependencies are imported
without prefix which end up with 404 - not found network response
Recommended to use dynamic import('package.js')
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

### Router config has been enhanced by:

* title

```typescript
const routerItem = {
  path: 'details/:name',
  title: 'User detail {name}',
};
```
entering route `/details/john` you should have value of state.router.title equal to `User detail john`

* breadcrumb

```typescript
const routerItem = {
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
const routerItem = {
  path: 'details/:name',
  component: 'exmg-user-detail',
  breadcrumb: {label: 'User {name}', href: '/custom/path/to/'},
};
```

* data

You can pass anything (what is serializable) to the route which will be accessible in element
```typescript
const  routerItem = {
  path: 'details/:name',
  data: {
    showAge: true,
    supervisorId: 123,
  },
};
```

## Pages
Generally classes which are designed to be a pages in application should inherit form `PageLitElement`.
That base class `PageLitElement` is already connected with store and provide some hook methods.

You can override hook methods:

* routeChanged(state: StateWithRouter, prevState: StateWithRouter): void

It is triggered whenever reducer router is updated.

* stateChanged(state: StateWithRouter): void

It is triggered whenever any reducer update state

There is one exception when both hooks will be omitted:
Generally transition from one route to another cause connecting to new page component and disconnect from old page component.
At some point in time we have instantiated 2 pages components. Depending on lifecycle callback one of them will be mounted second one will
be disconnected. After resolving navigation transition there will be notified component which will be newly rendered if any. 

If you will update class property decorated by `@property` then automatically
element will be rerender.

### Page from external repository
```typescript
import {property} from 'lit-element';
import {PageLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

export class ExternalPage extends PageLitElement<StateWithRouter> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  
  routeChanged(state: StateWithRouter, prevState: StateWithRouter) {
    this.router = state.router;
  }
}
```

You can pass broader state type or your rootState 

```typescript
import {property} from 'lit-element';
import {PageLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

interface ExtendedState extends StateWithRouter {
  myReducer: object,
} 

export class Page extends PageLitElement<ExtendedState> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  @property({type: Object}) private app: any;
  
  routeChanged(state: ExtendedState, prevState: ExtendedState) {
    this.router = state.router;
    this.app = state.myReducer;
  }
}
```

## Components/Elements
Next to the Pages we can distinguish components/elements which are not coupled with router directly but needs to be
connected with store. In that case you should inherit from `ConnectedLitElement`.
This component is base class for `PageLitElement`. There is only small difference perhaps hooks `routerChanged, stateChanged`
should be triggered or not.

* stateChanged(state: StateWithRouter): void

It is triggered whenever any reducer update state. It is also triggered when routerChanged

* routeChanged(state: StateWithRouter, prevState: StateWithRouter): void

It is triggered whenever reducer router is updated in state

```typescript
import {property} from 'lit-element';
import {ConnectedLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

interface RootState extends StateWithRouter {
  myReducer: object,
} 

export class MyElement extends ConnectedLitElement<RootState> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  @property({type: Object}) private app: any;
  
  routeChanged(state: RootState, prevState: RootState) {
    this.router = state.router;
  }
  
  stateChanged(state: RootState) {
    this.app = state.myReducer;
  }
}
```

## Lifecycle callbacks
Is support exactly the same callback like defined in vaadin/router you can read [here](https://vaadin.github.io/vaadin-router/vaadin-router/demo/#vaadin-router-lifecycle-callbacks-demos)

Lifecycle callbacks may be used as guards, redirection or preventing leave router

* Redirect to page not-found

```typescript
import {BeforeEnterCommand, Location, Router} from '@exmg/exmg-lit-router/index-router';
import {property} from 'lit-element';
import {PageLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

export class Page extends PageLitElement<StateWithRouter> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  users = new Map();
  
  routeChanged(state: StateWithRouter, prevState: StateWithRouter) {
    this.router = state.router;
    this.app = state.myReducer;
  }

  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
    const {params} = location;
    const {name = ''} = params || {};
    if (!this.users.has(name) || !this.users.get(name)!.active) {
      return command.redirect(router.urlForName('not-found', {}));
    }
  }
}
```

* Redirect to page when page is forbidden

```typescript
import {BeforeEnterCommand, Location, Router} from '@exmg/exmg-lit-router/index-router';
import {property} from 'lit-element';
import {PageLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

export class Page extends PageLitElement<StateWithRouter> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  app: any;
  
  routeChanged(state: StateWithRouter, prevState: StateWithRouter) {
    this.router = state.router;
    this.app = state.app;
  }

  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
    if (!this.app.authenticated) {
      // here i redirect to named router "forbidden"
      return command.redirect(router.urlForName('forbidden', {}));
    }
  }
}
```

* Prevent leave page

Please note that even we prevent page leave next history entry is added.
In that case you should back history right before prevent command

```typescript
window.history.back();
// then return command.prevent();
```
___

```typescript
import {BeforeLeaveCommand, Location, Router} from '@exmg/exmg-lit-router/index-router';
import {property} from 'lit-element';
import {PageLitElement, StateWithRouter, RouterState} from '@exmg/exmg-lit-router';

export class Page extends PageLitElement<StateWithRouter> {
  @property({type: Object}) private router: Partial<RouterState> = {};
  users = new Map();
  haveTaskInProgress: boolean = true;
  
  routeChanged(state: StateWithRouter) {
    this.router = state.router;
  }

  onBeforeLeave(location: Location, command: BeforeLeaveCommand, router: Router): PreventResult | void {
    if (this.haveTaskInProgress) {
      alert('You should finish yor job before leave!');
      window.history.back();
      return command.prevent();
    }
  }
}
```

## Links
### URL
Let say we have setup `<base href="/my-app"`
and our route is 
```typescript
const routes = [
  {
    pathname: 'view1',
    children: [
      {
        path: 'detail',
        name: 'detail-route',
        component: 'detail-component'
      }
    ],
  }
];
```

Then url to `detail-component` might be:
* /my-app/view1/detail - just absolute path to base href
* view1/detail - relative path to base href
* generated path by name or path see [generate url](#generate-urls)

To navigate you can use:

* anchor `<a href="view1/details">Details</a>`

* redux action

You can also programmatically navigate to url.
```typescript
import {navigateToPath} from '@exmg/exmg-lit-router';

store.dispatch(navigateToPath({path: '/my-app/view1'}));
```

You can also programmatically change queryParams
```typescript
import {updateQueryParams} from '@exmg/exmg-lit-router';

store.dispatch(updateQueryParams({queryParams: '?page=1&limit=10'}));
```

## Redux - RouterState
Router state reflect current page.
Typing for RouterState looks:
```typescript
interface RouterState {
  baseUrl: string;
  pathname: string;
  component: string;
  params: Record<string, string>;
  title?: string;
  data: Record<string, any>;
  breadcrumbs: {
      href: string;
      path: string;
      label: string;
      disabled?: boolean;
  }[];
  queryParams: Record<string, string[]>;
}
```
Here is example of router state:
```json
{
  "router": {
    "baseUrl": "/demo/",
    "pathname": "/demo/users/details/allan",
    "params": {
      "name": "allan"
    },
    "data": {
      "showHistory": false
    },
    "breadcrumbs": [
      {
        "path": "",
        "disabled": false,
        "href": "home",
        "label": "HOME"
      },
      {
        "path": "users-lazy",
        "disabled": false,
        "href": "/demo/users",
        "label": "Users"
      },
      {
        "path": "users/details/:name",
        "disabled": false,
        "href": "/demo/users/details/allan",
        "label": "User allan"
      }
    ],
    "queryParams": {
      "mode": [
        "simplified"
      ],
      "purchaseFilters[][status]": [
        "pending",
        "accepted",
        "open"
      ]
    },
    "title": "User detail allan"
  }
}
```

* baseUrl - this is value which is set as `<base href="/" />`

* pathname - this is absolute pathname of resolved route.
It also includes `baseUrl`

* params - object with parameters which was defined in `route path` config.
It will also includes parent routes parameters if any

* data - plain object defined in router item config which can be serialized.
This allow pass static context of certain route which will be accessible to read from router state.

* breadcrumbs - it is just collection of items defined in router config which will allow to build breadcrumb component.
The order of items is from root to the leaf

* queryParams - object with parsed url search phrase. All keys are associated with an array of values
even search phrase contains unique `key=value` entries.
Example `?a=x&a=x1&a[]=y&a[]=y1&a[key]=z&a[key]=z2`, available keys are `a, a[], a[key]`
and object looks like
`{"a": ["x", "x1"], "a[]": ["y", "y1"], "a[key]": ["z", "z1"]}`

* title - title from router config with replaced params placeholders

## Generate urls
Sometimes we need to generate urls for navigation or programmatically navigation or redirection.
For this use case you can use helpers `src/router/url-generator` which are build on top of
vaadin url generation. Inside lifecycle callback it is also possible to use directly vaadin helpers
which are passed as parameters.

We can distinguish helpers:

* generate url by route name or component name

Route name is optional configuration options which must be unique across all routers.
```typescript
import {generateUrlByNameOrComponentName} from '@exmg/exmg-lit-router'

const url = generateUrlByNameOrComponentName('home-page-name');
const urlWithParameters = generateUrlByNameOrComponentName('home-page-name', {paramName: 'param-value'});
```
You can also generate url by component name but remember that component must be used in routes configuration only once.
When same component is reused for more routes then you should stick to route name.

```typescript
import {generateUrlByNameOrComponentName} from '@exmg/exmg-lit-router'

const url = generateUrlByNameOrComponentName('home-page-component');
const urlWithParameters = generateUrlByNameOrComponentName('home-page-component', {paramName: 'param-value'});
```

In lifecycle callback you can directly generate url

```typescript
import {generateUrlByNameOrComponentName} from '@exmg/exmg-lit-router'
class ExmplePage {
  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
    const url = router.urlForName('not-found', {});
  }
}
```

___

```text
Note that generating urls by name or components may failed when you are trying generate url
for children components which are not loaded yet.

Here is example of lazy loaded children routes

{
  path: 'some-path',
  children: () => import('./path/to/routes.js').then(module => {
    return module.routes;
  }),
},

if you really need lazy loading and have access to routs by name or component name
you can configure route:

{
  path: 'some-path',
  action: () => import('./path/to/routes.js') as Promise<any>,
  children: (): RouteItem[] => (
    [
      {
        path: '',
        component: 'some-list-component',
        name: 'some-list',
      },
      {
        path: 'show/:id',
        component: 'some-detail-component',
        name: 'some-detail',
      },
    ]
  ),
},

```

* generate url by path
This helper is not related with router config. It means you can pass here anything what
is valid pathname. This method will just prepend base url and replace parameter placeholders if any. 

```typescript
import {generateUrlByPath} from '@exmg/exmg-lit-router'

const url = generateUrlByPath('relative-path-to-base/domain');
const urlWithParameters = generateUrlByPath('relative-path-to-base/domain/:id', {id: '123'});
```

In lifecycle callback you can directly generate url

```typescript
import {generateUrlByNameOrComponentName} from '@exmg/exmg-lit-router'
class ExmplePage {
  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
    const url = router.urlForPath('relative-path-to-base/domain', {});
    const urlWithParametrs = router.urlForPath('relative-path-to-base/domain/:id', {id: '123'});
  }
}
```

* generate url of current page

It is also useful to generate current page url

```typescript
import {generateUrl} from '@exmg/exmg-lit-router'

const url = generateUrl();
const generateUrl = generateUrl({id: '123'});
```

In lifecycle callback you can directly generate url

```typescript
import {generateUrlByNameOrComponentName} from '@exmg/exmg-lit-router'
class ExmplePage {
  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
    const url = location.getUrl({});
    const urlWithParametrs = location.getUrl({id: '123'});
  }
}
```

 
