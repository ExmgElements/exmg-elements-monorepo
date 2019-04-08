import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';

@customElement('exmg-form-drawer' as any)
export class ExmgFormDrawer extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  handleOpenedChanged(e: CustomEvent) {
    this.opened = e.detail.value;

    this.dispatchEvent(new CustomEvent(
      'exmg-form-drawer-opened-changed',
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
          width: 300px;
          overflow: auto;
          box-shadow: none;
        }
      </style>
      <paper-dialog
        ?opened="${this.opened}"
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
