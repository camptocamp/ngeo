/**
 */

import angular from 'angular';
import appURL from './url.js';
import './xsdattributes.css';
import gmfThemeThemes from 'gmf/theme/Themes.js';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';
import olFeature from 'ol/Feature.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';


/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  gmfEditingXSDAttributes.name,
  gmfThemeThemes.name,
  ngeoEditingAttributesComponent.name,
]);


module.value('gmfTreeUrl', appURL.GMF_THEMES);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("gmf/theme/Themes.js").default} gmfThemes The gmf themes service.
 * @param {import("gmf/editing/XSDAttributes.js").default} gmfXSDAttributes The gmf XSDAttributes service.
 * @constructor
 * @ngInject
 */
function MainController($timeout, gmfThemes, gmfXSDAttributes) {

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {import("gmf/editing/XSDAttributes.js").default}
   * @private
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {?Array.<Attribute>}
   * @export
   */
  this.attributes = null;

  /**
   * @type {?import("ol/Feature.js").default}
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
}


/**
 * @param {gmfThemes.GmfLayer|undefined} value A layer or undefined to get layers.
 * @return {Array.<gmfThemes.GmfLayer>} All layers in all themes.
 * @export
 */
MainController.prototype.getSetLayers = function(value) {
  if (value !== undefined && value !== null) {
    this.xsdAttributes_.getAttributes(value.id).then(attr => this.setAttributes_(attr));
  }
  return this.layers;
};


/**
 * @param {Array.<Attribute>} attributes Attributes.
 * @export
 */
MainController.prototype.setAttributes_ = function(attributes) {

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
MainController.prototype.getGeomType = function() {
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
MainController.prototype.getDistinctFlatNodes_ = function(node, nodes) {
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


module.controller('MainController', MainController);


export default module;
