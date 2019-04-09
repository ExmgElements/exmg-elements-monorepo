import {ExmgGridBaseToolbar} from '../src/table/exmg-grid-base-toolbar';
import {promisifyFlush} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-grid-base-toolbar>', function () {
  let element: ExmgGridBaseToolbar;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgGridBaseToolbar);
    });

    test('actions displayed properly', async () => {
      await flushCompleted();

      assert.exists(element.shadowRoot!.querySelector('.active'));
      assert.exists(element.shadowRoot!.querySelector('.actions'));
      assert.exists(element.shadowRoot!.querySelector('.with-action-separator'));
    });

    test('actions hidden properly', async () => {
      element = fixture('WithoutActionsTestFixture');

      await flushCompleted();

      assert.notExists(element.shadowRoot!.querySelector('.active'));
      assert.notExists(element.shadowRoot!.querySelector('.actions'));
      assert.notExists(element.shadowRoot!.querySelector('.with-action-separator'));
    });
  });
});
