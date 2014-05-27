


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * The application-specific scale selector directive, based on the
 * ngeo-scaleselector directive.
 *
 * @return {angular.Directive} Directive Definition Object.
 */
app.scaleselectorDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appScaleselectorMap'
    },
    template: '<div ngeo-scaleselector="ctrl.scales" ' +
        'ngeo-scaleselector-map="ctrl.map" ' +
        'ngeo-scaleselector-options="ctrl.options"></div>',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: 'AppScaleselectorController'
  };
};


app.module.directive('appScaleselector', app.scaleselectorDirective);


/**
 * @constructor
 * @param {angular.$sce} $sce Angular sce service.
 * @ngInject
 */
app.ScaleselectorController = function($sce) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * The zoom level/scale map object for the ngeoScaleselector directive.
   * The values need to be trusted as HTML.
   * @type {Object.<string, string>}
   * @const
   * @export
   */
  this.scales = {
    '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
    '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
    '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
    '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
    '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
  };

  /**
   * Use the "dropup" variation of the Bootstrap dropdown.
   * @type {ngeo.ScaleselectorOptions}
   * @export
   */
  this.options = {
    'dropup': true
  };
};

app.module.controller('AppScaleselectorController',
    app.ScaleselectorController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.MainController = function($scope) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [-10635142.37, 4813698.29],
      zoom: 1,
      maxZoom: 4
    })
  });

};


app.module.controller('MainController', app.MainController);
