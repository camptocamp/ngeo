import angular from 'angular';
import {listen, unlistenByKey} from 'ol/events.js';
import RenderEvent from 'ol/render/Event.js';
/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMapswipe', []);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  $templateCache => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/src/map/swipe', require('./swipe.html'));
  }
);

module.value(
  'ngeoMapswipeTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  $attrs => {
    const templateUrl = $attrs.ngeoMapswipeTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/src/map/swipe';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoMapswipeTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoMapswipeTemplateUrl($attrs, ngeoMapswipeTemplateUrl) {
  return ngeoMapswipeTemplateUrl($attrs);
}

/**
 * The controller for the Mapswipe component.
 */
class SwipeController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {JQuery} $element Element.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @constructor
   * @private
   * @hidden
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoMapswipeController
   */
  constructor($scope, $element, $injector) {
    /**
     * @type {import('ol/Map.js').default}
     */
    this.map;

    /**
     * @type {import('ol/layer/Tile.js').default}
     */
    this.layer;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {number}
     */
    this.swipeValue = 50;

    /**
     * @type {JQuery}
     * @private
     */
    this.swipeInput_ = $element.find('.swipe-input');

    /**
     * @type {import("ol/events.js").EventsKey[]}
     * @private
     */
    this.layerKeys_ = [];
  }

  /**
   * Init the controller
   */
  $onInit() {
    this.layerKeys_.push(listen(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.layerKeys_.push(listen(this.layer, 'postrender', this.handleLayerPostrender_, this));

    this.swipeInput_.on('input change', event => {
      this.swipeValue = Number($(event.target).val());
      this.map.render();
    });
  }

  /**
   * @param {?Event|import("ol/events/Event.js").default} evt OpenLayers object event.
   * @private
   */
  handleLayerPrerender_(evt) {
    if (!(evt instanceof RenderEvent)) {
      return;
    }
    const ctx = evt.context;
    if (!ctx) {
      return;
    }
    const width = ctx.canvas.width * (this.swipeValue / 100);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, ctx.canvas.height);
    ctx.clip();
  }

  /**
   * @param {?Event|import("ol/events/Event.js").default} evt OpenLayers object event.
   * @private
   */
  handleLayerPostrender_(evt) {
    if (evt instanceof RenderEvent) {
      const ctx = evt.context;
      if (!ctx) {
        return;
      }
      ctx.restore();
    }
  }

  $onDestroy() {
    this.layerKeys_.forEach(unlistenByKey);
    this.layerKeys_.length = 0;
    this.swipeInput_.off();
  }
}

module.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '<'
  },
  templateUrl: ngeoMapswipeTemplateUrl
});

export default module;
