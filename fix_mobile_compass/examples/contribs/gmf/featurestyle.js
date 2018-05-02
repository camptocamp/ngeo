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
/******/ 		"featurestyle": 0
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
/******/ 	deferredModules.push([10,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/featurestyle.css":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./contribs/gmf/examples/featurestyle.js":
/*!***********************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _featurestyle_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./featurestyle.css */ "./contribs/gmf/examples/featurestyle.css");
/* harmony import */ var _featurestyle_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_featurestyle_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_drawing_featureStyleComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/drawing/featureStyleComponent.js */ "./contribs/gmf/src/drawing/featureStyleComponent.js");
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/format/FeatureProperties.js */ "./src/format/FeatureProperties.js");
/* harmony import */ var ngeo_misc_FeatureHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/FeatureHelper.js */ "./src/misc/FeatureHelper.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_Circle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/Circle.js */ "./node_modules/ol/geom/Circle.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
MainController.$inject = ["$scope", "ngeoFeatureHelper"];

















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_drawing_featureStyleComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_misc_FeatureHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
module.value('ngeoMeasureDecimals', 2);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

function MainController($scope, ngeoFeatureHelper) {
  var _this = this;

  this.scope_ = $scope;
  this.featureHelper_ = ngeoFeatureHelper;
  var features = [];
  var pointProperties = {
    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__["default"]([-8458215, 6672646])
  };
  pointProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#009D57';
  pointProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Point1';
  pointProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].SIZE] = '6';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](pointProperties));
  var textProperties = {
    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__["default"]([-8007848, 6209744])
  };
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].ANGLE] = '0';
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].IS_TEXT] = true;
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Text 1';
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].SIZE] = '16';
  textProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](textProperties));
  var lineProperties = {
    geometry: new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_10__["default"]([[-8321240, 6523441], [-8103547, 6726458], [-8091318, 6408480], [-7973910, 6631065]])
  };
  lineProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#0BA9CC';
  lineProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'LineString 1';
  lineProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '4';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](lineProperties));
  var poly1Properties = {
    geometry: new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["default"]([[[-8512027, 6359560], [-8531595, 6080718], [-8267428, 6031798], [-8238077, 6247045], [-8512027, 6359560]]])
  };
  poly1Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#4186F0';
  poly1Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Polygon 1';
  poly1Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  poly1Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].SHOW_MEASURE] = true;
  poly1Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '1';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](poly1Properties));
  var poly2Properties = {
    geometry: new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["default"]([[[-7952508, 6096617], [-8051570, 5959642], [-7848554, 5926621], [-7754383, 6025683], [-7952508, 6096617]]])
  };
  poly2Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#CCCCCC';
  poly2Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Polygon 2';
  poly2Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '1';
  poly2Properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '3';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](poly2Properties));
  var rectProperties = {
    geometry: Object(ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["fromExtent"])([-7874848, 6496535, -7730535, 6384020])
  };
  rectProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  rectProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].IS_RECTANGLE] = true;
  rectProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Rectangle 1';
  rectProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  rectProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](rectProperties));
  var circleProperties = {
    geometry: Object(ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["fromCircle"])(new ol_geom_Circle_js__WEBPACK_IMPORTED_MODULE_9__["default"]([-7691093, 6166327], 35000), 64)
  };
  circleProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  circleProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].IS_CIRCLE] = true;
  circleProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Circle 1';
  circleProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  circleProperties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_6__["default"](circleProperties));
  var view = new ol_View_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
    center: [-8174482, 6288627],
    zoom: 6
  });
  ngeoFeatureHelper.setProjection(view.getProjection());
  features.forEach(function (feature) {
    ngeoFeatureHelper.setStyle(feature);
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__["default"]()
    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
      source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
        wrapX: false,
        features: features
      })
    })],
    view: view
  });
  this.selectedFeature = null;
  this.map.on('singleclick', function (evt) {
    _this.handleMapSingleClick_.bind(_this);
  });
}

MainController.prototype.handleMapSingleClick_ = function (evt) {
  var pixel = evt.pixel;
  var feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  if (this.selectedFeature) {
    this.featureHelper_.setStyle(this.selectedFeature);
  }

  if (feature) {
    if (this.selectedFeature !== feature) {
      this.selectedFeature = feature;
      this.featureHelper_.setStyle(feature, true);
    }
  } else {
    this.selectedFeature = null;
  }

  this.scope_.$apply();
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 10:
/*!**********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/featurestyle.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./contribs/gmf/src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/featurestyle.js */"./contribs/gmf/examples/featurestyle.js");


/***/ })

/******/ });
//# sourceMappingURL=featurestyle.js.map