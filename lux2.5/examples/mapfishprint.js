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
/******/ 		"mapfishprint": 0
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
/******/ 	deferredModules.push([22,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/mapfishprint.css":
/*!***********************************!*\
  !*** ./examples/mapfishprint.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/mapfishprint.js":
/*!**********************************!*\
  !*** ./examples/mapfishprint.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./examples/url.js");
/* harmony import */ var _mapfishprint_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapfishprint.css */ "./examples/mapfishprint.css");
/* harmony import */ var _mapfishprint_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mapfishprint_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/print/Service.js */ "./src/print/Service.js");
/* harmony import */ var ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/print/Utils.js */ "./src/print/Utils.js");
/* harmony import */ var ngeo_print_Mask_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/print/Mask.js */ "./src/print/Mask.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/format/GeoJSON.js */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
MainController.$inject = ["$timeout", "ngeoCreatePrint", "ngeoPrintUtils"];















var appmodule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_14__["default"].name, ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
var PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000, 500000];
var PRINT_FORMAT_ = 'pdf';
var PRINT_LAYOUT_ = '1 A4 portrait';
var PRINT_DPI_ = 72;
var PRINT_PAPER_SIZE_ = [555, 675];

function MainController($timeout, ngeoCreatePrint, ngeoPrintUtils) {
  var source = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
    url: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    projection: undefined,
    params: {
      'LAYERS': 'osm'
    },
    serverType: 'mapserver'
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      source: source
    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
      source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
        url: 'data/polygon-swizerland.json',
        format: new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
          dataProjection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_3__["default"]
        })
      })
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      projection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [2537635, 1152640],
      zoom: 3
    })
  });
  this.printState = '';
  this.$timeout_ = $timeout;
  this.print_ = ngeoCreatePrint(_url_js__WEBPACK_IMPORTED_MODULE_1__["PRINT_PROXY"]);
  this.printUtils_ = ngeoPrintUtils;
  this.maskLayer_ = new ngeo_print_Mask_js__WEBPACK_IMPORTED_MODULE_6__["default"]();

  this.maskLayer_.getSize = function () {
    return PRINT_PAPER_SIZE_;
  };

  this.maskLayer_.getScale = function (frameState) {
    var mapSize = frameState.size;
    var mapResolution = frameState.viewState.resolution;

    if (mapSize !== undefined && mapResolution !== undefined) {
      return ngeoPrintUtils.getOptimalScale(mapSize, mapResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_);
    } else {
      return PRINT_SCALES_[0];
    }
  };

  this.map.addLayer(this.maskLayer_);
}

MainController.prototype.print = function () {
  var map = this.map;
  var mapSize = map.getSize();
  var viewResolution = map.getView().getResolution();
  var scale = mapSize !== undefined && viewResolution !== undefined ? this.printUtils_.getOptimalScale(mapSize, viewResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_) : PRINT_SCALES_[0];
  var dpi = PRINT_DPI_;
  var format = PRINT_FORMAT_;
  var layout = PRINT_LAYOUT_;
  this.printState = 'Printing...';
  var spec = this.print_.createSpec(map, scale, dpi, layout, format, {
    'datasource': [],
    'debug': 0,
    'comments': 'My comments',
    'title': 'My print'
  });
  this.print_.createReport(spec).then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));
};

MainController.prototype.handleCreateReportSuccess_ = function (resp) {
  this.getStatus_(resp.data.ref);
};

MainController.prototype.getStatus_ = function (ref) {
  this.print_.getStatus(ref).then(this.handleGetStatusSuccess_.bind(this, ref), this.handleGetStatusError_.bind(this));
};

MainController.prototype.handleCreateReportError_ = function (resp) {
  this.printState = 'Print error';
};

MainController.prototype.handleGetStatusSuccess_ = function (ref, resp) {
  var _this = this;

  var mfResp = resp.data;
  var done = mfResp.done;

  if (done) {
    this.printState = '';
    window.location.href = this.print_.getReportUrl(ref);
  } else {
    this.$timeout_(function () {
      _this.getStatus_(ref);
    }, 1000, false);
  }
};

MainController.prototype.handleGetStatusError_ = function (resp) {
  this.printState = 'Print error';
};

appmodule.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/print/Mask.js":
/*!***************************!*\
  !*** ./src/print/Mask.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mask; });
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer.js */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/dom.js */ "./node_modules/ol/dom.js");
/* harmony import */ var ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/print/Utils.js */ "./src/print/Utils.js");
/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/math.js */ "./node_modules/ol/math.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var Mask = function (_Layer) {
  _inheritsLoose(Mask, _Layer);

  function Mask(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Layer.call(this, options) || this;
    _this.context_ = Object(ol_dom_js__WEBPACK_IMPORTED_MODULE_1__["createCanvasContext2D"])();
    _this.context_.canvas.style.opacity = '0.5';
    _this.context_.canvas.style.position = 'absolute';
    _this.getScale;
    _this.getSize;
    _this.getRotation;
    return _this;
  }

  var _proto = Mask.prototype;

  _proto.render = function render(frameState) {
    var cwidth = frameState.size[0];
    this.context_.canvas.width = cwidth;
    var cheight = frameState.size[1];
    this.context_.canvas.height = cheight;
    var center = [cwidth / 2, cheight / 2];
    this.context_.beginPath();
    this.context_.moveTo(0, 0);
    this.context_.lineTo(cwidth, 0);
    this.context_.lineTo(cwidth, cheight);
    this.context_.lineTo(0, cheight);
    this.context_.lineTo(0, 0);
    this.context_.closePath();
    var size = this.getSize();
    var height = size[1];
    var width = size[0];
    var scale = this.getScale(frameState);
    var resolution = frameState.viewState.resolution;
    var extentHalfWidth = width / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["DOTS_PER_INCH"] / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["INCHES_PER_METER"] * scale / resolution / 2;
    var extentHalfHeight = height / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["DOTS_PER_INCH"] / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["INCHES_PER_METER"] * scale / resolution / 2;
    var rotation = this.getRotation !== undefined ? Object(ol_math_js__WEBPACK_IMPORTED_MODULE_3__["toRadians"])(this.getRotation()) : 0;
    var diagonal = Math.sqrt(Math.pow(extentHalfWidth, 2) + Math.pow(extentHalfHeight, 2));
    var gamma = Math.atan(extentHalfHeight / extentHalfWidth) - rotation;
    var omega = Math.atan(extentHalfWidth / extentHalfHeight) - rotation;
    var x1 = center[0] - Math.cos(gamma) * diagonal;
    var y1 = center[1] + Math.sin(gamma) * diagonal;
    var x2 = center[0] + Math.sin(omega) * diagonal;
    var y2 = center[1] + Math.cos(omega) * diagonal;
    var x3 = center[0] + Math.cos(gamma) * diagonal;
    var y3 = center[1] - Math.sin(gamma) * diagonal;
    var x4 = center[0] - Math.sin(omega) * diagonal;
    var y4 = center[1] - Math.cos(omega) * diagonal;
    this.context_.moveTo(x1, y1);
    this.context_.lineTo(x2, y2);
    this.context_.lineTo(x3, y3);
    this.context_.lineTo(x4, y4);
    this.context_.lineTo(x1, y1);
    this.context_.closePath();
    this.context_.fillStyle = '#000';
    this.context_.fill();
    return this.context_.canvas;
  };

  return Mask;
}(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ 22:
/*!*********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mapfishprint.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/mapfishprint.js */"./examples/mapfishprint.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwZmlzaHByaW50LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL21hcGZpc2hwcmludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpbnQvTWFzay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFwZmlzaHByaW50XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzIyLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIm5nZW9DcmVhdGVQcmludFwiLCBcIm5nZW9QcmludFV0aWxzXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgeyBNQVBTRVJWRVJfUFJPWFksIFBSSU5UX1BST1hZIH0gZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL21hcGZpc2hwcmludC5jc3MnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ0BnZW9ibG9ja3MvcHJvai9zcmMvRVBTR18yMDU2LmpzJztcbmltcG9ydCBuZ2VvUHJpbnRTZXJ2aWNlIGZyb20gJ25nZW8vcHJpbnQvU2VydmljZS5qcyc7XG5pbXBvcnQgbmdlb1ByaW50VXRpbHMgZnJvbSAnbmdlby9wcmludC9VdGlscy5qcyc7XG5pbXBvcnQgTWFza0xheWVyIGZyb20gJ25nZW8vcHJpbnQvTWFzay5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OLmpzJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UuanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xudmFyIGFwcG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9QcmludFNlcnZpY2UubmFtZSwgbmdlb1ByaW50VXRpbHMubmFtZV0pO1xudmFyIFBSSU5UX1NDQUxFU18gPSBbMTAwLCAyNTAsIDUwMCwgMjUwMCwgNTAwMCwgMTAwMDAsIDI1MDAwLCA1MDAwMCwgMTAwMDAwLCA1MDAwMDBdO1xudmFyIFBSSU5UX0ZPUk1BVF8gPSAncGRmJztcbnZhciBQUklOVF9MQVlPVVRfID0gJzEgQTQgcG9ydHJhaXQnO1xudmFyIFBSSU5UX0RQSV8gPSA3MjtcbnZhciBQUklOVF9QQVBFUl9TSVpFXyA9IFs1NTUsIDY3NV07XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvQ3JlYXRlUHJpbnQsIG5nZW9QcmludFV0aWxzKSB7XG4gIHZhciBzb3VyY2UgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdvc20nXG4gICAgfSxcbiAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJ1xuICB9KTtcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVySW1hZ2Uoe1xuICAgICAgc291cmNlOiBzb3VyY2VcbiAgICB9KSwgbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICB1cmw6ICdkYXRhL3BvbHlnb24tc3dpemVybGFuZC5qc29uJyxcbiAgICAgICAgZm9ybWF0OiBuZXcgb2xGb3JtYXRHZW9KU09OKHtcbiAgICAgICAgICBkYXRhUHJvamVjdGlvbjogRVBTRzIwNTZcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDFdLFxuICAgICAgY2VudGVyOiBbMjUzNzYzNSwgMTE1MjY0MF0sXG4gICAgICB6b29tOiAzXG4gICAgfSlcbiAgfSk7XG4gIHRoaXMucHJpbnRTdGF0ZSA9ICcnO1xuICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICB0aGlzLnByaW50XyA9IG5nZW9DcmVhdGVQcmludChQUklOVF9QUk9YWSk7XG4gIHRoaXMucHJpbnRVdGlsc18gPSBuZ2VvUHJpbnRVdGlscztcbiAgdGhpcy5tYXNrTGF5ZXJfID0gbmV3IE1hc2tMYXllcigpO1xuXG4gIHRoaXMubWFza0xheWVyXy5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQUklOVF9QQVBFUl9TSVpFXztcbiAgfTtcblxuICB0aGlzLm1hc2tMYXllcl8uZ2V0U2NhbGUgPSBmdW5jdGlvbiAoZnJhbWVTdGF0ZSkge1xuICAgIHZhciBtYXBTaXplID0gZnJhbWVTdGF0ZS5zaXplO1xuICAgIHZhciBtYXBSZXNvbHV0aW9uID0gZnJhbWVTdGF0ZS52aWV3U3RhdGUucmVzb2x1dGlvbjtcblxuICAgIGlmIChtYXBTaXplICE9PSB1bmRlZmluZWQgJiYgbWFwUmVzb2x1dGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmdlb1ByaW50VXRpbHMuZ2V0T3B0aW1hbFNjYWxlKG1hcFNpemUsIG1hcFJlc29sdXRpb24sIFBSSU5UX1BBUEVSX1NJWkVfLCBQUklOVF9TQ0FMRVNfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFBSSU5UX1NDQUxFU19bMF07XG4gICAgfVxuICB9O1xuXG4gIHRoaXMubWFwLmFkZExheWVyKHRoaXMubWFza0xheWVyXyk7XG59XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5wcmludCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1hcCA9IHRoaXMubWFwO1xuICB2YXIgbWFwU2l6ZSA9IG1hcC5nZXRTaXplKCk7XG4gIHZhciB2aWV3UmVzb2x1dGlvbiA9IG1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xuICB2YXIgc2NhbGUgPSBtYXBTaXplICE9PSB1bmRlZmluZWQgJiYgdmlld1Jlc29sdXRpb24gIT09IHVuZGVmaW5lZCA/IHRoaXMucHJpbnRVdGlsc18uZ2V0T3B0aW1hbFNjYWxlKG1hcFNpemUsIHZpZXdSZXNvbHV0aW9uLCBQUklOVF9QQVBFUl9TSVpFXywgUFJJTlRfU0NBTEVTXykgOiBQUklOVF9TQ0FMRVNfWzBdO1xuICB2YXIgZHBpID0gUFJJTlRfRFBJXztcbiAgdmFyIGZvcm1hdCA9IFBSSU5UX0ZPUk1BVF87XG4gIHZhciBsYXlvdXQgPSBQUklOVF9MQVlPVVRfO1xuICB0aGlzLnByaW50U3RhdGUgPSAnUHJpbnRpbmcuLi4nO1xuICB2YXIgc3BlYyA9IHRoaXMucHJpbnRfLmNyZWF0ZVNwZWMobWFwLCBzY2FsZSwgZHBpLCBsYXlvdXQsIGZvcm1hdCwge1xuICAgICdkYXRhc291cmNlJzogW10sXG4gICAgJ2RlYnVnJzogMCxcbiAgICAnY29tbWVudHMnOiAnTXkgY29tbWVudHMnLFxuICAgICd0aXRsZSc6ICdNeSBwcmludCdcbiAgfSk7XG4gIHRoaXMucHJpbnRfLmNyZWF0ZVJlcG9ydChzcGVjKS50aGVuKHRoaXMuaGFuZGxlQ3JlYXRlUmVwb3J0U3VjY2Vzc18uYmluZCh0aGlzKSwgdGhpcy5oYW5kbGVDcmVhdGVSZXBvcnRFcnJvcl8uYmluZCh0aGlzKSk7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlQ3JlYXRlUmVwb3J0U3VjY2Vzc18gPSBmdW5jdGlvbiAocmVzcCkge1xuICB0aGlzLmdldFN0YXR1c18ocmVzcC5kYXRhLnJlZik7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U3RhdHVzXyA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgdGhpcy5wcmludF8uZ2V0U3RhdHVzKHJlZikudGhlbih0aGlzLmhhbmRsZUdldFN0YXR1c1N1Y2Nlc3NfLmJpbmQodGhpcywgcmVmKSwgdGhpcy5oYW5kbGVHZXRTdGF0dXNFcnJvcl8uYmluZCh0aGlzKSk7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlQ3JlYXRlUmVwb3J0RXJyb3JfID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgdGhpcy5wcmludFN0YXRlID0gJ1ByaW50IGVycm9yJztcbn07XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRTdGF0dXNTdWNjZXNzXyA9IGZ1bmN0aW9uIChyZWYsIHJlc3ApIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgbWZSZXNwID0gcmVzcC5kYXRhO1xuICB2YXIgZG9uZSA9IG1mUmVzcC5kb25lO1xuXG4gIGlmIChkb25lKSB7XG4gICAgdGhpcy5wcmludFN0YXRlID0gJyc7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnByaW50Xy5nZXRSZXBvcnRVcmwocmVmKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5nZXRTdGF0dXNfKHJlZik7XG4gICAgfSwgMTAwMCwgZmFsc2UpO1xuICB9XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlR2V0U3RhdHVzRXJyb3JfID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgdGhpcy5wcmludFN0YXRlID0gJ1ByaW50IGVycm9yJztcbn07XG5cbmFwcG1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyLmpzJztcbmltcG9ydCB7IGNyZWF0ZUNhbnZhc0NvbnRleHQyRCB9IGZyb20gJ29sL2RvbS5qcyc7XG5pbXBvcnQgeyBJTkNIRVNfUEVSX01FVEVSLCBET1RTX1BFUl9JTkNIIH0gZnJvbSAnbmdlby9wcmludC9VdGlscy5qcyc7XG5pbXBvcnQgeyB0b1JhZGlhbnMgfSBmcm9tICdvbC9tYXRoLmpzJztcblxudmFyIE1hc2sgPSBmdW5jdGlvbiAoX0xheWVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKE1hc2ssIF9MYXllcik7XG5cbiAgZnVuY3Rpb24gTWFzayhvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIF90aGlzID0gX0xheWVyLmNhbGwodGhpcywgb3B0aW9ucykgfHwgdGhpcztcbiAgICBfdGhpcy5jb250ZXh0XyA9IGNyZWF0ZUNhbnZhc0NvbnRleHQyRCgpO1xuICAgIF90aGlzLmNvbnRleHRfLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgX3RoaXMuY29udGV4dF8uY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBfdGhpcy5nZXRTY2FsZTtcbiAgICBfdGhpcy5nZXRTaXplO1xuICAgIF90aGlzLmdldFJvdGF0aW9uO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNYXNrLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKGZyYW1lU3RhdGUpIHtcbiAgICB2YXIgY3dpZHRoID0gZnJhbWVTdGF0ZS5zaXplWzBdO1xuICAgIHRoaXMuY29udGV4dF8uY2FudmFzLndpZHRoID0gY3dpZHRoO1xuICAgIHZhciBjaGVpZ2h0ID0gZnJhbWVTdGF0ZS5zaXplWzFdO1xuICAgIHRoaXMuY29udGV4dF8uY2FudmFzLmhlaWdodCA9IGNoZWlnaHQ7XG4gICAgdmFyIGNlbnRlciA9IFtjd2lkdGggLyAyLCBjaGVpZ2h0IC8gMl07XG4gICAgdGhpcy5jb250ZXh0Xy5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHRfLm1vdmVUbygwLCAwKTtcbiAgICB0aGlzLmNvbnRleHRfLmxpbmVUbyhjd2lkdGgsIDApO1xuICAgIHRoaXMuY29udGV4dF8ubGluZVRvKGN3aWR0aCwgY2hlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oMCwgY2hlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oMCwgMCk7XG4gICAgdGhpcy5jb250ZXh0Xy5jbG9zZVBhdGgoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xuICAgIHZhciBoZWlnaHQgPSBzaXplWzFdO1xuICAgIHZhciB3aWR0aCA9IHNpemVbMF07XG4gICAgdmFyIHNjYWxlID0gdGhpcy5nZXRTY2FsZShmcmFtZVN0YXRlKTtcbiAgICB2YXIgcmVzb2x1dGlvbiA9IGZyYW1lU3RhdGUudmlld1N0YXRlLnJlc29sdXRpb247XG4gICAgdmFyIGV4dGVudEhhbGZXaWR0aCA9IHdpZHRoIC8gRE9UU19QRVJfSU5DSCAvIElOQ0hFU19QRVJfTUVURVIgKiBzY2FsZSAvIHJlc29sdXRpb24gLyAyO1xuICAgIHZhciBleHRlbnRIYWxmSGVpZ2h0ID0gaGVpZ2h0IC8gRE9UU19QRVJfSU5DSCAvIElOQ0hFU19QRVJfTUVURVIgKiBzY2FsZSAvIHJlc29sdXRpb24gLyAyO1xuICAgIHZhciByb3RhdGlvbiA9IHRoaXMuZ2V0Um90YXRpb24gIT09IHVuZGVmaW5lZCA/IHRvUmFkaWFucyh0aGlzLmdldFJvdGF0aW9uKCkpIDogMDtcbiAgICB2YXIgZGlhZ29uYWwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZXh0ZW50SGFsZldpZHRoLCAyKSArIE1hdGgucG93KGV4dGVudEhhbGZIZWlnaHQsIDIpKTtcbiAgICB2YXIgZ2FtbWEgPSBNYXRoLmF0YW4oZXh0ZW50SGFsZkhlaWdodCAvIGV4dGVudEhhbGZXaWR0aCkgLSByb3RhdGlvbjtcbiAgICB2YXIgb21lZ2EgPSBNYXRoLmF0YW4oZXh0ZW50SGFsZldpZHRoIC8gZXh0ZW50SGFsZkhlaWdodCkgLSByb3RhdGlvbjtcbiAgICB2YXIgeDEgPSBjZW50ZXJbMF0gLSBNYXRoLmNvcyhnYW1tYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeTEgPSBjZW50ZXJbMV0gKyBNYXRoLnNpbihnYW1tYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeDIgPSBjZW50ZXJbMF0gKyBNYXRoLnNpbihvbWVnYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeTIgPSBjZW50ZXJbMV0gKyBNYXRoLmNvcyhvbWVnYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeDMgPSBjZW50ZXJbMF0gKyBNYXRoLmNvcyhnYW1tYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeTMgPSBjZW50ZXJbMV0gLSBNYXRoLnNpbihnYW1tYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeDQgPSBjZW50ZXJbMF0gLSBNYXRoLnNpbihvbWVnYSkgKiBkaWFnb25hbDtcbiAgICB2YXIgeTQgPSBjZW50ZXJbMV0gLSBNYXRoLmNvcyhvbWVnYSkgKiBkaWFnb25hbDtcbiAgICB0aGlzLmNvbnRleHRfLm1vdmVUbyh4MSwgeTEpO1xuICAgIHRoaXMuY29udGV4dF8ubGluZVRvKHgyLCB5Mik7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oeDMsIHkzKTtcbiAgICB0aGlzLmNvbnRleHRfLmxpbmVUbyh4NCwgeTQpO1xuICAgIHRoaXMuY29udGV4dF8ubGluZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jb250ZXh0Xy5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHRfLmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICB0aGlzLmNvbnRleHRfLmZpbGwoKTtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0Xy5jYW52YXM7XG4gIH07XG5cbiAgcmV0dXJuIE1hc2s7XG59KExheWVyKTtcblxuZXhwb3J0IHsgTWFzayBhcyBkZWZhdWx0IH07Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9