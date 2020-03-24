import {ExmgStepperDrawer} from '../exmg-stepper-drawer';
import {promisifyFlush} from './util';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-stepper-drawer>', () => {
  let element: ExmgStepperDrawer;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', () => {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', () => {
      assert.instanceOf(element, ExmgStepperDrawer);
    });
  });
});
