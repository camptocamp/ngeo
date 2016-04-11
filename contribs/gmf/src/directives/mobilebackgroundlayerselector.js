goog.provide('gmf.MobileBackgroundlayerselectorController');
goog.provide('gmf.mobileBackgroundlayerselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');


gmf.module.value('gmfMobileBackgroundlayerselectorTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfMobileBackgroundlayerselectorTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/mobilebackgroundlayerselector.html';
    });


/**
 * Provide a "mobile background layer selector" directive.
 *
 * Example:
 *
 *      <gmf-mobile-backgroundlayerselector
 *        gmf-mobile-backgroundlayerselector-map="::ctrl.map">
 *      </gmf-mobile-backgroundlayerselector>
 *
 * Used UI metadata:
 *
 *  * thumbnail: The URL used for the icon.
 *
 * @htmlAttribute {ol.Map=} gmf-mobile-backgroundlayerselector-map The map.
 * @param {string} gmfMobileBackgroundlayerselectorTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileBackgroundlayerselector
 */
gmf.mobileBackgroundlayerselectorDirective = function(
    gmfMobileBackgroundlayerselectorTemplateUrl) {

  return {
    restrict: 'E',
    scope: {
      'map': '=gmfMobileBackgroundlayerselectorMap',
      'select': '&?gmfMobileBackgroundlayerselectorSelect'
    },
    bindToController: true,
    controller: 'GmfMobileBackgroundlayerselectorController',
    controllerAs: 'ctrl',
    templateUrl: gmfMobileBackgroundlayerselectorTemplateUrl
  };
};


gmf.module.directive('gmfMobileBackgroundlayerselector',
    gmf.mobileBackgroundlayerselectorDirective);


/**
 * @constructor
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileBackgroundlayerselectorController
 */
gmf.MobileBackgroundlayerselectorController = function(ngeoBackgroundLayerMgr, gmfThemes) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * Function called when a layer was selected by the user.
   * @type {Function}
   * @export
   */
  this.select;

  /**
   * @type {ol.layer.Base}
   * @export
   */
  this.bgLayer;

  /**
   * @type {Array.<ol.layer.Base>}
   * @export
   */
  this.bgLayers;

  gmfThemes.getBgLayers().then(function(layers) {
    this.bgLayers = layers;
  }.bind(this));

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  ol.events.listen(
      this.backgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      function() {
        this.bgLayer = this.backgroundLayerMgr_.get(this.map);
      },
      this);

};

gmf.module.controller('GmfMobileBackgroundlayerselectorController',
    gmf.MobileBackgroundlayerselectorController);


/**
 * @param {ol.layer.Base} layer Layer.
 * @param {boolean=} opt_silent Do not notify listeners.
 * @export
 */
gmf.MobileBackgroundlayerselectorController.prototype.setLayer = function(
    layer, opt_silent) {
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
  if (!opt_silent && this.select) {
    this.select();
  }
};
