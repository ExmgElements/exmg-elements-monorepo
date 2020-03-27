var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import '@exmg/exmg-form/exmg-form';
import '../exmg-stepper-drawer';
let Stepper = class Stepper extends LitElement {
    render() {
        // language=html
        return html `
      <style>
        exmg-stepper-drawer {
          --mdc-theme-primary: #0071dc;
        }
      </style>
      <exmg-stepper-drawer last-button-text="Submit" enable-edit-mode enable-back-button>
        <p slot="head-1">Set the basic values</p>
        <div slot="content-1">
          Enter the minimal and maximal bitrate you like to use for the test.
          <br />
          <br />
          <br />
          <p>dynamic height</p>
        </div>

        <p slot="head-2">Set bitrate option</p>
        <p slot="content-2">
          The following bitrates have been recommended to run the test with the best possible bitrate ladder for your setup.
        </p>
        <p slot="head-3">Set the basic values</p>
        <div slot="content-3">
          Enter the minimal and maximal bitrate you like to use for the test.
          <br />
          <br />
          <br />
          <p>dynamic height</p>
        </div>

        <p slot="head-4">Set bitrate option</p>
        <p slot="content-4">
          The following bitrates have been recommended to run the test with the best possible bitrate ladder for your setup.
        </p>
      </exmg-stepper-drawer>
    `;
    }
};
Stepper = __decorate([
    customElement('exmg-stepper-demo')
], Stepper);
export { Stepper };
