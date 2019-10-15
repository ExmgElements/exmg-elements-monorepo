import {customElement, html, LitElement, property, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

// These are the shared styles needed by this element.
type GenericPropertyValues<T, V = unknown> = Map<T, V>;
type Props = Exclude<keyof BreadcrumbsElement, number | symbol>;
type SmartPropertyValue = GenericPropertyValues<Props>;

export const arrowSeparator = html`
  <svg height="24" viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet">
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
  </svg>
`;

export interface BreadcrumbItem {
  href: string;
  content: string;
  selected?: boolean;
  disabled?: boolean;
}

@customElement('exmg-breadcrumb')
export class BreadcrumbsElement extends LitElement {
  @property({type: Object})
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

  static styles = [
    css`
      .container,
      .breadcrumb-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  private renderSeparator(currentIndex: number, lastIndex: number) {
    if (currentIndex === lastIndex) {
      return null;
    }

    if (this.hasCustomSeparator) {
      return html`
        <span class="separator"></span>
      `;
    }

    return html`
      <span class="separator">${this.separatorText || arrowSeparator}</span>
    `;
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
    let preparedItems = this.items.map(item => {
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

  protected render() {
    return html`
      <div class="container">
        ${this.renderItems()}
      </div>
    `;
  }
}
