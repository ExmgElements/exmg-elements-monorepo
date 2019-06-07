import {installRouter, createInstallRouter, locationUpdatedHandler, Installer} from '../../src/router/instal-router';
import {createInitialRouterState, mockStore} from '../utils';
import {StateWithRouter} from '../../src/router/connect';
import {connectUrlGeneratorWithRouter} from '../../src/router/url-generator';
import {Store} from 'redux';

// @ts-ignore
import {stub, spy, assert as sinonAssert} from '../../node_modules/sinon/pkg/sinon-esm.js';
import {RouteItem, Router} from '@vaadin/router';

const {assert} = chai;

suite('router/install-router', () => {
  let store: Store<StateWithRouter>;
  let outlet: HTMLElement;

  setup(() => {
    store = mockStore({router: createInitialRouterState()});
    outlet = document.createElement('div');
  });

  teardown(() => {
    // @ts-ignore - let's restore all side effects done by install-router
    connectUrlGeneratorWithRouter(undefined);
  });

  test('When not defined route "not-found" should fail', () => {
    const deferredRouterInstallation = () => installRouter(store, outlet, []);
    assert.throws(deferredRouterInstallation, Error);
    assert.throws(deferredRouterInstallation, /Please define route with name "not-found"/);
  });

  test('InstallRouter', () => {
    let registeredLocationUpdatedCallback = undefined;
    const installer: Installer = (locationUpdatedCallback: (location: Location, e: Event|null) => void) => {
      registeredLocationUpdatedCallback = locationUpdatedCallback;
    };
    const installerSpy = spy(installer);
    // const installRouteHelperStub = stub(installRouteHelper);
    const installRouterFunction = createInstallRouter(installerSpy);
    assert.isFunction(installRouterFunction, 'Install router has been created');

    const routes: RouteItem[] = [
      {path: window.location.pathname, component: 'p'},
      {path: 'not-found', component: 'p', name: 'not-found'},
      {path: '(.*)', component: 'p'},
    ];
    const result = installRouterFunction(store, outlet, routes);
    assert.isFunction(registeredLocationUpdatedCallback, 'Location update callback has been registered');
    sinonAssert.callCount(installerSpy, 1);
    sinonAssert.calledWith(installerSpy, registeredLocationUpdatedCallback);

    assert.containsAllKeys(result, ['router', 'unsubscribe']);
    const {router, unsubscribe} = result;
    assert.instanceOf(router, Router, 'Installation result should return router instance');
    assert.isFunction(unsubscribe, 'Installation result should return function to unsubscribe');
  });

  test('LocationUpdatedHandler when Router.go return true should also call callback', () => {
    const locationUpdatedCallbackStub = stub();
    const goStub = stub(Router, 'go').returns(true);

    locationUpdatedHandler(locationUpdatedCallbackStub)(window.location, null);

    sinonAssert.callCount(locationUpdatedCallbackStub, 1);
    sinonAssert.calledWith(locationUpdatedCallbackStub, window.location);
    sinonAssert.callCount(goStub, 1);
    sinonAssert.calledWith(goStub, window.location.pathname);

    goStub.restore();
  });

  test('LocationUpdatedHandler when Router.go return true and no callback provided', () => {
    const goStub = stub(Router, 'go').returns(true);

    locationUpdatedHandler()(window.location, null);

    sinonAssert.callCount(goStub, 1);
    sinonAssert.calledWith(goStub, window.location.pathname);

    goStub.restore();
  });

  test('LocationUpdatedHandler when Router.go return false should not call callback', () => {
    const locationUpdatedCallbackStub = stub();
    const goStub = stub(Router, 'go').returns(false);

    locationUpdatedHandler(locationUpdatedCallbackStub)(window.location, null);

    sinonAssert.callCount(locationUpdatedCallbackStub, 0);
    sinonAssert.callCount(goStub, 1);
    sinonAssert.calledWith(goStub, window.location.pathname);

    goStub.restore();
  });
});
