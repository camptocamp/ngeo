goog.provide('ngeo.ScaleselectorOptions');
goog.provide('ngeo.scaleselectorDirective');

goog.require('ngeo');
goog.require('ol.array');
goog.require('ol.Map');
goog.require('ol.Object');
goog.require('ol.events');


ngeo.module.value('ngeoScaleselectorTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoScaleselectorTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseTemplateUrl}/scaleselector.html`;
  });


/**
 * @typedef {{dropup: (boolean|undefined)}}
 */
ngeo.ScaleselectorOptions;


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
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoScaleselectorTemplateUrl Template URL for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoScaleselector
 */
ngeo.scaleselectorDirective = function(ngeoScaleselectorTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoScaleselectorController',
    templateUrl: ngeoScaleselectorTemplateUrl
  };
};


ngeo.module.directive('ngeoScaleselector', ngeo.scaleselectorDirective);


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
ngeo.ScaleselectorController = function($scope, $element, $attrs) {

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
   * @type {!ngeo.ScaleselectorOptions}
   * @export
   */
  this.options = ngeo.ScaleselectorController.getOptions_(options);

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

  ol.events.listen(this.map_, ol.Object.getChangeEventType('view'),
    this.handleViewChange_, this);

  this.registerResolutionChangeListener_();

  $scope['scaleselectorCtrl'] = this;

};


/**
 * @param {?} options Options after expression evaluation.
 * @return {!ngeo.ScaleselectorOptions} Options object.
 * @private
 */
ngeo.ScaleselectorController.getOptions_ = function(options) {
  let ret;
  if (options === undefined) {
    ret = {'dropup': false};
  } else {
    if (options['dropup'] === undefined) {
      options['dropup'] = false;
    }
    ret = /** @type {ngeo.ScaleselectorOptions} */ (options);
  }
  return ret;
};


/**
 * @param {number} zoom Zoom level.
 * @return {number} Scale.
 * @export
 */
ngeo.ScaleselectorController.prototype.getScale = function(zoom) {
  return this.scales[zoom];
};


/**
 * @param {number} zoom Zoom level.
 * @export
 */
ngeo.ScaleselectorController.prototype.changeZoom = function(zoom) {
  this.map_.getView().setZoom(zoom);
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeo.ScaleselectorController.prototype.handleResolutionChange_ = function(e) {
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

  this.$scope_.$applyAsync(() => {
    this.currentScale = currentScale;
  });
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeo.ScaleselectorController.prototype.handleViewChange_ = function(e) {
  this.registerResolutionChangeListener_();
  this.handleResolutionChange_(null);
};


/**
 * @private
 */
ngeo.ScaleselectorController.prototype.registerResolutionChangeListener_ = function() {
  if (this.resolutionChangeKey_ !== null) {
    ol.events.unlistenByKey(this.resolutionChangeKey_);
  }
  const view = this.map_.getView();
  this.resolutionChangeKey_ = ol.events.listen(view,
    ol.Object.getChangeEventType('resolution'), this.handleResolutionChange_,
    this);
};


ngeo.module.controller('NgeoScaleselectorController',
  ngeo.ScaleselectorController);
