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
/******/ 		"popover": 0
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
/******/ 	deferredModules.push([33,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/popover.css":
/*!******************************!*\
  !*** ./examples/popover.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/popover.css?");

/***/ }),

/***/ "./examples/popover.js":
/*!*****************************!*\
  !*** ./examples/popover.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _popover_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover.css */ \"./examples/popover.css\");\n/* harmony import */ var _popover_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_popover_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ngeo_message_popoverComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/popoverComponent.js */ \"./src/message/popoverComponent.js\");\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_message_popoverComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/popover.js?");

/***/ }),

/***/ "./node_modules/bootstrap/js/src/popover.js":
/*!**************************************************************************************!*\
  !*** delegated ./node_modules/bootstrap/js/src/popover.js from dll-reference vendor ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(964);\n\n//# sourceURL=webpack:///delegated_./node_modules/bootstrap/js/src/popover.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./src/message/popoverComponent.js":
/*!*****************************************!*\
  !*** ./src/message/popoverComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_js_src_tooltip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/tooltip.js */ \"./node_modules/bootstrap/js/src/tooltip.js\");\n/* harmony import */ var bootstrap_js_src_popover_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/src/popover.js */ \"./node_modules/bootstrap/js/src/popover.js\");\nPopoverController.$inject = [\"$scope\"];\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoPopover', []);\n\nfunction messagePopoverComponent() {\n  return {\n    restrict: 'A',\n    scope: true,\n    controller: 'NgeoPopoverController as popoverCtrl',\n    link: function link(scope, elem, attrs, ngeoPopoverCtrl) {\n      if (!ngeoPopoverCtrl) {\n        throw new Error('Missing ngeoPopoverCtrl');\n      }\n\n      ngeoPopoverCtrl.anchorElm.on('inserted.bs.popover', function () {\n        ngeoPopoverCtrl.bodyElm.show();\n        ngeoPopoverCtrl.shown = true;\n      });\n      ngeoPopoverCtrl.anchorElm.popover({\n        container: 'body',\n        html: true,\n        content: ngeoPopoverCtrl.bodyElm,\n        boundary: 'viewport',\n        placement: attrs['ngeoPopoverPlacement'] || 'right'\n      });\n\n      if (attrs['ngeoPopoverDismiss']) {\n        $(attrs['ngeoPopoverDismiss']).on('scroll', function () {\n          ngeoPopoverCtrl.dismissPopover();\n        });\n      }\n\n      scope.$on('$destroy', function () {\n        ngeoPopoverCtrl.anchorElm.popover('dispose');\n        ngeoPopoverCtrl.anchorElm.unbind('inserted.bs.popover');\n        ngeoPopoverCtrl.anchorElm.unbind('hidden.bs.popover');\n      });\n    }\n  };\n}\n\nfunction messagePopoverAnchorComponent() {\n  return {\n    restrict: 'A',\n    require: '^^ngeoPopover',\n    link: function link(scope, elem, attrs, ngeoPopoverCtrl) {\n      if (!ngeoPopoverCtrl) {\n        throw new Error('Missing ngeoPopoverCtrl');\n      }\n\n      ngeoPopoverCtrl.anchorElm = elem;\n    }\n  };\n}\n\nfunction messagePopoverContentComponent() {\n  return {\n    restrict: 'A',\n    require: '^^ngeoPopover',\n    link: function link(scope, elem, attrs, ngeoPopoverCtrl) {\n      if (!ngeoPopoverCtrl) {\n        throw new Error('Missing ngeoPopoverCtrl');\n      }\n\n      ngeoPopoverCtrl.bodyElm = elem;\n      elem.hide();\n    }\n  };\n}\n\nfunction PopoverController($scope) {\n  var _this = this;\n\n  this.shown = false;\n  this.anchorElm = null;\n  this.bodyElm = null;\n\n  var clickHandler = function clickHandler(clickEvent) {\n    if (!_this.anchorElm) {\n      throw new Error('Missing anchorElm');\n    }\n\n    if (!_this.bodyElm) {\n      throw new Error('Missing bodyElm');\n    }\n\n    if (_this.anchorElm[0] !== clickEvent.target && _this.bodyElm.parent()[0] !== clickEvent.target && _this.bodyElm.parent().find(clickEvent.target).length === 0 && _this.shown) {\n      _this.dismissPopover();\n    }\n  };\n\n  document.body.addEventListener('click', clickHandler);\n  $scope.$on('$destroy', function () {\n    document.body.removeEventListener('click', clickHandler);\n  });\n}\n\nPopoverController.prototype.dismissPopover = function () {\n  if (!this.anchorElm) {\n    throw new Error('Missing anchorElm');\n  }\n\n  this.shown = false;\n  this.anchorElm.popover('hide');\n};\n\nmodule.controller('NgeoPopoverController', PopoverController);\nmodule.directive('ngeoPopover', messagePopoverComponent);\nmodule.directive('ngeoPopoverAnchor', messagePopoverAnchorComponent);\nmodule.directive('ngeoPopoverContent', messagePopoverContentComponent);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./src/message/popoverComponent.js?");

/***/ }),

/***/ 33:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/popover.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/popover.js */\"./examples/popover.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/popover.js?");

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