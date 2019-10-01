import {LitElement, html, customElement} from 'lit-element';
import '../exmg-paper-combobox';
import '@exmg/exmg-form';
import '@polymer/paper-item';

@customElement('combobox-form-demo')
export class ComboboxFormDemo extends LitElement {
  private logEvent(e: CustomEvent) {
    console.log(e);
  }

  render() {
    return html`
      <exmg-form @change=${this.logEvent} @dirty=${this.logEvent} @submit=${this.logEvent}>
        <h4>Selection-list</h4>
        <exmg-paper-combobox @change=${this.logEvent} id="combobox" label="Creatives" style="display:block;">
          <paper-item>Rubin</paper-item>
          <paper-item>Gennie</paper-item>
          <paper-item>Ronna</paper-item>
          <paper-item>Jacquie</paper-item>
          <paper-item>Norene</paper-item>
          <paper-item>Beatris</paper-item>
          <paper-item>Ginny</paper-item>
          <paper-item>Tiesha</paper-item>
          <paper-item>Leonore</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item
            >Evonne + Evonne + Evonne + Evonne + Evonne + Evonne + Evonne + Evonne +EvonneEvonneEvonne Evonne Evonne Evonne Evonne Evonne
            Evonne Evonne</paper-item
          >
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
          <paper-item>Evonne</paper-item>
        </exmg-paper-combobox>
        <h4>Selection-list styled</h4>
        <exmg-paper-combobox label="Creatives" attr-for-selected="data-id" selected="1012" class="styled">
          <paper-item data-id="1001">Rubin</paper-item>
          <paper-item data-id="1012">Gennie</paper-item>
          <paper-item data-id="1403">Ronna</paper-item>
        </exmg-paper-combobox>
      </exmg-form>
    `;
  }
}
