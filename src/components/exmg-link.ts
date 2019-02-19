import {html, LitElement, property, customElement, PropertyValues} from 'lit-element';
import {Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

import {BaseClassConnectedLitElement, connect, Connect, Constructor, StateWithRouter} from '../router/connect';
import {RouterState} from '../reducers/router';
import {generateUrlByPath} from '../router/url-generator';

interface LinkInterface {
  href: string;
  content: string;
}

export type Link = LinkInterface & LitElement & Connect<StateWithRouter>;

type LinkCTOR = Constructor<Link>;

export let connectedLinkClass: LinkCTOR;

/**
 * Element <exmg-link> must bee connected with redux store once app is  bootstrapping
 * @param store
 */
export const connectLink = (store: Store<StateWithRouter, any> & LazyStore) => {
  if (connectedLinkClass) {
    // already connected
    return;
  }

  /**
   * Element helper for anchor which is connected with router reducer.
   * By add attribute [selected]
   * !Note that this element is not attached to shadowRoot just in case to be possible style it from outside but
   * it cause that <slot> won't work. To setup text content user attribute `content`
   *
   * Example
   * ```
   * <exmg-link href="/view1" content="View on link"></exmg-link>
   * ```
   */
  @customElement('exmg-link')
  class ExmgLink extends (<BaseClassConnectedLitElement<StateWithRouter>>connect(store)(LitElement)) {
    /**
     * Used to pass uri
     */
    @property({type: String, reflect: true}) href: string = '';
    /**
     * Used to set text content
     */
    @property({type: String}) content: string = '';
    @property({type: Object}) private router: Partial<RouterState> = {};

    private pathNameFromHref?: string;

    createRenderRoot(): ExmgLink {
      return this;
    }

    stateChanged(state: StateWithRouter) {
      this.router = state.router || {};
    }

    protected update(changedProperties: PropertyValues): void {
      if (changedProperties.has('href') || changedProperties.has('router')) {
        if (this.href && this.href.startsWith('/')) {
          this.pathNameFromHref =  this.href.split('?')[0];
        } else {
          try {
            this.pathNameFromHref = generateUrlByPath(this.href, this.router.params);
          } catch (e) {
            this.pathNameFromHref = undefined;
          }
        }
      }

      super.update(changedProperties);
    }

    protected render() {
      return html`
        <a href="${this.href}" ?selected="${this.router.pathname === this.pathNameFromHref}">${this.content}</a>
      `;
    }
  }

  connectedLinkClass = ExmgLink;
};
