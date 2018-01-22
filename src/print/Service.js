goog.provide('ngeo.print.Service');

goog.require('ngeo');
goog.require('ngeo.print.VectorEncoder');
goog.require('ngeo.map.LayerHelper');
goog.require('ol');
goog.require('ol.obj');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.math');
goog.require('ol.size');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');


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
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper service.
 */
ngeo.print.Service = function(url, $http, ngeoLayerHelper) {
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
   * @type {ngeo.map.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.print.VectorEncoder}
   * @private
   */
  this.vectorEncoder_ = new ngeo.print.VectorEncoder();
};


/**
 * Cancel a report.
 * @param {string} ref Print report reference.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
ngeo.print.Service.prototype.cancel = function(ref, opt_httpConfig) {
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
ngeo.print.Service.prototype.createSpec = function(
  map, scale, dpi, layout, format, customAttributes) {

  const specMap = /** @type {MapFishPrintMap} */ ({
    dpi: dpi,
    rotation: /** number */ (customAttributes['rotation'])
  });

  this.encodeMap_(map, scale, specMap);

  const attributes = /** @type {!MapFishPrintAttributes} */ ({
    map: specMap
  });
  ol.obj.assign(attributes, customAttributes);

  const spec = /** @type {MapFishPrintSpec} */ ({
    attributes,
    format,
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
ngeo.print.Service.prototype.encodeMap_ = function(map, scale, object) {
  const view = map.getView();
  const viewCenter = view.getCenter();
  const viewProjection = view.getProjection();
  const viewResolution = view.getResolution();
  const viewRotation = object.rotation || ol.math.toDegrees(view.getRotation());

  goog.asserts.assert(viewCenter !== undefined);
  goog.asserts.assert(viewProjection !== undefined);

  object.center = viewCenter;
  object.projection = viewProjection.getCode();
  object.rotation = viewRotation;
  object.scale = scale;
  object.layers = [];

  const mapLayerGroup = map.getLayerGroup();
  goog.asserts.assert(mapLayerGroup !== null);
  let layers = this.ngeoLayerHelper_.getFlatLayers(mapLayerGroup);
  layers = layers.slice().reverse();

  layers.forEach((layer) => {
    if (layer.getVisible()) {
      goog.asserts.assert(viewResolution !== undefined);
      this.encodeLayer(object.layers, layer, viewResolution);
    }
  });
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Base} layer Layer.
 * @param {number} resolution Resolution.
 */
ngeo.print.Service.prototype.encodeLayer = function(arr, layer, resolution) {
  if (layer instanceof ol.layer.Image) {
    this.encodeImageLayer_(arr, layer);
  } else if (layer instanceof ol.layer.Tile) {
    this.encodeTileLayer_(arr, layer);
  } else if (layer instanceof ol.layer.Vector) {
    this.vectorEncoder_.encodeVectorLayer(arr, layer, resolution);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
ngeo.print.Service.prototype.encodeImageLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Image);
  const source = layer.getSource();
  if (source instanceof ol.source.ImageWMS) {
    this.encodeImageWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
ngeo.print.Service.prototype.encodeImageWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  goog.asserts.assertInstanceof(layer, ol.layer.Image);
  goog.asserts.assertInstanceof(source, ol.source.ImageWMS);

  const url = source.getUrl();
  if (url !== undefined) {
    this.encodeWmsLayer_(
      arr, layer.getOpacity(), url, source.getParams());
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {number} opacity Opacity of the layer.
 * @param {string} url Url of the WMS server.
 * @param {Object} params Url parameters
 * @private
 */
ngeo.print.Service.prototype.encodeWmsLayer_ = function(arr, opacity, url, params) {
  if (url.startsWith('//')) {
    url = window.location.protocol  + url;
  }
  const url_url = new URL(url);
  const customParams = {'TRANSPARENT': true};
  if (url_url.searchParams) {
    for (const element of url_url.searchParams) {
      customParams[element[0]] = element[1];
    }
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
    baseURL: ngeo.print.Service.getAbsoluteUrl_(url_url.origin + url_url.pathname),
    imageFormat: 'FORMAT' in params ? params['FORMAT'] : 'image/png',
    layers: params['LAYERS'].split(','),
    customParams: customParams,
    serverType: params['SERVERTYPE'],
    type: 'wms',
    opacity: opacity,
    version: params['VERSION']
  });
  arr.push(object);
};


/**
 * @param {string} url URL.
 * @return {string} Absolute URL.
 * @private
 */
ngeo.print.Service.getAbsoluteUrl_ = function(url) {
  const a = document.createElement('a');
  a.href = encodeURI(url);
  return decodeURI(a.href);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
ngeo.print.Service.prototype.encodeTileLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Tile);
  const source = layer.getSource();
  if (source instanceof ol.source.WMTS) {
    this.encodeTileWmtsLayer_(arr, layer);
  } else if (source instanceof ol.source.TileWMS) {
    this.encodeTileWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
ngeo.print.Service.prototype.encodeTileWmtsLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Tile);
  const source = layer.getSource();
  goog.asserts.assertInstanceof(source, ol.source.WMTS);

  const projection = source.getProjection();
  const tileGrid = source.getTileGrid();
  goog.asserts.assertInstanceof(tileGrid, ol.tilegrid.WMTS);
  const matrixIds = tileGrid.getMatrixIds();

  /** @type {Array.<MapFishPrintWmtsMatrix>} */
  const matrices = [];

  for (let i = 0, ii = matrixIds.length; i < ii; ++i) {
    const tileRange = tileGrid.getFullTileRange(i);
    matrices.push(/** @type {MapFishPrintWmtsMatrix} */ ({
      identifier: matrixIds[i],
      scaleDenominator: tileGrid.getResolution(i) *
          projection.getMetersPerUnit() / 0.28E-3,
      tileSize: ol.size.toSize(tileGrid.getTileSize(i)),
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
    opacity: layer.getOpacity(),
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
ngeo.print.Service.prototype.encodeTileWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  goog.asserts.assertInstanceof(layer, ol.layer.Tile);
  goog.asserts.assertInstanceof(source, ol.source.TileWMS);

  this.encodeWmsLayer_(
    arr, layer.getOpacity(), source.getUrls()[0], source.getParams());
};


/**
 * Return the WMTS URL to use in the print spec.
 * @param {ol.source.WMTS} source The WMTS source.
 * @return {string} URL.
 * @private
 */
ngeo.print.Service.prototype.getWmtsUrl_ = function(source) {
  const urls = source.getUrls();
  goog.asserts.assert(urls.length > 0);
  return ngeo.print.Service.getAbsoluteUrl_(urls[0]);
};


/**
 * Send a create report request to the MapFish Print service.
 * @param {MapFishPrintSpec} printSpec Print specification.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
ngeo.print.Service.prototype.createReport = function(printSpec, opt_httpConfig) {
  const format = printSpec.format || 'pdf';
  const url = `${this.url_}/report.${format}`;
  const httpConfig = /** @type {!angular.$http.Config} */ ({
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  ol.obj.assign(httpConfig,
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
ngeo.print.Service.prototype.getStatus = function(ref, opt_httpConfig) {
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
ngeo.print.Service.prototype.getReportUrl = function(ref) {
  return `${this.url_}/report/${ref}`;
};


/**
 * Get the print capabilities from MapFish Print.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 */
ngeo.print.Service.prototype.getCapabilities = function(opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined ? opt_httpConfig : /** @type {angular.$http.Config} */ ({
      withCredentials: true
    });
  const url = `${this.url_}/capabilities.json`;
  return this.$http_.get(url, httpConfig);
};


/**
 * @param {angular.$http} $http Angular $http service.
 * @param {ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @return {ngeox.CreatePrint} The function to create a print service.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoCreatePrint
 */
ngeo.print.Service.createPrintServiceFactory = function($http, ngeoLayerHelper) {
  return (
    /**
     * @param {string} url URL to MapFish print service.
     */
    function(url) {
      return new ngeo.print.Service(url, $http, ngeoLayerHelper);
    });
};

/**
 * @type {!angular.Module}
 */
ngeo.print.Service.module = angular.module('ngeoPrint', [
  ngeo.map.LayerHelper.module.name
]);
ngeo.print.Service.module.service('ngeoPrintService', ngeo.print.Service);
ngeo.print.Service.module.factory('ngeoCreatePrint', ngeo.print.Service.createPrintServiceFactory);
ngeo.module.requires.push(ngeo.print.Service.module.name);
