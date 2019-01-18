/**
 */

import angular from 'angular';

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

import ngeoMessagePopup from 'ngeo/message/Popup.js';

import {getUid as olUtilGetUid} from 'ol/util.js';

const exports = angular.module('gmfWmtscapabilitylayertree', [
  gmfDatasourceExternalDataSourcesManager.name,
  ngeoMessagePopup.name,
]);


module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/import/wmtsCapabilityLayertreeComponent', require('./wmtsCapabilityLayertreeComponent.html'));
});


module.value('gmfWmtscapabilitylayertreTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfWmtscapabilitylayertreTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/import/wmtsCapabilityLayertreeComponent';
  });


/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfWmtscapabilitylayertreTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfWmtscapabilitylayertreTemplateUrl($attrs, gmfWmtscapabilitylayertreTemplateUrl) {
  return gmfWmtscapabilitylayertreTemplateUrl($attrs);
}


/**
 * @private
 */
class Controller {

  /**
   * @param {!import("gmf/datasource/ExternalDataSourcesManager.js").default}
   *     gmfExternalDataSourcesManager GMF service responsible of managing
   *     external data sources.
   * @private
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
     * @type {!import("gmf/datasource/ExternalDataSourcesManager.js").default}
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
    return olUtilGetUid(layer);
  }
}


exports.component('gmfWmtscapabilitylayertree', {
  bindings: {
    'capabilities': '<',
    'layers': '<',
    'url': '<'
  },
  controller: Controller,
  templateUrl: gmfWmtscapabilitylayertreTemplateUrl
});


export default module;
