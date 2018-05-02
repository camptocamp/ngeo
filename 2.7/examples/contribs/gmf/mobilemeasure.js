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
/******/ 		"mobilemeasure": 0
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
/******/ 	deferredModules.push([11,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/mobilemeasure.css":
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./contribs/gmf/examples/mobilemeasure.js":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mobilemeasure.css */ "./contribs/gmf/examples/mobilemeasure.css");
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/permalink/Permalink */ "./src/permalink/Permalink.js");
/* harmony import */ var gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/mobile/measure/areaComponent */ "./src/mobile/measure/areaComponent.js");
/* harmony import */ var gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/mobile/measure/lengthComponent */ "./src/mobile/measure/lengthComponent.js");
/* harmony import */ var gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/mobile/measure/pointComponent */ "./src/mobile/measure/pointComponent.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
MainController.$inject = ["gmfPermalink"];
















var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__["default"].name, ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__["default"].name]);
function MainController(gmfPermalink) {
  var center = gmfPermalink.getMapCenter() || [537635, 152640];
  var zoom = gmfPermalink.getMapZoom() || 3;
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_10__["default"]({
    layers: [new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_13__["default"]({
      source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__["default"]()
    })],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_11__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom
    })
  });
  this.map.addControl(new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__["default"]({
    dpi: 96
  }));
  this.measureAreaActive = false;
  this.measureLengthActive = false;
  this.measurePointActive = false;
}
myModule.controller('MainController', MainController);
var sketchStyle = {
  fill: {
    color: 'rgba(255, 255, 255, 0.2)'
  },
  stroke: {
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2
  },
  regularShape: {
    stroke: {
      color: 'rgba(0, 0, 0, 0.7)',
      width: 2
    },
    points: 4,
    radius: 8,
    radius2: 0,
    angle: 0
  }
};
myModule.constant('gmfMobileMeasurePointOptions', {
  sketchStyle: sketchStyle,
  decimals: 2,
  format: '{x}, {y}',
  rasterLayers: [{
    name: 'aster',
    unit: 'm',
    decimals: 2
  }, {
    name: 'srtm',
    unit: 'm'
  }]
});
myModule.constant('gmfMobileMeasureLengthOptions', {
  sketchStyle: sketchStyle
});
myModule.constant('gmfMobileMeasureAreaOptions', {
  sketchStyle: sketchStyle
});
Object(_options__WEBPACK_IMPORTED_MODULE_15__["default"])(myModule);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(739);

/***/ }),

/***/ "./src/interaction/MeasureAreaMobile.js":
/*!**********************************************!*\
  !*** ./src/interaction/MeasureAreaMobile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureArea */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var MeasureAreaMobile = function (_ngeoInteractionMeasu) {
  function MeasureAreaMobile(format, gettextCatalog, options) {
    if (options === void 0) {
      options = {};
    }
    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }
  _inheritsLoose(MeasureAreaMobile, _ngeoInteractionMeasu);
  var _proto = MeasureAreaMobile.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Polygon',
      style: style
    });
  };
  return MeasureAreaMobile;
}(ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (MeasureAreaMobile);

/***/ }),

/***/ "./src/interaction/MeasureLengthMobile.js":
/*!************************************************!*\
  !*** ./src/interaction/MeasureLengthMobile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureLength */ "./src/interaction/MeasureLength.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var _default = function (_ngeoInteractionMeasu) {
  function _default(format, gettextCatalog, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }
  _inheritsLoose(_default, _ngeoInteractionMeasu);
  var _proto = _default.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'LineString',
      style: style
    });
  };
  return _default;
}(ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/interaction/MeasurePointMobile.js":
/*!***********************************************!*\
  !*** ./src/interaction/MeasurePointMobile.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/Measure */ "./src/interaction/Measure.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var _default = function (_ngeoInteractionMeasu) {
  function _default(format, coordFormat, options) {
    var _this;
    if (options === void 0) {
      options = {};
    }
    Object.assign(options, {
      displayHelpTooltip: false
    });
    _this = _ngeoInteractionMeasu.call(this, options) || this;
    _this.format_ = format;
    _this.coordFormat_ = coordFormat;
    return _this;
  }
  _inheritsLoose(_default, _ngeoInteractionMeasu);
  var _proto = _default.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Point',
      style: style
    });
  };
  _proto.handleMeasure = function handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    var geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      throw new Error('Missing geometry');
    }
    var dec = this.decimals;
    var output = Object(ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__["getFormattedPoint"])(geom, dec, this.format_, this.coordFormat_);
    var coord = geom.getLastCoordinate();
    callback(output, coord);
  };
  return _default;
}(ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/interaction/MobileDraw.js":
/*!***************************************!*\
  !*** ./src/interaction/MobileDraw.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/common */ "./src/interaction/common.js");
/* harmony import */ var ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/CustomEvent */ "./src/CustomEvent.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/functions */ "./node_modules/ol/functions.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/SimpleGeometry */ "./node_modules/ol/geom/SimpleGeometry.js");
/* harmony import */ var ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Interaction */ "./node_modules/ol/interaction/Interaction.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var _default = function (_olInteractionInterac) {
  function _default(options) {
    var _this;
    _this = _olInteractionInterac.call(this, {
      handleEvent: ol_functions__WEBPACK_IMPORTED_MODULE_4__["TRUE"]
    }) || this;
    _this.changeEventKey_ = null;
    _this.type_ = options.type;
    _this.minPoints_ = options.minPoints ? options.minPoints : _this.type_ === 'Polygon' ? 3 : 2;
    _this.sketchFeature_ = null;
    _this.sketchPoints_ = [];
    _this.sketchPoint_ = null;
    _this.overlay_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
      source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false
      }),
      style: options.style || Object(ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__["getDefaultDrawStyleFunction"])(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["listen"])(_this, 'change:active', _this.updateState_, _this);
    _this.set('dirty', false);
    _this.set('drawing', false);
    _this.set('valid', false);
    return _this;
  }
  _inheritsLoose(_default, _olInteractionInterac);
  var _proto = _default.prototype;
  _proto.setMap = function setMap(map) {
    var currentMap = this.getMap();
    if (currentMap) {
      if (this.changeEventKey_) {
        Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"])(this.changeEventKey_);
      }
    }
    ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.setMap.call(this, map);
    if (map) {
      this.changeEventKey_ = Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["listen"])(map.getView(), 'change:center', this.handleViewCenterChange_, this);
    }
    this.updateState_();
  };
  _proto.getDirty = function getDirty() {
    return this.get('dirty');
  };
  _proto.getDrawing = function getDrawing() {
    return this.get('drawing');
  };
  _proto.getValid = function getValid() {
    return this.get('valid');
  };
  _proto.getFeature = function getFeature() {
    return this.sketchFeature_;
  };
  _proto.addToDrawing = function addToDrawing() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    var sketchFeatureGeom;
    var sketchPointGeom = this.getSketchPointGeometry_();
    var coordinate = sketchPointGeom.getCoordinates();
    var coordinates = null;
    if (this.type_ === 'Point') {
      if (!this.sketchFeature_) {
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](coordinate));
        var event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(event);
      }
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        sketchFeatureGeom.setCoordinates(coordinate);
      }
      return;
    }
    if (this.type_ === 'LineString') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__["default"](coordinates));
        var _event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(_event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
          coordinates = sketchFeatureGeom.getCoordinates();
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates);
        }
      }
    }
    if (this.type_ === 'Polygon') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]([coordinates]));
        var _event2 = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(_event2);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
          var coordinatess = sketchFeatureGeom.getCoordinates();
          coordinates = coordinatess[0];
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinatess);
        }
      }
    }
    var dirty = this.getDirty();
    if (dirty) {
      this.set('dirty', false);
    }
    if (!coordinates) {
      throw new Error('Missing coordinates');
    }
    var valid = this.getValid();
    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
      if (coordinates.length >= this.minPoints_) {
        if (!valid) {
          this.set('valid', true);
        }
      } else {
        if (valid) {
          this.set('valid', false);
        }
      }
    }
    this.sketchPoint_ = null;
    this.updateSketchFeatures_();
  };
  _proto.clearDrawing = function clearDrawing() {
    this.setActive(false);
    this.setActive(true);
  };
  _proto.finishDrawing = function finishDrawing() {
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    if (this.sketchPoint_) {
      this.addToDrawing();
    }
    this.set('drawing', false);
    var event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawend', {
      feature: this.sketchFeature_
    });
    this.dispatchEvent(event);
  };
  _proto.startDrawing_ = function startDrawing_() {
    this.set('drawing', true);
    this.createOrUpdateSketchPoint_();
    this.updateSketchFeatures_();
    if (this.type_ === 'Point') {
      this.addToDrawing();
    }
  };
  _proto.modifyDrawing_ = function modifyDrawing_() {
    if (!this.sketchFeature_) {
      return;
    }
    var center = this.getCenter_();
    if (this.type_ === 'LineString') {
      var sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        var coordinates = sketchFeatureGeom.getCoordinates();
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates(coordinates);
      }
    } else if (this.type_ === 'Polygon') {
      var _sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (_sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        var coordinatess = _sketchFeatureGeom.getCoordinates();
        var _coordinates = coordinatess[0];
        _coordinates.pop();
        _coordinates.push(center);
        _sketchFeatureGeom.setCoordinates([_coordinates]);
      }
    }
    var dirty = this.getDirty();
    if (!dirty) {
      this.set('dirty', true);
    }
  };
  _proto.abortDrawing_ = function abortDrawing_() {
    var sketchFeature = this.sketchFeature_;
    if (sketchFeature || this.sketchPoints_.length > 0) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      this.overlay_.getSource().clear(true);
    }
    this.sketchPoints_ = [];
    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
    return sketchFeature;
  };
  _proto.updateState_ = function updateState_() {
    var map = this.getMap();
    var active = this.getActive();
    if (!map || !active) {
      this.abortDrawing_();
    } else {
      this.startDrawing_();
    }
    this.overlay_.setMap(active ? map : null);
  };
  _proto.handleViewCenterChange_ = function handleViewCenterChange_(evt) {
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    this.createOrUpdateSketchPoint_();
    if (this.type_ === 'Point') {
      this.addToDrawing();
    } else {
      this.modifyDrawing_();
      this.updateSketchFeatures_();
    }
  };
  _proto.createOrUpdateSketchPoint_ = function createOrUpdateSketchPoint_() {
    var center = this.getCenter_();
    if (this.sketchPoint_) {
      var geometry = this.getSketchPointGeometry_();
      geometry.setCoordinates(center);
    } else {
      this.sketchPoint_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](center));
    }
  };
  _proto.updateSketchFeatures_ = function updateSketchFeatures_() {
    var sketchFeatures = [];
    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }
    var overlaySource = this.overlay_.getSource();
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
    overlaySource.addFeatures(this.sketchPoints_);
  };
  _proto.getSketchPointGeometry_ = function getSketchPointGeometry_() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    var geometry = this.sketchPoint_.getGeometry();
    if (geometry instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      return geometry;
    } else {
      throw new Error('Wrong geometry type');
    }
  };
  _proto.getCenter_ = function getCenter_() {
    var center = this.getMap().getView().getCenter();
    if (!Array.isArray(center)) {
      throw new Error('Missing center');
    }
    return center;
  };
  return _default;
}(ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"]);


/***/ }),

/***/ "./src/mobile/measure/areaComponent.js":
/*!*********************************************!*\
  !*** ./src/mobile/measure/areaComponent.js ***!
  \*********************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile */ "./src/interaction/MeasureAreaMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
mobileMeasureAreaComponent.$inject = ["gmfMobileMeasureAreaTemplateUrl"];
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureArea', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value('gmfMobileMeasureAreaTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureAreaTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/areaComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/areaComponent', __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html"));
}]);
function mobileMeasureAreaComponent(gmfMobileMeasureAreaTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasureareaActive',
      'map': '=gmfMobileMeasureareaMap'
    },
    controller: 'GmfMobileMeasureAreaController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureAreaTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurearea', mobileMeasureAreaComponent);
var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog", "gmfMobileMeasureAreaOptions"];
  function Controller($scope, $filter, gettextCatalog, gmfMobileMeasureAreaOptions) {
    var _this;
    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.options = gmfMobileMeasureAreaOptions;
    _this.measure = null;
    return _this;
  }
  _inheritsLoose(Controller, _MeasueMobileBaseCont);
  var _proto = Controller.prototype;
  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.options.precision || 2,
      sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_4__["buildStyle"])(this.options.sketchStyle)
    });
    _MeasueMobileBaseCont.prototype.init.call(this);
  };
  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  };
  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  };
  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  };
  _proto.deactivate = function deactivate() {
    this.active = false;
  };
  return Controller;
}(gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);
myModule.controller('GmfMobileMeasureAreaController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/baseComponent.html":
/*!***********************************************!*\
  !*** ./src/mobile/measure/baseComponent.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default" ng-if="ctrl.drawing && (!ctrl.valid)" ng-click="ctrl.addPoint()">\n  <span class="fa fa-check"></span>\n  {{\'Set as starting point\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.dirty" ng-click="ctrl.addPoint()">\n  <span class="fa fa-plus"></span>\n  {{\'Add new point\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty" ng-click="ctrl.finish()">\n  <span class="fa fa-check"></span>\n  {{\'Terminate\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.valid" ng-click="ctrl.clear()">\n  <span class="fa fa-repeat"></span>\n  {{\'Clear\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">\n  <span class="fa fa-times"></span>\n  {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./src/mobile/measure/baseComponent.js":
/*!*********************************************!*\
  !*** ./src/mobile/measure/baseComponent.js ***!
  \*********************************************/
/*! exports provided: MeasueMobileBaseController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasueMobileBaseController", function() { return MeasueMobileBaseController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
MeasueMobileBaseController.$inject = ["$scope", "$filter", "gettextCatalog"];





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureBase', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  var _this = this;
  this.scope = $scope;
  this.filter = $filter;
  this.gettextCatalog = gettextCatalog;
  this.map = null;
  this.active = false;
  this.scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }
    _this.measure.setActive(newVal);
  });
  this.measure = null;
  this.drawInteraction = null;
  this.dirty = false;
  this.drawing = false;
  this.valid = false;
}
MeasueMobileBaseController.prototype.init = function () {
  var _this2 = this;
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(drawInteraction);
  Object.defineProperty(this, 'hasPoints', {
    get: function get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:dirty', function (evt) {
    _this2.dirty = drawInteraction.getDirty();
    if (_this2.dirty) {
      _this2.scope.$apply();
    }
  }, this);
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:drawing', function (evt) {
    _this2.drawing = drawInteraction.getDrawing();
  }, this);
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:valid', function (evt) {
    _this2.valid = drawInteraction.getValid();
  }, this);
  this.map.addInteraction(this.measure);
};
myModule.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/lengthComponent.js":
/*!***********************************************!*\
  !*** ./src/mobile/measure/lengthComponent.js ***!
  \***********************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile */ "./src/interaction/MeasureLengthMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
mobileMeasureLenthComponent.$inject = ["gmfMobileMeasureLengthTemplateUrl"];
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureLength', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value('gmfMobileMeasureLengthTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/lengthComponent', __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html"));
}]);
function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'map': '=gmfMobileMeasurelengthMap'
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);
var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog", "gmfMobileMeasureLengthOptions"];
  function Controller($scope, $filter, gettextCatalog, gmfMobileMeasureLengthOptions) {
    var _this;
    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.options = gmfMobileMeasureLengthOptions;
    _this.measure = null;
    return _this;
  }
  _inheritsLoose(Controller, _MeasueMobileBaseCont);
  var _proto = Controller.prototype;
  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.options.precision || 3,
      sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_4__["buildStyle"])(this.options.sketchStyle)
    });
    _MeasueMobileBaseCont.prototype.init.call(this);
  };
  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  };
  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  };
  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  };
  _proto.deactivate = function deactivate() {
    this.active = false;
  };
  return Controller;
}(gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);
myModule.controller('GmfMobileMeasureLengthController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/pointComponent.html":
/*!************************************************!*\
  !*** ./src/mobile/measure/pointComponent.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">\n  <span class="fa fa-times"></span>\n  {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./src/mobile/measure/pointComponent.js":
/*!**********************************************!*\
  !*** ./src/mobile/measure/pointComponent.js ***!
  \**********************************************/
/*! exports provided: MobileMeasurePointController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileMeasurePointController", function() { return MobileMeasurePointController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gmf/raster/RasterService */ "./src/raster/RasterService.js");
/* harmony import */ var ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasurePointMobile */ "./src/interaction/MeasurePointMobile.js");
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
MobileMeasurePointController.$inject = ["gettextCatalog", "$scope", "$filter", "gmfRaster", "ngeoDebounce", "gmfMobileMeasurePointOptions"];
mobileMeasurePointComponent.$inject = ["gmfMobileMeasurePointTemplateUrl"];
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }








var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasurePoint', [gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__["default"].name]);
myModule.value('gmfMobileMeasurePointTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/pointComponent', __webpack_require__(/*! ./pointComponent.html */ "./src/mobile/measure/pointComponent.html"));
}]);
function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'map': '=gmfMobileMeasurepointMap'
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);
function MobileMeasurePointController(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce, gmfMobileMeasurePointOptions) {
  var _this = this;
  this.options = gmfMobileMeasurePointOptions;
  this.gmfRaster_ = gmfRaster;
  this.ngeoDebounce_ = ngeoDebounce;
  this.gettextCatalog_ = gettextCatalog;
  this.$filter_ = $filter;
  this.map = null;
  this.active = false;
  $scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }
    _this.measure.setActive(newVal);
    _this.handleMeasureActiveChange_();
  });
  this.measure = null;
  this.drawInteraction = null;
  this.mapViewPropertyChangeEventKey_ = null;
}
MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.$filter_('ngeoNumberCoordinates'), this.options.format, {
    decimals: this.options.decimals,
    sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_7__["buildStyle"])(this.options.sketchStyle)
  });
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawInteraction);
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measure);
};
MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};
MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};
MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  if (this.measure.getActive()) {
    var view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = Object(ol_events__WEBPACK_IMPORTED_MODULE_5__["listen"])(view, 'propertychange', this.ngeoDebounce_(this.getMeasure_.bind(this), 300, true), this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    Object(ol_events__WEBPACK_IMPORTED_MODULE_5__["unlistenByKey"])(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};
MobileMeasurePointController.prototype.getMeasure_ = function () {
  var _this2 = this;
  if (!this.map) {
    throw new Error('Missing map');
  }
  var center = this.map.getView().getCenter();
  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }
  if (!this.options.rasterLayers || this.options.rasterLayers.length === 0) {
    return;
  }
  var params = {
    'layers': this.options.rasterLayers.map(function (config) {
      return config.name;
    }).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then(function (object) {
    if (!_this2.measure) {
      throw new Error('Missing measure');
    }
    var el = _this2.measure.getTooltipElement();
    var ctn = document.createElement('div');
    var className = 'gmf-mobile-measure-point';
    ctn.className = className;
    for (var _iterator = _createForOfIteratorHelperLoose(_this2.options.rasterLayers), _step; !(_step = _iterator()).done;) {
      var config = _step.value;
      var key = config.name;
      if (key in object) {
        var value = object[key];
        var childEl = document.createElement('div');
        childEl.className = "gmf-mobile-measure-point-" + key;
        var unit = config.unit || '';
        var decimals = config.decimals > 0 ? config.decimals : 0;
        value = _this2.$filter_('number')(value, decimals);
        childEl.innerHTML = [_this2.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }
    var previousCtn = el.getElementsByClassName(className);
    if (previousCtn[0]) {
      previousCtn[0].remove();
    }
    el.appendChild(ctn);
  });
};
myModule.controller('GmfMobileMeasurePointController', MobileMeasurePointController);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 11:
/*!***********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/mobilemeasure.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/mobilemeasure.js */"./contribs/gmf/examples/mobilemeasure.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWFNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTW9iaWxlRHJhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYXJlYUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2JpbGUvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtb2JpbGVtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsxMSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiZ21mUGVybWFsaW5rXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJy4vbW9iaWxlbWVhc3VyZS5jc3MnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgZ21mUGVybWFsaW5rUGVybWFsaW5rIGZyb20gJ2dtZi9wZXJtYWxpbmsvUGVybWFsaW5rJztcbmltcG9ydCBnbWZNb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudCBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYXJlYUNvbXBvbmVudCc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbXBvbmVudCBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JztcbmltcG9ydCBnbWZNb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWlzY0J0bkNvbXBvbmVudCBmcm9tICduZ2VvL21pc2MvYnRuQ29tcG9uZW50JztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICduZ2VvL3Byb2ovRVBTR18yMDU2JztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIGdtZlBlcm1hbGlua1Blcm1hbGluay5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29tcG9uZW50Lm5hbWUsIGdtZk1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudC5uYW1lLCBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLCBuZ2VvTWFwTW9kdWxlLm5hbWVdKTtcbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlBlcm1hbGluaykge1xuICB2YXIgY2VudGVyID0gZ21mUGVybWFsaW5rLmdldE1hcENlbnRlcigpIHx8IFs1Mzc2MzUsIDE1MjY0MF07XG4gIHZhciB6b29tID0gZ21mUGVybWFsaW5rLmdldE1hcFpvb20oKSB8fCAzO1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKClcbiAgICB9KV0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogY2VudGVyLFxuICAgICAgem9vbTogem9vbVxuICAgIH0pXG4gIH0pO1xuICB0aGlzLm1hcC5hZGRDb250cm9sKG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoe1xuICAgIGRwaTogOTZcbiAgfSkpO1xuICB0aGlzLm1lYXN1cmVBcmVhQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMubWVhc3VyZUxlbmd0aEFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLm1lYXN1cmVQb2ludEFjdGl2ZSA9IGZhbHNlO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG52YXIgc2tldGNoU3R5bGUgPSB7XG4gIGZpbGw6IHtcbiAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcbiAgfSxcbiAgc3Ryb2tlOiB7XG4gICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgIGxpbmVEYXNoOiBbMTAsIDEwXSxcbiAgICB3aWR0aDogMlxuICB9LFxuICByZWd1bGFyU2hhcGU6IHtcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgICAgIHdpZHRoOiAyXG4gICAgfSxcbiAgICBwb2ludHM6IDQsXG4gICAgcmFkaXVzOiA4LFxuICAgIHJhZGl1czI6IDAsXG4gICAgYW5nbGU6IDBcbiAgfVxufTtcbm15TW9kdWxlLmNvbnN0YW50KCdnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGUsXG4gIGRlY2ltYWxzOiAyLFxuICBmb3JtYXQ6ICd7eH0sIHt5fScsXG4gIHJhc3RlckxheWVyczogW3tcbiAgICBuYW1lOiAnYXN0ZXInLFxuICAgIHVuaXQ6ICdtJyxcbiAgICBkZWNpbWFsczogMlxuICB9LCB7XG4gICAgbmFtZTogJ3NydG0nLFxuICAgIHVuaXQ6ICdtJ1xuICB9XVxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnMnLCB7XG4gIHNrZXRjaFN0eWxlOiBza2V0Y2hTdHlsZVxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGVcbn0pO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYSc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xudmFyIE1lYXN1cmVBcmVhTW9iaWxlID0gZnVuY3Rpb24gKF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSkge1xuICBmdW5jdGlvbiBNZWFzdXJlQXJlYU1vYmlsZShmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgIGRpc3BsYXlIZWxwVG9vbHRpcDogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gX25nZW9JbnRlcmFjdGlvbk1lYXN1LmNhbGwodGhpcywgZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykgfHwgdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShNZWFzdXJlQXJlYU1vYmlsZSwgX25nZW9JbnRlcmFjdGlvbk1lYXN1KTtcbiAgdmFyIF9wcm90byA9IE1lYXN1cmVBcmVhTW9iaWxlLnByb3RvdHlwZTtcbiAgX3Byb3RvLmNyZWF0ZURyYXdJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gTWVhc3VyZUFyZWFNb2JpbGU7XG59KG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhKTtcbmV4cG9ydCBkZWZhdWx0IE1lYXN1cmVBcmVhTW9iaWxlOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aCc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSkge1xuICBmdW5jdGlvbiBfZGVmYXVsdChmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRfb3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgIT09IHVuZGVmaW5lZCA/IG9wdF9vcHRpb25zIDoge307XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgcmV0dXJuIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdS5jYWxsKHRoaXMsIGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdGlvbnMpIHx8IHRoaXM7XG4gIH1cbiAgX2luaGVyaXRzTG9vc2UoX2RlZmF1bHQsIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSk7XG4gIHZhciBfcHJvdG8gPSBfZGVmYXVsdC5wcm90b3R5cGU7XG4gIF9wcm90by5jcmVhdGVEcmF3SW50ZXJhY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVEcmF3SW50ZXJhY3Rpb24oc3R5bGUsIHNvdXJjZSkge1xuICAgIHJldHVybiBuZXcgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyh7XG4gICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICBzdHlsZTogc3R5bGVcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIF9kZWZhdWx0O1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoKTtcbmV4cG9ydCB7IF9kZWZhdWx0IGFzIGRlZmF1bHQgfTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZSwgeyBnZXRGb3JtYXR0ZWRQb2ludCB9IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZSc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xuaW1wb3J0IFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSkge1xuICBmdW5jdGlvbiBfZGVmYXVsdChmb3JtYXQsIGNvb3JkRm9ybWF0LCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgX3RoaXMgPSBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmZvcm1hdF8gPSBmb3JtYXQ7XG4gICAgX3RoaXMuY29vcmRGb3JtYXRfID0gY29vcmRGb3JtYXQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfbmdlb0ludGVyYWN0aW9uTWVhc3UpO1xuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uaGFuZGxlTWVhc3VyZSA9IGZ1bmN0aW9uIGhhbmRsZU1lYXN1cmUoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaEZlYXR1cmUnKTtcbiAgICB9XG4gICAgdmFyIGdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICBpZiAoIShnZW9tIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICB9XG4gICAgdmFyIGRlYyA9IHRoaXMuZGVjaW1hbHM7XG4gICAgdmFyIG91dHB1dCA9IGdldEZvcm1hdHRlZFBvaW50KGdlb20sIGRlYywgdGhpcy5mb3JtYXRfLCB0aGlzLmNvb3JkRm9ybWF0Xyk7XG4gICAgdmFyIGNvb3JkID0gZ2VvbS5nZXRMYXN0Q29vcmRpbmF0ZSgpO1xuICAgIGNhbGxiYWNrKG91dHB1dCwgY29vcmQpO1xuICB9O1xuICByZXR1cm4gX2RlZmF1bHQ7XG59KG5nZW9JbnRlcmFjdGlvbk1lYXN1cmUpO1xuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCB7IGdldERlZmF1bHREcmF3U3R5bGVGdW5jdGlvbiB9IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vY29tbW9uJztcbmltcG9ydCBuZ2VvQ3VzdG9tRXZlbnQgZnJvbSAnbmdlby9DdXN0b21FdmVudCc7XG5pbXBvcnQgeyBsaXN0ZW4sIHVubGlzdGVuQnlLZXkgfSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCB7IFRSVUUgfSBmcm9tICdvbC9mdW5jdGlvbnMnO1xuaW1wb3J0IG9sR2VvbUxpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbEdlb21Qb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XG5pbXBvcnQgb2xHZW9tU2ltcGxlR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9TaW1wbGVHZW9tZXRyeSc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0ludGVyYWN0aW9uJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX29sSW50ZXJhY3Rpb25JbnRlcmFjKSB7XG4gIGZ1bmN0aW9uIF9kZWZhdWx0KG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX3RoaXMgPSBfb2xJbnRlcmFjdGlvbkludGVyYWMuY2FsbCh0aGlzLCB7XG4gICAgICBoYW5kbGVFdmVudDogVFJVRVxuICAgIH0pIHx8IHRoaXM7XG4gICAgX3RoaXMuY2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbiAgICBfdGhpcy50eXBlXyA9IG9wdGlvbnMudHlwZTtcbiAgICBfdGhpcy5taW5Qb2ludHNfID0gb3B0aW9ucy5taW5Qb2ludHMgPyBvcHRpb25zLm1pblBvaW50cyA6IF90aGlzLnR5cGVfID09PSAnUG9seWdvbicgPyAzIDogMjtcbiAgICBfdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG51bGw7XG4gICAgX3RoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIF90aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgX3RoaXMub3ZlcmxheV8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICAgIHVzZVNwYXRpYWxJbmRleDogZmFsc2UsXG4gICAgICAgIHdyYXBYOiBvcHRpb25zLndyYXBYID8gb3B0aW9ucy53cmFwWCA6IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlIHx8IGdldERlZmF1bHREcmF3U3R5bGVGdW5jdGlvbigpLFxuICAgICAgdXBkYXRlV2hpbGVBbmltYXRpbmc6IHRydWUsXG4gICAgICB1cGRhdGVXaGlsZUludGVyYWN0aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgbGlzdGVuKF90aGlzLCAnY2hhbmdlOmFjdGl2ZScsIF90aGlzLnVwZGF0ZVN0YXRlXywgX3RoaXMpO1xuICAgIF90aGlzLnNldCgnZGlydHknLCBmYWxzZSk7XG4gICAgX3RoaXMuc2V0KCdkcmF3aW5nJywgZmFsc2UpO1xuICAgIF90aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfb2xJbnRlcmFjdGlvbkludGVyYWMpO1xuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuICBfcHJvdG8uc2V0TWFwID0gZnVuY3Rpb24gc2V0TWFwKG1hcCkge1xuICAgIHZhciBjdXJyZW50TWFwID0gdGhpcy5nZXRNYXAoKTtcbiAgICBpZiAoY3VycmVudE1hcCkge1xuICAgICAgaWYgKHRoaXMuY2hhbmdlRXZlbnRLZXlfKSB7XG4gICAgICAgIHVubGlzdGVuQnlLZXkodGhpcy5jaGFuZ2VFdmVudEtleV8pO1xuICAgICAgfVxuICAgIH1cbiAgICBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24ucHJvdG90eXBlLnNldE1hcC5jYWxsKHRoaXMsIG1hcCk7XG4gICAgaWYgKG1hcCkge1xuICAgICAgdGhpcy5jaGFuZ2VFdmVudEtleV8gPSBsaXN0ZW4obWFwLmdldFZpZXcoKSwgJ2NoYW5nZTpjZW50ZXInLCB0aGlzLmhhbmRsZVZpZXdDZW50ZXJDaGFuZ2VfLCB0aGlzKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVTdGF0ZV8oKTtcbiAgfTtcbiAgX3Byb3RvLmdldERpcnR5ID0gZnVuY3Rpb24gZ2V0RGlydHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkaXJ0eScpO1xuICB9O1xuICBfcHJvdG8uZ2V0RHJhd2luZyA9IGZ1bmN0aW9uIGdldERyYXdpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkcmF3aW5nJyk7XG4gIH07XG4gIF9wcm90by5nZXRWYWxpZCA9IGZ1bmN0aW9uIGdldFZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgndmFsaWQnKTtcbiAgfTtcbiAgX3Byb3RvLmdldEZlYXR1cmUgPSBmdW5jdGlvbiBnZXRGZWF0dXJlKCkge1xuICAgIHJldHVybiB0aGlzLnNrZXRjaEZlYXR1cmVfO1xuICB9O1xuICBfcHJvdG8uYWRkVG9EcmF3aW5nID0gZnVuY3Rpb24gYWRkVG9EcmF3aW5nKCkge1xuICAgIGlmICghdGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBza2V0Y2hQb2ludCcpO1xuICAgIH1cbiAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICB2YXIgZHJhd2luZyA9IHRoaXMuZ2V0RHJhd2luZygpO1xuICAgIGlmICghYWN0aXZlIHx8ICFkcmF3aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBza2V0Y2hGZWF0dXJlR2VvbTtcbiAgICB2YXIgc2tldGNoUG9pbnRHZW9tID0gdGhpcy5nZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpO1xuICAgIHZhciBjb29yZGluYXRlID0gc2tldGNoUG9pbnRHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIGNvb3JkaW5hdGVzID0gbnVsbDtcbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21Qb2ludChjb29yZGluYXRlKSk7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfVxuICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21TaW1wbGVHZW9tZXRyeSkge1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJykge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludHNfLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpXTtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbUxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpKTtcbiAgICAgICAgdmFyIF9ldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoX2V2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21TaW1wbGVHZW9tZXRyeSkge1xuICAgICAgICAgIGNvb3JkaW5hdGVzID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUuc2xpY2UoKSk7XG4gICAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRzXy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpXTtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbVBvbHlnb24oW2Nvb3JkaW5hdGVzXSkpO1xuICAgICAgICB2YXIgX2V2ZW50MiA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoX2V2ZW50Mik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgICAgICAgIHZhciBjb29yZGluYXRlc3MgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNzWzBdO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZS5zbGljZSgpKTtcbiAgICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkaXJ0eSA9IHRoaXMuZ2V0RGlydHkoKTtcbiAgICBpZiAoZGlydHkpIHtcbiAgICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvb3JkaW5hdGVzJyk7XG4gICAgfVxuICAgIHZhciB2YWxpZCA9IHRoaXMuZ2V0VmFsaWQoKTtcbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnIHx8IHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA+PSB0aGlzLm1pblBvaW50c18pIHtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgIHRoaXMuc2V0KCd2YWxpZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5za2V0Y2hQb2ludF8gPSBudWxsO1xuICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG4gIH07XG4gIF9wcm90by5jbGVhckRyYXdpbmcgPSBmdW5jdGlvbiBjbGVhckRyYXdpbmcoKSB7XG4gICAgdGhpcy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMuc2V0QWN0aXZlKHRydWUpO1xuICB9O1xuICBfcHJvdG8uZmluaXNoRHJhd2luZyA9IGZ1bmN0aW9uIGZpbmlzaERyYXdpbmcoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHRoaXMuYWRkVG9EcmF3aW5nKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgZmFsc2UpO1xuICAgIHZhciBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdlbmQnLCB7XG4gICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfTtcbiAgX3Byb3RvLnN0YXJ0RHJhd2luZ18gPSBmdW5jdGlvbiBzdGFydERyYXdpbmdfKCkge1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgdHJ1ZSk7XG4gICAgdGhpcy5jcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpO1xuICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2ludCcpIHtcbiAgICAgIHRoaXMuYWRkVG9EcmF3aW5nKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubW9kaWZ5RHJhd2luZ18gPSBmdW5jdGlvbiBtb2RpZnlEcmF3aW5nXygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyXygpO1xuICAgIGlmICh0aGlzLnR5cGVfID09PSAnTGluZVN0cmluZycpIHtcbiAgICAgIHZhciBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgIHZhciBjb29yZGluYXRlcyA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvb3JkaW5hdGVzLnBvcCgpO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNlbnRlcik7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgdmFyIF9za2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChfc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21Qb2x5Z29uKSB7XG4gICAgICAgIHZhciBjb29yZGluYXRlc3MgPSBfc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgdmFyIF9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzc1swXTtcbiAgICAgICAgX2Nvb3JkaW5hdGVzLnBvcCgpO1xuICAgICAgICBfY29vcmRpbmF0ZXMucHVzaChjZW50ZXIpO1xuICAgICAgICBfc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoW19jb29yZGluYXRlc10pO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZGlydHkgPSB0aGlzLmdldERpcnR5KCk7XG4gICAgaWYgKCFkaXJ0eSkge1xuICAgICAgdGhpcy5zZXQoJ2RpcnR5JywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYWJvcnREcmF3aW5nXyA9IGZ1bmN0aW9uIGFib3J0RHJhd2luZ18oKSB7XG4gICAgdmFyIHNrZXRjaEZlYXR1cmUgPSB0aGlzLnNrZXRjaEZlYXR1cmVfO1xuICAgIGlmIChza2V0Y2hGZWF0dXJlIHx8IHRoaXMuc2tldGNoUG9pbnRzXy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbnVsbDtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcbiAgICAgIHRoaXMub3ZlcmxheV8uZ2V0U291cmNlKCkuY2xlYXIodHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHNrZXRjaEZlYXR1cmU7XG4gIH07XG4gIF9wcm90by51cGRhdGVTdGF0ZV8gPSBmdW5jdGlvbiB1cGRhdGVTdGF0ZV8oKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgaWYgKCFtYXAgfHwgIWFjdGl2ZSkge1xuICAgICAgdGhpcy5hYm9ydERyYXdpbmdfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnREcmF3aW5nXygpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXlfLnNldE1hcChhY3RpdmUgPyBtYXAgOiBudWxsKTtcbiAgfTtcbiAgX3Byb3RvLmhhbmRsZVZpZXdDZW50ZXJDaGFuZ2VfID0gZnVuY3Rpb24gaGFuZGxlVmlld0NlbnRlckNoYW5nZV8oZXZ0KSB7XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfKCk7XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2ludCcpIHtcbiAgICAgIHRoaXMuYWRkVG9EcmF3aW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kaWZ5RHJhd2luZ18oKTtcbiAgICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8gPSBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJfKCk7XG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB2YXIgZ2VvbWV0cnkgPSB0aGlzLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCk7XG4gICAgICBnZW9tZXRyeS5zZXRDb29yZGluYXRlcyhjZW50ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbVBvaW50KGNlbnRlcikpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXyA9IGZ1bmN0aW9uIHVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpIHtcbiAgICB2YXIgc2tldGNoRmVhdHVyZXMgPSBbXTtcbiAgICBpZiAodGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgc2tldGNoRmVhdHVyZXMucHVzaCh0aGlzLnNrZXRjaEZlYXR1cmVfKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICBza2V0Y2hGZWF0dXJlcy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcbiAgICB9XG4gICAgdmFyIG92ZXJsYXlTb3VyY2UgPSB0aGlzLm92ZXJsYXlfLmdldFNvdXJjZSgpO1xuICAgIG92ZXJsYXlTb3VyY2UuY2xlYXIodHJ1ZSk7XG4gICAgb3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlcyhza2V0Y2hGZWF0dXJlcyk7XG4gICAgb3ZlcmxheVNvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLnNrZXRjaFBvaW50c18pO1xuICB9O1xuICBfcHJvdG8uZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8gPSBmdW5jdGlvbiBnZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2tldGNoUG9pbnQnKTtcbiAgICB9XG4gICAgdmFyIGdlb21ldHJ5ID0gdGhpcy5za2V0Y2hQb2ludF8uZ2V0R2VvbWV0cnkoKTtcbiAgICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21Qb2ludCkge1xuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGdlb21ldHJ5IHR5cGUnKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5nZXRDZW50ZXJfID0gZnVuY3Rpb24gZ2V0Q2VudGVyXygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5nZXRNYXAoKS5nZXRWaWV3KCkuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNlbnRlcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjZW50ZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIGNlbnRlcjtcbiAgfTtcbiAgcmV0dXJuIF9kZWZhdWx0O1xufShvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24pO1xuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsIm1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50LiRpbmplY3QgPSBbXCJnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYU1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhTW9iaWxlJztcbmltcG9ydCB7IE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyIH0gZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IHsgYnVpbGRTdHlsZSB9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUFyZWEnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKCdnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGV1cmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvYXJlYUNvbXBvbmVudCc7XG59KTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvbWVhc3VyZS9hcmVhQ29tcG9uZW50JywgcmVxdWlyZSgnLi9iYXNlQ29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudChnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWFyZWFBY3RpdmUnLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZWFyZWFNYXAnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnR21mTW9iaWxlTWVhc3VyZUFyZWFDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmwsXG4gICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29udHJvbGxlcicpO1xuICAgICAgfVxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlYXJlYScsIG1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50KTtcbmV4cG9ydCB2YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfTWVhc3VlTW9iaWxlQmFzZUNvbnQpIHtcbiAgQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdldHRleHRDYXRhbG9nXCIsIFwiZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zXCJdO1xuICBmdW5jdGlvbiBDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2csIGdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9NZWFzdWVNb2JpbGVCYXNlQ29udC5jYWxsKHRoaXMsICRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHx8IHRoaXM7XG4gICAgX3RoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucztcbiAgICBfdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgX2luaGVyaXRzTG9vc2UoQ29udHJvbGxlciwgX01lYXN1ZU1vYmlsZUJhc2VDb250KTtcbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhTW9iaWxlKHRoaXMuZmlsdGVyKCduZ2VvVW5pdFByZWZpeCcpLCB0aGlzLmdldHRleHRDYXRhbG9nLCB7XG4gICAgICBwcmVjaXNpb246IHRoaXMub3B0aW9ucy5wcmVjaXNpb24gfHwgMixcbiAgICAgIHNrZXRjaFN0eWxlOiBidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5za2V0Y2hTdHlsZSlcbiAgICB9KTtcbiAgICBfTWVhc3VlTW9iaWxlQmFzZUNvbnQucHJvdG90eXBlLmluaXQuY2FsbCh0aGlzKTtcbiAgfTtcbiAgX3Byb3RvLmFkZFBvaW50ID0gZnVuY3Rpb24gYWRkUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5hZGRUb0RyYXdpbmcoKTtcbiAgfTtcbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5jbGVhckRyYXdpbmcoKTtcbiAgfTtcbiAgX3Byb3RvLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmZpbmlzaERyYXdpbmcoKTtcbiAgfTtcbiAgX3Byb3RvLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH07XG4gIHJldHVybiBDb250cm9sbGVyO1xufShNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlQXJlYUNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgKCFjdHJsLnZhbGlkKVwiIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XFxuICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9zcGFuPlxcbiAge3tcXCdTZXQgYXMgc3RhcnRpbmcgcG9pbnRcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWlmPVwiY3RybC5kaXJ0eVwiIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XFxuICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIj48L3NwYW4+XFxuICB7e1xcJ0FkZCBuZXcgcG9pbnRcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWlmPVwiY3RybC5kcmF3aW5nICYmIGN0cmwudmFsaWQgJiYgIWN0cmwuZGlydHlcIiBuZy1jbGljaz1cImN0cmwuZmluaXNoKClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L3NwYW4+XFxuICB7e1xcJ1Rlcm1pbmF0ZVxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLnZhbGlkXCIgbmctY2xpY2s9XCJjdHJsLmNsZWFyKClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCI+PC9zcGFuPlxcbiAge3tcXCdDbGVhclxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmFjdGl2ZVwiIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7IGludGVyYWN0aW9uRGVjb3JhdGlvbiB9IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZSc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCB7IGxpc3RlbiB9IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZk1vYmlsZU1lYXN1cmVCYXNlJywgW25nZW9NaXNjRmlsdGVycy5uYW1lXSk7XG5leHBvcnQgZnVuY3Rpb24gTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB0aGlzLnNjb3BlID0gJHNjb3BlO1xuICB0aGlzLmZpbHRlciA9ICRmaWx0ZXI7XG4gIHRoaXMuZ2V0dGV4dENhdGFsb2cgPSBnZXR0ZXh0Q2F0YWxvZztcbiAgdGhpcy5tYXAgPSBudWxsO1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLnNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90aGlzLmFjdGl2ZTtcbiAgfSwgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgIGlmICghX3RoaXMubWVhc3VyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgICB9XG4gICAgX3RoaXMubWVhc3VyZS5zZXRBY3RpdmUobmV3VmFsKTtcbiAgfSk7XG4gIHRoaXMubWVhc3VyZSA9IG51bGw7XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gbnVsbDtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgdGhpcy52YWxpZCA9IGZhbHNlO1xufVxuTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgfVxuICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZSk7XG4gIHZhciBkcmF3SW50ZXJhY3Rpb24gPSB0aGlzLm1lYXN1cmUuZ2V0RHJhd0ludGVyYWN0aW9uKCk7XG4gIGlmICghKGRyYXdJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE1vYmlsZURyYXcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgfVxuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IGRyYXdJbnRlcmFjdGlvbjtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKGRyYXdJbnRlcmFjdGlvbik7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaGFzUG9pbnRzJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhd0ludGVyYWN0aW9uLmdldEZlYXR1cmUoKSAhPT0gbnVsbDtcbiAgICB9XG4gIH0pO1xuICBsaXN0ZW4oZHJhd0ludGVyYWN0aW9uLCAnY2hhbmdlOmRpcnR5JywgZnVuY3Rpb24gKGV2dCkge1xuICAgIF90aGlzMi5kaXJ0eSA9IGRyYXdJbnRlcmFjdGlvbi5nZXREaXJ0eSgpO1xuICAgIGlmIChfdGhpczIuZGlydHkpIHtcbiAgICAgIF90aGlzMi5zY29wZS4kYXBwbHkoKTtcbiAgICB9XG4gIH0sIHRoaXMpO1xuICBsaXN0ZW4oZHJhd0ludGVyYWN0aW9uLCAnY2hhbmdlOmRyYXdpbmcnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgX3RoaXMyLmRyYXdpbmcgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0RHJhd2luZygpO1xuICB9LCB0aGlzKTtcbiAgbGlzdGVuKGRyYXdJbnRlcmFjdGlvbiwgJ2NoYW5nZTp2YWxpZCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBfdGhpczIudmFsaWQgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0VmFsaWQoKTtcbiAgfSwgdGhpcyk7XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZSk7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignZ21mTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXInLCBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQuJGluamVjdCA9IFtcImdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aE1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUnO1xuaW1wb3J0IHsgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIgfSBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBidWlsZFN0eWxlIH0gZnJvbSAnbmdlby9vcHRpb25zJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoJywgW25nZW9NaXNjRmlsdGVycy5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZSgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZXVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQnO1xufSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JywgcmVxdWlyZSgnLi9iYXNlQ29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWxlbmd0aEFjdGl2ZScsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoTWFwJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVsZW5ndGgnLCBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKF9NZWFzdWVNb2JpbGVCYXNlQ29udCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIiwgXCJnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9uc1wiXTtcbiAgZnVuY3Rpb24gQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9NZWFzdWVNb2JpbGVCYXNlQ29udC5jYWxsKHRoaXMsICRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHx8IHRoaXM7XG4gICAgX3RoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhPcHRpb25zO1xuICAgIF90aGlzLm1lYXN1cmUgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aE1vYmlsZSh0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgdGhpcy5nZXR0ZXh0Q2F0YWxvZywge1xuICAgICAgcHJlY2lzaW9uOiB0aGlzLm9wdGlvbnMucHJlY2lzaW9uIHx8IDMsXG4gICAgICBza2V0Y2hTdHlsZTogYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2tldGNoU3R5bGUpXG4gICAgfSk7XG4gICAgX01lYXN1ZU1vYmlsZUJhc2VDb250LnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG4gIH07XG4gIF9wcm90by5hZGRQb2ludCA9IGZ1bmN0aW9uIGFkZFBvaW50KCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uYWRkVG9EcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5maW5pc2ggPSBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmFjdGl2ZVwiIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIuJGluamVjdCA9IFtcImdldHRleHRDYXRhbG9nXCIsIFwiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdtZlJhc3RlclwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcImdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnNcIl07XG5tb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQuJGluamVjdCA9IFtcImdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTsgaWYgKGl0KSByZXR1cm4gKGl0ID0gaXQuY2FsbChvKSkubmV4dC5iaW5kKGl0KTsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldOyByZXR1cm4gYXJyMjsgfVxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mUmFzdGVyUmFzdGVyU2VydmljZSBmcm9tICdnbWYvcmFzdGVyL1Jhc3RlclNlcnZpY2UnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZSc7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UnO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlJztcbmltcG9ydCB7IGxpc3RlbiwgdW5saXN0ZW5CeUtleSB9IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xuaW1wb3J0IHsgYnVpbGRTdHlsZSB9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZVBvaW50JywgW2dtZlJhc3RlclJhc3RlclNlcnZpY2UubmFtZSwgbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZSgnZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gYXR0cnMuZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGV1cmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvcG9pbnRDb21wb25lbnQnO1xufSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvcG9pbnRDb21wb25lbnQnLCByZXF1aXJlKCcuL3BvaW50Q29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnYWN0aXZlJzogJz1nbWZNb2JpbGVNZWFzdXJlcG9pbnRBY3RpdmUnLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZXBvaW50TWFwJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwsXG4gICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29udHJvbGxlcicpO1xuICAgICAgfVxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlcG9pbnQnLCBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQpO1xuZXhwb3J0IGZ1bmN0aW9uIE1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIoZ2V0dGV4dENhdGFsb2csICRzY29wZSwgJGZpbHRlciwgZ21mUmFzdGVyLCBuZ2VvRGVib3VuY2UsIGdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnMpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy5vcHRpb25zID0gZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9ucztcbiAgdGhpcy5nbWZSYXN0ZXJfID0gZ21mUmFzdGVyO1xuICB0aGlzLm5nZW9EZWJvdW5jZV8gPSBuZ2VvRGVib3VuY2U7XG4gIHRoaXMuZ2V0dGV4dENhdGFsb2dfID0gZ2V0dGV4dENhdGFsb2c7XG4gIHRoaXMuJGZpbHRlcl8gPSAkZmlsdGVyO1xuICB0aGlzLm1hcCA9IG51bGw7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5hY3RpdmU7XG4gIH0sIGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICBpZiAoIV90aGlzLm1lYXN1cmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gICAgfVxuICAgIF90aGlzLm1lYXN1cmUuc2V0QWN0aXZlKG5ld1ZhbCk7XG4gICAgX3RoaXMuaGFuZGxlTWVhc3VyZUFjdGl2ZUNoYW5nZV8oKTtcbiAgfSk7XG4gIHRoaXMubWVhc3VyZSA9IG51bGw7XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gbnVsbDtcbiAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBudWxsO1xufVxuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZSh0aGlzLiRmaWx0ZXJfKCduZ2VvTnVtYmVyQ29vcmRpbmF0ZXMnKSwgdGhpcy5vcHRpb25zLmZvcm1hdCwge1xuICAgIGRlY2ltYWxzOiB0aGlzLm9wdGlvbnMuZGVjaW1hbHMsXG4gICAgc2tldGNoU3R5bGU6IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNrZXRjaFN0eWxlKVxuICB9KTtcbiAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZSh0aGlzLmFjdGl2ZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLm1lYXN1cmUpO1xuICB2YXIgZHJhd0ludGVyYWN0aW9uID0gdGhpcy5tZWFzdXJlLmdldERyYXdJbnRlcmFjdGlvbigpO1xuICBpZiAoIShkcmF3SW50ZXJhY3Rpb24gaW5zdGFuY2VvZiBNb2JpbGVEcmF3KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gIH1cbiAgdGhpcy5kcmF3SW50ZXJhY3Rpb24gPSBkcmF3SW50ZXJhY3Rpb247XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmRyYXdJbnRlcmFjdGlvbik7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlKTtcbn07XG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xufTtcbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0dGV4dENhdGFsb2dfLmdldFN0cmluZyhzdHIpO1xufTtcbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZU1lYXN1cmVBY3RpdmVDaGFuZ2VfID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgfVxuICBpZiAodGhpcy5tZWFzdXJlLmdldEFjdGl2ZSgpKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBsaXN0ZW4odmlldywgJ3Byb3BlcnR5Y2hhbmdlJywgdGhpcy5uZ2VvRGVib3VuY2VfKHRoaXMuZ2V0TWVhc3VyZV8uYmluZCh0aGlzKSwgMzAwLCB0cnVlKSwgdGhpcyk7XG4gICAgdGhpcy5nZXRNZWFzdXJlXygpO1xuICB9IGVsc2UgaWYgKHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfKSB7XG4gICAgdW5saXN0ZW5CeUtleSh0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5Xyk7XG4gICAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBudWxsO1xuICB9XG59O1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVhc3VyZV8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIHZhciBjZW50ZXIgPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0Q2VudGVyKCk7XG4gIGlmICghQXJyYXkuaXNBcnJheShjZW50ZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjZW50ZXInKTtcbiAgfVxuICBpZiAoIXRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMgfHwgdGhpcy5vcHRpb25zLnJhc3RlckxheWVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBhcmFtcyA9IHtcbiAgICAnbGF5ZXJzJzogdGhpcy5vcHRpb25zLnJhc3RlckxheWVycy5tYXAoZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZy5uYW1lO1xuICAgIH0pLmpvaW4oJywnKVxuICB9O1xuICB0aGlzLmdtZlJhc3Rlcl8uZ2V0UmFzdGVyKGNlbnRlciwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAoIV90aGlzMi5tZWFzdXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgIH1cbiAgICB2YXIgZWwgPSBfdGhpczIubWVhc3VyZS5nZXRUb29sdGlwRWxlbWVudCgpO1xuICAgIHZhciBjdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gJ2dtZi1tb2JpbGUtbWVhc3VyZS1wb2ludCc7XG4gICAgY3RuLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKF90aGlzMi5vcHRpb25zLnJhc3RlckxheWVycyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgY29uZmlnID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIga2V5ID0gY29uZmlnLm5hbWU7XG4gICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgdmFyIGNoaWxkRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2hpbGRFbC5jbGFzc05hbWUgPSBcImdtZi1tb2JpbGUtbWVhc3VyZS1wb2ludC1cIiArIGtleTtcbiAgICAgICAgdmFyIHVuaXQgPSBjb25maWcudW5pdCB8fCAnJztcbiAgICAgICAgdmFyIGRlY2ltYWxzID0gY29uZmlnLmRlY2ltYWxzID4gMCA/IGNvbmZpZy5kZWNpbWFscyA6IDA7XG4gICAgICAgIHZhbHVlID0gX3RoaXMyLiRmaWx0ZXJfKCdudW1iZXInKSh2YWx1ZSwgZGVjaW1hbHMpO1xuICAgICAgICBjaGlsZEVsLmlubmVySFRNTCA9IFtfdGhpczIudHJhbnNsYXRlKGtleSksICc6ICcsIHZhbHVlLCAnICcsIHVuaXRdLmpvaW4oJycpO1xuICAgICAgICBjdG4uYXBwZW5kQ2hpbGQoY2hpbGRFbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwcmV2aW91c0N0biA9IGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICBpZiAocHJldmlvdXNDdG5bMF0pIHtcbiAgICAgIHByZXZpb3VzQ3RuWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgICBlbC5hcHBlbmRDaGlsZChjdG4pO1xuICB9KTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyJywgTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=