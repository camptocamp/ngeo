// The MIT License (MIT)
//
// Copyright (c) 2017-2022 Camptocamp SA
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
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import * as olArray from 'ol/array';
import {listen, unlistenByKey} from 'ol/events';
import olFeature from 'ol/Feature';
import olGeomPoint from 'ol/geom/Point';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import GoogleStreetviewService from './GoogleStreetviewService';
import MapillaryService from './MapillaryService';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoStreetview', []);

myModule.value(
  'ngeoStreetviewTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoStreetviewTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/streetview';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/streetview', require('./component.html'));
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoStreetviewTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoStreetviewTemplateUrl($attrs, ngeoStreetviewTemplateUrl) {
  return ngeoStreetviewTemplateUrl($attrs);
}

/**
 * This component is used to integrate a streetview tool (googlestreetview or mapillary)
 * The tool has to be declared in the constant 'ngeoStreetviewOptions'. For mapillary
 * the key (accessToken) is needed as well.
 *
 * module.constant('ngeoStreetviewOptions', {
 *  'viewer': 'google',
 * });
 *
 * module.constant('ngeoStreetviewOptions', {
 * 'viewer': 'mapillary',
 * 'key': '<your_key>',
 * });
 *
 * Example:
 *
 *             <ngeo-streetview
 *                 active="mainCtrl.streetViewActive"
 *                 feature-style="mainCtrl.streetViewStyle"
 *                 map="mainCtrl.map"
 *                 panel-width="mainCtrl.toolsPanelWidth"
 *                 options-name="ngeoSreetviewOptions">
 *             </ngeo-streetview>
 */
class StreetviewController {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IScope} $scope Scope.
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.ITimeoutService} $timeout
   *    FeatureOverlay manager.
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoStreetviewController
   */
  constructor($element, $scope, $http, $injector, $timeout) {
    // Binding properties

    /**
     * @type {angular.ITimeoutService}
     */
    this.timeout_ = $timeout;

    /**
     * @type {string}
     */
    this.optionsName = null;

    /**
     * @type {boolean}
     */
    this.active = false;

    $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

    /**
     * Style for the feature.
     *
     * @type {?import('ol/style/Style').StyleLike}
     */
    this.featureStyle = null;

    /**
     * @type {number}
     */
    this.panelWidth = null;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * @type {number}
     */
    this.radius;

    // Injected properties

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.auto.IInjectorService}
     * @private
     */
    this.injector_ = $injector;

    /**
     * @type {JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * Angular $http service.
     * @private
     */
    this.http_ = $http;

    // Inner properties

    /**
     * @type {olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.feature_ = new olFeature();

    /**
     * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
     * @private
     */
    this.featureOverlay_ = ngeoMapFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The current location in the OpenLayers' map view projection.
     *
     * @type {?import('ol/coordinate').Coordinate}
     * @private
     */
    this.location = null;

    /**
     * @type {import('ol/geom/Point').default}
     * @private
     */
    this.point_ = new olGeomPoint([0, 0]);

    this.feature_.setGeometry(this.point_);

    /**
     * @type {import('./Service').StreetviewService}
     * @private
     */
    this.streetViewService_ = null;

    /**
     * @type {string}
     */
    this.viewer = 'mapillary';

    /**
     * @type {boolean}
     * @private
     */
    this.panoramaPositionChanging_ = false;

    /**
     * Called when the 'location' property of this component changes.
     *
     * @param  {?import('ol/coordinate').Coordinate} newCoordinates new coordinates in the streetview.
     * @private
     */
    this.handlePanoramaPositionChange_ = (newCoordinates) => {
      this.panoramaPositionChanging_ = true;
      this.map.getView().setCenter(newCoordinates);
      const point = /** @type  {import('ol/geom/Point').default} */ (this.feature_.getGeometry());
      point.setCoordinates(newCoordinates);
      this.location = newCoordinates;
      this.scope_.$apply();
      this.panoramaPositionChanging_ = false;
    };
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {
    // Initialization
    if (this.featureStyle) {
      this.feature_.setStyle(this.featureStyle);
    }

    /**
     * @type {string}
     */
    const config = this.optionsName || 'ngeoStreetviewOptions';

    /**
     * @type {import('ngeo/options').ngeoStreetviewOptions}
     */
    this.options = this.injector_.has(config) ? this.injector_.get(config) : null;

    this.viewer = this.options.viewer || 'mapillary';

    if (this.viewer === 'mapillary') {
      this.initMapillary_();
    } else {
      this.streetViewService_ = new GoogleStreetviewService(
        this.scope_,
        this.map,
        this.handlePanoramaPositionChange_,
        this.radius,
        this.element_
      );
      this.addWatchers_();
    }
  }

  addWatchers_() {
    // === Watchers ===

    // (1) Watch for any change in the location
    this.scope_.$watch(() => this.location, this.handleLocationChange_.bind(this));

    // (2) Watch for both the active and location. When we have both, the
    //     state is considered 'ready'.
    this.scope_.$watch(() => {
      const isActive = this.active;
      const hasLocation = this.location !== null;
      return isActive && hasLocation;
    }, this.handleReadyChange_.bind(this));

    // (3) Watcher to manage the visibility of the panorama.
    this.scope_.$watch(
      () => {
        const isActive = this.active;
        const hasLocation = this.location !== null;
        const hasData = this.streetViewService_.noDataAtLocation === false;
        return isActive && hasLocation && hasData;
      },
      (show, oldShow) => {
        if (show === oldShow) {
          return;
        }
        this.streetViewService_.toggleShow(show);
      }
    );
  }

  /**
   * Init the mapillary functionality.
   *
   * @private
   */
  initMapillary_() {
    if (!this.options || !this.options.key) {
      throw new Error('Missing mapillary key');
    }
    const accessToken = this.options.key;
    const bufferSize = this.options.bufferSize;
    //wait for the mly div to be there before making the service which needs it
    this.timeout_(() => {
      const mapillaryService = new MapillaryService(
        this.scope_,
        this.timeout_,
        this.http_,
        this.map,
        this.handlePanoramaPositionChange_,
        accessToken,
        bufferSize
      );
      this.scope_.$watch(
        () => this.panelWidth,
        (newVal) => {
          mapillaryService.resize();
        }
      );
      this.streetViewService_ = mapillaryService;
      this.addWatchers_();
    });
  }

  /**
   * Called when the 'active' property of this component changes.
   *
   * @param {boolean} active Active.
   * @private
   */
  handleActiveChange_(active) {
    if (!this.map) {
      throw new Error('Missing map');
    }

    const keys = this.listenerKeys_;

    if (active) {
      keys.push(listen(this.map, 'click', this.handleMapClick_, this));
    } else {
      keys.forEach(unlistenByKey);
      keys.length = 0;
    }
  }

  /**
   * Called when the 'location' property of this component changes.
   *
   * @param {?import('ol/coordinate').Coordinate} location Location, in OL map view projection.
   * @param {?import('ol/coordinate').Coordinate} oldLocation The previous location.
   * @private
   */
  handleLocationChange_(location, oldLocation) {
    // (1) No need to do anything if the old value equals the new value
    if (
      location === oldLocation ||
      (Array.isArray(location) && Array.isArray(oldLocation) && olArray.equals(location, oldLocation))
    ) {
      return;
    }

    // (2) Update point coordinates
    this.point_.setCoordinates(location);

    // (3) Update StreetView location
    if (location && !this.panoramaPositionChanging_) {
      this.streetViewService_.getPanorama(location);
    }
  }

  /**
   * Called when the map is clicked while this component is active. Update the
   * location accordingly.
   *
   * @param {Event|import('ol/events/Event').default} evt The map browser event being fired.
   * @private
   */
  handleMapClick_(evt) {
    if (evt instanceof MapBrowserEvent) {
      this.location = evt.coordinate;
      this.scope_.$apply();
    }
  }

  /**
   * Called when the component 'virtual ready' state changes.
   *
   * When ready:
   *  - add the feature to the overlay
   *
   * When not ready:
   *  - remove the feature from the overlay
   *
   * @param {boolean} ready Whether the component is ready or not.
   * @param {boolean} oldReady Previous ready value.
   * @private
   */
  handleReadyChange_(ready, oldReady) {
    if (ready === oldReady) {
      return;
    }

    if (ready) {
      this.featureOverlay_.addFeature(this.feature_);
      setTimeout(() => {
        this.map.updateSize();
      }, 50);
    } else {
      this.featureOverlay_.removeFeature(this.feature_);
    }
  }
}

myModule.component('ngeoStreetview', {
  bindings: {
    'active': '<',
    'optionsName': '@',
    'featureStyle': '<?',
    'map': '<',
    'radius': '<?',
    'panelWidth': '<?',
  },
  controller: StreetviewController,
  templateUrl: ngeoStreetviewTemplateUrl,
});

export default myModule;
