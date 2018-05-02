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
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
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
/******/ 					var r = fn();
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
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
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
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
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
/******/ 		var installedChunks = {
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
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/objecteditinghub.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0ZWRpdGluZ2h1Yi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM1lBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvb2JqZWN0ZWRpdGluZ2h1Yi5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL29iamVjdGVkaXRpbmdodWIuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9vYmplY3RlZGl0aW5naHViLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZFZGl0aW5nWFNEQXR0cmlidXRlcyBmcm9tICdnbWYvZWRpdGluZy9YU0RBdHRyaWJ1dGVzJztcbmltcG9ydCBnbWZPYmplY3RlZGl0aW5nTWFuYWdlciwge09iamVjdGVkaXRpbmdQYXJhbX0gZnJvbSAnZ21mL29iamVjdGVkaXRpbmcvTWFuYWdlcic7XG5pbXBvcnQgZ21mVGhlbWVUaGVtZXMgZnJvbSAnZ21mL3RoZW1lL1RoZW1lcyc7XG5pbXBvcnQgb2xGb3JtYXRXRlMgZnJvbSAnb2wvZm9ybWF0L1dGUyc7XG5pbXBvcnQge2dldEdlb21ldHJ5QXR0cmlidXRlfSBmcm9tICduZ2VvL2Zvcm1hdC9YU0RBdHRyaWJ1dGUnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mRWRpdGluZ1hTREF0dHJpYnV0ZXMubmFtZSxcbiAgZ21mT2JqZWN0ZWRpdGluZ01hbmFnZXIubmFtZSxcbiAgZ21mVGhlbWVUaGVtZXMubmFtZSxcbl0pO1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckcScsICckc2NvcGUnLCAnZ21mVGhlbWVzJywgJ2dtZlhTREF0dHJpYnV0ZXMnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfSAkaHR0cCBBbmd1bGFyICRodHRwIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVFTZXJ2aWNlfSAkcSBBbmd1bGFyICRxIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWUvVGhlbWVzJykuVGhlbWVzU2VydmljZX0gZ21mVGhlbWVzIFRoZSBnbWYgdGhlbWVzIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL2VkaXRpbmcvWFNEQXR0cmlidXRlcycpLkVkaXRpbmdYU0RBdHRyaWJ1dGVTZXJ2aWNlfSBnbWZYU0RBdHRyaWJ1dGVzXG4gKiAgICBUaGUgZ21mIFhTREF0dHJpYnV0ZXMgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkaHR0cCwgJHEsICRzY29wZSwgZ21mVGhlbWVzLCBnbWZYU0RBdHRyaWJ1dGVzKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLmh0dHBfID0gJGh0dHA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklRU2VydmljZX1cbiAgICovXG4gIHRoaXMucV8gPSAkcTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lL1RoZW1lcycpLlRoZW1lc1NlcnZpY2V9XG4gICAqL1xuICB0aGlzLmdtZlRoZW1lc18gPSBnbWZUaGVtZXM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9lZGl0aW5nL1hTREF0dHJpYnV0ZXMnKS5FZGl0aW5nWFNEQXR0cmlidXRlU2VydmljZX1cbiAgICovXG4gIHRoaXMuZ21mWFNEQXR0cmlidXRlc18gPSBnbWZYU0RBdHRyaWJ1dGVzO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPltdfSBMaXN0IG9mIGV4YW1wbGUgYW5kIGFwcGxpY2F0aW9uIHVybHMgdGhhdCBjb250YWluXG4gICAqICAgICBPYmplY3RFZGl0aW5nIHRvb2xzLlxuICAgKi9cbiAgdGhpcy51cmxzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdvZWVkaXQgYXBwLiAoaG9zdGVkKScsXG4gICAgICB1cmw6ICdhcHBzL29lZWRpdC5odG1sJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdvZWVkaXQgYXBwLiAoZGV2KScsXG4gICAgICB1cmw6ICcuLi9hcHBzL29lZWRpdC5odG1sJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdleGFtcGxlJyxcbiAgICAgIHVybDogJ29iamVjdGVkaXRpbmcuaHRtbCcsXG4gICAgfSxcbiAgXTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkVXJsID0gdGhpcy51cmxzWzBdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZk9nY1NlcnZlcnN9IG9nY1NlcnZlcnMgT0dDIHNlcnZlcnMuXG4gICAqL1xuICB0aGlzLmdtZlNlcnZlcnNfID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZPZ2NTZXJ2ZXJ9IG9nY1NlcnZlciBPR0Mgc2VydmVyIHRvIHVzZS5cbiAgICovXG4gIHRoaXMuZ21mU2VydmVyXyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU1tdfVxuICAgKi9cbiAgdGhpcy5nbWZMYXllck5vZGVzID0gW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxudW1iZXIsIGltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXT59XG4gICAqL1xuICB0aGlzLmZlYXR1cmVzQ2FjaGVfID0ge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W119XG4gICAqL1xuICB0aGlzLmZlYXR1cmVzID0gW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxudW1iZXIsIHN0cmluZz59XG4gICAqL1xuICB0aGlzLmdlb21UeXBlQ2FjaGVfID0ge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd8dW5kZWZpbmVkfVxuICAgKi9cbiAgdGhpcy5zZWxlY3RlZEdlb21UeXBlID0gdW5kZWZpbmVkO1xuICAkc2NvcGUuJHdhdGNoKFxuICAgICgpID0+IHRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUsXG4gICAgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG4gICAgICBpZiAobmV3VmFsKSB7XG4gICAgICAgIHRoaXMuZ2V0RmVhdHVyZXNfKG5ld1ZhbCkudGhlbih0aGlzLmhhbmRsZUdldEZlYXR1cmVzXy5iaW5kKHRoaXMsIG5ld1ZhbCkpO1xuICAgICAgICB0aGlzLmdldEdlb21ldHJ5VHlwZV8obmV3VmFsKS50aGVuKHRoaXMuaGFuZGxlR2V0R2VvbWV0cnlUeXBlXy5iaW5kKHRoaXMsIG5ld1ZhbCkpO1xuICAgICAgfVxuICAgIH0sXG4gICk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLnRoZW1lTmFtZSA9ICdPYmplY3RFZGl0aW5nJztcbiAgdGhpcy5nbWZUaGVtZXNfLmxvYWRUaGVtZXMoKTtcbiAgdGhpcy5nbWZUaGVtZXNfLmdldE9nY1NlcnZlcnNPYmplY3QoKS50aGVuKChvZ2NTZXJ2ZXJzKSA9PiB7XG4gICAgLy8gKDEpIFNldCBPR0Mgc2VydmVyc1xuICAgIHRoaXMuZ21mU2VydmVyc18gPSBvZ2NTZXJ2ZXJzO1xuICAgIHRoaXMuZ21mVGhlbWVzXy5nZXRUaGVtZXNPYmplY3QoKS50aGVuKCh0aGVtZXMpID0+IHtcbiAgICAgIGlmICghdGhlbWVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBpLCBpaTtcblxuICAgICAgLy8gKDIpIEZpbmQgT0UgdGhlbWVcbiAgICAgIC8qKiBAdHlwZSB7P2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZlRoZW1lfSAqL1xuICAgICAgbGV0IHRoZW1lID0gbnVsbDtcbiAgICAgIGZvciAoaSA9IDAsIGlpID0gdGhlbWVzLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgICAgaWYgKHRoZW1lc1tpXS5uYW1lID09PSB0aGlzLnRoZW1lTmFtZSkge1xuICAgICAgICAgIHRoZW1lID0gdGhlbWVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoZW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gKDMpIEdldCBmaXJzdCBncm91cCBub2RlXG4gICAgICBjb25zdCBncm91cE5vZGUgPSB0aGVtZS5jaGlsZHJlblswXTtcblxuICAgICAgLy8gKDQpIFNldCBPR0Mgc2VydmVyLCB3aGljaCBtdXN0IHN1cHBvcnQgV0ZTIGZvciB0aGlzIGV4YW1wbGUgdG8gd29ya1xuICAgICAgaWYgKCFncm91cE5vZGUub2djU2VydmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBncm91cE5vZGUub2djU2VydmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZ21mU2VydmVyc18pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdtZlNlcnZlcnMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGdtZlNlcnZlciA9IHRoaXMuZ21mU2VydmVyc19bZ3JvdXBOb2RlLm9nY1NlcnZlcl07XG4gICAgICBpZiAoZ21mU2VydmVyICYmIGdtZlNlcnZlci53ZnNTdXBwb3J0ID09PSB0cnVlICYmIGdtZlNlcnZlci51cmxXZnMpIHtcbiAgICAgICAgdGhpcy5nbWZTZXJ2ZXJfID0gZ21mU2VydmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TW119ICovXG4gICAgICBjb25zdCBnbWZMYXllck5vZGVzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBpaSA9IGdyb3VwTm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIGlmIChncm91cE5vZGUuY2hpbGRyZW5baV0ubWV0YWRhdGEuaWRlbnRpZmllckF0dHJpYnV0ZUZpZWxkKSB7XG4gICAgICAgICAgZ21mTGF5ZXJOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gKi8gLyoqIEB0eXBlIHthbnl9ICovIGdyb3VwTm9kZS5jaGlsZHJlbltpXSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vICg1KSBTZXQgbGF5ZXIgbm9kZXNcbiAgICAgIHRoaXMuZ21mTGF5ZXJOb2RlcyA9IGdtZkxheWVyTm9kZXM7XG5cbiAgICAgIC8vICg2KSBTZWxlY3QgJ3BvbHlnb24nIGZvciB0aGUgcHVycG9zZSBvZiBzaW1wbGlmeWluZyB0aGUgZGVtb1xuICAgICAgdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSA9IHRoaXMuZ21mTGF5ZXJOb2Rlc1sxXTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUucnVuRWRpdG9yID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2VsZWN0ZWRHbWZMYXllck5vZGUnKTtcbiAgfVxuICBpZiAoIXRoaXMuc2VsZWN0ZWRGZWF0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNlbGVjdGVkRmVhdHVyZScpO1xuICB9XG4gIGNvbnN0IGdlb21UeXBlID0gdGhpcy5zZWxlY3RlZEdlb21UeXBlO1xuICBjb25zdCBmZWF0dXJlID0gdGhpcy5zZWxlY3RlZEZlYXR1cmU7XG4gIGNvbnN0IGxheWVyID0gdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgcHJvcGVydHkgPSB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlLm1ldGFkYXRhLmlkZW50aWZpZXJBdHRyaWJ1dGVGaWVsZDtcbiAgaWYgKCFwcm9wZXJ0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwcm9wZXJ0eScpO1xuICB9XG4gIGNvbnN0IGlkID0gZmVhdHVyZS5nZXQocHJvcGVydHkpO1xuXG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59ICovXG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLkdFT01fVFlQRV0gPSBnZW9tVHlwZTtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5JRF0gPSBpZDtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5MQVlFUl0gPSBsYXllcjtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5USEVNRV0gPSB0aGlzLnRoZW1lTmFtZTtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5QUk9QRVJUWV0gPSBwcm9wZXJ0eTtcbiAgY29uc3QgdXJsID0gTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zKHRoaXMuc2VsZWN0ZWRVcmwudXJsLCBwYXJhbXMpO1xuICB3aW5kb3cub3Blbih1cmwpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqIEByZXR1cm5zIHthbmd1bGFyLklQcm9taXNlPHZvaWQ+fSBUaGUgcHJvbWlzZSBhdHRhY2hlZCB0byB0aGUgZGVmZXJyZWQgb2JqZWN0LlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RmVhdHVyZXNfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfID0gdGhpcy5xXy5kZWZlcigpO1xuICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIGlmIChmZWF0dXJlcykge1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNzdWVHZXRGZWF0dXJlc18oZ21mTGF5ZXJOb2RlKTtcbiAgfVxuICByZXR1cm4gdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXy5wcm9taXNlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmlzc3VlR2V0RmVhdHVyZXNfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBpZiAoIXRoaXMuZ21mU2VydmVyXykge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnbWZTZXJ2ZXInKTtcbiAgfVxuICBjb25zdCBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgdXJsID0gTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zKHRoaXMuZ21mU2VydmVyXy51cmxXZnMsIHtcbiAgICAnU0VSVklDRSc6ICdXRlMnLFxuICAgICdSRVFVRVNUJzogJ0dldEZlYXR1cmUnLFxuICAgICdWRVJTSU9OJzogJzEuMS4wJyxcbiAgICAnVFlQRU5BTUUnOiBnbWZMYXllck5vZGUubGF5ZXJzLFxuICB9KTtcbiAgdGhpcy5odHRwXy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmICghdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdldEZlYXR1cmVzRGVmZXJyZWQnKTtcbiAgICB9XG4gICAgbGV0IGZlYXR1cmVzID0gW107XG4gICAgdHJ5IHtcbiAgICAgIGZlYXR1cmVzID1cbiAgICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W119ICovXG4gICAgICAgIG5ldyBvbEZvcm1hdFdGUygpLnJlYWRGZWF0dXJlcyhyZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBwYXJzaW5nIGVycm9ycyAoZm9yIGV4YW1wbGUgV0ZTIGV4Y2VwdGlvbiBwYXlsb2FkcyksIGtlZXAgdGhlXG4gICAgICAvLyBleGFtcGxlIGZ1bmN0aW9uYWwgd2l0aCBhbiBlbXB0eSBmZWF0dXJlIGxpc3QuXG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZXNDYWNoZV9baWRdID0gZmVhdHVyZXM7XG4gICAgdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXy5yZXNvbHZlKCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldEZlYXR1cmVzXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5mZWF0dXJlcyA9XG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W119ICovXG4gICAgdGhpcy5nZXRGZWF0dXJlc0Zyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcbiAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmZlYXR1cmVzWzBdO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqIEByZXR1cm5zIHs/aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSBMaXN0IG9mIGZlYXR1cmVzXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRGZWF0dXJlc0Zyb21DYWNoZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIGNvbnN0IGlkID0gZ21mTGF5ZXJOb2RlLmlkO1xuICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuZmVhdHVyZXNDYWNoZV9baWRdIHx8IG51bGw7XG4gIHJldHVybiBmZWF0dXJlcztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JUHJvbWlzZTx2b2lkPn0gVGhlIHByb21pc2UgYXR0YWNoZWQgdG8gdGhlIGRlZmVycmVkIG9iamVjdC5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfID0gdGhpcy5xXy5kZWZlcigpO1xuICBjb25zdCBnZW9tVHlwZSA9IHRoaXMuZ2V0R2VvbWV0cnlUeXBlRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuICBpZiAoZ2VvbVR5cGUpIHtcbiAgICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXy5yZXNvbHZlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc3N1ZUdldEF0dHJpYnV0ZXNSZXF1ZXN0XyhnbWZMYXllck5vZGUpO1xuICB9XG4gIHJldHVybiB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXy5wcm9taXNlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmlzc3VlR2V0QXR0cmlidXRlc1JlcXVlc3RfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdtZlhTREF0dHJpYnV0ZXNfLmdldEF0dHJpYnV0ZXMoZ21mTGF5ZXJOb2RlLmlkKS50aGVuKFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtNYWluQ29udHJvbGxlcn1cbiAgICAgKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgVGhlIGxheWVyIG5vZGVcbiAgICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9mb3JtYXQvQXR0cmlidXRlJykuQXR0cmlidXRlW119IGF0dHJpYnV0ZXMgVGhlIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZXRHZW9tZXRyeVR5cGVEZWZlcnJlZCcpO1xuICAgICAgfVxuICAgICAgLy8gR2V0IGdlb20gdHlwZSBmcm9tIGF0dHJpYnV0ZXMgYW5kIHNldFxuICAgICAgY29uc3QgZ2VvbUF0dHIgPSBnZXRHZW9tZXRyeUF0dHJpYnV0ZShhdHRyaWJ1dGVzKTtcbiAgICAgIGlmIChnZW9tQXR0ciAmJiBnZW9tQXR0ci5nZW9tVHlwZSkge1xuICAgICAgICB0aGlzLmdlb21UeXBlQ2FjaGVfW2dtZkxheWVyTm9kZS5pZF0gPSBnZW9tQXR0ci5nZW9tVHlwZTtcbiAgICAgICAgdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzLCBnbWZMYXllck5vZGUpLFxuICApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldEdlb21ldHJ5VHlwZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIGNvbnN0IGdlb21UeXBlID0gdGhpcy5nZXRHZW9tZXRyeVR5cGVGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIHRoaXMuc2VsZWN0ZWRHZW9tVHlwZSA9IGdlb21UeXBlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSBnbWZMYXllck5vZGUgTGF5ZXIgbm9kZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBUaGUgdHlwZSBvZiBnZW9tZXRyeS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIGNvbnN0IGlkID0gZ21mTGF5ZXJOb2RlLmlkO1xuICBjb25zdCBnZW9tVHlwZSA9IHRoaXMuZ2VvbVR5cGVDYWNoZV9baWRdO1xuICByZXR1cm4gZ2VvbVR5cGU7XG59O1xuXG4vKipcbiAqIEFwcGVuZHMgcXVlcnkgcGFyYW1ldGVycyB0byBhIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpIFRoZSBvcmlnaW5hbCBVUkksIHdoaWNoIG1heSBhbHJlYWR5IGhhdmUgcXVlcnkgZGF0YS5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gcGFyYW1zIEFuIG9iamVjdCB3aGVyZSBrZXlzIGFyZSBVUkktZW5jb2RlZCBwYXJhbWV0ZXIga2V5cyxcbiAqICAgICBhbmQgdGhlIHZhbHVlcyBhcmUgYXJiaXRyYXJ5IHR5cGVzIG9yIGFycmF5cy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuZXcgVVJJLlxuICovXG5NYWluQ29udHJvbGxlci5hcHBlbmRQYXJhbXMgPSBmdW5jdGlvbiAodXJpLCBwYXJhbXMpIHtcbiAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgY29uc3Qga2V5UGFyYW1zID0gW107XG4gIC8vIFNraXAgYW55IG51bGwgb3IgdW5kZWZpbmVkIHBhcmFtZXRlciB2YWx1ZXNcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgaWYgKHBhcmFtc1trXSAhPT0gbnVsbCAmJiBwYXJhbXNba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAga2V5UGFyYW1zLnB1c2goYCR7a309JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tdKX1gKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBxcyA9IGtleVBhcmFtcy5qb2luKCcmJyk7XG4gIC8vIHJlbW92ZSBhbnkgdHJhaWxpbmcgPyBvciAmXG4gIHVyaSA9IHVyaS5yZXBsYWNlKC9bPyZdJC8sICcnKTtcbiAgLy8gYXBwZW5kID8gb3IgJiBkZXBlbmRpbmcgb24gd2hldGhlciB1cmkgaGFzIGV4aXN0aW5nIHBhcmFtZXRlcnNcbiAgdXJpID0gdXJpLmluY2x1ZGVzKCc/JykgPyBgJHt1cml9JmAgOiBgJHt1cml9P2A7XG4gIHJldHVybiB1cmkgKyBxcztcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIHNldCAubmFtZSBmb3IgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cyBwZXIgRVMgc3BlY1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kbiA9ICh4KSA9PiB7XG5cdChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIFwibmFtZVwiKSB8fCB7fSkud3JpdGFibGUgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHgsIFwibmFtZVwiLCB7IHZhbHVlOiBcImRlZmF1bHRcIiwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJvYmplY3RlZGl0aW5naHViXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jb250cmlicy9nbWYvZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL29iamVjdGVkaXRpbmdodWIuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==