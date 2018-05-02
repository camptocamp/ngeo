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
/******/ 		"layerorder": 0
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

/***/ "./examples/layerorder.css":
/*!*********************************!*\
  !*** ./examples/layerorder.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/layerorder.js":
/*!********************************!*\
  !*** ./examples/layerorder.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layerorder_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layerorder.css */ "./examples/layerorder.css");
/* harmony import */ var _layerorder_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layerorder_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_sortableComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/sortableComponent.js */ "./src/misc/sortableComponent.js");
/* harmony import */ var ngeo_misc_syncArrays_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/syncArrays.js */ "./src/misc/syncArrays.js");
/* harmony import */ var ngeo_source_AsitVD_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/source/AsitVD.js */ "./src/source/AsitVD.js");
/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ "./node_modules/@geoblocks/proj/src/EPSG_21781.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/TileWMS.js */ "./node_modules/ol/source/TileWMS.js");
MainController.$inject = ["$scope"];











var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_misc_sortableComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"].name]);

function MainController($scope) {
  var asitvd = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ngeo_source_AsitVD_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
      layer: 'asitvd.fond_couleur'
    })
  });
  asitvd.set('name', 'asitvd');
  var boundaries = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      projection: undefined,
      url: 'https://wms.geo.admin.ch',
      params: {
        'LAYERS': 'ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill'
      },
      serverType: 'mapserver'
    })
  });
  boundaries.set('name', 'Boundaries');
  var waterBodies = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      projection: undefined,
      url: 'https://wms.geo.admin.ch',
      params: {
        'LAYERS': 'ch.swisstopo.geologie-gravimetrischer_atlas'
      },
      serverType: 'mapserver'
    })
  });
  waterBodies.set('name', 'Water bodies');
  var cities = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      projection: undefined,
      url: 'https://wms.geo.admin.ch',
      params: {
        'LAYERS': 'ch.swisstopo.dreiecksvermaschung'
      },
      serverType: 'mapserver'
    })
  });
  cities.set('name', 'Cities');
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [asitvd, boundaries, waterBodies, cities],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_6__["default"],
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });
  var map = this.map;
  this.roads_ = new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      projection: undefined,
      url: 'https://wms.geo.admin.ch',
      params: {
        'LAYERS': 'ch.bafu.laerm-strassenlaerm_tag'
      },
      serverType: 'mapserver'
    })
  });
  this.roads_.set('name', 'Roads');
  this.selectedLayers = [];
  var selectedLayers = this.selectedLayers;
  Object(ngeo_misc_syncArrays_js__WEBPACK_IMPORTED_MODULE_4__["default"])(map.getLayers().getArray(), selectedLayers, true, $scope, layerFilter);
  $scope.$watchCollection(function () {
    return selectedLayers;
  }, function () {
    map.render();
  });

  function layerFilter(layer) {
    return layer !== asitvd;
  }
}

MainController.prototype.toggleRoadsLayer = function (val) {
  if (val === undefined) {
    return this.map.getLayers().getArray().indexOf(this.roads_) >= 0;
  } else {
    if (val) {
      this.map.addLayer(this.roads_);
    } else {
      this.map.removeLayer(this.roads_);
    }
  }
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/misc/syncArrays.js":
/*!********************************!*\
  !*** ./src/misc/syncArrays.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function syncArrays(arr1, arr2, reverse, scope, filter) {
  var dereg1 = scope.$watchCollection(function () {
    return arr1;
  }, function () {
    var i, ii, j;

    if (reverse) {
      for (i = arr1.length - 1, j = 0; i >= 0; --i) {
        if (filter(arr1[i])) {
          arr2[j++] = arr1[i];
        }
      }
    } else {
      for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr2[j++] = arr1[i];
        }
      }
    }

    arr2.length = j;
  });
  var dereg2 = scope.$watchCollection(function () {
    return arr2;
  }, function () {
    var i, ii, j;

    if (reverse) {
      for (i = 0, ii = arr1.length, j = arr2.length - 1; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr1[i] = arr2[j--];
        }
      }

      console.assert(j == -1);
    } else {
      for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr1[i] = arr2[j++];
        }
      }

      console.assert(j == arr2.length);
    }
  });
  return function () {
    dereg1();
    dereg2();
  };
}

/* harmony default export */ __webpack_exports__["default"] = (syncArrays);

/***/ }),

/***/ 20:
/*!*******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/layerorder.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/layerorder.js */"./examples/layerorder.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJvcmRlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9sYXllcm9yZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9taXNjL3N5bmNBcnJheXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImxheWVyb3JkZXJcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMjAsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiXTtcbmltcG9ydCAnLi9sYXllcm9yZGVyLmNzcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NTb3J0YWJsZUNvbXBvbmVudCBmcm9tICduZ2VvL21pc2Mvc29ydGFibGVDb21wb25lbnQuanMnO1xuaW1wb3J0IG5nZW9NaXNjU3luY0FycmF5cyBmcm9tICduZ2VvL21pc2Mvc3luY0FycmF5cy5qcyc7XG5pbXBvcnQgbmdlb1NvdXJjZUFzaXRWRCBmcm9tICduZ2VvL3NvdXJjZS9Bc2l0VkQuanMnO1xuaW1wb3J0IEVQU0cyMTc4MSBmcm9tICdAZ2VvYmxvY2tzL3Byb2ovc3JjL0VQU0dfMjE3ODEuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01pc2NTb3J0YWJsZUNvbXBvbmVudC5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuICB2YXIgYXNpdHZkID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICBzb3VyY2U6IG5ldyBuZ2VvU291cmNlQXNpdFZEKHtcbiAgICAgIGxheWVyOiAnYXNpdHZkLmZvbmRfY291bGV1cidcbiAgICB9KVxuICB9KTtcbiAgYXNpdHZkLnNldCgnbmFtZScsICdhc2l0dmQnKTtcbiAgdmFyIGJvdW5kYXJpZXMgPSBuZXcgb2xMYXllclRpbGUoe1xuICAgIHNvdXJjZTogbmV3IG9sU291cmNlVGlsZVdNUyh7XG4gICAgICBwcm9qZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgICB1cmw6ICdodHRwczovL3dtcy5nZW8uYWRtaW4uY2gnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgICdMQVlFUlMnOiAnY2guc3dpc3N0b3BvLnN3aXNzYm91bmRhcmllczNkLWdlbWVpbmRlLWZsYWVjaGUuZmlsbCdcbiAgICAgIH0sXG4gICAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJ1xuICAgIH0pXG4gIH0pO1xuICBib3VuZGFyaWVzLnNldCgnbmFtZScsICdCb3VuZGFyaWVzJyk7XG4gIHZhciB3YXRlckJvZGllcyA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VUaWxlV01TKHtcbiAgICAgIHByb2plY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgIHVybDogJ2h0dHBzOi8vd21zLmdlby5hZG1pbi5jaCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgJ0xBWUVSUyc6ICdjaC5zd2lzc3RvcG8uZ2VvbG9naWUtZ3JhdmltZXRyaXNjaGVyX2F0bGFzJ1xuICAgICAgfSxcbiAgICAgIHNlcnZlclR5cGU6ICdtYXBzZXJ2ZXInXG4gICAgfSlcbiAgfSk7XG4gIHdhdGVyQm9kaWVzLnNldCgnbmFtZScsICdXYXRlciBib2RpZXMnKTtcbiAgdmFyIGNpdGllcyA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VUaWxlV01TKHtcbiAgICAgIHByb2plY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgIHVybDogJ2h0dHBzOi8vd21zLmdlby5hZG1pbi5jaCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgJ0xBWUVSUyc6ICdjaC5zd2lzc3RvcG8uZHJlaWVja3N2ZXJtYXNjaHVuZydcbiAgICAgIH0sXG4gICAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJ1xuICAgIH0pXG4gIH0pO1xuICBjaXRpZXMuc2V0KCduYW1lJywgJ0NpdGllcycpO1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbYXNpdHZkLCBib3VuZGFyaWVzLCB3YXRlckJvZGllcywgY2l0aWVzXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMTc4MSxcbiAgICAgIHJlc29sdXRpb25zOiBbMTAwMCwgNTAwLCAyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbNjAwMDAwLCAyMDAwMDBdLFxuICAgICAgem9vbTogMVxuICAgIH0pXG4gIH0pO1xuICB2YXIgbWFwID0gdGhpcy5tYXA7XG4gIHRoaXMucm9hZHNfID0gbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVRpbGVXTVMoe1xuICAgICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93bXMuZ2VvLmFkbWluLmNoJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICAnTEFZRVJTJzogJ2NoLmJhZnUubGFlcm0tc3RyYXNzZW5sYWVybV90YWcnXG4gICAgICB9LFxuICAgICAgc2VydmVyVHlwZTogJ21hcHNlcnZlcidcbiAgICB9KVxuICB9KTtcbiAgdGhpcy5yb2Fkc18uc2V0KCduYW1lJywgJ1JvYWRzJyk7XG4gIHRoaXMuc2VsZWN0ZWRMYXllcnMgPSBbXTtcbiAgdmFyIHNlbGVjdGVkTGF5ZXJzID0gdGhpcy5zZWxlY3RlZExheWVycztcbiAgbmdlb01pc2NTeW5jQXJyYXlzKG1hcC5nZXRMYXllcnMoKS5nZXRBcnJheSgpLCBzZWxlY3RlZExheWVycywgdHJ1ZSwgJHNjb3BlLCBsYXllckZpbHRlcik7XG4gICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRMYXllcnM7XG4gIH0sIGZ1bmN0aW9uICgpIHtcbiAgICBtYXAucmVuZGVyKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGxheWVyRmlsdGVyKGxheWVyKSB7XG4gICAgcmV0dXJuIGxheWVyICE9PSBhc2l0dmQ7XG4gIH1cbn1cblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLnRvZ2dsZVJvYWRzTGF5ZXIgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLm1hcC5nZXRMYXllcnMoKS5nZXRBcnJheSgpLmluZGV4T2YodGhpcy5yb2Fkc18pID49IDA7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5yb2Fkc18pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLnJvYWRzXyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwiZnVuY3Rpb24gc3luY0FycmF5cyhhcnIxLCBhcnIyLCByZXZlcnNlLCBzY29wZSwgZmlsdGVyKSB7XG4gIHZhciBkZXJlZzEgPSBzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJyMTtcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpLCBpaSwgajtcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICBmb3IgKGkgPSBhcnIxLmxlbmd0aCAtIDEsIGogPSAwOyBpID49IDA7IC0taSkge1xuICAgICAgICBpZiAoZmlsdGVyKGFycjFbaV0pKSB7XG4gICAgICAgICAgYXJyMltqKytdID0gYXJyMVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwLCBpaSA9IGFycjEubGVuZ3RoLCBqID0gMDsgaSA8IGlpOyArK2kpIHtcbiAgICAgICAgaWYgKGZpbHRlcihhcnIxW2ldKSkge1xuICAgICAgICAgIGFycjJbaisrXSA9IGFycjFbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhcnIyLmxlbmd0aCA9IGo7XG4gIH0pO1xuICB2YXIgZGVyZWcyID0gc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFycjI7XG4gIH0sIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSwgaWksIGo7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgZm9yIChpID0gMCwgaWkgPSBhcnIxLmxlbmd0aCwgaiA9IGFycjIubGVuZ3RoIC0gMTsgaSA8IGlpOyArK2kpIHtcbiAgICAgICAgaWYgKGZpbHRlcihhcnIxW2ldKSkge1xuICAgICAgICAgIGFycjFbaV0gPSBhcnIyW2otLV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5hc3NlcnQoaiA9PSAtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDAsIGlpID0gYXJyMS5sZW5ndGgsIGogPSAwOyBpIDwgaWk7ICsraSkge1xuICAgICAgICBpZiAoZmlsdGVyKGFycjFbaV0pKSB7XG4gICAgICAgICAgYXJyMVtpXSA9IGFycjJbaisrXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmFzc2VydChqID09IGFycjIubGVuZ3RoKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRlcmVnMSgpO1xuICAgIGRlcmVnMigpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzeW5jQXJyYXlzOyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==