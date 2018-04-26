/**
 * @module gmf.objectediting.getWMSFeatureComponent
 */
import gmfObjecteditingQuery from 'gmf/objectediting/Query.js';
import * as olEvents from 'ol/events.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfObjecteditingGetWMSFeatureComponent', [
  gmfObjecteditingQuery.module.name,
]);


/**
 * When activated, this directive registers clicks on an OL3 map and use the
 * clicked coordinate to fetch a feature using the ObjectEditing query service.
 * A feature returned is pushed to a collection.
 *
 * Example:
 *
 *     <gmf-objecteditinggetwmsfeature
 *         gmf-objecteditinggetwmsfeature-active="ctrl.active"
 *         gmf-objecteditinggetwmsfeature-features="ctrl.features"
 *         gmf-objecteditinggetwmsfeature-layerinfo="ctrl.layerInfo"
 *         gmf-objecteditinggetwmsfeature-map="::ctrl.map">
 *     </gmf-objecteditinggetwmsfeature>
 *
 * @htmlAttribute {boolean} gmf-objecteditinggetwmsfeature-active Whether the
 *     directive is active or not.
 * @htmlAttribute {ol.Collection} gmf-objecteditinggetwmsfeature-features
 *     The collection of features where to add those created by this directive.
 * @htmlAttribute {gmfx.ObjectEditingQueryableLayerInfo} gmf-objecteditinggetwmsfeature-layerinfo Queryable layer info.
 * @htmlAttribute {ol.Map} gmf-objecteditinggetwmsfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjecteditinggetwmsfeature
 */
exports.directive_ = function() {
  return {
    controller: 'gmfObjecteditinggetwmsfeatureController',
    scope: {
      'active': '=gmfObjecteditinggetwmsfeatureActive',
      'features': '<gmfObjecteditinggetwmsfeatureFeatures',
      'layerInfo': '=gmfObjecteditinggetwmsfeatureLayerinfo',
      'map': '<gmfObjecteditinggetwmsfeatureMap'
    },
    bindToController: true
  };
};

exports.directive('gmfObjecteditinggetwmsfeature',
  exports.directive_);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {gmf.objectediting.Query} gmfObjectEditingQuery GMF ObjectEditing
 *     query service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditinggetwmsfeatureController
 */
exports.Controller_ = function($scope,
  gmfObjectEditingQuery) {

  // Scope properties

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  $scope.$watch(
    () => this.active,
    this.handleActiveChange_.bind(this)
  );

  /**
   * @type {ol.Collection}
   * @export
   */
  this.features;

  /**
   * @type {gmfx.ObjectEditingQueryableLayerInfo}
   * @export
   */
  this.layerInfo;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;


  // Injected properties

  /**
   * @type {gmf.objectediting.Query}
   * @private
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

};


/**
 * @param {boolean} active Active.
 * @private
 */
exports.Controller_.prototype.handleActiveChange_ = function(active) {
  if (active) {
    olEvents.listen(
      this.map,
      'click',
      this.handleMapClick_,
      this
    );
  } else {
    olEvents.unlisten(
      this.map,
      'click',
      this.handleMapClick_,
      this
    );
  }
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMapClick_ = function(evt) {
  this.gmfObjectEditingQuery_.getFeatureInfo(
    this.layerInfo,
    evt.coordinate,
    this.map
  ).then((feature) => {
    if (feature) {
      this.features.push(feature);
    }
  });
};

exports.controller('gmfObjecteditinggetwmsfeatureController',
  exports.Controller_);


export default exports;
