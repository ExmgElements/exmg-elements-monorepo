import {LitElement, html, customElement} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '../exmg-bracket';
import '../exmg-bracket-column';
import '../exmg-bracket-item';
import {_items} from './demo-data';

@customElement('exmg-bracket-demo')
export class BracketDemo extends LitElement {
  public render() {
    return html`
      <exmg-bracket>
        ${repeat(
          _items,
          (round: {header: string; items: any}) => html`
            <exmg-bracket-column header=${round.header}>
              ${this.renderItems(round.items)}
            </exmg-bracket-column>
          `,
        )}
      </exmg-bracket>
    `;
  }
  private renderItems(_roundItems: any) {
    return html`
      ${repeat(
        _roundItems,
        (item: any) => html`
          <exmg-bracket-item has-won="${item.hasWon}">
            <span slot="player-one-name">${item.playerOne.name}</span>
            <span slot="player-one-points">${item.playerOne.totalPoints}</span>
            <span slot="player-one-score">${item.playerOne.score}</span>
            <span slot="player-two-name">${item.playerTwo.name}</span>
            <span slot="player-two-points">${item.playerTwo.totalPoints}</span>
            <span slot="player-two-score">${item.playerTwo.score}</span>
          </exmg-bracket-item>
        `,
      )}
    `;
  }
}
