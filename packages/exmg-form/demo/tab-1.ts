import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-checkbox/paper-checkbox';
import '@exmg/exmg-markdown-editor/exmg-markdown-editor';
import './cust-el';
import './wrapper-el';

@customElement('tab-1')
export class Tab1El extends LitElement {
  @property({type: Boolean})
  dirty = false;

  render() {
    return html`
      <h1>Serializing form : A Study Case.</h1>
      <i>Form Dirty: ${this.dirty}</i>
      <!-- test situation when form is embedded inside other element shadow root -->
      <wrapper-el @dirty-change=${this._handleDirty}>
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
        <!-- This element need reset called on form reset -->
        <cust-el></cust-el>
      </wrapper-el>
    `;
  }

  _handleDirty(e: CustomEvent<{dirty: boolean}>) {
    this.dirty = e.detail.dirty;
  }
}
