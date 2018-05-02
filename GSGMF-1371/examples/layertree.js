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
/******/ 		"layertree": 0
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
/******/ 	deferredModules.push([20,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/layertree.css":
/*!********************************!*\
  !*** ./examples/layertree.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/layertree.js":
/*!*******************************!*\
  !*** ./examples/layertree.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layertree_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layertree.css */ "./examples/layertree.css");
/* harmony import */ var _layertree_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layertree_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Stamen_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Stamen.js */ "./node_modules/ol/source/Stamen.js");
/* harmony import */ var ngeo_layertree_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/layertree/module.js */ "./src/layertree/module.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/message/Popup.js */ "./src/message/Popup.js");
LayertreeController.$inject = ["$http", "$sce", "appGetLayer", "ngeoCreatePopup"];










var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_layertree_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_9__["default"].name]);
var layertreeComponent = {
  bindings: {
    'map': '=appLayertreeMap'
  },
  controller: 'AppLayertreeController',
  template: '<div ngeo-layertree="::$ctrl.tree" ' + 'ngeo-layertree-templateurl="examples/layertree" ' + 'ngeo-layertree-map="$ctrl.map" ' + 'ngeo-layertree-nodelayer="$ctrl.getLayer(node)">' + '</div>'
};
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('examples/layertree', __webpack_require__(/*! ./partials/layertree.html */ "./examples/partials/layertree.html"));
}]);
module.component('appLayertree', layertreeComponent);

function LayertreeController($http, $sce, appGetLayer, ngeoCreatePopup) {
  var _this = this;

  this.tree = undefined;
  $http.get('data/tree.json').then(function (resp) {
    _this.tree = resp.data;
  });
  this.http_ = $http;
  this.sce_ = $sce;
  this.getLayer_ = appGetLayer;
  this.infoPopup_ = ngeoCreatePopup();
  this.promises_ = {};
}

LayertreeController.prototype.getLayer = function (node) {
  return this.getLayer_(node);
};

LayertreeController.prototype.onButtonClick = function (node, layer) {
  var _this2 = this;

  var layerType = node.layerType;

  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then(function (resp) {
      var html = _this2.sce_.trustAsHtml(resp.data);

      return html;
    });
  }

  var infoPopup = this.infoPopup_;
  this.promises_[layerType].then(function (html) {
    infoPopup.setTitle(node.name);
    infoPopup.setContent(html);
    infoPopup.setOpen(true);
  });
};

module.controller('AppLayertreeController', LayertreeController);

var getLayer = function () {
  var layerCache = {};
  return function (node) {
    if (!('layerType' in node)) {
      return null;
    }

    var type = node.layerType;

    if (type in layerCache) {
      return layerCache[type];
    }

    var source;

    if (type == 'stamenWatercolor') {
      source = new ol_source_Stamen_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
        layer: 'watercolor'
      });
    } else if (type == 'stamenTerrain-labels') {
      source = new ol_source_Stamen_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
        layer: 'terrain-labels'
      });
    } else if (type == 'osmHumanitarian') {
      source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
        url: 'https://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      });
    } else if (type == 'osmCycle') {
      source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
        url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
      });
    } else if (type == 'osmTransport') {
      source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
        url: 'https://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png'
      });
    } else {
      source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    }

    var layer = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      source: source
    });
    layer.set('type', type);
    layerCache[type] = layer;
    return layer;
  };
}();

module.value('appGetLayer', getLayer);

function MainController() {
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4
    })
  });
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./examples/partials/layertree.html":
/*!******************************************!*\
  !*** ./examples/partials/layertree.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<span ng-if="::!layertreeCtrl.isRoot">{{::layertreeCtrl.node.name}}</span>\n<input type="checkbox" ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children"\n    ng-model="layertreeCtrl.getSetActive" ng-model-options="{getterSetter: true}"/>\n<button ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children"\n        ng-click="ctrl.onButtonClick(layertreeCtrl.node, layertreeCtrl.layer)">i</button>\n<ul ng-if="::layertreeCtrl.node.children">\n  <li ng-repeat="node in ::layertreeCtrl.node.children"\n      ngeo-layertree="::node"\n      ngeo-layertree-templateurl="partials/layertree.html"\n      ngeo-layertree-notroot\n      ngeo-layertree-map="layertreeCtrl.map"\n      ngeo-layertree-nodelayerexpr="layertreeCtrl.nodelayerExpr">\n  </li>\n</ul>\n';

}
return __p
}

/***/ }),

/***/ "./node_modules/ol/source/Stamen.js":
/*!******************************************************************************!*\
  !*** delegated ./node_modules/ol/source/Stamen.js from dll-reference vendor ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(791);

/***/ }),

/***/ 20:
/*!******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/layertree.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/layertree.js */"./examples/layertree.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJ0cmVlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL2xheWVydHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9wYXJ0aWFscy9sYXllcnRyZWUuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibGF5ZXJ0cmVlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzIwLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIkxheWVydHJlZUNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHNjZVwiLCBcImFwcEdldExheWVyXCIsIFwibmdlb0NyZWF0ZVBvcHVwXCJdO1xuaW1wb3J0ICcuL2xheWVydHJlZS5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VTdGFtZW4gZnJvbSAnb2wvc291cmNlL1N0YW1lbi5qcyc7XG5pbXBvcnQgbmdlb0xheWVydHJlZU1vZHVsZSBmcm9tICduZ2VvL2xheWVydHJlZS9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWVzc2FnZVBvcHVwIGZyb20gJ25nZW8vbWVzc2FnZS9Qb3B1cC5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9MYXllcnRyZWVNb2R1bGUubmFtZSwgbmdlb01hcE1vZHVsZS5uYW1lLCBuZ2VvTWVzc2FnZVBvcHVwLm5hbWVdKTtcbnZhciBsYXllcnRyZWVDb21wb25lbnQgPSB7XG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwTGF5ZXJ0cmVlTWFwJ1xuICB9LFxuICBjb250cm9sbGVyOiAnQXBwTGF5ZXJ0cmVlQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlOiAnPGRpdiBuZ2VvLWxheWVydHJlZT1cIjo6JGN0cmwudHJlZVwiICcgKyAnbmdlby1sYXllcnRyZWUtdGVtcGxhdGV1cmw9XCJleGFtcGxlcy9sYXllcnRyZWVcIiAnICsgJ25nZW8tbGF5ZXJ0cmVlLW1hcD1cIiRjdHJsLm1hcFwiICcgKyAnbmdlby1sYXllcnRyZWUtbm9kZWxheWVyPVwiJGN0cmwuZ2V0TGF5ZXIobm9kZSlcIj4nICsgJzwvZGl2Pidcbn07XG5tb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2V4YW1wbGVzL2xheWVydHJlZScsIHJlcXVpcmUoJy4vcGFydGlhbHMvbGF5ZXJ0cmVlLmh0bWwnKSk7XG59XSk7XG5tb2R1bGUuY29tcG9uZW50KCdhcHBMYXllcnRyZWUnLCBsYXllcnRyZWVDb21wb25lbnQpO1xuXG5mdW5jdGlvbiBMYXllcnRyZWVDb250cm9sbGVyKCRodHRwLCAkc2NlLCBhcHBHZXRMYXllciwgbmdlb0NyZWF0ZVBvcHVwKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy50cmVlID0gdW5kZWZpbmVkO1xuICAkaHR0cC5nZXQoJ2RhdGEvdHJlZS5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIF90aGlzLnRyZWUgPSByZXNwLmRhdGE7XG4gIH0pO1xuICB0aGlzLmh0dHBfID0gJGh0dHA7XG4gIHRoaXMuc2NlXyA9ICRzY2U7XG4gIHRoaXMuZ2V0TGF5ZXJfID0gYXBwR2V0TGF5ZXI7XG4gIHRoaXMuaW5mb1BvcHVwXyA9IG5nZW9DcmVhdGVQb3B1cCgpO1xuICB0aGlzLnByb21pc2VzXyA9IHt9O1xufVxuXG5MYXllcnRyZWVDb250cm9sbGVyLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB0aGlzLmdldExheWVyXyhub2RlKTtcbn07XG5cbkxheWVydHJlZUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAobm9kZSwgbGF5ZXIpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgdmFyIGxheWVyVHlwZSA9IG5vZGUubGF5ZXJUeXBlO1xuXG4gIGlmICghKGxheWVyVHlwZSBpbiB0aGlzLnByb21pc2VzXykpIHtcbiAgICB0aGlzLnByb21pc2VzX1tsYXllclR5cGVdID0gdGhpcy5odHRwXy5nZXQoJ2RhdGEvbWV0YWRhdGEuaHRtbCcpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgIHZhciBodG1sID0gX3RoaXMyLnNjZV8udHJ1c3RBc0h0bWwocmVzcC5kYXRhKTtcblxuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgaW5mb1BvcHVwID0gdGhpcy5pbmZvUG9wdXBfO1xuICB0aGlzLnByb21pc2VzX1tsYXllclR5cGVdLnRoZW4oZnVuY3Rpb24gKGh0bWwpIHtcbiAgICBpbmZvUG9wdXAuc2V0VGl0bGUobm9kZS5uYW1lKTtcbiAgICBpbmZvUG9wdXAuc2V0Q29udGVudChodG1sKTtcbiAgICBpbmZvUG9wdXAuc2V0T3Blbih0cnVlKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignQXBwTGF5ZXJ0cmVlQ29udHJvbGxlcicsIExheWVydHJlZUNvbnRyb2xsZXIpO1xuXG52YXIgZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsYXllckNhY2hlID0ge307XG4gIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmICghKCdsYXllclR5cGUnIGluIG5vZGUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IG5vZGUubGF5ZXJUeXBlO1xuXG4gICAgaWYgKHR5cGUgaW4gbGF5ZXJDYWNoZSkge1xuICAgICAgcmV0dXJuIGxheWVyQ2FjaGVbdHlwZV07XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZTtcblxuICAgIGlmICh0eXBlID09ICdzdGFtZW5XYXRlcmNvbG9yJykge1xuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlU3RhbWVuKHtcbiAgICAgICAgbGF5ZXI6ICd3YXRlcmNvbG9yJ1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09ICdzdGFtZW5UZXJyYWluLWxhYmVscycpIHtcbiAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZVN0YW1lbih7XG4gICAgICAgIGxheWVyOiAndGVycmFpbi1sYWJlbHMnXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ29zbUh1bWFuaXRhcmlhbicpIHtcbiAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZU9TTSh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vdGlsZS17YS1jfS5vcGVuc3RyZWV0bWFwLmZyL2hvdC97en0ve3h9L3t5fS5wbmcnXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ29zbUN5Y2xlJykge1xuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlT1NNKHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly97YS1jfS50aWxlLnRodW5kZXJmb3Jlc3QuY29tL2N5Y2xlL3t6fS97eH0ve3l9LnBuZydcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnb3NtVHJhbnNwb3J0Jykge1xuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlT1NNKHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly97YS1jfS50aWxlLnRodW5kZXJmb3Jlc3QuY29tL3RyYW5zcG9ydC97en0ve3h9L3t5fS5wbmcnXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlT1NNKCk7XG4gICAgfVxuXG4gICAgdmFyIGxheWVyID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfSk7XG4gICAgbGF5ZXIuc2V0KCd0eXBlJywgdHlwZSk7XG4gICAgbGF5ZXJDYWNoZVt0eXBlXSA9IGxheWVyO1xuICAgIHJldHVybiBsYXllcjtcbiAgfTtcbn0oKTtcblxubW9kdWxlLnZhbHVlKCdhcHBHZXRMYXllcicsIGdldExheWVyKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWy0xMDk4MzcxMC41OTA4Njk5MSwgNDY4NjUwNy4wNzgyMjA3MzFdLFxuICAgICAgem9vbTogNFxuICAgIH0pXG4gIH0pO1xufVxuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPHNwYW4gbmctaWY9XCI6OiFsYXllcnRyZWVDdHJsLmlzUm9vdFwiPnt7OjpsYXllcnRyZWVDdHJsLm5vZGUubmFtZX19PC9zcGFuPlxcbjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1pZj1cIjo6bGF5ZXJ0cmVlQ3RybC5ub2RlICYmICFsYXllcnRyZWVDdHJsLm5vZGUuY2hpbGRyZW5cIlxcbiAgICBuZy1tb2RlbD1cImxheWVydHJlZUN0cmwuZ2V0U2V0QWN0aXZlXCIgbmctbW9kZWwtb3B0aW9ucz1cIntnZXR0ZXJTZXR0ZXI6IHRydWV9XCIvPlxcbjxidXR0b24gbmctaWY9XCI6OmxheWVydHJlZUN0cmwubm9kZSAmJiAhbGF5ZXJ0cmVlQ3RybC5ub2RlLmNoaWxkcmVuXCJcXG4gICAgICAgIG5nLWNsaWNrPVwiY3RybC5vbkJ1dHRvbkNsaWNrKGxheWVydHJlZUN0cmwubm9kZSwgbGF5ZXJ0cmVlQ3RybC5sYXllcilcIj5pPC9idXR0b24+XFxuPHVsIG5nLWlmPVwiOjpsYXllcnRyZWVDdHJsLm5vZGUuY2hpbGRyZW5cIj5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJub2RlIGluIDo6bGF5ZXJ0cmVlQ3RybC5ub2RlLmNoaWxkcmVuXCJcXG4gICAgICBuZ2VvLWxheWVydHJlZT1cIjo6bm9kZVwiXFxuICAgICAgbmdlby1sYXllcnRyZWUtdGVtcGxhdGV1cmw9XCJwYXJ0aWFscy9sYXllcnRyZWUuaHRtbFwiXFxuICAgICAgbmdlby1sYXllcnRyZWUtbm90cm9vdFxcbiAgICAgIG5nZW8tbGF5ZXJ0cmVlLW1hcD1cImxheWVydHJlZUN0cmwubWFwXCJcXG4gICAgICBuZ2VvLWxheWVydHJlZS1ub2RlbGF5ZXJleHByPVwibGF5ZXJ0cmVlQ3RybC5ub2RlbGF5ZXJFeHByXCI+XFxuICA8L2xpPlxcbjwvdWw+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=