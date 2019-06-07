import {customElement, html, LitElement, property} from 'lit-element';
import {style} from './exmg-grid-base-toolbar-styles';

/**
 * ### Styling
 * The following custom properties  are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exmg-grid-toolbar-bg-color` | toolbar background color | `var(--mdc-theme-surface, #ffffff);`
 * `--exmg-grid-toolbar-active-bg-color` | active toolbar background color (when .active class present) | `#e1f0fe;`
 * `--exmg-grid-toolbar-color` | toolbar foreground (mostly text) color | `#02182b;`
 * `--exmg-grid-toolbar-setting-position` | Toolbar Settings dialog container position | `relative`
 * `--exmg-grid-toolbar-overflow-x` | Toolbar container overflow-x | `initial`
 */
@customElement('exmg-grid-base-toolbar')
export class ExmgGridBaseToolbar extends LitElement {
  static styles = [
    style,
  ];

  @property({type: Object})
  private actionsCount: number = 0;

  @property({type: Object})
  private settingsCount: number = 0;

  @property({type: Boolean, reflect: true})
  private active: boolean = false;

  private observer?: MutationObserver;

  private getChildElementCount(selector: string): number {
    const element = this.querySelector(selector);
    return element ? element.childElementCount : 0;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.observer = new MutationObserver((mutationsList) => {
      setTimeout(() => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            this.actionsCount = this.getChildElementCount('div[slot=actions]');
            this.settingsCount = this.getChildElementCount('div[slot=settings]');
            this.active = this.actionsCount > 0;
          }
        }
      }, 60);
    });

    this.actionsCount = this.getChildElementCount('div[slot=actions]');
    this.settingsCount = this.getChildElementCount('div[slot=settings]');
    this.active = this.actionsCount > 0;
    this.observer!.observe(this, {attributes: false, childList: true, subtree: true});
  }

  disconnectedCallback(): void {
    this.observer!.disconnect();
  }

  render() {
    return html`
      <div class="wrapper ${this.active ? 'active' : ''}">
        ${
          this.actionsCount > 0 ?
            html`
              <div class="actions">
                <slot name="actions"></slot>
              </div>
            ` :
            ``
        }
        <div class="description ${this.actionsCount > 0 ? 'with-action-separator' : ''}">
          <slot name="description"></slot>
        </div>
        <div class="filters">
          <slot name="filters"></slot>
        </div>
        <div class="settings ${this.settingsCount > 0 ? 'has-settings' : ''}">
          <slot name="settings"></slot>
        </div>
      </div>
    `;
  }
}
