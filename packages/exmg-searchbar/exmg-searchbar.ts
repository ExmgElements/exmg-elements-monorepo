import {customElement, LitElement, html, query, property} from 'lit-element';
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
 * searchQuery: String = '' => Current query of search bar.
 * suggestions: ExmgSearchSuggestion[] = [] => List of suggestions to be passed into and displayed.
 * keepSuggestionsOnSelect: Boolean = false => Option to whether keep suggestions visible or not on suggestion selection.
 * suggestionsLoading: Boolean = false => If true and there are no suggestions passed to element, a loading indicator should be shown.
 * submitOnInputChange: Boolean = false => If true, dispatches `query-change` event with the current query on every change of search input.
 * submitOnKeyPress: Boolean = false => If true, dispatches `query-submit` event with the current query upon receiving key press event with specific keys passed to `keys` string array.
 * keys: String[] = ['ENTER'] => Determines which keys should trigger submitting search query.
 * keepFocus: Boolean = false => If true, keeps focus on search bar after `query-submit` is fired.
 *
 * __Methods__
 * setSuggestions(suggestions: ExmgSearchSuggestion[]) => Sets `suggestions`.
 * clearSuggestions() => Clears suggestions.
 * showSuggestionsLoading() => Shows the loading indicator if there are no suggestions available.
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
@customElement('exmg-searchbar')
export class ExmgSearchBar extends LitElement {
  static styles = styles;

  @query('mwc-textfield')
  private _mwcTextField?: TextField;

  /**
   * Current query of search bar.
   */
  @property({type: String})
  searchQuery = '';

  /**
   * List of suggestions to be passed into and displayed.
   */
  @property({type: Array})
  suggestions?: ExmgSearchSuggestion[];

  /**
   * Option to whether keep suggestions visible or not on
   * suggestion selection.
   */
  @property({type: Boolean})
  keepSuggestionsOnSelect = false;

  /**
   * If true and there are no suggestions passed to element,
   * a loading indicator should be shown.
   */
  @property({type: Boolean})
  suggestionsLoading = false;

  /**
   * If true, dispatches `query-change` event with the current
   * query on every change of search input.
   */
  @property({type: Boolean})
  submitOnQueryChange = false;

  /**
   * If true, dispatches `query-submit` event with the current
   *  query upon receiving key press event with specific keys
   * passed to `keys` string array.
   */
  @property({type: Boolean})
  submitOnKeyPress = true;

  /**
   * Determines which keys should trigger submitting
   * search query.
   */
  @property({type: Array})
  keys = [KEY_ENTER];

  /**
   * If true, keeps focus on search bar after
   * `query-submit` is fired.
   */
  @property({type: Boolean})
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

  firstUpdated() {
    //Transfer all the properties of host element to mwc-textfield.
    this._tryTransferProperties();
  }

  private _handleClickSuggestion(value: any, index: number) {
    this.dispatchEvent(new CustomEvent('suggestion-select', {bubbles: true, composed: true, detail: {index: index, value: value}}));
    console.log({index: index, value: value});
    if (!this.keepSuggestionsOnSelect) {
      this.clearSuggestions();
    }
  }

  private _handleInputChange() {
    if (this._mwcTextField) {
      const _query = this._mwcTextField!.value;
      this.searchQuery = _query;
      if (this.submitOnQueryChange) {
        this.dispatchEvent(new CustomEvent('query-change', {bubbles: true, composed: true, detail: {value: this.searchQuery}}));
      }
    }
  }

  private _handleKeyEvent(event: KeyboardEvent) {
    const pressedKeyCode = event.key.toUpperCase();
    if (this.keys.includes(pressedKeyCode)) {
      const _query = this._mwcTextField!.value;
      this.searchQuery = _query;
      this.dispatchEvent(new CustomEvent('query-submit', {bubbles: true, composed: true, detail: {value: this.searchQuery}}));
      if (!this.keepFocus) {
        //Lose focus for mobile devices so that keyboard automatically gets hidden.
        this._mwcTextField!.blur();
      }
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

  private renderSuggestions() {
    let suggestionsHtml = html``;
    if (this.suggestions && this.suggestions.length > 0) {
      this.suggestionsLoading = false;
      suggestionsHtml = html`
        <paper-listbox>
          ${this.suggestions!.map(
            (suggestion, i) =>
              html`
                <paper-item class="suggestion" @click=${() => this._handleClickSuggestion(suggestion.value, i)}
                  >${suggestion.icon
                    ? html`
                        <mwc-icon>${suggestion.icon}</mwc-icon>
                      `
                    : html``}${suggestion.text}</paper-item
                >
              `,
          )}
        </paper-listbox>
      `;
    } else if (this.suggestionsLoading) {
      suggestionsHtml = html`
        <paper-listbox>
          <paper-item class="loader"><paper-spinner-lite active></paper-spinner-lite></paper-item>
        </paper-listbox>
      `;
    }
    return suggestionsHtml;
  }

  render() {
    return html`
      <mwc-textfield
        @keypress=${this._handleKeyEvent}
        @input=${this._handleInputChange}
        type="search"
        icon="search"
        placeholder="Search"
        value="${this.searchQuery}"
      ></mwc-textfield>
      <div class="exmg-searchbar-suggestions">
        ${this.renderSuggestions()}
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
interface ExmgSearchSuggestion {
  icon?: string;
  text: string;
  value: any;
}
