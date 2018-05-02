/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/displaywindow.js"
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displaywindow_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displaywindow.scss */ "./examples/displaywindow.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_message_displaywindowComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/displaywindowComponent */ "./src/message/displaywindowComponent.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.






/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', [ngeo_message_displaywindowComponent__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

MainController.$inject = ['$scope'];

/**
 * @param {angular.IScope} $scope Scope.
 * @class
 */
function MainController($scope) {
  /**
   * @type {string}
   */
  this.window1Content = 'https://www.camptocamp.com';

  /**
   * @type {string}
   */
  this.window2Content = `<p>A window: <ul>
      <li>That have custom dimensions</li>
      <li>That is draggable</li>
      <li>That is rezisable</li>
      <li>That can be open and close</li>
      </ul></p>`;

  /**
   * @type {boolean}
   */
  this.window2IsOpen = false;

  /**
   * @type {boolean}
   */
  this.window3IsOpen = false;

  /**
   * @type {string}
   */
  this.window3Template = `
    <div class="details">
      <p>
          <h3>Using AngularJS directives:</h3>
          <span ng-if="!ctrl.window3FalseValue">This should appear</span>
          <span ng-show="ctrl.window3FalseValue">This should not be visible</span>
      </p>
    </div>
  `;

  /**
   * @type {boolean}
   */
  this.window3FalseValue = false;

  /**
   * @type {boolean}
   */
  this.window4IsOpen = false;
  const element = document.getElementById('window4Template');
  if (!element) {
    throw new Error('Missing element');
  }
  /**
   * @type {string}
   */
  this.window4Template = angular__WEBPACK_IMPORTED_MODULE_1___default().element(element).html();

  /**
   * @type {string}
   */
  this.window4TextBinding = 'This is an AngularJS binding.';

  /**
   * @type {angular.IScope}
   */
  this.windowScope = $scope;
}
myModule.controller('MainController', MainController);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/displaywindow.scss"
/*!*************************************!*\
  !*** ./examples/displaywindow.scss ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/message/displaywindowComponent.html.js"
/*!****************************************************!*\
  !*** ./src/message/displaywindowComponent.html.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-displaywindow" ng-show="$ctrl.open" title="">
  <div class="windowcontainer" ng-style="$ctrl.style">
    <button type="button" class="btn fa-xmark close" ng-click="$ctrl.close()"></button>

    <div class="animation-container">
      <div class="slide-animation">
        <div class="header ui-draggable-handle" ng-if="$ctrl.title !== null">
          <p class="title">{{$ctrl.title | translate}}</p>
        </div>
        <div class="details content" ng-if="$ctrl.content" ng-bind-html="$ctrl.content"></div>
        <div class="details iframe" ng-if="$ctrl.url !== null">
          <iframe
            frameborder="0"
            type="text/html"
            height="100%"
            width="100%"
            ng-src="{{ $ctrl.urlTrusted }}"
          ></iframe>
        </div>
        <div class="content-template-container"></div>
      </div>
    </div>
  </div>
</div>`);


/***/ },

/***/ "./src/message/displaywindowComponent.js"
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_gettext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-gettext */ "./node_modules/angular-gettext/index.js");
/* harmony import */ var angular_gettext__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_gettext__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _displaywindowComponent_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displaywindowComponent.html */ "./src/message/displaywindowComponent.html.js");
// The MIT License (MIT)
//
// Copyright (c) 2017-2026 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// jquery-ui/ui/widgets/resizable must be imported by your main controller.
// jquery-ui/ui/widgets/draggable must be imported by your main controller.





/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoMessageDisplaywindowComponent', ['ngSanitize', 'gettext']);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/message/displaywindowComponent', _displaywindowComponent_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },
  ],
);
myModule.value(
  'ngeoMessageDisplaywindowTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/message/displaywindowComponent';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoMessageDisplaywindowTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoMessageDisplaywindowTemplateUrl.$inject = ['$attrs', 'ngeoMessageDisplaywindowTemplateUrl'];
function ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {
  return ngeoMessageDisplaywindowTemplateUrl($attrs);
}

/**
 * @hidden
 */
class Controller {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.ISCEService} $sce Angular sce service.
   * @param {angular.IScope} $scope Scope.
   * @param {angular.ICompileService} $compile The compile provider.
   * @ngdoc controller
   * @ngname ngeoDisplaywindowComponentController
   */
  constructor($element, $sce, $scope, $compile) {
    // === Binding Properties ===

    /**
     * @type {boolean}
     */
    this.clearOnClose;

    /**
     * @type {?string}
     */
    this.content;

    /**
     * @type {?string}
     */
    this.contentTemplate;

    /**
     * @type {?angular.IScope}
     */
    this.contentScope;

    /**
     * @type {boolean}
     */
    this.draggable;

    /**
     * @type {Element|string}
     */
    this.draggableContainment;

    /**
     * @type {boolean}
     */
    this.desktop;

    /**
     * @type {string}
     */
    this.height;

    /**
     * @type {boolean}
     */
    this.open;

    /**
     * @type {boolean}
     */
    this.resizable;

    /**
     * @type {?string}
     */
    this.title;

    /**
     * @type {?string}
     */
    this.url;

    /**
     * @type {string}
     */
    this.width;

    // === Injected Properties ===

    /**
     * @type {JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {angular.ISCEService}
     * @private
     */
    this.sce_ = $sce;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ICompileService}
     * @private
     */
    this.compile_ = $compile;
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {
    // Initialize binding properties
    this.clearOnClose = this.clearOnClose !== false;
    this.content = this.content || null;
    this.contentTemplate = this.contentTemplate || null;
    this.contentScope = this.contentScope || null;
    this.desktop = this.desktop !== false;
    this.draggableContainment = this.draggableContainment || 'document';
    this.open = this.open === true;
    this.height = this.height || '240px';
    this.width = this.width || '240px';

    /**
     * @type {Element}
     */
    this.containingElement = null;
    if (typeof this.draggableContainment === 'string') {
      if (this.draggableContainment !== 'document') {
        let className = String(this.draggableContainment);
        if (className.startsWith('.')) {
          className = className.substring(1);
        }
        this.containingElement = document.getElementsByClassName(className)[0];
      } else {
        this.containingElement = document.documentElement;
      }
    } else {
      this.containingElement = this.draggableContainment;
    }
    this.draggable = this.draggable !== undefined ? this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ? this.resizable : this.desktop;

    // Draggable
    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({
        'containment': this.draggableContainment,
        'handle': 'div.header',
      });
    }

    // Resizable
    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({
        'minHeight': 240,
        'minWidth': 240,
        resize: (event, ui) => {
          this.height = `${ui.size.height}px`;
          this.width = `${ui.size.width}px`;
        },
      });
    }
    if (this.contentTemplate) {
      this.updateContentTemplate_();
    }
    this.scope_.$watch(
      () => this.contentTemplate,
      () => this.updateContentTemplate_(),
    );
  }

  /**
   *  @private
   */
  updateContentTemplate_() {
    if (!this.contentTemplate) {
      return;
    }
    const scope = this.contentScope || this.scope_;
    const compiled = this.compile_(this.contentTemplate)(scope);
    const displayWindow = this.element_.find(
      '.ngeo-displaywindow .windowcontainer .animation-container .content-template-container',
    );
    displayWindow.empty();
    displayWindow.append(/** @type {?} */ compiled);
  }

  /**
   */
  close() {
    this.open = false;
    if (this.clearOnClose) {
      this.clear_();
    }
  }

  /**
   * @returns {Object<string, string>} CSS style when using width/height
   */
  get style() {
    this.maxWidth = this.containingElement.clientWidth - 20;
    this.maxHeight = this.containingElement.clientHeight - 20;
    return {
      height: this.height,
      width: this.width,
      'max-width': this.maxWidth.toString() + 'px',
      'max-height': this.maxHeight.toString() + 'px',
    };
  }

  /**
   * @returns {string|undefined} Trusted url.
   */
  get urlTrusted() {
    if (this.url) {
      return /** @type {string} */ this.sce_.trustAsResourceUrl(this.url);
    }
    return undefined;
  }

  /**
   */
  clear_() {
    this.content = null;
    this.title = null;
    this.url = null;
  }
}
Controller.$inject = ['$element', '$sce', '$scope', '$compile'];
/**
 * The `ngeo-displaywindow` component is an alternative to the `ngeo.message.Popup`.
 * What they have in common:
 *
 * - support title
 * - support url to be shown in an iframe
 * - support plain HTML content
 * - support sizing, i.e. height and width.
 * - support being opened/closed
 *
 * The differences with the `ngeo.message.Popup` are:
 *
 * - it supports being dragged
 * - it supports being resized
 * - support angularjs template content
 *
 * Example:
 *      <ngeo-displaywindow
 *        class="window1"
 *        url="::ctrl.window1Content"
 *        desktop="::false"
 *        open="::true"
 *        title="'Window 1 - The simplest window (close kills it)'">
 *      </ngeo-displaywindow>
 *
 * @htmlAttribute {boolean} [ngeo]-displaywindow-clear-on-close Whether to clear the content on close or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-content The html content. If not provided, you must provide
 *     an url.
 * @htmlAttribute {string} [ngeo]-displaywindow-content-template AngularJS template. It gets compiled during
 *    runtime with the supplied scope (ngeo-displaywindow-content-scope).
 * @htmlAttribute {angular.IScope} [ngeo]-displaywindow-content-scope Scope used for
 *    ngeo-displaywindow-content-template.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-desktop If true, the window is draggable and resizable. If
 *     not set, you must set manually both parameter.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-draggable Whether the window is draggable or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-draggable-containment The zone (CSS selector) where the window
 *     is authorized to be dragged.
 * @htmlAttribute {string} [ngeo]-displaywindow-height The default height of the window.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-open Whether the window is open or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-title The html title of the window.
 * @htmlAttribute {string} [ngeo]-displaywindow-url The URL to open in an iframe, in the window. The content
 *     attribute must not be provided.
 * @htmlAttribute {string} [ngeo]-displaywindow-width The default width of the window.
 * @ngdoc component
 * @ngname ngeoDisplaywindow
 */
const ngeoMessageDisplaywindowComponent = {
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
    'width': '=?',
  },
  controller: Controller,
  templateUrl: ngeoMessageDisplaywindowTemplateUrl,
};
myModule.component('ngeoDisplaywindow', ngeoMessageDisplaywindowComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = () => (Promise.resolve());
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	// set .name for anonymous default exports per ES spec
/******/ 	// skipped when the property is non-configurable (pre-ES2015 engines),
/******/ 	// where Object.defineProperty would throw
/******/ 	__webpack_require__.dn = (x) => {
/******/ 		var descriptor = Object.getOwnPropertyDescriptor(x, "name");
/******/ 		if (!descriptor || (!descriptor.writable && descriptor.configurable)) Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"displaywindow": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/displaywindow.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXdpbmRvdy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2R0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21lc3NhZ2UvZGlzcGxheXdpbmRvd0NvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9zZXQgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0IG5hbWUiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL2Rpc3BsYXl3aW5kb3cuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCBmcm9tICduZ2VvL21lc3NhZ2UvZGlzcGxheXdpbmRvd0NvbXBvbmVudCc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dDb21wb25lbnQubmFtZV0pO1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53aW5kb3cxQ29udGVudCA9ICdodHRwczovL3d3dy5jYW1wdG9jYW1wLmNvbSc7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLndpbmRvdzJDb250ZW50ID0gYDxwPkEgd2luZG93OiA8dWw+XG4gICAgICA8bGk+VGhhdCBoYXZlIGN1c3RvbSBkaW1lbnNpb25zPC9saT5cbiAgICAgIDxsaT5UaGF0IGlzIGRyYWdnYWJsZTwvbGk+XG4gICAgICA8bGk+VGhhdCBpcyByZXppc2FibGU8L2xpPlxuICAgICAgPGxpPlRoYXQgY2FuIGJlIG9wZW4gYW5kIGNsb3NlPC9saT5cbiAgICAgIDwvdWw+PC9wPmA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy53aW5kb3cySXNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy53aW5kb3czSXNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLndpbmRvdzNUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiPlxuICAgICAgPHA+XG4gICAgICAgICAgPGgzPlVzaW5nIEFuZ3VsYXJKUyBkaXJlY3RpdmVzOjwvaDM+XG4gICAgICAgICAgPHNwYW4gbmctaWY9XCIhY3RybC53aW5kb3czRmFsc2VWYWx1ZVwiPlRoaXMgc2hvdWxkIGFwcGVhcjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBuZy1zaG93PVwiY3RybC53aW5kb3czRmFsc2VWYWx1ZVwiPlRoaXMgc2hvdWxkIG5vdCBiZSB2aXNpYmxlPC9zcGFuPlxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMud2luZG93M0ZhbHNlVmFsdWUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLndpbmRvdzRJc09wZW4gPSBmYWxzZTtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kb3c0VGVtcGxhdGUnKTtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVsZW1lbnQnKTtcbiAgfVxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93NFRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmh0bWwoKTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93NFRleHRCaW5kaW5nID0gJ1RoaXMgaXMgYW4gQW5ndWxhckpTIGJpbmRpbmcuJztcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy53aW5kb3dTY29wZSA9ICRzY29wZTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLWRpc3BsYXl3aW5kb3dcIiBuZy1zaG93PVwiJGN0cmwub3BlblwiIHRpdGxlPVwiXCI+XG4gIDxkaXYgY2xhc3M9XCJ3aW5kb3djb250YWluZXJcIiBuZy1zdHlsZT1cIiRjdHJsLnN0eWxlXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZmEteG1hcmsgY2xvc2VcIiBuZy1jbGljaz1cIiRjdHJsLmNsb3NlKClcIj48L2J1dHRvbj5cblxuICAgIDxkaXYgY2xhc3M9XCJhbmltYXRpb24tY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtYW5pbWF0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXIgdWktZHJhZ2dhYmxlLWhhbmRsZVwiIG5nLWlmPVwiJGN0cmwudGl0bGUgIT09IG51bGxcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInRpdGxlXCI+e3skY3RybC50aXRsZSB8IHRyYW5zbGF0ZX19PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMgY29udGVudFwiIG5nLWlmPVwiJGN0cmwuY29udGVudFwiIG5nLWJpbmQtaHRtbD1cIiRjdHJsLmNvbnRlbnRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMgaWZyYW1lXCIgbmctaWY9XCIkY3RybC51cmwgIT09IG51bGxcIj5cbiAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgICAgICAgICAgdHlwZT1cInRleHQvaHRtbFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICBuZy1zcmM9XCJ7eyAkY3RybC51cmxUcnVzdGVkIH19XCJcbiAgICAgICAgICA+PC9pZnJhbWU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC10ZW1wbGF0ZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTctMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBqcXVlcnktdWkvdWkvd2lkZ2V0cy9yZXNpemFibGUgbXVzdCBiZSBpbXBvcnRlZCBieSB5b3VyIG1haW4gY29udHJvbGxlci5cbi8vIGpxdWVyeS11aS91aS93aWRnZXRzL2RyYWdnYWJsZSBtdXN0IGJlIGltcG9ydGVkIGJ5IHlvdXIgbWFpbiBjb250cm9sbGVyLlxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJ2FuZ3VsYXItZ2V0dGV4dCc7XG5pbXBvcnQgJ2FuZ3VsYXItc2FuaXRpemUnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQuaHRtbCc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50JywgWyduZ1Nhbml0aXplJywgJ2dldHRleHQnXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRyc1snbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnXTtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckYXR0cnMnLCAnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycywgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAgICogQHBhcmFtIHthbmd1bGFyLklTQ0VTZXJ2aWNlfSAkc2NlIEFuZ3VsYXIgc2NlIHNlcnZpY2UuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAgICogQHBhcmFtIHthbmd1bGFyLklDb21waWxlU2VydmljZX0gJGNvbXBpbGUgVGhlIGNvbXBpbGUgcHJvdmlkZXIuXG4gICAqIEBuZ2RvYyBjb250cm9sbGVyXG4gICAqIEBuZ25hbWUgbmdlb0Rpc3BsYXl3aW5kb3dDb21wb25lbnRDb250cm9sbGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgJHNjZSwgJHNjb3BlLCAkY29tcGlsZSkge1xuICAgIC8vID09PSBCaW5kaW5nIFByb3BlcnRpZXMgPT09XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmNsZWFyT25DbG9zZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuY29udGVudDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuY29udGVudFRlbXBsYXRlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9hbmd1bGFyLklTY29wZX1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRlbnRTY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0VsZW1lbnR8c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlc2t0b3A7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuaGVpZ2h0O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5vcGVuO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXNpemFibGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9zdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy51cmw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMud2lkdGg7XG5cbiAgICAvLyA9PT0gSW5qZWN0ZWQgUHJvcGVydGllcyA9PT1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnRfID0gJGVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU0NFU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NlXyA9ICRzY2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklDb21waWxlU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuY29tcGlsZV8gPSAkY29tcGlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgb24gaW5pdGlhbGl6YXRpb24gb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gICRvbkluaXQoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBiaW5kaW5nIHByb3BlcnRpZXNcbiAgICB0aGlzLmNsZWFyT25DbG9zZSA9IHRoaXMuY2xlYXJPbkNsb3NlICE9PSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQgfHwgbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IHRoaXMuY29udGVudFRlbXBsYXRlIHx8IG51bGw7XG4gICAgdGhpcy5jb250ZW50U2NvcGUgPSB0aGlzLmNvbnRlbnRTY29wZSB8fCBudWxsO1xuICAgIHRoaXMuZGVza3RvcCA9IHRoaXMuZGVza3RvcCAhPT0gZmFsc2U7XG4gICAgdGhpcy5kcmFnZ2FibGVDb250YWlubWVudCA9IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgfHwgJ2RvY3VtZW50JztcbiAgICB0aGlzLm9wZW4gPSB0aGlzLm9wZW4gPT09IHRydWU7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmhlaWdodCB8fCAnMjQwcHgnO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLndpZHRoIHx8ICcyNDBweCc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRhaW5pbmdFbGVtZW50ID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVDb250YWlubWVudCAhPT0gJ2RvY3VtZW50Jykge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gU3RyaW5nKHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluaW5nRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmluZ0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmluZ0VsZW1lbnQgPSB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50O1xuICAgIH1cbiAgICB0aGlzLmRyYWdnYWJsZSA9IHRoaXMuZHJhZ2dhYmxlICE9PSB1bmRlZmluZWQgPyB0aGlzLmRyYWdnYWJsZSA6IHRoaXMuZGVza3RvcDtcbiAgICB0aGlzLnJlc2l6YWJsZSA9IHRoaXMucmVzaXphYmxlICE9PSB1bmRlZmluZWQgPyB0aGlzLnJlc2l6YWJsZSA6IHRoaXMuZGVza3RvcDtcblxuICAgIC8vIERyYWdnYWJsZVxuICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXInKS5kcmFnZ2FibGUoe1xuICAgICAgICAnY29udGFpbm1lbnQnOiB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50LFxuICAgICAgICAnaGFuZGxlJzogJ2Rpdi5oZWFkZXInLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVzaXphYmxlXG4gICAgaWYgKHRoaXMucmVzaXphYmxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRfLmZpbmQoJy5uZ2VvLWRpc3BsYXl3aW5kb3cgLndpbmRvd2NvbnRhaW5lcicpLnJlc2l6YWJsZSh7XG4gICAgICAgICdtaW5IZWlnaHQnOiAyNDAsXG4gICAgICAgICdtaW5XaWR0aCc6IDI0MCxcbiAgICAgICAgcmVzaXplOiAoZXZlbnQsIHVpKSA9PiB7XG4gICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHt1aS5zaXplLmhlaWdodH1weGA7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IGAke3VpLnNpemUud2lkdGh9cHhgO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCk7XG4gICAgfVxuICAgIHRoaXMuc2NvcGVfLiR3YXRjaChcbiAgICAgICgpID0+IHRoaXMuY29udGVudFRlbXBsYXRlLFxuICAgICAgKCkgPT4gdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgQHByaXZhdGVcbiAgICovXG4gIHVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY29wZSA9IHRoaXMuY29udGVudFNjb3BlIHx8IHRoaXMuc2NvcGVfO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gdGhpcy5jb21waWxlXyh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkoc2NvcGUpO1xuICAgIGNvbnN0IGRpc3BsYXlXaW5kb3cgPSB0aGlzLmVsZW1lbnRfLmZpbmQoXG4gICAgICAnLm5nZW8tZGlzcGxheXdpbmRvdyAud2luZG93Y29udGFpbmVyIC5hbmltYXRpb24tY29udGFpbmVyIC5jb250ZW50LXRlbXBsYXRlLWNvbnRhaW5lcicsXG4gICAgKTtcbiAgICBkaXNwbGF5V2luZG93LmVtcHR5KCk7XG4gICAgZGlzcGxheVdpbmRvdy5hcHBlbmQoLyoqIEB0eXBlIHs/fSAqLyBjb21waWxlZCk7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNsZWFyT25DbG9zZSkge1xuICAgICAgdGhpcy5jbGVhcl8oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIHN0cmluZz59IENTUyBzdHlsZSB3aGVuIHVzaW5nIHdpZHRoL2hlaWdodFxuICAgKi9cbiAgZ2V0IHN0eWxlKCkge1xuICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmNvbnRhaW5pbmdFbGVtZW50LmNsaWVudFdpZHRoIC0gMjA7XG4gICAgdGhpcy5tYXhIZWlnaHQgPSB0aGlzLmNvbnRhaW5pbmdFbGVtZW50LmNsaWVudEhlaWdodCAtIDIwO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAnbWF4LXdpZHRoJzogdGhpcy5tYXhXaWR0aC50b1N0cmluZygpICsgJ3B4JyxcbiAgICAgICdtYXgtaGVpZ2h0JzogdGhpcy5tYXhIZWlnaHQudG9TdHJpbmcoKSArICdweCcsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gVHJ1c3RlZCB1cmwuXG4gICAqL1xuICBnZXQgdXJsVHJ1c3RlZCgpIHtcbiAgICBpZiAodGhpcy51cmwpIHtcbiAgICAgIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gdGhpcy5zY2VfLnRydXN0QXNSZXNvdXJjZVVybCh0aGlzLnVybCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGNsZWFyXygpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMudGl0bGUgPSBudWxsO1xuICAgIHRoaXMudXJsID0gbnVsbDtcbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NlJywgJyRzY29wZScsICckY29tcGlsZSddO1xuLyoqXG4gKiBUaGUgYG5nZW8tZGlzcGxheXdpbmRvd2AgY29tcG9uZW50IGlzIGFuIGFsdGVybmF0aXZlIHRvIHRoZSBgbmdlby5tZXNzYWdlLlBvcHVwYC5cbiAqIFdoYXQgdGhleSBoYXZlIGluIGNvbW1vbjpcbiAqXG4gKiAtIHN1cHBvcnQgdGl0bGVcbiAqIC0gc3VwcG9ydCB1cmwgdG8gYmUgc2hvd24gaW4gYW4gaWZyYW1lXG4gKiAtIHN1cHBvcnQgcGxhaW4gSFRNTCBjb250ZW50XG4gKiAtIHN1cHBvcnQgc2l6aW5nLCBpLmUuIGhlaWdodCBhbmQgd2lkdGguXG4gKiAtIHN1cHBvcnQgYmVpbmcgb3BlbmVkL2Nsb3NlZFxuICpcbiAqIFRoZSBkaWZmZXJlbmNlcyB3aXRoIHRoZSBgbmdlby5tZXNzYWdlLlBvcHVwYCBhcmU6XG4gKlxuICogLSBpdCBzdXBwb3J0cyBiZWluZyBkcmFnZ2VkXG4gKiAtIGl0IHN1cHBvcnRzIGJlaW5nIHJlc2l6ZWRcbiAqIC0gc3VwcG9ydCBhbmd1bGFyanMgdGVtcGxhdGUgY29udGVudFxuICpcbiAqIEV4YW1wbGU6XG4gKiAgICAgIDxuZ2VvLWRpc3BsYXl3aW5kb3dcbiAqICAgICAgICBjbGFzcz1cIndpbmRvdzFcIlxuICogICAgICAgIHVybD1cIjo6Y3RybC53aW5kb3cxQ29udGVudFwiXG4gKiAgICAgICAgZGVza3RvcD1cIjo6ZmFsc2VcIlxuICogICAgICAgIG9wZW49XCI6OnRydWVcIlxuICogICAgICAgIHRpdGxlPVwiJ1dpbmRvdyAxIC0gVGhlIHNpbXBsZXN0IHdpbmRvdyAoY2xvc2Uga2lsbHMgaXQpJ1wiPlxuICogICAgICA8L25nZW8tZGlzcGxheXdpbmRvdz5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gW25nZW9dLWRpc3BsYXl3aW5kb3ctY2xlYXItb24tY2xvc2UgV2hldGhlciB0byBjbGVhciB0aGUgY29udGVudCBvbiBjbG9zZSBvciBub3QuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBbbmdlb10tZGlzcGxheXdpbmRvdy1jb250ZW50IFRoZSBodG1sIGNvbnRlbnQuIElmIG5vdCBwcm92aWRlZCwgeW91IG11c3QgcHJvdmlkZVxuICogICAgIGFuIHVybC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWNvbnRlbnQtdGVtcGxhdGUgQW5ndWxhckpTIHRlbXBsYXRlLiBJdCBnZXRzIGNvbXBpbGVkIGR1cmluZ1xuICogICAgcnVudGltZSB3aXRoIHRoZSBzdXBwbGllZCBzY29wZSAobmdlby1kaXNwbGF5d2luZG93LWNvbnRlbnQtc2NvcGUpLlxuICogQGh0bWxBdHRyaWJ1dGUge2FuZ3VsYXIuSVNjb3BlfSBbbmdlb10tZGlzcGxheXdpbmRvdy1jb250ZW50LXNjb3BlIFNjb3BlIHVzZWQgZm9yXG4gKiAgICBuZ2VvLWRpc3BsYXl3aW5kb3ctY29udGVudC10ZW1wbGF0ZS5cbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBbbmdlb10tZGlzcGxheXdpbmRvdy1kZXNrdG9wIElmIHRydWUsIHRoZSB3aW5kb3cgaXMgZHJhZ2dhYmxlIGFuZCByZXNpemFibGUuIElmXG4gKiAgICAgbm90IHNldCwgeW91IG11c3Qgc2V0IG1hbnVhbGx5IGJvdGggcGFyYW1ldGVyLlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IFtuZ2VvXS1kaXNwbGF5d2luZG93LWRyYWdnYWJsZSBXaGV0aGVyIHRoZSB3aW5kb3cgaXMgZHJhZ2dhYmxlIG9yIG5vdC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWRyYWdnYWJsZS1jb250YWlubWVudCBUaGUgem9uZSAoQ1NTIHNlbGVjdG9yKSB3aGVyZSB0aGUgd2luZG93XG4gKiAgICAgaXMgYXV0aG9yaXplZCB0byBiZSBkcmFnZ2VkLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctaGVpZ2h0IFRoZSBkZWZhdWx0IGhlaWdodCBvZiB0aGUgd2luZG93LlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IFtuZ2VvXS1kaXNwbGF5d2luZG93LW9wZW4gV2hldGhlciB0aGUgd2luZG93IGlzIG9wZW4gb3Igbm90LlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctdGl0bGUgVGhlIGh0bWwgdGl0bGUgb2YgdGhlIHdpbmRvdy5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LXVybCBUaGUgVVJMIHRvIG9wZW4gaW4gYW4gaWZyYW1lLCBpbiB0aGUgd2luZG93LiBUaGUgY29udGVudFxuICogICAgIGF0dHJpYnV0ZSBtdXN0IG5vdCBiZSBwcm92aWRlZC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LXdpZHRoIFRoZSBkZWZhdWx0IHdpZHRoIG9mIHRoZSB3aW5kb3cuXG4gKiBAbmdkb2MgY29tcG9uZW50XG4gKiBAbmduYW1lIG5nZW9EaXNwbGF5d2luZG93XG4gKi9cbmNvbnN0IG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnY2xlYXJPbkNsb3NlJzogJzw/JyxcbiAgICAnY29udGVudCc6ICc9PycsXG4gICAgJ2NvbnRlbnRUZW1wbGF0ZSc6ICc9PycsXG4gICAgJ2NvbnRlbnRTY29wZSc6ICc8PycsXG4gICAgJ2Rlc2t0b3AnOiAnPD8nLFxuICAgICdkcmFnZ2FibGUnOiAnPD8nLFxuICAgICdkcmFnZ2FibGVDb250YWlubWVudCc6ICc8PycsXG4gICAgJ2hlaWdodCc6ICc9PycsXG4gICAgJ29wZW4nOiAnPT8nLFxuICAgICdyZXNpemFibGUnOiAnPD8nLFxuICAgICd0aXRsZSc6ICc9PycsXG4gICAgJ3VybCc6ICc9PycsXG4gICAgJ3dpZHRoJzogJz0/JyxcbiAgfSxcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgdGVtcGxhdGVVcmw6IG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb0Rpc3BsYXl3aW5kb3cnLCBuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsImNvbnN0IGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4pID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRkZWZlcnJlZC5wdXNoKFtjaHVua0lkcywgZm5dKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBbY2h1bmtJZHMsIGZuXSA9IGRlZmVycmVkW2ldO1xuXHRcdGxldCBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLk8uaihjaHVua0lkc1tqXSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0Y29uc3QgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbi8vIHNraXBwZWQgd2hlbiB0aGUgcHJvcGVydHkgaXMgbm9uLWNvbmZpZ3VyYWJsZSAocHJlLUVTMjAxNSBlbmdpbmVzKSxcbi8vIHdoZXJlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB3b3VsZCB0aHJvd1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kbiA9ICh4KSA9PiB7XG5cdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIik7XG5cdGlmICghZGVzY3JpcHRvciB8fCAoIWRlc2NyaXB0b3Iud3JpdGFibGUgJiYgZGVzY3JpcHRvci5jb25maWd1cmFibGUpKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoeCwgXCJuYW1lXCIsIHsgdmFsdWU6IFwiZGVmYXVsdFwiLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG5jb25zdCBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZGlzcGxheXdpbmRvd1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG5jb25zdCB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHRsZXQgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG5jb25zdCBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbmxldCBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==