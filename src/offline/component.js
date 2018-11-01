/**
 * @module ngeo.offline.component
 */
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';
import {extentToRectangle} from 'ngeo/utils.js';
import olCollection from 'ol/Collection.js';
import {unByKey} from 'ol/Observable.js';
import olFeature from 'ol/Feature.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olGeomGeometryLayout from 'ol/geom/GeometryLayout.js';
import {DEVICE_PIXEL_RATIO} from 'ol/has.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoOffline', [
  ngeoMapFeatureOverlayMgr.module.name,
  ngeoMessageModalComponent.name
]);

exports.value('ngeoOfflineTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoOfflineTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/offline/component.html';
  });

exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/offline/component.html', require('./component.html'));
});
  
/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} ngeoOfflineTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoOfflineTemplateUrl($element, $attrs, ngeoOfflineTemplateUrl) {
  return ngeoOfflineTemplateUrl($element, $attrs);
}


/**
 * Provides the "offline" component.
 *
 * Example:
 *
 *     <ngeo-offline
 *       ngeo-offline-map="ctrl.map"
 *       ngeo-offline-extentsize="ctrl.offlineExtentSize">
 *       ngeo-offline-mask-margin="::100"
 *       ngeo-offline-min_zoom="::11"
 *       ngeo-offline-max_zoom="::15"
 *     </ngeo-offline>
 *
 * See our live example: [../examples/offline.html](../examples/offline.html)
 *
 * @htmlAttribute {ol.Map} ngeo-offline-map The map.
 * @htmlAttribute {number} ngeo-offline-extentsize The size, in map units, of a side of the extent.
 * @private
 * @ngdoc component
 * @ngname ngeoOffline
 */
exports.component_ = {
  bindings: {
    'map': '<ngeoOfflineMap',
    'extentSize': '<?ngeoOfflineExtentsize',
    'maskMargin': '<?ngeoOfflineMaskMargin',
    'minZoom': '<?ngeoOfflineMinZoom',
    'maxZoom': '<?ngeoOfflineMaxZoom',
  },
  controller: 'ngeoOfflineController',
  templateUrl: ngeoOfflineTemplateUrl
};


exports.component('ngeoOffline', exports.component_);


/**
 * @private
 */
exports.Controller = class {

  /**
   * @private
   * @param {angular.$timeout} $timeout Angular timeout service.
   * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr ngeo feature overlay manager service.
   * @param {ngeo.offline.ServiceManager} ngeoOfflineServiceManager ngeo offline service Manager.
   * @param {ngeo.offline.Configuration} ngeoOfflineConfiguration ngeo offline configuration service.
   * @param {ngeo.offline.Mode} ngeoOfflineMode Offline mode manager.
   * @param {ngeo.offline.NetworkStatus} ngeoNetworkStatus ngeo network status service.
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoOfflineController
   */
  constructor($timeout, ngeoFeatureOverlayMgr, ngeoOfflineServiceManager, ngeoOfflineConfiguration, ngeoOfflineMode, ngeoNetworkStatus) {

    /**
     * @type {angular.$timeout}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * @type {ngeo.offline.ServiceManager}
     * @private
     */
    this.ngeoOfflineServiceManager_ = ngeoOfflineServiceManager;

    /**
     * @private
     * @type {ngeo.offline.Configuration}
     */
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;

    /**
     * @type {ngeo.offline.Mode}
     * @export
     */
    this.offlineMode = ngeoOfflineMode;

    /**
     * @type {ngeo.offline.NetworkStatus}
     * @export
     */
    this.networkStatus = ngeoNetworkStatus;

    /**
     * The map.
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * The size, in map units, of a side of the extent.
     * @type {number}
     * @export
     */
    this.extentSize;

    /**
     * @type {ngeo.map.FeatureOverlay}
     * @private
     */
    this.featuresOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {!ol.Collection}
     * @private
     */
    this.overlayCollection_ = new olCollection();

    this.featuresOverlay_.setFeatures(this.overlayCollection_);

    /**
     * @type {function(ol.render.Event)}
     */
    this.postcomposeListener_;

    /**
     * @type {ol.EventsKey|Array.<ol.EventsKey>}
     * @private
     */
    this.postComposeListenerKey_ = null;


    /**
     * @type {ol.geom.Polygon}
     * @private
     */
    this.dataPolygon_ = null;

    /**
     * Whether the current view is the extent selection.
     * @type {boolean}
     * @export
     */
    this.selectingExtent = false;

    /**
     * Whether the current view is downloading one.
     * @type {boolean}
     * @export
     */
    this.downloading = false;

    /**
     * The progression of the data loading (0-100%).
     * @type {number}
     * @export
     */
    this.progressPercents = 0;

    /**
     * Whether the menu is currently displayed.
     * @type {boolean}
     * @export
     */
    this.menuDisplayed = false;

    /**
     * Whether the cancel download modal is displayed.
     * @type {boolean}
     * @export
     */
    this.displayAlertAbortDownload = false;

    /**
     * Whether the load data modal is displayed.
     * @type {boolean}
     * @export
     */
    this.displayAlertLoadData = false;

    /**
     * Whether the "no layer" modal is displayed.
     * @type {boolean}
     * @export
     */
    this.displayAlertNoLayer = false;

    /**
     * Offline mask minimum margin in pixels.
     * @type {number}
     * @export
     */
    this.maskMargin;

    /**
     * Minimum zoom where offline is enable.
     * @type {number}
     * @export
     */
    this.minZoom;

    /**
     * Maximum zoom where offline is enable.
     * @type {number}
     * @export
     */
    this.maxZoom;

    /**
     * Map view max zoom constraint.
     * @type {number}
     * @export
     */
    this.originalMinZoom;

    /**
     * Map view min zoom constraint.
     * @type {number}
     * @export
     */
    this.originalMaxZoom;

    /**
     * @type {number}
     * @export
     */
    this.estimatedLoadDataSize;

    /**
     * @private
     * @param {ngeo.CustomEvent} event the progress event.
     */
    this.progressCallback_ = (event) => {
      const progress = event.detail['progress'];
      this.progressPercents = Math.floor(progress * 100);
      if (progress === 1) {
        this.finishDownload_();
      }
      this.$timeout_(() => {}, 0); // FIXME: force redraw
    };
  }

  $onInit() {
    this.offlineMode.registerComponent(this);
    this.postcomposeListener_ = this.createMaskPostcompose_();
    this.ngeoOfflineConfiguration_.on('progress', this.progressCallback_);
    this.maskMargin = this.maskMargin || 100;
    this.minZoom = this.minZoom || 10;
    this.maxZoom = this.maxZoom || 15;
  }

  $onDestroy() {
    this.ngeoOfflineConfiguration_.un('progress', this.progressCallback_);
  }

  /**
   * @return {boolean} True if data are accessible offline.
   * @export
   */
  hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineData();
  }

  /**
   * @export
   */
  computeSizeAndDisplayAlertLoadData() {
    this.estimatedLoadDataSize = this.ngeoOfflineConfiguration_.estimateLoadDataSize(this.map);
    if (this.estimatedLoadDataSize > 0) {
      this.displayAlertLoadData = true;
    } else {
      this.displayAlertNoLayer = true;
    }
  }
  /**
   * Toggle the selecting extent view.
   * @param {boolean=} finished If just finished downloading.
   * @export
   */
  toggleViewExtentSelection(finished) {
    this.menuDisplayed = false;
    this.selectingExtent = !this.selectingExtent;

    if (this.postComposeListenerKey_) {
      unByKey(this.postComposeListenerKey_);
      this.postComposeListenerKey_ = null;
      this.removeZoomConstraints_();
    }
    if (this.selectingExtent && !this.postComposeListenerKey_) {
      this.addZoomConstraints_();
      this.postComposeListenerKey_ = this.map.on('postcompose', this.postcomposeListener_);
    }
    this.map.render();
  }

  /**
   * Validate the current extent and download data.
   * @export
   */
  validateExtent() {
    this.progressPercents = 0;
    const extent = this.getDowloadExtent_();
    this.ngeoOfflineServiceManager_.save(extent, this.map);
    this.downloading = true;
  }


  /**
   * @private
   */
  finishDownload_() {
    this.downloading = false;
    this.toggleViewExtentSelection(true);
  }

  /**
   * Ask to abort the download of data.
   * @export
   */
  askAbortDownload() {
    this.displayAlertAbortDownload = true;
  }

  /**
   * Abort the download of data.
   * @export
   */
  abortDownload() {
    this.downloading = false;
    this.ngeoOfflineServiceManager_.cancel();
    this.deleteData();
  }

  /**
   * Show the main menu.
   * @export
   */
  showMenu() {
    this.menuDisplayed = true;
  }

  /**
   * Activate offline mode.
   * Zoom to the extent of that data and restore the data.
   * @export
   */
  activateOfflineMode() {
    this.ngeoOfflineServiceManager_.restore(this.map).then((extent) => {
      this.dataPolygon_ = this.createPolygonFromExtent_(extent);
      const size = /** @type {ol.Size} */ (this.map.getSize());
      this.map.getView().fit(extent, {size});
      this.menuDisplayed = false;
      this.displayExtent_();
      this.offlineMode.enable();
    });
  }

  /**
   *
   * Deactivate offline mode.
   * Reload the page.
   * @export
   */
  deactivateOfflineMode() {
    window.location.reload();
  }

  /**
   * Toggle the visibility of the data's extent.
   * @export
   */
  toggleExtentVisibility() {
    if (this.isExtentVisible()) {
      this.overlayCollection_.clear();
    } else {
      this.displayExtent_();
    }
  }

  /**
   * @return {boolean} True if the extent is currently visible. False otherwise.
   * @export
   */
  isExtentVisible() {
    return this.overlayCollection_.getLength() > 0;
  }

  /**
   * Delete the saved data.
   * @export
   */
  deleteData() {
    this.overlayCollection_.clear();
    this.dataPolygon_ = null;
    if (this.networkStatus.isDisconnected()) {
      this.menuDisplayed = false;
    }

    const reloadIfInOfflineMode = () => {
      if (this.offlineMode.isEnabled()) {
        this.deactivateOfflineMode();
      }
    };
    this.ngeoOfflineConfiguration_.clear().then(reloadIfInOfflineMode);
  }

  /**
   * @private
   */
  displayExtent_() {
    if (!this.isExtentVisible()) {
      const feature = new olFeature(this.dataPolygon_);
      this.overlayCollection_.push(feature);
    }
  }

  /**
   * When enabling mask extent, zoom the view to the defined zoom range and
   * add constraints to the view to not allow user to move out of this range.
   * @private
   */
  addZoomConstraints_() {
    const view = this.map.getView();
    const zoom = view.getZoom();

    this.originalMinZoom = view.getMinZoom();
    this.originalMaxZoom = view.getMaxZoom();

    if (zoom < this.minZoom) {
      view.setZoom(this.minZoom);
    } else if (zoom > this.maxZoom) {
      view.setZoom(this.maxZoom);
    }
    view.setMaxZoom(this.maxZoom);
    view.setMinZoom(this.minZoom);
  }

  /**
   * @private
   */
  removeZoomConstraints_() {
    const view = this.map.getView();
    view.setMaxZoom(this.originalMaxZoom);
    view.setMinZoom(this.originalMinZoom);
  }

  /**
   * @return {function(ol.render.Event)} Function to use as a map postcompose listener.
   * @private
   */
  createMaskPostcompose_() {
    return (evt) => {
      const context = evt.context;
      const frameState = evt.frameState;
      const resolution = frameState.viewState.resolution;

      const viewportWidth = frameState.size[0] * frameState.pixelRatio;
      const viewportHeight = frameState.size[1] * frameState.pixelRatio;

      const center = [viewportWidth / 2, viewportHeight / 2];

      const extentLength = this.extentSize ?
        this.extentSize / resolution * DEVICE_PIXEL_RATIO :
        Math.min(viewportWidth, viewportHeight) - this.maskMargin * 2;

      const extentHalfLength = Math.ceil(extentLength / 2);

      // Draw a mask on the whole map.
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(viewportWidth, 0);
      context.lineTo(viewportWidth, viewportHeight);
      context.lineTo(0, viewportHeight);
      context.lineTo(0, 0);
      context.closePath();

      // Draw the get data zone
      const extent = this.createExtent_(center, extentHalfLength);

      context.moveTo(extent[0], extent[1]);
      context.lineTo(extent[0], extent[3]);
      context.lineTo(extent[2], extent[3]);
      context.lineTo(extent[2], extent[1]);
      context.lineTo(extent[0], extent[1]);
      context.closePath();

      // Fill the mask
      context.fillStyle = 'rgba(0, 5, 25, 0.5)';
      context.fill();
    };
  }

  /**
   * A polygon on the whole extent of the projection, with a hole for the offline extent.
   * @param {ol.Extent} extent
   * @return {ol.geom.Polygon} Polygon to save, based on the projection extent, the center of the map and
   *     the extentSize property.
   * @private
   */
  createPolygonFromExtent_(extent) {
    const projExtent = this.map.getView().getProjection().getExtent();
    return new olGeomPolygon([
      extentToRectangle(projExtent),
      extentToRectangle(extent),
    ], olGeomGeometryLayout.XY);
  }

  /**
   * @param {ol.Coordinate} center, a xy point.
   * @param {number} halfLength a half length of a square's side.
   * @return {Array.<number>} an extent.
   * @private
   */
  createExtent_(center, halfLength) {
    const minx = center[0] - halfLength;
    const miny = center[1] - halfLength;
    const maxx = center[0] + halfLength;
    const maxy = center[1] + halfLength;
    return [minx, miny, maxx, maxy];
  }

  /**
   * @return {Array.<number>} the download extent.
   * @private
   */
  getDowloadExtent_() {
    const center = /** @type {ol.Coordinate}*/(this.map.getView().getCenter());
    const halfLength = Math.ceil(this.extentSize || this.getExtentSize_()) / 2;
    return this.createExtent_(center, halfLength);
  }

  getExtentSize_() {
    const mapSize = this.map.getSize();
    const maskSizePixel = DEVICE_PIXEL_RATIO * Math.min(mapSize[0], mapSize[1]) - this.maskMargin * 2;
    const maskSizeMeter = maskSizePixel * this.map.getView().getResolution() / DEVICE_PIXEL_RATIO;
    return maskSizeMeter;
  }
};


exports.controller('ngeoOfflineController', exports.Controller);


export default exports;
