goog.provide('gmf.routingDirective');

goog.require('gmf');
goog.require('gmf.RoutingService');


/**
 * Directive to display routing feature.
 * @return {angular.Directive}  The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfRouting
 */
gmf.routingDirective = function() {
  return {
    restrict: 'E',
    controller: 'GmfRoutingController as routeCtrl',
    scope: {
      'map_': '<gmfRoutingMap',
      'active': '=gmfRoutingActive'
    },
    templateUrl: `${gmf.baseTemplateUrl}/routing.html`
  };
};


/**
 * The controller for the routing directive.
 * @param {angular.Scope} $scope Scope.
 * @param {gmf.RoutingService} gmfRoutingService service for OSRM routing
 * @param {angular.$q} $q Angular q service
 * @constructor
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
   * @type {ol.Feature}
   * @private
   */
  this.targetFeature_ = null;

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
  this.vectorLayer_.setMap(this.map_);

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
 * @export
 */
gmf.GmfRoutingController.prototype.setStart = function() {
  if (this.draw_) {
    this.map_.removeInteraction(this.draw_);
    this.routeSource_.removeFeature(this.startFeature_);
  }

  this.draw_ = new ol.interaction.Draw({
    features: this.vectorFeatures_,
    type: /** @type {ol.geom.GeometryType} */ ('Point')
  });

  this.draw_.on('drawstart', () => {
    this.routeSource_.removeFeature(this.startFeature_);
  });

  this.draw_.on('drawend', (event) => {
    this.startFeature_ = event.feature;
  });

};

gmf.module.directive('gmfRouting', gmf.routingDirective);
gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
