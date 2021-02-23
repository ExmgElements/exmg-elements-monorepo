import {ExmgForm} from '../exmg-form';
import {promisifyFlush, onExmgFormCancel, onExmgFormSubmit} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;
declare const flush: (cb?: any) => void;

const {assert} = chai;

suite('<exmg-form>', function () {
  let element: ExmgForm;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(async () => {
      element = fixture('ExmgFormBasicElement');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgForm);
    });

    test('submitting form', async () => {
      await flushCompleted();

      const field1Input = element.querySelector<HTMLInputElement>('paper-input[name=field1]')!;
      const submitBtn = element.shadowRoot!.querySelector<HTMLElement>('exmg-button[unelevated]')!;

      const eventPromise = onExmgFormSubmit(element, true);

      field1Input.value = 'test1';
      submitBtn.click();

      const {detail} = await eventPromise;

      assert.equal(detail.field1, 'test1');
      assert.equal(detail.field2, 'test2');
    });

    test('form with missing required fields should not submit data', async () => {
      await flushCompleted();
      const submitBtn = element.shadowRoot!.querySelector<HTMLElement>('exmg-button[unelevated]')!;

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
      const cancelBtn = element.shadowRoot!.querySelector<HTMLElement>('exmg-button.cancel')!;

      const eventPromise = onExmgFormCancel(element, true);

      cancelBtn.click();

      await eventPromise;
    });

    test('Should throw event dirty', async () => {
      const field1Input = element.querySelector<HTMLInputElement>('paper-input[name=field1]')!;
      field1Input.value = 'test';
      // @ts-ignore
      field1Input.fire('change');

      assert.equal(element.isDirty, true, 'Form is dirty when value has changed');
    });
  });
});
