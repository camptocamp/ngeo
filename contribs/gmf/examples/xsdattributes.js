import angular from 'angular';
import appURL from './url.js';
import './xsdattributes.css';
import gmfThemeThemes from 'gmf/theme/Themes.js';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute.js';
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
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService} gmfXSDAttributes
 *    The gmf XSDAttributes service.
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
   * @type {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService}
   * @private
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {?Array.<import('ngeo/format/Attribute.js').Attribute>}
   */
  this.attributes = null;

  /**
   * @type {?import("ol/Feature.js").default}
   */
  this.feature = null;

  /**
   * @type {Array.<import('gmf/themes.js').GmfLayer>}
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
 * @param {import('gmf/themes.js').GmfLayer|undefined} value A layer or undefined to get layers.
 * @return {Array.<import('gmf/themes.js').GmfLayer>} All layers in all themes.
 */
MainController.prototype.getSetLayers = function (value) {
  if (value !== undefined && value !== null) {
    this.xsdAttributes_.getAttributes(value.id).then((attr) => this.setAttributes_(attr));
  }
  return this.layers;
};

/**
 * @param {Array.<import('ngeo/format/Attribute.js').Attribute>} attributes Attributes.
 */
MainController.prototype.setAttributes_ = function (attributes) {
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
 */
MainController.prototype.getGeomType = function () {
  let type = 'N/A';
  if (this.attributes) {
    const geomAttr = getGeometryAttribute(this.attributes);
    if (geomAttr && geomAttr.geomType) {
      type = geomAttr.geomType;
    }
  }
  return type;
};

/**
 * Just for this example
 * @param {import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node
 *    A theme, group or layer node.
 * @param {Array.<import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} nodes
 *    An Array of nodes.
 */
MainController.prototype.getDistinctFlatNodes_ = function (node, nodes) {
  let i;
  const children = /** @type {import('gmf/themes.js').GmfGroup} */ (node).children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      this.getDistinctFlatNodes_(children[i], nodes);
    }
  }
  let alreadyAdded = false;
  nodes.some((n) => {
    if (n.id === node.id) {
      return (alreadyAdded = true);
    }
  });
  if (!alreadyAdded) {
    nodes.push(node);
  }
};

module.controller('MainController', MainController);

export default module;
