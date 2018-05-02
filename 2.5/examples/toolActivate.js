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
/******/ 		"toolActivate": 0
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
/******/ 	deferredModules.push([43,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/toolActivate.css":
/*!***********************************!*\
  !*** ./examples/toolActivate.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/toolActivate.js":
/*!**********************************!*\
  !*** ./examples/toolActivate.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toolActivate_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolActivate.css */ "./examples/toolActivate.css");
/* harmony import */ var _toolActivate_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_toolActivate_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/ToolActivate.js */ "./src/misc/ToolActivate.js");
/* harmony import */ var ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr.js */ "./src/misc/ToolActivateMgr.js");
/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Collection.js */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_coordinate_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/coordinate.js */ "./node_modules/ol/coordinate.js");
/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/interaction/Draw.js */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
MainController.$inject = ["ngeoFeatureOverlayMgr", "ngeoToolActivateMgr"];


















var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

function MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {
  var _this = this;

  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      center: [1444682, 5979706],
      zoom: 4
    })
  });
  var map = this.map;
  ngeoFeatureOverlayMgr.init(map);
  var features = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
      radius: 7,
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
        color: '#ffcc33'
      })
    })
  }));
  this.mapClickIsEnabled = true;
  var content = document.getElementById('popup-content');

  if (!content) {
    throw new Error('Missing content');
  }

  this.map.on('singleclick', function (evt) {
    if (_this.mapClickIsEnabled) {
      var c = ol_coordinate_js__WEBPACK_IMPORTED_MODULE_10__["toStringXY"](evt.coordinate);
      content.innerHTML = "<p>You clicked here: <code>" + c + "</code></p>";
    }
  });
  var mapClickTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__["default"](this, 'mapClickIsEnabled');
  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);
  this.drawPoint = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
    type: 'Point',
    features: features
  });
  this.drawPoint.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawPoint);
  map.addInteraction(this.drawPoint);
  var drawPointTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.drawPoint, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);
  this.drawLine = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
    type: 'LineString',
    features: features
  });
  this.drawLine.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawLine);
  map.addInteraction(this.drawLine);
  var drawLineTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.drawLine, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);
  this.drawPolygon = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
    type: 'Polygon',
    features: features
  });
  this.drawPolygon.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawPolygon);
  map.addInteraction(this.drawPolygon);
  var drawPolygonTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.drawPolygon, 'active');
  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 43:
/*!*********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/toolActivate.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/toolActivate.js */"./examples/toolActivate.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbEFjdGl2YXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3Rvb2xBY3RpdmF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwidG9vbEFjdGl2YXRlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzQzLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvRmVhdHVyZU92ZXJsYXlNZ3JcIiwgXCJuZ2VvVG9vbEFjdGl2YXRlTWdyXCJdO1xuaW1wb3J0ICcuL3Rvb2xBY3RpdmF0ZS5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQuanMnO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZSBmcm9tICduZ2VvL21pc2MvVG9vbEFjdGl2YXRlLmpzJztcbmltcG9ydCBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZU1nciBmcm9tICduZ2VvL21pc2MvVG9vbEFjdGl2YXRlTWdyLmpzJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbi5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgKiBhcyBvbENvb3JkaW5hdGUgZnJvbSAnb2wvY29vcmRpbmF0ZS5qcyc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkRyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9NaXNjQnRuQ29tcG9uZW50Lm5hbWUsIG5nZW9NaXNjVG9vbEFjdGl2YXRlTWdyLm5hbWVdKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIobmdlb0ZlYXR1cmVPdmVybGF5TWdyLCBuZ2VvVG9vbEFjdGl2YXRlTWdyKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMTQ0NDY4MiwgNTk3OTcwNl0sXG4gICAgICB6b29tOiA0XG4gICAgfSlcbiAgfSk7XG4gIHZhciBtYXAgPSB0aGlzLm1hcDtcbiAgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLmluaXQobWFwKTtcbiAgdmFyIGZlYXR1cmVzID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICB2YXIgb3ZlcmxheSA9IG5nZW9GZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBvdmVybGF5LnNldEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgb3ZlcmxheS5zZXRTdHlsZShuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXG4gICAgfSksXG4gICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICBjb2xvcjogJyNmZmNjMzMnLFxuICAgICAgd2lkdGg6IDJcbiAgICB9KSxcbiAgICBpbWFnZTogbmV3IG9sU3R5bGVDaXJjbGUoe1xuICAgICAgcmFkaXVzOiA3LFxuICAgICAgZmlsbDogbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgICAgY29sb3I6ICcjZmZjYzMzJ1xuICAgICAgfSlcbiAgICB9KVxuICB9KSk7XG4gIHRoaXMubWFwQ2xpY2tJc0VuYWJsZWQgPSB0cnVlO1xuICB2YXIgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jb250ZW50Jyk7XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRlbnQnKTtcbiAgfVxuXG4gIHRoaXMubWFwLm9uKCdzaW5nbGVjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAoX3RoaXMubWFwQ2xpY2tJc0VuYWJsZWQpIHtcbiAgICAgIHZhciBjID0gb2xDb29yZGluYXRlLnRvU3RyaW5nWFkoZXZ0LmNvb3JkaW5hdGUpO1xuICAgICAgY29udGVudC5pbm5lckhUTUwgPSBcIjxwPllvdSBjbGlja2VkIGhlcmU6IDxjb2RlPlwiICsgYyArIFwiPC9jb2RlPjwvcD5cIjtcbiAgICB9XG4gIH0pO1xuICB2YXIgbWFwQ2xpY2tUb29sID0gbmV3IG5nZW9NaXNjVG9vbEFjdGl2YXRlKHRoaXMsICdtYXBDbGlja0lzRW5hYmxlZCcpO1xuICBuZ2VvVG9vbEFjdGl2YXRlTWdyLnJlZ2lzdGVyVG9vbCgnbWFwVG9vbHMnLCBtYXBDbGlja1Rvb2wsIHRydWUpO1xuICB0aGlzLmRyYXdQb2ludCA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgdHlwZTogJ1BvaW50JyxcbiAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgfSk7XG4gIHRoaXMuZHJhd1BvaW50LnNldEFjdGl2ZShmYWxzZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmRyYXdQb2ludCk7XG4gIG1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLmRyYXdQb2ludCk7XG4gIHZhciBkcmF3UG9pbnRUb29sID0gbmV3IG5nZW9NaXNjVG9vbEFjdGl2YXRlKHRoaXMuZHJhd1BvaW50LCAnYWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIGRyYXdQb2ludFRvb2wpO1xuICB0aGlzLmRyYXdMaW5lID0gbmV3IG9sSW50ZXJhY3Rpb25EcmF3KHtcbiAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gIH0pO1xuICB0aGlzLmRyYXdMaW5lLnNldEFjdGl2ZShmYWxzZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmRyYXdMaW5lKTtcbiAgbWFwLmFkZEludGVyYWN0aW9uKHRoaXMuZHJhd0xpbmUpO1xuICB2YXIgZHJhd0xpbmVUb29sID0gbmV3IG5nZW9NaXNjVG9vbEFjdGl2YXRlKHRoaXMuZHJhd0xpbmUsICdhY3RpdmUnKTtcbiAgbmdlb1Rvb2xBY3RpdmF0ZU1nci5yZWdpc3RlclRvb2woJ21hcFRvb2xzJywgZHJhd0xpbmVUb29sKTtcbiAgdGhpcy5kcmF3UG9seWdvbiA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgdHlwZTogJ1BvbHlnb24nLFxuICAgIGZlYXR1cmVzOiBmZWF0dXJlc1xuICB9KTtcbiAgdGhpcy5kcmF3UG9seWdvbi5zZXRBY3RpdmUoZmFsc2UpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5kcmF3UG9seWdvbik7XG4gIG1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLmRyYXdQb2x5Z29uKTtcbiAgdmFyIGRyYXdQb2x5Z29uVG9vbCA9IG5ldyBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZSh0aGlzLmRyYXdQb2x5Z29uLCAnYWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIGRyYXdQb2x5Z29uVG9vbCk7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9