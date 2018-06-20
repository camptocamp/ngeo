goog.module('ngeo.offline.component');

const ngeoBase = goog.require('ngeo');
const ngeoMapFeatureOverlayMgr = goog.require('ngeo.map.FeatureOverlayMgr');
const ngeoMessageModalComponent = goog.require('ngeo.message.modalComponent');
goog.require('ol.Collection');
goog.require('ol.Observable');
goog.require('ol.Feature');
goog.require('ol.geom.Polygon');
goog.require('ol.geom.GeometryLayout');
goog.require('ol.has');


/**
 * @type {!angular.Module}
 */
exports = angular.module('ngeoOffline', [
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
      `${ngeoBase.baseModuleTemplateUrl}/offline/component.html`;
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
    'extentSize': '<ngeoOfflineExtentsize',
    'debug': '<',
  },
  controller: 'ngeoOfflineController',
  templateUrl: ngeoOfflineTemplateUrl
};


exports.component('ngeoOffline', exports.component_);


/**
 * @private
 */
exports.Controller_ = class {

  /**
   * @private
   * @param {angular.$timeout} $timeout Angular timeout service.
   * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr ngeo feature overlay manager service.
   * @param {ngeo.offline.ServiceManager} ngeoOfflineServiceManager ngeo offline service Manager.
   * @param {ngeox.OfflineConfiguration} ngeoOfflineConfiguration ngeo offline configuration service.
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoOfflineController
   */
  constructor($timeout, ngeoFeatureOverlayMgr, ngeoOfflineServiceManager, ngeoOfflineConfiguration) {

    /**
     * @export
     * @type {boolean}
     */
    this.debug;

    /**
     * @type {angular.$timeout}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * @type {angular.$q.Promise}
     * @private
     */
    this.$timeoutPromise_ = null;

    /**
     * @type {ngeo.offline.ServiceManager}
     * @private
     */
    this.ngeoOfflineServiceManager_ = ngeoOfflineServiceManager;

    /**
     * @private
     * @type {ngeox.OfflineConfiguration}
     */
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;

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
    this.overlayCollection_ = new ol.Collection();

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
     * Whether the cancel downlaod modal is displayed.
     * @type {boolean}
     * @export
     */
    this.displayAlertAbortDownload = false;

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
    this.postcomposeListener_ = this.createMaskPostcompose_();
    this.ngeoOfflineConfiguration_.on('progress', this.progressCallback_);
  }

  $onDestroy() {
    this.ngeoOfflineConfiguration_.un('progress', this.progressCallback_);
  }

  /**
   * @return {boolean} True if data are accessible offline.
   * @export
   */
  hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineDataForWatcher();
  }

  /**
   * Toggle the selecting extent view.
   * @param {boolean=} finished If just finished downloading.
   * @export
   */
  toggleViewExtentSelection(finished) {
    if (this.debug && !finished) { // FIXME, remove this when downloader is implemented
      const extent = this.getDowloadExtent_();
      this.ngeoOfflineServiceManager_.save(extent, this.map);
      return;
    }
    this.menuDisplayed = false;
    this.selectingExtent = !this.selectingExtent;

    if (this.postComposeListenerKey_) {
      ol.Observable.unByKey(this.postComposeListenerKey_);
      this.postComposeListenerKey_ = null;
    }
    if (this.selectingExtent && !this.postComposeListenerKey_) {
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
    const extent = this.getDowloadExtent_();
    this.dataPolygon_ = this.createPolygonFromExtent_(extent);
    this.displayExtent_();
    this.toggleViewExtentSelection(true);
  }

  /**
   * Ask to abort the download of data.
   * @export
   */
  askAbortDownload() {
    this.$timeout_.cancel(this.$timeoutPromise_);
    this.$timeoutPromise_ = null;
    this.displayAlertAbortDownload = true;
  }

  /**
   * Abort the download of data.
   * @export
   */
  abortDownload() {
    this.downloading = false;
  }

  /**
   * Show the main menu.
   * @export
   */
  showMenu() {
    if (this.debug) {
      this.validateExtent();
      return;
    }
    this.menuDisplayed = true;
  }

  /**
   * Zoom to the extent of that data.
   * @export
   */
  zoomToExtent() {
    console.log('FIXME: prevent parallel calls to zoomToExtent');
    this.ngeoOfflineServiceManager_.restore(this.map).then((extent) => {
      this.dataPolygon_ = this.createPolygonFromExtent_(extent);
      const size = /** @type {ol.Size} */ (this.map.getSize());
      this.map.getView().fit(this.dataPolygon_, {size});
      this.menuDisplayed = false;
      this.displayExtent_();
    });
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
    this.ngeoOfflineConfiguration_.clear();
  }

  /**
   * @private
   */
  displayExtent_() {
    if (!this.isExtentVisible()) {
      const feature = new ol.Feature(this.dataPolygon_);
      this.overlayCollection_.push(feature);
    }
  }

  /**
   * @return {function(ol.render.Event)} Function to use as a map postcompose listener.
   * @private
   */
  createMaskPostcompose_() {
    return ((evt) => {
      const context = evt.context;
      const frameState = evt.frameState;
      const resolution = frameState.viewState.resolution;

      const viewportWidth = frameState.size[0] * frameState.pixelRatio;
      const viewportHeight = frameState.size[1] * frameState.pixelRatio;

      const center = [viewportWidth / 2, viewportHeight / 2];

      const extentLength = this.extentSize / resolution * ol.has.DEVICE_PIXEL_RATIO;
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
    });
  }

  /**
   * @param {ol.Extent} extent
   * @return {ol.geom.Polygon} Polygon to save, based on the center of the map and the extentSize property.
   * @private
   */
  createPolygonFromExtent_(extent) {
    return new ol.geom.Polygon([[
      [extent[0], extent[1]],
      [extent[0], extent[3]],
      [extent[2], extent[3]],
      [extent[2], extent[1]],
      [extent[0], extent[1]]
    ]], ol.geom.GeometryLayout.XY);
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
    const halfLength = Math.ceil(this.extentSize / 2);
    return this.createExtent_(center, halfLength);
  }
};


exports.controller('ngeoOfflineController', exports.Controller_);
