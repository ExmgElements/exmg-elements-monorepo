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
export const style = css`:host{font-family:Roboto;--exmg-arrow-upward-url: url("/assets/arrow-upward.svg");--exmg-table-width: 100%;--exmg-table-margin-bottom: 5px;--exmg-table-color: #02182b;--exmg-table-background-color: #ffffff;--exmg-table-border-color: #f6f6f6;--exmg-table-row-separator-color: #dbdbdb;--exmg-table-row-selected-color: #02182b;--exmg-table-row-selected-background-color: #e2f1fe;--exmg-table-row-hover-color: #02182b;--exmg-table-row-hover-background-color: #f1f1f1;--exmg-table-row-dragged-background-color: #f1f1f1;--exmg-table-th-color: #0071dc;--exmg-table-columns-background-color: #ffffff;--exmg-table-th-hover-color: #02182b;--exmg-table-th-height: 48px;--exmg-table-th-font-size: 16px;--exmg-table-th-sort-margin-left: 4px;--exmg-table-td-height: 48px;--exmg-table-td-font-size: 16px}paper-checkbox{--paper-checkbox-unchecked-color: #97aac4;--paper-checkbox-checked-color: #1274d9;--paper-checkbox-size: 24px;--paper-checkbox-unchecked-ink-color: #0070db;--paper-checkbox-checked-ink-color: #0070db}table{width:var(--exmg-table-width);border:1px solid var(--exmg-table-border-color);margin-bottom:var(--exmg-table-margin-bottom);border-radius:4px;color:var(--exmg-table-color);background-color:var(--exmg-table-background-color);border-spacing:0}td{height:var(--exmg-table-td-height)}.grid-toolbar th{padding:0;text-align:left}.grid-columns th{font-family:Roboto;height:var(--exmg-table-th-height);font-size:var(--exmg-table-th-font-size);font-weight:500;font-style:normal;font-stretch:normal;text-transform:uppercase;line-height:1.33;letter-spacing:2px;color:var(--exmg-table-th-color);background-color:var(--exmg-table-columns-background-color);vertical-align:middle;text-align:left}.grid-columns th:hover{color:var(--exmg-table-th-hover-color)}.grid-columns th:first-child,tbody td:first-child{padding-left:10px}.grid-columns th:last-child,tbody td:last-child{padding-right:10px}th,td{bottom:0;border-bottom:1px solid var(--exmg-table-row-separator-color)}tbody td{height:var(--exmg-table-td-height);font-family:Roboto;font-size:var(--exmg-table-td-font-size);font-weight:normal;font-style:normal;font-stretch:normal;line-height:1.43px;letter-spacing:.3px;color:var(--exmg-table-color)}table tr:last-child td{border:0}th[data-sort]{padding-right:25px;cursor:pointer}th[data-sort]::after{display:inline-block;content:"";-webkit-mask-image:var(--exmg-arrow-upward-url);mask-image:var(--exmg-arrow-upward-url);background-color:currentColor;background-size:contain;height:var(--exmg-table-th-font-size);width:var(--exmg-table-th-font-size);margin-left:var(--exmg-table-th-sort-margin-left);opacity:0}th[data-sort-direction=ASC]::after{opacity:1;transition:transform .1s linear;transform:rotate(0deg)}th[data-sort-direction=DESC]::after{opacity:1;transition:transform .1s linear;transform:rotate(180deg)}tbody>tr:not(.grid-row-detail):hover{color:var(--exmg-table-row-hover-color);background-color:var(--exmg-table-row-hover-background-color)}tr[data-selected]{color:var(--exmg-table-row-selected-color);background-color:var(--exmg-table-row-selected-background-color)}tr.grid-row-detail{display:none}tr.grid-row-detail[data-is-row-expanded]{display:table-row}tr.grid-row-detail td{padding:20px}tr .grid-icon-rotate[data-is-expanded]>*{transition:transform .1s linear;transform:rotate(180deg)}tr .grid-icon-rotate[data-is-expandable]:not([data-is-expanded])>*{transition:transform .1s linear;transform:rotate(0deg)}.grid-row-drag-handler{cursor:move;vertical-align:middle}tr.dragged{background:var(--exmg-table-row-dragged-background-color);opacity:.25;box-shadow:2px 2px 5px rgba(0,0,0,.5) inset}tr.cloned{background-color:var(--exmg-table-row-dragged-background-color);width:100%;box-sizing:border-box;box-shadow:2px 2px 5px rgba(0,0,0,.5);opacity:.9}tr td.grid-cell-visible-on-hover>*{visibility:hidden}tr:hover td.grid-cell-visible-on-hover>*{visibility:visible}`;
export default style;
