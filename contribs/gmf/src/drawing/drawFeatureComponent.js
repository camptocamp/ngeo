import angular from 'angular';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoMenu from 'ngeo/Menu.js';

import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoDrawComponent from 'ngeo/draw/component.js';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoInteractionModify from 'ngeo/interaction/Modify.js';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate.js';
import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';

import 'bootstrap/js/src/dropdown.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('GmfDrawFeatureComponent', [
  gmfDrawingFeatureStyleComponent.name,
  ngeoEditingExportfeaturesComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoDrawComponent.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/drawing/drawFeatureComponent', require('./drawFeatureComponent.html'));
  }
);

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
 * @htmlAttribute {import("ol/Map.js").default} gmf-drawfeature-map The map.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDrawfeature
 */
function drawinfDrawFeatureComponent() {
  return {
    controller: 'GmfDrawfeatureController as efCtrl',
    scope: {
      'active': '=gmfDrawfeatureActive',
      'map': '<gmfDrawfeatureMap',
      'showMeasure': '=?gmfDrawfeatureShowmeasure',
    },
    bindToController: true,
    templateUrl: 'gmf/drawing/drawFeatureComponent',
  };
}

module.directive('gmfDrawfeature', drawinfDrawFeatureComponent);

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {!import("ol/Collection.js").default.<!import("ol/Feature.js").default>} ngeoFeatures Collection
 *    of features.
 * @param {!import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
function Controller($scope, $timeout, gettextCatalog, ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr) {
  /**
   * @type {!import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {boolean}
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * @type {boolean}
   */
  this.drawActive = false;

  /**
   * @type {!import("ngeo/misc/ToolActivate.js").default}
   */
  this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

  /**
   * @type {boolean}
   */
  this.mapSelectActive = true;

  /**
   * @type {number?}
   * @private
   */
  this.longPressTimeout_ = null;

  /**
   * @type {!import("ngeo/misc/ToolActivate.js").default}
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

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
   * @type {!import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {!import("ol/Collection.js").default.<!import("ol/Feature.js").default>}
   */
  this.features = ngeoFeatures;

  /**
   * @type {!import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?import("ol/Feature.js").default}
   */
  this.selectedFeature = null;

  /**
   * @type {!import("ol/Collection.js").default.<!import("ol/Feature.js").default>}
   */
  this.selectedFeatures = new olCollection();

  /**
   * @type {!import("ol/Collection.js").default}
   * @private
   */
  this.interactions_ = new olCollection();

  /**
   * @type {!import("ngeo/interaction/Modify.js").default}
   * @private
   */
  this.modify_ = new ngeoInteractionModify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false),
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {?import("ngeo/Menu.js").default}
   * @private
   */
  this.menu_ = null;

  /**
   * @type {?import("ol/events.js").EventsKey}
   * @private
   */
  this.menuListenerKey_ = null;

  /**
   * @type {!import("ngeo/misc/ToolActivate.js").default}
   */
  this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {!import("ngeo/interaction/Translate.js").default}
   * @private
   */
  this.translate_ = new ngeoInteractionTranslate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf0b2',
        font: '900 18px "Font Awesome 5 Free"',
        fill: new olStyleFill({
          color: '#7a7a7a',
        }),
      }),
    }),
  });
  this.interactions_.push(this.translate_);

  /**
   * @type {!import("ngeo/interaction/Rotate.js").default}
   * @private
   */
  this.rotate_ = new ngeoInteractionRotate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf01e',
        font: '900 18px "Font Awesome 5 Free"',
        fill: new olStyleFill({
          color: '#7a7a7a',
        }),
      }),
    }),
  });
  this.interactions_.push(this.rotate_);

  this.initializeInteractions_();

  /**
   * @type {!import("ngeo/misc/ToolActivate.js").default}
   */
  this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');

  /**
   * @type {!import("ngeo/misc/ToolActivate.js").default}
   */
  this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

  /**
   * @type {!Array.<!import("ol/events.js").EventsKey>}
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

  $scope.$watch(() => this.active, this.handleActiveChange_.bind(this));

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

  $scope.$watch(() => this.mapSelectActive, this.handleMapSelectActiveChange_.bind(this));

  /**
   * @type {string}
   */
  this.nameProperty = ngeoFormatFeatureProperties.NAME;

  /**
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;
}

/**
 * Close menu, if it exists.
 * @private
 * @hidden
 */
Controller.prototype.closeMenu_ = function () {
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
Controller.prototype.initializeInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
  });
};

/**
 * Register interactions by adding them to the map
 * @private
 */
Controller.prototype.registerInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    this.map.addInteraction(interaction);
  });
};

/**
 * Register interactions by removing them to the map
 * @private
 */
Controller.prototype.unregisterInteractions_ = function () {
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
Controller.prototype.handleActiveChange_ = function (active) {
  const keys = this.listenerKeys_;
  const drawUid = ['draw-', olUtilGetUid(this)].join('-');
  const otherUid = ['other-', olUtilGetUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(
      olEvents.listen(this.features, 'add', this.handleFeaturesAdd_, this),
      olEvents.listen(this.features, 'remove', this.handleFeaturesRemove_, this)
    );

    keys.push(olEvents.listen(this.translate_, 'translateend', this.handleTranslateEnd_, this));

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
 * @param {!import("ol/Feature.js").default} feature Feature to select.
 */
Controller.prototype.selectFeatureFromList = function (feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
  this.drawActive = false;
};

/**
 * @return {!Array.<!import("ol/Feature.js").default>} Array.
 */
Controller.prototype.getFeaturesArray = function () {
  return this.features.getArray();
};

/**
 */
Controller.prototype.clearFeatures = function () {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString('Do you really want to delete all the features?');
  if (confirm(msg)) {
    this.features.clear();
  }
};

/**
 * @param {!import("ol/Feature.js").default} feature The feature to remove from the selection.
 */
Controller.prototype.removeFeature = function (feature) {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString('Do you really want to delete the selected feature?');
  if (confirm(msg)) {
    this.features.remove(feature);
  }
};

/**
 * @param {!import("ol/Collection.js").CollectionEvent} evt Event.
 * @private
 */
Controller.prototype.handleFeaturesAdd_ = function (evt) {
  // timeout to prevent double-click to zoom the map
  this.timeout_(() => {
    this.selectedFeature = /** @type {import("ol/Feature.js").default} */ (evt.element);
    this.drawActive = false;
    this.scope_.$apply();
  });
};

/**
 * @param {!import("ol/Collection.js").CollectionEvent} evt Event.
 * @private
 */
Controller.prototype.handleFeaturesRemove_ = function (evt) {
  this.selectedFeature = null;
};

/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
Controller.prototype.handleMapSelectActiveChange_ = function (active) {
  const mapDiv = this.map.getViewport();
  console.assert(mapDiv);

  if (active) {
    olEvents.listen(this.map, 'click', this.handleMapClick_, this);

    olEvents.listen(mapDiv, 'contextmenu', this.handleMapContextMenu_, this);

    olEvents.listen(mapDiv, 'touchstart', this.handleMapTouchStart_, this);

    olEvents.listen(mapDiv, 'touchmove', this.handleMapTouchEnd_, this);

    olEvents.listen(mapDiv, 'touchend', this.handleMapTouchEnd_, this);
  } else {
    olEvents.unlisten(this.map, 'click', this.handleMapClick_, this);

    olEvents.unlisten(mapDiv, 'contextmenu', this.handleMapContextMenu_, this);

    olEvents.unlisten(mapDiv, 'touchstart', this.handleMapTouchStart_, this);

    olEvents.unlisten(mapDiv, 'touchmove', this.handleMapTouchEnd_, this);

    olEvents.unlisten(mapDiv, 'touchend', this.handleMapTouchEnd_, this);
  }
};

/**
 * @param {!import("ol/MapBrowserEvent.js").default} evt Event.
 * @private
 */
Controller.prototype.handleMapClick_ = function (evt) {
  const pixel = evt.pixel;

  let feature = /** @type {import('ol/Feature.js').default|undefined} */ (
    this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        let ret = null;
        if (this.features.getArray().includes(/** @type import('ol/Feature.js').default */ (feature))) {
          ret = feature;
        }
        return ret;
      },
      {
        hitTolerance: 5,
        layerFilter: undefined,
      }
    )
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
Controller.prototype.handleMapTouchStart_ = function (evt) {
  this.longPressTimeout_ = window.setTimeout(() => {
    this.handleMapContextMenu_(evt);
  }, 500);
};

/**
 * @param {!Event} evt Event.
 * @private
 */
Controller.prototype.handleMapTouchEnd_ = function (evt) {
  clearTimeout(this.longPressTimeout_);
};

/**
 * @param {!Event} evt Event.
 * @private
 */
Controller.prototype.handleMapContextMenu_ = function (evt) {
  const gettextCatalog = this.gettextCatalog_;
  const pixel = this.map.getEventPixel(evt);
  const coordinate = this.map.getCoordinateFromPixel(pixel);

  let feature = /** @type {import('ol/Feature.js').default|undefined} */ (
    this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        let ret = null;
        if (this.features.getArray().includes(/** @type import('ol/Feature.js').default */ (feature))) {
          ret = feature;
        }
        return ret;
      },
      {
        hitTolerance: 7,
        layerFilter: undefined,
      }
    )
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {
    this.closeMenu_();

    let actions = [];

    const vertexInfo = this.featureHelper_.getVertexInfoAtCoordinate(
      feature,
      coordinate,
      this.map.getView().getResolution()
    );
    if (!vertexInfo) {
      const type = this.featureHelper_.getType(feature);
      if (
        type == ngeoGeometryType.CIRCLE ||
        type == ngeoGeometryType.LINE_STRING ||
        type == ngeoGeometryType.POLYGON ||
        type == ngeoGeometryType.RECTANGLE
      ) {
        actions = actions.concat([
          {
            cls: 'fas fa-arrows-alt',
            label: gettextCatalog.getString('Move'),
            name: 'move',
          },
          {
            cls: 'fas fa-undo fa-flip-horizontal',
            label: gettextCatalog.getString('Rotate'),
            name: 'rotate',
          },
        ]);
      }
    }

    actions = actions.concat([
      {
        cls: 'fa fa-trash',
        label: vertexInfo ? gettextCatalog.getString('Delete vertex') : gettextCatalog.getString('Delete'),
        name: 'delete',
      },
    ]);

    this.menu_ = new ngeoMenu({
      actions,
    });

    this.menuListenerKey_ = olEvents.listen(
      this.menu_,
      'actionclick',
      this.handleMenuActionClick_.bind(this, vertexInfo),
      this
    );
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

  this.selectedFeature = /** @type import('ol/Feature.js').default */ (feature);

  this.scope_.$apply();
};

/**
 * @param {?Array.<number>} vertexInfo Vertex information, in case a
 *     vertex was clicked using the right button.
 * @param {!import('ngeo/filter/ruleComponent.js').MenuEvent} evt Event.
 * @private
 */
Controller.prototype.handleMenuActionClick_ = function (vertexInfo, evt) {
  const action = evt.detail.action;

  switch (action) {
    case 'delete':
      console.assert(this.selectedFeature, 'Selected feature should be truthy');
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
 * @param {!import("ol/interaction/Translate.js").TranslateEvent} evt Event.
 * @private
 */
Controller.prototype.handleTranslateEnd_ = function (evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};

/**
 * @param {!import('ngeo/interaction/Rotate.js').RotateEvent} evt Event.
 * @private
 */
Controller.prototype.handleRotateEnd_ = function (evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};

module.controller('GmfDrawfeatureController', Controller);

export default module;
