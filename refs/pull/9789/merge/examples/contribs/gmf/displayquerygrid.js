/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/displayquerygrid.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayquerygrid_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayquerygrid.scss */ "./contribs/gmf/examples/displayquerygrid.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_datasource_Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/datasource/Manager */ "./src/datasource/Manager.js");
/* harmony import */ var gmf_layertree_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/layertree/component */ "./src/layertree/component.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var gmf_query_gridComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/query/gridComponent */ "./src/query/gridComponent.js");
/* harmony import */ var gmf_theme_Manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/theme/Manager */ "./src/theme/Manager.js");
/* harmony import */ var gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/theme/Themes */ "./src/theme/Themes.js");
/* harmony import */ var ngeo_grid_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/grid/module */ "./src/grid/module.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_query_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/component */ "./src/query/component.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('gmfapp', [
  'gettext',
  gmf_datasource_Manager__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  gmf_layertree_component__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  gmf_map_component__WEBPACK_IMPORTED_MODULE_4__["default"].name,
  gmf_query_gridComponent__WEBPACK_IMPORTED_MODULE_6__["default"].name,
  gmf_theme_Manager__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_8__["default"].name,
  ngeo_grid_module__WEBPACK_IMPORTED_MODULE_9__["default"].name,
  ngeo_map_module__WEBPACK_IMPORTED_MODULE_10__["default"].name,
  // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_11__["default"].name,
  ngeo_query_component__WEBPACK_IMPORTED_MODULE_13__["default"].name,
]);

/**
 * Demo, NOT USED.
 * A sample component to display the result.
 *
 * @type {angular.IComponentOptions}
 * @hidden
 */
const queryresultComponent = {
  controller: 'gmfappQueryresultController',
  // @ts-ignore: webpack
  template: __webpack_require__(/*! ./partials/queryresult.html */ "./contribs/gmf/examples/partials/queryresult.html"),
};
myModule.component('gmfappQueryresult', queryresultComponent);

QueryresultController.$inject = ['ngeoQueryResult'];

/**
 * Demo, NOT USED.
 *
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult Query service.
 * @class
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.result = ngeoQueryResult;
}
myModule.controller('gmfappQueryresultController', QueryresultController);

MainController.$inject = ['gmfThemes', 'gmfDataSourcesManager', 'gmfThemeManager', 'defaultTheme'];

/**
 * @class
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/datasource/Manager').DatasourceManager} gmfDataSourcesManager The gmf
 *     data sources manager service.
 * @param {import('gmf/theme/Manager').ThemeManagerService} gmfThemeManager gmf Theme Manager service.
 * @param {string} defaultTheme The default theme.
 */
function MainController(gmfThemes, gmfDataSourcesManager, gmfThemeManager, defaultTheme) {
  gmfThemes.loadThemes();

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_14__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_16__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_17__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_15__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_12__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 3,
    }),
  });

  /**
   * @type {Object<string, string>}
   */
  this.dimensions = {};

  // Init the datasources with our map.
  gmfDataSourcesManager.setDatasourceMap(this.map);
  // Give the dimensions to the gmfDataSourcesManager
  gmfDataSourcesManager.setDimensions(this.dimensions);

  /**
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {import('gmf/themes').GmfTheme[]|undefined}
   * export
   */
  this.themes = undefined;

  /**
   * @type {import('gmf/themes').GmfTheme} The selected theme.
   */
  this.selectedTheme = null;
  this.updateTheme = function () {
    gmfThemeManager.addTheme(this.selectedTheme);
  };

  /**
   * @type {boolean}
   */
  this.queryGridActive = true;
  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      this.themes = themes;

      // Select default theme;
      themes.forEach((theme) => {
        if (theme.name === defaultTheme) {
          this.selectedTheme = theme;
          return;
        }
      });
    }
  });
  ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_5__["default"].init(this.map);
}
myModule.controller('MainController', MainController);
myModule.constant('gmfDisplayQueryGridOptions', {
  featuresStyle: {
    fill: {
      color: [255, 170, 0, 0.6],
    },
    circle: {
      fill: {
        color: [255, 170, 0, 0.6],
      },
      radius: 5,
      stroke: {
        color: [255, 170, 0, 1],
        width: 2,
      },
    },
    stroke: {
      color: [255, 170, 0, 1],
      width: 2,
    },
  },
});
(0,_options__WEBPACK_IMPORTED_MODULE_18__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ }),

/***/ "./contribs/gmf/examples/displayquerygrid.scss":
/*!*****************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/query/gridComponent.html.js":
/*!*****************************************!*\
  !*** ./src/query/gridComponent.html.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gmf_icons_spinner_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gmf/icons/spinner_svg */ "./src/icons/spinner_svg.ts");
// The MIT License (MIT)
//
// Copyright (c) 2024-2025 Camptocamp SA
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="gmf-displayquerygrid panel" ng-show="ctrl.active">
  <div class="close" ng-click="ctrl.clear()">&times;</div>

  <ul class="nav nav-pills" role="tablist">
    <li
      class="nav-item"
      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"
      role="presentation"
      ng-click="ctrl.selectTab(gridSource)"
    >
      <a
        class="nav-link"
        href="#{{ctrl.escapeValue(gridSource.source.label)}}"
        ng-class="{'active' : ctrl.isSelected(gridSource)}"
        data-target="#{{ctrl.escapeValue(gridSource.source.label)}}"
        aria-controls="{{ctrl.escapeValue(gridSource.source.label)}}"
        role="tab"
        data-toggle="tab"
      >
        <span> {{gridSource.source.label | translate}} ({{gridSource.source.features.length}}) </span>
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <div
      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"
      role="tabpanel"
      class="tab-pane"
      ng-class="{'active' : ctrl.isSelected(gridSource)}"
      id="{{ctrl.escapeValue(gridSource.source.label)}}"
    >
      <ngeo-grid ngeo-grid-configuration="gridSource.configuration"> </ngeo-grid>
    </div>
    <div class="container-fluid">
      <div
        ng-show="!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null"
        class="row"
      >
        <div class="col-md-5 my-auto">
          <span ng-if="ctrl.hasOneWithTooManyResults_()" class="gmf-query-grid-too-many text-warning"
            ><span ng-if="ctrl.sumOfAvailableResults >= 0">{{'Only' | translate}} {{ctrl.sumOfFeatures}} {{'of' | translate}} {{ctrl.sumOfAvailableResults}}
            {{'results displayed, as the maximum number is reached. Please refine your query.' | translate
            }}</span
          ><span ng-if="ctrl.sumOfAvailableResults < 0">{{'One of the queries returns the maximum number of results, but probably not all the  results are displayed. Please refine your query.' | translate}}
          </span
          ></span
          >
        </div>
        <div class="col-md-7" class="pull-right">
          <ul class="nav justify-content-end">
            <li class="ng-hide" ng-show="ctrl.isOneSelected()">
              <div class="btn btn-sm ng-binding">
                {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>
              </div>
            </li>

            <li ng-show="ctrl.isOneSelected()" class="ng-hide">
              <button
                class="btn btn-link btn-sm"
                title="{{'Zoom to selection' | translate}}"
                ng-click="ctrl.zoomToSelection()"
              >
                <i class="fa-solid fa-magnifying-glass-plus"></i> <span translate>Zoom to</span>
              </button>
            </li>

            <li ng-show="ctrl.isOneSelected()" class="ng-hide">
              <button
                class="btn btn-link btn-sm"
                title="{{'Export selection as CSV' | translate}}"
                ng-click="ctrl.downloadCsv()"
              >
                <i class="fa-solid fa-download"></i> <span translate>Export as CSV</span>
              </button>
            </li>

            <li class="dropdown">
              <button
                type="button"
                class="dropup btn btn-default btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span translate>Select</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li>
                  <a href="" ng-click="ctrl.selectAll()" translate>All</a>
                </li>

                <li>
                  <a href="" ng-click="ctrl.unselectAll()" translate>None</a>
                </li>

                <li>
                  <a href="" ng-click="ctrl.invertSelection()" translate>Reverse selection</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div ng-show="ctrl.pending" class="spinner-grid">
      <i class="fa-solid fa-spin"
        >${(0,gmf_icons_spinner_svg__WEBPACK_IMPORTED_MODULE_0__["default"])('3rem')}</i>
    </div>
  </div>
</div>`);


/***/ }),

/***/ "./src/query/gridComponent.js":
/*!************************************!*\
  !*** ./src/query/gridComponent.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryGridController: () => (/* binding */ QueryGridController),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_download_Csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/download/Csv */ "./src/download/Csv.ts");
/* harmony import */ var ngeo_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/grid/component */ "./src/grid/component.js");
/* harmony import */ var ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/grid/Config */ "./src/grid/Config.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_query_MapQuerent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/query/MapQuerent */ "./src/query/MapQuerent.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/extent */ "./node_modules/ol/extent.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
/* harmony import */ var gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gmfapi/store/panels */ "./srcapi/store/panels.ts");
/* harmony import */ var bootstrap_js_src_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bootstrap/js/src/dropdown */ "./node_modules/bootstrap/js/src/dropdown.js");
/* harmony import */ var _gridComponent_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./gridComponent.html */ "./src/query/gridComponent.html.js");
QueryGridController.$inject = [
  '$scope',
  'ngeoQueryResult',
  'ngeoMapQuerent',
  '$timeout',
  'ngeoQueryOptions',
  'gmfCsvFilename',
  '$element',
  'gmfDisplayQueryGridOptions',
];
// The MIT License (MIT)
//
// Copyright (c) 2016-2025 Camptocamp SA
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
 * Configuration for a grid tab.
 *
 * @typedef {Object} GridSource
 * @property {import('ngeo/grid/Config').default} [configuration] Configuration used to initialize a grid.
 * @property {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Results of the query
 *    source.
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('gmfQueryGridComponent', [ngeo_grid_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_query_MapQuerent__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
myModule.value(
  'gmfDisplayquerygridTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfDisplayquerygridTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/query/gridComponent';
  },
);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/query/gridComponent', _gridComponent_html__WEBPACK_IMPORTED_MODULE_12__["default"]);
    },
  ],
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfDisplayquerygridTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
gmfDisplayquerygridTemplateUrl.$inject = ['$element', '$attrs', 'gmfDisplayquerygridTemplateUrl'];
function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}

/**
 * Provides a component to display results of the {@link import('ngeo/queryResult').default} in a
 * grid and shows related features on the map using
 * the {@link import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr}.
 *
 * You can override the default component's template by setting the
 * value `gmfDisplayquerygridTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this component.
 *
 * Note: the following ng-class need to be present in the interface <body> element to display the footer
 * when the grid is active (initially there should be the code for the profile tool):
 *      <body ng-class="{
 *        'gmf-profile-chart-active': !!profileChartActive,
 *        'gmf-query-grid-active': !!queryGridActive
 *      }">
 *
 * Example:
 *
 *      <gmf-displayquerygrid gmf-displayquerygrid-map="ctrl.map"></gmf-displayquerygrid>
 *
 * @htmlAttribute {boolean} gmf-displayquerygrid-active The active state of the component.
 * @htmlAttribute {import('ol/Map').default} gmf-displayquerygrid-map The map.
 * @ngdoc component
 * @ngname gmfDisplayquerygrid
 */
const queryGridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'getMapFn': '&gmfDisplayquerygridMap',
  },
  templateUrl: gmfDisplayquerygridTemplateUrl,
};
myModule.component('gmfDisplayquerygrid', queryGridComponent);

/**
 * Controller for the query grid.
 *
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult ngeo query result.
 * @param {import('ngeo/query/MapQuerent').MapQuerent} ngeoMapQuerent ngeo map querent service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('ngeo/options').ngeoQueryOptions} ngeoQueryOptions The options.
 * @param {import('gmf/options').gmfCsvFilename} gmfCsvFilename The CSV file name.
 * @param {JQuery} $element Element.
 * @param {import('gmf/options').gmfDisplayQueryGridOptions} gmfDisplayQueryGridOptions The options.
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname GmfDisplayquerygridController
 */
function QueryGridController(
  $scope,
  ngeoQueryResult,
  ngeoMapQuerent,
  $timeout,
  ngeoQueryOptions,
  gmfCsvFilename,
  $element,
  gmfDisplayQueryGridOptions,
) {
  /**
   * @type {import('gmf/options').gmfDisplayQueryGridOptions}
   */
  this.options = gmfDisplayQueryGridOptions;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {import('ngeo/query/MapQuerent').MapQuerent}
   */
  this.ngeoMapQuerent_ = ngeoMapQuerent;

  /**
   * @type {import('ngeo/download/Csv').DownloadCsvService}
   */
  this.ngeoCsvDownload_ = ngeo_download_Csv__WEBPACK_IMPORTED_MODULE_1__["default"];

  /**
   * @type {JQuery}
   */
  this.$element_ = $element;

  /**
   * @type {number}
   */
  this.maxResults = ngeoQueryOptions.limit !== undefined ? ngeoQueryOptions.limit : 50;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {Object<string, GridSource>}
   */
  this.gridSources = {};

  /**
   * IDs of the grid sources in the order they were loaded.
   *
   * @type {string[]}
   */
  this.loadedGridSources = [];

  /**
   * The id of the currently shown query source.
   *
   * @type {?string|number}
   */
  this.selectedTab = null;

  /**
   * A mapping between row uid and the corresponding feature for each
   * source.
   *
   * @type {Object<string, Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>>>}
   */
  this.featuresForSources_ = {};

  // Styles for displayed features (features) and selected features
  // (highlightFeatures_) (user can set both styles).
  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_6__["default"]();

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.highlightFeatures_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_6__["default"]();

  /**
   * Filename
   *
   * @type {import('gmf/options').gmfCsvFilename}
   */
  this.filename_ = gmfCsvFilename;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map_ = null;

  /**
   * Sum over all tabs of the obtained results
   *
   * @type {number}
   */
  this.sumOfFeatures = 0;

  /**
   * Sum over all tabs of the available results
   *
   * @type {number}
   */
  this.sumOfAvailableResults = 0;

  // Watch the ngeo query result service.
  this.$scope_.$watchCollection(
    () => ngeoQueryResult,
    (newQueryResult, oldQueryResult) => {
      // Open the panel before results for first request (display the spinner)
      if (ngeoQueryResult.pending) {
        this.active = true;
        this.pending = true;
        gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
          state: true,
          noError: true,
        });
      }
      if (newQueryResult !== oldQueryResult) {
        this.updateData_();
      }
    },
  );

  /**
   * An unregister function returned from `$scope.$watchCollection` for
   * "on-select" changes (when rows are selected/unselected).
   *
   * @type {?function(): void}
   */
  this.unregisterSelectWatcher_ = null;

  /**
   * @type {?() => olMap}
   */
  this.getMapFn = null;
}

/**
 * Init the controller
 */
QueryGridController.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }
  const featuresOverlay = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__["default"].getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  featuresOverlay.setStyle((0,ngeo_options__WEBPACK_IMPORTED_MODULE_9__.buildStyle)(this.options.featuresStyle));
  const highlightFeaturesOverlay = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__["default"].getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  const highlightFeatureStyle = (0,ngeo_options__WEBPACK_IMPORTED_MODULE_9__.buildStyle)(this.options.selectedFeatureStyle);
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);
  const mapFn = this.getMapFn;
  if (mapFn) {
    const map = mapFn();
    if (!(map instanceof ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"])) {
      throw new Error('Wrong map type');
    }
    this.map_ = map;
  }
};

/**
 * Returns a list of grid sources in the order they were loaded.
 *
 * @returns {GridSource[]} Grid sources.
 */
QueryGridController.prototype.getGridSources = function () {
  return this.loadedGridSources.map((sourceLabel) => this.gridSources[sourceLabel]);
};
QueryGridController.prototype.updateData_ = function () {
  // close if there are no results
  if (
    (this.ngeoQueryResult.pending || this.ngeoQueryResult.total === 0) &&
    !this.hasOneWithTooManyResults_()
  ) {
    const oldActive = this.active;
    this.clear();
    if (oldActive) {
      // don't close if there are pending queries
      this.active = this.ngeoQueryResult.pending;
      gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
        state: this.active,
      });
      this.pending = this.ngeoQueryResult.pending;
    }
    return;
  }
  this.sumOfAvailableResults = 0;
  this.sumOfFeatures = 0;

  /**
   * @type {string[]}
   */
  const countedSources = [];
  this.ngeoQueryResult.sources.forEach((source) => {
    if (!countedSources.includes(source.label)) {
      this.sumOfFeatures += source.features.length;
    }
    if (!source.requestPartners || !source.requestPartners.some((label) => countedSources.includes(label))) {
      if (source.totalFeatureCount < 0 || this.sumOfAvailableResults < 0) {
        // At least one query without any count => we can't display the total count
        this.sumOfAvailableResults = -1;
      } else {
        this.sumOfAvailableResults += source.totalFeatureCount;
      }
    }
    countedSources.push(source.label);
  });
  this.active = true;
  gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
    state: true,
  });
  this.pending = false;
  let sources = this.ngeoQueryResult.sources;
  // merge sources if requested
  if (Object.keys(this.options.mergeTabs || {}).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  // create grids (only for source with features or with too many results)
  sources.forEach((source) => {
    if (source.tooManyResults && source.features.length === 0) {
      this.makeGrid_(null, source);
    } else {
      source.id = this.escapeValue(source.id);
      const features = source.features;
      if (features.length > 0) {
        this.collectData_(source);
      }
    }
  });
  if (this.loadedGridSources.length === 0) {
    // if no grids were created, do not show
    this.active = false;
    gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
      state: false,
      noError: true,
    });
    return;
  }

  // keep the first existing navigation tab open
  if (this.selectedTab === null || !(`${this.selectedTab}` in this.gridSources)) {
    // selecting the tab is done in a timeout, because otherwise in rare cases
    // `ng-class` might set the `active` class on multiple tabs.
    this.$timeout_(() => {
      const firstSourceId = this.loadedGridSources[0];
      this.selectTab(this.gridSources[firstSourceId]);
    }, 0);
  }
};

/**
 * @returns {boolean} If one of the source has too many results.
 */
QueryGridController.prototype.hasOneWithTooManyResults_ = function () {
  return this.ngeoQueryResult.sources.some((source) => source.tooManyResults);
};

/**
 * Returns the value with all symbols and spaces replaced by an underscore.
 *
 * @param {string|number} value A value to escape.
 * @returns {string|number} value An escaped value.
 */
QueryGridController.prototype.escapeValue = function (value) {
  // Work-around for Number.isInteger() when not always getting a number ...
  if (typeof value == 'number') {
    return value;
  } else {
    const toEscape = /[-[\]/{}()*+?.\\^$ |]/g;
    if (value.match(toEscape) !== null) {
      return value.replace(toEscape, '_');
    } else {
      return value;
    }
  }
};

/**
 * Returns if the given grid source is selected?
 *
 * @param {GridSource} gridSource Grid source.
 * @returns {boolean} Is selected?
 */
QueryGridController.prototype.isSelected = function (gridSource) {
  return this.selectedTab === gridSource.source.label;
};

/**
 * Try to merge the mergeable sources.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} sources Sources.
 * @returns {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} The merged sources.
 */
QueryGridController.prototype.getMergedSources_ = function (sources) {
  /** @type {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} */
  const allSources = [];
  /** @type {Object<string, import('ngeo/statemanager/WfsPermalink').QueryResultSource>} */
  const mergedSources = {};
  sources.forEach((source) => {
    // check if this source can be merged
    const mergedSource = this.getMergedSource_(source, mergedSources);
    if (mergedSource === null) {
      // this source should not be merged, add as is
      allSources.push(source);
    }
  });
  for (const mergedSourceId in mergedSources) {
    allSources.push(mergedSources[mergedSourceId]);
  }
  return allSources;
};

/**
 * Check if the given source should be merged. If so, an artificial source
 * that will contain the features of all mergeable sources is returned. If not,
 * `null` is returned.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Source.
 * @param {Object<string, import('ngeo/statemanager/WfsPermalink').QueryResultSource>} mergedSources
 *    Merged sources.
 * @returns {?import('ngeo/statemanager/WfsPermalink').QueryResultSource} A merged source of null if the
 *    source should not be merged.
 */
QueryGridController.prototype.getMergedSource_ = function (source, mergedSources) {
  let mergeSourceId = null;
  for (const currentMergeSourceId in this.options.mergeTabs || {}) {
    const sourceLabels = this.options.mergeTabs[currentMergeSourceId];
    const containsSource = sourceLabels.some((sourceLabel) => sourceLabel == source.label);
    if (containsSource) {
      mergeSourceId = currentMergeSourceId;
      break;
    }
  }
  if (mergeSourceId === null) {
    // this source should not be merged
    return null;
  }

  /** @type {boolean} */
  let newRequest = true;

  /** @type {import('ngeo/statemanager/WfsPermalink').QueryResultSource} */
  let mergeSource;
  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
    if (source.requestPartners) {
      newRequest = !source.requestPartners.some((label) => mergeSource.mergeComposants.includes(label));
    }
    mergeSource.mergeComposants.push(source.label);
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      featuresCount: 0,
      //the sum of the obtained results of the query is computed later
      pending: false,
      tooManyResults: false,
      mergeComposants: [source.label],
    };
    mergedSources[mergeSourceId] = mergeSource;
  }

  // add features of source to merge source
  source.features.forEach((feature) => {
    mergeSource.features.push(feature);
  });

  // if one of the source has too many results, the resulting merged source will
  // also be marked with `tooManyResults`.
  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;

  // for layers called with the previous request the totalFeatureCount (available results) and the limit (obtained results)
  // are still valid
  if (newRequest) {
    if (source.totalFeatureCount !== undefined) {
      mergeSource.totalFeatureCount =
        mergeSource.totalFeatureCount !== undefined
          ? mergeSource.totalFeatureCount + source.totalFeatureCount
          : source.totalFeatureCount;
    }
    mergeSource.featuresCount += source.featuresCount;
  }
  return mergeSource;
};

/**
 * Collect all features in the queryResult object.
 *
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Result source.
 */
QueryGridController.prototype.collectData_ = function (source) {
  const features = source.features;
  /** @type {Object<string, *>[]} */
  const allProperties = [];
  /** @type {string[]} */
  const featureGeometriesNames = [];
  /** @type {Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>>} */
  const featuresForSource = {};
  let properties, featureGeometryName;
  features.forEach((feature) => {
    properties = feature.getProperties();
    if (properties !== undefined) {
      // Keeps distinct geometry names to remove theme later.
      featureGeometryName = feature.getGeometryName();
      if (!featureGeometriesNames.includes(featureGeometryName)) {
        featureGeometriesNames.push(featureGeometryName);
      }
      allProperties.push(properties);
      featuresForSource[(0,ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__.getRowUid)(properties)] = feature;
    }
  });
  this.cleanProperties_(allProperties, featureGeometriesNames);
  if (allProperties.length > 0) {
    const gridCreated = this.makeGrid_(allProperties, source);
    if (gridCreated) {
      this.featuresForSources_[`${source.label}`] = featuresForSource;
    }
  }
};

/**
 * Remove all unwanted columns.
 *
 * @param {Object<string, string|number|boolean>[]} allProperties A row.
 * @param {string[]} featureGeometriesNames Geometry names.
 */
QueryGridController.prototype.cleanProperties_ = function (allProperties, featureGeometriesNames) {
  allProperties.forEach((properties) => {
    featureGeometriesNames.forEach((featureGeometryName) => {
      delete properties[featureGeometryName];
    });
    delete properties.boundedBy;
    delete properties.ngeo_feature_type_;
  });
  if (this.options.removeEmptyColumns === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};

/**
 * Remove columns that will be completely empty between each properties.
 *
 * @param {Object<string, string|number|boolean>[]} allProperties A row.
 */
QueryGridController.prototype.removeEmptyColumnsFn_ = function (allProperties) {
  // Keep all keys that correspond to at least one value in a properties object.
  /** @type {string[]} */
  const keysToKeep = [];
  let i, key;
  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }
  // Get all keys that previously always refers always to an empty value.
  let keyToRemove;
  allProperties.forEach((properties) => {
    keyToRemove = [];
    for (key in properties) {
      if (!keysToKeep.includes(key)) {
        keyToRemove.push(key);
      }
    }
    // Remove these keys.
    keyToRemove.forEach((key) => {
      delete properties[key];
    });
  });
};

/**
 * @param {?Object<string, string|number|boolean>[]} data Grid rows.
 * @param {import('ngeo/statemanager/WfsPermalink').QueryResultSource} source Query source.
 * @returns {boolean} Returns true if a grid was created.
 */
QueryGridController.prototype.makeGrid_ = function (data, source) {
  const sourceLabel = `${source.label}`;
  let gridConfig = null;
  if (data !== null) {
    gridConfig = this.getGridConfiguration_(data);
    if (gridConfig === null) {
      return false;
    }
  }
  if (!this.loadedGridSources.includes(sourceLabel)) {
    this.loadedGridSources.push(sourceLabel);
  }
  this.gridSources[sourceLabel] = {
    source: source,
  };
  if (gridConfig) {
    this.gridSources[sourceLabel].configuration = gridConfig;
  }
  return true;
};

/**
 * @param {Object<string, string|number|boolean>[]} data Grid rows.
 * @returns {?import('ngeo/grid/Config').default} Grid config.
 */
QueryGridController.prototype.getGridConfiguration_ = function (data) {
  if (!data.length) {
    throw new Error('Missing data');
  }
  const clone = {};
  Object.assign(clone, data[0]);
  // @ts-ignore
  delete clone.ol_uid;
  const columns = Object.keys(clone);

  /** @type {import('ngeo/download/Csv').GridColumnDef[]} */
  const columnDefs = [];
  columns.forEach((column) => {
    columnDefs.push(
      /** @type {import('ngeo/download/Csv').GridColumnDef} */ {
        name: column,
      },
    );
  });
  if (columnDefs.length > 0) {
    return new ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__["default"](data, columnDefs);
  } else {
    // no columns, do not show grid
    return null;
  }
};

/**
 * Get the currently shown grid source.
 *
 * @returns {GridSource|null} Grid source.
 */
QueryGridController.prototype.getActiveGridSource = function () {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources[`${this.selectedTab}`];
  }
};

/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 */
QueryGridController.prototype.clear = function () {
  this.active = false;
  gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
    state: false,
    noError: true,
  });
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.tooManyResults = false;
  this.features_.clear();
  this.highlightFeatures_.clear();
  this.ngeoMapQuerent_.clear();
  this.featuresForSources_ = {};
  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
  }
};

/**
 * Select the tab for the given grid source.
 *
 * @param {GridSource} gridSource Grid source.
 */
QueryGridController.prototype.selectTab = function (gridSource) {
  const source = gridSource.source;
  this.selectedTab = source.label;
  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }
  if (gridSource.configuration !== undefined) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(
      () => gridSource.configuration.selectedRows,
      (newSelected, oldSelectedRows) => {
        if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
          this.onSelectionChanged_();
        }
      },
    );
  }
  this.updateFeatures_(gridSource);
  this.reflowGrid_();
};
QueryGridController.prototype.reflowGrid_ = function () {
  // This is a "work-around" to make sure that the grid is rendered correctly.
  // When a pane is activated by setting `this.selectedTab`, the class `active`
  // is not yet set on the pane. That's why the class is set manually, and
  // after the pane is shown (in the next digest loop), the grid table can
  // be refreshed.
  const id = this.escapeValue(this.selectedTab || '');
  const activePane = this.$element_.find(`div.tab-pane#${id}`);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(() => {
    activePane.find('div.ngeo-grid-table-container table').trigger('reflow');
  });
};

/**
 * Called when the row selection has changed.
 */
QueryGridController.prototype.onSelectionChanged_ = function () {
  if (this.selectedTab === null) {
    return;
  }
  const gridSource = this.gridSources[`${this.selectedTab}`];
  this.updateFeatures_(gridSource);
};

/**
 * @param {GridSource} gridSource Grid source
 */
QueryGridController.prototype.updateFeatures_ = function (gridSource) {
  this.features_.clear();
  this.highlightFeatures_.clear();
  if (!gridSource.configuration) {
    return;
  }
  const sourceLabel = `${gridSource.source.label}`;
  const featuresForSource = this.featuresForSources_[sourceLabel];
  const selectedRows = gridSource.configuration.selectedRows;
  for (const rowId in featuresForSource) {
    const feature = featuresForSource[rowId];
    if (rowId in selectedRows) {
      this.highlightFeatures_.push(feature);
    } else {
      this.features_.push(feature);
    }
  }
};

/**
 * Returns if a row of the currently active grid is selected?
 *
 * @returns {boolean} Is one selected?
 */
QueryGridController.prototype.isOneSelected = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};

/**
 * Returns the number of selected rows of the currently active grid.
 *
 * @returns {number} The number of selected rows.
 */
QueryGridController.prototype.getSelectedRowCount = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return 0;
  } else {
    return source.configuration.getSelectedCount();
  }
};

/**
 * Select all rows of the currently active grid.
 */
QueryGridController.prototype.selectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};

/**
 * Deselect all rows of the currently active grid.
 */
QueryGridController.prototype.unselectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};

/**
 * Invert the selection of the currently active grid.
 */
QueryGridController.prototype.invertSelection = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};

/**
 * Zoom to the selected features.
 */
QueryGridController.prototype.zoomToSelection = function () {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const source = this.getActiveGridSource();
  if (source !== null) {
    const extent = ol_extent__WEBPACK_IMPORTED_MODULE_7__.createEmpty();
    this.highlightFeatures_.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      ol_extent__WEBPACK_IMPORTED_MODULE_7__.extend(extent, geometry.getExtent());
    });
    const size = this.map_.getSize();
    if (!size) {
      throw new Error('Missing size');
    }
    this.map_.getView().fit(extent, {
      size,
      maxZoom: this.options.maxRecenterZoom,
    });
  }
};

/**
 * Start a CSV download for the selected features.
 */
QueryGridController.prototype.downloadCsv = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const columnDefs = source.configuration.columnDefs;
    if (!columnDefs) {
      throw new Error('Missing columnDefs');
    }
    const selectedRows = source.configuration.getSelectedRows();
    this.ngeoCsvDownload_.startDownload(selectedRows, columnDefs, this.filename_);
  }
};
myModule.controller('GmfDisplayquerygridController', QueryGridController);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ })

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
/******/ 			"displayquerygrid": 0
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
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/displayquerygrid.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hNQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2w1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2Rpc3BsYXlxdWVyeWdyaWQuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9kaXNwbGF5cXVlcnlncmlkLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZEYXRhc291cmNlTWFuYWdlciBmcm9tICdnbWYvZGF0YXNvdXJjZS9NYW5hZ2VyJztcbmltcG9ydCBnbWZMYXllcnRyZWVDb21wb25lbnQgZnJvbSAnZ21mL2xheWVydHJlZS9jb21wb25lbnQnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBnbWZRdWVyeUdyaWRDb21wb25lbnQgZnJvbSAnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnO1xuaW1wb3J0IGdtZlRoZW1lTWFuYWdlciBmcm9tICdnbWYvdGhlbWUvTWFuYWdlcic7XG5pbXBvcnQgZ21mVGhlbWVUaGVtZXMgZnJvbSAnZ21mL3RoZW1lL1RoZW1lcyc7XG5pbXBvcnQgbmdlb0dyaWRNb2R1bGUgZnJvbSAnbmdlby9ncmlkL21vZHVsZSc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuaW1wb3J0IG5nZW9RdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L2NvbXBvbmVudCc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZkRhdGFzb3VyY2VNYW5hZ2VyLm5hbWUsXG4gIGdtZkxheWVydHJlZUNvbXBvbmVudC5uYW1lLFxuICBnbWZNYXBDb21wb25lbnQubmFtZSxcbiAgZ21mUXVlcnlHcmlkQ29tcG9uZW50Lm5hbWUsXG4gIGdtZlRoZW1lTWFuYWdlci5uYW1lLFxuICBnbWZUaGVtZVRoZW1lcy5uYW1lLFxuICBuZ2VvR3JpZE1vZHVsZS5uYW1lLFxuICBuZ2VvTWFwTW9kdWxlLm5hbWUsXG4gIC8vIGZvciBuZ2VvLm1hcC5GZWF0dXJlT3ZlcmxheSwgcGVyaGFwcyByZW1vdmUgbWVcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb1F1ZXJ5Q29tcG9uZW50Lm5hbWUsXG5dKTtcblxuLyoqXG4gKiBEZW1vLCBOT1QgVVNFRC5cbiAqIEEgc2FtcGxlIGNvbXBvbmVudCB0byBkaXNwbGF5IHRoZSByZXN1bHQuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IHF1ZXJ5cmVzdWx0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnZ21mYXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJyxcbiAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sJyksXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCdnbWZhcHBRdWVyeXJlc3VsdCcsIHF1ZXJ5cmVzdWx0Q29tcG9uZW50KTtcblxuUXVlcnlyZXN1bHRDb250cm9sbGVyLiRpbmplY3QgPSBbJ25nZW9RdWVyeVJlc3VsdCddO1xuXG4vKipcbiAqIERlbW8sIE5PVCBVU0VELlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH0gbmdlb1F1ZXJ5UmVzdWx0IFF1ZXJ5IHNlcnZpY2UuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gUXVlcnlyZXN1bHRDb250cm9sbGVyKG5nZW9RdWVyeVJlc3VsdCkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9xdWVyeS9NYXBRdWVyZW50JykuUXVlcnlSZXN1bHR9XG4gICAqL1xuICB0aGlzLnJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ2dtZmFwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJ2dtZlRoZW1lcycsICdnbWZEYXRhU291cmNlc01hbmFnZXInLCAnZ21mVGhlbWVNYW5hZ2VyJywgJ2RlZmF1bHRUaGVtZSddO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZS9UaGVtZXMnKS5UaGVtZXNTZXJ2aWNlfSBnbWZUaGVtZXMgVGhlIGdtZiB0aGVtZXMgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvZGF0YXNvdXJjZS9NYW5hZ2VyJykuRGF0YXNvdXJjZU1hbmFnZXJ9IGdtZkRhdGFTb3VyY2VzTWFuYWdlciBUaGUgZ21mXG4gKiAgICAgZGF0YSBzb3VyY2VzIG1hbmFnZXIgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvdGhlbWUvTWFuYWdlcicpLlRoZW1lTWFuYWdlclNlcnZpY2V9IGdtZlRoZW1lTWFuYWdlciBnbWYgVGhlbWUgTWFuYWdlciBzZXJ2aWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRUaGVtZSBUaGUgZGVmYXVsdCB0aGVtZS5cbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoZ21mVGhlbWVzLCBnbWZEYXRhU291cmNlc01hbmFnZXIsIGdtZlRoZW1lTWFuYWdlciwgZGVmYXVsdFRoZW1lKSB7XG4gIGdtZlRoZW1lcy5sb2FkVGhlbWVzKCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbMjUzNzYzNSwgMTE1MjY0MF0sXG4gICAgICB6b29tOiAzLFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG4gICAqL1xuICB0aGlzLmRpbWVuc2lvbnMgPSB7fTtcblxuICAvLyBJbml0IHRoZSBkYXRhc291cmNlcyB3aXRoIG91ciBtYXAuXG4gIGdtZkRhdGFTb3VyY2VzTWFuYWdlci5zZXREYXRhc291cmNlTWFwKHRoaXMubWFwKTtcbiAgLy8gR2l2ZSB0aGUgZGltZW5zaW9ucyB0byB0aGUgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyXG4gIGdtZkRhdGFTb3VyY2VzTWFuYWdlci5zZXREaW1lbnNpb25zKHRoaXMuZGltZW5zaW9ucyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5xdWVyeUFjdGl2ZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi90aGVtZXMnKS5HbWZUaGVtZVtdfHVuZGVmaW5lZH1cbiAgICogZXhwb3J0XG4gICAqL1xuICB0aGlzLnRoZW1lcyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZlRoZW1lfSBUaGUgc2VsZWN0ZWQgdGhlbWUuXG4gICAqL1xuICB0aGlzLnNlbGVjdGVkVGhlbWUgPSBudWxsO1xuICB0aGlzLnVwZGF0ZVRoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGdtZlRoZW1lTWFuYWdlci5hZGRUaGVtZSh0aGlzLnNlbGVjdGVkVGhlbWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucXVlcnlHcmlkQWN0aXZlID0gdHJ1ZTtcbiAgZ21mVGhlbWVzLmdldFRoZW1lc09iamVjdCgpLnRoZW4oKHRoZW1lcykgPT4ge1xuICAgIGlmICh0aGVtZXMpIHtcbiAgICAgIHRoaXMudGhlbWVzID0gdGhlbWVzO1xuXG4gICAgICAvLyBTZWxlY3QgZGVmYXVsdCB0aGVtZTtcbiAgICAgIHRoZW1lcy5mb3JFYWNoKCh0aGVtZSkgPT4ge1xuICAgICAgICBpZiAodGhlbWUubmFtZSA9PT0gZGVmYXVsdFRoZW1lKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1lID0gdGhlbWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG59XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCdnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucycsIHtcbiAgZmVhdHVyZXNTdHlsZToge1xuICAgIGZpbGw6IHtcbiAgICAgIGNvbG9yOiBbMjU1LCAxNzAsIDAsIDAuNl0sXG4gICAgfSxcbiAgICBjaXJjbGU6IHtcbiAgICAgIGZpbGw6IHtcbiAgICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XSxcbiAgICAgIH0sXG4gICAgICByYWRpdXM6IDUsXG4gICAgICBzdHJva2U6IHtcbiAgICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMV0sXG4gICAgICAgIHdpZHRoOiAyLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHN0cm9rZToge1xuICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMV0sXG4gICAgICB3aWR0aDogMixcbiAgICB9LFxuICB9LFxufSk7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDI0LTIwMjUgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHN2Z1NwaW5uZXIgZnJvbSAnZ21mL2ljb25zL3NwaW5uZXJfc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJnbWYtZGlzcGxheXF1ZXJ5Z3JpZCBwYW5lbFwiIG5nLXNob3c9XCJjdHJsLmFjdGl2ZVwiPlxuICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBuZy1jbGljaz1cImN0cmwuY2xlYXIoKVwiPiZ0aW1lczs8L2Rpdj5cblxuICA8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICA8bGlcbiAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICBuZy1jbGljaz1cImN0cmwuc2VsZWN0VGFiKGdyaWRTb3VyY2UpXCJcbiAgICA+XG4gICAgICA8YVxuICAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgaHJlZj1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgICAgICBuZy1jbGFzcz1cInsnYWN0aXZlJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxuICAgICAgICBkYXRhLXRhcmdldD1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgICAgICBhcmlhLWNvbnRyb2xzPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcbiAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwidGFiXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4+IHt7Z3JpZFNvdXJjZS5zb3VyY2UubGFiZWwgfCB0cmFuc2xhdGV9fSAoe3tncmlkU291cmNlLnNvdXJjZS5mZWF0dXJlcy5sZW5ndGh9fSkgPC9zcGFuPlxuICAgICAgPC9hPlxuICAgIDwvbGk+XG4gIDwvdWw+XG5cbiAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XG4gICAgPGRpdlxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxuICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgIGNsYXNzPVwidGFiLXBhbmVcIlxuICAgICAgbmctY2xhc3M9XCJ7J2FjdGl2ZScgOiBjdHJsLmlzU2VsZWN0ZWQoZ3JpZFNvdXJjZSl9XCJcbiAgICAgIGlkPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcbiAgICA+XG4gICAgICA8bmdlby1ncmlkIG5nZW8tZ3JpZC1jb25maWd1cmF0aW9uPVwiZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uXCI+IDwvbmdlby1ncmlkPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgbmctc2hvdz1cIiFjdHJsLnBlbmRpbmcgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkuY29uZmlndXJhdGlvbiAhPT0gbnVsbFwiXG4gICAgICAgIGNsYXNzPVwicm93XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC01IG15LWF1dG9cIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cImN0cmwuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXygpXCIgY2xhc3M9XCJnbWYtcXVlcnktZ3JpZC10b28tbWFueSB0ZXh0LXdhcm5pbmdcIlxuICAgICAgICAgICAgPjxzcGFuIG5nLWlmPVwiY3RybC5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgPj0gMFwiPnt7J09ubHknIHwgdHJhbnNsYXRlfX0ge3tjdHJsLnN1bU9mRmVhdHVyZXN9fSB7eydvZicgfCB0cmFuc2xhdGV9fSB7e2N0cmwuc3VtT2ZBdmFpbGFibGVSZXN1bHRzfX1cbiAgICAgICAgICAgIHt7J3Jlc3VsdHMgZGlzcGxheWVkLCBhcyB0aGUgbWF4aW11bSBudW1iZXIgaXMgcmVhY2hlZC4gUGxlYXNlIHJlZmluZSB5b3VyIHF1ZXJ5LicgfCB0cmFuc2xhdGVcbiAgICAgICAgICAgIH19PC9zcGFuXG4gICAgICAgICAgPjxzcGFuIG5nLWlmPVwiY3RybC5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgPCAwXCI+e3snT25lIG9mIHRoZSBxdWVyaWVzIHJldHVybnMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlc3VsdHMsIGJ1dCBwcm9iYWJseSBub3QgYWxsIHRoZSAgcmVzdWx0cyBhcmUgZGlzcGxheWVkLiBQbGVhc2UgcmVmaW5lIHlvdXIgcXVlcnkuJyB8IHRyYW5zbGF0ZX19XG4gICAgICAgICAgPC9zcGFuXG4gICAgICAgICAgPjwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtN1wiIGNsYXNzPVwicHVsbC1yaWdodFwiPlxuICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBqdXN0aWZ5LWNvbnRlbnQtZW5kXCI+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJuZy1oaWRlXCIgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLXNtIG5nLWJpbmRpbmdcIj5cbiAgICAgICAgICAgICAgICB7e2N0cmwuZ2V0U2VsZWN0ZWRSb3dDb3VudCgpfX0gPHNwYW4gdHJhbnNsYXRlPnNlbGVjdGVkIGVsZW1lbnQocyk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgPGxpIG5nLXNob3c9XCJjdHJsLmlzT25lU2VsZWN0ZWQoKVwiIGNsYXNzPVwibmctaGlkZVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt7J1pvb20gdG8gc2VsZWN0aW9uJyB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwuem9vbVRvU2VsZWN0aW9uKClcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1tYWduaWZ5aW5nLWdsYXNzLXBsdXNcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5ab29tIHRvPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgIDxsaSBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIiBjbGFzcz1cIm5nLWhpZGVcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGJ0bi1zbVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ7eydFeHBvcnQgc2VsZWN0aW9uIGFzIENTVicgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgICAgICAgICAgbmctY2xpY2s9XCJjdHJsLmRvd25sb2FkQ3N2KClcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1kb3dubG9hZFwiPjwvaT4gPHNwYW4gdHJhbnNsYXRlPkV4cG9ydCBhcyBDU1Y8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZHJvcHVwIGJ0biBidG4tZGVmYXVsdCBidG4tc20gZHJvcGRvd24tdG9nZ2xlXCJcbiAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT5TZWxlY3Q8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIG5nLWNsaWNrPVwiY3RybC5zZWxlY3RBbGwoKVwiIHRyYW5zbGF0ZT5BbGw8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBuZy1jbGljaz1cImN0cmwudW5zZWxlY3RBbGwoKVwiIHRyYW5zbGF0ZT5Ob25lPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgbmctY2xpY2s9XCJjdHJsLmludmVydFNlbGVjdGlvbigpXCIgdHJhbnNsYXRlPlJldmVyc2Ugc2VsZWN0aW9uPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IG5nLXNob3c9XCJjdHJsLnBlbmRpbmdcIiBjbGFzcz1cInNwaW5uZXItZ3JpZFwiPlxuICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1zcGluXCJcbiAgICAgICAgPiR7c3ZnU3Bpbm5lcignM3JlbScpfTwvaT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gO1xuIiwiUXVlcnlHcmlkQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAnJHNjb3BlJyxcbiAgJ25nZW9RdWVyeVJlc3VsdCcsXG4gICduZ2VvTWFwUXVlcmVudCcsXG4gICckdGltZW91dCcsXG4gICduZ2VvUXVlcnlPcHRpb25zJyxcbiAgJ2dtZkNzdkZpbGVuYW1lJyxcbiAgJyRlbGVtZW50JyxcbiAgJ2dtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zJyxcbl07XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBkb3dubG9hZENzdlNlcnZpY2UgZnJvbSAnbmdlby9kb3dubG9hZC9Dc3YnO1xuaW1wb3J0IG5nZW9HcmlkQ29tcG9uZW50IGZyb20gJ25nZW8vZ3JpZC9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9HcmlkQ29uZmlnLCB7Z2V0Um93VWlkfSBmcm9tICduZ2VvL2dyaWQvQ29uZmlnJztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuaW1wb3J0IG5nZW9RdWVyeU1hcFF1ZXJlbnQgZnJvbSAnbmdlby9xdWVyeS9NYXBRdWVyZW50JztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbic7XG5pbXBvcnQgKiBhcyBvbEV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQge2J1aWxkU3R5bGV9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG5pbXBvcnQgcGFuZWxzIGZyb20gJ2dtZmFwaS9zdG9yZS9wYW5lbHMnO1xuaW1wb3J0ICdib290c3RyYXAvanMvc3JjL2Ryb3Bkb3duJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9ncmlkQ29tcG9uZW50Lmh0bWwnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGEgZ3JpZCB0YWIuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gR3JpZFNvdXJjZVxuICogQHByb3BlcnR5IHtpbXBvcnQoJ25nZW8vZ3JpZC9Db25maWcnKS5kZWZhdWx0fSBbY29uZmlndXJhdGlvbl0gQ29uZmlndXJhdGlvbiB1c2VkIHRvIGluaXRpYWxpemUgYSBncmlkLlxuICogQHByb3BlcnR5IHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSBzb3VyY2UgUmVzdWx0cyBvZiB0aGUgcXVlcnlcbiAqICAgIHNvdXJjZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZlF1ZXJ5R3JpZENvbXBvbmVudCcsIFtuZ2VvR3JpZENvbXBvbmVudC5uYW1lLCBuZ2VvUXVlcnlNYXBRdWVyZW50Lm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gICAqL1xuICAoJGVsZW1lbnQsICRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLmdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZXVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9xdWVyeS9ncmlkQ29tcG9uZW50JztcbiAgfSxcbik7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9xdWVyeS9ncmlkQ29tcG9uZW50JywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcblxuLyoqXG4gKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEpRdWVyeSwgYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsIFRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRhdHRycycsICdnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGNvbXBvbmVudCB0byBkaXNwbGF5IHJlc3VsdHMgb2YgdGhlIHtAbGluayBpbXBvcnQoJ25nZW8vcXVlcnlSZXN1bHQnKS5kZWZhdWx0fSBpbiBhXG4gKiBncmlkIGFuZCBzaG93cyByZWxhdGVkIGZlYXR1cmVzIG9uIHRoZSBtYXAgdXNpbmdcbiAqIHRoZSB7QGxpbmsgaW1wb3J0KCduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncicpLkZlYXR1cmVPdmVybGF5TWdyfS5cbiAqXG4gKiBZb3UgY2FuIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGNvbXBvbmVudCdzIHRlbXBsYXRlIGJ5IHNldHRpbmcgdGhlXG4gKiB2YWx1ZSBgZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsYC5cbiAqXG4gKiBGZWF0dXJlcyBkaXNwbGF5ZWQgb24gdGhlIG1hcCB1c2UgYSBkZWZhdWx0IHN0eWxlIGJ1dCB5b3UgY2FuIG92ZXJyaWRlIHRoZXNlXG4gKiBzdHlsZXMgYnkgcGFzc2luZyBvbC5zdHlsZS5TdHlsZSBvYmplY3RzIGFzIGF0dHJpYnV0ZXMgb2YgdGhpcyBjb21wb25lbnQuXG4gKlxuICogTm90ZTogdGhlIGZvbGxvd2luZyBuZy1jbGFzcyBuZWVkIHRvIGJlIHByZXNlbnQgaW4gdGhlIGludGVyZmFjZSA8Ym9keT4gZWxlbWVudCB0byBkaXNwbGF5IHRoZSBmb290ZXJcbiAqIHdoZW4gdGhlIGdyaWQgaXMgYWN0aXZlIChpbml0aWFsbHkgdGhlcmUgc2hvdWxkIGJlIHRoZSBjb2RlIGZvciB0aGUgcHJvZmlsZSB0b29sKTpcbiAqICAgICAgPGJvZHkgbmctY2xhc3M9XCJ7XG4gKiAgICAgICAgJ2dtZi1wcm9maWxlLWNoYXJ0LWFjdGl2ZSc6ICEhcHJvZmlsZUNoYXJ0QWN0aXZlLFxuICogICAgICAgICdnbWYtcXVlcnktZ3JpZC1hY3RpdmUnOiAhIXF1ZXJ5R3JpZEFjdGl2ZVxuICogICAgICB9XCI+XG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIDxnbWYtZGlzcGxheXF1ZXJ5Z3JpZCBnbWYtZGlzcGxheXF1ZXJ5Z3JpZC1tYXA9XCJjdHJsLm1hcFwiPjwvZ21mLWRpc3BsYXlxdWVyeWdyaWQ+XG4gKlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IGdtZi1kaXNwbGF5cXVlcnlncmlkLWFjdGl2ZSBUaGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fSBnbWYtZGlzcGxheXF1ZXJ5Z3JpZC1tYXAgVGhlIG1hcC5cbiAqIEBuZ2RvYyBjb21wb25lbnRcbiAqIEBuZ25hbWUgZ21mRGlzcGxheXF1ZXJ5Z3JpZFxuICovXG5jb25zdCBxdWVyeUdyaWRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdHbWZEaXNwbGF5cXVlcnlncmlkQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgYmluZGluZ3M6IHtcbiAgICAnYWN0aXZlJzogJz0/Z21mRGlzcGxheXF1ZXJ5Z3JpZEFjdGl2ZScsXG4gICAgJ2dldE1hcEZuJzogJyZnbWZEaXNwbGF5cXVlcnlncmlkTWFwJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2dtZkRpc3BsYXlxdWVyeWdyaWQnLCBxdWVyeUdyaWRDb21wb25lbnQpO1xuXG4vKipcbiAqIENvbnRyb2xsZXIgZm9yIHRoZSBxdWVyeSBncmlkLlxuICpcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fSBuZ2VvUXVlcnlSZXN1bHQgbmdlbyBxdWVyeSByZXN1bHQuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9xdWVyeS9NYXBRdWVyZW50JykuTWFwUXVlcmVudH0gbmdlb01hcFF1ZXJlbnQgbmdlbyBtYXAgcXVlcmVudCBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklUaW1lb3V0U2VydmljZX0gJHRpbWVvdXQgQW5ndWxhciB0aW1lb3V0IHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb1F1ZXJ5T3B0aW9uc30gbmdlb1F1ZXJ5T3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZkNzdkZpbGVuYW1lfSBnbWZDc3ZGaWxlbmFtZSBUaGUgQ1NWIGZpbGUgbmFtZS5cbiAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnN9IGdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zIFRoZSBvcHRpb25zLlxuICogQGNsYXNzXG4gKiBAaGlkZGVuXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBHbWZEaXNwbGF5cXVlcnlncmlkQ29udHJvbGxlclxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVlcnlHcmlkQ29udHJvbGxlcihcbiAgJHNjb3BlLFxuICBuZ2VvUXVlcnlSZXN1bHQsXG4gIG5nZW9NYXBRdWVyZW50LFxuICAkdGltZW91dCxcbiAgbmdlb1F1ZXJ5T3B0aW9ucyxcbiAgZ21mQ3N2RmlsZW5hbWUsXG4gICRlbGVtZW50LFxuICBnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucyxcbikge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9uc31cbiAgICovXG4gIHRoaXMub3B0aW9ucyA9IGdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklUaW1lb3V0U2VydmljZX1cbiAgICovXG4gIHRoaXMuJHRpbWVvdXRfID0gJHRpbWVvdXQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fVxuICAgKi9cbiAgdGhpcy5uZ2VvUXVlcnlSZXN1bHQgPSBuZ2VvUXVlcnlSZXN1bHQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLk1hcFF1ZXJlbnR9XG4gICAqL1xuICB0aGlzLm5nZW9NYXBRdWVyZW50XyA9IG5nZW9NYXBRdWVyZW50O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL2Rvd25sb2FkL0NzdicpLkRvd25sb2FkQ3N2U2VydmljZX1cbiAgICovXG4gIHRoaXMubmdlb0NzdkRvd25sb2FkXyA9IGRvd25sb2FkQ3N2U2VydmljZTtcblxuICAvKipcbiAgICogQHR5cGUge0pRdWVyeX1cbiAgICovXG4gIHRoaXMuJGVsZW1lbnRfID0gJGVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLm1heFJlc3VsdHMgPSBuZ2VvUXVlcnlPcHRpb25zLmxpbWl0ICE9PSB1bmRlZmluZWQgPyBuZ2VvUXVlcnlPcHRpb25zLmxpbWl0IDogNTA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIEdyaWRTb3VyY2U+fVxuICAgKi9cbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBJRHMgb2YgdGhlIGdyaWQgc291cmNlcyBpbiB0aGUgb3JkZXIgdGhleSB3ZXJlIGxvYWRlZC5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgKi9cbiAgdGhpcy5sb2FkZWRHcmlkU291cmNlcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIGN1cnJlbnRseSBzaG93biBxdWVyeSBzb3VyY2UuXG4gICAqXG4gICAqIEB0eXBlIHs/c3RyaW5nfG51bWJlcn1cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIG1hcHBpbmcgYmV0d2VlbiByb3cgdWlkIGFuZCB0aGUgY29ycmVzcG9uZGluZyBmZWF0dXJlIGZvciBlYWNoXG4gICAqIHNvdXJjZS5cbiAgICpcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIE9iamVjdDxzdHJpbmcsIGltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+Pn1cbiAgICovXG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuXG4gIC8vIFN0eWxlcyBmb3IgZGlzcGxheWVkIGZlYXR1cmVzIChmZWF0dXJlcykgYW5kIHNlbGVjdGVkIGZlYXR1cmVzXG4gIC8vIChoaWdobGlnaHRGZWF0dXJlc18pICh1c2VyIGNhbiBzZXQgYm90aCBzdHlsZXMpLlxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvQ29sbGVjdGlvbicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICB0aGlzLmZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvQ29sbGVjdGlvbicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcblxuICAvKipcbiAgICogRmlsZW5hbWVcbiAgICpcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZDc3ZGaWxlbmFtZX1cbiAgICovXG4gIHRoaXMuZmlsZW5hbWVfID0gZ21mQ3N2RmlsZW5hbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXBfID0gbnVsbDtcblxuICAvKipcbiAgICogU3VtIG92ZXIgYWxsIHRhYnMgb2YgdGhlIG9idGFpbmVkIHJlc3VsdHNcbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMuc3VtT2ZGZWF0dXJlcyA9IDA7XG5cbiAgLyoqXG4gICAqIFN1bSBvdmVyIGFsbCB0YWJzIG9mIHRoZSBhdmFpbGFibGUgcmVzdWx0c1xuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgdGhpcy5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgPSAwO1xuXG4gIC8vIFdhdGNoIHRoZSBuZ2VvIHF1ZXJ5IHJlc3VsdCBzZXJ2aWNlLlxuICB0aGlzLiRzY29wZV8uJHdhdGNoQ29sbGVjdGlvbihcbiAgICAoKSA9PiBuZ2VvUXVlcnlSZXN1bHQsXG4gICAgKG5ld1F1ZXJ5UmVzdWx0LCBvbGRRdWVyeVJlc3VsdCkgPT4ge1xuICAgICAgLy8gT3BlbiB0aGUgcGFuZWwgYmVmb3JlIHJlc3VsdHMgZm9yIGZpcnN0IHJlcXVlc3QgKGRpc3BsYXkgdGhlIHNwaW5uZXIpXG4gICAgICBpZiAobmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmcpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICBwYW5lbHMub3BlbkZvb3RlclBhbmVsKCdxdWVyeXJlc3VsdCcsIHtcbiAgICAgICAgICBzdGF0ZTogdHJ1ZSxcbiAgICAgICAgICBub0Vycm9yOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdRdWVyeVJlc3VsdCAhPT0gb2xkUXVlcnlSZXN1bHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhXygpO1xuICAgICAgfVxuICAgIH0sXG4gICk7XG5cbiAgLyoqXG4gICAqIEFuIHVucmVnaXN0ZXIgZnVuY3Rpb24gcmV0dXJuZWQgZnJvbSBgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb25gIGZvclxuICAgKiBcIm9uLXNlbGVjdFwiIGNoYW5nZXMgKHdoZW4gcm93cyBhcmUgc2VsZWN0ZWQvdW5zZWxlY3RlZCkuXG4gICAqXG4gICAqIEB0eXBlIHs/ZnVuY3Rpb24oKTogdm9pZH1cbiAgICovXG4gIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez8oKSA9PiBvbE1hcH1cbiAgICovXG4gIHRoaXMuZ2V0TWFwRm4gPSBudWxsO1xufVxuXG4vKipcbiAqIEluaXQgdGhlIGNvbnRyb2xsZXJcbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmdldE1hcEZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdldE1hcEZuJyk7XG4gIH1cbiAgY29uc3QgZmVhdHVyZXNPdmVybGF5ID0gbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gIGZlYXR1cmVzT3ZlcmxheS5zZXRGZWF0dXJlcyh0aGlzLmZlYXR1cmVzXyk7XG4gIGZlYXR1cmVzT3ZlcmxheS5zZXRTdHlsZShidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5mZWF0dXJlc1N0eWxlKSk7XG4gIGNvbnN0IGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheSA9IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0RmVhdHVyZXModGhpcy5oaWdobGlnaHRGZWF0dXJlc18pO1xuICBjb25zdCBoaWdobGlnaHRGZWF0dXJlU3R5bGUgPSBidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5zZWxlY3RlZEZlYXR1cmVTdHlsZSk7XG4gIGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheS5zZXRTdHlsZShoaWdobGlnaHRGZWF0dXJlU3R5bGUpO1xuICBjb25zdCBtYXBGbiA9IHRoaXMuZ2V0TWFwRm47XG4gIGlmIChtYXBGbikge1xuICAgIGNvbnN0IG1hcCA9IG1hcEZuKCk7XG4gICAgaWYgKCEobWFwIGluc3RhbmNlb2Ygb2xNYXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIG1hcCB0eXBlJyk7XG4gICAgfVxuICAgIHRoaXMubWFwXyA9IG1hcDtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBncmlkIHNvdXJjZXMgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBsb2FkZWQuXG4gKlxuICogQHJldHVybnMge0dyaWRTb3VyY2VbXX0gR3JpZCBzb3VyY2VzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRHcmlkU291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMubWFwKChzb3VyY2VMYWJlbCkgPT4gdGhpcy5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF0pO1xufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURhdGFfID0gZnVuY3Rpb24gKCkge1xuICAvLyBjbG9zZSBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0c1xuICBpZiAoXG4gICAgKHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmcgfHwgdGhpcy5uZ2VvUXVlcnlSZXN1bHQudG90YWwgPT09IDApICYmXG4gICAgIXRoaXMuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXygpXG4gICkge1xuICAgIGNvbnN0IG9sZEFjdGl2ZSA9IHRoaXMuYWN0aXZlO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICBpZiAob2xkQWN0aXZlKSB7XG4gICAgICAvLyBkb24ndCBjbG9zZSBpZiB0aGVyZSBhcmUgcGVuZGluZyBxdWVyaWVzXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmc7XG4gICAgICBwYW5lbHMub3BlbkZvb3RlclBhbmVsKCdxdWVyeXJlc3VsdCcsIHtcbiAgICAgICAgc3RhdGU6IHRoaXMuYWN0aXZlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgPSAwO1xuICB0aGlzLnN1bU9mRmVhdHVyZXMgPSAwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAqL1xuICBjb25zdCBjb3VudGVkU291cmNlcyA9IFtdO1xuICB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgIGlmICghY291bnRlZFNvdXJjZXMuaW5jbHVkZXMoc291cmNlLmxhYmVsKSkge1xuICAgICAgdGhpcy5zdW1PZkZlYXR1cmVzICs9IHNvdXJjZS5mZWF0dXJlcy5sZW5ndGg7XG4gICAgfVxuICAgIGlmICghc291cmNlLnJlcXVlc3RQYXJ0bmVycyB8fCAhc291cmNlLnJlcXVlc3RQYXJ0bmVycy5zb21lKChsYWJlbCkgPT4gY291bnRlZFNvdXJjZXMuaW5jbHVkZXMobGFiZWwpKSkge1xuICAgICAgaWYgKHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA8IDAgfHwgdGhpcy5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgPCAwKSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IG9uZSBxdWVyeSB3aXRob3V0IGFueSBjb3VudCA9PiB3ZSBjYW4ndCBkaXNwbGF5IHRoZSB0b3RhbCBjb3VudFxuICAgICAgICB0aGlzLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgKz0gc291cmNlLnRvdGFsRmVhdHVyZUNvdW50O1xuICAgICAgfVxuICAgIH1cbiAgICBjb3VudGVkU291cmNlcy5wdXNoKHNvdXJjZS5sYWJlbCk7XG4gIH0pO1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgIHN0YXRlOiB0cnVlLFxuICB9KTtcbiAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gIGxldCBzb3VyY2VzID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcztcbiAgLy8gbWVyZ2Ugc291cmNlcyBpZiByZXF1ZXN0ZWRcbiAgaWYgKE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5tZXJnZVRhYnMgfHwge30pLmxlbmd0aCA+IDApIHtcbiAgICBzb3VyY2VzID0gdGhpcy5nZXRNZXJnZWRTb3VyY2VzXyhzb3VyY2VzKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBncmlkcyAob25seSBmb3Igc291cmNlIHdpdGggZmVhdHVyZXMgb3Igd2l0aCB0b28gbWFueSByZXN1bHRzKVxuICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgIGlmIChzb3VyY2UudG9vTWFueVJlc3VsdHMgJiYgc291cmNlLmZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5tYWtlR3JpZF8obnVsbCwgc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291cmNlLmlkID0gdGhpcy5lc2NhcGVWYWx1ZShzb3VyY2UuaWQpO1xuICAgICAgY29uc3QgZmVhdHVyZXMgPSBzb3VyY2UuZmVhdHVyZXM7XG4gICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNvbGxlY3REYXRhXyhzb3VyY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIGlmIG5vIGdyaWRzIHdlcmUgY3JlYXRlZCwgZG8gbm90IHNob3dcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgICAgc3RhdGU6IGZhbHNlLFxuICAgICAgbm9FcnJvcjogdHJ1ZSxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBrZWVwIHRoZSBmaXJzdCBleGlzdGluZyBuYXZpZ2F0aW9uIHRhYiBvcGVuXG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsIHx8ICEoYCR7dGhpcy5zZWxlY3RlZFRhYn1gIGluIHRoaXMuZ3JpZFNvdXJjZXMpKSB7XG4gICAgLy8gc2VsZWN0aW5nIHRoZSB0YWIgaXMgZG9uZSBpbiBhIHRpbWVvdXQsIGJlY2F1c2Ugb3RoZXJ3aXNlIGluIHJhcmUgY2FzZXNcbiAgICAvLyBgbmctY2xhc3NgIG1pZ2h0IHNldCB0aGUgYGFjdGl2ZWAgY2xhc3Mgb24gbXVsdGlwbGUgdGFicy5cbiAgICB0aGlzLiR0aW1lb3V0XygoKSA9PiB7XG4gICAgICBjb25zdCBmaXJzdFNvdXJjZUlkID0gdGhpcy5sb2FkZWRHcmlkU291cmNlc1swXTtcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZ3JpZFNvdXJjZXNbZmlyc3RTb3VyY2VJZF0pO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHtib29sZWFufSBJZiBvbmUgb2YgdGhlIHNvdXJjZSBoYXMgdG9vIG1hbnkgcmVzdWx0cy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UudG9vTWFueVJlc3VsdHMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSB3aXRoIGFsbCBzeW1ib2xzIGFuZCBzcGFjZXMgcmVwbGFjZWQgYnkgYW4gdW5kZXJzY29yZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHZhbHVlIEEgdmFsdWUgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ3xudW1iZXJ9IHZhbHVlIEFuIGVzY2FwZWQgdmFsdWUuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmVzY2FwZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIC8vIFdvcmstYXJvdW5kIGZvciBOdW1iZXIuaXNJbnRlZ2VyKCkgd2hlbiBub3QgYWx3YXlzIGdldHRpbmcgYSBudW1iZXIgLi4uXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdG9Fc2NhcGUgPSAvWy1bXFxdL3t9KCkqKz8uXFxcXF4kIHxdL2c7XG4gICAgaWYgKHZhbHVlLm1hdGNoKHRvRXNjYXBlKSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UodG9Fc2NhcGUsICdfJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBpZiB0aGUgZ2l2ZW4gZ3JpZCBzb3VyY2UgaXMgc2VsZWN0ZWQ/XG4gKlxuICogQHBhcmFtIHtHcmlkU291cmNlfSBncmlkU291cmNlIEdyaWQgc291cmNlLlxuICogQHJldHVybnMge2Jvb2xlYW59IElzIHNlbGVjdGVkP1xuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlbGVjdGVkID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIgPT09IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsO1xufTtcblxuLyoqXG4gKiBUcnkgdG8gbWVyZ2UgdGhlIG1lcmdlYWJsZSBzb3VyY2VzLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZVtdfSBzb3VyY2VzIFNvdXJjZXMuXG4gKiBAcmV0dXJucyB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZVtdfSBUaGUgbWVyZ2VkIHNvdXJjZXMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZXNfID0gZnVuY3Rpb24gKHNvdXJjZXMpIHtcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlW119ICovXG4gIGNvbnN0IGFsbFNvdXJjZXMgPSBbXTtcbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlPn0gKi9cbiAgY29uc3QgbWVyZ2VkU291cmNlcyA9IHt9O1xuICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgIC8vIGNoZWNrIGlmIHRoaXMgc291cmNlIGNhbiBiZSBtZXJnZWRcbiAgICBjb25zdCBtZXJnZWRTb3VyY2UgPSB0aGlzLmdldE1lcmdlZFNvdXJjZV8oc291cmNlLCBtZXJnZWRTb3VyY2VzKTtcbiAgICBpZiAobWVyZ2VkU291cmNlID09PSBudWxsKSB7XG4gICAgICAvLyB0aGlzIHNvdXJjZSBzaG91bGQgbm90IGJlIG1lcmdlZCwgYWRkIGFzIGlzXG4gICAgICBhbGxTb3VyY2VzLnB1c2goc291cmNlKTtcbiAgICB9XG4gIH0pO1xuICBmb3IgKGNvbnN0IG1lcmdlZFNvdXJjZUlkIGluIG1lcmdlZFNvdXJjZXMpIHtcbiAgICBhbGxTb3VyY2VzLnB1c2gobWVyZ2VkU291cmNlc1ttZXJnZWRTb3VyY2VJZF0pO1xuICB9XG4gIHJldHVybiBhbGxTb3VyY2VzO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gc291cmNlIHNob3VsZCBiZSBtZXJnZWQuIElmIHNvLCBhbiBhcnRpZmljaWFsIHNvdXJjZVxuICogdGhhdCB3aWxsIGNvbnRhaW4gdGhlIGZlYXR1cmVzIG9mIGFsbCBtZXJnZWFibGUgc291cmNlcyBpcyByZXR1cm5lZC4gSWYgbm90LFxuICogYG51bGxgIGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gc291cmNlIFNvdXJjZS5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgaW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZT59IG1lcmdlZFNvdXJjZXNcbiAqICAgIE1lcmdlZCBzb3VyY2VzLlxuICogQHJldHVybnMgez9pbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSBBIG1lcmdlZCBzb3VyY2Ugb2YgbnVsbCBpZiB0aGVcbiAqICAgIHNvdXJjZSBzaG91bGQgbm90IGJlIG1lcmdlZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVyZ2VkU291cmNlXyA9IGZ1bmN0aW9uIChzb3VyY2UsIG1lcmdlZFNvdXJjZXMpIHtcbiAgbGV0IG1lcmdlU291cmNlSWQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGN1cnJlbnRNZXJnZVNvdXJjZUlkIGluIHRoaXMub3B0aW9ucy5tZXJnZVRhYnMgfHwge30pIHtcbiAgICBjb25zdCBzb3VyY2VMYWJlbHMgPSB0aGlzLm9wdGlvbnMubWVyZ2VUYWJzW2N1cnJlbnRNZXJnZVNvdXJjZUlkXTtcbiAgICBjb25zdCBjb250YWluc1NvdXJjZSA9IHNvdXJjZUxhYmVscy5zb21lKChzb3VyY2VMYWJlbCkgPT4gc291cmNlTGFiZWwgPT0gc291cmNlLmxhYmVsKTtcbiAgICBpZiAoY29udGFpbnNTb3VyY2UpIHtcbiAgICAgIG1lcmdlU291cmNlSWQgPSBjdXJyZW50TWVyZ2VTb3VyY2VJZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAobWVyZ2VTb3VyY2VJZCA9PT0gbnVsbCkge1xuICAgIC8vIHRoaXMgc291cmNlIHNob3VsZCBub3QgYmUgbWVyZ2VkXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gIGxldCBuZXdSZXF1ZXN0ID0gdHJ1ZTtcblxuICAvKiogQHR5cGUge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9ICovXG4gIGxldCBtZXJnZVNvdXJjZTtcbiAgaWYgKG1lcmdlU291cmNlSWQgaW4gbWVyZ2VkU291cmNlcykge1xuICAgIG1lcmdlU291cmNlID0gbWVyZ2VkU291cmNlc1ttZXJnZVNvdXJjZUlkXTtcbiAgICBpZiAoc291cmNlLnJlcXVlc3RQYXJ0bmVycykge1xuICAgICAgbmV3UmVxdWVzdCA9ICFzb3VyY2UucmVxdWVzdFBhcnRuZXJzLnNvbWUoKGxhYmVsKSA9PiBtZXJnZVNvdXJjZS5tZXJnZUNvbXBvc2FudHMuaW5jbHVkZXMobGFiZWwpKTtcbiAgICB9XG4gICAgbWVyZ2VTb3VyY2UubWVyZ2VDb21wb3NhbnRzLnB1c2goc291cmNlLmxhYmVsKTtcbiAgfSBlbHNlIHtcbiAgICBtZXJnZVNvdXJjZSA9IHtcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIGlkOiBtZXJnZVNvdXJjZUlkLFxuICAgICAgbGFiZWw6IG1lcmdlU291cmNlSWQsXG4gICAgICBmZWF0dXJlc0NvdW50OiAwLFxuICAgICAgLy90aGUgc3VtIG9mIHRoZSBvYnRhaW5lZCByZXN1bHRzIG9mIHRoZSBxdWVyeSBpcyBjb21wdXRlZCBsYXRlclxuICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICB0b29NYW55UmVzdWx0czogZmFsc2UsXG4gICAgICBtZXJnZUNvbXBvc2FudHM6IFtzb3VyY2UubGFiZWxdLFxuICAgIH07XG4gICAgbWVyZ2VkU291cmNlc1ttZXJnZVNvdXJjZUlkXSA9IG1lcmdlU291cmNlO1xuICB9XG5cbiAgLy8gYWRkIGZlYXR1cmVzIG9mIHNvdXJjZSB0byBtZXJnZSBzb3VyY2VcbiAgc291cmNlLmZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcbiAgICBtZXJnZVNvdXJjZS5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICB9KTtcblxuICAvLyBpZiBvbmUgb2YgdGhlIHNvdXJjZSBoYXMgdG9vIG1hbnkgcmVzdWx0cywgdGhlIHJlc3VsdGluZyBtZXJnZWQgc291cmNlIHdpbGxcbiAgLy8gYWxzbyBiZSBtYXJrZWQgd2l0aCBgdG9vTWFueVJlc3VsdHNgLlxuICBtZXJnZVNvdXJjZS50b29NYW55UmVzdWx0cyA9IG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzIHx8IHNvdXJjZS50b29NYW55UmVzdWx0cztcblxuICAvLyBmb3IgbGF5ZXJzIGNhbGxlZCB3aXRoIHRoZSBwcmV2aW91cyByZXF1ZXN0IHRoZSB0b3RhbEZlYXR1cmVDb3VudCAoYXZhaWxhYmxlIHJlc3VsdHMpIGFuZCB0aGUgbGltaXQgKG9idGFpbmVkIHJlc3VsdHMpXG4gIC8vIGFyZSBzdGlsbCB2YWxpZFxuICBpZiAobmV3UmVxdWVzdCkge1xuICAgIGlmIChzb3VyY2UudG90YWxGZWF0dXJlQ291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgPVxuICAgICAgICBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCArIHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudFxuICAgICAgICAgIDogc291cmNlLnRvdGFsRmVhdHVyZUNvdW50O1xuICAgIH1cbiAgICBtZXJnZVNvdXJjZS5mZWF0dXJlc0NvdW50ICs9IHNvdXJjZS5mZWF0dXJlc0NvdW50O1xuICB9XG4gIHJldHVybiBtZXJnZVNvdXJjZTtcbn07XG5cbi8qKlxuICogQ29sbGVjdCBhbGwgZmVhdHVyZXMgaW4gdGhlIHF1ZXJ5UmVzdWx0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9IHNvdXJjZSBSZXN1bHQgc291cmNlLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jb2xsZWN0RGF0YV8gPSBmdW5jdGlvbiAoc291cmNlKSB7XG4gIGNvbnN0IGZlYXR1cmVzID0gc291cmNlLmZlYXR1cmVzO1xuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+W119ICovXG4gIGNvbnN0IGFsbFByb3BlcnRpZXMgPSBbXTtcbiAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgY29uc3QgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyA9IFtdO1xuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsIGltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fSAqL1xuICBjb25zdCBmZWF0dXJlc0ZvclNvdXJjZSA9IHt9O1xuICBsZXQgcHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJ5TmFtZTtcbiAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgIHByb3BlcnRpZXMgPSBmZWF0dXJlLmdldFByb3BlcnRpZXMoKTtcbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBLZWVwcyBkaXN0aW5jdCBnZW9tZXRyeSBuYW1lcyB0byByZW1vdmUgdGhlbWUgbGF0ZXIuXG4gICAgICBmZWF0dXJlR2VvbWV0cnlOYW1lID0gZmVhdHVyZS5nZXRHZW9tZXRyeU5hbWUoKTtcbiAgICAgIGlmICghZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5pbmNsdWRlcyhmZWF0dXJlR2VvbWV0cnlOYW1lKSkge1xuICAgICAgICBmZWF0dXJlR2VvbWV0cmllc05hbWVzLnB1c2goZmVhdHVyZUdlb21ldHJ5TmFtZSk7XG4gICAgICB9XG4gICAgICBhbGxQcm9wZXJ0aWVzLnB1c2gocHJvcGVydGllcyk7XG4gICAgICBmZWF0dXJlc0ZvclNvdXJjZVtnZXRSb3dVaWQocHJvcGVydGllcyldID0gZmVhdHVyZTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLmNsZWFuUHJvcGVydGllc18oYWxsUHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyk7XG4gIGlmIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBncmlkQ3JlYXRlZCA9IHRoaXMubWFrZUdyaWRfKGFsbFByb3BlcnRpZXMsIHNvdXJjZSk7XG4gICAgaWYgKGdyaWRDcmVhdGVkKSB7XG4gICAgICB0aGlzLmZlYXR1cmVzRm9yU291cmNlc19bYCR7c291cmNlLmxhYmVsfWBdID0gZmVhdHVyZXNGb3JTb3VyY2U7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgdW53YW50ZWQgY29sdW1ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj5bXX0gYWxsUHJvcGVydGllcyBBIHJvdy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMgR2VvbWV0cnkgbmFtZXMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFuUHJvcGVydGllc18gPSBmdW5jdGlvbiAoYWxsUHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJpZXNOYW1lcykge1xuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnRpZXMpID0+IHtcbiAgICBmZWF0dXJlR2VvbWV0cmllc05hbWVzLmZvckVhY2goKGZlYXR1cmVHZW9tZXRyeU5hbWUpID0+IHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2ZlYXR1cmVHZW9tZXRyeU5hbWVdO1xuICAgIH0pO1xuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmJvdW5kZWRCeTtcbiAgICBkZWxldGUgcHJvcGVydGllcy5uZ2VvX2ZlYXR1cmVfdHlwZV87XG4gIH0pO1xuICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZUVtcHR5Q29sdW1ucyA9PT0gdHJ1ZSkge1xuICAgIHRoaXMucmVtb3ZlRW1wdHlDb2x1bW5zRm5fKGFsbFByb3BlcnRpZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjb2x1bW5zIHRoYXQgd2lsbCBiZSBjb21wbGV0ZWx5IGVtcHR5IGJldHdlZW4gZWFjaCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nfG51bWJlcnxib29sZWFuPltdfSBhbGxQcm9wZXJ0aWVzIEEgcm93LlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVFbXB0eUNvbHVtbnNGbl8gPSBmdW5jdGlvbiAoYWxsUHJvcGVydGllcykge1xuICAvLyBLZWVwIGFsbCBrZXlzIHRoYXQgY29ycmVzcG9uZCB0byBhdCBsZWFzdCBvbmUgdmFsdWUgaW4gYSBwcm9wZXJ0aWVzIG9iamVjdC5cbiAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgY29uc3Qga2V5c1RvS2VlcCA9IFtdO1xuICBsZXQgaSwga2V5O1xuICBmb3IgKGtleSBpbiBhbGxQcm9wZXJ0aWVzWzBdKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGFsbFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhbGxQcm9wZXJ0aWVzW2ldW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlzVG9LZWVwLnB1c2goa2V5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIEdldCBhbGwga2V5cyB0aGF0IHByZXZpb3VzbHkgYWx3YXlzIHJlZmVycyBhbHdheXMgdG8gYW4gZW1wdHkgdmFsdWUuXG4gIGxldCBrZXlUb1JlbW92ZTtcbiAgYWxsUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAga2V5VG9SZW1vdmUgPSBbXTtcbiAgICBmb3IgKGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoIWtleXNUb0tlZXAuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBrZXlUb1JlbW92ZS5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGVzZSBrZXlzLlxuICAgIGtleVRvUmVtb3ZlLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNba2V5XTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7P09iamVjdDxzdHJpbmcsIHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj5bXX0gZGF0YSBHcmlkIHJvd3MuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9IHNvdXJjZSBRdWVyeSBzb3VyY2UuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGEgZ3JpZCB3YXMgY3JlYXRlZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUubWFrZUdyaWRfID0gZnVuY3Rpb24gKGRhdGEsIHNvdXJjZSkge1xuICBjb25zdCBzb3VyY2VMYWJlbCA9IGAke3NvdXJjZS5sYWJlbH1gO1xuICBsZXQgZ3JpZENvbmZpZyA9IG51bGw7XG4gIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgZ3JpZENvbmZpZyA9IHRoaXMuZ2V0R3JpZENvbmZpZ3VyYXRpb25fKGRhdGEpO1xuICAgIGlmIChncmlkQ29uZmlnID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmICghdGhpcy5sb2FkZWRHcmlkU291cmNlcy5pbmNsdWRlcyhzb3VyY2VMYWJlbCkpIHtcbiAgICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLnB1c2goc291cmNlTGFiZWwpO1xuICB9XG4gIHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdID0ge1xuICAgIHNvdXJjZTogc291cmNlLFxuICB9O1xuICBpZiAoZ3JpZENvbmZpZykge1xuICAgIHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdLmNvbmZpZ3VyYXRpb24gPSBncmlkQ29uZmlnO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj5bXX0gZGF0YSBHcmlkIHJvd3MuXG4gKiBAcmV0dXJucyB7P2ltcG9ydCgnbmdlby9ncmlkL0NvbmZpZycpLmRlZmF1bHR9IEdyaWQgY29uZmlnLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRHcmlkQ29uZmlndXJhdGlvbl8gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRhdGEnKTtcbiAgfVxuICBjb25zdCBjbG9uZSA9IHt9O1xuICBPYmplY3QuYXNzaWduKGNsb25lLCBkYXRhWzBdKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBkZWxldGUgY2xvbmUub2xfdWlkO1xuICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMoY2xvbmUpO1xuXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCduZ2VvL2Rvd25sb2FkL0NzdicpLkdyaWRDb2x1bW5EZWZbXX0gKi9cbiAgY29uc3QgY29sdW1uRGVmcyA9IFtdO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgIGNvbHVtbkRlZnMucHVzaChcbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCduZ2VvL2Rvd25sb2FkL0NzdicpLkdyaWRDb2x1bW5EZWZ9ICovIHtcbiAgICAgICAgbmFtZTogY29sdW1uLFxuICAgICAgfSxcbiAgICApO1xuICB9KTtcbiAgaWYgKGNvbHVtbkRlZnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBuZXcgbmdlb0dyaWRDb25maWcoZGF0YSwgY29sdW1uRGVmcyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbm8gY29sdW1ucywgZG8gbm90IHNob3cgZ3JpZFxuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudGx5IHNob3duIGdyaWQgc291cmNlLlxuICpcbiAqIEByZXR1cm5zIHtHcmlkU291cmNlfG51bGx9IEdyaWQgc291cmNlLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRBY3RpdmVHcmlkU291cmNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmdyaWRTb3VyY2VzW2Ake3RoaXMuc2VsZWN0ZWRUYWJ9YF07XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBjdXJyZW50IHNlbGVjdGVkIGZlYXR1cmUgYW5kIHNvdXJjZSBhbmQgcmVtb3ZlIGFsbCBmZWF0dXJlc1xuICogZnJvbSB0aGUgbWFwLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgc3RhdGU6IGZhbHNlLFxuICAgIG5vRXJyb3I6IHRydWUsXG4gIH0pO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICB0aGlzLnRvb01hbnlSZXN1bHRzID0gZmFsc2U7XG4gIHRoaXMuZmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMubmdlb01hcFF1ZXJlbnRfLmNsZWFyKCk7XG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuICBpZiAodGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8pIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXygpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgdGFiIGZvciB0aGUgZ2l2ZW4gZ3JpZCBzb3VyY2UuXG4gKlxuICogQHBhcmFtIHtHcmlkU291cmNlfSBncmlkU291cmNlIEdyaWQgc291cmNlLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RUYWIgPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICBjb25zdCBzb3VyY2UgPSBncmlkU291cmNlLnNvdXJjZTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IHNvdXJjZS5sYWJlbDtcbiAgaWYgKHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8oKTtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IG51bGw7XG4gIH1cbiAgaWYgKGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSB0aGlzLiRzY29wZV8uJHdhdGNoQ29sbGVjdGlvbihcbiAgICAgICgpID0+IGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RlZFJvd3MsXG4gICAgICAobmV3U2VsZWN0ZWQsIG9sZFNlbGVjdGVkUm93cykgPT4ge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV3U2VsZWN0ZWQpICE9PSBPYmplY3Qua2V5cyhvbGRTZWxlY3RlZFJvd3MpKSB7XG4gICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWRfKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuICB0aGlzLnVwZGF0ZUZlYXR1cmVzXyhncmlkU291cmNlKTtcbiAgdGhpcy5yZWZsb3dHcmlkXygpO1xufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnJlZmxvd0dyaWRfID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaGlzIGlzIGEgXCJ3b3JrLWFyb3VuZFwiIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIGlzIHJlbmRlcmVkIGNvcnJlY3RseS5cbiAgLy8gV2hlbiBhIHBhbmUgaXMgYWN0aXZhdGVkIGJ5IHNldHRpbmcgYHRoaXMuc2VsZWN0ZWRUYWJgLCB0aGUgY2xhc3MgYGFjdGl2ZWBcbiAgLy8gaXMgbm90IHlldCBzZXQgb24gdGhlIHBhbmUuIFRoYXQncyB3aHkgdGhlIGNsYXNzIGlzIHNldCBtYW51YWxseSwgYW5kXG4gIC8vIGFmdGVyIHRoZSBwYW5lIGlzIHNob3duIChpbiB0aGUgbmV4dCBkaWdlc3QgbG9vcCksIHRoZSBncmlkIHRhYmxlIGNhblxuICAvLyBiZSByZWZyZXNoZWQuXG4gIGNvbnN0IGlkID0gdGhpcy5lc2NhcGVWYWx1ZSh0aGlzLnNlbGVjdGVkVGFiIHx8ICcnKTtcbiAgY29uc3QgYWN0aXZlUGFuZSA9IHRoaXMuJGVsZW1lbnRfLmZpbmQoYGRpdi50YWItcGFuZSMke2lkfWApO1xuICBhY3RpdmVQYW5lLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gIHRoaXMuJHRpbWVvdXRfKCgpID0+IHtcbiAgICBhY3RpdmVQYW5lLmZpbmQoJ2Rpdi5uZ2VvLWdyaWQtdGFibGUtY29udGFpbmVyIHRhYmxlJykudHJpZ2dlcigncmVmbG93Jyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiB0aGUgcm93IHNlbGVjdGlvbiBoYXMgY2hhbmdlZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUub25TZWxlY3Rpb25DaGFuZ2VkXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZ3JpZFNvdXJjZSA9IHRoaXMuZ3JpZFNvdXJjZXNbYCR7dGhpcy5zZWxlY3RlZFRhYn1gXTtcbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R3JpZFNvdXJjZX0gZ3JpZFNvdXJjZSBHcmlkIHNvdXJjZVxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICB0aGlzLmZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5jbGVhcigpO1xuICBpZiAoIWdyaWRTb3VyY2UuY29uZmlndXJhdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzb3VyY2VMYWJlbCA9IGAke2dyaWRTb3VyY2Uuc291cmNlLmxhYmVsfWA7XG4gIGNvbnN0IGZlYXR1cmVzRm9yU291cmNlID0gdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfW3NvdXJjZUxhYmVsXTtcbiAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdGVkUm93cztcbiAgZm9yIChjb25zdCByb3dJZCBpbiBmZWF0dXJlc0ZvclNvdXJjZSkge1xuICAgIGNvbnN0IGZlYXR1cmUgPSBmZWF0dXJlc0ZvclNvdXJjZVtyb3dJZF07XG4gICAgaWYgKHJvd0lkIGluIHNlbGVjdGVkUm93cykge1xuICAgICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18ucHVzaChmZWF0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mZWF0dXJlc18ucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBpZiBhIHJvdyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBncmlkIGlzIHNlbGVjdGVkP1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBJcyBvbmUgc2VsZWN0ZWQ/XG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmlzT25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlID09PSBudWxsIHx8IHNvdXJjZS5jb25maWd1cmF0aW9uID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZENvdW50KCkgPiAwO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzZWxlY3RlZCByb3dzIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdyaWQuXG4gKlxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiBzZWxlY3RlZCByb3dzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRTZWxlY3RlZFJvd0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZENvdW50KCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGFsbCByb3dzIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdyaWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RBbGwoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXNlbGVjdCBhbGwgcm93cyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBncmlkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi51bnNlbGVjdEFsbCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEludmVydCB0aGUgc2VsZWN0aW9uIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdyaWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmludmVydFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi5pbnZlcnRTZWxlY3Rpb24oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBab29tIHRvIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuem9vbVRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwXykge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGV4dGVudCA9IG9sRXh0ZW50LmNyZWF0ZUVtcHR5KCk7XG4gICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZW9tZXRyeScpO1xuICAgICAgfVxuICAgICAgb2xFeHRlbnQuZXh0ZW5kKGV4dGVudCwgZ2VvbWV0cnkuZ2V0RXh0ZW50KCkpO1xuICAgIH0pO1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLm1hcF8uZ2V0U2l6ZSgpO1xuICAgIGlmICghc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICB9XG4gICAgdGhpcy5tYXBfLmdldFZpZXcoKS5maXQoZXh0ZW50LCB7XG4gICAgICBzaXplLFxuICAgICAgbWF4Wm9vbTogdGhpcy5vcHRpb25zLm1heFJlY2VudGVyWm9vbSxcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydCBhIENTViBkb3dubG9hZCBmb3IgdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5kb3dubG9hZENzdiA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBjb25zdCBjb2x1bW5EZWZzID0gc291cmNlLmNvbmZpZ3VyYXRpb24uY29sdW1uRGVmcztcbiAgICBpZiAoIWNvbHVtbkRlZnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb2x1bW5EZWZzJyk7XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkUm93cygpO1xuICAgIHRoaXMubmdlb0NzdkRvd25sb2FkXy5zdGFydERvd25sb2FkKHNlbGVjdGVkUm93cywgY29sdW1uRGVmcywgdGhpcy5maWxlbmFtZV8pO1xuICB9XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXInLCBRdWVyeUdyaWRDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZGlzcGxheXF1ZXJ5Z3JpZFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9kaXNwbGF5cXVlcnlncmlkLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=