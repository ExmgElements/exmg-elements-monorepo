import {mockStore, promisifyFlush} from './utils';
import {ExmgLink} from '../src/components/exmg-link';
import {connectStore} from '../src/router/connect';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-link>', function () {
  let element: ExmgLink;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(async () => {
      connectStore(mockStore({router: {
          baseUrl: '',
          pathname: '/selected',
          component: '',
          params: {},
          data: {},
          breadcrumbs: [],
          queryParams: {},
          allQueryParams: {},
        }}));
      element = fixture('BasicTestFixture');
      await flushCompleted();
    });

    test('check if link is rendered correctly', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      const anchor = element.querySelector('a');
      assert.equal(anchor!.href, `${window.location.origin}/test`, 'Anchor href is setup');
      assert.equal(anchor!.getAttribute('selected'), null, 'Link is not selected');
      assert.equal(element.href, '/test', 'Anchor href is setup');
      assert.equal(anchor!.innerText, 'click-me', 'Anchor text content is setup');
    });

    test('check if link is selected', async function () {
      await flushCompleted();
      assert.isDefined(element, 'Element is created');
      element.href = '/selected';
      await flushCompleted();
      const anchor = element.querySelector('a');
      assert.equal(anchor!.href, `${window.location.origin}/selected`, 'Anchor href is setup');
      assert.isTrue(anchor!.hasAttribute('selected'), 'Link is not selected');
    });
  });
});
