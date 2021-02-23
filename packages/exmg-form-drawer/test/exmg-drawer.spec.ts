import {ExmgDrawer} from '../exmg-drawer';
import {promisifyFlush, onExmgDrawerOpenedChanged} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;
declare const flush: (cb?: any) => void;

const {assert} = chai;

suite('<exmg-drawer>', function () {
  let element: ExmgDrawer;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgDrawer);
    });

    test('drawer sends proper event', async () => {
      await flushCompleted();

      let eventPromise;

      eventPromise = onExmgDrawerOpenedChanged(element, true);
      element.opened = true;
      assert.equal((await eventPromise).detail.value, true);

      eventPromise = onExmgDrawerOpenedChanged(element, true);
      element.opened = false;
      assert.equal((await eventPromise).detail.value, false);
    });
  });
});
