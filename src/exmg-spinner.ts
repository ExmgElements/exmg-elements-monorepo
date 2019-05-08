import {html, property, customElement, classMap, LitElement, observer} from '@material/mwc-base/base-element';
import {style} from './exmg-spinner-styles';

@customElement('exmg-button-spinner')
export class ExmgSpinner extends LitElement {

  @property({type: Boolean})
  coolingDown = false;

  @property({type: Boolean, reflect: true})
  @observer(function (this: ExmgSpinner, value: boolean) {
    this.setAriaHidden(!value);
    this.coolingDown = !value;
  })
  active = false;

  static styles = style;

  resetAnimation() {
    this.active = false;
    this.coolingDown = false;
  }

  setAriaHidden(hidden: boolean) {
    const attr = 'aria-hidden';
    if (hidden) {
      this.setAttribute(attr, 'true');
    } else {
      this.removeAttribute(attr);
    }
  }

  render() {
    const classes = {
      'exmg-active': this.active || this.coolingDown,
      'exmg-cooldown': this.coolingDown,
    };
    return html`
      <div id="spinnerContainer" class="${classMap(classes)}"
        @animationend="${() => this.resetAnimation}"
        @webkitAnimationEnd="${() => this.resetAnimation}">
        <div class="spinner-layer">
<div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div>
        </div>
      </div>
    `;
  }
}
