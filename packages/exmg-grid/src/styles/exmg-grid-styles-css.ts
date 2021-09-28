import {css} from 'lit';

export const style = css`
  :host {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    --exmg-arrow-upward-url: url('/node_modules/@exmg/exmg-grid/assets/arrow-upward.svg');
    --exmg-table-card-width: var(--exmg-theme-table-card-width, 100%);
    --exmg-table-card-margin-bottom: var(--exmg-theme-table-card-margin-bottom, 5px);
    --exmg-table-color: var(--exmg-theme-table-on-surface, #02182b);
    --exmg-table-card-background-color: var(--exmg-theme-table-surface, #ffffff);
    --exmg-table-row-divider-color: var(--exmg-theme-table-row-divider-color, rgba(2, 24, 43, 0.14));
    --exmg-table-row-selected-color: var(--exmg-theme-table-row-selected-color, #02182b);
    --exmg-table-row-selected-background-color: var(--exmg-theme-table-row-selected-background-color, #eef4fa);
    --exmg-table-row-hover-color: var(--exmg-theme-table-row-hover-color, #02182b);
    --exmg-table-row-hover-background-color: var(--exmg-theme-table-row-hover-background-color, #f1f1f1);
    --exmg-table-row-dragged-background-color: var(--exmg-theme-table-row-dragged-background-color, #02182b);
    --exmg-table-rows-expanded-divider-border: var(--exmg-theme-table-rows-expanded-divider-border, none);
    --exmg-table-rows-expanded-border: var(--exmg-theme-table-rows-expanded-border, none);
    --exmg-table-rows-expanded-background-color: var(--exmg-theme-table-rows-expanded-background-color, #ffffff);
    --exmg-table-rows-expanded-color: var(--exmg-theme-table-rows-expanded-color, #02182b);
    --exmg-table-th-color: var(--exmg-theme-table-th-on-surface, #02182b);
    --exmg-table-th-background-color: var(--exmg-theme-table-th-surface, #ffffff);
    --exmg-table-th-sortable-hover-color: var(--exmg-theme-table-th-sortable-hover-color, #02182b);
    --exmg-table-columns-background-color: var(--exmg-theme-table-columns-background-color, #ffffff);
    --exmg-table-th-height: var(--exmg-theme-table-th-height, 48px);
    --exmg-table-th-sort-margin-left: var(--exmg-theme-table-th-sort-margin-left, 0px);
    --exmg-table-td-height: var(--exmg-theme-table-td-height, 48px);
    --exmg-table-th-sort-icon-height: var(--exmg-theme-table-th-sort-icon-height, 1em);
    --exmg-table-th-sort-icon-width: var(--exmg-theme-table-th-sort-icon-width, 1em);
    --exmg-table-col-number-padding-right: var(--exmg-theme-table-col-number-padding-right, 10px);
    --exmg-table-checkbox-cell-width: var(--exmg-theme-table-checkbox-cell-width, 24px);
    --exmg-table-toolbar-setting-position: var(--exmg-theme-table-toolbar-setting-position, absolute);
  }
  ::slotted([slot='pagination']) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow-x: auto;
    border-top: 1px solid var(--exmg-table-row-divider-color);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  ::slotted([slot='toolbar']) {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: block;
  }
  .table-card-container {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    border: none;
    width: var(--exmg-table-card-width);
    margin: 0;
    padding: 0;
    box-shadow: var(--exmg-theme-table-box-shadow, none);
  }
  :host([with-toolbar]) .table-card {
    border-top: 1px solid var(--exmg-table-row-divider-color);
  }
  .table-card {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: var(--exmg-table-card-width);
    background-color: var(--exmg-table-card-background-color);
    margin-bottom: var(--exmg-table-card-margin-bottom);
  }
  .table-container {
    overflow-x: auto;
  }
  table {
    width: 100%;
    color: var(--exmg-table-color);
    border-spacing: 0;
    border: none;
  }
  table[data-table-layout='fixed'] {
    table-layout: fixed;
  }
  table[data-table-layout='fixed'] td:not(.grid-checkbox-cell) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  table[data-table-layout='fixed'] th.grid-checkbox-cell,
  table[data-table-layout='fixed'] td.grid-checkbox-cell {
    width: var(--exmg-table-checkbox-cell-width);
  }
  table[data-table-layout='fixed'] th.no-ellipsis,
  table[data-table-layout='fixed'] td.no-ellipsis {
    text-overflow: initial;
  }
  table thead tr,
  table thead th {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.75rem;
    font-size: var(--mdc-typography-caption-font-size, 0.75rem);
    line-height: 1.25rem;
    line-height: var(--mdc-typography-caption-line-height, 1.25rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-caption-font-weight, 400);
    letter-spacing: 0.0333333333em;
    letter-spacing: var(--mdc-typography-caption-letter-spacing, 0.0333333333em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-caption-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-caption-text-transform, inherit);
  }
  table tbody tr,
  table tbody td,
  table tfoot tr,
  table tfoot td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.875rem;
    font-size: var(--mdc-typography-body2-font-size, 0.875rem);
    line-height: 1.25rem;
    line-height: var(--mdc-typography-body2-line-height, 1.25rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-body2-font-weight, 400);
    letter-spacing: 0.0178571429em;
    letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-body2-text-transform, inherit);
  }
  td {
    height: var(--exmg-table-td-height);
  }
  .grid-toolbar th {
    padding: 0;
    text-align: left;
  }
  .grid-toolbar th > * {
    overflow-x: auto;
  }
  .grid-columns th {
    height: var(--exmg-table-th-height);
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    text-transform: uppercase;
    line-height: 1.33;
    letter-spacing: 2px;
    color: var(--exmg-table-th-color);
    background-color: var(--exmg-table-th-background-color);
    vertical-align: middle;
    text-align: left;
    user-select: none;
    white-space: nowrap;
  }
  .grid-columns th > span {
    vertical-align: middle;
    max-width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .grid-columns th svg {
    fill: var(--exmg-table-th-color);
  }
  .grid-columns th,
  tbody td {
    padding-left: 16px;
  }
  .grid-columns th:last-child,
  tbody td:last-child {
    padding-right: 10px;
  }
  th,
  td {
    border-top: 1px solid var(--exmg-table-row-divider-color);
  }
  tbody td {
    height: var(--exmg-table-td-height);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.875rem;
    font-size: var(--mdc-typography-body2-font-size, 0.875rem);
    line-height: 1.25rem;
    line-height: var(--mdc-typography-body2-line-height, 1.25rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-body2-font-weight, 400);
    letter-spacing: 0.0178571429em;
    letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-body2-text-transform, inherit);
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43px;
    letter-spacing: 0.3px;
    color: var(--exmg-table-color);
  }
  tbody td svg {
    fill: var(--exmg-table-color);
  }
  th[data-sort] {
    cursor: pointer;
  }
  th[data-sort]:hover {
    color: var(--exmg-table-th-sortable-hover-color);
  }
  th[data-sort]::after {
    display: inline-block;
    content: '';
    -webkit-mask-image: var(--exmg-arrow-upward-url);
    mask-image: var(--exmg-arrow-upward-url);
    background-color: currentColor;
    background-size: contain;
    height: var(--exmg-table-th-sort-icon-height);
    width: var(--exmg-table-th-sort-icon-width);
    margin-left: var(--exmg-table-th-sort-margin-left);
    vertical-align: middle;
    opacity: 0;
  }
  th[data-sort-direction]::after {
    opacity: 1;
    transition: transform 0.1s linear;
  }
  th[data-sort-direction='ASC']::after {
    transform: rotate(0deg);
  }
  th[data-sort-direction='DESC']::after {
    transform: rotate(180deg);
  }
  tbody > tr:not(.grid-row-detail):hover {
    color: var(--exmg-table-row-hover-color);
    background-color: var(--exmg-table-row-hover-background-color);
  }
  tbody > tr:not(.grid-row-detail):hover td {
    color: var(--exmg-table-row-hover-color);
  }
  tbody > tr:not(.grid-row-detail):hover svg {
    fill: var(--exmg-table-row-hover-color);
  }
  tr[data-selected] {
    color: var(--exmg-table-row-selected-color);
    background-color: var(--exmg-table-row-selected-background-color);
  }
  tr[data-selected] td {
    color: var(--exmg-table-row-selected-color);
  }
  tr[data-selected] svg {
    fill: var(--exmg-table-row-selected-color);
  }
  tbody tr[data-has-expanded-detail],
  tbody tr[data-has-expanded-detail]:hover,
  tbody tr[data-is-row-expanded] {
    background-color: var(--exmg-table-rows-expanded-background-color);
    border: var(--exmg-table-rows-expanded-border);
  }
  tbody tr[data-has-expanded-detail] td,
  tbody tr[data-has-expanded-detail]:hover td,
  tbody tr[data-is-row-expanded] td {
    color: var(--exmg-table-rows-expanded-color);
  }
  tbody tr[data-has-expanded-detail] td svg,
  tbody tr[data-has-expanded-detail]:hover td svg,
  tbody tr[data-is-row-expanded] td svg {
    fill: var(--exmg-table-rows-expanded-color);
  }
  tbody tr[data-is-row-expanded] td {
    border-bottom: none;
  }
  tbody tr[data-has-expanded-detail] td,
  tbody tr[data-has-expanded-detail]:hover td {
    border-bottom: var(--exmg-table-rows-expanded-divider-border);
  }
  tr.grid-row-detail {
    display: none;
  }
  tr.grid-row-detail[data-is-row-expanded] {
    display: table-row;
  }
  tr.grid-row-detail td {
    padding: 20px;
  }
  tr .grid-icon-rotate[data-is-expanded] > * {
    transition: transform 0.1s linear;
    transform: rotate(180deg);
  }
  tr .grid-icon-rotate[data-is-expandable]:not([data-is-expanded]) > * {
    transition: transform 0.1s linear;
    transform: rotate(0deg);
  }
  .grid-row-drag-handler {
    cursor: move;
    vertical-align: middle;
  }
  .grid-row-drag-handler > * {
    vertical-align: middle;
  }
  tr.dragged {
    background-color: var(--exmg-table-row-dragged-background-color);
    opacity: 0.25;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5) inset;
  }
  tr.cloned {
    background-color: var(--exmg-table-row-dragged-background-color);
    width: 100%;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    opacity: 0.9;
  }
  tr td.grid-cell-visible-on-hover {
    text-align: center;
  }
  tr td.grid-cell-visible-on-hover > * {
    visibility: hidden;
  }
  tr:hover td.grid-cell-visible-on-hover > *,
  tr[data-has-expanded-detail] td.grid-cell-visible-on-hover > * {
    visibility: visible;
  }
  tr td.grid-col-number,
  tr th.grid-col-number {
    padding-right: var(--exmg-table-col-number-padding-right);
    text-align: right;
  }
  tr th.grid-col-number > span {
    width: 100%;
  }
`;
export default style;
