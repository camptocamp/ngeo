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
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 	deferredModules.push([21,"commons"]);
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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

  var layerType = node['layerType'];

  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then(function (resp) {
      var html = _this2.sce_.trustAsHtml(resp.data);

      return html;
    });
  }

  var infoPopup = this.infoPopup_;
  this.promises_[layerType].then(function (html) {
    infoPopup.setTitle(node['name']);
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

    var type = node['layerType'];

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

/***/ 21:
/*!******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/layertree.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/layertree.js */"./examples/layertree.js");


/***/ })

/******/ });
//# sourceMappingURL=layertree.js.map