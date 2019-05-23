var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import { sharedPageStyles } from '../exmg-cms-page-styles';
let CardDemo = class CardDemo extends LitElement {
    render() {
        return html `
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
};
CardDemo.styles = [sharedPageStyles];
CardDemo = __decorate([
    customElement('card-demo')
], CardDemo);
export { CardDemo };
