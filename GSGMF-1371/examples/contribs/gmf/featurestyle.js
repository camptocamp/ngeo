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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
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
    _this.handleMapSingleClick_;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXN0eWxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9mZWF0dXJlc3R5bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImZlYXR1cmVzdHlsZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsxMCxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibmdlb0ZlYXR1cmVIZWxwZXJcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCAnLi9mZWF0dXJlc3R5bGUuY3NzJztcbmltcG9ydCBnbWZEcmF3aW5nRmVhdHVyZVN0eWxlQ29tcG9uZW50IGZyb20gJ2dtZi9kcmF3aW5nL2ZlYXR1cmVTdHlsZUNvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50LmpzJztcbmltcG9ydCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMgZnJvbSAnbmdlby9mb3JtYXQvRmVhdHVyZVByb3BlcnRpZXMuanMnO1xuaW1wb3J0IG5nZW9NaXNjRmVhdHVyZUhlbHBlciBmcm9tICduZ2VvL21pc2MvRmVhdHVyZUhlbHBlci5qcyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sR2VvbUNpcmNsZSBmcm9tICdvbC9nZW9tL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcuanMnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQuanMnO1xuaW1wb3J0IG9sR2VvbVBvbHlnb24sIHsgZnJvbUNpcmNsZSBhcyBvbEdlb21Qb2x5Z29uRnJvbUNpcmNsZSwgZnJvbUV4dGVudCBhcyBvbEdlb21Qb2x5Z29uRnJvbUV4dGVudCB9IGZyb20gJ29sL2dlb20vUG9seWdvbi5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3IuanMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00uanMnO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3IuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbJ2dldHRleHQnLCBnbWZEcmF3aW5nRmVhdHVyZVN0eWxlQ29tcG9uZW50Lm5hbWUsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBuZ2VvTWlzY0ZlYXR1cmVIZWxwZXIubmFtZV0pO1xubW9kdWxlLnZhbHVlKCduZ2VvTWVhc3VyZURlY2ltYWxzJywgMik7XG5tb2R1bGUuY29uc3RhbnQoJ2RlZmF1bHRUaGVtZScsICdEZW1vJyk7XG5tb2R1bGUuY29uc3RhbnQoJ2FuZ3VsYXJMb2NhbGVTY3JpcHQnLCAnLi4vYnVpbGQvYW5ndWxhci1sb2NhbGVfe3tsb2NhbGV9fS5qcycpO1xuXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsIG5nZW9GZWF0dXJlSGVscGVyKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gIHRoaXMuZmVhdHVyZUhlbHBlcl8gPSBuZ2VvRmVhdHVyZUhlbHBlcjtcbiAgdmFyIGZlYXR1cmVzID0gW107XG4gIHZhciBwb2ludFByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludChbLTg0NTgyMTUsIDY2NzI2NDZdKVxuICB9O1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDA5RDU3JztcbiAgcG9pbnRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdQb2ludDEnO1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNJWkVdID0gJzYnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUocG9pbnRQcm9wZXJ0aWVzKSk7XG4gIHZhciB0ZXh0UHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KFstODAwNzg0OCwgNjIwOTc0NF0pXG4gIH07XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5BTkdMRV0gPSAnMCc7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5DT0xPUl0gPSAnIzAwMDAwMCc7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19URVhUXSA9IHRydWU7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdUZXh0IDEnO1xuICB0ZXh0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU0laRV0gPSAnMTYnO1xuICB0ZXh0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICcyJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKHRleHRQcm9wZXJ0aWVzKSk7XG4gIHZhciBsaW5lUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbUxpbmVTdHJpbmcoW1stODMyMTI0MCwgNjUyMzQ0MV0sIFstODEwMzU0NywgNjcyNjQ1OF0sIFstODA5MTMxOCwgNjQwODQ4MF0sIFstNzk3MzkxMCwgNjYzMTA2NV1dKVxuICB9O1xuICBsaW5lUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwQkE5Q0MnO1xuICBsaW5lUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuTkFNRV0gPSAnTGluZVN0cmluZyAxJztcbiAgbGluZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNUUk9LRV0gPSAnNCc7XG4gIGZlYXR1cmVzLnB1c2gobmV3IG9sRmVhdHVyZShsaW5lUHJvcGVydGllcykpO1xuICB2YXIgcG9seTFQcm9wZXJ0aWVzID0ge1xuICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9seWdvbihbW1stODUxMjAyNywgNjM1OTU2MF0sIFstODUzMTU5NSwgNjA4MDcxOF0sIFstODI2NzQyOCwgNjAzMTc5OF0sIFstODIzODA3NywgNjI0NzA0NV0sIFstODUxMjAyNywgNjM1OTU2MF1dXSlcbiAgfTtcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5DT0xPUl0gPSAnIzQxODZGMCc7XG4gIHBvbHkxUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuTkFNRV0gPSAnUG9seWdvbiAxJztcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICBwb2x5MVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNIT1dfTUVBU1VSRV0gPSB0cnVlO1xuICBwb2x5MVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNUUk9LRV0gPSAnMSc7XG4gIGZlYXR1cmVzLnB1c2gobmV3IG9sRmVhdHVyZShwb2x5MVByb3BlcnRpZXMpKTtcbiAgdmFyIHBvbHkyUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbVBvbHlnb24oW1tbLTc5NTI1MDgsIDYwOTY2MTddLCBbLTgwNTE1NzAsIDU5NTk2NDJdLCBbLTc4NDg1NTQsIDU5MjY2MjFdLCBbLTc3NTQzODMsIDYwMjU2ODNdLCBbLTc5NTI1MDgsIDYwOTY2MTddXV0pXG4gIH07XG4gIHBvbHkyUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyNDQ0NDQ0MnO1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ1BvbHlnb24gMic7XG4gIHBvbHkyUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuT1BBQ0lUWV0gPSAnMSc7XG4gIHBvbHkyUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICczJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKHBvbHkyUHJvcGVydGllcykpO1xuICB2YXIgcmVjdFByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG9sR2VvbVBvbHlnb25Gcm9tRXh0ZW50KFstNzg3NDg0OCwgNjQ5NjUzNSwgLTc3MzA1MzUsIDYzODQwMjBdKVxuICB9O1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwMDAwMDAnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfUkVDVEFOR0xFXSA9IHRydWU7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdSZWN0YW5nbGUgMSc7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICcyJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKHJlY3RQcm9wZXJ0aWVzKSk7XG4gIHZhciBjaXJjbGVQcm9wZXJ0aWVzID0ge1xuICAgIGdlb21ldHJ5OiBvbEdlb21Qb2x5Z29uRnJvbUNpcmNsZShuZXcgb2xHZW9tQ2lyY2xlKFstNzY5MTA5MywgNjE2NjMyN10sIDM1MDAwKSwgNjQpXG4gIH07XG4gIGNpcmNsZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDAwMDAwJztcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfQ0lSQ0xFXSA9IHRydWU7XG4gIGNpcmNsZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ0NpcmNsZSAxJztcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuT1BBQ0lUWV0gPSAnMC41JztcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICcyJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKGNpcmNsZVByb3BlcnRpZXMpKTtcbiAgdmFyIHZpZXcgPSBuZXcgb2xWaWV3KHtcbiAgICBjZW50ZXI6IFstODE3NDQ4MiwgNjI4ODYyN10sXG4gICAgem9vbTogNlxuICB9KTtcbiAgbmdlb0ZlYXR1cmVIZWxwZXIuc2V0UHJvamVjdGlvbih2aWV3LmdldFByb2plY3Rpb24oKSk7XG4gIGZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICBuZ2VvRmVhdHVyZUhlbHBlci5zZXRTdHlsZShmZWF0dXJlKTtcbiAgfSk7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pLCBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICAgIHdyYXBYOiBmYWxzZSxcbiAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gICAgICB9KVxuICAgIH0pXSxcbiAgICB2aWV3OiB2aWV3XG4gIH0pO1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG4gIHRoaXMubWFwLm9uKCdzaW5nbGVjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBfdGhpcy5oYW5kbGVNYXBTaW5nbGVDbGlja187XG4gIH0pO1xufVxuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlTWFwU2luZ2xlQ2xpY2tfID0gZnVuY3Rpb24gKGV2dCkge1xuICB2YXIgcGl4ZWwgPSBldnQucGl4ZWw7XG4gIHZhciBmZWF0dXJlID0gdGhpcy5tYXAuZm9yRWFjaEZlYXR1cmVBdFBpeGVsKHBpeGVsLCBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHJldHVybiBmZWF0dXJlO1xuICB9KTtcblxuICBpZiAodGhpcy5zZWxlY3RlZEZlYXR1cmUpIHtcbiAgICB0aGlzLmZlYXR1cmVIZWxwZXJfLnNldFN0eWxlKHRoaXMuc2VsZWN0ZWRGZWF0dXJlKTtcbiAgfVxuXG4gIGlmIChmZWF0dXJlKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGZWF0dXJlICE9PSBmZWF0dXJlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICB0aGlzLmZlYXR1cmVIZWxwZXJfLnNldFN0eWxlKGZlYXR1cmUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG4gIH1cblxuICB0aGlzLnNjb3BlXy4kYXBwbHkoKTtcbn07XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=