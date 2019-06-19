import {LitElement, html, customElement, property, query} from 'lit-element';
import '@exmg/exmg-button';
import '@polymer/paper-input/paper-input.js';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox.js';
import '@exmg/exmg-form/exmg-form';
import '../exmg-form-drawer';
import {ExmgFormDrawer} from '../exmg-form-drawer';

@customElement('exmg-drawer-demo')
export class Drawer extends LitElement {
  @property({type: Boolean}) opened: boolean = false;
  @property({type: Boolean}) shouldFail: boolean = false;
  @property({type: Boolean}) keepOpenedOnSubmitSuccess: boolean = false;
  @property({type: Boolean}) resetFormOnSubmitSuccess: boolean = false;
  @property({type: Boolean}) noCancelOnOutsideClick: boolean = false;

  @query('exmg-form-drawer') form?: ExmgFormDrawer;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;
  }

  openDialog() {
    this.opened = true;
  }

  openAndResetDialog() {
    this.form!.reset();
    this.opened = true;
  }

  handleShouldFailChange(e: CustomEvent) {
    this.shouldFail = (e.composedPath()[0] as HTMLInputElement).checked;
  }

  handleKeepOpenedOnSubmitSuccess(e: CustomEvent) {
    this.keepOpenedOnSubmitSuccess = (e.composedPath()[0] as HTMLInputElement).checked;
  }

  handleResetFormOnSubmitSuccess(e: CustomEvent) {
    this.resetFormOnSubmitSuccess = (e.composedPath()[0] as HTMLInputElement).checked;
  }

  handleNoCancelOnOutsideClick(e: CustomEvent) {
    this.noCancelOnOutsideClick = (e.composedPath()[0] as HTMLInputElement).checked;
  }

  onSubmit() {
    setTimeout(() => {
      if (this.shouldFail) {
        this.form!.error('Internal error occurred');
      } else {
        this.form!.done();
      }
    }, 1000);
  }

  onCancel(event: CustomEvent) {
    console.log('cancel', event);
  }

  render() {
    // language=html
    return html`
      <style>
        exmg-form-drawer {
          --mdc-theme-primary: #0071dc;
        }
      </style>
      <div style="padding: 20px">
        <input type="button" @click="${this.openDialog}" value="Open dialog" /><input
          type="button"
          @click="${this.openAndResetDialog}"
          value="Open dialog (reset form)"
        />
        <br /><br />
        <label>
          <input
            type="checkbox"
            name="shouldFail"
            value="${this.shouldFail}"
            @change="${this.handleShouldFailChange}"
          />
          Should Fail
        </label>
        <br /><br />
        <label>
          <input
            type="checkbox"
            name="keepOpenedOnSubmitSuccess"
            value="${this.keepOpenedOnSubmitSuccess}"
            @change="${this.handleKeepOpenedOnSubmitSuccess}"
          />
          Keep opened on submit success
        </label>
        <br /><br />
        <label>
          <input
            type="checkbox"
            name="resetFormOnSubmitSuccess"
            value="${this.resetFormOnSubmitSuccess}"
            @change="${this.handleResetFormOnSubmitSuccess}"
          />
          Reset form on submit success
        </label>
        <br /><br />
        <label>
          <input
            type="checkbox"
            name="noCancelOnOutsideClick"
            value="${this.noCancelOnOutsideClick}"
            @change="${this.handleNoCancelOnOutsideClick}"
          />
          No cancel on outside click
        </label>
      </div>
      <exmg-form-drawer
        ?opened="${this.opened}"
        ?keep-opened-on-submit-success="${this.keepOpenedOnSubmitSuccess}"
        ?reset-form-on-submit-success="${this.resetFormOnSubmitSuccess}"
        ?no-cancel-on-outside-click="${this.noCancelOnOutsideClick}"
        @exmg-drawer-opened-changed="${this.handleOpenedChanged}"
        submit-btn-title="Create"
        @submit="${this.onSubmit}"
        @cancel="${this.onCancel}"
      >
        <span slot="title">New event</span>
        <exmg-paper-combobox label="Type" name="type" selected="0" always-float-label>
          <paper-item>Trivia</paper-item>
          <paper-item>Other</paper-item>
        </exmg-paper-combobox>
        <paper-input
          name="question"
          label="Question"
          value="Who's Dylan Hartigan's favorite artist?"
          required
        ></paper-input>
        <paper-input name="answer_a" label="Answer A" value="Beyoncé"></paper-input>
        <paper-input name="answer_b" label="Answer B" value="Eminem"></paper-input>
        <paper-input name="answer_c" label="Answer C" value="Ariana Grande"></paper-input>
        <br />
        <exmg-button unelevated>
          + Add answer
        </exmg-button>
      </exmg-form-drawer>
    `;
  }
}
