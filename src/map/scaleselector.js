goog.provide('ngeo.map.scaleselector');

goog.require('goog.asserts');
goog.require('ngeo'); // nowebpack
goog.require('ol.array');
goog.require('ol.Map');
goog.require('ol.events');


/**
 * @type {!angular.Module}
 */
ngeo.map.scaleselector = angular.module('ngeoScaleselector', []);


ngeo.map.scaleselector.value('ngeoScaleselectorTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoScaleselectorTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/map/scaleselector.html`; // nowebpack
    // webpack: 'ngeo/map/scaleselector';
  });

// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('ngeo/map/scaleselector', require('./scaleselector.html'));
// webpack: });


/**
 * Provides the "ngeoScaleselector" directive, a widget for
 * selecting map scales.
 *
 * Example:
 *
 *     <div ngeo-scaleselector="ctrl.scales" ngeo-scaleselector-map="ctrl.map">
 *     </div>
 *
 * The expression passed to the ngeo-scaleselector attribute should return an
 * array of this form:
 *
 *    [20000, 10000, 5000, 2500]
 *
 * That directive's partial uses Bootstrap's `dropdown` and `dropdown-menu`
 * classes, and `data-toggle="dropdown"`, so it is meant to be used with
 * Bootstrap's "dropdown" jQuery plugin.
 *
 * You can pass options to configure the behaviors of this element. Options is
 * a {@link ngeox.ScaleselectorOptions} object.
 *
 * Example:
 *
 *     <div ngeo-scaleselector="ctrl.scales"
 *       ngeo-scaleselector-map="ctrl.map"
 *       ngeo-scaleselector-options="ctrl.scaleSelectorOptions">
 *     </div>
 *
 * By default the directive uses "scaleselector.html" as its templateUrl. This
 * can be changed by redefining the "ngeoScaleselectorTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. That scope
 * includes a reference to the directive's controller: the "scaleselectorCtrl"
 * scope property.
 *
 * The directive doesn't create any watcher. In particular the object including
 * the scales information is now watched.
 *
 * See our live example: [../examples/scaleselector.html](../examples/scaleselector.html)
 *
 * @htmlAttribute {!Array.<number>} ngeo-scaleselector The available scales.
 * @htmlAttribute {ol.Map} ngeo-scaleselector-map The map.
 * @htmlAttribute {ngeox.ScaleselectorOptions} ngeo-scaleselector-options
 *     Optionnal. The configuration options.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoScaleselectorTemplateUrl Template URL for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoScaleselector
 */
ngeo.map.scaleselector.directive_ = function(ngeoScaleselectorTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoScaleselectorController',
    templateUrl: ngeoScaleselectorTemplateUrl
  };
};


ngeo.map.scaleselector.directive('ngeoScaleselector', ngeo.map.scaleselector.directive_);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope Directive scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoScaleselectorController
 */
ngeo.map.scaleselector.ScaleselectorController_ = function($scope, $element, $attrs) {

  const scalesExpr = $attrs['ngeoScaleselector'];

  /**
   * The zoom level/scale map object.
   * @type {!Array.<number>}
   * @export
   */
  this.scales = /** @type {!Array.<number>} */
    ($scope.$eval(scalesExpr));
  goog.asserts.assert(this.scales !== undefined);

  /**
   * @type {Array.<number>}
   * @export
   */
  this.zoomLevels;

  $scope.$watch(() => Object.keys(this.scales).length, (newLength) => {
    this.zoomLevels = Object.keys(this.scales).map(Number);
    this.zoomLevels.sort(ol.array.numberSafeCompareFunction);
  });

  const mapExpr = $attrs['ngeoScaleselectorMap'];

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assertInstanceof(this.map_, ol.Map);

  const optionsExpr = $attrs['ngeoScaleselectorOptions'];
  const options = $scope.$eval(optionsExpr);

  /**
   * @type {!ngeox.ScaleselectorOptions}
   * @export
   */
  this.options = ngeo.map.scaleselector.ScaleselectorController_.getOptions_(options);

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {?ol.EventsKey}
   * @private
   */
  this.resolutionChangeKey_ = null;

  /**
   * @type {number|undefined}
   * @export
   */
  this.currentScale = undefined;

  const view = this.map_.getView();
  if (view !== null) {
    const currentZoom = this.map_.getView().getZoom();
    if (currentZoom !== undefined) {
      this.currentScale = this.getScale(currentZoom);
    }
  }

  ol.events.listen(this.map_, 'change:view', this.handleViewChange_, this);

  this.registerResolutionChangeListener_();

  $scope['scaleselectorCtrl'] = this;

};


/**
 * @param {?} options Options after expression evaluation.
 * @return {!ngeox.ScaleselectorOptions} Options object.
 * @private
 */
ngeo.map.scaleselector.ScaleselectorController_.getOptions_ = function(options) {
  let dropup = false;
  if (options !== undefined) {
    dropup = options['dropup'] == true;
  }
  return /** @type {ngeox.ScaleselectorOptions} */ ({
    dropup: dropup
  });
};


/**
 * @param {number} zoom Zoom level.
 * @return {number} Scale.
 * @export
 */
ngeo.map.scaleselector.ScaleselectorController_.prototype.getScale = function(zoom) {
  return this.scales[zoom];
};


/**
 * @param {number} zoom Zoom level.
 * @export
 */
ngeo.map.scaleselector.ScaleselectorController_.prototype.changeZoom = function(zoom) {
  this.map_.getView().setZoom(zoom);
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeo.map.scaleselector.ScaleselectorController_.prototype.handleResolutionChange_ = function(e) {
  const view = this.map_.getView();
  const currentScale = this.scales[/** @type {number} */ (view.getZoom())];

  // handleResolutionChange_ is a change:resolution listener. The listener
  // may be executed outside the Angular context, for example when the user
  // double-clicks to zoom on the map.
  //
  // But it may also be executed inside the Angular context, when a function
  // in Angular context calls setZoom or setResolution on the view, which
  // is for example what happens when this controller's changeZoom function
  // is called.
  //
  // For that reason we use $applyAsync instead of $apply here.

  if (currentScale !== undefined) {
    this.$scope_.$applyAsync(() => {
      this.currentScale = currentScale;
    });
  }
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeo.map.scaleselector.ScaleselectorController_.prototype.handleViewChange_ = function(e) {
  this.registerResolutionChangeListener_();
  this.handleResolutionChange_(null);
};


/**
 * @private
 */
ngeo.map.scaleselector.ScaleselectorController_.prototype.registerResolutionChangeListener_ = function() {
  if (this.resolutionChangeKey_ !== null) {
    ol.events.unlistenByKey(this.resolutionChangeKey_);
  }
  const view = this.map_.getView();
  this.resolutionChangeKey_ = ol.events.listen(view,
    'change:resolution', this.handleResolutionChange_,
    this);
};


ngeo.map.scaleselector.controller('NgeoScaleselectorController',
  ngeo.map.scaleselector.ScaleselectorController_);
