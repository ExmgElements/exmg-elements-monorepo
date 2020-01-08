import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-checkbox/paper-checkbox';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor';
import './cust-el';

import '../exmg-form';
import {ExmgForm} from '../exmg-form';

@customElement('tab-1')
export class Tab1El extends LitElement {
  @property({type: String})
  selectedValue = '';

  @property({type: Boolean})
  dirty = false;

  render() {
    return html`
      <h1>Serializing form : A Study Case. <button @click=${this._addInputElement}>Add input</button></h1>
      <i>Form Dirty: ${this.dirty}</i>
      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" @dirty-change=${this._handleDirty} disable-submit-no-changes>
        <paper-input name="pass" label="password input" type="password"></paper-input>
        <paper-input name="test" label="disabled input" value="batman"></paper-input>
        <exmg-paper-combobox label="Project" name="combobox" style="max-width:280px;" always-float-label required>
          <paper-item>PlayToTV</paper-item>
          <paper-item>Website</paper-item>
        </exmg-paper-combobox>
        <exmg-paper-token-input name="tokens" label="Components" selected-values="[1,2]" always-float-label>
          <paper-item>javascript</paper-item>
          <paper-item>css</paper-item>
          <paper-item>Python</paper-item>
          <paper-item>java</paper-item>
        </exmg-paper-token-input>
        <cust-el></cust-el>
      </exmg-form>
    `;
  }

  _addInputElement() {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'test33';
    input.value = 'tes111';
    this.shadowRoot!.querySelector('exmg-form')!.appendChild(input);
  }
  onSubmit() {
    setTimeout(() => {
      this.resetForm1();
      // event.path[0].error('User does not have permission to save data');
    }, 1500);
  }

  onCancel(event: any) {
    console.log('cancel', event);
  }

  _handleDirty(e: CustomEvent<{dirty: boolean}>) {
    this.dirty = e.detail.dirty;
  }

  validateForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).validate();
  }

  resetForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).reset();
  }
}
