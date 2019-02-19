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
              breadcrumb => breadcrumb.href,
              breadcrumb => html`<exmg-link href="${breadcrumb.href}" content="${breadcrumb.label}"></exmg-link>`)
          }
        </nav>
      `;
  }
}
