import {ExmgStepperDrawer} from '../exmg-stepper-drawer';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;

const {assert} = chai;

suite('<exmg-stepper-drawer>', () => {
  let element: ExmgStepperDrawer;

  suite('base usage', () => {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', () => {
      assert.instanceOf(element, ExmgStepperDrawer);
    });
  });
});
