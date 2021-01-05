// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// TODO - MaxScaleDenominator
// TODO - MinScaleDenominator

import angular from 'angular';
import {EXTERNALLAYERGROUP_NAME} from 'gmf/index.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMiscFile from 'ngeo/misc/File.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceFile from 'ngeo/datasource/File.js';
import ngeoDatasourceFileGroup from 'ngeo/datasource/FileGroup.js';
import ngeoDatasourceOGC, {Type, WMSInfoFormat} from 'ngeo/datasource/OGC.js';
import gmfDatasourceFileGroup from 'gmf/datasource/fileGroup.js';
import gmfExternalDatasourceOGC from 'gmf/datasource/ExternalOGC.js';
import ngeoDatasourceOGCGroup from 'ngeo/datasource/OGCGroup.js';
import ngeoDatasourceWMSGroup from 'ngeo/datasource/WMSGroup.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {isEmpty} from 'ol/extent.js';
import {listen} from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olFormatGPX from 'ol/format/GPX.js';
import olFormatKML from 'ol/format/KML.js';
import {CollectionEvent} from 'ol/Collection.js';

/**
 * @typedef {Object} ExternalDataSourcesManagerWMTSCacheItem
 * @property {import("ol/layer/Tile.js").default} layerObj
 * @property {Function} unregister
 */

/**
 * @hidden
 */
export class ExternalDatSourcesManager {
  /**
   * External data sources come remote online resources, such as WMS/WMTS
   * servers, and also files such as KML/GPX. This service is responsible of
   * creating, storing and managing them.
   *
   * @param {angular.gettext.gettextCatalog} gettextCatalog service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.IQService} $q The Angular $q service.
   * @param {angular.IScope} $rootScope The rootScope provider.
   * @param {import('gmf/datasource/fileGroup.js').DatasourceFileGroup} gmfDatasourceFileGroup Group that contains file data sources.
   * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data sources service.
   * @param {import("ngeo/misc/File.js").FileService} ngeoFile Ngeo file.
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo layer helper service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfExternalDataSourcesManager
   */
  constructor(
    gettextCatalog,
    $injector,
    $q,
    $rootScope,
    gmfDatasourceFileGroup,
    ngeoDataSources,
    ngeoFile,
    ngeoLayerHelper
  ) {
    // === Injected properties ===

    /**
     * @type {angular.auto.IInjectorService}
     * @private
     */
    this.injector_ = $injector;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.rootScope_ = $rootScope;

    /**
     * The collection of DataSources from ngeo. When this service creates
     * a data source, its gets added to that collection.
     * @type {import('ngeo/datasource/DataSource.js').DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {import("ngeo/misc/File.js").FileService}
     * @private
     */
    this.ngeoFile_ = ngeoFile;

    /**
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
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
     * @type {Object<number, import("ngeo/datasource/OGC.js").default|import("ngeo/datasource/File.js").default>}
     * @private
     */
    this.extDataSources_ = {};

    /**
     * File external data sources, with the key being the file name.
     * @type {Object<string, import("ngeo/datasource/File.js").default>}
     * @private
     */
    this.files_ = {};

    /**
     * @type {?import("ol/Map.js").default}
     * @private
     */
    this.map_ = null;

    /**
     * Group that contains file data sources.
     * @type {import("ngeo/datasource/FileGroup.js").default}
     * @private
     */
    this.fileGroup_ = new ngeoDatasourceFileGroup({
      dataSources: [],
      injector: this.injector_,
      title: gettextCatalog.getString('Local files'),
    });
    gmfDatasourceFileGroup.fileGroup = this.fileGroup_;

    /**
     * Collection of WMS groups.
     * @type {import("ol/Collection.js").default<import("ngeo/datasource/WMSGroup.js").default>}
     * @private
     */
    this.wmsGroupsCollection_ = new olCollection();

    /**
     * Collection of groups for WMTS data sources.
     * @type {import("ol/Collection.js").default<import("ngeo/datasource/OGCGroup.js").default>}
     * @private
     */
    this.wmtsGroupsCollection_ = new olCollection();

    /**
     * Cache that stores the information of a WMTS data source. The key is the
     * data source id.
     * @type {Object<number, ExternalDataSourcesManagerWMTSCacheItem>}
     * @private
     */
    this.wmtsCache_ = {};

    listen(this.dataSources_, 'remove', this.handleDataSourcesRemove_, this);
  }

  // === File Group ===

  /**
   * @return {import("ngeo/datasource/FileGroup.js").default} File group.
   */
  get fileGroup() {
    return this.fileGroup_;
  }

  // === WMS Groups ===

  /**
   * @param {import("ngeo/datasource/WMSGroup.js").default} wmsGroup WMS group.
   * @private
   */
  addWMSGroup_(wmsGroup) {
    this.wmsGroupsCollection.push(wmsGroup);
  }

  /**
   * @param {import("ngeo/datasource/WMSGroup.js").default} wmsGroup WMS group.
   * @private
   */
  removeWMSGroup_(wmsGroup) {
    this.wmsGroupsCollection.remove(wmsGroup);
  }

  /**
   * @param {string} url Online resource url
   * @return {?import("ngeo/datasource/WMSGroup.js").default} WMS group.
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
   * @return {Array<import("ngeo/datasource/WMSGroup.js").default>} List of WMS groups.
   */
  get wmsGroups() {
    return this.wmsGroupsCollection_.getArray();
  }

  /**
   * @return {import("ol/Collection.js").default<import("ngeo/datasource/WMSGroup.js").default>}
   *    Collection of WMS groups.
   */
  get wmsGroupsCollection() {
    return this.wmsGroupsCollection_;
  }

  // === WMTS Groups ===

  /**
   * @param {import("ngeo/datasource/OGCGroup.js").default} wmtsGroup Group for WMTS data sources.
   * @private
   */
  addWMTSGroup_(wmtsGroup) {
    this.wmtsGroupsCollection.push(wmtsGroup);
  }

  /**
   * @param {import("ngeo/datasource/OGCGroup.js").default} wmtsGroup Group for WMTS data sources.
   * @private
   */
  removeWMTSGroup_(wmtsGroup) {
    this.wmtsGroupsCollection.remove(wmtsGroup);
  }

  /**
   * @param {string} url Online resource url
   * @return {?import("ngeo/datasource/OGCGroup.js").default} WMTS group.
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
   * @return {Array<import("ngeo/datasource/OGCGroup.js").default>} List of groups for WMTS data sources.
   */
  get wmtsGroups() {
    return this.wmtsGroupsCollection_.getArray();
  }

  /**
   * @return {import("ol/Collection.js").default<import("ngeo/datasource/OGCGroup.js").default>}
   *    Collection of groups for WMTS data sources.
   */
  get wmtsGroupsCollection() {
    return this.wmtsGroupsCollection_;
  }

  // === Other methods ===

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source
   * @return {boolean} Whether the given data source is external or not. To
   *     be considered external, it needs to be in the external data source
   *     hash (cache).
   */
  isExternalDataSource(dataSource) {
    return !!this.extDataSources_[dataSource.id];
  }

  /**
   * @return {import("ol/layer/Group.js").default} Layer group where to push layers created by
   *     this service.
   */
  get layerGroup() {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    return this.ngeoLayerHelper_.getGroupFromMap(this.map_, EXTERNALLAYERGROUP_NAME);
  }

  /**
   * @param {?import("ol/Map.js").default} map Map
   */
  set map(map) {
    this.map_ = map;
  }

  /**
   * @param {import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>} layer Layer.
   * @private
   */
  addLayer_(layer) {
    this.layerGroup.getLayers().push(layer);
  }

  /**
   * @param {import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>} layer Layer.
   * @private
   */
  removeLayer_(layer) {
    this.layerGroup.getLayers().remove(layer);
  }

  /**
   * @param {any} layer WMS Capability Layer object.
   * @param {any} capabilities  WMS Capabilities definition
   * @param {?string} url The WMS service url.
   */
  createAndAddDataSourceFromWMSCapability(layer, capabilities, url) {
    const id = getId(layer);
    const service = capabilities.Service;

    const originalUrl = url || service.OnlineResource;

    url = service.OnlineResource || url;

    let dataSource;

    // (1) Get data source from cache if it exists, otherwise create it
    if (this.extDataSources_[id]) {
      dataSource = this.extDataSources_[id];
    } else {
      const req = capabilities.Capability.Request;

      // ogcImageType
      const formats = req.GetMap.Format;
      const imagePngType = 'image/png';
      const ogcImageType = formats.includes(imagePngType) ? imagePngType : formats[0];

      // wmsInfoFormat
      const infoFormats = req.GetFeatureInfo.Format;
      const wmsInfoFormat = infoFormats.includes(WMSInfoFormat.GML) ? WMSInfoFormat.GML : undefined;

      // queryable
      const queryable = layer.queryable === true && wmsInfoFormat !== undefined;

      // TODO - MaxScaleDenominator
      // TODO - MinScaleDenominator
      /** @type {import('ngeo/datasource/OGC').OGCOptions} */
      const options = {
        id: id,
        name: layer.Title,
        ogcImageType: ogcImageType,
        wmsLayers: [
          {
            name: layer.Name,
            queryable: queryable,
          },
        ],
        ogcType: Type.WMS,
        visible: true,
        wmsUrl: url,
      };
      if (wmsInfoFormat) {
        options.wmsInfoFormat = wmsInfoFormat;
      }

      const legend = {'title': layer.Title, 'url': originalUrl, 'name': layer.Name};

      dataSource = new gmfExternalDatasourceOGC(options, legend);

      // Keep a reference to the external data source in the cache
      this.extDataSources_[id] = dataSource;
    }

    // (2) Add data source in WMS group, unless it's already in there.
    //     Will also add the data source to the `import('ngeo/datasource/DataSource.js').DataSources`
    //     collection.
    //     If the group is created, its inner OL layer is also added to the map.
    let wmsGroup = this.getWMSGroup(url);
    if (wmsGroup) {
      if (!wmsGroup.dataSources.includes(dataSource)) {
        wmsGroup.addDataSource(dataSource);
        this.dataSources_.push(dataSource);
      }
    } else {
      wmsGroup = new ngeoDatasourceWMSGroup(
        {
          dataSources: [dataSource],
          injector: this.injector_,
          title: service.Title,
          url: url,
        },
        this.ngeoLayerHelper_
      );
      this.addLayer_(wmsGroup.layer);
      this.addWMSGroup_(wmsGroup);
      this.dataSources_.push(dataSource);
    }
  }

  /**
   * @param {any} layer WTMS Capability Layer object.
   * @param {any} capabilities  WMTS Capabilities definition
   * @param {string} wmtsUrl The WMTS capabilities url
   */
  createAndAddDataSourceFromWMTSCapability(layer, capabilities, wmtsUrl) {
    const id = getId(layer);

    // (1) No need to do anything if there's already a WMTS data source (and its
    // layer in the map)
    if (this.wmtsCache_[id]) {
      return;
    }

    /** @type {ngeoDatasourceOGC|ngeoDatasourceFile} */
    let dataSource;

    // (2) Get data source from cache if it exists, otherwise create it
    if (this.extDataSources_[id]) {
      dataSource = this.extDataSources_[id];
    } else {
      const name = layer.Title;
      const wmtsLayer = layer.Identifier;

      // TODO - MaxScaleDenominator
      // TODO - MinScaleDenominator
      dataSource = new ngeoDatasourceOGC({
        id: id,
        name: name,
        ogcType: Type.WMTS,
        visible: true,
        wmtsLayer: wmtsLayer,
        wmtsUrl: wmtsUrl,
      });

      // Keep a reference to the external data source in the cache
      this.extDataSources_[id] = dataSource;
    }

    // (3) Get/Create group, then add data source to group
    let wmtsGroup = this.getWMTSGroup(wmtsUrl);
    if (!wmtsGroup) {
      wmtsGroup = new ngeoDatasourceOGCGroup({
        dataSources: [],
        title: capabilities.ServiceIdentification.Title,
        url: wmtsUrl,
      });
      this.addWMTSGroup_(wmtsGroup);
    }
    wmtsGroup.addDataSource(dataSource);

    // (4) Create and add the OL layer
    const layerObj = this.ngeoLayerHelper_.createWMTSLayerFromCapabilititesObj(capabilities, layer);
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
      ),
    };
  }

  /**
   * @param {File} file File.
   * @param {function(boolean):*?} opt_callback Callback called with true if the file is loaded and added.
   *     Otherwise with false.
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
          if (!this.map_) {
            throw new Error('Missing map');
          }
          // (1) No need to do anything if the file has already been added...
          if (fileGroup.dataSources.includes(dataSource)) {
            return;
          }

          // (2) Okay, we need to add this data source. First, add its layer  to the map.
          this.addLayer_(dataSource.layer);

          // (3) Add it to the file group
          fileGroup.addDataSource(dataSource);

          // (4) Recenter the map view onto its extent if there is at least one geometry (and so a valid
          // extent)
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
   * @param {File} file File.
   * @return {angular.IPromise<ngeoDatasourceFile>} Promise
   * @private
   */
  getFileDataSource_(file) {
    const defer = this.q_.defer();

    if (this.files_[file.name]) {
      defer.resolve(this.files_[file.name]);
    } else {
      const ngeoFile = this.ngeoFile_;
      ngeoFile.read(file).then((content) => {
        if (!this.map_) {
          throw new Error('Missing map');
        }
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */
        let features;
        const readOptions = {
          featureProjection: this.map_.getView().getProjection(),
        };

        if (ngeoFile.isKml(content)) {
          features = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (new olFormatKML().readFeatures(
            content,
            readOptions
          ));
        } else if (ngeoFile.isGpx(content)) {
          features = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (new olFormatGPX().readFeatures(
            content,
            readOptions
          ));
        }

        if (features) {
          const id = getId(file);

          const dataSource = new ngeoDatasourceFile({
            features: new olCollection(features),
            id: id,
            name: file.name,
            visible: true,
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
   * @param {import("ol/layer/Tile.js").default} layer WMTS layer
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
   * @param {Event|import('ol/events/Event.js').default} evt Collection event.
   * @private
   */
  handleDataSourcesRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      const dataSource = evt.element;
      if (this.extDataSources_[dataSource.id] === dataSource) {
        if (dataSource instanceof ngeoDatasourceFile) {
          this.removeFileDataSource_(dataSource);
        } else if (dataSource instanceof ngeoDatasourceOGC) {
          this.removeOGCDataSource_(dataSource);
        }
      }
    }
  }

  /**
   * Remove a data source from its group. Remove its layer from the map as well.
   *
   * Note: it is expected that the data source has already been removed
   * from the ngeo collection.
   *
   * @param {import("ngeo/datasource/File.js").default} dataSource External File data source.
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
   * @param {import("ngeo/datasource/OGC.js").default} dataSource External OGC data source.
   * @private
   */
  removeOGCDataSource_(dataSource) {
    if (dataSource.ogcType === Type.WMS) {
      // WMS data source
      if (!dataSource.wmsUrl) {
        throw new Error('Missing dataSource.wmsUrl');
      }

      const wmsGroup = this.getWMSGroup(dataSource.wmsUrl);
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
    } else if (dataSource.ogcType === Type.WMTS) {
      // WMTS data source
      if (!dataSource.wmtsUrl) {
        throw new Error('Missing dataSource.wmsUrl');
      }

      const wmtsGroup = this.getWMTSGroup(dataSource.wmtsUrl);
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

  /**
   * @return {boolean} is empty.
   */
  isEmpty() {
    return (
      this.wmsGroupsCollection_.getLength() == 0 &&
      this.wmtsGroupsCollection_.getLength() == 0 &&
      this.fileGroup_.dataSourcesCollection.getLength() == 0
    );
  }

  /**
   * Remove all groups.
   */
  removeAll() {
    for (const dataSource of this.dataSources_.getArray()) {
      if (this.extDataSources_[dataSource.id] === dataSource) {
        if (dataSource instanceof ngeoDatasourceFile) {
          this.removeFileDataSource_(dataSource);
        } else if (dataSource instanceof ngeoDatasourceOGC) {
          this.removeOGCDataSource_(dataSource);
        }
      }
    }
  }
}

/**
 * Get the data source id from a WMS or WMTS Capability Layer object, or
 * from a File object.
 *
 * Please, note that this is used to generate a unique id for the created
 * external data sources and since a WMS/WMTS Capability Layer objects don't
 * natively contains an id by themselves, then it is programmatically generated
 * using the `ol.getUid` method, plus a million.
 *
 * @param {Object} layer WMS/WMTS Capability Layer object.
 * @return {number} Data source id.
 * @private
 * @hidden
 */
function getId(layer) {
  return Number(olUtilGetUid(layer)) + 1000000;
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfExternalDataSourcesManager', [
  gmfDatasourceFileGroup.name,
  ngeoMapLayerHelper.name,
  ngeoMiscFile.name,
  ngeoDatasourceDataSources.name,
]);
module.service('gmfExternalDataSourcesManager', ExternalDatSourcesManager);

export default module;
