goog.provide('ngeo.offline.component');

goog.require('ngeo');
goog.require('ngeo.map.FeatureOverlayMgr');
goog.require('ngeo.message.modalComponent');
goog.require('ol.Collection');
goog.require('ol.Observable');
goog.require('ol.Feature');
goog.require('ol.geom.Polygon');
goog.require('ol.geom.GeometryLayout');
goog.require('ol.has');


/**
 * @type {!angular.Module}
 */
ngeo.offline.component = angular.module('ngeoOffline', [
  ngeo.map.FeatureOverlayMgr.module.name,
  ngeo.message.modalComponent.name
]);


ngeo.offline.component.value('ngeoOfflineTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoOfflineTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/offline/component.html`;
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
ngeo.offline.component.component_ = {
  bindings: {
    'map': '<ngeoOfflineMap',
    'extentSize': '<ngeoOfflineExtentsize'
  },
  controller: 'ngeoOfflineController',
  templateUrl: ngeoOfflineTemplateUrl
};


ngeo.offline.component.component('ngeoOffline', ngeo.offline.component.component_);


/**
 * @private
 */
ngeo.offline.component.Controller_ = class {

  /**
   * @private
   * @param {angular.$timeout} $timeout Angular timeout service.
   * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr ngeo feature overlay manager service.
   * @param {ngeo.offline.ServiceManager} ngeoOfflineServiceManager ngeo offline service Manager.
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoOfflineController
   */
  constructor($timeout, ngeoFeatureOverlayMgr, ngeoOfflineServiceManager) {

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
  }

  $onInit() {
    this.postcomposeListener_ = this.createMaskPostcompose_();
  }

  /**
   * @return {boolean} True if data are accessible offline.
   * @export
   */
  hasData() {
    return !!this.dataPolygon_;
  }

  /**
   * Toggle the selecting extent view.
   * @export
   */
  toggleViewExtentSelection() {
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
    this.ngeoOfflineServiceManager_.save(extent);
    this.downloading = true;
    this.followDownloadProgression_();
  }

  /**
   * FIXME For demo purpose, adapt me with real code.
   * @private
   */
  followDownloadProgression_() {
    if (this.progressPercents < 99) {
      this.$timeoutPromise_ = this.$timeout_(() => {
        this.progressPercents++;
        this.followDownloadProgression_();
      }, 50);
    } else {
      this.finishDownload_();
    }
  }

  /**
   * @private
   */
  finishDownload_() {
    this.downloading = false;
    this.dataPolygon_ = this.createPolygonToSave_();
    this.displayExtent_();
    this.toggleViewExtentSelection();
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
    this.menuDisplayed = true;
  }

  /**
   * Zoom to the extent of that data.
   * @export
   */
  zoomToExtent() {
    const size = /** @type {ol.Size} */ (this.map.getSize());
    this.map.getView().fit(this.dataPolygon_, {size});
    this.menuDisplayed = false;
    this.displayExtent_();
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
   * @return {ol.geom.Polygon} Polygon to save, based on the center of the map and the extentSize property.
   * @private
   */
  createPolygonToSave_() {
    const extent = this.getDowloadExtent_();
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


ngeo.offline.component.controller('ngeoOfflineController', ngeo.offline.component.Controller_);
