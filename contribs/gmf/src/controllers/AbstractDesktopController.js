goog.provide('gmf.controllers.AbstractDesktopController');

// webpack: import 'jquery-ui/ui/widgets/tooltip.js';
goog.require('gmf.controllers.AbstractAppController');
goog.require('gmf.contextualdata.module');
goog.require('gmf.drawing.module');
goog.require('gmf.editing.module');
goog.require('gmf.permalink.shareComponent');
goog.require('gmf.print.component');
goog.require('gmf.profile.module');
goog.require('gmf.raster.component');
goog.require('ngeo.draw.features');
goog.require('ngeo.map.resizemap');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.query.bboxQueryComponent');
goog.require('ol');
goog.require('ol.proj');
goog.require('ol.obj');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.control.Rotate');
goog.require('ol.interaction');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


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
 * @extends {gmf.controllers.AbstractAppController}
 * @ngdoc controller
 * @ngInject
 * @export
 */
gmf.controllers.AbstractDesktopController = function(config, $scope, $injector) {

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
      new ol.control.ScaleLine({
        target: document.getElementById('scaleline')
      }),
      new ol.control.Zoom({
        zoomInTipLabel: '',
        zoomOutTipLabel: ''
      }),
      new ol.control.Rotate({
        label: arrow,
        tipLabel: ''
      })
    ],
    interactions: config.mapInteractions || ol.interaction.defaults({
      pinchRotate: true,
      altShiftDragRotate: true
    }),
    loadTilesWhileAnimating: true,
    loadTilesWhileInteracting: true
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

  /**
   * @type {boolean}
   * @export
   */
  this.googleStreetViewActive = false;

  /**
   * @type {!ol.style.Style}
   * @export
   */
  this.googleStreetViewStyle = new ol.style.Style({
    text: new ol.style.Text({
      fill: new ol.style.Fill({color: '#279B61'}),
      font: 'normal 30px FontAwesome',
      offsetY: -15,
      stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
      text: '\uf041'
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.importDataSourceActive = false;

  const body = $('body');

  // initialize tooltips
  body.tooltip({
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="tooltip"]'
  });

  // deactivate tooltips on touch device
  body.on('touchstart.detectTouch', () => {
    body.tooltip('destroy');
    body.off('touchstart.detectTouch');
  });

  /**
   * Collection of features for the draw interaction
   * @type {ol.Collection.<ol.Feature>}
   */
  const ngeoFeatures = $injector.get('ngeoFeatures');

  /**
   * @type {ngeo.map.FeatureOverlay}
   * @export
   */
  this.drawFeatureLayer = $injector.get('ngeoFeatureOverlayMgr')
    .getFeatureOverlay();
  this.drawFeatureLayer.setFeatures(ngeoFeatures);

  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.editFeatureVectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: new ol.Collection()
    }),
    style: (feature, resolution) => ngeoFeatureHelper.createEditingStyles(feature)
    // style: ngeoFeatureHelper.createEditingStyles.bind(ngeoFeatureHelper)
  });
  this.editFeatureVectorLayer.setMap(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.misc.ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  const editFeatureActivate = new ngeo.misc.ToolActivate(this, 'editFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', editFeatureActivate, false);

  const googleStreetViewActivate = new ngeo.misc.ToolActivate(
    this,
    'googleStreetViewActive'
  );
  ngeoToolActivateMgr.registerTool('mapTools', googleStreetViewActivate, false);

  /**
   * @type {ngeox.ScaleselectorOptions}
   * @export
   */
  this.scaleSelectorOptions = {
    dropup: true
  };

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

  gmf.controllers.AbstractAppController.call(this, config, $scope, $injector);

  // Close the login panel on successful login.
  $scope.$watch(() => this.gmfUser.username, (newVal) => {
    if (newVal !== null && this.loginActive) {
      this.loginActive = false;
    }
  });
};
ol.inherits(gmf.controllers.AbstractDesktopController, gmf.controllers.AbstractAppController);

gmf.controllers.AbstractDesktopController.module = angular.module('GmfAbstractDesktopControllerModule', [
  gmf.controllers.AbstractAppController.module.name,
  gmf.contextualdata.module.name,
  gmf.drawing.module.name,
  gmf.editing.module.name,
  gmf.permalink.shareComponent.name,
  gmf.print.component.name,
  gmf.profile.module.name,
  gmf.raster.component.name,
  ngeo.draw.features.name,
  ngeo.map.resizemap.name,
  ngeo.query.bboxQueryComponent.name,
]);

gmf.controllers.AbstractDesktopController.module.controller(
  'AbstractDesktopController',
  gmf.controllers.AbstractDesktopController);

gmf.controllers.AbstractDesktopController.module.value('isDesktop', true);

gmf.controllers.AbstractDesktopController.module.value('ngeoQueryOptions', {
  'limit': 20
});

gmf.controllers.AbstractDesktopController.module.value('ngeoMeasurePrecision', 3);
gmf.controllers.AbstractDesktopController.module.value('ngeoMeasureDecimals', 0);
