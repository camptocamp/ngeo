goog.provide('ngeo.map.LayerHelper');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.array');
goog.require('ol.format.WMTSCapabilities');
goog.require('ol.layer.Group');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.obj');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');
goog.require('ol.uri');


/**
 * Provides help functions that helps you to create and manage layers.
 * @param {angular.$q} $q Angular promises/deferred service.
 * @param {angular.$http} $http Angular http service.
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoLayerHelper
 * @ngInject
 */
ngeo.map.LayerHelper = function($q, $http) {

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
ngeo.map.LayerHelper.GROUP_KEY = 'groupName';


/**
 * @const
 */
ngeo.map.LayerHelper.REFRESH_PARAM = 'random';


/**
 * Create and return a basic WMS layer with only a source URL and a comma
 * separated layers names (see {@link ol.source.ImageWMS}).
 *
 * @param {string} sourceURL The source URL.
 * @param {string} sourceLayersName A comma separated names string.
 * @param {string} sourceFormat Image format, for example 'image/png'.
 * @param {string=} opt_serverType Type of the server ("mapserver",
 *     "geoserver", "qgisserver", …).
 * @param {string=} opt_time time parameter for layer queryable by time/periode
 * @param {Object.<string, string>=} opt_params WMS parameters.
 * @param {string=} opt_crossOrigin crossOrigin.
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
ngeo.map.LayerHelper.prototype.createBasicWMSLayer = function(sourceURL,
  sourceLayersName, sourceFormat, opt_serverType, opt_time, opt_params, opt_crossOrigin) {

  const params = {
    'FORMAT': sourceFormat,
    'LAYERS': sourceLayersName
  };
  let olServerType;
  if (opt_time) {
    params['TIME'] = opt_time;
  }
  if (opt_serverType) {
    params['SERVERTYPE'] = opt_serverType;
    // OpenLayers expects 'qgis' insteads of 'qgisserver'
    olServerType = opt_serverType.replace('qgisserver', 'qgis');
  }
  const source = new ol.source.ImageWMS({
    url: sourceURL,
    params: params,
    serverType: olServerType,
    crossOrigin: opt_crossOrigin
  });
  if (opt_params) {
    source.updateParams(opt_params);
  }

  return new ol.layer.Image({source});
};


/**
 * Create and return a basic WMS layer using an OGC data source.
 *
 * @param {ngeo.datasource.OGC} dataSource OGC data source.
 * @param {string=} opt_crossOrigin crossOrigin.
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
ngeo.map.LayerHelper.prototype.createBasicWMSLayerFromDataSource = function(
  dataSource, opt_crossOrigin
) {
  const url = dataSource.wmsUrl;
  goog.asserts.assert(url);

  const layerNames = dataSource.getOGCLayerNames().join(',');
  const serverType = dataSource.ogcServerType;
  const imageType = dataSource.ogcImageType;

  // (1) Layer creation
  const layer = this.createBasicWMSLayer(
    url,
    layerNames,
    imageType,
    serverType,
    undefined,
    undefined,
    opt_crossOrigin
  );

  // (2) Manage visibility
  layer.setVisible(dataSource.visible);

  // (3) Reference to the data source
  layer.set('querySourceIds', [dataSource.id]);

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
 * @param {Object.<string, string>=} opt_dimensions WMTS dimensions.
 * @return {angular.$q.Promise.<ol.layer.Tile>} A Promise with a layer (with source) on success,
 *     no layer else.
 * @export
 */
ngeo.map.LayerHelper.prototype.createWMTSLayerFromCapabilitites = function(capabilitiesURL, layerName, opt_dimensions) {
  const parser = new ol.format.WMTSCapabilities();
  const layer = new ol.layer.Tile({
    preload: Infinity
  });
  const $q = this.$q_;

  return this.$http_.get(capabilitiesURL, {cache: true}).then((response) => {
    let result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result) {
      const options = ol.source.WMTS.optionsFromCapabilities(result, {
        crossOrigin: 'anonymous',
        layer: layerName
      });
      goog.asserts.assert(options);
      const source = new ol.source.WMTS(/** @type {olx.source.WMTSOptions} */ (options));
      if (opt_dimensions && !ol.obj.isEmpty(opt_dimensions)) {
        source.updateDimensions(opt_dimensions);
      }
      layer.setSource(source);

      // Add styles from capabilities as param of the layer
      const layers = result['Contents']['Layer'];
      const l = ol.array.find(layers, (elt, index, array) => elt['Identifier'] == layerName);
      layer.set('capabilitiesStyles', l['Style']);

      return $q.resolve(layer);
    }
    return $q.reject(`Failed to get WMTS capabilities from ${capabilitiesURL}`);
  });
};


/**
 * Create and return a WMTS layer using a formatted capabilities response
 * and a capability layer.
 *
 * @param {!Object} capabilities The complete capabilities object of the service
 * @param {!Object} layerCap The layer capability object
 * @param {Object.<string, string>=} opt_dimensions WMTS dimensions.
 * @return {!ol.layer.Tile} WMTS layer
 * @export
 */
ngeo.map.LayerHelper.prototype.createWMTSLayerFromCapabilititesObj = function(
  capabilities, layerCap, opt_dimensions
) {

  const options = ol.source.WMTS.optionsFromCapabilities(capabilities, {
    crossOrigin: 'anonymous',
    layer: layerCap['Identifier']
  });

  goog.asserts.assert(options);
  const source = new ol.source.WMTS(
    /** @type {olx.source.WMTSOptions} */ (options));

  if (opt_dimensions && !ol.obj.isEmpty(opt_dimensions)) {
    source.updateDimensions(opt_dimensions);
  }

  return new ol.layer.Tile({
    'capabilitiesStyles': layerCap['Style'],
    preload: Infinity,
    source: source
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
ngeo.map.LayerHelper.prototype.createBasicGroup = function(opt_layers) {
  const group = new ol.layer.Group();
  if (opt_layers) {
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
ngeo.map.LayerHelper.prototype.getGroupFromMap = function(map, groupName) {
  const groups = map.getLayerGroup().getLayers();
  let group;
  groups.getArray().some((existingGroup) => {
    if (existingGroup.get(ngeo.map.LayerHelper.GROUP_KEY) === groupName) {
      group = /** @type {ol.layer.Group} */ (existingGroup);
      return true;
    } else {
      return false;
    }
  });
  if (!group) {
    group = this.createBasicGroup();
    group.set(ngeo.map.LayerHelper.GROUP_KEY, groupName);
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
ngeo.map.LayerHelper.prototype.getFlatLayers = function(layer) {
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
ngeo.map.LayerHelper.prototype.getFlatLayers_ = function(layer, array) {
  if (layer instanceof ol.layer.Group) {
    const sublayers = layer.getLayers();
    sublayers.forEach((l) => {
      this.getFlatLayers_(l, array);
    });
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
ngeo.map.LayerHelper.prototype.getLayerByName = function(layerName, layers) {
  let found = null;
  layers.some((layer) => {
    if (layer instanceof ol.layer.Group) {
      const sublayers = layer.getLayers().getArray();
      found = this.getLayerByName(layerName, sublayers);
    } else if (layer.get('layerNodeName') === layerName) {
      found = layer;
    }
    return !!found;
  });

  return found;
};


/**
 * Get the WMTS legend URL for the given layer.
 * @param {ol.layer.Tile} layer Tile layer as returned by the
 * ngeo layerHelper service.
 * @return {string|undefined} The legend URL or undefined.
 * @export
 */
ngeo.map.LayerHelper.prototype.getWMTSLegendURL = function(layer) {
  // FIXME case of multiple styles ?  case of multiple legendUrl ?
  let url;
  const styles = layer.get('capabilitiesStyles');
  if (styles !== undefined) {
    const legendURL = styles[0]['legendURL'];
    if (legendURL !== undefined) {
      url = legendURL[0]['href'];
    }
  }
  return url;
};


/**
 * Get the WMS legend URL for the given node.
 * @param {string|undefined} url The base url of the wms service.
 * @param {string} layerName The name of a wms layer.
 * @param {number=} opt_scale A scale.
 * @param {string=} opt_legendRule rule parameters to add to the returned URL.
 * @return {string|undefined} The legend URL or undefined.
 * @export
 */
ngeo.map.LayerHelper.prototype.getWMSLegendURL = function(url,
  layerName, opt_scale, opt_legendRule) {
  if (!url) {
    return undefined;
  }
  const queryString = {
    'FORMAT': 'image/png',
    'TRANSPARENT': true,
    'SERVICE': 'WMS',
    'VERSION': '1.1.1',
    'REQUEST': 'GetLegendGraphic',
    'LAYER': layerName
  };
  if (opt_scale !== undefined) {
    queryString['SCALE'] = opt_scale;
  }
  if (opt_legendRule !== undefined) {
    queryString['RULE'] = opt_legendRule;
  }
  return ol.uri.appendParams(url, queryString);
};


/**
 * Returns if this layer is visible at the current resolution.
 * @param {ol.layer.Base} layer Layer.
 * @param {ol.Map} map Map.
 * @return {boolean} Is the layer currently visible?
 */
ngeo.map.LayerHelper.prototype.isLayerVisible = function(layer, map) {
  if (!layer.getVisible()) {
    return false;
  }

  const currentResolution = map.getView().getResolution();
  return currentResolution > layer.getMinResolution() &&
      currentResolution < layer.getMaxResolution();
};


/**
 * Force a WMS layer to refresh using a random value.
 * @param {ol.layer.Image|ol.layer.Tile} layer Layer to refresh.
 */
ngeo.map.LayerHelper.prototype.refreshWMSLayer = function(layer) {
  const source_ = layer.getSource();
  goog.asserts.assert(
    source_ instanceof ol.source.ImageWMS ||
    source_ instanceof ol.source.TileWMS
  );
  const source = /** @type {ol.source.ImageWMS|ol.source.TileWMS} */ (source_);
  const params = source.getParams();
  params[ngeo.map.LayerHelper.REFRESH_PARAM] = Math.random();
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
ngeo.map.LayerHelper.prototype.updateWMSLayerState = function(layer, names, opt_time) {
  // Don't send layer without parameters, hide layer instead;
  if (names.length <= 0) {
    layer.setVisible(false);
  } else {
    layer.setVisible(true);
    const source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
    if (opt_time) {
      source.updateParams({'LAYERS': names, 'TIME': opt_time});
    } else {
      source.updateParams({'LAYERS': names});
    }
  }
};


/**
 * @param {ol.layer.Image} layer The WMS layer.
 * @return {Array.<number>|undefined} List of query source ids, a.k.a.
 *     the data source ids this layer is composed of.
 * @export
 */
ngeo.map.LayerHelper.prototype.getQuerySourceIds = function(layer) {
  return /** @type {Array.<number>|undefined} */ (
    layer.get('querySourceIds'));
};


/**
 * @type {!angular.Module}
 */
ngeo.map.LayerHelper.module = angular.module('ngeoLayerHelper', []);
ngeo.map.LayerHelper.module.service('ngeoLayerHelper', ngeo.map.LayerHelper);
