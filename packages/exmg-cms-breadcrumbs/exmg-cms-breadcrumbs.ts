import {LitElement, html, TemplateResult} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';

import {arrowSeparator} from './exmg-cms-breadcrumbs-icons.js';
import {style as exmgCmsBreadcrumbsStyles} from './styles/exmg-cms-breadcrumbs-styles-css.js';

type GenericPropertyValues<T, V = unknown> = Map<T, V>;
type Props = Exclude<keyof BreadcrumbsElement, number | symbol>;

type SmartPropertyValue = GenericPropertyValues<Props>;

export interface BreadcrumbItem {
  href: string;
  content: string;
  selected?: boolean;
  disabled?: boolean;
}

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
 * `--breadcrumbs-text-color` | Link and separator foreground color | --mdc-theme-on-primary or `#ffffff`
 * `--breadcrumbs-background-color` | Breadcrumb container background color | --mdc-theme-primary or `#0071dc`
 * `--breadcrumbs-container-height` | Breadcrumb container height | `56px`
 * `--breadcrumbs-container-width` | Breadcrumb container width | `100%`
 * `--breadcrumbs-container-padding-left` | Breadcrumb container padding-left | `10px`
 * `--breadcrumbs-item-separator-padding` | Breadcrumb separator left and right padding | `0`
 * `--breadcrumbs-item-link-height` | Breadcrumb link height | `24px`
 * `--breadcrumbs-item-link-inactive-opacity` | Breadcrumb inactive link opacity | `0.5`
 * `--breadcrumbs-item-separator-size` | Breadcrumb separator size (width, height) | `24px`
 * `--breadcrumbs-item-separator-background-url` | Breadcrumb separator background url url('path/to/asset'). To be this var applied attribute has-custom-separator must be set <exmg-cms-breadcrumbs has-custom-separator\></exmg-cms-breadcrumbs\>| `unset`
 */
@customElement('exmg-cms-breadcrumbs')
export class BreadcrumbsElement extends LitElement {
  @property({type: Array})
  items: BreadcrumbItem[] = [];

  @property({type: Number})
  limit?: number;

  /**
   * If true then css var `--breadcrumbs-item-separator-background-url` should be provided. It will be set as
   * background image of separator.
   */
  @property({type: Boolean, attribute: 'has-custom-separator', reflect: true})
  hasCustomSeparator?: boolean;

  @property({type: String, attribute: 'separator-text'})
  separatorText?: string;

  private preparedItems: BreadcrumbItem[] = [];

  static styles = [exmgCmsBreadcrumbsStyles];

  private renderSeparator(currentIndex: number, lastIndex: number) {
    if (currentIndex === lastIndex) {
      return null;
    }

    if (this.hasCustomSeparator) {
      return html` <span class="separator"></span> `;
    }

    return html` <span class="separator">${this.separatorText || arrowSeparator}</span> `;
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
      },
    );
  }

  private prepareItems(): void {
    let preparedItems = this.items.map((item) => {
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
    return html` <div class="container">${this.renderItems()}</div> `;
  }
}
