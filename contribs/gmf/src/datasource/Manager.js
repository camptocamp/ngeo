goog.provide('gmf.datasource.Manager');

goog.require('gmf');
goog.require('gmf.WFSAliases');
goog.require('gmf.datasource.OGC');
goog.require('gmf.layertree.SyncLayertreeMap');
goog.require('gmf.layertree.TreeManager');
goog.require('gmf.theme.Themes');
/** @suppress {extraRequire} */
goog.require('ngeo.datasource.DataSources');
goog.require('ngeo.datasource.OGC');
/** @suppress {extraRequire} */
goog.require('ngeo.filter.RuleHelper');
goog.require('ngeo.map.BackgroundLayerMgr');
goog.require('ngeo.map.LayerHelper');
goog.require('ngeo.misc.WMSTime');
goog.require('ol');
goog.require('ol.events');
goog.require('ol.layer.Tile');
goog.require('ol.obj');
goog.require('ol.layer.Image');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');


gmf.datasource.Manager = class {

  /**
   * The GeoMapFish DataSources Manager is responsible of listenening to the
   * c2cgeoportal's themes to create instances of `ngeo.datasource.DataSource`
   * objects with the layer definitions found and push them in the
   * `ngeo.datasource.DataSources` collection.
   *
   * When changing theme, these data sources are cleared then re-created.
   *
   * @struct
   * @param {angular.$q} $q Angular q service
   * @param {!angular.Scope} $rootScope Angular rootScope.
   * @param {angular.$timeout} $timeout Angular timeout service.
   * @param {gmf.theme.Themes} gmfThemes The gmf Themes service.
   * @param {gmf.layertree.TreeManager} gmfTreeManager The gmf TreeManager service.
   * @param {!ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
   *     manager.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
   *     data sources objects.
   * @param {!ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
   * @param {!ngeo.filter.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.misc.WMSTime} ngeoWMSTime wms time service.
   * @param {!gmf.WFSAliases} gmfWFSAliases Gmf WFS aliases service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfDataSourcesManager
   */
  constructor($q, $rootScope, $timeout, gmfThemes, gmfTreeManager,
    ngeoBackgroundLayerMgr, ngeoDataSources, ngeoLayerHelper, ngeoRuleHelper,
    ngeoWMSTime, gmfWFSAliases
  ) {

    // === Injected properties ===

    /**
     * @type {angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.rootScope_ = $rootScope;

    /**
     * @type {angular.$timeout}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {gmf.theme.Themes}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    /**
     * @type {gmf.layertree.TreeManager}
     * @private
     */
    this.gmfTreeManager_ = gmfTreeManager;

    /**
     * @type {!ngeo.map.BackgroundLayerMgr}
     * @private
     */
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;

    /**
     * The collection of DataSources from ngeo, which gets updated by this
     * service. When the theme changes, first we remove all data sources, then
     * the 'active' data source are added here.
     * @type {ngeo.datasource.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    /**
     * @type {!ngeo.map.LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {!ngeo.filter.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {!ngeo.misc.WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;

    /**
     * @type {!gmf.WFSAliases}
     * @private
     */
    this.gmfWFSAliases_ = gmfWFSAliases;


    // === Inner properties ===

    /**
     * While loading a new theme, this is where all of the created data sources
     * are put using the id as key for easier find in the future.
     * @type {Object.<number, gmf.datasource.OGC>}
     * @private
     */
    this.dataSourcesCache_ = {};

    /**
     * A reference to the dimensions object.
     * @type {ngeox.Dimensions|undefined}
     * @private
     */
    this.dimensions_;

    /**
     * The cache of layertree leaf controller, i.e. those that are added to
     * the tree manager. When treeCtrl is added in this cache, it's given
     * a reference to its according data source.
     * @type {gmfx.datasource.ManagerTreeCtrlCache}
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

    ol.events.listen(
      this.ngeoBackgroundLayerMgr_,
      'change',
      this.handleNgeoBackgroundLayerChange_,
      this
    );
    ol.events.listen(this.gmfThemes_, 'change', this.handleThemesChange_, this);
  }

  /**
   * @param {!ngeox.Dimensions} dimensions A reference to the dimensions
   *     object to keep a reference of in this service.
   */
  setDimensions(dimensions) {
    this.dimensions_ = dimensions;
  }

  /**
   * Called when the themes change. Remove any existing data sources first,
   * then create and add data sources from the loaded themes.
   * @private
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
            goog.asserts.assert(child);
            this.createDataSource_(child, child, ogcServers);
          }
        }
      });

      const promiseBgLayers = this.gmfThemes_.getBackgroundLayersObject().then(
        (backgroundLayers) => {
          // Create a DataSource for each background layer
          for (const backgroundLayer of backgroundLayers) {
            this.createDataSource_(null, backgroundLayer, ogcServers);
          }
        }
      );

      // Then add the data sources that are active in the ngeo collection
      this.q_.all([promiseThemes, promiseBgLayers]).then(() => {
        this.treeCtrlsUnregister_ = this.rootScope_.$watchCollection(
          () => {
            if (this.gmfTreeManager_.rootCtrl) {
              return this.gmfTreeManager_.rootCtrl.children;
            }
          },
          this.handleTreeManagerRootChildrenChange_.bind(this)
        );
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
   * @param {Array.<ngeo.layertree.Controller>|undefined} value List of tree
   *     controllers.
   * @private
   */
  handleTreeManagerRootChildrenChange_(value) {

    this.timeout_(() => {

      // (1) No need to do anything if the value is not set
      if (!value) {
        return;
      }

      // (2) Collect 'leaf' treeCtrls
      const newTreeCtrls = [];
      const visitor = (treeCtrls, treeCtrl) => {
        const node = /** @type {!gmfThemes.GmfGroup|!gmfThemes.GmfLayer} */ (
          treeCtrl.node);
        const children = node.children;
        if (!children) {
          treeCtrls.push(treeCtrl);
        }
      };
      for (let i = 0, ii = value.length; i < ii; i++) {
        value[i].traverseDepthFirst(visitor.bind(this, newTreeCtrls));
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
   */
  clearDataSources_() {

    // (1) Remove data sources from ngeo collection
    const ngeoDataSources = this.ngeoDataSources_.getArray();
    for (let i = ngeoDataSources.length - 1, ii = 0; i >= ii; i--) {
      if (this.dataSourcesCache_[ngeoDataSources[i].id]) {
        // Use the `remove` method of the `ol.Collection` object for it
        // to update its length accordingly and trigger the REMOVE event as
        // well.
        this.ngeoDataSources_.remove(ngeoDataSources[i]);
      }
    }

    // (2) Clear the cache
    ol.obj.clear(this.dataSourcesCache_);
  }

  /**
   * Create a data source using the information on the node, group node
   * and OGC servers. If the node has children, then we loop in those to get
   * leaf nodes. Only leaf nodes end up creating a data source. If a data
   * source with the same id already exists, then the node is skipped.
   *
   * Once a data source is created, it is added to the data sources cache.
   *
   * @param {gmfThemes.GmfGroup} firstLevelGroup The first level group node.
   * @param {!gmfThemes.GmfGroup|!gmfThemes.GmfLayer} node The node, which
   *     may have children or not.
   * @param {!gmfThemes.GmfOgcServers} ogcServers OGC servers.
   * @private
   */
  createDataSource_(firstLevelGroup, node, ogcServers) {

    const children = node.children;

    // (1) Group node (node that has children). Loop in the children
    //     individually and create a data source for each one of them. The
    //     group node itself is **skipped**.
    if (children) {
      for (const child of children) {
        goog.asserts.assert(child);
        this.createDataSource_(firstLevelGroup, child, ogcServers);
      }
      return;
    }

    // From there on, the node is a layer node.
    const gmfLayer = /** @type gmfThemes.GmfLayer */ (node);

    // (2) Skip layer node if a data source with the same id exists
    const id = ol.getUid(gmfLayer);
    if (this.dataSourcesCache_[id]) {
      return;
    }

    // From there on, a data source will be created
    const meta = gmfLayer.metadata;
    const ogcType = gmfLayer.type;
    let maxResolution;
    let minResolution;
    let ogcLayers;
    let ogcServer;
    let wmtsLayer;
    let wmtsUrl;
    let ogcImageType;
    let timeProperty;

    if (ogcType === gmf.theme.Themes.NodeType.WMTS) {
      // (3) Manage WMTS
      const gmfLayerWMTS = /** @type {gmfThemes.GmfLayerWMTS} */ (gmfLayer);

      // Common options for WMTS
      wmtsLayer = gmfLayerWMTS.layer;
      wmtsUrl = gmfLayerWMTS.url;
      maxResolution = meta.maxResolution;
      minResolution = meta.minResolution;

      // OGC Layers
      const layers = meta.queryLayers || meta.wmsLayers;
      if (layers) {
        ogcLayers = layers.split(',').map((layer) => {
          return {
            maxResolution: maxResolution,
            minResolution: minResolution,
            name: layer,
            queryable: true
          };
        });
      }

      // OGC Server
      if (meta.ogcServer && ogcServers[meta.ogcServer]) {
        ogcServer = ogcServers[meta.ogcServer];
      }
      ogcImageType = gmfLayerWMTS.imageType;
    } else if (ogcType === gmf.theme.Themes.NodeType.WMS) {
      // (4) Manage WMS
      const gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (gmfLayer);

      // Common options for WMS
      maxResolution = gmfLayerWMS.maxResolutionHint;
      minResolution = gmfLayerWMS.minResolutionHint;

      // OGC Layers
      ogcLayers = gmfLayerWMS.childLayers.map((childLayer) => {
        return {
          maxResolution: childLayer.maxResolutionHint,
          minResolution: childLayer.minResolutionHint,
          name: childLayer.name,
          queryable: childLayer.queryable
        };
      });

      // OGC Server
      const ogcServerName = (!firstLevelGroup || firstLevelGroup.mixed) ?
        gmfLayerWMS.ogcServer : firstLevelGroup.ogcServer;
      goog.asserts.assert(ogcServerName);
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
    const wmsIsSingleTile = ogcServer ? ogcServer.isSingleTile : undefined;
    const wfsUrl = ogcServer && ogcServer.wfsSupport ?
      ogcServer.urlWfs : undefined;
    const wmsUrl = ogcServer ? ogcServer.url : undefined;

    let wfsOutputFormat = ngeo.datasource.OGC.WFSOutputFormat.GML3;
    // qgis server only supports GML2 output
    if (ogcServerType === ngeo.datasource.OGC.ServerType.QGISSERVER) {
      wfsOutputFormat = ngeo.datasource.OGC.WFSOutputFormat.GML2;
    }

    // (6) Snapping
    const snappable = !!meta.snappingConfig;
    const snappingTolerance = meta.snappingConfig ?
      meta.snappingConfig.tolerance : undefined;
    const snappingToEdges = meta.snappingConfig ?
      meta.snappingConfig.edge : undefined;
    const snappingToVertice = meta.snappingConfig ?
      meta.snappingConfig.vertex : undefined;

    // (7) Dimensions
    const dimensions = this.dimensions_;
    const dimensionsConfig = node.dimensions || firstLevelGroup.dimensions;

    // (8) Time values (lower or lower/upper)
    let timeLowerValue;
    let timeUpperValue;
    if (timeProperty) {
      const timeValues = this.ngeoWMSTime_.getOptions(timeProperty)['values'];
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
    const timeAttributeName = meta.timeAttribute;
    const visible = meta.isChecked === true;

    // Create the data source and add it to the cache
    this.dataSourcesCache_[id] = new gmf.datasource.OGC({
      copyable,
      dimensions,
      dimensionsConfig,
      gmfLayer,
      id,
      identifierAttribute,
      maxResolution,
      minResolution,
      name,
      ogcImageType,
      ogcLayers,
      ogcServerType,
      ogcType,
      snappable,
      snappingTolerance,
      snappingToEdges,
      snappingToVertice,
      timeAttributeName,
      timeLowerValue,
      timeProperty,
      timeUpperValue,
      visible,
      wfsOutputFormat,
      wfsUrl,
      wmsIsSingleTile,
      wmsUrl,
      wmtsLayer,
      wmtsUrl
    });
  }

  /**
   * If the given Layertree controller is a 'leaf', add it to the cache.
   * Also, set its according data source. Finally, add the data source to
   * the ngeo collection.
   *
   * @param {ngeo.layertree.Controller} treeCtrl Layertree controller to add
   * @private
   */
  addTreeCtrlToCache_(treeCtrl) {

    const id = ol.getUid(treeCtrl.node);
    const dataSource = this.dataSourcesCache_[id];
    goog.asserts.assert(dataSource, 'DataSource should be set');
    treeCtrl.setDataSource(dataSource);

    const stateWatcherUnregister = this.rootScope_.$watch(
      () => treeCtrl.getState(),
      this.handleTreeCtrlStateChange_.bind(this, treeCtrl)
    );

    const filterRulesWatcherUnregister = this.rootScope_.$watch(
      () => {
        const hasFilters = dataSource.filterRules !== null;
        const isVisible = dataSource.visible;
        return hasFilters && isVisible;
      },
      this.handleDataSourceFilterRulesChange_.bind(this, dataSource)
    );

    // Watch for time values change to update the WMS layer
    let timeLowerValueWatcherUnregister;
    let timeUpperValueWatcherUnregister;
    let wmsLayer;
    if (dataSource.timeProperty &&
        dataSource.ogcType === ngeo.datasource.OGC.Type.WMS
    ) {
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

      wmsLayer = goog.asserts.assertInstanceof(
        gmf.layertree.SyncLayertreeMap.getLayer(treeCtrl),
        ol.layer.Image
      );
    }

    this.treeCtrlCache_[id] = {
      filterRulesWatcherUnregister,
      stateWatcherUnregister,
      timeLowerValueWatcherUnregister,
      timeUpperValueWatcherUnregister,
      treeCtrl,
      wmsLayer
    };

    this.ngeoDataSources_.push(dataSource);

    this.gmfWFSAliases_.describe(dataSource);
  }

  /**
   * Remove a treeCtrl cache item. Unregister event listeners and remove the
   * data source from the ngeo collection.
   *
   * @param {gmfx.datasource.ManagerTreeCtrlCacheItem} item Layertree
   *     controller cache item
   * @private
   */
  removeTreeCtrlCacheItem_(item) {

    // (1) Remove data source
    const dataSource = item.treeCtrl.getDataSource();
    goog.asserts.assert(dataSource, 'DataSource should be set');
    this.ngeoDataSources_.remove(dataSource);

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
    delete this.treeCtrlCache_[ol.getUid(item.treeCtrl.node)];
  }

  /**
   * Clears the layer tree controller cache. At the same time, each item gets
   * its data source reference unset and state watcher unregistered.
   *
   * The data source gets also removed from the ngeo data sources collection.
   * @private
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
   * @param {ngeo.layertree.Controller} treeCtrl The layer tree controller
   * @param {string|undefined} newVal New state value
   * @private
   */
  handleTreeCtrlStateChange_(treeCtrl, newVal) {
    const dataSource = treeCtrl.getDataSource();
    goog.asserts.assert(dataSource, 'DataSource should be set');
    const visible = newVal === 'on';
    dataSource.visible = visible;

    // In GMF, multiple data sources can be combined into one ol.layer.Layer
    // object. When changing the state of a data source, we need to make
    // sure that the FILTER param match order of the current LAYERS param.
    //
    // Note: we only need to do this ONCE, as there can be only one
    // data source being filtered at a time
    const siblingDataSourceIds = gmf.layertree.SyncLayertreeMap.getLayer(
      treeCtrl).get('querySourceIds');
    if (Array.isArray(siblingDataSourceIds)) {
      const ngeoDataSources = this.ngeoDataSources_.getArray();
      for (const ngeoDataSource of ngeoDataSources) {
        if (ngeoDataSource instanceof gmf.datasource.OGC &&
            ngeoDataSource.filterRules !== null &&
            ngeoDataSource.id !== dataSource.id &&
            siblingDataSourceIds.includes(ngeoDataSource.id) &&
            ngeoDataSource.visible
        ) {
          this.handleDataSourceFilterRulesChange_(ngeoDataSource, true);
          break;
        }
      }
    }
  }

  /**
   * Returns a layertree controller cache item, if it exists.
   *
   * @param {ngeo.layertree.Controller} treeCtrl The layer tree controller
   * @return {gmfx.datasource.ManagerTreeCtrlCacheItem} Cache item
   * @private
   */
  getTreeCtrlCacheItem_(treeCtrl) {
    return this.treeCtrlCache_[ol.getUid(treeCtrl.node)] || null;
  }

  /**
   * Called when both the 'visible' and 'filterRules' properties of a data
   * source change.
   *
   * If the data source is filtrable, then make sure that when it gets rules
   * set to apply them as OGC filters to the OpenLayers layer, more precisely
   * as a `FILTER` parameter in the layer's source parameters.
   *
   * @param {!gmf.datasource.OGC} dataSource Data source.
   * @param {boolean} value Value.
   * @private
   */
  handleDataSourceFilterRulesChange_(dataSource, value) {

    // Skip data sources that are not filtrables OR those that do not have
    // the WMS ogcType, i.e. those that do not have an OpenLayers layer
    // to update
    if (dataSource.filtrable !== true ||
        dataSource.ogcType !== ngeo.datasource.OGC.Type.WMS
    ) {
      return;
    }

    const id = ol.getUid(dataSource.gmfLayer);
    const item = this.treeCtrlCache_[id];
    goog.asserts.assert(item);
    const treeCtrl = item.treeCtrl;

    const layer = gmf.layertree.SyncLayertreeMap.getLayer(treeCtrl);
    goog.asserts.assert(
      layer instanceof ol.layer.Image ||
      layer instanceof ol.layer.Tile
    );

    const source = layer.getSource();
    goog.asserts.assert(
      source instanceof ol.source.ImageWMS ||
      source instanceof ol.source.TileWMS
    );

    const filtrableLayerName = dataSource.getFiltrableOGCLayerName();
    const projCode = treeCtrl.map.getView().getProjection().getCode();
    const filterString = dataSource.visible ?
      this.ngeoRuleHelper_.createFilterString({
        dataSource,
        projCode
      }) :
      null;

    const filterParam = 'FILTER';
    let filterParamValue = null;

    if (filterString) {
      const params = source.getParams();
      const layersParam = params['LAYERS'];
      const layersList = layersParam.split(',');
      goog.asserts.assert(layersList.length >= 1);

      if (layersList.length === 1) {
        // When there's only one layer in the `LAYERS` parameters, then
        // the filter string is given as-is.
        filterParamValue = filterString;
      } else {
        // When there's more then one layer, then each filter must be wrapped
        // between parenthesis and the order must also match the `LAYERS`
        // parameter as well.
        const filterParamValues = [];
        for (let i = 0, ii = layersList.length; i < ii; i++) {
          if (layersList[i] === filtrableLayerName) {
            filterParamValues.push(`(${filterString})`);
          } else {
            filterParamValues.push('()');
          }
        }
        filterParamValue = filterParamValues.join('');
      }
    }

    source.updateParams({
      [filterParam]: filterParamValue
    });
  }

  /**
   * Called when either the `timeLowerValue` or `timeUpperValue` property of a
   * data source changes.
   *
   * Get the range value from the data source, then update the WMS layer
   * thereafter.
   *
   * @param {!gmf.datasource.OGC} dataSource Data source.
   * @private
   */
  handleDataSourceTimeValueChange_(dataSource) {

    const id = ol.getUid(dataSource.gmfLayer);
    const item = this.treeCtrlCache_[id];
    goog.asserts.assert(item);
    const wmsLayer = goog.asserts.assert(item.wmsLayer);
    const wmsSource = goog.asserts.assertInstanceof(
      wmsLayer.getSource(),
      ol.source.ImageWMS
    );

    const timeProperty = goog.asserts.assert(dataSource.timeProperty);
    let timeParam;
    const range = dataSource.timeRangeValue;
    if (range) {
      timeParam = this.ngeoWMSTime_.formatWMSTimeParam(timeProperty, range);
    }

    // No need to update the TIME param if already the same value;
    const params = wmsSource.getParams();
    const currentTimeParam = params['TIME'];
    if (currentTimeParam === timeParam) {
      return;
    }

    // The `timeParam` can be undefined, which means that the TIME property
    // gets reset.
    this.ngeoLayerHelper_.updateWMSLayerState(
      wmsLayer,
      wmsSource.getParams()['LAYERS'],
      timeParam
    );
  }

  /**
   * Called when the background layer changes. Add/Remove the according data
   * sources to/from the ngeo data sources collection. Update the data source
   * `visible` property as well.
   *
   * The `querySourceIds` property in the layer is used to determine the
   * data sources that are bound to the layer.
   *
   * @param {!ngeox.BackgroundEvent} evt Event.
   * @private
   */
  handleNgeoBackgroundLayerChange_(evt) {

    const previousBackgroundLayer = evt.detail.previous;
    const currentBackgroundLayer = evt.detail.current;
    const cache = this.dataSourcesCache_;

    // Remove data sources linked to previous background layer
    if (previousBackgroundLayer) {
      const ids = previousBackgroundLayer.get('querySourceIds');
      if (Array.isArray(ids)) {
        for (const id of ids) {
          const dataSource = cache[id];
          if (dataSource) {
            dataSource.visible = false;
            this.ngeoDataSources_.remove(dataSource);
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
            this.ngeoDataSources_.push(dataSource);
          }
        }
      }
    }
  }
};


/**
 * @type {!angular.Module}
 */
gmf.datasource.Manager.module = angular.module('gmfDataSourcesManager', [
  gmf.layertree.SyncLayertreeMap.module.name,
  gmf.layertree.TreeManager.module.name,
  gmf.theme.Themes.module.name,
  ngeo.filter.RuleHelper.module.name,
  ngeo.map.BackgroundLayerMgr.module.name,
  ngeo.map.LayerHelper.module.name,
  ngeo.misc.WMSTime.module.name,
]);
gmf.datasource.Manager.module.service('gmfDataSourcesManager', gmf.datasource.Manager);
gmf.module.requires.push(gmf.datasource.Manager.module.name);
