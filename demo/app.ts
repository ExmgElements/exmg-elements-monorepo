import {html, css, property, PropertyValues} from 'lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';

import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store, RootState} from './store';

// These are the actions needed by this element.
import {
  updateDrawerState, showSnackbar
} from './actions/app';

// The following line imports the type only - it will be removed by tsc so
// another import for app-drawer.js is required below.
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import {menuIcon} from './components/my-icons';
import './components/snack-bar';
import './pages/my-view404';
import {styles} from './app-styles';

import {RouterState} from '../src/reducers/router';
import {installRouter} from '../src/router/instal-router';

import {ConnectedLitElement} from '../src/router/connect';
import {appRoutes} from './app-routes';
import './components/breadcrumb';

class MyApp extends ConnectedLitElement<RootState> {
  static styles = css`
    ${styles}
  `;
  @property({type: String})
  appTitle = '';
  @property({type: Object})
  private router: Partial<RouterState> = {};
  @property({type: Boolean})
  private drawerOpened = false;
  @property({type: Boolean})
  private snackbarOpened = false;
  private unsubscribe: Function[] = [];

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  disconnectedCallback(): void {
    this.unsubscribe.forEach(fn => fn());
  }

  stateChanged(state: RootState): void {
    this.snackbarOpened = state.app!.snackbarOpened;
    this.drawerOpened = state.app!.drawerOpened;
    this.router = state.router;
  }

  protected render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this.menuButtonClicked}">${menuIcon}</button>
          <div main-title>
            ${this.appTitle}
          </div>
        </app-toolbar>

        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <exmg-link href="" content="Demo"></exmg-link>
          <exmg-link href="view1" content="View on link"></exmg-link>
          <exmg-link href="view1?page=10&sort=desc" content="View on link with query"></exmg-link>
          <exmg-link href="view2" content="View 2"></exmg-link>
          <exmg-link href="/demo/view3/details" content="View 3"></exmg-link>
          <exmg-link href="users-with-predefined-router" content="Users list"></exmg-link>
          <exmg-link href="users-with-predefined-router/details/john" content="Users John"></exmg-link>
          <exmg-link href="users-lazy" content="Users list - lazy"></exmg-link>
        </nav>
      </app-header>

      <!-- Drawer content -->
      <app-drawer
          .opened="${this.drawerOpened}"
          @opened-changed="${this.drawerOpenedChanged}">
        <nav class="drawer-list">
          <exmg-link href="" content="Demo"></exmg-link>
          <exmg-link href="view1" content="View on link"></exmg-link>
          <exmg-link href="view1?page=10&sort=desc" content="View on link with query"></exmg-link>
          <exmg-link href="view2" content="View 2"></exmg-link>
          <exmg-link href="/demo/view3/details" content="View 3"></exmg-link>
          <exmg-link href="users-with-predefined-router" content="Users list"></exmg-link>
          <exmg-link href="users-with-predefined-router/details/john" content="Users John"></exmg-link>
          <exmg-link href="users-lazy" content="Users list - lazy"></exmg-link>
        </nav>
      </app-drawer>

      <div class="breadcrumb"><exmg-breadcrumb .breadcrumbs="${this.router.breadcrumbs}"></exmg-breadcrumb></div>
      <!-- Main content -->
      <main role="main" class="main-content"></main>

      <footer>
        <p>Made with &hearts; by the Polymer team.</p>
      </footer>

      <snack-bar ?active="${this.snackbarOpened}">
        You are now on page ${this.router.pathname}.
        <h6>Params:</h6>
        <pre>
          <code>${JSON.stringify(this.router.params)}</code>
        </pre>

        <h6>QueryParams:</h6>
        <pre>
          <code>${JSON.stringify(this.router.allQueryParams)}</code>
        </pre>
      </snack-bar>
    `;
  }

  protected firstUpdated() {
    const outlet = this.shadowRoot!.querySelector<HTMLElement>('.main-content')!;
    const result = installRouter(
      store,
      outlet,
      appRoutes,
      () => store.dispatch(showSnackbar())
    );
    this.unsubscribe.push(result.unsubscribe);

    installMediaQueryWatcher(`(min-width: 460px)`,
      () => store.dispatch(updateDrawerState(false)));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('router')) {
      const {title, pathname} = this.router;
      const pageTitle = `${this.appTitle} - ${title || pathname}`;
      updateMetadata({
        title: pageTitle,
        description: pageTitle,
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  private menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  private drawerOpenedChanged(e: Event) {
    store.dispatch(updateDrawerState((e.target as AppDrawerElement).opened));
  }
}

window.customElements.define('my-app', MyApp);
