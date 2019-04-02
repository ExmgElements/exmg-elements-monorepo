import {property, customElement, html, LitElement} from 'lit-element';
import {cache} from 'lit-html/directives/cache';
import '@exmg/exmg-sortable';
import {style as exmgGridTableStyles} from './exmg-grid-styles';
import {ExmgRowSelectable} from './featrues/exmg-row-selectable';
import {ExmgQuerySelectors} from './utils/exmg-query-selectors';
import {ExmgRowExpandable} from './featrues/exmg-row-expandable';
import {ExmgColumnSortable} from './featrues/exmg-column-sortable';
import {ExmgRowSortable} from './featrues/exmg-row-sortable';
import {EventDetailRowsOrderChanged, SORT_DIRECTION} from './types/exmg-grid-types';

type GenericPropertyValues<T, V = unknown> = Map<T, V>;
type Props = Exclude<keyof ExmgGrid, number | Symbol>;

type SmartPropertyValue = GenericPropertyValues<Props>;

/**
 * ### Styling
 * The following custom properties and mixins are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-arrow-upward-url` | Url to icon that is used for soring direction indicator | `url('/assets/arrow-upward.svg');`
 * `--exmg-table-width` | table width | `100%;`
 * `--exmg-table-margin-bottom` | table bottom margin  | `5px;`
 * `--exmg-table-color` | table text color | `#02182b;`
 * `--exmg-table-background-color` | table background color | `#ffffff;`
 * `--exmg-table-border-color` | table border color | `#f6f6f6;`
 * `--exmg-table-row-separator-color` | table rows separator color | `#dbdbdb;`
 * `--exmg-table-row-selected-color` | selected row text color | `#02182b;`
 * `--exmg-table-row-selected-background-color` | selected row background color | `#e2f1fe;`
 * `--exmg-table-row-hover-color` | row hover text color | `#02182b;`
 * `--exmg-table-row-hover-background-color` | row hover background color | `#f1f1f1;`
 * `--exmg-table-row-dragged-background-color` | sortable row background color when dragged | `#f1f1f1;`
 * `--exmg-table-th-color` | header text color | `#0071dc;`
 * `--exmg-table-columns-background-color` | header background color | `#ffffff;`
 * `--exmg-table-th-hover-color` | header hover text color | `#02182b;`
 * `--exmg-table-th-height` | header height | `48px;`
 * `--exmg-table-th-font-size` | header font size | `16px;`
 * `--exmg-table-th-sort-margin-left` | header margin after text but before icon | `4px;`
 * `--exmg-table-td-height` | row cell height | `48px;`
 * `--exmg-table-td-font-size` | row cell font size | `16px;`
 *
 * ### Overridden vars for paper-checkbox
 *
 * Custom property | Description | Default
 * `--paper-checkbox-unchecked-color` | | `#97aac4;`
 * `--paper-checkbox-checked-color` | | `#1274d9;`
 * `--paper-checkbox-size` | | `24px;`
 * `--paper-checkbox-unchecked-ink-color` | | `#0070db;`
 * `--paper-checkbox-checked-ink-color` | | `#0070db;`
 */
@customElement('exmg-grid')
export class ExmgGrid extends LitElement {
  static styles = [
    exmgGridTableStyles,
  ];

  /**
   * Array of data which mapped to rows
   */
  @property({type: Object})
  items: object[] = [];

  /**
   * Feature that turn on sort by column
   */
  @property({type: Boolean, reflect: true})
  sortable: boolean = false;

  /**
   * Name of sort column which should be sorted by default
   */
  @property({type: String, attribute: 'default-sort-column'})
  defaultSortColumn?: string;

  /**
   * Default sort direction
   */
  @property({type: String, attribute: 'default-sort-direction'})
  defaultSortDirection?: SORT_DIRECTION;

  /**
   * Feature that allow sort rows
   * If table table has turn on feature `selectable` then it takes precedence and `rowSelectable` will be ignored
   */
  @property({type: Boolean, reflect: true, attribute: 'rows-sortable'})
  rowsSortable: boolean = false;

  /**
   * Feature that allow select rows
   */
  @property({type: Boolean, attribute: 'rows-selectable'})
  rowsSelectable: boolean = false;

  /**
   * If rows are selectable you can also pass selector to checkboxes.
   * We can have checkboxes in thead or / and tbody.
   */
  @property({type: String, attribute: 'selectable-checkbox-selector'})
  selectableCheckboxSelector?: string;

  /**
   * Map of column names that should be hidden
   */
  @property({type: Object})
  hiddenColumnNames: Record<string, string> = {};

  /**
   * Map of row id and selection state
   * Useful for default setup default selection or manipulating programmatically
   */
  @property({type: Object})
  selectedRowIds: Record<string, boolean> = {};

  /**
   * Map of row id and expandable row state
   * Useful for default setup default selection or manipulating programmatically
   */
  @property({type: Object})
  expandedRowIds: Record<string, boolean> = {};

  @property({type: String, attribute: 'expandable-toggle-selector', reflect: true})
  expandableToggleSelector?: string;

  @property({type: Object})
  private querySelectors?: ExmgQuerySelectors;

  private rowSelectableFeature?: ExmgRowSelectable;

  private rowExpandableFeature?: ExmgRowExpandable;

  private rowSortableFeature?: ExmgRowSortable;

  private columnSortableFeature?: ExmgColumnSortable;

  private componentReady: boolean = false;

  private getQuerySelectors(): ExmgQuerySelectors {
    if (!this.querySelectors) {
      throw new Error(`ExmgQuerySelector not initialized yet`);
    }
    return this.querySelectors;
  }

  private getTable(): HTMLTableElement {
    return this.getQuerySelectors().getTable();
  }

  private getTableBody(): HTMLTableSectionElement {
    return this.getQuerySelectors().getTableBody();
  }

  private findTableBody(): HTMLTableSectionElement | void {
    if (this.querySelectors) {
      return this.getTableBody() || undefined;
    }
  }

  private getColumns(selector: string = 'th'): NodeListOf<HTMLTableHeaderCellElement> {
    return this.getQuerySelectors().getColumns(selector);
  }

  private getBodyRowSelector(selector = ''): string {
    return this.getQuerySelectors().getBodyRowSelector(selector);
  }

  private canSortRows(): boolean {
    return !this.sortable && this.rowsSortable;
  }

  private rowsOrderChange(e: CustomEvent): void {
    setTimeout(() => {
      const {sourceIndex, targetIndex} = e.detail;
      const items = [...this.items];
      const movedElement = items[sourceIndex];

      items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, movedElement);

      this.dispatchEvent(
        new CustomEvent<EventDetailRowsOrderChanged<object>>(
          'exmg-grid-rows-order-changed',
          {composed: true, bubbles: true, detail: {items}}
          )
      );
    }, 0);
  }

  private updateColumnVisibility(previousHiddenColumnNames: Record<string, string> = {}): void {
    let visibleColumns: number = 0;
    this.getColumns().forEach((column, index) => {
      const columnKey = column.getAttribute('data-column-key');
      visibleColumns += this.hiddenColumnNames[columnKey || ''] ? 0 : 1;
      if (columnKey && previousHiddenColumnNames[columnKey] !== this.hiddenColumnNames[columnKey]) {
        const nextDisplayValue = this.hiddenColumnNames[columnKey] ? 'none' : 'table-cell';
        column.style.display = nextDisplayValue;
        this.getTable().querySelectorAll<HTMLInputElement>(`tbody.grid-data tr:not(.grid-row-detail) td:nth-child(${index + 1})`)
          .forEach(cell => {
            cell.style.display = nextDisplayValue;
          });
      }
    });
    this.updateAutoColspan(visibleColumns);
  }

  private updateAutoColspan(visibleColumns: number): void {
    this.getTable().querySelectorAll('[data-auto-colspan]').forEach(element => {
      const offset = Number.parseInt(element.getAttribute('data-auto-span') || '0', 10);
      element.setAttribute('colspan', (visibleColumns - offset).toString());
    });
  }

  private observeExpandedRowIds(changedProps: SmartPropertyValue): void {
    if (changedProps.has('expandedRowIds')) {
      Object.entries(this.expandedRowIds).forEach(([rowId, nextExpandedState]) => {
        const expendableToggle = this.getTableBody()
          .querySelector<HTMLElement>(this.getBodyRowSelector(`[data-row-key="${rowId}"] ${this.expandableToggleSelector}`));

        if (expendableToggle) {
          const isExpanded = expendableToggle.hasAttribute('data-is-expanded');
          if (isExpanded !== nextExpandedState) {
            expendableToggle.dispatchEvent(new MouseEvent('click'));
          }
        }
      });
    }
  }

  private observeSelectedRowIds(changedProps: SmartPropertyValue): void {
    if (changedProps.has('selectedRowIds')) {
      Object.entries(this.selectedRowIds).forEach(([rowId, nextSelectionState]) => {
        const row = this.getTableBody()
          .querySelector<HTMLTableRowElement>(this.getBodyRowSelector(`[data-row-key="${rowId}"]`));

        if (row) {
          const isSelected = row.hasAttribute('data-selected');
          if (isSelected !== nextSelectionState) {
            row.dispatchEvent(new MouseEvent('click'));
          }
        }
      });
    }
  }

  private observeItems(changedProps: SmartPropertyValue): void {
    if (changedProps.has('items') && this.rowSelectableFeature) {
      this.rowSelectableFeature.syncSelectedItems();
    }
  }

  protected async firstUpdated(): Promise<void> {
    const table = this.shadowRoot!.host.querySelector<HTMLTableElement>('table')!;
    const tableBody = table.querySelector<HTMLTableSectionElement>('tbody.grid-data')!;

    this.querySelectors = new ExmgQuerySelectors(
      table,
      tableBody,
    );

    const bodyRows = this.querySelectors.getBodyRows();

    if (this.sortable) {
      this.columnSortableFeature = new ExmgColumnSortable(
        this.querySelectors,
        (event: Event) => this.dispatchEvent(event),
        this.defaultSortColumn,
        this.defaultSortDirection,
      );
      this.columnSortableFeature.initFeature();
    }

    if (this.canSortRows()) {
      this.rowSortableFeature = new ExmgRowSortable(this.querySelectors);
      this.rowSortableFeature.initFeature();
    }

    if (this.rowsSelectable) {
      this.rowSelectableFeature = new ExmgRowSelectable(
        this.querySelectors,
        (event: Event) => this.dispatchEvent(event),
        this.selectableCheckboxSelector,
      );
      this.rowSelectableFeature.initFeature(bodyRows);
    }

    if (this.expandableToggleSelector) {
      this.rowExpandableFeature = new ExmgRowExpandable(
        this.querySelectors,
        this.expandableToggleSelector,
      );
      this.rowExpandableFeature.initFeature();
    }

    this.updateColumnVisibility();

    bodyRows.forEach(row => row.setAttribute('data-initialized', ''));

    await this.updateComplete;
    this.componentReady = true;
  }

  protected updated(changedProps: SmartPropertyValue): void {
    if (changedProps.has('hiddenColumnNames') || changedProps.has('items')) {
      this.updateColumnVisibility(changedProps.get('hiddenColumnNames') as Record<string, string>);
    }

    this.observeItems(changedProps);
    this.observeExpandedRowIds(changedProps);
    this.observeSelectedRowIds(changedProps);

    if (this.componentReady && changedProps.has('items')) {
      const bodyRows = this.querySelectors!.getBodyRowsNotInitialized();

      if (this.rowSelectableFeature) {
        this.rowSelectableFeature.updateFeature(bodyRows);
      }

      if (this.rowExpandableFeature) {
        this.rowExpandableFeature.updateFeature();
      }

      if (this.rowSortableFeature) {
        this.rowSortableFeature.updateFeature();
      }

      bodyRows.forEach(row => row.setAttribute('data-initialized', ''));
    }
  }

  private renderWithoutSortable() {
    return html`<slot></slot>`;
  }

  private renderWithSortable() {
    return html`
        <exmg-sortable
          orientation="${'vertical'}"
          animation-enabled
          item-selector="tbody.grid-data tr:not(.grid-row-detail)"
          handle-selector=".grid-row-drag-handler"
          .sortableHostNode="${this.findTableBody()}"
          @dom-order-change="${this.rowsOrderChange}"
        >
          <slot></slot>
        </exmg-sortable>
    `;
  }

  protected render() {
    return html`
      <div class="table-container">
        ${cache(this.canSortRows() ? this.renderWithSortable() : this.renderWithoutSortable())}
      </div>
    `;
  }
}
