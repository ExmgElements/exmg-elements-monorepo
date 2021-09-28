import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators';
import '../exmg-form-drawer.js';
import {style} from './form-drawer-base-styles.js';
import {BaseElement} from './base-element.js';
import {PropertyValues} from 'lit-element/lib/updating-element';

export interface Observer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (value: any, old: any): void;
}

// eslint-disable-next-line
export const observer = (observer: Observer) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (proto: any, propName: PropertyKey) => {
    // if we haven't wrapped `updated` in this class, do so
    if (!proto.constructor._observers) {
      proto.constructor._observers = new Map<PropertyKey, Observer>();
      const userUpdated = proto.updated;
      proto.updated = function (changedProperties: PropertyValues) {
        userUpdated.call(this, changedProperties);
        changedProperties.forEach((v, k) => {
          const o = this.constructor._observers.get(k);
          if (o !== undefined) {
            o.call(this, this[k], v);
          }
        });
      };
      // clone any existing observers (superclasses)
      // eslint-disable-next-line no-prototype-builtins
    } else if (!proto.constructor.hasOwnProperty('_observers')) {
      const observers = proto.constructor._observers;
      proto.constructor._observers = new Map();
      observers.forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: any, k: PropertyKey) => proto.constructor._observers.set(k, v),
      );
    }
    // set this method
    proto.constructor._observers.set(propName, observer);
  };

export abstract class FormDrawerBase<T> extends BaseElement {
  @property({type: Object})
  @observer(function (this: FormDrawerBase<T>, item: T) {
    this.itemChanged && this.itemChanged(item);
  })
  item?: T | null;

  @property({type: Boolean})
  opened = false;

  @property({type: String, attribute: 'update-title'})
  updateTitle = 'Update';

  @property({type: String, attribute: 'add-title'})
  addTitle = 'Add';

  @property({type: String, attribute: 'update-button'})
  updateButton = 'Update';

  @property({type: String, attribute: 'add-button'})
  addButton = 'Add';

  static styles = [style];

  private _handleFormDrawerToggle(e: CustomEvent) {
    this.opened = e.detail.value;
    this.openChanged && this.openChanged(this.opened);
  }

  public open(item?: T | null): void {
    this.item = item || null;
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  openChanged?(opened: boolean): void;
  itemChanged?(item: T): void;
  updateItem?(e: CustomEvent): void;
  createItem?(e: CustomEvent): void;

  protected renderDrawer(body: TemplateResult): TemplateResult {
    return html`
      <exmg-form-drawer
        autofocus-on-open
        no-cancel-on-outside-click
        ?opened="${this.opened}"
        reset-form-on-submit-success
        @exmg-drawer-opened-changed="${this._handleFormDrawerToggle}"
        submit-btn-title=${this.item ? this.updateButton : this.addButton}
        @submit=${this.item ? this.updateItem : this.createItem}
      >
        ${this.item ? html` <span slot="title">${this.updateTitle}</span> ` : html` <span slot="title">${this.addTitle}</span> `}
        ${this.opened ? body : html``}
      </exmg-form-drawer>
    `;
  }
}
