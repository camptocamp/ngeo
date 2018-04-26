/**
 * @module gmf.import.wmtsCapabilityLayertreeComponent
 */

/** @suppress {extraRequire} */
import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

/** @suppress {extraRequire} */
import ngeoMessagePopup from 'ngeo/message/Popup.js';

import * as olBase from 'ol/index.js';

const exports = angular.module('gmfWmtscapabilitylayertree', [
  gmfDatasourceExternalDataSourcesManager.module.name,
  ngeoMessagePopup.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/import/wmtsCapabilityLayertreeComponent', require('./wmtsCapabilityLayertreeComponent.html'));
});


exports.value('gmfWmtscapabilitylayertreTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfWmtscapabilitylayertreTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/import/wmtsCapabilityLayertreeComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfWmtscapabilitylayertreTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfWmtscapabilitylayertreTemplateUrl($attrs, gmfWmtscapabilitylayertreTemplateUrl) {
  return gmfWmtscapabilitylayertreTemplateUrl($attrs);
}


/**
 * @private
 */
exports.Controller_ = class {

  /**
   * @param {!gmf.datasource.ExternalDataSourcesManager}
   *     gmfExternalDataSourcesManager GMF service responsible of managing
   *     external data sources.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname GmfWmtscapabilitylayertreeController
   */
  constructor(gmfExternalDataSourcesManager) {

    // Binding properties

    /**
     * WMS Capabilities definition
     * @type {!Object}
     * @export
     */
    this.capabilities;

    /**
     * List of WMTS Capability Layer objects.
     * @type {!Array.<!Object>}
     * @export
     */
    this.layers;

    /**
     * The original WMTS GetCapabilities url that was used to fetch the
     * capability layers.
     * @type {string}
     * @export
     */
    this.url;


    // Injected properties

    /**
     * @type {!gmf.datasource.ExternalDataSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;
  }

  /**
   * @param {!Object} layer WMTS Capability Layer object
   * @export
   */
  createAndAddDataSource(layer) {
    const manager = this.gmfExternalDataSourcesManager_;
    manager.createAndAddDataSourceFromWMTSCapability(
      layer,
      this.capabilities,
      this.url
    );
  }

  /**
   * @param {!Object} layer WMTS Capability Layer object
   * @return {number} Unique id for the Capability Layer.
   * @export
   */
  getUid(layer) {
    return olBase.getUid(layer);
  }
};


exports.component('gmfWmtscapabilitylayertree', {
  bindings: {
    'capabilities': '<',
    'layers': '<',
    'url': '<'
  },
  controller: exports.Controller_,
  templateUrl: gmfWmtscapabilitylayertreTemplateUrl
});


export default exports;
