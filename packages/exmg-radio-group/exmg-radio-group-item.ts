import {
  FormElement,
  query,
  customElement,
  Foundation,
  Adapter,
  property,
  html,
  observer,
  HTMLElementWithRipple
} from '@material/mwc-base/form-element.js';
import {style} from '@material/mwc-radio/mwc-radio-css';
import {ripple} from '@material/mwc-ripple/ripple-directive';
import foundation from '@material/radio/foundation';
import {SelectionController} from './exmg-selection-controller';
import {style as exmgRadioGroupItemStyles} from './exmg-radio-group-item-styles';

export interface RadioFoundation extends Foundation {
  setDisabled(disabled: boolean): void;
}

export declare var RadioFoundation: {
  prototype: RadioFoundation;
  new (adapter: Adapter): RadioFoundation;
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
  hideRadioButton: boolean = false;

  protected mdcFoundationClass: typeof RadioFoundation = <typeof RadioFoundation><unknown>foundation;

  protected mdcFoundation!: RadioFoundation;

  private readonly selectionController?: SelectionController;

  constructor() {
    super();
    // Selection Controller is only needed for native ShadowDOM
    if (!(<any>window)['ShadyDOM'] || !(<any>window)['ShadyDOM']['inUse']) {
      this.selectionController = SelectionController.getController(this.parentNode!);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.selectionController) {
      this.selectionController.register(this);
    }
  }

  disconnectedCallback() {
    if (this.selectionController) {
      this.selectionController.unregister(this);
    }
  }

  focusNative() {
    this.formElement.focus();
  }

  static styles = [
    style,
    exmgRadioGroupItemStyles,
  ];

  get ripple() {
    return this.mdcRoot.ripple;
  }

  protected createAdapter(): Adapter {
    return {
      ...super.createAdapter(),
      setNativeControlDisabled: (disabled: boolean) => {
        this.formElement.disabled = disabled;
      },
    };
  }

  private changeHandler() {
    this.checked = this.formElement.checked;
    if (this.selectionController) {
      this.selectionController.update(this);
      this.dispatchEvent(
        new CustomEvent(
          'exmg-radio-group-item-changed',
          {detail: {value: this.value}, composed: false, bubbles: true}
        )
      );
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
            type="radio" name="${this.name}"
            .checked="${this.checked}"
            .value="${this.value}"
            @change="${this.changeHandler}"
            @focus="${this.focusHandler}"
            @click="${this.clickHandler}"
          >
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
