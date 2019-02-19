import {customElement, html, LitElement, property} from 'lit-element';
import {BeforeEnterCommand, Location, Router} from '@vaadin/router';

import {SharedStyles} from '../../components/shared-styles';

import {
  connect,
  Connect,
  StateWithRouter,
  Constructor,
  BaseClassConnectedLitElement
} from '../../../src/router/connect';
import '../../../src/components/exmg-link';

import {Store} from 'redux';
import {LazyStore} from 'pwa-helpers/lazy-reducer-enhancer';
import {RouterState} from '../../../src/reducers/router';
import {generateUrlByNameOrComponentName} from '../../../src/router/url-generator';

interface UserDetailInterface {}

export type UserDetail = UserDetailInterface & LitElement & Connect<StateWithRouter>;

type UserDetailCTOR = Constructor<UserDetail>;

export let connectedUserDetailClass: UserDetailCTOR;

/**
 * Element <exmg-link> must bee connected with redux store once app is  bootstrapping
 * @param store
 */
export const connectUserDetail = (store: Store<StateWithRouter, any> & LazyStore) => {
  if (connectedUserDetailClass) {
    // already connected
    return;
  }

  @customElement('exmg-user-detail')
  class ExmgDetail extends (<BaseClassConnectedLitElement<StateWithRouter>>connect(store)(LitElement)) {
    @property({type: Object}) private router: Partial<RouterState> = {};

    static styles = SharedStyles;

    private users: Map<string, {username: string; age: number; active: boolean}> = new Map();

    constructor() {
      super();
      [
        'Allan',
        'Thom',
        'John',
        'Amy',
        'Edd',
      ].forEach(username => this.users.set(username.toLowerCase(), {username, age: 10 * username.length, active: true}));
      this.users.get('thom')!.active = false;
    }

    protected render() {
      const user = this.users.get(this.router.params!.name)!;
      const userListRouteName = <string>this.router!.data!.userListName || 'user-list';
      const userListUrl = generateUrlByNameOrComponentName(userListRouteName);

      return html`
        <nav>
          <a class="back" href="${userListUrl}?sort=DESC">Back to list</a>
        </nav>
        <section>
          <h1>User detail:</h1>
          <div class="user-details">
            <dl>
              <dt>UserName:</dt>
              <dd>${user.username}</dd>
            </dl>
            <dl>
              <dt>Age:</dt>
              <dd>${user.age}</dd>
            </dl>
          </div>
        </section>
      `;
    }

    onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router): any {
      const {params} = location;
      const {name = ''} = params || {};
      if (!this.users.has(name) || !this.users.get(name)!.active) {
        return command.redirect(router.urlForName('not-found', {}));
      }
    }

    // This is called every time something is updated in the store.
    routeChanged(state: StateWithRouter, prevState: StateWithRouter) {
      this.router = state.router;
    }
  }

  connectedUserDetailClass = ExmgDetail;
};
