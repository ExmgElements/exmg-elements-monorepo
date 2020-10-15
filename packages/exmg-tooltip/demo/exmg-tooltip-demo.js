var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, css } from 'lit-element';
import '../exmg-tooltip.js';
let TooltipDemo = class TooltipDemo extends LitElement {
    render() {
        return html `
      <div class="container">
        <div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />allosaurus
            <exmg-tooltip>the name means "different lizard"</exmg-tooltip>
          </div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />brontosaurus
            <exmg-tooltip>the name means "thunder lizard"</exmg-tooltip>
          </div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />megalosaurus
            <exmg-tooltip>the name means "roof lizard"</exmg-tooltip>
          </div>
        </div>

        <div tyle="display:inline-block; position:relative;">
          <div id="dir_1" class="avatar red" tabindex="0"></div>
          <div id="dir_2" class="avatar blue" tabindex="0"></div>
          <div id="dir_3" class="avatar green" tabindex="0"></div>
          <div id="dir_4" class="avatar orange" tabindex="0"></div>

          <exmg-tooltip for="dir_1" position="left">👈</exmg-tooltip>
          <exmg-tooltip for="dir_2" position="right">👉</exmg-tooltip>
          <exmg-tooltip for="dir_3" position="top">👍</exmg-tooltip>
          <exmg-tooltip for="dir_4" position="bottom">👎</exmg-tooltip>
        </div>

        <div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <button id="styledBtn">Styled</button> <button>bla</button>
            <exmg-tooltip class="custom-style" for="styledBtn">the name means "different lizard"</exmg-tooltip>
          </div>
        </div>
      </div>
    `;
    }
};
TooltipDemo.styles = [
    css `
      input,
      .avatar {
        margin: 0 10px;
      }
      .avatar {
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
      }
      .blue {
        background-color: blue;
      }
      .orange {
        background-color: orange;
      }
      .green {
        background-color: green;
      }
      .red {
        background-color: red;
      }
      .custom-style {
        --exmg-tooltip-font-size: 16px;
        --exmg-tooltip-background: yellow;
        --exmg-tooltip-opacity: 0.7;
        --exmg-tooltip-text-color: blue;
        --exmg-tooltip-min-width: 200px;
      }
      .container {
        width: 300px;
        margin: 2rem auto;
      }
    `,
];
TooltipDemo = __decorate([
    customElement('exmg-tooltip-demo')
], TooltipDemo);
export { TooltipDemo };
