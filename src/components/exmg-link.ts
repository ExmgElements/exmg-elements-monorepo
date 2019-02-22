import {html, property, customElement, PropertyValues} from 'lit-element';

import {ConnectedLitElement, StateWithRouter} from '../router/connect';
import {RouterState} from '../reducers/router';
import {generateUrlByPath} from '../router/url-generator';

/**
 * Element helper for anchor which is connected with router reducer.
 * This element render children as the slot. Children should be anchor with attribute href
 * When href match with current router then attribute [selected] will be added to the child element.
 * Matching href with current path can be done in 2 ways, depending on attribute [exact]
 *
 * Example
 * ```
 * <exmg-link><a href="/view1">View on link"</a></exmg-link>
 * ```
 */
@customElement('exmg-link')
export class ExmgLink extends ConnectedLitElement<StateWithRouter> {
  /**
   * Perhaps if exact is true then link is selected when href is same like current router
   * otherwise if href start with current router then will be also selected
   */
  @property({type: Boolean}) exact: boolean = false;

  @property({type: Object}) private router: Partial<RouterState> = {};

  stateChanged(state: StateWithRouter) {
    this.router = state.router;
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('router')) {
      const child = this.children.item(0);

      if (child && child.hasAttribute('href')) {
        const href = child.getAttribute('href')!;
        const pathname = this.preparePathFromHref(href);
        const isSelected = !!pathname && this.isSelected(pathname);

        isSelected ? child.setAttribute('selected', 'true') : child.removeAttribute('selected');
      }
    }
  }

  protected render() {
    return html`
        <slot></slot>
      `;
  }

  private preparePathFromHref(href: string): string | void {
    if (href && href.startsWith('/')) {
      return href.split('?')[0];
    }

    try {
      return generateUrlByPath(href.split('?')[0], this.router.params);
    } catch (e) {
      return undefined;
    }
  }

  private isSelected(pathname: string): boolean {
    const isExactlySame = this.router.pathname === pathname;
    if (this.exact) {
      return isExactlySame;
    }

    const parentPathname = pathname.endsWith('/') ? pathname :`${pathname}/`;
    return isExactlySame || (this.router.pathname || '').startsWith(parentPathname);
  }
}
