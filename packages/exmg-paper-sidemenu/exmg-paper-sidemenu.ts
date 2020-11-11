import {customElement} from 'lit-element';
import {style} from './styles/exmg-paper-sidemenu-base-styles';
import {ExmgPaperSidemenuBase} from './exmg-paper-sidemenu-base.js';

@customElement('exmg-paper-sidemenu')
export class ExmgPaperSidemenu extends ExmgPaperSidemenuBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exmg-paper-sidemenu': ExmgPaperSidemenu;
  }
}
