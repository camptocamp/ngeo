// The MIT License (MIT)
//
// Copyright (c) 2014-2020 Camptocamp SA
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

import './permalink.css';
import angular from 'angular';
import ngeoFormatFeatureHash from 'ngeo/format/FeatureHash.js';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import {interactionDecoration} from 'ngeo/misc/decorate.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import olMap from 'ol/Map.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/** @type {angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscDebounce.name,
  ngeoStatemanagerModule.name,
]);

/**
 * An application-specific map component that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This component gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @type {angular.IComponentOptions}
 */
const mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap',
  },
  template: '<div ngeo-map=ctrl.map></div>',
};

module.component('appMap', mapComponent);

/**
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo Location service.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(import("ol/events/Event.js").default): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @constructor
 * @ngInject
 */
function MapComponentController(ngeoLocation, ngeoDebounce) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(import("ol/events/Event.js").default): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;
}

module.controller('AppMapController', MapComponentController);

MapComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const view = this.map.getView();

  const zoom_ = this.ngeoLocation_.getParam('z');
  const zoom = zoom_ !== undefined ? +zoom_ : 4;

  const x = this.ngeoLocation_.getParam('x');
  const y = this.ngeoLocation_.getParam('y');
  const center = x !== undefined && y !== undefined ? [+x, +y] : [0, 0];

  view.setCenter(center);
  view.setZoom(zoom);

  this.ngeoLocation_.updateParams({
    'z': `${zoom}`,
    'x': `${Math.round(center[0])}`,
    'y': `${Math.round(center[1])}`,
  });

  view.on(
    'propertychange',
    /** @type {function(?): ?} */ (this.ngeoDebounce_(
      /**
       * @param {import("ol/events/Event.js").default} e Object event.
       */
      (e) => {
        const center = view.getCenter();
        if (!center) {
          throw new Error('Missing center');
        }
        const params = {
          'z': `${view.getZoom()}`,
          'x': `${Math.round(center[0])}`,
          'y': `${Math.round(center[1])}`,
        };
        this.ngeoLocation_.updateParams(params);
      },
      300,
      /* invokeApply */ true
    ))
  );
};

/**
 * A draw component that adds a simple draw tool.
 *
 * @type {angular.IComponentOptions}
 */
const drawComponent = {
  controller: 'AppDrawController as ctrl',
  bindings: {
    'map': '=appDrawMap',
    'layer': '=appDrawLayer',
  },
  template:
    '<label>Enable drawing:' +
    '<input type="checkbox" ng-model="ctrl.interaction.active" />' +
    '</label><br>' +
    '<button ng-click="ctrl.clearLayer()">Clear layer</button>',
};

module.component('appDraw', drawComponent);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo Location service.
 * @constructor
 * @ngInject
 */
function DrawComponentController($scope, ngeoLocation) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?import("ol/layer/Vector.js").default}
   */
  this.layer = null;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {number}
   */
  this.featureSeq_ = 0;

  /**
   * @type {?import("ol/interaction/Draw.js").default}
   */
  this.interaction = null;
}

DrawComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  /**
   * @type {olSourceVector<import("ol/geom/Geometry.js").default>}
   */
  const vectorSource = this.layer.getSource();

  this.interaction = new olInteractionDraw({
    type: 'LineString',
    source: vectorSource,
  });

  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  interactionDecoration(this.interaction);

  this.interaction.on(
    'drawend',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (e) => {
        e.feature.set('id', ++this.featureSeq_);
      }
    )
  );

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeoFormatFeatureHash();

  vectorSource.on(
    'addfeature',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (e) => {
        const feature = e.feature;
        feature.setStyle(
          new olStyleStyle({
            stroke: new olStyleStroke({
              color: [255, 0, 0, 1],
              width: 2,
            }),
          })
        );
        const features = vectorSource.getFeatures();
        const encodedFeatures = fhFormat.writeFeatures(features);
        this.scope_.$applyAsync(() => {
          this.ngeoLocation_.updateParams({'features': encodedFeatures});
        });
      }
    )
  );

  const encodedFeatures = this.ngeoLocation_.getParam('features');
  if (encodedFeatures !== undefined) {
    const features = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (fhFormat.readFeatures(
      encodedFeatures
    ));
    this.featureSeq_ = features.length;
    vectorSource.addFeatures(features);
  }
};

/**
 * Clear the vector layer.
 */
DrawComponentController.prototype.clearLayer = function () {
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  const source = this.layer.getSource();
  if (!(source instanceof olSourceVector)) {
    throw new Error('Wrong source');
  }
  source.clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

module.controller('AppDrawController', DrawComponentController);

/**
 * @constructor
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
  });

  const vectorSource = new olSourceVector();

  /**
   * @type {import("ol/layer/Vector.js").default}
   */
  this.vectorLayer = new olLayerVector({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  this.vectorLayer.setMap(this.map);
}

module.controller('MainController', MainController);

export default module;
