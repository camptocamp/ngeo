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
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
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
/******/ 					const r = fn();
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
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
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
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
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
/******/ 		const installedChunks = {
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/routing.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL3JvdXRpbmcuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL3JvdXRpbmcuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvTm9taW5hdGltSW5wdXRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL1JvdXRpbmdDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9Sb3V0aW5nU2VydmljZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvbW9kdWxlLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9ub21pbmF0aW1pbnB1dC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9yb3V0aW5nLmh0bWwuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlLmh0bWwuanMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZXhhbXBsZSBzaG93cyB0aGUgbmdlbyByb3V0aW5nIGRpcmVjdGl2ZS5cbiAqL1xuaW1wb3J0ICcuL3JvdXRpbmcuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTW9kdWxlIGZyb20gJ25nZW8vcm91dGluZy9tb2R1bGUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBuZ2VvUm91dGluZ01vZHVsZS5uYW1lXSk7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uJ3MgbWFpbiBkaXJlY3RpdmUuXG4gKlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbOTMxMDEwLjE1MzU5ODk0NDIsIDU5NjE3MDUuODQyMjk3MjU0XSxcbiAgICAgIHpvb206IDksXG4gICAgfSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucm91dGluZ1BhbmVsQWN0aXZlID0gdHJ1ZTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Sb3V0aW5nT3B0aW9ucycsIHt9KTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTm9taW5hdGltVXJsJywgJ2h0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnLycpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zJywge30pO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHNjb3BlJywgJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvU2VhcmNoU2VhcmNoRGlyZWN0aXZlIGZyb20gJ25nZW8vc2VhcmNoL3NlYXJjaERpcmVjdGl2ZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9ub21pbmF0aW1pbnB1dC5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50JywgW1xuICBuZ2VvU2VhcmNoU2VhcmNoRGlyZWN0aXZlLm5hbWUsXG4gIG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZS5uYW1lLFxuXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vcm91dGluZy9ub21pbmF0aW1pbnB1dCcsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5teU1vZHVsZS52YWx1ZShcbiAgJ25nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gICAqL1xuICAoJGF0dHJzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL25vbWluYXRpbWlucHV0JztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsXG4gKiAgICBUZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1xuICAnJGF0dHJzJyxcbiAgJ25nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCcsXG5dO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsKFxuICAkYXR0cnMsXG4gIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCxcbikge1xuICByZXR1cm4gbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfSBuZ2VvTm9taW5hdGltU2VydmljZSBzZXJ2aWNlIGZvclxuICogICAgTm9taW5hdGltXG4gKiBAY2xhc3NcbiAqIEBoaWRkZW5cbiAqIEBuZ2RvYyBjb250cm9sbGVyXG4gKiBAbmduYW1lIE5nZW9Ob21pbmF0aW1JbnB1dENvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xsZXIoJGVsZW1lbnQsICRzY29wZSwgbmdlb05vbWluYXRpbVNlcnZpY2UpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtKUXVlcnl9XG4gICAqL1xuICB0aGlzLmVsZW1lbnRfID0gJGVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICovXG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZSA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2Z1bmN0aW9uKE9iamVjdCk6IHZvaWR9XG4gICAqL1xuICB0aGlzLm9uU2VsZWN0ID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqL1xuICB0aGlzLmlucHV0VmFsdWUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7VHdpdHRlci5UeXBlYWhlYWQuT3B0aW9uc31cbiAgICovXG4gIHRoaXMub3B0aW9ucyA9IC8qKiBAdHlwZSB7VHdpdHRlci5UeXBlYWhlYWQuT3B0aW9uc30gKi8ge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGltcG9ydCgnLi9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0PltdfVxuICAgKi9cbiAgdGhpcy5kYXRhc2V0cyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnbm9taW5hdGltJyxcbiAgICAgIGRpc3BsYXk6ICduYW1lJyxcbiAgICAgIHNvdXJjZTogdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZS50eXBlYWhlYWRTb3VyY2VEZWJvdW5jZWQsXG4gICAgfSxcbiAgXTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9zZWFyY2gvc2VhcmNoRGlyZWN0aXZlJykuU2VhcmNoRGlyZWN0aXZlTGlzdGVuZXJzPGltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHQ+fVxuICAgKi9cbiAgdGhpcy5saXN0ZW5lcnMgPSB7XG4gICAgc2VsZWN0OiB0aGlzLnNlbGVjdF8uYmluZCh0aGlzKSxcbiAgfTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMucGxhY2Vob2xkZXIgPSAnJztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0pRdWVyeS5FdmVudH0gZXZlbnQgRXZlbnQuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHR9IHN1Z2dlc3Rpb24gU3VnZ2VzdGlvbi5cbiAqIEBwYXJhbSB7VHdpdHRlci5UeXBlYWhlYWQuRGF0YXNldDxpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0Pn0gZGF0YXNldCBEYXRhc2V0LlxuICogQGhpZGRlblxuICovXG5Db250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RfID0gZnVuY3Rpb24gKGV2ZW50LCBzdWdnZXN0aW9uLCBkYXRhc2V0KSB7XG4gIGlmICh0aGlzLm9uU2VsZWN0KSB7XG4gICAgdGhpcy5vblNlbGVjdChzdWdnZXN0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbnB1dCBmb3JtIGZpZWxkIHdoaWNoIHByb3ZpZGVzIE5vbWluYXRpbSB0eXBlYWhlYWQgbG9va3VwIHVzaW5nXG4gKiB7QGxpbmsgaW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLmRlZmF1bHR9LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDxuZ2VvLW5vbWluYXRpbS1pbnB1dFxuICogICAgICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC12YWx1ZT1cImN0cmwubGFiZWxcIlxuICogICAgICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1wbGFjZWhvbGRlcj1cInR5cGUgdG8gc2VhcmNoXCJcbiAqICAgICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtb24tc2VsZWN0PVwiY3RybC5vblNlbGVjdFwiPlxuICpcbiAqIElzIHVzZWQgaW4gaW4gdGhlIHBhcnRpYWwgb2Yge0BsaW5rIGltcG9ydCgnbmdlby9yb3V0aW5nRmVhdHVyZUNvbXBvbmVudCcpLmRlZmF1bHR9LlxuICpcbiAqIFNlZSB0aGUgWy4uL2V4YW1wbGVzL3JvdXRpbmcuaHRtbF0oLi4vZXhhbXBsZXMvcm91dGluZy5odG1sKSBleGFtcGxlIHRvIHNlZSBpdCBpbiBhY3Rpb24uXG4gKlxuICogQGh0bWxBdHRyaWJ1dGUge2Z1bmN0aW9uKGltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHQpfVxuICogICAgbmdlby1ub21pbmF0aW0taW5wdXQtb24tc2VsZWN0IEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3RzIGEgbmV3IHN1Z2dlc3Rpb24uXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBuZ2VvLW5vbWluYXRpbS1pbnB1dC12YWx1ZVxuICogIFZhbHVlIG9mIGlucHV0IGZpZWxkLCB3aWxsIGJlIHNldCB0byB0aGUgbGFiZWwgb2YgdGhlIHNlYXJjaCByZXN1bHQuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBuZ2VvLW5vbWluYXRpbS1pbnB1dC1wbGFjZWhvbGRlclxuICogIFBsYWNlaG9sZGVyIHRleHQsIHdoZW4gZmllbGQgaXMgZW1wdHkuXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmduYW1lIG5nZW9Ob21pbmF0aW1JbnB1dFxuICovXG5jb25zdCByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ29uU2VsZWN0JzogJz0/bmdlb05vbWluYXRpbUlucHV0T25TZWxlY3QnLFxuICAgICdpbnB1dFZhbHVlJzogJz0/bmdlb05vbWluYXRpbUlucHV0VmFsdWUnLFxuICAgICdwbGFjZWhvbGRlcic6ICdAP25nZW9Ob21pbmF0aW1JbnB1dFBsYWNlaG9sZGVyJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Ob21pbmF0aW1JbnB1dCcsIHJvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIk5vbWluYXRpbVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnbmdlb0RlYm91bmNlJywgJ25nZW9Ob21pbmF0aW1VcmwnLCAnbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBOb21pbmF0aW1TZWFyY2hSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xhYmVsXVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY29vcmRpbmF0ZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkaXNwbGF5X25hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsYXRcbiAqL1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gTm9taW5hdGltLCB3aGljaCBhbGxvd3MgdG8gc2VhcmNoIGZvclxuICogT1NNIGRhdGEgYnkgbmFtZSBhbmQgYWRkcmVzcy5cbiAqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfSAkaHR0cCBBbmd1bGFyIGh0dHAgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZGVib3VuY2UnKS5taXNjRGVib3VuY2U8ZnVuY3Rpb24oc3RyaW5nLCBmdW5jdGlvbihOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSk6IHZvaWQsIChmdW5jdGlvbihOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSk6IHZvaWQpfHVuZGVmaW5lZCk6IHZvaWQ+fSAgbmdlb0RlYm91bmNlXG4gKiAgICBuZ2VvIERlYm91bmNlIHNlcnZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmdlb05vbWluYXRpbVVybCBUaGUgbm9taW5hdGltIFVSTC5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtc30gbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMgVGhlIHNlYXJjaCBwYXJhbWV0ZXJzXG4gKiBAY2xhc3NcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmduYW1lIG5nZW9Ob21pbmF0aW1TZXJ2aWNlXG4gKiBAc2VlIGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL05vbWluYXRpbVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gTm9taW5hdGltU2VydmljZSgkaHR0cCwgbmdlb0RlYm91bmNlLCBuZ2VvTm9taW5hdGltVXJsLCBuZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcykge1xuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy4kaHR0cF8gPSAkaHR0cDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9taXNjL2RlYm91bmNlJykubWlzY0RlYm91bmNlPGZ1bmN0aW9uKHN0cmluZywgZnVuY3Rpb24oTm9taW5hdGltU2VhcmNoUmVzdWx0W10pOiB2b2lkLCAoZnVuY3Rpb24oTm9taW5hdGltU2VhcmNoUmVzdWx0W10pOiB2b2lkKXx1bmRlZmluZWQpOiB2b2lkPn1cbiAgICovXG4gIHRoaXMubmdlb0RlYm91bmNlXyA9IG5nZW9EZWJvdW5jZTtcblxuICAvKipcbiAgICogVVJMIGZvciBOb21pbmF0aW0gYmFja2VuZFxuICAgKiBEZWZhdWx0cyBvcGVuc3RyZWV0bWFwIGluc3RhbmNlLlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5ub21pbmF0aW1VcmxfID0gbmdlb05vbWluYXRpbVVybDtcblxuICAvLyB0aGUgdXJsIGlzIGV4cGVjdGVkIHRvIGVuZCB3aXRoIGEgc2xhc2hcbiAgaWYgKHRoaXMubm9taW5hdGltVXJsXy5zdWJzdHIoLTEpICE9PSAnLycpIHtcbiAgICB0aGlzLm5vbWluYXRpbVVybF8gKz0gJy8nO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zfVxuICAgKi9cbiAgdGhpcy5zZWFyY2hEZWZhdWx0UGFyYW1zXyA9IG5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zO1xuXG4gIC8qKlxuICAgKiBEZWxheSAoaW4gbWlsbGlzZWNvbmRzKSB0byBhdm9pZCBjYWxsaW5nIHRoZSBBUEkgdG9vIG9mdGVuLlxuICAgKiBPbmx5IGlmIHRoZXJlIHdlcmUgbm8gY2FsbHMgZm9yIHRoYXQgbWFueSBtaWxsaXNlY29uZHMsXG4gICAqIHRoZSBsYXN0IGNhbGwgd2lsbCBiZSBleGVjdXRlZC5cbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMudHlwZWFoZWFkRGVib3VuY2VEZWxheV8gPSA1MDA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHsocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM6ICgocmVzdWx0OiBOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSkgPT4gdm9pZCkgfCB1bmRlZmluZWQpID0+IHZvaWR9XG4gICAqL1xuICB0aGlzLnR5cGVhaGVhZFNvdXJjZURlYm91bmNlZCA9IHRoaXMubmdlb0RlYm91bmNlXyhcbiAgICB0aGlzLnR5cGVhaGVhZFNvdXJjZV8uYmluZCh0aGlzKSxcbiAgICB0aGlzLnR5cGVhaGVhZERlYm91bmNlRGVsYXlfLFxuICAgIHRydWUsXG4gICk7XG59XG5cbi8qKlxuICogU2VhcmNoIGJ5IG5hbWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgU2VhcmNoIHF1ZXJ5XG4gKiBAcGFyYW0gez9PYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBwYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHJldHVybnMge2FuZ3VsYXIuSUh0dHBQcm9taXNlPE5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0W10+fSBwcm9taXNlIG9mIHRoZSBOb21pbmF0aW0gQVBJIHJlcXVlc3RcbiAqIEBzZWUgaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvTm9taW5hdGltI1NlYXJjaFxuICovXG5Ob21pbmF0aW1TZXJ2aWNlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtcykge1xuICBsZXQgdXJsID0gYCR7dGhpcy5ub21pbmF0aW1VcmxffXNlYXJjaD9xPSR7cXVlcnl9YDtcbiAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlYXJjaERlZmF1bHRQYXJhbXNfLCBwYXJhbXMpO1xuXG4gIC8vIHJlcXVpcmUgSlNPTiByZXNwb25zZVxuICBwYXJhbXMuZm9ybWF0ID0gJ2pzb24nO1xuICBpZiAocGFyYW1zKSB7XG4gICAgdXJsICs9ICcmJztcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvbn09JHtwYXJhbXNbb3B0aW9uXX1gKTtcbiAgICB9XG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5cbi8qKlxuICogUmV2ZXJzZSBHZW9jb2RpbmdcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IGNvb3JkaW5hdGUgU2VhcmNoIGNvb3JkaW5hdGUgaW4gTG9uTGF0IHByb2plY3Rpb25cbiAqIEBwYXJhbSB7KE9iamVjdDxzdHJpbmcsIHN0cmluZz58dW5kZWZpbmVkKX0gcGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHthbmd1bGFyLklIdHRwUHJvbWlzZTxpbXBvcnQoJy4vTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0Pn0gcHJvbWlzZSBvZiB0aGUgTm9taW5hdGltIEFQSSByZXF1ZXN0XG4gKiBAc2VlIGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL05vbWluYXRpbSNSZXZlcnNlX0dlb2NvZGluZ1xuICovXG5Ob21pbmF0aW1TZXJ2aWNlLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUsIHBhcmFtcykge1xuICBsZXQgdXJsID0gYCR7dGhpcy5ub21pbmF0aW1VcmxffXJldmVyc2VgO1xuICBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpO1xuXG4gIC8vIGNvb3JkaW5hdGVcbiAgcGFyYW1zLmxvbiA9IGAke2Nvb3JkaW5hdGVbMF19YDtcbiAgcGFyYW1zLmxhdCA9IGAke2Nvb3JkaW5hdGVbMV19YDtcblxuICAvLyByZXF1aXJlIEpTT04gcmVzcG9uc2VcbiAgcGFyYW1zLmZvcm1hdCA9ICdqc29uJztcbiAgaWYgKHBhcmFtcykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb259PSR7cGFyYW1zW29wdGlvbl19YCk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSBTZWFyY2ggcXVlcnlcbiAqIEBwYXJhbSB7KHJlc3VsdDogTm9taW5hdGltU2VhcmNoUmVzdWx0W10pID0+IHZvaWR9IHN5bmNSZXN1bHRzIENhbGxiYWNrIGZvciBzeW5jaHJvbm91cyBleGVjdXRpb24sIHVudXNlZFxuICogQHBhcmFtIHsocmVzdWx0OiBOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSkgPT4gdm9pZH0gW2FzeW5jUmVzdWx0c10gQ2FsbGJhY2sgZm9yIGFzeW5jaHJvbm91cyBleGVjdXRpb25cbiAqL1xuTm9taW5hdGltU2VydmljZS5wcm90b3R5cGUudHlwZWFoZWFkU291cmNlXyA9IGZ1bmN0aW9uIChxdWVyeSwgc3luY1Jlc3VsdHMsIGFzeW5jUmVzdWx0cykge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8Tm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHRbXT59IHJlc3BcbiAgICovXG4gIGNvbnN0IG9uU3VjY2Vzc18gPSBmdW5jdGlvbiAocmVzcCkge1xuICAgIC8qKlxuICAgICAqIFBhcnNlcyByZXN1bHQgcmVzcG9uc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0fSByZXN1bHQgUmVzdWx0XG4gICAgICogQHJldHVybnMge05vbWluYXRpbVNlYXJjaFJlc3VsdH0gUGFyc2VkIHJlc3VsdFxuICAgICAqL1xuICAgIGNvbnN0IHBhcnNlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29vcmRpbmF0ZTogW3Jlc3VsdC5sb24sIHJlc3VsdC5sYXRdLFxuICAgICAgICBuYW1lOiByZXN1bHQuZGlzcGxheV9uYW1lLFxuICAgICAgfTtcbiAgICB9O1xuICAgIGlmIChhc3luY1Jlc3VsdHMpIHtcbiAgICAgIGFzeW5jUmVzdWx0cyhyZXNwLmRhdGEubWFwKHBhcnNlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN5bmNSZXN1bHRzKHJlc3AuZGF0YS5tYXAocGFyc2UpKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPE5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0Pn0gcmVzcFxuICAgKi9cbiAgY29uc3Qgb25FcnJvcl8gPSBmdW5jdGlvbiAocmVzcCkge1xuICAgIGlmIChhc3luY1Jlc3VsdHMpIHtcbiAgICAgIGFzeW5jUmVzdWx0cyhbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN5bmNSZXN1bHRzKFtdKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2VhcmNoKHF1ZXJ5LCB7fSkudGhlbihvblN1Y2Nlc3NfLCBvbkVycm9yXyk7XG59O1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJywgW25nZW9NaXNjRGVib3VuY2UubmFtZV0pO1xubXlNb2R1bGUuc2VydmljZSgnbmdlb05vbWluYXRpbVNlcnZpY2UnLCBOb21pbmF0aW1TZXJ2aWNlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UnO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdTZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nU2VydmljZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nRmVhdHVyZUNvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQnO1xuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZSc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbCc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UnO1xuaW1wb3J0IHt0b0xvbkxhdH0gZnJvbSAnb2wvcHJvaic7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sR2VvbUxpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9yb3V0aW5nLmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJvdXRpbmdWaWFcbiAqIEBwcm9wZXJ0eSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSBbZmVhdHVyZV1cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oaW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdCk6IHZvaWR9IFtvblNlbGVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nQ29tcG9uZW50JywgW1xuICBuZ2VvTWlzY0RlYm91bmNlLm5hbWUsXG4gIG5nZW9NaXNjRmlsdGVycy5uYW1lLFxuICBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSxcbiAgbmdlb1JvdXRpbmdSb3V0aW5nU2VydmljZS5uYW1lLFxuICBuZ2VvUm91dGluZ1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50Lm5hbWUsXG5dKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL3JvdXRpbmcnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoXG4gICduZ2VvUm91dGluZ1RlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvUm91dGluZ1RlbXBsYXRlVXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL3JvdXRpbmcnO1xuICB9LFxuKTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbmd1bGFyLklBdHRyaWJ1dGVzKTogc3RyaW5nfSBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsIFRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xubmdlb1JvdXRpbmdUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckYXR0cnMnLCAnbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCddO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxuLyoqXG4gKiBUaGUgY29udHJvbGxlciBmb3IgdGhlIHJvdXRpbmcgZGlyZWN0aXZlLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFNjb3BlLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlJykuUm91dGluZ1NlcnZpY2V9IG5nZW9Sb3V0aW5nU2VydmljZSBzZXJ2aWNlIGZvciBPU1JNXG4gICAqICAgIHJvdXRpbmcuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlIHNlcnZpY2UgZm9yXG4gICAqICAgIE5vbWluYXRpbS5cbiAgICogQHBhcmFtIHthbmd1bGFyLklRU2VydmljZX0gJHEgQW5ndWxhciBxIHNlcnZpY2VcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbigpOiB2b2lkPn0gbmdlb0RlYm91bmNlIG5nZW8gRGVib3VuY2VcbiAgICogICAgc2VydmljZS5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Sb3V0aW5nT3B0aW9uc30gbmdlb1JvdXRpbmdPcHRpb25zIFRoZSBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoJHNjb3BlLCBuZ2VvUm91dGluZ1NlcnZpY2UsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlLCAkcSwgbmdlb0RlYm91bmNlLCBuZ2VvUm91dGluZ09wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvUm91dGluZ1NlcnZpY2UnKS5Sb3V0aW5nU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubmdlb1JvdXRpbmdTZXJ2aWNlXyA9IG5nZW9Sb3V0aW5nU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvUm91dGluZ09wdGlvbnN9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJvdXRpbmdPcHRpb25zXyA9IG5nZW9Sb3V0aW5nT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEF2YWlsYWJsZSByb3V0aW5nIHByb2ZpbGVzLlxuICAgICAqIEV4YW1wbGU6IFtcbiAgICAgKiAgICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICAgICAgbGFiZWw6ICdDYXInLCAvLyB1c2VkIGFzIGxhYmVsIGluIHRoZSBVSVxuICAgICAqICAgICAgICAgICAgICBwcm9maWxlOiAncm91dGVkLWNhcicgLy8gdXNlZCBhcyBwYXJ0IG9mIHRoZSBxdWVyeVxuICAgICAqICAgICAgICAgICAgfVxuICAgICAqICAgICAgICAgIF1cbiAgICAgKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLlJvdXRpbmdQcm9maWxlW119XG4gICAgICovXG4gICAgdGhpcy5yb3V0aW5nUHJvZmlsZXMgPSB0aGlzLnJvdXRpbmdPcHRpb25zXy5wcm9maWxlcyB8fCBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5Sb3V0aW5nUHJvZmlsZX1cbiAgICAgKi9cbiAgICB0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUgPSB0aGlzLnJvdXRpbmdQcm9maWxlcy5sZW5ndGggPiAwID8gdGhpcy5yb3V0aW5nUHJvZmlsZXNbMF0gOiBudWxsO1xuICAgICRzY29wZS4kd2F0Y2goKCkgPT4gdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlLCB0aGlzLmNhbGN1bGF0ZVJvdXRlLmJpbmQodGhpcykpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSVFTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy4kcV8gPSAkcTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgICAqL1xuICAgIHRoaXMubWFwID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqL1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldEZlYXR1cmVfID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSb3V0aW5nVmlhW119XG4gICAgICovXG4gICAgdGhpcy52aWFBcnJheSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnMgPSB7XG4gICAgICBzdGFydEZpbGw6ICcjNkJFNjJFJyxcbiAgICAgIHN0YXJ0U3Ryb2tlOiAnIzRDQjAxRScsXG4gICAgICBkZXN0aW5hdGlvbkZpbGw6ICcjRkYzRTEzJyxcbiAgICAgIGRlc3RpbmF0aW9uU3Ryb2tlOiAnI0NEMzQxMicsXG4gICAgICB2aWFGaWxsOiAnIzc2NzY3NicsXG4gICAgICB2aWFTdHJva2U6ICcjMDAwMDAwJyxcbiAgICAgIGxpbmVSR0JBOiAncmdiYSgxNiwgMTEyLCAyOSwgMC42KScsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8gPSBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgZmVhdHVyZXM6IFtdLFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucm91dGVMYXllcl8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBjbGFzc05hbWU6ICdjYW52YXMyZCcsXG4gICAgICBzb3VyY2U6IHRoaXMucm91dGVTb3VyY2VfLFxuICAgICAgc3R5bGU6IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5saW5lUkdCQSxcbiAgICAgICAgfSksXG4gICAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5saW5lUkdCQSxcbiAgICAgICAgICB3aWR0aDogNSxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIERpc3RhbmNlIG9mIHJvdXRlIGluIG1ldGVyc1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSAwO1xuXG4gICAgLyoqXG4gICAgICogRHVyYXRpb24gb2Ygcm91dGUgaW4gbWludXRlcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHs/bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yZWdleElzRm9ybWF0dGVkQ29vcmQgPSAvXFxkK1xcLlxcZCtcXC9cXGQrXFwuXFxkKy87XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmRyYXdfID0gbnVsbDtcbiAgICBjb25zdCBkZWJvdW5jZURlbGF5ID0gMjAwOyAvLyBpbiBtaWxsaXNlY29uZHNcblxuICAgIC8qKlxuICAgICAqIERlYm91bmNlZCBiZWNhdXNlIGluIHNvbWUgY2FzZXMgKHJldmVyc2Ugcm91dGUpIG11bHRpcGxlIGNoYW5nZXMgYXJlIGRvbmVcbiAgICAgKiBhdCBvbmNlIGFuZCBzcGFtIHRoaXMgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oKTogdm9pZH1cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IG5nZW9EZWJvdW5jZSh0aGlzLmNhbGN1bGF0ZVJvdXRlLmJpbmQodGhpcyksIGRlYm91bmNlRGVsYXksIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIGNvbnRyb2xsZXJcbiAgICovXG4gICRvbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLnJvdXRlTGF5ZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHN0YXJ0LCBlbmQgYW5kIHZpYXMuIFJlbW92ZXMgZmVhdHVyZXMgZnJvbSBtYXAuXG4gICAqL1xuICBjbGVhclJvdXRlKCkge1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy52aWFBcnJheSA9IFtdO1xuICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5yb3V0ZUR1cmF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJvdXRlU291cmNlXy5jbGVhcigpO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgZmVhdHVyZSBwb2ludCBpbnRvIExvbkxhdCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gcG9pbnQgRmVhdHVyZSBwb2ludCB0byBjb252ZXJ0XG4gICAqIEByZXR1cm5zIHs/aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZX0gTG9uTGF0IGNvb3JkaW5hdGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldExvbkxhdEZyb21Qb2ludF8ocG9pbnQpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwb2ludC5nZXRHZW9tZXRyeSgpO1xuICAgIGlmICghKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHRpbWUgdmFsdWVzIHR5cGUnKTtcbiAgICB9XG4gICAgY29uc3QgY29vcmRzID0gZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICByZXR1cm4gdG9Mb25MYXQoY29vcmRzLCBwcm9qZWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGlwIHN0YXJ0IGFuZCB0YXJnZXQgYW5kIHJlLWNhbGN1bGF0ZSByb3V0ZS5cbiAgICovXG4gIHJldmVyc2VSb3V0ZSgpIHtcbiAgICAvLyBzd2FwIHN0YXJ0IGFuZCB0YXJnZXRcbiAgICBjb25zdCB0bXBGZWF0dXJlID0gdGhpcy5zdGFydEZlYXR1cmVfO1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IHRoaXMudGFyZ2V0RmVhdHVyZV87XG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IHRtcEZlYXR1cmU7XG5cbiAgICAvLyByZXZlcnNlIHZpYXNcbiAgICB0aGlzLnZpYUFycmF5ID0gdGhpcy52aWFBcnJheS5yZXZlcnNlKCk7XG5cbiAgICAvLyByZWNhbGN1bGF0aW9uIGlzIGRvbmUgYnkgdGhlIGRlYm91bmNlZCBoYW5kbGVDaGFuZ2VcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi9Sb3V0aW5nU2VydmljZScpLlJvdXRlfSByb3V0ZSBSb3V0ZXMgb2YgT1NSTSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W119IHBhcnNlZCByb3V0ZSBmZWF0dXJlc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcGFyc2VSb3V0ZV8ocm91dGUpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W119ICovXG4gICAgbGV0IHBhcnNlZFJvdXRlcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBvbEZvcm1hdEdlb0pTT04oKTtcbiAgICBjb25zdCBmb3JtYXRDb25maWcgPSB7XG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSxcbiAgICB9O1xuICAgIC8vIGlmIHRoZXJlIGFyZSB1c2VmdWwgXCJsZWdzXCIgZGF0YSwgcGFyc2UgdGhpc1xuICAgIGlmIChyb3V0ZS5sZWdzKSB7XG4gICAgICAvKiogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdW119ICovXG4gICAgICBjb25zdCBwYXJzZWRSb3V0ZXNfID0gcm91dGUubGVncy5tYXAoKGxlZykgPT5cbiAgICAgICAgbGVnLnN0ZXBzLm1hcChcbiAgICAgICAgICAoc3RlcCkgPT5cbiAgICAgICAgICAgIG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICAgICAgICBnZW9tZXRyeTogZm9ybWF0LnJlYWRHZW9tZXRyeShzdGVwLmdlb21ldHJ5LCBmb3JtYXRDb25maWcpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgLy8gZmxhdHRlblxuICAgICAgcGFyc2VkUm91dGVzID0gW10uY29uY2F0KC4uLnBhcnNlZFJvdXRlc18pO1xuICAgIH0gZWxzZSBpZiAocm91dGUuZ2VvbWV0cnkpIHtcbiAgICAgIC8vIG90aGVyd2lzZSBwYXJzZSAob3ZlcnZpZXcpIGdlb21ldHJ5XG4gICAgICBwYXJzZWRSb3V0ZXMucHVzaChcbiAgICAgICAgbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IGZvcm1hdC5yZWFkR2VvbWV0cnkocm91dGUuZ2VvbWV0cnksIGZvcm1hdENvbmZpZyksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZFJvdXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKi9cbiAgY2FsY3VsYXRlUm91dGUoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0RmVhdHVyZV8gfHwgIXRoaXMudGFyZ2V0RmVhdHVyZV8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlbmRlcmVkIHJvdXRlc1xuICAgIHRoaXMucm91dGVTb3VyY2VfLmNsZWFyKCk7XG4gICAgY29uc3QgY29vcmRGcm9tID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHRoaXMuc3RhcnRGZWF0dXJlXyk7XG4gICAgY29uc3QgY29vcmRUbyA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh0aGlzLnRhcmdldEZlYXR1cmVfKTtcbiAgICBjb25zdCB2aWFzID0gdGhpcy52aWFBcnJheVxuICAgICAgLmZpbHRlcigodmlhKSA9PiB2aWEuZmVhdHVyZSAhPT0gbnVsbClcbiAgICAgIC5tYXAoKHZpYSkgPT4gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHZpYS5mZWF0dXJlKSk7XG4gICAgY29uc3Qgcm91dGUgPSAvKiogQHR5cGUge251bWJlcltdW119ICovIFtjb29yZEZyb21dLmNvbmNhdCh2aWFzLCBbY29vcmRUb10pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCcuL1JvdXRpbmdTZXJ2aWNlJykuUm91dGVzPn0gcmVzcFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGNvbnN0IG9uU3VjY2Vzc18gPSAocmVzcCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1hcCB8fCAhdGhpcy5zdGFydEZlYXR1cmVfIHx8ICF0aGlzLnRhcmdldEZlYXR1cmVfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZVJvdXRlXyhyZXNwLmRhdGEucm91dGVzWzBdKTtcbiAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ05vIHJvdXRlIG9yIG5vdCBzdXBwb3J0ZWQgZm9ybWF0LicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnJvdXRlU291cmNlXy5hZGRGZWF0dXJlcyhmZWF0dXJlcyk7XG5cbiAgICAgIC8vIHJlY2VudGVyIG1hcCBvbiByb3V0ZVxuICAgICAgdGhpcy5tYXAuZ2V0VmlldygpLmZpdCh0aGlzLnJvdXRlU291cmNlXy5nZXRFeHRlbnQoKSk7XG4gICAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSByZXNwLmRhdGEucm91dGVzWzBdLmRpc3RhbmNlO1xuICAgICAgdGhpcy5yb3V0ZUR1cmF0aW9uID0gcmVzcC5kYXRhLnJvdXRlc1swXS5kdXJhdGlvbjtcblxuICAgICAgLy8gZ2V0IGZpcnN0IGFuZCBsYXN0IGNvb3JkaW5hdGUgb2Ygcm91dGVcbiAgICAgIGNvbnN0IHN0YXJ0Um91dGUgPSAvKiogQHR5cGUge2ltcG9ydCgnb2wvZ2VvbS9MaW5lU3RyaW5nJykuZGVmYXVsdH0gKi8gZmVhdHVyZXNbMF1cbiAgICAgICAgLmdldEdlb21ldHJ5KClcbiAgICAgICAgLmdldENvb3JkaW5hdGVBdCgwKTtcbiAgICAgIGNvbnN0IGVuZFJvdXRlID0gLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2dlb20vTGluZVN0cmluZycpLmRlZmF1bHR9ICovIGZlYXR1cmVzW2ZlYXR1cmVzLmxlbmd0aCAtIDFdXG4gICAgICAgIC5nZXRHZW9tZXRyeSgpXG4gICAgICAgIC5nZXRDb29yZGluYXRlQXQoMSk7XG5cbiAgICAgIC8vIGJ1aWxkIGdlb21ldHJpZXMgdG8gY29ubmVjdCByb3V0ZSB0byBzdGFydCBhbmQgZW5kIHBvaW50IG9mIHF1ZXJ5XG4gICAgICBjb25zdCBzdGFydFRvUm91dGUgPSBbXG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdH0gKi8gdGhpcy5zdGFydEZlYXR1cmVfLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKSxcbiAgICAgICAgc3RhcnRSb3V0ZSxcbiAgICAgIF07XG4gICAgICBjb25zdCByb3V0ZVRvRW5kID0gW1xuICAgICAgICBlbmRSb3V0ZSxcbiAgICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0fSAqLyB0aGlzLnRhcmdldEZlYXR1cmVfLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKSxcbiAgICAgIF07XG4gICAgICBjb25zdCByb3V0ZUNvbm5lY3Rpb25zID0gW1xuICAgICAgICBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKHN0YXJ0VG9Sb3V0ZSkpLFxuICAgICAgICBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKHJvdXRlVG9FbmQpKSxcbiAgICAgIF07XG5cbiAgICAgIC8vIGFkZCB0aGVtIHRvIHRoZSBzb3VyY2VcbiAgICAgIHRoaXMucm91dGVTb3VyY2VfLmFkZEZlYXR1cmVzKHJvdXRlQ29ubmVjdGlvbnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxpbXBvcnQoJy4vUm91dGluZ1NlcnZpY2UnKS5Sb3V0ZT59IHJlc3BcbiAgICAgKi9cbiAgICBjb25zdCBvbkVycm9yXyA9IChyZXNwKSA9PiB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdFcnJvcjogcm91dGluZyBzZXJ2ZXIgbm90IHJlc3BvbmRpbmcuJztcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgIH07XG5cbiAgICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZ3xib29sZWFuPn0gKi9cbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgb3B0aW9ucy5zdGVwcyA9IHRydWU7XG4gICAgb3B0aW9ucy5vdmVydmlldyA9IGZhbHNlO1xuICAgIG9wdGlvbnMuZ2VvbWV0cmllcyA9ICdnZW9qc29uJztcblxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCcuL1JvdXRpbmdTZXJ2aWNlJykuQ29uZmlnfSAqL1xuICAgIGNvbnN0IGNvbmZpZyA9IHt9O1xuICAgIGNvbmZpZy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlKSB7XG4gICAgICBjb25maWcuaW5zdGFuY2UgPSB0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUucHJvZmlsZTtcbiAgICB9XG4gICAgdGhpcy4kcV8ud2hlbih0aGlzLm5nZW9Sb3V0aW5nU2VydmljZV8uZ2V0Um91dGUocm91dGUsIGNvbmZpZykpLnRoZW4ob25TdWNjZXNzXywgb25FcnJvcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqL1xuICBhZGRWaWEoKSB7XG4gICAgdGhpcy52aWFBcnJheS5wdXNoKHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQXJyYXkgaW5kZXguXG4gICAqL1xuICBkZWxldGVWaWEoaW5kZXgpIHtcbiAgICBpZiAodGhpcy52aWFBcnJheS5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdGhpcy52aWFBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVSb3V0ZSgpO1xuICAgIH1cbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAnJHNjb3BlJyxcbiAgJ25nZW9Sb3V0aW5nU2VydmljZScsXG4gICduZ2VvTm9taW5hdGltU2VydmljZScsXG4gICckcScsXG4gICduZ2VvRGVib3VuY2UnLFxuICAnbmdlb1JvdXRpbmdPcHRpb25zJyxcbl07XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Sb3V0aW5nJywge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9Sb3V0aW5nTWFwJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwsXG59KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1JbnB1dENvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvaic7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBvbFN0eWxlVGV4dCBmcm9tICdvbC9zdHlsZS9UZXh0JztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbk1vZGlmeSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25EcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL3JvdXRpbmdmZWF0dXJlLmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudCcsIFtcbiAgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWUsXG4gIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQubmFtZSxcbl0pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoXG4gICduZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gICAqL1xuICAoJGF0dHJzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUnO1xuICB9LFxuKTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbmd1bGFyLklBdHRyaWJ1dGVzKTogc3RyaW5nfSBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCBUZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsLiRpbmplY3QgPSBbJyRhdHRycycsICduZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCddO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9ICR0aW1lb3V0IEFuZ3VsYXIgdGltZW91dCBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklRU2VydmljZX0gJHEgQW5ndWxhciBxIHNlcnZpY2VcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlIHNlcnZpY2UgZm9yXG4gKiAgICBOb21pbmF0aW1cbiAqIEBjbGFzc1xuICogQGhpZGRlblxuICogQG5nZG9jIGNvbnRyb2xsZXJcbiAqIEBuZ25hbWUgTmdlb1JvdXRpbmdGZWF0dXJlQ29udHJvbGxlclxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGVcbiAgICogQHBhcmFtIHthbmd1bGFyLklUaW1lb3V0U2VydmljZX0gJHRpbWVvdXRcbiAgICogQHBhcmFtIHthbmd1bGFyLklRU2VydmljZX0gJHFcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX0gbmdlb05vbWluYXRpbVNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHRpbWVvdXQsICRxLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0XyA9ICR0aW1lb3V0O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSVFTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy4kcV8gPSAkcTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubWFwID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqL1xuICAgIHRoaXMuZmVhdHVyZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZmVhdHVyZUxhYmVsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZmlsbENvbG9yID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuc3Ryb2tlQ29sb3IgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/ZnVuY3Rpb24ob2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+KTogdm9pZH1cbiAgICAgKi9cbiAgICB0aGlzLm9uQ2hhbmdlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL0NvbGxlY3Rpb24nKS5kZWZhdWx0PG9sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnZlY3RvckZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy52ZWN0b3JTb3VyY2VfID0gbmV3IG9sU291cmNlVmVjdG9yKHtcbiAgICAgIGZlYXR1cmVzOiB0aGlzLnZlY3RvckZlYXR1cmVzXyxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnZlY3RvckxheWVyXyA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgIGNsYXNzTmFtZTogJ2NhbnZhczJkJyxcbiAgICAgIHNvdXJjZTogdGhpcy52ZWN0b3JTb3VyY2VfLFxuICAgICAgc3R5bGU6IChmZWF0dXJlLCByZXNvbHV0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICAgICAgICB0ZXh0OiBuZXcgb2xTdHlsZVRleHQoe1xuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmZpbGxDb2xvciB8fCAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBmb250OiAnOTAwIDI0cHggXCJGb250IEF3ZXNvbWUgNiBGcmVlXCInLFxuICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5zdHJva2VDb2xvciB8fCAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBvZmZzZXRZOiAtMTUsXG4gICAgICAgICAgICAgIHRleHQ6ICdcXHVmMDQxJywgLy8gbWFwLW1hcmtlclxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSksXG4gICAgICAgIF07XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJhY3Rpb24gZm9yIG1vdmluZyBzdGFydCBhbmQgZW5kLlxuICAgICAqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vTW9kaWZ5JykuZGVmYXVsdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8gPSBuZXcgb2xJbnRlcmFjdGlvbk1vZGlmeSh7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc18sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmRyYXdfID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdH0gc2VsZWN0ZWQgU2VsZWN0ZWQgcmVzdWx0LlxuICAgICAqL1xuICAgIHRoaXMub25TZWxlY3QgPSB0aGlzLm9uU2VsZWN0Xy5iaW5kKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9XG4gICRvbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLnZlY3RvckxheWVyXyk7XG5cbiAgICAvLyBzZXR1cCBtb2RpZnkgaW50ZXJhY3Rpb25cbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZSh0cnVlKTtcbiAgICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1vZGlmeUZlYXR1cmVfKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLm9uKFxuICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL09ic2VydmFibGUnKS5FdmVudFR5cGVzfSAqLyAnbW9kaWZ5ZW5kJyxcbiAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknKS5Nb2RpZnlFdmVudH0gZXZlbnRcbiAgICAgICAqL1xuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGZlYXR1cmUgPSBldmVudC5mZWF0dXJlcy5nZXRBcnJheSgpWzBdO1xuICAgICAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zbmFwRmVhdHVyZV8oLyoqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdD59ICovIGZlYXR1cmUpO1xuICAgICAgfSxcbiAgICApO1xuICAgIHRoaXMuc2NvcGVfLiR3YXRjaChcbiAgICAgICgpID0+IHRoaXMuZmVhdHVyZSxcbiAgICAgIChuZXdWYWwsIG9sZFZhbCkgPT4ge1xuICAgICAgICBpZiAobmV3VmFsKSB7XG4gICAgICAgICAgdGhpcy5vbkZlYXR1cmVDaGFuZ2VfKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgICAgICAgIHRoaXMuZmVhdHVyZUxhYmVsID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbnVwLCBtb3N0bHkgcmVsZXZhbnQgZm9yIHZpYXMuXG4gICAqL1xuICAkb25EZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy52ZWN0b3JMYXllcl8pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm1vZGlmeUZlYXR1cmVfKTtcbiAgfVxuXG4gIC8qKlxuICAgKi9cbiAgc2V0KCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhd18pIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMuZHJhd18pO1xuICAgIH1cbiAgICB0aGlzLmRyYXdfID0gbmV3IG9sSW50ZXJhY3Rpb25EcmF3KHtcbiAgICAgIGZlYXR1cmVzOiB0aGlzLnZlY3RvckZlYXR1cmVzXyxcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgfSk7XG4gICAgdGhpcy5kcmF3Xy5vbigvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdkcmF3c3RhcnQnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5mZWF0dXJlKSB7XG4gICAgICAgIHRoaXMudmVjdG9yU291cmNlXy5yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5kcmF3Xy5vbihcbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9PYnNlcnZhYmxlJykuRXZlbnRUeXBlc30gKi8gJ2RyYXdlbmQnLFxuICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi9cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtpbXBvcnQoJ2xpYi9vbC5pbnRlcmFjdGlvbi5EcmF3JykuRHJhd0V2ZW50fSBldmVudFxuICAgICAgICovXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd18gJiYgdGhpcy5tYXApIHtcbiAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNuYXBGZWF0dXJlXygvKiogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0Pn0gKi8gZXZlbnQuZmVhdHVyZSk7XG4gICAgICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKHRydWUpO1xuICAgICAgfSxcbiAgICApO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IGNvb3JkaW5hdGUgTG9uTGF0IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBGZWF0dXJlIG5hbWUvbGFiZWwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRGZWF0dXJlXyhjb29yZGluYXRlLCBsYWJlbCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNmb3JtZWRDb29yZGluYXRlID0gb2xQcm9qLmZyb21Mb25MYXQoY29vcmRpbmF0ZSwgdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSk7XG4gICAgaWYgKGxhYmVsID09PSAnJykge1xuICAgICAgbGFiZWwgPSB0cmFuc2Zvcm1lZENvb3JkaW5hdGUuam9pbignLycpO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmUgPVxuICAgICAgLyoqIEB0eXBlIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqL1xuICAgICAgbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9pbnQodHJhbnNmb3JtZWRDb29yZGluYXRlKSxcbiAgICAgICAgbmFtZTogbGFiZWwsXG4gICAgICB9KTtcbiAgfVxuICBvbkZlYXR1cmVDaGFuZ2VfKCkge1xuICAgIGlmICghdGhpcy5mZWF0dXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFVwZGF0ZSBsYWJlbFxuICAgIHRoaXMuZmVhdHVyZUxhYmVsID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIHRoaXMuZmVhdHVyZS5nZXQoJ25hbWUnKSB8fCAnJztcblxuICAgIC8vIFVwZGF0ZSB2ZWN0b3Igc291cmNlXG4gICAgdGhpcy52ZWN0b3JTb3VyY2VfLmNsZWFyKCk7XG4gICAgdGhpcy52ZWN0b3JTb3VyY2VfLmFkZEZlYXR1cmUodGhpcy5mZWF0dXJlKTtcblxuICAgIC8vIE5vdGlmeSBvdGhlcnNcbiAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy50aW1lb3V0XygoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZlYXR1cmUgJiYgdGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5mZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdH0gc2VsZWN0ZWQgU2VsZWN0ZWQgcmVzdWx0LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25TZWxlY3RfKHNlbGVjdGVkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHNlbGVjdGVkLmNvb3JkaW5hdGUubWFwKHBhcnNlRmxvYXQpO1xuICAgIGNvbnN0IGxhYmVsID0gc2VsZWN0ZWQubGFiZWw7XG4gICAgdGhpcy5zZXRGZWF0dXJlXyhjb29yZGluYXRlLCBsYWJlbCk7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSAvKiogQHR5cGUge2ltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHR9ICovIHRoaXMuZmVhdHVyZVxuICAgICAgLmdldEdlb21ldHJ5KClcbiAgICAgIC5nZXRDb29yZGluYXRlcygpO1xuICAgIHRoaXMubWFwLmdldFZpZXcoKS5zZXRDZW50ZXIobmV3Q29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNuYXBzIGEgZmVhdHVyZSB0byB0aGUgc3RyZWV0IG5ldHdvcmsgdXNpbmcgdGhlIGdldE5lYXJlc3RcbiAgICogZnVuY3Rpb24gb2YgdGhlIHJvdXRpbmcgc2VydmljZS4gUmVwbGFjZXMgdGhlIGZlYXR1cmUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHQ+fSBmZWF0dXJlIEZlYXR1cmUgdG8gc25hcFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc25hcEZlYXR1cmVfKGZlYXR1cmUpIHtcbiAgICBjb25zdCBjb29yZCA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50XyhmZWF0dXJlKTtcbiAgICBpZiAoIWNvb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gKi9cbiAgICBjb25zdCBjb25maWcgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnLi9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHQ+fSByZXNwXG4gICAgICovXG4gICAgY29uc3Qgb25TdWNjZXNzID0gKHJlc3ApID0+IHtcbiAgICAgIGNvbnN0IGxvbiA9IHBhcnNlRmxvYXQocmVzcC5kYXRhLmxvbik7XG4gICAgICBjb25zdCBsYXQgPSBwYXJzZUZsb2F0KHJlc3AuZGF0YS5sYXQpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFtsb24sIGxhdF07XG4gICAgICBjb25zdCBsYWJlbCA9IHJlc3AuZGF0YS5kaXNwbGF5X25hbWU7XG4gICAgICB0aGlzLnNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCcuL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdD59IHJlc3BcbiAgICAgKi9cbiAgICBjb25zdCBvbkVycm9yID0gKHJlc3ApID0+IHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ0Vycm9yOiBub21pbmF0aW0gc2VydmVyIG5vdCByZXNwb25kaW5nLic7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICB9O1xuICAgIHRoaXMuJHFfLndoZW4odGhpcy5uZ2VvTm9taW5hdGltU2VydmljZV8ucmV2ZXJzZShjb29yZCwgY29uZmlnKSkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGZlYXR1cmUgcG9pbnQgaW50byBMb25MYXQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdD59IHBvaW50IEZlYXR1cmUgcG9pbnQgdG8gY29udmVydFxuICAgKiBAcmV0dXJucyB7P2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IExvbkxhdCBjb29yZGluYXRlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRMb25MYXRGcm9tUG9pbnRfKHBvaW50KSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGdlb21ldHJ5ID0gcG9pbnQuZ2V0R2VvbWV0cnkoKTtcbiAgICBjb25zdCBjb29yZHMgPSBnZW9tZXRyeS5nZXRDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHJldHVybiBvbFByb2oudG9Mb25MYXQoY29vcmRzLCBwcm9qZWN0aW9uKTtcbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnJHEnLCAnbmdlb05vbWluYXRpbVNlcnZpY2UnXTtcbi8qKlxuICogUHJvdmlkZXMgYSB0ZXh0IGlucHV0IGFuZCBkcmF3IGludGVyYWN0aW9uIHRvIGFsbG93IGEgdXNlciB0byBjcmVhdGUgYW5kIG1vZGlmeSBhIG9sLkZlYXR1cmVcbiAqIChwb2ludCBnZW9tZXRyeSkuXG4gKlxuICogVGhlIHRleHQgaW5wdXQgaXMgcHJvdmlkZWQgYnkge0BsaW5rIGltcG9ydCgnbmdlby9ub21pbmF0aW1JbnB1dENvbXBvbmVudCcpLmRlZmF1bHR9IGFuZCBpbmNsdWRlc1xuICogTm9taW5hdGltIHNlYXJjaC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcbiAqICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtbWFwPVwiY3RybC5tYXBcIlxuICogICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwiY3RybC5mZWF0dXJlXCJcbiAqICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiM2QkU2MkVcIlxuICogICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIjNENCMDFFXCJcbiAqICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiY3RybC5oYW5kbGVDaGFuZ2VcIj5cbiAqXG4gKiBJcyB1c2VkIGluIGluIHRoZSBwYXJ0aWFsIG9mIHtAbGluayBpbXBvcnQoJ25nZW8vcm91dGluZ0NvbXBvbmVudCcpLmRlZmF1bHR9LlxuICpcbiAqIFNlZSB0aGUgWy4uL2V4YW1wbGVzL3JvdXRpbmcuaHRtbF0oLi4vZXhhbXBsZXMvcm91dGluZy5odG1sKSBleGFtcGxlIGZvciBhIHVzYWdlIHNhbXBsZS5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fSBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXAgVGhlIG1hcC5cbiAqIEBodG1sQXR0cmlidXRlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59IG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmUgVGhlIGZlYXR1cmUuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yIFRoZSBtYXJrZXIgZmlsbCBjb2xvci5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvciBUaGUgbWFya2VyIHN0cm9rZSBjb2xvci5cbiAqIEBodG1sQXR0cmlidXRlIHtmdW5jdGlvbihvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4pfSBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2UgRXZlbnQgZmlyZWQgd2hlblxuICogICAgZmVhdHVyZSBjaGFuZ2VzLlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5nbmFtZSBuZ2VvUm91dGluZ0ZlYXR1cmVcbiAqL1xuY29uc3Qgcm91dGluZ0ZlYXR1cmVDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc8bmdlb1JvdXRpbmdGZWF0dXJlTWFwJyxcbiAgICAnZmVhdHVyZSc6ICc9bmdlb1JvdXRpbmdGZWF0dXJlRmVhdHVyZScsXG4gICAgJ2ZpbGxDb2xvcic6ICc8P25nZW9Sb3V0aW5nRmVhdHVyZUZpbGxDb2xvcicsXG4gICAgJ3N0cm9rZUNvbG9yJzogJzw/bmdlb1JvdXRpbmdGZWF0dXJlU3Ryb2tlQ29sb3InLFxuICAgICdvbkNoYW5nZSc6ICc9P25nZW9Sb3V0aW5nRmVhdHVyZU9uQ2hhbmdlJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb1JvdXRpbmdGZWF0dXJlJywgcm91dGluZ0ZlYXR1cmVDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJSb3V0aW5nU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICduZ2VvUm91dGluZ09wdGlvbnMnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gYVxuICogW09wZW4gU291cmNlIFJvdXRpbmcgTWFjaGluZSAoT1NSTSkgYmFja2VuZF0oaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQpXG4gKiBvZiB2ZXJzaW9uIDUuOCBhbmQgaGlnaGVyIGFuZCBpdHMgZmVhdHVyZXMuXG4gKlxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwU2VydmljZX0gJGh0dHAgQW5ndWxhciBodHRwIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb1JvdXRpbmdPcHRpb25zfSBuZ2VvUm91dGluZ09wdGlvbnMgVGhlIG9wdGlvbnMuXG4gKiBAY2xhc3NcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmduYW1lIG5nZW9Sb3V0aW5nU2VydmljZVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gUm91dGluZ1NlcnZpY2UoJGh0dHAsIG5nZW9Sb3V0aW5nT3B0aW9ucykge1xuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy4kaHR0cF8gPSAkaHR0cDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb1JvdXRpbmdPcHRpb25zfVxuICAgKi9cbiAgdGhpcy5yb3V0aW5nT3B0aW9uc18gPSBuZ2VvUm91dGluZ09wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFVSTCBmb3IgT1NSTSBiYWNrZW5kIEFQSS5cbiAgICogRGVmYXVsdHMgdG8gZGVtbyBiYWNrZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfID0gdGhpcy5yb3V0aW5nT3B0aW9uc18uYmFja2VuZFVybCB8fCAnaHR0cHM6Ly9yb3V0ZXIucHJvamVjdC1vc3JtLm9yZy8nO1xuXG4gIC8vIHRoZSB1cmwgaXMgZXhwZWN0ZWQgdG8gZW5kIHdpdGggYSBzbGFzaFxuICBpZiAodGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXyArPSAnLyc7XG4gIH1cblxuICAvKipcbiAgICogVmVyc2lvbiBvZiB0aGUgcHJvdG9jb2wgaW1wbGVtZW50ZWQgYnkgdGhlIHNlcnZpY2UuXG4gICAqIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQvYmxvYi9tYXN0ZXIvZG9jcy9odHRwLm1kXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLnByb3RvY29sVmVyc2lvbl8gPSAndjEnO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzZXJ2aWNlXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtwcm9maWxlXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtpbnN0YW5jZV1cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0PHN0cmluZywgc3RyaW5nfGJvb2xlYW4+fSBbb3B0aW9uc11cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJvdXRlc1xuICogQHByb3BlcnR5IHtSb3V0ZVtdfSByb3V0ZXNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJvdXRlXG4gKiBAcHJvcGVydHkge0xlZ1tdfSBbbGVnc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZ2VvbWV0cnldXG4gKiBAcHJvcGVydHkge251bWJlcn0gZGlzdGFuY2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkdXJhdGlvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTGVnXG4gKiBAcHJvcGVydHkge1N0ZXBbXX0gc3RlcHNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0ZXBcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBnZW9tZXRyeVxuICovXG5cbi8qKlxuICogUm91dGUgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZVtdfSBjb29yZGluYXRlcyBjb29yZGluYXRlcyBvZiB0aGUgcm91dGUgKGF0IGxlYXN0IHR3byEpXG4gKiBAcGFyYW0gez9Db25maWd9IGNvbmZpZyBvcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JSHR0cFByb21pc2U8Um91dGVzPn0gcHJvbWlzZSBvZiB0aGUgT1NSTSBBUEkgcmVxdWVzdFxuICovXG5Sb3V0aW5nU2VydmljZS5wcm90b3R5cGUuZ2V0Um91dGUgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGNvbmZpZykge1xuICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgLy8gU2VydmljZVxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kL2Jsb2IvbWFzdGVyL2RvY3MvaHR0cC5tZCNyZXF1ZXN0c1xuICBpZiAoIWNvbmZpZy5zZXJ2aWNlKSB7XG4gICAgY29uZmlnLnNlcnZpY2UgPSAncm91dGUnOyAvLyBkZWZhdWx0IGlzIHJvdXRlXG4gIH1cblxuICAvLyBNb2RlIG9mIHRyYW5zcG9ydGF0aW9uLFxuICAvLyBjYW4gYmU6IGNhciwgYmlrZSwgZm9vdFxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qcm9qZWN0LU9TUk0vb3NybS1iYWNrZW5kL2Jsb2IvbWFzdGVyL2RvY3MvaHR0cC5tZCNyZXF1ZXN0c1xuICAvL1xuICAvLyBBcyBvZiB2ZXJzaW9uIDUuOC4wLCBPU1JNIChzZXJ2ZXIpIGRvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgcHJvZmlsZXMgc2ltdWx0YW5lb3VzbHkuXG4gIC8vIFRoaXMgbWVhbnMgdGhlIHZhbHVlIGFjdHVhbGx5IGRvZXMgbm90IG1hdHRlci5cbiAgaWYgKCFjb25maWcucHJvZmlsZSkge1xuICAgIGNvbmZpZy5wcm9maWxlID0gJ2Nhcic7IC8vIGRlZmF1bHQgaXMgY2FyXG4gIH1cblxuICAvLyBidWlsZCByZXF1ZXN0IFVSTFxuICBsZXQgdXJsID0gdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfO1xuXG4gIC8vIENvbW1vbiB3b3JrYXJvdW5kIHRvIHByb3ZpZGUgbXVsdGlwbGUgcHJvZmlsZXMgKHNpbmNlIGl0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0KVxuICAvLyBFdmVyeSBwcm9maWxlIHJ1bnMgb24gaXRzIG93biBpbnN0YW5jZS5cbiAgaWYgKGNvbmZpZy5pbnN0YW5jZSkge1xuICAgIHVybCArPSBgJHtjb25maWcuaW5zdGFuY2V9L2A7XG4gIH1cbiAgdXJsICs9IGAke2NvbmZpZy5zZXJ2aWNlfS8ke3RoaXMucHJvdG9jb2xWZXJzaW9uX30vJHtjb25maWcucHJvZmlsZX0vYDtcblxuICAvLyBbIFthLGJdICwgW2MsZF0gXSAtPiAnYSxiO2MsZCdcbiAgY29uc3QgY29vcmRpbmF0ZVN0cmluZyA9IGNvb3JkaW5hdGVzLm1hcCgoYykgPT4gYy5qb2luKCcsJykpLmpvaW4oJzsnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG5cbiAgLy8gbG9vayBmb3Igcm91dGUgc2VydmljZSBvcHRpb25zXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQvYmxvYi9tYXN0ZXIvZG9jcy9odHRwLm1kI3JvdXRlLXNlcnZpY2VcbiAgaWYgKGNvbmZpZy5vcHRpb25zKSB7XG4gICAgdXJsICs9ICc/JztcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMoY29uZmlnLm9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke2NvbmZpZy5vcHRpb25zW29wdGlvbl19YCk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuXG4vKipcbiAqIFNuYXBzIGEgY29vcmRpbmF0ZSB0byB0aGUgc3RyZWV0IG5ldHdvcmsgYW5kIHJldHVybnMgdGhlIG5lYXJlc3QgbWF0Y2hcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBxdWVyeVxuICogQHBhcmFtIHs/Q29uZmlnfSBjb25maWcgb3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHJldHVybnMge2FuZ3VsYXIuSUh0dHBQcm9taXNlPE9iamVjdD59IHByb21pc2Ugb2YgdGhlIE9TUk0gQVBJIHJlcXVlc3RcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQvYmxvYi9tYXN0ZXIvZG9jcy9odHRwLm1kI25lYXJlc3Qtc2VydmljZVxuICovXG5Sb3V0aW5nU2VydmljZS5wcm90b3R5cGUuZ2V0TmVhcmVzdCA9IGZ1bmN0aW9uIChjb29yZGluYXRlLCBjb25maWcpIHtcbiAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG4gIC8vIHNlcnZpY2UgaXMgYWx3YXlzIG5lYXJlc3RcbiAgY29uZmlnLnNlcnZpY2UgPSAnbmVhcmVzdCc7XG5cbiAgLy8gTW9kZSBvZiB0cmFuc3BvcnRhdGlvblxuICAvLyBJZiB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYSBnZXRSb3V0ZSByZXF1ZXN0LCBjaG9vc2UgdGhlIHNhbWUgcHJvZmlsZS5cbiAgaWYgKCFjb25maWcucHJvZmlsZSkge1xuICAgIGNvbmZpZy5wcm9maWxlID0gJ2Nhcic7IC8vIGRlZmF1bHQgaXMgY2FyXG4gIH1cblxuICAvLyBidWlsZCByZXF1ZXN0IFVSTFxuICBsZXQgdXJsID0gdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfO1xuXG4gIC8vIENvbW1vbiB3b3JrYXJvdW5kIHRvIHByb3ZpZGUgbXVsdGlwbGUgcHJvZmlsZXMgKHNpbmNlIGl0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0KVxuICAvLyBFdmVyeSBwcm9maWxlIHJ1bnMgb24gaXRzIG93biBpbnN0YW5jZS5cbiAgaWYgKGNvbmZpZy5pbnN0YW5jZSkge1xuICAgIHVybCArPSBgJHtjb25maWcuaW5zdGFuY2V9L2A7XG4gIH1cbiAgdXJsICs9IGAke2NvbmZpZy5zZXJ2aWNlfS8ke3RoaXMucHJvdG9jb2xWZXJzaW9uX30vJHtjb25maWcucHJvZmlsZX0vYDtcblxuICAvLyBbYSxiXSAtPiAnYSxiJ1xuICBjb25zdCBjb29yZGluYXRlU3RyaW5nID0gY29vcmRpbmF0ZS5qb2luKCcsJyk7XG4gIHVybCArPSBjb29yZGluYXRlU3RyaW5nO1xuXG4gIC8vIGxvb2sgZm9yIG5lYXJlc3Qgc2VydmljZSBvcHRpb25zXG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvbn09JHtjb25maWcub3B0aW9uc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ1NlcnZpY2UnLCBbXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvUm91dGluZ1NlcnZpY2UnLCBSb3V0aW5nU2VydmljZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ0NvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudCc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nTW9kdWxlJywgW25nZW9Sb3V0aW5nUm91dGluZ0NvbXBvbmVudC5uYW1lXSk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLW5vbWluYXRpbS1pbnB1dFwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgIHBsYWNlaG9sZGVyPVwie3skY3RybC5wbGFjZWhvbGRlcn19XCJcbiAgICBuZy1tb2RlbD1cIiRjdHJsLmlucHV0VmFsdWVcIlxuICAgIG5nZW8tc2VhcmNoPVwiJGN0cmwub3B0aW9uc1wiXG4gICAgbmdlby1zZWFyY2gtZGF0YXNldHM9XCIkY3RybC5kYXRhc2V0c1wiXG4gICAgbmdlby1zZWFyY2gtbGlzdGVuZXJzPVwiJGN0cmwubGlzdGVuZXJzXCJcbiAgLz5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmdcIj5cbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1zdGFydCBmb3JtLWdyb3VwXCI+XG4gICAgPG5nZW8tcm91dGluZy1mZWF0dXJlXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCIkY3RybC5tYXBcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cIiRjdHJsLnN0YXJ0RmVhdHVyZV9cIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy5zdGFydEZpbGxcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yPVwiJGN0cmwuY29sb3JzLnN0YXJ0U3Ryb2tlXCJcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiXG4gICAgPlxuICAgIDwvbmdlby1yb3V0aW5nLWZlYXR1cmU+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctdmlhcyBmb3JtLWdyb3VwXCIgbmctcmVwZWF0PVwiKGluZGV4LCB2aWEpIGluICRjdHJsLnZpYUFycmF5XCI+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCIkY3RybC5tYXBcIlxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCJ2aWEuZmVhdHVyZVwiXG4gICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy52aWFGaWxsXCJcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMudmlhU3Ryb2tlXCJcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCIkY3RybC5oYW5kbGVDaGFuZ2VcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmdlby1yb3V0aW5nLWZlYXR1cmU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lIGRlbGV0ZS12aWFcIiBuZy1jbGljaz1cIiRjdHJsLmRlbGV0ZVZpYShpbmRleClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWRlc3RpbmF0aW9uIGZvcm0tZ3JvdXBcIj5cbiAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwiJGN0cmwudGFyZ2V0RmVhdHVyZV9cIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy5kZXN0aW5hdGlvbkZpbGxcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uU3Ryb2tlXCJcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiXG4gICAgPlxuICAgIDwvbmdlby1yb3V0aW5nLWZlYXR1cmU+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZpbGxcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwuY2xlYXJSb3V0ZSgpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9zcGFuPiA8c3BhbiB0cmFuc2xhdGU+Q2xlYXI8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLnJldmVyc2VSb3V0ZSgpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0LWFycm93LWxlZnRcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5SZXZlcnNlPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5hZGRWaWEoKVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS1wbHVzXCI+PC9zcGFuPiA8c3BhbiB0cmFuc2xhdGU+QWRkIHZpYTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XG5cbiAgPGRpdiBuZy1pZj1cIiRjdHJsLnJvdXRpbmdQcm9maWxlcy5sZW5ndGggPiAxXCI+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGNvbC1tZC00XCIgdHJhbnNsYXRlPlByb2ZpbGU8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuZy1tb2RlbD1cIiRjdHJsLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGVcIj5cbiAgICAgICAgICA8b3B0aW9uIG5nLXJlcGVhdD1cInByb2ZpbGUgaW4gJGN0cmwucm91dGluZ1Byb2ZpbGVzXCIgbmctdmFsdWU9XCJwcm9maWxlXCI+e3twcm9maWxlLmxhYmVsfX08L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1lcnJvciBmb3JtLWdyb3VwIGNsZWFyZml4XCIgbmctaGlkZT1cIiRjdHJsLmVycm9yTWVzc2FnZSA9PT0gJydcIj5cbiAgICB7eyRjdHJsLmVycm9yTWVzc2FnZX19XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXG4gIDxkaXYgbmctaGlkZT1cIiRjdHJsLnJvdXRlRHVyYXRpb24gPT09IG51bGwgJiYgJGN0cmwucm91dGVEaXN0YW5jZSA8PSAwXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICA8c3Ryb25nIHRyYW5zbGF0ZT5Sb3V0ZSBzdGF0aXN0aWNzPC9zdHJvbmc+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgbmctaGlkZT1cIiRjdHJsLnJvdXRlRHVyYXRpb24gPT09IG51bGxcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCB0ZXh0LXJpZ2h0XCIgdHJhbnNsYXRlPkR1cmF0aW9uPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj57eyRjdHJsLnJvdXRlRHVyYXRpb24gfCBuZ2VvRHVyYXRpb259fTwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIG5nLWhpZGU9XCIkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCB0ZXh0LXJpZ2h0XCIgdHJhbnNsYXRlPkRpc3RhbmNlPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj57eyRjdHJsLnJvdXRlRGlzdGFuY2UgfCBuZ2VvVW5pdFByZWZpeDonbSd9fTwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmA7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctZmVhdHVyZVwiPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICA8bmdlby1ub21pbmF0aW0taW5wdXRcbiAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LXZhbHVlPVwiJGN0cmwuZmVhdHVyZUxhYmVsXCJcbiAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LXBsYWNlaG9sZGVyPVwie3snU2VhcmNoLi4uJyB8IHRyYW5zbGF0ZX19XCJcbiAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LW9uLXNlbGVjdD1cIiRjdHJsLm9uU2VsZWN0XCJcbiAgICA+XG4gICAgPC9uZ2VvLW5vbWluYXRpbS1pbnB1dD5cbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gYnRuXCIgbmctY2xpY2s9XCIkY3RybC5zZXQoKVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS1sb2NhdGlvbi1waW5cIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiY29uc3QgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0bGV0IG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdGxldCBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHRjb25zdCByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRpZihBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHdoaWxlKGkgPCBkZWZpbml0aW9uLmxlbmd0aCkge1xuXHRcdFx0dmFyIGtleSA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdHZhciBiaW5kaW5nID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdGlmKGJpbmRpbmcgPT09IDApIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiBkZWZpbml0aW9uW2krK10gfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGJpbmRpbmcgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihiaW5kaW5nID09PSAwKSB7IGkrKzsgfVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gc2V0IC5uYW1lIGZvciBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnRzIHBlciBFUyBzcGVjXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmRuID0gKHgpID0+IHtcblx0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoeCwgXCJuYW1lXCIpIHx8IHt9KS53cml0YWJsZSB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkoeCwgXCJuYW1lXCIsIHsgdmFsdWU6IFwiZGVmYXVsdFwiLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG5jb25zdCBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicm91dGluZ1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG5jb25zdCB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHRsZXQgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG5jb25zdCBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbmxldCBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL3JvdXRpbmcuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==