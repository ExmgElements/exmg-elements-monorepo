import {css} from 'lit-element';

// language=CSS
const styles = css`
  :host {
    --breadcrumbs-text-color: #ffffff;
    --breadcrumbs-background-color: #0071dc;
    --breadcrumbs-container-height: 56px;
    --breadcrumbs-container-width: 100%;
    --breadcrumbs-container-padding-left: 10px;
    --breadcrumbs-item-separator-padding: 0;
    --breadcrumbs-item-separator-size: 24px;
    --breadcrumbs-item-link-height: 24px;
    --breadcrumbs-item-link-inactive-opacity: 0.5;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: 0.2px;
    color: var(--breadcrumbs-text-color);
    background-color: var(--breadcrumbs-background-color);
    height: var(--breadcrumbs-container-height);
    width: var(--breadcrumbs-container-width);
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
    padding-left: var(--breadcrumbs-container-padding-left);
    height: inherit;
    width: inherit;
    background-color: inherit;
  }
  .container, .container a {
    color: inherit;
  }
  .breadcrumb-item {
    display: inline;
  }
  .breadcrumb-item > a {
    text-decoration: none;
    height: var(--breadcrumbs-item-link-height);
  }
  .breadcrumb-item > .separator {
    height: var(--breadcrumbs-item-separator-size);
    width: var(--breadcrumbs-item-separator-size);
    min-height: var(--breadcrumbs-item-separator-size);
    min-width: var(--breadcrumbs-item-separator-size);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 var(--breadcrumbs-item-separator-padding);
  }
  a[disabled] {
    cursor: not-allowed;
  }
  a[inactive] {
    opacity: var(--breadcrumbs-item-link-inactive-opacity);
  }
  @media (max-width: 460px) {
    .breadcrumb-item {
      display: none;
    }
    .breadcrumb-item:first-child, .breadcrumb-item:last-child {
      display: initial;
    }
  }
`;

export default styles;
