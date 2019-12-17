import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';
import {style} from './styles/exmg-drawer-styles';

/**
 * ### Styling
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-drawer-max-width` | max width of drawer | `max width from style attribute or 547px`
 * `--exmg-drawer-color` | drawer text color | `var(--mdc-theme-on-surface, #02182b))`
 * `--exmg-drawer-bg-color` | drawer background color | `var(--mdc-theme-surface, #ffffff))`
 */
@customElement('exmg-drawer')
export class ExmgDrawer extends LitElement {
  @property({type: Boolean})
  opened = false;

  @property({type: Boolean, attribute: 'no-cancel-on-outside-click'})
  noCancelOnOutsideClick = false;

  @property({type: Boolean})
  private _resetSlot = false;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;

    this.dispatchEvent(
      new CustomEvent('exmg-drawer-opened-changed', {
        bubbles: true,
        composed: true,
        detail: {
          value: e.detail.value,
        },
      }),
    );
  }

  openDialog() {
    // Workaround for issue with opening multiple times with form
    // values. Issue is that if not reset theinputs will be empty second open
    this._resetSlot = true;
    setTimeout(() => {
      this.opened = true;
      this._resetSlot = false;
    }, 10);
  }

  static styles = [style];

  render() {
    // language=html
    return html`
      <style>
        paper-dialog {
          max-width: var(--exmg-drawer-max-width, ${this.style.maxWidth || '547px'});
        }
      </style>
      <paper-dialog
        ?opened="${this.opened}"
        ?no-cancel-on-outside-click="${this.noCancelOnOutsideClick}"
        @opened-changed="${this.handleOpenedChanged}"
        entry-animation="slide-from-right-animation"
        exit-animation="slide-right-animation"
        with-backdrop
      >
        ${this._resetSlot
          ? ''
          : html`
              <slot></slot>
            `}
      </paper-dialog>
    `;
  }
}
