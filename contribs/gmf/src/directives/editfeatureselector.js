goog.provide('gmf.EditfeatureselectorController');
goog.provide('gmf.editfeatureselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');
/** @suppress {extraRequire} */
goog.require('gmf.editfeatureDirective');
goog.require('ngeo.EventHelper');
goog.require('ngeo.LayerHelper');


/**
 * Directive that uses the GMF Theme service to collect the editable layers
 * and create a drop-down list out of them. When the user selects one of the
 * layer from the list, a `gmf-editfeature` directive is created and shown,
 * which allows the user to edit that layer.
 *
 * Example:
 *
 *     <gmf-editfeatureselector
 *         gmf-editfeatureselector-active="ctrl.editFeatureSelectorActive"
 *         gmf-editfeatureselector-map="::ctrl.map"
 *         gmf-editfeatureselector-tolerance="::ctrl.tolerance"
 *         gmf-editfeatureselector-vector="::ctrl.vectorLayer">
 *     </gmf-editfeatureselector>
 *
 * @htmlAttribute {boolean} gmf-editfeatureselector-active Whether the
 *     directive is active or not.
 * @htmlAttribute {ol.Map} gmf-editfeatureselector-map The map.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-tolerance The
 *     buffer in pixels to use when making queries to get the features.
 * @htmlAttribute {ol.layer.Vector} gmf-editfeatureselector-vector The vector
 *     layer where the selected or created features are drawn.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfEditfeatureselector
 */
gmf.editfeatureselectorDirective = function() {
  return {
    controller: 'GmfEditfeatureselectorController',
    scope: {
      'active': '=gmfEditfeatureselectorActive',
      'map': '<gmfEditfeatureselectorMap',
      'tolerance': '<?gmfEditfeatureselectorTolerance',
      'vectorLayer': '<gmfEditfeatureselectorVector'
    },
    bindToController: true,
    controllerAs: 'efsCtrl',
    templateUrl: gmf.baseTemplateUrl + '/editfeatureselector.html'
  };
};

gmf.module.directive(
  'gmfEditfeatureselector', gmf.editfeatureselectorDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
gmf.EditfeatureselectorController = function($scope, gmfThemes,
    ngeoEventHelper, ngeoLayerHelper, $timeout) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   * @export
   */
  this.active = this.active === true;

  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    this.handleActiveChange_.bind(this)
  );

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {number|undefined}
   * @export
   */
  this.tolerance;

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.eventHelper_ = ngeoEventHelper;

  /**
   * Flag shared with the `gmf-editfeature` directive used to determine if it
   * has unsaved changes or not.
   * @type {boolean}
   * @export
   */
  this.dirty = false;

  /**
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = ngeoLayerHelper.getGroupFromMap(this.map,
      gmf.DATALAYERGROUP_NAME);

  /**
   * List of editable layers (leaf nodes).
   * @type {Array.<GmfThemesLeaf>}
   * @export
   */
  this.editableNodes = [];

  /**
   * List of editable layers (leaf nodes) that are available for edition, i.e.
   * that have a layer in the map.
   * @type {Array.<GmfThemesLeaf>}
   * @export
   */
  this.availableEditableNodes = [];

  /**
   * Hash of editable WMS layers (OL objects), classified by node id.
   * @type {Object.<string|number, ol.layer.Image|ol.layer.Tile>}
   * @private_
   */
  this.editableWMSLayers_ = {};

  /**
   * The currently selected layer (leaf node)
   * @type {?GmfThemesLeaf}
   * @export
   */
  this.selectedEditableNode = null;

  $scope.$watch(
    function() {
      return this.selectedEditableNode;
    }.bind(this),
    function(newValue, oldValue) {
      if (newValue) {
        this.selectedEditableWMSLayer = newValue ?
          this.editableWMSLayers_[newValue.id] : null;
      } else {
        this.selectedEditableWMSLayer = null;
        this.state = gmf.EditfeatureController.State.IDLE;
      }
      this.dirty = false;
      this.state = gmf.EditfeatureController.State.IDLE;
    }.bind(this)
  );

  /**
   * The currently selected OpenLayers layer object.
   * @type {?ol.layer.Image|ol.layer.Tile}
   * @export
   */
  this.selectedEditableWMSLayer = null;

  /**
   * The state of this directive shared with the `gmf-editfeature` directive.
   * This property allows the proper management of the "stop editing" button.
   * When clicked, the according state is set and the `gmf-editfeature`
   * directive checks if it has unsaved changes and allow this directive to
   * continue the action that was made or not.
   * @type {string}
   * @export
   */
  this.state = gmf.EditfeatureController.State.IDLE;

  $scope.$watch(
    function() {
      return this.state;
    }.bind(this),
    function(newValue, oldValue) {
      if (newValue === gmf.EditfeatureController.State.STOP_EDITING_EXECUTE ||
          newValue === gmf.EditfeatureController.State.DEACTIVATE_EXECUTE) {
        this.selectedEditableNode = null;
      }
      if (newValue === gmf.EditfeatureController.State.DEACTIVATE_EXECUTE) {
        this.active = false;
      }
    }.bind(this)
  );

  this.themesChangeListenerKey = ol.events.listen(this.gmfThemes_,
      gmf.ThemesEventType.CHANGE, this.setNodesFromThemes_, this);

  this.registerLayer_(this.dataLayerGroup_);

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


/**
 * Called when the 'stop editing' button is clicked. Set the 'state'
 * variable to 'pending' allow the editfeature directive to check if it can
 * stop or if it requires confirmation due to unsaved modifications.
 * @export
 */
gmf.EditfeatureselectorController.prototype.stopEditing = function() {
  this.state = gmf.EditfeatureController.State.STOP_EDITING_PENDING;
};


/**
 * @param {GmfThemesTheme|GmfThemesGroup|GmfThemesLeaf} node A theme, group or
 *     layer node.
 * @param {Array.<GmfThemesTheme|GmfThemesGroup|GmfThemesLeaf>} nodes An Array
 *     of nodes.
 * @private
 */
gmf.EditfeatureselectorController.prototype.getDistinctFlatNodes_ = function(
  node, nodes
) {
  var i;
  var children = node.children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      this.getDistinctFlatNodes_(children[i], nodes);
    }
  }
  var alreadyAdded = false;
  nodes.some(function(n) {
    if (n.id === node.id) {
      return alreadyAdded = true;
    }
  });
  if (!alreadyAdded) {
    nodes.push(node);
  }
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly.
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleActiveChange_ = function(active) {
  if (!active) {
    if (!this.dirty) {
      this.selectedEditableNode = null;
    } else {
      // There are unsaved modifications. Prevent the deactivation and
      // set the state accordingly for the `gmf-editfeature` directive
      // to manage the unsaved modifications.
      // The changes are made inside a $timeout to be taken into account
      // in the next digest cycle.
      this.$timeout_(function() {
        this.active = true;
        this.stopEditing();
      }.bind(this));
    }
  }
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.EditfeatureselectorController.prototype.registerLayer_ = function(layer) {

  var uid = goog.getUid(this) + '-' + goog.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Listen to added/removed layers to this group
    this.eventHelper_.addListenerKey(
      uid,
      ol.events.listen(
        layer.getLayers(),
        ol.Collection.EventType.ADD,
        this.handleLayersAdd_,
        this
      )
    );
    this.eventHelper_.addListenerKey(
      uid,
      ol.events.listen(
        layer.getLayers(),
        ol.Collection.EventType.REMOVE,
        this.handleLayersRemove_,
        this
      )
    );

    // (2) Register existing layers in the group
    layer.getLayers().forEach(function(layer) {
      this.registerLayer_(layer);
    }, this);

  } else {
    var ids = layer.get('editableIds');
    if (ids &&
        (layer instanceof ol.layer.Image || layer instanceof ol.layer.Tile)
    ) {
      for (var i = 0, ii = ids.length; i < ii; i++) {
        this.editableWMSLayers_[ids[i]] = layer;
        for (var j = 0, jj = this.editableNodes.length; j < jj; j++) {
          if (this.editableNodes[j].id == ids[i]) {
            this.availableEditableNodes.push(this.editableNodes[j]);
            break;
          }
        }
      }
    }
  }
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.EditfeatureselectorController.prototype.unregisterLayer_ = function(layer) {

  var uid = goog.getUid(this) + '-' + goog.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Clear event listeners
    this.eventHelper_.clearListenerKey(uid);

    // (2) Unregister existing layers in the group
    layer.getLayers().forEach(this.unregisterLayer_, this);

  } else {
    var ids = layer.get('editableIds');
    if (ids) {
      for (var i = 0, ii = ids.length; i < ii; i++) {
        delete this.editableWMSLayers_[ids[i]];
        var removedEditableNode;
        for (var j = 0, jj = this.availableEditableNodes.length; j < jj; j++) {
          if (this.availableEditableNodes[j].id == ids[i]) {
            removedEditableNode = this.availableEditableNodes.splice(j, 1)[0];
            break;
          }
        }
        if (removedEditableNode &&
            removedEditableNode === this.selectedEditableNode
        ) {
          this.selectedEditableNode = null;
        }
      }
    }
  }
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleLayersAdd_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.registerLayer_(layer);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleLayersRemove_ = function(
  evt
) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.unregisterLayer_(layer);
};


/**
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleDestroy_ = function() {
  this.unregisterLayer_(this.dataLayerGroup_);
  ol.events.unlistenByKey(this.themesChangeListenerKey);
};


/**
 * Sets all nodes (editable, available, etc.) from the existing themes.
 * Called every time the themes are changed.
 * @private
 */
gmf.EditfeatureselectorController.prototype.setNodesFromThemes_ = function() {

  // (1) Clear any existing layers in case the themes are reloaded
  this.editableNodes.length = 0;
  this.availableEditableNodes.length = 0;

  // (2) Get layers
  this.gmfThemes_.getThemesObject().then(function(themes) {
    // Get an array with all nodes entities existing in "themes".
    var flatNodes = [];
    themes.forEach(function(theme) {
      theme.children.forEach(function(group) {
        this.getDistinctFlatNodes_(group, flatNodes);
      }, this);
    }, this);
    flatNodes.forEach(function(node) {
      // Get an array of all layers
      if (node.children === undefined && node.editable) {
        this.editableNodes.push(node);
        if (this.editableWMSLayers_[node.id]) {
          this.availableEditableNodes.push(node);
        }
      }
    }, this);
  }.bind(this));
};


gmf.module.controller(
  'GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
