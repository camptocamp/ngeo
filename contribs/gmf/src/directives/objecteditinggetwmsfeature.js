goog.provide('gmf.objecteditinggetwmsfeatureDirective');

goog.require('gmf');
goog.require('gmf.ObjectEditingQuery');


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
 * @htmlAttribute {gmf.ObjectEditingQuery.QueryableLayerInfo} gmf-objecteditinggetwmsfeature-layerinfo Queryable layer info.
 * @htmlAttribute {ol.Map} gmf-objecteditinggetwmsfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfObjecteditinggetwmsfeature
 */
gmf.objecteditinggetwmsfeatureDirective = function() {
  return {
    controller: 'GmfObjecteditinggetwmsfeatureController as gwfCtrl',
    scope: {
      'active': '=gmfObjecteditinggetwmsfeatureActive',
      'features': '<gmfObjecteditinggetwmsfeatureFeatures',
      'layerInfo': '=gmfObjecteditinggetwmsfeatureLayerinfo',
      'map': '<gmfObjecteditinggetwmsfeatureMap'
    },
    bindToController: true
  };
};

gmf.module.directive(
  'gmfObjecteditinggetwmsfeature',
  gmf.objecteditinggetwmsfeatureDirective);


/**
 * @param {!angular.Scope} $scope Scope.
 * @param {gmf.ObjectEditingQuery} gmfObjectEditingQuery GMF ObjectEditing
 *     query service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfObjecteditinggetwmsfeatureController
 */
gmf.ObjecteditinggetwmsfeatureController = function($scope,
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
   * @type {gmf.ObjectEditingQuery.QueryableLayerInfo}
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
   * @type {gmf.ObjectEditingQuery}
   * @private
   */
  this.gmfObjectEditingQuery_ = gmfObjectEditingQuery;

};


/**
 * @param {boolean} active Active.
 * @private
 */
gmf.ObjecteditinggetwmsfeatureController.prototype.handleActiveChange_ = function(active) {

  if (active) {
    ol.events.listen(
      this.map,
      'click',
      this.handleMapClick_,
      this
    );
  } else {
    ol.events.unlisten(
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
gmf.ObjecteditinggetwmsfeatureController.prototype.handleMapClick_ = function(
  evt
) {

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


gmf.module.controller(
  'GmfObjecteditinggetwmsfeatureController',
  gmf.ObjecteditinggetwmsfeatureController);
