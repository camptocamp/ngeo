goog.provide('ngeo.CreatefeatureController');
goog.provide('ngeo.createfeatureComponent');

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
goog.require('ol.interaction.DrawEventType');
goog.require('ol.style.Style');


/**
 * A component used to draw vector features of a single geometry type using
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
 * @htmlAttribute {boolean} ngeo-createfeature-active Whether the component is
 *     active or not.
 * @htmlAttribute {ol.Collection} ngeo-createfeature-features The collection of
 *     features where to add those created by this component.
 * @htmlAttribute {string} ngeo-createfeature-geom-type Determines the type
 *     of geometry this component should draw.
 * @htmlAttribute {ol.Map} ngeo-createfeature-map The map.
 *
 * @ngdoc component
 * @ngname ngeoCreatefeature
 */
ngeo.createfeatureComponent = {
  controller: 'ngeoCreatefeatureController as cfCtrl',
  bindings: {
    'active': '=ngeoCreatefeatureActive',
    'features': '=ngeoCreatefeatureFeatures',
    'geomType': '=ngeoCreatefeatureGeomType',
    'map': '=ngeoCreatefeatureMap'
  }
};

ngeo.module.component('ngeoCreatefeature', ngeo.createfeatureComponent);


/**
 * @param {!gettext} gettext Gettext service.
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.Scope} $scope Scope.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeo.EventHelper} ngeoEventHelper Ngeo event helper service
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
  this.active;

  /**
   * @type {ol.Collection.<!ol.Feature>|!ol.source.Vector}
   * @export
   */
  this.features;

  /**
   * @type {string}
   * @export
   */
  this.geomType;

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {!gettext}
   * @private
   */
  this.gettext_ = gettext;

  /**
   * @type {!angular.$compile}
   * @private
   */
  this.compile_ = $compile;

  /**
   * @type {!angular.$filter}
   * @private
   */
  this.filter_ = $filter;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * The draw or measure interaction responsible of drawing the vector feature.
   * The actual type depends on the geometry type.
   * @type {ol.interaction.Interaction}
   * @private
   */
  this.interaction_;


  // == Event listeners ==
  $scope.$watch(
    () => this.active,
    (newVal) => {
      this.interaction_.setActive(newVal);
    }
  );
};


/**
 * Initialise the component.
 */
ngeo.CreatefeatureController.prototype.$onInit = function() {
  this.active = this.active === true;

  // Create the draw or measure interaction depending on the geometry type
  let interaction;
  if (this.geomType === ngeo.GeometryType.POINT ||
      this.geomType === ngeo.GeometryType.MULTI_POINT
  ) {
    interaction = new ol.interaction.Draw({
      type: ol.geom.GeometryType.POINT
    });
  } else if (this.geomType === ngeo.GeometryType.LINE_STRING ||
      this.geomType === ngeo.GeometryType.MULTI_LINE_STRING
  ) {
    const helpMsg = this.gettext_('Click to start drawing length');
    const contMsg = this.gettext_(
      'Click to continue drawing<br/>' +
      'Double-click or click last point to finish'
    );

    interaction = new ngeo.interaction.MeasureLength(
      this.filter_('ngeoUnitPrefix'),
      {
        style: new ol.style.Style(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  } else if (this.geomType === ngeo.GeometryType.POLYGON ||
      this.geomType === ngeo.GeometryType.MULTI_POLYGON
  ) {
    const helpMsg = this.gettext_('Click to start drawing area');
    const contMsg = this.gettext_(
      'Click to continue drawing<br/>' +
      'Double-click or click starting point to finish'
    );

    interaction = new ngeo.interaction.MeasureArea(
      this.filter_('ngeoUnitPrefix'),
      {
        style: new ol.style.Style(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  }

  goog.asserts.assert(interaction);

  interaction.setActive(this.active);
  this.interaction_ = interaction;
  this.map.addInteraction(interaction);

  const uid = ol.getUid(this);
  if (interaction instanceof ol.interaction.Draw) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      ol.events.listen(
        interaction,
        ol.interaction.DrawEventType.DRAWEND,
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
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event|ngeo.MeasureEvent} event Event.
 * @export
 */
ngeo.CreatefeatureController.prototype.handleDrawEnd_ = function(event) {
  // convert to multi if geomType is multi and feature is not
  let geometry = event.feature.getGeometry();
  const type = geometry.getType();
  if (this.geomType.indexOf('Multi') != type.indexOf('Multi')) {
    geometry = ngeo.utils.toMulti(geometry);
  }
  const feature = new ol.Feature(geometry);
  if (this.features instanceof ol.Collection) {
    this.features.push(feature);
  } else {
    this.features.addFeature(feature);
  }
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 */
ngeo.CreatefeatureController.prototype.$onDestroy = function() {
  this.timeout_(() => {
    const uid = ol.getUid(this);
    this.ngeoEventHelper_.clearListenerKey(uid);
    this.interaction_.setActive(false);
    this.map.removeInteraction(this.interaction_);
  }, 0);
};


ngeo.module.controller(
  'ngeoCreatefeatureController', ngeo.CreatefeatureController);
