import {LitElement, html, customElement} from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@exmg/exmg-form/exmg-form';
import '../exmg-stepper';

@customElement('exmg-stepper-form-demo')
export class StepperDrawer extends LitElement {
  render() {
    // language=html
    return html`
      <style>
        exmg-stepper {
          --mdc-theme-primary: #0071dc;
        }
      </style>
      <exmg-form id="form1" hide-submit-button hide-reset-button>
        <exmg-stepper last-button-text="Submit">
          <p slot="head-1">Set the basic values</p>
          <div slot="content-1">
            <paper-input name="value1" label="text input" required></paper-input>
            <paper-input name="value2" label="text input" value="pre-filled"></paper-input>
            <paper-input label="password input" type="password"></paper-input>
          </div>

          <p slot="head-2">Set bitrate option</p>
          <div slot="content-2">
            <paper-input label="disabled input" disabled value="batman"></paper-input>
            <paper-input name="name" label="Summary" required always-float-label></paper-input>
            <paper-input name="estimate" label="Estimates" type="number" always-float-label style="max-width:180px;"></paper-input>
          </div>
          <p slot="head-3">Set the basic values</p>
          <div slot="content-3">
            <paper-input label="disabled input" disabled value="batman"></paper-input>
            <paper-input name="name" label="Summary" required always-float-label></paper-input>
          </div>

          <p slot="head-4">Finalize</p>
          <div slot="content-4">
            <paper-input label="disabled input" disabled value="batman"></paper-input>
            <paper-input name="name" label="Summary" required always-float-label></paper-input>
          </div>
        </exmg-stepper>
      </exmg-form>
    `;
  }
}
