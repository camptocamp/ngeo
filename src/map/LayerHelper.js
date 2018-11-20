/**
 * @module ngeo.map.LayerHelper
 */
import googAsserts from 'goog/asserts.js';
import * as olArray from 'ol/array.js';
import olFormatWMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import OlLayerGroup from 'ol/layer/Group.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import * as olObj from 'ol/obj.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import * as olUri from 'ol/uri.js';

/**
 * Provides help functions that helps you to create and manage layers.
 * @param {angular.IQService} $q Angular promises/deferred service.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {number} ngeoTilesPreloadingLimit Load tiles up to preload levels. By default preload is Infinity,
 *     which means load all tiles on the top of the visible level. See also preload value
 *     in documentation for ol.Layer.Tile.
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoLayerHelper
 * @ngInject
 */
const exports = function($q, $http, ngeoTilesPreloadingLimit) {

  /**
   * @type {angular.IQService}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.$http_ = $http;

  /**
   * The Tiles Preloading Limit value
   * @type {number}
   * @private
   */
  this.tilesPreloadingLimit_ = ngeoTilesPreloadingLimit;
};


/**
 * @const
 */
exports.GROUP_KEY = 'groupName';


/**
 * @const
 */
exports.REFRESH_PARAM = 'random';


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
 * @param {Object=} opt_customOptions Some initial options.
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
exports.prototype.createBasicWMSLayer = function(sourceURL,
  sourceLayersName, sourceFormat, opt_serverType, opt_time, opt_params, opt_crossOrigin, opt_customOptions) {

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
  const options = Object.assign({}, opt_customOptions, {
    url: sourceURL,
    params: params,
    serverType: olServerType,
    crossOrigin: opt_crossOrigin
  });
  const source = new olSourceImageWMS(options);
  if (opt_params) {
    source.updateParams(opt_params);
  }

  return new olLayerImage({source});
};


/**
 * Create and return a basic WMS layer using an OGC data source.
 *
 * @param {ngeo.datasource.OGC} dataSource OGC data source.
 * @param {string=} opt_crossOrigin crossOrigin.
 * @return {ol.layer.Image} WMS Layer.
 * @export
 */
exports.prototype.createBasicWMSLayerFromDataSource = function(
  dataSource, opt_crossOrigin
) {
  const url = dataSource.wmsUrl;
  googAsserts.assert(url);

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
 * @param {string=} opt_matrixSet Optional WMTS matrix set.
 * @param {Object.<string, string>=} opt_dimensions WMTS dimensions.
 * @param {Object=} opt_customOptions Some initial options.
 * @return {angular.IPromise.<ol.layer.Tile>} A Promise with a layer (with source) on success,
 *     no layer else.
 * @export
 */
exports.prototype.createWMTSLayerFromCapabilitites = function(capabilitiesURL, layerName, opt_matrixSet, opt_dimensions, opt_customOptions) {
  const parser = new olFormatWMTSCapabilities();
  const layer = new olLayerTile({
    preload: this.tilesPreloadingLimit_
  });
  const $q = this.$q_;

  return this.$http_.get(capabilitiesURL, {cache: true}).then((response) => {
    let result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result) {
      const options = Object.assign({}, opt_customOptions, optionsFromCapabilities(result, {
        matrixSet: opt_matrixSet,
        crossOrigin: 'anonymous',
        layer: layerName
      }));
      const source = new olSourceWMTS(/** @type {olx.source.WMTSOptions} */ (options));
      if (opt_dimensions && !olObj.isEmpty(opt_dimensions)) {
        source.updateDimensions(opt_dimensions);
      }
      layer.setSource(source);

      // Add styles from capabilities as param of the layer
      const layers = result['Contents']['Layer'];
      const l = olArray.find(layers, (elt, index, array) => elt['Identifier'] == layerName);
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
exports.prototype.createWMTSLayerFromCapabilititesObj = function(
  capabilities, layerCap, opt_dimensions
) {

  const options = optionsFromCapabilities(capabilities, {
    crossOrigin: 'anonymous',
    layer: layerCap['Identifier']
  });

  googAsserts.assert(options);
  const source = new olSourceWMTS(
    /** @type {olx.source.WMTSOptions} */ (options));

  if (opt_dimensions && !olObj.isEmpty(opt_dimensions)) {
    source.updateDimensions(opt_dimensions);
  }

  return new olLayerTile({
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
exports.prototype.createBasicGroup = function(opt_layers) {
  const group = new OlLayerGroup();
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
exports.prototype.getGroupFromMap = function(map, groupName) {
  const groups = map.getLayerGroup().getLayers();
  let group;
  groups.getArray().some((existingGroup) => {
    if (existingGroup.get(exports.GROUP_KEY) === groupName) {
      group = /** @type {ol.layer.Group} */ (existingGroup);
      return true;
    } else {
      return false;
    }
  });
  if (!group) {
    group = this.createBasicGroup();
    group.set(exports.GROUP_KEY, groupName);
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
exports.prototype.getFlatLayers = function(layer) {
  if (layer instanceof OlLayerGroup) {
    const sublayers = layer.getLayers().getArray();
    const hasGroupLayer = sublayers.some(sublayer => sublayer instanceof OlLayerGroup);
    if (!hasGroupLayer) {
      return sublayers.slice();
    }
  }
  return this.getFlatLayers_(layer, [], undefined);
};


/**
 * Get an array of all layers in a group. The group can contain multiple levels
 * of others groups. When we flatten a group, we get the child layers.
 * If opacity is defined on the group, this value is lost.
 * Computed opacity is a custom 'back-up' value that contains
 * the calculated value of all ancestors and the given layer.
 * @param {ol.layer.Base} layer The base layer, mostly a group of layers.
 * @param {Array.<ol.layer.Base>} array An array to add layers.
 * @param {number|undefined} computedOpacity Opacity inherited from ancestor layer groups.
 * @return {Array.<ol.layer.Layer>} Layers.
 * @private
 */
exports.prototype.getFlatLayers_ = function(layer, array, computedOpacity) {
  const opacity = layer.getOpacity();
  if (computedOpacity !== undefined) {
    computedOpacity *= opacity;
  } else {
    computedOpacity = opacity;
  }
  if (layer instanceof OlLayerGroup) {
    const sublayers = layer.getLayers();
    sublayers.forEach((l) => {
      this.getFlatLayers_(l, array, computedOpacity);
    });
  } else {
    if (array.indexOf(layer) < 0) {
      layer.set('inheritedOpacity', computedOpacity, true);
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
exports.prototype.getLayerByName = function(layerName, layers) {
  let found = null;
  layers.some((layer) => {
    if (layer instanceof OlLayerGroup) {
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
exports.prototype.getWMTSLegendURL = function(layer) {
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
 * @param {number=} opt_legendWidth the legend width.
 * @param {number=} opt_legendHeight the legend height.
 * @param {string=} opt_servertype the OpenLayers server type.
 * @param {number=} opt_dpi the DPI.
 * @param {Array.number=} opt_bbox the bbox.
 * @param {string=} opt_srs The projection code.
 * @param {Object.<string, string>=} opt_additionalQueryString Additional query string parameters.
 * @return {string|undefined} The legend URL or undefined.
 * @export
 */
exports.prototype.getWMSLegendURL = function(url,
  layerName, opt_scale, opt_legendRule, opt_legendWidth, opt_legendHeight,
  opt_servertype, opt_dpi, opt_bbox, opt_srs, opt_additionalQueryString) {
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
    if (opt_legendWidth !== undefined) {
      queryString['WIDTH'] = opt_legendWidth;
    }
    if (opt_legendHeight !== undefined) {
      queryString['HEIGHT'] = opt_legendHeight;
    }
  }
  if (opt_servertype == 'qgis') {
    if (opt_dpi != undefined) {
      queryString['DPI'] = opt_dpi;
    }
    if (opt_bbox != undefined && opt_srs != undefined && opt_scale != undefined && opt_dpi != undefined && opt_legendRule == undefined) {
      queryString['BBOX'] = opt_bbox.join(',');
      queryString['SRS'] = opt_srs;
      queryString['WIDTH'] = Math.round((opt_bbox[2] - opt_bbox[0]) / opt_scale * 39.37 * opt_dpi);
      queryString['HEIGHT'] = Math.round((opt_bbox[3] - opt_bbox[1]) / opt_scale * 39.37 * opt_dpi);
    }
  }
  if (opt_additionalQueryString) {
    Object.assign(queryString, opt_additionalQueryString);
  }
  return olUri.appendParams(url, queryString);
};


/**
 * Returns if this layer is visible at the current resolution.
 * @param {ol.layer.Base} layer Layer.
 * @param {ol.Map} map Map.
 * @return {boolean} Is the layer currently visible?
 */
exports.prototype.isLayerVisible = function(layer, map) {
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
exports.prototype.refreshWMSLayer = function(layer) {
  const source_ = layer.getSource();
  googAsserts.assert(
    source_ instanceof olSourceImageWMS ||
    source_ instanceof olSourceTileWMS
  );
  const source = /** @type {ol.source.ImageWMS|ol.source.TileWMS} */ (source_);
  const params = source.getParams();
  params[exports.REFRESH_PARAM] = Math.random();
  source.updateParams(params);
};


/**
 * Set ZIndex property to first level children elements
 * @param {ol.layer.Group|ol.layer.Base} element The group of layer with first level children layers.
 * @param {number} ZIndex The ZIndex for children element.
 */
exports.prototype.setZIndexToFirstLevelChildren = function(element, ZIndex) {
  if (!(element instanceof OlLayerGroup)) {
    return;
  }
  const innerGroupLayers = element.getLayers();
  innerGroupLayers.forEach(innerLayer => innerLayer.setZIndex(ZIndex));
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
exports.prototype.updateWMSLayerState = function(layer, names, opt_time) {
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
exports.prototype.getQuerySourceIds = function(layer) {
  return /** @type {Array.<number>|undefined} */ (
    layer.get('querySourceIds'));
};


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('ngeoLayerHelper', [])
  .service('ngeoLayerHelper', exports)
  .value('ngeoTilesPreloadingLimit', Infinity);


export default exports;
