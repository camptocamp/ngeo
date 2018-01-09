goog.provide('gmf.raster.component');

goog.require('gmf');
goog.require('gmf.raster.RasterService');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.debounce');
goog.require('ol.events');


/**
 * @type {!angular.Module}
 */
gmf.raster.component = angular.module('gmfRasterComponent', [
  gmf.raster.RasterService.module.name,
  ngeo.misc.debounce.name,
]);

gmf.module.requires.push(gmf.raster.component.name);


/**
 * Provide a directive that set a value each 500ms with the elevation under the
 * mouse cursor position on the map. The value must come from the elevation
 * service of a c2cgeoportal server. The server's URL must be defined as
 * config value of the application.
 *
 * Example:
 *
 *      <span gmf-elevation
 *            gmf-elevation-active="elevationActive"
 *            gmf-elevation-elevation="elevationValue"
 *            gmf-elevation-layer="mainCtrl.elevationLayer"
 *            gmf-elevation-map="::mainCtrl.map">
 *            {{elevationValue | number:2}}m
 *      </span>
 *
 *
 * @htmlAttribute {boolean} gmf-elevation-active A boolean to set active or
 *     deactive the component.
 * @htmlAttribute {number} gmf-elevation-elevation The value to set with the
 *     elevation value.
 * @htmlAttribute {string} gmf-elevation-layer Elevation layer to use.
 * @htmlAttribute {ol.Map} gmf-elevation-map The map.
 * @return {angular.Directive} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfElevation
 */
gmf.raster.component.component_ = function() {
  return {
    restrict: 'A',
    controller: 'GmfElevationController as ctrl',
    bindToController: true,
    scope: {
      'active': '<gmfElevationActive',
      'elevation': '=gmfElevationElevation',
      'loading': '=?gmfElevationLoading',
      'layer': '<gmfElevationLayer',
      'map': '=gmfElevationMap'
    },
    link: (scope, element, attr) => {
      const ctrl = scope['ctrl'];

      // Watch active or not.
      scope.$watch(() => ctrl.active, function(active) {
        this.toggleActive_(active);
      }.bind(ctrl));

      // Watch current layer.
      scope.$watch(() => ctrl.layer, function(layer) {
        this.layer = layer;
        this.elevation = null;
      }.bind(ctrl));
    }
  };
};


gmf.raster.component.directive('gmfElevation', gmf.raster.component.component_);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {ngeox.miscDebounce} ngeoDebounce Ngeo debounce factory
 * @param {gmf.raster.RasterService} gmfRaster Gmf Raster service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfElevationController
 */
gmf.raster.component.Controller_ = function($scope, ngeoDebounce, gmfRaster) {

  /**
   * @type {ngeox.miscDebounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {gmf.raster.RasterService}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {boolean}
   */
  this.active;

  /**
   * @type {!number|undefined}
   * @export
   */
  this.elevation;

  /**
   * @type {string}
   */
  this.layer;

  /**
   * @type {ol.Map}
   */
  this.map;

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {boolean}
   * @private
   */
  this.inViewport_ = false;

  /**
   * @type {boolean}
   * @export
   */
  this.loading = false;
};

/**
 * Active or deactive the request of the raster each 500 ms on pointermove.
 * @param {boolean} active true to make requests.
 * @private
 */
gmf.raster.component.Controller_.prototype.toggleActive_ = function(active) {
  this.elevation = undefined;
  if (active) {
    goog.asserts.assert(this.listenerKeys_.length === 0);

    // Moving the mouse clears previously displayed elevation
    this.listenerKeys_.push(ol.events.listen(this.map, 'pointermove',
      function(e) {
        this.scope_.$apply(() => {
          this.inViewport_ = true;
          this.elevation = undefined;
          this.loading = false;
        });
      }, this));

    // Launch the elevation service request when the user stops moving the
    // mouse for less short delay
    this.listenerKeys_.push(ol.events.listen(this.map, 'pointermove',
      this.ngeoDebounce_(this.pointerStop_.bind(this), 500, true)
    ));

    this.listenerKeys_.push(ol.events.listen(this.map.getViewport(), 'mouseout', () => {
      this.scope_.$apply(() => {
        this.elevation = undefined;
        this.inViewport_ = false;
        this.loading = false;
      });
    }));
  } else {
    this.elevation = undefined;
    this.listenerKeys_.forEach(ol.events.unlistenByKey);
    this.listenerKeys_.length = 0;
  }
};


/**
 * Request data from a raster from a MapBrowserPointerEvent's coordinates.
 * Called when the user stopped moving the mouse for 500ms.
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
gmf.raster.component.Controller_.prototype.pointerStop_ = function(e) {
  if (this.inViewport_) {
    this.loading = true;
    const params = {
      'layers': this.layer
    };
    this.gmfRaster_.getRaster(e.coordinate, params).then(
      this.getRasterSuccess_.bind(this),
      this.getRasterError_.bind(this)
    );
  }
};


/**
 * @param {Object.<string, number>} resp Response of the get Raster service.
 * @private
 */
gmf.raster.component.Controller_.prototype.getRasterSuccess_ = function(resp) {
  goog.asserts.assert(this.layer, 'A layer should be selected');
  this.elevation = resp[this.layer];
  this.loading = false;
};


/**
 * @private
 */
gmf.raster.component.Controller_.prototype.getRasterError_ = function() {
  console.error('Error on getting the raster.');
  this.elevation = undefined;
  this.loading = false;
};


gmf.raster.component.controller('GmfElevationController', gmf.raster.component.Controller_);


/**
 * Provides a component which encapsulates the elevation component (see above)
 * in a button with dropdown menu to be included in a application directly.
 *
 * Example:
 *  <gmf-elevationwidget
 *      gmf-elevationwidget-map="::mainCtrl.map"
 *      gmf-elevationwidget-layers="::mainCtrl.elevationLayers"
 *      gmf-elevationwidget-active="mainCtrl.showInfobar">
 *  </gmf-elevationwidget>
 *
 * @htmlAttribute {ol.Map} gmf-elevationwidget-map The map.
 * @htmlAttribute {Array.<string>} gmf-elevationwidget-layers The list of
 *     layers.
 * @htmlAttribute {boolean} gmf-elevationwidget-active Whether to activate the
 *     elevation component.
 *
 * @ngdoc component
 * @ngname gmfElevationwidget
 */
gmf.raster.component.widgetComponent_ = {
  controller: 'gmfElevationwidgetController as ctrl',
  bindings: {
    'map': '<gmfElevationwidgetMap',
    'layers': '<gmfElevationwidgetLayers',
    'active': '<gmfElevationwidgetActive'
  },
  templateUrl: () => `${gmf.baseModuleTemplateUrl}/raster/widgetComponent.html`
};
gmf.raster.component.component('gmfElevationwidget', gmf.raster.component.widgetComponent_);


/**
 * @constructor
 * @private
 * @ngdoc controller
 */
gmf.raster.component.WidgetController_ = function() {
  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {!Array.<string>}
   * @export
   */
  this.layers;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {string}
   * @export
   */
  this.selectedElevationLayer;
};


gmf.raster.component.WidgetController_.prototype.$onInit = function() {
  this.selectedElevationLayer = this.layers[0];
};


gmf.raster.component.controller('gmfElevationwidgetController',
  gmf.raster.component.WidgetController_);
