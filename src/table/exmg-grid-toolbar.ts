import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import '@material/mwc-icon';
import {style} from './exmg-grid-toolbar-styles';
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

  static styles = [
    style,
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
      <select name="${filter.id}" @change="${this.emitFilterChangedEvent(filter)}" class="filter">
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
    return html`
      <div class="wrapper ${this.actions.length > 0 ? 'active' : ''} mdc-typography">
        ${this.actions.length > 0 ?
            html`
              <div class="actions">
                ${this.renderActions()}
              </div>
            ` :
            ''
        }
        <div class="description mdc-theme--on-surface mdc-typography--headline5">
          ${this.renderDescription()}
        </div>
        <div class="filters">
          ${this.renderFilters()}
        </div>
      </div>
    `;
  }
}
