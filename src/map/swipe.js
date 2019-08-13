import angular from 'angular';
import * as olEvents from 'ol/events.js';

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
     * @type {import('ol/layer/Layer.js').default}
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
     */
    this.swipeInput_ = $element.find('.swipe-input');

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.layerKey_ = null;
  }

  /**
   * Init the controller
   */
  $onInit() {
    this.layerKey_ = this.layer.on('prerender', this.handleLayerPrerender_.bind(this));
    this.swipeInput_.on('input change', event => {
      this.swipeValue = Number($(event.target).val());
      this.map.render();
    });
    this.layer.on('postrender', this.handleLayerPostrender_.bind(this));
  }

  /**
   * @param {import("ol/events/Event.js").default} evt OpenLayers object event.
   * @private
   */
  handleLayerPrerender_(evt) {
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
   * @param {import("ol/events/Event.js").default} evt OpenLayers object event.
   * @private
   */
  handleLayerPostrender_(evt) {
    const ctx = evt.context;
    ctx.restore();
  }

  $onDestroy() {
    if (this.layerKey_ !== null) {
       olEvents.unlistenByKey(this.layerKey_);
    }
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
