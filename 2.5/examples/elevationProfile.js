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
/******/ 		"elevationProfile": 0
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
/******/ 	deferredModules.push([13,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/elevationProfile.css":
/*!***************************************!*\
  !*** ./examples/elevationProfile.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/elevationProfile.js":
/*!**************************************!*\
  !*** ./examples/elevationProfile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevationProfile.css */ "./examples/elevationProfile.css");
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/profile/elevationComponent.js */ "./src/profile/elevationComponent.js");
MainController.$inject = ["$http", "$scope"];














var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__["default"].name, ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);

function MainController($http, $scope) {
  var _this = this;

  this.scope_ = $scope;
  var source = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]();
  var source2 = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
    projection: undefined,
    url: 'https://wms.geo.admin.ch/',
    crossOrigin: 'anonymous',
    attributions: '&copy; ' + '<a href="https://www.geo.admin.ch/internet/geoportal/' + 'en/home.html">Pixelmap 1:500000 / geo.admin.ch</a>',
    params: {
      'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
      'FORMAT': 'image/jpeg'
    },
    serverType: 'mapserver'
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    layers: [new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      source: source2
    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: source
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
      projection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      extent: [420000, 30000, 900000, 350000],
      zoom: 0,
      center: [0, 0]
    })
  });
  var map = this.map;
  var vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]()
  });
  this.snappedPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  vectorLayer.getSource().addFeature(this.snappedPoint_);
  vectorLayer.setMap(map);
  this.profilePoisData = [{
    sort: 1,
    dist: 1000,
    title: 'First POI',
    id: 12345
  }, {
    sort: 2,
    dist: 3000,
    title: 'Second POI',
    id: 12346
  }];
  this.profileData = undefined;
  $http.get('data/profile.json').then(function (resp) {
    var data = resp.data.profile;
    _this.profileData = data;
    var i;
    var len = data.length;
    var lineString = new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__["default"]([], 'XYM');

    for (i = 0; i < len; i++) {
      var p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }

    source.addFeature(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](lineString));

    var size = _this.map.getSize();

    if (size === undefined) {
      throw new Error('Missing size');
    }

    map.getView().fit(source.getExtent(), {
      size: size
    });
  });
  map.on('pointermove', function (evt) {
    if (evt.dragging) {
      return;
    }

    var coordinate = map.getEventCoordinate(evt.originalEvent);
    var geometry = source.getFeatures()[0].getGeometry();

    if (!geometry) {
      throw new Error('Missing geometry');
    }

    _this.snapToGeometry(coordinate, geometry);
  });

  var typedFunctionsFactory = function typedFunctionsFactory(type, key, opt_childKey) {
    return function (item) {
      if (opt_childKey !== undefined) {
        item = item[opt_childKey];
      }

      return item[key];
    };
  };

  var types = {
    number: 1,
    string: ''
  };
  var distanceExtractor = typedFunctionsFactory(types.number, 'dist');
  var linesConfiguration = {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values')
    }
  };
  var sort = typedFunctionsFactory(types.number, 'sort');
  var id = typedFunctionsFactory(types.string, 'id');
  var dist = typedFunctionsFactory(types.number, 'dist');
  var title = typedFunctionsFactory(types.string, 'title');
  var poiExtractor = {
    sort: sort,
    id: id,
    dist: dist,
    title: title,
    z: function z(item, opt_z) {
      if (opt_z !== undefined) {
        item.z = opt_z;
      }

      return item.z;
    }
  };

  var hoverCallback = function hoverCallback(point) {
    _this.point = point;

    _this.snappedPoint_.setGeometry(new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__["default"]([point.x, point.y]));
  };

  var outCallback = function outCallback() {
    _this.point = null;

    _this.snappedPoint_.setGeometry(undefined);
  };

  this.profileOptions = {
    distanceExtractor: distanceExtractor,
    linesConfiguration: linesConfiguration,
    poiExtractor: poiExtractor,
    hoverCallback: hoverCallback,
    outCallback: outCallback
  };
  this.point = null;
  this.profileHighlight = undefined;
}

MainController.prototype.snapToGeometry = function (coordinate, geometry) {
  if (!this.map) {
    throw new Error('Missing map');
  }

  var closestPoint = geometry.getClosestPoint(coordinate);
  var dx = closestPoint[0] - coordinate[0];
  var dy = closestPoint[1] - coordinate[1];
  var dist = Math.sqrt(dx * dx + dy * dy);
  var resolution = this.map.getView().getResolution();

  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }

  var pixelDist = dist / resolution;

  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }

  this.scope_.$apply();
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 13:
/*!*************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/elevationProfile.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/elevationProfile.js */"./examples/elevationProfile.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uUHJvZmlsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJlbGV2YXRpb25Qcm9maWxlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzEzLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiRzY29wZVwiXTtcbmltcG9ydCAnLi9lbGV2YXRpb25Qcm9maWxlLmNzcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICdAZ2VvYmxvY2tzL3Byb2ovc3JjL0VQU0dfMjA1Ni5qcyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sR2VvbUxpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UuanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50IGZyb20gJ25nZW8vcHJvZmlsZS9lbGV2YXRpb25Db21wb25lbnQuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50Lm5hbWVdKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJGh0dHAsICRzY29wZSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuICB2YXIgc291cmNlID0gbmV3IG9sU291cmNlVmVjdG9yKCk7XG4gIHZhciBzb3VyY2UyID0gbmV3IG9sU291cmNlSW1hZ2VXTVMoe1xuICAgIHByb2plY3Rpb246IHVuZGVmaW5lZCxcbiAgICB1cmw6ICdodHRwczovL3dtcy5nZW8uYWRtaW4uY2gvJyxcbiAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXG4gICAgYXR0cmlidXRpb25zOiAnJmNvcHk7ICcgKyAnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lmdlby5hZG1pbi5jaC9pbnRlcm5ldC9nZW9wb3J0YWwvJyArICdlbi9ob21lLmh0bWxcIj5QaXhlbG1hcCAxOjUwMDAwMCAvIGdlby5hZG1pbi5jaDwvYT4nLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdjaC5zd2lzc3RvcG8ucGl4ZWxrYXJ0ZS1mYXJiZS1wazEwMDAubm9zY2FsZScsXG4gICAgICAnRk9STUFUJzogJ2ltYWdlL2pwZWcnXG4gICAgfSxcbiAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJ1xuICB9KTtcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVySW1hZ2Uoe1xuICAgICAgc291cmNlOiBzb3VyY2UyXG4gICAgfSksIG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICBleHRlbnQ6IFs0MjAwMDAsIDMwMDAwLCA5MDAwMDAsIDM1MDAwMF0sXG4gICAgICB6b29tOiAwLFxuICAgICAgY2VudGVyOiBbMCwgMF1cbiAgICB9KVxuICB9KTtcbiAgdmFyIG1hcCA9IHRoaXMubWFwO1xuICB2YXIgdmVjdG9yTGF5ZXIgPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3IoKVxuICB9KTtcbiAgdGhpcy5zbmFwcGVkUG9pbnRfID0gbmV3IG9sRmVhdHVyZSgpO1xuICB2ZWN0b3JMYXllci5nZXRTb3VyY2UoKS5hZGRGZWF0dXJlKHRoaXMuc25hcHBlZFBvaW50Xyk7XG4gIHZlY3RvckxheWVyLnNldE1hcChtYXApO1xuICB0aGlzLnByb2ZpbGVQb2lzRGF0YSA9IFt7XG4gICAgc29ydDogMSxcbiAgICBkaXN0OiAxMDAwLFxuICAgIHRpdGxlOiAnRmlyc3QgUE9JJyxcbiAgICBpZDogMTIzNDVcbiAgfSwge1xuICAgIHNvcnQ6IDIsXG4gICAgZGlzdDogMzAwMCxcbiAgICB0aXRsZTogJ1NlY29uZCBQT0knLFxuICAgIGlkOiAxMjM0NlxuICB9XTtcbiAgdGhpcy5wcm9maWxlRGF0YSA9IHVuZGVmaW5lZDtcbiAgJGh0dHAuZ2V0KCdkYXRhL3Byb2ZpbGUuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICB2YXIgZGF0YSA9IHJlc3AuZGF0YS5wcm9maWxlO1xuICAgIF90aGlzLnByb2ZpbGVEYXRhID0gZGF0YTtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgdmFyIGxpbmVTdHJpbmcgPSBuZXcgb2xHZW9tTGluZVN0cmluZyhbXSwgJ1hZTScpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgcCA9IGRhdGFbaV07XG4gICAgICBsaW5lU3RyaW5nLmFwcGVuZENvb3JkaW5hdGUoW3AueCwgcC55LCBwLmRpc3RdKTtcbiAgICB9XG5cbiAgICBzb3VyY2UuYWRkRmVhdHVyZShuZXcgb2xGZWF0dXJlKGxpbmVTdHJpbmcpKTtcblxuICAgIHZhciBzaXplID0gX3RoaXMubWFwLmdldFNpemUoKTtcblxuICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgfVxuXG4gICAgbWFwLmdldFZpZXcoKS5maXQoc291cmNlLmdldEV4dGVudCgpLCB7XG4gICAgICBzaXplOiBzaXplXG4gICAgfSk7XG4gIH0pO1xuICBtYXAub24oJ3BvaW50ZXJtb3ZlJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGlmIChldnQuZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29vcmRpbmF0ZSA9IG1hcC5nZXRFdmVudENvb3JkaW5hdGUoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuICAgIHZhciBnZW9tZXRyeSA9IHNvdXJjZS5nZXRGZWF0dXJlcygpWzBdLmdldEdlb21ldHJ5KCk7XG5cbiAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICB9XG5cbiAgICBfdGhpcy5zbmFwVG9HZW9tZXRyeShjb29yZGluYXRlLCBnZW9tZXRyeSk7XG4gIH0pO1xuXG4gIHZhciB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkgPSBmdW5jdGlvbiB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkodHlwZSwga2V5LCBvcHRfY2hpbGRLZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGlmIChvcHRfY2hpbGRLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtID0gaXRlbVtvcHRfY2hpbGRLZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIHR5cGVzID0ge1xuICAgIG51bWJlcjogMSxcbiAgICBzdHJpbmc6ICcnXG4gIH07XG4gIHZhciBkaXN0YW5jZUV4dHJhY3RvciA9IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSh0eXBlcy5udW1iZXIsICdkaXN0Jyk7XG4gIHZhciBsaW5lc0NvbmZpZ3VyYXRpb24gPSB7XG4gICAgJ2xpbmUxJzoge1xuICAgICAgc3R5bGU6IHt9LFxuICAgICAgekV4dHJhY3RvcjogdHlwZWRGdW5jdGlvbnNGYWN0b3J5KHR5cGVzLm51bWJlciwgJ21udCcsICd2YWx1ZXMnKVxuICAgIH1cbiAgfTtcbiAgdmFyIHNvcnQgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkodHlwZXMubnVtYmVyLCAnc29ydCcpO1xuICB2YXIgaWQgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkodHlwZXMuc3RyaW5nLCAnaWQnKTtcbiAgdmFyIGRpc3QgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkodHlwZXMubnVtYmVyLCAnZGlzdCcpO1xuICB2YXIgdGl0bGUgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkodHlwZXMuc3RyaW5nLCAndGl0bGUnKTtcbiAgdmFyIHBvaUV4dHJhY3RvciA9IHtcbiAgICBzb3J0OiBzb3J0LFxuICAgIGlkOiBpZCxcbiAgICBkaXN0OiBkaXN0LFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICB6OiBmdW5jdGlvbiB6KGl0ZW0sIG9wdF96KSB7XG4gICAgICBpZiAob3B0X3ogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtLnogPSBvcHRfejtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW0uejtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGhvdmVyQ2FsbGJhY2sgPSBmdW5jdGlvbiBob3ZlckNhbGxiYWNrKHBvaW50KSB7XG4gICAgX3RoaXMucG9pbnQgPSBwb2ludDtcblxuICAgIF90aGlzLnNuYXBwZWRQb2ludF8uc2V0R2VvbWV0cnkobmV3IG9sR2VvbVBvaW50KFtwb2ludC54LCBwb2ludC55XSkpO1xuICB9O1xuXG4gIHZhciBvdXRDYWxsYmFjayA9IGZ1bmN0aW9uIG91dENhbGxiYWNrKCkge1xuICAgIF90aGlzLnBvaW50ID0gbnVsbDtcblxuICAgIF90aGlzLnNuYXBwZWRQb2ludF8uc2V0R2VvbWV0cnkodW5kZWZpbmVkKTtcbiAgfTtcblxuICB0aGlzLnByb2ZpbGVPcHRpb25zID0ge1xuICAgIGRpc3RhbmNlRXh0cmFjdG9yOiBkaXN0YW5jZUV4dHJhY3RvcixcbiAgICBsaW5lc0NvbmZpZ3VyYXRpb246IGxpbmVzQ29uZmlndXJhdGlvbixcbiAgICBwb2lFeHRyYWN0b3I6IHBvaUV4dHJhY3RvcixcbiAgICBob3ZlckNhbGxiYWNrOiBob3ZlckNhbGxiYWNrLFxuICAgIG91dENhbGxiYWNrOiBvdXRDYWxsYmFja1xuICB9O1xuICB0aGlzLnBvaW50ID0gbnVsbDtcbiAgdGhpcy5wcm9maWxlSGlnaGxpZ2h0ID0gdW5kZWZpbmVkO1xufVxuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuc25hcFRvR2VvbWV0cnkgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgZ2VvbWV0cnkpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIHZhciBjbG9zZXN0UG9pbnQgPSBnZW9tZXRyeS5nZXRDbG9zZXN0UG9pbnQoY29vcmRpbmF0ZSk7XG4gIHZhciBkeCA9IGNsb3Nlc3RQb2ludFswXSAtIGNvb3JkaW5hdGVbMF07XG4gIHZhciBkeSA9IGNsb3Nlc3RQb2ludFsxXSAtIGNvb3JkaW5hdGVbMV07XG4gIHZhciBkaXN0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgdmFyIHJlc29sdXRpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xuXG4gIGlmIChyZXNvbHV0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVzb2x1dGlvbicpO1xuICB9XG5cbiAgdmFyIHBpeGVsRGlzdCA9IGRpc3QgLyByZXNvbHV0aW9uO1xuXG4gIGlmIChwaXhlbERpc3QgPCA4KSB7XG4gICAgdGhpcy5wcm9maWxlSGlnaGxpZ2h0ID0gY2xvc2VzdFBvaW50WzJdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucHJvZmlsZUhpZ2hsaWdodCA9IC0xO1xuICB9XG5cbiAgdGhpcy5zY29wZV8uJGFwcGx5KCk7XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9