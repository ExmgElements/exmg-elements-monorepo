import {ExmgSearchBarBaseInterface} from './exmg-searchbar-base-interface';
import {LitElement, html, query, property, TemplateResult} from 'lit-element';
import {TextField} from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-icon/mwc-icon-font';
import '@material/mwc-icon/mwc-icon';
import '@polymer/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-spinner/paper-spinner-lite';

import styles from './styles/exmg-searchbar-styles';

/**
 * A search bar based on mwc-textfield element.
 *
 * __Properties__
 * filterKeys: string[] = undefined => Set of which keys of `data` should be checked to filter data by default.
 * data: any[] = undefined => Data to be passed into exmg-searchbar.
 * searchQuery: String = '' => Current query of search bar.
 * suggestionLabelKey: String = undefined => Defines which property of each data item should be placed into suggestions' labels.
 * suggestions: ExmgSearchSuggestion[] = [] => List of suggestions to be passed into and displayed.
 * ExmgSearchSuggestion = {icon?: string, text: string, value: any}
 * keepSuggestionsOnSelect: Boolean = false => Option to whether keep suggestions visible or not on suggestion selection.
 * suggestionsLoading: Boolean = false => If true and there are no suggestions passed to element, a loading indicator should be shown.
 * notifyOnQueryChange: Boolean = true => If true, dispatches `query-change` event with the current query on every change of search input.
 * submitOnKeyPress: Boolean = true => If true, dispatches `query-submit` event with the current query upon receiving key press event with specific keys passed to `keys` string array.
 * submitKeys: String[] = ['ENTER'] => Determines which keys should trigger submitting search query.
 * keepFocus: Boolean = false => If true, keeps focus on search bar after `query-submit` is fired.
 *
 * __Methods__
 * setSuggestions(suggestions: ExmgSearchSuggestion[]) => Sets `suggestions`.
 * clearSuggestions() => Clears suggestions.
 * showSuggestionsLoading() => Shows the loading indicator if there are no suggestions available.
 * hideSuggestionsLoading() => Hides the loading indicator.
 * setQuery(query: string) => Sets query.
 * search() => Fires `query-submit` event.
 *
 * __Events__
 *  @suggestion-select => Fired on suggestion selection. Payload: {value: any, index: number}
 *  @query-change => Fired on query change. Payload: {value: string}
 *  @query-submit => Fired on query submit. Payload: {value: string}
 *
 * __Styling__
 *  --exmg-searchbar-primary-color: #0071dc; => Primary theme color of search bar.
 *  --exmg-searchbar-error-color: #b00020; => Error color of search bar if needed.
 *  --exmg-searchbar-text-color: rgba(0, 0, 0, 0.87); => Text color of search bar.
 *  --exmg-searchbar-hint-color: rgba(0, 0, 0, 0.6); => Hint text color of search bar.
 *  --exmg-searchbar-width: 100%; => Width of search bar.
 *  --exmg-searchbar-suggestions-spinner-color: #0071dc; => Suggestions loading indicator color.
 *  --exmg-searchbar-suggestions-spinner-width: 3px; => Suggestions loading indicator spinner width.
 *  --exmg-searchbar-suggestions-min-height: 40px; => Suggestion item row height.
 *  --exmg-searchbar-suggestions-text-color: rgba(0, 0, 0, 0.6); => Suggestion item text color.
 *  --exmg-searchbar-suggestions-background-color: #ffffff; => Suggestions list background color.
 *
 *  __Info__
 *  More information about styling and the element itself can be found on the link below:
 * https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
 */

const KEY_ENTER = 'ENTER';
export abstract class ExmgSearchBarBase extends LitElement implements ExmgSearchBarBaseInterface {
  static styles = styles;

  @query('mwc-textfield')
  private _mwcTextField?: TextField;

  /**
   * Current query of search bar.
   * Default: ''
   */
  @property({type: String, attribute: 'search-query'})
  searchQuery = '';

  /**
   * List of suggestions to be passed into and displayed.
   * ExmgSearchSuggestion = {icon?: string, text: string, value: any}
   * Default: []
   */
  @property({type: Array})
  suggestions?: ExmgSearchSuggestion[];

  /**
   * Data to be passed into exmg-searchbar.
   * This will be filtered with the default filtering method of exmg-searchbar.
   */
  @property({type: Array})
  data?: any[];

  /**
   * Set of which keys of `data` should be checked to filter data by default.
   */
  @property({type: Array})
  filterKeys?: string[];

  /**
   * Defines which property of each data item should be placed into suggestions' labels.
   */
  @property({type: String, attribute: 'suggestion-label-key'})
  suggestionLabelKey?: string;

  /**
   * Option to whether keep suggestions visible or not on
   * suggestion selection.
   * Default: false
   */
  @property({type: Boolean, attribute: 'keep-suggestions-on-select'})
  keepSuggestionsOnSelect = false;

  /**
   * If true and there are no suggestions passed to element,
   * a loading indicator should be shown.
   * Default: false
   */
  @property({type: Boolean, attribute: 'show-suggestions-loading'})
  suggestionsLoading = false;

  /**
   * If true, dispatches `query-change` event with the current
   * query on every change of search input.
   * Default: true
   */
  @property({type: Boolean, attribute: 'notify-on-query-change'})
  notifyOnQueryChange = true;

  /**
   * If true, dispatches `query-submit` event with the current
   *  query upon receiving key press event with specific keys
   * passed to `keys` string array.
   * Default: true
   */
  @property({type: Boolean, attribute: 'submit-on-key'})
  submitOnKeyPress = true;

  /**
   * Determines which keys should trigger submitting
   * search query.
   * Default: ['ENTER']
   */
  @property({type: Array, attribute: 'submit-keys'})
  submitKeys = [KEY_ENTER];

  /**
   * If true, keeps focus on search bar after
   * `query-submit` is fired.
   * Default: false
   */
  @property({type: Boolean, attribute: 'keep-focus'})
  keepFocus = false;

  /**
   * Sets `suggestions` property.
   * @param suggestions List of ExmgSearchSuggestion[].
   */
  setSuggestions(suggestions: ExmgSearchSuggestion[]) {
    this.suggestions = suggestions;
  }

  /**
   * Clears suggestions.
   */
  clearSuggestions() {
    this.suggestions = [];
  }

  /**
   * Shows the loading indicator if there are
   * no suggestions available.
   */
  showSuggestionsLoading() {
    this.suggestionsLoading = true;
  }

  /**
   * Hides the loading indicator.
   */
  hideSuggestionsLoading() {
    this.suggestionsLoading = false;
  }

  /**
   * Sets query
   * @param _query String query
   */
  setQuery(_query: string) {
    this.searchQuery = _query;
  }

  /**
   * The function which fires query-submit event.
   * This function exsits to fire the query-submit event through not only
   * key press but other actions which is up to developer.
   */
  search() {
    const _query = this._mwcTextField!.value;
    this.searchQuery = _query;
    this.dispatchEvent(new CustomEvent('query-submit', {bubbles: true, composed: true, detail: {value: this.searchQuery}}));
    if (!this.keepFocus) {
      //Lose focus for mobile devices so that keyboard automatically gets hidden.
      this._mwcTextField!.blur();
    }
  }

  firstUpdated() {
    //Transfer all the properties of host element to mwc-textfield.
    this._tryTransferProperties();
  }

  protected _handleClickSuggestion(value: any, index: number) {
    this.dispatchEvent(new CustomEvent('suggestion-select', {bubbles: true, composed: true, detail: {index: index, value: value}}));
    if (!this.keepSuggestionsOnSelect) {
      this.clearSuggestions();
    }
  }

  private _handleInputChange() {
    if (this._mwcTextField) {
      const _query = this._mwcTextField!.value;
      this.searchQuery = _query;
      if (this.data && this.data.length > 0 && this.filterKeys && this.filterKeys.length > 0) {
        this.suggestions = this.filter(this.data, this.filterKeys, this.searchQuery);
      }
      if (this.notifyOnQueryChange) {
        this.dispatchEvent(new CustomEvent('query-change', {bubbles: true, composed: true, detail: {value: this.searchQuery}}));
      }
    }
  }

  private _handleKeyEvent(event: KeyboardEvent) {
    if (!event || !event.key) {
      return;
    }
    const pressedKeyCode = event.key.toUpperCase();
    if (this.submitKeys.includes(pressedKeyCode) && this.submitOnKeyPress) {
      this.search();
    }
  }

  private _tryTransferProperties() {
    if (this._mwcTextField) {
      const props = this.attributes;
      const size = props.length;
      for (let i = 0; i < size; i++) {
        const prop = props.item(i);
        this._mwcTextField.setAttribute(prop!.name, prop!.value);
      }
    }
  }

  abstract filter(data: any[], filterKeys: string[], query: string): ExmgSearchSuggestion[];

  abstract renderSuggestions(suggestions: ExmgSearchSuggestion[]): TemplateResult;

  abstract renderSuggestionsLoading(): TemplateResult;

  render() {
    return html`
      <mwc-textfield
        @keypress=${this._handleKeyEvent}
        @input=${this._handleInputChange}
        type="search"
        icon="search"
        placeholder="Search"
        value="${this.searchQuery}"
        aria-owns="exmg-searchbar-suggestions"
        aria-controls="exmg-searchbar-suggestions"
        focusable
      ></mwc-textfield>
      <div id="exmg-searchbar-suggestions" class="exmg-searchbar-suggestions">
        ${this.suggestions && this.suggestions.length > 0
          ? this.renderSuggestions(this.suggestions)
          : this.suggestionsLoading
          ? this.renderSuggestionsLoading()
          : html``}
      </div>
    `;
  }
}

/**
 * A helper interface to create a context for suggestions.
 * text: Displayed text for suggestion.
 * icon (Optional): Displayed icon for suggestion. Uses mwc_icon material icon set.
 * value: Value of suggestion. Can be anything.
 * **/
export interface ExmgSearchSuggestion {
  icon?: string;
  text: string;
  value: any;
}
