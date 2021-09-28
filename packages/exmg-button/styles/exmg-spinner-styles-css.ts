import {css} from 'lit';

export const style = css`
  :host {
    font-size: 0;
    display: inline-block;
    position: relative;
    width: var(--exmg-spinner-size, 28px);
    height: var(--exmg-spinner-size, 28px);
    --paper-spinner-container-rotation-duration: 1568ms;
    --paper-spinner-expand-contract-duration: 1333ms;
    --paper-spinner-full-cycle-duration: 5332ms;
    --paper-spinner-cooldown-duration: 400ms;
  }
  #spinnerContainer {
    width: 100%;
    height: 100%;
    direction: ltr;
  }
  #spinnerContainer.exmg-active {
    -webkit-animation: container-rotate 1568ms linear infinite;
    animation: container-rotate 1568ms linear infinite;
  }
  @-webkit-keyframes container-rotate {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes container-rotate {
    to {
      transform: rotate(360deg);
    }
  }
  .spinner-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    color: var(--exmg-spinner-color, grey);
    white-space: nowrap;
  }
  .exmg-active .spinner-layer {
    -webkit-animation-name: fill-unfill-rotate;
    -webkit-animation-duration: 5332ms;
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-animation-iteration-count: infinite;
    animation-name: fill-unfill-rotate;
    animation-duration: 5332ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-iteration-count: infinite;
    opacity: 1;
  }
  @-webkit-keyframes fill-unfill-rotate {
    12.5% {
      -webkit-transform: rotate(135deg);
    }
    25% {
      -webkit-transform: rotate(270deg);
    }
    37.5% {
      -webkit-transform: rotate(405deg);
    }
    50% {
      -webkit-transform: rotate(540deg);
    }
    62.5% {
      -webkit-transform: rotate(675deg);
    }
    75% {
      -webkit-transform: rotate(810deg);
    }
    87.5% {
      -webkit-transform: rotate(945deg);
    }
    to {
      -webkit-transform: rotate(1080deg);
    }
  }
  @keyframes fill-unfill-rotate {
    12.5% {
      transform: rotate(135deg);
    }
    25% {
      transform: rotate(270deg);
    }
    37.5% {
      transform: rotate(405deg);
    }
    50% {
      transform: rotate(540deg);
    }
    62.5% {
      transform: rotate(675deg);
    }
    75% {
      transform: rotate(810deg);
    }
    87.5% {
      transform: rotate(945deg);
    }
    to {
      transform: rotate(1080deg);
    }
  }
  .circle-clipper {
    display: inline-block;
    position: relative;
    width: 50%;
    height: 100%;
    overflow: hidden;
  }
  .spinner-layer::after {
    content: '';
    left: 45%;
    width: 10%;
    border-top-style: solid;
  }
  .spinner-layer::after,
  .circle-clipper .circle {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    border-width: var(--exmg-spinner-stroke-width, 3px);
    border-radius: 50%;
  }
  .circle-clipper .circle {
    bottom: 0;
    width: 200%;
    border-style: solid;
    border-bottom-color: transparent !important;
  }
  .circle-clipper.left .circle {
    left: 0;
    border-right-color: transparent !important;
    -webkit-transform: rotate(130deg);
    transform: rotate(130deg);
  }
  .circle-clipper.right .circle {
    left: -100%;
    border-left-color: transparent !important;
    -webkit-transform: rotate(-130deg);
    transform: rotate(-130deg);
  }
  .exmg-active .gap-patch::after,
  .exmg-active .circle-clipper .circle {
    -webkit-animation-duration: 1333ms;
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-animation-iteration-count: infinite;
    animation-duration: 1333ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-iteration-count: infinite;
  }
  .exmg-active .circle-clipper.left .circle {
    -webkit-animation-name: left-spin;
    animation-name: left-spin;
  }
  .exmg-active .circle-clipper.right .circle {
    -webkit-animation-name: right-spin;
    animation-name: right-spin;
  }
  @-webkit-keyframes left-spin {
    0% {
      -webkit-transform: rotate(130deg);
    }
    50% {
      -webkit-transform: rotate(-5deg);
    }
    to {
      -webkit-transform: rotate(130deg);
    }
  }
  @keyframes left-spin {
    0% {
      transform: rotate(130deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    to {
      transform: rotate(130deg);
    }
  }
  @-webkit-keyframes right-spin {
    0% {
      -webkit-transform: rotate(-130deg);
    }
    50% {
      -webkit-transform: rotate(5deg);
    }
    to {
      -webkit-transform: rotate(-130deg);
    }
  }
  @keyframes right-spin {
    0% {
      transform: rotate(-130deg);
    }
    50% {
      transform: rotate(5deg);
    }
    to {
      transform: rotate(-130deg);
    }
  }
  #spinnerContainer.exmg-cooldown {
    -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);
    animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  @-webkit-keyframes fade-out {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
export default style;