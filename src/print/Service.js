import angular from 'angular';
import ngeoPrintVectorEncoder from 'ngeo/print/VectorEncoder.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import {stableSort} from 'ol/array.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import {toDegrees} from 'ol/math.js';
import * as olSize from 'ol/size.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';

/**
 * @typedef {function(string):!PrintService} CreatePrint
 */

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
 * @param {string} url URL to MapFish print web service.
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper service.
 * @hidden
 */
export function PrintService(url, $http, gettextCatalog, ngeoLayerHelper) {
  /**
   * @type {string}
   * @private
   */
  this.url_ = url;

  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {!angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {import("ngeo/print/VectorEncoder.js").default}
   * @protected
   */
  this.vectorEncoder = new ngeoPrintVectorEncoder();

  /**
   * @type {boolean}
   * @private
   */
  this.printNativeAngle_ = true;

  /**
   * @type {number}
   * @private
   */
  this.goodnessOfFit_;
}

/**
 * Cancel a report.
 * @param {string} ref Print report reference.
 * @param {angular.IRequestShortcutConfig=} opt_httpConfig $http config object.
 * @return {angular.IHttpPromise<Object>} HTTP promise.
 */
PrintService.prototype.cancel = function (ref, opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined ? opt_httpConfig : /** @type {angular.IRequestShortcutConfig} */ ({});
  const url = `${this.url_}/cancel/${ref}`;
  // "delete" is a reserved word, so use ['delete']
  return this.$http_['delete'](url, httpConfig);
};

/**
 * Create a report specification.
 * @param {import("ol/Map.js").default} map Map.
 * @param {number} scale Scale.
 * @param {number} dpi DPI.
 * @param {string} layout Layout.
 * @param {string} format Formats.
 * @param {Object.<string, *>} customAttributes Custom attributes.
 * @param {string=} email Email to send the file to.
 * @param {number=} goodnessOfFit Goodness of fit.
 * @return {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSpec} The print spec.
 */
PrintService.prototype.createSpec = function (
  map,
  scale,
  dpi,
  layout,
  format,
  customAttributes,
  email,
  goodnessOfFit
) {
  const specMap = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintMap} */ ({
    dpi: dpi,
    rotation: /** number */ customAttributes['rotation'],
  });

  if (goodnessOfFit) {
    this.goodnessOfFit_ = goodnessOfFit;
  }

  this.encodeMap_(map, scale, specMap);

  /** @type {!import('ngeo/print/mapfish-print-v3.js').MapFishPrintAttributes} */
  const attributes = {
    map: specMap,
  };
  Object.assign(attributes, customAttributes);

  const lang = this.gettextCatalog_.getCurrentLanguage();

  /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSpec} */
  const spec = {
    attributes,
    format,
    lang,
    layout,
  };

  if (email) {
    spec.smtp = {to: email};
  }

  return spec;
};

/**
 * @param {import("ol/Map.js").default} map Map.
 * @param {number} scale Scale.
 * @param {import('ngeo/print/mapfish-print-v3.js').MapFishPrintMap} object Object.
 * @private
 */
PrintService.prototype.encodeMap_ = function (map, scale, object) {
  const view = map.getView();
  const viewCenter = view.getCenter();
  const viewProjection = view.getProjection();
  const viewResolution = view.getResolution();
  const viewRotation = object.rotation || toDegrees(view.getRotation());

  console.assert(viewCenter !== undefined);
  console.assert(viewProjection !== undefined);

  object.center = viewCenter;
  object.projection = viewProjection.getCode();
  object.rotation = viewRotation;
  object.scale = scale;
  object.useNearestScale = false;
  object.layers = [];

  const mapLayerGroup = map.getLayerGroup();
  console.assert(mapLayerGroup);
  this.printNativeAngle_ = !(mapLayerGroup.get('printNativeAngle') === false);
  let layers = this.ngeoLayerHelper_.getFlatLayers(mapLayerGroup);

  // Sort the layer by ZIndex
  stableSort(layers, (layer_a, layer_b) => (layer_a.getZIndex() || 0) - (layer_b.getZIndex() || 0));
  layers = layers.slice().reverse();

  layers.forEach((layer) => {
    if (layer.getVisible()) {
      console.assert(viewResolution !== undefined);
      this.encodeLayer(object.layers, layer, viewResolution);
    }
  });
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @param {number} resolution Resolution.
 */
PrintService.prototype.encodeLayer = function (arr, layer, resolution) {
  if (layer instanceof olLayerImage) {
    this.encodeImageLayer_(arr, layer);
  } else if (layer instanceof olLayerTile) {
    this.encodeTileLayer_(arr, layer);
  } else if (layer instanceof olLayerVector) {
    this.encodeVectorLayer(arr, layer, resolution);
  }
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {olLayerVector} layer Layer.
 * @param {number} resolution Resolution.
 */
PrintService.prototype.encodeVectorLayer = function (arr, layer, resolution) {
  this.vectorEncoder.encodeVectorLayer(arr, layer, resolution, this.goodnessOfFit_);
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Image.js").default} layer Layer.
 * @private
 */
PrintService.prototype.encodeImageLayer_ = function (arr, layer) {
  console.assert(layer instanceof olLayerImage);
  const source = layer.getSource();
  if (source instanceof olSourceImageWMS) {
    this.encodeImageWmsLayer_(arr, layer);
  }
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Image.js").default} layer Layer.
 * @private
 */
PrintService.prototype.encodeImageWmsLayer_ = function (arr, layer) {
  const source = /** @type {olSourceImageWMS} */ (layer.getSource());

  console.assert(layer instanceof olLayerImage);
  console.assert(source instanceof olSourceImageWMS);

  const url = source.getUrl();
  if (url !== undefined) {
    this.encodeWmsLayer_(arr, layer, url, source.getParams());
  }
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Image.js").default} layer The layer.
 * @param {string} url Url of the WMS server.
 * @param {Object} params Url parameters
 * @private
 */
PrintService.prototype.encodeWmsLayer_ = function (arr, layer, url, params) {
  if (url.startsWith('//')) {
    url = window.location.protocol + url;
  }
  const url_url = new URL(url);
  const customParams = {'TRANSPARENT': 'true'};
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
  delete customParams['STYLES'];

  /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintWmsLayer} */
  const object = {
    baseURL: getAbsoluteUrl_(url_url.origin + url_url.pathname),
    imageFormat: 'FORMAT' in params ? params['FORMAT'] : 'image/png',
    layers: params['LAYERS'].split(','),
    customParams: customParams,
    serverType: params['SERVERTYPE'],
    type: 'wms',
    opacity: this.getOpacityOrInherited_(layer),
    version: params['VERSION'],
    useNativeAngle: this.printNativeAngle_,
    styles: params['STYLES'] ? params['STYLES'].split(',') : [''],
  };
  arr.push(object);
};

/**
 * @param {string} url URL.
 * @return {string} Absolute URL.
 * @private
 * @hidden
 */
function getAbsoluteUrl_(url) {
  const a = document.createElement('a');
  a.href = encodeURI(url);
  return decodeURI(a.href);
}

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Tile.js").default} layer Layer.
 * @private
 */
PrintService.prototype.encodeTileLayer_ = function (arr, layer) {
  console.assert(layer instanceof olLayerTile);
  const source = layer.getSource();
  if (source instanceof olSourceWMTS) {
    this.encodeTileWmtsLayer_(arr, layer);
  } else if (source instanceof olSourceTileWMS) {
    this.encodeTileWmsLayer_(arr, layer);
  }
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Tile.js").default} layer Layer.
 * @private
 */
PrintService.prototype.encodeTileWmtsLayer_ = function (arr, layer) {
  console.assert(layer instanceof olLayerTile);
  const source = /** @type {olSourceWMTS} */ (layer.getSource());
  console.assert(source instanceof olSourceWMTS);

  const projection = source.getProjection();
  const tileGrid = /** @type {olTilegridWMTS} */ (source.getTileGrid());
  console.assert(tileGrid instanceof olTilegridWMTS);
  const matrixIds = tileGrid.getMatrixIds();

  /** @type {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintWmtsMatrix>} */
  const matrices = [];

  for (let i = 0, ii = matrixIds.length; i < ii; ++i) {
    const tileRange = tileGrid.getFullTileRange(i);
    matrices.push(
      /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintWmtsMatrix} */ ({
        identifier: matrixIds[i],
        scaleDenominator: (tileGrid.getResolution(i) * projection.getMetersPerUnit()) / 0.28e-3,
        tileSize: olSize.toSize(tileGrid.getTileSize(i)),
        topLeftCorner: tileGrid.getOrigin(i),
        matrixSize: [tileRange.maxX - tileRange.minX, tileRange.maxY - tileRange.minY],
      })
    );
  }

  const dimensions = source.getDimensions();
  const dimensionKeys = Object.keys(dimensions);

  const object = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintWmtsLayer} */ ({
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
    version: source.getVersion(),
  });

  arr.push(object);
};

/**
 * @param {Array.<import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer>} arr Array.
 * @param {import("ol/layer/Tile.js").default} layer Layer.
 * @private
 */
PrintService.prototype.encodeTileWmsLayer_ = function (arr, layer) {
  const source = /** @type {olSourceTileWMS} */ (layer.getSource());

  console.assert(layer instanceof olLayerTile);
  console.assert(source instanceof olSourceTileWMS);

  this.encodeWmsLayer_(arr, layer, source.getUrls()[0], source.getParams());
};

/**
 * Return the WMTS URL to use in the print spec.
 * @param {import("ol/source/WMTS.js").default} source The WMTS source.
 * @return {string} URL.
 * @private
 */
PrintService.prototype.getWmtsUrl_ = function (source) {
  const urls = source.getUrls();
  console.assert(urls.length > 0);
  return getAbsoluteUrl_(urls[0]);
};

/**
 * Return an opacity value for the specified layer.
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @returns {number} opacity Opacity value.
 * @private
 */
PrintService.prototype.getOpacityOrInherited_ = function (layer) {
  if (layer.get('inheritedOpacity') !== undefined) {
    return layer.get('inheritedOpacity');
  }
  return layer.getOpacity();
};

/**
 * Send a create report request to the MapFish Print service.
 * @param {import('ngeo/print/mapfish-print-v3.js').MapFishPrintSpec} printSpec Print specification.
 * @param {angular.IRequestShortcutConfig=} opt_httpConfig $http config object.
 * @return {angular.IHttpPromise<Object>} HTTP promise.
 */
PrintService.prototype.createReport = function (printSpec, opt_httpConfig) {
  const format = printSpec.format || 'pdf';
  const url = `${this.url_}/report.${format}`;
  const httpConfig = /** @type {!angular.IRequestShortcutConfig} */ ({
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  Object.assign(httpConfig, opt_httpConfig !== undefined ? opt_httpConfig : {});
  return this.$http_.post(url, printSpec, httpConfig);
};

/**
 * Get the status of a report.
 * @param {string} ref Print report reference.
 * @param {angular.IRequestShortcutConfig=} opt_httpConfig $http config object.
 * @return {angular.IHttpPromise<Object>} HTTP promise.
 */
PrintService.prototype.getStatus = function (ref, opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined ? opt_httpConfig : /** @type {angular.IRequestShortcutConfig} */ ({});
  const url = `${this.url_}/status/${ref}.json`;
  return this.$http_.get(url, httpConfig);
};

/**
 * Get the URL of a report.
 * @param {string} ref Print report reference.
 * @return {string} The report URL for this ref.
 */
PrintService.prototype.getReportUrl = function (ref) {
  return `${this.url_}/report/${ref}`;
};

/**
 * Get the print capabilities from MapFish Print.
 * @param {angular.IRequestShortcutConfig=} opt_httpConfig $http config object.
 * @return {angular.IHttpPromise<Object>} HTTP promise.
 */
PrintService.prototype.getCapabilities = function (opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined
      ? opt_httpConfig
      : /** @type {angular.IRequestShortcutConfig} */ ({
          withCredentials: true,
        });
  const url = `${this.url_}/capabilities.json`;
  return this.$http_.get(url, httpConfig);
};

/**
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @return {CreatePrint} The function to create a print service.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoCreatePrint
 * @private
 * @hidden
 */
function createPrintServiceFactory($http, gettextCatalog, ngeoLayerHelper) {
  return (
    /**
     * @param {string} url URL to MapFish print service.
     * @return {PrintService} The print service
     */
    function (url) {
      return new PrintService(url, $http, gettextCatalog, ngeoLayerHelper);
    }
  );
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoPrint', [ngeoMapLayerHelper.name]);
module.service('ngeoPrintService', PrintService);
module.factory('ngeoCreatePrint', createPrintServiceFactory);

export default module;
