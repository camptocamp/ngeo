import angular from 'angular';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes, {ThemeNodeType, getSnappingConfig} from 'gmf/theme/Themes.js';
import ngeoLayertreeController, {getFirstParentTree} from 'ngeo/layertree/Controller.js';
import {DEFAULT_GEOMETRY_NAME} from 'ngeo/datasource/OGC.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olFormatWFS from 'ol/format/WFS.js';
import olInteractionSnap from 'ol/interaction/Snap.js';


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
 * @constructor
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {angular.IQService} $q The Angular $q service.
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.auto.IInjectorService} $injector Angular injector.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager The gmf TreeManager
 *    service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSnapping
 * @hidden
 */
export function EditingSnappingService(
  $http, $q, $rootScope, $injector, $timeout, gmfThemes, gmfTreeManager
) {

  // === Injected services ===

  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.http_ = $http;

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
   * @type {angular.auto.IInjectorService}
   * @private
   */
  this.injector_ = $injector;

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


  // === Properties ===

  /**
   * A cache containing all available snappable items, in which the listening
   * of the state of the `treeCtrl` is registered and unregistered.
   * @type {Cache}
   * @private
   */
  this.cache_ = {};

  /**
   * @type {Array<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {?import("ol/Map.js").default}
   * @private
   */
  this.map_ = null;

  /**
   * Reference to the promise taking care of calling all GetFeature requests
   * of the currently active cache items after the map view changed. Used
   * to cancel if the map view changes often within a short period of time.
   * @type {?angular.IPromise<void>}
   * @private
   */
  this.mapViewChangePromise_ = null;

  /**
   * A reference to the OGC servers loaded by the theme service.
   * @type {import('gmf/themes.js').GmfOgcServers|null}
   * @private
   */
  this.ogcServers_ = null;

  /**
   * @type {import('ol/source/Vector.js').default<*>|undefined}
   * @private
   */
  this.ngeoSnappingSource_ = this.injector_.has('ngeoSnappingSource') ?
    this.injector_.get('ngeoSnappingSource') : undefined;
}


class CustomSnap extends olInteractionSnap {
  /**
   * @param {import('ol/interaction/Snap.js').Options} options
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
 * In order for a `ol.interaction.Snap` to work properly, it has to be added
 * to the map after any draw interactions or other kinds of interactions that
 * interacts with features on the map.
 *
 * This method can be called to make sure the Snap interactions are on top.
 *
 */
EditingSnappingService.prototype.ensureSnapInteractionsOnTop = function() {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const map = this.map_;

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
};


/**
 * Bind the snapping service to a map
 * @param {?import("ol/Map.js").default} map Map
 */
EditingSnappingService.prototype.setMap = function(map) {

  const keys = this.listenerKeys_;

  if (this.map_) {
    if (!this.treeCtrlsUnregister_) {
      throw new Error('Missing treeCtrlsUnregister');
    }
    this.treeCtrlsUnregister_();
    this.unregisterAllTreeCtrl_();
    keys.forEach(unlistenByKey);
    keys.length = 0;
  }

  this.map_ = map;

  if (map) {
    this.treeCtrlsUnregister_ = this.rootScope_.$watchCollection(() => {
      if (this.gmfTreeManager_.rootCtrl) {
        return this.gmfTreeManager_.rootCtrl.children;
      }
    }, (value) => {
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
    });

    keys.push(
      listen(this.gmfThemes_, 'change', this.handleThemesChange_, this),
      listen(map, 'moveend', this.handleMapMoveEnd_, this)
    );
  }
};


/**
 * Called when the themes change. Get the OGC servers, then listen to the
 * tree manager Layertree controllers array changes.
 * @private
 */
EditingSnappingService.prototype.handleThemesChange_ = function() {
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
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl Layertree controller to
 *    register
 * @private
 */
EditingSnappingService.prototype.registerTreeCtrl_ = function(treeCtrl) {

  // Skip any Layertree controller that has a node that is not a leaf
  let node = /** @type {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
  const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */(node);
  if (groupNode.children) {
    return;
  }

  // If treeCtrl is snappable and supports WFS, listen to its state change.
  // When it becomes visible, it's added to the list of snappable tree ctrls.
  node = /** @type {import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
  const snappingConfig = getSnappingConfig(node);
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
        maxFeatures: 50,
        requestDeferred: null,
        snappingConfig: snappingConfig,
        treeCtrl: treeCtrl,
        wfsConfig: wfsConfig,
        stateWatcherUnregister: stateWatcherUnregister
      };

      // This extra call is to initialize the treeCtrl with its current state
      this.handleTreeCtrlStateChange_(treeCtrl, this.isSnappingActiveForTreeCtrl_(treeCtrl));
    }
  }
};


/**
 * Unregisters all removed layertree controllers 'leaf'. Remove the according
 * cache item and deactivate it as well. Unregister events.
 *
 * @private
 */
EditingSnappingService.prototype.unregisterAllTreeCtrl_ = function() {
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
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
 * @return {?import('gmf/themes.js').GmfOgcServer} The OGC server.
 * @private
 */
EditingSnappingService.prototype.getOGCServer_ = function(treeCtrl) {
  const gmfLayer = /** @type {import('gmf/themes.js').GmfLayer} */(treeCtrl.node);
  if (gmfLayer.type !== ThemeNodeType.WMS) {
    return null;
  }
  const gmfLayerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */(gmfLayer);

  let ogcServerName;
  const gmfGroup = /** @type {import('gmf/themes.js').GmfGroup} */(treeCtrl.parent.node);
  if (gmfGroup.mixed) {
    ogcServerName = gmfLayerWMS.ogcServer;
  } else {
    const firstTreeCtrl = getFirstParentTree(treeCtrl);
    const firstNode = /** @type {import('gmf/themes.js').GmfGroup} */(firstTreeCtrl.node);
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
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
 * @return {?WFSConfig} The configuration object.
 * @private
 */
EditingSnappingService.prototype.getWFSConfig_ = function(treeCtrl) {

  // (1)
  if (this.ogcServers_ === null) {
    return null;
  }

  const gmfLayer = /** @type {import('gmf/themes.js').GmfLayer} */(treeCtrl.node);

  // (2)
  if (gmfLayer.type !== ThemeNodeType.WMS) {
    return null;
  }

  const gmfLayerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */(gmfLayer);

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
    url: urlWfs
  };
};


/**
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
 * @return {boolean} True if state is on and snapping is activated for that layer.
 * @private
 */
EditingSnappingService.prototype.isSnappingActiveForTreeCtrl_ = function(treeCtrl) {
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
  const node = /** @type {import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
  const config = getSnappingConfig(node);
  return config !== null && config.activated;
};


/**
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl The layer tree controller
 * @param {boolean} newVal New value for the layer
 * @private
 */
EditingSnappingService.prototype.handleTreeCtrlStateChange_ = function(treeCtrl, newVal) {

  const uid = olUtilGetUid(treeCtrl);
  const item = this.cache_[uid];

  newVal ? this.activateItem_(item) : this.deactivateItem_(item);
};


/**
 * Activate a cache item by adding a Snap interaction to the map and launch
 * the initial request to get the features.
 *
 * @param {CacheItem} item Cache item.
 * @private
 */
EditingSnappingService.prototype.activateItem_ = function(item) {
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
    vertex: item.snappingConfig.vertex
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
 * @private
 */
EditingSnappingService.prototype.deactivateItem_ = function(item) {
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


/**
 * @private
 */
EditingSnappingService.prototype.loadAllItems_ = function() {
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
EditingSnappingService.prototype.refresh = function() {
  this.loadAllItems_();
};


/**
 * For a specific cache item, issue a new WFS GetFeatures request. The returned
 * features set in the item collection of features (they replace any existing
 * ones first).
 *
 * @param {CacheItem} item Cache item.
 * @private
 */
EditingSnappingService.prototype.loadItemFeatures_ = function(item) {
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
    maxFeatures: item.maxFeatures
  };

  const wfsFormat = new olFormatWFS();
  const xmlSerializer = new XMLSerializer();
  const featureRequestXml = wfsFormat.writeGetFeature(getFeatureOptions);
  const featureRequest = xmlSerializer.serializeToString(featureRequestXml);
  const url = item.wfsConfig.url;

  item.requestDeferred = this.q_.defer();

  this.http_.post(url, featureRequest, {timeout: item.requestDeferred.promise})
    .then((response) => {
      // (1) Unset requestDeferred
      item.requestDeferred = null;

      // (2) Clear any previous features in the item
      item.features.clear();

      // (3) Read features from request response and add them to the item
      const readFeatures = new olFormatWFS().readFeatures(response.data);
      if (readFeatures) {
        item.features.extend(readFeatures);
        this.refreshSnappingSource_();
      }
    });
};


/**
 * Called when the map view changes. Load all active cache items after a small
 * delay. Cancel any currently delayed call, if required.
 * @private
 */
EditingSnappingService.prototype.handleMapMoveEnd_ = function() {
  if (this.mapViewChangePromise_) {
    this.timeout_.cancel(this.mapViewChangePromise_);
  }
  this.mapViewChangePromise_ = this.timeout_(
    this.loadAllItems_.bind(this),
    400
  );
};

/**
 * @private
 */
EditingSnappingService.prototype.refreshSnappingSource_ = function() {
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
 * @typedef {Object<string, CacheItem>} Cache
 */


/**
 * @typedef {Object} CacheItem
 * @property {boolean} active
 * @property {string} featureNS
 * @property {string} featurePrefix
 * @property {import("ol/Collection.js").default<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>>} features
 * @property {?import("ol/interaction/Snap.js").default} interaction
 * @property {number} maxFeatures
 * @property {?angular.IDeferred<void>} requestDeferred
 * @property {import('gmf/themes.js').GmfSnappingConfig} snappingConfig
 * @property {Function} stateWatcherUnregister
 * @property {import('ngeo/layertree/Controller.js').LayertreeController} treeCtrl
 * @property {WFSConfig} wfsConfig
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
const module = angular.module('gmfSnapping', [
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  ngeoLayertreeController.name,
]);
module.service('gmfSnapping', EditingSnappingService);


export default module;
