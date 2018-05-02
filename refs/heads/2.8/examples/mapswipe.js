/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"mapswipe": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([23,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/mapswipe.css":
/*!*******************************!*\
  !*** ./examples/mapswipe.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/mapswipe.js":
/*!******************************!*\
  !*** ./examples/mapswipe.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mapswipe_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapswipe.css */ "./examples/mapswipe.css");
/* harmony import */ var _mapswipe_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mapswipe_css__WEBPACK_IMPORTED_MODULE_0__);
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_map_swipe__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

/**
 * @class
 * @ngInject
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
      attributions: ['All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>', ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["ATTRIBUTION"]],
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
Object(_options__WEBPACK_IMPORTED_MODULE_4__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./node_modules/ol/render.js":
/*!***********************************************************************!*\
  !*** delegated ./node_modules/ol/render.js from dll-reference vendor ***!
  \***********************************************************************/
/*! exports provided: toContext, getVectorContext, getRenderPixel */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1828);

/***/ }),

/***/ "./node_modules/ol/render/Event.js":
/*!*****************************************************************************!*\
  !*** delegated ./node_modules/ol/render/Event.js from dll-reference vendor ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(325);

/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************************************************!*\
  !*** delegated ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js from dll-reference vendor ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1834);

/***/ }),

/***/ "./src/map/swipe.html":
/*!****************************!*\
  !*** ./src/map/swipe.html ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-swipe-line-draggable">\n  <button class="ngeo-swipe-close btn prime btn-sm" ng-click="$ctrl.deactivate()">\n    <i class="fas fa-times"></i>\n  </button>\n  <div class="ngeo-swipe-line"></div>\n  <div class="ngeo-swipe-arrow">' +
((__t = (__webpack_require__(/*! ngeo/icons/swipe.svg?viewbox&height=1em */ "./src/icons/swipe.svg?viewbox&height=1em"))) == null ? '' : __t) +
'</div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/map/swipe.js":
/*!**************************!*\
  !*** ./src/map/swipe.js ***!
  \**************************/
/*! exports provided: SwipeController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeController", function() { return SwipeController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_render_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/render/Event */ "./node_modules/ol/render/Event.js");
/* harmony import */ var ol_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/render.js */ "./node_modules/ol/render.js");
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery-ui/ui/widgets/draggable */ "./node_modules/jquery-ui/ui/widgets/draggable.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_draggable__WEBPACK_IMPORTED_MODULE_5__);






const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMapswipe', []);
myModule.run(["$templateCache", $templateCache => {
  $templateCache.put('ngeo/src/map/swipe', __webpack_require__(/*! ./swipe.html */ "./src/map/swipe.html"));
}]);
myModule.value('ngeoMapswipeTemplateUrl', $attrs => {
  const templateUrl = $attrs.ngeoMapswipeTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/src/map/swipe';
});
ngeoMapswipeTemplateUrl.$inject = ["$attrs", "ngeoMapswipeTemplateUrl"];
function ngeoMapswipeTemplateUrl($attrs, ngeoMapswipeTemplateUrl) {
  return ngeoMapswipeTemplateUrl($attrs);
}
class SwipeController {
  constructor($scope, $element) {
    this.map;
    this.layer;
    this.scope_ = $scope;
    this.swipeValue;
    this.draggableElement_ = $element.find('.ngeo-swipe-line-draggable');
    this.listenerKeys_ = [];
    this.resizeObserver_;
  }
  $onInit() {
    const view = this.map.getView();
    this.swipeValue = this.swipeValue !== undefined ? this.swipeValue : 0.5;
    this.listenerKeys_.push(Object(ol_events__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.listenerKeys_.push(Object(ol_events__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'postrender', this.handleLayerPostrender_, this));
    this.listenerKeys_.push(Object(ol_events__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'change:visible', this.handleLayerVisibleChange_, this));
    this.listenerKeys_.push(Object(ol_events__WEBPACK_IMPORTED_MODULE_1__["listen"])(view, 'change:rotation', this.handleViewRotationChange_, this));
    const halfDraggableWidth = this.draggableElement_.width() / 2;
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
      }
    });
    this.resizeObserver_ = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__["default"](() => {
      const parentWidth = this.draggableElement_.parent().width();
      this.draggableElement_.css('left', parentWidth * this.swipeValue - halfDraggableWidth);
    });
    this.resizeObserver_.observe(this.draggableElement_.parent().get(0));
  }
  deactivate() {
    this.layer = null;
    this.map.render();
  }
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
      this.fixWebGLContextScissorClear(ctx);
      ctx.enable(ctx.SCISSOR_TEST);
      ctx.scissor(0, 0, width, height);
    }
  }
  fixWebGLContextScissorClear(gl) {
    if (gl._scissorClearFixed) {
      return;
    }
    const clearFn = gl.clear;
    gl.clear = function () {
      const scissorEnabled = gl.getParameter(gl.SCISSOR_TEST);
      scissorEnabled && gl.disable(gl.SCISSOR_TEST);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      clearFn.apply(gl, args);
      scissorEnabled && gl.enable(gl.SCISSOR_TEST);
    };
    gl._scissorClearFixed = true;
  }
  handleLayerPostrender_(evt) {
    if (evt instanceof ol_render_Event__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      const ctx = evt.context;
      if (!ctx) {
        return;
      }
      if (ctx instanceof CanvasRenderingContext2D) {
        ctx.restore();
      } else {
        ctx.disable(ctx.SCISSOR_TEST);
      }
    }
  }
  handleLayerVisibleChange_() {
    if (!this.layer.getVisible()) {
      this.deactivate();
    }
  }
  handleViewRotationChange_() {
    if (this.map.getView().getRotation()) {
      this.deactivate();
    }
  }
  $onDestroy() {
    this.listenerKeys_.forEach(ol_events__WEBPACK_IMPORTED_MODULE_1__["unlistenByKey"]);
    this.listenerKeys_.length = 0;
    this.draggableElement_.draggable('destroy');
    this.resizeObserver_.disconnect();
  }
}
SwipeController.$inject = ["$scope", "$element"];
myModule.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '=',
    swipeValue: '='
  },
  templateUrl: ngeoMapswipeTemplateUrl
});
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 23:
/*!*****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mapswipe.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/mapswipe.js */"./examples/mapswipe.js");


/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc3dpcGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvbWFwc3dpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9zd2lwZS5odG1sIiwid2VicGFjazovLy8uL3NyYy9tYXAvc3dpcGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1hcHN3aXBlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsyMyxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTktMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vbWFwc3dpcGUuY3NzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NYXBzd2lwZU1vZHVsZSBmcm9tICduZ2VvL21hcC9zd2lwZSc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sU291cmNlT1NNLCB7QVRUUklCVVRJT059IGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIG5nZW9NYXBzd2lwZU1vZHVsZS5uYW1lXSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIGNvbnN0IG9wZW5TdHJlZXRNYXBMYXllciA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1dlYkdMVGlsZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVGlsZScpLmRlZmF1bHQ+fVxuICAgKi9cbiAgdGhpcy5vcGVuU2VhTWFwTGF5ZXIgPSBuZXcgb2xMYXllclRpbGUoe1xuICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKHtcbiAgICAgIGF0dHJpYnV0aW9uczogWydBbGwgbWFwcyDCqSA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVuc2VhbWFwLm9yZy9cIj5PcGVuU2VhTWFwPC9hPicsIEFUVFJJQlVUSU9OXSxcbiAgICAgIG9wYXF1ZTogZmFsc2UsXG4gICAgICB1cmw6ICdodHRwczovL3RpbGVzLm9wZW5zZWFtYXAub3JnL3NlYW1hcmsve3p9L3t4fS97eX0ucG5nJyxcbiAgICB9KSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbb3BlblN0cmVldE1hcExheWVyLCB0aGlzLm9wZW5TZWFNYXBMYXllcl0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFstMjQ0NzgwLjI0NTA4ODgyMzU1LCA1OTg2NDUyLjE4MzE3OTgxNl0sXG4gICAgICB6b29tOiAxNSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgdGhpcy5nbWZMYXllckJlaW5nU3dpcGUgPSB7XG4gICAgbGF5ZXI6IHRoaXMub3BlblNlYU1hcExheWVyLFxuICAgIHN3aXBlVmFsdWU6IDAuNSxcbiAgfTtcbn1cblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5vcHRpb25zKG15TW9kdWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1saW5lLWRyYWdnYWJsZVwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cIm5nZW8tc3dpcGUtY2xvc2UgYnRuIHByaW1lIGJ0bi1zbVwiIG5nLWNsaWNrPVwiJGN0cmwuZGVhY3RpdmF0ZSgpXCI+XFxuICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxcbiAgPC9idXR0b24+XFxuICA8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1saW5lXCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibmdlby1zd2lwZS1hcnJvd1wiPicgK1xuKChfX3QgPSAocmVxdWlyZSgnbmdlby9pY29ucy9zd2lwZS5zdmc/dmlld2JveCZoZWlnaHQ9MWVtJykpKSA9PSBudWxsID8gJycgOiBfX3QpICtcbic8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgeyBsaXN0ZW4sIHVubGlzdGVuQnlLZXkgfSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IFJlbmRlckV2ZW50IGZyb20gJ29sL3JlbmRlci9FdmVudCc7XG5pbXBvcnQgeyBnZXRSZW5kZXJQaXhlbCB9IGZyb20gJ29sL3JlbmRlci5qcyc7XG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJhZ2dhYmxlJztcbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9NYXBzd2lwZScsIFtdKTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCAkdGVtcGxhdGVDYWNoZSA9PiB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9zcmMvbWFwL3N3aXBlJywgcmVxdWlyZSgnLi9zd2lwZS5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9NYXBzd2lwZVRlbXBsYXRlVXJsJywgJGF0dHJzID0+IHtcbiAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb01hcHN3aXBlVGVtcGxhdGVVcmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9zcmMvbWFwL3N3aXBlJztcbn0pO1xubmdlb01hcHN3aXBlVGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRhdHRyc1wiLCBcIm5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cbmV4cG9ydCBjbGFzcyBTd2lwZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgdGhpcy5tYXA7XG4gICAgdGhpcy5sYXllcjtcbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcbiAgICB0aGlzLnN3aXBlVmFsdWU7XG4gICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50XyA9ICRlbGVtZW50LmZpbmQoJy5uZ2VvLXN3aXBlLWxpbmUtZHJhZ2dhYmxlJyk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfID0gW107XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl87XG4gIH1cbiAgJG9uSW5pdCgpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHRoaXMuc3dpcGVWYWx1ZSA9IHRoaXMuc3dpcGVWYWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zd2lwZVZhbHVlIDogMC41O1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKGxpc3Rlbih0aGlzLmxheWVyLCAncHJlcmVuZGVyJywgdGhpcy5oYW5kbGVMYXllclByZXJlbmRlcl8sIHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ3Bvc3RyZW5kZXInLCB0aGlzLmhhbmRsZUxheWVyUG9zdHJlbmRlcl8sIHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ2NoYW5nZTp2aXNpYmxlJywgdGhpcy5oYW5kbGVMYXllclZpc2libGVDaGFuZ2VfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHZpZXcsICdjaGFuZ2U6cm90YXRpb24nLCB0aGlzLmhhbmRsZVZpZXdSb3RhdGlvbkNoYW5nZV8sIHRoaXMpKTtcbiAgICBjb25zdCBoYWxmRHJhZ2dhYmxlV2lkdGggPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLndpZHRoKCkgLyAyO1xuICAgIGNvbnN0IHJvdGF0aW9uID0gdmlldy5nZXRSb3RhdGlvbigpO1xuICAgIGlmIChyb3RhdGlvbikge1xuICAgICAgdmlldy5zZXRSb3RhdGlvbigwKTtcbiAgICB9XG4gICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5kcmFnZ2FibGUoe1xuICAgICAgYXhpczogJ3gnLFxuICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnLFxuICAgICAgZHJhZzogKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucGFyZW50KCkud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLnBvc2l0aW9uKCkubGVmdCArIGhhbGZEcmFnZ2FibGVXaWR0aDtcbiAgICAgICAgdGhpcy5zd2lwZVZhbHVlID0gcG9zaXRpb24gLyBwYXJlbnRXaWR0aDtcbiAgICAgICAgdGhpcy5tYXAucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50V2lkdGggPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLnBhcmVudCgpLndpZHRoKCk7XG4gICAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLmNzcygnbGVmdCcsIHBhcmVudFdpZHRoICogdGhpcy5zd2lwZVZhbHVlIC0gaGFsZkRyYWdnYWJsZVdpZHRoKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyXy5vYnNlcnZlKHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucGFyZW50KCkuZ2V0KDApKTtcbiAgfVxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMubGF5ZXIgPSBudWxsO1xuICAgIHRoaXMubWFwLnJlbmRlcigpO1xuICB9XG4gIGhhbmRsZUxheWVyUHJlcmVuZGVyXyhldnQpIHtcbiAgICBpZiAoIShldnQgaW5zdGFuY2VvZiBSZW5kZXJFdmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3R4ID0gZXZ0LmNvbnRleHQ7XG4gICAgaWYgKCFjdHgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2lkdGggPSBjdHguY2FudmFzLndpZHRoICogdGhpcy5zd2lwZVZhbHVlO1xuICAgIGNvbnN0IGhlaWdodCA9IGN0eC5jYW52YXMuaGVpZ2h0O1xuICAgIGlmIChjdHggaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIGN0eC5jbGlwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZml4V2ViR0xDb250ZXh0U2Npc3NvckNsZWFyKGN0eCk7XG4gICAgICBjdHguZW5hYmxlKGN0eC5TQ0lTU09SX1RFU1QpO1xuICAgICAgY3R4LnNjaXNzb3IoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XG4gIGZpeFdlYkdMQ29udGV4dFNjaXNzb3JDbGVhcihnbCkge1xuICAgIGlmIChnbC5fc2Npc3NvckNsZWFyRml4ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2xlYXJGbiA9IGdsLmNsZWFyO1xuICAgIGdsLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc2Npc3NvckVuYWJsZWQgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICAgIHNjaXNzb3JFbmFibGVkICYmIGdsLmRpc2FibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgY2xlYXJGbi5hcHBseShnbCwgYXJncyk7XG4gICAgICBzY2lzc29yRW5hYmxlZCAmJiBnbC5lbmFibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICB9O1xuICAgIGdsLl9zY2lzc29yQ2xlYXJGaXhlZCA9IHRydWU7XG4gIH1cbiAgaGFuZGxlTGF5ZXJQb3N0cmVuZGVyXyhldnQpIHtcbiAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVuZGVyRXZlbnQpIHtcbiAgICAgIGNvbnN0IGN0eCA9IGV2dC5jb250ZXh0O1xuICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGN0eCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmRpc2FibGUoY3R4LlNDSVNTT1JfVEVTVCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZUxheWVyVmlzaWJsZUNoYW5nZV8oKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyLmdldFZpc2libGUoKSkge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVZpZXdSb3RhdGlvbkNoYW5nZV8oKSB7XG4gICAgaWYgKHRoaXMubWFwLmdldFZpZXcoKS5nZXRSb3RhdGlvbigpKSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cbiAgJG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18uZm9yRWFjaCh1bmxpc3RlbkJ5S2V5KTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnRfLmRyYWdnYWJsZSgnZGVzdHJveScpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcbiAgfVxufVxuU3dpcGVDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZWxlbWVudFwiXTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb01hcHN3aXBlJywge1xuICBjb250cm9sbGVyOiBTd2lwZUNvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgbWFwOiAnPCcsXG4gICAgbGF5ZXI6ICc9JyxcbiAgICBzd2lwZVZhbHVlOiAnPSdcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsXG59KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=