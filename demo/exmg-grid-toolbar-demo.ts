import {LitElement, html, customElement} from 'lit-element';
import {Action, Filter} from '../src/table/exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar-demo')
export class ExmgGridToolbarDemo extends LitElement {
  private actions: Action[] = [
    {
      id: 'export',
      label: '',
      title: 'Export',
      icon: 'cloud_download',
    },
    {
      id: 'delete',
      label: '',
      title: 'Delete',
      icon: 'delete',
    },
  ];

  private tableTitle: string = 'Table 1';

  private filters: Filter[] = [
    {
      id: 'filter1',
      name: 'Filter 1',
    },
  ];

  render() {
    return html`
        <exmg-grid-toolbar
            .actions="${this.actions}"
            title="${this.tableTitle}"
            .filters="${this.filters}"
        ></exmg-grid-toolbar>
    `;
  }
}
