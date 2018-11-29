/**
 * @module gmf.import.wmsCapabilityLayertreeComponent
 */

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

import ngeoMessagePopup from 'ngeo/message/Popup.js';

import {getUid as olUtilGetUid} from 'ol/util.js';

import 'bootstrap/js/src/collapse.js';


const exports = angular.module('gmfWmscapabilitylayertreenode', [
  gmfDatasourceExternalDataSourcesManager.module.name,
  ngeoMessagePopup.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/import/wmsCapabilityLayertreeComponent', require('./wmsCapabilityLayertreeComponent.html'));
});


exports.value('gmfWmscapabilitylayertreenodeTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfWmscapabilitylayertreenodeTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/import/wmsCapabilityLayertreeComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfWmscapabilitylayertreenodeTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfWmscapabilitylayertreenodeTemplateUrl($attrs, gmfWmscapabilitylayertreenodeTemplateUrl) {
  return gmfWmscapabilitylayertreenodeTemplateUrl($attrs);
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
   * @ngInject
   * @ngdoc controller
   * @ngname GmfWmscapabilitylayertreenodeController
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
     * WMS Capability Layer object.
     * @type {!Object}
     * @export
     */
    this.layer;

    /**
     * The original server url that was used to build the WMS GetCapabilities
     * request.
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
   * @param {!Object} layer WMS Capability Layer object
   * @export
   */
  createAndAddDataSource(layer) {
    this.gmfExternalDataSourcesManager_.createAndAddDataSourceFromWMSCapability(
      layer,
      this.capabilities,
      this.url
    );
  }

  /**
   * @param {!Object} layer WMS Capability Layer object
   * @return {number} Unique id for the Capability Layer.
   * @export
   */
  getUid(layer) {
    return olUtilGetUid(layer);
  }
};


exports.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<',
    'url': '<'
  },
  controller: exports.Controller_,
  templateUrl: gmfWmscapabilitylayertreenodeTemplateUrl
});


export default exports;
