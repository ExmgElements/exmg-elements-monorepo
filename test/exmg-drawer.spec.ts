import {ExmgDrawer} from '../exmg-drawer';
import {promisifyFlush, onExmgDrawerOpenedChanged} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

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

			const eventPromise = onExmgDrawerOpenedChanged(element, true);

			element.opened = true;

			const {detail} = await eventPromise;

			assert.equal(detail.value, true);
		});
	});
});
