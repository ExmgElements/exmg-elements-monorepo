import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '@material/mwc-checkbox/mwc-checkbox.js';
import '@material/mwc-icon/mwc-icon.js';
import '@material/mwc-button/mwc-button.js';
import {style} from './styles/button-demo-styles-css.js';
import '../exmg-button.js';

@customElement('exmg-button-demo')
export class ButtonDemo extends LitElement {
  @property({type: Boolean})
  public loading = false;

  public static styles = style;

  public changeHandler(e: any) {
    this.loading = !e.target.checked;
  }
  public render() {
    return html`
      <style></style>
      <div><mwc-checkbox .checked="${this.loading}" @click="${this.changeHandler}"></mwc-checkbox> Toggle Loading</div>
      <div>
        <mwc-button unelevated>unelevated</mwc-button>
        <exmg-button unelevated dense ?loading="${this.loading}">unelevated dense</exmg-button>
        <exmg-button ?loading="${this.loading}">Test 1</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}">Test 2</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}" disabled>Test 3</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}"><mwc-icon>merge_type</mwc-icon>Test 4</exmg-button>
        <exmg-button class="progress-button" progress="50" ?loading="${this.loading}">Test 5</exmg-button>
      </div>
    `;
  }
}
