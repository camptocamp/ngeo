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
   * @export
   */
  this.gmfNominatimService = gmfNominatimService;

  /**
   * Available routing profiles.
   * Example: [
   *            {
   *              label: 'Car', // used as label in the UI
   *              profile: 'routed-car' // used as part of the query
   *            }
   *          ]
   * @type {Array<Object<string, string>>}
   * @export
   */
  this.routingProfiles = $injector.has('gmfRoutingProfiles') ? $injector.get('gmfRoutingProfiles') : [];

  /**
   * @type {?Object<string, string>}
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
   * @private
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
   * @type {string}
   * @export
   */
  this.startFeatureLabel = '';

  /**
   * @type {ol.Feature}
   * @export
   */
  this.targetFeature_ = null;

  /**
   * @type {string}
   * @export
   */
  this.targetFeatureLabel = '';

  /**
   * @type {ol.Collection}
   * @private
   */
  this.vectorFeatures_ = new ol.Collection();

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new ol.source.Vector({
    features: this.vectorFeatures_
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new ol.layer.Vector({
    source: this.vectorSource_,
    style: (function(feature, resolution) {
      return [new ol.style.Style({
        text: new ol.style.Text({
          fill: new ol.style.Fill({
            color: (feature === this.startFeature_) ? '#6BE62E' : '#FF3E13'
          }),
          font: 'normal 30px FontAwesome',
          offsetY: -15,
          stroke: new ol.style.Stroke({
            width: 3,
            color: (feature === this.startFeature_) ? '#4CB01E' : '#CD3412'
          }),
          text: '\uf041'
        })
      })];
    }).bind(this)
  });

  /**
   * Interaction for moving start and end.
   * @type {ol.interaction.Modify}
   * @private
   */
  this.modifyFeatures_ = new ol.interaction.Modify({
    features: this.vectorFeatures_
  });

  /**
   * Remember which feature is being moved.
   * @type {string}
   * @private
   */
  this.activeModifyFeature_ = '';

  /**
   * Remember which feature (label) is being moved.
   * @type {string}
   * @private
   */
  this.activeModifyFeatureLabel_ = '';

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
};

/**
 * Init the controller
 */
gmf.GmfRoutingController.prototype.$onInit = function() {
  this.map.addLayer(this.vectorLayer_);
  this.map.addLayer(this.routeLayer_);

  this.modifyFeatures_.setActive(true);
  this.map.addInteraction(this.modifyFeatures_);

  this.modifyFeatures_.on('modifystart', (event) => {
    const feature = event.features.getArray()[0];

    if (this.startFeature_ === feature) {
      this.activeModifyFeature_ = 'startFeature_';
      this.activeModifyFeatureLabel_ = 'startFeatureLabel';
    } else if (this.targetFeature_ === feature) {
      this.activeModifyFeature_ = 'targetFeature_';
      this.activeModifyFeatureLabel_ = 'targetFeatureLabel';
    }
  });

  this.modifyFeatures_.on('modifyend', (event) => {
    const feature = event.features.getArray()[0];
    this.vectorSource_.removeFeature(this[this.activeModifyFeature_]);
    this[this.activeModifyFeature_] = feature;
    this.vectorSource_.addFeature(this[this.activeModifyFeature_]);
    this.snapFeature_(this.activeModifyFeature_, this.activeModifyFeatureLabel_);
    this.calculateRoute();
  });
};

/**
 * Cleanup when component becomes inactive.
 * @param {boolean} active component status
 * @private
 */
gmf.GmfRoutingController.prototype.handleActiveChange_ = function(active) {
  if (!active) {
    this.startFeature_ = null;
    this.startFeatureLabel = '';
    this.targetFeature_ = null;
    this.targetFeatureLabel = '';
    this.routeDistance = '';
    this.routeDuration = null;
    this.vectorSource_.clear();
    this.routeSource_.clear();
    this.errorMessage = '';
  }
};

/**
 * @export
 */
gmf.GmfRoutingController.prototype.setStart = function() {
  this.setFeature_('startFeature_', 'startFeatureLabel');
};

/**
 * @export
 */
gmf.GmfRoutingController.prototype.setTarget = function() {
  this.setFeature_('targetFeature_', 'targetFeatureLabel');
};

/**
 * @param {string} feature Property name of feature
 * @param {string} label Property name of label
 * @private
 */
gmf.GmfRoutingController.prototype.setFeature_ = function(feature, label) {
  if (this.draw_) {
    this.map.removeInteraction(this.draw_);
  }

  this.draw_ = new ol.interaction.Draw({
    features: this.vectorFeatures_,
    type: /** @type {ol.geom.GeometryType} */ ('Point')
  });

  this.draw_.on('drawstart', () => {
    if (this[feature]) {
      this.vectorSource_.removeFeature(this[feature]);
    }
    this[label] = '';
  });

  this.draw_.on('drawend', (event) => {
    this[feature] = event.feature;
    this[label] = this.formatFeature(this[feature]);
    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }
    this.calculateRoute();
    this.modifyFeatures_.setActive(true);
  });

  this.modifyFeatures_.setActive(false);
  this.map.addInteraction(this.draw_);
};


/**
 * @param {ol.Feature} feature Feature to format
 * @return {string} Formated feature description
 */
gmf.GmfRoutingController.prototype.formatFeature = function(feature) {
  return this.getLonLatFromPoint_(feature).join('/');
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
  const tmpLabel = this.startFeatureLabel;
  this.startFeature_ = this.targetFeature_;
  this.startFeatureLabel = this.targetFeatureLabel;
  this.targetFeature_ = tmpFeature;
  this.targetFeatureLabel = tmpLabel;

  // refresh source to re-render start and target icons
  this.vectorSource_.refresh();

  this.calculateRoute();
};

/**
 * Snaps a feature to the street network using the getNearest
 * function of the routing service. Replaces the feature and
 * its label.
 * @param {string} feature Property name of feature
 * @param {string} label Property name of label
 * @private
 */
gmf.GmfRoutingController.prototype.snapFeature_ = function(feature, label) {
  const coord = this.getLonLatFromPoint_(this[feature]);
  const config = {};

  if (this.selectedRoutingProfile) {
    config['instance'] = this.selectedRoutingProfile['profile'];
  }

  const onSuccess = (function(resp) {
    if (resp.data.waypoints.length > 0) {
      const coords = resp.data.waypoints[0].location;
      const newLabel = resp.data.waypoints[0].name;

      this.replaceFeature_(feature, label, coords, newLabel);
    }
  }).bind(this);

  const onError = (function(resp) {
    this.errorMessage = 'Error: routing server not responding.';
    console.log(resp);
  }).bind(this);

  this.$q_.when(this.gmfRoutingService_.getNearest(coord, config))
    .then(onSuccess.bind(this), onError.bind(this));
};

/**
 * @param {string} feature Property name of feature
 * @param {string} label Property name of label
 * @param {ol.Coordinate} newCoords Coordinates of new feature (in LonLat projection)
 * @param {string} newLabel New Label
 * @private
 */
gmf.GmfRoutingController.prototype.replaceFeature_ = function(feature, label, newCoords, newLabel) {
  const transformedCoords = ol.proj.fromLonLat(newCoords, this.map.getView().getProjection());
  const newFeature = new ol.Feature({
    geometry: new ol.geom.Point(transformedCoords)
  });
  // replace feature
  this.vectorSource_.removeFeature(this[feature]);
  this[feature] = newFeature;
  this.vectorSource_.addFeature(this[feature]);

  //replace label
  this[label] = (newLabel !== '') ? newLabel : transformedCoords.join('/');
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
  if (route.legs && route.legs[0] && route.legs[0].steps && route.legs[0].steps.length > 0) {
    const steps = route.legs[0].steps;
    parsedRoutes = steps.map(step => new ol.Feature({geometry: format.readGeometry(step.geometry, formatConfig)}));
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
    const route =  [coordFrom, coordTo];

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

      // process waypoints to "snap" the features
      const startCoord = resp.data.waypoints[0].location;
      const startLabel = resp.data.waypoints[0].name;
      this.replaceFeature_('startFeature_', 'startFeatureLabel', startCoord, startLabel);

      const targetCoord = resp.data.waypoints[1].location;
      const targetLabel = resp.data.waypoints[1].name;
      this.replaceFeature_('targetFeature_', 'targetFeatureLabel', targetCoord, targetLabel);
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
  } else if (this.startFeature_ || this.targetFeature_) {
    const feature = (this.startFeature_) ? 'startFeature_' : 'targetFeature_';
    const label = (this.startFeatureLabel) ? 'startFeatureLabel' : 'targetFeatureLabel';
    // only snap feature if it is still just a plain coordinate
    if (this.regexIsFormattedCoord.test(this[label])) {
      this.snapFeature_(feature, label);
    }
  }
};

/**
 *
 * @param query
 * @param callback
 */
gmf.GmfRoutingController.prototype.nominatimSearch = function(query, callback) {
  const onSuccess_ = (function(resp){
    console.log(resp);
    const features = resp.data.map((result) => {
      const coords = [result.lon, result.lat];
      const projection = this.map.getView().getProjection();
      const transformedCoords = ol.proj.fromLonLat(coords, projection);
      return new ol.Feature({
        geometry: new ol.geom.Point(transformedCoords),
        name: result.display_name
      });
    });
    callback(features);
  }).bind(this);

  const onError_ = (function(resp) {
    this.errorMessage = 'Error: nominatim server not responding.';
    console.log(resp);
    callback([]);
  }).bind(this);

  this.gmfNominatimService.search(query, {}).then(onSuccess_, onError_);
};

gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
