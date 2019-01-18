import angular from 'angular';
import gmfControllersAbstractAppController from 'gmf/controllers/AbstractAppController.js';
import gmfMobileMeasureModule from 'gmf/mobile/measure/module.js';
import gmfMobileNavigationModule from 'gmf/mobile/navigation/module.js';
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olControlZoom from 'ol/control/Zoom.js';
import olControlRotate from 'ol/control/Rotate.js';
import * as olInteraction from 'ol/interaction.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * Mobile application abstract controller.
 *
 * This file includes `goog.require`'s mobile components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
 * @param {angular.IScope} $scope Scope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @constructor
 * @extends {import("gmf/controllers/AbstractAppController.js").default}
 * @ngdoc controller
 * @ngInject
 * @export
 */
function AbstractMobileController(config, $scope, $injector) {

  /**
   * @type {boolean}
   * @export
   */
  this.leftNavVisible = false;

  /**
   * @type {boolean}
   * @export
   */
  this.rightNavVisible = false;

  /**
   * @type {boolean}
   * @export
   */
  this.searchOverlayVisible = false;

  /**
   * @type {SearchDirectiveListeners}
   * @export
   */
  this.searchListeners = /** @type {SearchDirectiveListeners} */ ({
    open: function() {
      this.searchOverlayVisible = true;
    }.bind(this),
    close: function() {
      this.searchOverlayVisible = false;
    }.bind(this)
  });

  const positionFeatureStyle = config.positionFeatureStyle || new olStyleStyle({
    image: new olStyleCircle({
      radius: 6,
      fill: new olStyleFill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new olStyleStroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  const accuracyFeatureStyle = config.accuracyFeatureStyle || new olStyleStyle({
    fill: new olStyleFill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new olStyleStroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {MobileGeolocationDirectiveOptions}
   * @export
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: config.geolocationZoom,
    autorotate: config.autorotate
  };

  const viewConfig = {
    projection: olProj.get(`EPSG:${config.srid || 21781}`)
  };
  Object.assign(viewConfig, config.mapViewConfig || {});

  const arrow = gmfControllersAbstractAppController.prototype.getLocationIcon();

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    pixelRatio: config.mapPixelRatio,
    layers: [],
    view: new olView(viewConfig),
    controls: config.mapControls || [
      new olControlScaleLine(),
      new olControlZoom({
        zoomInTipLabel: '',
        zoomOutTipLabel: ''
      }),
      new olControlRotate({
        label: arrow,
        tipLabel: ''
      })
    ],
    interactions:
        config.mapInteractions ||
        olInteraction.defaults({pinchRotate: true})
  });

  gmfControllersAbstractAppController.call(this, config, $scope, $injector);

  this.manageResize = true;
  this.resizeTransition = 500;

  // Close right nave on successful login.
  $scope.$watch(() => this.gmfUser.username, (newVal) => {
    if (newVal !== null && this.navIsVisible()) {
      this.rightNavVisible = false;
    }
  });

  /**
   * @const {string}
   * @export
   */
  this.redirectUrl = $injector.get('redirectUrl');
}

olUtilInherits(AbstractMobileController, gmfControllersAbstractAppController);


/**
 * @export
 */
AbstractMobileController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;
};


/**
 * @export
 */
AbstractMobileController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;
};


/**
 * Hide both navigation menus.
 * @export
 */
AbstractMobileController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
AbstractMobileController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * Open the menu with corresponding to the data-target attribute value.
 * @param {string} target the data-target value.
 * @export
 */
AbstractMobileController.prototype.openNavMenu = function(target) {
  const navElements = document.getElementsByClassName('gmf-mobile-nav-button');
  for (let i = 0; i < navElements.length; i++) {
    const element = navElements[i];
    if (element.dataset && element.dataset.target === target) {
      element.click();
    }
  }
};


const module = angular.module('GmfAbstractMobileControllerModule', [
  gmfControllersAbstractAppController.name,
  gmfMobileMeasureModule.name,
  gmfMobileNavigationModule.name,
  gmfQueryWindowComponent.name,
  ngeoGeolocationMobile.name,
]);

module.controller('AbstractMobileController', AbstractMobileController);

module.value('isMobile', true);

module.value('ngeoQueryOptions', {
  'tolerance': 10
});


export default module;
