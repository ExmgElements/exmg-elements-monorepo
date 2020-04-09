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
          <exmg-bracket-item
            has-won="${item.hasWon}"
            id="item_${item.id}"
            next-id="${item.nextid}"
            player-one-id="${item.playerOne.playerId}"
            player-two-id="${item.playerTwo.playerId}"
          >
            <div slot="player-one">${item.playerOne.name}</div>
            <div slot="player-two">${item.playerTwo.name}</div>
          </exmg-bracket-item>
        `,
      )}
    `;
  }
}
