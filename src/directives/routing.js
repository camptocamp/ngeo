goog.provide('ngeo.routingComponent');

goog.require('ngeo');
goog.require('ngeo.RoutingService');
goog.require('ngeo.NominatimService');
goog.require('ol.format.GeoJSON');
goog.require('ngeo.Debounce');


ngeo.module.value('ngeoRoutingTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['ngeoRoutingTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseTemplateUrl}/routing.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} ngeoRoutingTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingTemplateUrl($element, $attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($element, $attrs);
}


/**
 * Component to provide OSRM routing.
 *
 * Example:
 *
 *  <ngeo-routing
 *    ngeo-routing-map="::ctrl.map">
 *  </ngeo-routing>
 *
 * @htmlAttribute {ol.Map} ngeo-routing-map The map.
 * @ngdoc component
 * @ngname ngeoRouting
 */
ngeo.routingComponent = {
  controller: 'NgeoRoutingController as routeCtrl',
  bindings: {
    'map': '<ngeoRoutingMap'
  },
  templateUrl: ngeoRoutingTemplateUrl
};

ngeo.module.component('ngeoRouting', ngeo.routingComponent);


/**
 * The controller for the routing directive.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.RoutingService} ngeoRoutingService service for OSRM routing
 * @param {!ngeo.NominatimService} ngeoNominatimService service for Nominatim
 * @param {!angular.$q} $q Angular q service
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingController
 */
ngeo.NgeoRoutingController = function($injector, $scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {ngeo.RoutingService}
   * @private
   */
  this.ngeoRoutingService_ = ngeoRoutingService;

  /**
   * @type {ngeo.NominatimService}
   * @private
   */
  this.ngeoNominatimService_ = ngeoNominatimService;

  /**
   * @type {ngeox.RoutingOptions}
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
   * @type {Array<ngeox.RoutingProfile>}
   * @export
   */
  this.routingProfiles = this.routingOptions_.profiles || [];

  /**
   * @type {?ngeox.RoutingProfile}
   * @export
   */
  this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;

  $scope.$watch(
    () => this.selectedRoutingProfile,
    this.calculateRoute.bind(this)
  );

  /**
   * @type {angular.$q}
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
   * @type {Array.<ngeox.RoutingVia>}
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
   * @type {ol.source.Vector}
   * @private
   */
  this.routeSource_ = new ol.source.Vector({
    features: []
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.routeLayer_ = new ol.layer.Vector({
    source: this.routeSource_,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(16, 112, 29, 0.6)'
      }),
      stroke: new ol.style.Stroke({
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
   * @type {ol.interaction.Draw}
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
ngeo.NgeoRoutingController.prototype.$onInit = function() {
  this.map.addLayer(this.routeLayer_);
};

/**
 * Clears start, end and vias. Removes features from map.
 * @export
 */
ngeo.NgeoRoutingController.prototype.clearRoute = function() {
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
ngeo.NgeoRoutingController.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {ol.geom.Point} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return ol.proj.toLonLat(coords, projection);
};

/**
 * Flip start and target and re-calculate route.
 * @export
 */
ngeo.NgeoRoutingController.prototype.reverseRoute = function() {
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
ngeo.NgeoRoutingController.prototype.parseRoute_ = function(route) {
  let parsedRoutes = [];
  const format = new ol.format.GeoJSON();
  const formatConfig = {
    dataProjection: 'EPSG:4326',
    featureProjection: this.map.getView().getProjection()
  };
  // if there are is useful "legs" data, parse this
  if (route.legs) {
    parsedRoutes = route.legs.map(leg => leg.steps.map(step => new ol.Feature({geometry: format.readGeometry(step.geometry, formatConfig)})));
    // flatten
    parsedRoutes = [].concat(...parsedRoutes);
  } else if (route.geometry) {
  // otherwise parse (overview) geometry
    parsedRoutes.push(new ol.Feature({geometry: format.readGeometry(route.geometry, formatConfig)}));
  }
  return parsedRoutes;
};

/**
 * @export
 */
ngeo.NgeoRoutingController.prototype.calculateRoute = function() {
  if (this.startFeature_ && this.targetFeature_) {
    // remove rendered routes
    this.routeSource_.clear();

    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray.filter(via => via.feature !== null).map(via => this.getLonLatFromPoint_(via.feature));
    const route =  [coordFrom].concat(vias, [coordTo]);

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
      const startRoute = /** @type{ol.geom.LineString} */(features[0].getGeometry()).getCoordinateAt(0);
      const endRoute = /** @type{ol.geom.LineString} */(features[features.length - 1].getGeometry()).getCoordinateAt(1);

      // build geometries to connect route to start and end point of query
      const startToRoute = [/** @type {ol.geom.Point} */(this.startFeature_.getGeometry()).getCoordinates(), startRoute];
      const routeToEnd = [endRoute, /** @type {ol.geom.Point} */(this.targetFeature_.getGeometry()).getCoordinates()];
      const routeConnections = [
        new ol.Feature(new ol.geom.LineString(startToRoute)),
        new ol.Feature(new ol.geom.LineString(routeToEnd))
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
ngeo.NgeoRoutingController.prototype.addVia = function() {
  this.viaArray.push(/** @type{ngeox.RoutingVia} */({
    feature: null,
    onSelect: null
  }));
};

/**
 * @param {number} index Array index.
 * @export
 */
ngeo.NgeoRoutingController.prototype.deleteVia = function(index) {
  if (this.viaArray.length > index) {
    this.viaArray.splice(index, 1);
    this.calculateRoute();
  }
};


ngeo.module.controller('NgeoRoutingController', ngeo.NgeoRoutingController);
