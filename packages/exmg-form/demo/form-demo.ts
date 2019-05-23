import {LitElement, html, customElement} from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox.js';
import '@exmg/exmg-paper-token-input/exmg-paper-token-input';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor.js';
import '@exmg/exmg-radio-group/exmg-radio-group';
import '@exmg/exmg-radio-group/exmg-radio-group-item';
import '../exmg-form';
import {ExmgForm} from 'exmg-form';

@customElement('form-demo')
export class FormDemo extends LitElement {

  render () {
    return html`
      <h1>Basic form</h1>

      <h2>Actions on form via javascript</h2>
      <input type="button" value="submit" @click="${this.submitForm1}">
      <input type="button" value="validate" @click="${this.validateForm1}">
      <input type="button" value="reset" @click="${this.resetForm1}">
      <input type="button" value="serialize" @click="${this.serializeForm1}">
      <hr>

      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" id="form1">
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
        <p class="help">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
        <hr />
        <p class="help">Start typing to get a list of possible matches.</p>
        <exmg-paper-token-input name="tokens" label="Components" always-float-label>
          <paper-item>javascript</paper-item>
          <paper-item>css</paper-item>
        </exmg-paper-token-input>
        <exmg-radio-group name="license" selected="option2">
          <exmg-radio-group-item value="option1">
              <div slot="title">Option 1</div>
              <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</div>
          </exmg-radio-group-item>
          <exmg-radio-group-item value="option2">
              <div slot="title">Option 2</div>
              <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</div>
          </exmg-radio-group-item>
        </exmg-radio-group>
        <p class="help">Start typing to get a list of possible matches or press down to select.</p>
        <p class="help">Estimated time needed to resolve this issue in hours.</p>
        <label>Message</label>
        <exmg-markdown-editor name="markdown" required>
          <marked-element markdown="# Hello Word!">
            <div slot="markdown-html"></div>
          </marked-element>
        </exmg-markdown-editor>
      </exmg-form>

      <h1>Inline form</h1>
      <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" inline>
        <paper-input label="text input" required></paper-input>
        <paper-input label="text input" value="pre-filled"></paper-input>
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

  submitForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm)!.submit();
  }

  validateForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).validate();
  }

  resetForm1() {
    (this.shadowRoot!.querySelector('#form1') as ExmgForm).reset();
  }

  serializeForm1() {
    console.log((this.shadowRoot!.querySelector('#form1') as ExmgForm).serializeForm());
  }
}
