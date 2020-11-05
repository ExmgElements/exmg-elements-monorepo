import '@polymer/test-fixture';
import '@polymer/paper-item/paper-item';
import '../exmg-paper-sidemenu';
import {ExmgPaperSidemenu} from '../index';
declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;
declare const flush: (cb?: any) => void;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const {assert} = chai;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const promisifyFlush = (f: any) => () => new Promise((resolve) => f(resolve));

suite('<exmg-paper-sidemenu></exmg-paper-sidemenu>', () => {
  let el: ExmgPaperSidemenu;
  const flushCompleted = promisifyFlush(flush);

  setup(async () => {
    el = fixture('basic');
    // Make tests wait until element is rendered.
    await flushCompleted();
  });

  test('Initial sidemmenu render', async () => {
    assert.isNotNull(el);
    assert.instanceOf(el, ExmgPaperSidemenu);
  });

  test('Sidemenu test collapse enable/disable', async () => {
    assert.isNotNull(el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-footer button'));

    el.setAttribute('disable-collapse', '');

    await flushCompleted();

    assert.isNull(el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-footer button'));
  });

  test('Sidemenu test collapse event', (done: Mocha.Done) => {
    const collapseEvent = () => {
      done();
    };

    el.addEventListener('collapsed', collapseEvent);

    const button: HTMLButtonElement | null = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-footer button');
    button!.click();
  });

  test('Sidemenu test collapse attribute', async () => {
    const button: HTMLButtonElement | null = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-footer button');
    button!.click();

    await flushCompleted();

    assert.equal(el.getAttribute('collapsed'), '');
  });

  test('Sidemenu test selection change event', (done: Mocha.Done) => {
    const selectedEvent = () => {
      done();
    };

    el.addEventListener('selected-changed', selectedEvent);

    const menuItem: HTMLButtonElement | null = el.querySelector<HTMLButtonElement>('paper-item');
    menuItem!.click();
  });
});
