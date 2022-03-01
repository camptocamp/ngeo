// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import gmfEditingEditFeature from 'gmf/editing/EditFeature';

import gmfEditingSnapping from 'gmf/editing/Snapping';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes';
import {getLayer as syncLayertreeMapGetLayer} from 'gmf/layertree/SyncLayertreeMap';
import DateFormatter from 'ngeo/misc/php-date-formatter';
import 'jquery-datetimepicker/jquery.datetimepicker';
import 'jquery-datetimepicker/jquery.datetimepicker.css';

import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent';

import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent';

import {deleteCondition} from 'ngeo/utils';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute';
import ngeoGeometryType from 'ngeo/GeometryType';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper';
import ngeoMenu from 'ngeo/Menu';
import ngeoMenuMulti from 'gmf/menu/MenuMultiFeature';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';

import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';

import {getUid as olUtilGetUid} from 'ol/util';
import olCollection from 'ol/Collection';
import {listen, unlistenByKey} from 'ol/events';
import * as olExtent from 'ol/extent';
import olFeature from 'ol/Feature';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import olInteractionModify from 'ol/interaction/Modify';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/Tile';
import olStyleFill from 'ol/style/Fill';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import {CollectionEvent} from 'ol/Collection';
import VectorSource from 'ol/source/Vector';
import olLayerVector from 'ol/layer/Vector';
import {buildStyle} from 'ngeo/options';

/**
 * The different possible values of the `state` inner property.
 *
 * @enum {string}
 * @hidden
 */
export const EditingState = {
  /**
   * The default state. While idle, nothing happens.
   *
   * @type {string}
   */
  IDLE: 'idle',
  /**
   * The state active after the deactivation of the editing tools and the
   * unsaved modifications were saved or discarded.
   *
   * @type {string}
   */
  DEACTIVATE_EXECUTE: 'deactivate_execute',
  /**
   * The state active when the deactivation of the editing tools is in
   * progress while there are unsaved modifications.
   *
   * @type {string}
   */
  DEACTIVATE_PENDING: 'deactivate_pending',
  /**
   * Final state set after the "stop editing" button has been clicked while
   * no unsaved modifications were made or if the user saved them or confirmed
   * to continue without saving.
   *
   * @type {string}
   */
  STOP_EDITING_EXECUTE: 'stop_editing_execute',
  /**
   * The state that is active while when the "stop editing" button has been
   * clicked but before any confirmation has been made to continue.
   *
   * @type {string}
   */
  STOP_EDITING_PENDING: 'stop_editing_pending',
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfEditingFeatureComponent', [
  gmfEditingEditFeature.name,
  gmfEditingSnapping.name,
  gmfEditingXSDAttributes.name,
  ngeoEditingAttributesComponent.name,
  ngeoEditingCreatefeatureComponent.name,
  ngeoMapLayerHelper.name,
  ngeoMessageModalComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscEventHelper.name,
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
    $templateCache.put('gmf/editing/editFeatureComponent', require('./editFeatureComponent.html'));
  }
);

/**
 * Directive used to insert, modify and delete features from a single layer.
 * It allows you to modify the geometry of the feature in addition to its
 * attributes.
 *
 * In order to modify or delete a feature, you must click on the map at the
 * location of the feature to select it first.
 *
 * In order to create a new feature, you use the "Draw" button and digitize
 * the feature on the map.
 *
 * If no layers are editable the component will be hidden.
 *
 * Used metadata:
 *
 *  - `enumeratedAttributes`: List of attribute names which have enumerated attribute
 *      values (for filters purpose). For WMS layers.
 *  - `snappingConfig`: The snapping configuration for the leaf. If set, the leaf's layer is considered to be
 *      "snappable", even if the config itself is empty.
 *      Example value: {'tolerance': 50, 'edge': false} For WMS layers.
 *
 * Example:
 *
 *     <gmf-editfeature
 *         gmf-editfeature-dirty="ctrl.dirty"
 *         gmf-editfeature-editabletreectrl="::ctrl.treeCtrl"
 *         gmf-editfeature-map="::ctrl.map"
 *         gmf-editfeature-state="efsCtrl.state"
 *         gmf-editfeature-vector="::ctrl.vectorLayer">
 *     </gmf-editfeature>
 *
 * @htmlAttribute {boolean} gmf-editfeature-dirty Flag that is toggled as soon
 *     as the feature changes, i.e. if any of its properties change, which
 *     includes the geometry.
 * @htmlAttribute {import('ngeo/layertree/Controller').LayertreeController} gmf-editfeature-editabletreectrl
 *     A reference to the editable Layertree controller, which contains a
 *     a reference to the node and WMS layer.
 * @htmlAttribute {import('ol/Map').default} gmf-editfeature-map The map.
 * @htmlAttribute {string} gmf-editfeature-state The state property shared
 *     with the `gmf-editfeatureselector` directive. For more info, see in
 *     that directive.
 * @htmlAttribute {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} gmf-editfeature-vector The vector layer in
 *     which to draw the vector features.
 * @returns {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeature
 */
function editingEditFeatureComponent() {
  return {
    controller: 'GmfEditfeatureController as efCtrl',
    scope: {
      'dirty': '=gmfEditfeatureDirty',
      'editableTreeCtrl': '=gmfEditfeatureEditabletreectrl',
      'map': '<gmfEditfeatureMap',
      'state': '=gmfEditfeatureState',
      'vectorLayer': '<gmfEditfeatureVector',
    },
    bindToController: true,
    templateUrl: 'gmf/editing/editFeatureComponent',
  };
}

myModule.directive('gmfEditfeature', editingEditFeatureComponent);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IQService} $q Angular $q service.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('gmf/editing/EditFeature').EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import('gmf/editing/Snapping').EditingSnappingService} gmfSnapping The gmf snapping service.
 * @param {import('gmf/editing/XSDAttributes').EditingXSDAttributeService} gmfXSDAttributes The gmf
 *    XSDAttributes service.
 * @param {import('ngeo/misc/EventHelper').EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @param {import('gmf/options').gmfEditFeatureOptions} gmfEditFeatureOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureController
 */
export function Controller(
  $element,
  $q,
  $scope,
  $timeout,
  gettextCatalog,
  gmfEditFeature,
  gmfSnapping,
  gmfXSDAttributes,
  ngeoEventHelper,
  ngeoFeatureHelper,
  ngeoLayerHelper,
  ngeoToolActivateMgr,
  gmfEditFeatureOptions
) {
  // === Binding properties ===

  /**
   * Flag that is toggled as soon as the feature changes, i.e. if any of its
   * properties change, which includes the geometry.
   *
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {?import('ngeo/layertree/Controller').LayertreeController}
   */
  this.editableTreeCtrl = null;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * The state property shared with the `gmf-editfeatureselector` directive.
   * For more info, see in that directive.
   *
   * @type {string}
   */
  this.state = '';

  /**
   * @type {number}
   */
  this.tolerance = gmfEditFeatureOptions.tolerance ? gmfEditFeatureOptions.tolerance : 0;

  /**
   * @type {?import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.vectorLayer = null;

  /**
   * @type {boolean}
   * @export
   */
  this.closeAfterSave = gmfEditFeatureOptions.closeAfterSave ? gmfEditFeatureOptions.closeAfterSave : false;

  // === Injected properties ===

  /**
   * @type {JQuery}
   */
  this.element_ = $element;

  /**
   * @type {angular.IQService}
   */
  this.q_ = $q;

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import('gmf/editing/EditFeature').EditingEditFeature}
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import('gmf/editing/Snapping').EditingSnappingService}
   */
  this.gmfSnapping_ = gmfSnapping;

  /**
   * @type {import('gmf/editing/XSDAttributes').EditingXSDAttributeService}
   */
  this.gmfXSDAttributes_ = gmfXSDAttributes;

  /**
   * @type {import('ngeo/misc/EventHelper').EventHelper}
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import('ngeo/map/LayerHelper').LayerHelper}
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  // === Private properties ===

  /**
   * @type {?import('gmf/themes').GmfLayer}
   */
  this.editableNode_ = null;

  /**
   * @type {?import('ol/layer/Image').default<import('ol/source/Image').default>|import('ol/layer/Tile').default<import('ol/source/Tile').default>}
   */
  this.editableWMSLayer_ = null;

  /**
   * A deferred object resolved after the confirm modal "continue w/o saving" or
   * "save" buttons are clicked.
   *
   * @type {?angular.IDeferred<never>}
   */
  this.confirmDeferred_ = null;

  /**
   * Flag that controls the visibility of the modal that manages unsaved
   * modifications.
   *
   * @type {boolean}
   */
  this.unsavedModificationsModalShown = false;

  /**
   * Flag that is toggled while a request is pending, either one to get
   * features when a map is clicked or when saving
   */
  this.pending = false;

  /**
   * @type {boolean}
   */
  this.active = true;

  /**
   * @type {boolean}
   */
  this.createActive = false;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.createToolActivate = new ngeoMiscToolActivate(this, 'createActive');

  /**
   * @type {boolean}
   */
  this.mapSelectActive = true;

  /**
   * @type {import('ngeo/misc/ToolActivate').default}
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

  /**
   * @type {?olFeature<import('ol/geom/Geometry').default>}
   */
  this.feature = null;

  this.scope_.$watch(() => this.feature, this.handleFeatureChange_.bind(this));

  /**
   * @type {number|string|undefined}
   */
  this.featureId = undefined;

  /**
   * @type {?import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
   */
  this.features = null;

  /**
   * @type {?import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.highlightVectorLayer_ = null;

  /**
   * @type {?import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
   */
  this.highlightedFeatures_ = null;

  /**
   * @type {import('ol/Collection').default<import('ol/interaction/Interaction').default>}
   */
  this.interactions_ = new olCollection();

  /**
   * @type {?import('ol/interaction/Modify').default}
   */
  this.modify_ = null;

  /**
   * @type {?import('ngeo/misc/ToolActivate').default}
   */
  this.modifyToolActivate = null;

  /**
   * @type {import('ngeo/Menu').default}
   */
  this.menu_ = new ngeoMenu({
    actions: [
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
    ],
  });

  /**
   * @type {import('ngeo/Menu').default}
   */
  this.menuVertex_ = new ngeoMenu({
    actions: [
      {
        cls: 'fa fa-trash',
        label: gettextCatalog.getString('Delete vertex'),
        name: 'delete',
      },
    ],
  });

  /**
   * @type {import('gmf/menu/MenuMultiFeature').default}
   */
  this.menuMultiple_ = null;

  /**
   * @type {?import('ngeo/interaction/Translate').default}
   */
  this.translate_ = null;

  /**
   * @type {?import('ngeo/interaction/Rotate').default}
   */
  this.rotate_ = null;

  /**
   * @type {?import('ngeo/misc/ToolActivate').default}
   */
  this.rotateToolActivate = null;

  /**
   * @type {?import('ngeo/misc/ToolActivate').default}
   */
  this.translateToolActivate = null;

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.geomListenerKeys_ = [];

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.mapListenerKeys_ = [];

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.menuMultipleListenerKeys_ = [];

  /**
   * @type {?import('ngeo/format/Attribute').Attribute[]}
   */
  this.attributes = null;

  /**
   * @type {?string}
   */
  this.geomType = null;

  /**
   * @type {boolean}
   */
  this.showServerError = false;

  /**
   * @type {?string}
   */
  this.serverErrorMessage = null;

  /**
   * @type {?string}
   */
  this.serverErrorType = null;

  /**
   * @type {?number[]}
   */
  this.vertexInfo_ = null;

  /**
   * @type {import('gmf/options').gmfEditFeatureOptions}
   */
  this.options_ = gmfEditFeatureOptions;
}

/**
 * Called on initialization of the controller.
 */
Controller.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.highlightVectorLayer_ = new olLayerVector({
    source: new VectorSource({
      wrapX: false,
      features: new olCollection(),
    }),
    style: buildStyle(this.options_.highlightStyle),
  });
  this.highlightVectorLayer_.setMap(this.map);
  this.hightlightedFeatures_ = this.highlightVectorLayer_.getSource().getFeaturesCollection();

  const lang = this.gettextCatalog_.getCurrentLanguage();

  // @ts-ignore: $.datetimepicker is available, as it is imported
  $.datetimepicker.setLocale(lang);
  // @ts-ignore: $.datetimepicker is available, as it is imported
  $.datetimepicker.setDateFormatter(new DateFormatter());

  // (1) Set default values and other properties
  this.dirty = this.dirty === true;
  if (!this.editableTreeCtrl) {
    throw new Error('Missing editableTreeCtrl');
  }
  this.editableNode_ = /** @type {import('gmf/themes').GmfLayer} */ (this.editableTreeCtrl.node);
  if (!this.vectorLayer) {
    throw new Error('Missing vectorLayer');
  }
  const source = this.vectorLayer.getSource();
  if (!(source instanceof VectorSource)) {
    throw new Error('Wrong source');
  }
  this.features = source.getFeaturesCollection();
  this.tolerance = this.tolerance || 10;

  // (1.1) Set editable WMS layer
  const layer = syncLayertreeMapGetLayer(this.editableTreeCtrl);
  if (layer instanceof olLayerImage || layer instanceof olLayerTile) {
    this.editableWMSLayer_ = layer;
  }

  // (1.2) Create, set and initialize interactions
  this.modify_ = new olInteractionModify({
    deleteCondition: deleteCondition,
    features: this.features,
    style: this.ngeoFeatureHelper_.getVertexStyle(false),
  });
  this.interactions_.push(this.modify_);

  this.rotate_ = new ngeoInteractionRotate({
    features: this.features,
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

  this.translate_ = new ngeoInteractionTranslate({
    features: this.features,
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

  this.initializeInteractions_();

  this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');
  this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');
  this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

  // (1.3) Add menus to map
  this.map.addOverlay(this.menu_);
  this.map.addOverlay(this.menuVertex_);

  // (2) Watchers and event listeners
  this.scope_.$watch(
    () => this.createActive,
    (newVal, oldVal) => {
      if (newVal) {
        this.gmfSnapping_.ensureSnapInteractionsOnTop();
      }
    }
  );

  this.scope_.$on('$destroy', this.handleDestroy_.bind(this));

  const uid = olUtilGetUid(this);
  this.ngeoEventHelper_.addListenerKey(uid, listen(this.features, 'add', this.handleFeatureAdd_, this));

  this.scope_.$watch(() => this.mapSelectActive, this.handleMapSelectActiveChange_.bind(this));

  this.scope_.$watch(
    () => this.state,
    (newValue, oldValue) => {
      const state = EditingState;
      if (newValue === state.STOP_EDITING_PENDING) {
        if (this.feature && this.dirty) {
          this.confirmCancel().then(() => {
            this.timeout_(() => {
              this.state = state.STOP_EDITING_EXECUTE;
              this.scope_.$apply();
            }, 500);
          });
        } else {
          this.state = state.STOP_EDITING_EXECUTE;
        }
      } else if (newValue === state.DEACTIVATE_PENDING) {
        if (this.feature && this.dirty) {
          this.confirmCancel().then(() => {
            this.timeout_(() => {
              this.state = state.DEACTIVATE_EXECUTE;
              this.scope_.$apply();
            }, 500);
          });
        } else {
          this.state = state.DEACTIVATE_EXECUTE;
        }
      }
    }
  );

  this.scope_.$watch(
    () => this.unsavedModificationsModalShown,
    (newValue, oldValue) => {
      // Reset stop request when closing the confirmation modal
      if (oldValue && !newValue) {
        this.state = EditingState.IDLE;
      }
    }
  );

  // (3) Get attributes
  this.gmfXSDAttributes_.getAttributes(this.editableNode_.id).then(this.setAttributes_.bind(this));

  // (4) Toggle
  this.toggle_(true);
};

/**
 * Save the currently selected feature modifications.
 */
Controller.prototype.save = function () {
  if (!this.attributes) {
    throw new Error('Missing attributes');
  }
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  if (!this.editableNode_) {
    throw new Error('Missing editableNode');
  }

  const feature = this.feature.clone();
  feature.setId(this.feature.getId());
  const id = this.featureId;

  this.pending = true;

  // Correct datetime on save
  const dateFormatter = new DateFormatter();
  this.attributes.forEach((attribute) => {
    const value = this.feature.get(attribute.name);
    if (attribute.format && value) {
      console.assert(typeof value == 'string');
      const formattedValue = dateFormatter.parseDate(value, attribute.format);
      let jsonFormat = 'Y-m-d\\TH:i:s';
      if (attribute.type === 'date') {
        jsonFormat = 'Y-m-d';
      } else if (attribute.type === 'time') {
        jsonFormat = 'H:i:s';
      } else if (attribute.type === 'datetime') {
        // Time zone correction
        formattedValue.setMinutes(formattedValue.getMinutes() + formattedValue.getTimezoneOffset());
      }
      feature.set(attribute.name, dateFormatter.formatDate(formattedValue, jsonFormat));
    }
  });

  const promise = id
    ? this.gmfEditFeature_.updateFeature(this.editableNode_.id, feature)
    : this.gmfEditFeature_.insertFeatures(this.editableNode_.id, [feature]);
  promise
    .then((response) => {
      this.dirty = false;
      this.handleEditFeature_(response);
      this.gmfSnapping_.refresh();
      if (this.closeAfterSave) {
        this.cancel();
      }
    })
    .catch((response) => {
      this.showServerError = true;
      this.serverErrorType = `error type : ${response.data.error_type}`;
      this.serverErrorMessage = `error message : ${response.data.message}`;
    })
    .finally(() => {
      this.pending = false;
    });
};

/**
 */
Controller.prototype.cancel = function () {
  if (!this.features) {
    throw new Error('Missing features');
  }
  this.dirty = false;
  this.feature = null;
  this.features.clear();
  this.menu_.close();
  this.menuVertex_.close();
  this.unsavedModificationsModalShown = false;
};

/**
 * Check if there are unsaved modifications. If there aren't, then cancel.
 * Used by the 'cancel' button in the template.
 *
 * @returns {angular.IPromise<void>} The promise attached to the confirm deferred object.
 */
Controller.prototype.confirmCancel = function () {
  return this.checkForModifications_().then(() => {
    this.cancel();
  });
};

/**
 * Check if there's a feature selected and if it contains modifications
 * (a.k.a. is dirty), then the confirmation modal is shown.
 *
 * @param {boolean} [scopeApply] Whether to force scope to refresh or not.
 *     when the confirm modal is not dismissed.
 * @returns {angular.IPromise<void>} The promise attached to the confirm deferred
 *     object.
 */
Controller.prototype.checkForModifications_ = function (scopeApply) {
  this.confirmDeferred_ = this.q_.defer();
  if (this.feature && this.dirty) {
    this.unsavedModificationsModalShown = true;
    if (scopeApply) {
      this.scope_.$apply();
    }
  } else {
    this.confirmDeferred_.resolve();
  }

  return this.confirmDeferred_.promise;
};

/**
 */
Controller.prototype.continueWithoutSaving = function () {
  if (!this.confirmDeferred_) {
    throw new Error('Missing confirmDeferred_');
  }
  this.cancel();
  this.confirmDeferred_.resolve();
};

/**
 */
Controller.prototype.delete = function () {
  if (!this.editableNode_) {
    throw new Error('Missing editableNode_');
  }
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const msg = this.gettextCatalog_.getString('Do you really want to delete the selected feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.pending = true;

    // (1) Launch request
    this.gmfEditFeature_.deleteFeature(this.editableNode_.id, this.feature).then(
      (response) => {
        if (!this.editableWMSLayer_) {
          throw new Error('Missing editableWMSLayer_');
        }
        this.dirty = false;
        this.pending = false;
        this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);

        // (2) Reset selected feature
        this.cancel();
      },
      (response) => {
        this.showServerError = true;
        this.pending = false;
        this.serverErrorType = `error type : ${response.data.error_type}`;
        this.serverErrorMessage = `error message : ${response.data.message}`;
      }
    );
  }
};

/**
 * Called when the modal 'save' button is clicked. Do as if the user had
 * clicked on the 'save' input button in the form, which allows the form
 * to be validated.
 */
Controller.prototype.submit = function () {
  // Use timeout to prevent the digest already in progress
  // due to clicking on the modal button to throw an error.
  this.timeout_(() => {
    this.element_.find('input[type="submit"]').click();
  }, 0);
};

/**
 * Called after an insert, update or delete request.
 *
 * @param {angular.IHttpResponse<ArrayBuffer|Document|Node|string>} resp Ajax response.
 */
Controller.prototype.handleEditFeature_ = function (resp) {
  const features = new olFormatGeoJSON().readFeatures(resp.data);
  if (features.length) {
    if (!this.editableWMSLayer_) {
      throw new Error('Missing editableWMSLayer_');
    }
    if (!this.feature) {
      throw new Error('Missing feature');
    }
    this.feature.setId(features[0].getId());
    this.ngeoLayerHelper_.refreshWMSLayer(this.editableWMSLayer_);
  }
  if (this.confirmDeferred_) {
    this.confirmDeferred_.resolve();
  }
};

/**
 * @param {import('ngeo/format/Attribute').Attribute[]} attributes Attributes.
 */
Controller.prototype.setAttributes_ = function (attributes) {
  // Set attributes
  this.attributes = attributes;
  for (const attribute of attributes) {
    if (attribute.type == 'date') {
      attribute.format = 'Y-m-d';
      attribute.mask = '9999-19-39';
    } else if (attribute.type == 'time') {
      attribute.format = 'H:i';
      attribute.mask = '29:59';
    } else if (attribute.type == 'datetime') {
      attribute.format = 'Y-m-d H:i';
      attribute.mask = '9999-19-39 29:59';
    }
  }

  // Get geom type from attributes and set
  const geomAttr = getGeometryAttribute(this.attributes);
  if (geomAttr && geomAttr.geomType) {
    this.geomType = geomAttr.geomType;
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleFeatureAdd_ = function (evt) {
  if (evt instanceof CollectionEvent) {
    this.feature = null;
    this.timeout_(() => {
      if (!this.attributes) {
        throw new Error('Missing attributes');
      }
      const feature = evt.element;
      if (!(feature instanceof olFeature)) {
        throw new Error('Wrong feature type');
      }
      const dateFormatter = new DateFormatter();
      for (const attribute of this.attributes) {
        if (attribute.format) {
          if (feature.get(attribute.name)) {
            let value;
            if (attribute.type === 'datetime') {
              value = new Date(feature.get(attribute.name));
              // Time zone correction
              value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
            } else {
              let jsonFormat = '';
              if (attribute.type === 'date') {
                jsonFormat = 'Y-m-d';
              } else if (attribute.type === 'time') {
                jsonFormat = 'H:i:s';
              }
              const name = feature.get(attribute.name);
              if (typeof name != 'string') {
                throw new Error('Wrong name type');
              }
              value = dateFormatter.parseDate(name, jsonFormat);
            }
            feature.set(attribute.name, dateFormatter.formatDate(value, attribute.format));
          } else {
            // Shouldn't be set to an empty string
            feature.set(attribute.name, null);
          }
        }
      }
      this.feature = feature;
      this.createActive = false;
      if (!feature.getId()) {
        this.dirty = true;
      }
      this.scope_.$apply();
    }, 0);
  }
};

/**
 * Activate or deactivate this directive.
 *
 * @param {boolean} active Whether to activate this directive or not.
 */
Controller.prototype.toggle_ = function (active) {
  if (!this.modifyToolActivate) {
    throw new Error('Missing modifyToolActivate');
  }
  if (!this.translateToolActivate) {
    throw new Error('Missing translateToolActivate');
  }
  if (!this.rotateToolActivate) {
    throw new Error('Missing rotateToolActivate');
  }
  if (!this.modify_) {
    throw new Error('Missing modify');
  }
  if (!this.editableTreeCtrl) {
    throw new Error('Missing editableTreeCtrl');
  }

  const keys = this.listenerKeys_;
  const createUid = ['create-', olUtilGetUid(this)].join('-');
  const otherUid = ['other-', olUtilGetUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    if (!this.translate_) {
      throw new Error('Missing translate');
    }
    if (!this.rotate_) {
      throw new Error('Missing rotate');
    }

    // FIXME
    //this.registerInteractions_();

    keys.push(listen(this.menu_, 'actionclick', this.handleMenuActionClick_, this));
    keys.push(listen(this.menuVertex_, 'actionclick', this.handleMenuVertexActionClick_, this));
    keys.push(listen(this.translate_, 'translateend', this.handleTranslateEnd_, this));
    keys.push(listen(this.rotate_, 'rotateend', this.handleRotateEnd_, this));

    toolMgr.registerTool(createUid, this.createToolActivate, false);
    toolMgr.registerTool(createUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.createToolActivate, false);
    toolMgr.registerTool(otherUid, this.modifyToolActivate, true);
    toolMgr.registerTool(otherUid, this.translateToolActivate, false);
    toolMgr.registerTool(otherUid, this.rotateToolActivate, false);
  } else {
    // FIXME
    //this.unregisterInteractions_();

    keys.forEach(unlistenByKey);
    keys.length = 0;

    toolMgr.unregisterTool(createUid, this.createToolActivate);
    toolMgr.unregisterTool(createUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.createToolActivate);
    toolMgr.unregisterTool(otherUid, this.modifyToolActivate);
    toolMgr.unregisterTool(otherUid, this.translateToolActivate);
    toolMgr.unregisterTool(otherUid, this.rotateToolActivate);

    this.createActive = false;
    this.cancel();
  }

  this.modify_.setActive(active);
  this.mapSelectActive = active;
  this.editableTreeCtrl.properties.editing = active;
};

/**
 * Called when the mapSelectActive property changes.
 *
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
    this.mapListenerKeys_.push(
      listen(this.map, 'click', this.handleMapClick_, this),
      listen(mapDiv, 'contextmenu', this.handleMapContextMenu_, this)
    );
  } else {
    this.mapListenerKeys_.forEach(unlistenByKey);
  }
};

/**
 * Called when the map is clicked.
 *
 * (1) If a vector feature was clicked, don't do anything (i.e. allow the
 *     interactions to do their bidings without selecting a new feature).
 *
 * (2) Otherwise, if there is a feature being edited and has unsaved
 *     modifications, show the confirmation modal asking the user what to do
 *     about it.
 *
 * (3) If there's no feature selected or we have one without unsaved
 *     modifications or with modifications that were canceled, launch a query
 *     to fetch the features at the clicked location.
 *
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapClick_ = function (evt) {
  if (evt instanceof MapBrowserEvent) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const coordinate = evt.coordinate;
    const pixel = evt.pixel;

    // (1) Check if we clicked on an existing vector feature, i.e the one
    //     selected. In that case, no need to do any further action.
    const feature = this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        if (!(feature instanceof olFeature)) {
          throw new Error('Wrong feature type');
        }
        if (!this.features) {
          throw new Error('Missing features');
        }
        let ret = null;
        if (this.features.getArray().includes(feature)) {
          ret = feature;
        }
        return ret;
      },
      {
        hitTolerance: 5,
        layerFilter: undefined,
      }
    );

    if (feature) {
      return;
    }

    // (2) If a feature is being edited and has unsaved changes, show modal
    //     to let the user decide what to do
    this.checkForModifications_(true).then(() => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      if (!this.editableNode_) {
        throw new Error('Missing editableNode');
      }

      const map = this.map;
      const view = map.getView();
      const resolution = view.getResolution();
      if (resolution === undefined) {
        throw new Error('Missing resolution');
      }
      const buffer = resolution * this.tolerance;
      const extent = olExtent.buffer([coordinate[0], coordinate[1], coordinate[0], coordinate[1]], buffer);

      // (3) Launch query to fetch features
      this.gmfEditFeature_
        .getFeaturesInExtent([this.editableNode_.id], extent)
        .then(this.handleGetFeatures_.bind(this, coordinate));

      // (4) Clear any previously selected feature
      this.cancel();

      // (5) Pending
      this.pending = true;
    });
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMapContextMenu_ = function (evt) {
  if (evt instanceof UIEvent) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    const pixel = this.map.getEventPixel(evt);
    const coordinate = this.map.getCoordinateFromPixel(pixel);

    let feature = this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        if (!(feature instanceof olFeature)) {
          throw new Error('Wrong feature type');
        }
        if (!this.features) {
          throw new Error('Missing features');
        }
        let ret = null;
        if (this.features.getArray().includes(feature)) {
          ret = feature;
        }
        return ret;
      },
      {
        hitTolerance: 7,
        layerFilter: undefined,
      }
    );

    feature = feature ? feature : null;

    this.menu_.close();
    this.menuVertex_.close();
    this.vertexInfo_ = null;

    // show contextual menu when clicking on certain types of features
    if (feature instanceof olFeature) {
      const resolutions = this.map.getView().getResolution();
      if (!resolutions) {
        throw new Error('Missing resolutions');
      }
      const vertexInfo = this.ngeoFeatureHelper_.getVertexInfoAtCoordinate(feature, coordinate, resolutions);
      if (vertexInfo) {
        this.vertexInfo_ = vertexInfo;
        this.menuVertex_.open(coordinate);
      } else {
        const type = this.ngeoFeatureHelper_.getType(feature);
        if (
          type === ngeoGeometryType.POLYGON ||
          type === ngeoGeometryType.MULTI_POLYGON ||
          type === ngeoGeometryType.LINE_STRING ||
          type === ngeoGeometryType.MULTI_LINE_STRING
        ) {
          this.menu_.open(coordinate);
        }
      }

      evt.preventDefault();
      evt.stopPropagation();
    }
  }
};

/**
 *@param {?olFeature<import('ol/geom/Geometry').default>} feature The feature to edit.
 */
Controller.prototype.setFeature_ = function (feature) {
  this.feature = feature;
  this.features.push(feature);
};

/**
 * @param {number[]} coordinate The click coordinates.
 * @param {olFeature<import('ol/geom/Geometry').default>[]} features Features.
 */
Controller.prototype.handleGetFeatures_ = function (coordinate, features) {
  this.pending = false;

  this.timeout_(() => {
    if (!this.features) {
      throw new Error('Missing features');
    }

    if (features.length === 1) {
      this.setFeature_(features[0]);
    } else if (features.length > 1) {
      this.openFeatureMenu_(coordinate, features);
    }
  }, 0);
};

/**
 *@param {number[]} coordinate The click coordinates.
 *@param {olFeature<import('ol/geom/Geometry').default>[]} features Features.
 */
Controller.prototype.openFeatureMenu_ = function (coordinate, features) {
  /** @type {import('ngeo/Menu').MenuActionOptions[]} */
  const actions = [];
  features.forEach((feature) => {
    const label = feature.get('name') ? feature.get('name') : feature.getId();
    /** @type {import('ngeo/Menu').MenuActionOptions} */
    const choice = {
      cls: '',
      label: label,
      name: feature.getId().toString(),
    };
    actions.push(choice);
  });

  this.menuMultiple_ = new ngeoMenuMulti({
    actions,
  });
  this.menuMultipleListenerKeys_.push(
    listen(
      this.menuMultiple_,
      'actionmouseenter',
      this.handleMultiMenuActionMouseEnter_.bind(this, features),
      this
    )
  );
  this.menuMultipleListenerKeys_.push(
    listen(
      this.menuMultiple_,
      'actionmouseout',
      this.handleMultiMenuActionMouseOut_.bind(this, features),
      this
    )
  );
  this.menuMultipleListenerKeys_.push(
    listen(this.menuMultiple_, 'actionclick', this.handleMenuMultipleActionClick_.bind(this, features), this)
  );

  this.map.addOverlay(this.menuMultiple_);
  if (features[0].getGeometry().getType() === 'MultiPoint') {
    const resolution = this.map.getView().getResolution();
    if (resolution === undefined) {
      throw new Error('Missing resolution');
    }
    const offset = resolution * 10;
    this.menuMultiple_.open([coordinate[0] + offset, coordinate[1] + offset]);
  } else {
    this.menuMultiple_.open(coordinate);
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
 * Unregister interactions, i.e. set them inactive and remove them from the map
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
 * @param {?olFeature<import('ol/geom/Geometry').default>} newFeature The new feature.
 * @param {?olFeature<import('ol/geom/Geometry').default>} oldFeature The old feature.
 */
Controller.prototype.handleFeatureChange_ = function (newFeature, oldFeature) {
  let geom;
  if (oldFeature) {
    this.geomListenerKeys_.forEach(unlistenByKey);
    this.unregisterInteractions_();
  }

  if (newFeature) {
    this.featureId = newFeature.getId();
    geom = newFeature.getGeometry();
    this.geomListenerKeys_.push(
      listen(newFeature, 'propertychange', this.handleFeaturePropertyChange_, this),
      listen(geom, 'change', this.handleFeatureGeometryChange_, this)
    );
    this.registerInteractions_();

    this.gmfSnapping_.ensureSnapInteractionsOnTop();

    // The `ui-date` triggers an unwanted change, i.e. it converts the text
    // to Date, which makes the directive dirty when it shouldn't... to
    // bypass this, we reset the dirty state here. We do so only if we're
    // editing an existing feature
    if (this.featureId) {
      this.timeout_(() => {
        this.dirty = false;
        this.scope_.$apply();
      }, 0);
    }
  } else {
    this.featureId = undefined;
  }
};

Controller.prototype.handleFeaturePropertyChange_ = function () {
  this.dirty = true;
};

Controller.prototype.handleFeatureGeometryChange_ = function () {
  this.dirty = true;
  this.scope_.$apply();
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMenuActionClick_ = function (evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent').MenuEvent} */ (evt).detail.action;

  switch (action) {
    case 'move':
      if (!this.translate_) {
        throw new Error('Missing translate');
      }
      this.translate_.setActive(true);
      this.scope_.$apply();
      break;
    case 'rotate':
      if (!this.rotate_) {
        throw new Error('Missing rotate');
      }
      this.rotate_.setActive(true);
      this.scope_.$apply();
      break;
    default:
      break;
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMenuVertexActionClick_ = function (evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent').MenuEvent} */ (evt).detail.action;

  switch (action) {
    case 'delete':
      if (!this.feature) {
        throw new Error('Missing feature');
      }
      if (!this.vertexInfo_) {
        throw new Error('Missing vertexInfo');
      }
      const feature = this.feature;
      const vertexInfo = this.vertexInfo_;
      this.ngeoFeatureHelper_.removeVertex(feature, vertexInfo);
      this.scope_.$apply();
      break;
    default:
      break;
  }
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleTranslateEnd_ = function (evt) {
  if (!this.translate_) {
    throw new Error('Missing translate');
  }
  this.translate_.setActive(false);
  this.scope_.$apply();
};

/**
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleRotateEnd_ = function (evt) {
  if (!this.rotate_) {
    throw new Error('Missing rotate');
  }
  this.rotate_.setActive(false);
  this.scope_.$apply();
};

Controller.prototype.handleDestroy_ = function () {
  if (!this.features) {
    throw new Error('Missing features');
  }
  this.features.clear();
  this.handleFeatureChange_(null, this.feature);
  this.feature = null;
  const uid = olUtilGetUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
  this.toggle_(false);
  this.handleMapSelectActiveChange_(false);
  this.unregisterInteractions_();
};

/**
 * Handles the click on element in the feature menu
 * In the call the parameters are in inverse order!
 *
 * @param {olFeature<import('ol/geom/Geometry').default>[]} features Features.
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMenuMultipleActionClick_ = function (features, evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent').MenuEvent} */ (evt).detail.action;
  const feature = Object.values(features).filter((feature) => feature.getId() === action);
  this.setFeature_(feature[0]);
  this.hightlightedFeatures_.clear();
};

/**
 * Handles mouse entering a menu item of the multiple feature menu
 *
 * @param {olFeature<import('ol/geom/Geometry').default>[]} features Features.
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleMultiMenuActionMouseEnter_ = function (features, evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent').MenuEvent} */ (evt).detail.action;
  const feature = Object.values(features).filter((feature) => feature.getId() === action);
  this.hightlightedFeatures_.push(feature[0]);
};

/**
 * Handles mouse leaving a menu item of the multiple feature menu
 */
Controller.prototype.handleMultiMenuActionMouseOut_ = function () {
  this.hightlightedFeatures_.clear();
};

myModule.controller('GmfEditfeatureController', Controller);

export default myModule;
