import {BreadcrumbsElement} from '../exmg-cms-breadcrumbs';
import {promisifyFlush} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: any) => T;
declare const flush: (cb?: any) => void;

const {assert} = chai;

suite('<exmg-cms-breadcrumbs>', function () {
  let element: BreadcrumbsElement;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function () {
    setup(() => {
      element = fixture('BreadcrumbElementBasicElement');
    });

    test('element is upgraded', function () {
      assert.instanceOf(element, BreadcrumbsElement);
    });

    test('element should have empty items', async () => {
      const elementShadowRoot = element.shadowRoot!;
      const anchorsLength = elementShadowRoot.querySelectorAll('a').length;
      assert.equal(element.items.length, 0, 'Item list is empty');
      assert.equal(anchorsLength, 0, 'No links');
    });
  });

  suite('element with items', function () {
    setup(async () => {
      element = fixture('BreadcrumbElementBasicElement');
      element.items = [
        {href: '#first', content: 'First Item', selected: false},
        {href: 'https://google.com', content: 'Second (disabled) Item', selected: false, disabled: true},
        {href: '#', content: 'Third Item', selected: false},
        {href: '#', content: 'Fourth Item', selected: false},
        {href: '#last', content: 'Fifth Item', selected: true},
      ];
      await flushCompleted();
    });

    test('element has items', async () => {
      const elementShadowRoot = element.shadowRoot!;
      await flushCompleted();
      const anchorsLength = elementShadowRoot.querySelectorAll('a').length;

      assert.equal(element.items.length, 5, 'There is 5 items');
      assert.equal(anchorsLength, 5, 'There is 5 links');
    });

    test('element wit limited items', async () => {
      const elementShadowRoot = element.shadowRoot!;
      element.limit = 3;
      await flushCompleted();
      const anchors = Array.from<HTMLAnchorElement>(elementShadowRoot.querySelectorAll<HTMLAnchorElement>('a'));
      const anchorsLength = anchors.length;
      const anchorsContent = anchors.map((aElement: HTMLAnchorElement) => aElement.innerText);
      const expectedAnchorContent = [element.items[0].content, element.items[3].content, element.items[4].content];

      assert.equal(element.items.length, 5, 'There is still 5 items');
      assert.equal(anchorsLength, 3, 'But there is 3 links');
      assert.deepEqual(anchorsContent, expectedAnchorContent, 'With limit attr links from the middle are removed');
    });

    test('element disabled is not clickable', async () => {
      const elementShadowRoot = element.shadowRoot!;
      const anchors = Array.from<HTMLAnchorElement>(elementShadowRoot.querySelectorAll<HTMLAnchorElement>('a[disabled]'));
      assert.equal(anchors.length, 1, 'There is one disabled element');
      assert.equal(anchors[0].href, 'javascript:void(0);', 'Disabled anchor should not be clickable');
    });

    test('element with custom text separator', async () => {
      const separator = '/';
      element.separatorText = separator;
      await flushCompleted();
      const elementShadowRoot = element.shadowRoot!;
      const separatorsContent = Array.from<HTMLAnchorElement>(elementShadowRoot.querySelectorAll<HTMLAnchorElement>('.separator')).map(
        (separatorElement: HTMLElement) => separatorElement.innerText,
      );

      assert.equal(separatorsContent.length, 4, 'There is 4 separators');
      assert.isTrue(
        separatorsContent.every((it) => it === separator),
        'Separator content is updated',
      );
    });
  });
});
