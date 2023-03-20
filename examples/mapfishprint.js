import angular from 'angular';
import {MAPSERVER_PROXY, PRINT_PROXY} from './url.js';
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
  ngeoPrintService.name,
  ngeoPrintUtils.name,
]);

/**
 * @private
 * @hidden
 */
const PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000, 500000];

/**
 * @private
 * @hidden
 */
const PRINT_FORMAT_ = 'pdf';

/**
 * @private
 * @hidden
 */
const PRINT_LAYOUT_ = '1 A4 portrait';

/**
 * @private
 * @hidden
 */
const PRINT_DPI_ = 72;

/**
 * @private
 * @hidden
 */
const PRINT_PAPER_SIZE_ = [555, 675];

/**
 * @constructor
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("ngeo/print/Service.js").CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {import("ngeo/print/Utils.js").PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @ngInject
 * @hidden
 */
function MainController($timeout, ngeoCreatePrint, ngeoPrintUtils) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerImage({
        source: new olSourceImageWMS({
          url: MAPSERVER_PROXY,
          projection: undefined, // should be removed in next OL version
          params: {
            'LAYERS': 'osm',
          },
          serverType: /** @type {import("ol/source/WMSServerType.js").default} */ ('mapserver'),
        }),
      }),
      new olLayerVector({
        source: new olSourceVector({
          url: 'data/polygon-swizerland.json',
          format: new olFormatGeoJSON({
            dataProjection: EPSG21781,
          }),
        }),
      }),
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [537635, 152640],
      zoom: 3,
    }),
  });

  /**
   * Text to display a "loading" message while waiting for the report.
   * @type {string}
   */
  this.printState = '';

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import("ngeo/print/Service.js").PrintService}
   * @private
   */
  this.print_ = ngeoCreatePrint(PRINT_PROXY);

  /**
   * @type {import("ngeo/print/Utils.js").PrintUtils}
   * @private
   */
  this.printUtils_ = ngeoPrintUtils;

  /**
   * @type {function(import("ol/render/Event.js").default): void}
   */
  const postcomposeListener = ngeoPrintUtils.createPrintMaskPostcompose(
    /**
     * @return {import("ol/size.js").Size} Size in dots of the map to print.
     */
    () => PRINT_PAPER_SIZE_,
    /**
     * @param {import('ol/PluggableMap.js').FrameState} frameState Frame state.
     * @return {number} Scale of the map to print.
     */
    (frameState) => {
      const mapSize = frameState.size;
      const mapResolution = frameState.viewState.resolution;
      // we test mapSize and mapResolution just to please the compiler
      return mapSize !== undefined && mapResolution !== undefined
        ? ngeoPrintUtils.getOptimalScale(mapSize, mapResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_)
        : PRINT_SCALES_[0];
    }
  );

  /**
   * Draw the print window in a map postcompose listener.
   */
  this.map.on('postcompose', postcomposeListener);
}

/**
 */
MainController.prototype.print = function () {
  const map = this.map;

  const mapSize = map.getSize();
  const viewResolution = map.getView().getResolution();

  // we test mapSize and viewResolution just to please the compiler
  const scale =
    mapSize !== undefined && viewResolution !== undefined
      ? this.printUtils_.getOptimalScale(mapSize, viewResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_)
      : PRINT_SCALES_[0];

  const dpi = PRINT_DPI_;
  const format = PRINT_FORMAT_;
  const layout = PRINT_LAYOUT_;

  this.printState = 'Printing...';

  const spec = this.print_.createSpec(map, scale, dpi, layout, format, {
    'datasource': [],
    'debug': 0,
    'comments': 'My comments',
    'title': 'My print',
  });

  this.print_
    .createReport(spec)
    .then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));
};

/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
MainController.prototype.handleCreateReportSuccess_ = function (resp) {
  const mfResp = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintReportResponse} */ (
    resp.data
  );
  this.getStatus_(mfResp.ref);
};

/**
 * @param {string} ref Ref.
 * @private
 */
MainController.prototype.getStatus_ = function (ref) {
  this.print_
    .getStatus(ref)
    .then(this.handleGetStatusSuccess_.bind(this, ref), this.handleGetStatusError_.bind(this));
};

/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
MainController.prototype.handleCreateReportError_ = function (resp) {
  this.printState = 'Print error';
};

/**
 * @param {string} ref Ref.
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
MainController.prototype.handleGetStatusSuccess_ = function (ref, resp) {
  const mfResp = /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintStatusResponse} */ (
    resp.data
  );
  const done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    this.printState = '';
    window.location.href = this.print_.getReportUrl(ref);
  } else {
    // The report is not ready yet. Check again in 1s.
    const that = this;
    this.$timeout_(
      () => {
        that.getStatus_(ref);
      },
      1000,
      false
    );
  }
};

/**
 * @param {!angular.IHttpResponse} resp Response.
 * @private
 */
MainController.prototype.handleGetStatusError_ = function (resp) {
  this.printState = 'Print error';
};

appmodule.controller('MainController', MainController);

export default module;
