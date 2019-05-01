import {LitElement, html, customElement, property} from 'lit-element';
import '@material/mwc-checkbox';
import {style} from './button-demo-styles';
import '../';

@customElement('exmg-button-demo')
export class ButtonDemo extends LitElement {
  @property({type: Boolean}) loading: boolean = false;

  static styles = style;

  changeHandler(e: any) {
    this.loading = !e.target.checked;
  }
  render () {
    return html`
      <style>

      </style>
      <div>
        <mwc-checkbox .checked="${this.loading}" @click="${this.changeHandler}"></mwc-checkbox> Toggle Loading
      </div>
      <div>
        <exmg-button ?loading="${this.loading}">Test 1</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}">Test 2</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}" disabled>Test 3</exmg-button>
      </div>
    `;
  }
}
