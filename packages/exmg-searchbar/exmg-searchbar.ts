import {customElement, html} from 'lit-element';
import {ExmgSearchBarBase, ExmgSearchSuggestion} from './exmg-searchbar-base';

@customElement('exmg-searchbar')
export class ExmgSearchBar extends ExmgSearchBarBase {
  filter(data: any[], filterKeys: string[], query: string): ExmgSearchSuggestion[] {
    const results: ExmgSearchSuggestion[] = [];
    if (query.length == 0) return results;
    data.forEach(obj => {
      for (let i = 0; i < filterKeys.length; i++) {
        const lookingIn = String(obj[filterKeys[i]]);
        if (lookingIn.toLowerCase().includes(query.toLowerCase())) {
          if (this.suggestionLabelKey) results.push({text: obj[this.suggestionLabelKey], value: obj});
          break;
        }
      }
    });
    return results;
  }

  renderSuggestionsLoading() {
    return html`
      <paper-listbox>
        <paper-item class="loader"><paper-spinner-lite active></paper-spinner-lite></paper-item>
      </paper-listbox>
    `;
  }

  renderSuggestions(suggestions: ExmgSearchSuggestion[]) {
    return html`
      <div class="suggestions-list">
        ${suggestions!.map(
          (suggestion, index) =>
            html`
              <paper-item focusable class="suggestion" @click=${() => this._handleClickSuggestion(suggestion.value, index)}
                >${suggestion.icon
                  ? html`
                      <mwc-icon>${suggestion.icon}</mwc-icon>
                    `
                  : html``}${suggestion.text}</paper-item
              >
            `,
        )}
      </div>
    `;
  }
}
