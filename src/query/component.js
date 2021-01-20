// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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

import {unlistenByKeys as ngeoEventsUnlistenByKeys} from 'ngeo/events.js';
import ngeoQueryMode from 'ngeo/query/Mode.js';
import ngeoQueryModeSelector from 'ngeo/query/ModeSelector.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';

import {listen as olEventsListen} from 'ol/events.js';
import {always as olEventsConditionAlways} from 'ol/events/condition.js';
import olInteractionDraw, {createBox as olInteractionDrawCreateBox} from 'ol/interaction/Draw.js';
import {Vector as olLayerVector} from 'ol/layer.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import {Vector as olSourceVector} from 'ol/source.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoQuery', [ngeoQueryModeSelector.name, ngeoQueryMapQuerent.name]);

/**
 * @hidden
 */
export class QueryController {
  /**
   * @param {import("ngeo/query/MapQuerent.js").MapQuerent}
   *     ngeoMapQuerent The ngeo map querent service.
   * @param {import("ngeo/query/ModeSelector.js").QueryModeSelector}
   *     ngeoQueryModeSelector The ngeo query modeSelector service.
   * @param {import('ngeo/options.js').ngeoQueryOptions} ngeoQueryOptions The options.
   * @param {angular.IScope} $scope Scope.
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoQueryController
   */
  constructor(ngeoMapQuerent, ngeoQueryModeSelector, $scope, ngeoQueryOptions) {
    // === Binding properties ===

    /**
     * @type {boolean}
     */
    this.active;

    /**
     * @type {boolean}
     */
    this.autoclear;

    /**
     * @type {!import("ol/Map.js").default}
     */
    this.map;

    // === Injected properties ===

    /**
     * @type {import("ngeo/query/MapQuerent.js").MapQuerent}
     * @private
     */
    this.ngeoMapQuerent_ = ngeoMapQuerent;

    /**
     * @type {import("ngeo/query/ModeSelector.js").QueryModeSelector}
     * @private
     */
    this.ngeoQueryModeSelector_ = ngeoQueryModeSelector;

    /**
     * @type {import('ngeo/options.js').ngeoQueryOptions}
     * @private
     */
    this.ngeoQueryOptions_ = ngeoQueryOptions;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    // === Inner properties ===

    /**
     * @type {olSourceVector<import("ol/geom/Polygon.js").default>}
     * @private
     */
    this.vectorSource_ = new olSourceVector({
      wrapX: false,
    });

    /**
     * @type {olLayerVector}
     * @private
     */
    this.vectorLayer_ = new olLayerVector({
      source: this.vectorSource_,
    });

    /**
     * @type {olInteractionDraw}
     * @private
     */
    this.drawBoxInteraction_ = new olInteractionDraw({
      condition: olEventsConditionAlways,
      geometryFunction: olInteractionDrawCreateBox(),
      source: this.vectorSource_,
      stopClick: true,
      type: 'Circle',
    });

    /**
     * @type {olInteractionDraw}
     * @private
     */
    this.drawPolygonInteraction_ = new olInteractionDraw({
      condition: olEventsConditionAlways,
      source: this.vectorSource_,
      stopClick: true,
      type: 'Polygon',
    });

    /**
     * The event keys of the currently active "mode".
     *
     * @type {Array<import('ol/events.js').EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {?string}
     * @private
     */
    this.mode_ = null;

    // === Event listeners that uses angular $scope

    $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

    $scope.$watch(() => {
      let value = null;
      if (this.active) {
        value = this.ngeoQueryModeSelector_.mode;
      }
      return value;
    }, this.enableMode_.bind(this));
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {
    // Set default value of optional binding properties
    this.autoclear = !!this.autoclear;
  }

  /**
   * Called on destruction of the controller.
   */
  $onDestroy() {
    this.enableMode_(null);
  }

  // === Mode enabling/disabling ===

  /**
   * Disable the current mode, then enable a new mode, i.e. add any
   * interaction of that mode to the map.
   *
   * @param {?string} mode Mode to enable
   * @private
   */
  enableMode_(mode) {
    this.disableMode_();

    // No need to do anything if there's no mode to enable
    if (!mode) {
      return;
    }

    // For debug purpose
    // console.log(`mode enable: ${mode}`);

    switch (mode) {
      case ngeoQueryMode.CLICK:
        this.listenerKeys_.push(olEventsListen(this.map, 'singleclick', this.handleMapClick_, this));
        if (this.ngeoQueryOptions_.cursorHover) {
          this.listenerKeys_.push(olEventsListen(this.map, 'pointermove', this.handleMapPointerMove_, this));
        }
        break;

      case ngeoQueryMode.DRAW_BOX:
        this.map.addLayer(this.vectorLayer_);
        this.map.addInteraction(this.drawBoxInteraction_);
        this.listenerKeys_.push(
          olEventsListen(
            this.drawBoxInteraction_,
            'drawend',
            /** @type {import('ol/events.js').ListenerFunction} */ (this.handleDrawBoxInteractionDrawEnd_),
            this
          )
        );
        break;

      case ngeoQueryMode.DRAW_POLYGON:
        this.map.addLayer(this.vectorLayer_);
        this.map.addInteraction(this.drawPolygonInteraction_);
        this.listenerKeys_.push(
          olEventsListen(
            this.drawPolygonInteraction_,
            'drawend',
            /** @type {import('ol/events.js').ListenerFunction} */ (this
              .handleDrawPolygonInteractionDrawEnd_),
            this
          )
        );
        break;

      default:
        break;
    }

    this.mode_ = mode;
  }

  /**
   * Disable the current mode, i.e. remove any interaction of that
   * mode from the map.
   * @private
   */
  disableMode_() {
    // No need to do anything if there's no mode currently active
    if (!this.mode_) {
      return;
    }

    // For debug purpose
    // console.log(`mode disable: ${this.mode_}`);

    switch (this.mode_) {
      case ngeoQueryMode.CLICK:
        // Reset cursor, if required
        if (this.ngeoQueryOptions_.cursorHover) {
          this.map.getTargetElement().style.cursor = '';
        }
        break;

      case ngeoQueryMode.DRAW_BOX:
        this.vectorSource_.clear();
        this.map.removeLayer(this.vectorLayer_);
        this.map.removeInteraction(this.drawBoxInteraction_);
        break;

      case ngeoQueryMode.DRAW_POLYGON:
        this.vectorSource_.clear();
        this.map.removeLayer(this.vectorLayer_);
        this.map.removeInteraction(this.drawPolygonInteraction_);
        break;

      default:
        break;
    }

    ngeoEventsUnlistenByKeys(this.listenerKeys_);

    this.mode_ = null;
  }

  // === Utilities ===

  /**
   * The maximum number of features a query should return. Obtained
   * from the options.
   * @return {number|undefined}
   * @private
   */
  getLimitOption_() {
    return this.ngeoQueryOptions_ && this.ngeoQueryOptions_.limit ? this.ngeoQueryOptions_.limit : undefined;
  }

  // === Handlers ===

  /**
   * Called when active property changes
   * @param {boolean} active Whether this component is active or not.
   * @private
   */
  handleActiveChange_(active) {
    if (!active) {
      if (this.autoclear) {
        this.ngeoMapQuerent_.clear();
      }
    }
  }

  /**
   * Called when a box is drawn on the map. Use it to issue a query.
   * @param {import('lib/ol.interaction.Draw.js').DrawEvent} evt The draw interaction drawend event being fired.
   * @private
   */
  handleDrawBoxInteractionDrawEnd_(evt) {
    const feature = evt.feature;

    const action = this.ngeoQueryModeSelector_.action;
    const extent = feature.getGeometry().getExtent();
    const limit = this.getLimitOption_();
    const map = this.map;

    this.ngeoQueryModeSelector_.pending = true;

    this.ngeoMapQuerent_
      .issue({
        action,
        extent,
        limit,
        map,
      })
      .then(() => {})
      .catch(() => {})
      .then(() => {
        // "finally"
        this.vectorSource_.clear();
        this.ngeoQueryModeSelector_.pending = false;
      });
  }

  /**
   * Called when a polygon is drawn on the map. Use it to issue a query.
   * @param {import('lib/ol.interaction.Draw.js').DrawEvent} evt The draw interaction drawend event being fired.
   * @private
   */
  handleDrawPolygonInteractionDrawEnd_(evt) {
    const feature = evt.feature;

    const action = this.ngeoQueryModeSelector_.action;
    const geometry = feature.getGeometry();
    const limit = this.getLimitOption_();
    const map = this.map;

    this.ngeoQueryModeSelector_.pending = true;

    this.ngeoMapQuerent_
      .issue({
        action,
        geometry,
        limit,
        map,
      })
      .then(() => {})
      .catch(() => {})
      .then(() => {
        // "finally"
        this.vectorSource_.clear();
        this.ngeoQueryModeSelector_.pending = false;
      });
  }

  /**
   * Called when the map is clicked while this component is active and the mode is "click". Issue a request
   * to the query service using the coordinate that was clicked.
   * @param {Event|import("ol/events/Event.js").default} evt The map browser event being fired.
   * @private
   */
  handleMapClick_(evt) {
    if (!(evt instanceof MapBrowserEvent)) {
      return;
    }

    const action = this.ngeoQueryModeSelector_.action;
    const coordinate = evt.coordinate;
    const map = this.map;

    this.ngeoQueryModeSelector_.pending = true;

    this.ngeoMapQuerent_
      .issue({
        action,
        coordinate,
        map,
      })
      .then(() => {})
      .catch(() => {})
      .then(() => {
        // "finally"
        this.ngeoQueryModeSelector_.pending = false;
      });
  }

  /**
   * Called when the pointer is moved over the map while this component is active and the mode is "click".
   * Change the mouse pointer when hovering a non-transparent pixel on the map.
   * @returns {boolean}
   * @param {Event|import("ol/events/Event.js").default} evt The map browser event being fired.
   */
  handleMapPointerMove_(evt) {
    // No need to do anything if user is dragging the map
    if (!(evt instanceof MapBrowserEvent) || evt.dragging) {
      return;
    }

    const pixel = this.map.getEventPixel(evt.originalEvent);

    /**
     * @param {import('ol/layer/Base').default} layer
     */
    const queryable = function (layer) {
      const visible = layer.get('visible');
      const sourceids = layer.get('querySourceIds');
      return visible && !!sourceids;
    };
    const hit = this.map.forEachLayerAtPixel(pixel, () => true, {
      layerFilter: queryable,
    });
    this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  }
}

myModule.component('ngeoQuery', {
  bindings: {
    'active': '=',
    'autoclear': '=?',
    'map': '<',
  },
  controller: QueryController,
});

export default myModule;
