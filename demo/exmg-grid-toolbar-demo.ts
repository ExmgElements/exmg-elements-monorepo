import {LitElement, html, customElement} from 'lit-element';
import {Action} from '../exmg-grid-toolbar-types';

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

  constructor() {
    super();
  }

  render() {
    return html`
        <exmg-grid-toolbar
            .actions="${this.actions}"
        ></exmg-grid-toolbar>
    `;
  }
}
