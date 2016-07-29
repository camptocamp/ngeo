goog.provide('gmf.AbstractDesktopController');

goog.require('gmf');
goog.require('gmf.AbstractController');
/** @suppress {extraRequire} */
goog.require('ngeo.bboxQueryDirective');
/** @suppress {extraRequire} */
goog.require('gmf.drawfeatureDirective');
/** @suppress {extraRequire} */
goog.require('gmf.editfeatureselectorDirective');
/** @suppress {extraRequire} */
goog.require('gmf.elevationDirective');
/** @suppress {extraRequire} */
goog.require('gmf.mousepositionDirective');
/** @suppress {extraRequire} */
goog.require('gmf.printDirective');
/** @suppress {extraRequire} */
goog.require('gmf.profileDirective');
/** @suppress {extraRequire} */
goog.require('gmf.drawprofilelineDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.DatePickerDirective');
/** @suppress {extraRequire} */
goog.require('gmf.TimeSliderDirective');
/** @suppress {extraRequire} */
goog.require('gmf.shareDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.resizemapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.Features');
/** @suppress {extraRequire} */
goog.require('ngeo.FeatureOverlay');
/** @suppress {extraRequire} */
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.ScaleselectorOptions');
/** @suppress {extraRequire} */
goog.require('ngeo.scaleselectorDirective');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.interaction');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

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

  /**
   * @type {boolean}
   * @export
   */
  this.modalShareShown = false;

  /**
   * @type {boolean}
   * @export
   */
  this.editFeatureActive = false;

  // initialize tooltips
  $('body').tooltip({
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="tooltip"]'
  });

  /**
   * Collection of features for the draw interaction
   * @type {ol.Collection.<ol.Feature>}
   */
  var ngeoFeatures = $injector.get('ngeoFeatures');

  /**
   * @type {ngeo.FeatureOverlay}
   * @export
   */
  this.drawFeatureLayer = $injector.get('ngeoFeatureOverlayMgr')
      .getFeatureOverlay();
  this.drawFeatureLayer.setFeatures(ngeoFeatures);

  var ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.editFeatureVectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: new ol.Collection()
    }),
    style: function(feature, resolution) {
      return ngeoFeatureHelper.createEditingStyles(feature);
    }
    // style: ngeoFeatureHelper.createEditingStyles.bind(ngeoFeatureHelper)
  });
  this.editFeatureVectorLayer.setMap(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.ToolActivateMgr}
   */
  var ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  var editFeatureActivate = new ngeo.ToolActivate(this, 'editFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', editFeatureActivate, false);

  /**
   * @type {ngeo.ScaleselectorOptions}
   * @export
   */
  this.scaleSelectorOptions = {
    'dropup': true
  };

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

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
