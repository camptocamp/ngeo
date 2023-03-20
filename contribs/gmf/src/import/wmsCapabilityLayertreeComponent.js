import angular from 'angular';

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

import ngeoMessagePopup from 'ngeo/message/Popup.js';

import {getUid as olUtilGetUid} from 'ol/util.js';

import 'bootstrap/js/src/collapse.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfWmscapabilitylayertreenode', [
  gmfDatasourceExternalDataSourcesManager.name,
  ngeoMessagePopup.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    $templateCache.put(
      // @ts-ignore: webpack
      'gmf/import/wmsCapabilityLayertreeComponent',
      require('./wmsCapabilityLayertreeComponent.html')
    );
  }
);

module.value(
  'gmfWmscapabilitylayertreenodeTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfWmscapabilitylayertreenodeTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/import/wmsCapabilityLayertreeComponent';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfWmscapabilitylayertreenodeTemplateUrl Template
 *    function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfWmscapabilitylayertreenodeTemplateUrl($attrs, gmfWmscapabilitylayertreenodeTemplateUrl) {
  return gmfWmscapabilitylayertreenodeTemplateUrl($attrs);
}

/**
 * @private
 * @hidden
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
     */
    this.capabilities;

    /**
     * WMS Capability Layer object.
     * @type {!Object}
     */
    this.layer;

    /**
     * The original server url that was used to build the WMS GetCapabilities
     * request.
     * @type {string}
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
   */
  getUid(layer) {
    return olUtilGetUid(layer);
  }
}

module.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<',
    'url': '<',
  },
  controller: Controller,
  templateUrl: gmfWmscapabilitylayertreenodeTemplateUrl,
});

export default module;
