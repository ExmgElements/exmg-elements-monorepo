import {css} from 'lit';

export const style = css`
  :host {
    display: block;
    position: absolute;
    outline: none;
    z-index: var(--exmg-tooltip-z-index, 1002);
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
  }
  #tooltip {
    display: block;
    outline: none;
    font-size: var(--exmg-tooltip-font-size, 10px);
    line-height: var(--exmg-tooltip-line-height, 1);
    background-color: var(--exmg-tooltip-background, #616161);
    opacity: var(--exmg-tooltip-opacity, 0.9);
    color: var(--exmg-tooltip-text-color, white);
    padding: var(--exmg-tooltip-padding, 8px);
    border-radius: var(--exmg-tooltip-border-radius, 2px);
    min-width: var(--exmg-tooltip-min-width, initial);
  }
  .hidden {
    display: none !important;
  }
`;
export default style;
