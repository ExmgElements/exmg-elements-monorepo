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

### Default Filtering

ExmgSearchBar has it's own filtering methods in it which you can also override.
To achieve default filtering, take the example of html code below:

```html
<exmg-searchbar .data="${dataArray}" .filterKeys="${filterKeys}" suggestion-label-key="url"> </exmg-searchbar>
```

When you pass the data array into `data` property along with `filterKeys`, exmg-search bar automatically filters
data and shows suggestions.

`filterKeys` property has to contain specific key names from the type of each item in `data`.

For example; if you have `[{username:"exmachina",name: "Ex Machina"},{username:"livery",name:"Livery"}]` as the data array,
you can pass `['username']` to filter out `username` values of data. Or pass `['username', 'name']` to filter out values of both keys.

To determine which value of items passed into `data` should be shown as the label of each suggestion, use `suggestion-label-key` just like `filterKeys` but the only difference is, it accepts a single key as a simple string, not an array.

### Custom Suggestions and Filtering

By extending `ExmgSearchBar`, you can override any of 
three functions of your selection.
These functions are:

- `filter(data: any[], filterKeys: string[], query: string): ExmgSearchSuggestion[]: TemplateResult`
- `renderSuggestions(suggestions: ExmgSearchSuggestion[])`
- `renderSuggestionsLoading(): TemplateResult`

`filter` expects array of `ExmgSearchSuggestion` objects. By implementing your own filtering method, 
you might not need `suggestion-label-key` since you can place any string value into `text` property of `ExmgSearchSuggestion`.

Please check `ExmgSearchBar` class in order to see how these three functions are working. After that you can extend
`ExmgSearchBar` class and override those functions to create your fancy filtering methods or suggestions.

### Showing Suggestions Manually

If you are handling filtering logic manually on the parent, you can follow this way to
show suggestions manually.
To show suggestons, pass the suggestion data to `suggestions` property of `exmg-searchbar`.
It accepts array of `ExmgSearchSuggestion` type of elements into suggestions.

> Follow this document for available properties, events, methods and styling.

## Styling

| Variable                                             | Default             | Description                                      |
| ---------------------------------------------------- | ------------------- | ------------------------------------------------ |
| --exmg-searchbar-error-color                         | #b00020             | Error color of search bar                        |
| --exmg-searchbar-hint-color                          | rgba(0, 0, 0, 0.6)  | Hint text color of search bar                    |
| --exmg-searchbar-primary-color                       | #0071dc             | Primary theme color of search bar                |
| --exmg-searchbar-text-color                          | rgba(0, 0, 0, 0.87) | Text color of search bar                         |
| --exmg-searchbar-suggestions-spinner-color           | #0071dc             | Suggestions loading indicator color              |
| --exmg-searchbar-suggestions-spinner-width           | 3px                 | Suggestions loading indicator spinner width      |
| --exmg-searchbar-suggestions-max-visible-suggestions | 5                   | Max visible suggestions before showing scrollbar |
| --exmg-searchbar-suggestions-min-height              | 40px                | Suggestion item row height                       |
| --exmg-searchbar-suggestions-text-color              | rgba(0, 0, 0, 0.6)  | Suggestion item text color                       |
| --exmg-searchbar-suggestions-background-color        | #ffffff             | Suggestions list background color                |
| --exmg-searchbar-suggestions-z-index                 | 1                   | z-index of suggestions list                      |
| --exmg-searchbar-width                               | 100%                | Width of search bar                              |

## Properties

| Name                    | Type                   | Default     | Description                                                                                                                                     |
| ----------------------- | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| filterKeys              | string[]               | `undefined` | Set of which keys of `data` should be checked to filter data by default.                                                                        |
| data                    | any[]                  | `undefined` | The data in search bar to filter.                                                                                                               |
| keepFocus               | boolean                | `false`     | If true, keeps focus on search bar after `query-submit` is fired                                                                                |
| keepSuggestionsOnSelect | boolean                | `false`     | Option to whether keep suggestions visible or not on suggestion selection                                                                       |
| submitKeys              | string[]               | `['ENTER']` | Determines which keys should trigger submitting search query                                                                                    |
| notifyOnQueryChange     | boolean                | `true`      | If true, dispatches `query-change` event with the current query on every change of search input.                                                |
| searchQuery             | string                 | `''`        | Current query of search bar                                                                                                                     |
| suggestionLabelKey      | string                 | `undefined` | Defines which property of each data item should be placed into suggestions' labels.                                                             |
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

This event is also fired when 
there is only one suggestion
and user submits query.

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
