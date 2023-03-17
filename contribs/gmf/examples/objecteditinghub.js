import angular from 'angular';
import appURL from './url.js';
import './objecteditinghub.css';

import gmfEditingXSDAttributes from 'gmf/editing/XSDAttributes.js';
import gmfObjecteditingManager, {ObjecteditingParam} from 'gmf/objectediting/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import olFormatWFS from 'ol/format/WFS.js';
import {getGeometryAttribute} from 'ngeo/format/XSDAttribute.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfEditingXSDAttributes.name,
  gmfObjecteditingManager.name,
  gmfThemeThemes.name,
]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {angular.IQService} $q Angular $q service.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService} gmfXSDAttributes
 *    The gmf XSDAttributes service.
 * @constructor
 * @ngInject
 */
function MainController($http, $q, $scope, gmfThemes, gmfXSDAttributes) {
  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {angular.IQService}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import("gmf/editing/XSDAttributes.js").EditingXSDAttributeService}
   * @private
   */
  this.gmfXSDAttributes_ = gmfXSDAttributes;

  /**
   * @type {Array<Object<string, string>>} List of example and application urls that contain
   *     ObjectEditing tools.
   */
  this.urls = [
    {
      name: 'oeedit app. (hosted)',
      url: 'apps/oeedit/',
    },
    {
      name: 'oeedit app. (dev)',
      url: '../apps/oeedit/',
    },
    {
      name: 'example',
      url: 'objectediting.html',
    },
  ];

  /**
   * @type {string} OE viewer application base url when developping.
   * @private
   */
  this.viewerUrlDev_ = '../apps/oeview/';

  /**
   * @type {string} OE viewer application base url when hosted.
   * @private
   */
  this.viewerUrlHosted_ = 'apps/oeview/';

  /**
   * @type {Object<string, string>}
   */
  this.selectedUrl = this.urls[0];

  /**
   * @type {import('gmf/themes.js').GmfOgcServers} ogcServers OGC servers.
   * @private
   */
  this.gmfServers_;

  /**
   * @type {import('gmf/themes.js').GmfOgcServer} ogcServer OGC server to use.
   * @private
   */
  this.gmfServer_;

  /**
   * @type {Array<import('gmf/themes.js').GmfLayerWMS>}
   */
  this.gmfLayerNodes = [];

  /**
   * @type {?import('gmf/themes.js').GmfLayerWMS}
   */
  this.selectedGmfLayerNode = null;

  /**
   * @type {Object<number, Array.<import("ol/Feature.js").default>>}
   */
  this.featuresCache_ = {};

  /**
   * @type {Array<import("ol/Feature.js").default>}
   */
  this.features = null;

  /**
   * @type {?import("ol/Feature.js").default}
   */
  this.selectedFeature = null;

  /**
   * @type {Object<number, string>}
   * @private
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
    }
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
      /** @type {import('gmf/themes.js').GmfTheme} */
      let theme;
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
      console.assert(groupNode.ogcServer);
      const gmfServer = this.gmfServers_[groupNode.ogcServer];
      if (gmfServer && gmfServer.wfsSupport === true && gmfServer.urlWfs) {
        this.gmfServer_ = gmfServer;
      } else {
        return;
      }

      /** @type {Array<import('gmf/themes.js').GmfLayerWMS>} */
      const gmfLayerNodes = [];
      for (i = 0, ii = groupNode.children.length; i < ii; i++) {
        if (groupNode.children[i].metadata.identifierAttributeField) {
          gmfLayerNodes.push(/** @type import('gmf/themes.js').GmfLayerWMS} */ (groupNode.children[i]));
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
  const geomType = this.selectedGeomType;
  const feature = this.selectedFeature;
  const layer = this.selectedGmfLayerNode.id;
  const property = this.selectedGmfLayerNode.metadata.identifierAttributeField;
  console.assert(property !== undefined);
  const id = feature.get(property);

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
 */
MainController.prototype.runViewerDev = function () {
  this.runViewer_(this.viewerUrlDev_);
};

/**
 */
MainController.prototype.runViewerHosted = function () {
  this.runViewer_(this.viewerUrlHosted_);
};

/**
 * @param {string} baseUrl Base url of the viewer.
 * @private
 */
MainController.prototype.runViewer_ = function (baseUrl) {
  const node = this.selectedGmfLayerNode;
  const nodeId = node.id;
  const nodeName = node.name;
  const nodeIdAttrFieldName = node.metadata.identifierAttributeField;
  console.assert(nodeIdAttrFieldName !== undefined);
  const ids = [];

  const features = this.featuresCache_[nodeId];
  for (let i = 0, ii = features.length; i < ii; i++) {
    ids.push(features[i].get(nodeIdAttrFieldName));
  }

  const params = {};
  params['wfs_layer'] = nodeName;
  params[`wfs_${nodeIdAttrFieldName}`] = ids.join(',');

  const url = MainController.appendParams(baseUrl, params);
  window.open(url);
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @return {angular.IPromise} The promise attached to the deferred object.
 * @private
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
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @private
 */
MainController.prototype.issueGetFeatures_ = function (gmfLayerNode) {
  const id = gmfLayerNode.id;

  const url = MainController.appendParams(this.gmfServer_.urlWfs, {
    'SERVICE': 'WFS',
    'REQUEST': 'GetFeature',
    'VERSION': '1.1.0',
    'TYPENAME': gmfLayerNode.layers,
  });

  this.http_.get(url).then((response) => {
    const features = new olFormatWFS().readFeatures(response.data);
    this.featuresCache_[id] = features;
    this.getFeaturesDeferred_.resolve();
  });
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @private
 */
MainController.prototype.handleGetFeatures_ = function (gmfLayerNode) {
  const features = /** @type Array.<import("ol/Feature.js").default> */ (
    this.getFeaturesFromCache_(gmfLayerNode)
  );
  this.features = features;
  this.selectedFeature = this.features[0];
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @return {?Array.<import("ol/Feature.js").default>} List of features
 * @private
 */
MainController.prototype.getFeaturesFromCache_ = function (gmfLayerNode) {
  const id = gmfLayerNode.id;
  const features = this.featuresCache_[id] || null;
  return features;
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @return {angular.IPromise} The promise attached to the deferred object.
 * @private
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
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @private
 */
MainController.prototype.issueGetAttributesRequest_ = function (gmfLayerNode) {
  this.gmfXSDAttributes_.getAttributes(gmfLayerNode.id).then(
    function (gmfLayerNode, attributes) {
      // Get geom type from attributes and set
      const geomAttr = getGeometryAttribute(attributes);
      if (geomAttr && geomAttr.geomType) {
        this.geomTypeCache_[gmfLayerNode.id] = geomAttr.geomType;
        this.getGeometryTypeDeferred_.resolve();
      }
    }.bind(this, gmfLayerNode)
  );
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @private
 */
MainController.prototype.handleGetGeometryType_ = function (gmfLayerNode) {
  const geomType = this.getGeometryTypeFromCache_(gmfLayerNode);
  this.selectedGeomType = geomType;
};

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayerNode Layer node.
 * @return {string|undefined} The type of geometry.
 * @private
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
 * @param {!Object} params An object where keys are URI-encoded parameter keys,
 *     and the values are arbitrary types or arrays.
 * @return {string} The new URI.
 */
MainController.appendParams = function (uri, params) {
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
  uri = uri.indexOf('?') === -1 ? `${uri}?` : `${uri}&`;
  return uri + qs;
};

module.controller('MainController', MainController);

export default module;
