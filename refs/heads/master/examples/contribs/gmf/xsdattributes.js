/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/xsdattributes.js"
/*!************************************************!*\
  !*** ./contribs/gmf/examples/xsdattributes.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _xsdattributes_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xsdattributes.scss */ "./contribs/gmf/examples/xsdattributes.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/theme/Themes */ "./src/theme/Themes.js");
/* harmony import */ var gmf_editing_XSDAttributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/editing/XSDAttributes */ "./src/editing/XSDAttributes.js");
/* harmony import */ var ngeo_editing_attributesComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/editing/attributesComponent */ "./src/editing/attributesComponent.js");
/* harmony import */ var ngeo_format_XSDAttribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/format/XSDAttribute */ "./src/format/XSDAttribute.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
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











/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('gmfapp', [
  'gettext',
  gmf_editing_XSDAttributes__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  ngeo_editing_attributesComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name,
]);

MainController.$inject = ['$timeout', 'gmfThemes', 'gmfXSDAttributes'];

/**
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/editing/XSDAttributes').EditingXSDAttributeService} gmfXSDAttributes
 *    The gmf XSDAttributes service.
 * @class
 */
function MainController($timeout, gmfThemes, gmfXSDAttributes) {
  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {import('gmf/editing/XSDAttributes').EditingXSDAttributeService}
   */
  this.xsdAttributes_ = gmfXSDAttributes;

  /**
   * @type {?import('ngeo/format/Attribute').Attribute[]}
   */
  this.attributes = null;

  /**
   * @type {?olFeature<import('ol/geom/Geometry').default>}
   */
  this.feature = null;

  /**
   * @type {import('gmf/themes').GmfLayer[]}
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
    /** @type {(import('gmf/themes').GmfTheme | import('gmf/themes').GmfGroup | import('gmf/themes').GmfLayer)[]} */
    const flatNodes = [];
    themes.forEach((theme) => {
      theme.children.forEach((group) => {
        this.getDistinctFlatNodes_(group, flatNodes);
      });
    });
    flatNodes.forEach((node) => {
      const groupNode = /** @type {import('gmf/themes').GmfGroup} */ node;
      // Get an array of all layers
      if (groupNode.children === undefined && layerNames.includes(node.name)) {
        this.layers.push(/** @type {import('gmf/themes').GmfLayer} */ node);
      }
    });
  });
}

/**
 * @param {import('gmf/themes').GmfLayer|undefined} value A layer or undefined to get layers.
 * @returns {import('gmf/themes').GmfLayer[]} All layers in all themes.
 */
MainController.prototype.getSetLayers = function (value) {
  if (value !== undefined && value !== null) {
    this.xsdAttributes_.getAttributes(value.id).then((attr) => this.setAttributes_(attr));
  }
  return this.layers;
};

/**
 * @param {import('ngeo/format/Attribute').Attribute[]} attributes Attributes.
 */
MainController.prototype.setAttributes_ = function (attributes) {
  // (1) Reset first
  this.feature = null;
  this.attributes = null;

  // (2) Then set
  this.timeout_(() => {
    this.feature = new ol_Feature__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.attributes = attributes;
  }, 0);
};

/**
 * @returns {string} Type of geometry.
 */
MainController.prototype.getGeomType = function () {
  let type = 'N/A';
  if (this.attributes) {
    const geomAttr = (0,ngeo_format_XSDAttribute__WEBPACK_IMPORTED_MODULE_5__.getGeometryAttribute)(this.attributes);
    if (geomAttr && geomAttr.geomType) {
      type = geomAttr.geomType;
    }
  }
  return type;
};

/**
 * Just for this example
 *
 * @param {import('gmf/themes').GmfTheme|import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node
 *    A theme, group or layer node.
 * @param {(import('gmf/themes').GmfTheme | import('gmf/themes').GmfGroup | import('gmf/themes').GmfLayer)[]} nodes
 *    An Array of nodes.
 */
MainController.prototype.getDistinctFlatNodes_ = function (node, nodes) {
  let i;
  const children = /** @type {import('gmf/themes').GmfGroup} */ node.children;
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
(0,_options__WEBPACK_IMPORTED_MODULE_7__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./contribs/gmf/examples/xsdattributes.scss"
/*!**************************************************!*\
  !*** ./contribs/gmf/examples/xsdattributes.scss ***!
  \**************************************************/
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
/******/ 			"xsdattributes": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/xsdattributes.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHNkYXR0cmlidXRlcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUtBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMveHNkYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL3hzZGF0dHJpYnV0ZXMuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi94c2RhdHRyaWJ1dGVzLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzJztcbmltcG9ydCBnbWZFZGl0aW5nWFNEQXR0cmlidXRlcyBmcm9tICdnbWYvZWRpdGluZy9YU0RBdHRyaWJ1dGVzJztcbmltcG9ydCBuZ2VvRWRpdGluZ0F0dHJpYnV0ZXNDb21wb25lbnQgZnJvbSAnbmdlby9lZGl0aW5nL2F0dHJpYnV0ZXNDb21wb25lbnQnO1xuaW1wb3J0IHtnZXRHZW9tZXRyeUF0dHJpYnV0ZX0gZnJvbSAnbmdlby9mb3JtYXQvWFNEQXR0cmlidXRlJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mRWRpdGluZ1hTREF0dHJpYnV0ZXMubmFtZSxcbiAgZ21mVGhlbWVUaGVtZXMubmFtZSxcbiAgbmdlb0VkaXRpbmdBdHRyaWJ1dGVzQ29tcG9uZW50Lm5hbWUsXG5dKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnZ21mVGhlbWVzJywgJ2dtZlhTREF0dHJpYnV0ZXMnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfSAkdGltZW91dCBBbmd1bGFyIHRpbWVvdXQgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWUvVGhlbWVzJykuVGhlbWVzU2VydmljZX0gZ21mVGhlbWVzIFRoZSBnbWYgdGhlbWVzIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL2VkaXRpbmcvWFNEQXR0cmlidXRlcycpLkVkaXRpbmdYU0RBdHRyaWJ1dGVTZXJ2aWNlfSBnbWZYU0RBdHRyaWJ1dGVzXG4gKiAgICBUaGUgZ21mIFhTREF0dHJpYnV0ZXMgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkdGltZW91dCwgZ21mVGhlbWVzLCBnbWZYU0RBdHRyaWJ1dGVzKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLnRpbWVvdXRfID0gJHRpbWVvdXQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9lZGl0aW5nL1hTREF0dHJpYnV0ZXMnKS5FZGl0aW5nWFNEQXR0cmlidXRlU2VydmljZX1cbiAgICovXG4gIHRoaXMueHNkQXR0cmlidXRlc18gPSBnbWZYU0RBdHRyaWJ1dGVzO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9mb3JtYXQvQXR0cmlidXRlJykuQXR0cmlidXRlW119XG4gICAqL1xuICB0aGlzLmF0dHJpYnV0ZXMgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICovXG4gIHRoaXMuZmVhdHVyZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcltdfVxuICAgKi9cbiAgdGhpcy5sYXllcnMgPSBbXTtcblxuICAvLyBUTVAgLSBUaGUgbGlzdCBvZiBsYXllciBuYW1lcyB0byB1c2UuIFdlJ2xsIGtlZXAgdGhpcyB1bnRpbCB3ZSBjYW4gdXNlXG4gIC8vICAgICAgIHRob3NlIHRoYXQgYXJlIGVkaXRhYmxlLlxuICBjb25zdCBsYXllck5hbWVzID0gWydsaW5lJywgJ3BvaW50JywgJ3BvbHlnb24nXTtcbiAgZ21mVGhlbWVzLmxvYWRUaGVtZXMoKTtcbiAgZ21mVGhlbWVzLmdldFRoZW1lc09iamVjdCgpLnRoZW4oKHRoZW1lcykgPT4ge1xuICAgIGlmICghdGhlbWVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEdldCBhbiBhcnJheSB3aXRoIGFsbCBub2RlcyBlbnRpdGllcyBleGlzdGluZyBpbiBcInRoZW1lc1wiLlxuICAgIC8qKiBAdHlwZSB7KGltcG9ydCgnZ21mL3RoZW1lcycpLkdtZlRoZW1lIHwgaW1wb3J0KCdnbWYvdGhlbWVzJykuR21mR3JvdXAgfCBpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcilbXX0gKi9cbiAgICBjb25zdCBmbGF0Tm9kZXMgPSBbXTtcbiAgICB0aGVtZXMuZm9yRWFjaCgodGhlbWUpID0+IHtcbiAgICAgIHRoZW1lLmNoaWxkcmVuLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RGlzdGluY3RGbGF0Tm9kZXNfKGdyb3VwLCBmbGF0Tm9kZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZmxhdE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IC8qKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mR3JvdXB9ICovIG5vZGU7XG4gICAgICAvLyBHZXQgYW4gYXJyYXkgb2YgYWxsIGxheWVyc1xuICAgICAgaWYgKGdyb3VwTm9kZS5jaGlsZHJlbiA9PT0gdW5kZWZpbmVkICYmIGxheWVyTmFtZXMuaW5jbHVkZXMobm9kZS5uYW1lKSkge1xuICAgICAgICB0aGlzLmxheWVycy5wdXNoKC8qKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJ9ICovIG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyfHVuZGVmaW5lZH0gdmFsdWUgQSBsYXllciBvciB1bmRlZmluZWQgdG8gZ2V0IGxheWVycy5cbiAqIEByZXR1cm5zIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZMYXllcltdfSBBbGwgbGF5ZXJzIGluIGFsbCB0aGVtZXMuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRTZXRMYXllcnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICB0aGlzLnhzZEF0dHJpYnV0ZXNfLmdldEF0dHJpYnV0ZXModmFsdWUuaWQpLnRoZW4oKGF0dHIpID0+IHRoaXMuc2V0QXR0cmlidXRlc18oYXR0cikpO1xuICB9XG4gIHJldHVybiB0aGlzLmxheWVycztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vZm9ybWF0L0F0dHJpYnV0ZScpLkF0dHJpYnV0ZVtdfSBhdHRyaWJ1dGVzIEF0dHJpYnV0ZXMuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzXyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gIC8vICgxKSBSZXNldCBmaXJzdFxuICB0aGlzLmZlYXR1cmUgPSBudWxsO1xuICB0aGlzLmF0dHJpYnV0ZXMgPSBudWxsO1xuXG4gIC8vICgyKSBUaGVuIHNldFxuICB0aGlzLnRpbWVvdXRfKCgpID0+IHtcbiAgICB0aGlzLmZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgfSwgMCk7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFR5cGUgb2YgZ2VvbWV0cnkuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHR5cGUgPSAnTi9BJztcbiAgaWYgKHRoaXMuYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGdlb21BdHRyID0gZ2V0R2VvbWV0cnlBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICBpZiAoZ2VvbUF0dHIgJiYgZ2VvbUF0dHIuZ2VvbVR5cGUpIHtcbiAgICAgIHR5cGUgPSBnZW9tQXR0ci5nZW9tVHlwZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59O1xuXG4vKipcbiAqIEp1c3QgZm9yIHRoaXMgZXhhbXBsZVxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mVGhlbWV8aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mR3JvdXB8aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXJ9IG5vZGVcbiAqICAgIEEgdGhlbWUsIGdyb3VwIG9yIGxheWVyIG5vZGUuXG4gKiBAcGFyYW0geyhpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZUaGVtZSB8IGltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkdyb3VwIHwgaW1wb3J0KCdnbWYvdGhlbWVzJykuR21mTGF5ZXIpW119IG5vZGVzXG4gKiAgICBBbiBBcnJheSBvZiBub2Rlcy5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldERpc3RpbmN0RmxhdE5vZGVzXyA9IGZ1bmN0aW9uIChub2RlLCBub2Rlcykge1xuICBsZXQgaTtcbiAgY29uc3QgY2hpbGRyZW4gPSAvKiogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkdyb3VwfSAqLyBub2RlLmNoaWxkcmVuO1xuICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5nZXREaXN0aW5jdEZsYXROb2Rlc18oY2hpbGRyZW5baV0sIG5vZGVzKTtcbiAgICB9XG4gIH1cbiAgbGV0IGFscmVhZHlBZGRlZCA9IGZhbHNlO1xuICBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgaWYgKG4uaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgIGFscmVhZHlBZGRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgaWYgKCFhbHJlYWR5QWRkZWQpIHtcbiAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICB9XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwieHNkYXR0cmlidXRlc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy94c2RhdHRyaWJ1dGVzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=