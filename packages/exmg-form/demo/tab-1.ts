import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor';

import '../exmg-form';
import {ExmgForm} from '../exmg-form';

@customElement('tab-1')
export class Tab1El extends LitElement {

  @property({type: String})
  selectedValue = '';

  render() {
    return html`
      <h1>Serializing form : A Study Case. <button @click=${this._addInputElement}>Add input</button><button @click=${this._test}>Test</button></h1>
      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" @dirty=${this.displayFormDirty}>
        <paper-input name="input1" label="text input" value=${this.selectedValue} required></paper-input>
        <paper-input name="input2" label="text input" value="pre-filled"></paper-input>
        <p>Prefilled paper-input do not throw DIRTY event</p>
        <exmg-markdown-editor name="markdown" required>
          <marked-element markdown="# Hello Word!">
            <div slot="markdown-html"></div>
          </marked-element>
        </exmg-markdown-editor>
      </exmg-form>
    `;
  }

  _test() {
    this.selectedValue = '123';
    setTimeout(() => {
      this.shadowRoot!.querySelector('exmg-form')!.updateOriginalState();
    }, 100);
  }

  _addInputElement() {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'test33';
    input.value = 'tes111';
    this.shadowRoot!.querySelector('exmg-form')!.appendChild(input);
    this.shadowRoot!.querySelector('exmg-form')!.updateOriginalState();
  }
  onSubmit(event: any) {
    console.log('submit', event);
    setTimeout(() => {
      this.resetForm1();
      // event.path[0].error('User does not have permission to save data');
    }, 1500);
  }

  onCancel(event: any) {
    console.log('cancel', event);
  }

  displayFormDirty(e: CustomEvent) {
    const form = e.target as ExmgForm;
    form.error(`You changed a value, form is dirty: ${form.isDirty}`);
  }

  validateForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).validate();
  }

  resetForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).reset();
  }
}
