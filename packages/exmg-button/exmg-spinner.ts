import {html, property, customElement, classMap, LitElement, observer} from '@material/mwc-base/base-element';
import {style} from './styles/exmg-spinner-styles';

@customElement('exmg-button-spinner')
export class ExmgSpinner extends LitElement {
  @property({type: Boolean})
  public coolingDown = false;

  @property({type: Boolean, reflect: true})
  @observer(function(this: ExmgSpinner, value: boolean) {
    this.setAriaHidden(!value);
    this.coolingDown = !value;
  })
  public active = false;

  public static styles = style;

  private resetAnimation() {
    this.active = false;
    this.coolingDown = false;
  }

  private setAriaHidden(hidden: boolean) {
    const attr = 'aria-hidden';
    if (hidden) {
      this.setAttribute(attr, 'true');
    } else {
      this.removeAttribute(attr);
    }
  }

  public render() {
    const classes = {
      'exmg-active': this.active || this.coolingDown,
      'exmg-cooldown': this.coolingDown,
    };
    /* eslint-disable */
    return html`
      <div
        id="spinnerContainer"
        class="${classMap(classes)}"
        @animationend="${() => this.resetAnimation}"
        @webkitAnimationEnd="${() => this.resetAnimation}"
      >
        <div class="spinner-layer">
          <div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div>
        </div>
      </div>
    `;
    /* eslint-enable */
  }
}
