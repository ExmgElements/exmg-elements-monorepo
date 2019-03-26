import { LitElement, html, customElement } from 'lit-element';
import '@exmg/exmg-paper-card/exmg-paper-card.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import {sharedPageStyles} from '../exmg-cms-page-styles';

@customElement('tabs-demo')
export class TabsDemo extends LitElement {

  static styles = [sharedPageStyles];

  render() {
    return html`
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
}