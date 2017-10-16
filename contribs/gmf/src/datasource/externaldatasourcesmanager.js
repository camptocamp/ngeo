// TODO - MaxScaleDenominator
// TODO - MinScaleDenominator

goog.provide('gmf.datasource.ExternalDataSourcesManager');

goog.require('gmf');
goog.require('gmf.datasource.OGC');
goog.require('ngeo.datasource.DataSources');


gmf.datasource.ExternalDataSourcesManager = class {

  /**
   * External data sources come remote online resources, such as WMS/WMTS
   * servers, and also files such as KML/GXP. This service is responsible of
   * creating, storing and managing them.
   *
   * @param {!angular.$injector} $injector Main injector.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
   *     data sources objects.
   * @struct
   * @ngInject
   * @ngdoc service
   * @ngname gmfExternalDataSourcesManager
   */
  constructor($injector, ngeoDataSources) {

    // === Injected properties ===

    /**
     * The collection of DataSources from ngeo. When this service creates
     * a data source, its gets added to that collection.
     * @type {ngeo.datasource.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;


    // === Inner properties ===

    /**
     * All external data sources that are created are stored here. The key
     * is the data source id.
     * @type {Object.<number, gmf.datasource.OGC>}
     * @private
     */
    this.extDataSources_ = {};

    /**
     * @type {!Object.<string, !gmfx.ExternalOGCServer>}
     * @private
     */
    this.wmsServers_ = {};

    const servers = /** @type {Array.<!gmfx.ExternalOGCServer>|undefined} */ (
      $injector.get('gmfExternalOGCServers'));

    if (servers) {
      for (const server of servers) {
        if (server.type === 'WMS') {
          this.wmsServers_[server.name] = server;
        }
      }
    }
  }

  /**
   * @param {!Object} layer WMS Capability Layer object.
   * @param {!Object} capabilities  WMS Capabilities definition
   * @export
   */
  createAndAddDataSourceFromWMSCapability(layer, capabilities) {

    const id = gmf.datasource.ExternalDataSourcesManager.getId(layer);

    // If a data source with the same id already exists, do nothing
    if (this.extDataSources_[id]) {
      return;
    }

    const service = capabilities['Service'];
    const req = capabilities['Capability']['Request'];

    // ogcImageType
    const formats = req['GetMap']['Format'];
    const imagePngType = 'image/png';
    const ogcImageType = formats.includes(imagePngType) ?
      imagePngType : formats[0];

    // wmsInfoFormat
    const infoFormats = req['GetFeatureInfo']['Format'];
    const wmsInfoFormat = infoFormats.includes(
      ngeo.datasource.OGC.WMSInfoFormat.GML
    ) ? ngeo.datasource.OGC.WMSInfoFormat.GML : undefined;

    // queryable
    const queryable = layer['queryable'] === true &&
          wmsInfoFormat !== undefined;

    // TODO - MaxScaleDenominator
    // TODO - MinScaleDenominator
    const dataSource = new gmf.datasource.OGC({
      id,
      name: layer['Title'],
      ogcImageType,
      ogcLayers: [{
        name: layer['Name'],
        queryable
      }],
      ogcType: ngeo.datasource.OGC.Type.WMS,
      visible: true,
      wmsInfoFormat,
      wmsUrl: service['OnlineResource']
    });

    // Keep a reference to the external data source in the cache
    this.extDataSources_[id] = dataSource;

    // Add the data source
    this.ngeoDataSources_.push(dataSource);
  }
};


/**
 * Get the data source id from a WMS Capability Layer object.
 *
 * Please, note that this is used to generate a unique id for the created
 * external data sources and since a WMS Capability Layer object doesn't
 * natively contains an id by itself, then it is programatically generated
 * using the `ol.getUid` method, plus a million.
 *
 * @param {!Object} layer WMS Capability Layer object.
 * @return {number} Data source id.
 * @export
 */
gmf.datasource.ExternalDataSourcesManager.getId = function(layer) {
  return ol.getUid(layer) + 1000000;
};


gmf.module.service(
  'gmfExternalDataSourcesManager', gmf.datasource.ExternalDataSourcesManager);
