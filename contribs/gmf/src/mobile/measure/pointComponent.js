goog.provide('gmf.mobile.measure.pointComponent');

goog.require('gmf');
goog.require('gmf.raster.RasterService');
goog.require('ngeo.interaction.MeasurePointMobile');
goog.require('ngeo.interaction.MobileDraw');

/** @suppress {extraRequire} */
goog.require('ngeo.misc.debounce');
goog.require('ngeo.misc.decorate');
goog.require('ol.events');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.mobile.measure.pointComponent = angular.module('', [
  gmf.raster.RasterService.module.name,
]);

gmf.module.requires.push(gmf.mobile.measure.pointComponent.name);


gmf.mobile.measure.pointComponent.value('gmfMobileMeasurePointTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} The template url.
     */
  (element, attrs) => {
    const templateUrl = attrs['gmfMobileMeasurePointTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseModuleTemplateUrl}/mobile/measure/pointComponent.html`;
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
 * @htmlAttribute {number=} gmf-mobile-measurepoint-Coordinatedecimals number
 *     of decimal to display for the coordinate.
 * @htmlAttribute {Array.<gmf.mobile.measure.pointComponent.LayerConfig>}
 *     gmf-mobile-measurepoint-layersconfig Raster elevation layers to get
 *     information under the point and its configuaration.
 * @htmlAttribute {ol.Map} gmf-mobile-measurepoint-map The map.
 * @htmlAttribute {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction=}
 *     gmf-mobile-measurepoint-sketchstyle A style for the measure point.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfMobileMeasurePointTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasurePoint
 */
gmf.mobile.measure.pointComponent.component_ =
    function(gmfMobileMeasurePointTemplateUrl) {
      return {
        restrict: 'A',
        scope: {
          'active': '=gmfMobileMeasurepointActive',
          'getCoordinateDecimalsFn': '&?gmfMobileMeasurepointCoordinatedecimals',
          'getLayersConfigFn': '&gmfMobileMeasurepointLayersconfig',
          'map': '=gmfMobileMeasurepointMap',
          'sketchStyle': '=?gmfMobileMeasurepointSketchstyle'
        },
        controller: 'GmfMobileMeasurePointController as ctrl',
        bindToController: true,
        templateUrl: gmfMobileMeasurePointTemplateUrl,
        /**
         * @param {!angular.Scope} scope Scope.
         * @param {!angular.JQLite} element Element.
         * @param {!angular.Attributes} attrs Attributes.
         * @param {!gmf.mobile.measure.pointComponent.Controller_} controller Controller.
         */
        link: (scope, element, attrs, controller) => {
          controller.init();
        }
      };
    };


gmf.mobile.measure.pointComponent.directive('gmfMobileMeasurepoint',
  gmf.mobile.measure.pointComponent.component_);


/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$filter} $filter Angular filter service.
 * @param {gmf.raster.RasterService} gmfRaster gmf Raster service.
 * @param {ngeox.miscDebounce} ngeoDebounce ngeo Debounce factory.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
gmf.mobile.measure.pointComponent.Controller_ = function(gettextCatalog, $scope, $filter,
  gmfRaster, ngeoDebounce) {

  /**
   * @type {gmf.raster.RasterService}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {ngeox.miscDebounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.$filter}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type {ol.Map}
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
   * @type {!Array.<gmf.mobile.measure.pointComponent.LayerConfig>}
   * @private
   */
  this.layersConfig;

  /**
   * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction}
   * @export
   */
  this.sketchStyle;

  if (this.sketchStyle === undefined) {
    this.sketchStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.RegularShape({
        stroke: new ol.style.Stroke({
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
   * @type {ngeo.interaction.MeasurePointMobile}
   * @export
   */
  this.measure = new ngeo.interaction.MeasurePointMobile(
    /** @type {ngeox.numberCoordinates} */ (this.$filter_('ngeoNumberCoordinates')), {
      decimals: this.coordinateDecimals,
      sketchStyle: this.sketchStyle
    });

  this.measure.setActive(this.active);
  ngeo.misc.decorate.interaction(this.measure);

  /**
   * @type {ngeo.interaction.MobileDraw}
   * @export
   */
  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
    this.measure.getDrawInteraction());

  ngeo.misc.decorate.interaction(this.drawInteraction);

  /**
   * The key for map view 'propertychange' event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;
};


/**
 * Initialise the controller.
 */
gmf.mobile.measure.pointComponent.Controller_.prototype.init = function() {
  const layersConfig = this['getLayersConfigFn']();
  goog.asserts.assert(Array.isArray(layersConfig));
  this.layersConfig = layersConfig;

  this.map.addInteraction(this.measure);
};


/**
 * Deactivate the directive.
 * @export
 */
gmf.mobile.measure.pointComponent.Controller_.prototype.deactivate = function() {
  this.active = false;
};


/**
 * @param {string} str String to translate.
 * @return {string} The translated text.
 * @export
 */
gmf.mobile.measure.pointComponent.Controller_.prototype.translate = function(str) {
  return this.gettextCatalog_.getString(str);
};


/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for the elevation
 *   service.
 * - on deactivate, unlisten
 * @private
 */
gmf.mobile.measure.pointComponent.Controller_.prototype.handleMeasureActiveChange_ =
    function() {
      if (this.measure.getActive()) {
        const view = this.map.getView();
        this.mapViewPropertyChangeEventKey_ = ol.events.listen(
          view,
          'propertychange',
          this.ngeoDebounce_(
            this.getMeasure_.bind(this), 300, /* invokeApply */ true),
          this);
        this.getMeasure_();
      } else if (this.mapViewPropertyChangeEventKey_) {
        ol.events.unlistenByKey(this.mapViewPropertyChangeEventKey_);
        this.mapViewPropertyChangeEventKey_ = null;
      }
    };


/**
 * Call the elevation service to get information about the measure at
 * the current map center location.
 * @private
 */
gmf.mobile.measure.pointComponent.Controller_.prototype.getMeasure_ = function() {
  const center = this.map.getView().getCenter();
  goog.asserts.assertArray(center);
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


gmf.mobile.measure.pointComponent.controller('GmfMobileMeasurePointController',
  gmf.mobile.measure.pointComponent.Controller_);

/**
 * @typedef {{
 *     name: string,
 *     decimals: (number|undefined),
 *     unit: (string|undefined)
 * }}
 */
gmf.mobile.measure.pointComponent.LayerConfig;
