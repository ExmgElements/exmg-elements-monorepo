import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import {style as exmgGridToolbarStyles} from './exmg-grid-toolbar-styles';
import {Action, Filter, FilterType, SingleSelectFilterExtraOptions} from './exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar')
export class ExmgRadioGroup extends LitElement {
  @property({type: String})
  title: string = '';

  @property({type: Object})
  actions: Action[] = [];

  @property({type: Object})
  filters: Filter<any>[] = [];

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

  private emitFilterChangedEvent(filter: Filter<any>) {
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
          class="light"
          label="${action.text}"
          icon="${action.icon}"
          title="${action.tooltip}"
          @click="${this.emitActionExecutedEvent(action)}"
        ></mwc-button>
      `
    );
  }

  private renderTitle() {
    return html`${this.title}`;
  }

  private renderFilters() {
    return repeat(
      this.filters,
      filter => this.renderFilter(filter)
    );
  }

  private renderFilter(filter: Filter<any>) {
    switch (filter.type) {
      case FilterType.SingleSelect:
        return this.renderSingleSelectFilter(filter);
    }
  }

  private renderSingleSelectFilter(filter: Filter<SingleSelectFilterExtraOptions>) {
    return html`
      <select name="${filter.id}" @change="${this.emitFilterChangedEvent(filter)}">
        ${repeat(
          filter.extraOptions.data,
          (item) => {
            return html`<option value="${item.id}">${filter.name}: ${item.title}</option>`;
          }
        )}
      </select>
    `;
  }

  render() {
    return html`
      <div class="actions">
        ${this.renderActions()}
      </div>
      <div class="title">
        ${this.renderTitle()}
      </div>
      <div class="filters">
        ${this.renderFilters()}
      </div>
    `;
  }
}
