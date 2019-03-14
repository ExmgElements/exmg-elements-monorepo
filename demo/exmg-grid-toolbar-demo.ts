import {LitElement, html, customElement} from 'lit-element';

@customElement('exmg-grid-toolbar-demo')
export class ExmgGridToolbarDemo extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`<exmg-grid-toolbar></exmg-grid-toolbar>`;
  }
}
