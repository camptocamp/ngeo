import angular from 'angular';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr.js';
import * as olEvents from 'ol/events.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfBackgroundlayerselector', [
  gmfThemeThemes.name,
  ngeoMapBackgroundLayerMgr.name,
]);


module.value('gmfBackgroundlayerselectorTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfBackgroundlayerselectorTemplateurl;
    return templateUrl !== undefined ? templateUrl :
      'gmf/backgroundlayerselector';
  }
);


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/backgroundlayerselector', require('./component.html'));
  });


/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfBackgroundlayerselectorTemplateUrl
 *    Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 * Used metadata:
 *
 *  * thumbnail: The URL used for the icon.
 *
 * Used functionnalities:
 *
 *  * default_basemap: Base maps to use by default.
 *
 * @htmlAttribute {import("ol/Map.js").default=} gmf-backgroundlayerselector-map The map.
 * @htmlAttribute {string} gmf-backgroundlayer-opacity-options The opacity slider options.
 * @htmlAttribute {Function} gmf-backgroundlayerselector-select Function called
 *     when a layer was selected by the user.
 *
 * @ngdoc component
 * @ngname gmfBackgroundlayerselector
 */
const backgroundlayerselectorComponent = {
  controller: 'GmfBackgroundlayerselectorController as ctrl',
  bindings: {
    'map': '=gmfBackgroundlayerselectorMap',
    'opacityOptions': '=gmfBackgroundlayerOpacityOptions',
    'select': '&?gmfBackgroundlayerselectorSelect'
  },
  templateUrl: gmfBackgroundlayerselectorTemplateUrl
};


module.component('gmfBackgroundlayerselector', backgroundlayerselectorComponent);


/**
 * @constructor
 * @private
 * @hidden
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerselectorController
 */
function Controller($scope, ngeoBackgroundLayerMgr, gmfThemes) {

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {string|undefined}
   */
  this.opacityOptions;

  /**
   * Function called when a layer was selected by the user.
   * @type {?Function}
   */
  this.select = null;

  /**
   * @type {?import("ol/layer/Base.js").default}
   */
  this.bgLayer = null;

  /**
   * @type {?Array<import("ol/layer/Base.js").default>}
   */
  this.bgLayers = null;

  /**
   * @type {?import("ol/layer/Base.js").default}
   */
  this.opacityLayer = null;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {Array<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(olEvents.listen(gmfThemes, 'change', this.handleThemesChange_, this));

  /**
   * @type {import("ngeo/map/BackgroundLayerMgr.js").MapBackgroundLayerManager}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

  this.listenerKeys_.push(olEvents.listen(this.backgroundLayerMgr_, 'change',
    /**
     * @param {Event|import('ol/events/Event.js').default} event Event.
     */
    (event) => {
      this.bgLayer = /** @type{import('ngeo/map/BackgroundLayerMgr.js').BackgroundEvent} */
          (event).detail.current;
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
 */
Controller.prototype.getSetBgLayerOpacity = function(val) {
  if (!this.opacityLayer) {
    throw new Error('Missing opacityLayer');
  }
  if (val !== null) {
    this.opacityLayer.setOpacity(val);
  }
  return this.opacityLayer.getOpacity();
};

/**
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @param {boolean=} opt_silent Do not notify listeners.
 */
Controller.prototype.setLayer = function(layer, opt_silent) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
  if (!opt_silent && this.select) {
    this.select();
  }
};

/**
 * Set a background layer overlay, used by the opacity slider.
 * @param {import("ol/layer/Base.js").default} layer The opacity background layer.
 */
Controller.prototype.setOpacityBgLayer = function(layer) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.backgroundLayerMgr_.setOpacityBgLayer(this.map, layer);
};

/**
 * @private
 */
Controller.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(olEvents.unlistenByKey);
  this.listenerKeys_.length = 0;
};


module.controller('GmfBackgroundlayerselectorController', Controller);


export default module;
