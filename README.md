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
