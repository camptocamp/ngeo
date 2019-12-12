import angular from 'angular';
import gmfDrawingDrawFeatureOptionsComponent from 'gmf/drawing/drawFeatureOptionsComponent.js';
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
import {listen, unlistenByKey} from 'ol/events.js';
import olCollection from 'ol/Collection.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import {CollectionEvent} from 'ol/Collection.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import Feature from 'ol/Feature.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfDrawFeatureComponent', [
  gmfDrawingDrawFeatureOptionsComponent.name,
  gmfDrawingFeatureStyleComponent.name,
  ngeoEditingExportfeaturesComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoDrawComponent.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
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
      'showMeasure': '=?gmfDrawfeatureShowmeasure'
    },
    bindToController: true,
    templateUrl: 'gmf/drawing/drawFeatureComponent'
  };
}


module.directive('gmfDrawfeature', drawinfDrawFeatureComponent);


/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ol/Collection.js").default<Feature<import("ol/geom/Geometry.js").default>>} ngeoFeatures Collection
 *    of features.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
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
   * @type {?import("ol/Map.js").default}
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
   * @type {import("ngeo/misc/ToolActivate.js").default}
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
   * @private
   */
  this.longPressTimeout_ = null;

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

  /**
   * @type {angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import("ol/Collection.js").default<Feature<import("ol/geom/Geometry.js").default>>}
   */
  this.features = ngeoFeatures;

  /**
   * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?Feature<import("ol/geom/Geometry.js").default>}
   */
  this.selectedFeature = null;

  /**
   * @type {import("ol/Collection.js").default<Feature<import("ol/geom/Geometry.js").default>>}
   */
  this.selectedFeatures = new olCollection();


  /**
   * @type {import("ol/Collection.js").default<import('ol/interaction/Interaction.js').default>}
   * @private
   */
  this.interactions_ = new olCollection();

  /**
   * @type {import("ngeo/interaction/Modify.js").default}
   * @private
   */
  this.modify_ = new ngeoInteractionModify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false)
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
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');

  /**
   * @type {import("ngeo/interaction/Translate.js").default}
   * @private
   */
  this.translate_ = new ngeoInteractionTranslate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf0b2',
        font: '900 18px "Font Awesome 5 Free"',
        fill: new olStyleFill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.translate_);

  /**
   * @type {import("ngeo/interaction/Rotate.js").default}
   * @private
   */
  this.rotate_ = new ngeoInteractionRotate({
    features: this.selectedFeatures,
    style: new olStyleStyle({
      text: new olStyleText({
        text: '\uf01e',
        font: '900 18px "Font Awesome 5 Free"',
        fill: new olStyleFill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.interactions_.push(this.rotate_);

  this.initializeInteractions_();

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

  /**
   * @type {import("ol/events.js").EventsKey[]}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {import("ol/events.js").EventsKey[]}
   * @private
   */
  this.mainListenerKeys_ = [];

  /**
   * @type {import("ol/events.js").EventsKey[]}
   * @private
   */
  this.mapListenerKeys_ = [];

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
   */
  this.nameProperty = ngeoFormatFeatureProperties.NAME;

  /**
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  // --- Draw Interactions ---
  // Automatically set by listening interactions added to the map,
  // using the uid set...

  /**
   * @type {?import("ol/interaction/Draw.js").default}
   */
  this.drawPoint = null;

  /**
   * @type {?import("ngeo/interaction/MeasureLength.js").default}
   */
  this.measureLength = null;

  /**
   * @type {?import("ngeo/interaction/MeasureArea.js").default}
   */
  this.measureArea = null;

  /**
   * @type {?import("ngeo/interaction/MeasureAzimut.js").default}
   */
  this.measureAzimut = null;

  /**
   * @type {?import("ol/interaction/Draw.js").default}
   */
  this.drawRectangle = null;

  /**
   * @type {?import("ol/interaction/Draw.js").default}
   */
  this.drawText = null;
}


/**
 * Called upon initialization of the controller.
 */
Controller.prototype.$onInit = function() {
  if (!this.map) {
    throw new Error('Missing map');
  }

  this.mainListenerKeys_.push(
    listen(
      this.map.getInteractions(),
      'add',
      this.handleMapInteractionsAdd_,
      this
    )
  );
};


/**
 * Called upon destruction of the controller.
 */
Controller.prototype.$onDestroy = function() {
  this.mainListenerKeys_.forEach(unlistenByKey);
  this.mainListenerKeys_.length = 0;
};


/**
 * Close menu, if it exists.
 * @private
 * @hidden
 */
Controller.prototype.closeMenu_ = function() {
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
 * @private
 */
Controller.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    interaction.setActive(false);
    ngeoMiscDecorateInteraction(interaction);
  });
};


/**
 * Register interactions by adding them to the map
 * @private
 */
Controller.prototype.registerInteractions_ = function() {
  this.interactions_.forEach((interaction) => {
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.map.addInteraction(interaction);
  });
};


/**
 * Register interactions by removing them to the map
 * @private
 */
Controller.prototype.unregisterInteractions_ = function() {
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
 * @private
 */
Controller.prototype.handleActiveChange_ = function(active) {

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
 * @param {Feature<import("ol/geom/Geometry.js").default>} feature Feature to select.
 */
Controller.prototype.selectFeatureFromList = function(feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
  this.drawActive = false;
};


/**
 * @return {Array<Feature<import("ol/geom/Geometry.js").default>>} Array.
 */
Controller.prototype.getFeaturesArray = function() {
  return this.features.getArray();
};


/**
 */
Controller.prototype.clearFeatures = function() {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete all the features?');
  if (confirm(msg)) {
    this.features.clear();
  }
};


/**
 * @param {Feature<import("ol/geom/Geometry.js").default>} feature The feature to remove from the selection.
 */
Controller.prototype.removeFeature = function(feature) {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete the selected feature?');
  if (confirm(msg)) {
    this.features.remove(feature);
  }
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleFeaturesAdd_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    // timeout to prevent double-click to zoom the map
    this.timeout_(() => {
      this.selectedFeature = /** @type {Feature<import("ol/geom/Geometry.js").default>} */ (evt.element);
      this.drawActive = false;
      this.scope_.$apply();
    });
  }
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleFeaturesRemove_ = function(evt) {
  this.selectedFeature = null;
};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
Controller.prototype.handleMapSelectActiveChange_ = function(active) {
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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapClick_ = function(evt) {
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
        layerFilter: undefined
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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapTouchStart_ = function(evt) {
  this.longPressTimeout_ = window.setTimeout(() => {
    this.handleMapContextMenu_(evt);
  }, 500);
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapTouchEnd_ = function(evt) {
  if (!this.longPressTimeout_) {
    throw new Error('Missing longPressTimeout');
  }
  clearTimeout(this.longPressTimeout_);
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapContextMenu_ = function(evt) {
  if (evt instanceof Event) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const gettextCatalog = this.gettextCatalog_;
    const pixel = this.map.getEventPixel(evt);
    const coordinate = this.map.getCoordinateFromPixel(pixel);

    let feature = /** @type {?import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
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
          layerFilter: undefined
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
        if (type == ngeoGeometryType.CIRCLE ||
            type == ngeoGeometryType.LINE_STRING ||
            type == ngeoGeometryType.POLYGON ||
            type == ngeoGeometryType.RECTANGLE) {
          actions = actions.concat([{
            cls: 'fas fa-arrows-alt',
            label: gettextCatalog.getString('Move'),
            name: 'move'
          }, {
            cls: 'fas fa-undo fa-flip-horizontal',
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

      this.menuListenerKey_ = listen(this.menu_, 'actionclick',
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
  }
};


/**
 * @param {?number[]} vertexInfo Vertex information, in case a
 *     vertex was clicked using the right button.
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMenuActionClick_ = function(vertexInfo, evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent.js').MenuEvent} */(evt).detail.action;
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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleTranslateEnd_ = function(evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleRotateEnd_ = function(evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapInteractionsAdd_ = function(evt) {
  if (!(evt instanceof CollectionEvent)) {
    return;
  }

  // If the added interaction is a draw one registered with a unique
  // id, bind it to the according property.
  const interaction = /** @type {import('ol/interaction/Interaction.js').default} */ (evt.element);
  const drawFeatureUid = interaction.get('ngeo-interaction-draw-uid');

  switch (drawFeatureUid) {
    case `${this.ngeoDrawFeatureUid}-point`:
      this.drawPoint =
        /** @type {import("ol/interaction/Draw.js").default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-length`:
      this.measureLength =
        /** @type {import("ngeo/interaction/MeasureLength.js").default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-area`:
      this.measureArea =
        /** @type {import("ngeo/interaction/MeasureArea.js").default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-azimut`:
      this.measureAzimut =
        /** @type {import("ngeo/interaction/MeasureAzimut.js").default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-rectangle`:
      this.drawRectangle =
        /** @type {import("ol/interaction/Draw.js").default} */ (interaction);
      break;
    case `${this.ngeoDrawFeatureUid}-text`:
      this.drawText =
        /** @type {import("ol/interaction/Draw.js").default} */ (interaction);
      break;
    default:
      break;
  }
};

module.controller('GmfDrawfeatureController', Controller);


export default module;
