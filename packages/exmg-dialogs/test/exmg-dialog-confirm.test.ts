import '@polymer/test-fixture';
import {ExmgConfirmDialog} from '../exmg-dialog-confirm';
import {ExmgButton} from '@exmg/exmg-button';

const {assert} = chai;
declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;
declare const flush: (cb?: any) => void;

suite('exmg-dialog-confirm', () => {
  let element: ExmgConfirmDialog;

  setup((done) => {
    element = fixture('BasicTestFixture');
    flush(done);
  });

  test('instantiating the element with default properties works', (done) => {
    element.addEventListener('submit', (event) => {
      assert.isNotNull(event, 'Submit event is thrown');
      done();
    });
    flush(() => {
      assert.equal(element.title, 'Confirmation');
      assert.equal(element.shadowRoot!.querySelector('h2')!.innerText, 'Confirmation');
      const submitBtn = element.shadowRoot!.querySelector('#submitBtn')! as ExmgButton;
      assert.equal(submitBtn.innerText, 'Delete account');
      submitBtn.click();
    });
  });
});
