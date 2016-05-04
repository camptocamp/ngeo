goog.provide('gmf.MousepositionController');
goog.provide('gmf.mousepositionDirective');

goog.require('gmf');
goog.require('ngeo.CoordinateFormat');
goog.require('ngeo.CoordinateFormatConfig');
goog.require('ol.control.MousePosition');

/**
 * Provide a directive to display the mouse position coordinates depending
 * on the chosen projection. The directive also provides a projection picker
 * to choose how the coordinates are displayed.
 * The projection picker is initialized from the `ngeoCoordinateFormat`
 * service.
 *
 * Example:
 *  <gmf-mouseposition gmf-mouseposition-map="ctrl.map"
 *     gmf-mouseposition-projections="ctrl.projections">
 *  </gmf-mouseposition>
 *
 * @htmlAttribute {ol.Map} gmf-mouseposition-map The map.
 * @htmlAttribute {Array.<string>} gmf-mouseposition-projection The list of
 *    the projections. If undefined, then all projections will be set.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMouseposition
 */
gmf.mousepositionDirective = function() {
  return {
    restrict: 'E',
    controller: 'gmfMousepositionController',
    scope: {
      'map': '<gmfMousepositionMap',
      'projectionCodes': '<?gmfMousepositionProjections'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    templateUrl: gmf.baseTemplateUrl + '/mouseposition.html'
  };
};

gmf.module.directive('gmfMouseposition', gmf.mousepositionDirective);


/**
 *
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.CoordinateFormat} ngeoCoordinateFormat Coordinates format projection config.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMousepositionController
 */
gmf.MousepositionController = function($scope, ngeoCoordinateFormat) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Array.<string>|undefined}
   * @export
   */
  this.projectionCodes;

  /**
   * @type {ngeo.CoordinateFormatConfig}
   * @export
   */
  this.projection;

  /**
   * @type {Array.<ngeo.CoordinateFormatConfig>}
   * @export
   */
  this.projections = ngeoCoordinateFormat.getProjections.apply(
          ngeoCoordinateFormat, this.projectionCodes);

  var control = new ol.control.MousePosition({
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
  });

  $scope.$watch(function() {
    return this.projection;
  }.bind(this), function(projection) {
    control.setProjection(ol.proj.get(projection.id));
    control.setCoordinateFormat(projection.format);
  });

  this.projection = this.projections[0];

  this.map.addControl(control);
};

gmf.module.controller('gmfMousepositionController',
    gmf.MousepositionController);
