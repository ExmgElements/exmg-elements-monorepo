import { ExmgStepperDrawer } from '../exmg-stepper-drawer';
import { promisifyFlush } from './util';
const { assert } = chai;
suite('<exmg-stepper-drawer>', () => {
    let element;
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
