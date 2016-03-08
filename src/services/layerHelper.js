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
 * @const
 */
ngeo.LayerHelper.GROUP_KEY = 'groupName';


/**
 * Create and return a basic WMS layer with only a source URL and a dot
 * separated layers names (see {@link ol.source.ImageWMS}).
 * @param {string} sourceURL The source URL.
 * @param {string} sourceLayersName A dot separated names string.
 * @return {ol.layer.Image} WMS Layer.
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
  return layer;
};


/**
 * Create and return a promise that provides a WMTS layer with source on
 * success, no layer else.
 * The WMTS layer source will be configured by the capabilities that are
 * loaded from the given capabilitiesUrl.
 * The style object described in the capabilities for this layer will be added
 * as key 'capabilitiesStyles' as param of the new layer.
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
  var $q = this.$q_;

  return this.$http_.get(capabilitiesURL).then(function(response) {
    var result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result !== undefined) {
      var options = ol.source.WMTS.optionsFromCapabilities(result,
          {layer: layerName, requestEncoding: 'REST'});
      layer.setSource(new ol.source.WMTS(options));

      // Add styles from capabilities as param of the layer
      var layers = result['Contents']['Layer'];
      var l = goog.array.find(layers, function(elt, index, array) {
        return elt['Identifier'] == layerName;
      });
      layer.set('capabilitiesStyles', l['Style']);

      return $q.resolve(layer);
    }
    return $q.reject('Failed to get WMTS capabilities from ' +
        capabilitiesURL);
  });
};


/**
 * Create and return an ol.layer.Group. You can pass a collection of layers to
 * directly add them in the returned group.
 * @param {ol.Collection.<ol.layer.Base>=} opt_layers The layer to add to the
 * returned Group.
 * @return {ol.layer.Group} Layer group.
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
 * Retrieve (or create if it doesn't exist) and return a group of layer from
 * the base array of layers of a map. The given name is used as unique
 * identifier. If the group is created, it will be automatically added to
 * the map.
 * @param {ol.Map} map A map.
 * @param {string} groupName The name of the group.
 * @return {ol.layer.Group} The group corresponding to the given name.
 * @export
 */
ngeo.LayerHelper.prototype.getGroupFromMap = function(map, groupName) {
  var groups = map.getLayerGroup().getLayers();
  var group;
  groups.getArray().some(function(exitingGroup) {
    if (exitingGroup.get(ngeo.LayerHelper.GROUP_KEY) === groupName) {
      group = /** @type {ol.layer.Group} */ (exitingGroup);
      return true;
    } else {
      return false;
    }
  });
  if (!group) {
    group = this.createBasicGroup();
    group.set(ngeo.LayerHelper.GROUP_KEY, groupName);
    map.addLayer(group);
  }
  return group;
};


/**
 * Get an array of all layers in a group. The group can contain multiple levels
 * of others groups.
 * @param {ol.layer.Base} layer The base layer, mostly a group of layers.
 * @return {Array.<ol.layer.Layer>} Layers.
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
 * @return {Array.<ol.layer.Layer>} Layers.
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

ngeo.module.service('ngeoLayerHelper', ngeo.LayerHelper);
