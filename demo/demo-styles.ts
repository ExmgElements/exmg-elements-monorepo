import {css} from 'lit-element';

// language=CSS
export const demoStyles = css`
  .demo-button {
    background-color: #4CAF50; /* Green */
    border: 1px solid white;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  .demo-button:focus {
    outline: none;
    background-color: #0070db;
  }
`;
