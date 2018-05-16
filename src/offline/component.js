goog.provide('ngeo.offline.component');

goog.require('ngeo');
goog.require('ngeo.message.modalComponent');


/**
 * @type {!angular.Module}
 */
ngeo.offline.component = angular.module('ngeoOffline', [
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
 *       ngeo-offline-map="ctrl.map">
 *     </ngeo-offline>
 *
 * See our live example: [../examples/offline.html](../examples/offline.html)
 *
 * @htmlAttribute {ol.Map} ngeo-offline-map The map.
 * @ngInject
 * @ngdoc component
 * @ngname ngeoOffline
 */
ngeo.offline.component.component_ = {
  bindings: {
    'map': '<'
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
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoOfflineController
   */
  constructor($timeout) {

    /**
     * @type {angular.$timeout}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * @type {boolean}
     * @export
     */
    this.hasData = false;

    /**
     * @type {boolean}
     * @export
     */
    this.selectingExtent = false;

    /**
     * @type {boolean}
     * @export
     */
    this.downloading = false;

    /**
     * @type {boolean}
     * @export
     */
    this.menuDisplayed = false;

    /**
     * @type {boolean}
     * @export
     */
    this.visibleExtent = true;
  }

  $onInit() {
    console.log('Offline component is initialized');
  }

  /**
   * @export
   */
  toggleDisplayExtentSelection() {
    this.menuDisplayed = false;
    this.selectingExtent = !this.selectingExtent;
  }

  /**
   * @export
   */
  validateExtent() {
    this.downloading = true;
    this.$timeout_(() => { // for demo purpose, remove me
      if (this.downloading) {
        this.downloading = false;
        this.hasData = true;
        this.selectingExtent = false;
      }
    }, 3000);
  }

  /**
   * @export
   */
  abortDownload() {
    this.downloading = false;
  }

  /**
   * @export
   */
  showMenu() {
    this.menuDisplayed = true;
  }

  /**
   * @export
   */
  zoomToExtent() {
    console.log('Zoom to extent - TODO');
    this.menuDisplayed = false;
  }

  /**
   * @export
   */
  toggleExtent() {
    this.visibleExtent = !this.visibleExtent;
  }

  /**
   * @export
   */
  deleteData() {
    this.hasData = false;
  }
};


ngeo.offline.component.controller('ngeoOfflineController', ngeo.offline.component.Controller_);
