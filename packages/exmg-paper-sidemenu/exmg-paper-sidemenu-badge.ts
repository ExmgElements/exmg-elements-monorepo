import {customElement} from 'lit-element';
import {style} from './styles/exmg-paper-sidemenu-badge-styles';
import {ExmgPaperSidemenuBadgeBase} from './exmg-paper-sidemenu-badge-base.js';

@customElement('exmg-paper-sidemenu-badge')
export class ExmgPaperSidemenuBadge extends ExmgPaperSidemenuBadgeBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exmg-paper-sidemenu-badge': ExmgPaperSidemenuBadge;
  }
}
