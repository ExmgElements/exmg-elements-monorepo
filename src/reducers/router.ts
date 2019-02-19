import  {Reducer} from 'redux';
import {
  ROUTER_CHANGED,
  UPDATE_QUERY_PARAMS,
  RouterAction,
  RouterActionUpdateQueryParams,
  RouterActionRouterChanged,
  BreadcrumbItem
} from '../actions/router';

export interface RouterState {
  baseUrl: string;
  pathname: string;
  component: string;
  params: Record<string, string>;
  title?: string;
  data: Record<string, any>;
  breadcrumbs: BreadcrumbItem[];
  queryParams: Record<string, string>;
  allQueryParams: Record<string, string[]>;
}

const INITIAL_STATE: RouterState = {
  baseUrl: '',
  pathname: '/',
  component: '',
  params: {},
  data: {},
  breadcrumbs: [],
  queryParams: {},
  allQueryParams: {},
};

const routerReducer: Reducer<RouterState, RouterAction> = (state = INITIAL_STATE, action: RouterAction) => {
  const {type, ...rest} = action;
  switch (type) {
    case ROUTER_CHANGED:
      return {
          ...state,
          ...<RouterActionRouterChanged>rest,
      };
    case UPDATE_QUERY_PARAMS:
      return {
        ...state,
        ...<RouterActionUpdateQueryParams>rest,
      };
    default:
      return state;
  }
};

export default routerReducer;
