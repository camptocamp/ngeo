import angular from 'angular';

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

import ngeoMessagePopup from 'ngeo/message/Popup.js';

import {getUid as olUtilGetUid} from 'ol/util.js';

import 'bootstrap/js/src/collapse.js';


const module = angular.module('gmfWmscapabilitylayertreenode', [
  gmfDatasourceExternalDataSourcesManager.name,
  ngeoMessagePopup.name,
]);


module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/import/wmsCapabilityLayertreeComponent', require('./wmsCapabilityLayertreeComponent.html'));
});


module.value('gmfWmscapabilitylayertreenodeTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfWmscapabilitylayertreenodeTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/import/wmsCapabilityLayertreeComponent';
  });


/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfWmscapabilitylayertreenodeTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfWmscapabilitylayertreenodeTemplateUrl($attrs, gmfWmscapabilitylayertreenodeTemplateUrl) {
  return gmfWmscapabilitylayertreenodeTemplateUrl($attrs);
}


/**
 * @private
 */
class Controller {

  /**
   * @param {!import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
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
     * @type {!import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
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
   * @return {string} Unique id for the Capability Layer.
   * @export
   */
  getUid(layer) {
    return olUtilGetUid(layer);
  }
}


module.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<',
    'url': '<'
  },
  controller: Controller,
  templateUrl: gmfWmscapabilitylayertreenodeTemplateUrl
});


export default module;
