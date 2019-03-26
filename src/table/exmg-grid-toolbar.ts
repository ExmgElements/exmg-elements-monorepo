import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import '@material/mwc-icon';
import '@exmg/exmg-paper-combobox';
import '@polymer/paper-item';
import './exmg-grid-base-toolbar';

import {
  Action,
  BaseFilterConfig,
  Filter,
  FilterConfigType,
  FilterSingleSelectConfig
} from './exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar')
export class ExmgGridToolbar extends LitElement {
  @property({type: String})
  description: string = '';

  @property({type: Object})
  actions: Action[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  private emitActionExecutedEvent(action: Action) {
    return () => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-action-executed',
          {
            detail: {
              id: action.id,
            },
            composed: true,
            bubbles: true,
          }
        )
      );
    };
  }

  private emitFilterChangedEvent(filter: Filter) {
    return (event: CustomEvent) => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-filter-changed',
          {
            detail: {
              id: filter.id,
              value: event.detail.value,
            },
            composed: true,
            bubbles: true,
          }
        )
      );
    };
  }

  private renderActions() {
    return repeat(
      this.actions,
      (action) => html`
        <mwc-button
          class="action"
          title="${action.tooltip}"
          @click="${this.emitActionExecutedEvent(action)}"
        >
          <mwc-icon>${action.icon}</mwc-icon>
          ${action.text}
        </mwc-button>
      `
    );
  }

  private renderDescription() {
    return html`${this.description}`;
  }

  private renderFilters() {
    return repeat(
      this.filters,
      filter => this.renderFilter(filter)
    );
  }

  private renderFilter(filter: Filter) {
    if (this.isFilterSingleSelectConfig(filter)) {
      return this.renderSingleSelectFilter(filter);
    }

    return undefined;
  }

  private isFilterSingleSelectConfig(filter: Filter<BaseFilterConfig>): filter is Filter<FilterSingleSelectConfig> {
    return filter.config.type === FilterConfigType.SingleSelect;
  }

  private renderSingleSelectFilter(filter: Filter<FilterSingleSelectConfig>) {
    return html`
      <exmg-paper-combobox
        class="filter"
        attr-for-selected="data-id"
        no-float-label
        label="${filter.name}"
        @exmg-combobox-select="${this.emitFilterChangedEvent(filter)}"
      >
        ${repeat(
          filter.config.data,
          (item: any) => item,
      item => html`<paper-item data-id="${item.id}">${filter.name}: ${item.title}</paper-item>`
        )}
      </exmg-paper-combobox>
    `;
  }

  render() {
    return html`
      <exmg-grid-base-toolbar>
        <div slot="actions">
          ${this.renderActions()}
        </div>
        <div slot="description">
          ${this.renderDescription()}
        </div>
        <div slot="filters">
          ${this.renderFilters()}
        </div>
      </exmg-grid-base-toolbar>
    `;
  }
}
