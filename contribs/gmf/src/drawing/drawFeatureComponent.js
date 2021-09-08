// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import gmfDrawingDrawFeatureOptionsComponent from 'gmf/drawing/drawFeatureOptionsComponent';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent';

import ngeoGeometryType from 'ngeo/GeometryType';
import ngeoMenu from 'ngeo/Menu';

import ngeoEditingExportfeaturesComponent from 'ngeo/editing/exportfeaturesComponent';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import ngeoDrawComponent from 'ngeo/draw/component';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties';
import ngeoInteractionModify from 'ngeo/interaction/Modify';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate';
import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import {getUid as olUtilGetUid} from 'ol/util';
import {listen, unlistenByKey} from 'ol/events';
import olCollection from 'ol/Collection';
import olStyleFill from 'ol/style/Fill';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import {CollectionEvent} from 'ol/Collection';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Feature from 'ol/Feature';

import 'bootstrap/js/src/dropdown';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfDrawFeatureComponent', [
  gmfDrawingDrawFeatureOptionsComponent.name,
  gmfDrawingFeatureStyleComponent.name,
  ngeoEditingExportfeaturesComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoDrawComponent.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
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
 * @htmlAttribute {import('ol/Map').default} gmf-drawfeature-map The map.
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

myModule.directive('gmfDrawfeature', drawinfDrawFeatureComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('gmf/editing/Snapping').EditingSnappingService} gmfSnapping The gmf snapping service.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import('ol/Collection').default<Feature<import('ol/geom/Geometry').default>>} ngeoFeatures Collection
 *    of features.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
export function Controller(
  $scope,
  $timeout,
  gettextCatalog,
  gmfSnapping,
  ngeoFeatureHelper,
  ngeoFeatures,
  ngeoToolActivateMgr
) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.drawActive = false;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

  /**
   * @type {string}
   */
  this.ngeoDrawFeatureUid = 'gmf-drawfeature';

  /**
   * @type {boolean}
   */
  this.mapSelectActive = true;

  /**
   * @type {number?}
   */
  this.longPressTimeout_ = null;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {import('gmf/editing/Snapping').EditingSnappingService}
   */
  this.gmfSnapping_ = gmfSnapping;

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import('ol/Collection').default<Feature<import('ol/geom/Geometry').default>>}
   */
  this.features = ngeoFeatures;

  /**
   * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?Feature<import('ol/geom/Geometry').default>}
   */
  this.selectedFeature = null;

  /**
   * @type {import('ol/Collection').default<Feature<import('ol/geom/Geometry').default>>}
   */
  this.selectedFeatures = new olCollection();

  /**
   * @type {import('ol/Collection').default<import('ol/interaction/Interaction').default>}
   */
  this.interactions_ = new olCollection();

  /**
   * @type {import('ngeo/interaction/Modify').default}
   */
  this.modify_ = new ngeoInteractionModify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false),
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {?import('ngeo/Menu').default}
   */
  this.menu_ = null;

  /**
   * @type {?import('ol/events').EventsKey}
   */
  this.menuListenerKey_ = null;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {import('ngeo/interaction/Translate').default}
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
   * @type {import('ngeo/interaction/Rotate').default}
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
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.mainListenerKeys_ = [];

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.mapListenerKeys_ = [];

  /**
   * Flag used to determine whether the selection of a feature was made
   * from the selection of an item from the list or not (the map, contextual
   * menu, etc.)
   * @type {boolean}
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
      if (!this.map) {
        throw new Error('Missing map');
      }
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
        this.gmfSnapping_.ensureSnapInteractionsOnTop();
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

  this.gettextCatalog_ = gettextCatalog;

  // --- Draw Interactions ---
  // Automatically set by listening interactions added to the map,
  // using the uid set...

  /**
   * @type {?import('ol/interaction/Draw').default}
   */
  this.drawPoint = null;

  /**
   * @type {?import('ngeo/interaction/MeasureLength').default}
   */
  this.measureLength = null;

  /**
   * @type {?import('ngeo/interaction/MeasureArea').default}
   */
  this.measureArea = null;

  /**
   * @type {?import('ngeo/interaction/MeasureAzimut').default}
   */
  this.measureAzimut = null;

  /**
   * @type {?import('ol/interaction/Draw').default}
   */
  this.drawRectangle = null;

  /**
   * @type {?import('ol/interaction/Draw').default}
   */
  this.drawText = null;
}

/**
 * Called upon initialization of the controller.
 */
Controller.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }

  this.mainListenerKeys_.push(
    listen(this.map.getInteractions(), 'add', this.handleMapInteractionsAdd_, this)
  );
};

/**
 * Called upon destruction of the controller.
 */
Controller.prototype.$onDestroy = function () {
  this.mainListenerKeys_.forEach(unlistenByKey);
  this.mainListenerKeys_.length = 0;
};

/**
 * Close menu, if it exists.
 * @hidden
 */
Controller.prototype.closeMenu_ = function () {
  if (this.menu_) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.menuListenerKey_) {
      throw new Error('Missing menuListenerKey');
    }
    this.map.removeOverlay(this.menu_);
    this.menu_ = null;
    unlistenByKey(this.menuListenerKey_);
  }
};

/**
 * Initialize interactions by setting them inactive and decorating them
 */
Controller.prototype.initializeInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
  });
};

/**
 * Register interactions by adding them to the map
 */
Controller.prototype.registerInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.addInteraction(interaction);
  });
};

/**
 * Register interactions by removing them to the map
 */
Controller.prototype.unregisterInteractions_ = function () {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.removeInteraction(interaction);
  });
};

/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly (event management, etc.)
 * @param {boolean} active Whether the directive is active or not.
 */
Controller.prototype.handleActiveChange_ = function (active) {
  const keys = this.listenerKeys_;
  const drawUid = ['draw-', olUtilGetUid(this)].join('-');
  const otherUid = ['other-', olUtilGetUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(listen(this.features, 'add', this.handleFeaturesAdd_, this));
    keys.push(listen(this.features, 'remove', this.handleFeaturesRemove_, this));
    keys.push(listen(this.translate_, 'translateend', this.handleTranslateEnd_, this));
    keys.push(listen(this.rotate_, 'rotateend', this.handleRotateEnd_, this));

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

    keys.forEach(unlistenByKey);
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
 * @param {Feature<import('ol/geom/Geometry').default>} feature Feature to select.
 */
Controller.prototype.selectFeatureFromList = function (feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
  this.drawActive = false;
};

/**
 * @return {Feature<import('ol/geom/Geometry').default>[]} Array.
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
 * @param {Feature<import('ol/geom/Geometry').default>} feature The feature to remove from the selection.
 */
Controller.prototype.removeFeature = function (feature) {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString('Do you really want to delete the selected feature?');
  if (confirm(msg)) {
    this.features.remove(feature);
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleFeaturesAdd_ = function (evt) {
  if (evt instanceof CollectionEvent) {
    // timeout to prevent double-click to zoom the map
    this.timeout_(() => {
      this.selectedFeature = /** @type {Feature<import('ol/geom/Geometry').default>} */ (evt.element);
      this.drawActive = false;
      this.scope_.$apply();
    });
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleFeaturesRemove_ = function (evt) {
  this.selectedFeature = null;
};

/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 */
Controller.prototype.handleMapSelectActiveChange_ = function (active) {
  if (!this.map) {
    throw new Error('Missing map');
  }

  const mapDiv = this.map.getViewport();
  if (!mapDiv) {
    throw new Error('Missing mapDiv');
  }

  if (active) {
    this.mapListenerKeys_.push(listen(this.map, 'click', this.handleMapClick_, this));
    this.mapListenerKeys_.push(listen(mapDiv, 'contextmenu', this.handleMapContextMenu_, this));
    this.mapListenerKeys_.push(listen(mapDiv, 'touchstart', this.handleMapTouchStart_, this));
    this.mapListenerKeys_.push(listen(mapDiv, 'touchmove', this.handleMapTouchEnd_, this));
    this.mapListenerKeys_.push(listen(mapDiv, 'touchend', this.handleMapTouchEnd_, this));
  } else {
    this.mapListenerKeys_.forEach(unlistenByKey);
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapClick_ = function (evt) {
  if (evt instanceof MapBrowserEvent) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const pixel = evt.pixel;

    let feature = this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        let ret = null;
        if (feature instanceof Feature) {
          if (this.features.getArray().includes(feature)) {
            ret = feature;
          }
        }
        return ret;
      },
      {
        hitTolerance: 5,
        layerFilter: undefined,
      }
    );

    feature = feature ? feature : null;

    // do not do any further action if feature is null or already selected
    if (feature === this.selectedFeature) {
      return;
    }

    this.selectedFeature = feature;

    this.scope_.$apply();
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapTouchStart_ = function (evt) {
  this.longPressTimeout_ = window.setTimeout(() => {
    this.handleMapContextMenu_(evt);
  }, 500);
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapTouchEnd_ = function (evt) {
  if (!this.longPressTimeout_) {
    throw new Error('Missing longPressTimeout');
  }
  clearTimeout(this.longPressTimeout_);
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapContextMenu_ = function (evt) {
  if (evt instanceof UIEvent) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const gettextCatalog = this.gettextCatalog_;
    const pixel = this.map.getEventPixel(evt);
    const coordinate = this.map.getCoordinateFromPixel(pixel);

    let feature = /** @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
      this.map.forEachFeatureAtPixel(
        pixel,
        (feature) => {
          if (feature instanceof Feature) {
            let ret = null;
            if (this.features.getArray().includes(feature)) {
              ret = feature;
            }
            return ret;
          }
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

      /** @type {import('ngeo/Menu').MenuActionOptions[]} */
      let actions = [];
      const resolution = this.map.getView().getResolution();
      if (resolution === undefined) {
        throw new Error('Missing resolution');
      }
      const vertexInfo = this.featureHelper_.getVertexInfoAtCoordinate(feature, coordinate, resolution);
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

      this.menuListenerKey_ = listen(
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

    this.selectedFeature = feature;

    this.scope_.$apply();
  }
};

/**
 * @param {?number[]} vertexInfo Vertex information, in case a
 *     vertex was clicked using the right button.
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMenuActionClick_ = function (vertexInfo, evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent').MenuEvent} */ (evt).detail.action;
  if (!this.selectedFeature) {
    throw new Error('Missing selectedFeature');
  }

  switch (action) {
    case 'delete':
      if (!this.selectedFeature) {
        throw new Error('Missing selectedFeature');
      }
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
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleTranslateEnd_ = function (evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleRotateEnd_ = function (evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapInteractionsAdd_ = function (evt) {
  if (!(evt instanceof CollectionEvent)) {
    return;
  }

  // If the added interaction is a draw one registered with a unique
  // id, bind it to the according property.
  const interaction = /** @type {import('ol/interaction/Interaction').default} */ (evt.element);
  const drawFeatureUid = interaction.get('ngeo-interaction-draw-uid');

  switch (drawFeatureUid) {
    case `${this.ngeoDrawFeatureUid}-point`:
      this.drawPoint = /** @type {import('ol/interaction/Draw').default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-length`:
      this.measureLength = /** @type {import('ngeo/interaction/MeasureLength').default} */ (interaction);
      this.measureLength.spherical = this.featureHelper_.spherical;
      break;
    case `${this.ngeoDrawFeatureUid}-area`:
      this.measureArea = /** @type {import('ngeo/interaction/MeasureArea').default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-azimut`:
      this.measureAzimut = /** @type {import('ngeo/interaction/MeasureAzimut').default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-rectangle`:
      this.drawRectangle = /** @type {import('ol/interaction/Draw').default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-text`:
      this.drawText = /** @type {import('ol/interaction/Draw').default} */ (interaction);
      break;
    default:
      break;
  }
};

myModule.controller('GmfDrawfeatureController', Controller);

export default myModule;
