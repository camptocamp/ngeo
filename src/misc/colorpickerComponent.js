/**
 * @module ngeo.misc.colorpickerComponent
 */

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoColorpicker', []);


exports.value('ngeoColorpickerTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoColorpickerTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/misc/colorpickerComponent';
  });

exports.run(/* @ngInject */ ($templateCache) => {
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
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoColorpickerTemplateUrl Template URL for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoColorpicker
 */
exports.component_ = function(ngeoColorpickerTemplateUrl) {
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
};

exports.directive('ngeoColorpicker',
  exports.component_);

/**
 * Fefault colors for the colorpicker
 * @type {Array.<Array.<string>>}
 * @const
 * @export
 */
exports.DEFAULT_COLORS = [
  ['#F4EB37', '#CDDC39', '#62AF44', '#009D57', '#0BA9CC', '#4186F0', '#3F5BA9', '#7C3592', '#A61B4A', '#DB4436', '#F8971B', '#F4B400', '#795046'],
  ['#F9F7A6', '#E6EEA3', '#B7DBAB', '#7CCFA9', '#93D7E8', '#9FC3FF', '#A7B5D7', '#C6A4CF', '#D698AD', '#EE9C96', '#FAD199', '#FFDD5E', '#B29189'],
  ['#ffffff', '#CCCCCC', '#777', '#000000']
];

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
exports.Controller_ = function($scope, $element, $attrs) {

  /**
   * The set of color
   * @type {Array.<Array.<string>>}
   * @export
   */
  this.colors = this.colors || exports.DEFAULT_COLORS;

  /**
   * The selected color
   * @type {undefined|string}
   */
  this.color;
};

/**
 * @param {string} color The color to select.
 * @export
 */
exports.Controller_.prototype.setColor = function(color) {
  this.color = color;
};

exports.controller('NgeoColorpickerController',
  exports.Controller_);


export default exports;
