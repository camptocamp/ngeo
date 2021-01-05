// The MIT License (MIT)
//
// Copyright (c) 2019-2020 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
  ($templateCache) => {
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
  ($attrs) => {
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
export class SwipeController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {JQuery} $element Element.
   * @constructor
   * @hidden
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoMapswipeController
   */
  constructor($scope, $element) {
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
    this.swipeValue;

    /**
     * @type {JQuery}
     * @private
     */
    this.draggableElement_ = $element.find('.ngeo-swipe-line-draggable');

    /**
     * @type {import("ol/events.js").EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

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
    const view = this.map.getView();

    this.swipeValue = this.swipeValue !== undefined ? this.swipeValue : 0.5;
    this.listenerKeys_.push(listen(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.listenerKeys_.push(listen(this.layer, 'postrender', this.handleLayerPostrender_, this));
    this.listenerKeys_.push(listen(this.layer, 'change:visible', this.handleLayerVisibleChange_, this));
    this.listenerKeys_.push(listen(view, 'change:rotation', this.handleViewRotationChange_, this));

    const halfDraggableWidth = this.draggableElement_.width() / 2;

    // When beginning to swipe a layer, reset the view rotation
    const rotation = view.getRotation();
    if (rotation) {
      view.setRotation(0);
    }

    this.draggableElement_.draggable({
      axis: 'x',
      containment: 'parent',
      drag: () => {
        const parentWidth = this.draggableElement_.parent().width();
        const position = this.draggableElement_.position().left + halfDraggableWidth;

        this.swipeValue = position / parentWidth;

        this.map.render();
      },
    });

    // keep the same percentage when the parent is resized
    this.resizeObserver_ = new ResizeObserver(() => {
      const parentWidth = this.draggableElement_.parent().width();
      this.draggableElement_.css('left', parentWidth * this.swipeValue - halfDraggableWidth);
    });
    this.resizeObserver_.observe(this.draggableElement_.parent().get(0));
  }

  /**
   * Allows you to deactivate the swiper on click of the close button.
   */
  deactivate() {
    this.layer = null;
    this.map.render();
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

  /**
   * Called when the visibility of the layer changes. If it is no longer visible, deactivate the swipe component.
   * @private
   */
  handleLayerVisibleChange_() {
    if (!this.layer.getVisible()) {
      this.deactivate();
    }
  }

  /**
   * Called when the rotation of the view changes. If the view is rotated, deactivate the swipe component.
   * @private
   */
  handleViewRotationChange_() {
    if (this.map.getView().getRotation()) {
      this.deactivate();
    }
  }

  $onDestroy() {
    this.listenerKeys_.forEach(unlistenByKey);
    this.listenerKeys_.length = 0;
    this.draggableElement_.draggable('destroy');
    this.resizeObserver_.disconnect();
  }
}

module.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '=',
    swipeValue: '=',
  },
  templateUrl: ngeoMapswipeTemplateUrl,
});

export default module;
