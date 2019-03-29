import {ExmgQuerySelectors} from '../../../src/table/utils/exmg-query-selectors';
import {ExmgColumnSortable} from '../../../src/table/featrues/exmg-column-sortable';
import {EventDetailSortChange} from '../../../src/table/types/exmg-grid-types';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;

const {assert} = chai;

suite('exmg-column-sortable', () => {
  let element: HTMLTableElement;
  let querySelectors: ExmgQuerySelectors;
  let testInstance: ExmgColumnSortable;
  setup(() => {
    element = <HTMLTableElement>fixture('TableFixture');
    const tableBody: HTMLTableSectionElement = element.querySelector('tbody')!;
    querySelectors = new ExmgQuerySelectors(element, tableBody);
    const dispatchEvent = (event: Event) => element.dispatchEvent(event);
    testInstance = new ExmgColumnSortable(querySelectors, dispatchEvent, 'amount', 'DESC');
  });

  test('Init default sorting', () => {
    const amountColumn = element.querySelector('[data-column-key="amount"]')!;
    assert.instanceOf(amountColumn, HTMLElement);
    assert.isFalse(amountColumn.hasAttribute('data-sort-direction'), 'There is no default sort before init');
    testInstance.initFeature();
    assert.isTrue(amountColumn.hasAttribute('data-sort-direction'));
    assert.equal(amountColumn.getAttribute('data-sort-direction'), 'DESC', 'Default sort is setup');
  });

  test('Init without default sorting', () => {
    testInstance = new ExmgColumnSortable(querySelectors, dispatchEvent);
    const amountColumn = element.querySelector('[data-column-key="amount"]')!;
    assert.instanceOf(amountColumn, HTMLElement);
    assert.isFalse(amountColumn.hasAttribute('data-sort-direction'), 'There is no default sort before init');
    testInstance.initFeature();
    assert.isFalse(amountColumn.hasAttribute('data-sort-direction'), 'After init without default sorting, still no sort-direction');
  });

  test('click on sortable column is changing direction', async () => {
    const amountColumn = element.querySelector<HTMLElement>('[data-column-key="amount"]')!;

    assert.instanceOf(amountColumn, HTMLElement);
    testInstance.initFeature();
    assert.equal(amountColumn.getAttribute('data-sort-direction'), 'DESC', 'Default sort is setup');
    amountColumn.click();
    assert.equal(amountColumn.getAttribute('data-sort-direction'), '', 'Sort direction is removed');
    amountColumn.click();
    assert.equal(amountColumn.getAttribute('data-sort-direction'), 'ASC', 'Sort direction is ASC');
  });

  test('click on sortable column is changing direction and clear previous column', () => {
    const amountColumn = element.querySelector<HTMLElement>('[data-column-key="amount"]')!;
    const yearColumn = element.querySelector<HTMLElement>('[data-column-key="year"]')!;

    testInstance.initFeature();
    assert.equal(amountColumn.getAttribute('data-sort-direction'), 'DESC', 'Default sort is setup on amount column');
    assert.isFalse(yearColumn.hasAttribute('data-sort-direction'), 'Column year has not sort direction');
    yearColumn.click();
    assert.isFalse(amountColumn.hasAttribute('data-sort-direction'), 'Sort direction on amount column has been removed');
    assert.equal(yearColumn.getAttribute('data-sort-direction'), 'ASC', 'Sort direction on column year is ASC');
  });

  test('event exmg-grid-sort-change is triggered', async () => {
    const amountColumn = element.querySelector<HTMLElement>('[data-column-key="amount"]')!;

    testInstance.initFeature();
    const assertEventDetailsSortChange = async (expected: EventDetailSortChange) => {
      const eventListener = new Promise<CustomEvent<EventDetailSortChange>>(resolve => {
        element.addEventListener('exmg-grid-sort-change', (event: Event) => {
          resolve(event as CustomEvent<EventDetailSortChange>);
        });
      });
      amountColumn.click();
      const receivedEvent: CustomEvent<EventDetailSortChange> = await eventListener;
      assert.instanceOf(receivedEvent, CustomEvent);

      assert.deepEqual(receivedEvent.detail, expected, 'Received event with proper detail');
    };

    await assertEventDetailsSortChange(
      {
        column: 'amount',
        sortDirection: undefined,
      }
    );
    await assertEventDetailsSortChange(
      {
        column: 'amount',
        sortDirection: 'ASC',
      }
    );
  });
});
