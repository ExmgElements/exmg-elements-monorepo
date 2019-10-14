import {routerReducer} from '../../src/reducers/router';
import {createInitialRouterState} from '../utils';
import {RouterActionNavigateToPath, RouterActionRouterChanged, RouterActionUpdateQueryParams} from '../../src/actions/router';

const {assert} = chai;

suite('reducers/router', () => {
  test('Action ROUTER_CHANGED', () => {
    const initialState = createInitialRouterState();
    const action: RouterActionRouterChanged = {
      type: 'ROUTER_CHANGED',
      baseUrl: '/app',
      pathname: '/app/path/:id',
      params: {id: '123'},
      component: 'component-name',
      breadcrumbs: [],
      title: 'Page title',
      data: {someData: 'someValue'},
      queryParams: {kye: ['value']},
    };
    const {type, ...expectedNextState} = action;
    const nextState = routerReducer(initialState, action);
    assert.deepEqual(nextState, expectedNextState, 'After ROUTER_CHANGED action next state should match');
  });

  test('Action UPDATE_QUERY_PARAMS', () => {
    const initialState = createInitialRouterState();
    const action: RouterActionUpdateQueryParams = {
      type: 'UPDATE_QUERY_PARAMS',
      queryParams: {kye: ['value']},
    };
    const expectedNextState = {
      ...initialState,
      queryParams: {kye: ['value']},
    };
    const nextState = routerReducer(initialState, action);
    assert.deepEqual(nextState, expectedNextState, 'After UPDATE_QUERY_PARAMS action next state should match');
  });

  test('Action NAVIGATE_TO_PATH', () => {
    const initialState = createInitialRouterState();
    const action: RouterActionNavigateToPath = {
      type: 'NAVIGATE_TO_PATH',
    };
    const nextState = routerReducer(initialState, action);
    assert.equal(nextState, initialState, 'After NAVIGATE_TO_PATH action next state is the same as previous');
  });
});
