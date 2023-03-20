import angular from 'angular';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';

import ngeoMiscDebounce from 'ngeo/misc/debounce.js';

import * as olEvents from 'ol/events.js';

import 'bootstrap/js/src/dropdown.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfRasterComponent', [gmfRasterRasterService.name, ngeoMiscDebounce.name]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/raster/widgetComponent', require('./widgetComponent.html'));
  }
);

module.value(
  'gmfElevationwidgetTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfElevationwidgetTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'gmf/raster/widgetComponent';
  }
);

/**
 * @hidden
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfElevationwidgetTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 *            gmf-elevation-layersconfig="::mainCtrl.elevationLayersConfig"
 *            gmf-elevation-map="::mainCtrl.map">
 *            {{elevationValue}}
 *      </span>
 *
 *  For value in meter `elevationLayersConfig` can be an empty object, complex example:
 *
 *      elevationLayersConfig = {
 *          '<layer>': {
 *              'filter': 'ngeoUnitPrefix',
 *              'args': ['m²', 'square'],
 *              'postfix': '<notice>',
 *              'separator': ''
 *          }
 *      };
 *
 *
 * @htmlAttribute {boolean} gmf-elevation-active A boolean to set active or
 *     deactivate the component.
 * @htmlAttribute {number} gmf-elevation-elevation The value to set with the
 *     elevation value.
 * @htmlAttribute {string} gmf-elevation-layer Elevation layer to use.
 * @htmlAttribute {Object.<string, LayerConfig>} gmf-elevation-layersconfig Elevation layer configurations.
 * @htmlAttribute {import("ol/Map.js").default} gmf-elevation-map The map.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfElevation
 */
function rasterComponent() {
  return {
    restrict: 'A',
    controller: 'GmfElevationController as ctrl',
    bindToController: true,
    scope: {
      'active': '<gmfElevationActive',
      'elevation': '=gmfElevationElevation',
      'layersconfig': '=gmfElevationLayersconfig',
      'loading': '=?gmfElevationLoading',
      'layer': '<gmfElevationLayer',
      'map': '=gmfElevationMap',
    },
    link: (scope, element, attr) => {
      const ctrl = scope['ctrl'];

      // Watch active or not.
      scope.$watch(
        () => ctrl.active,
        function (active) {
          this.toggleActive_(active);
        }.bind(ctrl)
      );

      // Watch current layer.
      scope.$watch(
        () => ctrl.layer,
        function (layer) {
          this.layer = layer;
          this.elevation = null;
        }.bind(ctrl)
      );
    },
  };
}

module.directive('gmfElevation', rasterComponent);

/**
 * @hidden
 * @param {!angular.IScope} $scope Scope.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @param {!import("ngeo/misc/debounce.js").miscDebounce<function(import("ol/MapBrowserPointerEvent.js").default): void>} ngeoDebounce Ngeo debounce factory
 * @param {!import("gmf/raster/RasterService.js").RasterService} gmfRaster Gmf Raster service
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfElevationController
 */
function Controller($scope, $filter, ngeoDebounce, gmfRaster, gettextCatalog) {
  /**
   * @private
   */
  this.filter_ = $filter;

  /**
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @private
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {!Object.<string, LayerConfig>}
   * @private
   */
  this.layersconfig;

  /**
   * @type {boolean}
   */
  this.active;

  /**
   * @type {!string|undefined}
   */
  this.elevation;

  /**
   * @type {string}
   */
  this.layer;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {Array.<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {angular.IScope}
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
   */
  this.loading = false;
}

/**
 * Activate or deactivate the request of the raster each 500 ms on pointermove.
 * @param {boolean} active true to make requests.
 * @private
 */
Controller.prototype.toggleActive_ = function (active) {
  this.elevation = undefined;
  if (active) {
    console.assert(this.listenerKeys_.length === 0);

    // Moving the mouse clears previously displayed elevation
    /**
     * @param {Event|import("ol/events/Event.js").default} event The event
     * @return {void}
     */
    const listen = (event) => {
      this.scope_.$apply(() => {
        this.inViewport_ = true;
        this.elevation = undefined;
        this.loading = false;
      });
    };
    this.listenerKeys_.push(olEvents.listen(this.map, 'pointermove', listen));

    // Launch the elevation service request when the user stops moving the
    // mouse for less short delay
    this.listenerKeys_.push(
      olEvents.listen(this.map, 'pointermove', this.ngeoDebounce_(this.pointerStop_.bind(this), 500, true))
    );

    this.listenerKeys_.push(
      olEvents.listen(this.map.getViewport(), 'mouseout', () => {
        this.scope_.$apply(() => {
          this.elevation = undefined;
          this.inViewport_ = false;
          this.loading = false;
        });
      })
    );
  } else {
    this.elevation = undefined;
    this.listenerKeys_.forEach(olEvents.unlistenByKey);
    this.listenerKeys_.length = 0;
  }
};

/**
 * Request data from a raster from a MapBrowserPointerEvent's coordinates.
 * Called when the user stopped moving the mouse for 500ms.
 * @param {import("ol/MapBrowserPointerEvent.js").default} e An ol map browser pointer event.
 * @private
 */
Controller.prototype.pointerStop_ = function (e) {
  if (this.inViewport_) {
    this.loading = true;
    const params = {
      'layers': this.layer,
    };
    this.gmfRaster_
      .getRaster(e.coordinate, params)
      .then(this.getRasterSuccess_.bind(this), this.getRasterError_.bind(this));
  }
};

/**
 * @param {Object.<string, number>} resp Response of the get Raster service.
 * @private
 */
Controller.prototype.getRasterSuccess_ = function (resp) {
  console.assert(this.layer, 'A layer should be selected');
  const value = resp[this.layer];
  if (value !== undefined && value !== null) {
    const options = this.layersconfig[this.layer] || {};
    const filter = options.filter || 'number';
    const custom_args = options.args || [];
    const postfix = options.hasOwnProperty('postfix') ? options.postfix : 'm';
    const separator =
      postfix.length > 0 ? (options.hasOwnProperty('separator') ? options.separator : '\u00a0') : '';
    const args = Array.prototype.concat([value], custom_args);
    this.elevation = this.filter_(filter)(...args) + separator + postfix;
  } else {
    const gettextCatalog = this.gettextCatalog;
    this.elevation = gettextCatalog.getString('No value');
  }
  this.loading = false;
};

/**
 * @private
 */
Controller.prototype.getRasterError_ = function () {
  console.error('Error on getting the raster.');
  this.elevation = undefined;
  this.loading = false;
};

module.controller('GmfElevationController', Controller);

/**
 * Provides a component which encapsulates the elevation component (see above)
 * in a button with dropdown menu to be included in a application directly.
 *
 * Example:
 *  <gmf-elevationwidget
 *      gmf-elevationwidget-map="::mainCtrl.map"
 *      gmf-elevationwidget-layers="::mainCtrl.elevationLayers"
 *      gmf-elevationwidget-layersconfig="::mainCtrl.elevationLayersConfig"
 *      gmf-elevationwidget-active="mainCtrl.showInfobar">
 *  </gmf-elevationwidget>
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-elevationwidget-map The map.
 * @htmlAttribute {Array.<string>} gmf-elevationwidget-layers The list of
 *     layers.
 * @htmlAttribute {boolean} gmf-elevationwidget-active Whether to activate the
 *     elevation component.
 *
 * @ngdoc component
 * @ngname gmfElevationwidget
 */
const rasterWidgetComponent = {
  controller: 'gmfElevationwidgetController as ctrl',
  bindings: {
    'map': '<gmfElevationwidgetMap',
    'layers': '<gmfElevationwidgetLayers',
    'layersconfig': '=gmfElevationwidgetLayersconfig',
    'active': '<gmfElevationwidgetActive',
  },
  templateUrl: gmfElevationwidgetTemplateUrl,
};
module.component('gmfElevationwidget', rasterWidgetComponent);

/**
 * @constructor
 * @private
 * @hidden
 * @ngdoc controller
 */
function WidgetController() {
  /**
   * @type {!import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {!Array.<string>}
   */
  this.layers;

  /**
   * @type {!Object.<string, LayerConfig>}
   * @private
   */
  this.layersconfig;

  /**
   * @type {boolean}
   */
  this.active;

  /**
   * @type {string}
   */
  this.selectedElevationLayer;
}

WidgetController.prototype.$onInit = function () {
  this.selectedElevationLayer = this.layers[0];
};

module.controller('gmfElevationwidgetController', WidgetController);

/**
 * @typedef {Object} LayerConfig
 * @property {string} [filter]
 * @property {Array.<string>} [args]
 * @property {string} [postfix]
 * @property {string} [separator]
 */

export default module;
