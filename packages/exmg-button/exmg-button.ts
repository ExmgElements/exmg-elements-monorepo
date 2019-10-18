import {html, property, customElement} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';
import {ButtonBase} from '@material/mwc-button/mwc-button-base';
import {style} from '@material/mwc-button/mwc-button-css';
import {style as newStyles} from './styles/exmg-button-styles';
import {ripple} from '@material/mwc-ripple/ripple-directive.js';
import './exmg-spinner';

@customElement('exmg-button')
export class ExmgButton extends ButtonBase {
  @property({type: Boolean})
  public loading = false;

  static styles = [style, newStyles];

  protected render() {
    const classes = {
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
    };
    const loadingClass = {
      'exmg-loading': this.loading,
      'exmg-button-content': true,
    };
    const mdcButtonIcon =
        html`<span class="material-icons mdc-button__icon">${this.icon}</span>`;
    const buttonRipple = ripple({unbounded: false});
    return html`
      <button id="button"
              .ripple="${buttonRipple}"
              class="mdc-button ${classMap(classes)}"
              ?disabled="${this.disabled}"
              aria-label="${this.label || this.icon}">
        <div class="mdc-button__ripple"></div>
        <span class="${classMap(loadingClass)}">
          ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
          <span class="mdc-button__label">${this.label}</span>
          ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
          <slot></slot>
        </span>
        ${this.loading ? html`<exmg-button-spinner active></exmg-button-spinner>`:''}
        
      </button>`;
  }

  // public render() {
  //   const classes = {
  //     'mdc-button--raised': this.raised,
  //     'mdc-button--unelevated': this.unelevated,
  //     'mdc-button--outlined': this.outlined,
  //     'mdc-button--dense': this.dense,
  //   };
  //   const loadingClass = {
  //     'exmg-loading': this.loading,
  //     'exmg-button-content': true,
  //   };
  //   const mdcButtonIcon = html`
  //     <span class="material-icons mdc-button__icon">${this.icon}</span>
  //   `;
  //   const buttonRipple = ripple({unbounded: false});
  //   return html`
  //     <button
  //       .ripple="${buttonRipple}"
  //       class="mdc-button ${classMap(classes)}"
  //       ?disabled="${this.disabled}"
  //       aria-label="${this.label || this.icon}"
  //     >
  //       <span class="mdc-button__ripple ${classMap(loadingClass)}">
  //         ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
  //         <span class="mdc-button__label">${this.label}</span>
  //         ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
  //         <slot></slot>
  //       </span>
  //       ${this.loading
  //         ? html`
  //             <exmg-button-spinner active></exmg-button-spinner>
  //           `
  //         : ''}
  //     </button>
  //   `;
  // }
}
