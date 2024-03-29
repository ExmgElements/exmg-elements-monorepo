import {css} from 'lit';

export const style = css`
  :host {
    --exmg-searchbar-primary-color: #0071dc;
    --exmg-searchbar-error-color: #b00020;
    --exmg-searchbar-text-color: rgba(0, 0, 0, 0.87);
    --exmg-searchbar-hint-color: rgba(0, 0, 0, 0.6);
    --exmg-searchbar-width: 100%;
    --exmg-searchbar-suggestions-spinner-color: #0071dc;
    --exmg-searchbar-suggestions-spinner-width: 3px;
    --exmg-searchbar-suggestions-min-height: 48px;
    --exmg-searchbar-suggestions-text-color: rgba(0, 0, 0, 0.6);
    --exmg-searchbar-suggestions-background-color: #ffffff;
    --exmg-searchbar-suggestions-z-index: 1;
    --exmg-searchbar-suggestions-max-visible-suggestions: 6;
    width: var(--exmg-searchbar-width);
    display: block;
    position: relative;
  }
  mwc-textfield {
    --mdc-theme-primary: var(--exmg-searchbar-primary-color);
    --mdc-theme-error: var(--exmg-searchbar-error-color);
    --mdc-text-field-ink-color: var(--exmg-searchbar-text-color);
    --mdc-text-field-label-ink-color: var(--exmg-searchbar-hint-color);
    width: var(--exmg-searchbar-width);
  }
  .exmg-searchbar-suggestions {
    z-index: var(--exmg-searchbar-suggestions-z-index);
    position: absolute;
    right: 0;
    left: 0;
  }
  .exmg-searchbar-suggestions paper-item.suggestion {
    --paper-item-min-height: var(--exmg-searchbar-suggestions-min-height);
    color: var(--exmg-searchbar-suggestions-text-color);
  }
  .exmg-searchbar-suggestions paper-item.loader {
    display: flex;
    justify-content: center;
    --paper-item-min-height: var(--exmg-searchbar-suggestions-min-height);
    --paper-spinner-color: var(--exmg-searchbar-suggestions-spinner-color);
    --paper-spinner-stroke-width: var(--exmg-searchbar-suggestions-spinner-width);
  }
  .exmg-searchbar-suggestions .suggestions-list {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: calc(var(--exmg-searchbar-suggestions-min-height) * var(--exmg-searchbar-suggestions-max-visible-suggestions));
    background-color: var(--exmg-searchbar-suggestions-background-color);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    -ms-overflow-style: none;
  }
  .exmg-searchbar-suggestions .suggestions-list::-webkit-scrollbar {
    display: none;
  }
`;
export default style;
