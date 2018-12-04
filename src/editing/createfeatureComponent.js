/**
 * @module ngeo.editing.createfeatureComponent
 */
import googAsserts from 'goog/asserts.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoUtils from 'ngeo/utils.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olStyleStyle from 'ol/style/Style.js';

const exports = angular.module('ngeoCreatefeature', [
  ngeoMiscEventHelper.module.name,
  ngeoMiscFilters.name,
]);


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
 *
 * @return {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname ngeoCreatefeature
 */
exports.directive_ = function() {
  return {
    controller: 'ngeoCreatefeatureController',
    bindToController: true,
    scope: {
      'active': '=ngeoCreatefeatureActive',
      'features': '=ngeoCreatefeatureFeatures',
      'geomType': '=ngeoCreatefeatureGeomType',
      'map': '=ngeoCreatefeatureMap'
    }
  };
};

exports.directive('ngeoCreatefeature', exports.directive_);


/**
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angular.IScope} $scope Scope.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!ngeo.misc.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreatefeatureController
 */
exports.Controller_ = function(gettextCatalog, $compile, $filter, $scope,
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
   * @type {!angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {!angular.ICompileService}
   * @private
   */
  this.compile_ = $compile;

  /**
   * @type {!angular.IFilterService}
   * @private
   */
  this.filter_ = $filter;

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!ngeo.misc.EventHelper}
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
 * Initialize the directive.
 */
exports.Controller_.prototype.$onInit = function() {
  this.active = this.active === true;
  const gettextCatalog = this.gettextCatalog_;

  // Create the draw or measure interaction depending on the geometry type
  let interaction;
  if (this.geomType === ngeoGeometryType.POINT ||
      this.geomType === ngeoGeometryType.MULTI_POINT
  ) {
    interaction = new olInteractionDraw({
      type: /** @type {ol.geom.GeometryType} */ ('Point')
    });
  } else if (this.geomType === ngeoGeometryType.LINE_STRING ||
      this.geomType === ngeoGeometryType.MULTI_LINE_STRING
  ) {
    const helpMsg = gettextCatalog.getString('Click to start drawing length');
    const contMsg = gettextCatalog.getString(
      'Click to continue drawing<br/>' +
      'Double-click or click last point to finish'
    );

    interaction = new ngeoInteractionMeasureLength(
      this.filter_('ngeoUnitPrefix'),
      gettextCatalog,
      {
        style: new olStyleStyle(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  } else if (this.geomType === ngeoGeometryType.POLYGON ||
      this.geomType === ngeoGeometryType.MULTI_POLYGON
  ) {
    const helpMsg = gettextCatalog.getString('Click to start drawing area');
    const contMsg = gettextCatalog.getString(
      'Click to continue drawing<br/>' +
      'Double-click or click starting point to finish'
    );

    interaction = new ngeoInteractionMeasureArea(
      this.filter_('ngeoUnitPrefix'),
      gettextCatalog,
      {
        style: new olStyleStyle(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  }

  googAsserts.assert(interaction);

  interaction.setActive(this.active);
  this.interaction_ = interaction;
  this.map.addInteraction(interaction);

  const uid = olUtilGetUid(this);
  if (interaction instanceof olInteractionDraw) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      olEvents.listen(
        interaction,
        'drawend',
        this.handleDrawEnd_,
        this
      )
    );
  } else if (interaction instanceof ngeoInteractionMeasureLength ||
     interaction instanceof ngeoInteractionMeasureArea) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      olEvents.listen(
        interaction,
        'measureend',
        this.handleDrawEnd_,
        this
      )
    );
  }
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event|ngeox.MeasureEvent} event Event.
 * @export
 */
exports.Controller_.prototype.handleDrawEnd_ = function(event) {
  let sketch;
  if (event.feature) {
    // ol.interaction.Draw.Event
    sketch = event.feature;
  } else {
    // ngeox.MeasureEvent
    sketch = event.detail.feature;
  }
  googAsserts.assert(sketch);

  // convert to multi if geomType is multi and feature is not
  let geometry = sketch.getGeometry();
  const type = geometry.getType();
  if (this.geomType.indexOf('Multi') != type.indexOf('Multi')) {
    geometry = ngeoUtils.toMulti(geometry);
  }
  const feature = new olFeature(geometry);
  if (this.features instanceof olCollection) {
    this.features.push(feature);
  } else {
    this.features.addFeature(feature);
  }
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 */
exports.Controller_.prototype.$onDestroy = function() {
  this.timeout_(() => {
    const uid = olUtilGetUid(this);
    this.ngeoEventHelper_.clearListenerKey(uid);
    this.interaction_.setActive(false);
    this.map.removeInteraction(this.interaction_);
  }, 0);
};

exports.controller('ngeoCreatefeatureController', exports.Controller_);


export default exports;
