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
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
gmf.EditfeatureselectorController = function($scope, gmfThemes,
    ngeoEventHelper, ngeoLayerHelper) {

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
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = ngeoLayerHelper.getGroupFromMap(this.map,
      gmf.DATALAYERGROUP_NAME);

  /**
   * List of editable layers (theme nodes)
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.layers = [];

  /**
   * List of editable layers (theme nodes) that are available for edition, i.e.
   * that have a layer in the map.
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.availableLayers = [];

  /**
   * Hash of editable WMS layers (OL objects), classified by node id.
   * @type {Object.<string|number, ol.layer.Image|ol.layer.Tile>}
   * @private_
   */
  this.wmsLayers_ = {};

  /**
   * The currently selected layer
   * @type {?GmfThemesNode}
   * @export
   */
  this.selectedLayer = null;

  /**
   * The currently selected OpenLayers layer object.
   * @type {?ol.layer.Image|ol.layer.Tile}
   * @export
   */
  this.selectedWMSLayer = null;

  this.themesChangeListenerKey = ol.events.listen(this.gmfThemes_,
      gmf.ThemesEventType.CHANGE, this.setLayersFromThemes_, this);

  this.registerLayer_(this.dataLayerGroup_);

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

  $scope.$watch(
    function() {
      return this.selectedLayer;
    }.bind(this),
    function(newValue, oldValue) {
      this.selectedWMSLayer = newValue ? this.wmsLayers_[newValue.id] : null;
    }.bind(this)
  );

};


/**
 * @param {GmfThemesNode} node A theme, group or layer node.
 * @param {Array.<GmfThemesNode>} nodes An Array of nodes.
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
gmf.EditfeatureselectorController.prototype.handleActiveChange_ = function(
  active
) {
  if (!active) {
    this.selectedWMSLayer = null;
    this.selectedLayer = null;
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
        this.wmsLayers_[ids[i]] = layer;
        for (var j = 0, jj = this.layers.length; j < jj; j++) {
          if (this.layers[j].id == ids[i]) {
            this.availableLayers.push(this.layers[j]);
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
        delete this.wmsLayers_[ids[i]];
        var removedLayer;
        for (var j = 0, jj = this.availableLayers.length; j < jj; j++) {
          if (this.availableLayers[j].id == ids[i]) {
            removedLayer = this.availableLayers.splice(j, 1)[0];
            break;
          }
        }
        if (removedLayer && removedLayer === this.selectedLayer) {
          this.selectedLayer = null;
        }
      }
    }
  }
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.EditfeatureselectorController.prototype.handleLayersAdd_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.registerLayer_(layer);
};


/**
 * @param {ol.CollectionEvent} evt Event.
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
 * Sets the layers and available layers from the existing themes.
 * Called every time the themes are changed.
 * @private
 */
gmf.EditfeatureselectorController.prototype.setLayersFromThemes_ = function() {

  // (1) Clear any existing layers in case the themes are reloaded
  this.layers.length = 0;
  this.availableLayers.length = 0;

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
        this.layers.push(node);
        if (this.wmsLayers_[node.id]) {
          this.availableLayers.push(node);
        }
      }
    }, this);
  }.bind(this));
};


gmf.module.controller(
  'GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
