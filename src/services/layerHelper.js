goog.provide('ngeo.LayerHelper');

goog.require('ngeo');
goog.require('ol.Collection');
goog.require('ol.format.WMTSCapabilities');
goog.require('ol.layer.Group');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.WMTS');



/**
 * Provides help functions that helps you to create and manage layers.
 * @param {angular.$q} $q Angular promises/deferred service.
 * @param {angular.$http} $http Angular http service.
 * @constructor
 * @ngdoc service
 * @ngname ngeoLayerHelper
 * @ngInject
 */
ngeo.LayerHelper = function($q, $http) {

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
};


/**
 * @const {string}
 * @export
 */
ngeo.LayerHelper.prototype.helperID = 'helperID';


/**
 * Add a HelperID to the given layer. Layers with this ID can be
 * managed by this sevice.
 * @param {ol.layer.Layer} layer The layer that needs an ID.
 * @param {string} layerURL Part of the ID.
 * @param {string} layerName Part of the ID.
 * @export
 */
ngeo.LayerHelper.prototype.setHelperID = function(layer, layerURL, layerName) {
  layer.set(this.helperID, this.makeHelperID(layerURL, layerName));
};


/**
 * Return an ID based on two strings ('layerURL_layerName');
 * @param {string} layerURL Part of the ID.
 * @param {string} layerName Part of the ID.
 * @return {string}
 * @export
 */
ngeo.LayerHelper.prototype.makeHelperID = function(layerURL, layerName) {
  return layerURL + '_' + layerName;
};


/**
 * Create and return a basic WMS layer with only a source URL and a dot
 * separated layers names (see {@link ol.source.ImageWMS}).
 * This layer will be tagged by a a helperID.
 * @param {string} sourceURL The source URL.
 * @param {string} sourceLayersName A dot separated names string.
 * @return {ol.layer.Image}
 * @export
 */
ngeo.LayerHelper.prototype.createBasicWMSLayer = function(sourceURL,
    sourceLayersName) {
  var layer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: sourceURL,
      params: {'LAYERS': sourceLayersName}
    })
  });
  this.setHelperID(layer, sourceURL, sourceLayersName);
  return layer;
};


/**
 * Create and return a promise that provides a WMTS layer with source on
 * success, no layer else.
 * The WMTS layer source will be configured by the capabilities that are
 * loaded from the given capabilitiesUrl.
 * This layer will be tagged by a a helperID.
 * @param {string} capabilitiesURL The getCapabilities url.
 * @param {string} layerName The name of the layer.
 * @return {angular.$q.Promise} A Promise with a layer (with source) on success,
 *     no layer else.
 * @export
 */
ngeo.LayerHelper.prototype.createWMTSLayerFromCapabilitites = function(
    capabilitiesURL, layerName) {
  var parser = new ol.format.WMTSCapabilities();
  var layer = new ol.layer.Tile();
  var deferred = this.$q_.defer();
  this.setHelperID(layer, capabilitiesURL, layerName);

  this.$http_.get(capabilitiesURL).then(function(response) {
    var result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (goog.isDef(result)) {
      var options = ol.source.WMTS.optionsFromCapabilities(result,
          {layer: layerName, requestEncoding: 'REST'});
      layer.setSource(new ol.source.WMTS(options));
      deferred.resolve(layer);
    } else {
      deferred.resolve();
    }
  }, function(response) {
    deferred.resolve();
  });

  return deferred.promise;
};


/**
 * Create and return an ol.layer.Group. You can pass a collection of layers to
 * directly add them in the returned group.
 * @param {ol.Collection.<ol.layer.Base>=} opt_layers The layer to add to the
 * returned Group.
 * @return {ol.layer.Group}
 * @export
 */
ngeo.LayerHelper.prototype.createBasicGroup = function(opt_layers) {
  var group = new ol.layer.Group();
  if (goog.isDefAndNotNull(opt_layers)) {
    group.setLayers(opt_layers);
  }
  return group;
};


/**
 * Get the position of the layer in the map's layers array or -1 if the layer
 * can't be found.
 * The layer must be tagged by a helperID (return -1 else).
 * @param {ol.Map} map The concerned map.
 * @param {ol.layer.Layer} layer The concerned layer.
 * @return {number} index or -1 if not found.
 * @export
 */
ngeo.LayerHelper.prototype.getLayerIndex = function(map, layer) {
  var layerId = layer.get(this.helperID);
  if (!goog.isDef(layerId)) {
    return -1;
  }

  var i, layers = /** @type {Array.<ol.layer.Layer>} */
      (map.getLayers().getArray());
  for (i = 0; i < layers.length; i++) {
    if (layers[i].get(this.helperID) === layerId) {
      return i;
    }
  }
  return -1;
};


/**
 * Retrieve a layer from the given array of layers and based on the given
 * layers's helperID. Return null if no layer match.
 * @param {Array.<ol.layer.Layer>} layers An array of layers.
 * @param {string} layerID an ID like one created by the setHelperID methode
 *   in this service
 * @return {ol.layer.Layer?} layer or null;
 * @export
 */
ngeo.LayerHelper.prototype.findLayer = function(layers, layerID) {
  var i, layer;
  for (i = 0; i < layers.length; i++) {
    layer = layers[i];
    if (layer.get(this.helperID) === layerID) {
      return layer;
    }
  }
  return null;
};


/**
 * Add the given layer on the map if it doesn't already exists and if the layer
 * has a source.
 * The layer must be tagged by a helperID.
 * @param {ol.Map} map The map where add the layer.
 * @param {ol.layer.Layer} layer The concerned layer.
 * @return {boolean} true if added, false else.
 * @export
 */
ngeo.LayerHelper.prototype.addLayerToMap = function(map, layer) {
  var added = false;
  if (layer.getSource()) {
    var layerIndex = this.getLayerIndex(map, layer);
    if (layerIndex < 0) {
      map.addLayer(layer);
      added = true;
    }
  }
  return added;
};


/**
 * Remove the given layer from the map if it exists.
 * The layer must be tagged by a helperID.
 * @param {ol.Map} map The map on which to remove the layer.
 * @param {ol.layer.Layer} layer The concerned layer.
 * @return {boolean} true if removed, false else.
 * @export
 */
ngeo.LayerHelper.prototype.removeLayerFromMap = function(map, layer) {
  var removed = false;
  var layerToRemove;
  var layerIndex = this.getLayerIndex(map, layer);
  if (layerIndex >= 0) {
    layerToRemove = map.getLayers().getArray()[layerIndex];
    map.removeLayer(layerToRemove);
    removed = true;
  }
  return removed;
};


/**
 * Add or remove some layers from the map.
 * The layer must be tagged by a helperID.
 * @param {ol.Map} map The concerned map.
 * @param {Array.<ol.layer.Layer>} layers An array of layers.
 * @param {boolean} add True to add the layers, False to remove them.
 * @export
 */
ngeo.LayerHelper.prototype.moveInOutLayers = function(map, layers, add) {
  var i, layer;
  for (i = 0; i < layers.length; i++) {
    layer = layers[i];
    if (add) {
      this.addLayerToMap(map, layer);
    } else {
      this.removeLayerFromMap(map, layer);
    }
  }
};


/**
 * Get an array of all layers in a group. The group can contain multiple levels
 * of others groups.
 * @param {ol.layer.Base} layer The base layer, mostly a group of layers.
 * @return {Array.<ol.layer.Layer>}
 * @export
 */
ngeo.LayerHelper.prototype.getFlatLayers = function(layer) {
  return this.getFlatLayers_(layer, []);
};


/**
 * Get an array of all layers in a group. The group can contain multiple levels
 * of others groups.
 * @param {ol.layer.Base} layer The base layer, mostly a group of layers.
 * @param {Array.<ol.layer.Base>} array An array to add layers.
 * @return {Array.<ol.layer.Layer>}
 * @private
 */
ngeo.LayerHelper.prototype.getFlatLayers_ = function(layer, array) {
  if (layer instanceof ol.layer.Group) {
    var sublayers = layer.getLayers();
    sublayers.forEach(function(l) {
      this.getFlatLayers_(l, array);
    }, this);
  } else {
    if (array.indexOf(layer) < 0) {
      array.push(layer);
    }
  }
  return array;
};

ngeoModule.service('ngeoLayerHelper', ngeo.LayerHelper);
