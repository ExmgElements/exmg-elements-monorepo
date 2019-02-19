import {customElement, html, LitElement, property, PropertyValues} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';

// These are the shared styles needed by this element.
import {SharedStyles} from '../../components/shared-styles';

import {
  connect,
  Connect,
  StateWithRouter,
  Constructor,
  BaseClassConnectedLitElement
} from '../../../src/router/connect';
import {updateQueryParams} from '../../../src/actions/router';
import '../../../src/components/exmg-link';
import {generateUrl} from '../../../src/router/url-generator';

interface UserListInterface {
  users: string[];
}

export type UserList = UserListInterface & LitElement & Connect<StateWithRouter>;

type UserListCTOR = Constructor<UserList>;

export let connectedUserListClass: UserListCTOR;

/**
 * Element <exmg-link> must bee connected with redux store once app is  bootstrapping
 * @param store
 */
export const connectUserList = (store: Store<StateWithRouter, any> & LazyStore) => {
  if (connectedUserListClass) {
    // already connected
    return;
  }

  @customElement('exmg-user-list')
  class ExmgUserList extends (<BaseClassConnectedLitElement<StateWithRouter>>connect(store)(LitElement)) {
    @property({type: Array})
    users: string[] = [
      'Allan',
      'Thom',
      'John',
      'Amy',
      'Edd',
    ];

    @property({type: Array})
    inactiveUsers: string[] = [
      'Mia',
      'Sophia',
      'James',
      'Jacob',
    ];

    @property({type: String}) private sort: string = 'ASC';

    static styles = SharedStyles;

    private toggleSorting(event: Event): void {
      event.preventDefault();
      const sortValue = this.sort === 'ASC' ? 'DESC' : 'ASC';
      store.dispatch(updateQueryParams({queryParams: `?sort=${sortValue}`}));
    }

    protected render() {
      const userListUrl = generateUrl();

      return html`
        <nav>
          <a ?selected="${this.sort !== 'DESC'}" href="${userListUrl}?sort=ASC">ASC</a>
          <a ?selected="${this.sort === 'DESC'}" href="${userListUrl}?sort=DESC">DESC</a>
          <button @click="${this.toggleSorting}">Toggle Sorting</button>
        </nav>

        <section>
          <h1>User list where Thom is inactive and should cause 404 when navigate to details</h1>
          <ul>
            ${
              repeat(this.users, user => user, user => html`<li><a class="user" href="${userListUrl}/details/${user.toLowerCase()}">${user}</a></li>`)
            }
          </ul>

          <h2>Inactive users</h2>
          <ul>
            ${
              repeat(this.inactiveUsers, user => user, user => html`<li><a class="user" href="${userListUrl}/details/${user.toLowerCase()}">${user}</a></li>`)
            }
          </ul>
        </section>
      `;
    }

    // This is called every time something is updated in the store.
    routeChanged(state: StateWithRouter) {
      const sortValue = (state.router.queryParams || {}).sort || '';
      this.sort = sortValue.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    protected updated(changedProperties: PropertyValues): void {
      if (changedProperties.has('sort')) {
        const ascComparator = (a: string, b: string) => a > b ? 1 : -1;
        const descComparator = (a: string, b: string) => a > b ? -1 : 1;
        const comparator = this.sort === 'ASC' ? ascComparator : descComparator;
        this.users = this.users.sort(comparator);
        this.inactiveUsers = this.inactiveUsers.sort(comparator);
      }
    }
  }

  connectedUserListClass = ExmgUserList;
};
