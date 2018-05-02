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
__p += '<div\n  class="ngeo-displaywindow"\n  ng-show="$ctrl.open"\n  title=""\n>\n\n  <div class="windowcontainer" ng-style="$ctrl.style">\n\n    <button\n      type="button"\n      class="btn fa-times close"\n      ng-click="$ctrl.close()">\n    </button>\n\n    <div class="animation-container">\n      <div class="slide-animation ">\n        <div\n          class="header ui-draggable-handle"\n          ng-if="$ctrl.title !== null">\n          <p class="title">{{$ctrl.title | translate}}</p>\n        </div>\n        <div\n          class="details content"\n          ng-if="$ctrl.content"\n          ng-bind-html="$ctrl.content">\n        </div>\n        <div\n          class="details iframe"\n          ng-if="$ctrl.url !== null">\n          <iframe\n            frameborder="0"\n            type="text/html"\n            height="100%"\n            width="100%"\n            ng-src="{{ $ctrl.urlTrusted }}"></iframe>\n        </div>\n        <div class="content-template-container"></div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9kaXNwbGF5d2luZG93LmpzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJkaXNwbGF5d2luZG93XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzEzLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIl07XG5pbXBvcnQgJy4vZGlzcGxheXdpbmRvdy5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudC5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuICB0aGlzLndpbmRvdzFDb250ZW50ID0gJ2h0dHBzOi8vd3d3LmNhbXB0b2NhbXAuY29tJztcbiAgdGhpcy53aW5kb3cyQ29udGVudCA9IFwiPHA+QSB3aW5kb3c6IDx1bD5cXG4gICAgICA8bGk+VGhhdCBoYXZlIGN1c3RvbSBkaW1lbnNpb25zLjwvbGk+XFxuICAgICAgPGxpPlRoYXQgaXMgZHJhZ2dhYmxlPC9saT5cXG4gICAgICA8bGk+VGhhdCBpcyByZXppc2FibGU8L2xpPlxcbiAgICAgIDxsaT5UaGF0IGNhbiBiZSBvcGVuIGFuZCBjbG9zZTwvbGk+XFxuICAgICAgPC91bD48L3A+XCI7XG4gIHRoaXMud2luZG93MklzT3BlbiA9IGZhbHNlO1xuICB0aGlzLndpbmRvdzNJc09wZW4gPSBmYWxzZTtcbiAgdGhpcy53aW5kb3czVGVtcGxhdGUgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkZXRhaWxzXFxcIj5cXG4gICAgICA8cD5cXG4gICAgICAgICAgPGgzPlVzaW5nIEFuZ3VsYXJKUyBkaXJlY3RpdmVzOjwvaDM+XFxuICAgICAgICAgIDxzcGFuIG5nLWlmPVxcXCIhY3RybC53aW5kb3czRmFsc2VWYWx1ZVxcXCI+VGhpcyBzaG91bGQgYXBwZWFyPC9zcGFuPlxcbiAgICAgICAgICA8c3BhbiBuZy1zaG93PVxcXCJjdHJsLndpbmRvdzNGYWxzZVZhbHVlXFxcIj5UaGlzIHNob3VsZCBub3QgYmUgdmlzaWJsZTwvc3Bhbj5cXG4gICAgICA8L3A+XFxuICAgIDwvZGl2PlxcbiAgXCI7XG4gIHRoaXMud2luZG93M0ZhbHNlVmFsdWUgPSBmYWxzZTtcbiAgdGhpcy53aW5kb3c0SXNPcGVuID0gZmFsc2U7XG4gIHRoaXMud2luZG93NFRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kb3c0VGVtcGxhdGUnKSkuaHRtbCgpO1xuICB0aGlzLndpbmRvdzRUZXh0QmluZGluZyA9ICdUaGlzIGlzIGFuIEFuZ3VsYXJKUyBiaW5kaW5nLic7XG4gIHRoaXMud2luZG93U2NvcGUgPSAkc2NvcGU7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2XFxuICBjbGFzcz1cIm5nZW8tZGlzcGxheXdpbmRvd1wiXFxuICBuZy1zaG93PVwiJGN0cmwub3BlblwiXFxuICB0aXRsZT1cIlwiXFxuPlxcblxcbiAgPGRpdiBjbGFzcz1cIndpbmRvd2NvbnRhaW5lclwiIG5nLXN0eWxlPVwiJGN0cmwuc3R5bGVcIj5cXG5cXG4gICAgPGJ1dHRvblxcbiAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgIGNsYXNzPVwiYnRuIGZhLXRpbWVzIGNsb3NlXCJcXG4gICAgICBuZy1jbGljaz1cIiRjdHJsLmNsb3NlKClcIj5cXG4gICAgPC9idXR0b24+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJhbmltYXRpb24tY29udGFpbmVyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlLWFuaW1hdGlvbiBcIj5cXG4gICAgICAgIDxkaXZcXG4gICAgICAgICAgY2xhc3M9XCJoZWFkZXIgdWktZHJhZ2dhYmxlLWhhbmRsZVwiXFxuICAgICAgICAgIG5nLWlmPVwiJGN0cmwudGl0bGUgIT09IG51bGxcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XCJ0aXRsZVwiPnt7JGN0cmwudGl0bGUgfCB0cmFuc2xhdGV9fTwvcD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdlxcbiAgICAgICAgICBjbGFzcz1cImRldGFpbHMgY29udGVudFwiXFxuICAgICAgICAgIG5nLWlmPVwiJGN0cmwuY29udGVudFwiXFxuICAgICAgICAgIG5nLWJpbmQtaHRtbD1cIiRjdHJsLmNvbnRlbnRcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdlxcbiAgICAgICAgICBjbGFzcz1cImRldGFpbHMgaWZyYW1lXCJcXG4gICAgICAgICAgbmctaWY9XCIkY3RybC51cmwgIT09IG51bGxcIj5cXG4gICAgICAgICAgPGlmcmFtZVxcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXFxuICAgICAgICAgICAgdHlwZT1cInRleHQvaHRtbFwiXFxuICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXFxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcXG4gICAgICAgICAgICBuZy1zcmM9XCJ7eyAkY3RybC51cmxUcnVzdGVkIH19XCI+PC9pZnJhbWU+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LXRlbXBsYXRlLWNvbnRhaW5lclwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcblxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0ICduZ2VvL3Nhc3MvZm9udC5zY3NzJztcbmltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldHMvcmVzaXphYmxlLmpzJztcbmltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJhZ2dhYmxlLmpzJztcbmltcG9ydCAnYW5ndWxhci1zYW5pdGl6ZSc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCcsIFsnbmdTYW5pdGl6ZSddKTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQnLCByZXF1aXJlKCcuL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbm1vZHVsZS52YWx1ZSgnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoJGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9ICRhdHRyc1snbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnXTtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL21lc3NhZ2UvZGlzcGxheXdpbmRvd0NvbXBvbmVudCc7XG59KTtcbm5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkYXR0cnNcIiwgXCJuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxudmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwiJHNjZVwiLCBcIiRzY29wZVwiLCBcIiRjb21waWxlXCJdO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY2UsICRzY29wZSwgJGNvbXBpbGUpIHtcbiAgICB0aGlzLmNsZWFyT25DbG9zZTtcbiAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRTY29wZSA9IG51bGw7XG4gICAgdGhpcy5kcmFnZ2FibGU7XG4gICAgdGhpcy5kcmFnZ2FibGVDb250YWlubWVudDtcbiAgICB0aGlzLmRlc2t0b3A7XG4gICAgdGhpcy5oZWlnaHQgPSBudWxsO1xuICAgIHRoaXMub3BlbjtcbiAgICB0aGlzLnJlc2l6YWJsZTtcbiAgICB0aGlzLnRpdGxlID0gbnVsbDtcbiAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgdGhpcy53aWR0aCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50XyA9ICRlbGVtZW50O1xuICAgIHRoaXMuc2NlXyA9ICRzY2U7XG4gICAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gICAgdGhpcy5jb21waWxlXyA9ICRjb21waWxlO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5jbGVhck9uQ2xvc2UgPSB0aGlzLmNsZWFyT25DbG9zZSAhPT0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5jb250ZW50IHx8IG51bGw7XG4gICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSB0aGlzLmNvbnRlbnRUZW1wbGF0ZSB8fCBudWxsO1xuICAgIHRoaXMuY29udGVudFNjb3BlID0gdGhpcy5jb250ZW50U2NvcGUgfHwgbnVsbDtcbiAgICB0aGlzLmRlc2t0b3AgPSB0aGlzLmRlc2t0b3AgIT09IGZhbHNlO1xuICAgIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgPSB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50IHx8ICdkb2N1bWVudCc7XG4gICAgdGhpcy5vcGVuID0gdGhpcy5vcGVuID09PSB0cnVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgfHwgJzI0MHB4JztcbiAgICB0aGlzLndpZHRoID0gdGhpcy53aWR0aCB8fCAnMjQwcHgnO1xuICAgIHRoaXMuZHJhZ2dhYmxlID0gdGhpcy5kcmFnZ2FibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMuZHJhZ2dhYmxlIDogdGhpcy5kZXNrdG9wO1xuICAgIHRoaXMucmVzaXphYmxlID0gdGhpcy5yZXNpemFibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMucmVzaXphYmxlIDogdGhpcy5kZXNrdG9wO1xuXG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRfLmZpbmQoJy5uZ2VvLWRpc3BsYXl3aW5kb3cgLndpbmRvd2NvbnRhaW5lcicpLmRyYWdnYWJsZSh7XG4gICAgICAgICdjb250YWlubWVudCc6IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQsXG4gICAgICAgICdoYW5kbGUnOiAnZGl2LmhlYWRlcidcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXInKS5yZXNpemFibGUoe1xuICAgICAgICAnbWluSGVpZ2h0JzogMjQwLFxuICAgICAgICAnbWluV2lkdGgnOiAyNDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb250ZW50VGVtcGxhdGU7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8udXBkYXRlQ29udGVudFRlbXBsYXRlXyA9IGZ1bmN0aW9uIHVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKSB7XG4gICAgdmFyIHNjb3BlID0gdGhpcy5jb250ZW50U2NvcGUgfHwgdGhpcy5zY29wZV87XG4gICAgdmFyIGNvbXBpbGVkID0gdGhpcy5jb21waWxlXyh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkoc2NvcGUpO1xuICAgIHZhciBkaXNwbGF5V2luZG93ID0gdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXIgLmFuaW1hdGlvbi1jb250YWluZXIgLmNvbnRlbnQtdGVtcGxhdGUtY29udGFpbmVyJyk7XG4gICAgZGlzcGxheVdpbmRvdy5lbXB0eSgpO1xuICAgIGRpc3BsYXlXaW5kb3cuYXBwZW5kKGNvbXBpbGVkKTtcbiAgfTtcblxuICBfcHJvdG8uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmNsZWFyT25DbG9zZSkge1xuICAgICAgdGhpcy5jbGVhcl8oKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyXyA9IGZ1bmN0aW9uIGNsZWFyXygpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMudGl0bGUgPSBudWxsO1xuICAgIHRoaXMudXJsID0gbnVsbDtcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoQ29udHJvbGxlciwgW3tcbiAgICBrZXk6IFwic3R5bGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdoZWlnaHQnOiB0aGlzLmhlaWdodCxcbiAgICAgICAgJ3dpZHRoJzogdGhpcy53aWR0aFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXJsVHJ1c3RlZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMudXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZV8udHJ1c3RBc1Jlc291cmNlVXJsKHRoaXMudXJsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcblxudmFyIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnY2xlYXJPbkNsb3NlJzogJzw/JyxcbiAgICAnY29udGVudCc6ICc9PycsXG4gICAgJ2NvbnRlbnRUZW1wbGF0ZSc6ICc9PycsXG4gICAgJ2NvbnRlbnRTY29wZSc6ICc8PycsXG4gICAgJ2Rlc2t0b3AnOiAnPD8nLFxuICAgICdkcmFnZ2FibGUnOiAnPD8nLFxuICAgICdkcmFnZ2FibGVDb250YWlubWVudCc6ICc8PycsXG4gICAgJ2hlaWdodCc6ICc9PycsXG4gICAgJ29wZW4nOiAnPT8nLFxuICAgICdyZXNpemFibGUnOiAnPD8nLFxuICAgICd0aXRsZSc6ICc9PycsXG4gICAgJ3VybCc6ICc9PycsXG4gICAgJ3dpZHRoJzogJz0/J1xuICB9LFxuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICB0ZW1wbGF0ZVVybDogbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmxcbn07XG5tb2R1bGUuY29tcG9uZW50KCduZ2VvRGlzcGxheXdpbmRvdycsIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9