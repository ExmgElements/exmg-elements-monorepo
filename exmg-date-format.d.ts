import { LitElement } from '@polymer/lit-element';
declare global {
    interface Window {
        Exmg: any;
    }
}
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
export declare class DateFormatElement extends LitElement {
    timestamp: number | undefined;
    datePattern?: string;
    _defaultDatePattern: string;
    formattedDate: string;
    render(): import("lit-html").TemplateResult;
    /**
     * This function can be used to manualy format dates. The first parameter
     * can be a timestamp or a Date. Second parameter pattern is optional.
     */
    formatDate(date: number | Date | undefined, datePattern?: string): string;
    _format(date: number | Date, pattern: string): string;
}
