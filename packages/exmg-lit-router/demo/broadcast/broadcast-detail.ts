import {customElement, html, property} from 'lit-element';

// These are the shared styles needed by this element.
import {SharedStyles} from '../components/shared-styles';
import {RootState} from '../store';
import {RouterState, PageLitElement} from '../../index';

import {BeforeEnterCommand, EmptyCommand, Location, Router} from '@vaadin/router';

@customElement('broadcast-detail')
export class BroadcastDetail extends PageLitElement<RootState> {
  static styles = SharedStyles;

  @property({type: Object})
  public router: Partial<RouterState> = {};

  stateChanged(state: RootState) {
    this.router = state.router;
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('detail connectedCallback');
  }

  protected render() {
    /* tslint:disable: max-line-length */
    return html`
      <section>
        <h2>Broadcast page - detail</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
    `;
  }

  onAfterLeave(location: Location, command: EmptyCommand, router: Router) {
    console.log('detail onAfterLeave', location, command, router);
  }

  onBeforeEnter(location: Location, command: BeforeEnterCommand, router: Router) {
    console.log('detail onBeforeEnter', location, command, router);
  }
}
