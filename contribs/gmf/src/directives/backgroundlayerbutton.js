goog.provide('gmf.BackgroundlayerbuttonController');
goog.provide('gmf.backgroundlayerbuttonDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.backgroundlayerselectorDirective');


gmf.module.value('gmfBackgroundlayerbuttonTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfBackgroundlayerbuttonTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/backgroundlayerbutton.html';
    });


/**
 * Provide a "mobile background layer button" directive.
 *
 * Example:
 *
 *      <gmf-mobile-backgroundlayerbutton
 *        gmf-mobile-backgroundlayerbutton-image="http://host/image.jpg"
 *        gmf-mobile-backgroundlayerbutton-map="::ctrl.map">
 *      </gmf-mobile-backgroundlayerbutton>
 *
 * Used UI metadata:
 *
 *  * thumbnail: The URL used for the icon.
 *
 * @htmlAttribute {string} gmf-mobile-backgroundlayerbutton-image The image.
 * @htmlAttribute {ol.Map=} gmf-mobile-backgroundlayerbutton-map The map.
 * @param {string} gmfBackgroundlayerbuttonTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfBackgroundlayerbutton
 */
gmf.backgroundlayerbuttonDirective = function(
    gmfBackgroundlayerbuttonTemplateUrl) {

  return {
    restrict: 'E',
    scope: {
      'image': '@gmfBackgroundlayerbuttonImage',
      'map': '=gmfBackgroundlayerbuttonMap'
    },
    bindToController: true,
    controller: 'GmfBackgroundlayerbuttonController',
    controllerAs: 'blbCtrl',
    templateUrl: gmfBackgroundlayerbuttonTemplateUrl
  };
};


gmf.module.directive('gmfBackgroundlayerbutton',
    gmf.backgroundlayerbuttonDirective);


/**
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerbuttonController
 */
gmf.BackgroundlayerbuttonController = function() {

  /**
   * @type {string}
   * @export
   */
  this.image;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

};


/**
 * Toggle visibility of background layer selector.
 * @export
 */
gmf.BackgroundlayerbuttonController.prototype.toggle = function() {
  this.active = !this.active;
};


gmf.module.controller('GmfBackgroundlayerbuttonController',
    gmf.BackgroundlayerbuttonController);
