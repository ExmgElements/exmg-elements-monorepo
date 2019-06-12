import {Reducer} from 'redux';
import {
  ROUTER_CHANGED,
  UPDATE_QUERY_PARAMS,
  RouterAction,
  RouterActionUpdateQueryParams,
  RouterActionRouterChanged,
  BreadcrumbItem,
} from '../actions/router';

export interface RouterState {
  baseUrl: string;
  pathname: string;
  component: string;
  params: Record<string, string>;
  title?: string;
  data: Record<string, any>;
  breadcrumbs: BreadcrumbItem[];
  queryParams: Record<string, string[]>;
}

const INITIAL_STATE: RouterState = {
  baseUrl: '',
  pathname: '/',
  component: '',
  params: {},
  data: {},
  breadcrumbs: [],
  queryParams: {},
};

export const routerReducer: Reducer<RouterState, RouterAction> = (state = INITIAL_STATE, action: RouterAction) => {
  const {type, ...rest} = action;
  switch (type) {
    case ROUTER_CHANGED:
      return {
        ...state,
        ...(rest as RouterActionRouterChanged),
      };
    case UPDATE_QUERY_PARAMS:
      return {
        ...state,
        ...(rest as RouterActionUpdateQueryParams),
      };
    default:
      return state;
  }
};
