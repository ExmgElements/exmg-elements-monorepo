import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/neon-animation/animations/slide-from-right-animation';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/paper-dialog/paper-dialog.js';
import './exmg-drawer';
import {style} from './exmg-form-drawer-styles';

@customElement('exmg-form-drawer' as any)
export class ExmgFormDrawer extends LitElement {
  @property({type: Boolean})
  opened: boolean = false;

  onSubmit(e: CustomEvent) {
    console.log('onSubmit', e.detail);
  }

  onCancel(e: CustomEvent) {
    console.log('onCancel', e.detail);
  }

  static styles = [
    style,
  ];

  render () {
    // language=html
    return html`
      <exmg-drawer ?opened="${this.opened}">
        <div class="header">
          <slot name="title"></slot>
          <div class="header-buttons">
            <input type="button" value="Cancel">
            <input type="button" value="Submit">
          </div>
        </div>
        <div class="form-elements">
          <exmg-form @submit="${this.onSubmit}" @cancel="${this.onCancel}" id="form1">
              <slot></slot>
          </exmg-form>
        </div>
      </exmg-drawer>
    `;
  }
}
