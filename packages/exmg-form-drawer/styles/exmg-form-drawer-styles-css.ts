import {css} from 'lit';

export const style = css`
  :host {
    display: flex;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
  }
  :host .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid var(--exmg-form-drawer-header-separator-color, var(--mdc-theme-on-surface, rgba(2, 24, 43, 0.1)));
  }
  :host .header .title {
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
  :host .header .header-buttons {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: flex-end;
  }
  :host .header .header-buttons exmg-button {
    margin-left: 20px;
  }
  :host .form-elements {
    padding: 0 20px;
  }
  :host(:not([disable-sticky-header])) .header {
    position: sticky;
    top: 0;
    background: var(--exmg-drawer-bg-color, var(--mdc-theme-surface, #ffffff));
    z-index: 1;
  }
`;
export default style;
