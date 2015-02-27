/**
 * @fileoverview Provides the "ngeoScaleselector" directive, a widget for
 * selecting map scales.
 *
 * Example usage:
 *
 * <div ngeo-scaleselector="ctrl.scales" ngeo-scaleselector-map="ctrl.map">
 * </div>
 *
 * The expression passed to the ngeo-scaleselector attribute should return an
 * object of this form:
 *
 * {
 *   '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
 *   '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
 *   '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
 *   '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
 *   '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
 * }
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
 */
goog.provide('ngeo.ScaleselectorOptions');
goog.provide('ngeo.scaleselectorDirective');

goog.require('goog.events');
goog.require('goog.events.Key');
goog.require('ngeo');
goog.require('ol.Map');
goog.require('ol.Object');


/**
 * @const
 * @type {string}
 */
ngeo.scaleselectorTemplateUrl = 'scaleselector.html';


ngeoModule.value('ngeoScaleselectorTemplateUrl',
    ngeo.scaleselectorTemplateUrl);


/**
 * @typedef {{dropup: (boolean|undefined)}}
 */
ngeo.ScaleselectorOptions;


/**
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoScaleselectorTemplateUrl Template URL for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 */
ngeo.scaleselectorDirective = function(ngeoScaleselectorTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoScaleselectorController',
    templateUrl: ngeoScaleselectorTemplateUrl
  };
};


ngeoModule.directive('ngeoScaleselector', ngeo.scaleselectorDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope Directive scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @export
 * @ngInject
 */
ngeo.ScaleselectorController = function($scope, $element, $attrs, $timeout) {

  var scalesExpr = $attrs['ngeoScaleselector'];

  /**
   * The zoom level/scale map object.
   * @type {Object.<string, string>}
   */
  this['scales'] = /** @type {Object.<string, string>} */
      ($scope.$eval(scalesExpr));
  goog.asserts.assert(goog.isDef(this['scales']));

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
   */
  this['options'] = ngeo.ScaleselectorController.getOptions_(options);

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {goog.events.Key}
   * @private
   */
  this.resolutionChangeKey_ = null;

  /**
   * @type {string|undefined}
   */
  this['currentScale'] = undefined;

  var view = this.map_.getView();
  if (!goog.isNull(view)) {
    var currentZoom = this.map_.getView().getZoom();
    if (goog.isDef(currentZoom)) {
      this['currentScale'] = this['scales'][currentZoom.toString()];
    }
  }

  goog.events.listen(this.map_, ol.Object.getChangeEventType('view'),
      this.handleViewChange_, false, this);

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
  if (!goog.isDef(options)) {
    ret = {'dropup': false};
  } else {
    if (!goog.isDef(options['dropup'])) {
      options['dropup'] = false;
    }
    ret = /** @type {ngeo.ScaleselectorOptions} */ (options);
  }
  return ret;
};


/**
 * @param {string} zoom Zoom level.
 * @export
 */
ngeo.ScaleselectorController.prototype.changeZoom = function(zoom) {
  // setZoom triggers a change:resolution event, and our change:resolution
  // handler uses $apply to change the currentScale state, so we use $timeout
  // and make sure that setZoom is called outside Angular context.
  var view = this.map_.getView();
  this.$timeout_(function() {
    view.setZoom(+zoom);
  }, 0, false);
};


/**
 * @param {ol.ObjectEvent} e OpenLayers ObjectEvent.
 * @private
 */
ngeo.ScaleselectorController.prototype.handleResolutionChange_ = function(e) {
  var view = this.map_.getView();
  var currentScale = this['scales'][view.getZoom().toString()];
  this.$scope_.$apply(
      /** @type {function(?)} */ (
      goog.bind(function() {
        this['currentScale'] = currentScale;
      }, this)));
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
ngeo.ScaleselectorController.prototype.registerResolutionChangeListener_ =
    function() {
  if (!goog.isNull(this.resolutionChangeKey_)) {
    goog.events.unlistenByKey(this.resolutionChangeKey_);
  }
  var view = this.map_.getView();
  this.resolutionChangeKey_ = goog.events.listen(view,
      ol.Object.getChangeEventType('resolution'), this.handleResolutionChange_,
      false, this);
};


ngeoModule.controller('NgeoScaleselectorController',
    ngeo.ScaleselectorController);
