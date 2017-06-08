goog.provide('gmf.routingComponent');

goog.require('gmf');
goog.require('gmf.RoutingService');


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
    'map_': '<gmfRoutingMap'
  },
  templateUrl: gmfRoutingTemplateUrl
};

gmf.module.component('gmfRouting', gmf.routingComponent);


/**
 * The controller for the routing directive.
 * @param {!angular.Scope} $scope Scope.
 * @param {!gmf.RoutingService} gmfRoutingService service for OSRM routing
 * @param {!angular.$q} $q Angular q service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfRoutingController
 */
gmf.GmfRoutingController = function($scope, gmfRoutingService, $q) {

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
   * @type {ol.Map}
   * @private
   */
  this.map_;

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
    source: this.vectorSource_
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
   * @type {ol.interaction.Draw}
   * @private
   */
  this.draw_ = null;
};

/**
 * Init the controller
 */
gmf.GmfRoutingController.prototype.$onInit = function(){
  this.map_.addLayer(this.vectorLayer_);
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
    this.map_.removeInteraction(this.draw_);
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
      this.map_.removeInteraction(this.draw_);
    }
  });

  this.map_.addInteraction(this.draw_);
};


/**
 * @param {ol.Feature} feature Feature to format
 * @return {string} Formated feature description
 */
gmf.GmfRoutingController.prototype.formatFeature = function(feature) {
  const geometry = /** @type {ol.geom.Point} */ (feature.getGeometry());
  const coords = geometry.getCoordinates();
  const projection = this.map_.getView().getProjection();
  return ol.proj.toLonLat(coords, projection).join('/');
};

gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
