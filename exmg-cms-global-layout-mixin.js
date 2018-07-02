import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
 * Element class mixin that enables collapsible layout.
 *
 *
 * @polymer
 * @memberof Exmg
 * @demo demo/index.html
 * @mixinFunction
 */
const CmsGlobalLayout = (superClass) => class extends superClass {
  static get properties() {
    return {
      narrow: Boolean,
      collapsed: {
        type: Boolean,
        value: false,
      },
    };
  }

  static get observers() {
    return [
      '_observeNarrowChange(narrow)',
      '_observeCollapsed(collapsed)',
    ];
  }

  _observeCollapsed(collapsed) {
    this.updateStyles({'--app-drawer-width': collapsed ? '64px' : '256px'});
  }

  _observeNarrowChange(narrow) {
    if (narrow) {
      this.set('collapsed', false);
    }
  }

  toggleDrawer() {
    this.shadowRoot.querySelector('#drawer').toggle();
  }
};

export const CmsGlobalLayoutMixin = dedupingMixin(CmsGlobalLayout);
