import {property, customElement, html, LitElement} from 'lit-element';
import {observer} from '@material/mwc-base/form-element.js';
import {exmgRadioGroupStyles} from './exmg-radio-group-styles';
import {ExmgRadioGroupItem} from './exmg-radio-group-item';

@customElement('exmg-radio-group')
export class ExmgRadioGroup extends LitElement {
  @property({type: String})
  name?: string;

  @property({type: String, reflect: true})
  @observer(function (this: ExmgRadioGroup) {
    this.setProperSelectedItem();
  })
  selected: string = '';

  @property({type: Boolean})
  required: boolean = false;

  @property({type: Boolean})
  vertical: boolean = false;

  @property({type: Boolean, reflect: true, attribute: 'invalid'})
  private invalid: boolean = false;

  private litItemName: string = '';

  get value() {
    return this.selected;
  }

  set value(value) {
    this.selected = value;
  }

  public validate(): boolean {
    this.invalid =
      this.required
      && !this.selected;

    return !this.invalid;
  }

  static styles = [
    exmgRadioGroupStyles,
  ];

  private handleRadioGroupItemChanged(e: Event) {
    const {detail} = <CustomEvent>e;

    this.selected = detail.value;

    this.dispatchEvent(
      new CustomEvent(
        'exmg-radio-group-changed',
        {detail: {selected: this.selected}, composed: true, bubbles: true}
      )
    );
  }

  private setProperSelectedItem() {
    this.querySelectorAll('exmg-radio-group-item').forEach((item: Element) => {
      const litItem = <ExmgRadioGroupItem>item;

      litItem.name = this.litItemName;
      litItem.checked = (this.selected === litItem.value);
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('exmg-radio-group-item-changed', this.handleRadioGroupItemChanged);

    this.litItemName = `_${this.name}-options`;

    this.setProperSelectedItem();
  }

  disconnectedCallback(): void {
    this.removeEventListener('exmg-radio-group-item-changed', this.handleRadioGroupItemChanged);

    super.disconnectedCallback();
  }

  render() {
    return html`
      <div
        class="radio-group-container ${this.vertical ? 'vertical' : 'horizontal'}"
        ?invalid="${this.invalid}"
      >
        <slot></slot>
      </div>
    `;
  }
}
