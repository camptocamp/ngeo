import angular from 'angular';
import {listen, unlistenByKey} from 'ol/events.js';
import RenderEvent from 'ol/render/Event.js';

import ResizeObserver from 'resize-observer-polyfill';
import 'jquery-ui/ui/widgets/draggable.js';


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
    this.swipeValue = 0.5;

    /**
     * @type {JQuery}
     * @private
     */
    this.draggableElement_ = $element.find('.ngeo-swipe-line-draggable');

    /**
     * @type {import("ol/events.js").EventsKey[]}
     * @private
     */
    this.layerKeys_ = [];

    /**
     * @type {ResizeObserver}
     * @private
     */
    this.resizeObserver_;

  }

  /**
   * Init the controller
   */
  $onInit() {
    this.layerKeys_.push(listen(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.layerKeys_.push(listen(this.layer, 'postrender', this.handleLayerPostrender_, this));

    const halfDraggableWidth = this.draggableElement_.width() / 2;

    this.draggableElement_.draggable({
      axis: 'x',
      containment: 'parent',
      drag: () => {
        const parentWidth = this.draggableElement_.parent().width();
        const position = this.draggableElement_.position().left + halfDraggableWidth;

        this.swipeValue = position / parentWidth;

        this.map.render();
      }
    });

    // keep the same percentage when the parent is resized
    this.resizeObserver_ = new ResizeObserver(() => {
      const parentWidth = this.draggableElement_.parent().width();
      this.draggableElement_.css('left', (parentWidth * this.swipeValue) - halfDraggableWidth);
    });
    this.resizeObserver_.observe(this.draggableElement_.parent().get(0));
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
    const width = ctx.canvas.width * this.swipeValue;
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
    this.draggableElement_.draggable('destroy');
    this.resizeObserver_.disconnect();
  }
}

module.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '<',
    swipeValue: '=?'
  },
  templateUrl: ngeoMapswipeTemplateUrl
});

export default module;
