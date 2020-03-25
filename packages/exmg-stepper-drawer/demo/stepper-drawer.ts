import {LitElement, html, customElement, property} from 'lit-element';
import '@exmg/exmg-form/exmg-form';
import '@exmg/exmg-form-drawer/exmg-drawer';
import '../exmg-stepper-drawer';

@customElement('exmg-stepper-drawer-demo')
export class StepperDrawer extends LitElement {
  @property({type: Boolean}) opened = false;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;
  }

  openDialog() {
    this.opened = true;
  }
  render() {
    // language=html
    return html`
      <style>
        exmg-stepper-drawer {
          --mdc-theme-primary: #0071dc;
        }
        exmg-drawer {
          --exmg-drawer-max-width: 500px;
        }
      </style>
      <input type="button" @click="${this.openDialog}" value="Open dialog" />

      <exmg-drawer ?opened="${this.opened}" @exmg-drawer-opened-changed="${this.handleOpenedChanged}">
        <exmg-stepper-drawer last-button-text="Test">
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
      </exmg-drawer>
    `;
  }
}
