goog.provide('gmf.backgroundlayerselectorComponent');

goog.require('goog.asserts');
goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.BackgroundEventType');
goog.require('ngeo.BackgroundLayerMgr');


gmf.module.value('gmfBackgroundlayerselectorTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template URL.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfBackgroundlayerselectorTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/backgroundlayerselector.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfBackgroundlayerselectorTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfBackgroundlayerselectorTemplateUrl($element, $attrs, gmfBackgroundlayerselectorTemplateUrl) {
  return gmfBackgroundlayerselectorTemplateUrl($element, $attrs);
}


/**
 * Provide a "background layer selector" component.
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
 *
 * @ngdoc component
 * @ngname gmfBackgroundlayerselector
 */
gmf.backgroundlayerselectorComponent = {
  controller: 'GmfBackgroundlayerselectorController as ctrl',
  bindings: {
    'dimensions': '=gmfBackgroundlayerselectorDimensions',
    'map': '=gmfBackgroundlayerselectorMap',
    'select': '&?gmfBackgroundlayerselectorSelect'
  },
  templateUrl: gmfBackgroundlayerselectorTemplateUrl
};


gmf.module.component('gmfBackgroundlayerselector', gmf.backgroundlayerselectorComponent);


/**
 * @constructor
 * @private
 * @struct
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer manager.
 * @param {!gmf.Themes} gmfThemes Themes service.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerselectorController
 */
gmf.BackgroundlayerselectorController = function($scope, ngeoBackgroundLayerMgr, gmfThemes) {

  /**
   * @type {!Object.<string, string>}
   * @export
   */
  this.dimensions;

  /**
   * @type {?ol.Map}
   * @export
   */
  this.map;

  /**
   * Function called when a layer was selected by the user.
   * @type {?Function}
   * @export
   */
  this.select;

  /**
   * @type {?ol.layer.Base}
   * @export
   */
  this.bgLayer;

  /**
   * @type {?Array.<!ol.layer.Base>}
   * @export
   */
  this.bgLayers;

  /**
   * @type {!gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {!Array.<!ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(ol.events.listen(gmfThemes,
    gmf.ThemesEventType.CHANGE, this.handleThemesChange_, this));

  /**
   * @type {!ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  this.listenerKeys_.push(ol.events.listen(
    this.backgroundLayerMgr_,
    ngeo.BackgroundEventType.CHANGE,
    function(event) {
      this.bgLayer = event.current;
    },
    this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};
gmf.module.controller('GmfBackgroundlayerselectorController',
  gmf.BackgroundlayerselectorController);


/**
 * Initialise the controller.
 */
gmf.BackgroundlayerselectorController.prototype.$onInit = function() {
  goog.asserts.assert(this.dimensions, 'The dimensions object is required');
  this.handleThemesChange_();
};


/**
 * Called when the themes changes. Set (or reset) the backround layers.
 * @private
 */
gmf.BackgroundlayerselectorController.prototype.handleThemesChange_ = function() {
  this.gmfThemes_.getBgLayers(this.dimensions).then((layers) => {
    this.bgLayers = layers;
  });
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @param {boolean=} opt_silent Do not notify listeners.
 * @export
 */
gmf.BackgroundlayerselectorController.prototype.setLayer = function(layer, opt_silent) {
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
