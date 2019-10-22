import {LitElement, html, customElement} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox';
import '@exmg/exmg-paper-token-input/exmg-paper-token-input';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor';

import '../exmg-form';
import {ExmgForm} from '../exmg-form';

@customElement('tab-2')
export class Tab2El extends LitElement {
  render() {
    return html`
      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" @dirty="${this.displayFormDirty}" id="form1">
        <paper-input name="value1" label="text input" required></paper-input>
        <paper-input name="value2" label="text input" value="pre-filled"></paper-input>
        <paper-input label="password input" type="password"></paper-input>
        <paper-input label="disabled input" disabled value="batman"></paper-input>
        <paper-input name="name" label="Summary" required always-float-label></paper-input>
        <paper-input name="estimate" label="Estimates" type="number" always-float-label style="max-width:180px;"></paper-input>

        <paper-textarea label="autoresizing textarea input"></paper-textarea>

        <exmg-paper-combobox label="Project" name="combobox" style="max-width:280px;" always-float-label required>
          <paper-item>PlayToTV</paper-item>
          <paper-item>Website</paper-item>
        </exmg-paper-combobox>
        <p class="help">
          Some issue types are unavailable due to incompatible field configuration and/or workflow associations.
        </p>
        <hr />
        <p class="help">Start typing to get a list of possible matches.</p>
        <exmg-paper-token-input name="tokens" label="Components" always-float-label>
          <paper-item>javascript</paper-item>
          <paper-item>css</paper-item>
        </exmg-paper-token-input>
        <p class="help">Start typing to get a list of possible matches or press down to select.</p>
        <p class="help">Estimated time needed to resolve this issue in hours.</p>
        <label>Message</label>
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
