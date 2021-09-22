import {customElement} from 'lit/decorators';
import {style} from './styles/exmg-paper-sidemenu-header-styles-css.js';
import {ExmgPaperSidemenuHeaderBase} from './exmg-paper-sidemenu-header-base';

@customElement('exmg-paper-sidemenu-header')
export class ExmgPaperSidemenuHeader extends ExmgPaperSidemenuHeaderBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exmg-paper-sidemenu-header': ExmgPaperSidemenuHeader;
  }
}
