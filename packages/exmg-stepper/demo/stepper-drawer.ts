import {LitElement, html, customElement, property} from 'lit-element';
import '@exmg/exmg-form/exmg-form';
import '@exmg/exmg-form-drawer/exmg-drawer';
import '../exmg-stepper';
import '../exmg-step';

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
        exmg-stepper {
          --mdc-theme-primary: #0071dc;
        }
        exmg-drawer {
          --exmg-drawer-max-width: 500px;
        }
      </style>
      <input type="button" @click="${this.openDialog}" value="Open dialog" />

      <exmg-drawer ?opened="${this.opened}" @exmg-drawer-opened-changed="${this.handleOpenedChanged}">
        <exmg-stepper last-button-text="Test">
          <exmg-step slot="1" step="1" active>
            <p slot="head">Set the basic values</p>
            <p slot="content">LOLOL</p>
          </exmg-step>
          <exmg-step slot="2" step="2">
            <p slot="head">Set the basic values</p>
            <p slot="content">LOLOL</p>
          </exmg-step>
          <exmg-step slot="3" step="3">
            <p slot="head">Set the basic values</p>
            <p slot="content">LOLOL</p>
          </exmg-step>
          <exmg-step slot="4" step="4">
            <p slot="head">Set the basic values</p>
            <p slot="content">LOLOL</p>
          </exmg-step>
        </exmg-stepper>
      </exmg-drawer>
    `;
  }
}
