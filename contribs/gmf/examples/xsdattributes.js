goog.provide('gmfapp.xsdattributes');

goog.require('gmf.Themes');
goog.require('gmf.XSDAttributes');
/** @suppress {extraRequire} */
goog.require('ngeo.attributesDirective');
goog.require('ol.Feature');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


gmfapp.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmf.XSDAttributes} gmfXSDAttributes The gmf XSDAttributes service.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function($timeout, gmfThemes, gmfXSDAttributes) {

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
   * @type {Array.<gmfThemes.GmfLayer>}
   * @export
   */
  this.layers = [];

  // TMP - The list of layer names to use. We'll keep this until we can use
  //       those that are editable.
  const layerNames = ['line', 'point', 'polygon'];

  gmfThemes.loadThemes();

  gmfThemes.getThemesObject().then((themes) => {
    if (!themes) {
      return;
    }
    // Get an array with all nodes entities existing in "themes".
    const flatNodes = [];
    themes.forEach((theme) => {
      theme.children.forEach((group) => {
        this.getDistinctFlatNodes_(group, flatNodes);
      });
    });
    flatNodes.forEach((node) => {
      // Get an array of all layers
      if (node.children === undefined && layerNames.indexOf(node.name) !== -1) {
        this.layers.push(node);
      }
    });

  });
};


/**
 * @param {gmfThemes.GmfLayer|undefined} value A layer or undefined to get layers.
 * @return {Array.<gmfThemes.GmfLayer>} All layers in all themes.
 * @export
 */
gmfapp.MainController.prototype.getSetLayers = function(value) {
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
gmfapp.MainController.prototype.setAttributes_ = function(attributes) {

  // (1) Reset first
  this.feature = null;
  this.attributes = null;

  // (2) Then set
  this.timeout_(() => {
    this.feature = new ol.Feature();
    this.attributes = attributes;
  }, 0);
};


/**
 * @return {string} Type of geometry.
 * @export
 */
gmfapp.MainController.prototype.getGeomType = function() {
  let type = 'N/A';
  if (this.attributes) {
    const geomAttr = ngeo.format.XSDAttribute.getGeometryAttribute(
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
 * @param {gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer} node A theme, group or layer node.
 * @param {Array.<gmfThemes.GmfTheme|gmfThemes.GmfGroup|gmfThemes.GmfLayer>} nodes An Array of nodes.
 * @export
 */
gmfapp.MainController.prototype.getDistinctFlatNodes_ = function(node, nodes) {
  let i;
  const children = node.children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      this.getDistinctFlatNodes_(children[i], nodes);
    }
  }
  let alreadyAdded = false;
  nodes.some((n) => {
    if (n.id === node.id) {
      return alreadyAdded = true;
    }
  });
  if (!alreadyAdded) {
    nodes.push(node);
  }
};


gmfapp.module.controller('MainController', gmfapp.MainController);
