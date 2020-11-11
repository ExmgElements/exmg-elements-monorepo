import {html, LitElement} from 'lit-element';

export class ExmgPaperSidemenuBadgeBase extends LitElement {
  render() {
    return html`
      <div class="badge"><span><slot></slot></span></div>
    `;
  }
}
