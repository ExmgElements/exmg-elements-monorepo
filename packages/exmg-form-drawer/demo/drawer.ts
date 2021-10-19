import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@polymer/paper-input/paper-input.js';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox.js';
import '@exmg/exmg-form/exmg-form.js';
import '../exmg-drawer.js';

@customElement('exmg-drawer-demo')
export class Drawer extends LitElement {
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
        exmg-drawer {
          --exmg-drawer-max-width: 300px;
        }
      </style>
      <input type="button" @click="${this.openDialog}" value="Open dialog" />

      <exmg-drawer ?opened="${this.opened}" @exmg-drawer-opened-changed="${this.handleOpenedChanged}">
        <exmg-form id="form1">
          <paper-input name="value1" label="text input" required></paper-input>
          <paper-input name="value2" label="text input" value="pre-filled"></paper-input>
          <paper-input label="password input" type="password"></paper-input>
          <paper-input label="disabled input" disabled value="batman"></paper-input>
          <paper-input name="name" label="Summary" required always-float-label></paper-input>
          <paper-input name="estimate" label="Estimates" type="number" always-float-label style="max-width:180px;"></paper-input>

          <exmg-paper-combobox label="Project" name="combobox" style="max-width:280px;" always-float-label required>
            <paper-item>PlayToTV</paper-item>
            <paper-item>Website</paper-item>
          </exmg-paper-combobox>
        </exmg-form>
      </exmg-drawer>
    `;
  }
}
