# \<exmg-grid\>

## Requirements

* Columns has be added to `table > thead > tr.grid.columns`

* Body has to be added to `table > tbody.grid-data`

* You should use `import {repeat} from 'lit-html/directives/repeat';` function to map you items to rows.

* Each row inside `tbody.grid-data` should have attribute `data-row-key` with unique value

* If table is expandable then for each row you have to add related row `table > tbody.grid-data tr.grid-row-detail`
This row must have attribute `data-row-detail-key` with same value as its relative row

* Element `exmg-grid` require property `.items` - needed to detect any changes on data
 
 ## Optional
 
 * toolbar should be placed in `table > thead > tr.grid-toolbar`
 
 * when amount of columns may change you may use attribute `data-auto-colspan` on both `th and td` elements 
 
 * if cell should be visible only on hover then you can use class `grid-cell-visible-on-hover`
 
 * if icon which trigger expanding / collapsing row-detail has to rotate then add class `grid-icon-rotate` 
 
Example how should looks most minimal markup to meet with requirements:
 
 ```html
<exmg-grid .itmes="${items}">
  <table>
    <thead>
     <tr class="grid-columns">
       <th>Col1</th>
       <th>Col2</th>
     </tr>
    </thead>
    <tbody class="grid-data">
      ${repeat(
            this.items,
            ({id}) => id,
            (i) => {
              return html`
                <tr data-row-key="${i.id}">
                  <td>#${i.id}</td>
                  <td>${i.value}</td>
                </tr>
              `;
            }
          );
          }
    </tbody>
  </table>
</exmg-grid>
```

## Features

### Column sortable

* You should add attribute `sortable` attribute on `exmg-grid`

* You must have defined columns and on `th` element you should add `data-sort` attribute with unique name of column.
You can also omit name in `data-sort` attribute but then you should setup `data-column-key`
both configuration are fine
```html
<th data-column-key="month" data-sort>Month</th>
<th data-column-key="year" data-sort="year-column">Year</th>
```

* To handle sort changing you should add listener `@exmg-grid-sort-change` on `exmg-grid`. You will receive `CustomEvent<EventDetailSortChange>`
```typescript
export type EventDetailSortChange = {
  column: string;
  sortDirection?: 'ASC' | 'DESC';
};
```

* To setup default sorting you should setup attributes `default-sort-column` and `default-sort-direction` on `exmg-grid`

Example:
___

```html
      <exmg-grid
        .items=${this.items}
        default-sort-column="year-column"
        default-sort-direction="DESC"
        ?sortable="${true}"
        @exmg-grid-sort-change="${this.onSortChange}"
      >
        <table>
          <thead>
           <tr class="grid-columns">
             <th data-column-key="month" data-sort>Month</th>
             <th data-column-key="year" data-sort="year-column">Year</th>
           </tr>
          </thead>
        </table>
      </exmg-grid>
```

### Expandable rows

* You should pass attribute `expandable-toggle-selector` to `exmg-grid`
```html
<exmg-grid .items=${this.items} expandable-toggle-selector=".expandable-trigger">
  <tbody class="grid-data">
    ${
      repeat(
        items,
        item => items.id,
        item => html`
          <tr data-row-key="${i.id}">
            <td>First</td>
            <td>Second</td>
            <td class="grid-cell-visible-on-hover">
              <span class="expandable-trigger grid-icon-rotate">${arrowIcon}</span>
            </td>
          </tr>
          <tr class="grid-row-detail" data-row-detail-key="${i.id}">
            <td data-auto-colspan>Here goes row detail...</td>
          </tr>
        `
      )
    }
  </tbody>
</exmg-grid>
```

* If you want to programmatically expand / collapse row with detail you can pass property `.expandedRowIds` to `exmg-grid` element
Where type of `expandedRowIds` looks
```typescript
const expandedRowIds: Record<string, boolean> = {
  '1': true,
  '2': false,
};
```
Key is just id which you pass by attributes `data-row-key` and `data-row-detail-key` and value is just flag what will expand when true otherwise collapse

* When row detail is being expanded then to element which trigger action will be added attribute `data-is-expanded`
To row detail is added attribute `data-is-row-expanded`. When collapsed both attributes are removed. 

### Selectable rows

To turn on this feature attribute `rows-selectable` has to be set on `exmg-grid` element

* If you want to programmatically select / unselect row you may pass property `.selectedRowIds` to `exmg-grid` element
Where type of `selectedRowIds` looks

```typescript
const selectedRowIds: Record<string, boolean> = {
  '1': true,
  '2': false,
};
```

Key is just id which you pass by attributes `data-row-key` and `data-row-detail-key` and value is just flag perhaps makr row as selected when true otherwise unselect


#### Checkboxes

It is optional. You can add checkbox to header and/or rows. There is needed 2 things to do to be checkbox works with
row selection:

* on `exmg-grid` element set attribute`selectable-checkbox-selector=".selectable-checkbox"`

* checkbox component needs to implement event `change` and property `checked`. For instance `mwc-checkbox` at least to version
`v0.4.0` doesnt support `change` event and can't be used with gird

```html
<exmg-grid .items=${this.items} selectable-checkbox-selector=".selectable-checkbox" ?rows-selectable="${true}">
  <table>
    <thead>
     <tr class="grid-columns">
       <th><paper-checkbox class="selectable-checkbox"></paper-checkbox></th>
     </tr>
    </thead>
    <tbody class="grid-data">
      <tr>
        <td><input type="checkbox" class="selection-checkbox"</td>
      </tr>
    </tbody>
  </table>
</exmg-grid>
```

### Rows sortable

To turn on this feature attribute `rows-sortable` has to be set on `exmg-grid`. Element `tr` or any descend `tr` element
must have class `grid-row-drag-handler`. 

Each time order will be changed event `exmg-grid-rows-order-changed` is triggered and has o be handled.
Handling this event `must to trigger` update property `items` otherwise it won't take effect.
 
Event details of `CustomEvent<EventDetailRowsOrderChanged>` has such structure: 

````typescript
export type EventDetailRowsOrderChanged<T extends object = any> = {
  items: T[];
};
````

`Items are sorted as it is done in UI.`

```
  onRowsOrderChanged(event: CustomEvent<EventDetailRowsOrderChanged>): void {
    // store current order and update items
    this.items = [...event.detail.items];
  }
```


```html
<exmg-grid .items=${this.items} ?rows-sortable="${true}" @@exmg-grid-rows-order-changed="${this.onRowsOrderChanged}">
  <table>
    <thead>
     <tr class="grid-columns">
       <th></th>
       <th>ID</th>
     </tr>
    </thead>
    <tbody class="grid-data">
      <tr>
        <td><span class="grid-row-drag-handler">${dragIcon}</span></td>
        <td>1</td>
      </tr>
    </tbody>
  </table>
</exmg-grid>
```


