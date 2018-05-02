/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/mapswipe.js":
/*!******************************!*\
  !*** ./examples/mapswipe.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// Copyright (c) 2019-2024 Camptocamp SA
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


/***/ }),

/***/ "./examples/mapswipe.scss":
/*!********************************!*\
  !*** ./examples/mapswipe.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/map/swipe.html.js":
/*!*******************************!*\
  !*** ./src/map/swipe.html.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gmf_icons_swipe_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gmf/icons/swipe_svg */ "./src/icons/swipe_svg.ts");
// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
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


/***/ }),

/***/ "./src/map/swipe.js":
/*!**************************!*\
  !*** ./src/map/swipe.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// Copyright (c) 2019-2025 Camptocamp SA
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc3dpcGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2RUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbWFwc3dpcGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL21hcHN3aXBlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tYXAvc3dpcGUuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21hcC9zd2lwZS5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE5LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL21hcHN3aXBlLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwc3dpcGVNb2R1bGUgZnJvbSAnbmdlby9tYXAvc3dpcGUnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFNvdXJjZU9TTSwge0FUVFJJQlVUSU9OfSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBuZ2VvTWFwc3dpcGVNb2R1bGUubmFtZV0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgY29uc3Qgb3BlblN0cmVldE1hcExheWVyID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvV2ViR0xUaWxlJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9UaWxlJykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLm9wZW5TZWFNYXBMYXllciA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oe1xuICAgICAgYXR0cmlidXRpb25zOiBbJ0FsbCBtYXBzIMKpIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zZWFtYXAub3JnL1wiPk9wZW5TZWFNYXA8L2E+JywgQVRUUklCVVRJT05dLFxuICAgICAgb3BhcXVlOiBmYWxzZSxcbiAgICAgIHVybDogJ2h0dHBzOi8vdGlsZXMub3BlbnNlYW1hcC5vcmcvc2VhbWFyay97en0ve3h9L3t5fS5wbmcnLFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtvcGVuU3RyZWV0TWFwTGF5ZXIsIHRoaXMub3BlblNlYU1hcExheWVyXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWy0yNDQ3ODAuMjQ1MDg4ODIzNTUsIDU5ODY0NTIuMTgzMTc5ODE2XSxcbiAgICAgIHpvb206IDE1LFxuICAgIH0pLFxuICB9KTtcbiAgdGhpcy5nbWZMYXllckJlaW5nU3dpcGUgPSB7XG4gICAgbGF5ZXI6IHRoaXMub3BlblNlYU1hcExheWVyLFxuICAgIHN3aXBlVmFsdWU6IDAuNSxcbiAgfTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgc3ZnU3dpcGUgZnJvbSAnZ21mL2ljb25zL3N3aXBlX3N2Zyc7XG5cbmV4cG9ydCBkZWZhdWx0IGA8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1saW5lLWRyYWdnYWJsZVwiPlxuICA8YnV0dG9uIGNsYXNzPVwibmdlby1zd2lwZS1jbG9zZSBidG4gcHJpbWUgYnRuLXNtXCIgbmctY2xpY2s9XCIkY3RybC5kZWFjdGl2YXRlKClcIj5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPlxuICA8L2J1dHRvbj5cbiAgPGRpdiBjbGFzcz1cIm5nZW8tc3dpcGUtbGluZVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1hcnJvd1wiPiR7c3ZnU3dpcGV9PC9kaXY+XG48L2Rpdj5gO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE5LTIwMjUgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8ganF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJhZ2dhYmxlIG11c3QgYmUgaW1wb3J0ZWQgYnkgeW91ciBtYWluIGNvbnRyb2xsZXIuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7bGlzdGVuLCB1bmxpc3RlbkJ5S2V5fSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IFJlbmRlckV2ZW50IGZyb20gJ29sL3JlbmRlci9FdmVudCc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vc3dpcGUuaHRtbCc7XG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9NYXBzd2lwZScsIFtdKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9zcmMvbWFwL3N3aXBlJywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vc3JjL21hcC9zd2lwZSc7XG4gIH0sXG4pO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFuZ3VsYXIuSUF0dHJpYnV0ZXMpOiBzdHJpbmd9IG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsIFRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xubmdlb01hcHN3aXBlVGVtcGxhdGVVcmwuJGluamVjdCA9IFsnJGF0dHJzJywgJ25nZW9NYXBzd2lwZVRlbXBsYXRlVXJsJ107XG5mdW5jdGlvbiBuZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG4vKipcbiAqIFRoZSBjb250cm9sbGVyIGZvciB0aGUgTWFwc3dpcGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgY2xhc3MgU3dpcGVDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAgICogQGNsYXNzXG4gICAqIEBoaWRkZW5cbiAgICogQG5nZG9jIGNvbnRyb2xsZXJcbiAgICogQG5nbmFtZSBuZ2VvTWFwc3dpcGVDb250cm9sbGVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICAgKi9cbiAgICB0aGlzLm1hcDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1dlYkdMVGlsZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVGlsZScpLmRlZmF1bHQ+fVxuICAgICAqL1xuICAgIHRoaXMubGF5ZXI7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5zd2lwZVZhbHVlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8gPSAkZWxlbWVudC5maW5kKCcubmdlby1zd2lwZS1saW5lLWRyYWdnYWJsZScpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuRXZlbnRzS2V5W119XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmxpc3RlbmVyS2V5c18gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSZXNpemVPYnNlcnZlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIGNvbnRyb2xsZXJcbiAgICovXG4gICRvbkluaXQoKSB7XG4gICAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB0aGlzLnN3aXBlVmFsdWUgPSB0aGlzLnN3aXBlVmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3dpcGVWYWx1ZSA6IDAuNTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ3ByZXJlbmRlcicsIHRoaXMuaGFuZGxlTGF5ZXJQcmVyZW5kZXJfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHRoaXMubGF5ZXIsICdwb3N0cmVuZGVyJywgdGhpcy5oYW5kbGVMYXllclBvc3RyZW5kZXJfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHRoaXMubGF5ZXIsICdjaGFuZ2U6dmlzaWJsZScsIHRoaXMuaGFuZGxlTGF5ZXJWaXNpYmxlQ2hhbmdlXywgdGhpcykpO1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKGxpc3Rlbih2aWV3LCAnY2hhbmdlOnJvdGF0aW9uJywgdGhpcy5oYW5kbGVWaWV3Um90YXRpb25DaGFuZ2VfLCB0aGlzKSk7XG4gICAgY29uc3QgaGFsZkRyYWdnYWJsZVdpZHRoID0gdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy53aWR0aCgpIC8gMjtcblxuICAgIC8vIFdoZW4gYmVnaW5uaW5nIHRvIHN3aXBlIGEgbGF5ZXIsIHJlc2V0IHRoZSB2aWV3IHJvdGF0aW9uXG4gICAgY29uc3Qgcm90YXRpb24gPSB2aWV3LmdldFJvdGF0aW9uKCk7XG4gICAgaWYgKHJvdGF0aW9uKSB7XG4gICAgICB2aWV3LnNldFJvdGF0aW9uKDApO1xuICAgIH1cbiAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLmRyYWdnYWJsZSh7XG4gICAgICBheGlzOiAneCcsXG4gICAgICBjb250YWlubWVudDogJ3BhcmVudCcsXG4gICAgICBkcmFnOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5wYXJlbnQoKS53aWR0aCgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucG9zaXRpb24oKS5sZWZ0ICsgaGFsZkRyYWdnYWJsZVdpZHRoO1xuICAgICAgICB0aGlzLnN3aXBlVmFsdWUgPSBwb3NpdGlvbiAvIHBhcmVudFdpZHRoO1xuICAgICAgICB0aGlzLm1hcC5yZW5kZXIoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBrZWVwIHRoZSBzYW1lIHBlcmNlbnRhZ2Ugd2hlbiB0aGUgcGFyZW50IGlzIHJlc2l6ZWRcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyXyA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucGFyZW50KCkud2lkdGgoKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8uY3NzKCdsZWZ0JywgcGFyZW50V2lkdGggKiB0aGlzLnN3aXBlVmFsdWUgLSBoYWxmRHJhZ2dhYmxlV2lkdGgpO1xuICAgIH0pO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfLm9ic2VydmUodGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5wYXJlbnQoKS5nZXQoMCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB5b3UgdG8gZGVhY3RpdmF0ZSB0aGUgc3dpcGVyIG9uIGNsaWNrIG9mIHRoZSBjbG9zZSBidXR0b24uXG4gICAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMubGF5ZXIgPSBudWxsO1xuICAgIHRoaXMubWFwLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fGltcG9ydCgnb2wvZXZlbnRzL0V2ZW50JykuZGVmYXVsdH0gZXZ0IE9wZW5MYXllcnMgb2JqZWN0IGV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlTGF5ZXJQcmVyZW5kZXJfKGV2dCkge1xuICAgIGlmICghKGV2dCBpbnN0YW5jZW9mIFJlbmRlckV2ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdHggPSBldnQuY29udGV4dDtcbiAgICBpZiAoIWN0eCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB3aWR0aCA9IGN0eC5jYW52YXMud2lkdGggKiB0aGlzLnN3aXBlVmFsdWU7XG4gICAgY29uc3QgaGVpZ2h0ID0gY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgaWYgKGN0eCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgY3R4LmNsaXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3R4IGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0XG4gICAgICB0aGlzLmZpeFdlYkdMQ29udGV4dFNjaXNzb3JDbGVhcihjdHgpO1xuICAgICAgY3R4LmVuYWJsZShjdHguU0NJU1NPUl9URVNUKTtcbiAgICAgIGN0eC5zY2lzc29yKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaWxsIG1vbmtleS1wYXRjaCB0aGUgY29udGV4dCB0byBtYWtlIHN1cmUgdGhhdCBjbGVhcigpIGNhbGxzIHdpbGwgbm90XG4gICAqIHRha2UgaW50byBhY2NvdW50IGFueSBzY2lzc29yIHRlc3QgcHJldmlvdXNseSBzZXQuXG4gICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCBXZWJHTCBDb250ZXh0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmaXhXZWJHTENvbnRleHRTY2lzc29yQ2xlYXIoZ2wpIHtcbiAgICBpZiAoZ2wuX3NjaXNzb3JDbGVhckZpeGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsZWFyRm4gPSBnbC5jbGVhcjtcbiAgICBnbC5jbGVhciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICBjb25zdCBzY2lzc29yRW5hYmxlZCA9IGdsLmdldFBhcmFtZXRlcihnbC5TQ0lTU09SX1RFU1QpO1xuICAgICAgc2Npc3NvckVuYWJsZWQgJiYgZ2wuZGlzYWJsZShnbC5TQ0lTU09SX1RFU1QpO1xuICAgICAgY2xlYXJGbi5hcHBseShnbCwgYXJncyk7XG4gICAgICBzY2lzc29yRW5hYmxlZCAmJiBnbC5lbmFibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICB9O1xuICAgIGdsLl9zY2lzc29yQ2xlYXJGaXhlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR8aW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0fSBldnQgT3BlbkxheWVycyBvYmplY3QgZXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVMYXllclBvc3RyZW5kZXJfKGV2dCkge1xuICAgIGlmIChldnQgaW5zdGFuY2VvZiBSZW5kZXJFdmVudCkge1xuICAgICAgY29uc3QgY3R4ID0gZXZ0LmNvbnRleHQ7XG4gICAgICBpZiAoIWN0eCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY3R4IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjdHggaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHRcbiAgICAgICAgY3R4LmRpc2FibGUoY3R4LlNDSVNTT1JfVEVTVCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBsYXllciBjaGFuZ2VzLiBJZiBpdCBpcyBubyBsb25nZXIgdmlzaWJsZSwgZGVhY3RpdmF0ZSB0aGUgc3dpcGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlTGF5ZXJWaXNpYmxlQ2hhbmdlXygpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXIuZ2V0VmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHJvdGF0aW9uIG9mIHRoZSB2aWV3IGNoYW5nZXMuIElmIHRoZSB2aWV3IGlzIHJvdGF0ZWQsIGRlYWN0aXZhdGUgdGhlIHN3aXBlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVZpZXdSb3RhdGlvbkNoYW5nZV8oKSB7XG4gICAgaWYgKHRoaXMubWFwLmdldFZpZXcoKS5nZXRSb3RhdGlvbigpKSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cbiAgJG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18uZm9yRWFjaCh1bmxpc3RlbkJ5S2V5KTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLmRyYWdnYWJsZSgnZGVzdHJveScpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcbiAgfVxufVxuU3dpcGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCddO1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvTWFwc3dpcGUnLCB7XG4gIGNvbnRyb2xsZXI6IFN3aXBlQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICBtYXA6ICc8JyxcbiAgICBsYXllcjogJz0nLFxuICAgIHN3aXBlVmFsdWU6ICc9JyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsLFxufSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1hcHN3aXBlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9tYXBzd2lwZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==