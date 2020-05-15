import {ExmgSearchBar} from '../exmg-searchbar';
import {promisifyFlush} from './utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;
declare const flush: (cb?: Function) => void;

const {assert} = chai;
const keysToPress = ['e', 'x', 'm', 'a', 'c', 'h', 'i', 'n', 'a'];

suite('<exmg-searchbar>', function() {
  let element: ExmgSearchBar;
  const flushCompleted = promisifyFlush(flush);

  suite('base usage', function() {
    setup(async () => {
      element = fixture('ExmgSearchbarBasicElement');
    });

    test('element is upgraded', function() {
      assert.instanceOf(element, ExmgSearchBar);
    });

    test('element can be focused', function() {
      element.click();
    });

    test('fires on query change', async () => {
      await flushCompleted();

      const inputElement = element.shadowRoot!.querySelector('mwc-textfield')!;
      let handledQueryChange = false;

      element.addEventListener('query-change', function(event: any) {
        handledQueryChange = true;
        const input = event.detail.value;
        assert.instanceOf(event, CustomEvent);
        assert.equal(input, element.searchQuery);
      });

      keysToPress.forEach(key => {
        handledQueryChange = false;
        inputElement.value += key;
        inputElement.dispatchEvent(new Event('input'));
        assert.equal(handledQueryChange, true);
      });
    });

    test('fires on query submit with ENTER', async () => {
      await flushCompleted();

      const inputElement = element.shadowRoot!.querySelector('mwc-textfield')!;
      let handledQuerySubmit = false;

      element.addEventListener('query-submit', function(event: any) {
        handledQuerySubmit = true;
        const input = event.detail.value;
        assert.instanceOf(event, CustomEvent);
        assert.equal(input, element.searchQuery);
      });
      const query = keysToPress.join('');
      inputElement.value = query;
      inputElement.dispatchEvent(new KeyboardEvent('keypress', {key: 'ENTER'}));
      assert.equal(handledQuerySubmit, true);
    });

    test('fires on query submit with SHIFT', async () => {
      await flushCompleted();

      const inputElement = element.shadowRoot!.querySelector('mwc-textfield')!;
      let handledQuerySubmit = false;

      element.submitKeys.push('SHIFT');
      element.addEventListener('query-submit', function(event: any) {
        handledQuerySubmit = true;
        const input = event.detail.value;
        assert.instanceOf(event, CustomEvent);
        assert.equal(input, element.searchQuery);
      });
      const query = keysToPress.join('');
      inputElement.value = query;
      inputElement.dispatchEvent(new KeyboardEvent('keypress', {key: 'SHIFT'}));
      assert.equal(handledQuerySubmit, true);
    });

    test('does not fire on query submit with ENTER without any key filters', async () => {
      await flushCompleted();

      const inputElement = element.shadowRoot!.querySelector('mwc-textfield')!;
      let handledQuerySubmit = false;

      element.submitKeys = [];
      element.addEventListener('query-submit', function(event: any) {
        handledQuerySubmit = true;
        const input = event.detail.value;
        assert.instanceOf(event, CustomEvent);
        assert.equal(input, element.searchQuery);
      });
      const query = keysToPress.join('');
      inputElement.value = query;
      inputElement.dispatchEvent(new KeyboardEvent('keypress', {key: 'ENTER'}));
      assert.equal(handledQuerySubmit, false);
    });

    const mockSuggestions = [{text: 'Ex', value: 1}, {text: 'Machina', value: 2}];

    test('lists suggestions', async () => {
      await flushCompleted();
      element.suggestions = mockSuggestions;
      setTimeout(() => {
        const suggestionsElement = element.shadowRoot!.querySelector('.exmg-searchbar-suggestions')!;
        const paperListBox = suggestionsElement!.querySelector('paper-listbox')!;
        assert.equal(mockSuggestions.length, paperListBox.children.length);
      }, 0);
    });

    test('fires suggestion select', async () => {
      await flushCompleted();

      let handledSuggestionSelect = false;

      element.addEventListener('suggestion-select', function(event: any) {
        handledSuggestionSelect = true;
        assert.instanceOf(event, CustomEvent);
        assert.equal(event.detail.index, 0);
        assert.equal(event.detail.value, mockSuggestions[0].value);
      });
      element.suggestions = mockSuggestions;
      setTimeout(() => {
        const suggestionsElement = element.shadowRoot!.querySelector('.exmg-searchbar-suggestions')!;
        const firstSuggestionElement = suggestionsElement!.querySelector('paper-listbox')!.firstElementChild!;
        firstSuggestionElement.dispatchEvent(new KeyboardEvent('click'));
        assert.equal(handledSuggestionSelect, true);
      }, 0);
    });
  });
});
