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

  connectedCallback(): void {
    super.connectedCallback();

    this.observer = new MutationObserver((mutationsList) => {
      setTimeout(() => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            this.actionsCount = this.querySelector('div[slot=actions]')!.childElementCount;
            this.settingsCount = this.querySelector('div[slot=settings]')!.childElementCount;
            this.active = this.actionsCount > 0;
          }
        }
      }, 60);
    });

    this.actionsCount = this.querySelector('div[slot=actions]')!.childElementCount;
    this.settingsCount = this.querySelector('div[slot=settings]')!.childElementCount;
    this.active = this.actionsCount > 0;
    this.observer!.observe(this, {attributes: false, childList: true, subtree: true});
  }

  disconnectedCallback(): void {
    this.observer!.disconnect();
  }

  render() {
    console.log('actionsCount', this.actionsCount);
    console.log('settingsCount', this.settingsCount);
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
