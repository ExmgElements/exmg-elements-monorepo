import { customElement, LitElement, html, css } from "lit-element";
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item/paper-item-body';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-input/paper-input';
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
      .horizontal{
        display: flex;
        margin-right: 4px;
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
          dynamic-align
          horizontal-align="right"
          vertical-offset="0"
          horizontal-offset="0"
          vertical-align="top"
          attr-for-selected="data-id"
          selected-item-selector="div.calling-code"

        >
          ${this.renderOptions()}
        </exmg-paper-combobox>

        <div class="horizontal">
          <exmg-paper-combobox label="Select Users" required="" auto-validate="" error-message="Input required">
            <paper-item>Rubin</paper-item>
            <paper-item>Gennie</paper-item>
            <paper-item>Ronna</paper-item>
          </exmg-paper-combobox>
          <paper-input label="Test input" required="" auto-validate=""></paper-input>
        </div>

    </div>
  </div>
    `;
  }
}
