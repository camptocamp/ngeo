/**
 * @module gmfapp.xsdattributes
 */
const exports = {};

import './xsdattributes.css';
import gmfThemeThemes from 'gmf/theme/Themes.js';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';
import olFeature from 'ol/Feature.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfEditingXSDAttributes.module.name,
  gmfThemeThemes.module.name,
  ngeoEditingAttributesComponent.name,
]);


exports.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background');

exports.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @param {gmf.editing.XSDAttributes} gmfXSDAttributes The gmf XSDAttributes service.
 * @constructor
 * @ngInject
 */
exports.MainController = function($timeout, gmfThemes, gmfXSDAttributes) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {gmf.editing.XSDAttributes}
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
exports.MainController.prototype.getSetLayers = function(value) {
  if (value !== undefined && value !== null) {
    this.xsdAttributes_.getAttributes(value.id).then(attr => this.setAttributes_(attr));
  }
  return this.layers;
};


/**
 * @param {Array.<ngeox.Attribute>} attributes Attributes.
 * @export
 */
exports.MainController.prototype.setAttributes_ = function(attributes) {

  // (1) Reset first
  this.feature = null;
  this.attributes = null;

  // (2) Then set
  this.timeout_(() => {
    this.feature = new olFeature();
    this.attributes = attributes;
  }, 0);
};


/**
 * @return {string} Type of geometry.
 * @export
 */
exports.MainController.prototype.getGeomType = function() {
  let type = 'N/A';
  if (this.attributes) {
    const geomAttr = ngeoFormatXSDAttribute.getGeometryAttribute(
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
exports.MainController.prototype.getDistinctFlatNodes_ = function(node, nodes) {
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


exports.module.controller('MainController', exports.MainController);


export default exports;
