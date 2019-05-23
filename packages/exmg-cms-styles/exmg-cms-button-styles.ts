import {css} from 'lit-element';

export const sharedButtonStyles = css`
  paper-button.primary {
    background: var(--primary-color);
    color: white;
  }
  paper-button {
    text-transform: initial;
    padding-left: 16px;
    padding-right: 16px;
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
`;