import {Location as VaadinLocation} from '@vaadin/router';
import {generateUrlByPath} from './url-generator';
import {BreadcrumbItem} from '../actions/router';

export type QueryParams = Record<string, string[]>;

export const convertSearchQueryToQueryParams = (searchQuery: string): QueryParams => {
  const searchParams = new URLSearchParams(searchQuery);
  const queryParams: Record<string, string[]> = {};

  searchParams.forEach((_: string, key: string) => {
    queryParams[key] = searchParams.getAll(key);
  });

  return queryParams;
};

export const replaceParamsPlaceholders = (text: string, params: Record<string, string> = {}): string => {
  let tmpText = text;
  const escapePattern = (pattern: string): string => pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  Object.entries(params).forEach(([paramName, value]) => {
    const pattern = escapePattern(`{${paramName}}`);
    tmpText = tmpText.replace(RegExp(pattern, 'g'), value);
  });

  return tmpText;
};

const preparePathFromHref = (href: string, routerParams: Record<string, string> = {}): string | void => {
  if (href && href.startsWith('/')) {
    return href.split('?')[0];
  }

  try {
    return generateUrlByPath(href.split('?')[0], routerParams);
  } catch (e) {
    return undefined;
  }
};

export interface SelectedInfo {
  matchPath: boolean;
  matchFullPath: boolean;
}

export const prepareSelectedInfo = (
  href: string,
  routerPathname: string,
  routerParams: Record<string, string> = {},
): SelectedInfo => {
  const pathname = preparePathFromHref(href, routerParams);
  const isExactlySame = routerPathname === pathname;
  const parentPathname = !pathname || pathname === '' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  const matchPathname =
    isExactlySame || (typeof parentPathname === 'string' && routerPathname.startsWith(parentPathname));

  return {
    matchPath: matchPathname,
    matchFullPath: isExactlySame,
  };
};

export const extractBreadcrumbsFromLocation = (location: VaadinLocation): BreadcrumbItem[] => {
  let prevPath = '';
  const {routes, params, pathname} = location;

  return routes
    .filter(({breadcrumb}) => !!breadcrumb)
    .map(it => {
      const slash = it.path === '' || prevPath.endsWith('/') || it.path.startsWith('/') ? '' : '/';
      const path = !!prevPath ? `${prevPath}${slash}${it.path}` : it.path;
      const {label, href, disabled = false} = it.breadcrumb!;
      const preparedHref = typeof href === 'string' ? href : generateUrlByPath(path, params);
      const selectedInfo = prepareSelectedInfo(preparedHref, pathname, params);
      prevPath = path;

      return {
        path,
        disabled,
        href: preparedHref,
        label: replaceParamsPlaceholders(label, params),
        ...selectedInfo,
      };
    });
};
