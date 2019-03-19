import {ExmgGridToolbar} from '../src/table/exmg-grid-toolbar';
import {promisifyFlush, onExmgGridToolbarActionExecuted, onExmgGridToolbarFilterChanged} from './utils';
import {Filter, FilterConfigType, FilterSingleSelectConfig} from '../src/table/exmg-grid-toolbar-types';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-grid-toolbar>', function () {
  let element: ExmgGridToolbar;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgGridToolbar);
    });

    test('item description works properly', async () => {
      element.description = 'new description';

      await flushCompleted();

      const descriptionElem = element.shadowRoot!.querySelector<HTMLElement>('.description');

      assert.equal(descriptionElem!.innerText, 'new description');
    });

    test('item actions work properly', async () => {
      element.actions = [
        {
          id: 'export',
          text: '',
          tooltip: 'Export',
          icon: 'get_app',
        },
      ];

      await flushCompleted();

      const actionElem = element.shadowRoot!.querySelectorAll<HTMLButtonElement>('.action')[0];

      const eventPromise = onExmgGridToolbarActionExecuted(element, true);

      actionElem.click();

      const {detail} = await eventPromise;

      assert.equal(detail.id, 'export');
    });

    test('item filters work properly', async () => {
      element.filters = [
        <Filter<FilterSingleSelectConfig>>{
          id: 'status',
          name: 'Status',
          config: {
            type: FilterConfigType.SingleSelect,
            data: [
              {
                id: 'active',
                title: 'Active',
              },
              {
                id: 'inactive',
                title: 'Inactive',
              },
              {
                id: 'archived',
                title: 'Archived',
              },
            ],
          },
        },
      ];

      await flushCompleted();

      const filterElem = element.shadowRoot!.querySelectorAll<HTMLSelectElement>('.filter')[0];

      const eventPromise = onExmgGridToolbarFilterChanged(element, true);

      filterElem.value = 'inactive';
      filterElem.dispatchEvent(new Event('change'));

      const {detail} = await eventPromise;

      assert.equal(detail.id, 'status');
      assert.equal(detail.value, 'inactive');
    });
  });
});
