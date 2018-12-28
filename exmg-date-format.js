var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property, customElement } from '@polymer/lit-element';
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; // floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
window.Exmg = window.Exmg || {};
/**
* The `<exmg-date-format>` Lightweight element for formatting dates
*
* ```html
*   <exmg-date-format timestamp="1493214988336"></exmg-date-format>
*   <exmg-date-format timestamp="1493214988336" dataPattern="dd/MM/yyyy"></exmg-date-format>
* ```
*
* Example of how to set the default date pattern in the global scope
* ```html
*   window.Exmg.defaultDatePattern = 'dd/MM/yy';
* ```
*
* ### Styling
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--exmg-date-format` | Mixin applied to host element | `{}`
*
*
* @customElement
* @polymer
* @group Exmg Core Elements
* @demo demo/index.html
*/
let DateFormatElement = class DateFormatElement extends LitElement {
    /**
    * The `<exmg-date-format>` Lightweight element for formatting dates
    *
    * ```html
    *   <exmg-date-format timestamp="1493214988336"></exmg-date-format>
    *   <exmg-date-format timestamp="1493214988336" dataPattern="dd/MM/yyyy"></exmg-date-format>
    * ```
    *
    * Example of how to set the default date pattern in the global scope
    * ```html
    *   window.Exmg.defaultDatePattern = 'dd/MM/yy';
    * ```
    *
    * ### Styling
    *
    * Custom property | Description | Default
    * ----------------|-------------|----------
    * `--exmg-date-format` | Mixin applied to host element | `{}`
    *
    *
    * @customElement
    * @polymer
    * @group Exmg Core Elements
    * @demo demo/index.html
    */
    constructor() {
        super(...arguments);
        this._defaultDatePattern = 'MM/dd/yyyy hh:mm:ss a';
        this.formattedDate = '';
    }
    render() {
        return html `
      <style>
        :host {
          display: inline-block;
          @apply --exmg-date-format;
        }
      </style>
      ${this.formatDate(this.timestamp, this.datePattern)}
    `;
    }
    /**
     * This function can be used to manualy format dates. The first parameter
     * can be a timestamp or a Date. Second parameter pattern is optional.
     */
    formatDate(date, datePattern = window.Exmg.defaultDatePattern || this._defaultDatePattern) {
        return date ? this._format(date, datePattern) : '';
    }
    _format(date, pattern) {
        if (typeof date === 'number') {
            date = new Date(date);
        }
        var hours = date.getHours();
        var hours12 = hours <= 12 ? (hours == 0 ? 12 : hours) : hours - 12;
        var dayMode = hours < 12 ? 'AM' : 'PM';
        return pattern.
            replace(/yyyy/g, String(date.getFullYear())).
            replace(/yy/g, String(date.getFullYear()).substr(2).padStart(2, '0')).
            replace(/MM/g, String(date.getMonth() + 1).padStart(2, '0')).
            replace(/dd/g, String(date.getDate()).padStart(2, '0')).
            replace(/hh/g, String(hours12).padStart(2, '0')).
            replace(/HH/g, String(hours).padStart(2, '0')).
            replace(/mm/g, String(date.getMinutes()).padStart(2, '0')).
            replace(/ss/g, String(date.getSeconds()).padStart(2, '0')).
            replace(/tt/g, dayMode).
            replace(/a/g, dayMode);
    }
};
__decorate([
    property({ type: Number })
], DateFormatElement.prototype, "timestamp", void 0);
__decorate([
    property({ type: String })
], DateFormatElement.prototype, "datePattern", void 0);
__decorate([
    property({ type: String })
], DateFormatElement.prototype, "_defaultDatePattern", void 0);
__decorate([
    property({ type: String })
], DateFormatElement.prototype, "formattedDate", void 0);
DateFormatElement = __decorate([
    customElement('exmg-date-format')
], DateFormatElement);
export { DateFormatElement };
