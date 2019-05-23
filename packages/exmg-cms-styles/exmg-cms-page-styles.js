import { css } from 'lit-element';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/shadow.js';
import { sharedButtonStyles } from './exmg-cms-button-styles';
export const sharedPageStyles = css `
  ${sharedButtonStyles}
  :host {
    @apply --paper-font-common-base;
    font-size: 14px;
  }
  .between-cards-margin {
    margin-top: 24px;
  }
  .card {
    height: 204px;
    background: var(--secondary-background-color);
    @apply --shadow-elevation-2dp;
    cursor: pointer;
    padding: 16px 20px 20px 20px;
    box-sizing: border-box;
    @apply --layout-horizontal;
    @apply --layout-justified;
  }
  .card.add {
    background: none;
    @apply --shadow-none;
    border: 1px solid var(--divider-color);
    color: var(--primary-color);
    @apply --layout-center-justified;
    @apply --layout-horizontal;
    @apply --layout-center;
  }
  .card .title {
    color: rgba(0, 0, 0, var(--dark-primary-opacity));
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    word-wrap: break-word;
  }
  .card:hover {
    background: var(--paper-grey-200);
  }
  .card.add:hover {
    background: var(--primary-color);
    color: white;
  }
  .card.add > div {
    @apply --layout-vertical;
    @apply --layout-center;
  }
  .card.add .plus {
    font-size: 40px;
    font-weight: 500;
  }
  .card.add .plus-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
  .page-container {
    @apply --layout-vertical;
  }
  .page-content {
    padding-top: 40px;
    padding-bottom: 48px;
  }
  h2 {
    color: rgba(0, 0, 0, var(--dark-secondary-opacity));
    display: block;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: -8px;
    position: relative;
  }
  .flex {
    @apply --layout-flex;
  }
  exmg-paper-info-card .actions paper-button {
    color: var(--secondary-color);
  }
  exmg-paper-search-header paper-button {
    color: var(--text-primary-color);
    background-color: var(--primary-color);
    margin: 12px 12px;
    height: 32px;
  }
  exmg-paper-toolbar paper-button {
    color: var(--text-primary-color);
    background-color: var(--primary-color);
    margin: 12px 0px;
    height: 32px;
  }
  exmg-paper-card .header paper-button {
    color: var(--text-primary-color);
    background-color: var(--primary-color);
    padding: 8px 20px;
  }
  .tabs-container {
    background: var(--light-primary-color);
  }
  .tabs-container > paper-tabs {
    --paper-tabs-selection-bar-color: var(--secondary-color);
  }
  .tabs-container > paper-tabs {
    background: var(--light-primary-color);
    height: 40px;
    text-transform: uppercase;
    color: white;
  }
  paper-tab {
    padding: 0px 26px;
  }
  .main header .title{
    color: var(--text-primary-color);
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  a {
    color: var(--secondary-text-color);
    text-decoration: underline;
  }
  a.open-new::after {
    font-family: 'Material Icons Extended';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    text-decoration: none;
    content: "open_in_new";
    margin-left: 4px;
    vertical-align: middle;
  }
  @media (max-width: 400px) {
    .page-content [row] > * {
      margin-bottom: 24px;
    }
  }
  .page-header-bar h2 {
    color: rgba(0,0,0,0.87);
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .page-header-bar {
    background: var(--secondary-background-color);
    -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.12);
    box-shadow: 0 1px 0 rgba(0,0,0,0.12);
  }
  .page-header-bar .body {
    color: rgba(0,0,0,0.54);
    font-size: 16px;
    line-height: 24px;
  }
  .page-header-bar .body p {
    margin: 0;
  }
  exmg-paper-card {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  [hidden]{
    display: none;
  }
  .tabs,
  app-toolbar.page{
    background: var(--app-primary-color);
    color:white;
    height: 50px;
  }
  paper-tabs {
    height: 100%;
    width: 100%;
    background: var(--app-primary-color);
    color: white;
  }
  app-toolbar.page {
    padding: 0 8px 0 26px;
  }
  app-toolbar.page a{
    color: white;   
  }
`;
