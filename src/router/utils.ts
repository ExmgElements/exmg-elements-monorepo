import {generateUrlByPath} from './url-generator';
import {Location as VaadinLocation} from '@vaadin/router';

export type QueryParams = {
  queryParams: Record<string, string>;
  allQueryParams: Record<string, string[]>;
};

export const convertSearchQueryToQueryParams = (searchQuery: string): QueryParams => {
    const searchParams = new URLSearchParams(searchQuery);
    const queryParams: Record<string, string> = {};
    const allQueryParams: Record<string, string[]> = {};

    searchParams.forEach((_: string, key: string) => {
        queryParams[key] = searchParams.get(key) || '';
        allQueryParams[key] = searchParams.getAll(key);
    });

    return {queryParams, allQueryParams};
};

export const replaceParamsPlaceholders = (text: string, params: Record<string, string> = {}): string => {
  let tmpText = text;
  Object.entries(params).forEach(([paramName, value]) => {
    tmpText = tmpText.replace(RegExp(`{${paramName}}`, 'g'), value);
  });

  return tmpText;
};

export const extractBreadcrumbsFromLocation = (location: VaadinLocation) => {
  let prevPath = '';
  const {routes, params} = location;

  console.log('location', location);
  return routes
    .filter(({breadcrumb}) => !!breadcrumb)
    .map(it => {
      const slash = it.path === '' || prevPath.endsWith('/') ? '' : '/';
      const path = !!prevPath ?  `${prevPath}${slash}${it.path}` : it.path;
      const href = generateUrlByPath(path, params);
      const {label} = it.breadcrumb!;
      prevPath = path;

      return {path, href, label: replaceParamsPlaceholders(label, params)};
    });
};
