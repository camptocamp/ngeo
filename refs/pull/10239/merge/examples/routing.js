/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/routing.js"
/*!*****************************!*\
  !*** ./examples/routing.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routing.scss */ "./examples/routing.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/module */ "./src/routing/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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

/**
 * This example shows the ngeo routing directive.
 */











/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_routing_module__WEBPACK_IMPORTED_MODULE_4__["default"].name]);

/**
 * The application's main directive.
 *
 * @class
 */
function MainController() {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_7__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_8__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_6__["default"]({
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9,
    }),
  });

  /**
   * @type {boolean}
   */
  this.routingPanelActive = true;
}
myModule.controller('MainController', MainController);
myModule.constant('ngeoRoutingOptions', {});
myModule.constant('ngeoNominatimUrl', 'https://nominatim.openstreetmap.org/');
myModule.constant('ngeoNominatimSearchDefaultParams', {});
(0,_options__WEBPACK_IMPORTED_MODULE_3__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/routing.scss"
/*!*******************************!*\
  !*** ./examples/routing.scss ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/routing/NominatimInputComponent.js"
/*!************************************************!*\
  !*** ./src/routing/NominatimInputComponent.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_search_searchDirective__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/search/searchDirective */ "./src/search/searchDirective.js");
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
/* harmony import */ var _nominatiminput_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nominatiminput.html */ "./src/routing/nominatiminput.html.js");
Controller.$inject = ['$element', '$scope', 'ngeoNominatimService'];
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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






/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoRoutingNominatimInputComponent', [
  ngeo_search_searchDirective__WEBPACK_IMPORTED_MODULE_1__["default"].name,
  ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_2__["default"].name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/routing/nominatiminput', _nominatiminput_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },
  ],
);
myModule.value(
  'ngeoRoutingNominatimInputComponentTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingNominatimInputComponentTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/nominatiminput';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingNominatimInputComponentTemplateUrl
 *    Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoRoutingNominatimInputComponentTemplateUrl.$inject = [
  '$attrs',
  'ngeoRoutingNominatimInputComponentTemplateUrl',
];
function ngeoRoutingNominatimInputComponentTemplateUrl(
  $attrs,
  ngeoRoutingNominatimInputComponentTemplateUrl,
) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}

/**
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $scope Scope.
 * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService service for
 *    Nominatim
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname NgeoNominatimInputController
 */
function Controller($element, $scope, ngeoNominatimService) {
  /**
   * @type {JQuery}
   */
  this.element_ = $element;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {import('ngeo/routing/NominatimService').NominatimService}
   */
  this.ngeoNominatimService = ngeoNominatimService;

  /**
   * @type {?function(Object): void}
   */
  this.onSelect = null;

  /**
   * @type {?string}
   */
  this.inputValue = null;

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ {};

  /**
   * @type {Twitter.Typeahead.Dataset<import('./NominatimService').NominatimSearchResult>[]}
   */
  this.datasets = [
    {
      name: 'nominatim',
      display: 'name',
      source: this.ngeoNominatimService.typeaheadSourceDebounced,
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<import('ngeo/routing/NominatimService').NominatimSearchResult>}
   */
  this.listeners = {
    select: this.select_.bind(this),
  };

  /**
   * @type {string}
   */
  this.placeholder = '';
}

/**
 * @param {JQuery.Event} event Event.
 * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} suggestion Suggestion.
 * @param {Twitter.Typeahead.Dataset<import('ngeo/routing/NominatimService').NominatimSearchResult>} dataset Dataset.
 * @hidden
 */
Controller.prototype.select_ = function (event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};

/**
 * Input form field which provides Nominatim typeahead lookup using
 * {@link import('ngeo/routing/NominatimService').default}.
 *
 * Example:
 *
 *     <ngeo-nominatim-input
 *         ngeo-nominatim-input-value="ctrl.label"
 *         ngeo-nominatim-input-placeholder="type to search"
 *         ngeo-nominatim-input-on-select="ctrl.onSelect">
 *
 * Is used in in the partial of {@link import('ngeo/routingFeatureComponent').default}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example to see it in action.
 *
 * @htmlAttribute {function(import('ngeo/routing/NominatimService').NominatimSearchResult)}
 *    ngeo-nominatim-input-on-select Event fired when user selects a new suggestion.
 * @htmlAttribute {string} ngeo-nominatim-input-value
 *  Value of input field, will be set to the label of the search result.
 * @htmlAttribute {string} ngeo-nominatim-input-placeholder
 *  Placeholder text, when field is empty.
 * @ngdoc directive
 * @ngname ngeoNominatimInput
 */
const routingNominatimInputComponent = {
  controller: Controller,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder',
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl,
};
myModule.component('ngeoNominatimInput', routingNominatimInputComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/routing/NominatimService.js"
/*!*****************************************!*\
  !*** ./src/routing/NominatimService.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NominatimService: () => (/* binding */ NominatimService),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
NominatimService.$inject = ['$http', 'ngeoDebounce', 'ngeoNominatimUrl', 'ngeoNominatimSearchDefaultParams'];
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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




/**
 * @typedef {Object} NominatimSearchResult
 * @property {string} name
 * @property {string} [label]
 * @property {string[]} coordinate
 */

/**
 * @typedef {Object} NominatimSearchResponseResult
 * @property {string} display_name
 * @property {string} lon
 * @property {string} lat
 */

/**
 * Service to provide access to Nominatim, which allows to search for
 * OSM data by name and address.
 *
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/misc/debounce').miscDebounce<function(string, function(NominatimSearchResult[]): void, (function(NominatimSearchResult[]): void)|undefined): void>}  ngeoDebounce
 *    ngeo Debounce service.
 * @param {string} ngeoNominatimUrl The nominatim URL.
 * @param {import('ngeo/options').ngeoNominatimSearchDefaultParams} ngeoNominatimSearchDefaultParams The search parameters
 * @class
 * @ngdoc service
 * @ngname ngeoNominatimService
 * @see https://wiki.openstreetmap.org/wiki/Nominatim
 * @hidden
 */
function NominatimService($http, ngeoDebounce, ngeoNominatimUrl, ngeoNominatimSearchDefaultParams) {
  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {import('ngeo/misc/debounce').miscDebounce<function(string, function(NominatimSearchResult[]): void, (function(NominatimSearchResult[]): void)|undefined): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * URL for Nominatim backend
   * Defaults openstreetmap instance.
   *
   * @type {string}
   */
  this.nominatimUrl_ = ngeoNominatimUrl;

  // the url is expected to end with a slash
  if (this.nominatimUrl_.substr(-1) !== '/') {
    this.nominatimUrl_ += '/';
  }

  /**
   * @type {import('ngeo/options').ngeoNominatimSearchDefaultParams}
   */
  this.searchDefaultParams_ = ngeoNominatimSearchDefaultParams;

  /**
   * Delay (in milliseconds) to avoid calling the API too often.
   * Only if there were no calls for that many milliseconds,
   * the last call will be executed.
   *
   * @type {number}
   */
  this.typeaheadDebounceDelay_ = 500;

  /**
   * @type {(query: string, syncResults: (result: NominatimSearchResult[]) => void, asyncResults: ((result: NominatimSearchResult[]) => void) | undefined) => void}
   */
  this.typeaheadSourceDebounced = this.ngeoDebounce_(
    this.typeaheadSource_.bind(this),
    this.typeaheadDebounceDelay_,
    true,
  );
}

/**
 * Search by name
 *
 * @param {string} query Search query
 * @param {?Object<string, string>} params Optional parameters
 * @returns {angular.IHttpPromise<NominatimSearchResponseResult[]>} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Search
 */
NominatimService.prototype.search = function (query, params) {
  let url = `${this.nominatimUrl_}search?q=${query}`;
  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);

  // require JSON response
  params.format = 'json';
  if (params) {
    url += '&';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};

/**
 * Reverse Geocoding
 *
 * @param {import('ol/coordinate').Coordinate} coordinate Search coordinate in LonLat projection
 * @param {(Object<string, string>|undefined)} params Optional parameters
 * @returns {angular.IHttpPromise<import('./NominatimService').NominatimSearchResponseResult>} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding
 */
NominatimService.prototype.reverse = function (coordinate, params) {
  let url = `${this.nominatimUrl_}reverse`;
  params = Object.assign({}, params);

  // coordinate
  params.lon = `${coordinate[0]}`;
  params.lat = `${coordinate[1]}`;

  // require JSON response
  params.format = 'json';
  if (params) {
    url += '?';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};

/**
 * @param {string} query Search query
 * @param {(result: NominatimSearchResult[]) => void} syncResults Callback for synchronous execution, unused
 * @param {(result: NominatimSearchResult[]) => void} [asyncResults] Callback for asynchronous execution
 */
NominatimService.prototype.typeaheadSource_ = function (query, syncResults, asyncResults) {
  /**
   * @param {angular.IHttpResponse<NominatimSearchResponseResult[]>} resp
   */
  const onSuccess_ = function (resp) {
    /**
     * Parses result response.
     *
     * @param {NominatimSearchResponseResult} result Result
     * @returns {NominatimSearchResult} Parsed result
     */
    const parse = function (result) {
      return {
        coordinate: [result.lon, result.lat],
        name: result.display_name,
      };
    };
    if (asyncResults) {
      asyncResults(resp.data.map(parse));
    } else {
      syncResults(resp.data.map(parse));
    }
  };

  /**
   * @param {angular.IHttpResponse<NominatimSearchResponseResult>} resp
   */
  const onError_ = function (resp) {
    if (asyncResults) {
      asyncResults([]);
    } else {
      syncResults([]);
    }
  };
  this.search(query, {}).then(onSuccess_, onError_);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoNominatimService', [ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.service('ngeoNominatimService', NominatimService);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/routing/RoutingComponent.js"
/*!*****************************************!*\
  !*** ./src/routing/RoutingComponent.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_RoutingService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/RoutingService */ "./src/routing/RoutingService.js");
/* harmony import */ var ngeo_routing_RoutingFeatureComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/routing/RoutingFeatureComponent */ "./src/routing/RoutingFeatureComponent.js");
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/GeoJSON */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var _routing_html__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./routing.html */ "./src/routing/routing.html.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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



















/**
 * @typedef {Object} RoutingVia
 * @property {olFeature<import('ol/geom/Geometry').default>} [feature]
 * @property {function(import('ngeo/routing/NominatimService').NominatimSearchResult): void} [onSelect]
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoRoutingComponent', [
  ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__["default"].name,
  ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  ngeo_routing_RoutingService__WEBPACK_IMPORTED_MODULE_4__["default"].name,
  ngeo_routing_RoutingFeatureComponent__WEBPACK_IMPORTED_MODULE_5__["default"].name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/routing/routing', _routing_html__WEBPACK_IMPORTED_MODULE_16__["default"]);
    },
  ],
);
myModule.value(
  'ngeoRoutingTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoRoutingTemplateUrl.$inject = ['$attrs', 'ngeoRoutingTemplateUrl'];
function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}

/**
 * The controller for the routing directive.
 *
 * @hidden
 */
class Controller {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {import('ngeo/routing/RoutingService').RoutingService} ngeoRoutingService service for OSRM
   *    routing.
   * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService service for
   *    Nominatim.
   * @param {angular.IQService} $q Angular q service
   * @param {import('ngeo/misc/debounce').miscDebounce<function(): void>} ngeoDebounce ngeo Debounce
   *    service.
   * @param {import('ngeo/options').ngeoRoutingOptions} ngeoRoutingOptions The options.
   */
  constructor($scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce, ngeoRoutingOptions) {
    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {import('ngeo/routing/RoutingService').RoutingService}
     * @private
     */
    this.ngeoRoutingService_ = ngeoRoutingService;

    /**
     * @type {import('ngeo/routing/NominatimService').NominatimService}
     * @private
     */
    this.ngeoNominatimService_ = ngeoNominatimService;

    /**
     * @type {import('ngeo/options').ngeoRoutingOptions}
     * @private
     */
    this.routingOptions_ = ngeoRoutingOptions;

    /**
     * Available routing profiles.
     * Example: [
     *            {
     *              label: 'Car', // used as label in the UI
     *              profile: 'routed-car' // used as part of the query
     *            }
     *          ]
     *
     * @type {import('ngeo/options').RoutingProfile[]}
     */
    this.routingProfiles = this.routingOptions_.profiles || [];

    /**
     * @type {?import('ngeo/options').RoutingProfile}
     */
    this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;
    $scope.$watch(() => this.selectedRoutingProfile, this.calculateRoute.bind(this));

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * @type {string}
     */
    this.errorMessage = '';

    /**
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     */
    this.startFeature_ = null;

    /**
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     */
    this.targetFeature_ = null;

    /**
     * @type {RoutingVia[]}
     */
    this.viaArray = [];

    /**
     * @type {Object<string, string>}
     */
    this.colors = {
      startFill: '#6BE62E',
      startStroke: '#4CB01E',
      destinationFill: '#FF3E13',
      destinationStroke: '#CD3412',
      viaFill: '#767676',
      viaStroke: '#000000',
      lineRGBA: 'rgba(16, 112, 29, 0.6)',
    };

    /**
     * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
     * @private
     */
    this.routeSource_ = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__["default"]({
      features: [],
    });

    /**
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.routeLayer_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__["default"]({
      className: 'canvas2d',
      source: this.routeSource_,
      style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_10__["default"]({
        fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
          color: this.colors.lineRGBA,
        }),
        stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_12__["default"]({
          color: this.colors.lineRGBA,
          width: 5,
        }),
      }),
    });

    /**
     * Distance of route in meters
     *
     * @type {number}
     */
    this.routeDistance = 0;

    /**
     * Duration of route in minutes.
     *
     * @type {?number}
     */
    this.routeDuration = null;

    /**
     * @type {RegExp}
     * @private
     */
    this.regexIsFormattedCoord = /\d+\.\d+\/\d+\.\d+/;

    /**
     * @type {?import('ol/interaction/Draw').default}
     * @private
     */
    this.draw_ = null;
    const debounceDelay = 200; // in milliseconds

    /**
     * Debounced because in some cases (reverse route) multiple changes are done
     * at once and spam this function.
     *
     * @type {function(): void}
     */
    this.handleChange = ngeoDebounce(this.calculateRoute.bind(this), debounceDelay, true);
  }

  /**
   * Init the controller
   */
  $onInit() {
    if (this.map) {
      this.map.addLayer(this.routeLayer_);
    }
  }

  /**
   * Clears start, end and vias. Removes features from map.
   */
  clearRoute() {
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.routeDistance = 0;
    this.routeDuration = null;
    this.routeSource_.clear();
    this.errorMessage = '';
  }

  /**
   * Converts feature point into LonLat coordinate.
   *
   * @param {olFeature<import('ol/geom/Geometry').default>} point Feature point to convert
   * @returns {?import('ol/coordinate').Coordinate} LonLat coordinate
   * @private
   */
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    if (!(geometry instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_7__["default"])) {
      throw new Error('Wrong time values type');
    }
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return (0,ol_proj__WEBPACK_IMPORTED_MODULE_13__.toLonLat)(coords, projection);
  }

  /**
   * Flip start and target and re-calculate route.
   */
  reverseRoute() {
    // swap start and target
    const tmpFeature = this.startFeature_;
    this.startFeature_ = this.targetFeature_;
    this.targetFeature_ = tmpFeature;

    // reverse vias
    this.viaArray = this.viaArray.reverse();

    // recalculation is done by the debounced handleChange
  }

  /**
   * @param {import('./RoutingService').Route} route Routes of OSRM response
   * @returns {olFeature<import('ol/geom/Geometry').default>[]} parsed route features
   * @private
   */
  parseRoute_(route) {
    if (!this.map) {
      return [];
    }
    /** @type {olFeature<import('ol/geom/Geometry').default>[]} */
    let parsedRoutes = [];
    const format = new ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_6__["default"]();
    const formatConfig = {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.getView().getProjection(),
    };
    // if there are useful "legs" data, parse this
    if (route.legs) {
      /** @type {olFeature<import('ol/geom/Geometry').default>[][]} */
      const parsedRoutes_ = route.legs.map((leg) =>
        leg.steps.map(
          (step) =>
            new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"]({
              geometry: format.readGeometry(step.geometry, formatConfig),
            }),
        ),
      );
      // flatten
      parsedRoutes = [].concat(...parsedRoutes_);
    } else if (route.geometry) {
      // otherwise parse (overview) geometry
      parsedRoutes.push(
        new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"]({
          geometry: format.readGeometry(route.geometry, formatConfig),
        }),
      );
    }
    return parsedRoutes;
  }

  /**
   */
  calculateRoute() {
    if (!this.startFeature_ || !this.targetFeature_) {
      return;
    }
    // remove rendered routes
    this.routeSource_.clear();
    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray
      .filter((via) => via.feature !== null)
      .map((via) => this.getLonLatFromPoint_(via.feature));
    const route = /** @type {number[][]} */ [coordFrom].concat(vias, [coordTo]);

    /**
     * @param {angular.IHttpResponse<import('./RoutingService').Routes>} resp
     * @returns {void}
     */
    const onSuccess_ = (resp) => {
      if (!this.map || !this.startFeature_ || !this.targetFeature_) {
        return;
      }
      const features = this.parseRoute_(resp.data.routes[0]);
      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }
      this.routeSource_.addFeatures(features);

      // recenter map on route
      this.map.getView().fit(this.routeSource_.getExtent());
      this.routeDistance = resp.data.routes[0].distance;
      this.routeDuration = resp.data.routes[0].duration;

      // get first and last coordinate of route
      const startRoute = /** @type {import('ol/geom/LineString').default} */ features[0]
        .getGeometry()
        .getCoordinateAt(0);
      const endRoute = /** @type {import('ol/geom/LineString').default} */ features[features.length - 1]
        .getGeometry()
        .getCoordinateAt(1);

      // build geometries to connect route to start and end point of query
      const startToRoute = [
        /** @type {import('ol/geom/Point').default} */ this.startFeature_.getGeometry().getCoordinates(),
        startRoute,
      ];
      const routeToEnd = [
        endRoute,
        /** @type {import('ol/geom/Point').default} */ this.targetFeature_.getGeometry().getCoordinates(),
      ];
      const routeConnections = [
        new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__["default"](startToRoute)),
        new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__["default"](routeToEnd)),
      ];

      // add them to the source
      this.routeSource_.addFeatures(routeConnections);
    };

    /**
     * @param {angular.IHttpResponse<import('./RoutingService').Route>} resp
     */
    const onError_ = (resp) => {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    };

    /** @type {Object<string, string|boolean>} */
    const options = {};
    options.steps = true;
    options.overview = false;
    options.geometries = 'geojson';

    /** @type {import('./RoutingService').Config} */
    const config = {};
    config.options = options;
    if (this.selectedRoutingProfile) {
      config.instance = this.selectedRoutingProfile.profile;
    }
    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_, onError_);
  }

  /**
   */
  addVia() {
    this.viaArray.push({});
  }

  /**
   * @param {number} index Array index.
   */
  deleteVia(index) {
    if (this.viaArray.length > index) {
      this.viaArray.splice(index, 1);
      this.calculateRoute();
    }
  }
}
Controller.$inject = [
  '$scope',
  'ngeoRoutingService',
  'ngeoNominatimService',
  '$q',
  'ngeoDebounce',
  'ngeoRoutingOptions',
];
myModule.component('ngeoRouting', {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingMap',
  },
  templateUrl: ngeoRoutingTemplateUrl,
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/routing/RoutingFeatureComponent.js"
/*!************************************************!*\
  !*** ./src/routing/RoutingFeatureComponent.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_NominatimInputComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimInputComponent */ "./src/routing/NominatimInputComponent.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Text */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_interaction_Modify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/interaction/Modify */ "./node_modules/ol/interaction/Modify.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var _routingfeature_html__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./routingfeature.html */ "./src/routing/routingfeature.html.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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


















/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoRoutingFeatureComponent', [
  ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_1__["default"].name,
  ngeo_routing_NominatimInputComponent__WEBPACK_IMPORTED_MODULE_2__["default"].name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/routing/routingfeature', _routingfeature_html__WEBPACK_IMPORTED_MODULE_15__["default"]);
    },
  ],
);
myModule.value(
  'ngeoRoutingFeatureTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingFeatureTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingFeatureTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoRoutingFeatureTemplateUrl.$inject = ['$attrs', 'ngeoRoutingFeatureTemplateUrl'];
function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.IQService} $q Angular q service
 * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService service for
 *    Nominatim
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname NgeoRoutingFeatureController
 */
class Controller {
  /**
   * @param {angular.IScope} $scope
   * @param {angular.ITimeoutService} $timeout
   * @param {angular.IQService} $q
   * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService
   */
  constructor($scope, $timeout, $q, ngeoNominatimService) {
    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {import('ngeo/routing/NominatimService').NominatimService}
     * @private
     */
    this.ngeoNominatimService_ = ngeoNominatimService;

    /**
     * @type {?import('ol/Map').default}
     * @private
     */
    this.map = null;

    /**
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     */
    this.feature = null;

    /**
     * @type {string}
     */
    this.featureLabel = '';

    /**
     * @type {string}
     */
    this.fillColor = '';

    /**
     * @type {string}
     */
    this.strokeColor = '';

    /**
     * @type {?function(olFeature<import('ol/geom/Geometry').default>): void}
     */
    this.onChange = null;

    /**
     * @type {import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.vectorFeatures_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_5__["default"]();

    /**
     * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
     * @private
     */
    this.vectorSource_ = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__["default"]({
      features: this.vectorFeatures_,
    });

    /**
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.vectorLayer_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__["default"]({
      className: 'canvas2d',
      source: this.vectorSource_,
      style: (feature, resolution) => {
        return [
          new ol_style_Style__WEBPACK_IMPORTED_MODULE_8__["default"]({
            text: new ol_style_Text__WEBPACK_IMPORTED_MODULE_9__["default"]({
              fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_10__["default"]({
                color: this.fillColor || '#000000',
              }),
              font: '900 24px "Font Awesome 6 Free"',
              stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_11__["default"]({
                width: 3,
                color: this.strokeColor || '#000000',
              }),
              offsetY: -15,
              text: '\uf041', // map-marker
            }),
          }),
        ];
      },
    });

    /**
     * Interaction for moving start and end.
     *
     * @type {import('ol/interaction/Modify').default}
     * @private
     */
    this.modifyFeature_ = new ol_interaction_Modify__WEBPACK_IMPORTED_MODULE_13__["default"]({
      features: this.vectorFeatures_,
    });

    /**
     * @type {?import('ol/interaction/Draw').default}
     * @private
     */
    this.draw_ = null;

    /**
     * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} selected Selected result.
     */
    this.onSelect = this.onSelect_.bind(this);

    /**
     * @type {string}
     */
    this.errorMessage = '';
  }
  $onInit() {
    if (!this.map) {
      return;
    }
    this.map.addLayer(this.vectorLayer_);

    // setup modify interaction
    this.modifyFeature_.setActive(true);
    this.map.addInteraction(this.modifyFeature_);
    this.modifyFeature_.on(
      /** @type {import('ol/Observable').EventTypes} */ 'modifyend',
      /** @type {function(?): ?} */
      /**
       * @param {import('ol/interaction/Modify').ModifyEvent} event
       */
      (event) => {
        const feature = event.features.getArray()[0];
        this.vectorSource_.clear();
        this.snapFeature_(/** @type {olFeature<import('ol/geom/Point').default>} */ feature);
      },
    );
    this.scope_.$watch(
      () => this.feature,
      (newVal, oldVal) => {
        if (newVal) {
          this.onFeatureChange_();
        }
        if (newVal === null) {
          this.vectorSource_.clear();
          this.featureLabel = '';
        }
      },
    );
  }

  /**
   * Cleanup, mostly relevant for vias.
   */
  $onDestroy() {
    if (!this.map) {
      return;
    }
    this.map.removeLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(false);
    this.map.removeInteraction(this.modifyFeature_);
  }

  /**
   */
  set() {
    if (!this.map) {
      return;
    }
    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }
    this.draw_ = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_14__["default"]({
      features: this.vectorFeatures_,
      type: 'Point',
    });
    this.draw_.on(/** @type {import('ol/Observable').EventTypes} */ 'drawstart', () => {
      if (this.feature) {
        this.vectorSource_.removeFeature(this.feature);
      }
    });
    this.draw_.on(
      /** @type {import('ol/Observable').EventTypes} */ 'drawend',
      /** @type {function(?): ?} */
      /**
       * @param {import('lib/ol.interaction.Draw').DrawEvent} event
       */
      (event) => {
        if (this.draw_ && this.map) {
          this.map.removeInteraction(this.draw_);
        }
        this.snapFeature_(/** @type {olFeature<import('ol/geom/Point').default>} */ event.feature);
        this.modifyFeature_.setActive(true);
      },
    );
    this.modifyFeature_.setActive(false);
    this.map.addInteraction(this.draw_);
  }

  /**
   * @param {import('ol/coordinate').Coordinate} coordinate LonLat coordinate.
   * @param {string} label Feature name/label.
   * @private
   */
  setFeature_(coordinate, label) {
    if (!this.map) {
      return;
    }
    const transformedCoordinate = ol_proj__WEBPACK_IMPORTED_MODULE_3__.fromLonLat(coordinate, this.map.getView().getProjection());
    if (label === '') {
      label = transformedCoordinate.join('/');
    }
    this.feature =
      /** @type {?olFeature<import('ol/geom/Geometry').default>} */
      new ol_Feature__WEBPACK_IMPORTED_MODULE_4__["default"]({
        geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__["default"](transformedCoordinate),
        name: label,
      });
  }
  onFeatureChange_() {
    if (!this.feature) {
      return;
    }
    // Update label
    this.featureLabel = /** @type {string} */ this.feature.get('name') || '';

    // Update vector source
    this.vectorSource_.clear();
    this.vectorSource_.addFeature(this.feature);

    // Notify others
    if (this.onChange) {
      this.timeout_(() => {
        if (this.feature && this.onChange) {
          this.onChange(this.feature);
        }
      });
    }
  }

  /**
   * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} selected Selected result.
   * @private
   */
  onSelect_(selected) {
    const coordinate = selected.coordinate.map(parseFloat);
    const label = selected.label;
    this.setFeature_(coordinate, label);
    const newCoordinates = /** @type {import('ol/geom/Point').default} */ this.feature
      .getGeometry()
      .getCoordinates();
    this.map.getView().setCenter(newCoordinates);
  }

  /**
   * Snaps a feature to the street network using the getNearest
   * function of the routing service. Replaces the feature.
   *
   * @param {olFeature<import('ol/geom/Point').default>} feature Feature to snap
   * @private
   */
  snapFeature_(feature) {
    const coord = this.getLonLatFromPoint_(feature);
    if (!coord) {
      return;
    }
    /** @type {Object<string, string>} */
    const config = {};

    /**
     * @param {angular.IHttpResponse<import('./NominatimService').NominatimSearchResponseResult>} resp
     */
    const onSuccess = (resp) => {
      const lon = parseFloat(resp.data.lon);
      const lat = parseFloat(resp.data.lat);
      const coordinate = [lon, lat];
      const label = resp.data.display_name;
      this.setFeature_(coordinate, label);
    };

    /**
     * @param {angular.IHttpResponse<import('./NominatimService').NominatimSearchResponseResult>} resp
     */
    const onError = (resp) => {
      this.errorMessage = 'Error: nominatim server not responding.';
      console.log(resp);
    };
    this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess, onError);
  }

  /**
   * Converts feature point into LonLat coordinate.
   *
   * @param {olFeature<import('ol/geom/Point').default>} point Feature point to convert
   * @returns {?import('ol/coordinate').Coordinate} LonLat coordinate
   * @private
   */
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return ol_proj__WEBPACK_IMPORTED_MODULE_3__.toLonLat(coords, projection);
  }
}
Controller.$inject = ['$scope', '$timeout', '$q', 'ngeoNominatimService'];
/**
 * Provides a text input and draw interaction to allow a user to create and modify a ol.Feature
 * (point geometry).
 *
 * The text input is provided by {@link import('ngeo/nominatimInputComponent').default} and includes
 * Nominatim search.
 *
 * Example:
 *
 *     <ngeo-routing-feature
 *         ngeo-routing-feature-map="ctrl.map"
 *         ngeo-routing-feature-feature="ctrl.feature"
 *         ngeo-routing-feature-fill-color="#6BE62E"
 *         ngeo-routing-feature-stroke-color="#4CB01E"
 *         ngeo-routing-feature-on-change="ctrl.handleChange">
 *
 * Is used in in the partial of {@link import('ngeo/routingComponent').default}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example for a usage sample.
 *
 * @htmlAttribute {import('ol/Map').default} ngeo-routing-feature-map The map.
 * @htmlAttribute {olFeature<import('ol/geom/Geometry').default>} ngeo-routing-feature-feature The feature.
 * @htmlAttribute {string} ngeo-routing-feature-fill-color The marker fill color.
 * @htmlAttribute {string} ngeo-routing-feature-stroke-color The marker stroke color.
 * @htmlAttribute {function(olFeature<import('ol/geom/Geometry').default>)} ngeo-routing-feature-on-change Event fired when
 *    feature changes.
 * @ngdoc directive
 * @ngname ngeoRoutingFeature
 */
const routingFeatureComponent = {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingFeatureMap',
    'feature': '=ngeoRoutingFeatureFeature',
    'fillColor': '<?ngeoRoutingFeatureFillColor',
    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',
    'onChange': '=?ngeoRoutingFeatureOnChange',
  },
  templateUrl: ngeoRoutingFeatureTemplateUrl,
};
myModule.component('ngeoRoutingFeature', routingFeatureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/routing/RoutingService.js"
/*!***************************************!*\
  !*** ./src/routing/RoutingService.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutingService: () => (/* binding */ RoutingService),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
RoutingService.$inject = ['$http', 'ngeoRoutingOptions'];
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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



/**
 * Service to provide access to a
 * [Open Source Routing Machine (OSRM) backend](https://github.com/Project-OSRM/osrm-backend)
 * of version 5.8 and higher and its features.
 *
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/options').ngeoRoutingOptions} ngeoRoutingOptions The options.
 * @class
 * @ngdoc service
 * @ngname ngeoRoutingService
 * @hidden
 */
function RoutingService($http, ngeoRoutingOptions) {
  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {import('ngeo/options').ngeoRoutingOptions}
   */
  this.routingOptions_ = ngeoRoutingOptions;

  /**
   * URL for OSRM backend API.
   * Defaults to demo backend.
   *
   * @type {string}
   */
  this.ngeoOsrmBackendUrl_ = this.routingOptions_.backendUrl || 'https://router.project-osrm.org/';

  // the url is expected to end with a slash
  if (this.ngeoOsrmBackendUrl_.substr(-1) !== '/') {
    this.ngeoOsrmBackendUrl_ += '/';
  }

  /**
   * Version of the protocol implemented by the service.
   * see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md
   *
   * @type {string}
   */
  this.protocolVersion_ = 'v1';
}

/**
 * @typedef {Object} Config
 * @property {string} [service]
 * @property {string} [profile]
 * @property {string} [instance]
 * @property {Object<string, string|boolean>} [options]
 */

/**
 * @typedef {Object} Routes
 * @property {Route[]} routes
 */

/**
 * @typedef {Object} Route
 * @property {Leg[]} [legs]
 * @property {string} [geometry]
 * @property {number} distance
 * @property {number} duration
 */

/**
 * @typedef {Object} Leg
 * @property {Step[]} steps
 */

/**
 * @typedef {Object} Step
 * @property {string} geometry
 */

/**
 * Route request
 *
 * @param {import('ol/coordinate').Coordinate[]} coordinates coordinates of the route (at least two!)
 * @param {?Config} config optional configuration
 * @returns {angular.IHttpPromise<Routes>} promise of the OSRM API request
 */
RoutingService.prototype.getRoute = function (coordinates, config) {
  config = config || {};

  // Service
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  if (!config.service) {
    config.service = 'route'; // default is route
  }

  // Mode of transportation,
  // can be: car, bike, foot
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#requests
  //
  // As of version 5.8.0, OSRM (server) does not support multiple profiles simultaneously.
  // This means the value actually does not matter.
  if (!config.profile) {
    config.profile = 'car'; // default is car
  }

  // build request URL
  let url = this.ngeoOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config.instance) {
    url += `${config.instance}/`;
  }
  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;

  // [ [a,b] , [c,d] ] -> 'a,b;c,d'
  const coordinateString = coordinates.map((c) => c.join(',')).join(';');
  url += coordinateString;

  // look for route service options
  // see: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#route-service
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};

/**
 * Snaps a coordinate to the street network and returns the nearest match
 *
 * @param {import('ol/coordinate').Coordinate} coordinate coordinate to query
 * @param {?Config} config optional configuration
 * @returns {angular.IHttpPromise<Object>} promise of the OSRM API request
 * @see https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md#nearest-service
 */
RoutingService.prototype.getNearest = function (coordinate, config) {
  config = config || {};

  // service is always nearest
  config.service = 'nearest';

  // Mode of transportation
  // If used in combination with a getRoute request, choose the same profile.
  if (!config.profile) {
    config.profile = 'car'; // default is car
  }

  // build request URL
  let url = this.ngeoOsrmBackendUrl_;

  // Common workaround to provide multiple profiles (since it is not supported yet)
  // Every profile runs on its own instance.
  if (config.instance) {
    url += `${config.instance}/`;
  }
  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;

  // [a,b] -> 'a,b'
  const coordinateString = coordinate.join(',');
  url += coordinateString;

  // look for nearest service options
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoRoutingService', []);
myModule.service('ngeoRoutingService', RoutingService);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/routing/module.js"
/*!*******************************!*\
  !*** ./src/routing/module.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_routing_RoutingComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/RoutingComponent */ "./src/routing/RoutingComponent.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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




/**
 * @type {angular.IModule}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoRoutingModule', [ngeo_routing_RoutingComponent__WEBPACK_IMPORTED_MODULE_1__["default"].name]));


/***/ },

/***/ "./src/routing/nominatiminput.html.js"
/*!********************************************!*\
  !*** ./src/routing/nominatiminput.html.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-nominatim-input">
  <input
    type="text"
    class="form-control"
    placeholder="{{$ctrl.placeholder}}"
    ng-model="$ctrl.inputValue"
    ngeo-search="$ctrl.options"
    ngeo-search-datasets="$ctrl.datasets"
    ngeo-search-listeners="$ctrl.listeners"
  />
</div>`);


/***/ },

/***/ "./src/routing/routing.html.js"
/*!*************************************!*\
  !*** ./src/routing/routing.html.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-routing">
  <div class="ngeo-routing-start form-group">
    <ngeo-routing-feature
      ngeo-routing-feature-map="$ctrl.map"
      ngeo-routing-feature-feature="$ctrl.startFeature_"
      ngeo-routing-feature-fill-color="$ctrl.colors.startFill"
      ngeo-routing-feature-stroke-color="$ctrl.colors.startStroke"
      ngeo-routing-feature-on-change="$ctrl.handleChange"
    >
    </ngeo-routing-feature>
  </div>

  <div class="ngeo-routing-vias form-group" ng-repeat="(index, via) in $ctrl.viaArray">
    <div class="form-inline">
      <div class="form-group">
        <ngeo-routing-feature
          ngeo-routing-feature-map="$ctrl.map"
          ngeo-routing-feature-feature="via.feature"
          ngeo-routing-feature-fill-color="$ctrl.colors.viaFill"
          ngeo-routing-feature-stroke-color="$ctrl.colors.viaStroke"
          ngeo-routing-feature-on-change="$ctrl.handleChange"
        >
        </ngeo-routing-feature>
      </div>
      <button type="button" class="btn prime delete-via" ng-click="$ctrl.deleteVia(index)">
        <span class="fa-solid fa-trash"></span>
      </button>
    </div>
  </div>

  <div class="ngeo-routing-destination form-group">
    <ngeo-routing-feature
      ngeo-routing-feature-map="$ctrl.map"
      ngeo-routing-feature-feature="$ctrl.targetFeature_"
      ngeo-routing-feature-fill-color="$ctrl.colors.destinationFill"
      ngeo-routing-feature-stroke-color="$ctrl.colors.destinationStroke"
      ngeo-routing-feature-on-change="$ctrl.handleChange"
    >
    </ngeo-routing-feature>
  </div>

  <div class="form-group fill">
    <button type="button" class="btn prime" ng-click="$ctrl.clearRoute()">
      <span class="fa-solid fa-trash"></span> <span translate>Clear</span>
    </button>
    <button type="button" class="btn prime" ng-click="$ctrl.reverseRoute()">
      <span class="fa-solid fa-arrow-right-arrow-left"></span> <span translate>Reverse</span>
    </button>
    <button type="button" class="btn prime" ng-click="$ctrl.addVia()">
      <span class="fa-solid fa-plus"></span> <span translate>Add via</span>
    </button>
  </div>

  <div class="clearfix"></div>

  <div ng-if="$ctrl.routingProfiles.length > 1">
    <div class="form-group">
      <label class="col-form-label col-md-4" translate>Profile</label>
      <div class="col-md-8">
        <select class="form-control" ng-model="$ctrl.selectedRoutingProfile">
          <option ng-repeat="profile in $ctrl.routingProfiles" ng-value="profile">{{profile.label}}</option>
        </select>
      </div>
    </div>
  </div>

  <div class="ngeo-routing-error form-group clearfix" ng-hide="$ctrl.errorMessage === ''">
    {{$ctrl.errorMessage}}
  </div>

  <div class="clearfix"></div>

  <div ng-hide="$ctrl.routeDuration === null && $ctrl.routeDistance <= 0">
    <div class="row">
      <div class="col-md-12">
        <strong translate>Route statistics</strong>
      </div>
    </div>
    <div class="row" ng-hide="$ctrl.routeDuration === null">
      <div class="col-md-4 text-right" translate>Duration</div>
      <div class="col-md-8">{{$ctrl.routeDuration | ngeoDuration}}</div>
    </div>

    <div class="row" ng-hide="$ctrl.routeDistance <= 0">
      <div class="col-md-4 text-right" translate>Distance</div>
      <div class="col-md-8">{{$ctrl.routeDistance | ngeoUnitPrefix:'m'}}</div>
    </div>
  </div>
</div>`);


/***/ },

/***/ "./src/routing/routingfeature.html.js"
/*!********************************************!*\
  !*** ./src/routing/routingfeature.html.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-routing-feature">
  <div class="input-group">
    <ngeo-nominatim-input
      ngeo-nominatim-input-value="$ctrl.featureLabel"
      ngeo-nominatim-input-placeholder="{{'Search...' | translate}}"
      ngeo-nominatim-input-on-select="$ctrl.onSelect"
    >
    </ngeo-nominatim-input>
    <div class="input-group-addon btn" ng-click="$ctrl.set()">
      <span class="fa-solid fa-location-pin"></span>
    </div>
  </div>
</div>`);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
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
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"routing": 0
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
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/routing.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcm91dGluZy5zY3NzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9Ob21pbmF0aW1JbnB1dENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvTm9taW5hdGltU2VydmljZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL25vbWluYXRpbWlucHV0Lmh0bWwuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL3JvdXRpbmcuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLyoqXG4gKiBUaGlzIGV4YW1wbGUgc2hvd3MgdGhlIG5nZW8gcm91dGluZyBkaXJlY3RpdmUuXG4gKi9cbmltcG9ydCAnLi9yb3V0aW5nLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvUm91dGluZ01vZHVsZSBmcm9tICduZ2VvL3JvdXRpbmcvbW9kdWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZSwgbmdlb1JvdXRpbmdNb2R1bGUubmFtZV0pO1xuXG4vKipcbiAqIFRoZSBhcHBsaWNhdGlvbidzIG1haW4gZGlyZWN0aXZlLlxuICpcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzkzMTAxMC4xNTM1OTg5NDQyLCA1OTYxNzA1Ljg0MjI5NzI1NF0sXG4gICAgICB6b29tOiA5LFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnJvdXRpbmdQYW5lbEFjdGl2ZSA9IHRydWU7XG59XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvUm91dGluZ09wdGlvbnMnLCB7fSk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb05vbWluYXRpbVVybCcsICdodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy8nKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcycsIHt9KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY29wZScsICduZ2VvTm9taW5hdGltU2VydmljZSddO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1NlYXJjaFNlYXJjaERpcmVjdGl2ZSBmcm9tICduZ2VvL3NlYXJjaC9zZWFyY2hEaXJlY3RpdmUnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZSBmcm9tICduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZSc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vbm9taW5hdGltaW5wdXQuaHRtbCc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudCcsIFtcbiAgbmdlb1NlYXJjaFNlYXJjaERpcmVjdGl2ZS5uYW1lLFxuICBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSxcbl0pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvbm9taW5hdGltaW5wdXQnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoXG4gICduZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICAgKi9cbiAgKCRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9ub21pbmF0aW1pbnB1dCc7XG4gIH0sXG4pO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFuZ3VsYXIuSUF0dHJpYnV0ZXMpOiBzdHJpbmd9IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybFxuICogICAgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwuJGluamVjdCA9IFtcbiAgJyRhdHRycycsXG4gICduZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwnLFxuXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybChcbiAgJGF0dHJzLFxuICBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwsXG4pIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFNjb3BlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX0gbmdlb05vbWluYXRpbVNlcnZpY2Ugc2VydmljZSBmb3JcbiAqICAgIE5vbWluYXRpbVxuICogQGNsYXNzXG4gKiBAaGlkZGVuXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBOZ2VvTm9taW5hdGltSW5wdXRDb250cm9sbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7SlF1ZXJ5fVxuICAgKi9cbiAgdGhpcy5lbGVtZW50XyA9ICRlbGVtZW50O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX1cbiAgICovXG4gIHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2UgPSBuZ2VvTm9taW5hdGltU2VydmljZTtcblxuICAvKipcbiAgICogQHR5cGUgez9mdW5jdGlvbihPYmplY3QpOiB2b2lkfVxuICAgKi9cbiAgdGhpcy5vblNlbGVjdCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5pbnB1dFZhbHVlID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge1R3aXR0ZXIuVHlwZWFoZWFkLk9wdGlvbnN9XG4gICAqL1xuICB0aGlzLm9wdGlvbnMgPSAvKiogQHR5cGUge1R3aXR0ZXIuVHlwZWFoZWFkLk9wdGlvbnN9ICovIHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7VHdpdHRlci5UeXBlYWhlYWQuRGF0YXNldDxpbXBvcnQoJy4vTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdD5bXX1cbiAgICovXG4gIHRoaXMuZGF0YXNldHMgPSBbXG4gICAge1xuICAgICAgbmFtZTogJ25vbWluYXRpbScsXG4gICAgICBkaXNwbGF5OiAnbmFtZScsXG4gICAgICBzb3VyY2U6IHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2UudHlwZWFoZWFkU291cmNlRGVib3VuY2VkLFxuICAgIH0sXG4gIF07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vc2VhcmNoL3NlYXJjaERpcmVjdGl2ZScpLlNlYXJjaERpcmVjdGl2ZUxpc3RlbmVyczxpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0Pn1cbiAgICovXG4gIHRoaXMubGlzdGVuZXJzID0ge1xuICAgIHNlbGVjdDogdGhpcy5zZWxlY3RfLmJpbmQodGhpcyksXG4gIH07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLnBsYWNlaG9sZGVyID0gJyc7XG59XG5cbi8qKlxuICogQHBhcmFtIHtKUXVlcnkuRXZlbnR9IGV2ZW50IEV2ZW50LlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0fSBzdWdnZXN0aW9uIFN1Z2dlc3Rpb24uXG4gKiBAcGFyYW0ge1R3aXR0ZXIuVHlwZWFoZWFkLkRhdGFzZXQ8aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdD59IGRhdGFzZXQgRGF0YXNldC5cbiAqIEBoaWRkZW5cbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0XyA9IGZ1bmN0aW9uIChldmVudCwgc3VnZ2VzdGlvbiwgZGF0YXNldCkge1xuICBpZiAodGhpcy5vblNlbGVjdCkge1xuICAgIHRoaXMub25TZWxlY3Qoc3VnZ2VzdGlvbik7XG4gIH1cbn07XG5cbi8qKlxuICogSW5wdXQgZm9ybSBmaWVsZCB3aGljaCBwcm92aWRlcyBOb21pbmF0aW0gdHlwZWFoZWFkIGxvb2t1cCB1c2luZ1xuICoge0BsaW5rIGltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5kZWZhdWx0fS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICA8bmdlby1ub21pbmF0aW0taW5wdXRcbiAqICAgICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtdmFsdWU9XCJjdHJsLmxhYmVsXCJcbiAqICAgICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtcGxhY2Vob2xkZXI9XCJ0eXBlIHRvIHNlYXJjaFwiXG4gKiAgICAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LW9uLXNlbGVjdD1cImN0cmwub25TZWxlY3RcIj5cbiAqXG4gKiBJcyB1c2VkIGluIGluIHRoZSBwYXJ0aWFsIG9mIHtAbGluayBpbXBvcnQoJ25nZW8vcm91dGluZ0ZlYXR1cmVDb21wb25lbnQnKS5kZWZhdWx0fS5cbiAqXG4gKiBTZWUgdGhlIFsuLi9leGFtcGxlcy9yb3V0aW5nLmh0bWxdKC4uL2V4YW1wbGVzL3JvdXRpbmcuaHRtbCkgZXhhbXBsZSB0byBzZWUgaXQgaW4gYWN0aW9uLlxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtmdW5jdGlvbihpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0KX1cbiAqICAgIG5nZW8tbm9taW5hdGltLWlucHV0LW9uLXNlbGVjdCBFdmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIG5ldyBzdWdnZXN0aW9uLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gbmdlby1ub21pbmF0aW0taW5wdXQtdmFsdWVcbiAqICBWYWx1ZSBvZiBpbnB1dCBmaWVsZCwgd2lsbCBiZSBzZXQgdG8gdGhlIGxhYmVsIG9mIHRoZSBzZWFyY2ggcmVzdWx0LlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gbmdlby1ub21pbmF0aW0taW5wdXQtcGxhY2Vob2xkZXJcbiAqICBQbGFjZWhvbGRlciB0ZXh0LCB3aGVuIGZpZWxkIGlzIGVtcHR5LlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5nbmFtZSBuZ2VvTm9taW5hdGltSW5wdXRcbiAqL1xuY29uc3Qgcm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdvblNlbGVjdCc6ICc9P25nZW9Ob21pbmF0aW1JbnB1dE9uU2VsZWN0JyxcbiAgICAnaW5wdXRWYWx1ZSc6ICc9P25nZW9Ob21pbmF0aW1JbnB1dFZhbHVlJyxcbiAgICAncGxhY2Vob2xkZXInOiAnQD9uZ2VvTm9taW5hdGltSW5wdXRQbGFjZWhvbGRlcicsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvTm9taW5hdGltSW5wdXQnLCByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJOb21pbmF0aW1TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJ25nZW9EZWJvdW5jZScsICduZ2VvTm9taW5hdGltVXJsJywgJ25nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm9taW5hdGltU2VhcmNoUmVzdWx0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtsYWJlbF1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvb3JkaW5hdGVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGlzcGxheV9uYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbG9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGF0XG4gKi9cblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHByb3ZpZGUgYWNjZXNzIHRvIE5vbWluYXRpbSwgd2hpY2ggYWxsb3dzIHRvIHNlYXJjaCBmb3JcbiAqIE9TTSBkYXRhIGJ5IG5hbWUgYW5kIGFkZHJlc3MuXG4gKlxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwU2VydmljZX0gJGh0dHAgQW5ndWxhciBodHRwIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9taXNjL2RlYm91bmNlJykubWlzY0RlYm91bmNlPGZ1bmN0aW9uKHN0cmluZywgZnVuY3Rpb24oTm9taW5hdGltU2VhcmNoUmVzdWx0W10pOiB2b2lkLCAoZnVuY3Rpb24oTm9taW5hdGltU2VhcmNoUmVzdWx0W10pOiB2b2lkKXx1bmRlZmluZWQpOiB2b2lkPn0gIG5nZW9EZWJvdW5jZVxuICogICAgbmdlbyBEZWJvdW5jZSBzZXJ2aWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IG5nZW9Ob21pbmF0aW1VcmwgVGhlIG5vbWluYXRpbSBVUkwuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXN9IG5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zIFRoZSBzZWFyY2ggcGFyYW1ldGVyc1xuICogQGNsYXNzXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5nbmFtZSBuZ2VvTm9taW5hdGltU2VydmljZVxuICogQHNlZSBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9Ob21pbmF0aW1cbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE5vbWluYXRpbVNlcnZpY2UoJGh0dHAsIG5nZW9EZWJvdW5jZSwgbmdlb05vbWluYXRpbVVybCwgbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklIdHRwU2VydmljZX1cbiAgICovXG4gIHRoaXMuJGh0dHBfID0gJGh0dHA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihzdHJpbmcsIGZ1bmN0aW9uKE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKTogdm9pZCwgKGZ1bmN0aW9uKE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKTogdm9pZCl8dW5kZWZpbmVkKTogdm9pZD59XG4gICAqL1xuICB0aGlzLm5nZW9EZWJvdW5jZV8gPSBuZ2VvRGVib3VuY2U7XG5cbiAgLyoqXG4gICAqIFVSTCBmb3IgTm9taW5hdGltIGJhY2tlbmRcbiAgICogRGVmYXVsdHMgb3BlbnN0cmVldG1hcCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMubm9taW5hdGltVXJsXyA9IG5nZW9Ob21pbmF0aW1Vcmw7XG5cbiAgLy8gdGhlIHVybCBpcyBleHBlY3RlZCB0byBlbmQgd2l0aCBhIHNsYXNoXG4gIGlmICh0aGlzLm5vbWluYXRpbVVybF8uc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdGhpcy5ub21pbmF0aW1VcmxfICs9ICcvJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtc31cbiAgICovXG4gIHRoaXMuc2VhcmNoRGVmYXVsdFBhcmFtc18gPSBuZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcztcblxuICAvKipcbiAgICogRGVsYXkgKGluIG1pbGxpc2Vjb25kcykgdG8gYXZvaWQgY2FsbGluZyB0aGUgQVBJIHRvbyBvZnRlbi5cbiAgICogT25seSBpZiB0aGVyZSB3ZXJlIG5vIGNhbGxzIGZvciB0aGF0IG1hbnkgbWlsbGlzZWNvbmRzLFxuICAgKiB0aGUgbGFzdCBjYWxsIHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLnR5cGVhaGVhZERlYm91bmNlRGVsYXlfID0gNTAwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7KHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzOiAoKHJlc3VsdDogTm9taW5hdGltU2VhcmNoUmVzdWx0W10pID0+IHZvaWQpIHwgdW5kZWZpbmVkKSA9PiB2b2lkfVxuICAgKi9cbiAgdGhpcy50eXBlYWhlYWRTb3VyY2VEZWJvdW5jZWQgPSB0aGlzLm5nZW9EZWJvdW5jZV8oXG4gICAgdGhpcy50eXBlYWhlYWRTb3VyY2VfLmJpbmQodGhpcyksXG4gICAgdGhpcy50eXBlYWhlYWREZWJvdW5jZURlbGF5XyxcbiAgICB0cnVlLFxuICApO1xufVxuXG4vKipcbiAqIFNlYXJjaCBieSBuYW1lXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFNlYXJjaCBxdWVyeVxuICogQHBhcmFtIHs/T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gcGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHthbmd1bGFyLklIdHRwUHJvbWlzZTxOb21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdFtdPn0gcHJvbWlzZSBvZiB0aGUgTm9taW5hdGltIEFQSSByZXF1ZXN0XG4gKiBAc2VlIGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL05vbWluYXRpbSNTZWFyY2hcbiAqL1xuTm9taW5hdGltU2VydmljZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbXMpIHtcbiAgbGV0IHVybCA9IGAke3RoaXMubm9taW5hdGltVXJsX31zZWFyY2g/cT0ke3F1ZXJ5fWA7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZWFyY2hEZWZhdWx0UGFyYW1zXywgcGFyYW1zKTtcblxuICAvLyByZXF1aXJlIEpTT04gcmVzcG9uc2VcbiAgcGFyYW1zLmZvcm1hdCA9ICdqc29uJztcbiAgaWYgKHBhcmFtcykge1xuICAgIHVybCArPSAnJic7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb259PSR7cGFyYW1zW29wdGlvbl19YCk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuXG4vKipcbiAqIFJldmVyc2UgR2VvY29kaW5nXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBjb29yZGluYXRlIFNlYXJjaCBjb29yZGluYXRlIGluIExvbkxhdCBwcm9qZWN0aW9uXG4gKiBAcGFyYW0geyhPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fHVuZGVmaW5lZCl9IHBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JSHR0cFByb21pc2U8aW1wb3J0KCcuL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdD59IHByb21pc2Ugb2YgdGhlIE5vbWluYXRpbSBBUEkgcmVxdWVzdFxuICogQHNlZSBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9Ob21pbmF0aW0jUmV2ZXJzZV9HZW9jb2RpbmdcbiAqL1xuTm9taW5hdGltU2VydmljZS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlLCBwYXJhbXMpIHtcbiAgbGV0IHVybCA9IGAke3RoaXMubm9taW5hdGltVXJsX31yZXZlcnNlYDtcbiAgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKTtcblxuICAvLyBjb29yZGluYXRlXG4gIHBhcmFtcy5sb24gPSBgJHtjb29yZGluYXRlWzBdfWA7XG4gIHBhcmFtcy5sYXQgPSBgJHtjb29yZGluYXRlWzFdfWA7XG5cbiAgLy8gcmVxdWlyZSBKU09OIHJlc3BvbnNlXG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gJz8nO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke3BhcmFtc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgU2VhcmNoIHF1ZXJ5XG4gKiBAcGFyYW0geyhyZXN1bHQ6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB2b2lkfSBzeW5jUmVzdWx0cyBDYWxsYmFjayBmb3Igc3luY2hyb25vdXMgZXhlY3V0aW9uLCB1bnVzZWRcbiAqIEBwYXJhbSB7KHJlc3VsdDogTm9taW5hdGltU2VhcmNoUmVzdWx0W10pID0+IHZvaWR9IFthc3luY1Jlc3VsdHNdIENhbGxiYWNrIGZvciBhc3luY2hyb25vdXMgZXhlY3V0aW9uXG4gKi9cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnR5cGVhaGVhZFNvdXJjZV8gPSBmdW5jdGlvbiAocXVlcnksIHN5bmNSZXN1bHRzLCBhc3luY1Jlc3VsdHMpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPE5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0W10+fSByZXNwXG4gICAqL1xuICBjb25zdCBvblN1Y2Nlc3NfID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAvKipcbiAgICAgKiBQYXJzZXMgcmVzdWx0IHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdH0gcmVzdWx0IFJlc3VsdFxuICAgICAqIEByZXR1cm5zIHtOb21pbmF0aW1TZWFyY2hSZXN1bHR9IFBhcnNlZCByZXN1bHRcbiAgICAgKi9cbiAgICBjb25zdCBwYXJzZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvb3JkaW5hdGU6IFtyZXN1bHQubG9uLCByZXN1bHQubGF0XSxcbiAgICAgICAgbmFtZTogcmVzdWx0LmRpc3BsYXlfbmFtZSxcbiAgICAgIH07XG4gICAgfTtcbiAgICBpZiAoYXN5bmNSZXN1bHRzKSB7XG4gICAgICBhc3luY1Jlc3VsdHMocmVzcC5kYXRhLm1hcChwYXJzZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jUmVzdWx0cyhyZXNwLmRhdGEubWFwKHBhcnNlKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxOb21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdD59IHJlc3BcbiAgICovXG4gIGNvbnN0IG9uRXJyb3JfID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBpZiAoYXN5bmNSZXN1bHRzKSB7XG4gICAgICBhc3luY1Jlc3VsdHMoW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jUmVzdWx0cyhbXSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNlYXJjaChxdWVyeSwge30pLnRoZW4ob25TdWNjZXNzXywgb25FcnJvcl8pO1xufTtcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvTm9taW5hdGltU2VydmljZScsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJywgTm9taW5hdGltU2VydmljZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZSBmcm9tICduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nU2VydmljZSBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ1NlcnZpY2UnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ0ZlYXR1cmVDb21wb25lbnQgZnJvbSAnbmdlby9yb3V0aW5nL1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50JztcbmltcG9ydCBvbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlJztcbmltcG9ydCB7dG9Mb25MYXR9IGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vcm91dGluZy5odG1sJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSb3V0aW5nVmlhXG4gKiBAcHJvcGVydHkge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gW2ZlYXR1cmVdXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKGltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHQpOiB2b2lkfSBbb25TZWxlY3RdXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ0NvbXBvbmVudCcsIFtcbiAgbmdlb01pc2NEZWJvdW5jZS5uYW1lLFxuICBuZ2VvTWlzY0ZpbHRlcnMubmFtZSxcbiAgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWUsXG4gIG5nZW9Sb3V0aW5nUm91dGluZ1NlcnZpY2UubmFtZSxcbiAgbmdlb1JvdXRpbmdSb3V0aW5nRmVhdHVyZUNvbXBvbmVudC5uYW1lLFxuXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vcm91dGluZy9yb3V0aW5nJywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gICAqL1xuICAoJGF0dHJzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdUZW1wbGF0ZVVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9yb3V0aW5nJztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCBUZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbm5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwuJGluamVjdCA9IFsnJGF0dHJzJywgJ25nZW9Sb3V0aW5nVGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogVGhlIGNvbnRyb2xsZXIgZm9yIHRoZSByb3V0aW5nIGRpcmVjdGl2ZS5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Sb3V0aW5nU2VydmljZScpLlJvdXRpbmdTZXJ2aWNlfSBuZ2VvUm91dGluZ1NlcnZpY2Ugc2VydmljZSBmb3IgT1NSTVxuICAgKiAgICByb3V0aW5nLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfSBuZ2VvTm9taW5hdGltU2VydmljZSBzZXJ2aWNlIGZvclxuICAgKiAgICBOb21pbmF0aW0uXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JUVNlcnZpY2V9ICRxIEFuZ3VsYXIgcSBzZXJ2aWNlXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZGVib3VuY2UnKS5taXNjRGVib3VuY2U8ZnVuY3Rpb24oKTogdm9pZD59IG5nZW9EZWJvdW5jZSBuZ2VvIERlYm91bmNlXG4gICAqICAgIHNlcnZpY2UuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvUm91dGluZ09wdGlvbnN9IG5nZW9Sb3V0aW5nT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgbmdlb1JvdXRpbmdTZXJ2aWNlLCBuZ2VvTm9taW5hdGltU2VydmljZSwgJHEsIG5nZW9EZWJvdW5jZSwgbmdlb1JvdXRpbmdPcHRpb25zKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnbmdlby9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlJykuUm91dGluZ1NlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm5nZW9Sb3V0aW5nU2VydmljZV8gPSBuZ2VvUm91dGluZ1NlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXyA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb1JvdXRpbmdPcHRpb25zfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yb3V0aW5nT3B0aW9uc18gPSBuZ2VvUm91dGluZ09wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBBdmFpbGFibGUgcm91dGluZyBwcm9maWxlcy5cbiAgICAgKiBFeGFtcGxlOiBbXG4gICAgICogICAgICAgICAgICB7XG4gICAgICogICAgICAgICAgICAgIGxhYmVsOiAnQ2FyJywgLy8gdXNlZCBhcyBsYWJlbCBpbiB0aGUgVUlcbiAgICAgKiAgICAgICAgICAgICAgcHJvZmlsZTogJ3JvdXRlZC1jYXInIC8vIHVzZWQgYXMgcGFydCBvZiB0aGUgcXVlcnlcbiAgICAgKiAgICAgICAgICAgIH1cbiAgICAgKiAgICAgICAgICBdXG4gICAgICpcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5Sb3V0aW5nUHJvZmlsZVtdfVxuICAgICAqL1xuICAgIHRoaXMucm91dGluZ1Byb2ZpbGVzID0gdGhpcy5yb3V0aW5nT3B0aW9uc18ucHJvZmlsZXMgfHwgW107XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9vcHRpb25zJykuUm91dGluZ1Byb2ZpbGV9XG4gICAgICovXG4gICAgdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlID0gdGhpcy5yb3V0aW5nUHJvZmlsZXMubGVuZ3RoID4gMCA/IHRoaXMucm91dGluZ1Byb2ZpbGVzWzBdIDogbnVsbDtcbiAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZSwgdGhpcy5jYWxjdWxhdGVSb3V0ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklRU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuJHFfID0gJHE7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICAgKi9cbiAgICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICovXG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Um91dGluZ1ZpYVtdfVxuICAgICAqL1xuICAgIHRoaXMudmlhQXJyYXkgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JzID0ge1xuICAgICAgc3RhcnRGaWxsOiAnIzZCRTYyRScsXG4gICAgICBzdGFydFN0cm9rZTogJyM0Q0IwMUUnLFxuICAgICAgZGVzdGluYXRpb25GaWxsOiAnI0ZGM0UxMycsXG4gICAgICBkZXN0aW5hdGlvblN0cm9rZTogJyNDRDM0MTInLFxuICAgICAgdmlhRmlsbDogJyM3Njc2NzYnLFxuICAgICAgdmlhU3Ryb2tlOiAnIzAwMDAwMCcsXG4gICAgICBsaW5lUkdCQTogJ3JnYmEoMTYsIDExMiwgMjksIDAuNiknLFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucm91dGVTb3VyY2VfID0gbmV3IG9sU291cmNlVmVjdG9yKHtcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJvdXRlTGF5ZXJfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgY2xhc3NOYW1lOiAnY2FudmFzMmQnLFxuICAgICAgc291cmNlOiB0aGlzLnJvdXRlU291cmNlXyxcbiAgICAgIHN0eWxlOiBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgICAgZmlsbDogbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMubGluZVJHQkEsXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMubGluZVJHQkEsXG4gICAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEaXN0YW5jZSBvZiByb3V0ZSBpbiBtZXRlcnNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yb3V0ZURpc3RhbmNlID0gMDtcblxuICAgIC8qKlxuICAgICAqIER1cmF0aW9uIG9mIHJvdXRlIGluIG1pbnV0ZXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJvdXRlRHVyYXRpb24gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucmVnZXhJc0Zvcm1hdHRlZENvb3JkID0gL1xcZCtcXC5cXGQrXFwvXFxkK1xcLlxcZCsvO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9pbXBvcnQoJ29sL2ludGVyYWN0aW9uL0RyYXcnKS5kZWZhdWx0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kcmF3XyA9IG51bGw7XG4gICAgY29uc3QgZGVib3VuY2VEZWxheSA9IDIwMDsgLy8gaW4gbWlsbGlzZWNvbmRzXG5cbiAgICAvKipcbiAgICAgKiBEZWJvdW5jZWQgYmVjYXVzZSBpbiBzb21lIGNhc2VzIChyZXZlcnNlIHJvdXRlKSBtdWx0aXBsZSBjaGFuZ2VzIGFyZSBkb25lXG4gICAgICogYXQgb25jZSBhbmQgc3BhbSB0aGlzIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKCk6IHZvaWR9XG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSBuZ2VvRGVib3VuY2UodGhpcy5jYWxjdWxhdGVSb3V0ZS5iaW5kKHRoaXMpLCBkZWJvdW5jZURlbGF5LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBjb250cm9sbGVyXG4gICAqL1xuICAkb25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5yb3V0ZUxheWVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBzdGFydCwgZW5kIGFuZCB2aWFzLiBSZW1vdmVzIGZlYXR1cmVzIGZyb20gbWFwLlxuICAgKi9cbiAgY2xlYXJSb3V0ZSgpIHtcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudmlhQXJyYXkgPSBbXTtcbiAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGZlYXR1cmUgcG9pbnQgaW50byBMb25MYXQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59IHBvaW50IEZlYXR1cmUgcG9pbnQgdG8gY29udmVydFxuICAgKiBAcmV0dXJucyB7P2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IExvbkxhdCBjb29yZGluYXRlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRMb25MYXRGcm9tUG9pbnRfKHBvaW50KSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGdlb21ldHJ5ID0gcG9pbnQuZ2V0R2VvbWV0cnkoKTtcbiAgICBpZiAoIShnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyB0aW1lIHZhbHVlcyB0eXBlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvb3JkcyA9IGdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgcmV0dXJuIHRvTG9uTGF0KGNvb3JkcywgcHJvamVjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogRmxpcCBzdGFydCBhbmQgdGFyZ2V0IGFuZCByZS1jYWxjdWxhdGUgcm91dGUuXG4gICAqL1xuICByZXZlcnNlUm91dGUoKSB7XG4gICAgLy8gc3dhcCBzdGFydCBhbmQgdGFyZ2V0XG4gICAgY29uc3QgdG1wRmVhdHVyZSA9IHRoaXMuc3RhcnRGZWF0dXJlXztcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSB0aGlzLnRhcmdldEZlYXR1cmVfO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSB0bXBGZWF0dXJlO1xuXG4gICAgLy8gcmV2ZXJzZSB2aWFzXG4gICAgdGhpcy52aWFBcnJheSA9IHRoaXMudmlhQXJyYXkucmV2ZXJzZSgpO1xuXG4gICAgLy8gcmVjYWxjdWxhdGlvbiBpcyBkb25lIGJ5IHRoZSBkZWJvdW5jZWQgaGFuZGxlQ2hhbmdlXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJy4vUm91dGluZ1NlcnZpY2UnKS5Sb3V0ZX0gcm91dGUgUm91dGVzIG9mIE9TUk0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSBwYXJzZWQgcm91dGUgZmVhdHVyZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHBhcnNlUm91dGVfKHJvdXRlKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKiogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqL1xuICAgIGxldCBwYXJzZWRSb3V0ZXMgPSBbXTtcbiAgICBjb25zdCBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XG4gICAgY29uc3QgZm9ybWF0Q29uZmlnID0ge1xuICAgICAgZGF0YVByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCksXG4gICAgfTtcbiAgICAvLyBpZiB0aGVyZSBhcmUgdXNlZnVsIFwibGVnc1wiIGRhdGEsIHBhcnNlIHRoaXNcbiAgICBpZiAocm91dGUubGVncykge1xuICAgICAgLyoqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXVtdfSAqL1xuICAgICAgY29uc3QgcGFyc2VkUm91dGVzXyA9IHJvdXRlLmxlZ3MubWFwKChsZWcpID0+XG4gICAgICAgIGxlZy5zdGVwcy5tYXAoXG4gICAgICAgICAgKHN0ZXApID0+XG4gICAgICAgICAgICBuZXcgb2xGZWF0dXJlKHtcbiAgICAgICAgICAgICAgZ2VvbWV0cnk6IGZvcm1hdC5yZWFkR2VvbWV0cnkoc3RlcC5nZW9tZXRyeSwgZm9ybWF0Q29uZmlnKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICAgIC8vIGZsYXR0ZW5cbiAgICAgIHBhcnNlZFJvdXRlcyA9IFtdLmNvbmNhdCguLi5wYXJzZWRSb3V0ZXNfKTtcbiAgICB9IGVsc2UgaWYgKHJvdXRlLmdlb21ldHJ5KSB7XG4gICAgICAvLyBvdGhlcndpc2UgcGFyc2UgKG92ZXJ2aWV3KSBnZW9tZXRyeVxuICAgICAgcGFyc2VkUm91dGVzLnB1c2goXG4gICAgICAgIG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICAgIGdlb21ldHJ5OiBmb3JtYXQucmVhZEdlb21ldHJ5KHJvdXRlLmdlb21ldHJ5LCBmb3JtYXRDb25maWcpLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWRSb3V0ZXM7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGNhbGN1bGF0ZVJvdXRlKCkge1xuICAgIGlmICghdGhpcy5zdGFydEZlYXR1cmVfIHx8ICF0aGlzLnRhcmdldEZlYXR1cmVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW5kZXJlZCByb3V0ZXNcbiAgICB0aGlzLnJvdXRlU291cmNlXy5jbGVhcigpO1xuICAgIGNvbnN0IGNvb3JkRnJvbSA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh0aGlzLnN0YXJ0RmVhdHVyZV8pO1xuICAgIGNvbnN0IGNvb3JkVG8gPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8odGhpcy50YXJnZXRGZWF0dXJlXyk7XG4gICAgY29uc3QgdmlhcyA9IHRoaXMudmlhQXJyYXlcbiAgICAgIC5maWx0ZXIoKHZpYSkgPT4gdmlhLmZlYXR1cmUgIT09IG51bGwpXG4gICAgICAubWFwKCh2aWEpID0+IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh2aWEuZmVhdHVyZSkpO1xuICAgIGNvbnN0IHJvdXRlID0gLyoqIEB0eXBlIHtudW1iZXJbXVtdfSAqLyBbY29vcmRGcm9tXS5jb25jYXQodmlhcywgW2Nvb3JkVG9dKTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnLi9Sb3V0aW5nU2VydmljZScpLlJvdXRlcz59IHJlc3BcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBjb25zdCBvblN1Y2Nlc3NfID0gKHJlc3ApID0+IHtcbiAgICAgIGlmICghdGhpcy5tYXAgfHwgIXRoaXMuc3RhcnRGZWF0dXJlXyB8fCAhdGhpcy50YXJnZXRGZWF0dXJlXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMucGFyc2VSb3V0ZV8ocmVzcC5kYXRhLnJvdXRlc1swXSk7XG4gICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdObyByb3V0ZSBvciBub3Qgc3VwcG9ydGVkIGZvcm1hdC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5yb3V0ZVNvdXJjZV8uYWRkRmVhdHVyZXMoZmVhdHVyZXMpO1xuXG4gICAgICAvLyByZWNlbnRlciBtYXAgb24gcm91dGVcbiAgICAgIHRoaXMubWFwLmdldFZpZXcoKS5maXQodGhpcy5yb3V0ZVNvdXJjZV8uZ2V0RXh0ZW50KCkpO1xuICAgICAgdGhpcy5yb3V0ZURpc3RhbmNlID0gcmVzcC5kYXRhLnJvdXRlc1swXS5kaXN0YW5jZTtcbiAgICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IHJlc3AuZGF0YS5yb3V0ZXNbMF0uZHVyYXRpb247XG5cbiAgICAgIC8vIGdldCBmaXJzdCBhbmQgbGFzdCBjb29yZGluYXRlIG9mIHJvdXRlXG4gICAgICBjb25zdCBzdGFydFJvdXRlID0gLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2dlb20vTGluZVN0cmluZycpLmRlZmF1bHR9ICovIGZlYXR1cmVzWzBdXG4gICAgICAgIC5nZXRHZW9tZXRyeSgpXG4gICAgICAgIC5nZXRDb29yZGluYXRlQXQoMCk7XG4gICAgICBjb25zdCBlbmRSb3V0ZSA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9nZW9tL0xpbmVTdHJpbmcnKS5kZWZhdWx0fSAqLyBmZWF0dXJlc1tmZWF0dXJlcy5sZW5ndGggLSAxXVxuICAgICAgICAuZ2V0R2VvbWV0cnkoKVxuICAgICAgICAuZ2V0Q29vcmRpbmF0ZUF0KDEpO1xuXG4gICAgICAvLyBidWlsZCBnZW9tZXRyaWVzIHRvIGNvbm5lY3Qgcm91dGUgdG8gc3RhcnQgYW5kIGVuZCBwb2ludCBvZiBxdWVyeVxuICAgICAgY29uc3Qgc3RhcnRUb1JvdXRlID0gW1xuICAgICAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHR9ICovIHRoaXMuc3RhcnRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCksXG4gICAgICAgIHN0YXJ0Um91dGUsXG4gICAgICBdO1xuICAgICAgY29uc3Qgcm91dGVUb0VuZCA9IFtcbiAgICAgICAgZW5kUm91dGUsXG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdH0gKi8gdGhpcy50YXJnZXRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCksXG4gICAgICBdO1xuICAgICAgY29uc3Qgcm91dGVDb25uZWN0aW9ucyA9IFtcbiAgICAgICAgbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhzdGFydFRvUm91dGUpKSxcbiAgICAgICAgbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhyb3V0ZVRvRW5kKSksXG4gICAgICBdO1xuXG4gICAgICAvLyBhZGQgdGhlbSB0byB0aGUgc291cmNlXG4gICAgICB0aGlzLnJvdXRlU291cmNlXy5hZGRGZWF0dXJlcyhyb3V0ZUNvbm5lY3Rpb25zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCcuL1JvdXRpbmdTZXJ2aWNlJykuUm91dGU+fSByZXNwXG4gICAgICovXG4gICAgY29uc3Qgb25FcnJvcl8gPSAocmVzcCkgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnRXJyb3I6IHJvdXRpbmcgc2VydmVyIG5vdCByZXNwb25kaW5nLic7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICB9O1xuXG4gICAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmd8Ym9vbGVhbj59ICovXG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMuc3RlcHMgPSB0cnVlO1xuICAgIG9wdGlvbnMub3ZlcnZpZXcgPSBmYWxzZTtcbiAgICBvcHRpb25zLmdlb21ldHJpZXMgPSAnZ2VvanNvbic7XG5cbiAgICAvKiogQHR5cGUge2ltcG9ydCgnLi9Sb3V0aW5nU2VydmljZScpLkNvbmZpZ30gKi9cbiAgICBjb25zdCBjb25maWcgPSB7fTtcbiAgICBjb25maWcub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZSkge1xuICAgICAgY29uZmlnLmluc3RhbmNlID0gdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlLnByb2ZpbGU7XG4gICAgfVxuICAgIHRoaXMuJHFfLndoZW4odGhpcy5uZ2VvUm91dGluZ1NlcnZpY2VfLmdldFJvdXRlKHJvdXRlLCBjb25maWcpKS50aGVuKG9uU3VjY2Vzc18sIG9uRXJyb3JfKTtcbiAgfVxuXG4gIC8qKlxuICAgKi9cbiAgYWRkVmlhKCkge1xuICAgIHRoaXMudmlhQXJyYXkucHVzaCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEFycmF5IGluZGV4LlxuICAgKi9cbiAgZGVsZXRlVmlhKGluZGV4KSB7XG4gICAgaWYgKHRoaXMudmlhQXJyYXkubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHRoaXMudmlhQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUm91dGUoKTtcbiAgICB9XG4gIH1cbn1cbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcbiAgJyRzY29wZScsXG4gICduZ2VvUm91dGluZ1NlcnZpY2UnLFxuICAnbmdlb05vbWluYXRpbVNlcnZpY2UnLFxuICAnJHEnLFxuICAnbmdlb0RlYm91bmNlJyxcbiAgJ25nZW9Sb3V0aW5nT3B0aW9ucycsXG5dO1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvUm91dGluZycsIHtcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvUm91dGluZ01hcCcsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsLFxufSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZSBmcm9tICduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvTm9taW5hdGltSW5wdXRDb21wb25lbnQnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbic7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZSc7XG5pbXBvcnQgb2xTdHlsZVRleHQgZnJvbSAnb2wvc3R5bGUvVGV4dCc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbCc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25Nb2RpZnkgZnJvbSAnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JztcbmltcG9ydCBvbEludGVyYWN0aW9uRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9yb3V0aW5nZmVhdHVyZS5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQnLCBbXG4gIG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZS5uYW1lLFxuICBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50Lm5hbWUsXG5dKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICAgKi9cbiAgKCRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckYXR0cnMnLCAnbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKCRhdHRycywgbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfSAkdGltZW91dCBBbmd1bGFyIHRpbWVvdXQgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JUVNlcnZpY2V9ICRxIEFuZ3VsYXIgcSBzZXJ2aWNlXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfSBuZ2VvTm9taW5hdGltU2VydmljZSBzZXJ2aWNlIGZvclxuICogICAgTm9taW5hdGltXG4gKiBAY2xhc3NcbiAqIEBoaWRkZW5cbiAqIEBuZ2RvYyBjb250cm9sbGVyXG4gKiBAbmduYW1lIE5nZW9Sb3V0aW5nRmVhdHVyZUNvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9ICR0aW1lb3V0XG4gICAqIEBwYXJhbSB7YW5ndWxhci5JUVNlcnZpY2V9ICRxXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICR0aW1lb3V0LCAkcSwgbmdlb05vbWluYXRpbVNlcnZpY2UpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklUaW1lb3V0U2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudGltZW91dF8gPSAkdGltZW91dDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklRU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuJHFfID0gJHE7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXyA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKi9cbiAgICB0aGlzLmZlYXR1cmUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmZlYXR1cmVMYWJlbCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmZpbGxDb2xvciA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnN0cm9rZUNvbG9yID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2Z1bmN0aW9uKG9sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pik6IHZvaWR9XG4gICAgICovXG4gICAgdGhpcy5vbkNoYW5nZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9Db2xsZWN0aW9uJykuZGVmYXVsdDxvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy52ZWN0b3JGZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudmVjdG9yU291cmNlXyA9IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc18sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9sYXllci9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy52ZWN0b3JMYXllcl8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBjbGFzc05hbWU6ICdjYW52YXMyZCcsXG4gICAgICBzb3VyY2U6IHRoaXMudmVjdG9yU291cmNlXyxcbiAgICAgIHN0eWxlOiAoZmVhdHVyZSwgcmVzb2x1dGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICAgICAgdGV4dDogbmV3IG9sU3R5bGVUZXh0KHtcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5maWxsQ29sb3IgfHwgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZm9udDogJzkwMCAyNHB4IFwiRm9udCBBd2Vzb21lIDYgRnJlZVwiJyxcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuc3Ryb2tlQ29sb3IgfHwgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgb2Zmc2V0WTogLTE1LFxuICAgICAgICAgICAgICB0ZXh0OiAnXFx1ZjA0MScsIC8vIG1hcC1tYXJrZXJcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEludGVyYWN0aW9uIGZvciBtb3Zpbmcgc3RhcnQgYW5kIGVuZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL2ludGVyYWN0aW9uL01vZGlmeScpLmRlZmF1bHR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfID0gbmV3IG9sSW50ZXJhY3Rpb25Nb2RpZnkoe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfLFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9pbXBvcnQoJ29sL2ludGVyYWN0aW9uL0RyYXcnKS5kZWZhdWx0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kcmF3XyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHR9IHNlbGVjdGVkIFNlbGVjdGVkIHJlc3VsdC5cbiAgICAgKi9cbiAgICB0aGlzLm9uU2VsZWN0ID0gdGhpcy5vblNlbGVjdF8uYmluZCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgfVxuICAkb25Jbml0KCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy52ZWN0b3JMYXllcl8pO1xuXG4gICAgLy8gc2V0dXAgbW9kaWZ5IGludGVyYWN0aW9uXG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tb2RpZnlGZWF0dXJlXyk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5vbihcbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9PYnNlcnZhYmxlJykuRXZlbnRUeXBlc30gKi8gJ21vZGlmeWVuZCcsXG4gICAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JykuTW9kaWZ5RXZlbnR9IGV2ZW50XG4gICAgICAgKi9cbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBmZWF0dXJlID0gZXZlbnQuZmVhdHVyZXMuZ2V0QXJyYXkoKVswXTtcbiAgICAgICAgdGhpcy52ZWN0b3JTb3VyY2VfLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc25hcEZlYXR1cmVfKC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHQ+fSAqLyBmZWF0dXJlKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLnNjb3BlXy4kd2F0Y2goXG4gICAgICAoKSA9PiB0aGlzLmZlYXR1cmUsXG4gICAgICAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICAgICAgaWYgKG5ld1ZhbCkge1xuICAgICAgICAgIHRoaXMub25GZWF0dXJlQ2hhbmdlXygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdWYWwgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICAgICAgICB0aGlzLmZlYXR1cmVMYWJlbCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW51cCwgbW9zdGx5IHJlbGV2YW50IGZvciB2aWFzLlxuICAgKi9cbiAgJG9uRGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMudmVjdG9yTGF5ZXJfKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5tb2RpZnlGZWF0dXJlXyk7XG4gIH1cblxuICAvKipcbiAgICovXG4gIHNldCgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYXdfKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3XyA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc18sXG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgIH0pO1xuICAgIHRoaXMuZHJhd18ub24oLyoqIEB0eXBlIHtpbXBvcnQoJ29sL09ic2VydmFibGUnKS5FdmVudFR5cGVzfSAqLyAnZHJhd3N0YXJ0JywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZmVhdHVyZSkge1xuICAgICAgICB0aGlzLnZlY3RvclNvdXJjZV8ucmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZHJhd18ub24oXG4gICAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdkcmF3ZW5kJyxcbiAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW1wb3J0KCdsaWIvb2wuaW50ZXJhY3Rpb24uRHJhdycpLkRyYXdFdmVudH0gZXZlbnRcbiAgICAgICAqL1xuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdfICYmIHRoaXMubWFwKSB7XG4gICAgICAgICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbmFwRmVhdHVyZV8oLyoqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdD59ICovIGV2ZW50LmZlYXR1cmUpO1xuICAgICAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBjb29yZGluYXRlIExvbkxhdCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgRmVhdHVyZSBuYW1lL2xhYmVsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0RmVhdHVyZV8oY29vcmRpbmF0ZSwgbGFiZWwpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRyYW5zZm9ybWVkQ29vcmRpbmF0ZSA9IG9sUHJvai5mcm9tTG9uTGF0KGNvb3JkaW5hdGUsIHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCkpO1xuICAgIGlmIChsYWJlbCA9PT0gJycpIHtcbiAgICAgIGxhYmVsID0gdHJhbnNmb3JtZWRDb29yZGluYXRlLmpvaW4oJy8nKTtcbiAgICB9XG4gICAgdGhpcy5mZWF0dXJlID1cbiAgICAgIC8qKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gKi9cbiAgICAgIG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICBnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KHRyYW5zZm9ybWVkQ29vcmRpbmF0ZSksXG4gICAgICAgIG5hbWU6IGxhYmVsLFxuICAgICAgfSk7XG4gIH1cbiAgb25GZWF0dXJlQ2hhbmdlXygpIHtcbiAgICBpZiAoIXRoaXMuZmVhdHVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgbGFiZWxcbiAgICB0aGlzLmZlYXR1cmVMYWJlbCA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyB0aGlzLmZlYXR1cmUuZ2V0KCduYW1lJykgfHwgJyc7XG5cbiAgICAvLyBVcGRhdGUgdmVjdG9yIHNvdXJjZVxuICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgIHRoaXMudmVjdG9yU291cmNlXy5hZGRGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG5cbiAgICAvLyBOb3RpZnkgb3RoZXJzXG4gICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMudGltZW91dF8oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHR9IHNlbGVjdGVkIFNlbGVjdGVkIHJlc3VsdC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uU2VsZWN0XyhzZWxlY3RlZCkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBzZWxlY3RlZC5jb29yZGluYXRlLm1hcChwYXJzZUZsb2F0KTtcbiAgICBjb25zdCBsYWJlbCA9IHNlbGVjdGVkLmxhYmVsO1xuICAgIHRoaXMuc2V0RmVhdHVyZV8oY29vcmRpbmF0ZSwgbGFiZWwpO1xuICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0fSAqLyB0aGlzLmZlYXR1cmVcbiAgICAgIC5nZXRHZW9tZXRyeSgpXG4gICAgICAuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLm1hcC5nZXRWaWV3KCkuc2V0Q2VudGVyKG5ld0Nvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbmFwcyBhIGZlYXR1cmUgdG8gdGhlIHN0cmVldCBuZXR3b3JrIHVzaW5nIHRoZSBnZXROZWFyZXN0XG4gICAqIGZ1bmN0aW9uIG9mIHRoZSByb3V0aW5nIHNlcnZpY2UuIFJlcGxhY2VzIHRoZSBmZWF0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0Pn0gZmVhdHVyZSBGZWF0dXJlIHRvIHNuYXBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNuYXBGZWF0dXJlXyhmZWF0dXJlKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8oZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59ICovXG4gICAgY29uc3QgY29uZmlnID0ge307XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxpbXBvcnQoJy4vTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0Pn0gcmVzcFxuICAgICAqL1xuICAgIGNvbnN0IG9uU3VjY2VzcyA9IChyZXNwKSA9PiB7XG4gICAgICBjb25zdCBsb24gPSBwYXJzZUZsb2F0KHJlc3AuZGF0YS5sb24pO1xuICAgICAgY29uc3QgbGF0ID0gcGFyc2VGbG9hdChyZXNwLmRhdGEubGF0KTtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbbG9uLCBsYXRdO1xuICAgICAgY29uc3QgbGFiZWwgPSByZXNwLmRhdGEuZGlzcGxheV9uYW1lO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlXyhjb29yZGluYXRlLCBsYWJlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnLi9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHQ+fSByZXNwXG4gICAgICovXG4gICAgY29uc3Qgb25FcnJvciA9IChyZXNwKSA9PiB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdFcnJvcjogbm9taW5hdGltIHNlcnZlciBub3QgcmVzcG9uZGluZy4nO1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgfTtcbiAgICB0aGlzLiRxXy53aGVuKHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfLnJldmVyc2UoY29vcmQsIGNvbmZpZykpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBmZWF0dXJlIHBvaW50IGludG8gTG9uTGF0IGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHQ+fSBwb2ludCBGZWF0dXJlIHBvaW50IHRvIGNvbnZlcnRcbiAgICogQHJldHVybnMgez9pbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBMb25MYXQgY29vcmRpbmF0ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TG9uTGF0RnJvbVBvaW50Xyhwb2ludCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBnZW9tZXRyeSA9IHBvaW50LmdldEdlb21ldHJ5KCk7XG4gICAgY29uc3QgY29vcmRzID0gZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICByZXR1cm4gb2xQcm9qLnRvTG9uTGF0KGNvb3JkcywgcHJvamVjdGlvbik7XG4gIH1cbn1cbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRxJywgJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJ107XG4vKipcbiAqIFByb3ZpZGVzIGEgdGV4dCBpbnB1dCBhbmQgZHJhdyBpbnRlcmFjdGlvbiB0byBhbGxvdyBhIHVzZXIgdG8gY3JlYXRlIGFuZCBtb2RpZnkgYSBvbC5GZWF0dXJlXG4gKiAocG9pbnQgZ2VvbWV0cnkpLlxuICpcbiAqIFRoZSB0ZXh0IGlucHV0IGlzIHByb3ZpZGVkIGJ5IHtAbGluayBpbXBvcnQoJ25nZW8vbm9taW5hdGltSW5wdXRDb21wb25lbnQnKS5kZWZhdWx0fSBhbmQgaW5jbHVkZXNcbiAqIE5vbWluYXRpbSBzZWFyY2guXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgPG5nZW8tcm91dGluZy1mZWF0dXJlXG4gKiAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cImN0cmwubWFwXCJcbiAqICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cImN0cmwuZmVhdHVyZVwiXG4gKiAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZpbGwtY29sb3I9XCIjNkJFNjJFXCJcbiAqICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yPVwiIzRDQjAxRVwiXG4gKiAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cImN0cmwuaGFuZGxlQ2hhbmdlXCI+XG4gKlxuICogSXMgdXNlZCBpbiBpbiB0aGUgcGFydGlhbCBvZiB7QGxpbmsgaW1wb3J0KCduZ2VvL3JvdXRpbmdDb21wb25lbnQnKS5kZWZhdWx0fS5cbiAqXG4gKiBTZWUgdGhlIFsuLi9leGFtcGxlcy9yb3V0aW5nLmh0bWxdKC4uL2V4YW1wbGVzL3JvdXRpbmcuaHRtbCkgZXhhbXBsZSBmb3IgYSB1c2FnZSBzYW1wbGUuXG4gKlxuICogQGh0bWxBdHRyaWJ1dGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH0gbmdlby1yb3V0aW5nLWZlYXR1cmUtbWFwIFRoZSBtYXAuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlIFRoZSBmZWF0dXJlLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvciBUaGUgbWFya2VyIGZpbGwgY29sb3IuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3IgVGhlIG1hcmtlciBzdHJva2UgY29sb3IuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7ZnVuY3Rpb24ob2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+KX0gbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlIEV2ZW50IGZpcmVkIHdoZW5cbiAqICAgIGZlYXR1cmUgY2hhbmdlcy5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgbmdlb1JvdXRpbmdGZWF0dXJlXG4gKi9cbmNvbnN0IHJvdXRpbmdGZWF0dXJlQ29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9Sb3V0aW5nRmVhdHVyZU1hcCcsXG4gICAgJ2ZlYXR1cmUnOiAnPW5nZW9Sb3V0aW5nRmVhdHVyZUZlYXR1cmUnLFxuICAgICdmaWxsQ29sb3InOiAnPD9uZ2VvUm91dGluZ0ZlYXR1cmVGaWxsQ29sb3InLFxuICAgICdzdHJva2VDb2xvcic6ICc8P25nZW9Sb3V0aW5nRmVhdHVyZVN0cm9rZUNvbG9yJyxcbiAgICAnb25DaGFuZ2UnOiAnPT9uZ2VvUm91dGluZ0ZlYXR1cmVPbkNoYW5nZScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Sb3V0aW5nRmVhdHVyZScsIHJvdXRpbmdGZWF0dXJlQ29tcG9uZW50KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiUm91dGluZ1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnbmdlb1JvdXRpbmdPcHRpb25zJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHByb3ZpZGUgYWNjZXNzIHRvIGFcbiAqIFtPcGVuIFNvdXJjZSBSb3V0aW5nIE1hY2hpbmUgKE9TUk0pIGJhY2tlbmRdKGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kKVxuICogb2YgdmVyc2lvbiA1LjggYW5kIGhpZ2hlciBhbmQgaXRzIGZlYXR1cmVzLlxuICpcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIEFuZ3VsYXIgaHR0cCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Sb3V0aW5nT3B0aW9uc30gbmdlb1JvdXRpbmdPcHRpb25zIFRoZSBvcHRpb25zLlxuICogQGNsYXNzXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5nbmFtZSBuZ2VvUm91dGluZ1NlcnZpY2VcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJvdXRpbmdTZXJ2aWNlKCRodHRwLCBuZ2VvUm91dGluZ09wdGlvbnMpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklIdHRwU2VydmljZX1cbiAgICovXG4gIHRoaXMuJGh0dHBfID0gJGh0dHA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Sb3V0aW5nT3B0aW9uc31cbiAgICovXG4gIHRoaXMucm91dGluZ09wdGlvbnNfID0gbmdlb1JvdXRpbmdPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBVUkwgZm9yIE9TUk0gYmFja2VuZCBBUEkuXG4gICAqIERlZmF1bHRzIHRvIGRlbW8gYmFja2VuZC5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXyA9IHRoaXMucm91dGluZ09wdGlvbnNfLmJhY2tlbmRVcmwgfHwgJ2h0dHBzOi8vcm91dGVyLnByb2plY3Qtb3NybS5vcmcvJztcblxuICAvLyB0aGUgdXJsIGlzIGV4cGVjdGVkIHRvIGVuZCB3aXRoIGEgc2xhc2hcbiAgaWYgKHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXy5zdWJzdHIoLTEpICE9PSAnLycpIHtcbiAgICB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF8gKz0gJy8nO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcnNpb24gb2YgdGhlIHByb3RvY29sIGltcGxlbWVudGVkIGJ5IHRoZSBzZXJ2aWNlLlxuICAgKiBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kL2Jsb2IvbWFzdGVyL2RvY3MvaHR0cC5tZFxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5wcm90b2NvbFZlcnNpb25fID0gJ3YxJztcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc2VydmljZV1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJvZmlsZV1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbaW5zdGFuY2VdXG4gKiBAcHJvcGVydHkge09iamVjdDxzdHJpbmcsIHN0cmluZ3xib29sZWFuPn0gW29wdGlvbnNdXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSb3V0ZXNcbiAqIEBwcm9wZXJ0eSB7Um91dGVbXX0gcm91dGVzXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSb3V0ZVxuICogQHByb3BlcnR5IHtMZWdbXX0gW2xlZ3NdXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2dlb21ldHJ5XVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3RhbmNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gZHVyYXRpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExlZ1xuICogQHByb3BlcnR5IHtTdGVwW119IHN0ZXBzXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGVwXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZ2VvbWV0cnlcbiAqL1xuXG4vKipcbiAqIFJvdXRlIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGVbXX0gY29vcmRpbmF0ZXMgY29vcmRpbmF0ZXMgb2YgdGhlIHJvdXRlIChhdCBsZWFzdCB0d28hKVxuICogQHBhcmFtIHs/Q29uZmlnfSBjb25maWcgb3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHJldHVybnMge2FuZ3VsYXIuSUh0dHBQcm9taXNlPFJvdXRlcz59IHByb21pc2Ugb2YgdGhlIE9TUk0gQVBJIHJlcXVlc3RcbiAqL1xuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldFJvdXRlID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzLCBjb25maWcpIHtcbiAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG4gIC8vIFNlcnZpY2VcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZC9ibG9iL21hc3Rlci9kb2NzL2h0dHAubWQjcmVxdWVzdHNcbiAgaWYgKCFjb25maWcuc2VydmljZSkge1xuICAgIGNvbmZpZy5zZXJ2aWNlID0gJ3JvdXRlJzsgLy8gZGVmYXVsdCBpcyByb3V0ZVxuICB9XG5cbiAgLy8gTW9kZSBvZiB0cmFuc3BvcnRhdGlvbixcbiAgLy8gY2FuIGJlOiBjYXIsIGJpa2UsIGZvb3RcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZC9ibG9iL21hc3Rlci9kb2NzL2h0dHAubWQjcmVxdWVzdHNcbiAgLy9cbiAgLy8gQXMgb2YgdmVyc2lvbiA1LjguMCwgT1NSTSAoc2VydmVyKSBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIHByb2ZpbGVzIHNpbXVsdGFuZW91c2x5LlxuICAvLyBUaGlzIG1lYW5zIHRoZSB2YWx1ZSBhY3R1YWxseSBkb2VzIG5vdCBtYXR0ZXIuXG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInOyAvLyBkZWZhdWx0IGlzIGNhclxuICB9XG5cbiAgLy8gYnVpbGQgcmVxdWVzdCBVUkxcbiAgbGV0IHVybCA9IHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXztcblxuICAvLyBDb21tb24gd29ya2Fyb3VuZCB0byBwcm92aWRlIG11bHRpcGxlIHByb2ZpbGVzIChzaW5jZSBpdCBpcyBub3Qgc3VwcG9ydGVkIHlldClcbiAgLy8gRXZlcnkgcHJvZmlsZSBydW5zIG9uIGl0cyBvd24gaW5zdGFuY2UuXG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gYCR7Y29uZmlnLmluc3RhbmNlfS9gO1xuICB9XG4gIHVybCArPSBgJHtjb25maWcuc2VydmljZX0vJHt0aGlzLnByb3RvY29sVmVyc2lvbl99LyR7Y29uZmlnLnByb2ZpbGV9L2A7XG5cbiAgLy8gWyBbYSxiXSAsIFtjLGRdIF0gLT4gJ2EsYjtjLGQnXG4gIGNvbnN0IGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlcy5tYXAoKGMpID0+IGMuam9pbignLCcpKS5qb2luKCc7Jyk7XG4gIHVybCArPSBjb29yZGluYXRlU3RyaW5nO1xuXG4gIC8vIGxvb2sgZm9yIHJvdXRlIHNlcnZpY2Ugb3B0aW9uc1xuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kL2Jsb2IvbWFzdGVyL2RvY3MvaHR0cC5tZCNyb3V0ZS1zZXJ2aWNlXG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvbn09JHtjb25maWcub3B0aW9uc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuLyoqXG4gKiBTbmFwcyBhIGNvb3JkaW5hdGUgdG8gdGhlIHN0cmVldCBuZXR3b3JrIGFuZCByZXR1cm5zIHRoZSBuZWFyZXN0IG1hdGNoXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBjb29yZGluYXRlIGNvb3JkaW5hdGUgdG8gcXVlcnlcbiAqIEBwYXJhbSB7P0NvbmZpZ30gY29uZmlnIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEByZXR1cm5zIHthbmd1bGFyLklIdHRwUHJvbWlzZTxPYmplY3Q+fSBwcm9taXNlIG9mIHRoZSBPU1JNIEFQSSByZXF1ZXN0XG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kL2Jsb2IvbWFzdGVyL2RvY3MvaHR0cC5tZCNuZWFyZXN0LXNlcnZpY2VcbiAqL1xuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldE5lYXJlc3QgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAvLyBzZXJ2aWNlIGlzIGFsd2F5cyBuZWFyZXN0XG4gIGNvbmZpZy5zZXJ2aWNlID0gJ25lYXJlc3QnO1xuXG4gIC8vIE1vZGUgb2YgdHJhbnNwb3J0YXRpb25cbiAgLy8gSWYgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGEgZ2V0Um91dGUgcmVxdWVzdCwgY2hvb3NlIHRoZSBzYW1lIHByb2ZpbGUuXG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInOyAvLyBkZWZhdWx0IGlzIGNhclxuICB9XG5cbiAgLy8gYnVpbGQgcmVxdWVzdCBVUkxcbiAgbGV0IHVybCA9IHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXztcblxuICAvLyBDb21tb24gd29ya2Fyb3VuZCB0byBwcm92aWRlIG11bHRpcGxlIHByb2ZpbGVzIChzaW5jZSBpdCBpcyBub3Qgc3VwcG9ydGVkIHlldClcbiAgLy8gRXZlcnkgcHJvZmlsZSBydW5zIG9uIGl0cyBvd24gaW5zdGFuY2UuXG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gYCR7Y29uZmlnLmluc3RhbmNlfS9gO1xuICB9XG4gIHVybCArPSBgJHtjb25maWcuc2VydmljZX0vJHt0aGlzLnByb3RvY29sVmVyc2lvbl99LyR7Y29uZmlnLnByb2ZpbGV9L2A7XG5cbiAgLy8gW2EsYl0gLT4gJ2EsYidcbiAgY29uc3QgY29vcmRpbmF0ZVN0cmluZyA9IGNvb3JkaW5hdGUuam9pbignLCcpO1xuICB1cmwgKz0gY29vcmRpbmF0ZVN0cmluZztcblxuICAvLyBsb29rIGZvciBuZWFyZXN0IHNlcnZpY2Ugb3B0aW9uc1xuICBpZiAoY29uZmlnLm9wdGlvbnMpIHtcbiAgICB1cmwgKz0gJz8nO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhjb25maWcub3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb259PSR7Y29uZmlnLm9wdGlvbnNbb3B0aW9uXX1gKTtcbiAgICB9XG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdTZXJ2aWNlJywgW10pO1xubXlNb2R1bGUuc2VydmljZSgnbmdlb1JvdXRpbmdTZXJ2aWNlJywgUm91dGluZ1NlcnZpY2UpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdDb21wb25lbnQgZnJvbSAnbmdlby9yb3V0aW5nL1JvdXRpbmdDb21wb25lbnQnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ01vZHVsZScsIFtuZ2VvUm91dGluZ1JvdXRpbmdDb21wb25lbnQubmFtZV0pO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDI0LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLW5vbWluYXRpbS1pbnB1dFwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgIHBsYWNlaG9sZGVyPVwie3skY3RybC5wbGFjZWhvbGRlcn19XCJcbiAgICBuZy1tb2RlbD1cIiRjdHJsLmlucHV0VmFsdWVcIlxuICAgIG5nZW8tc2VhcmNoPVwiJGN0cmwub3B0aW9uc1wiXG4gICAgbmdlby1zZWFyY2gtZGF0YXNldHM9XCIkY3RybC5kYXRhc2V0c1wiXG4gICAgbmdlby1zZWFyY2gtbGlzdGVuZXJzPVwiJGN0cmwubGlzdGVuZXJzXCJcbiAgLz5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZ1wiPlxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLXN0YXJ0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwiJGN0cmwuc3RhcnRGZWF0dXJlX1wiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLnN0YXJ0RmlsbFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRTdHJva2VcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcbiAgICA+XG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy12aWFzIGZvcm0tZ3JvdXBcIiBuZy1yZXBlYXQ9XCIoaW5kZXgsIHZpYSkgaW4gJGN0cmwudmlhQXJyYXlcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXG4gICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cInZpYS5mZWF0dXJlXCJcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLnZpYUZpbGxcIlxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiRjdHJsLmNvbG9ycy52aWFTdHJva2VcIlxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWUgZGVsZXRlLXZpYVwiIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlVmlhKGluZGV4KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctZGVzdGluYXRpb24gZm9ybS1ncm91cFwiPlxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtbWFwPVwiJGN0cmwubWFwXCJcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCIkY3RybC50YXJnZXRGZWF0dXJlX1wiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uRmlsbFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuZGVzdGluYXRpb25TdHJva2VcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcbiAgICA+XG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZmlsbFwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5jbGVhclJvdXRlKClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5DbGVhcjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwucmV2ZXJzZVJvdXRlKClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctcmlnaHQtYXJyb3ctbGVmdFwiPjwvc3Bhbj4gPHNwYW4gdHJhbnNsYXRlPlJldmVyc2U8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLmFkZFZpYSgpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5BZGQgdmlhPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cblxuICA8ZGl2IG5nLWlmPVwiJGN0cmwucm91dGluZ1Byb2ZpbGVzLmxlbmd0aCA+IDFcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgY29sLW1kLTRcIiB0cmFuc2xhdGU+UHJvZmlsZTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5nLW1vZGVsPVwiJGN0cmwuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZVwiPlxuICAgICAgICAgIDxvcHRpb24gbmctcmVwZWF0PVwicHJvZmlsZSBpbiAkY3RybC5yb3V0aW5nUHJvZmlsZXNcIiBuZy12YWx1ZT1cInByb2ZpbGVcIj57e3Byb2ZpbGUubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWVycm9yIGZvcm0tZ3JvdXAgY2xlYXJmaXhcIiBuZy1oaWRlPVwiJGN0cmwuZXJyb3JNZXNzYWdlID09PSAnJ1wiPlxuICAgIHt7JGN0cmwuZXJyb3JNZXNzYWdlfX1cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XG5cbiAgPGRpdiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbCAmJiAkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgIDxzdHJvbmcgdHJhbnNsYXRlPlJvdXRlIHN0YXRpc3RpY3M8L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RHVyYXRpb248L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPnt7JGN0cmwucm91dGVEdXJhdGlvbiB8IG5nZW9EdXJhdGlvbn19PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgbmctaGlkZT1cIiRjdHJsLnJvdXRlRGlzdGFuY2UgPD0gMFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RGlzdGFuY2U8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPnt7JGN0cmwucm91dGVEaXN0YW5jZSB8IG5nZW9Vbml0UHJlZml4OidtJ319PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YDtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNC0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBkZWZhdWx0IGA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWZlYXR1cmVcIj5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgPG5nZW8tbm9taW5hdGltLWlucHV0XG4gICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC12YWx1ZT1cIiRjdHJsLmZlYXR1cmVMYWJlbFwiXG4gICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1wbGFjZWhvbGRlcj1cInt7J1NlYXJjaC4uLicgfCB0cmFuc2xhdGV9fVwiXG4gICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1vbi1zZWxlY3Q9XCIkY3RybC5vblNlbGVjdFwiXG4gICAgPlxuICAgIDwvbmdlby1ub21pbmF0aW0taW5wdXQ+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGJ0blwiIG5nLWNsaWNrPVwiJGN0cmwuc2V0KClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtbG9jYXRpb24tcGluXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInJvdXRpbmdcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL3JvdXRpbmcuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=