goog.provide('gmf.ElevationController');
goog.provide('gmf.elevationDirective');

goog.require('gmf');
goog.require('gmf.Altitude');
/** @suppress {extraRequire} */
goog.require('ngeo.Debounce');


/**
 * Provide a directive that set a value each 500ms with the elevation under the
 * mouse cursor position on the map. The value must come from the elevation
 * service of a c2cgeoportal server. The server's URL must be defined as
 * constant of the application.
 *
 * Example:
 *
 *      <span gmf-elevation
 *            gmf-elevation-active="elvationActive"
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
 * @htmlAttribute {string?} gmf-elevation-layer The elevation layer to use as
 *     named in the server response object. If not provided, take the first
 *     returned value.
 * @htmlAttribute {ol.Map} gmf-elevation-map The map.
 * @return {angular.Directive} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfElevation
 */
gmf.elevationDirective = function() {
  return {
    restrict: 'A',
    controller: 'GmfElevationController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      'active': '=gmfElevationActive',
      'elevation': '=gmfElevationElevation',
      'layer': '=?gmfElevationLayer',
      'getMapFn': '&gmfElevationMap'
    },
    link: function(scope, element, attr) {
      var ctrl = scope['ctrl'];

      scope.$watch(function() {
        return ctrl.active;
      }, function(active) {
        this.toggleActive_(active);
      }.bind(ctrl));
    }
  };
};


gmf.module.directive('gmfElevation', gmf.elevationDirective);

/**
 * @param {ngeo.Debounce} ngeoDebounce Ngeo debounce service
 * @param {gmf.Altitude} gmfAltitude Gmf altitude service
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfElevationController
 */
gmf.ElevationController = function(ngeoDebounce, gmfAltitude) {

  /**
   * @type {ngeo.Debounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {gmf.Altitude}
   * @private
   */
  this.gmfAltitude_ = gmfAltitude;

  /**
   * @type {boolean}
   * @export
   */
  this.active = true;

  /**
   * @type {number|undefined}
   * @export
   */
  this.elevation;

  /**
   * @type {string|undefined}
   * @export
   */
  this.layer;

  var map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  /**
   * @type {ol.events.Key}
   * @private
   */
  this.pointerMoveKey_;
};

/**
 * Active or deactive the request of the altitude each 500 ms on pointermove.
 * @param {boolean} active true to make requests.
 * @private
 */
gmf.ElevationController.prototype.toggleActive_ = function(active) {
  if (active) {
    this.pointerMoveKey_ = ol.events.listen(this.map_, 'pointermove',
        this.ngeoDebounce_(this.pointerMove_.bind(this), 500, true)
      );
  } else {
    this.elevation = undefined;
    ol.Observable.unByKey(this.pointerMoveKey_);
  }
};


/**
 * Request altitude for a MapBrowserPointerEvent's coordinates.
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
gmf.ElevationController.prototype.pointerMove_ = function(e) {
  this.gmfAltitude_.getAltitude(e.coordinate).then(
      this.getAltitudeSuccess_.bind(this),
      this.getAltitudeError_.bind(this)
  );
};


/**
 * @param {Object.<string, number>} resp Response of the get Altitude service.
 * @private
 */
gmf.ElevationController.prototype.getAltitudeSuccess_ = function(resp) {
  if (resp !== null) {
    var layer = this.layer ? this.layer : Object.keys(resp)[0];
    this.elevation = /** @type {number} */ (resp[layer]);
  } else {
    this.elevation = undefined;
  }
};


/**
 * @private
 */
gmf.ElevationController.prototype.getAltitudeError_ = function() {
  console.error('Error on getting altitude.');
  this.elevation = undefined;
};


gmf.module.controller('GmfElevationController', gmf.ElevationController);
