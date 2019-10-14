import {LitElement, html, customElement} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor';

import '../exmg-form';
import {ExmgForm} from '../exmg-form';

@customElement('tab-1')
export class Tab1El extends LitElement {

  render() {
    return html`
      <h1>Serializing form : A Study Case.</h1>
      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" @dirty=${this.displayFormDirty}>
        <paper-input name="input1" label="text input" required></paper-input>
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

  onSubmit(event: any) {
    console.log('submit', event);
    setTimeout(_ => {
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
