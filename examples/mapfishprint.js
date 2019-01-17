/**
 * @module app.mapfishprint
 */
const exports = {};

import angular from 'angular';
import appURL from './url.js';
import './mapfishprint.css';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import ngeoPrintService from 'ngeo/print/Service.js';
import ngeoPrintUtils from 'ngeo/print/Utils.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceVector from 'ol/source/Vector.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.IModule} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoPrintService.module.name,
  ngeoPrintUtils.module.name,
]);


/**
 * @const
 * @private
 */
exports.PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000,
  100000, 500000];


/**
 * @const
 * @private
 */
exports.PRINT_FORMAT_ = 'pdf';


/**
 * @const
 * @private
 */
exports.PRINT_LAYOUT_ = '1 A4 portrait';


/**
 * @const
 * @private
 */
exports.PRINT_DPI_ = 72;


/**
 * @const
 * @private
 */
exports.PRINT_PAPER_SIZE_ = [555, 675];


/**
 * @constructor
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {ngeo.print.Utils} ngeoPrintUtils The ngeo PrintUtils service.
 * @ngInject
 * @export
 */
exports.MainController = function($timeout, ngeoCreatePrint, ngeoPrintUtils) {
  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerImage({
        source: new olSourceImageWMS({
          url: appURL.MAPSERVER_PROXY,
          params: {
            'LAYERS': 'osm'
          },
          serverType: /** @type {import("ol/source/WMSServerType.js").default} */ ('mapserver')
        })
      }),
      new olLayerVector({
        source: new olSourceVector({
          url: 'data/polygon-swizerland.json',
          format: new olFormatGeoJSON({
            defaultDataProjection: EPSG21781
          })
        })
      })
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [537635, 152640],
      zoom: 3
    })
  });

  /**
   * Text to display a "loading" message while waiting for the report.
   * @type {string}
   * @export
   */
  this.printState = '';

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {ngeo.print.Service}
   * @private
   */
  this.print_ = ngeoCreatePrint(appURL.PRINT_PROXY);

  /**
   * @type {ngeo.print.Utils}
   * @private
   */
  this.printUtils_ = ngeoPrintUtils;

  /**
   * @type {function(import("ol/render/Event.js").default)}
   */
  const postcomposeListener = ngeoPrintUtils.createPrintMaskPostcompose(
    /**
       * @return {import("ol/Size.js").default} Size in dots of the map to print.
       */
    () => exports.PRINT_PAPER_SIZE_,
    /**
       * @param {olx.FrameState} frameState Frame state.
       * @return {number} Scale of the map to print.
       */
    (frameState) => {
      const mapSize = frameState.size;
      const mapResolution = frameState.viewState.resolution;
      // we test mapSize and mapResolution just to please the compiler
      return mapSize !== undefined && mapResolution !== undefined ?
        ngeoPrintUtils.getOptimalScale(mapSize, mapResolution,
          exports.PRINT_PAPER_SIZE_, exports.PRINT_SCALES_) :
        exports.PRINT_SCALES_[0];
    });

  /**
   * Draw the print window in a map postcompose listener.
   */
  this.map.on('postcompose', postcomposeListener);
};


/**
 * @export
 */
exports.MainController.prototype.print = function() {
  const map = this.map;

  const mapSize = map.getSize();
  const viewResolution = map.getView().getResolution();

  // we test mapSize and viewResolution just to please the compiler
  const scale = mapSize !== undefined && viewResolution !== undefined ?
    this.printUtils_.getOptimalScale(mapSize, viewResolution,
      exports.PRINT_PAPER_SIZE_, exports.PRINT_SCALES_) :
    exports.PRINT_SCALES_[0];

  const dpi = exports.PRINT_DPI_;
  const format = exports.PRINT_FORMAT_;
  const layout = exports.PRINT_LAYOUT_;

  this.printState = 'Printing...';

  const spec = this.print_.createSpec(map, scale, dpi, layout, format, {
    'datasource': [],
    'debug': 0,
    'comments': 'My comments',
    'title': 'My print'
  });

  this.print_.createReport(spec).then(
    this.handleCreateReportSuccess_.bind(this),
    this.handleCreateReportError_.bind(this)
  );
};


/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
exports.MainController.prototype.handleCreateReportSuccess_ = function(resp) {
  const mfResp = /** @type {MapFishPrintReportResponse} */ (resp.data);
  this.getStatus_(mfResp.ref);
};


/**
 * @param {string} ref Ref.
 * @private
 */
exports.MainController.prototype.getStatus_ = function(ref) {
  this.print_.getStatus(ref).then(
    this.handleGetStatusSuccess_.bind(this, ref),
    this.handleGetStatusError_.bind(this)
  );
};


/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
exports.MainController.prototype.handleCreateReportError_ = function(resp) {
  this.printState = 'Print error';
};


/**
 * @param {string} ref Ref.
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
exports.MainController.prototype.handleGetStatusSuccess_ = function(ref, resp) {
  const mfResp = /** @type {MapFishPrintStatusResponse} */ (resp.data);
  const done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    this.printState = '';
    window.location.href = this.print_.getReportUrl(ref);
  } else {
    // The report is not ready yet. Check again in 1s.
    const that = this;
    this.$timeout_(() => {
      that.getStatus_(ref);
    }, 1000, false);
  }
};


/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
exports.MainController.prototype.handleGetStatusError_ = function(resp) {
  this.printState = 'Print error';
};


appmodule.controller('MainController', exports.MainController);


export default exports;
