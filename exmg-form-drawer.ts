import {BaseElement, html, property, observer, query, customElement, PropertyValues, classMap, addHasRemoveClass} from '@material/mwc-base/base-element.js';
import MDCModalDrawerFoundation from '@material/drawer/modal/foundation.js';
import MDCDismissibleDrawerFoundation from '@material/drawer/dismissible/foundation.js';
import {MDCDrawerAdapter} from '@material/drawer/adapter.js';
import {strings} from '@material/drawer/constants.js';
import {style} from './exmg-form-drawer-styles';
import 'wicg-inert/dist/inert.js';
import 'blocking-elements/blocking-elements.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-drawer': ExmgFormDrawer;
  }

  interface Document {
    $blockingElements: {
      push(arg0: HTMLElement): void;
      remove(arg0: HTMLElement): Boolean;
    }
  }

  interface HTMLElement {
    inert: Boolean;
  }
}

@customElement('exmg-form-drawer' as any)
export class ExmgFormDrawer extends BaseElement {

  @query('.mdc-drawer')
  protected mdcRoot!: HTMLElement;

  @query('.mdc-drawer-app-content')
  protected appContent!: HTMLElement;

  protected mdcFoundation!: MDCDismissibleDrawerFoundation;

  protected get mdcFoundationClass() {
    return this.type === 'modal' ? MDCModalDrawerFoundation : MDCDismissibleDrawerFoundation;
  }

  protected createAdapter(): MDCDrawerAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      elementHasClass: (element: HTMLElement, className: string) => element.classList.contains(className),
      saveFocus: () => {
        // Note, casting to avoid cumbersome runtime check.
        this._previousFocus = (this.getRootNode() as any as DocumentOrShadowRoot).activeElement as HTMLElement|null;
      },
      restoreFocus: () => {
        const previousFocus = this._previousFocus && this._previousFocus.focus;
        if (previousFocus) {
          this._previousFocus!.focus();
        }
      },
      notifyClose: () => {
        this.open = false;
        this.dispatchEvent(new Event(strings.CLOSE_EVENT, {bubbles: true, cancelable: true}))
      },
      notifyOpen: () => {
        this.open = true;
        this.dispatchEvent(new Event(strings.OPEN_EVENT, {bubbles: true, cancelable: true}))
      },
      // TODO(sorvell): Implement list focusing integration.
      focusActiveNavigationItem: () => {
      },
      trapFocus: () => {
        document.$blockingElements.push(this);
        this.appContent.inert = true;
      },
      releaseFocus: () => {
        document.$blockingElements.remove(this);
        this.appContent.inert = false;
      },
    }
  }

  private _previousFocus: HTMLElement|null = null;

  private _handleScrimClick() {
    if (this.mdcFoundation instanceof MDCModalDrawerFoundation) {
      this.mdcFoundation.handleScrimClick();
    }
  };

  @observer(function(this: ExmgFormDrawer, value: boolean) {
    if (this.type === '') {
      return;
    }
    if (value) {
      this.mdcFoundation.open();
    } else {
      this.mdcFoundation.close();
    }
  })
  @property({type: Boolean, reflect: true})
  open = false;

  @property({type: Boolean})
  hasHeader = false;

  @property({reflect: true})
  type = '';

  static styles = style;

  render() {
    const dismissible = this.type === 'dismissible' || this.type === 'modal';
    const modal = this.type === 'modal';
    const header = this.hasHeader ? html`
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">
          <slot name="title-icon"></slot>
          <slot name="title"></slot>
        </h3>
        <h6 class="mdc-drawer__subtitle"><slot name="subtitle"></slot></h6>
        <slot name="header"></slot>
      </div>
      ` : '';
    return html`
      <aside class="mdc-drawer
          ${classMap({'mdc-drawer--dismissible': dismissible, 'mdc-drawer--modal': modal})}">
        ${header}
        <div class="mdc-drawer__content"><slot></slot></div>
      </aside>
      ${modal ? html`<div class="mdc-drawer-scrim" @click="${this._handleScrimClick}"></div>` : ''}
      <div class="mdc-drawer-app-content">
        <slot name="appContent"></slot>
      </div>
      `;
  }

  // note, we avoid calling `super.firstUpdated()` to control when `createFoundation()` is called.
  firstUpdated() {
    this.mdcRoot.addEventListener('keydown', (e) => this.mdcFoundation.handleKeydown(e));
    this.mdcRoot.addEventListener('transitionend', (e) => this.mdcFoundation.handleTransitionEnd(e));
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('type')) {
      this.createFoundation();
    }
  }
}
