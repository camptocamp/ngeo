goog.provide('gmf.MobileBackgroundlayerselectorController');
goog.provide('gmf.mobileBackgroundlayerselectorDirective');

goog.require('gmf');
goog.require('gmf.Permalink');
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
 * @param {gmf.Permalink} gmfPermalink The gmf permalink service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfMobileBackgroundlayerselectorController
 */
gmf.MobileBackgroundlayerselectorController = function(
    ngeoBackgroundLayerMgr, gmfPermalink, gmfThemes) {

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

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  /**
   * @type {gmf.Permalink}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @param {Array.<ol.layer.Base>} bgLayers Array of background
   *     layer objects.
   */
  var getBgLayersSuccessFn = function(bgLayers) {
    this.bgLayers = bgLayers;
    // try to get default bgLayer from permalink service, otherwise
    // set default bgLayer to the second one (if defined), the first
    // being the blank layer
    var defaultBgLayer = this.gmfPermalink_.getBackgroundLayer(bgLayers);
    if (!defaultBgLayer) {
      defaultBgLayer = this.bgLayers[1] !== undefined ?
          this.bgLayers[1] : this.bgLayers[0];
    }
    this.setLayer(defaultBgLayer, true);
  }.bind(this);

  ol.events.listen(gmfThemes, gmf.ThemesEventType.LOAD, function() {
    gmfThemes.getBgLayers().then(getBgLayersSuccessFn);
  });

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
