goog.provide('ngeo.LayerHelper');

goog.require('ngeo');
goog.require('ol.Collection');
goog.require('ol.array');
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
 * @param {string=} opt_serverType Type of the server ("mapserver",
 *     "geoserver", "qgisserver", …).
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
ngeo.LayerHelper.prototype.createBasicWMSLayer = function(sourceURL,
    sourceLayersName, opt_serverType) {
  var params = {'LAYERS': sourceLayersName};
  var olServerType;
  if (opt_serverType) {
    params['SERVERTYPE'] = opt_serverType;
    // OpenLayers expects 'qgis' insteads of 'qgisserver'
    olServerType = opt_serverType.replace('qgisserver', 'qgis');
  }
  var layer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: sourceURL,
      params: params,
      serverType: olServerType
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
ngeo.LayerHelper.prototype.createWMTSLayerFromCapabilitites = function(capabilitiesURL, layerName) {
  var parser = new ol.format.WMTSCapabilities();
  var layer = new ol.layer.Tile();
  var $q = this.$q_;

  return this.$http_.get(capabilitiesURL).then(function(response) {
    var result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result !== undefined) {
      var options = ol.source.WMTS.optionsFromCapabilities(result, {
        layer: layerName
      });
      layer.setSource(new ol.source.WMTS(options));

      // Add styles from capabilities as param of the layer
      var layers = result['Contents']['Layer'];
      var l = ol.array.find(layers, function(elt, index, array) {
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


/**
 * Get a layer that has a `layerName` property equal to a given layer name from
 * an array of layers. If one of the layers in the array is a group, then the
 * layers contained in that group are searched as well.
 * @param {string} layerName The name of the layer we're looking for.
 * @param {Array.<ol.layer.Base>} layers Layers.
 * @return {?ol.layer.Base} Layer.
 * @export
 */
ngeo.LayerHelper.prototype.getLayerByName = function(layerName, layers) {
  var found = null;
  layers.some(function(layer) {
    if (layer instanceof ol.layer.Group) {
      var sublayers = layer.getLayers().getArray();
      found = this.getLayerByName(layerName, sublayers);
    } else if (layer.get('layerName') === layerName) {
      found = layer;
    }
    return !!found;
  }, this);

  return found;
};


/**
 * Get the WMTS legend URL for the given layer.
 * @param {ol.layer.Tile} layer Tile layer as returned by the
 * ngeo layerHelper service.
 * @return {?string} The legend URL or null.
 * @export
 */
ngeo.LayerHelper.prototype.getWMTSLegendURL = function(layer) {
  // FIXME case of multiple styles ?  case of multiple legendUrl ?
  var url;
  var styles = layer.get('capabilitiesStyles');
  if (styles !== undefined) {
    var legendURL = styles[0]['legendURL'];
    if (legendURL !== undefined) {
      url = legendURL[0]['href'];
    }
  }
  return url || null;
};


/**
 * Get the WMS legend URL for the given node.
 * @param {string} url The base url of the wms service.
 * @param {string} layerName The name of a wms layer.
 * @param {number} scale A scale.
 * @param {string=} opt_legendRule rule parameters to add to the returned URL.
 * @return {?string} The legend URL or null.
 * @export
 */
ngeo.LayerHelper.prototype.getWMSLegendURL = function(url,
    layerName, scale, opt_legendRule) {
  if (!url) {
    return null;
  }
  url = goog.uri.utils.setParam(url, 'FORMAT', 'image/png');
  url = goog.uri.utils.setParam(url, 'TRANSPARENT', true);
  url = goog.uri.utils.setParam(url, 'SERVICE', 'wms');
  url = goog.uri.utils.setParam(url, 'VERSION', '1.1.1');
  url = goog.uri.utils.setParam(url, 'REQUEST', 'GetLegendGraphic');
  url = goog.uri.utils.setParam(url, 'LAYER', layerName);
  url = goog.uri.utils.setParam(url, 'SCALE', scale);
  if (opt_legendRule !== undefined) {
    url = goog.uri.utils.setParam(url, 'RULE', opt_legendRule);
  }
  return url;
};


ngeo.module.service('ngeoLayerHelper', ngeo.LayerHelper);
