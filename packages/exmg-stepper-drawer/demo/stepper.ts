import {LitElement, html, customElement} from 'lit-element';
import '@exmg/exmg-form/exmg-form';
import '../exmg-stepper-drawer';

@customElement('exmg-stepper-demo')
export class Stepper extends LitElement {
  render() {
    // language=html
    return html`
      <style>
        exmg-stepper-drawer {
          --mdc-theme-primary: #0071dc;
        }
      </style>
      <exmg-stepper-drawer last-button-text="Submit" enable-edit-mode>
        <p slot="head-1">Set the basic values</p>
        <div slot="content-1">
          Enter the minimal and maximal bitrate you like to use for the test.
          <br />
          <br />
          <br />
          <p>dynamic height</p>
        </div>

        <p slot="head-2">Set bitrate option</p>
        <p slot="content-2">
          The following bitrates have been recommended to run the test with the best possible bitrate ladder for your setup.
        </p>
        <p slot="head-3">Set the basic values</p>
        <div slot="content-3">
          Enter the minimal and maximal bitrate you like to use for the test.
          <br />
          <br />
          <br />
          <p>dynamic height</p>
        </div>

        <p slot="head-4">Set bitrate option</p>
        <p slot="content-4">
          The following bitrates have been recommended to run the test with the best possible bitrate ladder for your setup.
        </p>
      </exmg-stepper-drawer>
    `;
  }
}
