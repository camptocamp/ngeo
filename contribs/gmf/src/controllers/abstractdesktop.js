goog.provide('gmf.AbstractDesktopController');

goog.require('gmf');
goog.require('gmf.AbstractController');
/** @suppress {extraRequire} */
goog.require('gmf.mobileBackgroundlayerselectorDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mousepositionDirective');
/** @suppress {extraRequire} */
goog.require('gmf.printDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.resizemapDirective');
goog.require('ngeo.ScaleselectorOptions');
/** @suppress {extraRequire} */
goog.require('ngeo.scaleselectorDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.interaction');

gmf.module.constant('isDesktop', true);

/** @suppress {extraRequire} */
goog.require('ngeo.sortableDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.SortableOptions');
/**
 * Desktop application abstract controller.
 *
 * This file includes `goog.require`'s for desktop components/directives used
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
gmf.AbstractDesktopController = function(config, $scope, $injector) {

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
      new ol.control.ScaleLine({
        target: document.getElementById('scaleline')
      }),
      new ol.control.Zoom()
    ],
    interactions: config.mapInteractions || ol.interaction.defaults({
      pinchRotate: false,
      altShiftDragRotate: false
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.loginActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  // initialize tooltips
  $('body').tooltip({
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="tooltip"]'
  });

  var $sce = $injector.get('$sce');

  /**
   * @type {ngeo.ScaleselectorOptions}
   * @export
   */
  this.scaleSelectorOptions = {
    'dropup': true
  };

  /**
   * @type {!Object.<string, string>}
   * @export
   */
  this.scaleSelectorValues = {
    '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
    '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
    '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
    '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
    '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
  };

  goog.base(
      this, config, $scope, $injector);

  // close the login panel on successful login
  $scope.$watch(function() {
    return this.gmfUser.username;
  }.bind(this), function(newVal) {
    if (newVal !== null && this.loginActive) {
      this.loginActive = false;
    }
  }.bind(this));

};
goog.inherits(gmf.AbstractDesktopController, gmf.AbstractController);


gmf.module.controller(
    'AbstractDesktopController',
    gmf.AbstractDesktopController);
