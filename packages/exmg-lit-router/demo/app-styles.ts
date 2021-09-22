import {css, CSSResult} from 'lit';
// language=CSS
export const styles: CSSResult = css`
  :host {
    display: block;

    --app-drawer-width: 256px;

    --app-primary-color: #e91e63;
    --app-secondary-color: #293237;
    --app-dark-text-color: var(--app-secondary-color);
    --app-light-text-color: white;
    --app-section-even-color: #f7f7f7;
    --app-section-odd-color: white;

    --app-header-background-color: white;
    --app-header-text-color: var(--app-dark-text-color);
    --app-header-selected-color: var(--app-primary-color);

    --app-drawer-background-color: var(--app-secondary-color);
    --app-drawer-text-color: var(--app-light-text-color);
    --app-drawer-selected-color: #78909c;
  }

  app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: var(--app-header-background-color);
    color: var(--app-header-text-color);
    border-bottom: 1px solid #eee;
  }

  .toolbar-top {
    background-color: var(--app-header-background-color);
  }

  [main-title] {
    font-family: 'Pacifico';
    text-transform: lowercase;
    font-size: 30px;
    /* In the narrow layout, the toolbar is offset by the width of the
      drawer button, and the text looks not centered. Add a padding to
      match that button */
    padding-right: 44px;
  }

  .toolbar-list {
    display: none;
  }

  .toolbar-list > exmg-link a,
  .toolbar-list > a {
    display: inline-block;
    color: var(--app-header-text-color);
    text-decoration: none;
    line-height: 30px;
    padding: 4px 24px;
  }

  .toolbar-list > a[selected],
  .toolbar-list > exmg-link a[selected] {
    color: var(--app-header-selected-color);
    border-bottom: 4px solid var(--app-header-selected-color);
  }

  exmg-link a[disabled] {
    pointer-events: none;
  }

  .menu-btn {
    background: none;
    border: none;
    fill: var(--app-header-text-color);
    cursor: pointer;
    height: 44px;
    width: 44px;
  }

  .drawer-list {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 24px;
    background: var(--app-drawer-background-color);
    position: relative;
  }

  .drawer-list > exmg-link a {
    display: block;
    text-decoration: none;
    color: var(--app-drawer-text-color);
    line-height: 40px;
    padding: 0 24px;
  }

  .drawer-list > exmg-link a[selected] {
    color: var(--app-drawer-selected-color);
  }

  /* Workaround for IE11 displaying <main> as inline */
  main {
    display: block;
  }

  .breadcrumb {
    padding-top: 140px;
  }
  .main-content {
    padding-top: 5px;
    min-height: 100vh;
  }

  footer {
    padding: 24px;
    background: var(--app-drawer-background-color);
    color: var(--app-drawer-text-color);
    text-align: center;
  }

  /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout */
  @media (min-width: 460px) {
    .toolbar-list {
      display: block;
    }

    .menu-btn {
      display: none;
    }

    /* The drawer button isn't shown in the wide layout, so we don't
      need to offset the title */
    [main-title] {
      padding-right: 0;
    }
  }
`;
