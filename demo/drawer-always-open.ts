import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '../exmg-form-drawer';
import {MDCList} from '@material/list';
import '@material/list';
import {style} from './drawer-always-open-styles';

@customElement('exmg-form-drawer-demo-always-open')
export class DrawerAlwaysOpen extends LitElement {
  @property({type: Boolean}) open: boolean = false;

  firstUpdated(_changedProperties: any) {
    super.firstUpdated(_changedProperties);
    new MDCList(this.shadowRoot!.querySelector('.mdc-list')!);
  }

  onDrawerClosed() {
    this.open = false;
  }

  openDrawer() {
    this.open = true;
  }

  static styles = style;

  render () {
    console.log(this.open);
    //language=html
    return html`
      <exmg-form-drawer hasheader="" type="modal" ?open="${this.open}" @MDCDrawer:closed="${this.onDrawerClosed}">
        <span slot="title">Drawer Title</span>
        <span slot="subtitle">subtitle</span>
        <div class="drawer-content">
        
<ul class="mdc-list">
  <li class="mdc-list-item" tabindex="0">
    <span class="mdc-list-item__text">Item 1 - Division 1</span>
  </li>
  <li class="mdc-list-item">
    <span class="mdc-list-item__text">Item 2 - Division 1</span>
  </li>
  <li role="separator" class="mdc-list-divider"></li>
  <li class="mdc-list-item">
    <span class="mdc-list-item__text">Item 1 - Division 2</span>
  </li>
  <li class="mdc-list-item">
    <span class="mdc-list-item__text">Item 2 - Division 2</span>
  </li>
</ul>
        </div>
        <div slot="appContent">
          <input type="button" @click="${this.openDrawer}" value="Open drawer">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </exmg-form-drawer>
    `;
  }
}
