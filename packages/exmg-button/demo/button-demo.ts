import {LitElement, html, customElement, property} from 'lit-element';
import '@material/mwc-checkbox';
import '@material/mwc-icon/mwc-icon';
import '@material/mwc-button';
import {style} from './button-demo-styles';
import '../';

@customElement('exmg-button-demo')
export class ButtonDemo extends LitElement {
  @property({type: Boolean})
  public loading: boolean = false;

  public static styles = style;

  public changeHandler(e: any) {
    this.loading = !e.target.checked;
  }
  public render() {
    return html`
      <style></style>
      <div><mwc-checkbox .checked="${this.loading}" @click="${this.changeHandler}"></mwc-checkbox> Toggle Loading</div>
      <div>
        <exmg-button ?loading="${this.loading}">Test 1</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}">Test 2</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}" disabled>Test 3</exmg-button>
        <exmg-button class="dark" unelevated ?loading="${this.loading}"><mwc-icon>merge_type</mwc-icon>Test 4</exmg-button>
        <exmg-button class="progress-button" progress="50" ?loading="${this.loading}">Test 5</exmg-button>
      </div>
    `;
  }
}
