import {ExmgCopyToClipboard} from '../exmg-copy-to-clipboard';
import {promisifyFlush, onCopied} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-copy-to-clipboard>', function() {
  let element: ExmgCopyToClipboard;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function() {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('check copy success event', async () => {
      await flushCompleted();

      const button = element.querySelector('button')!;
      const eventPromise = onCopied(element, true);

      button.click();

      const {detail} = await eventPromise;

      assert.equal(detail, 'copied content 1');
    });
  });
});
