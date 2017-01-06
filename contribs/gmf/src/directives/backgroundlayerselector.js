goog.provide('gmf.BackgroundlayerselectorController');
goog.provide('gmf.backgroundlayerselectorDirective');

goog.require('goog.asserts');
goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');


gmf.module.value('gmfBackgroundlayerselectorTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      const templateUrl = attrs['gmfBackgroundlayerselectorTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          `${gmf.baseTemplateUrl}/backgroundlayerselector.html`;
    });


/**
 * Provide a "background layer selector" directive.
 *
 * Example:
 *
 *      <gmf-backgroundlayerselector
 *        gmf-backgroundlayerselector-dimensions="::ctrl.dimensions"
 *        gmf-backgroundlayerselector-map="::ctrl.map"
 *        gmf-backgroundlayerselector-select="onBackgroundSelected()">
 *      </gmf-backgroundlayerselector>
 *
 * Used UI metadata:
 *
 *  * thumbnail: The URL used for the icon.
 *
 * @htmlAttribute {Object.<string, string>} gmf-backgroundlayerselector-dimensions
 *     The dimensions.
 * @htmlAttribute {ol.Map=} gmf-backgroundlayerselector-map The map.
 * @htmlAttribute {Function} gmf-backgroundlayerselector-select Function called
 *     when a layer was selected by the user.
 * @param {string} gmfBackgroundlayerselectorTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfBackgroundlayerselector
 */
gmf.backgroundlayerselectorDirective = function(
    gmfBackgroundlayerselectorTemplateUrl) {

  return {
    restrict: 'E',
    scope: {
      'dimensions': '=gmfBackgroundlayerselectorDimensions',
      'map': '=gmfBackgroundlayerselectorMap',
      'select': '&?gmfBackgroundlayerselectorSelect'
    },
    bindToController: true,
    controller: 'GmfBackgroundlayerselectorController as ctrl',
    templateUrl: gmfBackgroundlayerselectorTemplateUrl
  };
};


gmf.module.directive('gmfBackgroundlayerselector',
    gmf.backgroundlayerselectorDirective);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerselectorController
 */
gmf.BackgroundlayerselectorController = function($scope, ngeoBackgroundLayerMgr,
    gmfThemes) {

  /**
   * @type {Object.<string, string>}
   * @export
   */
  this.dimensions;

  goog.asserts.assert(this.dimensions, 'The dimensions object is required');

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
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {Array.<ol.EventsKey>}
   * @export
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(ol.events.listen(gmfThemes,
    gmf.ThemesEventType.CHANGE, this.handleThemesChange_, this));

  gmfThemes.getBgLayers(this.dimensions).then(function(layers) {
    this.bgLayers = layers;
  }.bind(this));

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  this.listenerKeys_.push(ol.events.listen(
      this.backgroundLayerMgr_,
      ngeo.BackgroundEventType.CHANGE,
      function() {
        this.bgLayer = this.backgroundLayerMgr_.get(this.map);
      },
      this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};

gmf.module.controller('GmfBackgroundlayerselectorController',
    gmf.BackgroundlayerselectorController);


/**
 * Called when the themes changes. Set (or reset) the backround layers.
 * @private
 */
gmf.BackgroundlayerselectorController.prototype.handleThemesChange_ = function() {
  this.gmfThemes_.getBgLayers(this.dimensions).then(function(layers) {
    this.bgLayers = layers;
  }.bind(this));
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @param {boolean=} opt_silent Do not notify listeners.
 * @export
 */
gmf.BackgroundlayerselectorController.prototype.setLayer = function(
    layer, opt_silent) {
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
  if (!opt_silent && this.select) {
    this.select();
  }
};


/**
 * @private
 */
gmf.BackgroundlayerselectorController.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(ol.events.unlistenByKey);
  this.listenerKeys_.length = 0;
};
