goog.provide('gmf.routingComponent');

goog.require('gmf');
goog.require('gmf.RoutingService');
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
 * @ngname gmfObjectediting
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
 * @param {!angular.Scope} $scope Scope.
 * @param {!gmf.RoutingService} gmfRoutingService service for OSRM routing
 * @param {!angular.$q} $q Angular q service
 * @param {!angular.$filter} $filter Angular filter
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfRoutingController
 */
gmf.GmfRoutingController = function($scope, gmfRoutingService, $q, $filter) {

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
   * @type {ol.Feature}
   * @private
   */
  this.startFeature_ = null;

  /**
   * @type {string}
   * @export
   */
  this.startFeatureLabel = '';

  /**
   * @type {ol.Feature}
   * @private
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
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: (feature === this.startFeature_) ? 'rgba(85, 255, 0, 0.5)' : 'rgba(230, 94, 63, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            width: 2,
            color: (feature === this.startFeature_) ? 'rgba(107, 230, 46, 0.5)' : 'rgba(255, 62, 19, 0.5)'
          })
        })
      })];
    }).bind(this)
  });

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
   * @type {?number}
   * @export
   */
  this.routeDistance = null;

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
  });

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

  const onSuccess = (function(resp) {
    if (resp.data.waypoints.length > 0) {
      const coords = resp.data.waypoints[0].location;
      const newLabel = resp.data.waypoints[0].name;

      this.replaceFeature_(feature, label, coords, newLabel);
    }
  }).bind(this);

  const onError = (function(resp) {
    console.log(resp);
  }).bind(this);

  this.$q_.when(this.gmfRoutingService_.getNearest(coord, {}))
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
      const format = new ol.format.GeoJSON();
      const route = format.readGeometry(resp.data.routes[0].geometry, {
        dataProjection: 'EPSG:4326',
        featureProjection: this.map.getView().getProjection()
      });
      this.routeSource_.addFeature(new ol.Feature({
        geometry: route
      }));

      // recenter map on route
      this.map.getView().fit(route.getExtent());

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

    const onError_ = function(resp) {
      console.log(resp);
    };

    const config = {
      options: {
        steps: false,
        geometries: 'geojson'
      }
    };

    this.$q_.when(this.gmfRoutingService_.getRoute(route, config))
      .then(onSuccess_.bind(this), onError_.bind(this));
  }
  else if (this.startFeature_ || this.targetFeature_) {
    const feature = (this.startFeature_) ? 'startFeature_' : 'targetFeature_';
    const label = (this.startFeatureLabel) ? 'startFeatureLabel' : 'targetFeatureLabel';
    // only snap feature if it is still just a plain coordinate
    if (this.regexIsFormattedCoord.test(this[label])) {
      this.snapFeature_(feature, label);
    }
  }
};

gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
