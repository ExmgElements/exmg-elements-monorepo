import {ExmgGridBaseToolbar} from '../src/table/exmg-grid-base-toolbar';
import {promisifyFlush} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-grid-base-toolbar>', function () {
  let element: ExmgGridBaseToolbar;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(async () => {
      element = fixture('BasicTestFixture');
      await flushCompleted();
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgGridBaseToolbar);
    });

    test('actions displayed properly', async () => {
      await flushCompleted();

      assert.exists(element.shadowRoot!.querySelector('.active'));
      assert.exists(element.shadowRoot!.querySelector('.actions'));
      assert.exists(element.shadowRoot!.querySelector('.with-action-separator'));
    });

    test('settings is rendered properly', () => {
      const settingsContainer = element.shadowRoot!.querySelector('.settings')!;
      assert.exists(settingsContainer, 'Settings container is rendered');
      assert.isFalse(settingsContainer.classList.contains('has-settings'), 'Settings container is rendered but is empty');
    });
  });

  suite('base toolbar without actions', () => {
    setup(async () => {
      element = fixture('WithoutActionsTestFixture');
      await flushCompleted();
    });

    test('actions hidden properly', () => {
      assert.notExists(element.shadowRoot!.querySelector('.active'));
      assert.notExists(element.shadowRoot!.querySelector('.actions'));
      assert.notExists(element.shadowRoot!.querySelector('.with-action-separator'));
    });
  });

  suite('base toolbar without slots', () => {
    setup(() => {
      element = fixture('WithoutSlotsFixture');
    });

    test('is rendering', () => {
      assert.instanceOf(element, ExmgGridBaseToolbar);
    });
  });

  suite('base toolbar settings slot', () => {
    setup(async () => {
      element = fixture('SettingsTestFixture');
      await flushCompleted();
    });

    test('is rendering', () => {
      assert.instanceOf(element, ExmgGridBaseToolbar);
    });

    test('settings is rendered properly', () => {
      const settingsContainer = element.shadowRoot!.querySelector('.settings')!;
      assert.exists(settingsContainer, 'Settings container is rendered');
      assert.isTrue(settingsContainer.classList.contains('has-settings'), 'Settings container is rendered and is not empty');
    });

  });

});
