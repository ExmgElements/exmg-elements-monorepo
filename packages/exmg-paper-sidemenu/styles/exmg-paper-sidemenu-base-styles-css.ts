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
    height: 100%;
    width: var(--exmg-paper-sidemenu-sidth);
    background: var(--exmg-paper-sidemenu-background, white);
    box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    color: var(--default-paper-sidemenu-text-color);
    flex: 1;
    flex-basis: 0.000000001px;
    display: flex;
    flex-direction: column;
  }
  :host([collapsed]) hr {
    height: 1px;
  }
  paper-listbox {
    padding: 0;
    background: var(--exmg-paper-sidemenu-background);
  }
  :host([collapsed]) paper-item .title {
    opacity: 0;
    max-width: 0px;
  }
  .menu-body {
    flex: 1;
    flex-basis: 0.000000001px;
    overflow: auto;
  }
  .menu-footer {
    border-top: 1px solid var(--exmg-paper-sidemenu-menu-border-color, #ddd);
    background: var(--exmg-paper-sidemenu-menu-footer-background-color, #f9faf9);
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  :host([collapsed][footer-item]) .menu-footer {
    min-height: 94px;
    flex-direction: column;
  }
  .menu-footer button {
    cursor: pointer;
    background: none;
    border: none;
    height: 100%;
    padding: 0 8px;
    outline: none;
  }
  .menu-footer svg {
    transition: transform 0.3s ease;
    transform: rotate(0deg);
    justify-content: flex-end;
  }
  .menu-footer svg {
    margin: 0 4px;
    fill: var(--exmg-paper-sidemenu-icon-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
  }
  :host([narrow]) .menu-footer {
    display: none !important;
  }
  :host([collapsed]) .menu-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :host([collapsed]) .menu-group {
    padding: 12px 0;
  }
  :host([collapsed]) .menu-group-title {
    height: 0;
    padding: 0;
    margin-bottom: 10px;
  }
  :host([collapsed]) .menu-footer svg {
    transform: rotate(180deg);
  }
`;
export default style;
