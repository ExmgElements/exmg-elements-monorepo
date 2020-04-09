import {LitElement, html, customElement, property} from 'lit-element';
import {style as newStyles} from './styles/exmg-bracket-styles';
import {classMap} from 'lit-html/directives/class-map.js';

type LinePoint = [number, number];

@customElement('exmg-bracket-item')
export class ExmgBracketItem extends LitElement {
  @property({type: String, attribute: 'has-won'})
  hasWon: string | undefined;

  @property({type: String, attribute: 'player-one-id'})
  plyOneId: string | undefined;

  @property({type: String, attribute: 'player-two-id'})
  plyTwoId: string | undefined;

  @property({type: Number, attribute: 'id'})
  itemId = 0;

  @property({type: Number, attribute: 'next-id'})
  nextId = 0;

  @property({type: Boolean, attribute: 'highlighted'})
  highlighted = false;

  @property({type: DOMRect, attribute: false})
  dimensions = this.getBoundingClientRect();

  @property({type: DOMRect, attribute: false})
  nextDimensions = this.getBoundingClientRect();

  static styles = [newStyles];
  private item: Element | null | undefined;
  private items: any;

  firstUpdated() {
    this.dimensions = this.getBoundingClientRect();
    setTimeout(() => {
      //Exectute if event loop tick has finished
      const element = this.parentElement!.parentElement;
      this.item = element!.querySelector('#item_' + this.nextId);
      this.items = element!.querySelectorAll('exmg-bracket-item');
      if (this.item) {
        this.nextDimensions = this.item!.getBoundingClientRect();
      }
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

  addHighlight(el: this) {
    const id = el.id.substring(5); // Remove item_ prefix
    const won = el.hasWon;
    this.items.forEach((element: any) => {
      if (id === element.getAttribute('next-id') && (won === element.plyOneId || won === element.plyTwoId)) {
        element.highlighted = true;
        this.addHighlight(element);
      }
    });
  }

  removeHighlight(el: this) {
    const id = el.id.substring(5); // Remove item_ prefix
    const won = el.hasWon;
    this.items.forEach((element: any) => {
      if (id === element.getAttribute('next-id') && (won === element.plyOneId || won === element.plyTwoId)) {
        element.highlighted = false;
        this.removeHighlight(element);
      }
    });
  }

  renderLine() {
    const lineClasses = {highlight: this.highlighted ? true : false};
    const [startPoint, endPoint] = this.calculateLinkLinePoints(this.dimensions, this.nextDimensions);
    if (this.nextId) {
      return html`
        <svg class="line ${classMap(lineClasses)}" id="${this.hasWon}">
          <path d="${this.calculateSvgPoints(startPoint, endPoint)}" stroke="lightgrey" stroke-width="2" fill="transparent" />
        </svg>
      `;
    } else {
      return html``;
    }
  }

  protected render() {
    // temporary
    const classes = {highlight: this.highlighted ? true : false};
    const playerOneClasses = {won: this.hasWon === this.plyOneId ? true : false, lost: this.hasWon === this.plyTwoId ? true : false};
    const playerTwoClasses = {won: this.hasWon === this.plyTwoId ? true : false, lost: this.hasWon === this.plyOneId ? true : false};
    return html`
      <div
        class="player-container ${classMap(classes)}"
        @mouseover="${() => this.addHighlight(this)}"
        @mouseleave="${() => this.removeHighlight(this)}"
      >
        ${this.renderLine()}
        <div class="player ${classMap(playerOneClasses)}">
          <slot name="player-one"></slot>
        </div>
        <div class="player ${classMap(playerTwoClasses)}">
          <slot name="player-two"></slot>
        </div>
      </div>
    `;
  }
}
