import {ExmgGrid} from '../../src/table/exmg-grid';
import {promisifyFlush, onExmgGridSortChange, onExmgGridSelectedRowsChange, onEventListenerExmgGridSelectedRowsChange} from '../utils';

// eslint-disable-next-line @typescript-eslint/ban-types
declare const flush: (cb?: Function) => void;
declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;

const {assert} = chai;

suite('exmg-grid', () => {
  let element: ExmgGrid;
  let table: HTMLTableElement;
  const flushCompleted = promisifyFlush(flush);

  suite('exmg-grid-simple', () => {
    setup(() => {
      element = fixture('SimpleGridFixture');
      table = element.querySelector('table')!;
    });

    test('simple grid is instantiated properly', () => {
      assert.instanceOf(element, ExmgGrid);
      assert.instanceOf(table, HTMLTableElement);
    });

    test('simple grid is not selectable', () => {
      const firstRow = table.querySelector<HTMLTableRowElement>('tbody tr')!;
      assert.isFalse(firstRow.hasAttribute('data-selected'));
      firstRow.click();
      assert.isFalse(firstRow.hasAttribute('data-selected'));
    });

    test('simple grid is not sortable', () => {
      const monthColumn = table.querySelector<HTMLElement>('th[data-column-key="month"]')!;
      assert.isFalse(monthColumn.hasAttribute('data-sort-direction'));
      monthColumn.click();
      assert.isFalse(monthColumn.hasAttribute('data-sort-direction'));
    });

    test('toggle column visibility', async () => {
      const areAllMonthRowsVisible = (): boolean =>
        Array.from<HTMLElement>(table.querySelectorAll('tr:not(.grid-row-detail) td:nth-child(3)')).every(
          (row) => row.style.display !== 'none',
        );
      const isAnyMonthRowsVisible = (): boolean =>
        Array.from<HTMLElement>(table.querySelectorAll('tr:not(.grid-row-detail) td:nth-child(3)')).some(
          (row) => row.style.display !== 'none',
        );

      assert.isTrue(areAllMonthRowsVisible());
      element.hiddenColumnNames = {month: 'Month'};
      await flushCompleted();
      assert.isFalse(isAnyMonthRowsVisible());

      element.hiddenColumnNames = {};
      await flushCompleted();
      assert.isTrue(areAllMonthRowsVisible());
    });
  });

  suite('complex-grid', () => {
    setup(() => {
      element = fixture('ComplexGridFixture');
      table = element.querySelector('table')!;
    });

    test('grid is sortable', async () => {
      const monthColumn = table.querySelector<HTMLElement>('th[data-column-key="month"]')!;
      await flushCompleted();

      assert.equal(monthColumn.getAttribute('data-sort-direction'), 'ASC', 'Month is sortable by default');

      const eventListener = onExmgGridSortChange(element, true);
      monthColumn.click();
      const {
        detail: {column, sortDirection},
      } = await eventListener;
      assert.equal(column, 'month');
      assert.equal(sortDirection, 'DESC');
    });

    test('grid is selectable', async () => {
      const firstRow = table.querySelector<HTMLTableRowElement>('tbody tr')!;
      await flushCompleted();

      assert.isFalse(firstRow.hasAttribute('data-selected'), 'By default is not selected');

      const eventListener = onExmgGridSelectedRowsChange(element, true);
      firstRow.click();
      const {
        detail: {rows},
      } = await eventListener;
      assert.isArray(rows);
      assert.isTrue(rows.includes(firstRow));
      assert.isTrue(firstRow.hasAttribute('data-selected'), 'Row should be selected');
    });

    test('selected rows can be changed programmatically', async () => {
      const firstRow = table.querySelector<HTMLTableRowElement>('tbody tr')!;
      const secondRow = table.querySelector<HTMLTableRowElement>('tbody tr[data-row-key="2"]')!;

      element.selectedRowIds = {
        [firstRow.getAttribute('data-row-key')!]: true,
      };
      const {flush: flushEvents, unsubscribe} = onEventListenerExmgGridSelectedRowsChange(element);
      await flushCompleted();

      assert.isTrue(firstRow.hasAttribute('data-selected'), 'By default row is selected');
      const {
        detail: {rows},
      } = flushEvents().pop()!;
      assert.isArray(rows, 'Receive event with selected rows');
      assert.isTrue(rows.includes(firstRow));

      element.selectedRowIds = {
        [firstRow.getAttribute('data-row-key')!]: false,
        [secondRow.getAttribute('data-row-key')!]: true,
      };

      await flushCompleted();
      const events = flushEvents();
      unsubscribe();
      assert.equal(events.length, 2, 'There should be 2 events');
      const lastEvent = events.pop()!;

      const {
        detail: {rows: rows2},
      } = lastEvent;
      assert.isArray(rows2, 'Receive event with selected rows');
      assert.isTrue(rows2.length > 0, 'Still has selected rows');
      assert.isFalse(rows2.includes(firstRow), 'First rows has is not selected');
      assert.isTrue(rows2.includes(secondRow), 'Second row is selected');
    });

    test('grid is expandable', async () => {
      await flushCompleted();

      assert.isNotEmpty(element.expandableToggleSelector, 'Has set expandable trigger selector');

      const firstRow = table.querySelector<HTMLTableRowElement>('tr[data-row-key="1"]')!;
      const firstRowExpandableTrigger = firstRow.querySelector<HTMLElement>(`${element.expandableToggleSelector}`)!;
      const firstRowDetail = table.querySelector<HTMLTableRowElement>('tr[data-row-detail-key="1"]')!;

      assert.isTrue(firstRowExpandableTrigger.hasAttribute('data-is-expandable'), 'Trigger should be initialized');
      assert.isFalse(firstRowExpandableTrigger.hasAttribute('data-is-expanded'), 'Row detail is not triggered to be expanded');
      assert.isFalse(firstRowDetail.hasAttribute('data-is-row-expanded'), 'Row detail is not expanded');

      firstRowExpandableTrigger.click();

      assert.isTrue(firstRowExpandableTrigger.hasAttribute('data-is-expanded'), 'Row detail is triggered to be expanded');
      assert.isTrue(firstRowDetail.hasAttribute('data-is-row-expanded'), 'Row detail is expanded');

      firstRowExpandableTrigger.click();

      assert.isFalse(firstRowExpandableTrigger.hasAttribute('data-is-expanded'), 'Row detail is not triggered to be expanded');
      assert.isFalse(firstRowDetail.hasAttribute('data-is-row-expanded'), 'Row detail is not expanded');
    });

    test('expanded rows can be changed programmatically', async () => {
      const firstRowDetail = table.querySelector<HTMLTableRowElement>('tbody tr[data-row-detail-key="1"]')!;
      const secondRowDetail = table.querySelector<HTMLTableRowElement>('tbody tr[data-row-detail-key="2"]')!;

      element.expandedRowIds = {
        [firstRowDetail.getAttribute('data-row-detail-key')!]: true,
      };
      await flushCompleted();

      assert.isTrue(firstRowDetail.hasAttribute('data-is-row-expanded'), 'First Row detail is expanded');
      assert.isFalse(secondRowDetail.hasAttribute('data-is-row-expanded'), 'Second Row detail is not expanded');

      element.expandedRowIds = {
        [firstRowDetail.getAttribute('data-row-detail-key')!]: false,
        [secondRowDetail.getAttribute('data-row-detail-key')!]: true,
      };

      await flushCompleted();

      assert.isFalse(firstRowDetail.hasAttribute('data-is-row-expanded'), 'First Row detail is not expanded');
      assert.isTrue(secondRowDetail.hasAttribute('data-is-row-expanded'), 'Second Row detail is expanded');
    });
  });
});
