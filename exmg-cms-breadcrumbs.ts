import {LitElement, html, property, customElement, TemplateResult} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

import '@polymer/iron-icon/iron-icon.js';
import './exmg-cms-breadcrumbs-icons';
import exmgCmsBreadcrumbsStyles from './exmg-cms-breadcrumbs-styles';

type GenericPropertyValues<T, V = unknown> = Map<T, V>;
type Props = Exclude<keyof BreadcrumbsElement, number | Symbol>;

type SmartPropertyValue = GenericPropertyValues<Props>;

export type BreadcrumbItem = {
  href: string;
  content: string;
  selected?: boolean;
  disabled?: boolean;
};

/**
 * `exmg-cms-breadcrumbs` is component to visualize router  tree state"
 *
 * Example:
 * ```html
 * <exmg-cms-breadcrumbs
 * .items="${[{"href": "/home", content: "Home page", selected: false}, {"href": "/users", content: "User List", selected: true}]}"
 * style=""
 * limit="5"
 * >
 * </exmg-cms-breadcrumbs>
 * ```
 *
 * ### Styling
 * The following custom properties and mixins are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--breadcrumbs-text-color` | Link and separator foreground color | `#ffffff`
 * `--breadcrumbs-background-color` | Breadcrumb container background color | `#0071dc`
 * `--breadcrumbs-container-height` | Breadcrumb container height | `56px`
 * `--breadcrumbs-container-width` | Breadcrumb container width | `100%`
 * `--breadcrumbs-container-padding-left` | Breadcrumb container padding-left | `10px`
 * `--breadcrumbs-item-separator-padding` | Breadcrumb separator left and right padding | `0`
 * `--breadcrumbs-item-link-height` | Breadcrumb link height | `24px`
 * `--breadcrumbs-item-link-inactive-opacity` | Breadcrumb inactive link opacity | `0.5`
 * `--breadcrumbs-item-separator-size` | Breadcrumb separator size (width, height) | `24px`
 */
@customElement('exmg-cms-breadcrumbs')
export class BreadcrumbsElement extends LitElement {
  @property({type: Object})
  items: BreadcrumbItem[] = [];

  @property({type: Number})
  limit?: number;

  @property({type: String, attribute: 'separator-icon'})
  separatorIcon?: string;

  @property({type: String, attribute: 'separator-text'})
  separatorText?: string;

  private preparedItems: BreadcrumbItem[] = [];

  static styles = [
    exmgCmsBreadcrumbsStyles,
  ];

  private renderSeparator(currentIndex: number, lastIndex: number) {
    if (currentIndex === lastIndex) {
      return null;
    }

    if (this.separatorText) {
      return html`<span class="separator">${this.separatorText}</span>`;
    }

    return html` <iron-icon class="separator" icon="${this.separatorIcon || 'exmg-cms-breadcrumbs-icons:arrow-separator'}"></iron-icon>`;
  }

  private renderItems() {
    const lastIndex = this.preparedItems.length - 1;
    return repeat(
      this.preparedItems,
      ({href, content}) => `${href}${content}`,
      ({href, content, selected, disabled}, index) => {
        return html`
          <div class="breadcrumb-item">
            <a href=${href} ?inactive="${!selected}" ?disabled="${disabled}">${content}</a>
            ${this.renderSeparator(index, lastIndex)}
          </div>
      `;
      }
      );
  }

  private prepareItems(): void {
    let preparedItems = this.items
      .map(item => {
        const {href, disabled} = item;
        const isDisabled = !href || !!disabled;

        return {
          ...item,
          href: isDisabled ? 'javascript:void(0);' : href,
          disabled: isDisabled,
        };
    });

    if (this.limit && this.limit < preparedItems.length) {
      const headLength = Math.floor(this.limit / 2);
      const tailLength = this.limit - headLength;
      preparedItems = preparedItems.filter((_, index: number) => index < headLength || index > tailLength);
    }

    this.preparedItems = preparedItems;
  }

  protected update(changedProperties: SmartPropertyValue): void {
    if (changedProperties.has('items') || changedProperties.has('limit')) {
      this.prepareItems();
    }

    super.update(changedProperties);
  }

  protected render(): TemplateResult | void {
    return html`
      <div class="container">
        ${this.renderItems()}
      </div>
    `;
  }
}
