goog.provide('gmf.import.wmsCapabilityLayertreeComponent');

goog.require('gmf'); // nowebpack
/** @suppress {extraRequire} */
goog.require('gmf.datasource.ExternalDataSourcesManager');
/** @suppress {extraRequire} */
goog.require('ngeo.message.Popup');
goog.require('ol');


gmf.import.wmsCapabilityLayertreeComponent = angular.module('gmfWmscapabilitylayertreenode', [
  gmf.datasource.ExternalDataSourcesManager.module.name,
  ngeo.message.Popup.module.name,
]);


// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('gmf/import/wmsCapabilityLayertreeComponent', require('./wmsCapabilityLayertreeComponent.html'));
// webpack: });


/**
 * @private
 */
gmf.import.wmsCapabilityLayertreeComponent.Controller_ = class {

  /**
   * @param {!gmf.datasource.ExternalDataSourcesManager}
   *     gmfExternalDataSourcesManager GMF service responsible of managing
   *     external data sources.
   * @private
   * @struct
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
    return ol.getUid(layer);
  }
};


gmf.import.wmsCapabilityLayertreeComponent.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<',
    'url': '<'
  },
  controller: gmf.import.wmsCapabilityLayertreeComponent.Controller_,
  templateUrl: () => `${gmf.baseModuleTemplateUrl}/import/wmsCapabilityLayertreeComponent.html` // nowebpack
  // webpack: templateUrl: 'gmf/import/wmsCapabilityLayertreeComponent'
});
