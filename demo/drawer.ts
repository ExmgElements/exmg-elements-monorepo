import {LitElement, html, customElement, property} from 'lit-element';
import '../exmg-form-drawer';

@customElement('exmg-form-drawer-demo')
export class Drawer extends LitElement {
  @property({type: Boolean}) opened: boolean = false;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;
  }

  openDialog() {
    this.opened = true;
  }

  render () {
    // language=html
    return html`
      <input type="button" @click="${this.openDialog}" value="Open dialog">
      <exmg-form-drawer ?opened="${this.opened}" @exmg-form-drawer-opened-changed="${this.handleOpenedChanged}">
        <form>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <input type="button" value="submit"/>
        </form>
      </exmg-form-drawer>
    `;
  }
}
