/**
 * @module ngeo.routing.RoutingComponent
 */
const exports = {};
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
import * as olProj from 'ol/proj.js';
import olFeature from 'ol/Feature.js';
import olGeomLineString from 'ol/geom/LineString.js';
import 'ngeo/sass/font.scss';


/**
 * @typedef {{
 *     feature: (?ol.Feature),
 *     onSelect: (function(NominatimSearchResult))
 * }} RoutingVia
 */


exports.module = angular.module('ngeoRoutingComponent', [
  ngeoMiscDebounce.name,
  ngeoMiscFilters.name,
  ngeoRoutingNominatimService.module.name,
  ngeoRoutingRoutingService.module.name,
  ngeoRoutingRoutingFeatureComponent.module.name
]);


exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/routing/routing', require('./routing.html'));
});


exports.module.value('ngeoRoutingTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/routing/routing';
  }
);


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoRoutingTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}


/**
 * The controller for the routing directive.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {!angular.IScope} $scope Scope.
 * @param {!ngeo.routing.RoutingService} ngeoRoutingService service for OSRM routing
 * @param {!ngeo.routing.NominatimService} ngeoNominatimService service for Nominatim
 * @param {!angular.IQService} $q Angular q service
 * @param {miscDebounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingController
 */
exports.Controller = function($injector, $scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce) {

  /**
   * @type {angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {ngeo.routing.RoutingService}
   * @private
   */
  this.ngeoRoutingService_ = ngeoRoutingService;

  /**
   * @type {ngeo.routing.NominatimService}
   * @private
   */
  this.ngeoNominatimService_ = ngeoNominatimService;

  /**
   * @type {RoutingOptions}
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
   * @type {Array<RoutingProfile>}
   * @export
   */
  this.routingProfiles = this.routingOptions_.profiles || [];

  /**
   * @type {?RoutingProfile}
   * @export
   */
  this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;

  $scope.$watch(
    () => this.selectedRoutingProfile,
    this.calculateRoute.bind(this)
  );

  /**
   * @type {angular.IQService}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {string}
   * @export
   */
  this.errorMessage = '';

  /**
   * @type {ol.Feature}
   * @export
   */
  this.startFeature_ = null;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.targetFeature_ = null;

  /**
   * @type {Array.<RoutingVia>}
   * @export
   */
  this.viaArray = [];

  /**
   * @type {Object<string, string>}
   * @export
   */
  this.colors = {
    'start.fill': '#6BE62E',
    'start.stroke': '#4CB01E',
    'destination.fill': '#FF3E13',
    'destination.stroke': '#CD3412',
    'via.fill': '#767676',
    'via.stroke': '#000000'
  };

  /**
   * @type {import("ol/source/Vector.js").default}
   * @private
   */
  this.routeSource_ = new olSourceVector({
    features: []
  });

  /**
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.routeLayer_ = new olLayerVector({
    source: this.routeSource_,
    style: new olStyleStyle({
      fill: new olStyleFill({
        color: 'rgba(16, 112, 29, 0.6)'
      }),
      stroke: new olStyleStroke({
        color: 'rgba(16, 112, 29, 0.6)',
        width: 5
      })
    })
  });

  /**
   * Distance of route in meters
   * @type {number}
   * @export
   */
  this.routeDistance = 0;

  /**
   * Duration of route in minutes.
   * @type {?number}
   * @export
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
   * @export
   * @type {function()}
   */
  this.handleChange = /** @type {function()} */
          (ngeoDebounce(
            /** @type {function(?)} */ (this.calculateRoute.bind(this)),
            debounceDelay,
            true));
};

/**
 * Init the controller
 */
exports.Controller.prototype.$onInit = function() {
  this.map.addLayer(this.routeLayer_);
};

/**
 * Clears start, end and vias. Removes features from map.
 * @export
 */
exports.Controller.prototype.clearRoute = function() {
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
 * @param {ol.Feature} point Feature point to convert
 * @return {ol.Coordinate} LonLat coordinate
 * @private
 */
exports.Controller.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {import("ol/geom/Point.js").default} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return olProj.toLonLat(coords, projection);
};

/**
 * Flip start and target and re-calculate route.
 * @export
 */
exports.Controller.prototype.reverseRoute = function() {
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
 * @returns {Array<ol.Feature>} parsed route features
 * @private
 */
exports.Controller.prototype.parseRoute_ = function(route) {
  let parsedRoutes = [];
  const format = new olFormatGeoJSON();
  const formatConfig = {
    dataProjection: 'EPSG:4326',
    featureProjection: this.map.getView().getProjection()
  };
  // if there are is useful "legs" data, parse this
  if (route.legs) {
    parsedRoutes = route.legs.map(leg => leg.steps.map(step => new olFeature({geometry: format.readGeometry(step.geometry, formatConfig)})));
    // flatten
    parsedRoutes = [].concat(...parsedRoutes);
  } else if (route.geometry) {
  // otherwise parse (overview) geometry
    parsedRoutes.push(new olFeature({geometry: format.readGeometry(route.geometry, formatConfig)}));
  }
  return parsedRoutes;
};

/**
 * @export
 */
exports.Controller.prototype.calculateRoute = function() {
  if (this.startFeature_ && this.targetFeature_) {
    // remove rendered routes
    this.routeSource_.clear();

    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray.filter(via => via.feature !== null).map(via => this.getLonLatFromPoint_(via.feature));
    const route = [coordFrom].concat(vias, [coordTo]);

    const onSuccess_ = (function(resp) {
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
      const startRoute = /** @type{import("ol/geom/LineString.js").default} */(features[0].getGeometry()).getCoordinateAt(0);
      const endRoute = /** @type{import("ol/geom/LineString.js").default} */(features[features.length - 1].getGeometry()).getCoordinateAt(1);

      // build geometries to connect route to start and end point of query
      const startToRoute = [/** @type {import("ol/geom/Point.js").default} */(this.startFeature_.getGeometry()).getCoordinates(), startRoute];
      const routeToEnd = [endRoute, /** @type {import("ol/geom/Point.js").default} */(this.targetFeature_.getGeometry()).getCoordinates()];
      const routeConnections = [
        new olFeature(new olGeomLineString(startToRoute)),
        new olFeature(new olGeomLineString(routeToEnd))
      ];

      // add them to the source
      this.routeSource_.addFeatures(routeConnections);
    }).bind(this);

    const onError_ = (function(resp) {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    }).bind(this);

    const options = {};
    options['steps'] = true;
    options['overview'] = false;
    options['geometries'] = 'geojson';

    const config = {};
    config['options'] = options;

    if (this.selectedRoutingProfile) {
      config['instance'] = this.selectedRoutingProfile['profile'];
    }

    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config))
      .then(onSuccess_.bind(this), onError_.bind(this));
  }
};

/**
 * @export
 */
exports.Controller.prototype.addVia = function() {
  this.viaArray.push(/** @type{RoutingVia} */({
    feature: null,
    onSelect: null
  }));
};

/**
 * @param {number} index Array index.
 * @export
 */
exports.Controller.prototype.deleteVia = function(index) {
  if (this.viaArray.length > index) {
    this.viaArray.splice(index, 1);
    this.calculateRoute();
  }
};


exports.module.component('ngeoRouting', {
  controller: exports.Controller,
  bindings: {
    'map': '<ngeoRoutingMap'
  },
  templateUrl: ngeoRoutingTemplateUrl
});


export default exports;
