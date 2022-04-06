// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import gmfDatasourceFileGroup from 'gmf/datasource/fileGroupModule';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';
import gmfThemeThemes, {ThemeNodeType, getSnappingConfig} from 'gmf/theme/Themes';
import ngeoLayertreeController, {getFirstParentTree} from 'ngeo/layertree/Controller';
import ngeoDatasourceFile from 'ngeo/datasource/File';
import {DEFAULT_GEOMETRY_NAME} from 'ngeo/datasource/OGC';
import {getUid as olUtilGetUid} from 'ol/util';
import {listen, unlistenByKey} from 'ol/events';
import olCollection, {CollectionEvent} from 'ol/Collection';
import olFormatWFS from 'ol/format/WFS';
import olInteractionSnap from 'ol/interaction/Snap';

export class CustomSnap extends olInteractionSnap {
  /**
   * @param {import('ol/interaction/Snap').Options} options
   */
  constructor(options) {
    super(options);
    document.body.addEventListener('keydown', (evt) => {
      this.setActive(evt.keyCode !== 17); // Ctrl key
    });
    document.body.addEventListener('keyup', () => {
      this.setActive(true);
    });
  }
}

/**
 * The snapping service of GMF. Responsible of collecting the treeCtrls that
 * support snapping and store them here. As soon as a treeCtrl state becomes
 * 'on', a WFS GetFeature request is issued to collect the features at the
 * map view location. A new request is sent every time the map is panned or
 * zoomed for each treeCtrl that are still 'on'.
 *
 * Features returned by these requests get bound to a `ol.interaction.Snap`,
 * which allows the snapping to occur on other places where vector
 * features are drawn or modified.
 *
 *
 * @class
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {angular.IQService} $q The Angular $q service.
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.auto.IInjectorService} $injector Angular injector.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('gmf/datasource/fileGroupModule').DatasourceFileGroup} gmfDatasourceFileGroup Group that contains file data sources.
 * @param {import('gmf/themes').GmfSnappingConfig} gmfSnappingConfig Snapping configuration options for the
 *     features in the Draw tool and in the "Layer Import / Local" tool.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf Themes service.
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @param {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} ngeoFeatures Collection
 *    of features.
 * @param {import('gmf/options.js').gmfSnappingOptions} gmfSnappingOptions The options.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSnapping
 */
export function EditingSnappingService(
  $http,
  $q,
  $rootScope,
  $injector,
  $timeout,
  gmfDatasourceFileGroup,
  gmfSnappingConfig,
  gmfThemes,
  gmfTreeManager,
  ngeoFeatures,
  gmfSnappingOptions
) {
  // === Injected services ===

  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @type {angular.IQService}
   */
  this.q_ = $q;

  /**
   * @type {angular.IScope}
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.auto.IInjectorService}
   */
  this.injector_ = $injector;

  /**
   * @type {import('gmf/datasource/fileGroupModule').DatasourceFileGroup}
   */
  this.gmfDatasourceFileGroup_ = gmfDatasourceFileGroup;

  /**
   * @type {import('gmf/themes').GmfSnappingConfig}
   */
  this.gmfSnappingConfig_ = gmfSnappingConfig;

  /**
   * @type {import('gmf/options.js').gmfSnappingOptions}
   */
  this.gmfSnappingOptions_ = gmfSnappingOptions;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.ngeoFeatures_ = ngeoFeatures;

  // === Properties ===

  /**
   * A cache containing all available snappable items, in which the listening
   * of the state of the `treeCtrl` is registered and unregistered.
   *
   * @type {Cache}
   */
  this.cache_ = {};

  /**
   * A cache for the File data sources that are added in the
   * FileGroup, i.e. for example when a KML is added, then a File data
   * source is added to the FileGroup's collection, and their features
   * need to be snappable.
   *
   * @type {CacheFileDataSource}
   */
  this.cacheFileDataSource_ = {};

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * @type {?import('ol/Map').default}
   */
  this.map_ = null;

  /**
   * Reference to the promise taking care of calling all GetFeature requests
   * of the currently active cache items after the map view changed. Used
   * to cancel if the map view changes often within a short period of time.
   *
   * @type {?angular.IPromise<void>}
   */
  this.mapViewChangePromise_ = null;

  /**
   * @type {!CustomSnap}
   */
  this.ngeoFeaturesSnapInteraction_ = new CustomSnap({
    edge: gmfSnappingConfig.edge,
    features: ngeoFeatures,
    pixelTolerance: gmfSnappingConfig.tolerance,
    vertex: gmfSnappingConfig.vertex,
  });

  /**
   * A reference to the OGC servers loaded by the theme service.
   *
   * @type {import('gmf/themes').GmfOgcServers|null}
   */
  this.ogcServers_ = null;

  /**
   * @type {import('ol/source/Vector').default<unknown>|undefined}
   */
  this.ngeoSnappingSource_ = this.injector_.has('ngeoSnappingSource')
    ? this.injector_.get('ngeoSnappingSource')
    : undefined;
}

/**
 * In order for a `ol.interaction.Snap` to work properly, it has to be added
 * to the map after any draw interactions or other kinds of interactions that
 * interacts with features on the map.
 *
 * This method can be called to make sure the Snap interactions are on top.
 *
 */
EditingSnappingService.prototype.ensureSnapInteractionsOnTop = function () {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const map = this.map_;

  // (1) Deal with the WMS items first
  let item;
  for (const uid in this.cache_) {
    item = this.cache_[uid];
    if (item.active) {
      if (!item.interaction) {
        throw new Error('Missing item.interaction');
      }
      map.removeInteraction(item.interaction);
      map.addInteraction(item.interaction);
    }
  }

  // (2) Then with the file data source items
  for (const uid in this.cacheFileDataSource_) {
    item = this.cacheFileDataSource_[uid];
    if (item.active) {
      if (!item.interaction) {
        throw new Error('Missing item.interaction');
      }
      map.removeInteraction(item.interaction);
      map.addInteraction(item.interaction);
    }
  }

  // (3) Finally, deal with the ngeo features, a.k.a. the features in
  //     the "draw" tool
  map.removeInteraction(this.ngeoFeaturesSnapInteraction_);
  map.addInteraction(this.ngeoFeaturesSnapInteraction_);
};

/**
 * Bind the snapping service to a map
 *
 * @param {?import('ol/Map').default} map Map
 */
EditingSnappingService.prototype.setMap = function (map) {
  const keys = this.listenerKeys_;

  if (this.map_) {
    if (!this.treeCtrlsUnregister_) {
      throw new Error('Missing treeCtrlsUnregister');
    }
    this.treeCtrlsUnregister_();
    this.unregisterAllTreeCtrl_();
    keys.forEach(unlistenByKey);
    keys.length = 0;
    this.map_.removeInteraction(this.ngeoFeaturesSnapInteraction_);
  }

  this.map_ = map;

  if (map) {
    // (1) Listen to the layer tree nodes changes to manage the WMS
    //     (WFS) layers that support being snapped on.
    this.treeCtrlsUnregister_ = this.rootScope_.$watchCollection(
      () => {
        if (this.gmfTreeManager_.rootCtrl) {
          return this.gmfTreeManager_.rootCtrl.children;
        }
      },
      (value) => {
        // Timeout required, because the collection event is fired before the
        // leaf nodes are created and they are the ones we're looking for here.
        this.timeout_(() => {
          if (value) {
            if (!this.gmfTreeManager_.rootCtrl) {
              throw new Error('Missing gmfTreeManager_.rootCtrl');
            }
            this.unregisterAllTreeCtrl_();
            this.gmfTreeManager_.rootCtrl.traverseDepthFirst(this.registerTreeCtrl_.bind(this));
          }
        }, 0);
      }
    );

    keys.push(
      // (2) Listen when the themes change to reobtain the OGC servers
      listen(this.gmfThemes_, 'change', this.handleThemesChange_, this),
      // (3) Listen when the map is moved to update the vector
      //     features of the WMS (WFS) layers
      listen(map, 'moveend', this.handleMapMoveEnd_, this)
    );

    // (4) Listen when File data sources are added to the File Group
    //     (i.e. when vector files are imported using the Import tool,
    //     they create File data sources, which contain features that have
    //     to be snapped on)
    const fileGroup = this.gmfDatasourceFileGroup_.fileGroup;
    if (fileGroup) {
      keys.push(
        listen(fileGroup.dataSourcesCollection, 'add', this.handleFileGroupDataSourcesCollectionAdd_, this),
        listen(
          fileGroup.dataSourcesCollection,
          'remove',
          this.handleFileGroupDataSourcesCollectionRemove_,
          this
        )
      );
    }

    // (5) Enable the snapping on 'ngeo features', i.e. on features
    //     that are added/drawn using the Draw tool
    map.addInteraction(this.ngeoFeaturesSnapInteraction_);
  }
};

/**
 * Called when the themes change. Get the OGC servers, then listen to the
 * tree manager Layertree controllers array changes.
 */
EditingSnappingService.prototype.handleThemesChange_ = function () {
  this.ogcServers_ = null;
  this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
    this.ogcServers_ = ogcServers;
  });
};

/**
 * Registers a newly added Layertree controller 'leaf'. If it's snappable,
 * create and add a cache item with every configuration required to do the
 * snapping. It becomes active when its state is set to 'on'.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Layertree controller to
 *    register
 */
EditingSnappingService.prototype.registerTreeCtrl_ = function (treeCtrl) {
  // Skip any Layertree controller that has a node that is not a leaf
  let node = /** @type {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  const groupNode = /** @type {import('gmf/themes').GmfGroup} */ (node);
  if (groupNode.children) {
    return;
  }

  // If treeCtrl is snappable and supports WFS, listen to its state change.
  // When it becomes visible, it's added to the list of snappable tree ctrls.
  node = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  const snappingConfig = getSnappingConfig(node);
  const maxFeatures = this.gmfSnappingOptions_.maxFeatures || 50;
  if (snappingConfig) {
    const wfsConfig = this.getWFSConfig_(treeCtrl);
    if (wfsConfig) {
      const uid = olUtilGetUid(treeCtrl);

      const stateWatcherUnregister = this.rootScope_.$watch(
        () => this.isSnappingActiveForTreeCtrl_(treeCtrl),
        this.handleTreeCtrlStateChange_.bind(this, treeCtrl)
      );

      const ogcServer = this.getOGCServer_(treeCtrl);
      if (!ogcServer) {
        throw new Error('Missing ogcServer');
      }
      this.cache_[uid] = {
        active: false,
        featureNS: ogcServer.wfsFeatureNS,
        featurePrefix: 'feature',
        features: new olCollection(),
        interaction: null,
        maxFeatures: maxFeatures,
        requestDeferred: null,
        snappingConfig: snappingConfig,
        treeCtrl: treeCtrl,
        wfsConfig: wfsConfig,
        stateWatcherUnregister: stateWatcherUnregister,
      };

      // This extra call is to initialize the treeCtrl with its current state
      this.handleTreeCtrlStateChange_(treeCtrl, this.isSnappingActiveForTreeCtrl_(treeCtrl));
    }
  }
};

/**
 * Unregisters all removed layertree controllers 'leaf'. Remove the according
 * cache item and deactivate it as well. Unregister events.
 */
EditingSnappingService.prototype.unregisterAllTreeCtrl_ = function () {
  for (const uid in this.cache_) {
    const item = this.cache_[uid];
    if (item) {
      item.stateWatcherUnregister();
      this.deactivateItem_(item);
      delete this.cache_[uid];
    }
  }
};

/**
 * Get the OGC server.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl The layer tree controller
 * @returns {?import('gmf/themes').GmfOgcServer} The OGC server.
 */
EditingSnappingService.prototype.getOGCServer_ = function (treeCtrl) {
  const gmfLayer = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  if (gmfLayer.type !== ThemeNodeType.WMS) {
    return null;
  }
  const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));

  let ogcServerName;
  const gmfGroup = /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.parent.node);
  if (gmfGroup.mixed) {
    ogcServerName = gmfLayerWMS.ogcServer;
  } else {
    const firstTreeCtrl = getFirstParentTree(treeCtrl);
    const firstNode = /** @type {import('gmf/themes').GmfGroup} */ (firstTreeCtrl.node);
    ogcServerName = firstNode.ogcServer;
  }
  if (!ogcServerName) {
    return null;
  }
  if (!this.ogcServers_) {
    throw new Error('Missing ogcServers');
  }
  return this.ogcServers_[ogcServerName];
};

/**
 * Get the configuration required to do WFS requests (for snapping purpose)
 * from a Layertree controller that has a leaf node.
 *
 * The following requirements must be met in order for a treeCtrl to be
 * considered supporting WFS:
 *
 * 1) ogcServers objects are loaded
 * 2) its node `type` property is equal to `WMS`
 * 3) in its node `childLayers` property, the `queryable` property is set
 *    to `true`
 * 4) the ogcServer defined in 3) has the `wfsSupport` property set to `true`.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl The layer tree controller
 * @returns {?WFSConfig} The configuration object.
 */
EditingSnappingService.prototype.getWFSConfig_ = function (treeCtrl) {
  // (1)
  if (this.ogcServers_ === null) {
    return null;
  }

  const gmfLayer = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);

  // (2)
  if (gmfLayer.type !== ThemeNodeType.WMS) {
    return null;
  }

  const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));

  // (3)
  const featureTypes = [];
  for (let i = 0, ii = gmfLayerWMS.childLayers.length; i < ii; i++) {
    if (gmfLayerWMS.childLayers[i].queryable) {
      featureTypes.push(gmfLayerWMS.childLayers[i].name);
    }
  }
  if (!featureTypes.length) {
    return null;
  }

  // (4)
  const ogcServer = this.getOGCServer_(treeCtrl);
  if (!ogcServer || !ogcServer.wfsSupport) {
    return null;
  }

  // At this point, every requirements have been met.
  // Create and return the configuration.
  const urlWfs = ogcServer.urlWfs;
  if (!urlWfs) {
    throw new Error('Missing urlWfs');
  }

  return {
    featureTypes: featureTypes.join(','),
    url: urlWfs,
  };
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl The layer tree controller
 * @returns {boolean} True if state is on and snapping is activated for that layer.
 */
EditingSnappingService.prototype.isSnappingActiveForTreeCtrl_ = function (treeCtrl) {
  // Note: a snappable treeCtrl can only be a leaf, therefore the only possible
  //       states are: 'on' and 'off'.
  if (treeCtrl.getState() !== 'on') {
    return false;
  }
  if (treeCtrl.properties.snapping !== undefined) {
    if (typeof treeCtrl.properties.snapping !== 'boolean') {
      throw new Error('Wrong snappingActive type');
    }
    return treeCtrl.properties.snapping;
  }
  const node = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  const config = getSnappingConfig(node);
  return config !== null && config.activated;
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl The layer tree controller
 * @param {boolean} newVal New value for the layer
 */
EditingSnappingService.prototype.handleTreeCtrlStateChange_ = function (treeCtrl, newVal) {
  const uid = olUtilGetUid(treeCtrl);
  const item = this.cache_[uid];

  newVal ? this.activateItem_(item) : this.deactivateItem_(item);
};

/**
 * Activate a cache item by adding a Snap interaction to the map and launch
 * the initial request to get the features.
 *
 * @param {CacheItem} item Cache item.
 */
EditingSnappingService.prototype.activateItem_ = function (item) {
  if (!this.map_) {
    throw new Error('Missing map');
  }

  // No need to do anything if item is already active
  if (item.active) {
    return;
  }

  const map = this.map_;

  const interaction = new CustomSnap({
    edge: item.snappingConfig.edge,
    features: item.features,
    pixelTolerance: item.snappingConfig.tolerance,
    vertex: item.snappingConfig.vertex,
  });

  map.addInteraction(interaction);

  item.interaction = interaction;
  item.active = true;

  // Init features
  this.loadItemFeatures_(item);
};

/**
 * Deactivate a cache item by removing the snap interaction and clearing any
 * existing features.
 *
 * @param {CacheItem} item Cache item.
 */
EditingSnappingService.prototype.deactivateItem_ = function (item) {
  if (!this.map_) {
    throw new Error('Missing map');
  }

  // No need to do anything if item is already inactive
  if (!item.active) {
    return;
  }

  const map = this.map_;

  const interaction = item.interaction;
  if (!interaction) {
    throw new Error('Missing interaction');
  }
  map.removeInteraction(interaction);

  item.interaction = null;
  item.features.clear();

  // If a previous request is still running, cancel it.
  if (item.requestDeferred) {
    item.requestDeferred.resolve();
    item.requestDeferred = null;
  }

  item.active = false;
  this.refreshSnappingSource_();
};

EditingSnappingService.prototype.loadAllItems_ = function () {
  this.mapViewChangePromise_ = null;
  let item;
  for (const uid in this.cache_) {
    item = this.cache_[uid];
    if (item.active) {
      this.loadItemFeatures_(item);
    }
  }
};

/**
 * Manually refresh all features
 */
EditingSnappingService.prototype.refresh = function () {
  this.loadAllItems_();
};

/**
 * For a specific cache item, issue a new WFS GetFeatures request. The returned
 * features set in the item collection of features (they replace any existing
 * ones first).
 *
 * @param {CacheItem} item Cache item.
 */
EditingSnappingService.prototype.loadItemFeatures_ = function (item) {
  if (!this.map_) {
    throw new Error('Missing map');
  }

  // If a previous request is still running, cancel it.
  if (item.requestDeferred) {
    item.requestDeferred.resolve();
  }

  const map = this.map_;

  const view = map.getView();
  const size = map.getSize();
  if (!size) {
    throw new Error('Missing size');
  }

  const extent = view.calculateExtent(size);
  const projCode = view.getProjection().getCode();
  const featureTypes = item.wfsConfig.featureTypes.split(',');

  const getFeatureOptions = {
    srsName: projCode,
    featureNS: item.featureNS,
    featurePrefix: item.featurePrefix,
    featureTypes: featureTypes,
    outputFormat: 'GML3',
    bbox: extent,
    geometryName: DEFAULT_GEOMETRY_NAME,
    maxFeatures: item.maxFeatures,
  };

  const wfsFormat = new olFormatWFS();
  const xmlSerializer = new XMLSerializer();
  const featureRequestXml = wfsFormat.writeGetFeature(getFeatureOptions);
  const featureRequest = xmlSerializer.serializeToString(featureRequestXml);
  const url = item.wfsConfig.url;

  item.requestDeferred = this.q_.defer();

  this.http_
    .post(url, featureRequest, {timeout: item.requestDeferred.promise})
    .then((response) => {
      // (1) Unset requestDeferred
      item.requestDeferred = null;

      // (2) Clear any previous features in the item
      item.features.clear();

      // (3) Read features from request response and add them to the item
      const readFeatures =
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (
          new olFormatWFS().readFeatures(response.data)
        );
      if (readFeatures) {
        item.features.extend(readFeatures);
        this.refreshSnappingSource_();
      }
    })
    .catch((err) => {
      if (err.xhrStatus === 'abort') {
        console.error('WFS request aborted.');
      } else {
        console.error(err);
      }
    });
};

/**
 * Called when the map view changes. Load all active cache items after a small
 * delay. Cancel any currently delayed call, if required.
 */
EditingSnappingService.prototype.handleMapMoveEnd_ = function () {
  if (this.mapViewChangePromise_) {
    this.timeout_.cancel(this.mapViewChangePromise_);
  }
  this.mapViewChangePromise_ = this.timeout_(this.loadAllItems_.bind(this), 400);
};

EditingSnappingService.prototype.refreshSnappingSource_ = function () {
  if (this.ngeoSnappingSource_ === undefined) {
    return;
  }
  this.ngeoSnappingSource_.clear();
  for (const uid in this.cache_) {
    const item = this.cache_[uid];
    if (item.features === undefined) {
      throw new Error('Missing features');
    }
    if (item.active) {
      this.ngeoSnappingSource_.addFeatures(item.features.getArray());
    }
  }
};

/**
 * Called when a File data source is added to the File Group (imported
 * geospatial files). Make its features snappable.
 *
 * @param {Event|import('ol/events/Event').default} evt Event
 */
EditingSnappingService.prototype.handleFileGroupDataSourcesCollectionAdd_ = function (evt) {
  if (!(evt instanceof CollectionEvent)) {
    return;
  }

  const fileDataSource = evt.element;
  if (!(fileDataSource instanceof ngeoDatasourceFile)) {
    return;
  }

  // (1) Create Snap interaction and give it the features collection
  //     of the data source.
  const features = fileDataSource.featuresCollection;
  const gmfSnappingConfig = this.gmfSnappingConfig_;
  const interaction = new CustomSnap({
    edge: gmfSnappingConfig.edge,
    features,
    pixelTolerance: gmfSnappingConfig.tolerance,
    vertex: gmfSnappingConfig.vertex,
  });

  // (2) Watch the visible property of the data source. When ON, the
  //     snap should be added. When OFF, it should be removed.
  const visibleWatcherUnregister = this.rootScope_.$watch(() => {
    return fileDataSource.visible;
  }, this.handleFileDataSourceVisibleChange_.bind(this, fileDataSource));

  const uid = olUtilGetUid(fileDataSource);

  // (3) Create and add the cache item
  this.cacheFileDataSource_[uid] = {
    active: false,
    fileDataSource,
    interaction,
    visibleWatcherUnregister,
  };

  // (4) Initialize the Snap interaction with the File DataSource,
  //     depending on its current visible value
  this.handleFileDataSourceVisibleChange_(fileDataSource);
};

/**
 * Called when a File data source is removed from the File
 * Group. Remove the features from being snappable.
 *
 * @param {Event|import('ol/events/Event').default} evt Event
 */
EditingSnappingService.prototype.handleFileGroupDataSourcesCollectionRemove_ = function (evt) {
  if (!(evt instanceof CollectionEvent)) {
    return;
  }

  const fileDataSource = evt.element;
  if (!(fileDataSource instanceof ngeoDatasourceFile)) {
    return;
  }

  const uid = olUtilGetUid(fileDataSource);
  if (!this.cacheFileDataSource_[uid]) {
    return;
  }

  const item = this.cacheFileDataSource_[uid];
  const map = this.map_;

  // (1) Unregister watcher
  item.visibleWatcherUnregister();

  // (2) Remove snap interaction, if item is active
  if (item.active) {
    map.removeInteraction(item.interaction);
  }

  // (3) Delete item from cache, and we're done
  delete this.cacheFileDataSource_[uid];
};

/**
 * Called when the "visible" property of a File data source
 * changes. Add or remove the Snap interaction for that data source
 * depending on the property value.
 *
 * @param {ngeoDatasourceFile} fileDataSource
 */
EditingSnappingService.prototype.handleFileDataSourceVisibleChange_ = function (fileDataSource) {
  const uid = olUtilGetUid(fileDataSource);
  const item = this.cacheFileDataSource_[uid];
  const visible = fileDataSource.visible;

  // No need to do anything if DS visible/hidden and the item is
  // active/inactive already.
  if (item.active === visible) {
    return;
  }

  item.active = visible;
  const map = this.map_;

  if (visible) {
    map.addInteraction(item.interaction);
  } else {
    map.removeInteraction(item.interaction);
  }
};

/**
 * @typedef {Object<string, CacheItem>} Cache
 */

/**
 * @typedef {Object} CacheItem
 * @property {boolean} active
 * @property {string} featureNS
 * @property {string} featurePrefix
 * @property {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} features
 * @property {?import('ol/interaction/Snap').default} interaction
 * @property {number} maxFeatures
 * @property {?angular.IDeferred<unknown>} requestDeferred
 * @property {import('gmf/themes').GmfSnappingConfig} snappingConfig
 * @property {Function} stateWatcherUnregister
 * @property {import('ngeo/layertree/Controller').LayertreeController} treeCtrl
 * @property {WFSConfig} wfsConfig
 */

/**
 * The key is: A uid string generated from the fileDataSource
 *
 * @typedef {Object<string, CacheFileDataSourceItem>} CacheFileDataSource
 */

/**
 * @typedef {Object} CacheFileDataSourceItem
 * @property {boolean} active
 * @property {import('ngeo/datasource/File').default} fileDataSource
 * @property {import('ol/interaction/Snap').default} interaction
 * @property {Function} visibleWatcherUnregister
 */

/**
 * @typedef {Object} WFSConfig
 * @property {string} featureTypes
 * @property {string} url
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfSnapping', [
  gmfDatasourceFileGroup.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  ngeoLayertreeController.name,
]);
myModule.service('gmfSnapping', EditingSnappingService);

export default myModule;
