import {ExmgQuerySelectors} from '../../../src/table/utils/exmg-query-selectors';
import {ExmgRowSelectable} from '../../../src/table/featrues/exmg-row-selectable';
import {EventDetailSelectedRowsChange} from '../../../src/table/types/exmg-grid-types';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;

const {assert} = chai;
const checkboxSelector = '.checkbox-class';

suite('exmg-row-selectable', () => {
  let element: HTMLTableElement;
  let querySelectors: ExmgQuerySelectors;
  let testInstance: ExmgRowSelectable;
  const dispatchEvent = (elem: HTMLElement) => (event: Event) => elem.dispatchEvent(event);
  const createEventListener = async (elem: HTMLElement) =>
    new Promise<CustomEvent<EventDetailSelectedRowsChange>>((resolve) => {
      elem.addEventListener('exmg-grid-selected-rows-change', (event: Event) => {
        resolve(event as CustomEvent<EventDetailSelectedRowsChange>);
      });
    });

  setup(() => {
    element = fixture('TableFixture') as HTMLTableElement;
    const tableBody: HTMLTableSectionElement = element.querySelector('tbody')!;
    querySelectors = new ExmgQuerySelectors(element, tableBody);
    testInstance = new ExmgRowSelectable(querySelectors, dispatchEvent(element), false, checkboxSelector);
  });

  suite('without selectable checkbox selector', () => {
    test('row and checkbox is not syncing', () => {
      testInstance = new ExmgRowSelectable(querySelectors, dispatchEvent(element), false);
      const checkbox = element.querySelector<HTMLInputElement>('tbody input[type="checkbox"]')!;
      const row = checkbox.closest('tr')!;
      assert.isFalse(row.hasAttribute('data-selected'), 'Row not selected before init');
      testInstance.initFeature(querySelectors.getBodyRows());
      assert.isFalse(row.hasAttribute('data-selected'), 'Row not selected after init');
      row.click();
      assert.isTrue(row.hasAttribute('data-selected'), 'Row clicked and is selected');
      assert.isFalse(checkbox.checked, 'Checkbox is not synced with row selection');
      assert.equal(testInstance.selectedRows.length, 1);
    });

    test('header checkbox does not invoke selection on rows', () => {
      testInstance = new ExmgRowSelectable(querySelectors, dispatchEvent(element), false);
      const checkbox = element.querySelector<HTMLInputElement>('th input[type="checkbox"]')!;
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');
      testInstance.initFeature(querySelectors.getBodyRows());
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');

      checkbox.click();
      assert.isTrue(checkbox.checked);
      assert.equal(testInstance.selectedRows.length, 0, 'Checked header selector does not select rows');
    });
  });

  suite('with selectable checkbox selector', () => {
    test('row and checkbox is syncing', async () => {
      const checkbox = element.querySelector<HTMLInputElement>('tbody input[type="checkbox"]')!;
      const row = checkbox.closest('tr')!;
      assert.isFalse(row.hasAttribute('data-selected'), 'Row not selected before init');
      testInstance.initFeature(querySelectors.getBodyRows());
      assert.isFalse(row.hasAttribute('data-selected'), 'Row not selected after init');
      const eventListener = createEventListener(element);
      row.click();
      assert.isTrue(row.hasAttribute('data-selected'), 'Row clicked and is selected');
      assert.isTrue(checkbox.checked, 'Checkbox is synced with row selection');
      assert.equal(testInstance.selectedRows.length, 1);
      const event = await eventListener;
      const isRowSelected = event.detail.rows.indexOf(row) > -1;
      assert.isTrue(isRowSelected, 'Event detail contains clicked rows');
    });

    test('header checkbox does invoke selection on rows', async () => {
      const checkbox = element.querySelector<HTMLInputElement>('th input[type="checkbox"]')!;
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');
      testInstance.initFeature(querySelectors.getBodyRows());
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');

      const eventListener = createEventListener(element);
      checkbox.click();
      assert.isTrue(checkbox.checked);
      assert.equal(testInstance.selectedRows.length, 2, 'Checked header selector invoke rows selection');
      assert.equal(querySelectors.getTableBody().querySelectorAll('tr[data-selected]').length, 2);
      const event = await eventListener;
      assert.equal(event.detail.rows.length, 2, 'Event detail contains all rows');
    });

    test('rows checkboxes sync with header checkbox', () => {
      const headerCheckbox = element.querySelector<HTMLInputElement>('th input[type="checkbox"]')!;
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');
      testInstance.initFeature(querySelectors.getBodyRows());
      assert.equal(testInstance.selectedRows.length, 0, 'Before init any row is selected');
      assert.isFalse(headerCheckbox.checked, 'Header checkbox is not select');

      querySelectors.getBodyRows().forEach((row) => row.click());

      assert.equal(testInstance.selectedRows.length, 2, 'All rows selected');
      assert.isTrue(headerCheckbox.checked, 'Header checkbox is synced');

      const firstRow = querySelectors.getTableBody().querySelector<HTMLElement>('tr[data-selected]')!;
      firstRow.click();
      assert.equal(testInstance.selectedRows.length, 1, 'Selected rows count decreased');
      assert.isFalse(headerCheckbox.checked, 'Not all rows checked. Header checkbox is synced');
    });
  });

  suite('update table', () => {
    let firstRow: HTMLTableRowElement;
    let secondRow: HTMLTableRowElement;

    setup(() => {
      firstRow = querySelectors.getBodyRows()![0]!;
      secondRow = querySelectors.getBodyRows()![1]!;
      testInstance.initFeature(querySelectors.getBodyRows());
      firstRow.click();
    });

    test('selected row got updated checkbox unchecked should become not selected', async () => {
      const checkbox = firstRow.querySelector<HTMLInputElement>(checkboxSelector)!;
      checkbox.removeAttribute('checked');
      assert.isTrue(firstRow.hasAttribute('data-selected'), 'Is selected before update');
      const eventListener = createEventListener(element);
      testInstance.updateFeature(querySelectors.getBodyRows());
      assert.isFalse(firstRow.hasAttribute('data-selected'), 'Is not selected after update');
      await eventListener;
    });

    test('not selected row got updated checkbox checked should become selected', async () => {
      const checkbox = secondRow.querySelector<HTMLInputElement>(checkboxSelector)!;
      checkbox.setAttribute('checked', 'checked');
      assert.isFalse(secondRow.hasAttribute('data-selected'), 'Is not selected before update');
      const eventListener = createEventListener(element);
      testInstance.updateFeature(querySelectors.getBodyRows());
      assert.isTrue(secondRow.hasAttribute('data-selected'), 'Is selected after update');
      await eventListener;
    });

    test('rows selection and checkboxes not changed', () => {
      assert.isTrue(firstRow.hasAttribute('data-selected'), 'Is selected before update');
      assert.isFalse(secondRow.hasAttribute('data-selected'), 'Is not selected before update');
      testInstance.updateFeature(querySelectors.getBodyRows());
      assert.isTrue(firstRow.hasAttribute('data-selected'), 'Is selected after update');
      assert.isFalse(secondRow.hasAttribute('data-selected'), 'Is not selected after update');
    });

    test('new row has attached listener', async () => {
      const addedRow = secondRow.cloneNode(true)! as HTMLTableRowElement;
      addedRow.setAttribute('data-row-key', '3');
      querySelectors.getTableBody().appendChild(addedRow);

      testInstance.updateFeature(querySelectors.getBodyRows());

      assert.equal(querySelectors.getBodyRows().length, 3, 'New row has been added');
      assert.isFalse(addedRow.hasAttribute('data-selected'), 'Added row is not selected');

      const eventListener = createEventListener(element);
      addedRow.click();
      const event = await eventListener;
      const isRowSelected = event.detail.rows.indexOf(addedRow) > -1;
      assert.isTrue(isRowSelected, 'Click on added row trigger event and make row selected');
      assert.isTrue(addedRow.hasAttribute('data-selected'), 'Added row is selected');
    });
  });
});
