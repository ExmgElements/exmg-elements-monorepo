import {
  LitElement,
  html,
  customElement,
  property,
} from 'lit-element';

import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import {addListener, removeListener} from '@polymer/polymer/lib/utils/gestures';

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
 */
@customElement('exmg-copy-to-clipboard')
export class ExmgCopyToClipboard extends LitElement {
  @property({type: String})
  private value?: string;

  @property({type: Boolean})
  private isCopySupported: boolean = !!document.queryCommandSupported('copy');

  @property({type: Boolean})
  private bubbles: boolean = false;

  private observer?: FlattenedNodesObserver;
  private htmlElement?: HTMLElement;

  constructor() {
    super();
    this.handleCopy = this.handleCopy.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.observer = new FlattenedNodesObserver(this, () => {
      this.initSlottedElement();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    if (this.htmlElement) {
      removeListener(this.htmlElement, 'tap', this.handleCopy);
    }
  }

  /**
   * initializes the slotted content and adds a event listener to the html element provided
   */
  private initSlottedElement(): void {
    this.htmlElement =
        (FlattenedNodesObserver.getFlattenedNodes(this) || [])
            .filter((n: Node) => n.nodeType === Node.ELEMENT_NODE)[0];

    if (this.htmlElement) {
      addListener(this.htmlElement, 'tap', this.handleCopy);
    }
  }

  /**
   * Copy the given value to the clipboard
   */
  private copyToClipboard(): void {
    const clipboardNode: HTMLElement|null = this.shadowRoot ? this.shadowRoot.querySelector('#clipboard') : null;

    if (!clipboardNode) {
      return;
    }

    clipboardNode.style.display = 'block';

    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(clipboardNode);

    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      this.dispatchEvent(new CustomEvent('exmg-copy-to-clipboard-copied', {
        detail: this.value,
        bubbles: this.bubbles,
        composed: true,
      }));
    } catch (err) {
      console.error('copy to clipboard failed', err);
    }

    selection.removeAllRanges();
    clipboardNode.style.display = 'none';
  }

  /**
   * Handle button tap event and trigger the actual copy to clipboard
   */
  private handleCopy(e: Event): void {
    this.copyToClipboard();
    e.stopPropagation();
  }

  protected firstUpdated(): void {
      if (!this.isCopySupported && this.htmlElement) {
        this.htmlElement.style.display = 'none';
        this.dispatchEvent(new CustomEvent('copy-not-supported', {bubbles: this.bubbles, composed: true}));
      }
  }

  protected render() {
    return html`
      <style>
        :host {
          display: inline-block;
          /*noinspection CssUnresolvedCustomPropertySet*/
          @apply --exmg-copy-to-clipboard;
        }
        #clipboard { display:none; }
      </style>
      <slot></slot>
      <span id="clipboard">${this.value}</span>
    `;
  }
}
