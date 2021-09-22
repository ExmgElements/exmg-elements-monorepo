import {css} from 'lit';

export const style = css`:host([collapsed]){position:absolute;top:1px;right:3px}:host>.badge{display:inline-block;font-size:.8rem;font-weight:500;font-stretch:normal;font-style:normal;font-weight:500}:host>.badge{display:block;width:24px;height:24px;align-items:center;justify-content:center;padding:2px;box-sizing:border-box;line-height:20px}.badge>span{display:block;letter-spacing:.2px;text-align:center;text-transform:capitalize;background-color:var(--exmg-paper-sidemenu-badge-background-color, #ff6978);color:var(--exmg-paper-sidemenu-badge-color, #fff);border-radius:16px}`;
export default style;
