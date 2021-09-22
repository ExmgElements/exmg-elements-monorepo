import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators';
import {repeat} from 'lit/directives/repeat';

// These are the shared styles needed by this element.
import {SharedStyles} from '../../components/shared-styles';

import {StateWithRouter, PageLitElement, generateUrl, updateQueryParams, getQueryParamOrDefault} from '../../../index';
import '../../components/exmg-link';

@customElement('exmg-user-list')
export class ExmgUserList extends PageLitElement<StateWithRouter> {
  @property({type: Array})
  users: string[] = ['Allan', 'Thom', 'John', 'Amy', 'Edd'];

  @property({type: Array})
  inactiveUsers: string[] = ['Mia', 'Sophia', 'James', 'Jacob'];

  @property({type: String}) private sort = 'ASC';

  static styles = SharedStyles;

  private toggleSorting(event: Event): void {
    event.preventDefault();
    const sortValue = this.sort === 'ASC' ? 'DESC' : 'ASC';
    this.getStore().dispatch(updateQueryParams({queryParams: `?sort=${sortValue}`}));
  }

  private renderUserList(users: string[], userListUrl: string) {
    return repeat(
      users,
      (user) => user,
      (user) => html` <li><a class="user" href="${userListUrl}/details/${user.toLowerCase()}">${user}</a></li> `,
    );
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
          ${this.renderUserList(this.users, userListUrl)}
        </ul>

        <h2>Inactive users</h2>
        <ul>
          ${this.renderUserList(this.inactiveUsers, userListUrl)}
        </ul>
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  routeChanged(state: StateWithRouter) {
    const sortValue = getQueryParamOrDefault(state, 'sort', '');
    this.sort = sortValue.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('sort')) {
      const ascComparator = (a: string, b: string) => (a > b ? 1 : -1);
      const descComparator = (a: string, b: string) => (a > b ? -1 : 1);
      const comparator = this.sort === 'ASC' ? ascComparator : descComparator;
      this.users = [...this.users.sort(comparator)];
      this.inactiveUsers = [...this.inactiveUsers.sort(comparator)];
    }
  }
}
