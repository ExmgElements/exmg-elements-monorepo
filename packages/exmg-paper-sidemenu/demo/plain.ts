import {LitElement, html, css, property, customElement} from 'lit-element';
import '../exmg-paper-sidemenu.js';
import {menu} from './menu.js';

@customElement('x-demo')
export class XDemo extends LitElement {

  @property({type: Array})
  menu: [] | undefined;

  static styles = css`
    :host{
      display: inline-block;
      height: 100%;
      overflow: auto;
      background-color: white;
    }

    exmg-paper-sidemenu {
      width: 256px;
    }

    exmg-paper-sidemenu[collapsed] {
      width: 64px;
    }
  `;

  render() {
    return html`<exmg-paper-sidemenu .menu=${menu} selected="rooms/" debug></exmg-paper-sidemenu>`;
  }
}
