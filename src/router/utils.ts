import {Location as VaadinLocation} from '@vaadin/router';
import {generateUrlByPath} from './url-generator';
import {BreadcrumbItem} from '../actions/router';

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

export const extractBreadcrumbsFromLocation = (location: VaadinLocation): BreadcrumbItem[] => {
  let prevPath = '';
  const {routes, params} = location;

  return routes
    .filter(({breadcrumb}) => !!breadcrumb)
    .map(it => {
      const slash = it.path === '' || prevPath.endsWith('/') || it.path.startsWith('/') ? '' : '/';
      const path = !!prevPath ?  `${prevPath}${slash}${it.path}` : it.path;
      const {label, href, disabled = false} = it.breadcrumb!;
      prevPath = path;

      return {
        path,
        disabled,
        href: !!href ? href : generateUrlByPath(path, params),
        label: replaceParamsPlaceholders(label, params),
      };
    });
};
