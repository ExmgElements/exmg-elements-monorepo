import {LitElement, html, customElement} from 'lit-element';
import {style as newStyles} from './styles/exmg-bracket-styles';

@customElement('exmg-bracket')
export class ExmgBracket extends LitElement {
  static styles = [newStyles];
  protected render() {
    return html`
      <div class="scroll">
        <div class="column-style">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
