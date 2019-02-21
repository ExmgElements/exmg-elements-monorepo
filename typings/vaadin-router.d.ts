declare module '@vaadin/router' {

  interface RouterOptions {
        baseUrl?: string;
    }

    export type PreventResult = {cancel: true};
    export type Prevent = () => PreventResult;
    export type RedirectResult = (nexContext: any, pathname: string) => {
    redirect: {
      pathname: string;
      from: string;
      params: Record<string, string>;
    };
  };
    export type Redirect = (pathname: string) => RedirectResult;

    interface Context {
        pathname: string;
        params: Record<string, string>;
        route: RouteItem;
    }

    export interface Command {
        redirect: Redirect;
        component: (component: string) => void | HTMLElement;
    }

    export interface EmptyCommand {}

    interface BeforeEnterCommand {
      redirect: Redirect;
      prevent: Prevent;
    }

    export interface BeforeLeaveCommand {
      prevent: Prevent;
    }

    export interface BeforeEnterCommand {
      redirect: Redirect;
      prevent: Prevent;
    }

    type RouterItemChildren =
      ((context: Context) => Promise<RouteItem[]> | ((context: Context) => RouteItem[]) | RouteItem[]) |
        RouteItem[];

    type Breadcrumb = {
      label: string;
      href?: string;
      disabled?: boolean;
    };

    interface RouteItem {
        path: string;
        component?: string;
        action?: <R extends any = any>(context: Context, command: Command) => R | Promise<R>;
        children?: RouterItemChildren;
        redirect?: string;
        bundle?: string | {module?: string; nomodule?: string};
        name?: string;
        title?: string;
        data?: Record<string, any>;
        breadcrumb?: Breadcrumb;
    }

    interface Location {
        baseUrl: string;
        pathname: string;
        routes: RouteItem[];
        route: RouteItem | null;
        params: Record<string, string>;
        redirectFrom: string;
        getUrl: (userParams?: Record<string, string>) => string;
    }

    export class Router {
        baseUrl: string;
        ready: Promise<any>;
        readonly location: Location;
        static go(path: string): boolean;

        constructor(outlet: HTMLElement, options?: RouterOptions);

        subscribe: Function;
        unsubscribe: Function;

        setRoutes(routes: RouteItem | RouteItem[]): void;
        urlForName(name: string, params: Record<string, string>): string;
        urlForPath(path: string, params: Record<string, string>): string;
        render(pathnameOrContext: Context | string, shouldUpdateHistory: boolean): Promise<HTMLElement>;
    }

}
