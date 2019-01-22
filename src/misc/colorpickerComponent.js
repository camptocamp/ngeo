import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoColorpicker', []);


module.value('ngeoColorpickerTemplateUrl',
  /**
   * @param {JQLite} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoColorpickerTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/misc/colorpickerComponent';
  });

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('ngeo/misc/colorpickerComponent', require('./colorpickerComponent.html'));
});


/**
 * Provides the "ngeoColorpicker" directive, a widget for
 * selecting a color among predefined ones.
 *
 * Example:
 *
 *     <div ngeo-colorpicker="ctrl.colors">
 *     </div>
 *
 *
 * @param {string|function(!JQLite=, !angular.IAttributes=)}
 *     ngeoColorpickerTemplateUrl Template URL for the directive.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoColorpicker
 */
function component(ngeoColorpickerTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      colors: '<?ngeoColorpicker',
      color: '=?ngeoColorpickerColor'
    },
    controller: 'NgeoColorpickerController as ctrl',
    bindToController: true,
    templateUrl: ngeoColorpickerTemplateUrl
  };
}

module.directive('ngeoColorpicker', component);

/**
 * Default colors for the colorpicker
 * @type {Array.<Array.<string>>}
 * @const
 * @export
 */
const DEFAULT_COLORS = [
  ['#F4EB37', '#CDDC39', '#62AF44', '#009D57', '#0BA9CC', '#4186F0', '#3F5BA9', '#7C3592', '#A61B4A', '#DB4436', '#F8971B', '#F4B400', '#795046'],
  ['#F9F7A6', '#E6EEA3', '#B7DBAB', '#7CCFA9', '#93D7E8', '#9FC3FF', '#A7B5D7', '#C6A4CF', '#D698AD', '#EE9C96', '#FAD199', '#FFDD5E', '#B29189'],
  ['#ffffff', '#CCCCCC', '#777', '#000000']
];

/**
 * @constructor
 * @private
 * @param {angular.IScope} $scope Directive scope.
 * @param {JQLite} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoScaleselectorController
 */
function Controller($scope, $element, $attrs) {

  /**
   * The set of color
   * @type {Array.<Array.<string>>}
   * @export
   */
  this.colors = this.colors || DEFAULT_COLORS;

  /**
   * The selected color
   * @type {undefined|string}
   * @export
   */
  this.color;
}

/**
 * @param {string} color The color to select.
 * @export
 */
Controller.prototype.setColor = function(color) {
  this.color = color;
};

module.controller('NgeoColorpickerController', Controller);


export default module;
