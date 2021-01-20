// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import './xsdattributes.css';
import gmfThemeThemes from 'gmf/theme/Themes.js';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute.js';
import olFeature from 'ol/Feature.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';
import options from './options.js';

/** @type {angular.IModule} **/
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfEditingXSDAttributes.name,
  gmfThemeThemes.name,
  ngeoEditingAttributesComponent.name,
]);

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
   */
  this.timeout_ = $timeout;

  /**
   * @type {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService}
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {?Array<import('ngeo/format/Attribute.js').Attribute>}
   */
  this.attributes = null;

  /**
   * @type {?olFeature<import("ol/geom/Geometry.js").default>}
   */
  this.feature = null;

  /**
   * @type {Array<import('gmf/themes.js').GmfLayer>}
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
    /** @type {Array<import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} */
    const flatNodes = [];
    themes.forEach((theme) => {
      theme.children.forEach((group) => {
        this.getDistinctFlatNodes_(group, flatNodes);
      });
    });
    flatNodes.forEach((node) => {
      const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */ (node);
      // Get an array of all layers
      if (groupNode.children === undefined && layerNames.includes(node.name)) {
        this.layers.push(/** @type {import('gmf/themes.js').GmfLayer} */ (node));
      }
    });
  });
}

/**
 * @param {import('gmf/themes.js').GmfLayer|undefined} value A layer or undefined to get layers.
 * @return {Array<import('gmf/themes.js').GmfLayer>} All layers in all themes.
 */
MainController.prototype.getSetLayers = function (value) {
  if (value !== undefined && value !== null) {
    this.xsdAttributes_.getAttributes(value.id).then((attr) => this.setAttributes_(attr));
  }
  return this.layers;
};

/**
 * @param {Array<import('ngeo/format/Attribute.js').Attribute>} attributes Attributes.
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
 * @param {Array<import('gmf/themes.js').GmfTheme|import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} nodes
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
      alreadyAdded = true;
      return true;
    }
    return false;
  });
  if (!alreadyAdded) {
    nodes.push(node);
  }
};

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
