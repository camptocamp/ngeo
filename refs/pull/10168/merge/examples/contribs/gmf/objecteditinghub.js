/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/objecteditinghub.js"
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objecteditinghub_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objecteditinghub.scss */ "./contribs/gmf/examples/objecteditinghub.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_editing_XSDAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/editing/XSDAttributes */ "./src/editing/XSDAttributes.js");
/* harmony import */ var gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/objectediting/Manager */ "./src/objectediting/Manager.js");
/* harmony import */ var gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/theme/Themes */ "./src/theme/Themes.js");
/* harmony import */ var ol_format_WFS__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/format/WFS */ "./node_modules/ol/format/WFS.js");
/* harmony import */ var ngeo_format_XSDAttribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/format/XSDAttribute */ "./src/format/XSDAttribute.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2026 Camptocamp SA
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











/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('gmfapp', [
  'gettext',
  gmf_editing_XSDAttributes__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_4__["default"].name,
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
  params[gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__.ObjecteditingParam.GEOM_TYPE] = geomType;
  params[gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__.ObjecteditingParam.ID] = id;
  params[gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__.ObjecteditingParam.LAYER] = layer;
  params[gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__.ObjecteditingParam.THEME] = this.themeName;
  params[gmf_objectediting_Manager__WEBPACK_IMPORTED_MODULE_3__.ObjecteditingParam.PROPERTY] = property;
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
    let features = [];
    try {
      features =
        /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */
        new ol_format_WFS__WEBPACK_IMPORTED_MODULE_5__["default"]().readFeatures(response.data);
    } catch {
      // Ignore parsing errors (for example WFS exception payloads), keep the
      // example functional with an empty feature list.
    }
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
      const geomAttr = (0,ngeo_format_XSDAttribute__WEBPACK_IMPORTED_MODULE_6__.getGeometryAttribute)(attributes);
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
(0,_options__WEBPACK_IMPORTED_MODULE_7__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./contribs/gmf/examples/objecteditinghub.scss"
/*!*****************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.scss ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"objecteditinghub": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/objecteditinghub.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0ZWRpdGluZ2h1Yi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM1lBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL29iamVjdGVkaXRpbmdodWIuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9vYmplY3RlZGl0aW5naHViLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vb2JqZWN0ZWRpdGluZ2h1Yi5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mRWRpdGluZ1hTREF0dHJpYnV0ZXMgZnJvbSAnZ21mL2VkaXRpbmcvWFNEQXR0cmlidXRlcyc7XG5pbXBvcnQgZ21mT2JqZWN0ZWRpdGluZ01hbmFnZXIsIHtPYmplY3RlZGl0aW5nUGFyYW19IGZyb20gJ2dtZi9vYmplY3RlZGl0aW5nL01hbmFnZXInO1xuaW1wb3J0IGdtZlRoZW1lVGhlbWVzIGZyb20gJ2dtZi90aGVtZS9UaGVtZXMnO1xuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMnO1xuaW1wb3J0IHtnZXRHZW9tZXRyeUF0dHJpYnV0ZX0gZnJvbSAnbmdlby9mb3JtYXQvWFNEQXR0cmlidXRlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZkVkaXRpbmdYU0RBdHRyaWJ1dGVzLm5hbWUsXG4gIGdtZk9iamVjdGVkaXRpbmdNYW5hZ2VyLm5hbWUsXG4gIGdtZlRoZW1lVGhlbWVzLm5hbWUsXG5dKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCAnJHNjb3BlJywgJ2dtZlRoZW1lcycsICdnbWZYU0RBdHRyaWJ1dGVzJ107XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwU2VydmljZX0gJGh0dHAgQW5ndWxhciAkaHR0cCBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklRU2VydmljZX0gJHEgQW5ndWxhciAkcSBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lL1RoZW1lcycpLlRoZW1lc1NlcnZpY2V9IGdtZlRoZW1lcyBUaGUgZ21mIHRoZW1lcyBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9lZGl0aW5nL1hTREF0dHJpYnV0ZXMnKS5FZGl0aW5nWFNEQXR0cmlidXRlU2VydmljZX0gZ21mWFNEQXR0cmlidXRlc1xuICogICAgVGhlIGdtZiBYU0RBdHRyaWJ1dGVzIHNlcnZpY2UuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJGh0dHAsICRxLCAkc2NvcGUsIGdtZlRoZW1lcywgZ21mWFNEQXR0cmlidXRlcykge1xuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5odHRwXyA9ICRodHRwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JUVNlcnZpY2V9XG4gICAqL1xuICB0aGlzLnFfID0gJHE7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZS9UaGVtZXMnKS5UaGVtZXNTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5nbWZUaGVtZXNfID0gZ21mVGhlbWVzO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvZWRpdGluZy9YU0RBdHRyaWJ1dGVzJykuRWRpdGluZ1hTREF0dHJpYnV0ZVNlcnZpY2V9XG4gICAqL1xuICB0aGlzLmdtZlhTREF0dHJpYnV0ZXNfID0gZ21mWFNEQXR0cmlidXRlcztcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz5bXX0gTGlzdCBvZiBleGFtcGxlIGFuZCBhcHBsaWNhdGlvbiB1cmxzIHRoYXQgY29udGFpblxuICAgKiAgICAgT2JqZWN0RWRpdGluZyB0b29scy5cbiAgICovXG4gIHRoaXMudXJscyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnb2VlZGl0IGFwcC4gKGhvc3RlZCknLFxuICAgICAgdXJsOiAnYXBwcy9vZWVkaXQuaHRtbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnb2VlZGl0IGFwcC4gKGRldiknLFxuICAgICAgdXJsOiAnLi4vYXBwcy9vZWVkaXQuaHRtbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZXhhbXBsZScsXG4gICAgICB1cmw6ICdvYmplY3RlZGl0aW5nLmh0bWwnLFxuICAgIH0sXG4gIF07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxuICAgKi9cbiAgdGhpcy5zZWxlY3RlZFVybCA9IHRoaXMudXJsc1swXTtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZPZ2NTZXJ2ZXJzfSBvZ2NTZXJ2ZXJzIE9HQyBzZXJ2ZXJzLlxuICAgKi9cbiAgdGhpcy5nbWZTZXJ2ZXJzXyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mT2djU2VydmVyfSBvZ2NTZXJ2ZXIgT0dDIHNlcnZlciB0byB1c2UuXG4gICAqL1xuICB0aGlzLmdtZlNlcnZlcl8gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVNbXX1cbiAgICovXG4gIHRoaXMuZ21mTGF5ZXJOb2RlcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfVxuICAgKi9cbiAgdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8bnVtYmVyLCBpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W10+fVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlc0NhY2hlXyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8bnVtYmVyLCBzdHJpbmc+fVxuICAgKi9cbiAgdGhpcy5nZW9tVHlwZUNhY2hlXyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRHZW9tVHlwZSA9IHVuZGVmaW5lZDtcbiAgJHNjb3BlLiR3YXRjaChcbiAgICAoKSA9PiB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlLFxuICAgIChuZXdWYWwsIG9sZFZhbCkgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBudWxsO1xuICAgICAgaWYgKG5ld1ZhbCkge1xuICAgICAgICB0aGlzLmdldEZlYXR1cmVzXyhuZXdWYWwpLnRoZW4odGhpcy5oYW5kbGVHZXRGZWF0dXJlc18uYmluZCh0aGlzLCBuZXdWYWwpKTtcbiAgICAgICAgdGhpcy5nZXRHZW9tZXRyeVR5cGVfKG5ld1ZhbCkudGhlbih0aGlzLmhhbmRsZUdldEdlb21ldHJ5VHlwZV8uYmluZCh0aGlzLCBuZXdWYWwpKTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy50aGVtZU5hbWUgPSAnT2JqZWN0RWRpdGluZyc7XG4gIHRoaXMuZ21mVGhlbWVzXy5sb2FkVGhlbWVzKCk7XG4gIHRoaXMuZ21mVGhlbWVzXy5nZXRPZ2NTZXJ2ZXJzT2JqZWN0KCkudGhlbigob2djU2VydmVycykgPT4ge1xuICAgIC8vICgxKSBTZXQgT0dDIHNlcnZlcnNcbiAgICB0aGlzLmdtZlNlcnZlcnNfID0gb2djU2VydmVycztcbiAgICB0aGlzLmdtZlRoZW1lc18uZ2V0VGhlbWVzT2JqZWN0KCkudGhlbigodGhlbWVzKSA9PiB7XG4gICAgICBpZiAoIXRoZW1lcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgaSwgaWk7XG5cbiAgICAgIC8vICgyKSBGaW5kIE9FIHRoZW1lXG4gICAgICAvKiogQHR5cGUgez9pbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZUaGVtZX0gKi9cbiAgICAgIGxldCB0aGVtZSA9IG51bGw7XG4gICAgICBmb3IgKGkgPSAwLCBpaSA9IHRoZW1lcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGVtZXNbaV0ubmFtZSA9PT0gdGhpcy50aGVtZU5hbWUpIHtcbiAgICAgICAgICB0aGVtZSA9IHRoZW1lc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCF0aGVtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vICgzKSBHZXQgZmlyc3QgZ3JvdXAgbm9kZVxuICAgICAgY29uc3QgZ3JvdXBOb2RlID0gdGhlbWUuY2hpbGRyZW5bMF07XG5cbiAgICAgIC8vICg0KSBTZXQgT0dDIHNlcnZlciwgd2hpY2ggbXVzdCBzdXBwb3J0IFdGUyBmb3IgdGhpcyBleGFtcGxlIHRvIHdvcmtcbiAgICAgIGlmICghZ3JvdXBOb2RlLm9nY1NlcnZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ3JvdXBOb2RlLm9nY1NlcnZlcicpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmdtZlNlcnZlcnNfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnbWZTZXJ2ZXJzJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBnbWZTZXJ2ZXIgPSB0aGlzLmdtZlNlcnZlcnNfW2dyb3VwTm9kZS5vZ2NTZXJ2ZXJdO1xuICAgICAgaWYgKGdtZlNlcnZlciAmJiBnbWZTZXJ2ZXIud2ZzU3VwcG9ydCA9PT0gdHJ1ZSAmJiBnbWZTZXJ2ZXIudXJsV2ZzKSB7XG4gICAgICAgIHRoaXMuZ21mU2VydmVyXyA9IGdtZlNlcnZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU1tdfSAqL1xuICAgICAgY29uc3QgZ21mTGF5ZXJOb2RlcyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgaWkgPSBncm91cE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBpZiAoZ3JvdXBOb2RlLmNoaWxkcmVuW2ldLm1ldGFkYXRhLmlkZW50aWZpZXJBdHRyaWJ1dGVGaWVsZCkge1xuICAgICAgICAgIGdtZkxheWVyTm9kZXMucHVzaChcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9ICovIC8qKiBAdHlwZSB7YW55fSAqLyBncm91cE5vZGUuY2hpbGRyZW5baV0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAoNSkgU2V0IGxheWVyIG5vZGVzXG4gICAgICB0aGlzLmdtZkxheWVyTm9kZXMgPSBnbWZMYXllck5vZGVzO1xuXG4gICAgICAvLyAoNikgU2VsZWN0ICdwb2x5Z29uJyBmb3IgdGhlIHB1cnBvc2Ugb2Ygc2ltcGxpZnlpbmcgdGhlIGRlbW9cbiAgICAgIHRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUgPSB0aGlzLmdtZkxheWVyTm9kZXNbMV07XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLnJ1bkVkaXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNlbGVjdGVkR21mTGF5ZXJOb2RlJyk7XG4gIH1cbiAgaWYgKCF0aGlzLnNlbGVjdGVkRmVhdHVyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzZWxlY3RlZEZlYXR1cmUnKTtcbiAgfVxuICBjb25zdCBnZW9tVHlwZSA9IHRoaXMuc2VsZWN0ZWRHZW9tVHlwZTtcbiAgY29uc3QgZmVhdHVyZSA9IHRoaXMuc2VsZWN0ZWRGZWF0dXJlO1xuICBjb25zdCBsYXllciA9IHRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUuaWQ7XG4gIGNvbnN0IHByb3BlcnR5ID0gdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZS5tZXRhZGF0YS5pZGVudGlmaWVyQXR0cmlidXRlRmllbGQ7XG4gIGlmICghcHJvcGVydHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcHJvcGVydHknKTtcbiAgfVxuICBjb25zdCBpZCA9IGZlYXR1cmUuZ2V0KHByb3BlcnR5KTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5HRU9NX1RZUEVdID0gZ2VvbVR5cGU7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uSURdID0gaWQ7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uTEFZRVJdID0gbGF5ZXI7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uVEhFTUVdID0gdGhpcy50aGVtZU5hbWU7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uUFJPUEVSVFldID0gcHJvcGVydHk7XG4gIGNvbnN0IHVybCA9IE1haW5Db250cm9sbGVyLmFwcGVuZFBhcmFtcyh0aGlzLnNlbGVjdGVkVXJsLnVybCwgcGFyYW1zKTtcbiAgd2luZG93Lm9wZW4odXJsKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JUHJvbWlzZTx2b2lkPn0gVGhlIHByb21pc2UgYXR0YWNoZWQgdG8gdGhlIGRlZmVycmVkIG9iamVjdC5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEZlYXR1cmVzXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXyA9IHRoaXMucV8uZGVmZXIoKTtcbiAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLmdldEZlYXR1cmVzRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuICBpZiAoZmVhdHVyZXMpIHtcbiAgICB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfLnJlc29sdmUoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzc3VlR2V0RmVhdHVyZXNfKGdtZkxheWVyTm9kZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucHJvbWlzZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5pc3N1ZUdldEZlYXR1cmVzXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgaWYgKCF0aGlzLmdtZlNlcnZlcl8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ21mU2VydmVyJyk7XG4gIH1cbiAgY29uc3QgaWQgPSBnbWZMYXllck5vZGUuaWQ7XG4gIGNvbnN0IHVybCA9IE1haW5Db250cm9sbGVyLmFwcGVuZFBhcmFtcyh0aGlzLmdtZlNlcnZlcl8udXJsV2ZzLCB7XG4gICAgJ1NFUlZJQ0UnOiAnV0ZTJyxcbiAgICAnUkVRVUVTVCc6ICdHZXRGZWF0dXJlJyxcbiAgICAnVkVSU0lPTic6ICcxLjEuMCcsXG4gICAgJ1RZUEVOQU1FJzogZ21mTGF5ZXJOb2RlLmxheWVycyxcbiAgfSk7XG4gIHRoaXMuaHR0cF8uZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAoIXRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZXRGZWF0dXJlc0RlZmVycmVkJyk7XG4gICAgfVxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmZWF0dXJlcyA9XG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqL1xuICAgICAgICBuZXcgb2xGb3JtYXRXRlMoKS5yZWFkRmVhdHVyZXMocmVzcG9uc2UuZGF0YSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgcGFyc2luZyBlcnJvcnMgKGZvciBleGFtcGxlIFdGUyBleGNlcHRpb24gcGF5bG9hZHMpLCBrZWVwIHRoZVxuICAgICAgLy8gZXhhbXBsZSBmdW5jdGlvbmFsIHdpdGggYW4gZW1wdHkgZmVhdHVyZSBsaXN0LlxuICAgIH1cbiAgICB0aGlzLmZlYXR1cmVzQ2FjaGVfW2lkXSA9IGZlYXR1cmVzO1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZmVhdHVyZXMgPVxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqL1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gdGhpcy5mZWF0dXJlc1swXTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7P2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX0gTGlzdCBvZiBmZWF0dXJlc1xuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLmZlYXR1cmVzQ2FjaGVfW2lkXSB8fCBudWxsO1xuICByZXR1cm4gZmVhdHVyZXM7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9IGdtZkxheWVyTm9kZSBMYXllciBub2RlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSVByb21pc2U8dm9pZD59IFRoZSBwcm9taXNlIGF0dGFjaGVkIHRvIHRoZSBkZWZlcnJlZCBvYmplY3QuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXyA9IHRoaXMucV8uZGVmZXIoKTtcbiAgY29uc3QgZ2VvbVR5cGUgPSB0aGlzLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcbiAgaWYgKGdlb21UeXBlKSB7XG4gICAgdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNzdWVHZXRBdHRyaWJ1dGVzUmVxdWVzdF8oZ21mTGF5ZXJOb2RlKTtcbiAgfVxuICByZXR1cm4gdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucHJvbWlzZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5pc3N1ZUdldEF0dHJpYnV0ZXNSZXF1ZXN0XyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5nbWZYU0RBdHRyaWJ1dGVzXy5nZXRBdHRyaWJ1dGVzKGdtZkxheWVyTm9kZS5pZCkudGhlbihcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7TWFpbkNvbnRyb2xsZXJ9XG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIFRoZSBsYXllciBub2RlXG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vZm9ybWF0L0F0dHJpYnV0ZScpLkF0dHJpYnV0ZVtdfSBhdHRyaWJ1dGVzIFRoZSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gKGdtZkxheWVyTm9kZSwgYXR0cmlidXRlcykge1xuICAgICAgaWYgKCF0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWQnKTtcbiAgICAgIH1cbiAgICAgIC8vIEdldCBnZW9tIHR5cGUgZnJvbSBhdHRyaWJ1dGVzIGFuZCBzZXRcbiAgICAgIGNvbnN0IGdlb21BdHRyID0gZ2V0R2VvbWV0cnlBdHRyaWJ1dGUoYXR0cmlidXRlcyk7XG4gICAgICBpZiAoZ2VvbUF0dHIgJiYgZ2VvbUF0dHIuZ2VvbVR5cGUpIHtcbiAgICAgICAgdGhpcy5nZW9tVHlwZUNhY2hlX1tnbWZMYXllck5vZGUuaWRdID0gZ2VvbUF0dHIuZ2VvbVR5cGU7XG4gICAgICAgIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcywgZ21mTGF5ZXJOb2RlKSxcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBnZW9tVHlwZSA9IHRoaXMuZ2V0R2VvbWV0cnlUeXBlRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuICB0aGlzLnNlbGVjdGVkR2VvbVR5cGUgPSBnZW9tVHlwZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gVGhlIHR5cGUgb2YgZ2VvbWV0cnkuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGVGcm9tQ2FjaGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgZ2VvbVR5cGUgPSB0aGlzLmdlb21UeXBlQ2FjaGVfW2lkXTtcbiAgcmV0dXJuIGdlb21UeXBlO1xufTtcblxuLyoqXG4gKiBBcHBlbmRzIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaSBUaGUgb3JpZ2luYWwgVVJJLCB3aGljaCBtYXkgYWxyZWFkeSBoYXZlIHF1ZXJ5IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IHBhcmFtcyBBbiBvYmplY3Qgd2hlcmUga2V5cyBhcmUgVVJJLWVuY29kZWQgcGFyYW1ldGVyIGtleXMsXG4gKiAgICAgYW5kIHRoZSB2YWx1ZXMgYXJlIGFyYml0cmFyeSB0eXBlcyBvciBhcnJheXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmV3IFVSSS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zID0gZnVuY3Rpb24gKHVyaSwgcGFyYW1zKSB7XG4gIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gIGNvbnN0IGtleVBhcmFtcyA9IFtdO1xuICAvLyBTa2lwIGFueSBudWxsIG9yIHVuZGVmaW5lZCBwYXJhbWV0ZXIgdmFsdWVzXG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoaykgPT4ge1xuICAgIGlmIChwYXJhbXNba10gIT09IG51bGwgJiYgcGFyYW1zW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleVBhcmFtcy5wdXNoKGAke2t9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trXSl9YCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgcXMgPSBrZXlQYXJhbXMuam9pbignJicpO1xuICAvLyByZW1vdmUgYW55IHRyYWlsaW5nID8gb3IgJlxuICB1cmkgPSB1cmkucmVwbGFjZSgvWz8mXSQvLCAnJyk7XG4gIC8vIGFwcGVuZCA/IG9yICYgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdXJpIGhhcyBleGlzdGluZyBwYXJhbWV0ZXJzXG4gIHVyaSA9IHVyaS5pbmNsdWRlcygnPycpID8gYCR7dXJpfSZgIDogYCR7dXJpfT9gO1xuICByZXR1cm4gdXJpICsgcXM7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJjb25zdCBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHRsZXQgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0bGV0IGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdGNvbnN0IHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGlmKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0d2hpbGUoaSA8IGRlZmluaXRpb24ubGVuZ3RoKSB7XG5cdFx0XHR2YXIga2V5ID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0dmFyIGJpbmRpbmcgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0aWYoYmluZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IGRlZmluaXRpb25baSsrXSB9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogYmluZGluZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGJpbmRpbmcgPT09IDApIHsgaSsrOyB9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbmNvbnN0IGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJvYmplY3RlZGl0aW5naHViXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbmNvbnN0IHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdGxldCBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbmNvbnN0IGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbmxldCBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9vYmplY3RlZGl0aW5naHViLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=