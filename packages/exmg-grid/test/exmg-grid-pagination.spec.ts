import {ExmgGridPagination} from '../src/table/exmg-grid-pagination';
import {onExmgGridPaginationPageChanged, onExmgGridPaginationPageSizeChanged, promisifyFlush} from './utils';
import {PaperGridTooolbarComboboxElement} from 'src/table/exmg-grid-toolbar-combobox';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
declare const flush: (cb?: Function) => void;

const {assert} = chai;

suite('<exmg-grid-pagination>', function () {
  let element: ExmgGridPagination;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BasicTestFixture');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, ExmgGridPagination);
    });

    test('page change works properly', async () => {
      await flushCompleted();

      const prevPageBtn = element.shadowRoot!.querySelector<HTMLButtonElement>('#prevPageBtn')!;
      const nextPageBtn = element.shadowRoot!.querySelector<HTMLButtonElement>('#nextPageBtn')!;
      let pageChangedPromise;
      let timeoutPromise;

      /**
       * page 1 should exist
       */
      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      nextPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 1);

      /**
       * page 2 should exist
       */
      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      nextPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 2);

      /**
       * page 3 not existing, so no event should be emitted
       */
      pageChangedPromise = onExmgGridPaginationPageChanged(element, false);
      nextPageBtn.click();

      timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      await Promise.race([timeoutPromise, pageChangedPromise]);

      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      prevPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 1);

      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      prevPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 0);

      pageChangedPromise = onExmgGridPaginationPageChanged(element, false);
      prevPageBtn.click();

      timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      await Promise.race([timeoutPromise, pageChangedPromise]);
    });

    test('page size change works properly', async () => {
      await flushCompleted();

      const nextPageBtn = element.shadowRoot!.querySelector<HTMLButtonElement>('#nextPageBtn')!;
      const pageSizeOptionsElem = element.shadowRoot!.querySelector<PaperGridTooolbarComboboxElement>('#pageSizeOptions')!;
      let pageChangedPromise;

      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      nextPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 1);

      const pageSizeChangedPromise = onExmgGridPaginationPageSizeChanged(element, true);
      pageSizeOptionsElem.dispatchEvent(new CustomEvent('exmg-combobox-select', {bubbles: true, composed: true, detail: {value: 30}}));
      assert.deepEqual((await pageSizeChangedPromise).detail, {pageSize: 30, page: 0});

      /**
       * page 1 should exist
       */
      pageChangedPromise = onExmgGridPaginationPageChanged(element, true);
      nextPageBtn.click();
      assert.equal((await pageChangedPromise).detail.page, 1);

      /**
       * page 2 not existing - we increased page size, so we have less pages, so no event should be emitted
       */
      pageChangedPromise = onExmgGridPaginationPageChanged(element, false);
      nextPageBtn.click();

      const timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      await Promise.race([timeoutPromise, pageChangedPromise]);
    });
  });
});
