import {connectStore, ConnectedLitElement} from '../../src/router/connect';
import {createInitialRouterState, mockStore} from '../utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;

const {assert} = chai;

suite('router/connect', () => {
  test('Instance of ConnectedLitElement without connected store should fail', () => {
    const store = mockStore({router: createInitialRouterState()});
    connectStore(store);

    window.customElements.define('connected-element', ConnectedLitElement);
    const element: ConnectedLitElement = <ConnectedLitElement>fixture('ConnectedElementFixture');
    assert.instanceOf(element, ConnectedLitElement, `Element is instance of ${ConnectedLitElement.prototype.constructor.name} with connected store`);
  });
});
