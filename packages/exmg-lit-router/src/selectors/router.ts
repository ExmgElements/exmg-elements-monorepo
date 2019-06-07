import {StateWithRouter} from '../router/connect';

/**
 * Get collection of values for given query param key.

 * @param state {StateWithRouter}
 * @param key {String} - eg. ?a=x&a[]=y&a[key]=z, available keys are a, a[], a[key]
 * @return {string}
 */
export const getAllQueryParams = (state: StateWithRouter, key: string): string[] => {
  return (state.router.queryParams || {})[key] || [];
};

/**
 * Check perhaps exists any parameter for given key
 * @param state
 * @param key
 * @return {boolean}
 */
export const hasQueryParams = (state: StateWithRouter, key: string): boolean => {
  const allQueryParams = getAllQueryParams(state, key);
  return Array.isArray(allQueryParams) && allQueryParams.length > 0;
};

/**
 * Get first queryParam by key of return undefined
 * @param state {StateWithRouter}
 * @param key {string}
 * @return {string | undefined}
 */
export const getQueryParam = (state: StateWithRouter, key: string): string | undefined => {
  const allQueryParams = getAllQueryParams(state, key);
  if (!hasQueryParams(state, key)) {
    return undefined;
  }

  return allQueryParams[0];
};

/**
 * Get first queryParam by key of return defaultValue
 * @param state {StateWithRouter}
 * @param key {string}
 * @param defaultValue {string}
 * @return {string}
 */
export const getQueryParamOrDefault = (state: StateWithRouter, key: string, defaultValue: string): string => {
  const queryParam = getQueryParam(state, key);
  return typeof queryParam === 'undefined' ? defaultValue : queryParam;
};
