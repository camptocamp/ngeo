/**
 */
import angular from 'angular';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import googAsserts from 'goog/asserts.js';
import ngeoInteractionMeasurePointMobile from 'ngeo/interaction/MeasurePointMobile.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import * as olEvents from 'ol/events.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

const exports = angular.module('gmfMobileMeasurePoint', [
  gmfRasterRasterService.module.name,
  ngeoMiscDebounce.name,
]);


exports.value('gmfMobileMeasurePointTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasurePointTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/measure/pointComponent';
  });

exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/measure/pointComponent', require('./pointComponent.html'));
});


/**
 * Provide a directive to do a point (coordinate and elevation) measure on the
 * mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurepoint
 *        gmf-mobile-measurepoint-active="ctrl.measurePointActive"
 *        gmf-mobile-measurepoint-layersconfig="::ctrl.measurePointLayers"
 *        gmf-mobile-measurepoint-map="::ctrl.map">
 *      </div>
 *
 * Where ctrl.measurePointLayers is an object like this:
 *
 *      this.measurePointLayers = [
 *        {name: 'srtm', unit: 'm', decimals: 2},
 *        {name: 'wind', {unit: 'km/h'},
 *        {name: 'humidity'}
 *      ];
 *
 * @htmlAttribute {boolean} gmf-mobile-measurepoint-active Used to active
 * or deactivate the component.
 * @htmlAttribute {number=} gmf-mobile-measurepoint-coordinatedecimals number
 *     of decimal to display for the coordinate.
 * @htmlAttribute {Array.<LayerConfig>}
 *     gmf-mobile-measurepoint-layersconfig Raster elevation layers to get
 *     information under the point and its configuaration.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurepoint-map The map.
 * @htmlAttribute {import("ol/style/Style.js").default|Array.<import("ol/style/Style.js").default>|import("ol/StyleFunction.js").default=}
 *     gmf-mobile-measurepoint-sketchstyle A style for the measure point.
 * @param {string|function(!angular.JQLite=, !angular.IAttributes=)}
 *     gmfMobileMeasurePointTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasurePoint
 */
function component(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'getCoordinateDecimalsFn': '&?gmfMobileMeasurepointCoordinatedecimals',
      'getLayersConfigFn': '&gmfMobileMeasurepointLayersconfig',
      'map': '=gmfMobileMeasurepointMap',
      'sketchStyle': '=?gmfMobileMeasurepointSketchstyle',
      'format': '<gmfMobileMeasurepointFormat'
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    /**
     * @param {!angular.IScope} scope Scope.
     * @param {!angular.JQLite} element Element.
     * @param {!angular.IAttributes} attrs Attributes.
     * @param {!import("gmf/mobile/measure.js").default.pointComponent.Controller_} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      controller.init();
    }
  };
}


exports.directive('gmfMobileMeasurepoint', component);


/**
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {import("gmf/raster/RasterService.js").default} gmfRaster gmf Raster service.
 * @param {miscDebounce} ngeoDebounce ngeo Debounce factory.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
function Controller(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce) {

  /**
   * @type {import("gmf/raster/RasterService.js").default}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {miscDebounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.IFilterService}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  $scope.$watch(() => this.active, (newVal) => {
    this.measure.setActive(newVal);
    this.handleMeasureActiveChange_();
  });

  const coordinateDecimalsFn = this['getCoordinateDecimalsFn'];

  /**
   * @type {number}
   * @private
   */
  this.coordinateDecimals = coordinateDecimalsFn ? coordinateDecimalsFn() : 0;

  /**
   * @type {!Array.<LayerConfig>}
   * @private
   */
  this.layersConfig;

  /**
   * @type {import("ol/style/Style.js").default|Array.<import("ol/style/Style.js").default>|import("ol/StyleFunction.js").default}
   * @export
   */
  this.sketchStyle;

  if (this.sketchStyle === undefined) {
    this.sketchStyle = new olStyleStyle({
      fill: new olStyleFill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new olStyleStroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new olStyleRegularShape({
        stroke: new olStyleStroke({
          color: 'rgba(0, 0, 0, 0.7)',
          width: 2
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0
      })
    });
  }

  /**
   * @type {string}
   */
  this.format;

  /**
   * @type {import("ngeo/interaction/MeasurePointMobile.js").default}
   * @export
   */
  this.measure;

  /**
   * @type {import("ngeo/interaction/MobileDraw.js").default}
   * @export
   */
  this.drawInteraction;

  /**
   * The key for map view 'propertychange' event.
   * @type {?import("ol/EventsKey.js").default}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;
}


/**
 * Initialise the controller.
 */
Controller.prototype.init = function() {
  this.measure = new ngeoInteractionMeasurePointMobile(
    /** @type {numberCoordinates} */ (this.$filter_('ngeoNumberCoordinates')),
    this.format || '{x}, {y}',
    {
      decimals: this.coordinateDecimals,
      sketchStyle: this.sketchStyle
    }
  );
  this.measure.setActive(this.active);
  ngeoMiscDecorate.interaction(this.measure);
  this.drawInteraction = /** @type {import("ngeo/interaction/MobileDraw.js").default} */ (this.measure.getDrawInteraction());
  ngeoMiscDecorate.interaction(this.drawInteraction);

  const layersConfig = this['getLayersConfigFn']();
  googAsserts.assert(Array.isArray(layersConfig));
  this.layersConfig = layersConfig;

  this.map.addInteraction(this.measure);
};


/**
 * Deactivate the directive.
 * @export
 */
Controller.prototype.deactivate = function() {
  this.active = false;
};


/**
 * @param {string} str String to translate.
 * @return {string} The translated text.
 * @export
 */
Controller.prototype.translate = function(str) {
  return this.gettextCatalog_.getString(str);
};


/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for the elevation
 *   service.
 * - on deactivate, unlisten
 * @private
 */
Controller.prototype.handleMeasureActiveChange_ = function() {
  if (this.measure.getActive()) {
    const view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = olEvents.listen(
      view,
      'propertychange',
      this.ngeoDebounce_(
        this.getMeasure_.bind(this), 300, /* invokeApply */ true),
      this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    olEvents.unlistenByKey(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};


/**
 * Call the elevation service to get information about the measure at
 * the current map center location.
 * @private
 */
Controller.prototype.getMeasure_ = function() {
  const center = this.map.getView().getCenter();
  googAsserts.assertArray(center);
  const params = {
    'layers': this.layersConfig.map(config => config.name).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then((object) => {
    const el = this.measure.getTooltipElement();
    const ctn = document.createElement('div');
    const className = 'gmf-mobile-measure-point';
    ctn.className = className;

    for (const config of this.layersConfig) {
      const key = config.name;
      if (key in object) {
        let value = object[key];
        const childEl = document.createElement('div');
        childEl.className = `gmf-mobile-measure-point-${key}`;
        const unit = config.unit || '';
        const decimals = config.decimals && config.decimals > 0 || 0;
        value = this.$filter_('number')(value, decimals);
        childEl.innerHTML = [this.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }

    const previousCtn = el.getElementsByClassName(className);
    if (previousCtn[0]) {
      previousCtn[0].remove();
    }
    el.appendChild(ctn);

  });
};


exports.controller('GmfMobileMeasurePointController', Controller);

/**
 * @typedef {{
 *     name: string,
 *     decimals: (number|undefined),
 *     unit: (string|undefined)
 * }} LayerConfig
 */


export default exports;
