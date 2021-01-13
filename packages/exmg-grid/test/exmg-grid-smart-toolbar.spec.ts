import {ExmgGridSmartToolbar} from '../src/table/exmg-grid-smart-toolbar';
import {promisifyFlush} from './utils';
import {Filter, FilterConfigType, FilterSingleSelectConfig} from '../src/table/types/exmg-grid-toolbar-types';
import {ExmgGridToolbar} from '../src/table/exmg-grid-toolbar';
import {
  ActionAmountSelectedItemsCondition,
  ActionConditionType,
  ActionWithCondition,
} from '../src/table/types/exmg-grid-smart-toolbar-types';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-grid-smart-toolbar>', function () {
  let element: ExmgGridSmartToolbar;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgGridSmartToolbar);
    });

    test('item description passed properly', async () => {
      element.description = 'new description';

      await flushCompleted();

      const smartToolbarElem = element.shadowRoot!.querySelector<ExmgGridToolbar>('exmg-grid-toolbar')!;

      assert.equal(smartToolbarElem.description, 'new description');
    });

    test('item actions passed properly', async () => {
      const actionWithCondition: ActionWithCondition<ActionAmountSelectedItemsCondition> = {
        id: 'merge',
        text: '',
        tooltip: 'Merge',
        icon: 'merge_type',
        condition: {
          type: ActionConditionType.AmountOfSelectedItemsRange,
          min: 2,
        },
      };

      element.actions = [
        {
          id: 'export',
          text: '',
          tooltip: 'Export',
          icon: 'get_app',
        },
        actionWithCondition,
      ];

      element.amountOfSelectedItems = 1;

      await flushCompleted();

      const smartToolbarElem = element.shadowRoot!.querySelector<ExmgGridToolbar>('exmg-grid-toolbar')!;

      assert.deepEqual(
        smartToolbarElem.actions,
        element.actions.filter((action) => action.id !== 'merge'),
      );
    });

    test('item filters passed properly', async () => {
      const filter: Filter<FilterSingleSelectConfig> = {
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
        disabled: false,
      };

      element.filters = [filter];

      await flushCompleted();

      const smartToolbarElem = element.shadowRoot!.querySelector<ExmgGridToolbar>('exmg-grid-toolbar')!;

      assert.deepEqual(smartToolbarElem.filters, element.filters);
    });
  });
});
