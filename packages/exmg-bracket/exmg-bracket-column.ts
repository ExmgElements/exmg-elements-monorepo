import {LitElement, html, customElement, property} from 'lit-element';
import {style as newStyles} from './styles/exmg-bracket-styles';

@customElement('exmg-bracket-column')
export class ExmgBracketColumn extends LitElement {
  static styles = [newStyles];
  @property({type: Object})
  _items = [];

  @property({type: String})
  header = '';

  protected render() {
    return html`
      <div class="column-inner">
        <div class="header-container">
          <span class="header-round">${this.header}</span>
        </div>
        <slot></slot>
      </div>
    `;
  }
}
