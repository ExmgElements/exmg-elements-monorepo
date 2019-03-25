import {html} from '@polymer/polymer/polymer-element.js';

export const sharedButtonStyles = html`
  <style>
    paper-button.primary {
      background: var(--primary-color);
      color: white;
    }
    paper-button {
      border-radius: 6px;
      text-transform: initial;
      padding-left: 16px;
      padding-right: 16px;
      -webkit-border-radius: 8px;
      border-radius: 8px;
      text-transform: none;
      letter-spacing: .25px;
      min-width: 60px;
    }
    paper-button[disabled] {
      opacity: 0.5;
    }
    paper-button.error,
    paper-button.alert {
      color: white;
      background: var(--error-color);
    }
  </style>
`;