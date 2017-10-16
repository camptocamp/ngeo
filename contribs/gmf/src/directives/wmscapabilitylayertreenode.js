goog.provide('gmf.wmscapabilitylayertreenodeComponent');

goog.require('gmf');
goog.require('gmf.datasource.ExternalDataSourcesManager');
goog.require('ngeo.CreatePopup');


/**
 * @private
 */
gmf.WmscapabilitylayertreenodeController = class {

  /**
   * @param {!gmf.ExternalDataSourcesManager} gmfExternalDataSourcesManager
   *     GMF service responsible of managing external data sources.
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


    // Injected properties

    /**
     * @type {!gmf.ExternalDataSourcesManager}
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
      this.capabilities
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


gmf.module.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<'
  },
  controller: gmf.WmscapabilitylayertreenodeController,
  templateUrl: () => `${gmf.baseTemplateUrl}/wmscapabilitylayertreenode.html`
});
