import angular from 'angular';
import gmfEditingEditFeature from 'gmf/editing/EditFeature.js';

import gmfEditingSnapping from 'gmf/editing/Snapping.js';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import {getLayer as syncLayertreeMapGetLayer} from 'gmf/layertree/SyncLayertreeMap.js';
import DateFormatter from 'ngeo/misc/php-date-formatter.js';
import 'jquery-datetimepicker/jquery.datetimepicker.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';


import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';

import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';

import {deleteCondition} from 'ngeo/utils.js';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMenu from 'ngeo/Menu.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';

import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';

import {getUid as olUtilGetUid} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import {listen, unlistenByKey} from 'ol/events.js';
import * as olExtent from 'ol/extent.js';
import olFeature from 'ol/Feature.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import olInteractionModify from 'ol/interaction/Modify.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import {CollectionEvent} from 'ol/Collection.js';
import VectorSource from 'ol/source/Vector.js';

/**
 * The different possible values of the `state` inner property.
 * @enum {string}
 * @hidden
 */
export const EditingState = {
  /**
   * The default state. While idle, nothing happens.
   * @type {string}
   */
  IDLE: 'idle',
  /**
   * The state active after the deactivation of the editing tools and the
   * unsaved modifications were saved or discarded.
   * @type {string}
   */
  DEACTIVATE_EXECUTE: 'deactivate_execute',
  /**
   * The state active when the deactivation of the editing tools is in
   * progress while there are unsaved modifications.
   * @type {string}
   */
  DEACTIVATE_PENDING: 'deactivate_pending',
  /**
   * Final state set after the "stop editing" button has been clicked while
   * no unsaved modifications were made or if the user saved them or confirmed
   * to continue without saving.
   * @type {string}
   */
  STOP_EDITING_EXECUTE: 'stop_editing_execute',
  /**
   * The state that is active while when the "stop editing" button has been
   * clicked but before any confirmation has been made to continue.
   * @type {string}
   */
  STOP_EDITING_PENDING: 'stop_editing_pending'
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfEditingFeatureComponent', [
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


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/editing/editFeatureComponent', require('./editFeatureComponent.html'));
  });


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
 *  * `enumeratedAttributes`: List of attribute names which have enumerated attribute
 *      values (for filters purpose). For WMS layers.
 *  * `snappingConfig`: The snapping configuration for the leaf. If set, the leaf's layer is considered to be
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
 *         gmf-editfeature-tolerance="::ctrl.tolerance"
 *         gmf-editfeature-vector="::ctrl.vectorLayer">
 *         gmf-editfeature-closeaftersave="::ctrl.closeaftersave">
 *     </gmf-editfeature>
 *
 * @htmlAttribute {boolean} gmf-editfeature-dirty Flag that is toggled as soon
 *     as the feature changes, i.e. if any of its properties change, which
 *     includes the geometry.
 * @htmlAttribute {import("ngeo/layertree/Controller.js").LayertreeController} gmf-editfeature-editabletreectrl
 *     A reference to the editable Layertree controller, which contains a
 *     a reference to the node and WMS layer.
 * @htmlAttribute {import("ol/Map.js").default} gmf-editfeature-map The map.
 * @htmlAttribute {string} gmf-editfeature-state The state property shared
 *     with the `gmf-editfeatureselector` directive. For more info, see in
 *     that directive.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {import("ol/layer/Vector.js").default} gmf-editfeature-vector The vector layer in
 *     which to draw the vector features.
 * @htmlAttribute {boolean} gmf-editfeatureselector-closeaftersave If true,
 *     immediately return to the main edit panel after save. Default is false.
 * @return {angular.IDirective} The directive specs.
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
      'tolerance': '<?gmfEditfeatureTolerance',
      'vectorLayer': '<gmfEditfeatureVector',
      'closeAfterSave': '=?gmfEditfeatureCloseaftersave'
    },
    bindToController: true,
    templateUrl: 'gmf/editing/editFeatureComponent'
  };
}


module.directive('gmfEditfeature', editingEditFeatureComponent);


/**
 * @param {JQuery} $element Element.
 * @param {angular.IQService} $q Angular $q service.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import("gmf/editing/EditFeature.js").EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import("gmf/editing/Snapping.js").EditingSnappingService} gmfSnapping The gmf snapping service.
 * @param {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService} gmfXSDAttributes The gmf
 *    XSDAttributes service.
 * @param {import("ngeo/misc/EventHelper.js").EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureController
 */
function Controller($element, $q, $scope, $timeout,
  gettextCatalog, gmfEditFeature, gmfSnapping, gmfXSDAttributes,
  ngeoEventHelper, ngeoFeatureHelper, ngeoLayerHelper, ngeoToolActivateMgr) {


  // === Binding properties ===

  /**
   * Flag that is toggled as soon as the feature changes, i.e. if any of its
   * properties change, which includes the geometry.
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {?import("ngeo/layertree/Controller.js").LayertreeController}
   */
  this.editableTreeCtrl = null;

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * The state property shared with the `gmf-editfeatureselector` directive.
   * For more info, see in that directive.
   * @type {string}
   */
  this.state = '';

  /**
   * @type {number}
   */
  this.tolerance = 0;

  /**
   * @type {?import("ol/layer/Vector.js").default}
   */
  this.vectorLayer = null;

  /**
   * @type {boolean}
   * @export
   */
  this.closeAfterSave = false;

  // === Injected properties ===

  /**
   * @type {JQuery}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {angular.IQService}
   * @private
   */
  this.q_ = $q;

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
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import("gmf/editing/EditFeature.js").EditingEditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import("gmf/editing/Snapping.js").EditingSnappingService}
   * @private
   */
  this.gmfSnapping_ = gmfSnapping;

  /**
   * @type {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService}
   * @private
   */
  this.gmfXSDAttributes_ = gmfXSDAttributes;

  /**
   * @type {import("ngeo/misc/EventHelper.js").EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   * @private
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


  // === Private properties ===

  /**
   * @type {?import('gmf/themes.js').GmfLayer}
   * @private
   */
  this.editableNode_ = null;

  /**
   * @type {?import("ol/layer/Image.js").default|import("ol/layer/Tile.js").default}
   * @private
   */
  this.editableWMSLayer_ = null;

  /**
   * A deferred object resolved after the confirm modal "continue w/o saving" or
   * "save" buttons are clicked.
   * @type {?angular.IDeferred<never>}
   * @private
   */
  this.confirmDeferred_ = null;

  /**
   * Flag that controls the visibility of the modal that manages unsaved
   * modifications.
   * @type {boolean}
   */
  this.unsavedModificationsModalShown = false;

  /**
   * Flag that is toggled while a request is pending, either one to get
   * features when a map is clicked or when saving
   * @private
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
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.createToolActivate = new ngeoMiscToolActivate(this, 'createActive');

  /**
   * @type {boolean}
   */
  this.mapSelectActive = true;

  /**
   * @type {import("ngeo/misc/ToolActivate.js").default}
   */
  this.mapSelectToolActivate = new ngeoMiscToolActivate(this, 'mapSelectActive');

  /**
   * @type {?olFeature<import("ol/geom/Geometry.js").default>}
   */
  this.feature = null;

  this.scope_.$watch(
    () => this.feature,
    this.handleFeatureChange_.bind(this)
  );

  /**
   * @type {number|string|undefined}
   */
  this.featureId = undefined;

  /**
   * @type {?import("ol/Collection.js").default<olFeature<import("ol/geom/Geometry.js").default>>}
   */
  this.features = null;

  /**
   * @type {import("ol/Collection.js").default<import('ol/interaction/Interaction.js').default>}
   * @private
   */
  this.interactions_ = new olCollection();

  /**
   * @type {?import("ol/interaction/Modify.js").default}
   * @private
   */
  this.modify_ = null;

  /**
   * @type {?import("ngeo/misc/ToolActivate.js").default}
   */
  this.modifyToolActivate = null;

  /**
   * @type {import("ngeo/Menu.js").default}
   * @private
   */
  this.menu_ = new ngeoMenu({
    actions: [{
      cls: 'fas fa-arrows-alt',
      label: gettextCatalog.getString('Move'),
      name: 'move'
    }, {
      cls: 'fas fa-undo fa-flip-horizontal',
      label: gettextCatalog.getString('Rotate'),
      name: 'rotate'
    }]
  });

  /**
   * @type {import("ngeo/Menu.js").default}
   * @private
   */
  this.menuVertex_ = new ngeoMenu({
    actions: [{
      cls: 'fa fa-trash',
      label: gettextCatalog.getString('Delete vertex'),
      name: 'delete'
    }]
  });

  /**
   * @type {?import("ngeo/interaction/Translate.js").default}
   * @private
   */
  this.translate_ = null;

  /**
   * @type {?import("ngeo/interaction/Rotate.js").default}
   * @private
   */
  this.rotate_ = null;

  /**
   * @type {?import("ngeo/misc/ToolActivate.js").default}
   */
  this.rotateToolActivate = null;

  /**
   * @type {?import("ngeo/misc/ToolActivate.js").default}
   */
  this.translateToolActivate = null;

  /**
   * @type {import("ol/events.js").EventsKey[]>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {import("ol/events.js").EventsKey[]}
   */
  this.geomListenerKeys_ = [];

  /**
   * @type {import("ol/events.js").EventsKey[]}
   */
  this.mapListenerKeys_ = [];

  /**
   * @type {?import('ngeo/format/Attribute.js').Attribute[]}
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
   * @private
   */
  this.vertexInfo_ = null;
}


/**
 * Called on initialization of the controller.
 */
Controller.prototype.$onInit = function() {
  if (!this.map) {
    throw new Error('Missing map');
  }
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
  this.editableNode_ = /** @type {import('gmf/themes.js').GmfLayer} */ (this.editableTreeCtrl.node);
  if (!this.vectorLayer) {
    throw new Error('Missing vectorLayer');
  }
  const source = this.vectorLayer.getSource();
  if (!(source instanceof VectorSource)) {
    throw new Error('Wrong source');
  }
  this.features = source.getFeaturesCollection();
  this.tolerance = this.tolerance !== undefined ? this.tolerance : 10;

  // (1.1) Set editable WMS layer
  const layer = syncLayertreeMapGetLayer(this.editableTreeCtrl);
  if (layer instanceof olLayerImage || layer instanceof olLayerTile) {
    this.editableWMSLayer_ = layer;
  }

  // (1.2) Create, set and initialize interactions
  this.modify_ = new olInteractionModify({
    deleteCondition: deleteCondition,
    features: this.features,
    style: this.ngeoFeatureHelper_.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  this.rotate_ = new ngeoInteractionRotate({
    features: this.features,
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

  this.translate_ = new ngeoInteractionTranslate({
    features: this.features,
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
  this.ngeoEventHelper_.addListenerKey(
    uid,
    listen(
      this.features,
      'add',
      this.handleFeatureAdd_,
      this
    )
  );

  this.scope_.$watch(
    () => this.mapSelectActive,
    this.handleMapSelectActiveChange_.bind(this)
  );

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
  this.gmfXSDAttributes_.getAttributes(this.editableNode_.id).then(
    this.setAttributes_.bind(this));


  // (4) Toggle
  this.toggle_(true);

};


/**
 * Save the currently selected feature modifications.
 */
Controller.prototype.save = function() {
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

  const dateFormatter = new DateFormatter();
  for (const attribute of this.attributes) {
    if (attribute.format) {
      if (this.feature.get(attribute.name)) {
        const name = this.feature.get(attribute.name);
        if (typeof name == 'string') {
          throw new Error('Wrong name type');
        }
        const value = dateFormatter.parseDate(name, attribute.format);
        if (value === null) {
          throw new Error('Missing date');
        }
        let jsonFormat = 'Y-m-d\\TH:i:s';
        if (attribute.type === 'date') {
          jsonFormat = 'Y-m-d';
        } else if (attribute.type === 'time') {
          jsonFormat = 'H:i:s';
        } else if (attribute.type === 'datetime') {
          // Time zone correction
          value.setMinutes(value.getMinutes() + value.getTimezoneOffset());
        }
        feature.set(attribute.name, dateFormatter.formatDate(value, jsonFormat));
      } else {
        // Shouldn't be set to an empty string
        feature.set(attribute.name, null);
      }
    }
  }

  const promise = id ?
    this.gmfEditFeature_.updateFeature(
      this.editableNode_.id,
      feature
    ) :
    this.gmfEditFeature_.insertFeatures(
      this.editableNode_.id,
      [feature]
    );
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
Controller.prototype.cancel = function() {
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
 * @return {angular.IPromise<void>} The promise attached to the confirm deferred object.
 */
Controller.prototype.confirmCancel = function() {
  return this.checkForModifications_().then(() => {
    this.cancel();
  });
};


/**
 * Check if there's a feature selected and if it contains modifications
 * (a.k.a. is dirty), then the confirmation modal is shown.
 * @param {boolean=} scopeApply Whether to force scope to refresh or not.
 *     when the confirm modal is not dismissed.
 * @return {angular.IPromise<void>} The promise attached to the confirm deferred
 *     object.
 * @private
 */
Controller.prototype.checkForModifications_ = function(
  scopeApply) {
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
Controller.prototype.continueWithoutSaving = function() {
  if (!this.confirmDeferred_) {
    throw new Error('Missing confirmDeferred_');
  }
  this.cancel();
  this.confirmDeferred_.resolve();
};


/**
 */
Controller.prototype.delete = function() {
  if (!this.editableNode_) {
    throw new Error('Missing editableNode_');
  }
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  const msg = this.gettextCatalog_.getString(
    'Do you really want to delete the selected feature?');
  // Confirm deletion first
  if (confirm(msg)) {
    this.pending = true;

    // (1) Launch request
    this.gmfEditFeature_.deleteFeature(
      this.editableNode_.id,
      this.feature
    ).then(
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
Controller.prototype.submit = function() {
  // Use timeout to prevent the digest already in progress
  // due to clicking on the modal button to throw an error.
  this.timeout_(() => {
    this.element_.find('input[type="submit"]').click();
  }, 0);
};

/**
 * Called after an insert, update or delete request.
 * @param {angular.IHttpResponse<ArrayBuffer|Document|Node|Object|string>} resp Ajax response.
 * @private
 */
Controller.prototype.handleEditFeature_ = function(resp) {
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
 * @param {Array<import('ngeo/format/Attribute.js').Attribute>} attributes Attributes.
 * @private
 */
Controller.prototype.setAttributes_ = function(attributes) {
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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleFeatureAdd_ = function(evt) {
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
 * @param {boolean} active Whether to activate this directive or not.
 * @private
 */
Controller.prototype.toggle_ = function(active) {
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
    this.mapListenerKeys_.push(
      listen(this.map, 'click', this.handleMapClick_, this),
      listen(mapDiv, 'contextmenu', this.handleMapContextMenu_, this),
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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMapClick_ = function(evt) {
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
        layerFilter: undefined
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
      const extent = olExtent.buffer(
        [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
        buffer
      );

      // (3) Launch query to fetch features
      this.gmfEditFeature_.getFeaturesInExtent(
        [this.editableNode_.id],
        extent
      ).then(this.handleGetFeatures_.bind(this));

      // (4) Clear any previously selected feature
      this.cancel();

      // (5) Pending
      this.pending = true;
    });
  }
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
        layerFilter: undefined
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
      const vertexInfo = this.ngeoFeatureHelper_.getVertexInfoAtCoordinate(
        feature, coordinate, resolutions);
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
 * @param {Array<olFeature<import("ol/geom/Geometry.js").default>>} features Features.
 * @private
 */
Controller.prototype.handleGetFeatures_ = function(features) {
  this.pending = false;

  this.timeout_(() => {
    if (!this.features) {
      throw new Error('Missing features');
    }
    if (features.length) {
      const feature = features[0];
      this.feature = feature;
      this.features.push(feature);
    }
  }, 0);
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
 * Unregister interactions, i.e. set them inactive and remove them from the map
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
 * @param {?olFeature<import("ol/geom/Geometry.js").default>} newFeature The new feature.
 * @param {?olFeature<import("ol/geom/Geometry.js").default>} oldFeature The old feature.
 * @private
 */
Controller.prototype.handleFeatureChange_ = function(newFeature, oldFeature) {

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
      listen(geom, 'change', this.handleFeatureGeometryChange_, this),
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


/**
 * @private
 */
Controller.prototype.handleFeaturePropertyChange_ = function() {
  this.dirty = true;
};


/**
 * @private
 */
Controller.prototype.handleFeatureGeometryChange_ = function() {
  this.dirty = true;
  this.scope_.$apply();
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMenuActionClick_ = function(evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent.js').MenuEvent} */(evt).detail.action;

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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleMenuVertexActionClick_ = function(evt) {
  const action = /** @type {import('ngeo/filter/ruleComponent.js').MenuEvent} */(evt).detail.action;

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
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleTranslateEnd_ = function(evt) {
  if (!this.translate_) {
    throw new Error('Missing translate');
  }
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Event.
 * @private
 */
Controller.prototype.handleRotateEnd_ = function(evt) {
  if (!this.rotate_) {
    throw new Error('Missing rotate');
  }
  this.rotate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @private
 */
Controller.prototype.handleDestroy_ = function() {
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


module.controller('GmfEditfeatureController', Controller);


export default module;
