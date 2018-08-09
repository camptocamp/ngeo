/**
 * @module gmf.raster.component
 */
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import googAsserts from 'goog/asserts.js';

/** @suppress {extraRequire} */
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';

import * as olEvents from 'ol/events.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfRasterComponent', [
  gmfRasterRasterService.module.name,
  ngeoMiscDebounce.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/raster/widgetComponent', require('./widgetComponent.html'));
});


exports.value('gmfElevationwidgetTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfElevationwidgetTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/raster/widgetComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfElevationwidgetTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfElevationwidgetTemplateUrl($attrs, gmfElevationwidgetTemplateUrl) {
  return gmfElevationwidgetTemplateUrl($attrs);
}


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
exports.component_ = function() {
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


exports.directive('gmfElevation', exports.component_);

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
exports.Controller_ = function($scope, ngeoDebounce, gmfRaster) {

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
exports.Controller_.prototype.toggleActive_ = function(active) {
  this.elevation = undefined;
  if (active) {
    googAsserts.assert(this.listenerKeys_.length === 0);

    // Moving the mouse clears previously displayed elevation
    this.listenerKeys_.push(olEvents.listen(this.map, 'pointermove',
      function(e) {
        this.scope_.$apply(() => {
          this.inViewport_ = true;
          this.elevation = undefined;
          this.loading = false;
        });
      }, this));

    // Launch the elevation service request when the user stops moving the
    // mouse for less short delay
    this.listenerKeys_.push(olEvents.listen(this.map, 'pointermove',
      this.ngeoDebounce_(this.pointerStop_.bind(this), 500, true)
    ));

    this.listenerKeys_.push(olEvents.listen(this.map.getViewport(), 'mouseout', () => {
      this.scope_.$apply(() => {
        this.elevation = undefined;
        this.inViewport_ = false;
        this.loading = false;
      });
    }));
  } else {
    this.elevation = undefined;
    this.listenerKeys_.forEach(olEvents.unlistenByKey);
    this.listenerKeys_.length = 0;
  }
};


/**
 * Request data from a raster from a MapBrowserPointerEvent's coordinates.
 * Called when the user stopped moving the mouse for 500ms.
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
exports.Controller_.prototype.pointerStop_ = function(e) {
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
exports.Controller_.prototype.getRasterSuccess_ = function(resp) {
  googAsserts.assert(this.layer, 'A layer should be selected');
  this.elevation = resp[this.layer];
  this.loading = false;
};


/**
 * @private
 */
exports.Controller_.prototype.getRasterError_ = function() {
  console.error('Error on getting the raster.');
  this.elevation = undefined;
  this.loading = false;
};


exports.controller('GmfElevationController', exports.Controller_);


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
exports.widgetComponent_ = {
  controller: 'gmfElevationwidgetController as ctrl',
  bindings: {
    'map': '<gmfElevationwidgetMap',
    'layers': '<gmfElevationwidgetLayers',
    'active': '<gmfElevationwidgetActive'
  },
  templateUrl: gmfElevationwidgetTemplateUrl
};
exports.component('gmfElevationwidget', exports.widgetComponent_);


/**
 * @constructor
 * @private
 * @ngdoc controller
 */
exports.WidgetController_ = function() {
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


exports.WidgetController_.prototype.$onInit = function() {
  this.selectedElevationLayer = this.layers[0];
};


exports.controller('gmfElevationwidgetController',
  exports.WidgetController_);


export default exports;
