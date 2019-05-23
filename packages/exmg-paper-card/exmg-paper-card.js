import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {sharedCardStyles} from './exmg-paper-card-shared-styles.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
 * The `exmg-paper-card` displays a responsive info card. This card has multiple use cases
 *
 * * If a page is in initial state and intro explaination can be shown including an related
 * image and link to more information/documentation
 * * When a table has no data to display
 * * As a setting
 *
 * See demo page for more detailed examples on how to use
 *
 * ```html
 * <exmg-info-card card-image="rocket.png" title="Test Title">
 *    <div slot="body" class="body">
 *     Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
 * tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
 * nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
 * Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel
 * illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
 * blandit praesent luptatumzzril delenit feugait nulla facilisi.<br>
 *     <a href="#" target="_blank" class="open-new">More information</a>
 *   </div>
 * </exmg-info-card>
 * ```
 *
 * @customElement
 * @polymer
 * @memberof Exmg
 * @group Exmg Paper Elements
 * @element exmg-paper-card
 * @demo demo/card.html
 */
class CardElement extends PolymerElement {
  static get is() {
    return 'exmg-paper-card';
  }
  static get template() {
    return html`
      ${sharedCardStyles}
      <slot></slot>
    `;
  }
}

window.customElements.define(CardElement.is, CardElement);

Exmg.CardElement = CardElement;

