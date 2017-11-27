goog.provide('ngeo.routingFeatureComponent');

goog.require('ngeo');
goog.require('ol.proj');

ngeo.module.value('ngeoRoutingFeatureTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['ngeoRoutingFeatureTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseTemplateUrl}/routingfeature.html`;
  }
);

/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} ngeoRoutingFeatureTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingFeatureTemplateUrl($element, $attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($element, $attrs);
}

/**
 * @htmlAttribute {ol.Map} ngeo-routing-feature-map The map.
 * @htmlAttribute {ol.Feature} ngeo-routing-feature-feature The feature.
 * @htmlAttribute {string} ngeo-routing-feature-fill-color The marker fill color.
 * @htmlAttribute {string} ngeo-routing-feature-stroke-color The marker stroke color.
 * @htmlAttribute {function(ol.Feature)} ngeo-routing-feature-on-change Event fired when feature changes.
 * @htmlAttribute {Object<string, string>} ngeo-routing-feature-search-default-params
 *  Default parameters to customize search.
 * @ngdoc component
 * @ngname ngeoRoutingFeature
 */
ngeo.routingFeatureComponent = {
  controller: 'NgeoRoutingFeatureController as featureCtrl',
  bindings: {
    'map': '<ngeoRoutingFeatureMap',
    'feature': '=ngeoRoutingFeatureFeature',
    'fillColor': '<?ngeoRoutingFeatureFillColor',
    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',
    'onChange': '=?ngeoRoutingFeatureOnChange',
    'searchDefaultParams': '<?ngeoRoutingFeatureSearchDefaultParams'
  },
  templateUrl: ngeoRoutingFeatureTemplateUrl
};

ngeo.module.component('ngeoRoutingFeature', ngeo.routingFeatureComponent);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {!angular.$q} $q Angular q service
 * @param {!ngeo.NominatimService} ngeoNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingFeatureController
 */
ngeo.NgeoRoutingFeatureController = function($scope, $timeout, $q, ngeoNominatimService) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ngeo.NominatimService}
   * @private
   */
  this.ngeoNominatimService_ = ngeoNominatimService;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * @type {string}
   * @export
   */
  this.featureLabel = '';

  /**
   * @type {string}
   * @export
   */
  this.fillColor;

  /**
   * @type {string}
   * @export
   */
  this.strokeColor;

  /**
   * @type {function(ol.Feature)}
   * @export
   */
  this.onChange;

  /**
   * @type {Object<string, string>}
   * @export
   */
  this.searchDefaultParams;

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
            color: this.fillColor || '#000000'
          }),
          font: 'normal 30px FontAwesome',
          offsetY: -15,
          stroke: new ol.style.Stroke({
            width: 3,
            color: this.strokeColor || '#000000'
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
  this.modifyFeature_ = new ol.interaction.Modify({
    features: this.vectorFeatures_
  });

  /**
   * @type {ol.interaction.Draw}
   * @private
   */
  this.draw_ = null;

  /**
   * @param {ngeox.NominatimSearchResult} selected Selected result.
   * @export
   */
  this.onSelect = this.onSelect_.bind(this);

  /**
   * @type {string}
   * @export
   */
  this.errorMessage = '';
};

ngeo.NgeoRoutingFeatureController.prototype.$onInit = function() {
  this.map.addLayer(this.vectorLayer_);

  // setup modify interaction
  this.modifyFeature_.setActive(true);
  this.map.addInteraction(this.modifyFeature_);

  this.modifyFeature_.on('modifyend', (event) => {
    const feature = event.features.getArray()[0];
    this.vectorSource_.clear();
    this.snapFeature_(feature);
  });

  this.scope_.$watch(
    () => this.feature,
    (newVal, oldVal) => {
      if (newVal) {
        this.onFeatureChange_();
      }
    }
  );
};

ngeo.NgeoRoutingFeatureController.prototype.$onDestroy = function() {
  this.map.removeLayer(this.vectorLayer_);
  this.modifyFeature_.setActive(false);
  this.map.removeInteraction(this.modifyFeature_);
};

/**
 * @export
 */
ngeo.NgeoRoutingFeatureController.prototype.set = function() {
  if (this.draw_) {
    this.map.removeInteraction(this.draw_);
  }

  this.draw_ = new ol.interaction.Draw({
    features: this.vectorFeatures_,
    type: /** @type {ol.geom.GeometryType} */ ('Point')
  });

  this.draw_.on('drawstart', () => {
    if (this.feature) {
      this.vectorSource_.removeFeature(this.feature);
    }
  });

  this.draw_.on('drawend', (event) => {
    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }
    this.snapFeature_(event.feature);
    this.modifyFeature_.setActive(true);
  });

  this.modifyFeature_.setActive(false);
  this.map.addInteraction(this.draw_);
};

/**
 * @param {ol.Coordinate} coordinate LonLat coordinate.
 * @param {string} label Feature name/label.
 * @private
 */
ngeo.NgeoRoutingFeatureController.prototype.setFeature_ = function(coordinate, label) {
  const transformedCoordinate = ol.proj.fromLonLat(coordinate, this.map.getView().getProjection());
  if (label === '') {
    label = transformedCoordinate.join('/');
  }
  this.feature = new ol.Feature({
    geometry: new ol.geom.Point(transformedCoordinate),
    name: label
  });
};

ngeo.NgeoRoutingFeatureController.prototype.onFeatureChange_ = function() {
  // update label
  this.featureLabel = /** @type{string} */(this.feature.get('name') || '');

  //update vector source
  this.vectorSource_.clear();
  this.vectorSource_.addFeature(this.feature);

  // notify others
  if (this.onChange) {
    this.timeout_(() => {
      this.onChange(this.feature);
    });
  }
};

/**
 * @param {ngeox.NominatimSearchResult} selected Selected result.
 * @private
 */
ngeo.NgeoRoutingFeatureController.prototype.onSelect_ = function(selected) {
  const coordinate = selected.coordinate;
  const label = selected.label;
  this.setFeature_(coordinate, label);
  const newCoordinates = /** @type{ol.geom.Point} */(this.feature.getGeometry()).getCoordinates();
  this.map.getView().setCenter(newCoordinates);
};

/**
 * Snaps a feature to the street network using the getNearest
 * function of the routing service. Replaces the feature.
 * @param {ol.Feature} feature Feature to snap
 * @private
 */
ngeo.NgeoRoutingFeatureController.prototype.snapFeature_ = function(feature) {
  const coord = this.getLonLatFromPoint_(feature);
  const config = {};

  const onSuccess = (function(resp) {
    const lon = parseFloat(resp['data']['lon']);
    const lat = parseFloat(resp['data']['lat']);
    const coordinate = [lon, lat];
    const label = resp['data']['display_name'];
    this.setFeature_(coordinate, label);
  }).bind(this);

  const onError = (function(resp) {
    this.errorMessage = 'Error: nominatim server not responding.';
    console.log(resp);
  }).bind(this);

  this.$q_.when(this.ngeoNominatimService_.reverse(coord, config))
    .then(onSuccess.bind(this), onError.bind(this));
};

/**
 * Converts feature point into LonLat coordinate.
 * @param {ol.Feature} point Feature point to convert
 * @return {ol.Coordinate} LonLat coordinate
 * @private
 */
ngeo.NgeoRoutingFeatureController.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {ol.geom.Point} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return ol.proj.toLonLat(coords, projection);
};

ngeo.module.controller('NgeoRoutingFeatureController', ngeo.NgeoRoutingFeatureController);
