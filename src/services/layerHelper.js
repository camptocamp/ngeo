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
 * @const
 */
ngeo.LayerHelper.REFRESH_PARAM = 'random';


/**
 * Create and return a basic WMS layer with only a source URL and a comma
 * separated layers names (see {@link ol.source.ImageWMS}).
 * @param {string} sourceURL The source URL.
 * @param {string} sourceLayersName A comma separated names string.
 * @param {string=} opt_serverType Type of the server ("mapserver",
 *     "geoserver", "qgisserver", …).
 * @param {string=} opt_time time parameter for layer queryable by time/periode
 * @param {Object.<string, string>=} opt_params WMS parameters.
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
ngeo.LayerHelper.prototype.createBasicWMSLayer = function(sourceURL,
    sourceLayersName, opt_serverType, opt_time, opt_params) {

  //DebugZone
  sourceURL = sourceURL.replace('ogcserver=Main+PNG&','');
  sourceURL = sourceURL.replace('ogcserver=Main+Jpeg&','');
  sourceURL = sourceURL.replace('ogcserver=WMS+CH+topo+fr&','');

  var params = {'LAYERS': sourceLayersName};
  var olServerType;
  if (opt_time) {
    params['TIME'] = opt_time;
  }
  if (opt_serverType) {
    params['SERVERTYPE'] = opt_serverType;
    // OpenLayers expects 'qgis' insteads of 'qgisserver'
    olServerType = opt_serverType.replace('qgisserver', 'qgis');
  }
  var source = new ol.source.ImageWMS({
    url: sourceURL,
    params: params,
    serverType: olServerType
  });
  if (opt_params) {
    source.updateParams(opt_params);
  }

  return new ol.layer.Image({source: source});
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
 * @param {Object.<string, string>=} opt_dimensions WMTS dimensions.
 * @return {angular.$q.Promise.<ol.layer.Tile>} A Promise with a layer (with source) on success,
 *     no layer else.
 * @export
 */
ngeo.LayerHelper.prototype.createWMTSLayerFromCapabilitites = function(capabilitiesURL, layerName, opt_dimensions) {
  var parser = new ol.format.WMTSCapabilities();
  var layer = new ol.layer.Tile({
    preload: Infinity
  });
  var $q = this.$q_;

  return this.$http_.get(capabilitiesURL).then(function(response) {
    var result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result) {
      var options = ol.source.WMTS.optionsFromCapabilities(result, {
        layer: layerName
      });
      var source = new ol.source.WMTS(options);
      if (opt_dimensions) {
        source.updateDimensions(opt_dimensions);
      }
      layer.setSource(source);

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
  groups.getArray().some(function(existingGroup) {
    if (existingGroup.get(ngeo.LayerHelper.GROUP_KEY) === groupName) {
      group = /** @type {ol.layer.Group} */ (existingGroup);
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
 * Get an array of all group and layer in a group. The group can contain
 * multiple levels of others groups. It will include itself.
 * @param {ol.layer.Group} group The base group of layers
 * @return {Array.<ol.layer.Group|ol.layer.Base>} .
 * @export
 */
ngeo.LayerHelper.prototype.getFlatMapElements = function(group) {
  return this.getFlatMapElements_(group, []);
};


/**
 * Get an array of all layers and group in a group. The group can contain
 * multiple levels of others groups.
 * @param {ol.layer.Group|ol.layer.Base} element A group or a layer.
 * @param {Array.<ol.layer.Group|ol.layer.Base>} array An array to add elements.
 * @return {Array.<ol.layer.Group|ol.layer.Base>} Elements.
 * @private
 */
ngeo.LayerHelper.prototype.getFlatMapElements_ = function(element, array) {
  if (element instanceof ol.layer.Group) {
    var groupArray = element.getLayers().getArray();
    groupArray.forEach(function(e) {
      this.getFlatMapElements_(e, array);
    }, this);
  }
  array.push(element);
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
    } else if (layer.get('layerNodeName') === layerName) {
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
 * @param {number=} opt_scale A scale.
 * @param {string=} opt_legendRule rule parameters to add to the returned URL.
 * @return {?string} The legend URL or null.
 * @export
 */
ngeo.LayerHelper.prototype.getWMSLegendURL = function(url,
    layerName, opt_scale, opt_legendRule) {
  if (!url) {
    return null;
  }
  url = goog.uri.utils.setParam(url, 'FORMAT', 'image/png');
  url = goog.uri.utils.setParam(url, 'TRANSPARENT', true);
  url = goog.uri.utils.setParam(url, 'SERVICE', 'WMS');
  url = goog.uri.utils.setParam(url, 'VERSION', '1.1.1');
  url = goog.uri.utils.setParam(url, 'REQUEST', 'GetLegendGraphic');
  url = goog.uri.utils.setParam(url, 'LAYER', layerName);
  if (opt_scale !== undefined) {
    url = goog.uri.utils.setParam(url, 'SCALE', opt_scale);
  }
  if (opt_legendRule !== undefined) {
    url = goog.uri.utils.setParam(url, 'RULE', opt_legendRule);
  }
  return url;
};


/**
 * Returns if this layer is visible at the current resolution.
 * @param {ol.layer.Base} layer Layer.
 * @param {ol.Map} map Map.
 * @return {boolean} Is the layer currently visible?
 */
ngeo.LayerHelper.prototype.isLayerVisible = function(layer, map) {
  if (!layer.getVisible()) {
    return false;
  }

  var currentResolution = map.getView().getResolution();
  return currentResolution > layer.getMinResolution() &&
      currentResolution < layer.getMaxResolution();
};


/**
 * Force a WMS layer to refresh using a random value.
 * @param {ol.layer.Image|ol.layer.Tile} layer Layer to refresh.
 */
ngeo.LayerHelper.prototype.refreshWMSLayer = function(layer) {
  var source = layer.getSource();
  goog.asserts.assert(
    source instanceof ol.source.ImageWMS ||
    source instanceof ol.source.TileWMS
  );
  var params = source.getParams();
  params[ngeo.LayerHelper.REFRESH_PARAM] = Math.random();
  source.updateParams(params);
};


/**
 * Update the LAYERS parameter of the source of the given WMS layer.
 * @param {ol.layer.Image} layer The WMS layer.
 * @param {string} names The names that will be used to set
 * the LAYERS parameter.
 * @param {string=} opt_time The start
 * and optionally the end datetime (for time range selection) selected by user
 * in a ISO-8601 string datetime or time interval format
 * @export
 */
ngeo.LayerHelper.prototype.updateWMSLayerState = function(layer,
    names, opt_time) {
  // Don't send layer without parameters, hide layer instead;
  if (names.length <= 0) {
    layer.setVisible(false);
  } else {
    layer.setVisible(true);
    var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
    if (opt_time) {
      source.updateParams({'LAYERS': names, 'TIME': opt_time});
    } else {
      source.updateParams({'LAYERS': names});
    }
  }
};


ngeo.module.service('ngeoLayerHelper', ngeo.LayerHelper);
