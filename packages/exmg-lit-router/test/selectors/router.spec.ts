import {getQueryParamOrDefault, getQueryParam, hasQueryParams, getAllQueryParams} from '../../src/selectors/router';
import {createInitialRouterState} from '../utils';

const {assert} = chai;

suite('selectors/router', () => {
  test('getAllQueryParams when query params undefined should be empty', () => {
    const routerState = createInitialRouterState({queryParams: undefined});
    const state = {router: routerState};
    const result = getAllQueryParams(state, 'someKey');
    assert.deepEqual(result, [], 'Query params are an empty array');
  });

  test('getAllQueryParams when query params empty object should be empty', () => {
    const routerState = createInitialRouterState({queryParams: {}});
    const state = {router: routerState};
    const result = getAllQueryParams(state, 'someKey');
    assert.deepEqual(result, [], 'Query params are an empty array');
  });

  test('getAllQueryParams when query params exists should return an array of values', () => {
    const routerState = createInitialRouterState({queryParams: {someKey: ['value1', 'value2']}});
    const state = {router: routerState};
    const result = getAllQueryParams(state, 'someKey');
    assert.deepEqual(result, ['value1', 'value2'], 'Query params should not empty');
  });

  test('hasQueryParams when query params undefined should be false', () => {
    const routerState = createInitialRouterState({queryParams: undefined});
    const state = {router: routerState};
    const result = hasQueryParams(state, 'someKey');
    assert.isFalse(result, 'Query params not exists');
  });

  test('hasQueryParams when query params empty object should be false', () => {
    const routerState = createInitialRouterState({queryParams: {}});
    const state = {router: routerState};
    const result = hasQueryParams(state, 'someKey');
    assert.isFalse(result, 'Query params not exists');
  });

  test('hasQueryParams when query params exists should return true', () => {
    const routerState = createInitialRouterState({queryParams: {someKey: ['value1', 'value2']}});
    const state = {router: routerState};
    const result = hasQueryParams(state, 'someKey');
    assert.isTrue(result, 'Query params exists');
  });

  test('getQueryParam when query params undefined should be undefined', () => {
    const routerState = createInitialRouterState({queryParams: undefined});
    const state = {router: routerState};
    const result = getQueryParam(state, 'someKey');
    assert.isUndefined(result, 'Query param is undefined');
  });

  test('getQueryParam when query params empty object should be undefined', () => {
    const routerState = createInitialRouterState({queryParams: {}});
    const state = {router: routerState};
    const result = getQueryParam(state, 'someKey');
    assert.isUndefined(result, 'Query param is undefined');
  });

  test('getQueryParam when query params exists should return an array of values', () => {
    const routerState = createInitialRouterState({queryParams: {someKey: ['value1', 'value2']}});
    const state = {router: routerState};
    const result = getQueryParam(state, 'someKey');
    assert.equal(result, 'value1', 'Query param exists and has value "value1"');
  });

  test('getQueryParamOrDefault when query params not exists should return default value', () => {
    const routerState = createInitialRouterState({queryParams: undefined});
    const state = {router: routerState};
    const result = getQueryParamOrDefault(state, 'someKey', 'defaultValue');
    assert.equal(result, 'defaultValue', 'Query param not exits and we should get default value');
  });

  test('getQueryParamOrDefault when query params exists should return value instead defaultValue', () => {
    const routerState = createInitialRouterState({queryParams: {someKey: ['value1', 'value2']}});
    const state = {router: routerState};
    const result = getQueryParamOrDefault(state, 'someKey', 'defaultValue');
    assert.equal(result, 'value1', 'Query param exists and has value "value1"');
  });
});
