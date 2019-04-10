import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';

/**
 * ### Styling
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-drawer-max-width` | max width of drawer | `max width from style attribute or 547px`
 */
@customElement('exmg-drawer')
export class ExmgDrawer extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  @property({type: Boolean, attribute: 'no-cancel-on-outside-click'})
  noCancelOnOutsideClick: boolean = false;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;

    this.dispatchEvent(new CustomEvent(
      'exmg-drawer-opened-changed',
      {
        bubbles: true,
        composed: true,
        detail: {
          value: e.detail.value,
        },
      }
    ));
  }

  openDialog() {
    this.opened = true;
  }

  render () {
    // language=html
    return html`
      <style>
        paper-dialog {
          margin: 0;
          padding: 0;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: var(--exmg-drawer-max-width, ${this.style.maxWidth || '547px'});
          overflow: auto;
          box-shadow: none;
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
        <slot></slot>
      </paper-dialog>
    `;
  }
}
