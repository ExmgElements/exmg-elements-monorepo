import {ExmgQuerySelectors} from '../../../src/table/utils/exmg-query-selectors';
import {ExmgRowExpandable} from '../../../src/table/featrues/exmg-row-expandable';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;

const {assert} = chai;

suite('exmg-row-expandable', () => {
  let element: HTMLTableElement;
  let querySelectors: ExmgQuerySelectors;
  let testInstance: ExmgRowExpandable;
  setup(() => {
    element = fixture('TableFixture') as HTMLTableElement;
    const tableBody: HTMLTableSectionElement = element.querySelector('tbody')!;
    querySelectors = new ExmgQuerySelectors(element, tableBody);
    testInstance = new ExmgRowExpandable(querySelectors, '.expand-trigger');
  });

  test('Init expandable', () => {
    const expandableTrigger = element.querySelector('.expand-trigger')!;
    assert.instanceOf(expandableTrigger, HTMLElement);
    assert.isFalse(expandableTrigger.hasAttribute('data-is-expandable'), 'Expandable trigger is not registered');
    testInstance.initFeature();
    assert.isTrue(expandableTrigger.hasAttribute('data-is-expandable'), 'Expandable trigger is not registered');

    const amountOfRegisteredTriggers = element.querySelectorAll('.expand-trigger[data-is-expandable]').length;
    assert.equal(amountOfRegisteredTriggers, 2, 'There are 2 rows all of them should have expandable trigger');
  });

  test('row detail is expanding and collapsing', async () => {
    const expandableTrigger = element.querySelector<HTMLElement>('.expand-trigger')!;
    const rowDetail = element.querySelector('tr[data-row-detail-key="1"]')!;

    testInstance.initFeature();

    assert.isFalse(expandableTrigger.hasAttribute('data-is-expanded'));
    assert.isFalse(rowDetail.hasAttribute('data-is-row-expanded'));
    expandableTrigger.click();
    assert.isTrue(expandableTrigger.hasAttribute('data-is-expanded'));
    assert.isTrue(rowDetail.hasAttribute('data-is-row-expanded'));
    expandableTrigger.click();
    assert.isFalse(expandableTrigger.hasAttribute('data-is-expanded'));
    assert.isFalse(rowDetail.hasAttribute('data-is-row-expanded'));
  });
});
