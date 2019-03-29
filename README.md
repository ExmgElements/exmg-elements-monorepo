# \<exmg-grid\>


## Features

### Column sortable

* You should add attribute `sortable` attribute on `exmg-grid`

* You have also defined columns and on `th` element you should add `data-sort` attribute with unique name of column.
You can also omit name in `data-sort` attribute but then you should setup `data-column-key`
bot configuration are fine
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

* You should pass attribute `expandable-toggle-selector` to `<exmg-grid />`
```html
<exmg-grid expandable-toggle-selector="expandable-trigger">
  <tbody class="grid-data">
    ${
      repeat(
        items,
        item => items.id,
        item => html`
          <tr>
            <td>First</td>
            <td>Second</td>
            <td>
              <span class="expandable-trigger">${}</span>
            </td>
          </tr>
          <tr class="grid-row-detail">
            <td colspan="2">Here goes row detail...</td>
          </tr>
        `
      )
    }
  </tbody>
</exmg-grid>
```

### Selectable rows

To turn on this feature attribute `rows-selectable` has to be set on `exmg-grid` element

#### Checkboxes

It is optional. You can add checkbox to header and/or rows. There is needed 2 things to do to be checkbox works with
row selection:

* on `exmg-grid` element set attribute`selectable-checkbox-selector=".selectable-checkbox"`

* checkbox component needs to implement event `change` and property `checked`. For instance `mwc-checkbox` at least to version
`v0.4.0` doesnt support `change` event and can't be used with gird

```html
<exmg-grid selectable-checkbox-selector=".selectable-checkbox" ?rows-selectable="${true}">
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
