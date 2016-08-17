goog.provide('gmf.Themes');

goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ol.array');
goog.require('ol.Collection');
goog.require('ol.events.EventTarget');
goog.require('ol.layer.Tile');


/**
 * @typedef {Object<string, GmfOgcServer>}
 */
gmf.OgcServers;


/**
 * @typedef {{
 *     themes: Array.<Object>,
 *     background_layers: Array.<Object>,
 *     ogcServers: gmf.OgcServers
 * }}
 */
gmf.ThemesResponse;


/**
 * The Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 *
 * @constructor
 * @extends {ol.events.EventTarget}
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$injector} $injector Main injector.
 * @param {angular.$q} $q Angular q service
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @ngInject
 * @ngdoc service
 * @ngname gmfThemes
 */
gmf.Themes = function($http, $injector, $q, ngeoLayerHelper, gettextCatalog) {

  goog.base(this);

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
   * @type {?string}
   * @private
   */
  this.treeUrl_ = null;
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
   * @type {angular.$q.Promise}
   * @private
   */
  this.bgLayerPromise_ = null;

};
goog.inherits(gmf.Themes, ol.events.EventTarget);


/**
 * @param {Array.<GmfThemesNode>} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @return {GmfThemesNode} The group.
 */
gmf.Themes.findGroupByLayerNodeName = function(themes, name) {
  for (var i = 0, ii = themes.length; i < ii; i++) {
    var theme = themes[i];
    for (var j = 0, jj = theme.children.length; j < jj; j++) {
      var group = theme.children[j];
      var childNodes = [];
      gmf.Themes.getFlatNodes(group, childNodes);
      for (var k = 0, kk = childNodes.length; k < kk; k++) {
        var layer = childNodes[k];
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
 * @param {Array.<GmfThemesNode>} themes Array of "theme" objects.
 * @param {string} name The group name.
 * @return {GmfThemesNode} The group.
 */
gmf.Themes.findGroupByName = function(themes, name) {
  for (var i = 0, ii = themes.length; i < ii; i++) {
    var theme = themes[i];
    for (var j = 0, jj = theme.children.length; j < jj; j++) {
      var group = theme.children[j];
      if (group.name == name) {
        return group;
      }
    }
  }
  return null;
};


/**
 * Find an object by its name. Return null if not found.
 * @param {Array.<Object>} objects Array of objects.
 * @param {string} objectName The object name.
 * @return {Object} The object.
 * @private
 */
gmf.Themes.findObjectByName_ = function(objects, objectName) {
  return ol.array.find(objects, function(object) {
    return object['name'] === objectName;
  });
};


/**
 * Find a theme object by its name. Return null if not found.
 * @param {Array.<GmfThemesNode>} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @return {GmfThemesNode} The theme object.
 */
gmf.Themes.findThemeByName = function(themes, themeName) {
  var theme = gmf.Themes.findObjectByName_(themes, themeName);
  return /** @type {GmfThemesNode} */ (theme);
};


/**
 * Return a "type" that defines the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {string} A type.
 */
gmf.Themes.getNodeType = function(node) {
  var children = node.children;
  var mixed = node.mixed;
  if (node.children !== undefined && mixed) {
    return gmf.Themes.NodeType.MIXED_GROUP;
  }
  if (children !== undefined && !mixed) {
    return gmf.Themes.NodeType.NOT_MIXED_GROUP;
  }
  if (node.type === 'WMTS') {
    return gmf.Themes.NodeType.WMTS;
  }
  return gmf.Themes.NodeType.WMS;
};


/**
 * Fill the given "nodes" array with all node in the given node including the
 * given node itself.
 * @param {GmfThemesNode} node Layertree node.
 * @param {Array.<GmfThemesNode>} nodes An array.
 * @export
 */
gmf.Themes.getFlatNodes = function(node, nodes) {
  var i;
  var children = node.children;
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
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getBgLayers = function() {
  if (this.bgLayerPromise_) {
    return this.bgLayerPromise_;
  }
  var $q = this.$q_;
  var layerHelper = this.layerHelper_;

  var callback = function(item, layer) {
    layer.set('label', item['name']);
    layer.set('metadata', item['metadata']);
    layer.set('dimensions', item['dimensions']);
    var ids = gmf.LayertreeController.getLayerNodeIds(item);
    layer.set('querySourceIds', ids);
    layer.set('editableIds', []);
    return layer;
  };

  var layerLayerCreationFn = function(item) {
    if (item['type'] === 'WMTS') {
      return layerHelper.createWMTSLayerFromCapabilitites(
          item['url'],
          item['name'],
          item['dimensions']
      ).then(callback.bind(null, item)).then(null, function(error) {
        console.error(error || 'unknown error');
        // Continue even if some layers have failed loading.
        return $q.resolve(undefined);
      });
    }
  };

  var layerGroupCreationFn = function(item) {
    // We assume no child is a layer group.
    var promises = item['children'].map(layerLayerCreationFn);
    return $q.all(promises).then(function(layers) {
      var collection = layers ? new ol.Collection(layers) : undefined;
      var group = layerHelper.createBasicGroup(collection);
      callback(item, group);
      return group;
    });
  };

  /**
   * @param {gmf.ThemesResponse} data The "themes" web service response.
   * @return {angular.$q.Promise} Promise.
   */
  var promiseSuccessFn = function(data) {
    var promises = data['background_layers'].map(function(item) {
      var itemType = item['type'];
      if (itemType === 'WMTS') {
        return layerLayerCreationFn(item);
      } else if (item['children']) {
        // group of layers
        return layerGroupCreationFn(item);
      } else {
        return undefined;
      }
    }, this);
    return $q.all(promises);
  }.bind(this);

  this.bgLayerPromise_ = this.promise_.then(promiseSuccessFn).then(function(values) {
    var layers = [];

    // (1) add a blank layer
    layers.push(new ol.layer.Tile({
      'label': this.gettextCatalog.getString('blank'),
      'metadata': {'thumbnail': ''}
    }));

    // (2) add layers that were returned
    values.forEach(function(layer) {
      if (layer) {
        layers.push(layer);
      }
    });
    return layers;
  }.bind(this));

  return this.bgLayerPromise_;
};


/**
 * Get a theme object by its name.
 * @param {string} themeName Theme name.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Themes.prototype.getThemeObject = function(themeName) {
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Object} The theme object for themeName, or null if not found.
       */
      function(data) {
        var themes = data['themes'];
        return gmf.Themes.findThemeByName(themes, themeName);
      });
};


/**
 * Get an array of theme objects.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Themes.prototype.getThemesObject = function() {
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Array.<Object>} The themes object.
       */
      function(data) {
        var themes = data['themes'];
        return themes;
      });
};


/**
 * Get an array of background layer objects.
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getBackgroundLayersObject = function() {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {Array.<Object>} The background layers object.
       */
      function(data) {
        var backgroundLayers = data['background_layers'];
        return backgroundLayers;
      });
};


/**
 * Get the `ogcServers` object.
 * @return {angular.$q.Promise} Promise.
 */
gmf.Themes.prototype.getOgcServersObject = function() {
  goog.asserts.assert(this.promise_ !== null);
  return this.promise_.then(
      /**
       * @param {gmf.ThemesResponse} data The "themes" web service response.
       * @return {gmf.OgcServers} The `ogcServers` object.
       */
      function(data) {
        var ogcServers = data['ogcServers'];
        return ogcServers;
      });
};


/**
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
gmf.Themes.prototype.loadThemes = function(opt_roleId) {

  goog.asserts.assert(this.treeUrl_, 'gmfTreeUrl should be defined.');

  var deferred = this.deferred_;

  this.$http_.get(this.treeUrl_, {
    params: opt_roleId !== undefined ? {
      'role': opt_roleId,
      'cache_version': this.cacheVersion_
    } : {
      'cache_version': this.cacheVersion_
    },
    cache: false,
    withCredentials: true
  }).then(function(response) {
    if (response.data['errors'].length != 0) {
      var message = 'The themes contains some errors:\n' +
        response.data['errors'].join('\n');
      console.error(message);
      if (this.ngeoLocation_ !== null && this.ngeoLocation_.hasParam('debug')) {
        window.alert(message);
      }
    }
    deferred.resolve(response.data);
  }.bind(this), function(response) {
    deferred.reject(response);
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
