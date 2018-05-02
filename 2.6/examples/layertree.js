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
// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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
 * This example shows how to create a layer tree tree based
 * on ngeo's ngeoLayertree directive.
 */













/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', [
  'gettext',
  ngeo_layertree_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name,
  ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_9__["default"].name,
]);

/**
 * An application-specific component wrapping the ngeo tree layer component.
 * The component includes a controller defining the tree tree.
 *
 * @type {angular.IComponentOptions}
 */
const layertreeComponent = {
  bindings: {
    'map': '=appLayertreeMap',
  },
  controller: 'AppLayertreeController',
  // use "::$ctrl.tree" for the "tree" expression as we know the
  // layer tree won't change
  template:
    '<div ngeo-layertree="::$ctrl.tree" ' +
    'ngeo-layertree-templateurl="examples/layertree" ' +
    'ngeo-layertree-map="$ctrl.map" ' +
    'ngeo-layertree-nodelayer="$ctrl.getLayer(node)">' +
    '</div>',
};

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('examples/layertree', __webpack_require__(/*! ./partials/layertree.html */ "./examples/partials/layertree.html"));
  }
);

myModule.component('appLayertree', layertreeComponent);

/**
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {function(Object):import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>}
 *    appGetLayer Get layer service.
 * @param {import("ngeo/message/Popup.js").PopupFactory} ngeoCreatePopup Popup service.
 * @ngInject
 */
function LayertreeController($http, $sce, appGetLayer, ngeoCreatePopup) {
  /**
   * @type {Object|undefined}
   */
  this.tree = undefined;

  $http.get('data/tree.json').then((resp) => {
    this.tree = resp.data;
  });

  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @type {angular.ISCEService}
   */
  this.sce_ = $sce;

  /**
   * @type {function(Object):import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>}
   */
  this.getLayer_ = appGetLayer;

  /**
   * @type {import("ngeo/message/Popup.js").MessagePopup}
   */
  this.infoPopup_ = ngeoCreatePopup();

  /**
   * @type {Object<string, angular.IPromise<*>>}
   */
  this.promises_ = {};
}

/**
 * Function called by the ngeo-layertree directives to create a layer
 * from a tree node. The function should return `null` if no layer should
 * be associated to the node (because it's not a leaf).
 * @param {Object} node Node object.
 * @return {import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>} The layer for this
 *    node.
 */
LayertreeController.prototype.getLayer = function (node) {
  return this.getLayer_(node);
};

/**
 * @param {import('gmf/themes.js').GmfLayer} node Tree node.
 * @param {import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>} layer Layer.
 */
LayertreeController.prototype.onButtonClick = function (node, layer) {
  const layerType = node.layerType;
  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then((resp) => {
      const html = this.sce_.trustAsHtml(resp.data);
      return html;
    });
  }
  const infoPopup = this.infoPopup_;
  this.promises_[layerType].then((html) => {
    infoPopup.setTitle(node.name);
    infoPopup.setContent(html);
    infoPopup.setOpen(true);
  });
};

myModule.controller('AppLayertreeController', LayertreeController);

/**
 * A function that returns a layer for a node. A cache is used, so always the
 * same layer instance is returned for a given node. This function is called by
 * the ngeoLayertree directive for creating layers from tree nodes. The
 * function returns `null` when no layer should be created for the node.
 *
 * @param {import('gmf/themes.js').GmfLayer} node Layer tree node.
 * @return {import("ol/layer/Layer.js").default} Layer.
 */
const getLayer = (function () {
  /**
   * @type {Object.<string, import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>>}
   */
  const layerCache = {};
  return (
    /**
     * @param {import('gmf/themes.js').GmfLayer} node Tree node.
     * @return {?import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>} Layer.
     */
    function (node) {
      if (!('layerType' in node)) {
        return null;
      }
      const type = node.layerType;
      if (type in layerCache) {
        return layerCache[type];
      }
      let source;
      if (type == 'stamenWatercolor') {
        source = new ol_source_Stamen_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
          layer: 'watercolor',
        });
      } else if (type == 'stamenTerrain-labels') {
        source = new ol_source_Stamen_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
          layer: 'terrain-labels',
        });
      } else if (type == 'osmHumanitarian') {
        source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
          url: 'https://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        });
      } else if (type == 'osmCycle') {
        source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
          url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        });
      } else if (type == 'osmTransport') {
        source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
          url: 'https://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
        });
      } else {
        source = new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
      }
      const layer = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        source,
      });
      layer.set('type', type);
      layerCache[type] = layer;
      return layer;
    }
  );
})();

myModule.value('appGetLayer', getLayer);

/**
 * The application's main directive.
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4,
    }),
  });
}

myModule.controller('MainController', MainController);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


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

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(842);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJ0cmVlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL2xheWVydHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9wYXJ0aWFscy9sYXllcnRyZWUuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibGF5ZXJ0cmVlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsyMCxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAyMSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZXhhbXBsZSBzaG93cyBob3cgdG8gY3JlYXRlIGEgbGF5ZXIgdHJlZSB0cmVlIGJhc2VkXG4gKiBvbiBuZ2VvJ3Mgbmdlb0xheWVydHJlZSBkaXJlY3RpdmUuXG4gKi9cblxuaW1wb3J0ICcuL2xheWVydHJlZS5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcblxuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBvbFNvdXJjZVN0YW1lbiBmcm9tICdvbC9zb3VyY2UvU3RhbWVuLmpzJztcbmltcG9ydCBuZ2VvTGF5ZXJ0cmVlTW9kdWxlIGZyb20gJ25nZW8vbGF5ZXJ0cmVlL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9NZXNzYWdlUG9wdXAgZnJvbSAnbmdlby9tZXNzYWdlL1BvcHVwLmpzJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIG5nZW9MYXllcnRyZWVNb2R1bGUubmFtZSxcbiAgbmdlb01hcE1vZHVsZS5uYW1lLFxuICBuZ2VvTWVzc2FnZVBvcHVwLm5hbWUsXG5dKTtcblxuLyoqXG4gKiBBbiBhcHBsaWNhdGlvbi1zcGVjaWZpYyBjb21wb25lbnQgd3JhcHBpbmcgdGhlIG5nZW8gdHJlZSBsYXllciBjb21wb25lbnQuXG4gKiBUaGUgY29tcG9uZW50IGluY2x1ZGVzIGEgY29udHJvbGxlciBkZWZpbmluZyB0aGUgdHJlZSB0cmVlLlxuICpcbiAqIEB0eXBlIHthbmd1bGFyLklDb21wb25lbnRPcHRpb25zfVxuICovXG5jb25zdCBsYXllcnRyZWVDb21wb25lbnQgPSB7XG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwTGF5ZXJ0cmVlTWFwJyxcbiAgfSxcbiAgY29udHJvbGxlcjogJ0FwcExheWVydHJlZUNvbnRyb2xsZXInLFxuICAvLyB1c2UgXCI6OiRjdHJsLnRyZWVcIiBmb3IgdGhlIFwidHJlZVwiIGV4cHJlc3Npb24gYXMgd2Uga25vdyB0aGVcbiAgLy8gbGF5ZXIgdHJlZSB3b24ndCBjaGFuZ2VcbiAgdGVtcGxhdGU6XG4gICAgJzxkaXYgbmdlby1sYXllcnRyZWU9XCI6OiRjdHJsLnRyZWVcIiAnICtcbiAgICAnbmdlby1sYXllcnRyZWUtdGVtcGxhdGV1cmw9XCJleGFtcGxlcy9sYXllcnRyZWVcIiAnICtcbiAgICAnbmdlby1sYXllcnRyZWUtbWFwPVwiJGN0cmwubWFwXCIgJyArXG4gICAgJ25nZW8tbGF5ZXJ0cmVlLW5vZGVsYXllcj1cIiRjdHJsLmdldExheWVyKG5vZGUpXCI+JyArXG4gICAgJzwvZGl2PicsXG59O1xuXG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAbmdJbmplY3RcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2V4YW1wbGVzL2xheWVydHJlZScsIHJlcXVpcmUoJy4vcGFydGlhbHMvbGF5ZXJ0cmVlLmh0bWwnKSk7XG4gIH1cbik7XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwTGF5ZXJ0cmVlJywgbGF5ZXJ0cmVlQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIEFuZ3VsYXIgaHR0cCBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklTQ0VTZXJ2aWNlfSAkc2NlIEFuZ3VsYXIgc2NlIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6aW1wb3J0KFwib2wvbGF5ZXIvTGF5ZXIuanNcIikuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9Tb3VyY2UuanMnKS5kZWZhdWx0Pn1cbiAqICAgIGFwcEdldExheWVyIEdldCBsYXllciBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL21lc3NhZ2UvUG9wdXAuanNcIikuUG9wdXBGYWN0b3J5fSBuZ2VvQ3JlYXRlUG9wdXAgUG9wdXAgc2VydmljZS5cbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBMYXllcnRyZWVDb250cm9sbGVyKCRodHRwLCAkc2NlLCBhcHBHZXRMYXllciwgbmdlb0NyZWF0ZVBvcHVwKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIHRoaXMudHJlZSA9IHVuZGVmaW5lZDtcblxuICAkaHR0cC5nZXQoJ2RhdGEvdHJlZS5qc29uJykudGhlbigocmVzcCkgPT4ge1xuICAgIHRoaXMudHJlZSA9IHJlc3AuZGF0YTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklIdHRwU2VydmljZX1cbiAgICovXG4gIHRoaXMuaHR0cF8gPSAkaHR0cDtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNDRVNlcnZpY2V9XG4gICAqL1xuICB0aGlzLnNjZV8gPSAkc2NlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7ZnVuY3Rpb24oT2JqZWN0KTppbXBvcnQoXCJvbC9sYXllci9MYXllci5qc1wiKS5kZWZhdWx0PGltcG9ydCgnb2wvc291cmNlL1NvdXJjZS5qcycpLmRlZmF1bHQ+fVxuICAgKi9cbiAgdGhpcy5nZXRMYXllcl8gPSBhcHBHZXRMYXllcjtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm5nZW8vbWVzc2FnZS9Qb3B1cC5qc1wiKS5NZXNzYWdlUG9wdXB9XG4gICAqL1xuICB0aGlzLmluZm9Qb3B1cF8gPSBuZ2VvQ3JlYXRlUG9wdXAoKTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIGFuZ3VsYXIuSVByb21pc2U8Kj4+fVxuICAgKi9cbiAgdGhpcy5wcm9taXNlc18gPSB7fTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBjYWxsZWQgYnkgdGhlIG5nZW8tbGF5ZXJ0cmVlIGRpcmVjdGl2ZXMgdG8gY3JlYXRlIGEgbGF5ZXJcbiAqIGZyb20gYSB0cmVlIG5vZGUuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGBudWxsYCBpZiBubyBsYXllciBzaG91bGRcbiAqIGJlIGFzc29jaWF0ZWQgdG8gdGhlIG5vZGUgKGJlY2F1c2UgaXQncyBub3QgYSBsZWFmKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIE5vZGUgb2JqZWN0LlxuICogQHJldHVybiB7aW1wb3J0KFwib2wvbGF5ZXIvTGF5ZXIuanNcIikuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9Tb3VyY2UuanMnKS5kZWZhdWx0Pn0gVGhlIGxheWVyIGZvciB0aGlzXG4gKiAgICBub2RlLlxuICovXG5MYXllcnRyZWVDb250cm9sbGVyLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB0aGlzLmdldExheWVyXyhub2RlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMuanMnKS5HbWZMYXllcn0gbm9kZSBUcmVlIG5vZGUuXG4gKiBAcGFyYW0ge2ltcG9ydChcIm9sL2xheWVyL0xheWVyLmpzXCIpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvU291cmNlLmpzJykuZGVmYXVsdD59IGxheWVyIExheWVyLlxuICovXG5MYXllcnRyZWVDb250cm9sbGVyLnByb3RvdHlwZS5vbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKG5vZGUsIGxheWVyKSB7XG4gIGNvbnN0IGxheWVyVHlwZSA9IG5vZGUubGF5ZXJUeXBlO1xuICBpZiAoIShsYXllclR5cGUgaW4gdGhpcy5wcm9taXNlc18pKSB7XG4gICAgdGhpcy5wcm9taXNlc19bbGF5ZXJUeXBlXSA9IHRoaXMuaHR0cF8uZ2V0KCdkYXRhL21ldGFkYXRhLmh0bWwnKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBjb25zdCBodG1sID0gdGhpcy5zY2VfLnRydXN0QXNIdG1sKHJlc3AuZGF0YSk7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9KTtcbiAgfVxuICBjb25zdCBpbmZvUG9wdXAgPSB0aGlzLmluZm9Qb3B1cF87XG4gIHRoaXMucHJvbWlzZXNfW2xheWVyVHlwZV0udGhlbigoaHRtbCkgPT4ge1xuICAgIGluZm9Qb3B1cC5zZXRUaXRsZShub2RlLm5hbWUpO1xuICAgIGluZm9Qb3B1cC5zZXRDb250ZW50KGh0bWwpO1xuICAgIGluZm9Qb3B1cC5zZXRPcGVuKHRydWUpO1xuICB9KTtcbn07XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcExheWVydHJlZUNvbnRyb2xsZXInLCBMYXllcnRyZWVDb250cm9sbGVyKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGxheWVyIGZvciBhIG5vZGUuIEEgY2FjaGUgaXMgdXNlZCwgc28gYWx3YXlzIHRoZVxuICogc2FtZSBsYXllciBpbnN0YW5jZSBpcyByZXR1cm5lZCBmb3IgYSBnaXZlbiBub2RlLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBieVxuICogdGhlIG5nZW9MYXllcnRyZWUgZGlyZWN0aXZlIGZvciBjcmVhdGluZyBsYXllcnMgZnJvbSB0cmVlIG5vZGVzLiBUaGVcbiAqIGZ1bmN0aW9uIHJldHVybnMgYG51bGxgIHdoZW4gbm8gbGF5ZXIgc2hvdWxkIGJlIGNyZWF0ZWQgZm9yIHRoZSBub2RlLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWVzLmpzJykuR21mTGF5ZXJ9IG5vZGUgTGF5ZXIgdHJlZSBub2RlLlxuICogQHJldHVybiB7aW1wb3J0KFwib2wvbGF5ZXIvTGF5ZXIuanNcIikuZGVmYXVsdH0gTGF5ZXIuXG4gKi9cbmNvbnN0IGdldExheWVyID0gKGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgaW1wb3J0KFwib2wvbGF5ZXIvTGF5ZXIuanNcIikuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9Tb3VyY2UuanMnKS5kZWZhdWx0Pj59XG4gICAqL1xuICBjb25zdCBsYXllckNhY2hlID0ge307XG4gIHJldHVybiAoXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZXMuanMnKS5HbWZMYXllcn0gbm9kZSBUcmVlIG5vZGUuXG4gICAgICogQHJldHVybiB7P2ltcG9ydChcIm9sL2xheWVyL0xheWVyLmpzXCIpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvU291cmNlLmpzJykuZGVmYXVsdD59IExheWVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAoISgnbGF5ZXJUeXBlJyBpbiBub2RlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGUgPSBub2RlLmxheWVyVHlwZTtcbiAgICAgIGlmICh0eXBlIGluIGxheWVyQ2FjaGUpIHtcbiAgICAgICAgcmV0dXJuIGxheWVyQ2FjaGVbdHlwZV07XG4gICAgICB9XG4gICAgICBsZXQgc291cmNlO1xuICAgICAgaWYgKHR5cGUgPT0gJ3N0YW1lbldhdGVyY29sb3InKSB7XG4gICAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZVN0YW1lbih7XG4gICAgICAgICAgbGF5ZXI6ICd3YXRlcmNvbG9yJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3N0YW1lblRlcnJhaW4tbGFiZWxzJykge1xuICAgICAgICBzb3VyY2UgPSBuZXcgb2xTb3VyY2VTdGFtZW4oe1xuICAgICAgICAgIGxheWVyOiAndGVycmFpbi1sYWJlbHMnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnb3NtSHVtYW5pdGFyaWFuJykge1xuICAgICAgICBzb3VyY2UgPSBuZXcgb2xTb3VyY2VPU00oe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vdGlsZS17YS1jfS5vcGVuc3RyZWV0bWFwLmZyL2hvdC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnb3NtQ3ljbGUnKSB7XG4gICAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZU9TTSh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly97YS1jfS50aWxlLnRodW5kZXJmb3Jlc3QuY29tL2N5Y2xlL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdvc21UcmFuc3BvcnQnKSB7XG4gICAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZU9TTSh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly97YS1jfS50aWxlLnRodW5kZXJmb3Jlc3QuY29tL3RyYW5zcG9ydC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZU9TTSgpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGF5ZXIgPSBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2UsXG4gICAgICB9KTtcbiAgICAgIGxheWVyLnNldCgndHlwZScsIHR5cGUpO1xuICAgICAgbGF5ZXJDYWNoZVt0eXBlXSA9IGxheWVyO1xuICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH1cbiAgKTtcbn0pKCk7XG5cbm15TW9kdWxlLnZhbHVlKCdhcHBHZXRMYXllcicsIGdldExheWVyKTtcblxuLyoqXG4gKiBUaGUgYXBwbGljYXRpb24ncyBtYWluIGRpcmVjdGl2ZS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm9sL01hcC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFstMTA5ODM3MTAuNTkwODY5OTEsIDQ2ODY1MDcuMDc4MjIwNzMxXSxcbiAgICAgIHpvb206IDQsXG4gICAgfSksXG4gIH0pO1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8c3BhbiBuZy1pZj1cIjo6IWxheWVydHJlZUN0cmwuaXNSb290XCI+e3s6OmxheWVydHJlZUN0cmwubm9kZS5uYW1lfX08L3NwYW4+XFxuPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLWlmPVwiOjpsYXllcnRyZWVDdHJsLm5vZGUgJiYgIWxheWVydHJlZUN0cmwubm9kZS5jaGlsZHJlblwiXFxuICAgIG5nLW1vZGVsPVwibGF5ZXJ0cmVlQ3RybC5nZXRTZXRBY3RpdmVcIiBuZy1tb2RlbC1vcHRpb25zPVwie2dldHRlclNldHRlcjogdHJ1ZX1cIi8+XFxuPGJ1dHRvbiBuZy1pZj1cIjo6bGF5ZXJ0cmVlQ3RybC5ub2RlICYmICFsYXllcnRyZWVDdHJsLm5vZGUuY2hpbGRyZW5cIlxcbiAgICAgICAgbmctY2xpY2s9XCJjdHJsLm9uQnV0dG9uQ2xpY2sobGF5ZXJ0cmVlQ3RybC5ub2RlLCBsYXllcnRyZWVDdHJsLmxheWVyKVwiPmk8L2J1dHRvbj5cXG48dWwgbmctaWY9XCI6OmxheWVydHJlZUN0cmwubm9kZS5jaGlsZHJlblwiPlxcbiAgPGxpIG5nLXJlcGVhdD1cIm5vZGUgaW4gOjpsYXllcnRyZWVDdHJsLm5vZGUuY2hpbGRyZW5cIlxcbiAgICAgIG5nZW8tbGF5ZXJ0cmVlPVwiOjpub2RlXCJcXG4gICAgICBuZ2VvLWxheWVydHJlZS10ZW1wbGF0ZXVybD1cInBhcnRpYWxzL2xheWVydHJlZS5odG1sXCJcXG4gICAgICBuZ2VvLWxheWVydHJlZS1ub3Ryb290XFxuICAgICAgbmdlby1sYXllcnRyZWUtbWFwPVwibGF5ZXJ0cmVlQ3RybC5tYXBcIlxcbiAgICAgIG5nZW8tbGF5ZXJ0cmVlLW5vZGVsYXllcmV4cHI9XCJsYXllcnRyZWVDdHJsLm5vZGVsYXllckV4cHJcIj5cXG4gIDwvbGk+XFxuPC91bD5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=