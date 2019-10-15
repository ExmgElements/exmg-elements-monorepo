import {html, css, property, PropertyValues} from 'lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';

import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store, RootState} from './store';

// These are the actions needed by this element.
import {updateDrawerState, showSnackbar} from './actions/app';

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
import {navigateToPath, BreadcrumbItem} from '../src/actions/router';
import { BreadcrumbItem as CMSBreadcrumbItem } from './components/breadcrumb';

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

  @property({type: Object})
  private breadcrumbs: CMSBreadcrumbItem[] = [];

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  stateChanged(state: RootState): void {
    this.snackbarOpened = state.app!.snackbarOpened;
    this.drawerOpened = state.app!.drawerOpened;
    this.router = state.router;
    this.breadcrumbs = state.router.breadcrumbs.map((item: BreadcrumbItem) => {
      return {
        content: item.selector ? item.selector(state) : item.label,
        disabled: item.disabled,
        href: item.href,
        selected: item.matchFullPath,
      };
    });
  }

  private renderLinks() {
    return html`
      <exmg-link exact> <a href="">Demo</a></exmg-link>
      <exmg-link> <a href="view1">View on link</a></exmg-link>
      <exmg-link> <a href="view1%3Fpage%3D10%26sort%3Ddesc%0D%0A">View on link with query</a></exmg-link>
      <exmg-link> <a href="view2">View 2</a></exmg-link>
      <exmg-link> <a href="/demo/view3/details">View 3</a></exmg-link>
      <exmg-link> <a href="users-with-predefined-router">Users list</a></exmg-link>
      <exmg-link> <a href="users-with-predefined-router/details/john">Users John</a></exmg-link>
      <exmg-link> <a href="users-lazy">Users list - lazy</a></exmg-link>
      <exmg-link> <a href="broadcast">Broadcast Page</a></exmg-link>
    `;
  }

  protected renderBreadcrumbs() {
    
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
        <nav class="toolbar-list">${this.renderLinks()}</nav>
      </app-header>

      <!-- Drawer content -->
      <app-drawer .opened="${this.drawerOpened}" @opened-changed="${this.drawerOpenedChanged}">
        <nav class="drawer-list">${this.renderLinks()}</nav>
      </app-drawer>

      <div class="breadcrumb"><exmg-breadcrumb .items=${this.breadcrumbs}></exmg-breadcrumb></div>
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
        </pre
        >

        <h6>QueryParams:</h6>
        <pre>
          <code>${JSON.stringify(this.router.queryParams)}</code>
        </pre
        >
      </snack-bar>
    `;
  }

  protected firstUpdated() {
    const outlet = this.shadowRoot!.querySelector<HTMLElement>('.main-content')!;
    installRouter(store, outlet, appRoutes, () => store.dispatch(showSnackbar()));
    this.fixDemoServerRedirection();

    installMediaQueryWatcher('(min-width: 460px)', () => store.dispatch(updateDrawerState(false)));
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

  private fixDemoServerRedirection(): void {
    const ref = window.localStorage.getItem('_ref');
    if (ref) {
      window.localStorage.removeItem('_ref');
      const [path] = ref.split('?');

      store.dispatch(navigateToPath({path}));
    }
  }
}

window.customElements.define('my-app', MyApp);
