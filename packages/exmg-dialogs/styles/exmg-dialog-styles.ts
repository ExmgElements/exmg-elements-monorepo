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
import {css} from 'lit-element';
/**
 !Note: This file is autogenerated and any changes here may be silently overridden
*/
export const style = css`
  exmg-button {
    text-transform: initial;
    text-transform: none;
    letter-spacing: 0.25px;
    min-width: 3.75rem;
  }
  paper-dialog {
    border-radius: 0.5rem;
    min-width: 31.25rem;
    box-shadow: var(--shadow-elevation-8dp_-_box-shadow);
  }
  paper-dialog > .actions {
    margin: 1.5rem 0;
    text-align: right;
  }
  paper-dialog > header {
    -webkit-box-flex: 0 0 auto;
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    padding: 0.25rem 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: row;
  }
  paper-dialog > header > .title {
    flex: 1;
    flex-basis: 1e-9px;
  }
  paper-dialog > header > paper-icon-button {
    position: relative;
    top: -0.5rem;
  }
  paper-dialog > header > .title {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    color: #000;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    margin: 0 2rem 1rem 0;
  }
  paper-dialog {
    max-width: 32rem;
    box-sizing: border-box;
  }
  :host([large]) paper-dialog {
    max-width: 50rem;
    width: 100%;
  }
  paper-dialog > .actions {
    margin: 1.5rem 0 1.5rem;
  }
  ::slotted(hr) {
    border: none;
    height: 1px;
    background: var(--divider-color);
    margin: 1rem 0 0.5rem;
  }
  :host([submitting]) paper-dialog > .actions {
    margin: 1.5rem 0 1.25rem;
  }
  p,
  ::slotted(p) {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(0, 0, 0, 0.54);
  }
  ::slotted(label) {
    font-size: 0.75rem;
    font-weight: 400;
    height: 1.25rem;
    justify-content: normal;
    letter-spacing: 0.12rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    color: var(--secondary-text-color);
  }
  ::slotted(p.help) {
    margin-top: -2px;
    font-size: 0.8em;
  }
  .body {
    margin-top: 0px;
    margin-bottom: 1.5rem;
  }
  paper-dialog > .actions {
    margin: 1.125rem 0 1.125rem;
  }
  paper-dialog > .actions > * {
    margin-left: 1rem;
  }
  paper-dialog > .close-button {
    position: absolute;
    top: -0.8rem;
    right: -0.4rem;
    font-size: 1rem;
    color: var(--mdc-theme-primary);
  }
  paper-dialog > .close-button:hover {
    cursor: pointer;
    color: var(--secondary-text-color);
  }
  :host([submitting]) paper-dialog > .actions {
    margin: 1.125rem 0 0.875rem;
  }
  paper-dialog-scrollable {
    margin-top: 0.25rem;
  }
  .error {
    display: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
  }
  .error > span {
    display: flex;
    background-color: #fbe9e7;
    color: #ff5252;
    padding: 0 0 0 1rem;
    margin: 0 0 0.75rem;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
  }
  .error svg {
    margin-right: 0.75rem;
    fill: #ff5252;
  }
  .error.show {
    display: block;
  }
`;
export default style;
