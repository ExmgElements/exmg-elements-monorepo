import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
* Element for displaying long ago in a human readable format.
*
* ```html
* <exmg-long-ago timestamp="1520865356267"></exmg-long-ago>
* ```
*
* @customElement
* @polymer
* @memberof Exmg
* @group Exmg Core Elements
* @demo demo/index.html
* @summary Element to convert time/text to show time passed
*/
class LongAgoElement extends PolymerElement {
  static get is() {
    return 'exmg-long-ago';
  }
  static get properties() {
    return {
      /**
       * Timestamp value of the date to format
       */
      timestamp: {
        type: Number,
      },
      _formattedValue: {
        type: String,
        computed: '_computeValue(timestamp)'
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      [[_formattedValue]]
    `;
  }

  _computeValue(timestamp) {
    return this.formatValue(timestamp);
  }
  /**
   * Formats long ago difference in a human readable way
   *
   * @param  {timestamp} timestamp timestamp to be used.
   * @return {String} formatted string
   */
  formatValue(date) {
    return date ? this._format(date) : '';
  }

  _format(date) {
    if (typeof date === 'number') {
      date = new Date(date);
    } else {
      return 'Invalid date notation';
    }

    const diff = ((Date.now() - date.getTime()) / 1000);
    const dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0) {
      return;
    }

    if (dayDiff === 1) {
      return 'Yesterday';
    }

    if (dayDiff >= 31) {
      return 'Long ago';
    }

    if (dayDiff === 0) {
      if (diff < 3600 && diff < 86400) {
        return diff < 60 ? 'just now' : diff < 120 ? '1 minute ago' :
          Math.floor(diff / 60) + ' minutes ago';
      } else {
        return diff < 7200 ? '1 hour ago' : Math.floor(diff / 3600) + ' hours ago';
      }
    }

    return dayDiff < 7 ? dayDiff + ' days ago' : Math.ceil(dayDiff / 7) + ' weeks ago';
  }

}
window.customElements.define(LongAgoElement.is, LongAgoElement);

Exmg.LongAgoElement = LongAgoElement;
