import {
  NAVIGATE_TO_PATH,
  navigateToPath,
  updateQueryParams,
  routerChanged,
  UPDATE_QUERY_PARAMS, RouterActionUpdateQueryParams, ROUTER_CHANGED, RouterActionRouterChanged
} from '../../src/actions/router';

import {Router} from '@vaadin/router';
// @ts-ignore
import {stub, assert as sinonAssert} from '../../node_modules/sinon/pkg/sinon-esm.js';
import {createInitialRouterState, mockStore} from '../utils';
import {StateWithRouter} from '../../src/router/connect';

const {assert} = chai;

suite('actions/router', () => {
  test('navigateToPath', () => {
    const goStub = stub(Router, 'go').returns(undefined);
    const path = '/path/to/navigate';
    const actionResult = navigateToPath({path});
    const expectedActionResult = {type: NAVIGATE_TO_PATH};

    assert.deepEqual(actionResult, expectedActionResult, `Output of action ${NAVIGATE_TO_PATH} match`);
    sinonAssert.callCount(goStub, 1);
    sinonAssert.calledWith(goStub, path);
    goStub.restore();
  });

  test('updateQueryParams', () => {
    const actionResult = updateQueryParams({queryParams: '?key=value'});
    const expectedActionResult: RouterActionUpdateQueryParams = {
      type: UPDATE_QUERY_PARAMS,
      queryParams: {
        key: ['value'],
      },
    };
    assert.deepEqual(actionResult, expectedActionResult, `Output of action ${UPDATE_QUERY_PARAMS} matched`);
  });

  test('routerChanged and history not replaced', () => {
    const routerState = createInitialRouterState();
    const state = {router: routerState};
    const store = mockStore<StateWithRouter, RouterActionRouterChanged>(state);
    const replaceStateStub = stub(window.history, 'replaceState');

    const actionResult: RouterActionRouterChanged = routerChanged(routerState)(store.dispatch, store.getState, undefined);
    const expectedActionResult = {...actionResult, type: ROUTER_CHANGED};

    assert.deepEqual(actionResult, expectedActionResult);
    sinonAssert.callCount(replaceStateStub, 0);
    replaceStateStub.restore();
  });

  test('routerChanged and queryParams should be reset and history replaced', () => {
    const routerState = createInitialRouterState({queryParams: {limit: ['10']}});
    const state = {router: routerState};
    const store = mockStore<StateWithRouter, RouterActionRouterChanged>(state);
    const replaceStateStub = stub(window.history, 'replaceState');

    const payload = {...routerState, queryParams: {}};
    const actionResult: RouterActionRouterChanged = routerChanged(payload)(store.dispatch, store.getState, undefined);
    const expectedActionResult = {...actionResult, type: ROUTER_CHANGED};

    assert.deepEqual(actionResult, expectedActionResult);
    sinonAssert.callCount(replaceStateStub, 1);
    sinonAssert.calledWith(replaceStateStub, {}, '', `${window.location.origin}${window.location.pathname}`);
    replaceStateStub.restore();
  });
});
