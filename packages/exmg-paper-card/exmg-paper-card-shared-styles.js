import {html} from '@polymer/polymer/polymer-element.js';
import {sharedButtonStyles} from '@exmg/exmg-cms-styles/exmg-cms-button-styles.js';

export const sharedCardStyles = html`
  ${sharedButtonStyles}
  <style>
    :host {
      @apply --paper-font-common-base;
      font-size: 14px;
      background-color: white;
      display: block;
      position: relative;
      color: rgba(0, 0, 0, var(--dark-secondary-opacity));
      @apply --shadow-elevation-2dp;
      @apply --layout-vertical;
    }
    :host > ::slotted(.header),
    :host > ::slotted(exmg-paper-search-header) {
      background-color: var(--paper-grey-50);
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) inset;
      color: rgba(0, 0, 0, var(--light-secondary-opacity));
      z-index: 5;
      -webkit-align-items: center;
      align-items: center;
      min-height: 56px;
      position: relative;
      border-radius: 2px 2px 0 0;
    }
    ::slotted(.actions) {
      padding: 20px;
      @apply --layout-horizontal;
      @apply --layout-center;
    }
    :host([minor]) {
      max-width: 456px;
      margin: 0 auto;
    }
    :host([minor]) ::slotted(.actions) {
      @apply --layout-center-justified;
    }
    :host > ::slotted(.header) {
      padding: 0 6px;
      display: flex;
      flex-flow: row wrap;
    }
    :host > ::slotted(.body) {
      padding: 24px;
    }
    .title {
      color: rgba(0, 0, 0, var(--dark-primary-opacity));
      @apply --paper-font-title;
    }
    .tagline {
      color: rgba(0, 0, 0, var(--dark-primary-opacity));
      @apply --paper-font-subhead;
      text-align: center;
    }
    ::slotted(.body) {
      color: rgba(0, 0, 0, var(--dark-secondary-opacity));
      @apply --paper-font-body1;
    }
    ::slotted(.minor) {
      color: rgba(0, 0, 0, var(--dark-secondary-opacity));
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.011em;
      line-height: 20px;
      text-align: center;
    }
    ::slotted(.links) {
      border: 1px solid red;
    }
  </style>
`;
