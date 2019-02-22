import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

// These are the shared styles needed by this element.
import {SharedStyles} from './shared-styles';

import {BreadcrumbItem} from '../../src/actions/router';
import '../../src/components/exmg-link';

@customElement('exmg-breadcrumb')
export class ExmgBreadcrumb extends LitElement {
  @property({type: Array})
  breadcrumbs: BreadcrumbItem[] = [];
  static styles = SharedStyles;

  private renderBreadcrumbItem(breadcrumb: BreadcrumbItem) {
    const isLast = this.breadcrumbs[this.breadcrumbs.length - 1] === breadcrumb;
    if (isLast || breadcrumb.disabled) {
      return html`<a href="javascript:void(0)">${breadcrumb.label}</a>`;
    }

    return html`
      <exmg-link ?disabled="${breadcrumb.disabled}"><a href="${breadcrumb.href}">${breadcrumb.label}</a></exmg-link>
    `;
  }
  protected render() {
    if (this.breadcrumbs.length === 0) {
      return html``;
    }

    return html`
        <nav>
          <span>Breadcrumbs: </span>
          ${
            repeat(
              this.breadcrumbs,
              breadcrumb => `${breadcrumb.href}-${breadcrumb.path}`,
              breadcrumb => this.renderBreadcrumbItem(breadcrumb),
            )
          }
        </nav>
      `;
  }
}
