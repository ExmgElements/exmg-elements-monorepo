import {showSnackBar} from '../exmg-snackbars';

const {assert} = chai;
const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

suite('<exmg-snackbars>', function () {
  suite('base usage', function () {
    test('normal toast is displayed', async function () {
      showSnackBar('test message', {duration: 1000});

      assert.exists(document.querySelector('#paper-toast-container'), 'Toast container should exist');
      assert.exists(document.querySelector('paper-toast'), 'Toast should exist');
      assert.notExists(document.querySelector('div.close-btn'), 'Toast close button should exist');

      await wait(1000);
      assert.notExists(document.querySelector('paper-toast'), 'Toast should not exist');
    });

    test('normal toast with custom node id is displayed', async function () {
      showSnackBar('test message', {duration: 1000, toastContainerNodeId: 'custom-id'});

      assert.exists(document.querySelector('#' + 'custom-id'), 'Toast container should exist');
      assert.exists(document.querySelector('paper-toast'), 'Toast should exist');
      assert.notExists(document.querySelector('div.close-btn'), 'Toast close button should exist');

      await wait(1000);
      assert.notExists(document.querySelector('paper-toast'), 'Toast should not exist');
    });

    test('infinite toast with close button is displayed', async function () {
      showSnackBar('test message', {duration: 0, showCloseButton: true});

      assert.exists(document.querySelector('#paper-toast-container'), 'Toast container should exist');
      assert.exists(document.querySelector('paper-toast'), 'Toast should exist');
      assert.exists(document.querySelector('div.close-btn'), 'Toast close button should exist');

      await wait(4000);

      /**
       * Testing toast close feature
       */
      (<HTMLElement>document.querySelector('div.close-btn')).click();

      await wait(100);

      assert.notExists(document.querySelector('paper-toast'), 'Toast should not exist');
    });
  });
});
