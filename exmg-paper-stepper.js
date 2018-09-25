import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/iron-selector/iron-selector.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

/**
* The `<exmg-paper-stepper>` is an material design horizontal stepper
*
* ```html
*  <exmg-paper-stepper selected="1">
*    <exmg-paper-step label="step 1"></exmg-paper-step>
*    <exmg-paper-step label="step 2"></exmg-paper-step>
*    <exmg-paper-step label="step 3"></exmg-paper-step>
*  </exmg-paper-stepper>
* ```
*
* @customElement
* @polymer
* @memberof Exmg
* @group Exmg Paper Elements
* @demo demo/index.html
*/
class PaperStepperElement extends PolymerElement {
  static get is() { return 'exmg-paper-stepper'; }
  static get properties() {
    return {
      stepElements: {
        type: Array,
      },
      selected: {
        type: Number,
        notify: true,
      }
    };
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .container {
          @apply --layout;
          @apply --layout-justified;
          overflow: hidden;
        }
      </style>
      <iron-selector id="selector" class="container" selected="{{selected}}" on-iron-select="_onIronSelect">
        <slot></slot>
      </iron-selector>
    `;
  }
  _onIronSelect(e) {
    let index = this.selected;
    let items = this.$.selector.items;
    for (var i = 0; i < items.length; i++) {
      if(i < index) {
        this.$.selector.items[i].setAttribute('finished','');
      } else {
        this.$.selector.items[i].removeAttribute('finished');
      }
    }
  }
  constructor() {
    super();
    this._boundNotifySelected = this.notifySelected.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('selected', this._boundNotifySelected);
  }
  disconnectCallback() {
    super.disconnectCallback();
    this.removeEventListener('selected', this._boundNotifySelected);
  }
  ready() {
    super.ready();
    this._observer = new FlattenedNodesObserver(this, this._nodesChanged);
  }
  notifySelected(e) {
    this.set('selected', this.$.selector.indexOf(e.detail.item));
  }
  _nodesChanged(e) {
    let index = 1;
    this.set('stepElements', e.addedNodes.filter(n => n.nodeType === Node.ELEMENT_NODE));
    this.stepElements.forEach((el) => {
      el.setAttribute('index', index++);
    });
  }
}

window.customElements.define(PaperStepperElement.is, PaperStepperElement);
