/**
 * @module gmf.theme.Themes
 */
import googAsserts from 'goog/asserts.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import * as olBase from 'ol/index.js';
import * as olArray from 'ol/array.js';
import olCollection from 'ol/Collection.js';
import olEventsEventTarget from 'ol/events/EventTarget.js';
import olLayerTile from 'ol/layer/Tile.js';

/**
 * The Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 *
 * @constructor
 * @struct
 * @extends {ol.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$injector} $injector Main injector.
 * @param {angular.$q} $q Angular q service
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmfx.ThemesOptions} gmfThemesOptions Themes options.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
const exports = function($http, $injector, $q, ngeoLayerHelper, gettextCatalog, gmfThemesOptions) {

  olEventsEventTarget.call(this);

  /**
   * @type {boolean}
   * @private
   */
  this.addBlankBackgroundLayer_ = true;
  if (gmfThemesOptions.addBlankBackgroundLayer !== undefined) {
    this.addBlankBackgroundLayer_ = gmfThemesOptions.addBlankBackgroundLayer;
  }

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string|undefined}
   * @private
   */
  this.treeUrl_ = undefined;
  if ($injector.has('gmfTreeUrl')) {
    this.treeUrl_ = $injector.get('gmfTreeUrl');
  }

  this.cacheVersion_ = '0';
  if ($injector.has('cacheVersion')) {
    this.cacheVersion_ = $injector.get('cacheVersion');
  }

  /**
   * @type {?ngeo.statemanager.Location}
   * @private
   */
  this.ngeoLocation_ = null;
  if ($injector.has('ngeoLocation')) {
    this.ngeoLocation_ = $injector.get('ngeoLocation');
  }

  /**
   * @type {ngeo.map.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {angular.$q.Deferred}
   * @private
   */
  this.deferred_ = $q.defer();

  /**
   * @type {angular.$q.Promise}
   * @private
   */
  this.promise_ = this.deferred_.promise;

  /**
   * @type {boolean}
   */
  this.loaded = false;

  /**
   * @type {angular.$q.Promise}
   * @private
   */
  this.bgLayerPromise_ = null;
};

olBase.inherits(exports, olEventsEventTarget);


/**
 * @param {Array.<gmfThemes.GmfTheme>} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @return {gmfThemes.GmfGroup} The group.
 */
exports.findGroupByLayerNodeName = function(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      const childNodes = [];
      exports.getFlatNodes(group, childNodes);
      if (exports.findObjectByName(childNodes, name)) {
        return group;
      }
    }
  }
  return null;
};

/**
 * Find a layer group object by its name. Return null if not found.
 * @param {Array.<gmfThemes.GmfTheme>} themes Array of "theme" objects.
 * @param {string} name The group name.
 * @return {gmfThemes.GmfGroup} The group.
 */
exports.findGroupByName = function(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      const internalNodes = [];
      exports.getFlatInternalNodes(group, internalNodes);
      if (exports.findObjectByName(internalNodes, name)) {
        return group;
      }
    }
  }
  return null;
};


/**
 * Find an object by its name. Return null if not found.
 * @param {Array.<T>} objects Array of objects with a 'name' attribute.
 * @param {string} objectName The object name.
 * @return {T} The object or null.
 * @template T
 */
exports.findObjectByName = function(objects, objectName) {
  return olArray.find(objects, object => object['name'] === objectName);
};


/**
 * Find a theme object by its name. Return null if not found.
 * @param {Array.<gmfThemes.GmfTheme>} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @return {gmfThemes.GmfTheme} The theme object or null.
 */
exports.findThemeByName = function(themes, themeName) {
  return exports.findObjectByName(themes, themeName);
};


/**
 * Fill the given "nodes" array with all internal nodes (non-leaf nones) in
 * the given node.
 *
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Layertree node.
 * @param {Array.<gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An array.
 */
exports.getFlatInternalNodes = function(node, nodes) {
  const children = node.children;
  if (children !== undefined) {
    nodes.push(node);
    for (let i = 0; i < children.length; i++) {
      exports.getFlatInternalNodes(children[i], nodes);
    }
  }
};


/**
 * Fill the given "nodes" array with all leaf nodes in the given node.
 *
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Layertree node.
 * @param {Array.<gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An array.
 */
exports.getFlatNodes = function(node, nodes) {
  let i;
  const children = node.children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      exports.getFlatNodes(children[i], nodes);
    }
  } else {
    nodes.push(node);
  }
};


/**
 * Get background layers.
 * @return {!angular.$q.Promise.<!Array.<!ol.layer.Base>>} Promise.
 */
exports.prototype.getBgLayers = function() {
  const gettextCatalog = this.gettextCatalog;
  if (this.bgLayerPromise_) {
    return this.bgLayerPromise_;
  }
  const $q = this.$q_;
  const layerHelper = this.layerHelper_;

  /**
   * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} item A group or a leaf.
   * @param {Array.<number>} array Array of ids;
   */
  const getIds = function(item, array) {
    array.push(olBase.getUid(item));
    const children = item.children || [];
    children.forEach((child) => {
      getIds(child, array);
    });
  };

  /**
   * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} item The item.
   * @param {ol.layer.Base} layer The layer.
   * @return {ol.layer.Base} the provided layer.
   */
  const callback = function(item, layer) {
    layer.set('label', item.name);
    layer.set('metadata', item.metadata);
    layer.set('dimensions', item.dimensions);
    const ids = [];
    getIds(item, ids);
    layer.set('querySourceIds', ids);
    return layer;
  };

  /**
   * @param {gmfThemes.GmfOgcServers} ogcServers The ogc servers.
   * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} gmfLayer The item.
   * @return {angular.$q.Promise.<ol.layer.Base>|ol.layer.Base} the created layer.
   */
  const layerLayerCreationFn = function(ogcServers, gmfLayer) {
    if (gmfLayer.type === 'WMTS') {
      const gmfLayerWMTS = /** @type gmfThemes.GmfLayerWMTS */ (gmfLayer);
      googAsserts.assert(gmfLayerWMTS.url, 'Layer URL is required');
      return layerHelper.createWMTSLayerFromCapabilitites(
        gmfLayerWMTS.url,
        gmfLayerWMTS.layer || '',
        gmfLayerWMTS.matrixSet,
        gmfLayer.dimensions
      ).then(callback.bind(null, gmfLayer)).then(null, (response) => {
        let message = `Unable to build layer "${gmfLayerWMTS.layer}" from WMTSCapabilities: ${gmfLayerWMTS.url}\n`;
        message += `OpenLayers error is "${response['message']}`;
        console.error(message);
        // Continue even if some layers have failed loading.
        return $q.resolve(undefined);
      });
    } else if (gmfLayer.type === 'WMS') {
      const gmfLayerWMS = /** @type gmfThemes.GmfLayerWMS */ (gmfLayer);
      googAsserts.assert(gmfLayerWMS.ogcServer, 'An OGC server is required');
      const server = ogcServers[gmfLayerWMS.ogcServer];
      googAsserts.assert(server, 'The OGC server was not found');
      googAsserts.assert(server.url, 'The server URL is required');
      googAsserts.assert(server.imageType, 'The server image type is required');
      return callback(gmfLayer, layerHelper.createBasicWMSLayer(
        server.url,
        gmfLayerWMS.layers || '',
        server.imageType,
        server.type,
        undefined, // time
        gmfLayer.dimensions,
        server.credential ? 'use-credentials' : 'anonymous'
      ));
    }
    googAsserts.fail(`Unsupported type: ${gmfLayer.type}`);
  };

  /**
   * @param {gmfThemes.GmfOgcServers} ogcServers The ogc servers.
   * @param {gmfThemes.GmfGroup} item The item.
   * @return {angular.$q.Promise.<ol.layer.Group>} the created layer.
   */
  const layerGroupCreationFn = function(ogcServers, item) {
    // We assume no child is a layer group.
    const orderedChildren = item.children.map(x => x).reverse(); // the order of insertion in OL3 is the contrary of the theme
    const promises = orderedChildren.map(layerLayerCreationFn.bind(null, ogcServers));
    return $q.all(promises).then((layers) => {
      let collection;
      if (layers) {
        layers = layers.filter(l => l);
        collection = new olCollection(layers);
      }
      const group = layerHelper.createBasicGroup(collection);
      callback(item, group);
      return group;
    });
  };

  /**
   * @param {gmfThemes.GmfThemesResponse} data The "themes" web service
   *     response.
   * @return {angular.$q.Promise.<Array.<ol.layer.Base>>} Promise.
   */
  const promiseSuccessFn = function(data) {
    const promises = data.background_layers.map((item) => {
      const itemType = item.type;
      if (itemType === 'WMTS' || itemType === 'WMS') {
        return layerLayerCreationFn(data.ogcServers, item);
      } else if (item.children) {
        // group of layers
        return layerGroupCreationFn(data.ogcServers, item);
      } else {
        return undefined;
      }
    }, this);
    return $q.all(promises);
  }.bind(this);

  this.bgLayerPromise_ = this.promise_.then(promiseSuccessFn).then((values) => {
    const layers = [];

    // (1) add a blank layer
    if (this.addBlankBackgroundLayer_) {
      // For i18n string collection
      gettextCatalog.getString('blank');
      layers.push(new olLayerTile({
        'label': 'blank',
        'metadata': {'thumbnail': ''}
      }));
    }

    // (2) add layers that were returned
    values.forEach((layer) => {
      if (layer) {
        layers.push(layer);
      }
    });
    return layers;
  });

  return this.bgLayerPromise_;
};


/**
 * Get a theme object by its name.
 * @param {string} themeName Theme name.
 * @return {angular.$q.Promise.<gmfThemes.GmfTheme>} Promise.
 * @export
 */
exports.prototype.getThemeObject = function(themeName) {
  return this.promise_.then(
    /**
       * @param {gmfThemes.GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {gmfThemes.GmfTheme?} The theme object for themeName, or null
       *     if not found.
       */
    data => exports.findThemeByName(data.themes, themeName));
};


/**
 * Get an array of theme objects.
 * @return {angular.$q.Promise.<!Array.<!gmfThemes.GmfTheme>>} Promise.
 * @export
 */
exports.prototype.getThemesObject = function() {
  return this.promise_.then(
    /**
       * @param {!gmfThemes.GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {!Array.<!gmfThemes.GmfTheme>} The themes object.
       */
    data => data.themes);
};


/**
 * Get an array of background layer objects.
 * @return {angular.$q.Promise.<!Array.<!gmfThemes.GmfLayer>>} Promise.
 */
exports.prototype.getBackgroundLayersObject = function() {
  googAsserts.assert(this.promise_ !== null);
  return this.promise_.then(
    /**
       * @param {!gmfThemes.GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {!Array.<!gmfThemes.GmfLayer>} The background layers object.
       */
    data => data.background_layers
  );
};


/**
 * Get the `ogcServers` object.
 * @return {angular.$q.Promise.<!gmfThemes.GmfOgcServers>} Promise.
 * @export
 */
exports.prototype.getOgcServersObject = function() {
  googAsserts.assert(this.promise_ !== null);
  return this.promise_.then(
    /**
       * @param {gmfThemes.GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {gmfThemes.GmfOgcServers} The `ogcServers` object.
       */
    data => data.ogcServers);
};


/**
 * Returns a promise to check if one of the layers in the themes is editable.
 * @return {angular.$q.Promise.<boolean>} Promise.
 */
exports.prototype.hasEditableLayers = function() {
  googAsserts.assert(this.promise_ !== null);
  return this.promise_.then(this.hasEditableLayers_.bind(this));
};


/**
 * Returns if one of the layers in the themes is editable.
 * @param {gmfThemes.GmfThemesResponse} data The "themes" web service response.
 * @return {boolean} Editable layers?
 */
exports.prototype.hasEditableLayers_ = function(data) {
  return data.themes.some((theme) => {
    const hasEditableLayers = theme.children.some(this.hasNodeEditableLayers_.bind(this));
    return hasEditableLayers;
  });
};


/**
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Theme node
 * @return {boolean} Editable layers?
 */
exports.prototype.hasNodeEditableLayers_ = function(node) {
  if (node.editable) {
    return true;
  }

  let hasEditableLayers = false;
  const children = node.children;
  if (children && children.length) {
    hasEditableLayers = children.some(this.hasNodeEditableLayers_.bind(this));
  }
  return hasEditableLayers;
};


/**
 * Get the snapping configuration object from a Layertree controller
 * @param {gmfThemes.GmfLayer} node Layer node from the theme.
 * @return {?gmfThemes.GmfSnappingConfig} Snapping configuration, if found.
 * @export
 */
exports.getSnappingConfig = function(node) {
  const config = (node.metadata && node.metadata.snappingConfig !== undefined) ?
    node.metadata.snappingConfig : null;
  return config;
};


/**
 * Get the maximal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 * @param {gmfThemes.GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a maxResolutionHint property can exist
 *     on the node).
 * @return {number|undefined} the max resolution or undefined if any.
 */
exports.getNodeMaxResolution = function(gmfLayer) {
  const metadata = gmfLayer.metadata;
  let maxResolution = gmfLayer.maxResolutionHint;
  if (maxResolution === undefined && metadata !== undefined) {
    maxResolution = metadata.maxResolution;
  }
  return maxResolution;
};


/**
 * Get the minimal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 * @param {gmfThemes.GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a minResolutionHint property can exist
 *     on the node).
 * @return {number|undefined} the min resolution or undefined if any.
 */
exports.getNodeMinResolution = function(gmfLayer) {
  const metadata = gmfLayer.metadata;
  let minResolution = gmfLayer.minResolutionHint;
  if (minResolution === undefined && metadata !== undefined) {
    minResolution = metadata.minResolution;
  }
  return minResolution;
};


/**
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
exports.prototype.loadThemes = function(opt_roleId) {

  googAsserts.assert(this.treeUrl_, 'gmfTreeUrl should be defined.');

  if (this.loaded) {
    // reload the themes
    this.deferred_ = this.$q_.defer();
    this.promise_ = this.deferred_.promise;
    this.bgLayerPromise_ = null;
    this.loaded = false;
  }

  this.$http_.get(this.treeUrl_, {
    params: opt_roleId !== undefined ? {
      'role': opt_roleId,
      'cache_version': this.cacheVersion_
    } : {
      'cache_version': this.cacheVersion_
    },
    cache: false,
    withCredentials: true
  }).then((response) => {
    if (response.data.errors.length != 0) {
      const message = `The themes contain some errors:\n${
        response.data.errors.join('\n')}`;
      console.error(message);
      if (this.ngeoLocation_ !== null && this.ngeoLocation_.hasParam('debug')) {
        window.alert(message);
      }
    }
    this.deferred_.resolve(response.data);
    this.dispatchEvent('change');
    this.loaded = true;
  }, (response) => {
    this.deferred_.reject(response);
  });
};


/**
 * @enum {string}
 */
exports.NodeType = {
  MIXED_GROUP: 'MixedGroup',
  NOT_MIXED_GROUP: 'NotMixedGroup',
  WMTS: 'WMTS',
  WMS: 'WMS'
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfThemes', [
  ngeoMapLayerHelper.module.name,
]);
exports.module.value('gmfThemesOptions', {});
exports.module.service('gmfThemes', exports);


export default exports;
