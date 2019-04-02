import {LitElement, html, customElement} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@material/mwc-icon';
import '../exmg-form-drawer';
import {MDCList} from '@material/list';
import {style} from './drawer-styles';

@customElement('exmg-form-drawer-demo-always-open')
export class DrawerAlwaysOpen extends LitElement {
  firstUpdated(_changedProperties: any) {
    super.firstUpdated(_changedProperties);
    new MDCList(this.shadowRoot!.querySelector('.mdc-list')!);
  }

  static styles = style;

  render () {
    //language=html
    return html`
      <exmg-form-drawer hasheader="" ?open="${true}" style="height: 100vh">
        
        <mwc-icon slot="title-icon" class="mdc-list-item__graphic">extension</mwc-icon>
        <span slot="title">PlayTwo CMS</span>
        
        <div class="drawer-content">
          <div class="mdc-list">
            <hr class="mdc-list-divider">
            <h6 class="mdc-list-group__subheader">Broadcast</h6>
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
          </div>
        </div>
        <div slot="appContent">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </exmg-form-drawer>
    `;
  }
}
