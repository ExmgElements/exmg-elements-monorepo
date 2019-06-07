import '@polymer/test-fixture';
import {ExmgFormDialog} from '../exmg-dialog-form';
import {ExmgButton} from '@exmg/exmg-button';

const {assert} = chai;
declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

suite('exmg-dialog-form', () => {
  let element: ExmgFormDialog;

  setup((done) => {
    element = fixture('BasicTestFixture');
    flush(done);
  });

  test('instantiating the element with default properties works', (done) => {
    element.addEventListener('submit', (event) => {
      assert.isNotNull(event, 'Event "submit" is thrown');
      done();
    });
    flush(() => {
      assert.equal(element.title, 'Create account');
      assert.equal(element.buttonCopy, 'Save');
      assert.equal(element.shadowRoot!.querySelector('h2')!.innerText, 'Create account');
      const submitButton = element.shadowRoot!.querySelector('#submitBtn')! as ExmgButton;
      assert.equal(submitButton.innerText, 'Save');
      submitButton.click();
    });
  });
});