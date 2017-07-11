goog.provide('gmf.routingComponent');

goog.require('gmf');
goog.require('gmf.RoutingService');
goog.require('gmf.NominatimService');
goog.require('ol.format.GeoJSON');


gmf.module.value('gmfRoutingTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfRoutingTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/routing.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfRoutingTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfRoutingTemplateUrl($element, $attrs, gmfRoutingTemplateUrl) {
  return gmfRoutingTemplateUrl($element, $attrs);
}


/**
 * Component to provide OSRM routing.
 *
 * Example:
 *
 *  <gmf-routing
 *    gmf-routing-active="ctrl.routingActive"
 *    gmf-routing-map="::ctrl.map">
 *  </gmf-routing>
 *
 * @htmlAttribute {boolean} gmf-routing-active Whether the component is
 *     active or not.
 * @htmlAttribute {ol.Map} gmf-routing-map The map.
 * @ngdoc component
 * @ngname gmfRouting
 */
gmf.routingComponent = {
  controller: 'GmfRoutingController as routeCtrl',
  bindings: {
    'active': '=gmfRoutingActive',
    'map': '<gmfRoutingMap'
  },
  templateUrl: gmfRoutingTemplateUrl
};

gmf.module.component('gmfRouting', gmf.routingComponent);


/**
 * The controller for the routing directive.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!gmf.RoutingService} gmfRoutingService service for OSRM routing
 * @param {!gmf.NominatimService} gmfNominatimService service for Nominatim
 * @param {!angular.$q} $q Angular q service
 * @param {!angular.$filter} $filter Angular filter
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfRoutingController
 */
gmf.GmfRoutingController = function($injector, $scope, gmfRoutingService, gmfNominatimService, $q, $filter) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {gmf.RoutingService}
   * @private
   */
  this.gmfRoutingService_ = gmfRoutingService;

  /**
   * @type {gmf.NominatimService}
   * @private
   */
  this.gmfNominatimService_ = gmfNominatimService;

  /**
   * Available routing profiles.
   * Example: [
   *            {
   *              label: 'Car', // used as label in the UI
   *              profile: 'routed-car' // used as part of the query
   *            }
   *          ]
   * @type {Array<gmfx.RoutingProfile>}
   * @export
   */
  this.routingProfiles = $injector.has('gmfRoutingProfiles') ? $injector.get('gmfRoutingProfiles') : [];

  /**
   * @type {?gmfx.RoutingProfile}
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
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format_ = $filter('ngeoUnitPrefix');

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @private
   */
  this.active;

  $scope.$watch(
    () => this.active,
    this.handleActiveChange_.bind(this)
  );

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
   * @type {Array.<gmfx.RoutingVia>}
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
    'via.fill': '#000000',
    'via.stroke': '#000000'
  };

  /**
   * @type {Object<string, string>}
   * @export
   */
  this.searchDefaultParams = $injector.has('gmfRoutingSearchDefaultParams') ? $injector.get('gmfRoutingSearchDefaultParams') : {};

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
   * Formatted distance of route
   * @type {string}
   * @export
   */
  this.routeDistance = '';

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

  /**
   * @export
   * @type {(function)}
   */
  this.handleChange = this.calculateRoute.bind(this);
};

/**
 * Init the controller
 */
gmf.GmfRoutingController.prototype.$onInit = function() {
  this.map.addLayer(this.routeLayer_);
};

/**
 * Cleanup when component becomes inactive.
 * @param {boolean} active component status
 * @private
 */
gmf.GmfRoutingController.prototype.handleActiveChange_ = function(active) {
  if (!active) {
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.routeDistance = '';
    this.routeDuration = null;
    this.routeSource_.clear();
    this.errorMessage = '';
  }
};

/**
 * Converts feature point into LonLat coordinate.
 * @param {ol.Feature} point Feature point to convert
 * @return {ol.Coordinate} LonLat coordinate
 * @private
 */
gmf.GmfRoutingController.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {ol.geom.Point} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return ol.proj.toLonLat(coords, projection);
};

/**
 * Flip start and target and re-calculate route.
 * @export
 */
gmf.GmfRoutingController.prototype.reverseRoute = function() {
  // swap start and target
  const tmpFeature = this.startFeature_;
  this.startFeature_ = this.targetFeature_;
  this.targetFeature_ = tmpFeature;

  // refresh source to re-render start and target icons
  //this.vectorSource_.refresh();

  this.calculateRoute();
};

/**
 * @param {Object} route Routes of OSRM response
 * @returns {Array<ol.Feature>} parsed route features
 * @private
 */
gmf.GmfRoutingController.prototype.parseRoute_ = function(route) {
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
gmf.GmfRoutingController.prototype.calculateRoute = function() {
  if (this.startFeature_ && this.targetFeature_) {
    // remove rendered routes
    this.routeSource_.clear();

    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray.map(via => this.getLonLatFromPoint_(via.feature));
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

      this.routeDistance = this.format_(resp.data.routes[0].distance, 'm');
      this.routeDuration = Math.ceil(resp.data.routes[0].duration / 60);

      // TODO draw line between markes and end of route
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

    this.$q_.when(this.gmfRoutingService_.getRoute(route, config))
      .then(onSuccess_.bind(this), onError_.bind(this));
  }
};

/**
 * @export
 */
gmf.GmfRoutingController.prototype.addVia = function() {
  this.viaArray.push(/** @type{gmfx.RoutingVia} */({
    feature: null,
    onSelect: null
  }));
};

/**
 * @param {number} index Array index.
 * @export
 */
gmf.GmfRoutingController.prototype.deleteVia = function(index) {
  if (this.viaArray.length > index) {
    this.viaArray.splice(index, 1);
    this.calculateRoute();
  }
};


gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
