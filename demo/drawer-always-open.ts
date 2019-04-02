import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@material/mwc-icon';
import '../exmg-form-drawer';
import {MDCList} from '@material/list';
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
    //language=html
    return html`
      <exmg-form-drawer hasheader="" type="modal" ?open="${this.open}" @MDCDrawer:closed="${this.onDrawerClosed}">
        <span slot="title">Drawer Title</span>
        <span slot="subtitle">subtitle</span>
        <div class="drawer-content">
        
<nav class="mdc-list">
  <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
    <mwc-icon class="mdc-list-item__graphic">library_books</mwc-icon>
    <span class="mdc-list-item__text">Broadcast Overview</span>
  </a>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">art_track</mwc-icon>
    <span class="mdc-list-item__text">Program</span>
  </a>
  <a class="mdc-list-item" href="#">
  <mwc-icon class="mdc-list-item__graphic">recent_actors</mwc-icon>
    <span class="mdc-list-item__text">Presenter View</span>
  </a>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">videocam</mwc-icon>
    <span class="mdc-list-item__text">Video</span>
  </a>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">trending_up</mwc-icon>
    <span class="mdc-list-item__text">Broadcast Analytics</span>
  </a>

  <hr class="mdc-list-divider">
  <h6 class="mdc-list-group__subheader">Users</h6>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">people</mwc-icon>
    <span class="mdc-list-item__text">User Overview</span>
  </a>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">notifications_active</mwc-icon>
    <span class="mdc-list-item__text">Notifications</span>
  </a>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">security</mwc-icon>
    <span class="mdc-list-item__text">Roles and Rights</span>
  </a>

  <hr class="mdc-list-divider">
  <h6 class="mdc-list-group__subheader">Gamification</h6>
  <a class="mdc-list-item" href="#">
    <mwc-icon class="mdc-list-item__graphic">people</mwc-icon>
    <span class="mdc-list-item__text">Leaderboards</span>
  </a>
</nav>
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
