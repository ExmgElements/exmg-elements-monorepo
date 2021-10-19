import {LitElement, html, TemplateResult} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import '@exmg/exmg-button';
import '@exmg/exmg-markdown-editor';
import '@polymer/paper-input/paper-input.js';
import '@exmg/exmg-paper-combobox/exmg-paper-combobox';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-form/exmg-form';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '../exmg-form-drawer';
import './user-update-drawer.js';
import {UserUpdateDrawer} from './user-update-drawer.js';

@customElement('exmg-base-drawer-demo')
export class BaseDrawer extends LitElement {
  @query('#userDrawer')
  userDrawer?: UserUpdateDrawer;

  render(): TemplateResult {
    return html`
        <paper-button
          @click=${() =>
            this.userDrawer!.open({
              from: '1111',
              fromName: '222222',
              replyTo: '33333',
              subject: '4444',
              contentHtml: '5555',
              contentPlain: '6666',
            })}
          >Open User Drawer</paper-button
        >
      </div>

      <user-update-drawer id="userDrawer"></user-update-drawer>
    `;
  }
}
