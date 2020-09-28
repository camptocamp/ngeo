// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
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
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService.js';
import ngeoRoutingRoutingService from 'ngeo/routing/RoutingService.js';
import ngeoRoutingRoutingFeatureComponent from 'ngeo/routing/RoutingFeatureComponent.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olGeomPoint from 'ol/geom/Point.js';
import olSourceVector from 'ol/source/Vector.js';
import olLayerVector from 'ol/layer/Vector.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import {toLonLat} from 'ol/proj.js';
import olFeature from 'ol/Feature.js';
import olGeomLineString from 'ol/geom/LineString.js';
import 'ngeo/sass/font.scss';

/**
 * @typedef {Object} RoutingVia
 * @property {olFeature<import("ol/geom/Geometry.js").default>} [feature]
 * @property {function(import('ngeo/routing/NominatimService').NominatimSearchResult): void} [onSelect]
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoRoutingComponent', [
  ngeoMiscDebounce.name,
  ngeoMiscFilters.name,
  ngeoRoutingNominatimService.name,
  ngeoRoutingRoutingService.name,
  ngeoRoutingRoutingFeatureComponent.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/routing/routing', require('./routing.html'));
  }
);

module.value(
  'ngeoRoutingTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}

/**
 * The controller for the routing directive.
 * @private
 * @hidden
 */
class Controller {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {import("ngeo/routing/RoutingService.js").RoutingService} ngeoRoutingService service for OSRM
   *    routing.
   * @param {import("ngeo/routing/NominatimService.js").NominatimService} ngeoNominatimService service for
   *    Nominatim.
   * @param {angular.IQService} $q Angular q service
   * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo Debounce
   *    service.
   * @param {import('ngeo/options.js').ngeoRoutingOptions} ngeoRoutingOptions The options.
   * @ngInject
   */
  constructor($scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce, ngeoRoutingOptions) {
    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {import("ngeo/routing/RoutingService.js").RoutingService}
     * @private
     */
    this.ngeoRoutingService_ = ngeoRoutingService;

    /**
     * @type {import("ngeo/routing/NominatimService.js").NominatimService}
     * @private
     */
    this.ngeoNominatimService_ = ngeoNominatimService;

    /**
     * @type {import('ngeo/options.js').ngeoRoutingOptions}
     * @private
     */
    this.routingOptions_ = ngeoRoutingOptions;

    /**
     * Available routing profiles.
     * Example: [
     *            {
     *              label: 'Car', // used as label in the UI
     *              profile: 'routed-car' // used as part of the query
     *            }
     *          ]
     * @type {import('ngeo/options.js').RoutingProfile[]}
     */
    this.routingProfiles = this.routingOptions_.profiles || [];

    /**
     * @type {?import('ngeo/options.js').RoutingProfile}
     */
    this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;

    $scope.$watch(() => this.selectedRoutingProfile, this.calculateRoute.bind(this));

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * @type {string}
     */
    this.errorMessage = '';

    /**
     * @type {?olFeature<import("ol/geom/Geometry.js").default>}
     */
    this.startFeature_ = null;

    /**
     * @type {?olFeature<import("ol/geom/Geometry.js").default>}
     */
    this.targetFeature_ = null;

    /**
     * @type {RoutingVia[]}
     */
    this.viaArray = [];

    /**
     * @type {Object<string, string>}
     */
    this.colors = {
      startFill: '#6BE62E',
      startStroke: '#4CB01E',
      destinationFill: '#FF3E13',
      destinationStroke: '#CD3412',
      viaFill: '#767676',
      viaStroke: '#000000',
      lineRGBA: 'rgba(16, 112, 29, 0.6)',
    };

    /**
     * @type {import("ol/source/Vector.js").default<import("ol/geom/Geometry.js").default>}
     * @private
     */
    this.routeSource_ = new olSourceVector({
      features: [],
    });

    /**
     * @type {import("ol/layer/Vector.js").default}
     * @private
     */
    this.routeLayer_ = new olLayerVector({
      source: this.routeSource_,
      style: new olStyleStyle({
        fill: new olStyleFill({
          color: this.colors.lineRGBA,
        }),
        stroke: new olStyleStroke({
          color: this.colors.lineRGBA,
          width: 5,
        }),
      }),
    });

    /**
     * Distance of route in meters
     * @type {number}
     */
    this.routeDistance = 0;

    /**
     * Duration of route in minutes.
     * @type {?number}
     */
    this.routeDuration = null;

    /**
     * @type {RegExp}
     * @private
     */
    this.regexIsFormattedCoord = /\d+\.\d+\/\d+\.\d+/;

    /**
     * @type {?import("ol/interaction/Draw.js").default}
     * @private
     */
    this.draw_ = null;

    const debounceDelay = 200; // in milliseconds

    /**
     * Debounced because in some cases (reverse route) multiple changes are done
     * at once and spam this function.
     * @type {function(): void}
     */
    this.handleChange = ngeoDebounce(this.calculateRoute.bind(this), debounceDelay, true);
  }

  /**
   * Init the controller
   */
  $onInit() {
    if (this.map) {
      this.map.addLayer(this.routeLayer_);
    }
  }

  /**
   * Clears start, end and vias. Removes features from map.
   */
  clearRoute() {
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.routeDistance = 0;
    this.routeDuration = null;
    this.routeSource_.clear();
    this.errorMessage = '';
  }

  /**
   * Converts feature point into LonLat coordinate.
   * @param {olFeature<import("ol/geom/Geometry.js").default>} point Feature point to convert
   * @return {?import("ol/coordinate.js").Coordinate} LonLat coordinate
   * @private
   */
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    if (!(geometry instanceof olGeomPoint)) {
      throw new Error('Wrong time values type');
    }
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return toLonLat(coords, projection);
  }

  /**
   * Flip start and target and re-calculate route.
   */
  reverseRoute() {
    // swap start and target
    const tmpFeature = this.startFeature_;
    this.startFeature_ = this.targetFeature_;
    this.targetFeature_ = tmpFeature;

    // reverse vias
    this.viaArray = this.viaArray.reverse();

    // recalculation is done by the debounced handleChange
  }

  /**
   * @param {import('./RoutingService').Route} route Routes of OSRM response
   * @return {olFeature<import("ol/geom/Geometry.js").default>[]} parsed route features
   * @private
   */
  parseRoute_(route) {
    if (!this.map) {
      return [];
    }
    /** @type {olFeature<import('ol/geom/Geometry.js').default>[]} */
    let parsedRoutes = [];
    const format = new olFormatGeoJSON();
    const formatConfig = {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.getView().getProjection(),
    };
    // if there are useful "legs" data, parse this
    if (route.legs) {
      /** @type {olFeature<import('ol/geom/Geometry.js').default>[][]} */
      const parsedRoutes_ = route.legs.map((leg) =>
        leg.steps.map(
          (step) =>
            new olFeature({
              geometry: format.readGeometry(step.geometry, formatConfig),
            })
        )
      );
      // flatten
      parsedRoutes = [].concat(...parsedRoutes_);
    } else if (route.geometry) {
      // otherwise parse (overview) geometry
      parsedRoutes.push(new olFeature({geometry: format.readGeometry(route.geometry, formatConfig)}));
    }
    return parsedRoutes;
  }

  /**
   */
  calculateRoute() {
    if (!this.startFeature_ || !this.targetFeature_) {
      return;
    }
    // remove rendered routes
    this.routeSource_.clear();

    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray
      .filter((via) => via.feature !== null)
      .map((via) => this.getLonLatFromPoint_(via.feature));
    const route = /** @type {number[][]} */ ([coordFrom].concat(vias, [coordTo]));

    /**
     * @param {angular.IHttpResponse<import('./RoutingService').Routes>} resp
     * @return {unknown}
     */
    const onSuccess_ = (resp) => {
      if (!this.map || !this.startFeature_ || !this.targetFeature_) {
        return;
      }
      const features = this.parseRoute_(resp.data.routes[0]);
      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }
      this.routeSource_.addFeatures(features);

      // recenter map on route
      this.map.getView().fit(this.routeSource_.getExtent());

      this.routeDistance = resp.data.routes[0].distance;
      this.routeDuration = resp.data.routes[0].duration;

      // get first and last coordinate of route
      const startRoute = /** @type {import("ol/geom/LineString.js").default} */ (features[0].getGeometry()).getCoordinateAt(
        0
      );
      const endRoute = /** @type {import("ol/geom/LineString.js").default} */ (features[
        features.length - 1
      ].getGeometry()).getCoordinateAt(1);

      // build geometries to connect route to start and end point of query
      const startToRoute = [
        /** @type {import("ol/geom/Point.js").default} */ (this.startFeature_.getGeometry()).getCoordinates(),
        startRoute,
      ];
      const routeToEnd = [
        endRoute,
        /** @type {import("ol/geom/Point.js").default} */ (this.targetFeature_.getGeometry()).getCoordinates(),
      ];
      const routeConnections = [
        new olFeature(new olGeomLineString(startToRoute)),
        new olFeature(new olGeomLineString(routeToEnd)),
      ];

      // add them to the source
      this.routeSource_.addFeatures(routeConnections);
    };

    /**
     * @param {angular.IHttpResponse<import('./RoutingService').Route>} resp
     */
    const onError_ = (resp) => {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    };

    /** @type {Object<string, string|boolean>} */
    const options = {};
    options.steps = true;
    options.overview = false;
    options.geometries = 'geojson';

    /** @type {import('./RoutingService').Config} */
    const config = {};
    config.options = options;

    if (this.selectedRoutingProfile) {
      config.instance = this.selectedRoutingProfile.profile;
    }

    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_, onError_);
  }

  /**
   */
  addVia() {
    this.viaArray.push({});
  }

  /**
   * @param {number} index Array index.
   */
  deleteVia(index) {
    if (this.viaArray.length > index) {
      this.viaArray.splice(index, 1);
      this.calculateRoute();
    }
  }
}

module.component('ngeoRouting', {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingMap',
  },
  templateUrl: ngeoRoutingTemplateUrl,
});

export default module;
