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
 */
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

  clearSuggestions() {
    this.suggestions = [];
  }

  setSuggestions(suggestions: ExmgSearchSuggestion[]) {
    this.suggestions = suggestions;
  }

  showSuggestionsLoading() {
    this.suggestionsLoading = true;
  }

  firstUpdated() {
    //Transfer all the properties of host element to mwc-textfield.
    this._tryTransferProperties();
  }

  private _handleClickSuggestion(value: any) {
    this.dispatchEvent(new CustomEvent('suggestion-select', {bubbles: true, composed: true, detail: value}));
    if (!this.keepSuggestionsOnSelect) {
      this.clearSuggestions();
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
            suggestion =>
              html`
                <paper-item class="suggestion" @click=${() => this._handleClickSuggestion(suggestion.value)}
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
      <mwc-textfield type="search" icon="search" placeholder="Search"></mwc-textfield>
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
