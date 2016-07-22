goog.provide('gmf.EditfeatureselectorController');
goog.provide('gmf.editfeatureselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.editfeatureDirective');


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
 *         gmf-editfeatureselector-pixelbuffer="::ctrl.pixelBuffer"
 *         gmf-editfeatureselector-vector="::ctrl.vectorLayer">
 *     </gmf-editfeatureselector>
 *
 * @htmlAttribute {boolean} gmf-editfeatureselector-active Whether the
 *     directive is active or not.
 * @htmlAttribute {ol.Map} gmf-editfeatureselector-map The map.
 * @htmlAttribute {number|undefined} gmf-editfeatureselector-pixelbuffer The
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
      'pixelBuffer': '<?gmfEditfeatureselectorPixelbuffer',
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
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfEditfeatureselectorController
 */
gmf.EditfeatureselectorController = function($scope, gmfThemes) {

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
  this.pixelBuffer;

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer;

  /**
   * List of editable layers (theme nodes)
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.layers = [];

  /**
   * The currently selected layer
   * @type {?GmfThemesNode}
   * @export
   */
  this.selectedLayer = null;

  // TMP - The list of layer names to use. We'll keep this until we can use
  //       those that are editable.
  var layerNames = ['line', 'point', 'polygon'];

  gmfThemes.getThemesObject().then(function(themes) {
    if (!themes) {
      return;
    }
    // Get an array with all nodes entities existing in "themes".
    var flatNodes = [];
    themes.forEach(function(theme) {
      theme.children.forEach(function(group) {
        this.getDistinctFlatNodes_(group, flatNodes);
      }.bind(this));
    }.bind(this));
    flatNodes.forEach(function(node) {
      // Get an array of all layers
      if (node.children === undefined && layerNames.indexOf(node.name) !== -1) {
        this.layers.push(node);
      }
    }.bind(this));

  }.bind(this));

};


/**
 * @param {GmfThemesNode|undefined} value A layer or undefined to get layers.
 * @return {Array.<GmfThemesNode>} All layers in all themes.
 * @export
 */
gmf.EditfeatureselectorController.prototype.getSetLayers = function(value) {
  if (value !== undefined) {
    this.selectedLayer = value;
  }
  return this.layers;
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
    this.selectedLayer = null;
  }
};


gmf.module.controller(
  'GmfEditfeatureselectorController', gmf.EditfeatureselectorController);
