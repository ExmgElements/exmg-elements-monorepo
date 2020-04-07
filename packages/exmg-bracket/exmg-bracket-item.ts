import {LitElement, html, customElement, property} from 'lit-element';
import {style as newStyles} from './styles/exmg-bracket-styles';
import {classMap} from 'lit-html/directives/class-map.js';

type LinePoint = [number, number];

@customElement('exmg-bracket-item')
export class ExmgBracketItem extends LitElement {
  @property({type: Number, attribute: 'has-won'})
  hasWon: number | undefined;

  @property({type: Number, attribute: 'has-started'})
  hasStarted: boolean | undefined;

  @property({type: Number, attribute: 'id'})
  itemId = 0;

  @property({type: Number, attribute: 'next-id'})
  nextId = 0;

  @property({type: DOMRect, attribute: false})
  dimensions = this.getBoundingClientRect();

  @property({type: DOMRect, attribute: false})
  nextDimensions = this.getBoundingClientRect();

  static styles = [newStyles];
  private item: Element | null | undefined;

  firstUpdated() {
    this.dimensions = this.getBoundingClientRect();
    setTimeout(() => {
      //Exectute if event loop tick has finished
      const element = document.body.querySelectorAll('*')[1];
      this.item = element.shadowRoot!.querySelector('#item_' + this.nextId);
      this.nextDimensions = this.item!.getBoundingClientRect();
    });
  }

  calculateSvgPoints = ([x1, y1]: LinePoint, [x2, y2]: LinePoint): string => {
    const mx = x1 + (x2 - x1) / 2;
    return ['M', x1, y1, 'C', mx, y1, mx, y2, x2, y2].join(' ');
  };

  calculateLinkLinePoints = (sourceNodeElement: DOMRect, targetNodeElement: DOMRect): [LinePoint, LinePoint] => {
    const {top: sourceTop, height: sourceHeight} = sourceNodeElement;
    const {top: targetTop, height: targetHeight} = targetNodeElement;
    const {top: containerTop} = sourceNodeElement;
    const sourceY = sourceTop - containerTop + sourceHeight / 2 + sourceHeight / 2;
    const targetY = targetTop - containerTop + targetHeight / 2 + targetHeight / 2;
    return [[0, sourceY], [160, targetY]];
  };

  renderLine() {
    const [startPoint, endPoint] = this.calculateLinkLinePoints(this.dimensions, this.nextDimensions);
    return html`
      <svg class="line">
        <path d="${this.calculateSvgPoints(startPoint, endPoint)}" stroke="lightgrey" fill="transparent" />
      </svg>
    `;
  }

  protected render() {
    // temporary
    const playerOneClasses = {won: this.hasWon === 1 ? true : false, lost: this.hasWon === 2 ? true : false};
    const playerTwoClasses = {won: this.hasWon === 2 ? true : false, lost: this.hasWon === 1 ? true : false};
    return html`
      <div class="player-container resolved">
        ${this.renderLine()}
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
