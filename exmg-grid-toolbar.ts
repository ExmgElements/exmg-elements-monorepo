import {property, customElement, html, LitElement} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import {styles as exmgGridToolbarStyles} from './exmg-grid-toolbar-styles';
import {Action} from './exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar')
export class ExmgRadioGroup extends LitElement {
  @property({type: String})
  title: string = '';

  @property({type: Object})
  actions: Action[] = [];

  @property({type: Object})
  filters: Action[] = [];

  static styles = [
    exmgGridToolbarStyles,
  ];

  connectedCallback(): void {
    super.connectedCallback();


    // this.addEventListener('exmg-radio-group-item-changed', this.handleRadioGroupItemChanged);
  }

  disconnectedCallback(): void {
    // this.removeEventListener('exmg-radio-group-item-changed', this.handleRadioGroupItemChanged);

    super.disconnectedCallback();
  }

  private renderActions() {
    return repeat(
      this.actions,
      (action) => html`
        <mwc-button class="light" label="${action.label}" icon="${action.icon}" title="${action.title}"></mwc-button>
      `
    );
  }

  render() {
    return html`
      <div>
        ${this.renderActions()}
      </div>
    `;
  }
}
