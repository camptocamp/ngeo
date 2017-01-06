goog.provide('gmf.MobileMeasurePointController');
goog.provide('gmf.mobileMeasurepointDirective');

goog.require('gmf');
goog.require('gmf.Altitude');
goog.require('ngeo.Debounce');
goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.interaction.MeasurePointMobile');
goog.require('ngeo.interaction.MobileDraw');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


gmf.module.value('gmfMobileMeasurePointTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} The template url.
     */
    function(element, attrs) {
      const templateUrl = attrs['gmfMobileMeasurePointTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          `${gmf.baseTemplateUrl}/mobilemeasurepoint.html`;
    });


/**
 * Provide a directive to do a point (coordinate and elevation) measure on the
 * mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurepoint=""
 *        gmf-mobile-measurepoint-active="ctrl.measurePointActive"
 *        gmf-mobile-measurepoint-layers="::ctrl.measurePointLayers"
 *        gmf-mobile-measurepoint-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurepoint-active Used to active
 * or deactivate the component.
 * @htmlAttribute {number=} gmf-mobile-measurepoint-decimals number of decimal
 *     to display
 * @htmlAttribute {Array.<string>} gmf-mobile-measurepoint-layers Raster
 *     elevation layers to get information under the point.
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
gmf.mobileMeasurePointDirective =
    function(gmfMobileMeasurePointTemplateUrl) {
      return {
        restrict: 'A',
        scope: {
          'active': '=gmfMobileMeasurepointActive',
          'decimals': '<?gmfMobileMeasurepointDecimals',
          'getLayersFn': '&gmfMobileMeasurepointLayers',
          'map': '=gmfMobileMeasurepointMap',
          'sketchStyle': '=?gmfMobileMeasurepointSketchstyle'
        },
        controller: 'GmfMobileMeasurePointController as ctrl',
        bindToController: true,
        templateUrl: gmfMobileMeasurePointTemplateUrl
      };
    };


gmf.module.directive('gmfMobileMeasurepoint',
                     gmf.mobileMeasurePointDirective);


/**
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Altitude} gmfAltitude gmf altitude service.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
gmf.MobileMeasurePointController = function(gettextCatalog, $scope, gmfAltitude,
    ngeoDebounce, ngeoDecorateInteraction) {

  /**
   * @type {gmf.Altitude}
   * @private
   */
  this.gmfAltitude_ = gmfAltitude;

  /**
   * @type {ngeo.Debounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

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

  $scope.$watch(function() {
    return this.active;
  }.bind(this), function(newVal) {
    this.measure.setActive(newVal);
    this.handleMeasureActiveChange_();
  }.bind(this));

  /**
   * @type {number|undefined}
   * @export
   */
  this.decimals;

  const layers = this['getLayersFn']();
  goog.asserts.assertArray(layers);

  /**
   * @type {Array.<string>}
   * @private
   */
  this.layers = layers;

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
  this.measure = new ngeo.interaction.MeasurePointMobile({
    decimals: this.decimals,
    sketchStyle: this.sketchStyle
  });

  this.measure.setActive(this.active);
  ngeoDecorateInteraction(this.measure);
  this.map.addInteraction(this.measure);

  /**
   * @type {ngeo.interaction.MobileDraw}
   * @export
   */
  this.drawInteraction = /** @type {ngeo.interaction.MobileDraw} */ (
      this.measure.getDrawInteraction());

  ngeoDecorateInteraction(this.drawInteraction);

  /**
   * The key for map view 'propertychange' event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.mapViewPropertyChangeEventKey_ = null;

};


/**
 * Deactivate the directive.
 * @export
 */
gmf.MobileMeasurePointController.prototype.deactivate = function() {
  this.active = false;
};


/**
 * @param {string} str String to translate.
 * @return {string} The translated text.
 * @export
 */
gmf.MobileMeasurePointController.prototype.translate = function(str) {
  return this.gettextCatalog_.getString(str);
};


/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for altitude
 *   service.
 * - on deactivate, unlisten
 * @private
 */
gmf.MobileMeasurePointController.prototype.handleMeasureActiveChange_ =
    function() {
      if (this.measure.getActive()) {
        const view = this.map.getView();
        this.mapViewPropertyChangeEventKey_ = ol.events.listen(
            view,
            'propertychange',
            this.ngeoDebounce_(
                this.getAltitude_.bind(this), 300, /* invokeApply */ true),
            this);
        this.getAltitude_();
      } else if (this.mapViewPropertyChangeEventKey_) {
        ol.events.unlistenByKey(this.mapViewPropertyChangeEventKey_);
        this.mapViewPropertyChangeEventKey_ = null;
      }
    };


/**
 * Call the altitude service to get information about the altitude at
 * the current map center location.
 * @private
 */
gmf.MobileMeasurePointController.prototype.getAltitude_ = function() {
  const center = this.map.getView().getCenter();
  goog.asserts.assertArray(center);
  const params = {
    'layers': this.layers.join(',')
  };
  this.gmfAltitude_.getAltitude(center, params).then(function(object) {
    const el = this.measure.getTooltipElement();
    const ctn = document.createElement('div');
    const className = 'gmf-mobile-measure-point-altitude';
    ctn.className = className;

    goog.object.forEach(object, function(height, key) {
      if (height !== null) {
        const childEl = document.createElement('div');
        const className = 'gmf-mobile-measure-altitude';
        childEl.className = className;
        let value;
        if (height > 1000) {
          value = `${parseFloat((height / 1000).toPrecision(3))} km`;
        } else {
          value = `${parseFloat((height).toPrecision(3))} m`;
        }
        childEl.innerHTML = [this.translate(key), ': ', value].join('');
        ctn.appendChild(childEl);
      }
    }, this);

    const previousCtn = goog.dom.getElementByClass(className, el);
    if (previousCtn) {
      previousCtn.remove();
    }
    el.appendChild(ctn);

  }.bind(this));
};


gmf.module.controller('GmfMobileMeasurePointController',
                      gmf.MobileMeasurePointController);
