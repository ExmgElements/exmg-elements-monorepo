import { customElement, LitElement, html, css } from "lit-element";
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item/paper-item-body';
import '../exmg-paper-combobox';
import '@material/mwc-icon';
import countries from './world_countries.js';

@customElement('rich-demo')
export class RichDemo extends LitElement {

  public static styles = [
    css`
      .container{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card{
        width: 300px
        height: 100px;

      }
    `
  ];

  private renderOptions() {
    return countries.slice(0,100).map(country => {
      const cssClass = `flag-icon flag-icon-${country.value.toLowerCase()}`;
      const callingCode = `+${country.value
    }`;
      return html`
        <paper-icon-item data-id="${country.value}">
          <span class="${cssClass}" slot="item-icon"></span>
          <paper-item-body>
            <div class="country">${country.name}</div>
            <div class="calling-code">${callingCode}</div>
          </paper-item-body>
        </paper-icon-item>
      `;
    });
  }

  protected render() {
    return html`
  <div class="container">
    <div class="card">
        <br>
        <br>
        <br>
        <br>
        <br>
        <exmg-paper-combobox
          name="area"
          label="Area"
          disable-dynamic-align
          attr-for-selected="data-id"
          selected-item-selector="div.calling-code"

        >
          ${this.renderOptions()}
        </exmg-paper-combobox>
        <exmg-paper-combobox
          name="area"
          label="Area2"

          attr-for-selected="data-id"
          selected-item-selector="div.calling-code"
        >
          ${this.renderOptions()}
        </exmg-paper-combobox>
    </div>
  </div>
    `;
  }
}
