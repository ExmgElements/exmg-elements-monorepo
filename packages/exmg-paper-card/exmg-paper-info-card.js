import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import {sharedCardStyles} from './exmg-paper-card-shared-styles.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
 * The `exmg-paper-info-card` displays a responsive info card. This card has multiple use cases
 *
 * * If a page is in initial state and intro explaination can be shown including an related image
 * and link to more information/documentation
 * * When a table has no data to display
 * * As a setting
 *
 * See demo page for more detailed examples on how to use
 *
 * ```html
 * <exmg-info-card card-image="rocket.png" title="Test Title">
 *   <div slot="body" class="body">
 *     Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
 * tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
 * exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
 * eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
 * nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
 * delenit feugait nulla facilisi.<br>
 *     <a href="#" target="_blank" class="open-new">More information</a>
 *   </div>
 * </exmg-info-card>
 * ```
 * @customElement
 * @polymer
 * @memberof Exmg
 * @group Exmg Paper Elements
 * @element exmg-paper-info-card
 * @demo demo/info-card.html
 */
class InfoCardElement extends PolymerElement {
  static get template() {
    return html`
      ${sharedCardStyles}
      <style>
        .container {
          max-width: 576px;
          margin: 16px auto;
          @apply --layout-vertical;
          @apply --layout-center-justified;
          @apply --exmg-paper-info-card-container;
        }
        :host([full]) > .container {
          max-width: inherit;
          width: 100%;
        }
        @media (min-width: 768px) {
          :host(:not([minor])) > .container {
            width: 100%;
            @apply --layout-horizontal;
          }
        }
        .image {
          text-align: center;
        }
        .image img {
          padding: 34px 24px;
          width: 180px;
          @apply --exmg-paper-info-card-image;
        }
        .main {
          padding: 24px;
          width: 100%;
          box-sizing: border-box;
          @apply --layout-flex;
          @apply --exmg-paper-info-card-main;
        }
      </style>
      <div class="container">
        <template is="dom-if" if="[[cardImage]]" restamp="true">
          <div class="image"><img src="[[cardImage]]"></div>
        </template>
        <div class="main">
          <template is="dom-if" if="[[title]]" restamp="true">
            <div class="title">[[title]]</div>
          </template>
          <template is="dom-if" if="[[tagline]]" restamp="true">
            <div class="tagline">[[tagline]]</div>
          </template>
          <slot name="body"></slot>
        </div>
        <slot name="actions"></slot>
      </div>
  `;
  }
  static get is() {
    return 'exmg-paper-info-card';
  }
  static get properties() {
    return {
      /**
      * Image url of seaction logo/Image
      */
      cardImage: String,
      /**
      * Tagline displayed inside the card
      */
      tagline: String,
      /**
      * Title displayed inside the card
      */
      title: String,
      /**
      * The full attribute removes the left and right padding inside the card so it is using all available space
      */
      full: Boolean,
    };
  }
}

window.customElements.define(InfoCardElement.is, InfoCardElement);

Exmg.InfoCardElement = InfoCardElement;

