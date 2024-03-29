import {css} from 'lit';

export const style = css`
  .mdc-typography {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
  }
  .mdc-typography--headline1 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 6rem;
    font-size: var(--mdc-typography-headline1-font-size, 6rem);
    line-height: 6rem;
    line-height: var(--mdc-typography-headline1-line-height, 6rem);
    font-weight: 300;
    font-weight: var(--mdc-typography-headline1-font-weight, 300);
    letter-spacing: -0.015625em;
    letter-spacing: var(--mdc-typography-headline1-letter-spacing, -0.015625em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline1-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline1-text-transform, inherit);
  }
  .mdc-typography--headline2 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 3.75rem;
    font-size: var(--mdc-typography-headline2-font-size, 3.75rem);
    line-height: 3.75rem;
    line-height: var(--mdc-typography-headline2-line-height, 3.75rem);
    font-weight: 300;
    font-weight: var(--mdc-typography-headline2-font-weight, 300);
    letter-spacing: -0.0083333333em;
    letter-spacing: var(--mdc-typography-headline2-letter-spacing, -0.0083333333em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline2-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline2-text-transform, inherit);
  }
  .mdc-typography--headline3 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline3-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 3rem;
    font-size: var(--mdc-typography-headline3-font-size, 3rem);
    line-height: 3.125rem;
    line-height: var(--mdc-typography-headline3-line-height, 3.125rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-headline3-font-weight, 400);
    letter-spacing: normal;
    letter-spacing: var(--mdc-typography-headline3-letter-spacing, normal);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline3-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline3-text-transform, inherit);
  }
  .mdc-typography--headline4 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline4-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 2.125rem;
    font-size: var(--mdc-typography-headline4-font-size, 2.125rem);
    line-height: 2.5rem;
    line-height: var(--mdc-typography-headline4-line-height, 2.5rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-headline4-font-weight, 400);
    letter-spacing: 0.0073529412em;
    letter-spacing: var(--mdc-typography-headline4-letter-spacing, 0.0073529412em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline4-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline4-text-transform, inherit);
  }
  .mdc-typography--headline5 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline5-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 1.5rem;
    font-size: var(--mdc-typography-headline5-font-size, 1.5rem);
    line-height: 2rem;
    line-height: var(--mdc-typography-headline5-line-height, 2rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-headline5-font-weight, 400);
    letter-spacing: normal;
    letter-spacing: var(--mdc-typography-headline5-letter-spacing, normal);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline5-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline5-text-transform, inherit);
  }
  .mdc-typography--headline6 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 1.25rem;
    font-size: var(--mdc-typography-headline6-font-size, 1.25rem);
    line-height: 2rem;
    line-height: var(--mdc-typography-headline6-line-height, 2rem);
    font-weight: 500;
    font-weight: var(--mdc-typography-headline6-font-weight, 500);
    letter-spacing: 0.0125em;
    letter-spacing: var(--mdc-typography-headline6-letter-spacing, 0.0125em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-headline6-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-headline6-text-transform, inherit);
  }
  .mdc-typography--subtitle1 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 1rem;
    font-size: var(--mdc-typography-subtitle1-font-size, 1rem);
    line-height: 1.75rem;
    line-height: var(--mdc-typography-subtitle1-line-height, 1.75rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-subtitle1-font-weight, 400);
    letter-spacing: 0.009375em;
    letter-spacing: var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-subtitle1-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-subtitle1-text-transform, inherit);
  }
  .mdc-typography--subtitle2 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.875rem;
    font-size: var(--mdc-typography-subtitle2-font-size, 0.875rem);
    line-height: 1.375rem;
    line-height: var(--mdc-typography-subtitle2-line-height, 1.375rem);
    font-weight: 500;
    font-weight: var(--mdc-typography-subtitle2-font-weight, 500);
    letter-spacing: 0.0071428571em;
    letter-spacing: var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-subtitle2-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-subtitle2-text-transform, inherit);
  }
  .mdc-typography--body1 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 1rem;
    font-size: var(--mdc-typography-body1-font-size, 1rem);
    line-height: 1.5rem;
    line-height: var(--mdc-typography-body1-line-height, 1.5rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-body1-font-weight, 400);
    letter-spacing: 0.03125em;
    letter-spacing: var(--mdc-typography-body1-letter-spacing, 0.03125em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-body1-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-body1-text-transform, inherit);
  }
  .mdc-typography--body2 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.875rem;
    font-size: var(--mdc-typography-body2-font-size, 0.875rem);
    line-height: 1.25rem;
    line-height: var(--mdc-typography-body2-line-height, 1.25rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-body2-font-weight, 400);
    letter-spacing: 0.0178571429em;
    letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-body2-text-transform, inherit);
  }
  .mdc-typography--caption {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.75rem;
    font-size: var(--mdc-typography-caption-font-size, 0.75rem);
    line-height: 1.25rem;
    line-height: var(--mdc-typography-caption-line-height, 1.25rem);
    font-weight: 400;
    font-weight: var(--mdc-typography-caption-font-weight, 400);
    letter-spacing: 0.0333333333em;
    letter-spacing: var(--mdc-typography-caption-letter-spacing, 0.0333333333em);
    text-decoration: inherit;
    text-decoration: var(--mdc-typography-caption-text-decoration, inherit);
    text-transform: inherit;
    text-transform: var(--mdc-typography-caption-text-transform, inherit);
  }
  .mdc-typography--button {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.875rem;
    font-size: var(--mdc-typography-button-font-size, 0.875rem);
    line-height: 2.25rem;
    line-height: var(--mdc-typography-button-line-height, 2.25rem);
    font-weight: 500;
    font-weight: var(--mdc-typography-button-font-weight, 500);
    letter-spacing: 0.0892857143em;
    letter-spacing: var(--mdc-typography-button-letter-spacing, 0.0892857143em);
    text-decoration: none;
    text-decoration: var(--mdc-typography-button-text-decoration, none);
    text-transform: uppercase;
    text-transform: var(--mdc-typography-button-text-transform, uppercase);
  }
  .mdc-typography--overline {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-overline-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
    font-size: 0.75rem;
    font-size: var(--mdc-typography-overline-font-size, 0.75rem);
    line-height: 2rem;
    line-height: var(--mdc-typography-overline-line-height, 2rem);
    font-weight: 500;
    font-weight: var(--mdc-typography-overline-font-weight, 500);
    letter-spacing: 0.1666666667em;
    letter-spacing: var(--mdc-typography-overline-letter-spacing, 0.1666666667em);
    text-decoration: none;
    text-decoration: var(--mdc-typography-overline-text-decoration, none);
    text-transform: uppercase;
    text-transform: var(--mdc-typography-overline-text-transform, uppercase);
  }
  :host {
    --default-paper-sidemenu-width: var(--paper-sidemenu-width, 256px);
    --default-paper-sidemenu-collapsed-width: var(--paper-sidemenu-collapsed-width, 64px);
    --default-paper-sidemenu-text-color: var(--paper-sidemenu-text-color, --mdc-theme-on-primary);
    --default-paper-sidemenu-background: var(--paper-sidemenu-background-color, --mdc-theme-primary);
  }
  exmg-paper-sidemenu[collapsed] {
    width: var(--default-paper-sidemenu-collapsed-width);
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
  }
  hr {
    border: none;
    background: var(--exmg-paper-sidemenu-menu-border-color, #ddd);
    margin: 8px 0 0;
    height: 1px;
  }
  exmg-paper-sidemenu[collapsed] hr {
    height: 1px;
  }
  .menu-item {
    display: block;
    text-decoration: none;
    outline: none;
    margin: 4px 6px;
    border-radius: 4px;
    height: 40px;
    overflow: hidden;
  }
  .menu-item.solo {
    margin-top: 10px;
  }
  paper-listbox {
    padding: 0;
  }
  exmg-paper-sidemenu paper-item {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 2.4rem auto auto;
    height: 100%;
    min-height: auto;
    box-sizing: border-box;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--exmg-paper-sidemenu-item-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
    cursor: pointer;
  }
  exmg-paper-sidemenu[collapsed] paper-item {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: auto;
    box-sizing: border-box;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--exmg-paper-sidemenu-item-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
    cursor: pointer;
  }
  a svg {
    fill: var(--exmg-paper-sidemenu-icon-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
    display: block;
  }
  paper-item .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 1;
    transition: all 0.4s ease;
    grid-column-start: 2;
  }
  exmg-paper-sidemenu[collapsed] paper-item .title {
    display: none;
  }
  paper-item svg {
    padding-right: 18px;
    width: 24px;
    max-width: 24px;
    height: 20px;
    margin: 0 auto;
    grid-column-start: 1;
  }
  paper-item exmg-paper-sidemenu-badge {
    grid-column-start: 3;
    justify-self: end;
  }
  exmg-paper-tooltip {
    display: none;
    white-space: nowrap;
  }
  exmg-paper-sidemenu[collapsed] paper-item svg {
    padding: 0;
  }
  exmg-paper-sidemenu[collapsed] .menu-group {
    padding: 12px 0;
  }
  exmg-paper-sidemenu[collapsed] .menu-group-title {
    height: 0;
    padding: 0;
    margin-bottom: 10px;
  }
  exmg-paper-sidemenu[collapsed] exmg-paper-tooltip {
    display: block;
  }
  exmg-paper-sidemenu[collapsed] .menu-footer svg {
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
  }
  .icon-badge {
    display: none;
    position: absolute;
    left: calc(50% + 4px);
    top: 0px;
  }
  exmg-paper-sidemenu[collapsed] .icon-badge {
    display: block;
  }
  a:hover paper-item {
    background: var(--exmg-paper-sidemenu-hover-background-color, var(--paper-grey-200));
  }
  a:active paper-item {
    background: var(--exmg-paper-sidemenu-active-background-color, var(--paper-grey-400));
  }
  a[aria-selected='true'] svg {
    fill: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
  }
  a[aria-selected='true'] paper-item {
    color: var(--exmg-paper-sidemenu-selected-text-color, var(--mdc-theme-on-primary));
    background-color: var(--exmg-paper-sidemenu-selected-background-color, var(--primary-color));
  }
  *[hidden] {
    display: none;
  }
  .main-content {
    margin-left: var(--default-paper-sidemenu-width);
  }
  .main-content.narrow {
    margin-left: 0;
  }
  app-drawer {
    z-index: 10;
    --app-drawer-width: 256px;
  }
  app-drawer.collapsed {
    --app-drawer-width: var(--default-paper-sidemenu-collapsed-width);
  }
  .main-content.collapsed {
    margin-left: var(--default-paper-sidemenu-collapsed-width);
  }
  div[slot='footer'] {
    margin: 4px 0px;
    width: 100%;
    height: 100%;
    border-right: 1px solid var(--exmg-paper-sidemenu-menu-border-color, #ddd);
  }
  div[slot='footer'] svg {
    fill: #fff;
  }
  exmg-paper-sidemenu[collapsed] div[slot='footer'] .title {
    display: none;
  }
`;
export default style;
