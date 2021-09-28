import {FormElement, HTMLElementWithRipple} from '@material/mwc-base/form-element.js';
import {observer} from '@material/mwc-base/observer.js';
import {html} from 'lit';
import {property, customElement, query} from 'lit/decorators';
import {MDCFoundation} from '@material/base';
import {style} from '@material/mwc-radio/mwc-radio-css';
import {ripple} from '@material/mwc-ripple/ripple-directive';
import foundation from '@material/radio/foundation';
import {SelectionController} from './exmg-selection-controller';
import {style as exmgRadioGroupItemStyles} from './styles/exmg-radio-group-item-styles-css.js';

export interface RadioFoundation extends MDCFoundation {
  setDisabled(disabled: boolean): void;
}

export declare const RadioFoundation: {
  prototype: RadioFoundation;
  new (adapter: Record<string, any>): RadioFoundation;
};

@customElement('exmg-radio-group-item')
export class ExmgRadioGroupItem extends FormElement {
  @query('.mdc-radio')
  protected mdcRoot!: HTMLElementWithRipple;

  @query('input')
  protected formElement!: HTMLInputElement;

  @property({type: Boolean, reflect: true})
  @observer(function (this: ExmgRadioGroupItem, checked: boolean) {
    this.formElement.checked = checked;
  })
  checked = false;

  @property({type: Boolean, reflect: true})
  @observer(function (this: ExmgRadioGroupItem, disabled: boolean) {
    this.mdcFoundation.setDisabled(disabled);
  })
  disabled = false;

  @property({type: String})
  @observer(function (this: ExmgRadioGroupItem, value: string) {
    this.formElement.value = value;
  })
  value = '';

  @property({type: String})
  name = '';

  @property({type: Boolean, attribute: 'hide-radio-button'})
  hideRadioButton = false;

  protected mdcFoundationClass: typeof RadioFoundation = (foundation as unknown) as typeof RadioFoundation;

  protected mdcFoundation!: RadioFoundation;

  private readonly selectionController?: SelectionController;

  constructor() {
    super();
    // Selection Controller is only needed for native ShadowDOM
    if (!(window as any)['ShadyDOM'] || !(window as any)['ShadyDOM']['inUse']) {
      this.selectionController = SelectionController.getController(this.parentNode!);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.selectionController) {
      this.selectionController.register(this);
    }
  }

  disconnectedCallback(): void {
    if (this.selectionController) {
      this.selectionController.unregister(this);
    }
    super.disconnectedCallback();
  }

  focusNative(): void {
    this.formElement.focus();
  }

  static styles = [style, exmgRadioGroupItemStyles];

  protected createAdapter(): Record<string, any> {
    return {
      setNativeControlDisabled: (disabled: boolean) => {
        this.formElement.disabled = disabled;
      },
    };
  }

  private changeHandler() {
    this.checked = this.formElement.checked;
    if (this.selectionController) {
      this.selectionController.update(this);
      this.dispatchEvent(new CustomEvent('exmg-radio-group-item-changed', {detail: {value: this.value}, composed: false, bubbles: true}));
    }
  }

  private focusHandler() {
    if (this.selectionController) {
      this.selectionController.focus(this);
    }
  }

  private clickHandler() {
    // Firefox has weird behavior with radios if they are not focused
    this.formElement.focus();
  }

  render() {
    return html`
      <label class="item ${this.checked ? 'checked' : ''} ${this.disabled ? 'disabled' : ''}">
        <div class="mdc-radio" .ripple="${ripple()}" ?hidden="${this.hideRadioButton}">
          <input
            class="mdc-radio__native-control"
            type="radio"
            name="${this.name}"
            .checked="${this.checked}"
            .value="${this.value}"
            @change="${this.changeHandler}"
            @focus="${this.focusHandler}"
            @click="${this.clickHandler}"
          />
          <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
          </div>
        </div>
        <div class="description">
          <slot></slot>
          <slot class="title" name="title"></slot>
          <slot class="body" name="body"></slot>
        </div>
      </label>
    `;
  }

  firstUpdated() {
    super.firstUpdated();
    if (this.selectionController) {
      this.selectionController.update(this);
    }
  }
}
