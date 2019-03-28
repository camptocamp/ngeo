/**
 * @module gmf.datasource.ExternalDataSourcesManager
 */
// TODO - MaxScaleDenominator
// TODO - MinScaleDenominator

import gmfBase from 'gmf/index.js';
import googAsserts from 'goog/asserts.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMiscFile from 'ngeo/misc/File.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceFile from 'ngeo/datasource/File.js';
import ngeoDatasourceFileGroup from 'ngeo/datasource/FileGroup.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoDatasourceOGCGroup from 'ngeo/datasource/OGCGroup.js';
import ngeoDatasourceWMSGroup from 'ngeo/datasource/WMSGroup.js';
import * as olBase from 'ol/index.js';
import {isEmpty} from 'ol/extent.js';
import * as olEvents from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olFormatGPX from 'ol/format/GPX.js';
import olFormatKML from 'ol/format/KML.js';

const exports = class {

  /**
   * External data sources come remote online resources, such as WMS/WMTS
   * servers, and also files such as KML/GPX. This service is responsible of
   * creating, storing and managing them.
   *
   * @param {!angularGettext.Catalog} gettextCatalog service.
   * @param {!angular.$injector} $injector Main injector.
   * @param {!angular.$q} $q The Angular $q service.
   * @param {!angular.Scope} $rootScope The rootScope provider.
   * @param {!ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
   * @param {!ngeo.misc.File} ngeoFile Ngeo file.
   * @param {!ngeo.map.LayerHelper} ngeoLayerHelper Ngeo layer helper service
   * @struct
   * @ngInject
   * @ngdoc service
   * @ngname gmfExternalDataSourcesManager
   */
  constructor(gettextCatalog, $injector, $q, $rootScope, ngeoDataSources,
    ngeoFile, ngeoLayerHelper) {

    // === Injected properties ===

    /**
     * @type {!angular.$injector}
     * @private
     */
    this.injector_ = $injector;

    /**
     * @type {!angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.rootScope_ = $rootScope;

    /**
     * The collection of DataSources from ngeo. When this service creates
     * a data source, its gets added to that collection.
     * @type {!ngeox.datasource.DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {!ngeo.misc.File}
     * @private
     */
    this.ngeoFile_ = ngeoFile;

    /**
     * @type {!ngeo.map.LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;


    // === Inner properties ===

    /**
     * All external data sources that are created are stored here. The key
     * is the data source id.
     *
     * Note: This cache is never cleaned and elements are never removed from it.
     * If a data source with an id already exists in this cache, it is used
     * instead of being re-created.
     *
     * @type {Object.<number, !ngeo.datasource.OGC|!ngeo.datasource.File>}
     * @private
     */
    this.extDataSources_ = {};

    /**
     * File external data sources, with the key being the file name.
     * @type {Object.<string, !ngeo.datasource.File>}
     * @private
     */
    this.files_ = {};

    /**
     * @type {?ol.Map}
     * @private
     */
    this.map_ = null;

    /**
     * Group that contains file data sources.
     * @type {!ngeo.datasource.FileGroup}
     * @private
     */
    this.fileGroup_ = new ngeoDatasourceFileGroup({
      dataSources: [],
      injector: this.injector_,
      title: gettextCatalog.getString('Local files')
    });

    /**
     * Collection of WMS groups.
     * @type {!ol.Collection.<!ngeo.datasource.WMSGroup>}
     * @private
     */
    this.wmsGroupsCollection_ = new olCollection();

    /**
     * Collection of groups for WMTS data sources.
     * @type {!ol.Collection.<!ngeo.datasource.OGCGroup>}
     * @private
     */
    this.wmtsGroupsCollection_ = new olCollection();

    /**
     * Cache that stores the information of a WMTS data source. The key is the
     * data source id.
     * @type {!Object.<number, gmfx.datasource.ExternalDataSourcesManagerWMTSCacheItem>}
     * @private
     */
    this.wmtsCache_ = {};

    olEvents.listen(this.dataSources_, 'remove', this.handleDataSourcesRemove_, this);
  }


  // === File Group ===

  /**
   * @return {!ngeo.datasource.FileGroup} File group.
   * @export
   */
  get fileGroup() {
    return this.fileGroup_;
  }


  // === WMS Groups ===

  /**
   * @param {!ngeo.datasource.WMSGroup} wmsGroup WMS group.
   * @private
   */
  addWMSGroup_(wmsGroup) {
    this.wmsGroupsCollection.push(wmsGroup);
  }

  /**
   * @param {!ngeo.datasource.WMSGroup} wmsGroup WMS group.
   * @private
   */
  removeWMSGroup_(wmsGroup) {
    this.wmsGroupsCollection.remove(wmsGroup);
  }

  /**
   * @param {string} url Online resource url
   * @return {?ngeo.datasource.WMSGroup} WMS group.
   */
  getWMSGroup(url) {
    let found = null;
    for (const wmsGroup of this.wmsGroups) {
      if (wmsGroup.url === url) {
        found = wmsGroup;
        break;
      }
    }
    return found;
  }

  /**
   * @return {!Array.<!ngeo.datasource.WMSGroup>} List of WMS groups.
   * @export
   */
  get wmsGroups() {
    return this.wmsGroupsCollection_.getArray();
  }

  /**
   * @return {!ol.Collection.<!ngeo.datasource.WMSGroup>} Collection of WMS
   *     groups.
   * @export
   */
  get wmsGroupsCollection() {
    return this.wmsGroupsCollection_;
  }


  // === WMTS Groups ===

  /**
   * @param {!ngeo.datasource.OGCGroup} wmtsGroup Group for WMTS data sources.
   * @private
   */
  addWMTSGroup_(wmtsGroup) {
    this.wmtsGroupsCollection.push(wmtsGroup);
  }

  /**
   * @param {!ngeo.datasource.OGCGroup} wmtsGroup Group for WMTS data sources.
   * @private
   */
  removeWMTSGroup_(wmtsGroup) {
    this.wmtsGroupsCollection.remove(wmtsGroup);
  }

  /**
   * @param {string} url Online resource url
   * @return {?ngeo.datasource.OGCGroup} WMTS group.
   */
  getWMTSGroup(url) {
    let found = null;
    for (const wmtsGroup of this.wmtsGroups) {
      if (wmtsGroup.url === url) {
        found = wmtsGroup;
        break;
      }
    }
    return found;
  }

  /**
   * @return {!Array.<!ngeo.datasource.OGCGroup>} List of groups for WMTS data
   *     sources.
   * @export
   */
  get wmtsGroups() {
    return this.wmtsGroupsCollection_.getArray();
  }

  /**
   * @return {!ol.Collection.<!ngeo.datasource.OGCGroup>} Collection of groups
   *     for WMTS data sources.
   * @export
   */
  get wmtsGroupsCollection() {
    return this.wmtsGroupsCollection_;
  }


  // === Other methods ===

  /**
   * @param {!ngeo.datasource.DataSource} dataSource Data source
   * @return {boolean} Whether the given data source is external or not. To
   *     be considered external, it needs to be in the external data source
   *     hash (cache).
   */
  isExternalDataSource(dataSource) {
    return !!this.extDataSources_[dataSource.id];
  }

  /**
   * @return {ol.layer.Group} Layer group where to push layers created by
   *     this service.
   */
  get layerGroup() {
    const map = this.map_;
    googAsserts.assert(map);
    return this.ngeoLayerHelper_.getGroupFromMap(
      map,
      gmfBase.EXTERNALLAYERGROUP_NAME
    );
  }

  /**
   * @param {?ol.Map} map Map
   */
  set map(map) {
    this.map_ = map;
  }

  /**
   * @param {ol.layer.Layer} layer Layer.
   * @private
   */
  addLayer_(layer) {
    this.layerGroup.getLayers().push(layer);
  }

  /**
   * @param {ol.layer.Layer} layer Layer.
   * @private
   */
  removeLayer_(layer) {
    this.layerGroup.getLayers().remove(layer);
  }

  /**
   * @param {!Object} layer WMS Capability Layer object.
   * @param {!Object} capabilities  WMS Capabilities definition
   * @param {string} url The WMS service url.
   * @export
   */
  createAndAddDataSourceFromWMSCapability(layer, capabilities, url) {

    const id = exports.getId(layer);
    const service = capabilities['Service'];

    url = service['OnlineResource'] || url;

    let dataSource;

    // (1) Get data source from cache if it exists, otherwise create it
    if (this.extDataSources_[id]) {
      dataSource = this.extDataSources_[id];
    } else {
      const req = capabilities['Capability']['Request'];

      // ogcImageType
      const formats = req['GetMap']['Format'];
      const imagePngType = 'image/png';
      const ogcImageType = formats.includes(imagePngType) ?
        imagePngType : formats[0];

      // wmsInfoFormat
      const infoFormats = req['GetFeatureInfo']['Format'];
      const wmsInfoFormat = infoFormats.includes(
        ngeoDatasourceOGC.WMSInfoFormat.GML
      ) ? ngeoDatasourceOGC.WMSInfoFormat.GML : undefined;

      // queryable
      const queryable = layer['queryable'] === true &&
          wmsInfoFormat !== undefined;

      // TODO - MaxScaleDenominator
      // TODO - MinScaleDenominator
      dataSource = new ngeoDatasourceOGC({
        id: id,
        name: layer['Title'],
        ogcImageType: ogcImageType,
        ogcLayers: [{
          name: layer['Name'],
          queryable: queryable
        }],
        ogcType: ngeoDatasourceOGC.Type.WMS,
        visible: true,
        wmsInfoFormat: wmsInfoFormat,
        wmsUrl: url
      });

      // Keep a reference to the external data source in the cache
      this.extDataSources_[id] = dataSource;
    }


    // (2) Add data source in WMS group, unless it's already in there.
    //     Will also add the data source to the `ngeo.DataSources` collection.
    //     If the group is created, its inner OL layer is also added to the map.
    let wmsGroup = this.getWMSGroup(url);
    if (wmsGroup) {
      if (!wmsGroup.dataSources.includes(dataSource)) {
        wmsGroup.addDataSource(dataSource);
        this.dataSources_.push(dataSource);
      }
    } else {
      wmsGroup = new ngeoDatasourceWMSGroup({
        dataSources: [dataSource],
        injector: this.injector_,
        title: service['Title'],
        url: url
      }, this.ngeoLayerHelper_);
      this.addLayer_(wmsGroup.layer);
      this.addWMSGroup_(wmsGroup);
      this.dataSources_.push(dataSource);
    }
  }

  /**
   * @param {!Object} layer WTMS Capability Layer object.
   * @param {!Object} capabilities  WMTS Capabilities definition
   * @param {string} wmtsUrl The WMTS capabilities url
   * @export
   */
  createAndAddDataSourceFromWMTSCapability(layer, capabilities, wmtsUrl) {
    const id = exports.getId(layer);

    // (1) No need to do anything if there's already a WMTS data source (and its
    // layer in the map)
    if (this.wmtsCache_[id]) {
      return;
    }

    let dataSource;

    // (2) Get data source from cache if it exists, otherwise create it
    if (this.extDataSources_[id]) {
      dataSource = this.extDataSources_[id];
    } else {

      const name = googAsserts.assertString(layer['Title']);
      const wmtsLayer = googAsserts.assertString(layer['Identifier']);

      // TODO - MaxScaleDenominator
      // TODO - MinScaleDenominator
      dataSource = new ngeoDatasourceOGC({
        id: id,
        name: name,
        ogcType: ngeoDatasourceOGC.Type.WMTS,
        visible: true,
        wmtsLayer: wmtsLayer,
        wmtsUrl: wmtsUrl
      });

      // Keep a reference to the external data source in the cache
      this.extDataSources_[id] = dataSource;
    }

    // (3) Get/Create group, then add data source to group
    let wmtsGroup = this.getWMTSGroup(wmtsUrl);
    if (!wmtsGroup) {
      wmtsGroup = new ngeoDatasourceOGCGroup({
        dataSources: [],
        title: capabilities['ServiceIdentification']['Title'],
        url: wmtsUrl
      });
      this.addWMTSGroup_(wmtsGroup);
    }
    wmtsGroup.addDataSource(dataSource);

    // (4) Create and add the OL layer
    const layerObj = this.ngeoLayerHelper_.createWMTSLayerFromCapabilititesObj(
      capabilities,
      layer
    );
    this.addLayer_(layerObj);

    // (5) Add data source to ngeo collection
    this.dataSources_.push(dataSource);

    // (6) Create and set WMTS cache item
    this.wmtsCache_[id] = {
      layerObj: layerObj,
      // This watcher synchronizes the data source visible property to
      // the OL layer object visible property
      unregister: this.rootScope_.$watch(
        () => dataSource.visible,
        this.handleWMTSDataSourceVisibleChange_.bind(this, layerObj)
      )
    };
  }

  /**
   * @param {!File} file File.
   * @param {function(boolean):*?} opt_callback Callback called with true if the file is loaded and added.
   *     Otherwise with false.
   * @export
   */
  createAndAddDataSourceFromFile(file, opt_callback) {
    this.getFileDataSource_(file).then(
      (dataSource) => {
        let success = true;
        const fileGroup = this.fileGroup_;

        // Look if the extent is valid (and so at least one geometry)
        if (isEmpty(dataSource.extent)) {
          success = false;

        } else {
          // (1) No need to do anything if the file has already been added...
          if (fileGroup.dataSources.includes(dataSource)) {
            return;
          }

          // (2) Okay, we need to add this data source. First, add its layer  to the map.
          this.addLayer_(dataSource.layer);

          // (3) Add it to the file group
          fileGroup.addDataSource(dataSource);

          // (4) Recenter the map view onto its extent if there is at least one geometry (and so a valid extent)
          this.map_.getView().fit(dataSource.extent);

          // (5) Finally, add it to the ngeo collection
          this.dataSources_.push(dataSource);
        }
        // Call the callback.
        if (opt_callback) {
          opt_callback(success);
        }
      },
      (rejections) => {
        console.error(`Failed to load file: ${file.name}`);
        if (opt_callback) {
          opt_callback(false);
        }
      }
    );
  }

  /**
   * Get file data source from cache, else create, store and return a new one.
   * @param {!File} file File.
   * @return {!angular.$q.Promise} Promise
   * @private
   */
  getFileDataSource_(file) {

    const defer = this.q_.defer();

    if (this.files_[file.name]) {
      defer.resolve(this.files_[file.name]);
    } else {
      const ngeoFile = this.ngeoFile_;
      ngeoFile.read(file).then((content) => {
        let features;
        const readOptions = {
          featureProjection: this.map_.getView().getProjection()
        };

        if (ngeoFile.isKml(content)) {
          features = new olFormatKML({extractStyles: false}).readFeatures(content, readOptions);
        } else if (ngeoFile.isGpx(content)) {
          features = new olFormatGPX().readFeatures(content, readOptions);
        }

        if (features) {
          const id = exports.getId(file);

          const dataSource = new ngeoDatasourceFile({
            features: new olCollection(features),
            id: id,
            name: file.name,
            visible: true
          });

          // Keep a reference if both caches
          this.files_[file.name] = dataSource;
          this.extDataSources_[id] = dataSource;

          defer.resolve(dataSource);
        } else {
          defer.reject();
        }
      });
    }

    return defer.promise;
  }

  /**
   * @param {!ol.layer.Tile} layer WMTS layer
   * @param {boolean|undefined} value Current visible property of the DS
   * @param {boolean|undefined} oldValue Old visible property of the DS
   * @private
   */
  handleWMTSDataSourceVisibleChange_(layer, value, oldValue) {
    if (value !== undefined && value !== oldValue) {
      layer.setVisible(value);
    }
  }

  /**
   * Called when a data source is removed from the collection of ngeo data
   * sources. If it's an external data source, remove it from its WMS Group
   *
   * @param {ol.Collection.Event} evt Collection event.
   * @private
   */
  handleDataSourcesRemove_(evt) {
    const dataSource = evt.element;
    if (this.extDataSources_[dataSource.id] === dataSource) {
      if (dataSource instanceof ngeoDatasourceFile) {
        this.removeFileDataSource_(dataSource);
      } else if (dataSource instanceof ngeoDatasourceOGC) {
        this.removeOGCDataSource_(dataSource);
      }
    }
  }

  /**
   * Remove a data source from its group. Remove its layer from the map as well.
   *
   * Note: it is expected that the data source has already been removed
   * from the ngeo collection.
   *
   * @param {!ngeo.datasource.File} dataSource External File data source.
   * @private
   */
  removeFileDataSource_(dataSource) {
    this.removeLayer_(dataSource.layer);
    this.fileGroup_.removeDataSource(dataSource);
  }

  /**
   * Remove the data source from its group. If the group no longer has
   * any data source in it, it is removed then destroyed and its layer is
   * removed from the map.
   *
   * Note: it is expected that the data source has already been removed
   * from the ngeo collection.
   *
   * @param {!ngeo.datasource.OGC} dataSource External OGC data source.
   * @private
   */
  removeOGCDataSource_(dataSource) {
    if (dataSource.ogcType === ngeoDatasourceOGC.Type.WMS) {
      // WMS data source
      const url = dataSource.wmsUrl;
      googAsserts.assert(url);

      const wmsGroup = this.getWMSGroup(url);
      if (wmsGroup && wmsGroup.dataSources.includes(dataSource)) {
        // Remove from group
        wmsGroup.removeDataSource(dataSource);

        // In case we removed the last data source from the group, then remove
        // and destroy the group, and remove the layer from the map as well.
        if (!wmsGroup.dataSources.length) {
          this.removeLayer_(wmsGroup.layer);
          wmsGroup.destroy();
          this.removeWMSGroup_(wmsGroup);
        }
      }
    } else if (dataSource.ogcType === ngeoDatasourceOGC.Type.WMTS) {
      // WMTS data source
      const url = dataSource.wmtsUrl;
      googAsserts.assert(url);

      const wmtsGroup = this.getWMTSGroup(url);
      if (wmtsGroup && wmtsGroup.dataSources.includes(dataSource)) {
        // Remove from group
        wmtsGroup.removeDataSource(dataSource);

        // Remove the cache item, in addition to removing the layer from the
        // map and unregister the watcher
        const id = dataSource.id;
        this.removeLayer_(this.wmtsCache_[id].layerObj);
        this.wmtsCache_[id].unregister();
        delete this.wmtsCache_[id];

        // In case we removed the last data source from the group, then remove
        // and destroy the groug.
        if (!wmtsGroup.dataSources.length) {
          wmtsGroup.destroy();
          this.removeWMTSGroup_(wmtsGroup);
        }
      }
    }
  }
};


/**
 * Get the data source id from a WMS or WMTS Capability Layer object, or
 * from a File object.
 *
 * Please, note that this is used to generate a unique id for the created
 * external data sources and since a WMS/WMTS Capability Layer objects don't
 * natively contains an id by themselves, then it is programmatically generated
 * using the `ol.getUid` method, plus a million.
 *
 * @param {!Object} layer WMS/WMTS Capability Layer object.
 * @return {number} Data source id.
 * @export
 */
exports.getId = function(layer) {
  return olBase.getUid(layer) + 1000000;
};


exports.module = angular.module('gmfExternalDataSourcesManager', [
  ngeoMapLayerHelper.module.name,
  ngeoMiscFile.module.name,
  ngeoDatasourceDataSources.module.name,
]);
exports.module.service('gmfExternalDataSourcesManager',
  exports);


export default exports;
