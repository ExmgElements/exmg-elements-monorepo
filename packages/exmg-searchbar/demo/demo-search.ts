import {LitElement, html} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import '../exmg-searchbar.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import styles from './demo-search-styles.js';
import {ExmgSearchBar} from '../exmg-searchbar.js';
import {ExmgSearchSuggestion} from '../exmg-searchbar-base.js';

const mockData = [
  {username: 'livery', name: 'Livery Video', id: 1, url: 'https://www.liveryvideo.com/contact/'},
  {username: 'exmachina', name: 'Ex Machina Group', id: 2, url: 'https://www.exmachinagroup.com/'},
  {username: 'angrybytes', name: 'Angry Bytes', id: 3, url: 'https://angrybytes.com/'},
  {username: 'ignitionstudio', name: 'Ignition Studio', id: 4, url: 'https://ignitionstudio.live/'},
];

const filterKeys = ['id', 'name'];

@customElement('demo-search')
export class DemoSearch extends LitElement {
  static styles = [styles];

  @query('exmg-searchbar.demo')
  private _searchBar?: ExmgSearchBar;

  @query('input[name=showSuggestions]')
  private _showSuggestionsCheckbox?: HTMLInputElement;

  @query('input[name=showLoading]')
  private _showLoadingCheckbox?: HTMLInputElement;

  @query('input[name=keepSuggestions]')
  private _keepSuggestionsCheckbox?: HTMLInputElement;

  @query('input[name=notifyOnQueryChange]')
  private _notifyOnQueryChangeCheckbox?: HTMLInputElement;

  @query('input[name=submitOnKeyPress]')
  private _submitOnKeyPressCheckbox?: HTMLInputElement;

  @query('input[name=keepFocus]')
  private _keepFocusCheckbox?: HTMLInputElement;

  @property({type: Array})
  private _searchResults: {username: string; name: string; id: number; url: string}[] = [];

  private filterData(q: string): {username: string; name: string; id: number; url: string}[] {
    return mockData.filter(
      (data) => data.name.toLowerCase().includes(q.toLowerCase()) || data.username.toLowerCase().includes(q.toLowerCase()),
    );
  }

  private _handleSuggestionSelect(event: CustomEvent<{value: {username: string; name: string; id: number; url: string}; index: number}>) {
    setTimeout(() => {
      this._searchBar!.setQuery(event.detail.value!.name);
    }, 0);
    const _query = event.detail.value.name;
    if (query.length == 0) {
      return;
    }
    const filteredData = this.filterData(_query);
    this._searchResults = filteredData;
  }

  private loadingTimeOut?: NodeJS.Timeout;
  private _handleQueryChange(event: CustomEvent<{value: string}>) {
    const _query = event.detail.value;
    if (_query.length == 0) {
      this._searchBar!.clearSuggestions();
      this._searchBar!.hideSuggestionsLoading();
      if (this.loadingTimeOut) {
        clearTimeout(this.loadingTimeOut);
      }
      return;
    }
    const filteredData = this.filterData(_query);
    const _suggestions: ExmgSearchSuggestion[] = [];
    filteredData.forEach((data) => {
      const sugg = {text: data.name, value: data};
      _suggestions.push(sugg);
    });

    if (this._showSuggestionsCheckbox!.checked) {
      if (this._showLoadingCheckbox!.checked) {
        this._searchBar!.clearSuggestions();
        this._searchBar!.showSuggestionsLoading();
        if (this.loadingTimeOut) {
          clearTimeout(this.loadingTimeOut);
        }
        this.loadingTimeOut = setTimeout(() => {
          this._searchBar!.suggestions = _suggestions;
          this._searchBar!.hideSuggestionsLoading();
        }, 1000);
      } else {
        this._searchBar!.suggestions = _suggestions;
      }
    }
  }

  private _handleQuerySubmit(event: CustomEvent<{value: string}>) {
    const _query = event.detail.value;
    if (_query.length === 0) {
      this._searchResults = [];
      return;
    }
    const filteredData = this.filterData(_query);
    this._searchResults = filteredData;
    this._searchBar!.clearSuggestions();
    this._searchBar!.hideSuggestionsLoading();
    if (this.loadingTimeOut) {
      clearTimeout(this.loadingTimeOut);
    }
  }

  private _handleKeepSuggestionsOnSelectCheckboxChange() {
    this._searchBar!.keepSuggestionsOnSelect = this._keepSuggestionsCheckbox!.checked;
  }

  private _handleNotifyOnQueryChangeCheckboxChange() {
    this._searchBar!.notifyOnQueryChange = this._notifyOnQueryChangeCheckbox!.checked;
  }

  private _handleKeepFocusCheckboxChange() {
    this._searchBar!.keepFocus = this._keepFocusCheckbox!.checked;
  }

  private _handleSubmitOnKeyPressCheckboxChange() {
    this._searchBar!.submitOnKeyPress = this._submitOnKeyPressCheckbox!.checked;
  }

  render() {
    return html`
      <div>
        <h1>ExmgSearchBar Demo</h1>
        <h3>Filtering Handled in SearchBar</h3>
        <exmg-searchbar suggestion-label-key="name" .data=${mockData} .filterKeys=${filterKeys}></exmg-searchbar>
        <h3>Filtering Handled in Demo Page</h3>
        <h5>Options</h5>
        <div class="options">
        <table>
          <tbody>
            <tr>
              <td><input name="showSuggestions" type="checkbox" checked>Show Suggestions</input></td>
              <td><input name="showLoading" type="checkbox">Show Suggestions Loading</input></td>
            </tr>
            <tr>
              <td>
              <input @change=${
                this._handleKeepSuggestionsOnSelectCheckboxChange
              } name="keepSuggestions" type="checkbox">Keep Suggestions On Select</input></td>       <td>      <input @change=${
      this._handleNotifyOnQueryChangeCheckboxChange
    } name="notifyOnQueryChange" type="checkbox" checked>Notify On Query Change</input>
              </td>
            </tr>
            <tr>
             <td><input @change=${
               this._handleSubmitOnKeyPressCheckboxChange
             } name="submitOnKeyPress" type="checkbox" checked>Submit On Key Press</input></td>
             <td><input @change=${this._handleKeepFocusCheckboxChange} name="keepFocus" type="checkbox">Keep Focus After Submit</input>
    </td>
    </tr>
          </tbody>
        </table>
        </div>
        <exmg-searchbar
        class="demo"
         @query-change=${this._handleQueryChange}
        @query-submit=${this._handleQuerySubmit}
        @suggestion-select=${this._handleSuggestionSelect} placeholder="Search from available data"></exmg-searchbar>
        <h4>Search Results</h4>
        <div class="results">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            ${repeat(
              this._searchResults,
              (data) => data.id,
              (data) => {
                return html`
                  <tr>
                    <td>${data.id}</td>
                    <td>${data.username}</td>
                    <td>${data.name}</td>
                    <td>${data.url}</td>
                  </tr>
                `;
              },
            )}
          </tbody>
        </table>
        </div>
        <h4>Available Data</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            ${repeat(
              mockData,
              (data) => data.id,
              (data) => {
                return html`
                  <tr>
                    <td>${data.id}</td>
                    <td>${data.username}</td>
                    <td>${data.name}</td>
                    <td>${data.url}</td>
                  </tr>
                `;
              },
            )}
          </tbody>
        </table>
        <h4>Snippet</h4>
        <demo-snippet>
          <template>
                <exmg-searchbar outlined placeholder="This searchbar is inside a snippet"></exmg-searchbar>
          </template>
        </demo-snippet>
      </div>
    `;
  }
}
