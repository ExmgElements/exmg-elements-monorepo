import {css} from 'lit';

export const style = css`
  :host {
    display: block;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, sans-serif;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    --toolbar-bg-color: var(--exmg-theme-table-toolbar-background-color, #ffffff);
    --toolbar-color: var(--exmg-theme-table-toolbar-color, #02182b);
    background-color: var(--toolbar-bg-color);
    color: var(--toolbar-color);
    border-radius: var(--exmg-theme-table-toolbar-border-top-radius, 0) var(--exmg-theme-table-toolbar-border-top-radius, 0)
      var(--exmg-theme-table-toolbar-border-bottom-radius, 0) var(--exmg-theme-table-toolbar-border-bottom-radius, 0);
  }
  .wrapper {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    overflow-x: var(--exmg-theme-table-toolbar-overflow-x, initial);
    white-space: nowrap;
  }
  .wrapper.active {
    --active-toolbar-bg-color: var(--exmg-theme-table-toolbar-active-bg-color);
    --active-toolbar-color: var(--exmg-theme-table-toolbar-active-color, #000000);
    background-color: var(--active-toolbar-bg-color);
    color: var(--active-toolbar-color);
  }
  .wrapper.active .seperator.with-action-separator {
    border-left: 1px solid var(--active-toolbar-color);
  }
  .wrapper.active .description {
    color: var(--active-toolbar-color);
    flex: 1;
  }
  .wrapper .seperator {
    min-height: 32px;
  }
  .wrapper .seperator.with-action-separator {
    border-left: 1px solid var(--active-toolbar-color);
  }
  .wrapper .description {
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
    color: var(--toolbar-color);
    padding: 0 16px;
    height: 48px;
    flex: 1;
  }
  .actions {
    padding: 0 16px;
    color: var(--mdc-theme-primary);
  }
  .filters {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 16px;
  }
  .settings {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .settings.has-settings {
    padding-right: 16px;
  }
  @media (max-width: 500px) {
    .wrapper .description {
      display: none;
    }
  }
`;
export default style;
