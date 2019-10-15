import {AnyAction, Store} from 'redux';
import {installRouter as installRouteHelper} from 'pwa-helpers/router';

import {RouteItem, Router, Location as VaadinLocation} from '@vaadin/router';
import {routerChanged} from '../actions/router';
import {convertSearchQueryToQueryParams, replaceParamsPlaceholders, extractBreadcrumbsFromLocation} from './utils';
import {connectUrlGeneratorWithRouter} from './url-generator';

const onRouteChanged = (store: Store<any, any>) => (event: Event) => {
  const {location, router}: {location: VaadinLocation; router: RouteItem} = (event as CustomEvent).detail;
  const {params, pathname, baseUrl, route} = location;
  const {component} = router;
  console.log('onRouteChanged', location);
  store.dispatch(
    routerChanged({
      baseUrl,
      params,
      pathname,
      component,
      breadcrumbs: extractBreadcrumbsFromLocation(location),
      title: route && route.title ? replaceParamsPlaceholders(route.title, params) : undefined,
      data: route && route.data && typeof route.data === 'object' ? route.data : {},
      queryParams: convertSearchQueryToQueryParams(window.location.search),
    }),
  );
};

export interface InstallationResult {
  unsubscribe: Function;
  router: Router;
}

export type LocationUpdatedCallback = (location: Location) => void;

const beforeInstall = (routes: RouteItem[]): void => {
  // not-found route name is required
  if (!routes.find(item => item.name === 'not-found')) {
    throw new Error('Please define route with name "not-found"');
  }
};

export type Installer = (locationUpdatedCallback: (location: Location, e: Event | null) => void) => void;

export const locationUpdatedHandler = (locationUpdatedCallback?: LocationUpdatedCallback) => (location: Location, e: Event | null) => {
  if (Router.go(location.pathname)) {
    locationUpdatedCallback && locationUpdatedCallback(location);
  }
};

export const createInstallRouter = (installer: Installer) => (
  store: Store<any, AnyAction>,
  outlet: HTMLElement,
  routes: RouteItem[],
  locationUpdatedCallback?: LocationUpdatedCallback,
): InstallationResult => {
  beforeInstall(routes);

  // install pwa-helpers/route - this will catch link click and dispatch window history update
  installer(locationUpdatedHandler(locationUpdatedCallback));

  // listen to route change - this will dispatch action to router reducer
  const routerChangedHandler = onRouteChanged(store);
  window.addEventListener('vaadin-router-location-changed', routerChangedHandler);

  // create vaadin router
  const router = new Router(outlet);
  router.setRoutes(routes);

  // connect helpers with router
  connectUrlGeneratorWithRouter(router);

  return {
    router,
    unsubscribe: () => {
      window.removeEventListener('vaadin-router-location-changed', routerChangedHandler);
    },
  };
};

export const installRouter: (
  store: Store<any, AnyAction>,
  outlet: HTMLElement,
  routes: RouteItem[],
  locationUpdatedCallback?: LocationUpdatedCallback,
) => InstallationResult = createInstallRouter(installRouteHelper);
