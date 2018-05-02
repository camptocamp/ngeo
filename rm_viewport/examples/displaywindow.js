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
/******/ 		"displaywindow": 0
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

/***/ "./examples/displaywindow.css":
/*!************************************!*\
  !*** ./examples/displaywindow.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/displaywindow.css?");

/***/ }),

/***/ "./examples/displaywindow.js":
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displaywindow.css */ \"./examples/displaywindow.css\");\n/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_displaywindow_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/displaywindowComponent.js */ \"./src/message/displaywindowComponent.js\");\nMainController.$inject = [\"$scope\"];\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', [ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\n\nfunction MainController($scope) {\n  this.window1Content = 'https://www.camptocamp.com';\n  this.window2Content = \"<p>A window: <ul>\\n      <li>That have custom dimensions</li>\\n      <li>That is draggable</li>\\n      <li>That is rezisable</li>\\n      <li>That can be open and close</li>\\n      </ul></p>\";\n  this.window2IsOpen = false;\n  this.window3IsOpen = false;\n  this.window3Template = \"\\n    <div class=\\\"details\\\">\\n      <p>\\n          <h3>Using AngularJS directives:</h3>\\n          <span ng-if=\\\"!ctrl.window3FalseValue\\\">This should appear</span>\\n          <span ng-show=\\\"ctrl.window3FalseValue\\\">This should not be visible</span>\\n      </p>\\n    </div>\\n  \";\n  this.window3FalseValue = false;\n  this.window4IsOpen = false;\n  var element = document.getElementById('window4Template');\n\n  if (!element) {\n    throw new Error('Missing element');\n  }\n\n  this.window4Template = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(element).html();\n  this.window4TextBinding = 'This is an AngularJS binding.';\n  this.windowScope = $scope;\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/displaywindow.js?");

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/resizable.js":
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/jquery-ui/ui/widgets/resizable.js from dll-reference vendor ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(979);\n\n//# sourceURL=webpack:///delegated_./node_modules/jquery-ui/ui/widgets/resizable.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./src/message/displaywindowComponent.html":
/*!*************************************************!*\
  !*** ./src/message/displaywindowComponent.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div\\n  class=\"ngeo-displaywindow\"\\n  ng-show=\"$ctrl.open\"\\n  title=\"\"\\n>\\n\\n  <div class=\"windowcontainer\" ng-style=\"$ctrl.style\">\\n\\n    <button\\n      type=\"button\"\\n      class=\"btn fa-times close\"\\n      ng-click=\"$ctrl.close()\">\\n    </button>\\n\\n    <div class=\"animation-container\">\\n      <div class=\"slide-animation \">\\n        <div\\n          class=\"header ui-draggable-handle\"\\n          ng-if=\"$ctrl.title !== null\">\\n          <p class=\"title\">{{$ctrl.title | translate}}</p>\\n        </div>\\n        <div\\n          class=\"details content\"\\n          ng-if=\"$ctrl.content\"\\n          ng-bind-html=\"$ctrl.content\">\\n        </div>\\n        <div\\n          class=\"details iframe\"\\n          ng-if=\"$ctrl.url !== null\">\\n          <iframe\\n            frameborder=\"0\"\\n            type=\"text/html\"\\n            height=\"100%\"\\n            width=\"100%\"\\n            ng-src=\"{{ $ctrl.urlTrusted }}\"></iframe>\\n        </div>\\n        <div class=\"content-template-container\"></div>\\n      </div>\\n    </div>\\n\\n  </div>\\n\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/message/displaywindowComponent.html?");

/***/ }),

/***/ "./src/message/displaywindowComponent.js":
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/sass/font.scss */ \"./src/sass/font.scss\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery-ui/ui/widgets/resizable.js */ \"./node_modules/jquery-ui/ui/widgets/resizable.js\");\n/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery-ui/ui/widgets/draggable.js */ \"./node_modules/jquery-ui/ui/widgets/draggable.js\");\n/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-sanitize */ \"./node_modules/angular-sanitize/index.js\");\n/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMessageDisplaywindowComponent', ['ngSanitize']);\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/message/displaywindowComponent', __webpack_require__(/*! ./displaywindowComponent.html */ \"./src/message/displaywindowComponent.html\"));\n}]);\nmodule.value('ngeoMessageDisplaywindowTemplateUrl', function ($attrs) {\n  var templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];\n  return templateUrl !== undefined ? templateUrl : 'ngeo/message/displaywindowComponent';\n});\nngeoMessageDisplaywindowTemplateUrl.$inject = [\"$attrs\", \"ngeoMessageDisplaywindowTemplateUrl\"];\n\nfunction ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {\n  return ngeoMessageDisplaywindowTemplateUrl($attrs);\n}\n\nvar Controller = function () {\n  Controller.$inject = [\"$element\", \"$sce\", \"$scope\", \"$compile\"];\n\n  function Controller($element, $sce, $scope, $compile) {\n    this.clearOnClose = false;\n    this.content = null;\n    this.contentTemplate = null;\n    this.contentScope = null;\n    this.draggable = false;\n    this.draggableContainment = '';\n    this.desktop = false;\n    this.height = '';\n    this.open = false;\n    this.resizable = false;\n    this.title = null;\n    this.url = null;\n    this.width = '';\n    this.element_ = $element;\n    this.sce_ = $sce;\n    this.scope_ = $scope;\n    this.compile_ = $compile;\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.$onInit = function $onInit() {\n    var _this = this;\n\n    this.clearOnClose = this.clearOnClose !== false;\n    this.content = this.content || null;\n    this.contentTemplate = this.contentTemplate || null;\n    this.contentScope = this.contentScope || null;\n    this.desktop = this.desktop !== false;\n    this.draggableContainment = this.draggableContainment || 'document';\n    this.open = this.open === true;\n    this.height = this.height || '240px';\n    this.width = this.width || '240px';\n    this.draggable = this.draggable !== undefined ? this.draggable : this.desktop;\n    this.resizable = this.resizable !== undefined ? this.resizable : this.desktop;\n\n    if (this.draggable) {\n      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({\n        'containment': this.draggableContainment,\n        'handle': 'div.header'\n      });\n    }\n\n    if (this.resizable) {\n      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({\n        'minHeight': 240,\n        'minWidth': 240\n      });\n    }\n\n    if (this.contentTemplate) {\n      this.updateContentTemplate_();\n    }\n\n    this.scope_.$watch(function () {\n      return _this.contentTemplate;\n    }, function () {\n      return _this.updateContentTemplate_();\n    });\n  };\n\n  _proto.updateContentTemplate_ = function updateContentTemplate_() {\n    if (!this.contentTemplate) {\n      return;\n    }\n\n    var scope = this.contentScope || this.scope_;\n    var compiled = this.compile_(this.contentTemplate)(scope);\n    var displayWindow = this.element_.find('.ngeo-displaywindow .windowcontainer .animation-container .content-template-container');\n    displayWindow.empty();\n    displayWindow.append(compiled);\n  };\n\n  _proto.close = function close() {\n    this.open = false;\n\n    if (this.clearOnClose) {\n      this.clear_();\n    }\n  };\n\n  _proto.clear_ = function clear_() {\n    this.content = null;\n    this.title = null;\n    this.url = null;\n  };\n\n  _createClass(Controller, [{\n    key: \"style\",\n    get: function get() {\n      return {\n        height: this.height,\n        width: this.width\n      };\n    }\n  }, {\n    key: \"urlTrusted\",\n    get: function get() {\n      if (this.url) {\n        return this.sce_.trustAsResourceUrl(this.url);\n      }\n    }\n  }]);\n\n  return Controller;\n}();\n\nvar ngeoMessageDisplaywindowComponent = {\n  bindings: {\n    'clearOnClose': '<?',\n    'content': '=?',\n    'contentTemplate': '=?',\n    'contentScope': '<?',\n    'desktop': '<?',\n    'draggable': '<?',\n    'draggableContainment': '<?',\n    'height': '=?',\n    'open': '=?',\n    'resizable': '<?',\n    'title': '=?',\n    'url': '=?',\n    'width': '=?'\n  },\n  controller: Controller,\n  templateUrl: ngeoMessageDisplaywindowTemplateUrl\n};\nmodule.component('ngeoDisplaywindow', ngeoMessageDisplaywindowComponent);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/message/displaywindowComponent.js?");

/***/ }),

/***/ 13:
/*!**********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/displaywindow.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/displaywindow.js */\"./examples/displaywindow.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/displaywindow.js?");

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