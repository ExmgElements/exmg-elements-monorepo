import {customElement, html, LitElement} from 'lit-element';
import '@polymer/paper-card/paper-card.js';
import {contacts} from './contacts.js';  
import {ExmgGridUtil} from '../exmg-grid-util.js';
import '../exmg-grid.js';
import '../exmg-grid-header-cell.js';
import '../exmg-grid-cell.js';
import '../exmg-grid-row.js';

@customElement('simple-demo')
export class SimpleDemo extends ExmgGridUtil(LitElement) {

  constructor() {
    super();
    this.sortDirection = 'ASC';
    this.sorted = 'name';

    /* Simulate async data */
    setTimeout(_ => this.items = contacts, 1000);
  }

  protected render() {
    return html`
    <style>
      paper-card > * {
        width: 100%;
      }
      h2,
      paper-card {
        display: block;
        max-width: 936px;
        margin: 32px auto;
        width: 100%;
      }
    </style>

    <h2>Simple Table [${this.sorted} ${this.sortDirection}]</h2>

    <paper-card elevation="1">
      <!-- DataTable -->
      <exmg-grid>
        <exmg-grid-row> 
          <exmg-grid-header-cell sortable="name" sorted=${this.sorted} sortDirection=${this.sortDirection}>Name</exmg-grid-header-cell>
          <exmg-grid-header-cell sortable="email" sorted=${this.sorted} sortDirection=${this.sortDirection}>Email</exmg-grid-header-cell>
          <exmg-grid-header-cell>Phone</exmg-grid-header-cell>
          <exmg-grid-header-cell>Address</exmg-grid-header-cell>
          <exmg-grid-header-cell>City</exmg-grid-header-cell>
          <exmg-grid-header-cell>Country</exmg-grid-header-cell>
          <exmg-grid-header-cell align="right">Login Count</exmg-grid-header-cell>
        </exmg-grid-row>
        ${this.grid().map(c => html`
          <exmg-grid-row> 
            <exmg-grid-cell>${c.name}</exmg-grid-cell>
            <exmg-grid-cell>${c.email}</exmg-grid-cell>
            <exmg-grid-cell>${c.phone}</exmg-grid-cell>
            <exmg-grid-cell>${c.address}</exmg-grid-cell>
            <exmg-grid-cell>${c.city}</exmg-grid-cell>
            <exmg-grid-cell>${c.country}</exmg-grid-cell>
            <exmg-grid-cell align="right">${c.integer}</exmg-grid-cell>
          </exmg-grid-row>
        `)}
        ${this.loading()}
      </exmg-grid>
    </paper-card>
  `;
  }
}