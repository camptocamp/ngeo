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



/***/ }),

/***/ "./examples/displaywindow.js":
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displaywindow.css */ "./examples/displaywindow.css");
/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_displaywindow_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/displaywindowComponent.js */ "./src/message/displaywindowComponent.js");
MainController.$inject = ["$scope"];



var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', [ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

function MainController($scope) {
  this.window1Content = 'https://www.camptocamp.com';
  this.window2Content = "<p>A window: <ul>\n      <li>That have custom dimensions.</li>\n      <li>That is draggable</li>\n      <li>That is rezisable</li>\n      <li>That can be open and close</li>\n      </ul></p>";
  this.window2IsOpen = false;
  this.window3IsOpen = false;
  this.window3Template = "\n    <div class=\"details\">\n      <p>\n          <h3>Using AngularJS directives:</h3>\n          <span ng-if=\"!ctrl.window3FalseValue\">This should appear</span>\n          <span ng-show=\"ctrl.window3FalseValue\">This should not be visible</span>\n      </p>\n    </div>\n  ";
  this.window3FalseValue = false;
  this.window4IsOpen = false;
  this.window4Template = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(document.getElementById('window4Template')).html();
  this.window4TextBinding = 'This is an AngularJS binding.';
  this.windowScope = $scope;
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/message/displaywindowComponent.html":
/*!*************************************************!*\
  !*** ./src/message/displaywindowComponent.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div\n  class="ngeo-displaywindow"\n  ng-show="$ctrl.open"\n  ng-style="$ctrl.style"\n>\n\n  <div class="windowcontainer">\n\n    <button\n      type="button"\n      class="btn fa-times close"\n      ng-click="$ctrl.close()">\n    </button>\n\n    <div class="animation-container">\n      <div class="slide-animation ">\n        <div\n          class="header ui-draggable-handle"\n          ng-if="$ctrl.title !== null">\n          <p class="title">{{$ctrl.title | translate}}</p>\n        </div>\n        <div\n          class="details content"\n          ng-if="$ctrl.content"\n          ng-bind-html="$ctrl.content">\n        </div>\n        <div\n          class="details iframe"\n          ng-if="$ctrl.url !== null">\n          <iframe\n            frameborder="0"\n            type="text/html"\n            height="100%"\n            width="100%"\n            ng-src="{{ $ctrl.urlTrusted }}"></iframe>\n        </div>\n        <div class="content-template-container"></div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/message/displaywindowComponent.js":
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery-ui/ui/widgets/resizable.js */ "./node_modules/jquery-ui/ui/widgets/resizable.js");
/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery-ui/ui/widgets/draggable.js */ "./node_modules/jquery-ui/ui/widgets/draggable.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_4__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMessageDisplaywindowComponent', ['ngSanitize']);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/message/displaywindowComponent', __webpack_require__(/*! ./displaywindowComponent.html */ "./src/message/displaywindowComponent.html"));
}]);
module.value('ngeoMessageDisplaywindowTemplateUrl', function ($attrs) {
  var templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/message/displaywindowComponent';
});
ngeoMessageDisplaywindowTemplateUrl.$inject = ["$attrs", "ngeoMessageDisplaywindowTemplateUrl"];

function ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {
  return ngeoMessageDisplaywindowTemplateUrl($attrs);
}

var Controller = function () {
  Controller.$inject = ["$element", "$sce", "$scope", "$compile"];

  function Controller($element, $sce, $scope, $compile) {
    this.clearOnClose;
    this.content = null;
    this.contentTemplate = null;
    this.contentScope = null;
    this.draggable;
    this.draggableContainment;
    this.desktop;
    this.height = null;
    this.open;
    this.resizable;
    this.title = null;
    this.url = null;
    this.width = null;
    this.element_ = $element;
    this.sce_ = $sce;
    this.scope_ = $scope;
    this.compile_ = $compile;
  }

  var _proto = Controller.prototype;

  _proto.$onInit = function $onInit() {
    var _this = this;

    this.clearOnClose = this.clearOnClose !== false;
    this.content = this.content || null;
    this.contentTemplate = this.contentTemplate || null;
    this.contentScope = this.contentScope || null;
    this.desktop = this.desktop !== false;
    this.draggableContainment = this.draggableContainment || 'document';
    this.open = this.open === true;
    this.height = this.height || '240px';
    this.width = this.width || '240px';
    this.draggable = this.draggable !== undefined ? this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ? this.resizable : this.desktop;

    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({
        'containment': this.draggableContainment,
        'handle': 'div.header'
      });
    }

    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({
        'minHeight': 240,
        'minWidth': 240
      });
    }

    if (this.contentTemplate) {
      this.updateContentTemplate_();
    }

    this.scope_.$watch(function () {
      return _this.contentTemplate;
    }, function () {
      return _this.updateContentTemplate_();
    });
  };

  _proto.updateContentTemplate_ = function updateContentTemplate_() {
    var scope = this.contentScope || this.scope_;
    var compiled = this.compile_(this.contentTemplate)(scope);
    var displayWindow = this.element_.find('.ngeo-displaywindow .windowcontainer .animation-container .content-template-container');
    displayWindow.empty();
    displayWindow.append(compiled);
  };

  _proto.close = function close() {
    this.open = false;

    if (this.clearOnClose) {
      this.clear_();
    }
  };

  _proto.clear_ = function clear_() {
    this.content = null;
    this.title = null;
    this.url = null;
  };

  _createClass(Controller, [{
    key: "style",
    get: function get() {
      return {
        'height': this.height,
        'width': this.width
      };
    }
  }, {
    key: "urlTrusted",
    get: function get() {
      if (this.url) {
        return this.sce_.trustAsResourceUrl(this.url);
      }
    }
  }]);

  return Controller;
}();

var ngeoMessageDisplaywindowComponent = {
  bindings: {
    'clearOnClose': '<?',
    'content': '=?',
    'contentTemplate': '=?',
    'contentScope': '<?',
    'desktop': '<?',
    'draggable': '<?',
    'draggableContainment': '<?',
    'height': '=?',
    'open': '=?',
    'resizable': '<?',
    'title': '=?',
    'url': '=?',
    'width': '=?'
  },
  controller: Controller,
  templateUrl: ngeoMessageDisplaywindowTemplateUrl
};
module.component('ngeoDisplaywindow', ngeoMessageDisplaywindowComponent);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 13:
/*!**********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/displaywindow.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/displaywindow.js */"./examples/displaywindow.js");


/***/ })

/******/ });
//# sourceMappingURL=displaywindow.js.map