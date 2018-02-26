goog.provide('gmf.controllers.AbstractMobileController');

goog.require('gmf.controllers.AbstractAppController');
goog.require('gmf.mobile.measure.module');
goog.require('gmf.mobile.navigation.module');
goog.require('gmf.query.windowComponent');
goog.require('ngeo.geolocation.mobile');
goog.require('ol');
goog.require('ol.obj');
goog.require('ol.proj');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.control.Rotate');
goog.require('ol.interaction');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/**
 * Mobile application abstract controller.
 *
 * This file includes `goog.require`'s mobile components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @extends {gmf.controllers.AbstractAppController}
 * @ngdoc controller
 * @ngInject
 * @export
 */
gmf.controllers.AbstractMobileController = function(config, $scope, $injector) {

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
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.searchListeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    open: function() {
      this.searchOverlayVisible = true;
    }.bind(this),
    close: function() {
      this.searchOverlayVisible = false;
    }.bind(this)
  });

  const positionFeatureStyle = config.positionFeatureStyle || new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new ol.style.Stroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  const accuracyFeatureStyle = config.accuracyFeatureStyle || new ol.style.Style({
    fill: new ol.style.Fill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new ol.style.Stroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {ngeox.MobileGeolocationDirectiveOptions}
   * @export
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: config.geolocationZoom,
    autorotate: config.autorotate
  };

  const viewConfig = {
    projection: ol.proj.get(`EPSG:${config.srid || 21781}`)
  };
  ol.obj.assign(viewConfig, config.mapViewConfig || {});

  const arrow = gmf.controllers.AbstractAppController.prototype.getLocationIcon();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    pixelRatio: config.mapPixelRatio,
    layers: [],
    view: new ol.View(viewConfig),
    controls: config.mapControls || [
      new ol.control.ScaleLine(),
      new ol.control.Zoom({
        zoomInTipLabel: '',
        zoomOutTipLabel: ''
      }),
      new ol.control.Rotate({
        label: arrow,
        tipLabel: ''
      })
    ],
    interactions:
        config.mapInteractions ||
        ol.interaction.defaults({pinchRotate: true})
  });

  gmf.controllers.AbstractAppController.call(this, config, $scope, $injector);

  this.manageResize = true;
  this.resizeTransition = 500;

  // Close right nave on successful login.
  $scope.$watch(() => this.gmfUser.username, (newVal) => {
    if (newVal !== null && this.navIsVisible()) {
      this.rightNavVisible = false;
    }
  });
};
ol.inherits(gmf.controllers.AbstractMobileController, gmf.controllers.AbstractAppController);


/**
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;
};


/**
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;
};


/**
 * Hide both navigation menus.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * Hide search overlay.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.hideSearchOverlay = function() {
  this.searchOverlayVisible = false;
};


/**
 * @return {boolean} Return true if the left navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.leftNavIsVisible = function() {
  return this.leftNavVisible;
};


/**
 * @return {boolean} Return true if the right navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.rightNavIsVisible = function() {
  return this.rightNavVisible;
};


/**
 * Open the menu with corresponding to the data-target attribute value.
 * @param {string} target the data-target value.
 * @export
 */
gmf.controllers.AbstractMobileController.prototype.openNavMenu = function(target) {
  const navElements = document.getElementsByClassName('gmf-mobile-nav-button');
  for (const key in navElements) {
    const element = navElements[key];
    if (element.dataset && element.dataset.target === target) {
      element.click();
    }
  }
};


gmf.controllers.AbstractMobileController.module = angular.module('GmfAbstractMobileControllerModule', [
  gmf.controllers.AbstractAppController.module.name,
  gmf.mobile.measure.module.name,
  gmf.mobile.navigation.module.name,
  gmf.query.windowComponent.name,
  ngeo.geolocation.mobile.name,
]);

gmf.controllers.AbstractMobileController.module.controller('AbstractMobileController', gmf.controllers.AbstractMobileController);

gmf.controllers.AbstractMobileController.module.value('isMobile', true);

gmf.controllers.AbstractMobileController.module.value('ngeoQueryOptions', {
  'tolerance': 10
});
