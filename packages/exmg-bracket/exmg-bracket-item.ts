import {LitElement, html, customElement, property} from 'lit-element';
import {style as newStyles} from './styles/exmg-bracket-styles';
import {classMap} from 'lit-html/directives/class-map.js';

@customElement('exmg-bracket-item')
export class ExmgBracketItem extends LitElement {
  @property({type: Number, attribute: 'has-won'})
  hasWon: number | undefined;

  @property({type: Number, attribute: 'has-started'})
  hasStarted: boolean | undefined;

  static styles = [newStyles];

  protected render() {
    const playerOneClasses = {won: this.hasWon === 1 ? true : false, lost: this.hasWon === 2 ? true : false};
    const playerTwoClasses = {won: this.hasWon === 2 ? true : false, lost: this.hasWon === 1 ? true : false};
    return html`
      <div class="player-container resolved">
        <div class="player ${classMap(playerOneClasses)}">
          <div class="player-name">
            <slot name="player-one-name"></slot>
          </div>
          <div class="score-container">
            <div class="player-points">
              <slot name="player-one-points"></slot>
              <span>pts</span>
            </div>
            <div class="player-score">
              <slot name="player-one-score"></slot>
            </div>
          </div>
        </div>
        <div class="player ${classMap(playerTwoClasses)}">
          <div class="player-name">
            <slot name="player-two-name"></slot>
          </div>
          <div class="score-container">
            <div class="player-points">
              <slot name="player-two-points"></slot>
              <span>pts</span>
            </div>
            <div class="player-score">
              <slot name="player-two-score"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
