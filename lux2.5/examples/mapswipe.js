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
/* harmony import */ var ngeo_map_swipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/swipe.js */ "./src/map/swipe.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");








var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_map_swipe_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

function MainController() {
  var openStreetMapLayer = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__["default"]()
  });
  this.openSeaMapLayer = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      attributions: ['All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>', ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__["ATTRIBUTION"]],
      opaque: false,
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
    })
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [openStreetMapLayer, this.openSeaMapLayer],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
      center: [-244780.24508882355, 5986452.183179816],
      zoom: 15
    })
  });
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./node_modules/ol/render/Event.js":
/*!*****************************************************************************!*\
  !*** delegated ./node_modules/ol/render/Event.js from dll-reference vendor ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(365);

/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************************************************!*\
  !*** delegated ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js from dll-reference vendor ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1052);

/***/ }),

/***/ "./src/icons/swipe.svg?viewbox&height=1em":
/*!************************************************!*\
  !*** ./src/icons/swipe.svg?viewbox&height=1em ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" data-prefix=\"fas\" data-icon=\"sort\" class=\"svg-inline--fa fa-sort fa-w-10\" viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\"><path d=\"M9.286 12.783V3.217c0-.86 1.041-1.29 1.648-.683l4.783 4.783a.96.96 0 010 1.362l-4.783 4.787c-.607.607-1.648.177-1.648-.683zM5.066 2.534L.283 7.317a.96.96 0 000 1.362l4.783 4.787c.607.607 1.648.177 1.648-.683V3.217c0-.86-1.041-1.29-1.648-.683z\" fill=\"currentColor\"></path></svg>"

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_render_Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/render/Event.js */ "./node_modules/ol/render/Event.js");
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery-ui/ui/widgets/draggable.js */ "./node_modules/jquery-ui/ui/widgets/draggable.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_4__);





var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMapswipe', []);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/src/map/swipe', __webpack_require__(/*! ./swipe.html */ "./src/map/swipe.html"));
}]);
module.value('ngeoMapswipeTemplateUrl', function ($attrs) {
  var templateUrl = $attrs.ngeoMapswipeTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/src/map/swipe';
});
ngeoMapswipeTemplateUrl.$inject = ["$attrs", "ngeoMapswipeTemplateUrl"];

function ngeoMapswipeTemplateUrl($attrs, ngeoMapswipeTemplateUrl) {
  return ngeoMapswipeTemplateUrl($attrs);
}

var SwipeController = function () {
  SwipeController.$inject = ["$scope", "$element", "$injector"];

  function SwipeController($scope, $element, $injector) {
    this.map;
    this.layer;
    this.scope_ = $scope;
    this.swipeValue;
    this.draggableElement_ = $element.find('.ngeo-swipe-line-draggable');
    this.listenerKeys_ = [];
    this.resizeObserver_;
  }

  var _proto = SwipeController.prototype;

  _proto.$onInit = function $onInit() {
    var _this = this;

    var view = this.map.getView();
    this.swipeValue = this.swipeValue !== undefined ? this.swipeValue : 0.5;
    this.listenerKeys_.push(Object(ol_events_js__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'prerender', this.handleLayerPrerender_, this));
    this.listenerKeys_.push(Object(ol_events_js__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'postrender', this.handleLayerPostrender_, this));
    this.listenerKeys_.push(Object(ol_events_js__WEBPACK_IMPORTED_MODULE_1__["listen"])(this.layer, 'change:visible', this.handleLayerVisibleChange_, this));
    this.listenerKeys_.push(Object(ol_events_js__WEBPACK_IMPORTED_MODULE_1__["listen"])(view, 'change:rotation', this.handleViewRotationChange_, this));
    var halfDraggableWidth = this.draggableElement_.width() / 2;
    var rotation = view.getRotation();

    if (rotation) {
      view.setRotation(0);
    }

    this.draggableElement_.draggable({
      axis: 'x',
      containment: 'parent',
      drag: function drag() {
        var parentWidth = _this.draggableElement_.parent().width();

        var position = _this.draggableElement_.position().left + halfDraggableWidth;
        _this.swipeValue = position / parentWidth;

        _this.map.render();
      }
    });
    this.resizeObserver_ = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_3__["default"](function () {
      var parentWidth = _this.draggableElement_.parent().width();

      _this.draggableElement_.css('left', parentWidth * _this.swipeValue - halfDraggableWidth);
    });
    this.resizeObserver_.observe(this.draggableElement_.parent().get(0));
  };

  _proto.deactivate = function deactivate() {
    this.layer = null;
    this.map.render();
  };

  _proto.handleLayerPrerender_ = function handleLayerPrerender_(evt) {
    if (!(evt instanceof ol_render_Event_js__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      return;
    }

    var ctx = evt.context;

    if (!ctx) {
      return;
    }

    var width = ctx.canvas.width * this.swipeValue;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, ctx.canvas.height);
    ctx.clip();
  };

  _proto.handleLayerPostrender_ = function handleLayerPostrender_(evt) {
    if (evt instanceof ol_render_Event_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      var ctx = evt.context;

      if (!ctx) {
        return;
      }

      ctx.restore();
    }
  };

  _proto.handleLayerVisibleChange_ = function handleLayerVisibleChange_() {
    if (!this.layer.getVisible()) {
      this.deactivate();
    }
  };

  _proto.handleViewRotationChange_ = function handleViewRotationChange_() {
    if (this.map.getView().getRotation()) {
      this.deactivate();
    }
  };

  _proto.$onDestroy = function $onDestroy() {
    this.listenerKeys_.forEach(ol_events_js__WEBPACK_IMPORTED_MODULE_1__["unlistenByKey"]);
    this.listenerKeys_.length = 0;
    this.draggableElement_.draggable('destroy');
    this.resizeObserver_.disconnect();
  };

  return SwipeController;
}();

module.component('ngeoMapswipe', {
  controller: SwipeController,
  bindings: {
    map: '<',
    layer: '=',
    swipeValue: '='
  },
  templateUrl: ngeoMapswipeTemplateUrl
});
/* harmony default export */ __webpack_exports__["default"] = (module);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc3dpcGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvbWFwc3dpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ljb25zL3N3aXBlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL3N3aXBlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9zd2lwZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFwc3dpcGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMjMsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0ICcuL21hcHN3aXBlLmNzcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwc3dpcGVNb2R1bGUgZnJvbSAnbmdlby9tYXAvc3dpcGUuanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sU291cmNlT1NNLCB7IEFUVFJJQlVUSU9OIH0gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9NYXBzd2lwZU1vZHVsZS5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuICB2YXIgb3BlblN0cmVldE1hcExheWVyID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gIH0pO1xuICB0aGlzLm9wZW5TZWFNYXBMYXllciA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oe1xuICAgICAgYXR0cmlidXRpb25zOiBbJ0FsbCBtYXBzIMKpIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zZWFtYXAub3JnL1wiPk9wZW5TZWFNYXA8L2E+JywgQVRUUklCVVRJT05dLFxuICAgICAgb3BhcXVlOiBmYWxzZSxcbiAgICAgIHVybDogJ2h0dHBzOi8vdGlsZXMub3BlbnNlYW1hcC5vcmcvc2VhbWFyay97en0ve3h9L3t5fS5wbmcnXG4gICAgfSlcbiAgfSk7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtvcGVuU3RyZWV0TWFwTGF5ZXIsIHRoaXMub3BlblNlYU1hcExheWVyXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWy0yNDQ3ODAuMjQ1MDg4ODIzNTUsIDU5ODY0NTIuMTgzMTc5ODE2XSxcbiAgICAgIHpvb206IDE1XG4gICAgfSlcbiAgfSk7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBkYXRhLXByZWZpeD1cXFwiZmFzXFxcIiBkYXRhLWljb249XFxcInNvcnRcXFwiIGNsYXNzPVxcXCJzdmctaW5saW5lLS1mYSBmYS1zb3J0IGZhLXctMTBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCIgd2lkdGg9XFxcIjFlbVxcXCIgaGVpZ2h0PVxcXCIxZW1cXFwiPjxwYXRoIGQ9XFxcIk05LjI4NiAxMi43ODNWMy4yMTdjMC0uODYgMS4wNDEtMS4yOSAxLjY0OC0uNjgzbDQuNzgzIDQuNzgzYS45Ni45NiAwIDAxMCAxLjM2MmwtNC43ODMgNC43ODdjLS42MDcuNjA3LTEuNjQ4LjE3Ny0xLjY0OC0uNjgzek01LjA2NiAyLjUzNEwuMjgzIDcuMzE3YS45Ni45NiAwIDAwMCAxLjM2Mmw0Ljc4MyA0Ljc4N2MuNjA3LjYwNyAxLjY0OC4xNzcgMS42NDgtLjY4M1YzLjIxN2MwLS44Ni0xLjA0MS0xLjI5LTEuNjQ4LS42ODN6XFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiPjwvcGF0aD48L3N2Zz5cIiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJuZ2VvLXN3aXBlLWxpbmUtZHJhZ2dhYmxlXCI+XFxuICA8YnV0dG9uIGNsYXNzPVwibmdlby1zd2lwZS1jbG9zZSBidG4gcHJpbWUgYnRuLXNtXCIgbmctY2xpY2s9XCIkY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XFxuICA8L2J1dHRvbj5cXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXN3aXBlLWxpbmVcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXN3aXBlLWFycm93XCI+JyArXG4oKF9fdCA9IChyZXF1aXJlKCduZ2VvL2ljb25zL3N3aXBlLnN2Zz92aWV3Ym94JmhlaWdodD0xZW0nKSkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJzwvZGl2PlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7IGxpc3RlbiwgdW5saXN0ZW5CeUtleSB9IGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgUmVuZGVyRXZlbnQgZnJvbSAnb2wvcmVuZGVyL0V2ZW50LmpzJztcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuaW1wb3J0ICdqcXVlcnktdWkvdWkvd2lkZ2V0cy9kcmFnZ2FibGUuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvTWFwc3dpcGUnLCBbXSk7XG5tb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vc3JjL21hcC9zd2lwZScsIHJlcXVpcmUoJy4vc3dpcGUuaHRtbCcpKTtcbn1dKTtcbm1vZHVsZS52YWx1ZSgnbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoJGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL3NyYy9tYXAvc3dpcGUnO1xufSk7XG5uZ2VvTWFwc3dpcGVUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb01hcHN3aXBlVGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsKCRhdHRycywgbmdlb01hcHN3aXBlVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbnZhciBTd2lwZUNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN3aXBlQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJGVsZW1lbnRcIiwgXCIkaW5qZWN0b3JcIl07XG5cbiAgZnVuY3Rpb24gU3dpcGVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRpbmplY3Rvcikge1xuICAgIHRoaXMubWFwO1xuICAgIHRoaXMubGF5ZXI7XG4gICAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gICAgdGhpcy5zd2lwZVZhbHVlO1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8gPSAkZWxlbWVudC5maW5kKCcubmdlby1zd2lwZS1saW5lLWRyYWdnYWJsZScpO1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXyA9IFtdO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXJfO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFN3aXBlQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLiRvbkluaXQgPSBmdW5jdGlvbiAkb25Jbml0KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB0aGlzLnN3aXBlVmFsdWUgPSB0aGlzLnN3aXBlVmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3dpcGVWYWx1ZSA6IDAuNTtcbiAgICB0aGlzLmxpc3RlbmVyS2V5c18ucHVzaChsaXN0ZW4odGhpcy5sYXllciwgJ3ByZXJlbmRlcicsIHRoaXMuaGFuZGxlTGF5ZXJQcmVyZW5kZXJfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHRoaXMubGF5ZXIsICdwb3N0cmVuZGVyJywgdGhpcy5oYW5kbGVMYXllclBvc3RyZW5kZXJfLCB0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLnB1c2gobGlzdGVuKHRoaXMubGF5ZXIsICdjaGFuZ2U6dmlzaWJsZScsIHRoaXMuaGFuZGxlTGF5ZXJWaXNpYmxlQ2hhbmdlXywgdGhpcykpO1xuICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKGxpc3Rlbih2aWV3LCAnY2hhbmdlOnJvdGF0aW9uJywgdGhpcy5oYW5kbGVWaWV3Um90YXRpb25DaGFuZ2VfLCB0aGlzKSk7XG4gICAgdmFyIGhhbGZEcmFnZ2FibGVXaWR0aCA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ud2lkdGgoKSAvIDI7XG4gICAgdmFyIHJvdGF0aW9uID0gdmlldy5nZXRSb3RhdGlvbigpO1xuXG4gICAgaWYgKHJvdGF0aW9uKSB7XG4gICAgICB2aWV3LnNldFJvdGF0aW9uKDApO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8uZHJhZ2dhYmxlKHtcbiAgICAgIGF4aXM6ICd4JyxcbiAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICAgIGRyYWc6IGZ1bmN0aW9uIGRyYWcoKSB7XG4gICAgICAgIHZhciBwYXJlbnRXaWR0aCA9IF90aGlzLmRyYWdnYWJsZUVsZW1lbnRfLnBhcmVudCgpLndpZHRoKCk7XG5cbiAgICAgICAgdmFyIHBvc2l0aW9uID0gX3RoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucG9zaXRpb24oKS5sZWZ0ICsgaGFsZkRyYWdnYWJsZVdpZHRoO1xuICAgICAgICBfdGhpcy5zd2lwZVZhbHVlID0gcG9zaXRpb24gLyBwYXJlbnRXaWR0aDtcblxuICAgICAgICBfdGhpcy5tYXAucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcl8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBhcmVudFdpZHRoID0gX3RoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucGFyZW50KCkud2lkdGgoKTtcblxuICAgICAgX3RoaXMuZHJhZ2dhYmxlRWxlbWVudF8uY3NzKCdsZWZ0JywgcGFyZW50V2lkdGggKiBfdGhpcy5zd2lwZVZhbHVlIC0gaGFsZkRyYWdnYWJsZVdpZHRoKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyXy5vYnNlcnZlKHRoaXMuZHJhZ2dhYmxlRWxlbWVudF8ucGFyZW50KCkuZ2V0KDApKTtcbiAgfTtcblxuICBfcHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5sYXllciA9IG51bGw7XG4gICAgdGhpcy5tYXAucmVuZGVyKCk7XG4gIH07XG5cbiAgX3Byb3RvLmhhbmRsZUxheWVyUHJlcmVuZGVyXyA9IGZ1bmN0aW9uIGhhbmRsZUxheWVyUHJlcmVuZGVyXyhldnQpIHtcbiAgICBpZiAoIShldnQgaW5zdGFuY2VvZiBSZW5kZXJFdmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY3R4ID0gZXZ0LmNvbnRleHQ7XG5cbiAgICBpZiAoIWN0eCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB3aWR0aCA9IGN0eC5jYW52YXMud2lkdGggKiB0aGlzLnN3aXBlVmFsdWU7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoMCwgMCwgd2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguY2xpcCgpO1xuICB9O1xuXG4gIF9wcm90by5oYW5kbGVMYXllclBvc3RyZW5kZXJfID0gZnVuY3Rpb24gaGFuZGxlTGF5ZXJQb3N0cmVuZGVyXyhldnQpIHtcbiAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVuZGVyRXZlbnQpIHtcbiAgICAgIHZhciBjdHggPSBldnQuY29udGV4dDtcblxuICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaGFuZGxlTGF5ZXJWaXNpYmxlQ2hhbmdlXyA9IGZ1bmN0aW9uIGhhbmRsZUxheWVyVmlzaWJsZUNoYW5nZV8oKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyLmdldFZpc2libGUoKSkge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5oYW5kbGVWaWV3Um90YXRpb25DaGFuZ2VfID0gZnVuY3Rpb24gaGFuZGxlVmlld1JvdGF0aW9uQ2hhbmdlXygpIHtcbiAgICBpZiAodGhpcy5tYXAuZ2V0VmlldygpLmdldFJvdGF0aW9uKCkpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLmZvckVhY2godW5saXN0ZW5CeUtleSk7XG4gICAgdGhpcy5saXN0ZW5lcktleXNfLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50Xy5kcmFnZ2FibGUoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyXy5kaXNjb25uZWN0KCk7XG4gIH07XG5cbiAgcmV0dXJuIFN3aXBlQ29udHJvbGxlcjtcbn0oKTtcblxubW9kdWxlLmNvbXBvbmVudCgnbmdlb01hcHN3aXBlJywge1xuICBjb250cm9sbGVyOiBTd2lwZUNvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgbWFwOiAnPCcsXG4gICAgbGF5ZXI6ICc9JyxcbiAgICBzd2lwZVZhbHVlOiAnPSdcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9NYXBzd2lwZVRlbXBsYXRlVXJsXG59KTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==