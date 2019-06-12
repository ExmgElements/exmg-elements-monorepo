import {LitElement, html, css, property, customElement} from 'lit-element';
import '../exmg-paper-sidemenu.js';
import '../exmg-paper-sidemenu-header.js';
import {menu} from './menu.js';

@customElement('x-demo')
export class XDemo extends LitElement {
  @property({type: Array})
  menu: [] | undefined;

  @property({type: String})
  selected: string = 'rooms/';

  @property({type: Boolean})
  collapsed: boolean = false;

  static styles = css`
    :host {
      display: inline-block;
      height: 100%;
      overflow: auto;
      background-color: white;
      color: black;

      --secondary-color: #57cb08;
      --paper-tabs-selection-bar-color: white;
      --exmg-paper-sidemenu-background: #19212b;
      --exmg-paper-sidemenu-item-text-color: #babdc0;
      --exmg-paper-sidemenu-hover-background-color: #394150;
      --exmg-paper-sidemenu-selected-text-color: var(--secondary-color);
      --exmg-paper-sidemenu-group-text-color: #fefffe;
      --exmg-paper-sidemenu-menu-header-background-color: #262f3c;
      --exmg-paper-sidemenu-menu-footer-background-color: #262f3c;
      --exmg-paper-sidemenu-menu-border-color: #3f4853;
      --exmg-paper-sidemenu-icon-color: white;
      --exmg-paper-sidemenu-header-item-icon: {
        fill: #babdc0;
      }
    }
    a {
      color: black;
    }
    exmg-paper-sidemenu {
      width: 256px;
    }
    exmg-paper-sidemenu[collapsed] {
      width: 64px;
    }
  `;

  render() {
    return html`
      <exmg-paper-sidemenu
        .menu=${menu}
        selected=${this.selected}
        @selected-change=${(e: CustomEvent) => (this.selected = e.detail)}
        @collapsed=${(e: CustomEvent) => (this.collapsed = e.detail)}
        debug
      >
        <exmg-paper-sidemenu-header
          slot="header"
          .collapsed=${this.collapsed}
          selected=${this.selected}
          @selected-change=${(e: CustomEvent) => (this.selected = e.detail)}
          debug
        ></exmg-paper-sidemenu-header>
      </exmg-paper-sidemenu>
    `;
  }
}
