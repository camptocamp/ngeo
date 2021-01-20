// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import gmfObjecteditingQuery from 'gmf/objectediting/Query.js';
import {listen, unlistenByKey} from 'ol/events.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfObjecteditingGetWMSFeatureComponent', [gmfObjecteditingQuery.name]);

/**
 * When activated, this directive registers clicks on an OL3 map and use the
 * clicked coordinate to fetch a feature using the ObjectEditing query service.
 * A feature returned is pushed to a collection.
 *
 * Example:
 *
 *     <gmf-objecteditinggetwmsfeature
 *         gmf-objecteditinggetwmsfeature-active="ctrl.active"
 *         gmf-objecteditinggetwmsfeature-features="ctrl.features"
 *         gmf-objecteditinggetwmsfeature-layerinfo="ctrl.layerInfo"
 *         gmf-objecteditinggetwmsfeature-map="::ctrl.map">
 *     </gmf-objecteditinggetwmsfeature>
 *
 * @htmlAttribute {boolean} gmf-objecteditinggetwmsfeature-active Whether the
 *     directive is active or not.
 * @htmlAttribute {import("ol/Collection.js").default} gmf-objecteditinggetwmsfeature-features
 *     The collection of features where to add those created by this directive.
 * @htmlAttribute {import('gmf/objectediting/toolsComponent.js').ObjectEditingQueryableLayerInfo}
 *     gmf-objecteditinggetwmsfeature-layerinfo Queryable layer info.
 * @htmlAttribute {import("ol/Map.js").default} gmf-objecteditinggetwmsfeature-map The map.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjecteditinggetwmsfeature
 */
function objectEditingGetWMSFeatureComponent() {
  return {
    controller: 'gmfObjecteditinggetwmsfeatureController',
    scope: {
      'active': '=gmfObjecteditinggetwmsfeatureActive',
      'features': '<gmfObjecteditinggetwmsfeatureFeatures',
      'layerInfo': '=gmfObjecteditinggetwmsfeatureLayerinfo',
      'map': '<gmfObjecteditinggetwmsfeatureMap',
    },
    bindToController: true,
  };
}

myModule.directive('gmfObjecteditinggetwmsfeature', objectEditingGetWMSFeatureComponent);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("gmf/objectediting/Query.js").ObjectEditingQuery} gmfObjectEditingQuery GMF ObjectEditing
 *     query service.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditinggetwmsfeatureController
 */
export function Controller($scope, gmfObjectEditingQuery) {
  // Scope properties

  /**
   * @type {boolean}
   */
  this.active = false;

  $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

  /**
   * @type {?import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
   */
  this.features = null;

  /**
   * @type {?import('gmf/objectediting/toolsComponent.js').ObjectEditingQueryableLayerInfo}
   */
  this.layerInfo = null;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  // Injected properties

  /**
   * @type {import("gmf/objectediting/Query.js").ObjectEditingQuery}
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

  /**
   * @type {import("ol/events.js").EventsKey[]}
   */
  this.listenerKeys_ = [];
}

/**
 * @param {boolean} active Active.
 */
Controller.prototype.handleActiveChange_ = function (active) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (active) {
    this.listenerKeys_.push(listen(this.map, 'click', this.handleMapClick_, this));
  } else {
    this.listenerKeys_.forEach(unlistenByKey);
  }
};

/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 */
Controller.prototype.handleMapClick_ = function (evt) {
  if (evt instanceof MapBrowserEvent) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.layerInfo) {
      throw new Error('Missing layerInfo');
    }
    this.gmfObjectEditingQuery_.getFeatureInfo(this.layerInfo, evt.coordinate, this.map).then((feature) => {
      if (feature) {
        if (!this.features) {
          throw new Error('Missing features');
        }
        this.features.push(feature);
      }
    });
  }
};

myModule.controller('gmfObjecteditinggetwmsfeatureController', Controller);

export default myModule;
