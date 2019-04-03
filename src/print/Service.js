/**
 * @module ngeo.print.Service
 */
import googAsserts from 'goog/asserts.js';
import ngeoPrintVectorEncoder from 'ngeo/print/VectorEncoder.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import * as olArray from 'ol/array.js';
import * as olObj from 'ol/obj.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import * as olMath from 'ol/math.js';
import * as olSize from 'ol/size.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';

/**
 * Provides a function to create ngeo.print.Service objects used to
 * interact with MapFish Print v3 services.
 *
 * ngeo.print.Service objects expose the following methods:
 *
 * - createSpec: create a report specification object
 * - createReport: send a create report request
 * - getStatus: get the status of a report
 * - getReportUrl: get the URL of a report
 * - getCapabilities: get the capabilities of the server
 *
 *
 *     let printBaseUrl = 'http://example.com/print';
 *     let print = new ngeo.print.Service(printBaseUrl);
 *
 *     let scale = 5000;
 *     let dpi = 72;
 *     let layout = 'A4 portrait';
 *     let format = 'pdf';
 *     let reportSpec = print.createSpec(map, scale, dpi, layout, format, {
 *       'title': 'A title for my report',
 *       'rotation': 45 // degree
 *     });
 *
 * See our live example: [../examples/mapfishprint.html](../examples/mapfishprint.html)
 *
 * TODO and limitations:
 *
 * - createSpec should also accept a bbox instead of a center and a scale.
 * - Add support for ol.style.RegularShape. MapFish Print supports symbols
 *   like crosses, stars and squares, so printing regular shapes should be
 *   possible.
 * - ol.style.Icon may use a sprite image, and offsets to define to rectangle
 *   to use within the sprite. This type of icons won't be printed correctly
 *   as MapFish Print does not support sprite icons.
 *
 * @constructor
 * @struct
 * @param {string} url URL to MapFish print web service.
 * @param {angular.$http} $http Angular $http service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper service.
 */
const exports = function(url, $http, gettextCatalog, ngeoLayerHelper) {
  /**
   * @type {string}
   * @private
   */
  this.url_ = url;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {ngeo.map.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.print.VectorEncoder}
   * @protected
   */
  this.vectorEncoder = new ngeoPrintVectorEncoder();

  /**
   * @type {boolean}
   * @private
   */
  this.printNativeAngle_ = true;
};


/**
 * Cancel a report.
 * @param {string} ref Print report reference.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.cancel = function(ref, opt_httpConfig) {
  const httpConfig = opt_httpConfig !== undefined ? opt_httpConfig :
    /** @type {angular.$http.Config} */ ({});
  const url = `${this.url_}/cancel/${ref}`;
  // "delete" is a reserved word, so use ['delete']
  return this.$http_['delete'](url, httpConfig);
};


/**
 * Create a report specification.
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {number} dpi DPI.
 * @param {string} layout Layout.
 * @param {string} format Formats.
 * @param {Object.<string, *>} customAttributes Custom attributes.
 * @return {MapFishPrintSpec} The print spec.
 * @export
 */
exports.prototype.createSpec = function(
  map, scale, dpi, layout, format, customAttributes) {

  const specMap = /** @type {MapFishPrintMap} */ ({
    dpi: dpi,
    rotation: /** number */ (customAttributes['rotation'])
  });

  this.encodeMap_(map, scale, specMap);

  const attributes = /** @type {!MapFishPrintAttributes} */ ({
    map: specMap
  });
  olObj.assign(attributes, customAttributes);

  const lang = this.gettextCatalog_.currentLanguage;

  const spec = /** @type {MapFishPrintSpec} */ ({
    attributes,
    format,
    lang,
    layout
  });

  return spec;
};


/**
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {MapFishPrintMap} object Object.
 * @private
 */
exports.prototype.encodeMap_ = function(map, scale, object) {
  const view = map.getView();
  const viewCenter = view.getCenter();
  const viewProjection = view.getProjection();
  const viewResolution = view.getResolution();
  const viewRotation = object.rotation || olMath.toDegrees(view.getRotation());

  googAsserts.assert(viewCenter !== undefined);
  googAsserts.assert(viewProjection !== undefined);

  object.center = viewCenter;
  object.projection = viewProjection.getCode();
  object.rotation = viewRotation;
  object.scale = scale;
  object.layers = [];

  const mapLayerGroup = map.getLayerGroup();
  googAsserts.assert(mapLayerGroup);
  this.printNativeAngle_ = !(mapLayerGroup.get('printNativeAngle') === false);
  let layers = this.ngeoLayerHelper_.getFlatLayers(mapLayerGroup);

  // Sort the layer by ZIndex
  olArray.stableSort(layers, (layer_a, layer_b) => layer_a.getZIndex() - layer_b.getZIndex());
  layers = layers.slice().reverse();

  layers.forEach((layer) => {
    if (layer.getVisible()) {
      googAsserts.assert(viewResolution !== undefined);
      this.encodeLayer(object.layers, layer, viewResolution);
    }
  });
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Base} layer Layer.
 * @param {number} resolution Resolution.
 */
exports.prototype.encodeLayer = function(arr, layer, resolution) {
  if (layer instanceof olLayerImage) {
    this.encodeImageLayer_(arr, layer);
  } else if (layer instanceof olLayerTile) {
    this.encodeTileLayer_(arr, layer);
  } else if (layer instanceof olLayerVector) {
    this.encodeVectorLayer(arr, layer, resolution);
  }
};

/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Vector} layer Layer.
 * @param {number} resolution Resolution.
 */
exports.prototype.encodeVectorLayer = function(arr, layer, resolution) {
  this.vectorEncoder.encodeVectorLayer(arr, layer, resolution);
};

/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
exports.prototype.encodeImageLayer_ = function(arr, layer) {
  googAsserts.assertInstanceof(layer, olLayerImage);
  const source = layer.getSource();
  if (source instanceof olSourceImageWMS) {
    this.encodeImageWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
exports.prototype.encodeImageWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  googAsserts.assertInstanceof(layer, olLayerImage);
  googAsserts.assertInstanceof(source, olSourceImageWMS);

  const url = source.getUrl();
  if (url !== undefined) {
    this.encodeWmsLayer_(
      arr, layer, url, source.getParams());
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer The layer.
 * @param {string} url Url of the WMS server.
 * @param {Object} params Url parameters
 * @private
 */
exports.prototype.encodeWmsLayer_ = function(arr, layer, url, params) {
  if (url.startsWith('//')) {
    url = window.location.protocol  + url;
  }
  const url_url = new URL(url);
  const customParams = {'TRANSPARENT': true};
  if (url_url.searchParams) {
    /** @type {Object} */ (url_url.searchParams).forEach((value, key) => {
      customParams[key] = value;
    });
  }
  for (const key in params) {
    const value = params[key];
    // remove empty params
    if (value !== null && value !== undefined) {
      customParams[key] = value;
    }
  }
  delete customParams['LAYERS'];
  delete customParams['FORMAT'];
  delete customParams['SERVERTYPE'];
  delete customParams['VERSION'];

  const object = /** @type {MapFishPrintWmsLayer} */ ({
    baseURL: exports.getAbsoluteUrl_(url_url.origin + url_url.pathname),
    imageFormat: 'FORMAT' in params ? params['FORMAT'] : 'image/png',
    layers: params['LAYERS'].split(','),
    customParams: customParams,
    serverType: params['SERVERTYPE'],
    type: 'wms',
    opacity: this.getOpacityOrInherited_(layer),
    version: params['VERSION'],
    useNativeAngle: this.printNativeAngle_,
  });
  arr.push(object);
};


/**
 * @param {string} url URL.
 * @return {string} Absolute URL.
 * @private
 */
exports.getAbsoluteUrl_ = function(url) {
  const a = document.createElement('a');
  a.href = encodeURI(url);
  return decodeURI(a.href);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileLayer_ = function(arr, layer) {
  googAsserts.assertInstanceof(layer, olLayerTile);
  const source = layer.getSource();
  if (source instanceof olSourceWMTS) {
    this.encodeTileWmtsLayer_(arr, layer);
  } else if (source instanceof olSourceTileWMS) {
    this.encodeTileWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileWmtsLayer_ = function(arr, layer) {
  googAsserts.assertInstanceof(layer, olLayerTile);
  const source = layer.getSource();
  googAsserts.assertInstanceof(source, olSourceWMTS);

  const projection = source.getProjection();
  const tileGrid = source.getTileGrid();
  googAsserts.assertInstanceof(tileGrid, olTilegridWMTS);
  const matrixIds = tileGrid.getMatrixIds();

  /** @type {Array.<MapFishPrintWmtsMatrix>} */
  const matrices = [];

  for (let i = 0, ii = matrixIds.length; i < ii; ++i) {
    const tileRange = tileGrid.getFullTileRange(i);
    matrices.push(/** @type {MapFishPrintWmtsMatrix} */ ({
      identifier: matrixIds[i],
      scaleDenominator: tileGrid.getResolution(i) *
          projection.getMetersPerUnit() / 0.28E-3,
      tileSize: olSize.toSize(tileGrid.getTileSize(i)),
      topLeftCorner: tileGrid.getOrigin(i),
      matrixSize: [
        tileRange.maxX - tileRange.minX,
        tileRange.maxY - tileRange.minY
      ]
    }));
  }

  const dimensions = source.getDimensions();
  const dimensionKeys = Object.keys(dimensions);

  const object = /** @type {MapFishPrintWmtsLayer} */ ({
    baseURL: this.getWmtsUrl_(source),
    dimensions: dimensionKeys,
    dimensionParams: dimensions,
    imageFormat: source.getFormat(),
    layer: source.getLayer(),
    matrices: matrices,
    matrixSet: source.getMatrixSet(),
    opacity: this.getOpacityOrInherited_(layer),
    requestEncoding: source.getRequestEncoding(),
    style: source.getStyle(),
    type: 'WMTS',
    version: source.getVersion()
  });

  arr.push(object);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  googAsserts.assertInstanceof(layer, olLayerTile);
  googAsserts.assertInstanceof(source, olSourceTileWMS);

  this.encodeWmsLayer_(
    arr, layer, source.getUrls()[0], source.getParams());
};


/**
 * Return the WMTS URL to use in the print spec.
 * @param {ol.source.WMTS} source The WMTS source.
 * @return {string} URL.
 * @private
 */
exports.prototype.getWmtsUrl_ = function(source) {
  const urls = source.getUrls();
  googAsserts.assert(urls.length > 0);
  return exports.getAbsoluteUrl_(urls[0]);
};

/**
 * Return an opacity value for the specified layer.
 * @param {ol.layer.Base} layer Layer.
 * @returns {number} opacity Opacity value.
 * @private
 */
exports.prototype.getOpacityOrInherited_ = function(layer) {
  if (layer.get('inheritedOpacity') !== undefined) {
    return layer.get('inheritedOpacity');
  }
  return layer.getOpacity();
};

/**
 * Send a create report request to the MapFish Print service.
 * @param {MapFishPrintSpec} printSpec Print specification.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.createReport = function(printSpec, opt_httpConfig) {
  const format = printSpec.format || 'pdf';
  const url = `${this.url_}/report.${format}`;
  const httpConfig = /** @type {!angular.$http.Config} */ ({
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  olObj.assign(httpConfig,
    opt_httpConfig !== undefined ? opt_httpConfig : {});
  return this.$http_.post(url, printSpec, httpConfig);
};


/**
 * Get the status of a report.
 * @param {string} ref Print report reference.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.getStatus = function(ref, opt_httpConfig) {
  const httpConfig = opt_httpConfig !== undefined ? opt_httpConfig :
    /** @type {angular.$http.Config} */ ({});
  const url = `${this.url_}/status/${ref}.json`;
  return this.$http_.get(url, httpConfig);
};


/**
 * Get the URL of a report.
 * @param {string} ref Print report reference.
 * @return {string} The report URL for this ref.
 * @export
 */
exports.prototype.getReportUrl = function(ref) {
  return `${this.url_}/report/${ref}`;
};


/**
 * Get the print capabilities from MapFish Print.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 */
exports.prototype.getCapabilities = function(opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined ? opt_httpConfig : /** @type {angular.$http.Config} */ ({
      withCredentials: true
    });
  const url = `${this.url_}/capabilities.json`;
  return this.$http_.get(url, httpConfig);
};


/**
 * @param {angular.$http} $http Angular $http service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @return {ngeox.CreatePrint} The function to create a print service.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoCreatePrint
 */
exports.createPrintServiceFactory = function($http, gettextCatalog, ngeoLayerHelper) {
  return (
    /**
     * @param {string} url URL to MapFish print service.
     */
    function(url) {
      return new exports(url, $http, gettextCatalog, ngeoLayerHelper);
    }
  );
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoPrint', [
  ngeoMapLayerHelper.module.name
]);
exports.module.service('ngeoPrintService', exports);
exports.module.factory('ngeoCreatePrint', exports.createPrintServiceFactory);


export default exports;
