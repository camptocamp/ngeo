import angular from 'angular';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService.js';
import ngeoRoutingRoutingService from 'ngeo/routing/RoutingService.js';
import ngeoRoutingRoutingFeatureComponent from 'ngeo/routing/RoutingFeatureComponent.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
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
 * @property {?import("ol/Feature.js").default} feature
 * @property {function(import('ngeo/routing/NominatimService').NominatimSearchResult)} onSelect
 */

/**
 * @type {!angular.IModule}
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
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/routing/routing', require('./routing.html'));
  }
);

module.value(
  'ngeoRoutingTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} ngeoRoutingTemplateUrl Template function.
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
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {!angular.IScope} $scope Scope.
 * @param {!import("ngeo/routing/RoutingService.js").RoutingService} ngeoRoutingService service for OSRM
 *    routing.
 * @param {!import("ngeo/routing/NominatimService.js").NominatimService} ngeoNominatimService service for
 *    Nominatim.
 * @param {!angular.IQService} $q Angular q service
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingController
 */
function Controller($injector, $scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce) {
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
   * @type {import('ngeo/routing/RoutingService').RoutingOptions}
   * @private
   */
  this.routingOptions_ = $injector.has('ngeoRoutingOptions') ? $injector.get('ngeoRoutingOptions') : {};

  /**
   * Available routing profiles.
   * Example: [
   *            {
   *              label: 'Car', // used as label in the UI
   *              profile: 'routed-car' // used as part of the query
   *            }
   *          ]
   * @type {Array<import('ngeo/routing/RoutingService').RoutingProfile>}
   */
  this.routingProfiles = this.routingOptions_.profiles || [];

  /**
   * @type {?import('ngeo/routing/RoutingService').RoutingProfile}
   */
  this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;

  $scope.$watch(() => this.selectedRoutingProfile, this.calculateRoute.bind(this));

  /**
   * @type {angular.IQService}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {string}
   */
  this.errorMessage = '';

  /**
   * @type {import("ol/Feature.js").default}
   */
  this.startFeature_ = null;

  /**
   * @type {import("ol/Feature.js").default}
   */
  this.targetFeature_ = null;

  /**
   * @type {Array.<RoutingVia>}
   */
  this.viaArray = [];

  /**
   * @type {Object<string, string>}
   */
  this.colors = {
    'start.fill': '#6BE62E',
    'start.stroke': '#4CB01E',
    'destination.fill': '#FF3E13',
    'destination.stroke': '#CD3412',
    'via.fill': '#767676',
    'via.stroke': '#000000',
  };

  /**
   * @type {import("ol/source/Vector.js").default}
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
        color: 'rgba(16, 112, 29, 0.6)',
      }),
      stroke: new olStyleStroke({
        color: 'rgba(16, 112, 29, 0.6)',
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
   * @type {import("ol/interaction/Draw.js").default}
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
Controller.prototype.$onInit = function () {
  this.map.addLayer(this.routeLayer_);
};

/**
 * Clears start, end and vias. Removes features from map.
 */
Controller.prototype.clearRoute = function () {
  this.startFeature_ = null;
  this.targetFeature_ = null;
  this.viaArray = [];
  this.routeDistance = 0;
  this.routeDuration = null;
  this.routeSource_.clear();
  this.errorMessage = '';
};

/**
 * Converts feature point into LonLat coordinate.
 * @param {import("ol/Feature.js").default} point Feature point to convert
 * @return {import("ol/coordinate.js").Coordinate} LonLat coordinate
 * @private
 */
Controller.prototype.getLonLatFromPoint_ = function (point) {
  const geometry = /** @type {import("ol/geom/Point.js").default} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return toLonLat(coords, projection);
};

/**
 * Flip start and target and re-calculate route.
 */
Controller.prototype.reverseRoute = function () {
  // swap start and target
  const tmpFeature = this.startFeature_;
  this.startFeature_ = this.targetFeature_;
  this.targetFeature_ = tmpFeature;

  // reverse vias
  this.viaArray = this.viaArray.reverse();

  // recalculation is done by the debounced handleChange
};

/**
 * @param {Object} route Routes of OSRM response
 * @returns {Array<import("ol/Feature.js").default>} parsed route features
 * @private
 */
Controller.prototype.parseRoute_ = function (route) {
  let parsedRoutes = [];
  const format = new olFormatGeoJSON();
  const formatConfig = {
    dataProjection: 'EPSG:4326',
    featureProjection: this.map.getView().getProjection(),
  };
  // if there are is useful "legs" data, parse this
  if (route.legs) {
    parsedRoutes = route.legs.map((leg) =>
      leg.steps.map(
        (step) =>
          new olFeature({
            geometry: format.readGeometry(step.geometry, formatConfig),
          })
      )
    );
    // flatten
    parsedRoutes = [].concat(...parsedRoutes);
  } else if (route.geometry) {
    // otherwise parse (overview) geometry
    parsedRoutes.push(new olFeature({geometry: format.readGeometry(route.geometry, formatConfig)}));
  }
  return parsedRoutes;
};

/**
 */
Controller.prototype.calculateRoute = function () {
  if (this.startFeature_ && this.targetFeature_) {
    // remove rendered routes
    this.routeSource_.clear();

    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray
      .filter((via) => via.feature !== null)
      .map((via) => this.getLonLatFromPoint_(via.feature));
    const route = [coordFrom].concat(vias, [coordTo]);

    const onSuccess_ = function (resp) {
      const features = this.parseRoute_(resp.data.routes[0]);
      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }
      this.routeSource_.addFeatures(features);

      // recenter map on route
      this.map.getView().fit(this.routeSource_.getExtent());

      this.routeDistance = parseInt(resp.data.routes[0].distance, 10);
      this.routeDuration = resp.data.routes[0].duration;

      // get first and last coordinate of route
      const startRoute = /** @type{import("ol/geom/LineString.js").default} */ (
        features[0].getGeometry()
      ).getCoordinateAt(0);
      const endRoute = /** @type{import("ol/geom/LineString.js").default} */ (
        features[features.length - 1].getGeometry()
      ).getCoordinateAt(1);

      // build geometries to connect route to start and end point of query
      const startToRoute = [
        /** @type {import("ol/geom/Point.js").default} */ (this.startFeature_.getGeometry()).getCoordinates(),
        startRoute,
      ];
      const routeToEnd = [
        endRoute,
        /** @type {import("ol/geom/Point.js").default} */ (
          this.targetFeature_.getGeometry()
        ).getCoordinates(),
      ];
      const routeConnections = [
        new olFeature(new olGeomLineString(startToRoute)),
        new olFeature(new olGeomLineString(routeToEnd)),
      ];

      // add them to the source
      this.routeSource_.addFeatures(routeConnections);
    }.bind(this);

    const onError_ = function (resp) {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    }.bind(this);

    const options = {};
    options['steps'] = true;
    options['overview'] = false;
    options['geometries'] = 'geojson';

    const config = {};
    config['options'] = options;

    if (this.selectedRoutingProfile) {
      config['instance'] = this.selectedRoutingProfile['profile'];
    }

    this.$q_
      .when(this.ngeoRoutingService_.getRoute(route, config))
      .then(onSuccess_.bind(this), onError_.bind(this));
  }
};

/**
 */
Controller.prototype.addVia = function () {
  this.viaArray.push(
    /** @type{RoutingVia} */ ({
      feature: null,
      onSelect: null,
    })
  );
};

/**
 * @param {number} index Array index.
 */
Controller.prototype.deleteVia = function (index) {
  if (this.viaArray.length > index) {
    this.viaArray.splice(index, 1);
    this.calculateRoute();
  }
};

module.component('ngeoRouting', {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingMap',
  },
  templateUrl: ngeoRoutingTemplateUrl,
});

export default module;
