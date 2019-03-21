import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

@customElement('exmg-grid-base-toolbar-demo')
export class ExmgGridBaseToolbarDemo extends LitElement {
  @property({type: Object})
  private actions: any[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
    },
    {
      id: 'merge',
      text: '',
      tooltip: 'Merge',
      icon: 'merge_type',
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
    },
  ];

  private description: string = 'Table 1';

  private filters: any[] = [
    {
      id: 'status',
      name: 'Status',
      config: {
        data: [
          {
            id: 'active',
            title: 'Active',
          },
          {
            id: 'inactive',
            title: 'Inactive',
          },
          {
            id: 'archived',
            title: 'Archived',
          },
        ],
      },
    },
  ];

  private onToolbarActionExecuted(e: CustomEvent) {
    console.log('onToolbarActionExecuted', e.detail);
  }

  private onActionExecuted(action: any) {
    return (event: Event) => {
      console.log('onActionExecuted', action, event);
    };
  }

  private onFilterChanged(filter: any) {
    return (event: Event) => {
      console.log('onFilterChanged', filter, event);
    };
  }

  private removeOneAction() {
    this.actions.shift();
    this.actions = [...this.actions];
  }

  render() {
    return html`
        <style>
          :host {
            --mdc-theme-primary: #0071dc;
            --mdc-theme-on-surface: #02182B;
            --exmg-grid-active-color: #e2f1fe;
          }
        </style>
        <h1>With actions</h1>
        <button @click="${this.removeOneAction}">Remove one action</button>
        <hr>
        <exmg-grid-base-toolbar
            @exmg-grid-base-toolbar-action-executed="${this.onToolbarActionExecuted}"
        >
          <div slot="actions">
            ${repeat(
              this.actions,
                (action) => {
                return html`
                  <mwc-button
                    class="action"
                    label="${action.text}"
                    title="${action.tooltip}"
                    @click="${this.onActionExecuted(action)}"
                  >
                      <mwc-icon>${action.icon}</mwc-icon>
                      ${action.text}
                  </mwc-button>
                `;
              }
            )}
          </div>
          <div slot="description">${this.description}</div>
          <div slot="filters">
            ${repeat(
              this.filters,
                (filter) => {
                return html`
                  <select @change="${this.onFilterChanged(filter)}">
                    ${repeat(
                      filter.config.data,
                        (item: any) => {
                        return html`<option value="${item.id}">${filter.name}: ${item.title}</option>`;
                      }
                    )}
                  </select>
                `;
              }
            )}
          </div>
        </exmg-grid-base-toolbar>
    `;
  }
}
