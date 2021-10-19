import {css} from 'lit';

export const style = css`
  :host paper-dialog {
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    box-shadow: none;
    overflow: scroll;
    color: var(--exmg-drawer-color, var(--mdc-theme-on-surface, #02182b));
    background-color: var(--exmg-drawer-bg-color, var(--mdc-theme-surface, #ffffff));
  }
`;
export default style;
