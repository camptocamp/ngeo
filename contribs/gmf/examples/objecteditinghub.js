// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
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

import './objecteditinghub.scss';

import angular from 'angular';
import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes';
import gmfObjecteditingManager, {ObjecteditingParam} from 'gmf/objectediting/Manager';
import gmfThemeThemes from 'gmf/theme/Themes';
import olFormatWFS from 'ol/format/WFS';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfEditingXSDAttributes.name,
  gmfObjecteditingManager.name,
  gmfThemeThemes.name,
]);

MainController.$inject = ['$http', '$q', '$scope', 'gmfThemes', 'gmfXSDAttributes'];

/**
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {angular.IQService} $q Angular $q service.
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/editing/XSDAttributes').EditingXSDAttributeService} gmfXSDAttributes
 *    The gmf XSDAttributes service.
 * @class
 */
function MainController($http, $q, $scope, gmfThemes, gmfXSDAttributes) {
  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @type {angular.IQService}
   */
  this.q_ = $q;

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import('gmf/editing/XSDAttributes').EditingXSDAttributeService}
   */
  this.gmfXSDAttributes_ = gmfXSDAttributes;

  /**
   * @type {Object<string, string>[]} List of example and application urls that contain
   *     ObjectEditing tools.
   */
  this.urls = [
    {
      name: 'oeedit app. (hosted)',
      url: 'apps/oeedit.html',
    },
    {
      name: 'oeedit app. (dev)',
      url: '../apps/oeedit.html',
    },
    {
      name: 'example',
      url: 'objectediting.html',
    },
  ];

  /**
   * @type {Object<string, string>}
   */
  this.selectedUrl = this.urls[0];

  /**
   * @type {?import('gmf/themes').GmfOgcServers} ogcServers OGC servers.
   */
  this.gmfServers_ = null;

  /**
   * @type {?import('gmf/themes').GmfOgcServer} ogcServer OGC server to use.
   */
  this.gmfServer_ = null;

  /**
   * @type {import('gmf/themes').GmfLayerWMS[]}
   */
  this.gmfLayerNodes = [];

  /**
   * @type {?import('gmf/themes').GmfLayerWMS}
   */
  this.selectedGmfLayerNode = null;

  /**
   * @type {Object<number, import('ol/Feature').default<import('ol/geom/Geometry').default>[]>}
   */
  this.featuresCache_ = {};

  /**
   * @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]}
   */
  this.features = [];

  /**
   * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
   */
  this.selectedFeature = null;

  /**
   * @type {Object<number, string>}
   */
  this.geomTypeCache_ = {};

  /**
   * @type {string|undefined}
   */
  this.selectedGeomType = undefined;
  $scope.$watch(
    () => this.selectedGmfLayerNode,
    (newVal, oldVal) => {
      this.selectedFeature = null;
      if (newVal) {
        this.getFeatures_(newVal).then(this.handleGetFeatures_.bind(this, newVal));
        this.getGeometryType_(newVal).then(this.handleGetGeometryType_.bind(this, newVal));
      }
    },
  );

  /**
   * @type {string}
   */
  this.themeName = 'ObjectEditing';
  this.gmfThemes_.loadThemes();
  this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
    // (1) Set OGC servers
    this.gmfServers_ = ogcServers;
    this.gmfThemes_.getThemesObject().then((themes) => {
      if (!themes) {
        return;
      }
      let i, ii;

      // (2) Find OE theme
      /** @type {?import('gmf/themes').GmfTheme} */
      let theme = null;
      for (i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].name === this.themeName) {
          theme = themes[i];
          break;
        }
      }
      if (!theme) {
        return;
      }

      // (3) Get first group node
      const groupNode = theme.children[0];

      // (4) Set OGC server, which must support WFS for this example to work
      if (!groupNode.ogcServer) {
        throw new Error('Missing groupNode.ogcServer');
      }
      if (!this.gmfServers_) {
        throw new Error('Missing gmfServers');
      }
      const gmfServer = this.gmfServers_[groupNode.ogcServer];
      if (gmfServer && gmfServer.wfsSupport === true && gmfServer.urlWfs) {
        this.gmfServer_ = gmfServer;
      } else {
        return;
      }

      /** @type {import('gmf/themes').GmfLayerWMS[]} */
      const gmfLayerNodes = [];
      for (i = 0, ii = groupNode.children.length; i < ii; i++) {
        if (groupNode.children[i].metadata.identifierAttributeField) {
          gmfLayerNodes.push(
            /** @type {import('gmf/themes').GmfLayerWMS} */ /** @type {any} */ groupNode.children[i],
          );
        }
      }

      // (5) Set layer nodes
      this.gmfLayerNodes = gmfLayerNodes;

      // (6) Select 'polygon' for the purpose of simplifying the demo
      this.selectedGmfLayerNode = this.gmfLayerNodes[1];
    });
  });
}

/**
 */
MainController.prototype.runEditor = function () {
  if (!this.selectedGmfLayerNode) {
    throw new Error('Missing selectedGmfLayerNode');
  }
  if (!this.selectedFeature) {
    throw new Error('Missing selectedFeature');
  }
  const geomType = this.selectedGeomType;
  const feature = this.selectedFeature;
  const layer = this.selectedGmfLayerNode.id;
  const property = this.selectedGmfLayerNode.metadata.identifierAttributeField;
  if (!property) {
    throw new Error('Missing property');
  }
  const id = feature.get(property);

  /** @type {Object<string, *>} */
  const params = {};
  params[ObjecteditingParam.GEOM_TYPE] = geomType;
  params[ObjecteditingParam.ID] = id;
  params[ObjecteditingParam.LAYER] = layer;
  params[ObjecteditingParam.THEME] = this.themeName;
  params[ObjecteditingParam.PROPERTY] = property;
  const url = MainController.appendParams(this.selectedUrl.url, params);
  window.open(url);
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 * @returns {angular.IPromise<void>} The promise attached to the deferred object.
 */
MainController.prototype.getFeatures_ = function (gmfLayerNode) {
  this.getFeaturesDeferred_ = this.q_.defer();
  const features = this.getFeaturesFromCache_(gmfLayerNode);
  if (features) {
    this.getFeaturesDeferred_.resolve();
  } else {
    this.issueGetFeatures_(gmfLayerNode);
  }
  return this.getFeaturesDeferred_.promise;
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 */
MainController.prototype.issueGetFeatures_ = function (gmfLayerNode) {
  if (!this.gmfServer_) {
    throw new Error('Missing gmfServer');
  }
  const id = gmfLayerNode.id;
  const url = MainController.appendParams(this.gmfServer_.urlWfs, {
    'SERVICE': 'WFS',
    'REQUEST': 'GetFeature',
    'VERSION': '1.1.0',
    'TYPENAME': gmfLayerNode.layers,
  });
  this.http_.get(url).then((response) => {
    if (!this.getFeaturesDeferred_) {
      throw new Error('Missing getFeaturesDeferred');
    }
    const features =
      /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */
      new olFormatWFS().readFeatures(response.data);
    this.featuresCache_[id] = features;
    this.getFeaturesDeferred_.resolve();
  });
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 */
MainController.prototype.handleGetFeatures_ = function (gmfLayerNode) {
  this.features =
    /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */
    this.getFeaturesFromCache_(gmfLayerNode);
  this.selectedFeature = this.features[0];
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 * @returns {?import('ol/Feature').default<import('ol/geom/Geometry').default>[]} List of features
 */
MainController.prototype.getFeaturesFromCache_ = function (gmfLayerNode) {
  const id = gmfLayerNode.id;
  const features = this.featuresCache_[id] || null;
  return features;
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 * @returns {angular.IPromise<void>} The promise attached to the deferred object.
 */
MainController.prototype.getGeometryType_ = function (gmfLayerNode) {
  this.getGeometryTypeDeferred_ = this.q_.defer();
  const geomType = this.getGeometryTypeFromCache_(gmfLayerNode);
  if (geomType) {
    this.getGeometryTypeDeferred_.resolve();
  } else {
    this.issueGetAttributesRequest_(gmfLayerNode);
  }
  return this.getGeometryTypeDeferred_.promise;
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 */
MainController.prototype.issueGetAttributesRequest_ = function (gmfLayerNode) {
  this.gmfXSDAttributes_.getAttributes(gmfLayerNode.id).then(
    /**
     * @this {MainController}
     * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode The layer node
     * @param {import('ngeo/format/Attribute').Attribute[]} attributes The attributes
     */
    function (gmfLayerNode, attributes) {
      if (!this.getGeometryTypeDeferred_) {
        throw new Error('Missing getGeometryTypeDeferred');
      }
      // Get geom type from attributes and set
      const geomAttr = getGeometryAttribute(attributes);
      if (geomAttr && geomAttr.geomType) {
        this.geomTypeCache_[gmfLayerNode.id] = geomAttr.geomType;
        this.getGeometryTypeDeferred_.resolve();
      }
    }.bind(this, gmfLayerNode),
  );
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 */
MainController.prototype.handleGetGeometryType_ = function (gmfLayerNode) {
  const geomType = this.getGeometryTypeFromCache_(gmfLayerNode);
  this.selectedGeomType = geomType;
};

/**
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayerNode Layer node.
 * @returns {string|undefined} The type of geometry.
 */
MainController.prototype.getGeometryTypeFromCache_ = function (gmfLayerNode) {
  const id = gmfLayerNode.id;
  const geomType = this.geomTypeCache_[id];
  return geomType;
};

/**
 * Appends query parameters to a URI.
 *
 * @param {string} uri The original URI, which may already have query data.
 * @param {Object<string, string>} params An object where keys are URI-encoded parameter keys,
 *     and the values are arbitrary types or arrays.
 * @returns {string} The new URI.
 */
MainController.appendParams = function (uri, params) {
  /** @type {string[]} */
  const keyParams = [];
  // Skip any null or undefined parameter values
  Object.keys(params).forEach((k) => {
    if (params[k] !== null && params[k] !== undefined) {
      keyParams.push(`${k}=${encodeURIComponent(params[k])}`);
    }
  });
  const qs = keyParams.join('&');
  // remove any trailing ? or &
  uri = uri.replace(/[?&]$/, '');
  // append ? or & depending on whether uri has existing parameters
  uri = uri.includes('?') ? `${uri}&` : `${uri}?`;
  return uri + qs;
};
myModule.controller('MainController', MainController);
options(myModule);
export default myModule;
