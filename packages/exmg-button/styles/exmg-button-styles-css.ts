import {css} from 'lit';

export const style = css`
  :host[dense] {
    bottom: 1px;
  }
  :host .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid var(--exmg-form-drawer-header-separator-color, var(--mdc-theme-on-surface, rgba(2, 24, 43, 0.1)));
  }
  :host .header .header-buttons {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: flex-end;
  }
  :host .header .header-buttons exmg-form-drawer-button {
    margin-left: 20px;
  }
  :host .exmg-loading {
    visibility: hidden;
  }
  :host .exmg-button-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  :host button {
    display: relative;
  }
  :host exmg-button-spinner {
    margin: 3px 0;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    --exmg-spinner-size: 20px;
  }
  :host .progress-holder {
    overflow: hidden;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: absolute;
    pointer-events: none;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 4px;
  }
  :host .progress-holder progress {
    -webkit-appearance: none;
    appearance: none;
    height: 100%;
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    direction: var(--exmg-button-progress-direction, ltr);
  }
  :host .progress-holder progress::-moz-progress-bar {
    background: var(--exmg-button-progress-color, #89c8ff);
  }
  :host .progress-holder progress::-webkit-progress-value {
    background-color: var(--exmg-button-progress-color, #89c8ff);
  }
  :host .progress-holder progress::-webkit-progress-bar {
    background-color: transparent;
  }
  :host([dense]) exmg-button-spinner {
    bottom: 1px;
  }
`;
export default style;
