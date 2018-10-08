/**
 * @module gmf.drawing.drawFeatureComponent
 */

/** @suppress {extraRequire} */
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

import googAsserts from 'goog/asserts.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoMenu from 'ngeo/Menu.js';

/** @suppress {extraRequire} */
import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent.js';

/** @suppress {extraRequire} */
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

/** @suppress {extraRequire} */
import ngeoDrawComponent from 'ngeo/draw/component.js';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoInteractionModify from 'ngeo/interaction/Modify.js';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import * as olBase from 'ol/index.js';
import * as olArray from 'ol/array.js';
import * as olEvents from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {!angular.Module}
 */
const exports = angular.module('GmfDrawFeatureComponent', [
  gmfDrawingFeatureStyleComponent.name,
  ngeoEditingExportfeaturesComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoDrawComponent.name,
  ngeoMiscFeatureHelper.module.name,
  ngeoMiscToolActivateMgr.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/drawing/drawFeatureComponent', require('./drawFeatureComponent.html'));
});


/**
 * Directive used to create, modify and delete vector features on a map with
 * the addition of changing their style.
 * Example:
 *
 *     <gmf-drawfeature
 *         gmf-drawfeature-active="ctrl.drawFeatureActive"
 *         gmf-drawfeature-map="::ctrl.map">
 *     </gmf-drawfeature>
 *
 * @htmlAttribute {boolean} gmf-drawfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Map} gmf-drawfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDrawfeature
 */
exports.component_ = function() {
  return {
    controller: 'GmfDrawfeatureController as efCtrl',
    scope: {
      'active': '=gmfDrawfeatureActive',
      'map': '<gmfDrawfeatureMap',
      'showMeasure': '=?gmfDrawfeatureShowmeasure'
    },
    bindToController: true,
    templateUrl: 'gmf/drawing/drawFeatureComponent'
  };
};


exports.directive('gmfDrawfeature',
  exports.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!ngeo.misc.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {!ol.Collection.<!ol.Feature>} ngeoFeatures Collection of features.
 * @param {!ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
exports.Controller_ = function($scope, $timeout, gettextCatalog,
  ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr) {

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

  /**
   * @type {!ngeo.misc.ToolActivate}
   * @export
   */
  this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

  /**
   * @type {boolean}
   * @export
   */
  this.mapSelectActive = true;

  /**
   * @type {number?}
   * @private
   */
  this.longPressTimeout_ = null;

  /**
   * @type {!ngeo.misc.ToolActivate}
   * @export
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

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
   * @type {!ngeo.misc.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {!ol.Collection.<!ol.Feature>}
   * @export
   */
  this.features = ngeoFeatures;

  /**
   * @type {!ngeo.misc.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  /**
   * @type {!ol.Collection.<!ol.Feature>}
   * @export
   */
  this.selectedFeatures = new olCollection();


  /**
   * @type {!ol.Collection}
   * @private
   */
  this.interactions_ = new olCollection();

  /**
   * @type {!ngeo.interaction.Modify}
   * @private
   */
  this.modify_ = new ngeoInteractionModify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {?ngeo.Menu}
   * @private
   */
  this.menu_ = null;

  /**
   * @type {?ol.EventsKey}
   * @private
   */
  this.menuListenerKey_ = null;

  /**
   * @type {!ngeo.misc.ToolActivate}
   * @export
   */
  this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {!ngeo.interaction.Translate}
   * @private
   */
  this.translate_ = new ngeoInteractionTranslate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf047',
        font: 'normal 18px FontAwesome',
        fill: new olStyleFill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.translate_);

  /**
   * @type {!ngeo.interaction.Rotate}
   * @private
   */
  this.rotate_ = new ngeoInteractionRotate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf01e',
        font: 'normal 18px FontAwesome',
        fill: new olStyleFill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.rotate_);

  this.initializeInteractions_();

  /**
   * @type {!ngeo.misc.ToolActivate}
   * @export
   */
  this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');

  /**
   * @type {!ngeo.misc.ToolActivate}
   * @export
   */
  this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

  /**
   * @type {!Array.<!ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * Flag used to determine whether the selection of a feature was made
   * from the selection of an item from the list or not (the map, contextual
   * menu, etc.)
   * @type {boolean}
   * @private
   */
  this.listSelectionInProgress_ = false;

  $scope.$watch(
    () => this.active,
    this.handleActiveChange_.bind(this)
  );

  $scope.$watch(
    () => this.drawActive,
    (active) => {
      if (active) {
        this.selectedFeature = null;
      }
    }
  );

  $scope.$watch(
    () => this.selectedFeature,
    (newFeature, previousFeature) => {
      this.selectedFeatures.clear();
      if (previousFeature) {
        this.featureHelper_.setStyle(previousFeature);
        this.unregisterInteractions_();
      }
      if (newFeature) {
        this.featureHelper_.setStyle(newFeature, true);
        this.selectedFeatures.push(newFeature);
        this.registerInteractions_();
        if (this.listSelectionInProgress_) {
          this.featureHelper_.fitMapToFeature(newFeature, this.map);
          this.listSelectionInProgress_ = false;
        }
      } else {
        this.closeMenu_();
      }
    }
  );

  $scope.$watch(
    () => this.mapSelectActive,
    this.handleMapSelectActiveChange_.bind(this)
  );

  /**
   * @type {string}
   * @export
   */
  this.nameProperty = ngeoFormatFeatureProperties.NAME;

  /**
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;
};


/**
 * Close menu, if it exists.
 * @private
 */
exports.Controller_.prototype.closeMenu_ = function() {
  if (this.menu_) {
    this.map.removeOverlay(this.menu_);
    this.menu_ = null;
    olEvents.unlistenByKey(this.menuListenerKey_);
  }
};


/**
 * Initialize interactions by setting them inactive and decorating them
 * @private
 */
exports.Controller_.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorate.interaction(interaction);
  });
};


/**
 * Register interactions by adding them to the map
 * @private
 */
exports.Controller_.prototype.registerInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    this.map.addInteraction(interaction);
  });
};


/**
 * Register interactions by removing them to the map
 * @private
 */
exports.Controller_.prototype.unregisterInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    this.map.removeInteraction(interaction);
  });
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly (event management, etc.)
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
exports.Controller_.prototype.handleActiveChange_ = function(active) {

  const keys = this.listenerKeys_;
  const drawUid = ['draw-', olBase.getUid(this)].join('-');
  const otherUid = ['other-', olBase.getUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(
      olEvents.listen(this.features, 'add', this.handleFeaturesAdd_, this),
      olEvents.listen(this.features, 'remove', this.handleFeaturesRemove_, this)
    );

    keys.push(olEvents.listen(this.translate_,
      'translateend',
      this.handleTranslateEnd_, this));

    keys.push(olEvents.listen(this.rotate_, 'rotateend', this.handleRotateEnd_, this));

    toolMgr.registerTool(drawUid, this.drawToolActivate, false);
    toolMgr.registerTool(drawUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.drawToolActivate, false);
    toolMgr.registerTool(otherUid, this.modifyToolActivate, true);
    toolMgr.registerTool(otherUid, this.translateToolActivate, false);
    toolMgr.registerTool(otherUid, this.rotateToolActivate, false);

    this.mapSelectActive = true;
    this.modify_.setActive(true);
  } else {
    // when deactivated

    keys.forEach(olEvents.unlistenByKey);
    keys.length = 0;

    toolMgr.unregisterTool(drawUid, this.drawToolActivate);
    toolMgr.unregisterTool(drawUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.drawToolActivate);
    toolMgr.unregisterTool(otherUid, this.modifyToolActivate);
    toolMgr.unregisterTool(otherUid, this.translateToolActivate);
    toolMgr.unregisterTool(otherUid, this.rotateToolActivate);

    this.drawActive = false;
    this.modify_.setActive(false);
    this.mapSelectActive = false;
    this.selectedFeature = null;

    this.closeMenu_();
  }

};


/**
 * Method called when a selection occurs from the list, i.e. when an item in
 * the list of features is clicked. Called from the template, so no need to
 * update Angular's scope.
 * @param {!ol.Feature} feature Feature to select.
 * @export
 */
exports.Controller_.prototype.selectFeatureFromList = function(feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
  this.drawActive = false;
};


/**
 * @return {!Array.<!ol.Feature>} Array.
 * @export
 */
exports.Controller_.prototype.getFeaturesArray = function() {
  return this.features.getArray();
};


/**
 * @export
 */
exports.Controller_.prototype.clearFeatures = function() {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete all the features?');
  if (confirm(msg)) {
    this.features.clear();
  }
};


/**
 * @param {!ol.Feature} feature The feature to remove from the selection.
 * @export
 */
exports.Controller_.prototype.removeFeature = function(feature) {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete the selected feature?');
  if (confirm(msg)) {
    this.features.remove(feature);
  }
};


/**
 * @param {!ol.Collection.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleFeaturesAdd_ = function(evt) {
  // timeout to prevent double-click to zoom the map
  this.timeout_(() => {
    this.selectedFeature = /** @type {ol.Feature} */ (evt.element);
    this.drawActive = false;
    this.scope_.$apply();
  });
};


/**
 * @param {!ol.Collection.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleFeaturesRemove_ = function(evt) {
  this.selectedFeature = null;
};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
exports.Controller_.prototype.handleMapSelectActiveChange_ = function(
  active) {

  const mapDiv = this.map.getViewport();
  googAsserts.assertElement(mapDiv);

  if (active) {
    olEvents.listen(this.map, 'click',
      this.handleMapClick_, this);

    olEvents.listen(mapDiv, 'contextmenu',
      this.handleMapContextMenu_, this);

    olEvents.listen(mapDiv, 'touchstart',
      this.handleMapTouchStart_, this);

    olEvents.listen(mapDiv, 'touchmove',
      this.handleMapTouchEnd_, this);

    olEvents.listen(mapDiv, 'touchend',
      this.handleMapTouchEnd_, this);

  } else {
    olEvents.unlisten(this.map, 'click',
      this.handleMapClick_, this);

    olEvents.unlisten(mapDiv, 'contextmenu',
      this.handleMapContextMenu_, this);

    olEvents.unlisten(mapDiv, 'touchstart',
      this.handleMapTouchStart_, this);

    olEvents.unlisten(mapDiv, 'touchmove',
      this.handleMapTouchEnd_, this);

    olEvents.unlisten(mapDiv, 'touchend',
      this.handleMapTouchEnd_, this);
  }
};


/**
 * @param {!ol.MapBrowserEvent} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMapClick_ = function(evt) {

  const pixel = evt.pixel;

  let feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (olArray.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 5
    }
  );

  feature = feature ? feature : null;

  // do not do any further action if feature is null or already selected
  if (feature === this.selectedFeature) {
    return;
  }

  this.selectedFeature = feature;

  this.scope_.$apply();
};


/**
 * @param {!Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMapTouchStart_ = function(evt) {
  this.longPressTimeout_ = setTimeout(() => {
    this.handleMapContextMenu_(evt);
  }, 500);
};


/**
 * @param {!Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMapTouchEnd_ = function(evt) {
  clearTimeout(this.longPressTimeout_);
};


/**
 * @param {!Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMapContextMenu_ = function(evt) {
  const gettextCatalog = this.gettextCatalog_;
  const pixel = this.map.getEventPixel(evt);
  const coordinate = this.map.getCoordinateFromPixel(pixel);

  let feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (olArray.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 7
    }
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {

    this.closeMenu_();

    let actions = [];

    const vertexInfo = this.featureHelper_.getVertexInfoAtCoordinate(
      feature, coordinate, this.map.getView().getResolution());
    if (!vertexInfo) {
      const type = this.featureHelper_.getType(feature);
      if (type == ngeoGeometryType.CIRCLE ||
          type == ngeoGeometryType.LINE_STRING ||
          type == ngeoGeometryType.POLYGON ||
          type == ngeoGeometryType.RECTANGLE) {
        actions = actions.concat([{
          cls: 'fa fa-arrows',
          label: gettextCatalog.getString('Move'),
          name: 'move'
        }, {
          cls: 'fa fa-rotate-right',
          label: gettextCatalog.getString('Rotate'),
          name: 'rotate'
        }]);
      }
    }

    actions = actions.concat([{
      cls: 'fa fa-trash',
      label: vertexInfo ? gettextCatalog.getString('Delete vertex') :
        gettextCatalog.getString('Delete'),
      name: 'delete'
    }]);

    this.menu_ = new ngeoMenu({
      actions
    });

    this.menuListenerKey_ = olEvents.listen(this.menu_, 'actionclick',
      this.handleMenuActionClick_.bind(this, vertexInfo), this);
    this.map.addOverlay(this.menu_);

    this.menu_.open(coordinate);

    evt.preventDefault();
    evt.stopPropagation();
  }

  // do not do any further action if feature is null or already selected
  if (feature === this.selectedFeature) {
    return;
  }

  this.modify_.setActive(true);

  this.selectedFeature = feature;

  this.scope_.$apply();
};


/**
 * @param {?Array.<number>} vertexInfo Vertex information, in case a
 *     vertex was clicked using the right button.
 * @param {!ngeox.MenuEvent} evt Event.
 * @private
 */
exports.Controller_.prototype.handleMenuActionClick_ = function(
  vertexInfo, evt
) {
  const action = evt.detail.action;

  switch (action) {
    case 'delete':
      googAsserts.assert(
        this.selectedFeature, 'Selected feature should be truthy');
      if (vertexInfo) {
        this.featureHelper_.removeVertex(this.selectedFeature, vertexInfo);
      } else {
        this.removeFeature(this.selectedFeature);
      }
      this.scope_.$apply();
      break;
    case 'move':
      this.translate_.setActive(true);
      this.scope_.$apply();
      break;
    case 'rotate':
      this.rotate_.setActive(true);
      this.scope_.$apply();
      break;
    default:
      // FIXME
      console.log(`FIXME - support: ${action}`);
      break;
  }
};


/**
 * @param {!ol.interaction.Translate.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleTranslateEnd_ = function(evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {!ngeox.RotateEvent} evt Event.
 * @private
 */
exports.Controller_.prototype.handleRotateEnd_ = function(evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};


exports.controller('GmfDrawfeatureController',
  exports.Controller_);


export default exports;
