goog.provide('gmf.AbstractMobileController');

goog.require('gmf');
goog.require('gmf.AbstractController');
/** @suppress {extraRequire} */
goog.require('gmf.displayqueriesDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mobileMeasureLengthDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mobileMeasurePointDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mobileNavDirective');
goog.require('goog.fx.Dragger');
goog.require('goog.math.Rect');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.mobileGeolocationDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.mapQueryDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.interaction');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

gmf.module.constant('isMobile', true);

gmf.module.constant(
    'gmfRasterUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/raster');


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
 * @extends {gmf.AbstractController}
 * @ngInject
 * @export
 */
gmf.AbstractMobileController = function(config, $scope, $injector) {

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

  var positionFeatureStyle = config.positionFeatureStyle || new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new ol.style.Stroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  var accuracyFeatureStyle = config.accuracyFeatureStyle || new ol.style.Style({
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
    zoom: config.geolocationZoom || 9
  };

  var viewConfig = {
    projection: ol.proj.get('epsg:' + (config.srid || 21781))
  };
  goog.object.extend(viewConfig, config.mapViewConfig || {});

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [],
    view: new ol.View(viewConfig),
    controls: config.mapControls || [
      new ol.control.ScaleLine(),
      new ol.control.Zoom()
    ],
    interactions:
        config.mapInteractions ||
        ol.interaction.defaults({pinchRotate: false})
  });

  goog.base(this, config, $scope, $injector);


  var dragEl = document.querySelector('main');
  var handleEl = document.querySelector('main .overlay');
  /**
   * @type {goog.fx.Dragger}
   * @private
   */
  this.dragger_ = new goog.fx.Dragger(dragEl, handleEl);

  goog.events.listen(this.dragger_, 'start', function(e) {
    // Prevent transition to happen while dragging
    angular.element(dragEl).addClass('dragging');
  });

  // Get the width of the navigation menus
  // We expect that the width of left and right navs are similar
  /**
   * @type {number}
   * @private
   */
  this.navWidth_ = angular.element(document.querySelector('.nav-left')).width();

  goog.events.listen(this.dragger_, 'end', (function(e) {
    angular.element(dragEl).removeClass('dragging');
    // Reset positioning when finished so that transition can happen correctly
    angular.element(e.target.target).css('transform', '');
    // Hide nav only if dragged sufficiently
    var deltaX = this.dragger_.limitX(this.dragger_.deltaX);
    if (Math.abs(deltaX) > this.navWidth_ / 2) {
      $scope.$apply(function() {
        this.hideNav();
      }.bind(this));
    }
  }).bind(this));
};
goog.inherits(gmf.AbstractMobileController, gmf.AbstractController);


/**
 * @export
 */
gmf.AbstractMobileController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;

  if (this.leftNavVisible) {
    var navWidth = this.navWidth_;
    // default dragger behavior is to change left/top, override it to change
    // translateX
    this.dragger_.defaultAction = function(x, y) {
      this.target.style.transform = 'translateX(' + (navWidth + x) + 'px)';
    };
    // Set the limits for dragger so that it's constrained horizontaly to the
    // left.
    this.dragger_.setLimits(new goog.math.Rect(-navWidth, 0, navWidth, 0));
  }
};


/**
 * @export
 */
gmf.AbstractMobileController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;

  if (this.rightNavVisible) {
    var navWidth = this.navWidth_;
    // default dragger behavior is to change left/top, override it to change
    // translateX
    this.dragger_.defaultAction = function(x, y) {
      this.target.style.transform = 'translateX(' + (-navWidth + x) + 'px)';
    };
    // Set the limits for dragger so that it's constrained horizontaly to the
    // right.
    this.dragger_.setLimits(
      new goog.math.Rect(0, 0, navWidth, 0));
  }
};


/**
 * Hide both navigation menus.
 * @export
 */
gmf.AbstractMobileController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * Hide search overlay.
 * @export
 */
gmf.AbstractMobileController.prototype.hideSearchOverlay = function() {
  this.searchOverlayVisible = false;
};


/**
 * @return {boolean} Return true if the left navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.leftNavIsVisible = function() {
  return this.leftNavVisible;
};


/**
 * @return {boolean} Return true if the right navigation menus is visible,
 * otherwise false.
 * @export
 */
gmf.AbstractMobileController.prototype.rightNavIsVisible = function() {
  return this.rightNavVisible;
};

gmf.module.controller('AbstractMobileController', gmf.AbstractMobileController);
