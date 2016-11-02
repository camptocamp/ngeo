goog.provide('gmf-objectediting-hub');

goog.require('ngeo.proj.EPSG21781');
goog.require('gmf');
goog.require('gmf.ObjectEditingManager');
goog.require('gmf.Themes');
goog.require('ol.format.WFS');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


/**
 * @param {angular.$http} $http Angular $http service.
 * @param {angular.$q} $q Angular $q service.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @constructor
 */
app.MainController = function($http, $q, $scope, gmfThemes) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {Array.<string>} List of example and application urls that contain
   *     ObjectEditing tools.
   * @export
   */
  this.urls = [
    'objectediting.html'
  ];

  /**
   * @type {string}
   * @export
   */
  this.selectedUrl = this.urls[0];

  /**
   * @type {gmfThemes.GmfOgcServers} ogcServers OGC servers.
   * @private
   */
  this.gmfServers_;

  /**
   * @type {gmfThemes.GmfOgcServer} ogcServer OGC server to use.
   * @private
   */
  this.gmfServer_;

  /**
   * @type {Array.<gmfThemes.GmfLayerWMS>}
   * @export
   */
  this.gmfLayerNodes = [];

  /**
   * @type {?gmfThemes.GmfLayerWMS}
   * @export
   */
  this.selectedGmfLayerNode = null;

  /**
   * @type {Object.<number, Array.<ol.Feature>>}
   * @export
   */
  this.featuresCache_ = {};

  /**
   * @type {Array.<ol.Feature>}
   * @export
   */
  this.features = null;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  $scope.$watch(
    function() {
      return this.selectedGmfLayerNode;
    }.bind(this),
    function(newVal, oldVal) {
      this.selectedFeature = null;

      if (newVal) {
        this.getFeatures_(newVal).then(
          this.handleGetFeatures_.bind(this, newVal)
        );
      }
    }.bind(this)
  );

  /**
   * @type {string}
   * @export
   */
  this.themeName = 'ObjectEditing';


  this.gmfThemes_.loadThemes();

  this.gmfThemes_.getOgcServersObject().then(function(ogcServers) {

    // (1) Set OGC servers
    this.gmfServers_ = ogcServers;

    this.gmfThemes_.getThemesObject().then(function(themes) {
      if (!themes) {
        return;
      }

      // (2) Find OE theme
      var theme;
      for (var i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].name === this.themeName) {
          theme = themes[i];
          break;
        }
      }

      if (!theme) {
        return;
      }

      // (3) Get first group node
      var groupNode = theme.children[0];

      // (4) Set OGC server, which must support WFS for this example to work
      var gmfServer = this.gmfServers_[groupNode.ogcServer];
      if (gmfServer && gmfServer.wfsSupport === true && gmfServer.urlWfs) {
        this.gmfServer_ = gmfServer;
      } else {
        return;
      }

      // (5) Set layer nodes
      this.gmfLayerNodes = groupNode.children;

      // (6) Select 'polygon' for the purpose of simplifying the demo
      this.selectedGmfLayerNode = this.gmfLayerNodes[1];

    }.bind(this));
  }.bind(this));

};


/**
 * @export
 */
app.MainController.prototype.run = function() {

  var feature = this.selectedFeature;
  var layer = this.selectedGmfLayerNode.id;
  var property = 'name';
  var id = feature.get(property);

  var params = {};
  params[gmf.ObjectEditingManager.Param.ID] = id;
  params[gmf.ObjectEditingManager.Param.LAYER] = layer;
  params[gmf.ObjectEditingManager.Param.THEME] = this.themeName;
  params[gmf.ObjectEditingManager.Param.PROPERTY] = property;

  var url = app.MainController.appendParams(this.selectedUrl, params);

  window.open(url);

};


/**
 * @param {gmfThemes.GmfLayerWMS} gmfLayerNode Layer node.
 * @return {angular.$q.Promise} The promise attached to the deferred object.
 * @export
 */
app.MainController.prototype.getFeatures_ = function(gmfLayerNode) {

  this.getFeaturesDeferred_ = this.q_.defer();

  var features = this.getFeaturesFromCache_(gmfLayerNode);

  if (features) {
    this.getFeaturesDeferred_.resolve();
  } else {
    this.issueGetFeatures_(gmfLayerNode);
  }

  return this.getFeaturesDeferred_.promise;
};


/**
 * @param {gmfThemes.GmfLayerWMS} gmfLayerNode Layer node.
 * @export
 */
app.MainController.prototype.issueGetFeatures_ = function(gmfLayerNode) {

  var id = gmfLayerNode.id;

  var url = app.MainController.appendParams(
    this.gmfServer_.urlWfs,
    {
      'SERVICE': 'WFS',
      'REQUEST': 'GetFeature',
      'VERSION': '1.1.0',
      'TYPENAME': gmfLayerNode.layers
    }
  );

  this.http_.get(url).then(function(response) {
    var features = new ol.format.WFS().readFeatures(response.data);
    this.featuresCache_[id] = features;
    this.getFeaturesDeferred_.resolve();
  }.bind(this));
};


/**
 * @param {gmfThemes.GmfLayerWMS} gmfLayerNode Layer node.
 * @export
 */
app.MainController.prototype.handleGetFeatures_ = function(gmfLayerNode) {
  var features = /** @type Array.<ol.Feature> */ (
    this.getFeaturesFromCache_(gmfLayerNode));
  this.features = features;
  this.selectedFeature = this.features[0];
};


/**
 * @param {gmfThemes.GmfLayerWMS} gmfLayerNode Layer node.
 * @return {?Array.<ol.Feature>} List of features
 * @export
 */
app.MainController.prototype.getFeaturesFromCache_ = function(gmfLayerNode) {
  var id = gmfLayerNode.id;
  var features = this.featuresCache_[id] || null;
  return features;
};


/**
 * Appends query parameters to a URI.
 *
 * @param {string} uri The original URI, which may already have query data.
 * @param {!Object} params An object where keys are URI-encoded parameter keys,
 *     and the values are arbitrary types or arrays.
 * @return {string} The new URI.
 */
app.MainController.appendParams = function(uri, params) {
  var keyParams = [];
  // Skip any null or undefined parameter values
  Object.keys(params).forEach(function(k) {
    if (params[k] !== null && params[k] !== undefined) {
      keyParams.push(k + '=' + encodeURIComponent(params[k]));
    }
  });
  var qs = keyParams.join('&');
  // remove any trailing ? or &
  uri = uri.replace(/[?&]$/, '');
  // append ? or & depending on whether uri has existing parameters
  uri = uri.indexOf('?') === -1 ? uri + '?' : uri + '&';
  return uri + qs;
};


app.module.controller('MainController', app.MainController);
