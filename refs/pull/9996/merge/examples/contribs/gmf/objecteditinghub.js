/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/objecteditinghub.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// Copyright (c) 2016-2024 Camptocamp SA
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
    const features =
      /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */
      new ol_format_WFS__WEBPACK_IMPORTED_MODULE_5__["default"]().readFeatures(response.data);
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


/***/ }),

/***/ "./contribs/gmf/examples/objecteditinghub.scss":
/*!*****************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0ZWRpdGluZ2h1Yi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcllBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvb2JqZWN0ZWRpdGluZ2h1Yi5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL29iamVjdGVkaXRpbmdodWIuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL29iamVjdGVkaXRpbmdodWIuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZkVkaXRpbmdYU0RBdHRyaWJ1dGVzIGZyb20gJ2dtZi9lZGl0aW5nL1hTREF0dHJpYnV0ZXMnO1xuaW1wb3J0IGdtZk9iamVjdGVkaXRpbmdNYW5hZ2VyLCB7T2JqZWN0ZWRpdGluZ1BhcmFtfSBmcm9tICdnbWYvb2JqZWN0ZWRpdGluZy9NYW5hZ2VyJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzJztcbmltcG9ydCBvbEZvcm1hdFdGUyBmcm9tICdvbC9mb3JtYXQvV0ZTJztcbmltcG9ydCB7Z2V0R2VvbWV0cnlBdHRyaWJ1dGV9IGZyb20gJ25nZW8vZm9ybWF0L1hTREF0dHJpYnV0ZSc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZmFwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBnbWZFZGl0aW5nWFNEQXR0cmlidXRlcy5uYW1lLFxuICBnbWZPYmplY3RlZGl0aW5nTWFuYWdlci5uYW1lLFxuICBnbWZUaGVtZVRoZW1lcy5uYW1lLFxuXSk7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgJyRzY29wZScsICdnbWZUaGVtZXMnLCAnZ21mWFNEQXR0cmlidXRlcyddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIEFuZ3VsYXIgJGh0dHAgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JUVNlcnZpY2V9ICRxIEFuZ3VsYXIgJHEgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZS9UaGVtZXMnKS5UaGVtZXNTZXJ2aWNlfSBnbWZUaGVtZXMgVGhlIGdtZiB0aGVtZXMgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvZWRpdGluZy9YU0RBdHRyaWJ1dGVzJykuRWRpdGluZ1hTREF0dHJpYnV0ZVNlcnZpY2V9IGdtZlhTREF0dHJpYnV0ZXNcbiAqICAgIFRoZSBnbWYgWFNEQXR0cmlidXRlcyBzZXJ2aWNlLlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRodHRwLCAkcSwgJHNjb3BlLCBnbWZUaGVtZXMsIGdtZlhTREF0dHJpYnV0ZXMpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklIdHRwU2VydmljZX1cbiAgICovXG4gIHRoaXMuaHR0cF8gPSAkaHR0cDtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVFTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5xXyA9ICRxO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWUvVGhlbWVzJykuVGhlbWVzU2VydmljZX1cbiAgICovXG4gIHRoaXMuZ21mVGhlbWVzXyA9IGdtZlRoZW1lcztcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL2VkaXRpbmcvWFNEQXR0cmlidXRlcycpLkVkaXRpbmdYU0RBdHRyaWJ1dGVTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5nbWZYU0RBdHRyaWJ1dGVzXyA9IGdtZlhTREF0dHJpYnV0ZXM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+W119IExpc3Qgb2YgZXhhbXBsZSBhbmQgYXBwbGljYXRpb24gdXJscyB0aGF0IGNvbnRhaW5cbiAgICogICAgIE9iamVjdEVkaXRpbmcgdG9vbHMuXG4gICAqL1xuICB0aGlzLnVybHMgPSBbXG4gICAge1xuICAgICAgbmFtZTogJ29lZWRpdCBhcHAuIChob3N0ZWQpJyxcbiAgICAgIHVybDogJ2FwcHMvb2VlZGl0Lmh0bWwnLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ29lZWRpdCBhcHAuIChkZXYpJyxcbiAgICAgIHVybDogJy4uL2FwcHMvb2VlZGl0Lmh0bWwnLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2V4YW1wbGUnLFxuICAgICAgdXJsOiAnb2JqZWN0ZWRpdGluZy5odG1sJyxcbiAgICB9LFxuICBdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRVcmwgPSB0aGlzLnVybHNbMF07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mT2djU2VydmVyc30gb2djU2VydmVycyBPR0Mgc2VydmVycy5cbiAgICovXG4gIHRoaXMuZ21mU2VydmVyc18gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZk9nY1NlcnZlcn0gb2djU2VydmVyIE9HQyBzZXJ2ZXIgdG8gdXNlLlxuICAgKi9cbiAgdGhpcy5nbWZTZXJ2ZXJfID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TW119XG4gICAqL1xuICB0aGlzLmdtZkxheWVyTm9kZXMgPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU31cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PG51bWJlciwgaW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdPn1cbiAgICovXG4gIHRoaXMuZmVhdHVyZXNDYWNoZV8gPSB7fTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX1cbiAgICovXG4gIHRoaXMuZmVhdHVyZXMgPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgKi9cbiAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PG51bWJlciwgc3RyaW5nPn1cbiAgICovXG4gIHRoaXMuZ2VvbVR5cGVDYWNoZV8gPSB7fTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ3x1bmRlZmluZWR9XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkR2VvbVR5cGUgPSB1bmRlZmluZWQ7XG4gICRzY29wZS4kd2F0Y2goXG4gICAgKCkgPT4gdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSxcbiAgICAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gbnVsbDtcbiAgICAgIGlmIChuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5nZXRGZWF0dXJlc18obmV3VmFsKS50aGVuKHRoaXMuaGFuZGxlR2V0RmVhdHVyZXNfLmJpbmQodGhpcywgbmV3VmFsKSk7XG4gICAgICAgIHRoaXMuZ2V0R2VvbWV0cnlUeXBlXyhuZXdWYWwpLnRoZW4odGhpcy5oYW5kbGVHZXRHZW9tZXRyeVR5cGVfLmJpbmQodGhpcywgbmV3VmFsKSk7XG4gICAgICB9XG4gICAgfSxcbiAgKTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMudGhlbWVOYW1lID0gJ09iamVjdEVkaXRpbmcnO1xuICB0aGlzLmdtZlRoZW1lc18ubG9hZFRoZW1lcygpO1xuICB0aGlzLmdtZlRoZW1lc18uZ2V0T2djU2VydmVyc09iamVjdCgpLnRoZW4oKG9nY1NlcnZlcnMpID0+IHtcbiAgICAvLyAoMSkgU2V0IE9HQyBzZXJ2ZXJzXG4gICAgdGhpcy5nbWZTZXJ2ZXJzXyA9IG9nY1NlcnZlcnM7XG4gICAgdGhpcy5nbWZUaGVtZXNfLmdldFRoZW1lc09iamVjdCgpLnRoZW4oKHRoZW1lcykgPT4ge1xuICAgICAgaWYgKCF0aGVtZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IGksIGlpO1xuXG4gICAgICAvLyAoMikgRmluZCBPRSB0aGVtZVxuICAgICAgLyoqIEB0eXBlIHs/aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mVGhlbWV9ICovXG4gICAgICBsZXQgdGhlbWUgPSBudWxsO1xuICAgICAgZm9yIChpID0gMCwgaWkgPSB0aGVtZXMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBpZiAodGhlbWVzW2ldLm5hbWUgPT09IHRoaXMudGhlbWVOYW1lKSB7XG4gICAgICAgICAgdGhlbWUgPSB0aGVtZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdGhlbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyAoMykgR2V0IGZpcnN0IGdyb3VwIG5vZGVcbiAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IHRoZW1lLmNoaWxkcmVuWzBdO1xuXG4gICAgICAvLyAoNCkgU2V0IE9HQyBzZXJ2ZXIsIHdoaWNoIG11c3Qgc3VwcG9ydCBXRlMgZm9yIHRoaXMgZXhhbXBsZSB0byB3b3JrXG4gICAgICBpZiAoIWdyb3VwTm9kZS5vZ2NTZXJ2ZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdyb3VwTm9kZS5vZ2NTZXJ2ZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5nbWZTZXJ2ZXJzXykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ21mU2VydmVycycpO1xuICAgICAgfVxuICAgICAgY29uc3QgZ21mU2VydmVyID0gdGhpcy5nbWZTZXJ2ZXJzX1tncm91cE5vZGUub2djU2VydmVyXTtcbiAgICAgIGlmIChnbWZTZXJ2ZXIgJiYgZ21mU2VydmVyLndmc1N1cHBvcnQgPT09IHRydWUgJiYgZ21mU2VydmVyLnVybFdmcykge1xuICAgICAgICB0aGlzLmdtZlNlcnZlcl8gPSBnbWZTZXJ2ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVNbXX0gKi9cbiAgICAgIGNvbnN0IGdtZkxheWVyTm9kZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGlpID0gZ3JvdXBOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgICAgaWYgKGdyb3VwTm9kZS5jaGlsZHJlbltpXS5tZXRhZGF0YS5pZGVudGlmaWVyQXR0cmlidXRlRmllbGQpIHtcbiAgICAgICAgICBnbWZMYXllck5vZGVzLnB1c2goXG4gICAgICAgICAgICAvKiogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyV01TfSAqLyAvKiogQHR5cGUge2FueX0gKi8gZ3JvdXBOb2RlLmNoaWxkcmVuW2ldLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gKDUpIFNldCBsYXllciBub2Rlc1xuICAgICAgdGhpcy5nbWZMYXllck5vZGVzID0gZ21mTGF5ZXJOb2RlcztcblxuICAgICAgLy8gKDYpIFNlbGVjdCAncG9seWdvbicgZm9yIHRoZSBwdXJwb3NlIG9mIHNpbXBsaWZ5aW5nIHRoZSBkZW1vXG4gICAgICB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlID0gdGhpcy5nbWZMYXllck5vZGVzWzFdO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5ydW5FZGl0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzZWxlY3RlZEdtZkxheWVyTm9kZScpO1xuICB9XG4gIGlmICghdGhpcy5zZWxlY3RlZEZlYXR1cmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2VsZWN0ZWRGZWF0dXJlJyk7XG4gIH1cbiAgY29uc3QgZ2VvbVR5cGUgPSB0aGlzLnNlbGVjdGVkR2VvbVR5cGU7XG4gIGNvbnN0IGZlYXR1cmUgPSB0aGlzLnNlbGVjdGVkRmVhdHVyZTtcbiAgY29uc3QgbGF5ZXIgPSB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlLmlkO1xuICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUubWV0YWRhdGEuaWRlbnRpZmllckF0dHJpYnV0ZUZpZWxkO1xuICBpZiAoIXByb3BlcnR5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHByb3BlcnR5Jyk7XG4gIH1cbiAgY29uc3QgaWQgPSBmZWF0dXJlLmdldChwcm9wZXJ0eSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgcGFyYW1zID0ge307XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uR0VPTV9UWVBFXSA9IGdlb21UeXBlO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLklEXSA9IGlkO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLkxBWUVSXSA9IGxheWVyO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLlRIRU1FXSA9IHRoaXMudGhlbWVOYW1lO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLlBST1BFUlRZXSA9IHByb3BlcnR5O1xuICBjb25zdCB1cmwgPSBNYWluQ29udHJvbGxlci5hcHBlbmRQYXJhbXModGhpcy5zZWxlY3RlZFVybC51cmwsIHBhcmFtcyk7XG4gIHdpbmRvdy5vcGVuKHVybCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9IGdtZkxheWVyTm9kZSBMYXllciBub2RlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSVByb21pc2U8dm9pZD59IFRoZSBwcm9taXNlIGF0dGFjaGVkIHRvIHRoZSBkZWZlcnJlZCBvYmplY3QuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8gPSB0aGlzLnFfLmRlZmVyKCk7XG4gIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5nZXRGZWF0dXJlc0Zyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcbiAgaWYgKGZlYXR1cmVzKSB7XG4gICAgdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXy5yZXNvbHZlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc3N1ZUdldEZlYXR1cmVzXyhnbWZMYXllck5vZGUpO1xuICB9XG4gIHJldHVybiB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfLnByb21pc2U7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9IGdtZkxheWVyTm9kZSBMYXllciBub2RlLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaXNzdWVHZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIGlmICghdGhpcy5nbWZTZXJ2ZXJfKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdtZlNlcnZlcicpO1xuICB9XG4gIGNvbnN0IGlkID0gZ21mTGF5ZXJOb2RlLmlkO1xuICBjb25zdCB1cmwgPSBNYWluQ29udHJvbGxlci5hcHBlbmRQYXJhbXModGhpcy5nbWZTZXJ2ZXJfLnVybFdmcywge1xuICAgICdTRVJWSUNFJzogJ1dGUycsXG4gICAgJ1JFUVVFU1QnOiAnR2V0RmVhdHVyZScsXG4gICAgJ1ZFUlNJT04nOiAnMS4xLjAnLFxuICAgICdUWVBFTkFNRSc6IGdtZkxheWVyTm9kZS5sYXllcnMsXG4gIH0pO1xuICB0aGlzLmh0dHBfLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0RmVhdHVyZXNEZWZlcnJlZCcpO1xuICAgIH1cbiAgICBjb25zdCBmZWF0dXJlcyA9XG4gICAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX0gKi9cbiAgICAgIG5ldyBvbEZvcm1hdFdGUygpLnJlYWRGZWF0dXJlcyhyZXNwb25zZS5kYXRhKTtcbiAgICB0aGlzLmZlYXR1cmVzQ2FjaGVfW2lkXSA9IGZlYXR1cmVzO1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZmVhdHVyZXMgPVxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqL1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gdGhpcy5mZWF0dXJlc1swXTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7P2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX0gTGlzdCBvZiBmZWF0dXJlc1xuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLmZlYXR1cmVzQ2FjaGVfW2lkXSB8fCBudWxsO1xuICByZXR1cm4gZmVhdHVyZXM7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJXTVN9IGdtZkxheWVyTm9kZSBMYXllciBub2RlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSVByb21pc2U8dm9pZD59IFRoZSBwcm9taXNlIGF0dGFjaGVkIHRvIHRoZSBkZWZlcnJlZCBvYmplY3QuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXyA9IHRoaXMucV8uZGVmZXIoKTtcbiAgY29uc3QgZ2VvbVR5cGUgPSB0aGlzLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcbiAgaWYgKGdlb21UeXBlKSB7XG4gICAgdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNzdWVHZXRBdHRyaWJ1dGVzUmVxdWVzdF8oZ21mTGF5ZXJOb2RlKTtcbiAgfVxuICByZXR1cm4gdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucHJvbWlzZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5pc3N1ZUdldEF0dHJpYnV0ZXNSZXF1ZXN0XyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5nbWZYU0RBdHRyaWJ1dGVzXy5nZXRBdHRyaWJ1dGVzKGdtZkxheWVyTm9kZS5pZCkudGhlbihcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7TWFpbkNvbnRyb2xsZXJ9XG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIFRoZSBsYXllciBub2RlXG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vZm9ybWF0L0F0dHJpYnV0ZScpLkF0dHJpYnV0ZVtdfSBhdHRyaWJ1dGVzIFRoZSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gKGdtZkxheWVyTm9kZSwgYXR0cmlidXRlcykge1xuICAgICAgaWYgKCF0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWQnKTtcbiAgICAgIH1cbiAgICAgIC8vIEdldCBnZW9tIHR5cGUgZnJvbSBhdHRyaWJ1dGVzIGFuZCBzZXRcbiAgICAgIGNvbnN0IGdlb21BdHRyID0gZ2V0R2VvbWV0cnlBdHRyaWJ1dGUoYXR0cmlidXRlcyk7XG4gICAgICBpZiAoZ2VvbUF0dHIgJiYgZ2VvbUF0dHIuZ2VvbVR5cGUpIHtcbiAgICAgICAgdGhpcy5nZW9tVHlwZUNhY2hlX1tnbWZMYXllck5vZGUuaWRdID0gZ2VvbUF0dHIuZ2VvbVR5cGU7XG4gICAgICAgIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcywgZ21mTGF5ZXJOb2RlKSxcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBnZW9tVHlwZSA9IHRoaXMuZ2V0R2VvbWV0cnlUeXBlRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuICB0aGlzLnNlbGVjdGVkR2VvbVR5cGUgPSBnZW9tVHlwZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcldNU30gZ21mTGF5ZXJOb2RlIExheWVyIG5vZGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gVGhlIHR5cGUgb2YgZ2VvbWV0cnkuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGVGcm9tQ2FjaGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICBjb25zdCBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgY29uc3QgZ2VvbVR5cGUgPSB0aGlzLmdlb21UeXBlQ2FjaGVfW2lkXTtcbiAgcmV0dXJuIGdlb21UeXBlO1xufTtcblxuLyoqXG4gKiBBcHBlbmRzIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaSBUaGUgb3JpZ2luYWwgVVJJLCB3aGljaCBtYXkgYWxyZWFkeSBoYXZlIHF1ZXJ5IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IHBhcmFtcyBBbiBvYmplY3Qgd2hlcmUga2V5cyBhcmUgVVJJLWVuY29kZWQgcGFyYW1ldGVyIGtleXMsXG4gKiAgICAgYW5kIHRoZSB2YWx1ZXMgYXJlIGFyYml0cmFyeSB0eXBlcyBvciBhcnJheXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmV3IFVSSS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zID0gZnVuY3Rpb24gKHVyaSwgcGFyYW1zKSB7XG4gIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gIGNvbnN0IGtleVBhcmFtcyA9IFtdO1xuICAvLyBTa2lwIGFueSBudWxsIG9yIHVuZGVmaW5lZCBwYXJhbWV0ZXIgdmFsdWVzXG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoaykgPT4ge1xuICAgIGlmIChwYXJhbXNba10gIT09IG51bGwgJiYgcGFyYW1zW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleVBhcmFtcy5wdXNoKGAke2t9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trXSl9YCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgcXMgPSBrZXlQYXJhbXMuam9pbignJicpO1xuICAvLyByZW1vdmUgYW55IHRyYWlsaW5nID8gb3IgJlxuICB1cmkgPSB1cmkucmVwbGFjZSgvWz8mXSQvLCAnJyk7XG4gIC8vIGFwcGVuZCA/IG9yICYgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdXJpIGhhcyBleGlzdGluZyBwYXJhbWV0ZXJzXG4gIHVyaSA9IHVyaS5pbmNsdWRlcygnPycpID8gYCR7dXJpfSZgIDogYCR7dXJpfT9gO1xuICByZXR1cm4gdXJpICsgcXM7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwib2JqZWN0ZWRpdGluZ2h1YlwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9vYmplY3RlZGl0aW5naHViLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9