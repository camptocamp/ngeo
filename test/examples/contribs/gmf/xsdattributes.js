


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


app.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/layers/');


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.XSDAttributes} gmfXSDAttributes The gmf XSDAttributes service.
 * @constructor
 */
app.MainController = function($timeout, gmfThemes, gmfXSDAttributes) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {gmf.XSDAttributes}
   * @private
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {?Array.<ngeox.Attribute>}
   * @export
   */
  this.attributes = null;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.feature = null;

  /**
   * @type {Array.<GmfThemesNode>}
   * @export
   */
  this.layers = [];

  // TMP - The list of layer names to use. We'll keep this until we can use
  //       those that are editable.
  var layerNames = ['line', 'point', 'polygon'];

  gmfThemes.loadThemes();

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
app.MainController.prototype.getSetLayers = function(value) {
  if (value !== undefined) {
    this.xsdAttributes_.getAttributes(value.id).then(
      this.setAttributes_.bind(this));
  }
  return this.layers;
};


/**
 * @param {Array.<ngeox.Attribute>} attributes Attributes.
 * @export
 */
app.MainController.prototype.setAttributes_ = function(attributes) {

  // (1) Reset first
  this.feature = null;
  this.attributes = null;

  // (2) Then set
  this.timeout_(function() {
    this.feature = new ol.Feature();
    this.attributes = attributes;
  }.bind(this), 0);
};


/**
 * @return {string} Type of geometry.
 * @export
 */
app.MainController.prototype.getGeomType = function() {
  var type = 'N/A';
  if (this.attributes) {
    var geomAttr = ngeo.format.XSDAttribute.getGeometryAttribute(
      this.attributes
    );
    if (geomAttr && geomAttr.geomType) {
      type = geomAttr.geomType;
    }
  }
  return type;
};


/**
 * Just for this example
 * @param {GmfThemesNode} node A theme, group or layer node.
 * @param {Array.<GmfThemesNode>} nodes An Array of nodes.
 * @export
 */
app.MainController.prototype.getDistinctFlatNodes_ = function(node, nodes) {
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


app.module.controller('MainController', app.MainController);
