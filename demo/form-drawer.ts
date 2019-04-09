import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox.js';
import '@exmg/exmg-form/exmg-form';
import '../exmg-form-drawer';

@customElement('exmg-form-drawer-demo')
export class Drawer extends LitElement {
  @property({type: Boolean}) opened: boolean = false;

  handleOpenedChanged(e: CustomEvent) {
    console.log('handleOpenedChanged');
    this.opened = e.detail.value;
  }

  openDialog() {
    this.opened = true;
  }

  render () {
    // language=html
    return html`
        <style>
          :host {
            --mdc-theme-primary: #0071dc;
          }
        </style>
      <input type="button" @click="${this.openDialog}" value="Open dialog">
      <exmg-form-drawer
        ?opened="${this.opened}"
        @exmg-drawer-opened-changed="${this.handleOpenedChanged}"
        submit-btn-title="Create"
      >
        <span slot="title">New event</span>
        <paper-input name="value1" label="text input"></paper-input>
        <paper-input name="value2" label="text input" value="pre-filled"></paper-input>
        <paper-input label="password input" type="password"></paper-input>
        <paper-input label="disabled input" disabled value="batman"></paper-input>
        <paper-input name="name" label="Summary" always-float-label></paper-input>
        <paper-input name="estimate" label="Estimates" type="number" always-float-label style="max-width:180px;"></paper-input>
        <exmg-paper-combobox label="Project" name="combobox" style="max-width:280px;" always-float-label>
          <paper-item>PlayToTV</paper-item>
          <paper-item>Website</paper-item>
        </exmg-paper-combobox>
      </exmg-form-drawer>
    `;
  }
}
