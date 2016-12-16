goog.provide('ngeo.CreatefeatureController');
goog.provide('ngeo.createfeatureDirective');

goog.require('ngeo');
goog.require('ngeo.EventHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureArea');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ngeo.utils');
goog.require('ol.Feature');
goog.require('ol.geom.GeometryType');
goog.require('ol.interaction.Draw');
goog.require('ol.style.Style');


/**
 * A directive used to draw vector features of a single geometry type using
 * either a 'draw' or 'measure' interaction. Once a feature is finished being
 * drawn, it is added to a collection of features.
 *
 * The geometry types supported are:
 *  - Point
 *  - LineString
 *  - Polygon
 *
 * Example:
 *
 *     <a
 *       href
 *       translate
 *       ngeo-btn
 *       ngeo-createfeature
 *       ngeo-createfeature-active="ctrl.createPointActive"
 *       ngeo-createfeature-features="ctrl.features"
 *       ngeo-createfeature-geom-type="ctrl.pointGeomType"
 *       ngeo-createfeature-map="::ctrl.map"
 *       class="btn btn-default ngeo-createfeature-point"
 *       ng-class="{active: ctrl.createPointActive}"
 *       ng-model="ctrl.createPointActive">
 *     </a>
 *
 * @htmlAttribute {boolean} ngeo-createfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Collection} ngeo-createfeature-features The collection of
 *     features where to add those created by this directive.
 * @htmlAttribute {string} ngeo-createfeature-geom-type Determines the type
 *     of geometry this directive should draw.
 * @htmlAttribute {ol.Map} ngeo-createfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoCreatefeature
 */
ngeo.createfeatureDirective = function() {
  return {
    controller: 'ngeoCreatefeatureController',
    bindToController: true,
    scope: {
      'active': '=ngeoCreatefeatureActive',
      'features': '=ngeoCreatefeatureFeatures',
      'geomType': '=ngeoCreatefeatureGeomType',
      'map': '=ngeoCreatefeatureMap'
    },
    controllerAs: 'cfCtrl'
  };
};

ngeo.module.directive('ngeoCreatefeature', ngeo.createfeatureDirective);


/**
 * @param {gettext} gettext Gettext service.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$filter} $filter Angular filter
 * @param {!angular.Scope} $scope Scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreatefeatureController
 */
ngeo.CreatefeatureController = function(gettext, $compile, $filter, $scope,
    $timeout, ngeoEventHelper) {

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

  /**
   * @type {ol.Collection.<ol.Feature>|ol.source.Vector}
   * @export
   */
  this.features;

  /**
   * @type {string}
   * @export
   */
  this.geomType;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  // Create the draw or measure interaction depending on the geometry type
  var interaction;
  var helpMsg;
  var contMsg;
  if (this.geomType === ngeo.GeometryType.POINT ||
      this.geomType === ngeo.GeometryType.MULTI_POINT
  ) {
    interaction = new ol.interaction.Draw({
      type: ol.geom.GeometryType.POINT
    });
  } else if (this.geomType === ngeo.GeometryType.LINE_STRING ||
      this.geomType === ngeo.GeometryType.MULTI_LINE_STRING
  ) {
    helpMsg = gettext('Click to start drawing length');
    contMsg = gettext(
      'Click to continue drawing<br/>' +
      'Double-click or click last point to finish'
    );

    interaction = new ngeo.interaction.MeasureLength(
      $filter('ngeoUnitPrefix'),
      {
        style: new ol.style.Style(),
        startMsg: $compile('<div translate>' + helpMsg + '</div>')($scope)[0],
        continueMsg: $compile('<div translate>' + contMsg + '</div>')($scope)[0]
      }
    );
  } else if (this.geomType === ngeo.GeometryType.POLYGON ||
      this.geomType === ngeo.GeometryType.MULTI_POLYGON
  ) {
    helpMsg = gettext('Click to start drawing area');
    contMsg = gettext(
      'Click to continue drawing<br/>' +
      'Double-click or click starting point to finish'
    );

    interaction = new ngeo.interaction.MeasureArea(
      $filter('ngeoUnitPrefix'),
      {
        style: new ol.style.Style(),
        startMsg: $compile('<div translate>' + helpMsg + '</div>')($scope)[0],
        continueMsg: $compile('<div translate>' + contMsg + '</div>')($scope)[0]
      }
    );
  }

  goog.asserts.assert(interaction);

  interaction.setActive(this.active);
  this.map.addInteraction(interaction);

  /**
   * The draw or measure interaction responsible of drawing the vector feature.
   * The actual type depends on the geometry type.
   * @type {ol.interaction.Interaction}
   * @private
   */
  this.interaction_ = interaction;


  // == Event listeners ==
  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    function(newVal) {
      this.interaction_.setActive(newVal);
    }.bind(this)
  );

  var uid = ol.getUid(this);
  if (interaction instanceof ol.interaction.Draw) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      ol.events.listen(
        interaction,
        ol.interaction.Draw.EventType.DRAWEND,
        this.handleDrawEnd_,
        this
      ),
      true
    );
  } else if (interaction instanceof ngeo.interaction.MeasureLength ||
     interaction instanceof ngeo.interaction.MeasureArea) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      ol.events.listen(
        interaction,
        ngeo.MeasureEventType.MEASUREEND,
        this.handleDrawEnd_,
        this
      ),
      true
    );
  }

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event|ngeo.MeasureEvent} event Event.
 * @export
 */
ngeo.CreatefeatureController.prototype.handleDrawEnd_ = function(event) {
  // convert to multi if geomType is multi and feature is not
  var geometry = event.feature.getGeometry();
  var type = geometry.getType();
  if (this.geomType.indexOf('Multi') != type.indexOf('Multi')) {
    geometry = ngeo.utils.toMulti(geometry);
  }
  var feature = new ol.Feature(geometry);
  if (this.features instanceof ol.Collection) {
    this.features.push(feature);
  } else {
    this.features.addFeature(feature);
  }
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 * @private
 */
ngeo.CreatefeatureController.prototype.handleDestroy_ = function() {
  this.timeout_(function() {
    var uid = ol.getUid(this);
    this.ngeoEventHelper_.clearListenerKey(uid);
    this.interaction_.setActive(false);
    this.map.removeInteraction(this.interaction_);
  }.bind(this), 0);
};


ngeo.module.controller(
  'ngeoCreatefeatureController', ngeo.CreatefeatureController);
