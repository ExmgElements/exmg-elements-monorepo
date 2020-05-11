# exmg-searchbar

A customizable search bar element.

> This search bar uses mwc-textfield for the input element.
> More information about styling and the input element itself can be found on the link below:
> https://github.com/material-components/material-components-web-components/tree/master/packages/textfield

## Usage

Import this element to your project with `npm i @exmg/exmg-searchbar`.

Then add the snippet below into your code.

```html
<exmg-searchbar></exmg-searchbar>
```

Follow this document for available properties, events, methods and styling.

## Styling

| Variable                                      | Default             | Description                                 |
| --------------------------------------------- | ------------------- | ------------------------------------------- |
| --exmg-searchbar-error-color                  | #b00020             | Error color of search bar                   |
| --exmg-searchbar-hint-color                   | rgba(0, 0, 0, 0.6)  | Hint text color of search bar               |
| --exmg-searchbar-primary-color                | #0071dc             | Primary theme color of search bar           |
| --exmg-searchbar-text-color                   | rgba(0, 0, 0, 0.87) | Text color of search bar                    |
| --exmg-searchbar-suggestions-spinner-color    | #0071dc             | Suggestions loading indicator color         |
| --exmg-searchbar-suggestions-spinner-width    | 3px                 | Suggestions loading indicator spinner width |
| --exmg-searchbar-suggestions-min-height       | 40px                | Suggestion item row height                  |
| --exmg-searchbar-suggestions-text-color       | rgba(0, 0, 0, 0.6)  | Suggestion item text color                  |
| --exmg-searchbar-suggestions-background-color | #ffffff             | Suggestions list background color           |
| --exmg-searchbar-width                        | 100%                | Width of search bar                         |

## Properties

| Name                    | Type                   | Default     | Description                                                                                                                                     |
| ----------------------- | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| keepFocus               | boolean                | `false`     | If true, keeps focus on search bar after `query-submit` is fired                                                                                |
| keepSuggestionsOnSelect | boolean                | `false`     | Option to whether keep suggestions visible or not on suggestion selection                                                                       |
| keys                    | string[]               | `['ENTER']` | Determines which keys should trigger submitting search query                                                                                    |
| notifyOnQueryChange     | boolean                | `true`      | If true, dispatches `query-change` event with the current query on every change of search input.                                                |
| searchQuery             | string                 | `''`        | Current query of search bar                                                                                                                     |
| submitOnKeyPress        | boolean                | `true`      | If true, dispatches `query-submit` event with the current query upon receiving key press event with specific keys passed to `keys` string array |
| suggestions             | ExmgSearchSuggestion[] | `[]`        | List of suggestions to be passed into and displayed                                                                                             |
| suggestionsLoading      | boolean                | `false`     | If true and there are no suggestions passed to element, a loading indicator should be shownbar                                                  |

## Events

#### @query-change

Fired on query change.

Payload: `{value: string}`

#### @query-submit

Fired on query submit.

Payload: `{value: string}`

#### @suggestion-select

Fired on suggestion selection.

Payload: `{value: any, index: number}`

## Methods

#### clearSuggestions()

Clears suggestions.

#### hideSuggestionsLoading()

Hides the loading indicator.

#### search()

Fires `query-submit` event with passed query into search bar.

#### setQuery(query: string)

Sets query.

#### setSuggestions(suggestions: ExmgSearchSuggestion[])

Sets `suggestions`.

#### showSuggestionsLoading()

Shows the loading indicator if there are no suggestions available.
