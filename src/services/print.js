/**
 * @fileoverview Provides a function to create ngeo.Print objects used to
 * interact with MapFish Print v3 services.
 *
 * ngeo.Print objects expose the following methods:
 *
 * - createSpec: create a report specification object
 * - createReport: send a create report request
 * - getStatus: get the status of a report
 * - getReportUrl: get the URL of a report
 *
 * Example:
 *
 * var printBaseUrl = 'http://example.com/print';
 * var print = new ngeo.Print(printBaseUrl);
 *
 * var scale = 5000;
 * var dpi = 72;
 * var layout = 'A4 portrait';
 * var reportSpec = print.createSpec(map, scale, dpi, layout,
 *     {'title': 'A title for my report'});
 *
 * TODO:
 *
 * - Add getCapabilities method
 * - createSpec should also accept a bbox instead of a center and a scale
 */

goog.provide('ngeo.CreatePrint');
goog.provide('ngeo.Print');

goog.require('goog.object');
goog.require('ngeo');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.size');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');


/**
 * @typedef {function(string):!ngeo.Print}
 */
ngeo.CreatePrint;



/**
 * @constructor
 * @param {string} url URL to MapFish print web service.
 * @param {angular.$http} $http Angular $http service.
 */
ngeo.Print = function(url, $http) {
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
};


/**
 * Create a report specification.
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {number} dpi DPI.
 * @param {string} layout Layout.
 * @param {Object.<string, *>} customAttributes Custom attributes.
 * @return {MapFishPrintSpec} The print spec.
 */
ngeo.Print.prototype.createSpec = function(
    map, scale, dpi, layout, customAttributes) {

  var specMap = /** @type {MapFishPrintMap} */ ({
    dpi: dpi
  });

  this.encodeMap_(map, scale, specMap);

  var attributes = /** @type {MapFishPrintAttributes} */ ({
    map: specMap
  });
  goog.object.extend(attributes, customAttributes);

  var spec = /** @type {MapFishPrintSpec} */ ({
    attributes: attributes,
    layout: layout
  });

  return spec;
};


/**
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {MapFishPrintMap} object Object.
 * @private
 */
ngeo.Print.prototype.encodeMap_ = function(map, scale, object) {
  var view = map.getView();
  var viewCenter = view.getCenter();
  var viewProjection = view.getProjection();

  goog.asserts.assert(goog.isDef(viewCenter));
  goog.asserts.assert(goog.isDef(viewProjection));

  object.center = viewCenter;
  object.projection = viewProjection.getCode();
  object.scale = scale;
  object.layers = [];

  var layersCollection = map.getLayers();
  goog.asserts.assert(!goog.isNull(layersCollection));
  var layers = layersCollection.getArray().slice().reverse();

  goog.array.forEach(layers,
      /**
       * @param {ol.layer.Layer} layer Layer.
       * @param {number} idx Index.
       * @param {Array.<ol.layer.Layer>} layers Layers.
       */
      function(layer, idx, layers) {
        this.encodeLayer_(object.layers, layer);
      }, this);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
ngeo.Print.prototype.encodeLayer_ = function(arr, layer) {
  if (layer instanceof ol.layer.Image) {
    this.encodeImageLayer_(arr, layer);
  } else if (layer instanceof ol.layer.Tile) {
    this.encodeTileLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
ngeo.Print.prototype.encodeImageLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Image);
  var source = layer.getSource();
  if (source instanceof ol.source.ImageWMS) {
    this.encodeImageWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
ngeo.Print.prototype.encodeImageWmsLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Image);
  var source = layer.getSource();
  goog.asserts.assertInstanceof(source, ol.source.ImageWMS);
  var url = source.getUrl();
  var params = source.getParams();
  var object = /** @type {MapFishPrintWmsLayer} */ ({
    baseURL: url,
    imageFormat: 'FORMAT' in params ? params['FORMAT'] : 'image/png',
    layers: params['LAYERS'].split(','),
    type: 'wms'
  });
  arr.push(object);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
ngeo.Print.prototype.encodeTileLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Tile);
  var source = layer.getSource();
  if (source instanceof ol.source.WMTS) {
    this.encodeTileWmtsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
ngeo.Print.prototype.encodeTileWmtsLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Tile);
  var source = layer.getSource();
  goog.asserts.assertInstanceof(source, ol.source.WMTS);

  var projection = source.getProjection();
  var tileGrid = source.getTileGrid();
  goog.asserts.assertInstanceof(tileGrid, ol.tilegrid.WMTS);
  var matrixIds = tileGrid.getMatrixIds();

  // FIXME:
  // matrixSize assumes a regular grid

  /** @type {Array.<MapFishPrintWmtsMatrix>} */
  var matrices = [];

  for (var i = 0, ii = matrixIds.length; i < ii; ++i) {
    var sqrZ = Math.pow(2, i);
    matrices.push(/** @type {MapFishPrintWmtsMatrix} */ ({
      identifier: matrixIds[i],
      scaleDenominator: tileGrid.getResolution(i) *
          projection.getMetersPerUnit() / 0.28E-3,
      tileSize: ol.size.toSize(tileGrid.getTileSize(i)),
      topLeftCorner: tileGrid.getOrigin(i),
      matrixSize: [sqrZ, sqrZ]
    }));
  }

  var dimensions = source.getDimensions();
  var dimensionKeys = goog.object.getKeys(dimensions);

  var object = /** @type {MapFishPrintWmtsLayer} */ ({
    baseURL: this.getWmtsUrl_(source),
    dimensions: dimensionKeys,
    dimensionParams: dimensions,
    imageFormat: source.getFormat(),
    layer: source.getLayer(),
    matrices: matrices,
    matrixSet: source.getMatrixSet(),
    requestEncoding: /** @type {string} */ (source.getRequestEncoding()),
    style: source.getStyle(),
    type: 'WMTS',
    version: source.getVersion()
  });

  arr.push(object);
};


/**
 * Return the WMTS URL to use in the print spec.
 * @param {ol.source.WMTS} source The WMTS source.
 * @return {string} URL.
 * @private
 */
ngeo.Print.prototype.getWmtsUrl_ = function(source) {
  var urls = source.getUrls();
  goog.asserts.assert(urls.length > 0);
  var url = urls[0];
  // Replace {Layer} in the URL
  // See <https://github.com/mapfish/mapfish-print/issues/236>
  var layer = source.getLayer();
  if (url.indexOf('{Layer}') >= 0) {
    url = url.replace('{Layer}', layer);
  }
  return url;
};


/**
 * Send a create report request to the MapFish Print service.
 * @param {MapFishPrintSpec} printSpec Print specification.
 * @return {angular.$q.Promise} Promise.
 */
ngeo.Print.prototype.createReport = function(printSpec) {
  var url = this.url_ + '/report.pdf';
  var promise = this.$http_.post(url, printSpec, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  return promise.then(
      /**
       * @param {!angular.$http.Response} resp Response.
       * @return {MapFishPrintReportResponse} MapFish Print report response.
       */
      function(resp) {
        return /** @type {MapFishPrintReportResponse} */ (resp.data);
      },
      /**
       * @param {!angular.$http.Response} resp Response.
       * @return {!angular.$http.Response} Response.
       */
      function(resp) {
        return resp;
      });
};


/**
 * Get the status of a report.
 * @param {string} ref Print report reference.
 * @return {angular.$q.Promise} Promise.
 */
ngeo.Print.prototype.getStatus = function(ref) {
  var url = this.url_ + '/status/' + ref + '.json';
  var promise = this.$http_.get(url);
  return promise.then(
      /**
       * @param {!angular.$http.Response} resp Response.
       * @return {MapFishPrintStatusResponse} MapFish Print status response.
       */
      function(resp) {
        return /** @type {MapFishPrintStatusResponse} */ (resp.data);
      },
      /**
       * @param {!angular.$http.Response} resp Response.
       * @return {!angular.$http.Response} Response.
       */
      function(resp) {
        return resp;
      });
};


/**
 * Get the URL of a report.
 * @param {string} ref Print report reference.
 * @return {string} The report URL for this ref.
 */
ngeo.Print.prototype.getReportUrl = function(ref) {
  return this.url_ + '/report/' + ref;
};


/**
 * @param {angular.$http} $http Angular $http service.
 * @return {ngeo.CreatePrint} The function to create a print service.
 * @ngInject
 */
ngeo.createPrintServiceFactory = function($http) {
  return (
      /**
       * @param {string} url URL to MapFish print service.
       */
      function(url) {
        return new ngeo.Print(url, $http);
      });
};


ngeoModule.factory('ngeoCreatePrint', ngeo.createPrintServiceFactory);
