goog.provide('gmf.Themes');

goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ol.array');
goog.require('ol.events.EventTarget');
goog.require('ol.layer.Tile');


/**
 * @typedef {{
 *     themes: Array.<Object>,
 *     background_layers: Array.<Object>
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
gmf.Themes.findGroupByLayerName = function(themes, name) {
  for (var i = 0, ii = themes.length; i < ii; i++) {
    var theme = themes[i];
    for (var j = 0, jj = theme.children.length; j < jj; j++) {
      var group = theme.children[j];
      for (var k = 0, kk = group.children.length; k < kk; k++) {
        var layer = group.children[k];
        if (layer.layers == name) {
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
  if (goog.isDefAndNotNull(node.url)) {
    return gmf.Themes.NodeType.EXTERNAL_WMS;
  }
  return gmf.Themes.NodeType.WMS;
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

  /**
   * @param {gmf.ThemesResponse} data The "themes" web service response.
   * @return {angular.$q.Promise} Promise.
   */
  var promiseSuccessFn = function(data) {
    var promises = data['background_layers'].map(function(item) {

      var callback = function(item, layer) {
        layer.set('label', item['name']);
        layer.set('metadata', item['metadata']);
        return layer;
      };

      if (item['type'] === 'WMTS') {
        return this.layerHelper_.createWMTSLayerFromCapabilitites(
            item['url'],
            item['name']
        ).then(callback.bind(this, item)).then(null, function(error) {
          console.error(error || 'unknown error');
          // Continue even if some layers have failed loading.
          return $q.resolve(undefined);
        });
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
    values.forEach(function(item) {
      if (item) {
        layers.push(item);
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
 * @param {number=} opt_roleId The role id to send in the request.
 * Load themes from the "themes" service.
 * @export
 */
gmf.Themes.prototype.loadThemes = function(opt_roleId) {

  goog.asserts.assert(this.treeUrl_, 'gmfTreeUrl should be defined.');

  var deferred = this.deferred_;

  this.$http_.get(this.treeUrl_, {
    params: opt_roleId !== undefined ? {'role': opt_roleId} : {},
    cache: false,
    withCredentials: true
  }).then(function(response) {
    deferred.resolve(response.data);
  }, function(response) {
    deferred.reject(response);
  });
};


gmf.module.service('gmfThemes', gmf.Themes);


/**
 * @enum {string}
 */
gmf.Themes.NodeType = {
  EXTERNAL_WMS: 'externalWMS',
  MIXED_GROUP: 'MixedGroup',
  NOT_MIXED_GROUP: 'NotMixedGroup',
  WMTS: 'WMTS',
  WMS: 'WMS'
};
