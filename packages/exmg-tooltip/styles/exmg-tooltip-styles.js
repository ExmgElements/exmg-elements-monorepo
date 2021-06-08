/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { css } from 'lit-element';
/**
 !Note: This file is autogenerated and any changes here may be silently overridden
*/
export const style = css `
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
//# sourceMappingURL=exmg-tooltip-styles.js.map