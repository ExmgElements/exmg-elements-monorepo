import {customElement, LitElement, html, css} from 'lit-element';
import '../exmg-searchbar';

@customElement('demo-search')
export class DemoSearch extends LitElement {
  static styles = [
    css`
      :host {
        width: 50%;
      }
    `,
  ];
  mockSuggestions = [{text: 'Suggestion 1', value: 1}, {text: 'Suggestion 2', value: 2}, {text: 'Suggestion 3', value: 3}];

  render() {
    return html`
      <div>
        <h3>ExmgSearchBar Demo</h3>

        <exmg-searchbar searchQuery="test" suggestionsLoading placeholder="This search bar is loading suggestions"></exmg-searchbar>
        <div style="height: 100px;"></div>
        <exmg-searchbar .suggestions=${this.mockSuggestions} placeholder="This search bar is showing suggestions"></exmg-searchbar>
      </div>
    `;
  }
}
