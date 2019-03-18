import {customElement, html, LitElement, property} from 'lit-element';
import {observer} from '@material/mwc-base/form-element.js';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import {style as exmgGridToolbarStyles} from './exmg-grid-toolbar-styles';
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
  @observer(function (this: ExmgGridToolbar) {
    this.active = this.actions.length > 0;
  })
  actions: Action[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Boolean})
  private active: boolean = false;

  static styles = [
    exmgGridToolbarStyles,
  ];

  private getValueFromEvent(e: Event): string|undefined {
    e.preventDefault();
    const paths = e.composedPath();

    return paths.length ? (<HTMLSelectElement>paths[0]).value : undefined;
  }

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
    return (event: Event) => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-filter-changed',
          {
            detail: {
              id: filter.id,
              value: this.getValueFromEvent(event),
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
          label="${action.text}"
          icon="${action.icon}"
          title="${action.tooltip}"
          @click="${this.emitActionExecutedEvent(action)}"
        ></mwc-button>
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
      <select name="${filter.id}" @change="${this.emitFilterChangedEvent(filter)}">
        ${repeat(
          filter.config.data,
          (item) => {
            return html`<option value="${item.id}">${filter.name}: ${item.title}</option>`;
          }
        )}
      </select>
    `;
  }

  render() {
    console.log(this.active);
    return html`
      <div class="wrapper ${this.active ? 'active' : ''} mdc-typography">
        <div class="actions">
          ${this.renderActions()}
        </div>
        <div class="description mdc-theme--on-surface mdc-typography--headline6">
          ${this.renderDescription()}
        </div>
        <div class="filters">
          ${this.renderFilters()}
        </div>
      </div>
    `;
  }
}
