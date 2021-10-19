import {css} from 'lit';

export const style = css`
  :host {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
  }
  exmg-button[unelevated] {
    --exmg-spinner-stroke-width: 2px;
    --exmg-spinner-color: '#eee';
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div > * {
    padding: 8px;
  }
  exmg-button[progress] {
    --exmg-button-progress-color: blue;
    --exmg-button-progress-direction: ltr;
  }
`;
export default style;
