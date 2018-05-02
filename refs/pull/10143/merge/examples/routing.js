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
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcm91dGluZy5zY3NzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9Ob21pbmF0aW1JbnB1dENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvTm9taW5hdGltU2VydmljZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcm91dGluZy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL25vbWluYXRpbWlucHV0Lmh0bWwuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9yb3V0aW5nL3JvdXRpbmcuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8qKlxuICogVGhpcyBleGFtcGxlIHNob3dzIHRoZSBuZ2VvIHJvdXRpbmcgZGlyZWN0aXZlLlxuICovXG5pbXBvcnQgJy4vcm91dGluZy5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdNb2R1bGUgZnJvbSAnbmdlby9yb3V0aW5nL21vZHVsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIG5nZW9Sb3V0aW5nTW9kdWxlLm5hbWVdKTtcblxuLyoqXG4gKiBUaGUgYXBwbGljYXRpb24ncyBtYWluIGRpcmVjdGl2ZS5cbiAqXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFs5MzEwMTAuMTUzNTk4OTQ0MiwgNTk2MTcwNS44NDIyOTcyNTRdLFxuICAgICAgem9vbTogOSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5yb3V0aW5nUGFuZWxBY3RpdmUgPSB0cnVlO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1JvdXRpbmdPcHRpb25zJywge30pO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Ob21pbmF0aW1VcmwnLCAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvJyk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMnLCB7fSk7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NvcGUnLCAnbmdlb05vbWluYXRpbVNlcnZpY2UnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9TZWFyY2hTZWFyY2hEaXJlY3RpdmUgZnJvbSAnbmdlby9zZWFyY2gvc2VhcmNoRGlyZWN0aXZlJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL25vbWluYXRpbWlucHV0Lmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQnLCBbXG4gIG5nZW9TZWFyY2hTZWFyY2hEaXJlY3RpdmUubmFtZSxcbiAgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWUsXG5dKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL25vbWluYXRpbWlucHV0JywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL3JvdXRpbmcvbm9taW5hdGltaW5wdXQnO1xuICB9LFxuKTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbmd1bGFyLklBdHRyaWJ1dGVzKTogc3RyaW5nfSBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmxcbiAqICAgIFRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xubmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXG4gICckYXR0cnMnLFxuICAnbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsJyxcbl07XG5mdW5jdGlvbiBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwoXG4gICRhdHRycyxcbiAgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsLFxuKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlIHNlcnZpY2UgZm9yXG4gKiAgICBOb21pbmF0aW1cbiAqIEBjbGFzc1xuICogQGhpZGRlblxuICogQG5nZG9jIGNvbnRyb2xsZXJcbiAqIEBuZ25hbWUgTmdlb05vbWluYXRpbUlucHV0Q29udHJvbGxlclxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcigkZWxlbWVudCwgJHNjb3BlLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICAvKipcbiAgICogQHR5cGUge0pRdWVyeX1cbiAgICovXG4gIHRoaXMuZWxlbWVudF8gPSAkZWxlbWVudDtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlcnZpY2V9XG4gICAqL1xuICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/ZnVuY3Rpb24oT2JqZWN0KTogdm9pZH1cbiAgICovXG4gIHRoaXMub25TZWxlY3QgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICovXG4gIHRoaXMuaW5wdXRWYWx1ZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtUd2l0dGVyLlR5cGVhaGVhZC5PcHRpb25zfVxuICAgKi9cbiAgdGhpcy5vcHRpb25zID0gLyoqIEB0eXBlIHtUd2l0dGVyLlR5cGVhaGVhZC5PcHRpb25zfSAqLyB7fTtcblxuICAvKipcbiAgICogQHR5cGUge1R3aXR0ZXIuVHlwZWFoZWFkLkRhdGFzZXQ8aW1wb3J0KCcuL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHQ+W119XG4gICAqL1xuICB0aGlzLmRhdGFzZXRzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdub21pbmF0aW0nLFxuICAgICAgZGlzcGxheTogJ25hbWUnLFxuICAgICAgc291cmNlOiB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlLnR5cGVhaGVhZFNvdXJjZURlYm91bmNlZCxcbiAgICB9LFxuICBdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3NlYXJjaC9zZWFyY2hEaXJlY3RpdmUnKS5TZWFyY2hEaXJlY3RpdmVMaXN0ZW5lcnM8aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdD59XG4gICAqL1xuICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICBzZWxlY3Q6IHRoaXMuc2VsZWN0Xy5iaW5kKHRoaXMpLFxuICB9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5wbGFjZWhvbGRlciA9ICcnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SlF1ZXJ5LkV2ZW50fSBldmVudCBFdmVudC5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdH0gc3VnZ2VzdGlvbiBTdWdnZXN0aW9uLlxuICogQHBhcmFtIHtUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXN1bHQ+fSBkYXRhc2V0IERhdGFzZXQuXG4gKiBAaGlkZGVuXG4gKi9cbkNvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdF8gPSBmdW5jdGlvbiAoZXZlbnQsIHN1Z2dlc3Rpb24sIGRhdGFzZXQpIHtcbiAgaWYgKHRoaXMub25TZWxlY3QpIHtcbiAgICB0aGlzLm9uU2VsZWN0KHN1Z2dlc3Rpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIElucHV0IGZvcm0gZmllbGQgd2hpY2ggcHJvdmlkZXMgTm9taW5hdGltIHR5cGVhaGVhZCBsb29rdXAgdXNpbmdcbiAqIHtAbGluayBpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuZGVmYXVsdH0uXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgPG5nZW8tbm9taW5hdGltLWlucHV0XG4gKiAgICAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LXZhbHVlPVwiY3RybC5sYWJlbFwiXG4gKiAgICAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LXBsYWNlaG9sZGVyPVwidHlwZSB0byBzZWFyY2hcIlxuICogICAgICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1vbi1zZWxlY3Q9XCJjdHJsLm9uU2VsZWN0XCI+XG4gKlxuICogSXMgdXNlZCBpbiBpbiB0aGUgcGFydGlhbCBvZiB7QGxpbmsgaW1wb3J0KCduZ2VvL3JvdXRpbmdGZWF0dXJlQ29tcG9uZW50JykuZGVmYXVsdH0uXG4gKlxuICogU2VlIHRoZSBbLi4vZXhhbXBsZXMvcm91dGluZy5odG1sXSguLi9leGFtcGxlcy9yb3V0aW5nLmh0bWwpIGV4YW1wbGUgdG8gc2VlIGl0IGluIGFjdGlvbi5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7ZnVuY3Rpb24oaW1wb3J0KCduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3VsdCl9XG4gKiAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1vbi1zZWxlY3QgRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBuZXcgc3VnZ2VzdGlvbi5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IG5nZW8tbm9taW5hdGltLWlucHV0LXZhbHVlXG4gKiAgVmFsdWUgb2YgaW5wdXQgZmllbGQsIHdpbGwgYmUgc2V0IHRvIHRoZSBsYWJlbCBvZiB0aGUgc2VhcmNoIHJlc3VsdC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IG5nZW8tbm9taW5hdGltLWlucHV0LXBsYWNlaG9sZGVyXG4gKiAgUGxhY2Vob2xkZXIgdGV4dCwgd2hlbiBmaWVsZCBpcyBlbXB0eS5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgbmdlb05vbWluYXRpbUlucHV0XG4gKi9cbmNvbnN0IHJvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICAnb25TZWxlY3QnOiAnPT9uZ2VvTm9taW5hdGltSW5wdXRPblNlbGVjdCcsXG4gICAgJ2lucHV0VmFsdWUnOiAnPT9uZ2VvTm9taW5hdGltSW5wdXRWYWx1ZScsXG4gICAgJ3BsYWNlaG9sZGVyJzogJ0A/bmdlb05vbWluYXRpbUlucHV0UGxhY2Vob2xkZXInLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb05vbWluYXRpbUlucHV0Jywgcm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiTm9taW5hdGltU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICduZ2VvRGVib3VuY2UnLCAnbmdlb05vbWluYXRpbVVybCcsICduZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcyddO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE5vbWluYXRpbVNlYXJjaFJlc3VsdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbGFiZWxdXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBjb29yZGluYXRlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBOb21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRpc3BsYXlfbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxhdFxuICovXG5cbi8qKlxuICogU2VydmljZSB0byBwcm92aWRlIGFjY2VzcyB0byBOb21pbmF0aW0sIHdoaWNoIGFsbG93cyB0byBzZWFyY2ggZm9yXG4gKiBPU00gZGF0YSBieSBuYW1lIGFuZCBhZGRyZXNzLlxuICpcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIEFuZ3VsYXIgaHR0cCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihzdHJpbmcsIGZ1bmN0aW9uKE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKTogdm9pZCwgKGZ1bmN0aW9uKE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKTogdm9pZCl8dW5kZWZpbmVkKTogdm9pZD59ICBuZ2VvRGVib3VuY2VcbiAqICAgIG5nZW8gRGVib3VuY2Ugc2VydmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuZ2VvTm9taW5hdGltVXJsIFRoZSBub21pbmF0aW0gVVJMLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zfSBuZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcyBUaGUgc2VhcmNoIHBhcmFtZXRlcnNcbiAqIEBjbGFzc1xuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuZ25hbWUgbmdlb05vbWluYXRpbVNlcnZpY2VcbiAqIEBzZWUgaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvTm9taW5hdGltXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBOb21pbmF0aW1TZXJ2aWNlKCRodHRwLCBuZ2VvRGVib3VuY2UsIG5nZW9Ob21pbmF0aW1VcmwsIG5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLiRodHRwXyA9ICRodHRwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL21pc2MvZGVib3VuY2UnKS5taXNjRGVib3VuY2U8ZnVuY3Rpb24oc3RyaW5nLCBmdW5jdGlvbihOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSk6IHZvaWQsIChmdW5jdGlvbihOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSk6IHZvaWQpfHVuZGVmaW5lZCk6IHZvaWQ+fVxuICAgKi9cbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuXG4gIC8qKlxuICAgKiBVUkwgZm9yIE5vbWluYXRpbSBiYWNrZW5kXG4gICAqIERlZmF1bHRzIG9wZW5zdHJlZXRtYXAgaW5zdGFuY2UuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLm5vbWluYXRpbVVybF8gPSBuZ2VvTm9taW5hdGltVXJsO1xuXG4gIC8vIHRoZSB1cmwgaXMgZXhwZWN0ZWQgdG8gZW5kIHdpdGggYSBzbGFzaFxuICBpZiAodGhpcy5ub21pbmF0aW1VcmxfLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHRoaXMubm9taW5hdGltVXJsXyArPSAnLyc7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXN9XG4gICAqL1xuICB0aGlzLnNlYXJjaERlZmF1bHRQYXJhbXNfID0gbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXM7XG5cbiAgLyoqXG4gICAqIERlbGF5IChpbiBtaWxsaXNlY29uZHMpIHRvIGF2b2lkIGNhbGxpbmcgdGhlIEFQSSB0b28gb2Z0ZW4uXG4gICAqIE9ubHkgaWYgdGhlcmUgd2VyZSBubyBjYWxscyBmb3IgdGhhdCBtYW55IG1pbGxpc2Vjb25kcyxcbiAgICogdGhlIGxhc3QgY2FsbCB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgdGhpcy50eXBlYWhlYWREZWJvdW5jZURlbGF5XyA9IDUwMDtcblxuICAvKipcbiAgICogQHR5cGUgeyhxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogTm9taW5hdGltU2VhcmNoUmVzdWx0W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0czogKChyZXN1bHQ6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkgPT4gdm9pZH1cbiAgICovXG4gIHRoaXMudHlwZWFoZWFkU291cmNlRGVib3VuY2VkID0gdGhpcy5uZ2VvRGVib3VuY2VfKFxuICAgIHRoaXMudHlwZWFoZWFkU291cmNlXy5iaW5kKHRoaXMpLFxuICAgIHRoaXMudHlwZWFoZWFkRGVib3VuY2VEZWxheV8sXG4gICAgdHJ1ZSxcbiAgKTtcbn1cblxuLyoqXG4gKiBTZWFyY2ggYnkgbmFtZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSBTZWFyY2ggcXVlcnlcbiAqIEBwYXJhbSB7P09iamVjdDxzdHJpbmcsIHN0cmluZz59IHBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JSHR0cFByb21pc2U8Tm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHRbXT59IHByb21pc2Ugb2YgdGhlIE5vbWluYXRpbSBBUEkgcmVxdWVzdFxuICogQHNlZSBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9Ob21pbmF0aW0jU2VhcmNoXG4gKi9cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1zKSB7XG4gIGxldCB1cmwgPSBgJHt0aGlzLm5vbWluYXRpbVVybF99c2VhcmNoP3E9JHtxdWVyeX1gO1xuICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VhcmNoRGVmYXVsdFBhcmFtc18sIHBhcmFtcyk7XG5cbiAgLy8gcmVxdWlyZSBKU09OIHJlc3BvbnNlXG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gJyYnO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke3BhcmFtc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuLyoqXG4gKiBSZXZlcnNlIEdlb2NvZGluZ1xuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZX0gY29vcmRpbmF0ZSBTZWFyY2ggY29vcmRpbmF0ZSBpbiBMb25MYXQgcHJvamVjdGlvblxuICogQHBhcmFtIHsoT2JqZWN0PHN0cmluZywgc3RyaW5nPnx1bmRlZmluZWQpfSBwYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHJldHVybnMge2FuZ3VsYXIuSUh0dHBQcm9taXNlPGltcG9ydCgnLi9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHQ+fSBwcm9taXNlIG9mIHRoZSBOb21pbmF0aW0gQVBJIHJlcXVlc3RcbiAqIEBzZWUgaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvTm9taW5hdGltI1JldmVyc2VfR2VvY29kaW5nXG4gKi9cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgcGFyYW1zKSB7XG4gIGxldCB1cmwgPSBgJHt0aGlzLm5vbWluYXRpbVVybF99cmV2ZXJzZWA7XG4gIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyk7XG5cbiAgLy8gY29vcmRpbmF0ZVxuICBwYXJhbXMubG9uID0gYCR7Y29vcmRpbmF0ZVswXX1gO1xuICBwYXJhbXMubGF0ID0gYCR7Y29vcmRpbmF0ZVsxXX1gO1xuXG4gIC8vIHJlcXVpcmUgSlNPTiByZXNwb25zZVxuICBwYXJhbXMuZm9ybWF0ID0gJ2pzb24nO1xuICBpZiAocGFyYW1zKSB7XG4gICAgdXJsICs9ICc/JztcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvbn09JHtwYXJhbXNbb3B0aW9uXX1gKTtcbiAgICB9XG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFNlYXJjaCBxdWVyeVxuICogQHBhcmFtIHsocmVzdWx0OiBOb21pbmF0aW1TZWFyY2hSZXN1bHRbXSkgPT4gdm9pZH0gc3luY1Jlc3VsdHMgQ2FsbGJhY2sgZm9yIHN5bmNocm9ub3VzIGV4ZWN1dGlvbiwgdW51c2VkXG4gKiBAcGFyYW0geyhyZXN1bHQ6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB2b2lkfSBbYXN5bmNSZXN1bHRzXSBDYWxsYmFjayBmb3IgYXN5bmNocm9ub3VzIGV4ZWN1dGlvblxuICovXG5Ob21pbmF0aW1TZXJ2aWNlLnByb3RvdHlwZS50eXBlYWhlYWRTb3VyY2VfID0gZnVuY3Rpb24gKHF1ZXJ5LCBzeW5jUmVzdWx0cywgYXN5bmNSZXN1bHRzKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxOb21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdFtdPn0gcmVzcFxuICAgKi9cbiAgY29uc3Qgb25TdWNjZXNzXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgLyoqXG4gICAgICogUGFyc2VzIHJlc3VsdCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHR9IHJlc3VsdCBSZXN1bHRcbiAgICAgKiBAcmV0dXJucyB7Tm9taW5hdGltU2VhcmNoUmVzdWx0fSBQYXJzZWQgcmVzdWx0XG4gICAgICovXG4gICAgY29uc3QgcGFyc2UgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb29yZGluYXRlOiBbcmVzdWx0LmxvbiwgcmVzdWx0LmxhdF0sXG4gICAgICAgIG5hbWU6IHJlc3VsdC5kaXNwbGF5X25hbWUsXG4gICAgICB9O1xuICAgIH07XG4gICAgaWYgKGFzeW5jUmVzdWx0cykge1xuICAgICAgYXN5bmNSZXN1bHRzKHJlc3AuZGF0YS5tYXAocGFyc2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3luY1Jlc3VsdHMocmVzcC5kYXRhLm1hcChwYXJzZSkpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8Tm9taW5hdGltU2VhcmNoUmVzcG9uc2VSZXN1bHQ+fSByZXNwXG4gICAqL1xuICBjb25zdCBvbkVycm9yXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgaWYgKGFzeW5jUmVzdWx0cykge1xuICAgICAgYXN5bmNSZXN1bHRzKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3luY1Jlc3VsdHMoW10pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zZWFyY2gocXVlcnksIHt9KS50aGVuKG9uU3VjY2Vzc18sIG9uRXJyb3JfKTtcbn07XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb05vbWluYXRpbVNlcnZpY2UnLCBbbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvTm9taW5hdGltU2VydmljZScsIE5vbWluYXRpbVNlcnZpY2UpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ1NlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudCc7XG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQge3RvTG9uTGF0fSBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL3JvdXRpbmcuaHRtbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUm91dGluZ1ZpYVxuICogQHByb3BlcnR5IHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59IFtmZWF0dXJlXVxuICogQHByb3BlcnR5IHtmdW5jdGlvbihpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0KTogdm9pZH0gW29uU2VsZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdDb21wb25lbnQnLCBbXG4gIG5nZW9NaXNjRGVib3VuY2UubmFtZSxcbiAgbmdlb01pc2NGaWx0ZXJzLm5hbWUsXG4gIG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZS5uYW1lLFxuICBuZ2VvUm91dGluZ1JvdXRpbmdTZXJ2aWNlLm5hbWUsXG4gIG5nZW9Sb3V0aW5nUm91dGluZ0ZlYXR1cmVDb21wb25lbnQubmFtZSxcbl0pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvcm91dGluZycsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5teU1vZHVsZS52YWx1ZShcbiAgJ25nZW9Sb3V0aW5nVGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICAgKi9cbiAgKCRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nVGVtcGxhdGVVcmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL3JvdXRpbmcvcm91dGluZyc7XG4gIH0sXG4pO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFuZ3VsYXIuSUF0dHJpYnV0ZXMpOiBzdHJpbmd9IG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvUm91dGluZ1RlbXBsYXRlVXJsLiRpbmplY3QgPSBbJyRhdHRycycsICduZ2VvUm91dGluZ1RlbXBsYXRlVXJsJ107XG5mdW5jdGlvbiBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsKCRhdHRycywgbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG4vKipcbiAqIFRoZSBjb250cm9sbGVyIGZvciB0aGUgcm91dGluZyBkaXJlY3RpdmUuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3JvdXRpbmcvUm91dGluZ1NlcnZpY2UnKS5Sb3V0aW5nU2VydmljZX0gbmdlb1JvdXRpbmdTZXJ2aWNlIHNlcnZpY2UgZm9yIE9TUk1cbiAgICogICAgcm91dGluZy5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX0gbmdlb05vbWluYXRpbVNlcnZpY2Ugc2VydmljZSBmb3JcbiAgICogICAgTm9taW5hdGltLlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVFTZXJ2aWNlfSAkcSBBbmd1bGFyIHEgc2VydmljZVxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9taXNjL2RlYm91bmNlJykubWlzY0RlYm91bmNlPGZ1bmN0aW9uKCk6IHZvaWQ+fSBuZ2VvRGVib3VuY2UgbmdlbyBEZWJvdW5jZVxuICAgKiAgICBzZXJ2aWNlLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb1JvdXRpbmdPcHRpb25zfSBuZ2VvUm91dGluZ09wdGlvbnMgVGhlIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsIG5nZW9Sb3V0aW5nU2VydmljZSwgbmdlb05vbWluYXRpbVNlcnZpY2UsICRxLCBuZ2VvRGVib3VuY2UsIG5nZW9Sb3V0aW5nT3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Sb3V0aW5nU2VydmljZScpLlJvdXRpbmdTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5uZ2VvUm91dGluZ1NlcnZpY2VfID0gbmdlb1JvdXRpbmdTZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZV8gPSBuZ2VvTm9taW5hdGltU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9Sb3V0aW5nT3B0aW9uc31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucm91dGluZ09wdGlvbnNfID0gbmdlb1JvdXRpbmdPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogQXZhaWxhYmxlIHJvdXRpbmcgcHJvZmlsZXMuXG4gICAgICogRXhhbXBsZTogW1xuICAgICAqICAgICAgICAgICAge1xuICAgICAqICAgICAgICAgICAgICBsYWJlbDogJ0NhcicsIC8vIHVzZWQgYXMgbGFiZWwgaW4gdGhlIFVJXG4gICAgICogICAgICAgICAgICAgIHByb2ZpbGU6ICdyb3V0ZWQtY2FyJyAvLyB1c2VkIGFzIHBhcnQgb2YgdGhlIHF1ZXJ5XG4gICAgICogICAgICAgICAgICB9XG4gICAgICogICAgICAgICAgXVxuICAgICAqXG4gICAgICogQHR5cGUge2ltcG9ydCgnbmdlby9vcHRpb25zJykuUm91dGluZ1Byb2ZpbGVbXX1cbiAgICAgKi9cbiAgICB0aGlzLnJvdXRpbmdQcm9maWxlcyA9IHRoaXMucm91dGluZ09wdGlvbnNfLnByb2ZpbGVzIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9pbXBvcnQoJ25nZW8vb3B0aW9ucycpLlJvdXRpbmdQcm9maWxlfVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZSA9IHRoaXMucm91dGluZ1Byb2ZpbGVzLmxlbmd0aCA+IDAgPyB0aGlzLnJvdXRpbmdQcm9maWxlc1swXSA6IG51bGw7XG4gICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUsIHRoaXMuY2FsY3VsYXRlUm91dGUuYmluZCh0aGlzKSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JUVNlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLiRxXyA9ICRxO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAgICovXG4gICAgdGhpcy5tYXAgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICovXG4gICAgdGhpcy5zdGFydEZlYXR1cmVfID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqL1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1JvdXRpbmdWaWFbXX1cbiAgICAgKi9cbiAgICB0aGlzLnZpYUFycmF5ID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgIHN0YXJ0RmlsbDogJyM2QkU2MkUnLFxuICAgICAgc3RhcnRTdHJva2U6ICcjNENCMDFFJyxcbiAgICAgIGRlc3RpbmF0aW9uRmlsbDogJyNGRjNFMTMnLFxuICAgICAgZGVzdGluYXRpb25TdHJva2U6ICcjQ0QzNDEyJyxcbiAgICAgIHZpYUZpbGw6ICcjNzY3Njc2JyxcbiAgICAgIHZpYVN0cm9rZTogJyMwMDAwMDAnLFxuICAgICAgbGluZVJHQkE6ICdyZ2JhKDE2LCAxMTIsIDI5LCAwLjYpJyxcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJvdXRlU291cmNlXyA9IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICBmZWF0dXJlczogW10sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9sYXllci9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yb3V0ZUxheWVyXyA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgIGNsYXNzTmFtZTogJ2NhbnZhczJkJyxcbiAgICAgIHNvdXJjZTogdGhpcy5yb3V0ZVNvdXJjZV8sXG4gICAgICBzdHlsZTogbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmxpbmVSR0JBLFxuICAgICAgICB9KSxcbiAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmxpbmVSR0JBLFxuICAgICAgICAgIHdpZHRoOiA1LFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRGlzdGFuY2Ugb2Ygcm91dGUgaW4gbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBEdXJhdGlvbiBvZiByb3V0ZSBpbiBtaW51dGVzLlxuICAgICAqXG4gICAgICogQHR5cGUgez9udW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yb3V0ZUR1cmF0aW9uID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJlZ2V4SXNGb3JtYXR0ZWRDb29yZCA9IC9cXGQrXFwuXFxkK1xcL1xcZCtcXC5cXGQrLztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9pbnRlcmFjdGlvbi9EcmF3JykuZGVmYXVsdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZHJhd18gPSBudWxsO1xuICAgIGNvbnN0IGRlYm91bmNlRGVsYXkgPSAyMDA7IC8vIGluIG1pbGxpc2Vjb25kc1xuXG4gICAgLyoqXG4gICAgICogRGVib3VuY2VkIGJlY2F1c2UgaW4gc29tZSBjYXNlcyAocmV2ZXJzZSByb3V0ZSkgbXVsdGlwbGUgY2hhbmdlcyBhcmUgZG9uZVxuICAgICAqIGF0IG9uY2UgYW5kIHNwYW0gdGhpcyBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbigpOiB2b2lkfVxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gbmdlb0RlYm91bmNlKHRoaXMuY2FsY3VsYXRlUm91dGUuYmluZCh0aGlzKSwgZGVib3VuY2VEZWxheSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgY29udHJvbGxlclxuICAgKi9cbiAgJG9uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMucm91dGVMYXllcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgc3RhcnQsIGVuZCBhbmQgdmlhcy4gUmVtb3ZlcyBmZWF0dXJlcyBmcm9tIG1hcC5cbiAgICovXG4gIGNsZWFyUm91dGUoKSB7XG4gICAgdGhpcy5zdGFydEZlYXR1cmVfID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldEZlYXR1cmVfID0gbnVsbDtcbiAgICB0aGlzLnZpYUFycmF5ID0gW107XG4gICAgdGhpcy5yb3V0ZURpc3RhbmNlID0gMDtcbiAgICB0aGlzLnJvdXRlRHVyYXRpb24gPSBudWxsO1xuICAgIHRoaXMucm91dGVTb3VyY2VfLmNsZWFyKCk7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBmZWF0dXJlIHBvaW50IGludG8gTG9uTGF0IGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSBwb2ludCBGZWF0dXJlIHBvaW50IHRvIGNvbnZlcnRcbiAgICogQHJldHVybnMgez9pbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBMb25MYXQgY29vcmRpbmF0ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TG9uTGF0RnJvbVBvaW50Xyhwb2ludCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBnZW9tZXRyeSA9IHBvaW50LmdldEdlb21ldHJ5KCk7XG4gICAgaWYgKCEoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21Qb2ludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgdGltZSB2YWx1ZXMgdHlwZScpO1xuICAgIH1cbiAgICBjb25zdCBjb29yZHMgPSBnZW9tZXRyeS5nZXRDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHJldHVybiB0b0xvbkxhdChjb29yZHMsIHByb2plY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsaXAgc3RhcnQgYW5kIHRhcmdldCBhbmQgcmUtY2FsY3VsYXRlIHJvdXRlLlxuICAgKi9cbiAgcmV2ZXJzZVJvdXRlKCkge1xuICAgIC8vIHN3YXAgc3RhcnQgYW5kIHRhcmdldFxuICAgIGNvbnN0IHRtcEZlYXR1cmUgPSB0aGlzLnN0YXJ0RmVhdHVyZV87XG4gICAgdGhpcy5zdGFydEZlYXR1cmVfID0gdGhpcy50YXJnZXRGZWF0dXJlXztcbiAgICB0aGlzLnRhcmdldEZlYXR1cmVfID0gdG1wRmVhdHVyZTtcblxuICAgIC8vIHJldmVyc2Ugdmlhc1xuICAgIHRoaXMudmlhQXJyYXkgPSB0aGlzLnZpYUFycmF5LnJldmVyc2UoKTtcblxuICAgIC8vIHJlY2FsY3VsYXRpb24gaXMgZG9uZSBieSB0aGUgZGVib3VuY2VkIGhhbmRsZUNoYW5nZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuL1JvdXRpbmdTZXJ2aWNlJykuUm91dGV9IHJvdXRlIFJvdXRlcyBvZiBPU1JNIHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX0gcGFyc2VkIHJvdXRlIGZlYXR1cmVzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwYXJzZVJvdXRlXyhyb3V0ZSkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgLyoqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX0gKi9cbiAgICBsZXQgcGFyc2VkUm91dGVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IG9sRm9ybWF0R2VvSlNPTigpO1xuICAgIGNvbnN0IGZvcm1hdENvbmZpZyA9IHtcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpLFxuICAgIH07XG4gICAgLy8gaWYgdGhlcmUgYXJlIHVzZWZ1bCBcImxlZ3NcIiBkYXRhLCBwYXJzZSB0aGlzXG4gICAgaWYgKHJvdXRlLmxlZ3MpIHtcbiAgICAgIC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+W11bXX0gKi9cbiAgICAgIGNvbnN0IHBhcnNlZFJvdXRlc18gPSByb3V0ZS5sZWdzLm1hcCgobGVnKSA9PlxuICAgICAgICBsZWcuc3RlcHMubWFwKFxuICAgICAgICAgIChzdGVwKSA9PlxuICAgICAgICAgICAgbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgICAgICAgIGdlb21ldHJ5OiBmb3JtYXQucmVhZEdlb21ldHJ5KHN0ZXAuZ2VvbWV0cnksIGZvcm1hdENvbmZpZyksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgICAvLyBmbGF0dGVuXG4gICAgICBwYXJzZWRSb3V0ZXMgPSBbXS5jb25jYXQoLi4ucGFyc2VkUm91dGVzXyk7XG4gICAgfSBlbHNlIGlmIChyb3V0ZS5nZW9tZXRyeSkge1xuICAgICAgLy8gb3RoZXJ3aXNlIHBhcnNlIChvdmVydmlldykgZ2VvbWV0cnlcbiAgICAgIHBhcnNlZFJvdXRlcy5wdXNoKFxuICAgICAgICBuZXcgb2xGZWF0dXJlKHtcbiAgICAgICAgICBnZW9tZXRyeTogZm9ybWF0LnJlYWRHZW9tZXRyeShyb3V0ZS5nZW9tZXRyeSwgZm9ybWF0Q29uZmlnKSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkUm91dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqL1xuICBjYWxjdWxhdGVSb3V0ZSgpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRGZWF0dXJlXyB8fCAhdGhpcy50YXJnZXRGZWF0dXJlXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyByZW1vdmUgcmVuZGVyZWQgcm91dGVzXG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8uY2xlYXIoKTtcbiAgICBjb25zdCBjb29yZEZyb20gPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8odGhpcy5zdGFydEZlYXR1cmVfKTtcbiAgICBjb25zdCBjb29yZFRvID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHRoaXMudGFyZ2V0RmVhdHVyZV8pO1xuICAgIGNvbnN0IHZpYXMgPSB0aGlzLnZpYUFycmF5XG4gICAgICAuZmlsdGVyKCh2aWEpID0+IHZpYS5mZWF0dXJlICE9PSBudWxsKVxuICAgICAgLm1hcCgodmlhKSA9PiB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8odmlhLmZlYXR1cmUpKTtcbiAgICBjb25zdCByb3V0ZSA9IC8qKiBAdHlwZSB7bnVtYmVyW11bXX0gKi8gW2Nvb3JkRnJvbV0uY29uY2F0KHZpYXMsIFtjb29yZFRvXSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxpbXBvcnQoJy4vUm91dGluZ1NlcnZpY2UnKS5Sb3V0ZXM+fSByZXNwXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgY29uc3Qgb25TdWNjZXNzXyA9IChyZXNwKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubWFwIHx8ICF0aGlzLnN0YXJ0RmVhdHVyZV8gfHwgIXRoaXMudGFyZ2V0RmVhdHVyZV8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLnBhcnNlUm91dGVfKHJlc3AuZGF0YS5yb3V0ZXNbMF0pO1xuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTm8gcm91dGUgb3Igbm90IHN1cHBvcnRlZCBmb3JtYXQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucm91dGVTb3VyY2VfLmFkZEZlYXR1cmVzKGZlYXR1cmVzKTtcblxuICAgICAgLy8gcmVjZW50ZXIgbWFwIG9uIHJvdXRlXG4gICAgICB0aGlzLm1hcC5nZXRWaWV3KCkuZml0KHRoaXMucm91dGVTb3VyY2VfLmdldEV4dGVudCgpKTtcbiAgICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IHJlc3AuZGF0YS5yb3V0ZXNbMF0uZGlzdGFuY2U7XG4gICAgICB0aGlzLnJvdXRlRHVyYXRpb24gPSByZXNwLmRhdGEucm91dGVzWzBdLmR1cmF0aW9uO1xuXG4gICAgICAvLyBnZXQgZmlyc3QgYW5kIGxhc3QgY29vcmRpbmF0ZSBvZiByb3V0ZVxuICAgICAgY29uc3Qgc3RhcnRSb3V0ZSA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9nZW9tL0xpbmVTdHJpbmcnKS5kZWZhdWx0fSAqLyBmZWF0dXJlc1swXVxuICAgICAgICAuZ2V0R2VvbWV0cnkoKVxuICAgICAgICAuZ2V0Q29vcmRpbmF0ZUF0KDApO1xuICAgICAgY29uc3QgZW5kUm91dGUgPSAvKiogQHR5cGUge2ltcG9ydCgnb2wvZ2VvbS9MaW5lU3RyaW5nJykuZGVmYXVsdH0gKi8gZmVhdHVyZXNbZmVhdHVyZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgLmdldEdlb21ldHJ5KClcbiAgICAgICAgLmdldENvb3JkaW5hdGVBdCgxKTtcblxuICAgICAgLy8gYnVpbGQgZ2VvbWV0cmllcyB0byBjb25uZWN0IHJvdXRlIHRvIHN0YXJ0IGFuZCBlbmQgcG9pbnQgb2YgcXVlcnlcbiAgICAgIGNvbnN0IHN0YXJ0VG9Sb3V0ZSA9IFtcbiAgICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0fSAqLyB0aGlzLnN0YXJ0RmVhdHVyZV8uZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpLFxuICAgICAgICBzdGFydFJvdXRlLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHJvdXRlVG9FbmQgPSBbXG4gICAgICAgIGVuZFJvdXRlLFxuICAgICAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHR9ICovIHRoaXMudGFyZ2V0RmVhdHVyZV8uZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHJvdXRlQ29ubmVjdGlvbnMgPSBbXG4gICAgICAgIG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbUxpbmVTdHJpbmcoc3RhcnRUb1JvdXRlKSksXG4gICAgICAgIG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbUxpbmVTdHJpbmcocm91dGVUb0VuZCkpLFxuICAgICAgXTtcblxuICAgICAgLy8gYWRkIHRoZW0gdG8gdGhlIHNvdXJjZVxuICAgICAgdGhpcy5yb3V0ZVNvdXJjZV8uYWRkRmVhdHVyZXMocm91dGVDb25uZWN0aW9ucyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnLi9Sb3V0aW5nU2VydmljZScpLlJvdXRlPn0gcmVzcFxuICAgICAqL1xuICAgIGNvbnN0IG9uRXJyb3JfID0gKHJlc3ApID0+IHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ0Vycm9yOiByb3V0aW5nIHNlcnZlciBub3QgcmVzcG9uZGluZy4nO1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgfTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nfGJvb2xlYW4+fSAqL1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBvcHRpb25zLnN0ZXBzID0gdHJ1ZTtcbiAgICBvcHRpb25zLm92ZXJ2aWV3ID0gZmFsc2U7XG4gICAgb3B0aW9ucy5nZW9tZXRyaWVzID0gJ2dlb2pzb24nO1xuXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJy4vUm91dGluZ1NlcnZpY2UnKS5Db25maWd9ICovXG4gICAgY29uc3QgY29uZmlnID0ge307XG4gICAgY29uZmlnLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUpIHtcbiAgICAgIGNvbmZpZy5pbnN0YW5jZSA9IHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZS5wcm9maWxlO1xuICAgIH1cbiAgICB0aGlzLiRxXy53aGVuKHRoaXMubmdlb1JvdXRpbmdTZXJ2aWNlXy5nZXRSb3V0ZShyb3V0ZSwgY29uZmlnKSkudGhlbihvblN1Y2Nlc3NfLCBvbkVycm9yXyk7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGFkZFZpYSgpIHtcbiAgICB0aGlzLnZpYUFycmF5LnB1c2goe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBBcnJheSBpbmRleC5cbiAgICovXG4gIGRlbGV0ZVZpYShpbmRleCkge1xuICAgIGlmICh0aGlzLnZpYUFycmF5Lmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB0aGlzLnZpYUFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVJvdXRlKCk7XG4gICAgfVxuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbXG4gICckc2NvcGUnLFxuICAnbmdlb1JvdXRpbmdTZXJ2aWNlJyxcbiAgJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJyxcbiAgJyRxJyxcbiAgJ25nZW9EZWJvdW5jZScsXG4gICduZ2VvUm91dGluZ09wdGlvbnMnLFxuXTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb1JvdXRpbmcnLCB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc8bmdlb1JvdXRpbmdNYXAnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCxcbn0pO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50JztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24nO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUnO1xuaW1wb3J0IG9sU3R5bGVUZXh0IGZyb20gJ29sL3N0eWxlL1RleHQnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbEludGVyYWN0aW9uTW9kaWZ5IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkRyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vcm91dGluZ2ZlYXR1cmUuaHRtbCc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50JywgW1xuICBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSxcbiAgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudC5uYW1lLFxuXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vcm91dGluZy9yb3V0aW5nZmVhdHVyZScsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5teU1vZHVsZS52YWx1ZShcbiAgJ25nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9yb3V0aW5nZmVhdHVyZSc7XG4gIH0sXG4pO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFuZ3VsYXIuSUF0dHJpYnV0ZXMpOiBzdHJpbmd9IG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsIFRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwuJGluamVjdCA9IFsnJGF0dHJzJywgJ25nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsJ107XG5mdW5jdGlvbiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICogQHBhcmFtIHthbmd1bGFyLklUaW1lb3V0U2VydmljZX0gJHRpbWVvdXQgQW5ndWxhciB0aW1lb3V0IHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVFTZXJ2aWNlfSAkcSBBbmd1bGFyIHEgc2VydmljZVxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VydmljZX0gbmdlb05vbWluYXRpbVNlcnZpY2Ugc2VydmljZSBmb3JcbiAqICAgIE5vbWluYXRpbVxuICogQGNsYXNzXG4gKiBAaGlkZGVuXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBOZ2VvUm91dGluZ0ZlYXR1cmVDb250cm9sbGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZVxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfSAkdGltZW91dFxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVFTZXJ2aWNlfSAkcVxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfSBuZ2VvTm9taW5hdGltU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkdGltZW91dCwgJHEsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnRpbWVvdXRfID0gJHRpbWVvdXQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JUVNlcnZpY2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLiRxXyA9ICRxO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZV8gPSBuZ2VvTm9taW5hdGltU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5tYXAgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICovXG4gICAgdGhpcy5mZWF0dXJlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5mZWF0dXJlTGFiZWwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5maWxsQ29sb3IgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5zdHJva2VDb2xvciA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9mdW5jdGlvbihvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4pOiB2b2lkfVxuICAgICAqL1xuICAgIHRoaXMub25DaGFuZ2UgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvQ29sbGVjdGlvbicpLmRlZmF1bHQ8b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudmVjdG9yRmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnZlY3RvclNvdXJjZV8gPSBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfLFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudmVjdG9yTGF5ZXJfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgY2xhc3NOYW1lOiAnY2FudmFzMmQnLFxuICAgICAgc291cmNlOiB0aGlzLnZlY3RvclNvdXJjZV8sXG4gICAgICBzdHlsZTogKGZlYXR1cmUsIHJlc29sdXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgICAgICAgIHRleHQ6IG5ldyBvbFN0eWxlVGV4dCh7XG4gICAgICAgICAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZmlsbENvbG9yIHx8ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGZvbnQ6ICc5MDAgMjRweCBcIkZvbnQgQXdlc29tZSA2IEZyZWVcIicsXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG9mZnNldFk6IC0xNSxcbiAgICAgICAgICAgICAgdGV4dDogJ1xcdWYwNDEnLCAvLyBtYXAtbWFya2VyXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcmFjdGlvbiBmb3IgbW92aW5nIHN0YXJ0IGFuZCBlbmQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknKS5kZWZhdWx0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXyA9IG5ldyBvbEludGVyYWN0aW9uTW9kaWZ5KHtcbiAgICAgIGZlYXR1cmVzOiB0aGlzLnZlY3RvckZlYXR1cmVzXyxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9pbnRlcmFjdGlvbi9EcmF3JykuZGVmYXVsdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZHJhd18gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0fSBzZWxlY3RlZCBTZWxlY3RlZCByZXN1bHQuXG4gICAgICovXG4gICAgdGhpcy5vblNlbGVjdCA9IHRoaXMub25TZWxlY3RfLmJpbmQodGhpcyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gIH1cbiAgJG9uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMudmVjdG9yTGF5ZXJfKTtcblxuICAgIC8vIHNldHVwIG1vZGlmeSBpbnRlcmFjdGlvblxuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKHRydWUpO1xuICAgIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubW9kaWZ5RmVhdHVyZV8pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8ub24oXG4gICAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdtb2RpZnllbmQnLFxuICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi9cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtpbXBvcnQoJ29sL2ludGVyYWN0aW9uL01vZGlmeScpLk1vZGlmeUV2ZW50fSBldmVudFxuICAgICAgICovXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZmVhdHVyZSA9IGV2ZW50LmZlYXR1cmVzLmdldEFycmF5KClbMF07XG4gICAgICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNuYXBGZWF0dXJlXygvKiogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0Pn0gKi8gZmVhdHVyZSk7XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKFxuICAgICAgKCkgPT4gdGhpcy5mZWF0dXJlLFxuICAgICAgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICAgIGlmIChuZXdWYWwpIHtcbiAgICAgICAgICB0aGlzLm9uRmVhdHVyZUNoYW5nZV8oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3VmFsID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy52ZWN0b3JTb3VyY2VfLmNsZWFyKCk7XG4gICAgICAgICAgdGhpcy5mZWF0dXJlTGFiZWwgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFudXAsIG1vc3RseSByZWxldmFudCBmb3Igdmlhcy5cbiAgICovXG4gICRvbkRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLnZlY3RvckxheWVyXyk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMubWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMubW9kaWZ5RmVhdHVyZV8pO1xuICB9XG5cbiAgLyoqXG4gICAqL1xuICBzZXQoKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmF3Xykge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd18gPSBuZXcgb2xJbnRlcmFjdGlvbkRyYXcoe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfLFxuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICB9KTtcbiAgICB0aGlzLmRyYXdfLm9uKC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9PYnNlcnZhYmxlJykuRXZlbnRUeXBlc30gKi8gJ2RyYXdzdGFydCcsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmZlYXR1cmUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JTb3VyY2VfLnJlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRyYXdfLm9uKFxuICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL09ic2VydmFibGUnKS5FdmVudFR5cGVzfSAqLyAnZHJhd2VuZCcsXG4gICAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnbGliL29sLmludGVyYWN0aW9uLkRyYXcnKS5EcmF3RXZlbnR9IGV2ZW50XG4gICAgICAgKi9cbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kcmF3XyAmJiB0aGlzLm1hcCkge1xuICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMuZHJhd18pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc25hcEZlYXR1cmVfKC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHQ+fSAqLyBldmVudC5mZWF0dXJlKTtcbiAgICAgICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMuZHJhd18pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZX0gY29vcmRpbmF0ZSBMb25MYXQgY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIEZlYXR1cmUgbmFtZS9sYWJlbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1lZENvb3JkaW5hdGUgPSBvbFByb2ouZnJvbUxvbkxhdChjb29yZGluYXRlLCB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpKTtcbiAgICBpZiAobGFiZWwgPT09ICcnKSB7XG4gICAgICBsYWJlbCA9IHRyYW5zZm9ybWVkQ29vcmRpbmF0ZS5qb2luKCcvJyk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9XG4gICAgICAvKiogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59ICovXG4gICAgICBuZXcgb2xGZWF0dXJlKHtcbiAgICAgICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludCh0cmFuc2Zvcm1lZENvb3JkaW5hdGUpLFxuICAgICAgICBuYW1lOiBsYWJlbCxcbiAgICAgIH0pO1xuICB9XG4gIG9uRmVhdHVyZUNoYW5nZV8oKSB7XG4gICAgaWYgKCF0aGlzLmZlYXR1cmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVXBkYXRlIGxhYmVsXG4gICAgdGhpcy5mZWF0dXJlTGFiZWwgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gdGhpcy5mZWF0dXJlLmdldCgnbmFtZScpIHx8ICcnO1xuXG4gICAgLy8gVXBkYXRlIHZlY3RvciBzb3VyY2VcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuXG4gICAgLy8gTm90aWZ5IG90aGVyc1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnRpbWVvdXRfKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZSAmJiB0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJykuTm9taW5hdGltU2VhcmNoUmVzdWx0fSBzZWxlY3RlZCBTZWxlY3RlZCByZXN1bHQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvblNlbGVjdF8oc2VsZWN0ZWQpIHtcbiAgICBjb25zdCBjb29yZGluYXRlID0gc2VsZWN0ZWQuY29vcmRpbmF0ZS5tYXAocGFyc2VGbG9hdCk7XG4gICAgY29uc3QgbGFiZWwgPSBzZWxlY3RlZC5sYWJlbDtcbiAgICB0aGlzLnNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKTtcbiAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdH0gKi8gdGhpcy5mZWF0dXJlXG4gICAgICAuZ2V0R2VvbWV0cnkoKVxuICAgICAgLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLnNldENlbnRlcihuZXdDb29yZGluYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogU25hcHMgYSBmZWF0dXJlIHRvIHRoZSBzdHJlZXQgbmV0d29yayB1c2luZyB0aGUgZ2V0TmVhcmVzdFxuICAgKiBmdW5jdGlvbiBvZiB0aGUgcm91dGluZyBzZXJ2aWNlLiBSZXBsYWNlcyB0aGUgZmVhdHVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdD59IGZlYXR1cmUgRmVhdHVyZSB0byBzbmFwXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzbmFwRmVhdHVyZV8oZmVhdHVyZSkge1xuICAgIGNvbnN0IGNvb3JkID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKGZlYXR1cmUpO1xuICAgIGlmICghY29vcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSAqL1xuICAgIGNvbnN0IGNvbmZpZyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCcuL05vbWluYXRpbVNlcnZpY2UnKS5Ob21pbmF0aW1TZWFyY2hSZXNwb25zZVJlc3VsdD59IHJlc3BcbiAgICAgKi9cbiAgICBjb25zdCBvblN1Y2Nlc3MgPSAocmVzcCkgPT4ge1xuICAgICAgY29uc3QgbG9uID0gcGFyc2VGbG9hdChyZXNwLmRhdGEubG9uKTtcbiAgICAgIGNvbnN0IGxhdCA9IHBhcnNlRmxvYXQocmVzcC5kYXRhLmxhdCk7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gW2xvbiwgbGF0XTtcbiAgICAgIGNvbnN0IGxhYmVsID0gcmVzcC5kYXRhLmRpc3BsYXlfbmFtZTtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZV8oY29vcmRpbmF0ZSwgbGFiZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxpbXBvcnQoJy4vTm9taW5hdGltU2VydmljZScpLk5vbWluYXRpbVNlYXJjaFJlc3BvbnNlUmVzdWx0Pn0gcmVzcFxuICAgICAqL1xuICAgIGNvbnN0IG9uRXJyb3IgPSAocmVzcCkgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnRXJyb3I6IG5vbWluYXRpbSBzZXJ2ZXIgbm90IHJlc3BvbmRpbmcuJztcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgIH07XG4gICAgdGhpcy4kcV8ud2hlbih0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXy5yZXZlcnNlKGNvb3JkLCBjb25maWcpKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgZmVhdHVyZSBwb2ludCBpbnRvIExvbkxhdCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0Pn0gcG9pbnQgRmVhdHVyZSBwb2ludCB0byBjb252ZXJ0XG4gICAqIEByZXR1cm5zIHs/aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZX0gTG9uTGF0IGNvb3JkaW5hdGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldExvbkxhdEZyb21Qb2ludF8ocG9pbnQpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwb2ludC5nZXRHZW9tZXRyeSgpO1xuICAgIGNvbnN0IGNvb3JkcyA9IGdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgcmV0dXJuIG9sUHJvai50b0xvbkxhdChjb29yZHMsIHByb2plY3Rpb24pO1xuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICckcScsICduZ2VvTm9taW5hdGltU2VydmljZSddO1xuLyoqXG4gKiBQcm92aWRlcyBhIHRleHQgaW5wdXQgYW5kIGRyYXcgaW50ZXJhY3Rpb24gdG8gYWxsb3cgYSB1c2VyIHRvIGNyZWF0ZSBhbmQgbW9kaWZ5IGEgb2wuRmVhdHVyZVxuICogKHBvaW50IGdlb21ldHJ5KS5cbiAqXG4gKiBUaGUgdGV4dCBpbnB1dCBpcyBwcm92aWRlZCBieSB7QGxpbmsgaW1wb3J0KCduZ2VvL25vbWluYXRpbUlucHV0Q29tcG9uZW50JykuZGVmYXVsdH0gYW5kIGluY2x1ZGVzXG4gKiBOb21pbmF0aW0gc2VhcmNoLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxuICogICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCJjdHJsLm1hcFwiXG4gKiAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCJjdHJsLmZlYXR1cmVcIlxuICogICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiIzZCRTYyRVwiXG4gKiAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiM0Q0IwMUVcIlxuICogICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCJjdHJsLmhhbmRsZUNoYW5nZVwiPlxuICpcbiAqIElzIHVzZWQgaW4gaW4gdGhlIHBhcnRpYWwgb2Yge0BsaW5rIGltcG9ydCgnbmdlby9yb3V0aW5nQ29tcG9uZW50JykuZGVmYXVsdH0uXG4gKlxuICogU2VlIHRoZSBbLi4vZXhhbXBsZXMvcm91dGluZy5odG1sXSguLi9leGFtcGxlcy9yb3V0aW5nLmh0bWwpIGV4YW1wbGUgZm9yIGEgdXNhZ2Ugc2FtcGxlLlxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcCBUaGUgbWFwLlxuICogQGh0bWxBdHRyaWJ1dGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZSBUaGUgZmVhdHVyZS5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IG5nZW8tcm91dGluZy1mZWF0dXJlLWZpbGwtY29sb3IgVGhlIG1hcmtlciBmaWxsIGNvbG9yLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yIFRoZSBtYXJrZXIgc3Ryb2tlIGNvbG9yLlxuICogQGh0bWxBdHRyaWJ1dGUge2Z1bmN0aW9uKG9sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pil9IG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZSBFdmVudCBmaXJlZCB3aGVuXG4gKiAgICBmZWF0dXJlIGNoYW5nZXMuXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmduYW1lIG5nZW9Sb3V0aW5nRmVhdHVyZVxuICovXG5jb25zdCByb3V0aW5nRmVhdHVyZUNvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvUm91dGluZ0ZlYXR1cmVNYXAnLFxuICAgICdmZWF0dXJlJzogJz1uZ2VvUm91dGluZ0ZlYXR1cmVGZWF0dXJlJyxcbiAgICAnZmlsbENvbG9yJzogJzw/bmdlb1JvdXRpbmdGZWF0dXJlRmlsbENvbG9yJyxcbiAgICAnc3Ryb2tlQ29sb3InOiAnPD9uZ2VvUm91dGluZ0ZlYXR1cmVTdHJva2VDb2xvcicsXG4gICAgJ29uQ2hhbmdlJzogJz0/bmdlb1JvdXRpbmdGZWF0dXJlT25DaGFuZ2UnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvUm91dGluZ0ZlYXR1cmUnLCByb3V0aW5nRmVhdHVyZUNvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIlJvdXRpbmdTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJ25nZW9Sb3V0aW5nT3B0aW9ucyddO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbi8qKlxuICogU2VydmljZSB0byBwcm92aWRlIGFjY2VzcyB0byBhXG4gKiBbT3BlbiBTb3VyY2UgUm91dGluZyBNYWNoaW5lIChPU1JNKSBiYWNrZW5kXShodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZClcbiAqIG9mIHZlcnNpb24gNS44IGFuZCBoaWdoZXIgYW5kIGl0cyBmZWF0dXJlcy5cbiAqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfSAkaHR0cCBBbmd1bGFyIGh0dHAgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvUm91dGluZ09wdGlvbnN9IG5nZW9Sb3V0aW5nT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEBjbGFzc1xuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuZ25hbWUgbmdlb1JvdXRpbmdTZXJ2aWNlXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSb3V0aW5nU2VydmljZSgkaHR0cCwgbmdlb1JvdXRpbmdPcHRpb25zKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLiRodHRwXyA9ICRodHRwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvUm91dGluZ09wdGlvbnN9XG4gICAqL1xuICB0aGlzLnJvdXRpbmdPcHRpb25zXyA9IG5nZW9Sb3V0aW5nT3B0aW9ucztcblxuICAvKipcbiAgICogVVJMIGZvciBPU1JNIGJhY2tlbmQgQVBJLlxuICAgKiBEZWZhdWx0cyB0byBkZW1vIGJhY2tlbmQuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF8gPSB0aGlzLnJvdXRpbmdPcHRpb25zXy5iYWNrZW5kVXJsIHx8ICdodHRwczovL3JvdXRlci5wcm9qZWN0LW9zcm0ub3JnLyc7XG5cbiAgLy8gdGhlIHVybCBpcyBleHBlY3RlZCB0byBlbmQgd2l0aCBhIHNsYXNoXG4gIGlmICh0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF8uc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfICs9ICcvJztcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJzaW9uIG9mIHRoZSBwcm90b2NvbCBpbXBsZW1lbnRlZCBieSB0aGUgc2VydmljZS5cbiAgICogc2VlOiBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZC9ibG9iL21hc3Rlci9kb2NzL2h0dHAubWRcbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMucHJvdG9jb2xWZXJzaW9uXyA9ICd2MSc7XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3NlcnZpY2VdXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3Byb2ZpbGVdXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2luc3RhbmNlXVxuICogQHByb3BlcnR5IHtPYmplY3Q8c3RyaW5nLCBzdHJpbmd8Ym9vbGVhbj59IFtvcHRpb25zXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUm91dGVzXG4gKiBAcHJvcGVydHkge1JvdXRlW119IHJvdXRlc1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUm91dGVcbiAqIEBwcm9wZXJ0eSB7TGVnW119IFtsZWdzXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtnZW9tZXRyeV1cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXN0YW5jZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGR1cmF0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMZWdcbiAqIEBwcm9wZXJ0eSB7U3RlcFtdfSBzdGVwc1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RlcFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGdlb21ldHJ5XG4gKi9cblxuLyoqXG4gKiBSb3V0ZSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlW119IGNvb3JkaW5hdGVzIGNvb3JkaW5hdGVzIG9mIHRoZSByb3V0ZSAoYXQgbGVhc3QgdHdvISlcbiAqIEBwYXJhbSB7P0NvbmZpZ30gY29uZmlnIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEByZXR1cm5zIHthbmd1bGFyLklIdHRwUHJvbWlzZTxSb3V0ZXM+fSBwcm9taXNlIG9mIHRoZSBPU1JNIEFQSSByZXF1ZXN0XG4gKi9cblJvdXRpbmdTZXJ2aWNlLnByb3RvdHlwZS5nZXRSb3V0ZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlcywgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAvLyBTZXJ2aWNlXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQvYmxvYi9tYXN0ZXIvZG9jcy9odHRwLm1kI3JlcXVlc3RzXG4gIGlmICghY29uZmlnLnNlcnZpY2UpIHtcbiAgICBjb25maWcuc2VydmljZSA9ICdyb3V0ZSc7IC8vIGRlZmF1bHQgaXMgcm91dGVcbiAgfVxuXG4gIC8vIE1vZGUgb2YgdHJhbnNwb3J0YXRpb24sXG4gIC8vIGNhbiBiZTogY2FyLCBiaWtlLCBmb290XG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL1Byb2plY3QtT1NSTS9vc3JtLWJhY2tlbmQvYmxvYi9tYXN0ZXIvZG9jcy9odHRwLm1kI3JlcXVlc3RzXG4gIC8vXG4gIC8vIEFzIG9mIHZlcnNpb24gNS44LjAsIE9TUk0gKHNlcnZlcikgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBwcm9maWxlcyBzaW11bHRhbmVvdXNseS5cbiAgLy8gVGhpcyBtZWFucyB0aGUgdmFsdWUgYWN0dWFsbHkgZG9lcyBub3QgbWF0dGVyLlxuICBpZiAoIWNvbmZpZy5wcm9maWxlKSB7XG4gICAgY29uZmlnLnByb2ZpbGUgPSAnY2FyJzsgLy8gZGVmYXVsdCBpcyBjYXJcbiAgfVxuXG4gIC8vIGJ1aWxkIHJlcXVlc3QgVVJMXG4gIGxldCB1cmwgPSB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF87XG5cbiAgLy8gQ29tbW9uIHdvcmthcm91bmQgdG8gcHJvdmlkZSBtdWx0aXBsZSBwcm9maWxlcyAoc2luY2UgaXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQpXG4gIC8vIEV2ZXJ5IHByb2ZpbGUgcnVucyBvbiBpdHMgb3duIGluc3RhbmNlLlxuICBpZiAoY29uZmlnLmluc3RhbmNlKSB7XG4gICAgdXJsICs9IGAke2NvbmZpZy5pbnN0YW5jZX0vYDtcbiAgfVxuICB1cmwgKz0gYCR7Y29uZmlnLnNlcnZpY2V9LyR7dGhpcy5wcm90b2NvbFZlcnNpb25ffS8ke2NvbmZpZy5wcm9maWxlfS9gO1xuXG4gIC8vIFsgW2EsYl0gLCBbYyxkXSBdIC0+ICdhLGI7YyxkJ1xuICBjb25zdCBjb29yZGluYXRlU3RyaW5nID0gY29vcmRpbmF0ZXMubWFwKChjKSA9PiBjLmpvaW4oJywnKSkuam9pbignOycpO1xuICB1cmwgKz0gY29vcmRpbmF0ZVN0cmluZztcblxuICAvLyBsb29rIGZvciByb3V0ZSBzZXJ2aWNlIG9wdGlvbnNcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZC9ibG9iL21hc3Rlci9kb2NzL2h0dHAubWQjcm91dGUtc2VydmljZVxuICBpZiAoY29uZmlnLm9wdGlvbnMpIHtcbiAgICB1cmwgKz0gJz8nO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhjb25maWcub3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb259PSR7Y29uZmlnLm9wdGlvbnNbb3B0aW9uXX1gKTtcbiAgICB9XG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5cbi8qKlxuICogU25hcHMgYSBjb29yZGluYXRlIHRvIHRoZSBzdHJlZXQgbmV0d29yayBhbmQgcmV0dXJucyB0aGUgbmVhcmVzdCBtYXRjaFxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCdvbC9jb29yZGluYXRlJykuQ29vcmRpbmF0ZX0gY29vcmRpbmF0ZSBjb29yZGluYXRlIHRvIHF1ZXJ5XG4gKiBAcGFyYW0gez9Db25maWd9IGNvbmZpZyBvcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JSHR0cFByb21pc2U8T2JqZWN0Pn0gcHJvbWlzZSBvZiB0aGUgT1NSTSBBUEkgcmVxdWVzdFxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdC1PU1JNL29zcm0tYmFja2VuZC9ibG9iL21hc3Rlci9kb2NzL2h0dHAubWQjbmVhcmVzdC1zZXJ2aWNlXG4gKi9cblJvdXRpbmdTZXJ2aWNlLnByb3RvdHlwZS5nZXROZWFyZXN0ID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUsIGNvbmZpZykge1xuICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgLy8gc2VydmljZSBpcyBhbHdheXMgbmVhcmVzdFxuICBjb25maWcuc2VydmljZSA9ICduZWFyZXN0JztcblxuICAvLyBNb2RlIG9mIHRyYW5zcG9ydGF0aW9uXG4gIC8vIElmIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhIGdldFJvdXRlIHJlcXVlc3QsIGNob29zZSB0aGUgc2FtZSBwcm9maWxlLlxuICBpZiAoIWNvbmZpZy5wcm9maWxlKSB7XG4gICAgY29uZmlnLnByb2ZpbGUgPSAnY2FyJzsgLy8gZGVmYXVsdCBpcyBjYXJcbiAgfVxuXG4gIC8vIGJ1aWxkIHJlcXVlc3QgVVJMXG4gIGxldCB1cmwgPSB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF87XG5cbiAgLy8gQ29tbW9uIHdvcmthcm91bmQgdG8gcHJvdmlkZSBtdWx0aXBsZSBwcm9maWxlcyAoc2luY2UgaXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQpXG4gIC8vIEV2ZXJ5IHByb2ZpbGUgcnVucyBvbiBpdHMgb3duIGluc3RhbmNlLlxuICBpZiAoY29uZmlnLmluc3RhbmNlKSB7XG4gICAgdXJsICs9IGAke2NvbmZpZy5pbnN0YW5jZX0vYDtcbiAgfVxuICB1cmwgKz0gYCR7Y29uZmlnLnNlcnZpY2V9LyR7dGhpcy5wcm90b2NvbFZlcnNpb25ffS8ke2NvbmZpZy5wcm9maWxlfS9gO1xuXG4gIC8vIFthLGJdIC0+ICdhLGInXG4gIGNvbnN0IGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG5cbiAgLy8gbG9vayBmb3IgbmVhcmVzdCBzZXJ2aWNlIG9wdGlvbnNcbiAgaWYgKGNvbmZpZy5vcHRpb25zKSB7XG4gICAgdXJsICs9ICc/JztcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMoY29uZmlnLm9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke2NvbmZpZy5vcHRpb25zW29wdGlvbl19YCk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nU2VydmljZScsIFtdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9Sb3V0aW5nU2VydmljZScsIFJvdXRpbmdTZXJ2aWNlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nQ29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nQ29tcG9uZW50JztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICovXG5leHBvcnQgZGVmYXVsdCBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdNb2R1bGUnLCBbbmdlb1JvdXRpbmdSb3V0aW5nQ29tcG9uZW50Lm5hbWVdKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cIm5nZW8tbm9taW5hdGltLWlucHV0XCI+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgcGxhY2Vob2xkZXI9XCJ7eyRjdHJsLnBsYWNlaG9sZGVyfX1cIlxuICAgIG5nLW1vZGVsPVwiJGN0cmwuaW5wdXRWYWx1ZVwiXG4gICAgbmdlby1zZWFyY2g9XCIkY3RybC5vcHRpb25zXCJcbiAgICBuZ2VvLXNlYXJjaC1kYXRhc2V0cz1cIiRjdHJsLmRhdGFzZXRzXCJcbiAgICBuZ2VvLXNlYXJjaC1saXN0ZW5lcnM9XCIkY3RybC5saXN0ZW5lcnNcIlxuICAvPlxuPC9kaXY+YDtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZ1wiPlxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLXN0YXJ0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwiJGN0cmwuc3RhcnRGZWF0dXJlX1wiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLnN0YXJ0RmlsbFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRTdHJva2VcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcbiAgICA+XG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy12aWFzIGZvcm0tZ3JvdXBcIiBuZy1yZXBlYXQ9XCIoaW5kZXgsIHZpYSkgaW4gJGN0cmwudmlhQXJyYXlcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXG4gICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cInZpYS5mZWF0dXJlXCJcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLnZpYUZpbGxcIlxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiRjdHJsLmNvbG9ycy52aWFTdHJva2VcIlxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWUgZGVsZXRlLXZpYVwiIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlVmlhKGluZGV4KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctZGVzdGluYXRpb24gZm9ybS1ncm91cFwiPlxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtbWFwPVwiJGN0cmwubWFwXCJcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCIkY3RybC50YXJnZXRGZWF0dXJlX1wiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uRmlsbFwiXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuZGVzdGluYXRpb25TdHJva2VcIlxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcbiAgICA+XG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZmlsbFwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5jbGVhclJvdXRlKClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5DbGVhcjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwucmV2ZXJzZVJvdXRlKClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctcmlnaHQtYXJyb3ctbGVmdFwiPjwvc3Bhbj4gPHNwYW4gdHJhbnNsYXRlPlJldmVyc2U8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLmFkZFZpYSgpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5BZGQgdmlhPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cblxuICA8ZGl2IG5nLWlmPVwiJGN0cmwucm91dGluZ1Byb2ZpbGVzLmxlbmd0aCA+IDFcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgY29sLW1kLTRcIiB0cmFuc2xhdGU+UHJvZmlsZTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5nLW1vZGVsPVwiJGN0cmwuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZVwiPlxuICAgICAgICAgIDxvcHRpb24gbmctcmVwZWF0PVwicHJvZmlsZSBpbiAkY3RybC5yb3V0aW5nUHJvZmlsZXNcIiBuZy12YWx1ZT1cInByb2ZpbGVcIj57e3Byb2ZpbGUubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWVycm9yIGZvcm0tZ3JvdXAgY2xlYXJmaXhcIiBuZy1oaWRlPVwiJGN0cmwuZXJyb3JNZXNzYWdlID09PSAnJ1wiPlxuICAgIHt7JGN0cmwuZXJyb3JNZXNzYWdlfX1cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XG5cbiAgPGRpdiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbCAmJiAkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgIDxzdHJvbmcgdHJhbnNsYXRlPlJvdXRlIHN0YXRpc3RpY3M8L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RHVyYXRpb248L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPnt7JGN0cmwucm91dGVEdXJhdGlvbiB8IG5nZW9EdXJhdGlvbn19PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgbmctaGlkZT1cIiRjdHJsLnJvdXRlRGlzdGFuY2UgPD0gMFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RGlzdGFuY2U8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPnt7JGN0cmwucm91dGVEaXN0YW5jZSB8IG5nZW9Vbml0UHJlZml4OidtJ319PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YDtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1mZWF0dXJlXCI+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgIDxuZ2VvLW5vbWluYXRpbS1pbnB1dFxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtdmFsdWU9XCIkY3RybC5mZWF0dXJlTGFiZWxcIlxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtcGxhY2Vob2xkZXI9XCJ7eydTZWFyY2guLi4nIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtb24tc2VsZWN0PVwiJGN0cmwub25TZWxlY3RcIlxuICAgID5cbiAgICA8L25nZW8tbm9taW5hdGltLWlucHV0PlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBidG5cIiBuZy1jbGljaz1cIiRjdHJsLnNldCgpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLWxvY2F0aW9uLXBpblwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicm91dGluZ1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvcm91dGluZy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9