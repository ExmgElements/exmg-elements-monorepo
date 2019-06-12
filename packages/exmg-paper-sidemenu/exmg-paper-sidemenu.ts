/* eslint-disable*/
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-tooltip/exmg-paper-tooltip.js';

export const chevronLeftIcon = html`
  <svg height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
`;
export const settingsIcon = html`
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path
      d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
    ></path>
  </svg>
`;

interface Item {
  items?: Item[];
  badgeCount: number;
}

/**
 * The `exmg-paper-sidemenu` displays a vertical sidemenu that can be collapsed.
 *
 *  ### Menu data model
 *  Menu items need to have the following structure:
 *  ```js
 *  {
 *    "path": "user/", // Path for href and selection
 *    "iconPath": "", // Svg path
 *    "title": "Users" // Copy to display
 *  }
 *  ```
 *
 *  Grouping menu items will be done in the following structure:
 *  ```js
 *  {
 *    "title": "Users",
 *    "items": [
 *      {
 *        "path": "user/",
 *        "iconPath": "...",
 *        "title": "Users"
 *      },
 *      {
 *        "path": "redeem/",
 *        "iconPath": "...",
 *        "title": "Redeem Requests"
 *      },
 *      {
 *        "path": "reporteduser/",
 *        "iconPath": "...",
 *        "title": "Reported Users"
 *      }
 *    ]
 *  }
 *  ```
 *
 *  ### Styling
 *
 * `<exmg-paper-sidemenu>` provides the following custom properties and mixins
 *  for styling:
 *
 *  Custom property | Description | Default
 *  ----------------|-------------|----------
 *  `--exmg-paper-sidemenu` | Sidemenu mixin |`{}`
 *  `--exmg-paper-sidemenu-background` | Sidemenu background color | `white`
 *  `--exmg-paper-sidemenu-group-text-color` | Group titletext color | `54% black`
 *  `--exmg-paper-sidemenu-group-title` | Group title mixin | `{}`
 *  `--exmg-paper-sidemenu-item-text-color` | Item text color | `54% black`
 *  `--exmg-paper-sidemenu-item` | Menu item mixin | `{}`
 *  `--exmg-paper-sidemenu-item-title` | Menu item title mixin | `{}`
 *  `--exmg-paper-sidemenu-menu-body` | Menu body mixin | `{}`
 *  `--exmg-paper-sidemenu-menu-footer-background-color` | Footer background color | `#F9FAF9`
 *  `--exmg-paper-sidemenu-menu-border-color` | Border color of menu | '#DDD'
 *  `--exmg-paper-sidemenu-menu-footer` | Menu footer mixin | `{}`
 *  `--exmg-paper-sidemenu-icon-color` | Sidemenu icon color | `54% black`
 *  `--exmg-paper-sidemenu-badge-background-color` | Item badge background color | `--secondary-text-color`
 *  `--exmg-paper-sidemenu-badge-text-color` | Item badge text color | white
 *  `--exmg-paper-sidemenu-badge` | Item badge mixin | `{}`
 *  `--exmg-paper-sidemenu-hover-background-color` | Item hover background color | `--paper-grey-200`
 *  `--exmg-paper-sidemenu-selected-text-color` | Item selected text color | `--primary-color`
 *
 *  @customElement
 *  @polymer
 *  @memberof Exmg
 *  @group Exmg Paper Elements
 *  @element exmg-paper-sidemenu
 *  @demo demo/index.html
 */
export class SidemenuElement extends PolymerElement {
  collapsed!: boolean;
  debug!: boolean;

  static get is(): string {
    return 'exmg-paper-sidemenu';
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
        reflectToAttribute: true,
        observer: '_observeSelected',
        type: String,
      },
      /*
       * For selection you can use the path value
       */
      menu: {
        type: Array,
      },
      /*
       * Property that determines the element display style collapsed of expanded
       */
      collapsed: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
        observer: '_observeCollapsed',
      },
      /*
       * The narrow option can be used to disable collapsing of the menu.
       */
      narrow: {
        type: Boolean,
        value: false,
      },
    };
  }
  static get observers(): string[] {
    return ['_observeNarrow(narrow)'];
  }
  static get template(): HTMLTemplateElement {
    return html`
      <style>
        :host {
          height: 100%;
          background-color: var(--exmg-paper-sidemenu-background, white);
          box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          @apply --layout-flex;
          @apply --layout-vertical;
          @apply --exmg-paper-sidemenu;
        }

        .menu-group-title {
          display: block;
          box-sizing: border-box;
          padding: 8px 20px 10px;
          overflow: hidden;
          cursor: default;
          font-size: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          color: var(--exmg-paper-sidemenu-group-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
          @apply --exmg-paper-sidemenu-group-title;
        }

        hr {
          border: none;
          background: var(--exmg-paper-sidemenu-menu-border-color, #ddd);
          margin: 8px 0 0;
          height: 0;
          @apply --exmg-paper-sidemenu-group-hr;
        }

        :host([collapsed]) hr {
          height: 1px;
        }

        .menu-item {
          display: block;
          text-decoration: none;
          outline: none;
        }

        .menu-item.solo {
          padding-top: 10px;
        }

        paper-listbox {
          padding: 0;
          background: var(--exmg-paper-sidemenu-background);
        }

        paper-item {
          height: 32px;
          min-height: auto;
          box-sizing: border-box;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 500;
          color: var(--exmg-paper-sidemenu-item-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
          cursor: pointer;
          @apply --exmg-paper-sidemenu-item;
        }

        a svg {
          fill: var(--exmg-paper-sidemenu-icon-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        }

        paper-item .title {
          @apply --layout-flex;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          opacity: 1;
          transition: all 0.4s ease;
          @apply --exmg-paper-sidemenu-item-title;
        }

        :host([collapsed]) paper-item .title {
          opacity: 0;
          max-width: 0px;
        }

        paper-item svg {
          padding-right: 12px;
          width: 24px;
          max-width: 24px;
          height: 20px;
          margin: 0 auto;
        }

        exmg-paper-tooltip {
          display: none;
          white-space: nowrap;
        }

        .menu-body {
          @apply --layout-flex;
          overflow: auto;
          @apply --exmg-paper-sidemenu-menu-body;
        }

        .menu-footer {
          border-top: 1px solid var(--exmg-paper-sidemenu-menu-border-color, #ddd);
          background: var(--exmg-paper-sidemenu-menu-footer-background-color, #f9faf9);
          min-height: 48px;
          @apply --layout;
          @apply --layout-end-justified;
          @apply --layout-center;
          @apply --exmg-paper-sidemenu-menu-footer;
        }

        .menu-footer button {
          cursor: pointer;
          background: none;
          border: none;
        }
        .menu-footer svg {
          transition: transform 0.3s ease;
          transform: rotate(0deg);
          @apply --layout-end-justified;
        }

        .menu-footer svg {
          margin: 0 4px;
          fill: var(--exmg-paper-sidemenu-icon-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        }

        :host([narrow]) .menu-footer {
          display: none !important;
        }

        :host([collapsed]) .menu-footer {
          @apply --layout;
          @apply --layout-center-justified;
          @apply --layout-center;
        }

        :host([collapsed]) paper-item svg {
          padding: 0;
        }
        :host([collapsed]) .menu-group {
          padding: 12px 0;
        }
        :host([collapsed]) .menu-group-title {
          height: 0;
          padding: 0;
          margin-bottom: 10px;
        }

        :host([collapsed]) paper-item {
          height: 36px;
        }

        :host([collapsed]) exmg-paper-tooltip {
          display: block;
        }

        :host([collapsed]) .menu-footer svg {
          transform: rotate(180deg);
        }

        .title-badge,
        .icon-badge {
          display: inline-block;
          font-size: 11px;
          border-radius: 12px;
          background-color: var(--exmg-paper-sidemenu-badge-background-color, var(--secondary-text-color));
          color: var(--exmg-paper-sidemenu-badge-text-color, white);
          line-height: 1;
          padding: 2px 4px;
          min-width: 16px;
          text-align: center;
          @apply --exmg-paper-sidemenu-badge;
        }

        .icon-badge {
          display: none;
          position: absolute;
          left: calc(50% + 4px);
          top: 0px;
        }

        :host([collapsed]) .icon-badge {
          display: block;
        }

        a:hover paper-item {
          background: var(--exmg-paper-sidemenu-hover-background-color, var(--paper-grey-200));
        }

        a[aria-selected='true'] svg {
          fill: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
        }
        a[aria-selected='true'] paper-item {
          color: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
        }
      </style>

      <!-- Sidemenu Header -->
      <slot name="header"></slot>

      <!-- Sidemenu body -->
      <div class="menu-body" role="navigation">
        <!-- Menu Items -->
        <paper-listbox attr-for-selected="data-path" selected="{{selected}}" selectable="a">
          <template is="dom-repeat" items="[[menu]]" as="item">
            <template is="dom-if" if="[[!_hasItems(item)]]">
              <a href="[[_getHref(item.path)]]" data-path$="[[item.path]]" tabindex="-1" class="menu-item solo">
                <paper-item data-path$="[[item.path]]" role="menuitem">
                  <svg height="24" viewBox="0 0 24 24" width="24"><path d$="[[item.iconPath]]"></path></svg>
                  <span class="title">[[item.title]]</span>
                </paper-item>
                <exmg-paper-tooltip position="right">[[item.title]]</exmg-paper-tooltip>
              </a>
            </template>
            <template is="dom-if" if="[[_hasItems(item)]]">
              <div class="menu-group-title">[[item.title]]</div>
              <template is="dom-repeat" items="[[item.items]]" as="subitem">
                <a href="[[_getHref(subitem.path)]]" data-path$="[[subitem.path]]" tabindex="-1" class="menu-item">
                  <paper-item data-path$="[[subitem.path]]" class$="[[_hasClassBadge(subitem)]]" role="menuitem">
                    <svg height="24" viewBox="0 0 24 24" width="24"><path d$="[[subitem.iconPath]]"></path></svg>
                    <template is="dom-if" if="[[subitem.badgeCount]]">
                      <span class="icon-badge">[[_computeBadgeCount(subitem)]]</span>
                    </template>
                    <span class="title"
                      >[[subitem.title]]
                      <template is="dom-if" if="[[subitem.badgeCount]]"
                        ><span class="title-badge">[[subitem.badgeCount]]</span></template
                      >
                    </span>
                  </paper-item>
                  <exmg-paper-tooltip position="right">[[subitem.title]]</exmg-paper-tooltip>
                </a>
              </template>
            </template>
            <hr />
          </template>
        </paper-listbox>
      </div>

      <!-- Sidemenu Footer -->
      <div class="menu-footer">
        <button on-click="_handleCollapse">${chevronLeftIcon}</button>
      </div>
    `;
  }
  _observeSelected(selected: string) {
    this.dispatchEvent(new CustomEvent('selected-change', {bubbles: false, composed: true, detail: selected}));
  }
  _observeCollapsed(collapsed: boolean): void {
    this.dispatchEvent(new CustomEvent('collapsed', {bubbles: false, composed: true, detail: collapsed}));
  }
  _observeNarrow(narrow: boolean): void {
    if (narrow && this.collapsed) {
      this.set('collapsed', false);
    }
  }
  _getHref(path: string): string {
    return this.debug ? '#' : path;
  }
  _hasItems(item: Item) {
    return item.items;
  }
  _hasClassBadge(item: Item): string {
    return item.badgeCount ? 'badge' : '';
  }
  _computeBadgeCount(item: Item): number | '...' {
    return item.badgeCount > 99 ? '...' : item.badgeCount;
  }
  _handleCollapse(): void {
    this.set('collapsed', !this.collapsed);
  }
}

window.customElements.define(SidemenuElement.is, SidemenuElement);
