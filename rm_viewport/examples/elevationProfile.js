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
/******/ 	deferredModules.push([15,"commons"]);
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

eval("\n\n//# sourceURL=webpack:///./examples/elevationProfile.css?");

/***/ }),

/***/ "./examples/elevationProfile.js":
/*!**************************************!*\
  !*** ./examples/elevationProfile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevationProfile.css */ \"./examples/elevationProfile.css\");\n/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/LineString.js */ \"./node_modules/ol/geom/LineString.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Image.js */ \"./node_modules/ol/layer/Image.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/ImageWMS.js */ \"./node_modules/ol/source/ImageWMS.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/profile/elevationComponent.js */ \"./src/profile/elevationComponent.js\");\nMainController.$inject = [\"$http\", \"$scope\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"].name, ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"].name]);\n\nfunction MainController($http, $scope) {\n  var _this = this;\n\n  this.scope_ = $scope;\n  var source = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]();\n  var source2 = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n    projection: undefined,\n    url: 'http://wms.geo.admin.ch/',\n    crossOrigin: 'anonymous',\n    attributions: '&copy; ' + '<a href=\"http://www.geo.admin.ch/internet/geoportal/' + 'en/home.html\">Pixelmap 1:500000 / geo.admin.ch</a>',\n    params: {\n      'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',\n      'FORMAT': 'image/jpeg'\n    },\n    serverType: 'mapserver'\n  });\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n    layers: [new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      source: source2\n    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      source: source\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n      extent: [420000, 30000, 900000, 350000],\n      zoom: 0,\n      center: [0, 0]\n    })\n  });\n  var map = this.map;\n  var vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]()\n  });\n  this.snappedPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n  vectorLayer.getSource().addFeature(this.snappedPoint_);\n  vectorLayer.setMap(map);\n  this.profilePoisData = [{\n    sort: 1,\n    dist: 1000,\n    title: 'First POI',\n    id: 12345\n  }, {\n    sort: 2,\n    dist: 3000,\n    title: 'Second POI',\n    id: 12346\n  }];\n  this.profileData = undefined;\n  $http.get('data/profile.json').then(function (resp) {\n    var data = resp.data.profile;\n    _this.profileData = data;\n    var i;\n    var len = data.length;\n    var lineString = new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]([], 'XYM');\n\n    for (i = 0; i < len; i++) {\n      var p = data[i];\n      lineString.appendCoordinate([p.x, p.y, p.dist]);\n    }\n\n    source.addFeature(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](lineString));\n\n    var size = _this.map.getSize();\n\n    if (size === undefined) {\n      throw new Error('Missing size');\n    }\n\n    map.getView().fit(source.getExtent(), {\n      size: size\n    });\n  });\n  map.on('pointermove', function (evt) {\n    if (evt.dragging) {\n      return;\n    }\n\n    var coordinate = map.getEventCoordinate(evt.originalEvent);\n    var geometry = source.getFeatures()[0].getGeometry();\n\n    if (!geometry) {\n      throw new Error('Missing geometry');\n    }\n\n    _this.snapToGeometry(coordinate, geometry);\n  });\n\n  var typedFunctionsFactory = function typedFunctionsFactory(type, key, opt_childKey) {\n    return function (item) {\n      if (opt_childKey !== undefined) {\n        item = item[opt_childKey];\n      }\n\n      return item[key];\n    };\n  };\n\n  var types = {\n    number: 1,\n    string: ''\n  };\n  var distanceExtractor = typedFunctionsFactory(types.number, 'dist');\n  var linesConfiguration = {\n    'line1': {\n      style: {},\n      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values')\n    }\n  };\n  var sort = typedFunctionsFactory(types.number, 'sort');\n  var id = typedFunctionsFactory(types.string, 'id');\n  var dist = typedFunctionsFactory(types.number, 'dist');\n  var title = typedFunctionsFactory(types.string, 'title');\n  var poiExtractor = {\n    sort: sort,\n    id: id,\n    dist: dist,\n    title: title,\n    z: function z(item, opt_z) {\n      if (opt_z !== undefined) {\n        item.z = opt_z;\n      }\n\n      return item.z;\n    }\n  };\n\n  var hoverCallback = function hoverCallback(point) {\n    _this.point = point;\n\n    _this.snappedPoint_.setGeometry(new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]([point.x, point.y]));\n  };\n\n  var outCallback = function outCallback() {\n    _this.point = null;\n\n    _this.snappedPoint_.setGeometry(undefined);\n  };\n\n  this.profileOptions = {\n    distanceExtractor: distanceExtractor,\n    linesConfiguration: linesConfiguration,\n    poiExtractor: poiExtractor,\n    hoverCallback: hoverCallback,\n    outCallback: outCallback\n  };\n  this.point = null;\n  this.profileHighlight = undefined;\n}\n\nMainController.prototype.snapToGeometry = function (coordinate, geometry) {\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  var closestPoint = geometry.getClosestPoint(coordinate);\n  var dx = closestPoint[0] - coordinate[0];\n  var dy = closestPoint[1] - coordinate[1];\n  var dist = Math.sqrt(dx * dx + dy * dy);\n  var resolution = this.map.getView().getResolution();\n\n  if (resolution === undefined) {\n    throw new Error('Missing resolution');\n  }\n\n  var pixelDist = dist / resolution;\n\n  if (pixelDist < 8) {\n    this.profileHighlight = closestPoint[2];\n  } else {\n    this.profileHighlight = -1;\n  }\n\n  this.scope_.$apply();\n};\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/elevationProfile.js?");

/***/ }),

/***/ 15:
/*!*************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/elevationProfile.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/elevationProfile.js */\"./examples/elevationProfile.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/elevationProfile.js?");

/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");

/***/ })

/******/ });