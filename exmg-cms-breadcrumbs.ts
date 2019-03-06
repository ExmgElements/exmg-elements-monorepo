import {LitElement, html, property, customElement, TemplateResult} from 'lit-element';

@customElement('exmg-cms-breadcrumbs')
export class Breadcrumbs extends LitElement {
  @property({type: Object})
  private items: object[] = [];

  static styles = [];

  protected render(): TemplateResult | void {
    if (!this.items.length) {
      return html``;
    }
  }
}
