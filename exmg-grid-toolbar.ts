import {property, customElement, html, LitElement} from 'lit-element';
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

  render() {
    return html`
      <div>
        toolbar
      </div>
    `;
  }
}
