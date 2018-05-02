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
/******/ 		"colorpicker": 0
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
/******/ 	deferredModules.push([6,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/colorpicker.css":
/*!**********************************!*\
  !*** ./examples/colorpicker.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/colorpicker.css?");

/***/ }),

/***/ "./examples/colorpicker.js":
/*!*********************************!*\
  !*** ./examples/colorpicker.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _colorpicker_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorpicker.css */ \"./examples/colorpicker.css\");\n/* harmony import */ var _colorpicker_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_colorpicker_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ngeo_misc_colorpickerComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/colorpickerComponent.js */ \"./src/misc/colorpickerComponent.js\");\nMainController.$inject = [\"$scope\"];\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_misc_colorpickerComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nvar colorpickerComponent = {\n  template: '<div ngeo-colorpicker=\"$ctrl.colors\" ngeo-colorpicker-color=\"mainCtrl.color\"></div>',\n  controller: 'AppColorpickerController'\n};\nmodule.component('appColorpicker', colorpickerComponent);\n\nfunction ColorPickerController() {\n  this.colors = [['red', 'yellow', 'green', 'lightgreen', 'lightblue', 'orange', 'purple'], ['#ffffff', '#f7f7f7', '#c3c3c3', '#000000']];\n}\n\nmodule.controller('AppColorpickerController', ColorPickerController);\n\nfunction MainController($scope) {\n  this.color = 'red';\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/colorpicker.js?");

/***/ }),

/***/ "./src/misc/colorpickerComponent.html":
/*!********************************************!*\
  !*** ./src/misc/colorpickerComponent.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<table class=\"ngeo-colorpicker-palette\">\\n  <tr ng-repeat=\"colors in ::ctrl.colors\">\\n    <td\\n      ng-repeat=\"color in ::colors\"\\n      ng-click=\"ctrl.setColor(color)\"\\n      ng-class=\"{\\'ngeo-colorpicker-selected\\': color == ctrl.color}\">\\n      <div ng-style=\"::{\\'background-color\\': color}\"></div>\\n    </td>\\n  </tr>\\n</table>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/misc/colorpickerComponent.html?");

/***/ }),

/***/ "./src/misc/colorpickerComponent.js":
/*!******************************************!*\
  !*** ./src/misc/colorpickerComponent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\ncolorPickerComponent.$inject = [\"ngeoColorpickerTemplateUrl\"];\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoColorpicker', []);\nmodule.value('ngeoColorpickerTemplateUrl', function (element, attrs) {\n  var templateUrl = attrs['ngeoColorpickerTemplateurl'];\n  return templateUrl !== undefined ? templateUrl : 'ngeo/misc/colorpickerComponent';\n});\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/misc/colorpickerComponent', __webpack_require__(/*! ./colorpickerComponent.html */ \"./src/misc/colorpickerComponent.html\"));\n}]);\n\nfunction colorPickerComponent(ngeoColorpickerTemplateUrl) {\n  return {\n    restrict: 'A',\n    scope: {\n      colors: '<?ngeoColorpicker',\n      color: '=?ngeoColorpickerColor'\n    },\n    controller: 'NgeoColorpickerController as ctrl',\n    bindToController: true,\n    templateUrl: ngeoColorpickerTemplateUrl\n  };\n}\n\nmodule.directive('ngeoColorpicker', colorPickerComponent);\nvar DEFAULT_COLORS = [['#F4EB37', '#CDDC39', '#62AF44', '#009D57', '#0BA9CC', '#4186F0', '#3F5BA9', '#7C3592', '#A61B4A', '#DB4436', '#F8971B', '#F4B400', '#795046'], ['#F9F7A6', '#E6EEA3', '#B7DBAB', '#7CCFA9', '#93D7E8', '#9FC3FF', '#A7B5D7', '#C6A4CF', '#D698AD', '#EE9C96', '#FAD199', '#FFDD5E', '#B29189'], ['#ffffff', '#CCCCCC', '#777', '#000000']];\n\nfunction Controller() {\n  this.colors = this.colors || DEFAULT_COLORS;\n  this.color;\n}\n\nController.prototype.setColor = function (color) {\n  this.color = color;\n};\n\nmodule.controller('NgeoColorpickerController', Controller);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/misc/colorpickerComponent.js?");

/***/ }),

/***/ 6:
/*!********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/colorpicker.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/colorpicker.js */\"./examples/colorpicker.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/colorpicker.js?");

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