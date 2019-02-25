import {mockStore, promisifyFlush} from './utils';
import {ExmgLink} from '../src/components/exmg-link';
import {connectStore} from '../src/router/connect';
import {RouterState} from '../src/reducers/router';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-link>', function () {
  let element: ExmgLink;
  const flushCompleted = promisifyFlush(flush);
  const initialRouterState: RouterState = {
    baseUrl: '',
    pathname: '/home',
    component: '',
    params: {},
    data: {},
    breadcrumbs: [],
    queryParams: {},
  };

  suite('base usage', function () {
    setup(async () => {
      connectStore(mockStore({router: initialRouterState}));
      element = fixture('BasicTestFixture');
      await flushCompleted();
    });

    test('check if link is rendered correctly', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      const anchor = element.querySelector('a');
      assert.equal(anchor!.href, `${window.location.origin}/test`, 'Anchor href is setup');
      assert.equal(anchor!.getAttribute('selected'), null, 'Link is not selected');
      assert.equal(anchor!.innerText, 'click-me', 'Anchor text content is setup');
    });

    test('check if link is selected', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      const anchor = element.querySelector('a')!;
      element.stateChanged(
        {router: {...initialRouterState, pathname: '/test'}}
      );
      await flushCompleted();
      assert.equal(anchor!.href, `${window.location.origin}/test`, 'Anchor href is setup');
      assert.isTrue(anchor!.hasAttribute('selected'), 'Link is selected');
    });

    test('check if link is selected when matching not exact', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      const anchor = element.querySelector('a')!;

      element.stateChanged(
        {router: {...initialRouterState, pathname: '/test/me'}}
      );
      await flushCompleted();
      assert.isTrue(anchor!.hasAttribute('selected'), 'Parent link should be selected');

      element.stateChanged(
        {router: {...initialRouterState, pathname: '/tests/me'}}
      );
      await flushCompleted();
      assert.isFalse(anchor!.hasAttribute('selected'), 'Parent element should not be selected because not full segment match');
    });

    test('check if link is selected when matching exact', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      const anchor = element.querySelector('a')!;

      element.stateChanged(
        {router: {...initialRouterState, pathname: '/test/me'}}
      );
      element.exact = true;
      await flushCompleted();
      assert.isFalse(anchor!.hasAttribute('selected'), 'Parent element should not be selected because has exact props');

      element.stateChanged(
        {router: {...initialRouterState, pathname: '/test'}}
      );
      element.exact = true;
      await flushCompleted();
      assert.isTrue(anchor!.hasAttribute('selected'), 'Parent element should be selected');
    });
  });
});
