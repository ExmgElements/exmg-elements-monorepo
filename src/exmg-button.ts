import {html, property, customElement, classMap} from '@material/mwc-base/base-element';
import {Button} from '@material/mwc-button';
import {style} from './exmg-button-styles';
import {ripple} from '@material/mwc-ripple/ripple-directive.js';
import './exmg-spinner';

@customElement('exmg-button')
export class ExmgButton extends Button {

  @property({type: Boolean})
  loading = false;

  static styles: any = [ExmgButton.styles, style];

  render() {
    const classes = {
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
    };
    const loadingClass = {
      'exmg-loading': this.loading,
    };
    const mdcButtonIcon = html`<span class="material-icons mdc-button__icon">${this.icon}</span>`;
    return html`
			<button
					.ripple="${ripple({unbounded: false})}"
					class="mdc-button ${classMap(classes)}"
					?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"><span class="${classMap(loadingClass)}">
          ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
          <span class="mdc-button__label">${this.label}</span>
          ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
          <slot></slot>
        </span>${this.loading ? html`<exmg-spinner active></exmg-spinner>` : ''}
			</button>`;
  }
}
