import {ExmgForm} from '../exmg-form';
import {promisifyFlush, onExmgFormCancel, onExmgFormSubmit} from './utils';
import {PaperInputElement} from '@polymer/paper-input/paper-input';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-form>', function () {
  let element: ExmgForm;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('ExmgFormBasicElement');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgForm);
    });

    test('submitting form', async () => {
      await flushCompleted();

      const field1Input = element.querySelector<PaperInputElement>('paper-input[name=field1]')!;
      const submitBtn = <HTMLElement>element.shadowRoot!.querySelector('paper-button.primary');

      const eventPromise = onExmgFormSubmit(element, true);

      field1Input.value = 'test1';
      submitBtn.click();

      const {detail} = await eventPromise;

      assert.equal(detail.field1, 'test1');
      assert.equal(detail.field2, 'test2');
    });

    test('form with missing required fields should not submit data', async () => {
      await flushCompleted();
      const submitBtn = <HTMLElement>element.shadowRoot!.querySelector('paper-button.primary');

      const eventPromise = onExmgFormSubmit(element, false);

      submitBtn.click();

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      /**
       * If we will receive form submit event test will fail, because form should not send this event
       * in case when there are required fields with empty value
       */
      return await Promise.race([timeoutPromise, eventPromise]);
    });

    test('form should throw cancel event', async () => {
      await flushCompleted();
      const cancelBtn = <HTMLElement>element.shadowRoot!.querySelector('paper-button.cancel');

      const eventPromise = onExmgFormCancel(element, true);

      cancelBtn.click();

      await eventPromise;
    });
  });
});
