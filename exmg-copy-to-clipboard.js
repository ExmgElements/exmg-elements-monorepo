import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures.js';

/**
* `<exmg-copy-to-clipboard>` Helper element to create icon/buttons that
* lets the user copy content to the clipboard. Just wrap it arround
* the button or icon and set the value that needs to be copied.
*
* ```html
*  <exmg-copy-to-clipboard value="mark@test.com">
*    <paper-icon-button icon="content-copy"></paper-icon-button>
*  </exmg-copy-to-clipboard>
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
* `--exmg-copy-to-clipboard` | Mixin applied to host element | `{}`
*
*
* @customElement
* @polymer
* @memberof Exmg
* @group Exmg Core Elements
* @demo demo/index.html
*/
class CopyToClipboardElement extends GestureEventListeners(PolymerElement) {
  static get is() {
    return 'exmg-copy-to-clipboard';
  }

  static get properties() {
    return {
      /**
       * Property value used for clipboard copy action
       */
      value: {
        type: String,
      },

      /**
       * Boolean indicating if document.execCommand('copy') is supported
       */
      _isCopySupported: {
        type: Boolean,
        value: !!document.queryCommandSupported('copy'),
      },

      /**
       * By default, exmg-web-socket events do not bubble. Setting this attribute will cause its
       * events to bubble to the window object.
       */
      bubbles: {
        type: Boolean,
        value: false,
      },
    };
  }

  static get observers() {
    return [
      '_hideCopy(_isCopySupported, _htmlElement)',
    ];
  }

  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          @apply --exmg-copy-to-clipboard;
        }
        #clipboard { display:none; }
      </style>
      <slot></slot>
      <span id="clipboard">[[value]]</span>
    `;
  }

  /**
   * initializes the slotted content and adds a event listener to the html element provided
   */
  _initSlottedElement() {
    this._htmlElement = FlattenedNodesObserver.getFlattenedNodes(this)
      .filter((n) => n.nodeType === Node.ELEMENT_NODE)[0];
    addListener(this._htmlElement, 'tap', this._boundElementTap);
  }

  /**
   * Monitor if button is replaced at a later moment and as a result update reference
   */
  connectedCallback() {
    super.connectedCallback();
    this._boundElementTap = this._handleCopy.bind(this);
    this._observer = new FlattenedNodesObserver(this, (info) => {
      this._initSlottedElement();
    });
  }

  /**
   * Returns the distributed html element.
   */
  get htmlElement() {
    return this._htmlElement;
  }

  /**
   * Cleanup node observer
   */
  disconnectCallback() {
    super.disconnectCallback();
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._htmlElement) {
      removeListener(this._htmlElement, 'tap', this._boundElementTap);
    }
  }

  /**
   * Copy the given value to the clipboard
   */
  copyToClipboard() {
    this.$.clipboard.style.display = 'block';
    var range = document.createRange();
    range.selectNodeContents(this.$.clipboard);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand('copy');
      this.dispatchEvent(new CustomEvent('copy-successful', {
        detail: this.value,
        bubbles: this.bubbles,
        composed: true,
      }));
    } catch (err) {
      console.error('copy to clipboard failed', err);
    }
    selection.removeAllRanges();
    this.$.clipboard.style.display = 'none';
  }

  /**
   * Hide button when copy functionality is not supported in browser
   */
  _hideCopy(_isCopySupported, _htmlElement) {
    if (!_isCopySupported && _htmlElement) {
      _htmlElement.style.display = 'none';
      this.dispatchEvent(new CustomEvent('copy-not-supported', {bubbles: this.bubbles, composed: true}));
    }
  }

  /**
   * Handle button tap event and trigger the actual copy to clipboard
   */
  _handleCopy(e) {
    console.log('_handleCopy');
    this.copyToClipboard();
    e.stopPropagation();
  }
}

window.customElements.define(CopyToClipboardElement.is, CopyToClipboardElement);