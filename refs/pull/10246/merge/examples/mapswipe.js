/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/mapswipe.js"
/*!******************************!*\
  !*** ./examples/mapswipe.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mapswipe_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapswipe.scss */ "./examples/mapswipe.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_map_swipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/swipe */ "./src/map/swipe.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
// The MIT License (MIT)
//
// Copyright (c) 2019-2026 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_map_swipe__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

/**
 * @class
 */
function MainController() {
  const openStreetMapLayer = new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_5__["default"]({
    source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["default"](),
  });

  /**
   * @type {import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>}
   */
  this.openSeaMapLayer = new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_5__["default"]({
    source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["default"]({
      attributions: ['All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>', ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__.ATTRIBUTION],
      opaque: false,
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
    }),
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_6__["default"]({
    layers: [openStreetMapLayer, this.openSeaMapLayer],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_8__["default"]({
      center: [-244780.24508882355, 5986452.183179816],
      zoom: 15,
    }),
  });
  this.gmfLayerBeingSwipe = {
    layer: this.openSeaMapLayer,
    swipeValue: 0.5,
  };
}
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_4__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/mapswipe.scss"
/*!********************************!*\
  !*** ./examples/mapswipe.scss ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/map/swipe.html.js"
/*!*******************************!*\
  !*** ./src/map/swipe.html.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gmf_icons_swipe_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gmf/icons/swipe_svg */ "./src/icons/swipe_svg.ts");
// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-swipe-line-draggable">
  <button class="ngeo-swipe-close btn prime btn-sm" ng-click="$ctrl.deactivate()">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="ngeo-swipe-line"></div>
  <div class="ngeo-swipe-arrow">${gmf_icons_swipe_svg__WEBPACK_IMPORTED_MODULE_0__["default"]}</div>
</div>`);


/***/ },

/***/ "./src/map/swipe.js"
/*!**************************!*\
  !*** ./src/map/swipe.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SwipeController: () => (/* binding */ SwipeController),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_render_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/render/Event */ "./node_modules/ol/render/Event.js");
/* harmony import */ var _swipe_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./swipe.html */ "./src/map/swipe.html.js");
// The MIT License (MIT)
//
// Copyright (c) 2019-2026 Camptocamp SA
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

// jquery-ui/ui/widgets/draggable must be imported by your main controller.




/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoMapswipe', []);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/src/map/swipe', _swipe_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },
  ],
);
myModule.value(
  'ngeoMapswipeTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoMapswipeTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/src/map/swipe';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoMapswipeTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoMapswipeTemplateUrl.$inject = ['$attrs', 'ngeoMapswipeTemplateUrl'];
function ngeoMapswipeTemplateUrl($attrs, ngeoMapswipeTemplateUrl) {
  return ngeoMapswipeTemplateUrl($attrs);
}

/**
 * The controller for the Mapswipe component.
 */
class SwipeController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {JQuery} $element Element.
   * @class
   * @hidden
   * @ngdoc controller
   * @ngname ngeoMapswipeController
   */
  constructor($scope, $element) {
    /**
     * @type {import('ol/Map').default}
     */
    this.map;

    /**
     * @type {import('ol/layer/WebGLTile').default<import('ol/source/Tile').default>}
     */
    this.layer;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {number}
     */
    this.swipeValue;

    /**
     * @type {JQuery}
     * @private
     */
    this.draggableElement_ = $element.find('.ngeo-swipe-line-draggable');

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {ResizeObserver}
     * @private
     */
    this.resizeObserver_;
  }

  /**
   * Init the controller
   */
  $onInit() {
    const view = this.map.getView();
    this.swipeValue = this.swipeValue !== undefined ? this.swipeValue : 0.5;
    this.listenerKeys_.push((0,ol_events__WEBPACK_IMPORTED_MODULE_1__.listen)(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.listenerKeys_.push((0,ol_events__WEBPACK_IMPORTED_MODULE_1__.listen)(this.layer, 'postrender', this.handleLayerPostrender_, this));
    this.listenerKeys_.push((0,ol_events__WEBPACK_IMPORTED_MODULE_1__.listen)(this.layer, 'change:visible', this.handleLayerVisibleChange_, this));
    this.listenerKeys_.push((0,ol_events__WEBPACK_IMPORTED_MODULE_1__.listen)(view, 'change:rotation', this.handleViewRotationChange_, this));
    const halfDraggableWidth = this.draggableElement_.width() / 2;

    // When beginning to swipe a layer, reset the view rotation
    const rotation = view.getRotation();
    if (rotation) {
      view.setRotation(0);
    }
    this.draggableElement_.draggable({
      axis: 'x',
      containment: 'parent',
      drag: () => {
        const parentWidth = this.draggableElement_.parent().width();
        const position = this.draggableElement_.position().left + halfDraggableWidth;
        this.swipeValue = position / parentWidth;
        this.map.render();
      },
    });

    // keep the same percentage when the parent is resized
    this.resizeObserver_ = new ResizeObserver(() => {
      const parentWidth = this.draggableElement_.parent().width();
      this.draggableElement_.css('left', parentWidth * this.swipeValue - halfDraggableWidth);
    });
    this.resizeObserver_.observe(this.draggableElement_.parent().get(0));
  }

  /**
   * Allows you to deactivate the swiper on click of the close button.
   */
  deactivate() {
    this.layer = null;
    this.map.render();
  }

  /**
   * @param {?Event|import('ol/events/Event').default} evt OpenLayers object event.
   * @private
   */
  handleLayerPrerender_(evt) {
    if (!(evt instanceof ol_render_Event__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      return;
    }
    const ctx = evt.context;
    if (!ctx) {
      return;
    }
    const width = ctx.canvas.width * this.swipeValue;
    const height = ctx.canvas.height;
    if (ctx instanceof CanvasRenderingContext2D) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.clip();
    } else {
      // ctx instanceof WebGLRenderingContext
      this.fixWebGLContextScissorClear(ctx);
      ctx.enable(ctx.SCISSOR_TEST);
      ctx.scissor(0, 0, width, height);
    }
  }

  /**
   * Will monkey-patch the context to make sure that clear() calls will not
   * take into account any scissor test previously set.
   * @param {WebGLRenderingContext} gl WebGL Context
   * @private
   */
  fixWebGLContextScissorClear(gl) {
    if (gl._scissorClearFixed) {
      return;
    }
    const clearFn = gl.clear;
    gl.clear = function (...args) {
      const scissorEnabled = gl.getParameter(gl.SCISSOR_TEST);
      scissorEnabled && gl.disable(gl.SCISSOR_TEST);
      clearFn.apply(gl, args);
      scissorEnabled && gl.enable(gl.SCISSOR_TEST);
    };
    gl._scissorClearFixed = true;
  }

  /**
   * @param {?Event|import('ol/events/Event').default} evt OpenLayers object event.
   * @private
   */
  handleLayerPostrender_(evt) {
    if (evt instanceof ol_render_Event__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      const ctx = evt.context;
      if (!ctx) {
        return;
      }
      if (ctx instanceof CanvasRenderingContext2D) {
        ctx.restore();
      } else {
        // ctx instanceof WebGLRenderingContext
        ctx.disable(ctx.SCISSOR_TEST);
      }
    }
  }

  /**
   * Called when the visibility of the layer changes. If it is no longer visible, deactivate the swipe component.
   *
   * @private
   */
  handleLayerVisibleChange_() {
    if (!this.layer.getVisible()) {
      this.deactivate();
    }
  }

  /**
   * Called when the rotation of the view changes. If the view is rotated, deactivate the swipe component.
   *
   * @private
   */
  handleViewRotationChange_() {
    if (this.map.getView().getRotation()) {
      this.deactivate();
    }
  }
  $onDestroy() {
    this.listenerKeys_.forEach(ol_events__WEBPACK_IMPORTED_MODULE_1__.unlistenByKey);
    this.listenerKeys_.length = 0;
    this.draggableElement_.draggable('destroy');
    this.resizeObserver_.disconnect();
  }
}
SwipeController.$inject = ['$scope', '$element'];
myModule.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '=',
    swipeValue: '=',
  },
  templateUrl: ngeoMapswipeTemplateUrl,
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/******/ 			"mapswipe": 0
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
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/mapswipe.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc3dpcGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2RUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbWFwc3dpcGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL21hcHN3aXBlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tYXAvc3dpcGUuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21hcC9zd2lwZS5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE5LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL21hcHN3aXBlLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwc3dpcGVNb2R1bGUgZnJvbSAnbmdlby9tYXAvc3dpcGUnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFNvdXJjZU9TTSwge0FUVFJJQlVUSU9OfSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBuZ2VvTWFwc3dpcGVNb2R1bGUubmFtZV0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgY29uc3Qgb3BlblN0cmVldE1hcExheWVyID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvV2ViR0xUaWxlJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9UaWxlJykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLm9wZW5TZWFNYXBMYXllciA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oe1xuICAgICAgYXR0cmlidXRpb25zOiBbJ0FsbCBtYXBzIMKpIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zZWFtYXAub3JnL1wiPk9wZW5TZWFNYXA8L2E+JywgQVRUUklCVVRJT05dLFxuICAgICAgb3BhcXVlOiBmYWxzZSxcbiAgICAgIHVybDogJ2h0dHBzOi8vdGlsZXMub3BlbnNlYW1hcC5vcmcvc2VhbWFyay97en0ve3h9L3t5fS5wbmcnLFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtvcGVuU3RyZWV0TWFwTGF5ZXIsIHRoaXMub3BlblNlYU1hcExheWVyXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWy0yNDQ3ODAuMjQ1MDg4ODIzNTUsIDU5ODY0NTIuMTgzMTc5ODE2XSxcbiAgICAgIHpvb206IDE1LFxuICAgIH0pLFxuICB9KTtcbiAgdGhpcy5nbWZMYXllckJlaW5nU3dpcGUgPSB7XG4gICAgbGF5ZXI6IHRoaXMub3BlblNlYU1hcExheWVyLFxuICAgIHN3aXBlVmFsdWU6IDAuNSxcbiAgfTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNC0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBzdmdTd2lwZSBmcm9tICdnbWYvaWNvbnMvc3dpcGVfc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLXN3aXBlLWxpbmUtZHJhZ2dhYmxlXCI+XG4gIDxidXR0b24gY2xhc3M9XCJuZ2VvLXN3aXBlLWNsb3NlIGJ0biBwcmltZSBidG4tc21cIiBuZy1jbGljaz1cIiRjdHJsLmRlYWN0aXZhdGUoKVwiPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gIDwvYnV0dG9uPlxuICA8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1saW5lXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXN3aXBlLWFycm93XCI+JHtzdmdTd2lwZX08L2Rpdj5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTktMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBqcXVlcnktdWkvdWkvd2lkZ2V0cy9kcmFnZ2FibGUgbXVzdCBiZSBpbXBvcnRlZCBieSB5b3VyIG1haW4gY29udHJvbGxlci5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHtsaXN0ZW4sIHVubGlzdGVuQnlLZXl9IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgUmVuZGVyRXZlbnQgZnJvbSAnb2wvcmVuZGVyL0V2ZW50JztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9zd2lwZS5odG1sJztcbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb01hcHN3aXBlJywgW10pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3NyYy9tYXAvc3dpcGUnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoXG4gICduZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdGVtcGxhdGUgdXJsLlxuICAgKi9cbiAgKCRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9zcmMvbWFwL3N3aXBlJztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckYXR0cnMnLCAnbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsKCRhdHRycywgbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogVGhlIGNvbnRyb2xsZXIgZm9yIHRoZSBNYXBzd2lwZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTd2lwZUNvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICAgKiBAY2xhc3NcbiAgICogQGhpZGRlblxuICAgKiBAbmdkb2MgY29udHJvbGxlclxuICAgKiBAbmduYW1lIG5nZW9NYXBzd2lwZUNvbnRyb2xsZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgICAqL1xuICAgIHRoaXMubWFwO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvV2ViR0xUaWxlJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9UaWxlJykuZGVmYXVsdD59XG4gICAgICovXG4gICAgdGhpcy5sYXllcjtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnN3aXBlVmFsdWU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50XyA9ICRlbGVtZW50LmZpbmQoJy5uZ2VvLXN3aXBlLWxpbmUtZHJhZ2dhYmxlJyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9ldmVudHMnKS5FdmVudHNLZXlbXX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1Jlc2l6ZU9ic2VydmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl87XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgY29udHJvbGxlclxuICAgKi9cbiAgJG9uSW5pdCgpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHRoaXMuc3dpcGVWYWx1ZSA9IHRoaXMuc3dpcGVWYWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zd2lwZVZhbHVlIDogMC41O1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKGxpc3Rlbih0aGlzLmxheWVyLCAncHJlcmVuZGVyJywgdGhpcy5oYW5kbGVMYXllclByZXJlbmRlcl8sIHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ3Bvc3RyZW5kZXInLCB0aGlzLmhhbmRsZUxheWVyUG9zdHJlbmRlcl8sIHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ2NoYW5nZTp2aXNpYmxlJywgdGhpcy5oYW5kbGVMYXllclZpc2libGVDaGFuZ2VfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHZpZXcsICdjaGFuZ2U6cm90YXRpb24nLCB0aGlzLmhhbmRsZVZpZXdSb3RhdGlvbkNoYW5nZV8sIHRoaXMpKTtcbiAgICBjb25zdCBoYWxmRHJhZ2dhYmxlV2lkdGggPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLndpZHRoKCkgLyAyO1xuXG4gICAgLy8gV2hlbiBiZWdpbm5pbmcgdG8gc3dpcGUgYSBsYXllciwgcmVzZXQgdGhlIHZpZXcgcm90YXRpb25cbiAgICBjb25zdCByb3RhdGlvbiA9IHZpZXcuZ2V0Um90YXRpb24oKTtcbiAgICBpZiAocm90YXRpb24pIHtcbiAgICAgIHZpZXcuc2V0Um90YXRpb24oMCk7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8uZHJhZ2dhYmxlKHtcbiAgICAgIGF4aXM6ICd4JyxcbiAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICAgIGRyYWc6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50V2lkdGggPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLnBhcmVudCgpLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5wb3NpdGlvbigpLmxlZnQgKyBoYWxmRHJhZ2dhYmxlV2lkdGg7XG4gICAgICAgIHRoaXMuc3dpcGVWYWx1ZSA9IHBvc2l0aW9uIC8gcGFyZW50V2lkdGg7XG4gICAgICAgIHRoaXMubWFwLnJlbmRlcigpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIGtlZXAgdGhlIHNhbWUgcGVyY2VudGFnZSB3aGVuIHRoZSBwYXJlbnQgaXMgcmVzaXplZFxuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5wYXJlbnQoKS53aWR0aCgpO1xuICAgICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5jc3MoJ2xlZnQnLCBwYXJlbnRXaWR0aCAqIHRoaXMuc3dpcGVWYWx1ZSAtIGhhbGZEcmFnZ2FibGVXaWR0aCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl8ub2JzZXJ2ZSh0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLnBhcmVudCgpLmdldCgwKSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHlvdSB0byBkZWFjdGl2YXRlIHRoZSBzd2lwZXIgb24gY2xpY2sgb2YgdGhlIGNsb3NlIGJ1dHRvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5sYXllciA9IG51bGw7XG4gICAgdGhpcy5tYXAucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR8aW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0fSBldnQgT3BlbkxheWVycyBvYmplY3QgZXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVMYXllclByZXJlbmRlcl8oZXZ0KSB7XG4gICAgaWYgKCEoZXZ0IGluc3RhbmNlb2YgUmVuZGVyRXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN0eCA9IGV2dC5jb250ZXh0O1xuICAgIGlmICghY3R4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHdpZHRoID0gY3R4LmNhbnZhcy53aWR0aCAqIHRoaXMuc3dpcGVWYWx1ZTtcbiAgICBjb25zdCBoZWlnaHQgPSBjdHguY2FudmFzLmhlaWdodDtcbiAgICBpZiAoY3R4IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjdHguY2xpcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjdHggaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHRcbiAgICAgIHRoaXMuZml4V2ViR0xDb250ZXh0U2Npc3NvckNsZWFyKGN0eCk7XG4gICAgICBjdHguZW5hYmxlKGN0eC5TQ0lTU09SX1RFU1QpO1xuICAgICAgY3R4LnNjaXNzb3IoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgbW9ua2V5LXBhdGNoIHRoZSBjb250ZXh0IHRvIG1ha2Ugc3VyZSB0aGF0IGNsZWFyKCkgY2FsbHMgd2lsbCBub3RcbiAgICogdGFrZSBpbnRvIGFjY291bnQgYW55IHNjaXNzb3IgdGVzdCBwcmV2aW91c2x5IHNldC5cbiAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsIFdlYkdMIENvbnRleHRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZpeFdlYkdMQ29udGV4dFNjaXNzb3JDbGVhcihnbCkge1xuICAgIGlmIChnbC5fc2Npc3NvckNsZWFyRml4ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2xlYXJGbiA9IGdsLmNsZWFyO1xuICAgIGdsLmNsZWFyID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIGNvbnN0IHNjaXNzb3JFbmFibGVkID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgICBzY2lzc29yRW5hYmxlZCAmJiBnbC5kaXNhYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgICBjbGVhckZuLmFwcGx5KGdsLCBhcmdzKTtcbiAgICAgIHNjaXNzb3JFbmFibGVkICYmIGdsLmVuYWJsZShnbC5TQ0lTU09SX1RFU1QpO1xuICAgIH07XG4gICAgZ2wuX3NjaXNzb3JDbGVhckZpeGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudHxpbXBvcnQoJ29sL2V2ZW50cy9FdmVudCcpLmRlZmF1bHR9IGV2dCBPcGVuTGF5ZXJzIG9iamVjdCBldmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUxheWVyUG9zdHJlbmRlcl8oZXZ0KSB7XG4gICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlbmRlckV2ZW50KSB7XG4gICAgICBjb25zdCBjdHggPSBldnQuY29udGV4dDtcbiAgICAgIGlmICghY3R4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjdHggaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGN0eCBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dFxuICAgICAgICBjdHguZGlzYWJsZShjdHguU0NJU1NPUl9URVNUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpc2liaWxpdHkgb2YgdGhlIGxheWVyIGNoYW5nZXMuIElmIGl0IGlzIG5vIGxvbmdlciB2aXNpYmxlLCBkZWFjdGl2YXRlIHRoZSBzd2lwZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVMYXllclZpc2libGVDaGFuZ2VfKCkge1xuICAgIGlmICghdGhpcy5sYXllci5nZXRWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcm90YXRpb24gb2YgdGhlIHZpZXcgY2hhbmdlcy4gSWYgdGhlIHZpZXcgaXMgcm90YXRlZCwgZGVhY3RpdmF0ZSB0aGUgc3dpcGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlVmlld1JvdGF0aW9uQ2hhbmdlXygpIHtcbiAgICBpZiAodGhpcy5tYXAuZ2V0VmlldygpLmdldFJvdGF0aW9uKCkpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuICAkb25EZXN0cm95KCkge1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5mb3JFYWNoKHVubGlzdGVuQnlLZXkpO1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8uZHJhZ2dhYmxlKCdkZXN0cm95Jyk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xuICB9XG59XG5Td2lwZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50J107XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9NYXBzd2lwZScsIHtcbiAgY29udHJvbGxlcjogU3dpcGVDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgIG1hcDogJzwnLFxuICAgIGxheWVyOiAnPScsXG4gICAgc3dpcGVWYWx1ZTogJz0nLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwsXG59KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDaGVjayBpZiBtb2R1bGUgZXhpc3RzIChkZXZlbG9wbWVudCBvbmx5KVxuXHRpZiAoX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYXBzd2lwZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvbWFwc3dpcGUuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=