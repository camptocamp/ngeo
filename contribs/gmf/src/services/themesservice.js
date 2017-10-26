goog.provide('gmf.Themes');
goog.provide('gmf.ThemesEventType');

goog.require('goog.asserts');
goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ol.array');
goog.require('ol.Collection');
goog.require('ol.events.EventTarget');
goog.require('ol.layer.Tile');


/**
 * @enum {string}
 */
gmf.ThemesEventType = {
  CHANGE: 'change'
};


gmf.module.value('gmfThemesOptions', {});


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
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {gmfx.ThemesOptions} gmfThemesOptions Themes options.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.Themes = function($http, $injector, $q, ngeoLayerHelper, gettextCatalog, gmfThemesOptions) {

  ol.events.EventTarget.call(this);

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
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = null;
  if ($injector.has('ngeoLocation')) {
    this.ngeoLocation_ = $injector.get('ngeoLocation');
  }

  /**
   * @type {ngeo.LayerHelper}
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
   * @private
   */
  this.loaded_ = false;

  /**
   * @type {angular.$q.Promise}
   * @private
   */
  this.bgLayerPromise_ = null;
};
ol.inherits(gmf.Themes, ol.events.EventTarget);


/**
 * @param {Array.<gmfThemes.GmfTheme>} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @return {gmfThemes.GmfGroup} The group.
 */
gmf.Themes.findGroupByLayerNodeName = function(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      const childNodes = [];
      gmf.Themes.getFlatNodes(group, childNodes);
      for (let k = 0, kk = childNodes.length; k < kk; k++) {
        const layer = childNodes[k];
        if (layer.name == name) {
          return group;
        }
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
gmf.Themes.findGroupByName = function(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      if (group.name == name) {
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
 * @private
 */
gmf.Themes.findObjectByName_ = function(objects, objectName) {
  return ol.array.find(objects, object => object['name'] === objectName);
};


/**
 * Find a theme object by its name. Return null if not found.
 * @param {Array.<gmfThemes.GmfTheme>} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @return {gmfThemes.GmfTheme} The theme object or null.
 */
gmf.Themes.findThemeByName = function(themes, themeName) {
  return gmf.Themes.findObjectByName_(themes, themeName);
};


/**
 * Fill the given "nodes" array with all node in the given node including the
 * given node itself.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Layertree node.
 * @param {Array.<gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An array.
 * @export
 */
gmf.Themes.getFlatNodes = function(node, nodes) {
  let i;
  const children = node.children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      gmf.Themes.getFlatNodes(children[i], nodes);
    }
  } else {
    nodes.push(node);
  }
};


/**
 * Get background layers.
 * @param {!Object.<string, string>} appDimensions Dimensions.
 * @return {!angular.$q.Promise.<!Array.<!ol.layer.Base>>} Promise.
 */
gmf.Themes.prototype.getBgLayers = function(appDimensions) {
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
    array.push(ol.getUid(item));
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
      goog.asserts.assert(gmfLayerWMTS.url, 'Layer URL is required');
      return layerHelper.createWMTSLayerFromCapabilitites(
        gmfLayerWMTS.url,
        gmfLayerWMTS.layer || '',
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
      goog.asserts.assert(gmfLayerWMS.ogcServer, 'An OGC server is required');
      const server = ogcServers[gmfLayerWMS.ogcServer];
      goog.asserts.assert(server, 'The OGC server was not found');
      goog.asserts.assert(server.url, 'The server URL is required');
      return callback(gmfLayer, layerHelper.createBasicWMSLayer(
        server.url,
        gmfLayerWMS.layers || '',
        server.type,
        undefined, // time
        gmfLayer.dimensions,
        server.credential ? 'use-credentials' : 'anonymous'
      ));
    }
    goog.asserts.fail(`Unsupported type: ${gmfLayer.type}`);
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
        collection = new ol.Collection(layers);
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
      layers.push(new ol.layer.Tile({
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
gmf.Themes.prototype.getThemeObject = function(themeName) {
  return this.promise_.then(
    /**
       * @param {gmfThemes.GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {gmfThemes.GmfTheme?} The theme object for themeName, or null
       *     if not found.
       */
    data => gmf.Themes.findThemeByName(data.themes, themeName));
};


/**
 * Get an array of theme objects.
 * @return {angular.$q.Promise.<!Array.<!gmfThemes.GmfTheme>>} Promise.
 * @export
 */
gmf.Themes.prototype.getThemesObject = function() {
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
gmf.Themes.prototype.getBackgroundLayersObject = function() {
  goog.asserts.assert(this.promise_ !== null);
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
gmf.Themes.prototype.getOgcServersObject = function() {
  goog.asserts.assert(this.promise_ !== null);
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
gmf.Themes.prototype.hasEditableLayers = function() {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(this.hasEditableLayers_.bind(this));
};


/**
 * Returns if one of the layers in the themes is editable.
 * @param {gmfThemes.GmfThemesResponse} data The "themes" web service response.
 * @return {boolean} Editable layers?
 */
gmf.Themes.prototype.hasEditableLayers_ = function(data) {
  return data.themes.some((theme) => {
    const hasEditableLayers = theme.children.some(this.hasNodeEditableLayers_.bind(this));
    return hasEditableLayers;
  });
};


/**
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Theme node
 * @return {boolean} Editable layers?
 */
gmf.Themes.prototype.hasNodeEditableLayers_ = function(node) {
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
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
gmf.Themes.prototype.loadThemes = function(opt_roleId) {

  goog.asserts.assert(this.treeUrl_, 'gmfTreeUrl should be defined.');

  if (this.loaded_) {
    // reload the themes
    this.deferred_ = this.$q_.defer();
    this.promise_ = this.deferred_.promise;
    this.bgLayerPromise_ = null;
    this.loaded_ = false;
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
    this.dispatchEvent(gmf.ThemesEventType.CHANGE);
    this.loaded_ = true;
  }, (response) => {
    this.deferred_.reject(response);
  });
};


gmf.module.service('gmfThemes', gmf.Themes);


/**
 * @enum {string}
 */
gmf.Themes.NodeType = {
  MIXED_GROUP: 'MixedGroup',
  NOT_MIXED_GROUP: 'NotMixedGroup',
  WMTS: 'WMTS',
  WMS: 'WMS'
};
