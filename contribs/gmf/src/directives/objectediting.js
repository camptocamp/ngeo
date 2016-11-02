goog.provide('gmf.ObjecteditingController');
goog.provide('gmf.objecteditingDirective');

goog.require('gmf');


/**
 * Directive used to edit the geometry of a single feature using advanced
 * tools.
 *
 * Example:
 *
 *     <gmf-objectediting
 *         gmf-objectediting-active="ctrl.objectEditingActive"
 *         gmf-objectediting-feature="ctrl.objectEditingFeature"
 *         gmf-objectediting-map="::ctrl.map">
 *     </gmf-objectediting>
 *
 * @htmlAttribute {boolean} gmf-objectediting-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Feature} gmf-objectediting-feature The feature to edit.
 * @htmlAttribute {ol.Map} gmf-objectediting-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjectediting
 */
gmf.objecteditingDirective = function() {
  return {
    controller: 'GmfObjecteditingController',
    scope: {
      'active': '=gmfObjecteditingActive',
      'feature': '=gmfObjecteditingFeature',
      'map': '<gmfObjecteditingMap'
    },
    bindToController: true,
    controllerAs: 'oeCtrl',
    templateUrl: gmf.baseTemplateUrl + '/objectediting.html'
  };
};

gmf.module.directive('gmfObjectediting', gmf.objecteditingDirective);


/**
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditingController
 */
gmf.ObjecteditingController = function() {

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

};


gmf.module.controller(
  'GmfObjecteditingController', gmf.ObjecteditingController);
