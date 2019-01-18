/**
 */
import angular from 'angular';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';
import * as olEvents from 'ol/events.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfBackgroundlayerselector', [
  gmfThemeThemes.name,
  ngeoMapBackgroundLayerMgr.name,
]);


exports.value('gmfBackgroundlayerselectorTemplateUrl',
  /**
   * @param {!JQLite} $element Element.
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfBackgroundlayerselectorTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/backgroundlayerselector';
  }
);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/backgroundlayerselector', require('./component.html'));
});


/**
 * @param {!JQLite} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQLite, !angular.IAttributes): string} gmfBackgroundlayerselectorTemplateUrl Template function.
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
 *        gmf-backgroundlayerselector-map="::ctrl.map"
 *        gmf-backgroundlayer-opacity-options="::ctrl.bgOpacityOptions"
 *        gmf-backgroundlayerselector-select="onBackgroundSelected()">
 *      </gmf-backgroundlayerselector>
 *
 * Used UI metadata:
 *
 *  * thumbnail: The URL used for the icon.
 *
 * @htmlAttribute {import("ol/Map.js").default=} gmf-backgroundlayerselector-map The map.
 * @htmlAttribute {string} gmf-backgroundlayer-opacity-options The opacity slider options.
 * @htmlAttribute {Function} gmf-backgroundlayerselector-select Function called
 *     when a layer was selected by the user.
 *
 * @ngdoc component
 * @ngname gmfBackgroundlayerselector
 */
const component = {
  controller: 'GmfBackgroundlayerselectorController as ctrl',
  bindings: {
    'map': '=gmfBackgroundlayerselectorMap',
    'opacityOptions': '=gmfBackgroundlayerOpacityOptions',
    'select': '&?gmfBackgroundlayerselectorSelect'
  },
  templateUrl: gmfBackgroundlayerselectorTemplateUrl
};


exports.component('gmfBackgroundlayerselector', component);


/**
 * @constructor
 * @private
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import("ngeo/map/BackgroundLayerMgr.js").default} ngeoBackgroundLayerMgr Background layer manager.
 * @param {!import("gmf/theme/Themes.js").default} gmfThemes Themes service.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerselectorController
 */
function Controller($scope, ngeoBackgroundLayerMgr, gmfThemes) {

  /**
   * @type {?import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {!string|undefined}
   * @export
   */
  this.opacityOptions;

  /**
   * Function called when a layer was selected by the user.
   * @type {?Function}
   * @export
   */
  this.select;

  /**
   * @type {?import("ol/layer/Base.js").default}
   * @export
   */
  this.bgLayer;

  /**
   * @type {?Array.<!import("ol/layer/Base.js").default>}
   * @export
   */
  this.bgLayers;

  /**
   * @type {import("ol/layer/Base.js").default}
   * @export
   */
  this.opacityLayer;

  /**
   * @type {!import("gmf/theme/Themes.js").default}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {!Array.<!import("ol/EventsKey.js").default>}
   * @private
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(olEvents.listen(gmfThemes, 'change', this.handleThemesChange_, this));

  /**
   * @type {!import("ngeo/map/BackgroundLayerMgr.js").default}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  this.listenerKeys_.push(olEvents.listen(this.backgroundLayerMgr_, 'change',
    /**
     * @param {!BackgroundEvent} event Event.
     */
    (event) => {
      this.bgLayer = event.detail.current;
    }));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}


/**
 * Initialise the controller.
 */
Controller.prototype.$onInit = function() {
  this.handleThemesChange_();
};


/**
 * Called when the themes changes. Set (or reset) the background layers.
 * @private
 */
Controller.prototype.handleThemesChange_ = function() {
  this.gmfThemes_.getBgLayers().then((layers) => {
    this.bgLayers = layers;

    if (this.opacityOptions !== undefined) {
      const opacityLayer = layers.find(layer => layer.get('label') === this.opacityOptions);
      if (opacityLayer !== undefined) {
        this.setOpacityBgLayer(opacityLayer);
        this.opacityLayer = opacityLayer;

        // Reorder for the UI the bgArray copy with the opacity layer at the end
        this.bgLayers = this.bgLayers.slice();
        const indexOpa = this.bgLayers.findIndex(layer => layer === this.opacityLayer);
        this.bgLayers.splice(indexOpa, 1);
        this.bgLayers.push(opacityLayer);
      }
    }
  });
};

/**
 * Getter/setter for background layer overlay, used by opacity slider.
 * @param {?number} val The opacity.
 * @returns {number} The background layer opacity.
 * @export
 */
Controller.prototype.getSetBgLayerOpacity = function(val) {
  if (val) {
    this.opacityLayer.setOpacity(val);
  }
  return this.opacityLayer.getOpacity();
};

/**
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @param {boolean=} opt_silent Do not notify listeners.
 * @export
 */
Controller.prototype.setLayer = function(layer, opt_silent) {
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
  if (!opt_silent && this.select) {
    this.select();
  }
};

/**
 * Set a background layer overlay, used by the opacity slider.
 * @param {import("ol/layer/Base.js").default} layer The opacity background layer.
 * @export
 */
Controller.prototype.setOpacityBgLayer = function(layer) {
  this.backgroundLayerMgr_.setOpacityBgLayer(this.map, layer);
};

/**
 * @private
 */
Controller.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(olEvents.unlistenByKey);
  this.listenerKeys_.length = 0;
};


exports.controller('GmfBackgroundlayerselectorController', Controller);


export default exports;
