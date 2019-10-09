import {LitElement, html, customElement, css, property} from 'lit-element';
import '@material/mwc-tab/mwc-tab';
import '@material/mwc-tab-bar/mwc-tab-bar';

import '../exmg-form';
import {ExmgForm} from '../exmg-form';

import './tab-1';
import './tab-2';
import './tab-3';


@customElement('form-demo')
export class FormDemo extends LitElement {

  @property({type: Number})
  private activeTabIndex:number = 0;

  static styles = [
    css`
      #controlledHeight {
        --exmg-form-internal-height: 150px;
      }
    `,
  ];

  renderTab() {
    switch(this.activeTabIndex) {
      case 0: 
        return html`<tab-1></tab-1>`;
      case 1:
        return html`<tab-2></tab-2>`;
      case 2:
        return html`<tab-3></tab-3>`; 
    }
    return html`unknown`;
  }

  render() {
    return html`
      <mwc-tab-bar @MDCTabBar:activated=${(e:CustomEvent<{index: number}>) => this.activeTabIndex = e.detail.index}>
        <mwc-tab label="one"></mwc-tab>
        <mwc-tab label="two"></mwc-tab>
        <mwc-tab label="three"></mwc-tab>
      </mwc-tab-bar>

      <main>${this.renderTab()}</main>
    `;
  }
}
