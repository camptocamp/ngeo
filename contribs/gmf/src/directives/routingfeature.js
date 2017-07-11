goog.provide('gmf.routingFeatureComponent');

goog.require('gmf');
goog.require('ol.proj');

gmf.module.value('gmfRoutingFeatureTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfRoutingFeatureTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/routingfeature.html`;
  }
);

/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfRoutingFeatureTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfRoutingFeatureTemplateUrl($element, $attrs, gmfRoutingFeatureTemplateUrl) {
  return gmfRoutingFeatureTemplateUrl($element, $attrs);
}

/**
 * @htmlAttribute {ol.Map} gmf-routing-feature-map The map.
 * @htmlAttribute {ol.Feature} gmf-routing-feature-feature The feature.
 * @htmlAttribute {string} gmf-routing-feature-fill-color The marker fill color.
 * @htmlAttribute {string} gmf-routing-feature-stroke-color The marker stroke color.
 * @htmlAttribute {function(ol.Feature)} gmf-routing-feature-on-change Event fired when feature changes.
 * @htmlAttribute {Object<string, string>} gmf-routing-feature-search-default-params
 *  Default parameters to customize search.
 * @ngdoc component
 * @ngname gmfRoutingFeature
 */
gmf.routingFeatureComponent = {
  controller: 'GmfRoutingFeatureController as featureCtrl',
  bindings: {
    'map': '<gmfRoutingFeatureMap',
    'feature': '=gmfRoutingFeatureFeature',
    'fillColor': '<?gmfRoutingFeatureFillColor',
    'strokeColor': '<?gmfRoutingFeatureStrokeColor',
    'onChange': '=?gmfRoutingFeatureOnChange',
    'searchDefaultParams': '<?gmfRoutingFeatureSearchDefaultParams'
  },
  templateUrl: gmfRoutingFeatureTemplateUrl
};

gmf.module.component('gmfRoutingFeature', gmf.routingFeatureComponent);


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {!angular.$q} $q Angular q service
 * @param {!gmf.NominatimService} gmfNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfRoutingFeatureController
 */
gmf.GmfRoutingFeatureController = function($timeout, $q, gmfNominatimService) {

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
   * @type {gmf.NominatimService}
   * @private
   */
  this.gmfNominatimService_ = gmfNominatimService;

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
   * @param {gmfx.NominatimSearchResult} selected Selected result.
   * @export
   */
  this.onSelect = this.onSelect_.bind(this);
};

gmf.GmfRoutingFeatureController.prototype.$onInit = function() {
  this.map.addLayer(this.vectorLayer_);

  // setup modify interaction
  this.modifyFeature_.setActive(true);
  this.map.addInteraction(this.modifyFeature_);

  this.modifyFeature_.on('modifyend', (event) => {
    const feature = event.features.getArray()[0];
    this.vectorSource_.clear();
    this.snapFeature_(feature);
  });
};

gmf.GmfRoutingFeatureController.prototype.$onDestroy = function() {
  this.map.removeLayer(this.vectorLayer_);
  this.modifyFeature_.setActive(false);
  this.map.removeInteraction(this.modifyFeature_);
};

/**
 * @export
 */
gmf.GmfRoutingFeatureController.prototype.set = function() {
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
gmf.GmfRoutingFeatureController.prototype.setFeature_ = function(coordinate, label) {
  const transformedCoordinate = ol.proj.fromLonLat(coordinate, this.map.getView().getProjection());
  if (label === '') {
    label = transformedCoordinate.join('/');
  }
  const newFeature = new ol.Feature({
    geometry: new ol.geom.Point(transformedCoordinate),
    name: label
  });

  this.vectorSource_.clear();
  this.feature = newFeature;
  this.vectorSource_.addFeature(this.feature);

  if (this.onChange) {
    this.timeout_(() => {
      this.onChange(this.feature);
    });
  }
};

/**
 * @param {gmfx.NominatimSearchResult} selected Selected result.
 * @private
 */
gmf.GmfRoutingFeatureController.prototype.onSelect_ = function(selected) {
  const coordinate = selected.coordinate;
  const label = selected.label;
  this.setFeature_(coordinate, label);
};

/**
 * Snaps a feature to the street network using the getNearest
 * function of the routing service. Replaces the feature.
 * @param {ol.Feature} feature Feature to snap
 * @private
 */
gmf.GmfRoutingFeatureController.prototype.snapFeature_ = function(feature) {
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

  this.$q_.when(this.gmfNominatimService_.reverse(coord, config))
    .then(onSuccess.bind(this), onError.bind(this));
};

/**
 * Converts feature point into LonLat coordinate.
 * @param {ol.Feature} point Feature point to convert
 * @return {ol.Coordinate} LonLat coordinate
 * @private
 */
gmf.GmfRoutingFeatureController.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {ol.geom.Point} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return ol.proj.toLonLat(coords, projection);
};

gmf.module.controller('GmfRoutingFeatureController', gmf.GmfRoutingFeatureController);
