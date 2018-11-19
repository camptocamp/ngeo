/**
 * @module ngeo.routing.RoutingFeatureComponent
 */
const exports = {};
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService.js';
import ngeoRoutingNominatimInputComponent from 'ngeo/routing/NominatimInputComponent.js';
import * as olProj from 'ol/proj.js';
import olFeature from 'ol/Feature.js';
import olCollection from 'ol/Collection.js';
import olSourceVector from 'ol/source/Vector.js';
import olLayerVector from 'ol/layer/Vector.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olGeomPoint from 'ol/geom/Point.js';
import olInteractionModify from 'ol/interaction/Modify.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import 'ngeo/sass/font.scss';


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('ngeoRoutingFeatureComponent', [
  ngeoRoutingNominatimService.module.name,
  ngeoRoutingNominatimInputComponent.module.name
]);

exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/routing/routingfeature', require('./routingfeature.html'));
});


exports.module.value('ngeoRoutingFeatureTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingFeatureTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/routing/routingfeature';
  }
);

/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoRoutingFeatureTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angular.IQService} $q Angular q service
 * @param {!ngeo.routing.NominatimService} ngeoNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingFeatureController
 */
exports.Controller = function($scope, $timeout, $q, ngeoNominatimService) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.IQService}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {ngeo.routing.NominatimService}
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
   * @type {ol.Collection}
   * @private
   */
  this.vectorFeatures_ = new olCollection();

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new olSourceVector({
    features: this.vectorFeatures_
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new olLayerVector({
    source: this.vectorSource_,
    style: (function(feature, resolution) {
      return [new olStyleStyle({
        text: new olStyleText({
          fill: new olStyleFill({
            color: this.fillColor || '#000000'
          }),
          font: 'normal 30px FontAwesome',
          offsetY: -15,
          stroke: new olStyleStroke({
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
  this.modifyFeature_ = new olInteractionModify({
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

exports.Controller.prototype.$onInit = function() {
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
      if (newVal === null) {
        this.vectorSource_.clear();
        this.featureLabel = '';
      }
    }
  );
};

/**
 * Cleanup, mostly relevant for vias.
 */
exports.Controller.prototype.$onDestroy = function() {
  this.map.removeLayer(this.vectorLayer_);
  this.modifyFeature_.setActive(false);
  this.map.removeInteraction(this.modifyFeature_);
};

/**
 * @export
 */
exports.Controller.prototype.set = function() {
  if (this.draw_) {
    this.map.removeInteraction(this.draw_);
  }

  this.draw_ = new olInteractionDraw({
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
exports.Controller.prototype.setFeature_ = function(coordinate, label) {
  const transformedCoordinate = olProj.fromLonLat(coordinate, this.map.getView().getProjection());
  if (label === '') {
    label = transformedCoordinate.join('/');
  }
  this.feature = new olFeature({
    geometry: new olGeomPoint(transformedCoordinate),
    name: label
  });
};

exports.Controller.prototype.onFeatureChange_ = function() {
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
exports.Controller.prototype.onSelect_ = function(selected) {
  const coordinate = selected.coordinate.map(parseFloat);
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
exports.Controller.prototype.snapFeature_ = function(feature) {
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
exports.Controller.prototype.getLonLatFromPoint_ = function(point) {
  const geometry = /** @type {ol.geom.Point} */ (point.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map.getView().getProjection();
  return olProj.toLonLat(coords, projection);
};


/**
 * Provides a text input and draw interaction to allow a user to create and modify a ol.Feature (point geometry).
 *
 * The text input is provided by {@link ngeo.nominatimInputComponent} and includes Nominatim search.
 *
 * Example:
 *
 *     <ngeo-routing-feature
 *         ngeo-routing-feature-map="ctrl.map"
 *         ngeo-routing-feature-feature="ctrl.feature"
 *         ngeo-routing-feature-fill-color="#6BE62E"
 *         ngeo-routing-feature-stroke-color="#4CB01E"
 *         ngeo-routing-feature-on-change="ctrl.handleChange">
 *
 * Is used in in the partial of {@link ngeo.routingComponent}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example for a usage sample.
 *
 * @htmlAttribute {ol.Map} ngeo-routing-feature-map The map.
 * @htmlAttribute {ol.Feature} ngeo-routing-feature-feature The feature.
 * @htmlAttribute {string} ngeo-routing-feature-fill-color The marker fill color.
 * @htmlAttribute {string} ngeo-routing-feature-stroke-color The marker stroke color.
 * @htmlAttribute {function(ol.Feature)} ngeo-routing-feature-on-change Event fired when feature changes.
 * @ngdoc directive
 * @ngname ngeoRoutingFeature
 */
exports.component_ = {
  controller: exports.Controller,
  bindings: {
    'map': '<ngeoRoutingFeatureMap',
    'feature': '=ngeoRoutingFeatureFeature',
    'fillColor': '<?ngeoRoutingFeatureFillColor',
    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',
    'onChange': '=?ngeoRoutingFeatureOnChange'
  },
  templateUrl: ngeoRoutingFeatureTemplateUrl
};

exports.module.component('ngeoRoutingFeature', exports.component_);


export default exports;
