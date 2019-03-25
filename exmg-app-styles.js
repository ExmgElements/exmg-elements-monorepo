import {css} from 'lit-element';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/shadow.js';

export const appStyles = css`
  /* Layout Styles */
  :host {
    @apply --paper-font-common-base;
    @apply --layout-vertical;
    --main-header-height: 48px;

    font-size: 14px;
    background-color: var(--primary-background-color);
    height: 100vh;
  }

  app-header:not([narrow]) app-toolbar > paper-icon-button:first-child {
    display: none;
  }

  .main-header {
    background-color: var(--primary-color);
    color: var(--text-primary-color);
    height: var(--main-header-height);
    z-index: 196;
  }

  .main-header a {
    color: var(--text-primary-color);
  }

  .main-header app-toolbar {
    height: var(--main-header-height);
  }

  .main-header img {
    height: 28px;
  }

  .main-header [main-title] {
    @apply --layout-horizontal;
    @apply --layout-center;
  }

  .main-header app-toolbar paper-icon-button {
    width: 48px;
    height: 48px;
  }

  .main-header app-toolbar > paper-icon-button:first-child {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -24px;
  }

  @media all and (max-width: 767px) {
    .main-header app-toolbar {
      text-align: center;
    }
    .main-header img {
      margin: 0 auto;
    }
  }

  .main {
    position: relative;
    height: calc(100vh - var(--main-header-height));
    overflow-y: auto;
  }

  .main > app-toolbar {
    background: var(--light-primary-color);
    color: var(--text-primary-color);
    height: 56px;
  }

  footer {
    font-weight: 200;
    padding: 16px;
    text-align: center;
  }
`;


/*
The `<exmg-cms-global-layout-styles>` element provides a way to style the app global layout and pages in you application. To do this
the html needs to be added this way:

Please see the demo pages for a working example
*/

