import { LitElement, html, customElement } from 'lit-element';
import {sharedPageStyles} from '../exmg-cms-page-styles';

@customElement('card-demo')
export class CardDemo extends LitElement {

  static styles = [sharedPageStyles];

  render() {
    return html`
      <div class="page-container">
        <div class="page-content">
          <div>
            <h2>Active Users</h2>
          </div>
          <div>
            <div>
            Test card
            </div>
          </div>
        </div>
      </div>
      
    `;
  }
}