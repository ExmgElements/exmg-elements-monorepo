import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
 * This mixin is used by pages to help navigate sub pages and manage params
 *
 *
 * @polymer
 * @memberof Exmg
 * @demo demo/index.html
 * @mixinFunction
 */
const ExmgCmsPage = (superClass) => class extends superClass {
  static get properties() {
    return {
      queryParams: {
        type: Object,
      },
      route: {
        type: Object,
        notify: true,
      },
      routeTail: Object,
      defaultPage: String,
    };
  }
  /**
  * catch change path event and go to the given url. When ref param is available in query params those
  * params should be used and added to the return url. If ref param is not available it should be added
  * and current params should be stored in ref. This way it is possible to restore the page state after
  * returning from edit or create
  */
  _changePath(e) {
    this.set('route.path', e.detail.path);
    if (this.queryParams.hasOwnProperty('ref')) {
      var searchParams = new URLSearchParams(this.queryParams.ref);
      const ref = [...searchParams.entries()].reduce((obj, item) => {
        obj[item[0]] = item[1];
        return obj;
      }, {});
      this.set('queryParams', ref);
    } else {
      const searchParams = new URLSearchParams();
      const params = this.queryParams;
      Object.keys(params).forEach(key => searchParams.append(key, params[key]));
      this.set('queryParams', {ref: searchParams.toString()});
    }
  }
  /**
  * Helper method to set initial query param. If available return from query param otherwise return default value.
  */
  _initialParamValue(queryParams, propertyName, defaultValue) {
    const isNumber = defaultValue !== '' && !isNaN(defaultValue);
    return isNumber ? Number(queryParams[propertyName] || defaultValue) : queryParams[propertyName] || defaultValue;
  }
  /**
  * Helper method to check if route page is in given pages list
  */
  _isPage(page, pages, activeTail) {
    return activeTail && pages.split('|').indexOf(page) !== -1;
  }
};

export const ExmgCmsPageMixin = dedupingMixin(ExmgCmsPage);
