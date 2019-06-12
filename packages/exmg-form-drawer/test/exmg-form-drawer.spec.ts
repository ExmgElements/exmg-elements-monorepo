import {ExmgFormDrawer} from '../exmg-form-drawer';
import {promisifyFlush, onExmgDrawerOpenedChanged} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-form-drawer>', function() {
  let element: ExmgFormDrawer;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function() {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function() {
      assert.instanceOf(element, ExmgFormDrawer);
    });

    test('form drawer has property set properties', async () => {
      await flushCompleted();

      const cancelBtnElem = element.shadowRoot!.querySelectorAll<HTMLElement>('exmg-button')[0];
      const submitBtnElem = element.shadowRoot!.querySelectorAll<HTMLElement>('exmg-button')[1];

      assert.equal(cancelBtnElem!.innerText.trim(), 'Close');
      assert.equal(submitBtnElem!.innerText.trim(), 'Create');
    });

    test('form drawer sends proper event', async () => {
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
