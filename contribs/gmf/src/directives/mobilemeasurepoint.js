goog.provide('gmf.MobileMeasurePointController');
goog.provide('gmf.mobileMeasurePointDirective');

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
      var templateUrl = attrs['gmfMobileMeasurePointTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/mobilemeasurepoint.html';
    });


/**
 * Provide a "mobile measure" directive.
 *
 * Example:
 *
 *      <div gmf-mobile-measure-point=""
 *        gmf-mobile-measure-point-active="ctrl.measurePointActive"
 *        gmf-mobile-measure-point-map="::ctrl.map">
 *      </div>
 *
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
          'active': '=gmfMobileMeasurePointActive',
          'decimals': '<?gmfMobileMeasurePointDecimals',
          'map': '=gmfMobileMeasurePointMap',
          'sketchStyle': '=?gmfMobileMeasurePointSketchStyle'
        },
        controller: 'GmfMobileMeasurePointController',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: gmfMobileMeasurePointTemplateUrl
      };
    };


gmf.module.directive('gmfMobileMeasurePoint',
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

  /**
   * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction}
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
   * @type {?ol.events.Key}
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
        var view = this.map.getView();
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
  var center = this.map.getView().getCenter();
  goog.asserts.assertArray(center);
  this.gmfAltitude_.getAltitude(center).then(function(object) {
    var el = this.measure.getTooltipElement();
    var ctn = document.createElement('div');
    var className = 'gmf-mobile-measure-point-altitude';
    ctn.className = className;

    goog.object.forEach(object, function(height, key) {
      if (height !== null) {
        var childEl = document.createElement('div');
        var className = 'gmf-mobile-measure-altitude';
        childEl.className = className;
        var value;
        if (height > 1000) {
          value = parseFloat((height / 1000).toPrecision(3)) + ' km';
        } else {
          value = parseFloat((height).toPrecision(3)) + ' m';
        }
        childEl.innerHTML = [this.translate(key), ': ', value].join('');
        ctn.appendChild(childEl);
      }
    }, this);

    var previousCtn = goog.dom.getElementByClass(className, el);
    if (previousCtn) {
      previousCtn.remove();
    }
    el.appendChild(ctn);

  }.bind(this));
};


gmf.module.controller('GmfMobileMeasurePointController',
                      gmf.MobileMeasurePointController);
