import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-tooltip/exmg-paper-tooltip.js';

const dashboardIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg>`;
const settingsIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>`;


/**
* `exmg-paper-sidemenu-header` default sidemenu header including a home and settings link.
*
* ### Menu data model
* Menu items need to have the following structure:
* ```html
* <exmg-paper-sidemenu menu="[[menu]]" selected="[[selected]]" collapsed="{{collapsed}}">
*   <exmg-paper-sidemenu-header
*     slot="header"
*     collapsed="[[collapsed]]">
*   </exmg-paper-sidemenu-header>
* </exmg-paper-sidemenu>
* ```
*
* Please note not to forget to bind the collpapsed attribute. Otherwise the header will
* not change layout mode when menu is collapsing.
*
* ### Styling
*
* `<exmg-paper-sidemenu-header>` provides the following custom properties and mixins
* for styling:
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--exmg-paper-sidemenu-group-text-color` | Item text color | `54% black`
* `--exmg-paper-sidemenu-header-item` | Header item mixin | `{}`
* `--exmg-paper-sidemenu-menu-header-background-color` | Header background color | `#F9FAF9`
* `--exmg-paper-sidemenu-header-menu` | Menu header mixin | `{}`
* `--exmg-paper-sidemenu-hover-background-color` | Item hiover background color | `--paper-grey-200`
* `--exmg-paper-sidemenu-selected-text-color` | Selected item text color | `--primary-color`
*
* @customElement
* @polymer
*  @memberof Exmg
* @group Exmg Paper Elements
* @element exmg-paper-sidemenu-header
*/
export class CmsSidemenuHeader extends PolymerElement {
  debug!: boolean;

  static get is(): string {
    return 'exmg-paper-sidemenu-header';
  }
  static get properties() {
    return {
      /*
      * Disables actual href links
      */
      debug: {
        type: Boolean,
        value: false,
      },
      /*
      * For selection you can use the path value
      */
      selected: {
        notify: true,
        observer: '_observeSelected',
        type: String,
      },
      /*
      * Label for link to home/dashboard. Default is 'Dashboard'
      */
      homeLabel: {
        type: String,
        value: 'Dashboard',
      },
      /*
      * Url to home/landings page
      */
      homeUrl: {
        type: String,
        value: '/',
      },
      /*
      * Label for link to settings page. Default is 'Settings'
      */
      settingsLabel: {
        type: String,
        value: 'Settings',
      },
      /*
      * Url to settings section
      */
      settingsUrl: {
        type: String,
        value: 'settings/',
      },

      /*
      * Property that determines the element display style collapsed of expanded
      */
      collapsed: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }
  static get template(): HTMLTemplateElement {
    return html`
    <style>
      :host {
        display: block;
      }

      paper-listbox {
        padding: 0;
      }

      paper-item {
        height: 56px;
        box-sizing: border-box;
        line-height: 56px;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
        color: var(--exmg-paper-sidemenu-group-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        cursor: pointer;
        @apply --exmg-paper-sidemenu-header-item;
      }

      paper-item:last-child {
        padding: 0 8px;
      }

      paper-item svg {
        padding-right: 12px;
        width: 24px;
        max-width: 24px;
        height: 20px;
        fill: var(--exmg-paper-sidemenu-group-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
      }

      exmg-paper-tooltip {
        display: none;
        white-space: nowrap;
      }

      .menu-header {
        @apply --layout;
        @apply --layout-center;
        box-sizing: border-box;
        background: var(--exmg-paper-sidemenu-menu-header-background-color, #F9FAF9);
        min-height: 56px;
        border-bottom: 1px solid var(--exmg-paper-sidemenu-menu-border-color, #ddd);
        @apply --exmg-paper-sidemenu-header-menu;
      }

      .menu-header paper-listbox {
        @apply --layout;
        width: 100%;
        border: none;
        background: none;
      }

      .menu-header .menu-item:first-child {
        border-right: 1px solid var(--exmg-paper-sidemenu-menu-border-color, #ddd);
        @apply --layout-flex;
        @apply --exmg-paper-sidemenu-header-dashboard;
      }

      .menu-header .menu-item:nth-child(2) svg {
        padding-right: 0;
      }

      :host([collapsed]) .menu-header {
        padding: 10px 0 8px;
        @apply --layout-vertical;
      }

      :host([collapsed]) exmg-paper-tooltip {
        display: block;
      }

      :host([collapsed]) .menu-header .menu-item:nth-child(1) svg {
        padding-right: 0;
      }

      :host([collapsed]) .menu-header paper-listbox {
        @apply --layout-vertical;
        border-right: none;
        border-bottom: none;
        padding: 5px 0;
      }

      :host([collapsed]) paper-item {
        min-height: 36px;
        line-height: 36px;
        height: initial;
        border-right: none;
      }

      :host([collapsed]) paper-item .title {
        opacity: 0;
        width: 0;
        pointer-events: none;
      }

      a:hover paper-item {
        background: var(--exmg-paper-sidemenu-hover-background-color, var(--paper-grey-200));
      }

      a[aria-selected="true"] paper-item svg {
        fill: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
      }

      a[aria-selected="true"] paper-item {
        color: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
      }

      .menu-item {
        display: block;
        text-decoration: none;
        outline: none;
      }
    </style>

    <paper-listbox class="menu-header" slot="header" attr-for-selected="data-path" selected="{{selected}}" selectable="a">
      <a href="[[_getHref(homeUrl)]]" data-path="[[homeUrl]]" tabindex="-1" class="menu-item">
        <paper-item role="menuitem">
          ${dashboardIcon}
          <span class="title">[[homeLabel]]</span>
        </paper-item>
        <exmg-paper-tooltip position="right">[[homeLabel]]- [[collapsed]]</exmg-paper-tooltip>
      </a>
      <a href="[[_getHref(settingsUrl)]]" data-path="[[settingsUrl]]" tabindex="-1" class="menu-item">
        <paper-item role="menuitem" aria-label$="[[settingsLabel]]">
          ${settingsIcon}
        </paper-item>
        <exmg-paper-tooltip position="right">[[settingsLabel]]</exmg-paper-tooltip>
      </a>
    </paper-listbox>
  `;
  }
  /*
  * Disable links in debug mode
  */
  _getHref(path: string): string {
    return this.debug ? '#' : path;
  }

  _observeSelected(selected: string) {
    this.dispatchEvent(new CustomEvent('selected-change', {bubbles: false, composed: true, detail: selected}));
  }
}

window.customElements.define(CmsSidemenuHeader.is, CmsSidemenuHeader);
