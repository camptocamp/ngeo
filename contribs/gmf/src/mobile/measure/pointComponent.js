import angular from 'angular';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import ngeoInteractionMeasurePointMobile from 'ngeo/interaction/MeasurePointMobile.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import {interactionDecoration} from 'ngeo/misc/decorate.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import MobileDraw from 'ngeo/interaction/MobileDraw.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMobileMeasurePoint', [
  gmfRasterRasterService.name,
  ngeoMiscDebounce.name,
]);


module.value('gmfMobileMeasurePointTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
    return templateUrl !== undefined ? templateUrl :
      'gmf/measure/pointComponent';
  });


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
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
 * @htmlAttribute {LayerConfig[]}
 *     gmf-mobile-measurepoint-layersconfig Raster elevation layers to get
 *     information under the point and its configuaration.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurepoint-map The map.
 * @htmlAttribute {import("ol/style/Style.js").StyleLike=}
 *     gmf-mobile-measurepoint-sketchstyle A style for the measure point.
 * @param {string|function(JQuery=, angular.IAttributes=): string}
 *     gmfMobileMeasurePointTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasurePoint
 */
function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
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
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}


module.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);


/**
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {import("gmf/raster/RasterService.js").RasterService} gmfRaster gmf Raster service.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo Debounce factory.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
export function MobileMeasurePointController(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce) {

  /**
   * @type {import("gmf/raster/RasterService.js").RasterService}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>}
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
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  this.getCoordinateDecimalsFn = () => 0;

  $scope.$watch(() => this.active, (newVal) => {
    if (!this.measure) {
      throw new Error('Missing measure');
    }
    this.measure.setActive(newVal);
    this.handleMeasureActiveChange_();
  });

  const coordinateDecimalsFn = this.getCoordinateDecimalsFn;

  /**
   * @type {number}
   * @private
   */
  this.coordinateDecimals = coordinateDecimalsFn ? coordinateDecimalsFn() : 0;

  /**
   * @type {LayerConfig[]}
   * @private
   */
  this.layersConfig = [];

  /**
   * @type {import("ol/style/Style.js").StyleLike}
   */
  this.sketchStyle = [];

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
   * @type {?string}
   */
  this.format = null;

  /**
   * @type {?import("ngeo/interaction/MeasurePointMobile.js").default}
   */
  this.measure = null;

  /**
   * @type {?import("ngeo/interaction/MobileDraw.js").default}
   */
  this.drawInteraction = null;

  /**
   * @type {() => LayerConfig[]}
   */
  this.getLayersConfigFn = () => [];

  /**
   * The key for map view 'propertychange' event.
   * @type {?import("ol/events.js").EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;
}


/**
 * Initialise the controller.
 */
MobileMeasurePointController.prototype.init = function() {
  this.measure = new ngeoInteractionMeasurePointMobile(
    /** @type {import('ngeo/misc/filters.js').numberCoordinates} */ (this.$filter_('ngeoNumberCoordinates')),
    this.format || '{x}, {y}',
    {
      decimals: this.coordinateDecimals,
      sketchStyle: this.sketchStyle
    }
  );
  this.measure.setActive(this.active);
  interactionDecoration(this.measure);
  const drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof MobileDraw)) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  interactionDecoration(this.drawInteraction);

  const layersConfig = this.getLayersConfigFn();
  if (!Array.isArray(layersConfig)) {
    throw new Error('Wrong layersConfig type');
  }
  this.layersConfig = layersConfig;

  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measure);
};


/**
 * Deactivate the directive.
 */
MobileMeasurePointController.prototype.deactivate = function() {
  this.active = false;
};


/**
 * @param {string} str String to translate.
 * @return {string} The translated text.
 */
MobileMeasurePointController.prototype.translate = function(str) {
  return this.gettextCatalog_.getString(str);
};


/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for the elevation
 *   service.
 * - on deactivate, unlisten
 * @private
 * @hidden
 */
MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function() {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  if (this.measure.getActive()) {
    const view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = listen(view, 'propertychange', this.ngeoDebounce_(
      this.getMeasure_.bind(this), 300, /* invokeApply */ true
    ), this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    unlistenByKey(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};


/**
 * Call the elevation service to get information about the measure at
 * the current map center location.
 * @private
 * @hidden
 */
MobileMeasurePointController.prototype.getMeasure_ = function() {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const center = this.map.getView().getCenter();
  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }
  const params = {
    'layers': this.layersConfig.map(config => config.name).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then((object) => {
    if (!this.measure) {
      throw new Error('Missing measure');
    }
    const el = this.measure.getTooltipElement();
    const ctn = document.createElement('div');
    const className = 'gmf-mobile-measure-point';
    ctn.className = className;

    for (const config of this.layersConfig) {
      const key = config.name;
      if (key in object) {
        /** @type {string|number} */
        let value = object[key];
        const childEl = document.createElement('div');
        childEl.className = `gmf-mobile-measure-point-${key}`;
        const unit = config.unit || '';
        const decimals = config.decimals > 0 ? config.decimals : 0;
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


module.controller('GmfMobileMeasurePointController', MobileMeasurePointController);

/**
 * @typedef {Object} LayerConfig
 * @property {string} name
 * @property {number} [decimals]
 * @property {string} [unit]
 */


export default module;
