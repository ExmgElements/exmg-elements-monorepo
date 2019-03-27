# \<exmg-grid\>


## Features

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
