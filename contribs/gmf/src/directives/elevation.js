goog.provide('gmf.ElevationController');
goog.provide('gmf.ElevationwidgetController');
goog.provide('gmf.elevationDirective');
goog.provide('gmf.elevationWidgetDirective');

goog.require('gmf');
goog.require('gmf.Altitude');
/** @suppress {extraRequire} */
goog.require('ngeo.Debounce');
goog.require('ol.events.EventType');


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
gmf.elevationDirective = function() {
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
    link: function(scope, element, attr) {
      var ctrl = scope['ctrl'];

      // Watch active or not.
      scope.$watch(function() {
        return ctrl.active;
      }, function(active) {
        this.toggleActive_(active);
      }.bind(ctrl));

      // Watch current layer.
      scope.$watch(function() {
        return ctrl.layer;
      }, function(layer) {
        this.layer = layer;
        this.elevation = null;
      }.bind(ctrl));
    }
  };
};


gmf.module.directive('gmfElevation', gmf.elevationDirective);

/**
 * @param {!angular.Scope} $scope Scope.
 * @param {ngeo.Debounce} ngeoDebounce Ngeo debounce service
 * @param {gmf.Altitude} gmfAltitude Gmf altitude service
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfElevationController
 */
gmf.ElevationController = function($scope, ngeoDebounce, gmfAltitude) {

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
 * Active or deactive the request of the altitude each 500 ms on pointermove.
 * @param {boolean} active true to make requests.
 * @private
 */
gmf.ElevationController.prototype.toggleActive_ = function(active) {
  this.elevation = undefined;
  if (active) {
    // Moving the mouse clears previously displayed elevation
    this.listenerKeys_.push(ol.events.listen(this.map, 'pointermove',
        function(e) {
          this.scope_.$apply(function() {
            this.inViewport_ = true;
            this.elevation = undefined;
            this.loading = false;
          }.bind(this));
        }, this));

    // Launch the elevation service request when the user stops moving the
    // mouse for less short delay
    this.listenerKeys_.push(ol.events.listen(this.map, 'pointermove',
        this.ngeoDebounce_(this.pointerStop_.bind(this), 500, true)
      ));

    this.listenerKeys_.push(ol.events.listen(this.map.getViewport(),
        ol.events.EventType.MOUSEOUT,
        function(e) {
          this.scope_.$apply(function() {
            this.elevation = undefined;
            this.inViewport_ = false;
            this.loading = false;
          }.bind(this));
        }, this));
  } else {
    this.elevation = undefined;
    for (var i = 0, ii = this.listenerKeys_.length; i < ii; ++i) {
      ol.events.unlistenByKey(this.listenerKeys_[i]);
    }
  }
};


/**
 * Request altitude for a MapBrowserPointerEvent's coordinates.
 * Called when the user stopped moving the mouse for 500ms.
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
gmf.ElevationController.prototype.pointerStop_ = function(e) {
  if (this.inViewport_) {
    this.loading = true;
    var params = {
      'layers': this.layer
    };
    this.gmfAltitude_.getAltitude(e.coordinate, params).then(
        this.getAltitudeSuccess_.bind(this),
        this.getAltitudeError_.bind(this)
    );
  }
};


/**
 * @param {Object.<string, number>} resp Response of the get Altitude service.
 * @private
 */
gmf.ElevationController.prototype.getAltitudeSuccess_ = function(resp) {
  goog.asserts.assert(this.layer, 'A layer should be selected');
  this.elevation = resp[this.layer];
  this.loading = false;
};


/**
 * @private
 */
gmf.ElevationController.prototype.getAltitudeError_ = function() {
  console.error('Error on getting altitude.');
  this.elevation = undefined;
  this.loading = false;
};


gmf.module.controller('GmfElevationController', gmf.ElevationController);


/**
 * Provides a directive which encapsulates the elevation directive (see above)
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
 *     elevation directive.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfElevationwidget
 */
gmf.elevationwidgetDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '<gmfElevationwidgetMap',
      'layers': '<gmfElevationwidgetLayers',
      'active': '<gmfElevationwidgetActive'
    },
    controller: 'gmfElevationwidgetController as ctrl',
    bindToController: true,
    templateUrl: gmf.baseTemplateUrl + '/elevationwidget.html'
  };
};

gmf.module.directive('gmfElevationwidget', gmf.elevationwidgetDirective);


/**
 * @constructor
 * @export
 */
gmf.ElevationwidgetController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Array.<string>}
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
  this.selectedElevationLayer = this.layers[0];
};

gmf.module.controller('gmfElevationwidgetController',
    gmf.ElevationwidgetController);
