import {mockStore, promisifyFlush} from './utils';
import {Link, connectLink} from '../src/components/exmg-link';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-link>', function () {
  let element: Link;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(async () => {
      connectLink(mockStore({router: {
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
      assert.equal(anchor!.innerText, 'click-me', 'Anchor text content is stupe');
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
