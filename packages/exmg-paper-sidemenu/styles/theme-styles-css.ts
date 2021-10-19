import {css} from 'lit';

export const style = css`
  :host {
    --app-drawer-width: 16rem;
    --app-toolbar-height: 3.6rem;
    --app-header-background-color: var(--mdc-theme-primary);
    --app-header-text-color: var(--mdc-theme-on-primary);
    --app-header-selected-color: var(--mdc-theme-on-primary);
    --app-drawer-collapsed-width: 4rem;
    --app-drawer-background-color: #142b42;
    --app-drawer-background-hover-color: #223c57;
    --app-drawer-background-active-color: #314e6c;
    --app-drawer-scrim-background: rgba(0, 0, 0, 0.6);
    --exmg-paper-sidemenu-background: var(--app-drawer-background-color);
    --exmg-paper-sidemenu-group-text-color: rgba(255, 255, 255, 0.7);
    --exmg-paper-sidemenu-group-title: rgba(255, 255, 255, 0.7);
    --exmg-paper-sidemenu-item-text-color: rgba(255, 255, 255, 0.7);
    --exmg-paper-sidemenu-menu-footer-background-color: #223c57;
    --exmg-paper-sidemenu-menu-border-color: #314e6c;
    --exmg-paper-sidemenu-icon-color: rgba(255, 255, 255, 0.9);
    --exmg-paper-sidemenu-badge-background-color: var(--mdc-theme-primary);
    --exmg-paper-sidemenu-badge-text-color: var(--mdc-theme-on-primary);
    --exmg-paper-sidemenu-hover-background-color: var(--app-drawer-background-hover-color);
    --exmg-paper-sidemenu-active-background-color: var(--app-drawer-background-active-color);
    --exmg-paper-sidemenu-selected-text-color: white;
    --exmg-paper-sidemenu-menu-header-background-color: var(--app-drawer-background-color);
  }
`;
export default style;
