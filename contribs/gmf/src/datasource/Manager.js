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

import angular from 'angular';
import GmfDatasourceOGC from 'gmf/datasource/OGC.js';
import gmfDatasourceWFSAliases from 'gmf/datasource/WFSAliases.js';
import gmfLayertreeSyncLayertreeMap, {getLayer} from 'gmf/layertree/SyncLayertreeMap.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes, {ThemeNodeType} from 'gmf/theme/Themes.js';
import gmfOGC from 'gmf/datasource/OGC.js';

import OGC, {ServerType, WFSOutputFormat, Type} from 'ngeo/datasource/OGC.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';

import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {listen} from 'ol/events.js';
import olLayerTile from 'ol/layer/Tile.js';
import {clear as clearObject} from 'ol/obj.js';
import olLayerImage from 'ol/layer/Image.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';

/**
 * @typedef {import("ol/Collection.js").default<import("gmf/datasource/OGC.js").default>} DataSources
 */

/**
 * @typedef {Object<(number|string), ManagerTreeCtrlCacheItem>} ManagerTreeCtrlCache
 */

/**
 * @typedef {Object} ManagerTreeCtrlCacheItem
 * @property {Function} filterRulesWatcherUnregister
 * @property {Function} stateWatcherUnregister
 * @property {Function} [timeLowerValueWatcherUnregister]
 * @property {Function} [timeUpperValueWatcherUnregister]
 * @property {import('ngeo/layertree/Controller.js').LayertreeController} treeCtrl
 * @property {import("ol/layer/Image.js").default} [wmsLayer]
 */

/**
 * The GeoMapFish DataSources Manager is responsible of listening to the
 * c2cgeoportal's themes to create instances of `ngeo.datasource.DataSource`
 * objects with the layer definitions found and push them in the
 * `DataSources` collection. The Manager must be initialized
 * with the app's map using the `setDatasourceMap()` method.
 *
 * When changing theme, these data sources are cleared then re-created.
 *
 * Used metadata:
 *
 *  * `identifierAttributeField`: The field used in the 'display query window' as feature title.
 *      For WMS layers.
 */
export class DatasourceManager {
  /**
   * @param {angular.IQService} $q Angular q service
   * @param {angular.IScope} $rootScope Angular rootScope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
   * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager The gmf TreeManager
   *    service.
   * @param {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager} ngeoBackgroundLayerMgr
   *    Background layer manager.
   * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data sources service.
   *     data sources service.
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
   * @param {import("ngeo/filter/RuleHelper.js").RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wms time service.
   * @param {import("gmf/datasource/WFSAliases.js").DatasourceWFSAlias} gmfWFSAliases Gmf WFS aliases
   *    service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfDataSourcesManager
   */
  constructor(
    $q,
    $rootScope,
    $timeout,
    gmfThemes,
    gmfTreeManager,
    ngeoBackgroundLayerMgr,
    ngeoDataSources,
    ngeoLayerHelper,
    ngeoRuleHelper,
    ngeoWMSTime,
    gmfWFSAliases
  ) {
    // === Injected properties ===

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
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {import("gmf/theme/Themes.js").ThemesService}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    /**
     * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
     * @private
     */
    this.gmfTreeManager_ = gmfTreeManager;

    /**
     * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
     * @private
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

    /**
     * @type {import("ngeo/datasource/DataSources.js").DataSource}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    /**
     * The collection of DataSources from ngeo, which gets updated by this
     * service. When the theme changes, first we remove all data sources, then
     * the 'active' data source are added here.
     * @type {import('ngeo/datasource/DataSource.js').DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {import("ngeo/filter/RuleHelper.js").RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {import("ngeo/misc/WMSTime.js").WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;

    /**
     * @type {import("gmf/datasource/WFSAliases.js").DatasourceWFSAlias}
     * @private
     */
    this.gmfWFSAliases_ = gmfWFSAliases;

    // === Inner properties ===

    /**
     * While loading a new theme, this is where all of the created data sources
     * are put using the id as key for easier find in the future.
     * @type {Object<string, import("gmf/datasource/OGC.js").default>}
     * @private
     */
    this.dataSourcesCache_ = {};

    /**
     * A reference to the dimensions object.
     * @type {import('ngeo/datasource/OGC.js').Dimensions|undefined}
     * @private
     */
    this.dimensions_;

    /**
     * The function to call to unregister the `watch` event on the dimensions
     * object properties.
     * @type {?Function}
     * @private
     */
    this.dimensionsWatcherUnregister = null;

    /**
     * The cache of layertree leaf controller, i.e. those that are added to
     * the tree manager. When treeCtrl is added in this cache, it's given
     * a reference to its according data source.
     * @type {ManagerTreeCtrlCache}
     * @private
     */
    this.treeCtrlCache_ = {};

    /**
     * The function to call to unregister the `watchCollection` event on
     * the root layer tree controller children.
     * @type {?Function}
     * @private
     */
    this.treeCtrlsUnregister_ = null;

    // === Events ===
    listen(this.ngeoBackgroundLayerMgr_, 'change', this.handleNgeoBackgroundLayerChange_, this);
    listen(this.gmfThemes_, 'change', this.handleThemesChange_, this);
  }

  /**
   * Set the map to use with your datasources.
   * @param {import("ol/Map.js").default} map The map to use.
   * @hidden
   */
  setDatasourceMap(map) {
    this.ngeoDataSources_.map = map;
  }

  /**
   * Get a datasource by its id.
   * @param {string} id The id of the datasource.
   * @return {GmfDatasourceOGC}
   * @hidden
   */
  getDatasource(id) {
    return this.dataSourcesCache_[id];
  }

  /**
   * @param {import('ngeo/datasource/OGC.js').Dimensions} dimensions A reference to the dimensions
   *     object to keep a reference of in this service.
   * @hidden
   */
  setDimensions(dimensions) {
    if (this.dimensionsWatcherUnregister) {
      this.dimensionsWatcherUnregister();
    }

    this.dimensions_ = dimensions;

    this.dimensionsWatcherUnregister = this.rootScope_.$watch(
      () => this.dimensions_,
      this.handleDimensionsChange_.bind(this),
      true
    );
    this.handleDimensionsChange_();
  }

  /**
   * Called when the dimensions change. Update all affected layer's filters.
   * @private
   * @hidden
   */
  handleDimensionsChange_() {
    // Create a layer list to update each one only once
    /**
     * @type {import('ol/layer/Base.js').default[]}
     */
    const layers = [];
    /**
     * @type {string[]}
     */
    const layerIds = [];

    const dataSources = this.dataSources_.getArray();
    for (const dataSource of dataSources) {
      if (dataSource instanceof gmfOGC && dataSource.dimensionsFiltersConfig) {
        for (const key in dataSource.dimensionsFiltersConfig) {
          if (dataSource.dimensionsFiltersConfig[key].value === null) {
            const layer = this.getDataSourceLayer_(dataSource);
            if (layer == undefined) {
              return;
            }
            const id = olUtilGetUid(layer);
            if (!layerIds.includes(id)) {
              layers.push(layer);
              layerIds.push(id);
            }
          }
        }
      }
    }

    layers.forEach(this.updateLayerFilter_.bind(this));
  }

  /**
   * Called when the themes change. Remove any existing data sources first,
   * then create and add data sources from the loaded themes.
   * @private
   * @hidden
   */
  handleThemesChange_() {
    // (1) Clear
    this.clearDataSources_();
    if (this.treeCtrlsUnregister_) {
      this.treeCtrlsUnregister_();
    }
    this.clearTreeCtrlCache_();

    // (2) Re-create data sources and event listeners
    this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
      const promiseThemes = this.gmfThemes_.getThemesObject().then((themes) => {
        // Create a DataSources for each theme
        for (const theme of themes) {
          for (const child of theme.children) {
            this.createDataSource_(child, child, ogcServers);
          }
        }
      });

      const promiseBgLayers = this.gmfThemes_.getBackgroundLayersObject().then((backgroundLayers) => {
        // Create a DataSource for each background layer
        for (const backgroundLayer of backgroundLayers) {
          this.createDataSource_(null, backgroundLayer, ogcServers);
        }
      });

      // Then add the data sources that are active in the ngeo collection
      this.q_.all([promiseThemes, promiseBgLayers]).then(() => {
        this.treeCtrlsUnregister_ = this.rootScope_.$watchCollection(() => {
          if (this.gmfTreeManager_.rootCtrl) {
            return this.gmfTreeManager_.rootCtrl.children;
          }
        }, this.handleTreeManagerRootChildrenChange_.bind(this));
      });
    });
  }

  /**
   * Called when the list of tree controllers within the tree manager
   * root controller changes. In other words, this method is called
   * after nodes are being added added or removed from the tree,
   * i.e. from the child nodes collection.
   *
   * A timeout is required  because the collection event is fired before
   * the leaf nodes are created and they are the ones we're looking for here.
   *
   * This method handles the registration/unregistration of tree nodes that
   * are added or removed, pushing it to the cache or removing it from the
   * cache.
   *
   * @param {import("ngeo/layertree/Controller.js").LayertreeController[] | undefined} value List of tree
   *     controllers.
   * @private
   * @hidden
   */
  handleTreeManagerRootChildrenChange_(value) {
    this.timeout_(() => {
      // (1) No need to do anything if the value is not set
      if (!value) {
        return;
      }

      // (2) Collect 'leaf' treeCtrls
      /** @type {import('ngeo/layertree/Controller.js').LayertreeController[]} */
      const newTreeCtrls = [];
      /**
       * @param {import('ngeo/layertree/Controller.js').LayertreeController} treeCtrl
       */
      const visitor = (treeCtrl) => {
        const node = /** @type {import('gmf/themes.js').GmfGroup|!import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
        const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */ (node);
        const children = groupNode.children;
        if (!children) {
          newTreeCtrls.push(treeCtrl);
        }
      };
      for (let i = 0, ii = value.length; i < ii; i++) {
        value[i].traverseDepthFirst(visitor);
      }

      // (3) Add new 'treeCtrls'
      for (let i = 0, ii = newTreeCtrls.length; i < ii; i++) {
        const newTreeCtrl = newTreeCtrls[i];
        const cacheItem = this.getTreeCtrlCacheItem_(newTreeCtrl);
        if (!cacheItem) {
          this.addTreeCtrlToCache_(newTreeCtrl);
        }
      }

      // (4) Remove treeCtrls that are no longer in the newTreeCtrl
      const cache = this.treeCtrlCache_;
      for (const id in this.treeCtrlCache_) {
        const item = cache[id];
        if (!newTreeCtrls.includes(item.treeCtrl)) {
          this.removeTreeCtrlCacheItem_(item);
        }
      }
    });
  }

  /**
   * Remove the data sources from the ngeo collection that are in the cache,
   * i.e. those created by this service, then clear the cache.
   * @private
   * @hidden
   */
  clearDataSources_() {
    // (1) Remove data sources from ngeo collection
    const dataSources = this.dataSources_.getArray();
    for (let i = dataSources.length - 1, ii = 0; i >= ii; i--) {
      if (this.dataSourcesCache_[dataSources[i].id]) {
        // Use the `remove` method of the `ol.Collection` object for it
        // to update its length accordingly and trigger the REMOVE event as
        // well.
        this.dataSources_.remove(dataSources[i]);
      }
    }

    // (2) Clear the cache
    clearObject(this.dataSourcesCache_);
  }

  /**
   * Create a data source using the information on the node, group node
   * and OGC servers. If the node has children, then we loop in those to get
   * leaf nodes. Only leaf nodes end up creating a data source. If a data
   * source with the same id already exists, then the node is skipped.
   *
   * Once a data source is created, it is added to the data sources cache.
   *
   * @param {?import('gmf/themes.js').GmfGroup} firstLevelGroup The first level group node.
   * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node The node, which
   *     may have children or not.
   * @param {import('gmf/themes.js').GmfOgcServers} ogcServers OGC servers.
   * @private
   * @hidden
   */
  createDataSource_(firstLevelGroup, node, ogcServers) {
    const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */ (node);
    const children = groupNode.children;

    // (1) Group node (node that has children). Loop in the children
    //     individually and create a data source for each one of them. The
    //     group node itself is **skipped**.
    if (children) {
      for (const child of children) {
        this.createDataSource_(firstLevelGroup, child, ogcServers);
      }
      return;
    }

    // From there on, the node is a layer node.
    const gmfLayer = /** @type {import('gmf/themes.js').GmfLayer} */ (node);

    // (2) Skip layer node if a data source with the same id exists
    const id = Number(olUtilGetUid(gmfLayer));
    if (this.dataSourcesCache_[id]) {
      return;
    }

    // From there on, a data source will be created
    const meta = gmfLayer.metadata;
    const ogcType = gmfLayer.type;
    let maxResolution = 0;
    let minResolution = 0;
    /** @type {string} */
    let wmtsLayer;
    /** @type {string} */
    let wmtsUrl;
    /** @type {string} */
    let ogcImageType;
    /** @type {import('ngeo/datasource/OGC.js').WMSLayer[]} */
    let wmsLayers;
    /** @type {import('ngeo/datasource/OGC.js').WFSLayer[]} */
    let wfsLayers;
    /** @type {import('ngeo/datasource/OGC.js').TimeProperty} */
    let timeProperty;
    /** @type {import('gmf/themes.js').GmfOgcServer} */
    let ogcServer;

    if (ogcType === ThemeNodeType.WMTS) {
      // (3) Manage WMTS
      const gmfLayerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (
        /** @type {any} */ (gmfLayer)
      );

      // Common options for WMTS
      wmtsLayer = gmfLayerWMTS.layer;
      wmtsUrl = gmfLayerWMTS.url;
      maxResolution = meta.maxQueryResolution !== undefined ? meta.maxQueryResolution : meta.maxResolution;
      minResolution = meta.minQueryResolution !== undefined ? meta.minQueryResolution : meta.minResolution;

      // OGC Layers
      const layers = meta.queryLayers || meta.wmsLayers;
      if (layers) {
        wmsLayers = layers.split(',').map((layer) => {
          return {
            name: layer,
            queryable: true,
          };
        });
        wfsLayers = layers.split(',').map((layer) => {
          return {
            maxResolution: maxResolution,
            minResolution: minResolution,
            name: layer,
            queryable: true,
          };
        });
      }

      // OGC Server
      if (meta.ogcServer && ogcServers[meta.ogcServer]) {
        ogcServer = ogcServers[meta.ogcServer];
      }
      ogcImageType = gmfLayerWMTS.imageType;
    } else if (ogcType === ThemeNodeType.WMS) {
      // (4) Manage WMS
      const gmfLayerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));

      // Common options for WMS
      maxResolution = gmfLayerWMS.maxResolutionHint;
      minResolution = gmfLayerWMS.minResolutionHint;

      // OGC Layers
      let queryable = false;
      for (const wfslayer of gmfLayerWMS.childLayers) {
        if (wfslayer.queryable) {
          queryable = true;
          break;
        }
      }

      // Read 'meta.queryLayers' for WMS data source to set 'getData'
      //
      // If a WMS data source has the `queryLayers` property set in
      // its metadata, then it lists the layers that should be used
      // when queries are issued with that data source, i.e. when a
      // WFS GetFeature request is issued. The 'queryable' property
      // still needs to be true for the purpose of the filter tool to
      // work properly, i.e. a data source must be queryable to be
      // filtrable.

      const queryLayers = meta.queryLayers ? meta.queryLayers.split(',') : null;

      wmsLayers = gmfLayerWMS.layers.split(',').map((childLayer) => {
        /** @type {import('ngeo/datasource/OGC.js').WMSLayer} */
        const item = {
          name: childLayer,
          queryable: queryable,
        };
        if (queryLayers && !queryLayers.includes(childLayer)) {
          item.getData = false;
        }
        return item;
      });
      wfsLayers = gmfLayerWMS.childLayers.map((childLayer) => {
        /** @type {import('ngeo/datasource/OGC.js').WFSLayer} */
        const item = {
          maxResolution: childLayer.maxResolutionHint,
          minResolution: childLayer.minResolutionHint,
          name: childLayer.name,
          queryable: childLayer.queryable,
        };
        if (queryLayers && !queryLayers.includes(childLayer.name)) {
          item.getData = false;
        }
        return item;
      });

      // OGC Server
      const ogcServerName =
        !firstLevelGroup || firstLevelGroup.mixed ? gmfLayerWMS.ogcServer : firstLevelGroup.ogcServer;
      ogcServer = ogcServers[ogcServerName];
      ogcImageType = ogcServer.imageType;

      // Time property
      if (gmfLayerWMS.time) {
        timeProperty = gmfLayerWMS.time;
      } else if (firstLevelGroup && firstLevelGroup.time) {
        timeProperty = firstLevelGroup.time;
      }
    }

    // (5) ogcServer
    const ogcServerType = ogcServer ? ogcServer.type : undefined;
    const wfsFeatureNS = ogcServer ? ogcServer.namespace : undefined;
    const wmsIsSingleTile = ogcServer ? ogcServer.isSingleTile : undefined;
    const wfsUrl = ogcServer && ogcServer.wfsSupport ? ogcServer.urlWfs : undefined;
    const wmsUrl = ogcServer ? ogcServer.url : undefined;

    let wfsOutputFormat = WFSOutputFormat.GML3;
    // qgis server only supports GML2 output
    if (ogcServerType === ServerType.QGISSERVER) {
      wfsOutputFormat = WFSOutputFormat.GML2;
    }

    // (6) Snapping
    const snappable = !!meta.snappingConfig;
    const snappingTolerance = meta.snappingConfig ? meta.snappingConfig.tolerance : undefined;
    const snappingToEdges = meta.snappingConfig ? meta.snappingConfig.edge : undefined;
    const snappingToVertice = meta.snappingConfig ? meta.snappingConfig.vertex : undefined;

    // (7) Dimensions
    const dimensions = this.dimensions_;
    const dimensionsConfig = node.dimensions || firstLevelGroup === null ? {} : firstLevelGroup.dimensions;
    const dimensionsFiltersConfig = gmfLayer.dimensionsFilters;

    // (8) Time values (lower or lower/upper)
    let timeLowerValue;
    let timeUpperValue;

    if (timeProperty) {
      const timeValues = this.ngeoWMSTime_.getOptions(timeProperty).values;
      if (Array.isArray(timeValues)) {
        timeLowerValue = timeValues[0];
        timeUpperValue = timeValues[1];
      } else {
        timeLowerValue = timeValues;
      }
    }

    // (9) Common options
    const copyable = meta.copyable;
    const identifierAttribute = meta.identifierAttributeField;
    const name = gmfLayer.name;
    const queryIconPosition = meta.queryIconPosition;
    const timeAttributeName = meta.timeAttribute;
    const visible = meta.isChecked === true;
    const ogcAttributes = ogcServer ? ogcServer.attributes : null;

    /** @type {import('gmf/datasource/OGC.js').OGCOptions} */
    const options = {
      copyable,
      dimensionsConfig,
      dimensionsFiltersConfig,
      gmfLayer,
      id,
      identifierAttribute,
      name,
      ogcType,
      ogcAttributes,
      queryIconPosition,
      snappable,
      timeAttributeName,
      visible,
      wfsOutputFormat,
    };
    if (dimensions) {
      options.dimensions = dimensions;
    }
    if (maxResolution) {
      options.maxResolution = maxResolution;
    }
    if (minResolution) {
      options.minResolution = minResolution;
    }
    if (ogcImageType) {
      options.ogcImageType = ogcImageType;
    }
    if (ogcServerType) {
      options.ogcServerType = ogcServerType;
    }
    if (snappingTolerance) {
      options.snappingTolerance = snappingTolerance;
    }
    if (snappingToEdges) {
      options.snappingToEdges = snappingToEdges;
    }
    if (snappingToVertice) {
      options.snappingToVertice = snappingToVertice;
    }
    if (timeLowerValue) {
      options.timeLowerValue = timeLowerValue;
    }
    if (timeProperty) {
      options.timeProperty = timeProperty;
    }
    if (timeUpperValue) {
      options.timeUpperValue = timeUpperValue;
    }
    if (wfsFeatureNS) {
      options.wfsFeatureNS = wfsFeatureNS;
    }
    if (wfsLayers) {
      options.wfsLayers = wfsLayers;
    }
    if (wfsUrl) {
      options.wfsUrl = wfsUrl;
    }
    if (wmsIsSingleTile) {
      options.wmsIsSingleTile = wmsIsSingleTile;
    }
    if (wmsLayers) {
      options.wmsLayers = wmsLayers;
    }
    if (wmsUrl) {
      options.wmsUrl = wmsUrl;
    }
    if (wmtsLayer) {
      options.wmtsLayer = wmtsLayer;
    }
    if (wmtsUrl) {
      options.wmtsUrl = wmtsUrl;
    }
    // Create the data source and add it to the cache
    this.dataSourcesCache_[id] = new GmfDatasourceOGC(options);
  }

  /**
   * If the given Layertree controller is a 'leaf', add it to the cache.
   * Also, set its according data source. Finally, add the data source to
   * the ngeo collection.
   *
   * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl Layertree controller to add
   * @private
   * @hidden
   */
  addTreeCtrlToCache_(treeCtrl) {
    const id = olUtilGetUid(treeCtrl.node);
    const dataSource = this.dataSourcesCache_[id];
    if (!dataSource) {
      throw new Error('Missing dataSource');
    }
    treeCtrl.setDataSource(dataSource);

    const stateWatcherUnregister = this.rootScope_.$watch(
      () => treeCtrl.getState(),
      this.handleTreeCtrlStateChange_.bind(this, treeCtrl)
    );

    const filterRulesWatcherUnregister = this.rootScope_.$watch(() => {
      const hasFilters = dataSource.filterRules !== null;
      const isVisible = dataSource.visible;
      return hasFilters && isVisible;
    }, this.handleDataSourceFilterRulesChange_.bind(this, dataSource));

    // Watch for time values change to update the WMS layer
    let timeLowerValueWatcherUnregister;
    let timeUpperValueWatcherUnregister;
    let wmsLayer;
    if (dataSource.timeProperty && dataSource.ogcType === Type.WMS) {
      timeLowerValueWatcherUnregister = this.rootScope_.$watch(
        () => dataSource.timeLowerValue,
        this.handleDataSourceTimeValueChange_.bind(this, dataSource)
      );

      if (dataSource.timeProperty.mode === 'range') {
        timeUpperValueWatcherUnregister = this.rootScope_.$watch(
          () => dataSource.timeUpperValue,
          this.handleDataSourceTimeValueChange_.bind(this, dataSource)
        );
      }

      wmsLayer = getLayer(treeCtrl);
    }

    this.treeCtrlCache_[id] = {
      filterRulesWatcherUnregister,
      stateWatcherUnregister,
      timeLowerValueWatcherUnregister,
      timeUpperValueWatcherUnregister,
      treeCtrl,
      wmsLayer,
    };

    this.dataSources_.push(dataSource);

    this.gmfWFSAliases_.describe(dataSource);
  }

  /**
   * Remove a treeCtrl cache item. Unregister event listeners and remove the
   * data source from the ngeo collection.
   *
   * @param {ManagerTreeCtrlCacheItem} item Layertree controller cache item
   * @private
   * @hidden
   */
  removeTreeCtrlCacheItem_(item) {
    // (1) Remove data source
    const dataSource = item.treeCtrl.getDataSource();
    if (!dataSource) {
      throw new Error('DataSource should be set');
    }
    this.dataSources_.remove(dataSource);

    // (2) Remove item and clear event listeners
    item.treeCtrl.setDataSource(null);
    item.filterRulesWatcherUnregister();
    item.stateWatcherUnregister();
    if (item.timeLowerValueWatcherUnregister) {
      item.timeLowerValueWatcherUnregister();
    }
    if (item.timeUpperValueWatcherUnregister) {
      item.timeUpperValueWatcherUnregister();
    }
    delete this.treeCtrlCache_[olUtilGetUid(item.treeCtrl.node)];
  }

  /**
   * Clears the layer tree controller cache. At the same time, each item gets
   * its data source reference unset and state watcher unregistered.
   *
   * The data source gets also removed from the ngeo data sources collection.
   * @private
   * @hidden
   */
  clearTreeCtrlCache_() {
    for (const id in this.treeCtrlCache_) {
      this.removeTreeCtrlCacheItem_(this.treeCtrlCache_[id]);
    }
  }

  /**
   * Called when the state of a 'leaf' layertree controller changes.
   * Update the `visible` property of the data source according to the
   * state of the layertree controller.
   *
   * Note: The possible states can only be 'on' or 'off', because the
   * layertree controller being a 'leaf'.
   *
   * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
   * @param {string|undefined} newVal New state value
   * @private
   * @hidden
   */
  handleTreeCtrlStateChange_(treeCtrl, newVal) {
    const treeDataSource = treeCtrl.getDataSource();
    if (!treeDataSource) {
      throw new Error('DataSource should be set');
    }
    const visible = newVal === 'on';
    treeDataSource.visible = visible;

    // In GMF, multiple data sources can be combined into one ol.layer.Layer
    // object. When changing the state of a data source, we need to make
    // sure that the FILTER param match order of the current LAYERS param.
    const layer = this.getDataSourceLayer_(treeDataSource);
    if (layer == undefined) {
      return;
    }
    this.updateLayerFilter_(layer);
  }

  /**
   * Returns a layertree controller cache item, if it exists.
   *
   * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
   * @return {ManagerTreeCtrlCacheItem} Cache item
   * @private
   * @hidden
   */
  getTreeCtrlCacheItem_(treeCtrl) {
    return this.treeCtrlCache_[olUtilGetUid(treeCtrl.node)] || null;
  }

  /**
   * Return the layer corresponding to the data source.
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource The data source.
   * @return {import("ol/layer/Base.js").default|undefined} The layer.
   * @private
   * @hidden
   */
  getDataSourceLayer_(dataSource) {
    if (!(dataSource instanceof gmfOGC) || dataSource.gmfLayer == undefined) {
      return;
    }
    const id = olUtilGetUid(dataSource.gmfLayer);
    if (id == undefined) {
      return;
    }
    const item = this.treeCtrlCache_[id];
    if (item == undefined) {
      return;
    }
    const treeCtrl = item.treeCtrl;
    return getLayer(treeCtrl);
  }

  /**
   * Update layer filter parameter according to data sources filter rules
   * and dimensions filters.
   * @param {import("ol/layer/Base.js").default} layer The layer to update.
   * @private
   * @hidden
   */
  updateLayerFilter_(layer) {
    if (!(layer instanceof olLayerImage || layer instanceof olLayerTile)) {
      return;
    }
    const source = layer.getSource();
    if (!(source instanceof olSourceImageWMS || source instanceof olSourceTileWMS)) {
      return;
    }

    const params = source.getParams();
    const layersParam = params.LAYERS;
    const layersList = layersParam.split(',');
    if (!layersList.length) {
      throw new Error('Missing layersList');
    }

    const filterParam = 'FILTER';
    const filterParamValues = [];
    let hasFilter = false;
    for (const wmsLayerName of layersList) {
      let filterParamValue = '()';

      const dataSources = this.dataSources_.getArray();
      for (const dataSource of dataSources) {
        const dsLayer = this.getDataSourceLayer_(dataSource);
        if (dsLayer == undefined) {
          continue;
        }
        if (!(dataSource instanceof gmfOGC)) {
          throw new Error('Wrong dataSource type');
        }
        const gmfLayerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (
          /** @type {any} */ (dataSource.gmfLayer)
        );
        if (
          olUtilGetUid(dsLayer) == olUtilGetUid(layer) &&
          layer.get('querySourceIds').includes(String(dataSource.id)) &&
          gmfLayerWMS.layers.split(',').includes(wmsLayerName)
        ) {
          const id = olUtilGetUid(dataSource.gmfLayer);
          const item = this.treeCtrlCache_[id];
          if (!item) {
            throw new Error('Missing item');
          }
          const treeCtrl = item.treeCtrl;
          const projCode = treeCtrl.map.getView().getProjection().getCode();

          if (!(dataSource instanceof OGC)) {
            throw new Error('Wrong datasource');
          }
          const filterString = dataSource.visible
            ? this.ngeoRuleHelper_.createFilterString({
                dataSource: dataSource,
                projCode: projCode,
                incDimensions: true,
              })
            : null;
          if (filterString) {
            filterParamValue = `(${filterString})`;
            hasFilter = true;
          }
        }
      }

      filterParamValues.push(filterParamValue);
    }

    source.updateParams({
      [filterParam]: hasFilter ? filterParamValues.join('') : null,
    });
  }

  /**
   * Called when both the 'visible' and 'filterRules' properties of a data
   * source change.
   *
   * If the data source is filtrable, then make sure that when it gets rules
   * set to apply them as OGC filters to the OpenLayers layer, more precisely
   * as a `FILTER` parameter in the layer's source parameters.
   *
   * @param {import("gmf/datasource/OGC.js").default} dataSource Data source.
   * @private
   * @hidden
   */
  handleDataSourceFilterRulesChange_(dataSource) {
    // Skip data sources that are not filtrables OR those that do not have
    // the WMS ogcType, i.e. those that do not have an OpenLayers layer
    // to update
    if (dataSource.filtrable !== true || dataSource.ogcType !== Type.WMS) {
      return;
    }

    const layer = this.getDataSourceLayer_(dataSource);
    if (layer === undefined) {
      return;
    }
    this.updateLayerFilter_(layer);
  }

  /**
   * Called when either the `timeLowerValue` or `timeUpperValue` property of a
   * data source changes.
   *
   * Get the range value from the data source, then update the WMS layer
   * thereafter.
   *
   * @param {import("gmf/datasource/OGC.js").default} dataSource Data source.
   * @private
   * @hidden
   */
  handleDataSourceTimeValueChange_(dataSource) {
    const id = olUtilGetUid(dataSource.gmfLayer);
    const item = this.treeCtrlCache_[id];
    if (!item) {
      throw new Error('Missing item');
    }
    const wmsLayer = item.wmsLayer;
    const wmsSource = wmsLayer.getSource();

    const timeProperty = dataSource.timeProperty;
    let timeParam;
    const range = dataSource.timeRangeValue;
    if (range) {
      if (!timeProperty) {
        throw new Error('Missing timeProperty');
      }
      timeParam = this.ngeoWMSTime_.formatWMSTimeParam(timeProperty, range);
    }

    // No need to update the TIME param if already the same value;
    const params = wmsSource.getParams();
    const currentTimeParam = params.TIME;
    if (currentTimeParam === timeParam) {
      return;
    }

    // The `timeParam` can be undefined, which means that the TIME property
    // gets reset.
    this.ngeoLayerHelper_.updateWMSLayerState(wmsLayer, wmsSource.getParams().LAYERS, timeParam);
  }

  /**
   * Called when the background layer changes. Add/Remove the according data
   * sources to/from the ngeo data sources collection. Update the data source
   * `visible` property as well.
   *
   * The `querySourceIds` property in the layer is used to determine the
   * data sources that are bound to the layer.
   *
   * @param {Event|import('ol/events/Event.js').default} evt Event.
   * @private
   * @hidden
   */
  handleNgeoBackgroundLayerChange_(evt) {
    const event = /** @type {import('ngeo/map/BackgroundLayerMgr.js').BackgroundEvent} */ (evt);
    const previousBackgroundLayer = event.detail.previous;
    const currentBackgroundLayer = event.detail.current;
    const cache = this.dataSourcesCache_;

    // Remove data sources linked to previous background layer
    if (previousBackgroundLayer) {
      const ids = previousBackgroundLayer.get('querySourceIds');
      if (Array.isArray(ids)) {
        for (const id of ids) {
          const dataSource = cache[id];
          if (dataSource) {
            dataSource.visible = false;
            this.dataSources_.remove(dataSource);
          }
        }
      }
    }

    // Add data sources linked to current background layer
    if (currentBackgroundLayer) {
      const ids = currentBackgroundLayer.get('querySourceIds');
      if (Array.isArray(ids)) {
        for (const id of ids) {
          const dataSource = cache[id];
          if (dataSource) {
            dataSource.visible = true;
            this.dataSources_.push(dataSource);
          }
        }
      }
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfDataSourcesManager', [
  gmfDatasourceWFSAliases.name,
  gmfLayertreeSyncLayertreeMap.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  ngeoFilterRuleHelper.name,
  ngeoDatasourceDataSources.name,
  ngeoMapBackgroundLayerMgr.name,
  ngeoMapLayerHelper.name,
  ngeoMiscWMSTime.name,
]);
myModule.service('gmfDataSourcesManager', DatasourceManager);

export default myModule;
