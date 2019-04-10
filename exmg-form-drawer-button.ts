import '@polymer/paper-spinner/paper-spinner-lite';
import {html, property, customElement, classMap} from '@material/mwc-base/base-element';
import {Button} from "@material/mwc-button/mwc-button";
import {style} from './exmg-form-drawer-button-styles';
import {ripple} from '@material/mwc-ripple/ripple-directive.js';

@customElement('exmg-form-drawer-button')
export class ExmgFormDrawerButton extends Button {
	@property({type: Boolean})
	loading = false;

	static styles = style;

	render() {
		const classes = {
			'mdc-button--raised': this.raised,
			'mdc-button--unelevated': this.unelevated,
			'mdc-button--outlined': this.outlined,
			'mdc-button--dense': this.dense,
		};
		const mdcButtonIcon = html`<span class="material-icons mdc-button__icon">${this.icon}</span>`;
		return html`
      <button
          .ripple="${ripple({unbounded: false})}"
          class="mdc-button ${classMap(classes)}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}">
        ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
        <span class="mdc-button__label">${this.label}</span>
        ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
        <slot></slot>
        ${this.loading ? html`<paper-spinner-lite active></paper-spinner-lite>` : ''}
      </button>`;
	}
}
