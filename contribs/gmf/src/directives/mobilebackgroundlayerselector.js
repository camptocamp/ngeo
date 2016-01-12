goog.provide('gmf.MobileBackgroundLayerSelectorController');
goog.provide('gmf.mobileBackgroundLayerSelectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');


gmfModule.value('gmfMobileBackgroundLayerSelectorTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfMobileBackgroundLayerSelectorTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/mobilebackgroundlayerselector.html';
    });


/**
 * Provide a "mobile background layer selector" directive.
 *
 * @example
 * <gmf-mobile-background-layer-selector
 *   gmf-mobile-background-layer-selector-map="::ctrl.map">
 * </gmf-mobile-background-layer-selector>
 *
 * @param {string} gmfMobileBackgroundLayerSelectorTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileBackgroundLayerSelector
 */
gmf.mobileBackgroundLayerSelectorDirective = function(
    gmfMobileBackgroundLayerSelectorTemplateUrl) {

  return {
    restrict: 'E',
    scope: {
      'map': '=gmfMobileBackgroundLayerSelectorMap'
    },
    bindToController: true,
    controller: 'GmfMobileBackgroundLayerSelectorController',
    controllerAs: 'ctrl',
    templateUrl: gmfMobileBackgroundLayerSelectorTemplateUrl
  };
};


gmfModule.directive('gmfMobileBackgroundLayerSelector',
    gmf.mobileBackgroundLayerSelectorDirective);



/**
 * @constructor
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileBackgroundLayerSelectorController
 */
gmf.MobileBackgroundLayerSelectorController = function(
    ngeoBackgroundLayerMgr, gmfThemes) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

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

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  gmfThemes.getBgLayers().then(goog.bind(
      /**
       * @param {Array.<ol.layer.Base>} bgLayers Array of background
       *     layer objects.
       */
      function(bgLayers) {
        this.bgLayers = bgLayers;
        // set default bgLayer to the second one (if defined), the first
        // being the blank layer
        this.bgLayer = this.bgLayers[1] !== undefined ?
            this.bgLayers[1] : this.bgLayers[0];
        this.setLayer(this.bgLayer);
      }, this));

  goog.events.listen(
      this.backgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      function() {
        this.bgLayer = this.backgroundLayerMgr_.get(this.map);
      },
      false,
      this);

};


/**
 * @param {ol.layer.Base} layer Layer.
 * @export
 */
gmf.MobileBackgroundLayerSelectorController.prototype.setLayer = function(
    layer) {
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
};


gmfModule.controller('GmfMobileBackgroundLayerSelectorController',
    gmf.MobileBackgroundLayerSelectorController);
