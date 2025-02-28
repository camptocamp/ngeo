// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import olFormatMVT from 'ol/format/MVT';
import olFormatWMTSCapabilities from 'ol/format/WMTSCapabilities';
import olLayerGroup from 'ol/layer/Group';
import olLayerImage from 'ol/layer/Image';
import olLayerLayer from 'ol/layer/Layer';
import olLayerVectorTile from 'ol/layer/VectorTile';
import {isEmpty} from 'ol/obj';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceTileWMS from 'ol/source/TileWMS';
import olSourceVectorTile from 'ol/source/VectorTile';
import olSourceWMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import {appendParams as olUriAppendParams} from 'ol/uri';
import {stylefunction as olMapboxStyleStylefunction} from 'ol-mapbox-style';
import {ServerType} from 'ngeo/datasource/OGC';
import {createLayerTileOrWebGLTile} from 'ngeo/utils';

/**
 * Provides help functions that helps you to create and manage layers.
 *
 * @param {angular.IQService} $q Angular promises/deferred service.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/options').ngeoTilesPreloadingLimit} ngeoTilesPreloadingLimit Load tiles up to preload levels.
 *     By default preload is Infinity,
 *     which means load all tiles on the top of the visible level. See also preload value
 *     in documentation for ol.Layer.Tile.
 * @class
 * @ngdoc service
 * @ngname ngeoLayerHelper
 * @ngInject
 * @hidden
 */
export function LayerHelper($q, $http, ngeoTilesPreloadingLimit) {
  /**
   * @type {angular.IQService}
   */
  this.$q_ = $q;

  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * The Tiles Preloading Limit value
   *
   * @type {number}
   */
  this.tilesPreloadingLimit_ = ngeoTilesPreloadingLimit === null ? Infinity : ngeoTilesPreloadingLimit;
}

/**
 * Layer node name key in layer parameters.
 * To identify the OpenLayers layer by its name.
 */
export const LAYER_NODE_NAME_KEY = 'layerNodeName';

/**
 * Key to know if the layer is used as a leaf in a tree.
 * In mixed WMS groups that would be probably the case but not in a
 * not-mixed WMS groups where we want to toggle each wms names (sub-layers).
 */
export const NODE_IS_LEAF = 'layerIsLeaf';

/**
 * Id of the datasource
 */
export const DATASOURCE_ID = 'dataSourceId';

/**
 * Name key for layer groups in the map.
 */
export const GROUP_KEY = 'groupName';

/**
 * @private
 * @hidden
 */
const REFRESH_PARAM = 'random';

/**
 * Copy each properties from a layer onto an other layer, with the
 * option to exclude specific ones.
 *
 * @param {import('ol/layer/Layer').default<import('ol/source/Source').default>} layerFrom The layer
 *     from which to copy the properties.
 * @param {import('ol/layer/Layer').default<import('ol/source/Source').default>} layerTo The layer onto
 *     which the properties are copied.
 * @param {string[]} [opt_excludes] A list of properties that should
 *     not be copied.
 */
LayerHelper.prototype.copyProperties = function (layerFrom, layerTo, opt_excludes) {
  const properties = layerFrom.getProperties();
  if (opt_excludes) {
    const excludes = opt_excludes;
    const keys = Object.keys(properties);
    for (const key of keys) {
      if (excludes.includes(key)) {
        continue;
      }
      layerTo.set(key, properties[key]);
    }
  } else {
    layerTo.setProperties(properties);
  }
};

/**
 * Create and return a basic WMS layer with only a source URL and a comma
 * separated layers names (see {@link import('ol/source/ImageWMS').default}).
 *
 * @param {string} sourceURL The source URL.
 * @param {string} sourceLayersName A comma separated names string.
 * @param {string} sourceFormat Image format, for example 'image/png'.
 * @param {string} [opt_serverType] Type of the server ("mapserver",
 *     "geoserver", "qgisserver", …).
 * @param {string} [opt_time] time parameter for layer queryable by time/period
 * @param {Object<string, string>} [opt_params] WMS parameters.
 * @param {string} [opt_crossOrigin] crossOrigin.
 * @param {unknown} [opt_customSourceOptions] Some layer's source initial options.
 * @param {unknown} [opt_customLayerOptions] Some layer initial options.
 * @returns {import('ol/layer/Image').default<import('ol/source/Image').default>} WMS Layer.
 */
LayerHelper.prototype.createBasicWMSLayer = function (
  sourceURL,
  sourceLayersName,
  sourceFormat,
  opt_serverType,
  opt_time,
  opt_params,
  opt_crossOrigin,
  opt_customSourceOptions,
  opt_customLayerOptions
) {
  /** @type {Object<string, string>} */
  const params = {
    FORMAT: sourceFormat,
    LAYERS: sourceLayersName,
  };
  let olServerType;
  if (opt_time) {
    params.TIME = opt_time;
  }
  if (opt_serverType) {
    params.SERVERTYPE = opt_serverType;
    // OpenLayers expects 'qgis' instead of 'qgisserver'
    olServerType = opt_serverType.replace(ServerType.QGISSERVER, 'qgis');
  }

  const options = Object.assign({}, opt_customSourceOptions, {
    url: sourceURL,
    params: params,
    serverType: olServerType,
    crossOrigin: opt_crossOrigin,
  });
  if (
    opt_serverType != 'mapserver' &&
    opt_serverType != 'geoserver' &&
    opt_serverType != 'carmentaserver' &&
    opt_serverType != 'qgis'
  ) {
    options.hidpi = false;
  }
  const source = new olSourceImageWMS(options);
  if (opt_params) {
    source.updateParams(opt_params);
  }

  if (!(opt_params && opt_params.STYLES)) {
    params.STYLES = '';
    let i = sourceLayersName.split(',').length;
    while (i > 1) {
      params.STYLES.concat(',');
      i--;
    }
  }

  const layerOptions = Object.assign({}, opt_customLayerOptions, {source});
  return new olLayerImage(layerOptions);
};

/**
 * Create and return a basic WMS layer using an OGC data source.
 *
 * @param {import('ngeo/datasource/OGC').default} dataSource OGC data source.
 * @param {string} [opt_crossOrigin] crossOrigin.
 * @returns {import('ol/layer/Image').default<import('ol/source/Image').default>} WMS Layer.
 */
LayerHelper.prototype.createBasicWMSLayerFromDataSource = function (dataSource, opt_crossOrigin) {
  const url = dataSource.wmsUrl;
  if (url === undefined) {
    throw new Error('Missing url');
  }

  const layerNames = dataSource.getWMSLayerNames().join(',');
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

  // (4) Set the datasource id property
  layer.set(DATASOURCE_ID, dataSource.id);

  return layer;
};

/**
 * Small hack to get perfect sync with the on resolution status and the zoom to resolution.
 *
 * @param {number} opt_maxResolution resolution.
 * @returns {number} fixed maximum resolution.
 */
LayerHelper.prototype.fixResolution_ = function (opt_maxResolution) {
  if (opt_maxResolution) {
    opt_maxResolution = opt_maxResolution * 1.0000001;
  }
  return opt_maxResolution;
};

/**
 * Create and return a promise that provides a WMTS layer with source on
 * success, no layer else.
 * The WMTS layer source will be configured by the capabilities that are
 * loaded from the given capabilitiesUrl.
 * The style object described in the capabilities for this layer will be added
 * as key 'capabilitiesStyles' as param of the new layer.
 *
 * @param {string} capabilitiesURL The getCapabilities url.
 * @param {string} layerName The name of the layer.
 * @param {string} [opt_matrixSet] Optional WMTS matrix set.
 * @param {Object<string, ?string>} [opt_dimensions] WMTS dimensions.
 * @param {Object} [opt_customOptions] Some initial options.
 * @param {number} [opt_minResolution] WMTS minimum resolution.
 * @param {number} [opt_maxResolution] WMTS maximum resolution.
 * @param {number} [opt_opacity] The opacity.
 * @returns {angular.IPromise<import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>>} A Promise with a layer (with source) on
 *    success, no layer else.
 */
LayerHelper.prototype.createWMTSLayerFromCapabilitites = function (
  capabilitiesURL,
  layerName,
  opt_matrixSet,
  opt_dimensions,
  opt_customOptions,
  opt_minResolution,
  opt_maxResolution,
  opt_opacity
) {
  opt_maxResolution = this.fixResolution_(opt_maxResolution);
  const parser = new olFormatWMTSCapabilities();
  const layerOptions = {
    preload: this.tilesPreloadingLimit_,
    minResolution: opt_minResolution,
    maxResolution: opt_maxResolution,
    className: 'canvas3d',
  };
  const layer = createLayerTileOrWebGLTile(layerOptions);
  const $q = this.$q_;

  return this.$http_.get(capabilitiesURL, {cache: true}).then((response) => {
    let result;
    if (response.data) {
      result = parser.read(response.data);
    }
    if (result) {
      const options = Object.assign(
        {},
        opt_customOptions,
        optionsFromCapabilities(result, {
          matrixSet: opt_matrixSet,
          crossOrigin: 'anonymous',
          layer: layerName,
        })
      );
      const source = new olSourceWMTS(/** @type {import('ol/source/WMTS').Options} */ (options));
      if (opt_dimensions && !isEmpty(opt_dimensions)) {
        source.updateDimensions(opt_dimensions);
      }
      layer.setSource(source);

      // Add styles from capabilities as param of the layer
      const layers = result.Contents.Layer;
      const l = layers.find((elt) => elt.Identifier == layerName);
      if (!l) {
        return $q.reject(`Layer ${layerName} not available in WMTS capabilities from ${capabilitiesURL}`);
      }
      layer.set('capabilitiesStyles', l.Style);
      if (opt_opacity !== undefined) {
        layer.setOpacity(opt_opacity);
      }

      return $q.resolve(layer);
    }
    return $q.reject(`Failed to get WMTS capabilities from ${capabilitiesURL}`);
  });
};

/**
 * Create and return a WMTS layer using a formatted capabilities response
 * and a capability layer.
 *
 * @param {Object<string, any>} capabilities The complete capabilities object of the service
 * @param {Object<string, any>} layerCap The layer capability object
 * @param {Object<string, string>} [opt_dimensions] WMTS dimensions.
 * @returns {import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>} WMTS layer
 */
LayerHelper.prototype.createWMTSLayerFromCapabilititesObj = function (
  capabilities,
  layerCap,
  opt_dimensions
) {
  const options = optionsFromCapabilities(capabilities, {
    crossOrigin: 'anonymous',
    layer: layerCap.Identifier,
    className: 'canvas3d',
  });

  console.assert(options);
  const source = new olSourceWMTS(/** @type {import('ol/source/WMTS').Options} */ (options));

  if (opt_dimensions && !isEmpty(opt_dimensions)) {
    source.updateDimensions(opt_dimensions);
  }

  const layerOptions = {
    preload: Infinity,
    source: source,
    className: 'canvas3d',
  };
  const result = createLayerTileOrWebGLTile(layerOptions);
  result.set('capabilitiesStyles', layerCap.Style);
  return result;
};

/**
 * @param {string} url URL template. Must include {x}, {y} or {-y}, and {z} placeholders.
 * A {?-?} template pattern, for example subdomain{a-f}.domain.com, may be used instead.
 * of defining each one separately in the urls option.
 * @param {string|Object} style a Mapbox Style object.
 * @param {string} layername the name of the url as identified in the style.
 * @param {string} projection The projection code.
 * @param {import('ol/tilegrid/TileGrid').default} tileGrid The tile grid to define the source with.
 * @param {number} [opt_minResolution] WMTS minimum resolution.
 * @param {number} [opt_maxResolution] WMTS maximum resolution.
 * @param {number} [opt_opacity] The opacity.
 * @returns {import('ol/layer/VectorTile').default<import('ol/source/VectorTile').default>} Vector
 * tile layer.
 */
LayerHelper.prototype.createBasicVectorTilesLayer = function (
  url,
  style,
  layername,
  projection,
  tileGrid,
  opt_minResolution,
  opt_maxResolution,
  opt_opacity
) {
  opt_maxResolution = this.fixResolution_(opt_maxResolution);
  const format = new olFormatMVT();
  const layer = new olLayerVectorTile({
    declutter: true,
    minResolution: opt_minResolution,
    maxResolution: opt_maxResolution,
    source: new olSourceVectorTile({
      format,
      projection,
      tileGrid,
      url,
    }),
  });
  // Create and apply the style function.
  olMapboxStyleStylefunction(layer, style, layername);
  // Set the opacity.
  if (opt_opacity !== undefined) {
    layer.setOpacity(opt_opacity);
  }
  return layer;
};

/**
 * Create and return an ol.layer.Group. You can pass a collection of layers to
 * directly add them in the returned group.
 *
 * @param {import('ol/Collection').default<import('ol/layer/Base').default>} [opt_layers] The layer to
 *    add to the returned Group.
 * @returns {import('ol/layer/Group').default} Layer group.
 */
LayerHelper.prototype.createBasicGroup = function (opt_layers) {
  const group = new olLayerGroup();
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
 *
 * @param {import('ol/Map').default} map A map.
 * @param {string} groupName The name of the group.
 * @returns {import('ol/layer/Group').default} The group corresponding to the given name.
 */
LayerHelper.prototype.getGroupFromMap = function (map, groupName) {
  const groups = map.getLayerGroup().getLayers();
  let group;
  groups.getArray().some((existingGroup) => {
    if (existingGroup.get(GROUP_KEY) === groupName) {
      group = /** @type {import('ol/layer/Group').default} */ (existingGroup);
      return true;
    } else {
      return false;
    }
  });
  if (!group) {
    group = this.createBasicGroup();
    group.set(GROUP_KEY, groupName);
    map.addLayer(group);
  }
  return group;
};

/**
 * Get an array of all layers in a group. The group can contain multiple levels
 * of others groups.
 *
 * @param {import('ol/layer/Base').default} layer The base layer, mostly a group of layers.
 * @returns {import('ol/layer/Layer').default<import('ol/source/Source').default>[]} Layers.
 */
LayerHelper.prototype.getFlatLayers = function (layer) {
  if (layer instanceof olLayerGroup) {
    const sublayers = /** @type {import('ol/layer/Layer').default<import('ol/source/Source').default>[]} */ (
      layer.getLayers().getArray()
    );
    const hasGroupLayer = sublayers.some((sublayer) => sublayer instanceof olLayerGroup);
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
 *
 * @param {import('ol/layer/Base').default} layer The base layer, mostly a group of layers.
 * @param {olLayerLayer<import('ol/source/Source').default>[]} array An array to add layers.
 * @param {number|undefined} computedOpacity Opacity inherited from ancestor layer groups.
 * @returns {olLayerLayer<import('ol/source/Source').default>[]} Layers.
 */
LayerHelper.prototype.getFlatLayers_ = function (layer, array, computedOpacity) {
  const opacity = layer.getOpacity();
  if (computedOpacity !== undefined) {
    computedOpacity *= opacity;
  } else {
    computedOpacity = opacity;
  }
  if (layer instanceof olLayerGroup) {
    const sublayers = layer.getLayers();
    sublayers.forEach((l) => {
      this.getFlatLayers_(l, array, computedOpacity);
    });
  } else if (layer instanceof olLayerLayer) {
    if (!array.includes(layer)) {
      layer.set('inheritedOpacity', computedOpacity, true);
      array.push(layer);
    }
  }
  return array;
};

/**
 * Get a layer that has the LAYER_NODE_NAME_KEY property equal to a given layer name from
 * an array of layers. If one of the layers in the array is a group, then the
 * layers contained in that group are searched as well.
 *
 * @param {string} nodeName The node name of the layer we're looking for.
 * @param {import("ol/layer/Base").default[]} layers Layers.
 * @returns {?import("ol/layer/Base").default} Layer.
 */
LayerHelper.prototype.getLayerByNodeName = function (nodeName, layers) {
  /** @type {?import("ol/layer/Base").default} */
  let found = null;
  layers.some((layer) => {
    if (layer.get(LAYER_NODE_NAME_KEY) === nodeName) {
      found = layer;
    } else if (layer instanceof olLayerGroup) {
      const sublayers = layer.getLayers().getArray();
      found = this.getLayerByNodeName(nodeName, sublayers);
    }
    return !!found;
  });

  return found;
};

/**
 * Get the WMTS legend URL for the given layer.
 *
 * @param {import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>} layer Tile layer as returned by the
 * ngeo layerHelper service.
 * @returns {string|undefined} The legend URL or undefined.
 */
LayerHelper.prototype.getWMTSLegendURL = function (layer) {
  // FIXME case of multiple styles ?  case of multiple legendUrl ?
  let url;
  const styles = layer.get('capabilitiesStyles');
  if (styles !== undefined) {
    const legendURL = styles[0].legendURL;
    if (legendURL !== undefined) {
      url = legendURL[0].href;
    }
  }
  return url;
};

/**
 * Get the WMS legend URL for the given node.
 *
 * @param {string|undefined} url The base url of the wms service.
 * @param {string} layerName The name of a wms layer.
 * @param {number} [opt_scale] A scale.
 * @param {string} [opt_legendRule] rule parameters to add to the returned URL.
 * @param {number} [opt_legendWidth] the legend width.
 * @param {number} [opt_legendHeight] the legend height.
 * @param {string} [opt_servertype] the OpenLayers server type.
 * @param {number} [opt_dpi] the DPI.
 * @param {number[]} [opt_bbox] the bbox.
 * @param {string} [opt_srs] The projection code.
 * @param {Object<string, string>} [opt_additionalQueryString] Additional query string parameters.
 * @returns {string|undefined} The legend URL or undefined.
 */
LayerHelper.prototype.getWMSLegendURL = function (
  url,
  layerName,
  opt_scale,
  opt_legendRule,
  opt_legendWidth,
  opt_legendHeight,
  opt_servertype,
  opt_dpi,
  opt_bbox,
  opt_srs,
  opt_additionalQueryString
) {
  if (!url) {
    return undefined;
  }
  /** @type {Object<string, string|boolean|number>} */
  const queryString = {
    FORMAT: 'image/png',
    TRANSPARENT: true,
    SERVICE: 'WMS',
    VERSION: '1.1.1',
    REQUEST: 'GetLegendGraphic',
    LAYER: layerName,
  };
  if (opt_scale !== undefined) {
    queryString.SCALE = opt_scale;
  }
  if (opt_legendRule !== undefined) {
    queryString.RULE = opt_legendRule;
    if (opt_legendWidth !== undefined) {
      queryString.WIDTH = opt_legendWidth;
    }
    if (opt_legendHeight !== undefined) {
      queryString.HEIGHT = opt_legendHeight;
    }
  }
  if (opt_servertype == 'qgis') {
    if (opt_dpi != undefined) {
      queryString.DPI = opt_dpi;
    }
    if (
      opt_bbox != undefined &&
      opt_srs != undefined &&
      opt_scale != undefined &&
      opt_dpi != undefined &&
      opt_legendRule == undefined
    ) {
      queryString.BBOX = opt_bbox.join(',');
      queryString.SRS = opt_srs;
      queryString.SRCWIDTH = Math.round(((opt_bbox[2] - opt_bbox[0]) / opt_scale) * 39.37 * opt_dpi);
      queryString.SRCHEIGHT = Math.round(((opt_bbox[3] - opt_bbox[1]) / opt_scale) * 39.37 * opt_dpi);
      delete queryString.SCALE; // QGIS calculate it from the BBOX the SRCWIDTH and the SRCHEIGHT.
    }
  }
  if (opt_additionalQueryString) {
    Object.assign(queryString, opt_additionalQueryString);
  }
  return olUriAppendParams(url, queryString);
};

/**
 * Returns if this layer is visible at the current resolution.
 *
 * @param {import('ol/layer/Base').default} layer Layer.
 * @param {import('ol/Map').default} map Map.
 * @returns {boolean} Is the layer currently visible?
 */
LayerHelper.prototype.isLayerVisible = function (layer, map) {
  if (!layer.getVisible()) {
    return false;
  }

  const currentResolution = map.getView().getResolution();
  if (currentResolution === undefined) {
    throw new Error('Missing resolution');
  }
  return currentResolution > layer.getMinResolution() && currentResolution < layer.getMaxResolution();
};

/**
 * Force a WMS layer to refresh using a random value.
 *
 * @param {import('ol/layer/Image').default<import('ol/source/Image').default>|import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>} layer Layer to refresh.
 */
LayerHelper.prototype.refreshWMSLayer = function (layer) {
  const source_ = layer.getSource();
  console.assert(source_ instanceof olSourceImageWMS || source_ instanceof olSourceTileWMS);
  const source = /** @type {import('ol/source/ImageWMS').default|import('ol/source/TileWMS').default} */ (
    source_
  );
  const params = source.getParams();
  params[REFRESH_PARAM] = Math.random();
  source.updateParams(params);
};

/**
 * Set ZIndex property to first level children elements
 *
 * @param {import('ol/layer/Group').default|import('ol/layer/Base').default} element The group of
 *    layer with first level children layers.
 * @param {number} ZIndex The ZIndex for children element.
 */
LayerHelper.prototype.setZIndexToFirstLevelChildren = function (element, ZIndex) {
  if (element instanceof olLayerGroup) {
    const innerGroupLayers = element.getLayers();
    innerGroupLayers.forEach((innerLayer) => innerLayer.setZIndex(ZIndex));
  }
};

/**
 * Update the LAYERS parameter of the source of the given WMS layer.
 *
 * @param {import('ol/layer/Image').default<import('ol/source/Image').default>} layer The WMS layer.
 * @param {string} names The names that will be used to set
 * the LAYERS parameter.
 * @param {string} [opt_time] The start
 * and optionally the end datetime (for time range selection) selected by user
 * in a ISO-8601 string datetime or time interval format
 */
LayerHelper.prototype.updateWMSLayerState = function (layer, names, opt_time) {
  // Don't send layer without parameters, hide layer instead;
  if (names.length <= 0) {
    layer.setVisible(false);
  } else {
    layer.setVisible(true);
    const source = layer.getSource();
    if (!(source instanceof olSourceImageWMS)) {
      throw new Error('Wrong source type');
    }
    if (opt_time) {
      source.updateParams({'LAYERS': names, 'TIME': opt_time});
    } else {
      source.updateParams({'LAYERS': names});
    }
  }
};

/**
 * @param {import('ol/layer/Image').default<import('ol/source/Image').default>} layer The WMS layer.
 * @returns {number[]|undefined} List of query source ids, a.k.a.
 *     the data source ids this layer is composed of.
 */
LayerHelper.prototype.getQuerySourceIds = function (layer) {
  return /** @type {number[]|undefined} */ (layer.get('querySourceIds'));
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoLayerHelper', []);
myModule.service('ngeoLayerHelper', LayerHelper);

export default myModule;
