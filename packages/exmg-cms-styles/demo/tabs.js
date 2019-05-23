var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import '@exmg/exmg-paper-card/exmg-paper-card.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import { sharedPageStyles } from '../exmg-cms-page-styles';
let TabsDemo = class TabsDemo extends LitElement {
    render() {
        return html `
      <div class="page-container">
        <div class="tabs-container">
          <paper-tabs selected="0" scrollable>
            <paper-tab>The first tab</paper-tab>
            <paper-tab>Tab two</paper-tab>
            <paper-tab>The third tab</paper-tab>
            <paper-tab>Fourth tab</paper-tab>
            <paper-tab>Fifth tab</paper-tab>
          </paper-tabs>
        </div>
        <div class="page-content">
          Page content
        </div>
      </div>
    `;
    }
};
TabsDemo.styles = [sharedPageStyles];
TabsDemo = __decorate([
    customElement('tabs-demo')
], TabsDemo);
export { TabsDemo };
