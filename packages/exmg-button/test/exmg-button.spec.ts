import {ExmgButton} from '../exmg-button';
import {promisifyFlush} from './util';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-button>', () => {
  let element: ExmgButton;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', () => {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', () => {
      assert.instanceOf(element, ExmgButton);
    });

    test('element loading state', async () => {
      element.setAttribute('loading', '');

      await flushCompleted();

      const spinner = element.shadowRoot!.querySelectorAll<HTMLButtonElement>('exmg-button-spinner');

      assert.equal(spinner.length, 1);
    });
  });
});
