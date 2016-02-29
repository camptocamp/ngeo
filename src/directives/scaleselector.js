goog.provide('ngeo.ScaleselectorController');
goog.provide('ngeo.ScaleselectorOptions');
goog.provide('ngeo.scaleselectorDirective');

goog.require('ngeo');
goog.require('ol.Map');
goog.require('ol.Object');
goog.require('ol.events');


ngeo.module.value('ngeoScaleselectorTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoScaleselectorTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseTemplateUrl + '/scaleselector.html';
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
 * object of this form:
 *
 *     {
 *       '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
 *       '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
 *       '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
 *       '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
 *       '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
 *     }
 *
 * This object's keys are strings representing zoom levels, the values are
 * strings representing scales. The directive's partial uses ng-bind-html so
 * the scale strings should be trusted.
 *
 * That directive's partial uses Bootstrap's `dropdown` and `dropdown-menu`
 * classes, and `data-toggle="dropdown"`, so it is meant to be used with
 * Bootstrap's "dropdown" jQuery plugin.
 *
 * By default the directive uses "scaleselector.html" as its templateUrl. This
 * an be changed by redefining the "ngeoScaleselectorTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. That scope
 * includes a reference to the directive's controller: the "scaleselectorCtrl"
 * scope property.
 *
 * The directive doesn't create any watcher. In particular the object including
 * the scales information is now watched.
 *
 * @htmlAttribute {Object.<string, string>} ngeo-scaleselector-scales The available scales (key: scale, value: display text).
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
 * @param {angular.Scope} $scope Directive scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoScaleselectorController
 */
ngeo.ScaleselectorController = function($scope, $element, $attrs) {

  var scalesExpr = $attrs['ngeoScaleselector'];

  /**
   * The zoom level/scale map object.
   * @type {!Object.<string, string>}
   * @export
   */
  this.scales = /** @type {!Object.<string, string>} */
      ($scope.$eval(scalesExpr));
  goog.asserts.assert(this.scales !== undefined);

  var zoomLevels = Object.keys(this.scales).map(Number);
  zoomLevels.sort();

  /**
   * @type {Array.<number>}
   * @export
   */
  this.zoomLevels = zoomLevels;

  var mapExpr = $attrs['ngeoScaleselectorMap'];

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assertInstanceof(this.map_, ol.Map);

  var optionsExpr = $attrs['ngeoScaleselectorOptions'];
  var options = $scope.$eval(optionsExpr);

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
   * @type {?ol.events.Key}
   * @private
   */
  this.resolutionChangeKey_ = null;

  /**
   * @type {string|undefined}
   * @export
   */
  this.currentScale = undefined;

  var view = this.map_.getView();
  if (view !== null) {
    var currentZoom = this.map_.getView().getZoom();
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
  var ret;
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
 * @return {string} Scale.
 * @export
 */
ngeo.ScaleselectorController.prototype.getScale = function(zoom) {
  return this.scales[zoom.toString()];
};


/**
 * @param {number} zoom Zoom level.
 * @export
 */
ngeo.ScaleselectorController.prototype.changeZoom = function(zoom) {
  this.map_.getView().setZoom(zoom);
};


/**
 * @param {ol.ObjectEvent} e OpenLayers ObjectEvent.
 * @private
 */
ngeo.ScaleselectorController.prototype.handleResolutionChange_ = function(e) {
  var view = this.map_.getView();
  var currentScale = this.scales[view.getZoom().toString()];

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

  this.$scope_.$applyAsync(function() {
    this.currentScale = currentScale;
  }.bind(this));
};


/**
 * @param {ol.ObjectEvent} e OpenLayers ObjectEvent.
 * @private
 */
ngeo.ScaleselectorController.prototype.handleViewChange_ = function(e) {
  this.registerResolutionChangeListener_();
};


/**
 * @private
 */
ngeo.ScaleselectorController.prototype.registerResolutionChangeListener_ = function() {
  if (this.resolutionChangeKey_ !== null) {
    ol.events.unlistenByKey(this.resolutionChangeKey_);
  }
  var view = this.map_.getView();
  this.resolutionChangeKey_ = ol.events.listen(view,
      ol.Object.getChangeEventType('resolution'), this.handleResolutionChange_,
      this);
};


ngeo.module.controller('NgeoScaleselectorController',
    ngeo.ScaleselectorController);
