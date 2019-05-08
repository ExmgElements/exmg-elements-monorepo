import '@polymer/test-fixture';
import {ExmgInfoDialog} from '../src/exmg-dialog-info';
import {ExmgButton} from '@exmg/exmg-button';

const {assert} = chai;
declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

suite('ExmgDialogPlain', () => {
  let el: ExmgInfoDialog;

  setup((done) => {
    el = fixture('BasicTestFixture');
    flush(done);
  });

  test('Dialog renders', async () => {
    assert.isNotNull(el, 'Dialog element shouldn\'t be null');
    assert.instanceOf(el, ExmgInfoDialog);
  });

  test('Instantiating the element with default properties works', (done) => {
    el.addEventListener('done', (event) => {
      assert.isNotNull(event, 'Event "done" is thrown');
      done();
    });
    flush(() => {
      const doneButton = el.shadowRoot!.querySelector('#doneBtn')! as ExmgButton;
      assert.equal(doneButton.textContent, 'Continue');
      doneButton.click();
    });
  });
});
