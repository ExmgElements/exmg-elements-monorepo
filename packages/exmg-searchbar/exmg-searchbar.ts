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
 * More information about styling and the element
 * itself can be found on the link below:
 * https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
 *
 * __Properties__
 * suggestions: ExmgSearchSuggestion[] => List of suggestions to be passed into and displayed.
 * keepSuggestionsOnSelect: Boolean => Option to whether keep suggestions visible or not on suggestion selection.
 * suggestionsLoading: Boolean => If true and there are no suggestions passed to element, a loading indicator should be shown.
 *
 * __Methods__
 * setSuggestions(suggestions: ExmgSearchSuggestion[]) => Sets `suggestions`.
 * clearSuggestions() => Clears suggestions.
 * showSuggestionsLoading() => Shows the loading indicator if there are no suggestions available.
 *
 * __Events__
 *  @suggestion-select => Fired on suggestion selection. Payload: {value: any, index: number}
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
 */
const KEY_ENTER = 'ENTER';
@customElement('exmg-searchbar')
export class ExmgSearchBar extends LitElement {
  static styles = styles;

  @query('mwc-textfield')
  private _mwcTextField?: TextField;

  @property({type: Array})
  suggestions?: ExmgSearchSuggestion[];

  @property({type: Boolean})
  keepSuggestionsOnSelect = false;

  @property({type: Boolean})
  suggestionsLoading = false;

  @property({type: Boolean})
  notifyOnInputChange = false;

  @property({type: Boolean})
  notifyOnKeyPress = true;

  @property({type: Array})
  keys = [KEY_ENTER];

  setSuggestions(suggestions: ExmgSearchSuggestion[]) {
    this.suggestions = suggestions;
  }

  clearSuggestions() {
    this.suggestions = [];
  }

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
      this.dispatchEvent(new CustomEvent('query-change', {bubbles: true, composed: true, detail: {value: _query}}));
    }
  }

  private _handleKeyEvent(event: KeyboardEvent) {
    const pressedKeyCode = event.key.toUpperCase();
    //alert(pressedKeyCode);
    if (this.keys.includes(pressedKeyCode)) {
      const _query = this._mwcTextField!.value;
      this.dispatchEvent(new CustomEvent('query-change', {bubbles: true, composed: true, detail: {value: _query}}));
      //Lose focus for mobile devices so that keyboard automatically gets hidden.
      this._mwcTextField!.blur();
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
