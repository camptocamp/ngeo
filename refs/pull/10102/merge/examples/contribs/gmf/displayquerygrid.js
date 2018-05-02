/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/displayquerygrid.js"
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
// Copyright (c) 2016-2026 Camptocamp SA
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


/***/ },

/***/ "./contribs/gmf/examples/displayquerygrid.scss"
/*!*****************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.scss ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/query/gridComponent.html.js"
/*!*****************************************!*\
  !*** ./src/query/gridComponent.html.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gmf_icons_spinner_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gmf/icons/spinner_svg */ "./src/icons/spinner_svg.ts");
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


/***/ },

/***/ "./src/query/gridComponent.js"
/*!************************************!*\
  !*** ./src/query/gridComponent.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
// Copyright (c) 2016-2026 Camptocamp SA
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
        noError: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hNQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbjVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9kaXNwbGF5cXVlcnlncmlkLmpzIiwid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5zY3NzIiwid2VicGFjazovL25nZW8vLi9zcmMvcXVlcnkvZ3JpZENvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcXVlcnkvZ3JpZENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL2Rpc3BsYXlxdWVyeWdyaWQuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZkRhdGFzb3VyY2VNYW5hZ2VyIGZyb20gJ2dtZi9kYXRhc291cmNlL01hbmFnZXInO1xuaW1wb3J0IGdtZkxheWVydHJlZUNvbXBvbmVudCBmcm9tICdnbWYvbGF5ZXJ0cmVlL2NvbXBvbmVudCc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuaW1wb3J0IGdtZlF1ZXJ5R3JpZENvbXBvbmVudCBmcm9tICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCc7XG5pbXBvcnQgZ21mVGhlbWVNYW5hZ2VyIGZyb20gJ2dtZi90aGVtZS9NYW5hZ2VyJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzJztcbmltcG9ydCBuZ2VvR3JpZE1vZHVsZSBmcm9tICduZ2VvL2dyaWQvbW9kdWxlJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudCc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5pbXBvcnQgbmdlb1F1ZXJ5Q29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvY29tcG9uZW50JztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mRGF0YXNvdXJjZU1hbmFnZXIubmFtZSxcbiAgZ21mTGF5ZXJ0cmVlQ29tcG9uZW50Lm5hbWUsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBnbWZRdWVyeUdyaWRDb21wb25lbnQubmFtZSxcbiAgZ21mVGhlbWVNYW5hZ2VyLm5hbWUsXG4gIGdtZlRoZW1lVGhlbWVzLm5hbWUsXG4gIG5nZW9HcmlkTW9kdWxlLm5hbWUsXG4gIG5nZW9NYXBNb2R1bGUubmFtZSxcbiAgLy8gZm9yIG5nZW8ubWFwLkZlYXR1cmVPdmVybGF5LCBwZXJoYXBzIHJlbW92ZSBtZVxuICBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLFxuICBuZ2VvUXVlcnlDb21wb25lbnQubmFtZSxcbl0pO1xuXG4vKipcbiAqIERlbW8sIE5PVCBVU0VELlxuICogQSBzYW1wbGUgY29tcG9uZW50IHRvIGRpc3BsYXkgdGhlIHJlc3VsdC5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3BhcnRpYWxzL3F1ZXJ5cmVzdWx0Lmh0bWwnKSxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2dtZmFwcFF1ZXJ5cmVzdWx0JywgcXVlcnlyZXN1bHRDb21wb25lbnQpO1xuXG5RdWVyeXJlc3VsdENvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdlb1F1ZXJ5UmVzdWx0J107XG5cbi8qKlxuICogRGVtbywgTk9UIFVTRUQuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fSBuZ2VvUXVlcnlSZXN1bHQgUXVlcnkgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBRdWVyeXJlc3VsdENvbnRyb2xsZXIobmdlb1F1ZXJ5UmVzdWx0KSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH1cbiAgICovXG4gIHRoaXMucmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xufVxubXlNb2R1bGUuY29udHJvbGxlcignZ21mYXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJywgUXVlcnlyZXN1bHRDb250cm9sbGVyKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnZ21mVGhlbWVzJywgJ2dtZkRhdGFTb3VyY2VzTWFuYWdlcicsICdnbWZUaGVtZU1hbmFnZXInLCAnZGVmYXVsdFRoZW1lJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lL1RoZW1lcycpLlRoZW1lc1NlcnZpY2V9IGdtZlRoZW1lcyBUaGUgZ21mIHRoZW1lcyBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9kYXRhc291cmNlL01hbmFnZXInKS5EYXRhc291cmNlTWFuYWdlcn0gZ21mRGF0YVNvdXJjZXNNYW5hZ2VyIFRoZSBnbWZcbiAqICAgICBkYXRhIHNvdXJjZXMgbWFuYWdlciBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZS9NYW5hZ2VyJykuVGhlbWVNYW5hZ2VyU2VydmljZX0gZ21mVGhlbWVNYW5hZ2VyIGdtZiBUaGVtZSBNYW5hZ2VyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFRoZW1lIFRoZSBkZWZhdWx0IHRoZW1lLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihnbWZUaGVtZXMsIGdtZkRhdGFTb3VyY2VzTWFuYWdlciwgZ21mVGhlbWVNYW5hZ2VyLCBkZWZhdWx0VGhlbWUpIHtcbiAgZ21mVGhlbWVzLmxvYWRUaGVtZXMoKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM3NjM1LCAxMTUyNjQwXSxcbiAgICAgIHpvb206IDMsXG4gICAgfSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAgICovXG4gIHRoaXMuZGltZW5zaW9ucyA9IHt9O1xuXG4gIC8vIEluaXQgdGhlIGRhdGFzb3VyY2VzIHdpdGggb3VyIG1hcC5cbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERhdGFzb3VyY2VNYXAodGhpcy5tYXApO1xuICAvLyBHaXZlIHRoZSBkaW1lbnNpb25zIHRvIHRoZSBnbWZEYXRhU291cmNlc01hbmFnZXJcbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERpbWVuc2lvbnModGhpcy5kaW1lbnNpb25zKTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QWN0aXZlID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZlRoZW1lW118dW5kZWZpbmVkfVxuICAgKiBleHBvcnRcbiAgICovXG4gIHRoaXMudGhlbWVzID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mVGhlbWV9IFRoZSBzZWxlY3RlZCB0aGVtZS5cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRUaGVtZSA9IG51bGw7XG4gIHRoaXMudXBkYXRlVGhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ21mVGhlbWVNYW5hZ2VyLmFkZFRoZW1lKHRoaXMuc2VsZWN0ZWRUaGVtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5xdWVyeUdyaWRBY3RpdmUgPSB0cnVlO1xuICBnbWZUaGVtZXMuZ2V0VGhlbWVzT2JqZWN0KCkudGhlbigodGhlbWVzKSA9PiB7XG4gICAgaWYgKHRoZW1lcykge1xuICAgICAgdGhpcy50aGVtZXMgPSB0aGVtZXM7XG5cbiAgICAgIC8vIFNlbGVjdCBkZWZhdWx0IHRoZW1lO1xuICAgICAgdGhlbWVzLmZvckVhY2goKHRoZW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGVtZS5uYW1lID09PSBkZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ2dtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zJywge1xuICBmZWF0dXJlc1N0eWxlOiB7XG4gICAgZmlsbDoge1xuICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XSxcbiAgICB9LFxuICAgIGNpcmNsZToge1xuICAgICAgZmlsbDoge1xuICAgICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAwLjZdLFxuICAgICAgfSxcbiAgICAgIHJhZGl1czogNSxcbiAgICAgIHN0cm9rZToge1xuICAgICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICAgICAgd2lkdGg6IDIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3Ryb2tlOiB7XG4gICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICAgIHdpZHRoOiAyLFxuICAgIH0sXG4gIH0sXG59KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgc3ZnU3Bpbm5lciBmcm9tICdnbWYvaWNvbnMvc3Bpbm5lcl9zdmcnO1xuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cImdtZi1kaXNwbGF5cXVlcnlncmlkIHBhbmVsXCIgbmctc2hvdz1cImN0cmwuYWN0aXZlXCI+XG4gIDxkaXYgY2xhc3M9XCJjbG9zZVwiIG5nLWNsaWNrPVwiY3RybC5jbGVhcigpXCI+JnRpbWVzOzwvZGl2PlxuXG4gIDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiByb2xlPVwidGFibGlzdFwiPlxuICAgIDxsaVxuICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiXG4gICAgICBuZy1yZXBlYXQ9XCJncmlkU291cmNlIGluIGN0cmwuZ2V0R3JpZFNvdXJjZXMoKSB0cmFjayBieSBncmlkU291cmNlLnNvdXJjZS5sYWJlbFwiXG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgIG5nLWNsaWNrPVwiY3RybC5zZWxlY3RUYWIoZ3JpZFNvdXJjZSlcIlxuICAgID5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwibmF2LWxpbmtcIlxuICAgICAgICBocmVmPVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXG4gICAgICAgIG5nLWNsYXNzPVwieydhY3RpdmUnIDogY3RybC5pc1NlbGVjdGVkKGdyaWRTb3VyY2UpfVwiXG4gICAgICAgIGRhdGEtdGFyZ2V0PVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXG4gICAgICAgIGFyaWEtY29udHJvbHM9XCJ7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgZGF0YS10b2dnbGU9XCJ0YWJcIlxuICAgICAgPlxuICAgICAgICA8c3Bhbj4ge3tncmlkU291cmNlLnNvdXJjZS5sYWJlbCB8IHRyYW5zbGF0ZX19ICh7e2dyaWRTb3VyY2Uuc291cmNlLmZlYXR1cmVzLmxlbmd0aH19KSA8L3NwYW4+XG4gICAgICA8L2E+XG4gICAgPC9saT5cbiAgPC91bD5cblxuICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICA8ZGl2XG4gICAgICBuZy1yZXBlYXQ9XCJncmlkU291cmNlIGluIGN0cmwuZ2V0R3JpZFNvdXJjZXMoKSB0cmFjayBieSBncmlkU291cmNlLnNvdXJjZS5sYWJlbFwiXG4gICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgY2xhc3M9XCJ0YWItcGFuZVwiXG4gICAgICBuZy1jbGFzcz1cInsnYWN0aXZlJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxuICAgICAgaWQ9XCJ7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgID5cbiAgICAgIDxuZ2VvLWdyaWQgbmdlby1ncmlkLWNvbmZpZ3VyYXRpb249XCJncmlkU291cmNlLmNvbmZpZ3VyYXRpb25cIj4gPC9uZ2VvLWdyaWQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgPGRpdlxuICAgICAgICBuZy1zaG93PVwiIWN0cmwucGVuZGluZyAmJiBjdHJsLmdldEFjdGl2ZUdyaWRTb3VyY2UoKSAmJiBjdHJsLmdldEFjdGl2ZUdyaWRTb3VyY2UoKS5jb25maWd1cmF0aW9uICE9PSBudWxsXCJcbiAgICAgICAgY2xhc3M9XCJyb3dcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTUgbXktYXV0b1wiPlxuICAgICAgICAgIDxzcGFuIG5nLWlmPVwiY3RybC5oYXNPbmVXaXRoVG9vTWFueVJlc3VsdHNfKClcIiBjbGFzcz1cImdtZi1xdWVyeS1ncmlkLXRvby1tYW55IHRleHQtd2FybmluZ1wiXG4gICAgICAgICAgICA+PHNwYW4gbmctaWY9XCJjdHJsLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA+PSAwXCI+e3snT25seScgfCB0cmFuc2xhdGV9fSB7e2N0cmwuc3VtT2ZGZWF0dXJlc319IHt7J29mJyB8IHRyYW5zbGF0ZX19IHt7Y3RybC5zdW1PZkF2YWlsYWJsZVJlc3VsdHN9fVxuICAgICAgICAgICAge3sncmVzdWx0cyBkaXNwbGF5ZWQsIGFzIHRoZSBtYXhpbXVtIG51bWJlciBpcyByZWFjaGVkLiBQbGVhc2UgcmVmaW5lIHlvdXIgcXVlcnkuJyB8IHRyYW5zbGF0ZVxuICAgICAgICAgICAgfX08L3NwYW5cbiAgICAgICAgICA+PHNwYW4gbmctaWY9XCJjdHJsLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA8IDBcIj57eydPbmUgb2YgdGhlIHF1ZXJpZXMgcmV0dXJucyB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmVzdWx0cywgYnV0IHByb2JhYmx5IG5vdCBhbGwgdGhlICByZXN1bHRzIGFyZSBkaXNwbGF5ZWQuIFBsZWFzZSByZWZpbmUgeW91ciBxdWVyeS4nIHwgdHJhbnNsYXRlfX1cbiAgICAgICAgICA8L3NwYW5cbiAgICAgICAgICA+PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC03XCIgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibmF2IGp1c3RpZnktY29udGVudC1lbmRcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5nLWhpZGVcIiBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tc20gbmctYmluZGluZ1wiPlxuICAgICAgICAgICAgICAgIHt7Y3RybC5nZXRTZWxlY3RlZFJvd0NvdW50KCl9fSA8c3BhbiB0cmFuc2xhdGU+c2VsZWN0ZWQgZWxlbWVudChzKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGkgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCIgY2xhc3M9XCJuZy1oaWRlXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3snWm9vbSB0byBzZWxlY3Rpb24nIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC56b29tVG9TZWxlY3Rpb24oKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLW1hZ25pZnlpbmctZ2xhc3MtcGx1c1wiPjwvaT4gPHNwYW4gdHJhbnNsYXRlPlpvb20gdG88L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgPGxpIG5nLXNob3c9XCJjdHJsLmlzT25lU2VsZWN0ZWQoKVwiIGNsYXNzPVwibmctaGlkZVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt7J0V4cG9ydCBzZWxlY3Rpb24gYXMgQ1NWJyB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwuZG93bmxvYWRDc3YoKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWRvd25sb2FkXCI+PC9pPiA8c3BhbiB0cmFuc2xhdGU+RXhwb3J0IGFzIENTVjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93blwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wdXAgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBkcm9wZG93bi10b2dnbGVcIlxuICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPlNlbGVjdDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgbmctY2xpY2s9XCJjdHJsLnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPkFsbDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIG5nLWNsaWNrPVwiY3RybC51bnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPk5vbmU8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBuZy1jbGljaz1cImN0cmwuaW52ZXJ0U2VsZWN0aW9uKClcIiB0cmFuc2xhdGU+UmV2ZXJzZSBzZWxlY3Rpb248L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgbmctc2hvdz1cImN0cmwucGVuZGluZ1wiIGNsYXNzPVwic3Bpbm5lci1ncmlkXCI+XG4gICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXNwaW5cIlxuICAgICAgICA+JHtzdmdTcGlubmVyKCczcmVtJyl9PC9pPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmA7XG4iLCJRdWVyeUdyaWRDb250cm9sbGVyLiRpbmplY3QgPSBbXG4gICckc2NvcGUnLFxuICAnbmdlb1F1ZXJ5UmVzdWx0JyxcbiAgJ25nZW9NYXBRdWVyZW50JyxcbiAgJyR0aW1lb3V0JyxcbiAgJ25nZW9RdWVyeU9wdGlvbnMnLFxuICAnZ21mQ3N2RmlsZW5hbWUnLFxuICAnJGVsZW1lbnQnLFxuICAnZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnMnLFxuXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGRvd25sb2FkQ3N2U2VydmljZSBmcm9tICduZ2VvL2Rvd25sb2FkL0Nzdic7XG5pbXBvcnQgbmdlb0dyaWRDb21wb25lbnQgZnJvbSAnbmdlby9ncmlkL2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb0dyaWRDb25maWcsIHtnZXRSb3dVaWR9IGZyb20gJ25nZW8vZ3JpZC9Db25maWcnO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncic7XG5pbXBvcnQgbmdlb1F1ZXJ5TWFwUXVlcmVudCBmcm9tICduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uJztcbmltcG9ydCAqIGFzIG9sRXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCB7YnVpbGRTdHlsZX0gZnJvbSAnbmdlby9vcHRpb25zJztcbmltcG9ydCBwYW5lbHMgZnJvbSAnZ21mYXBpL3N0b3JlL3BhbmVscyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9zcmMvZHJvcGRvd24nO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL2dyaWRDb21wb25lbnQuaHRtbCc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgYSBncmlkIHRhYi5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBHcmlkU291cmNlXG4gKiBAcHJvcGVydHkge2ltcG9ydCgnbmdlby9ncmlkL0NvbmZpZycpLmRlZmF1bHR9IFtjb25maWd1cmF0aW9uXSBDb25maWd1cmF0aW9uIHVzZWQgdG8gaW5pdGlhbGl6ZSBhIGdyaWQuXG4gKiBAcHJvcGVydHkge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9IHNvdXJjZSBSZXN1bHRzIG9mIHRoZSBxdWVyeVxuICogICAgc291cmNlLlxuICovXG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mUXVlcnlHcmlkQ29tcG9uZW50JywgW25nZW9HcmlkQ29tcG9uZW50Lm5hbWUsIG5nZW9RdWVyeU1hcFF1ZXJlbnQubmFtZV0pO1xubXlNb2R1bGUudmFsdWUoXG4gICdnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gJGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAgICovXG4gICgkZWxlbWVudCwgJGF0dHJzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRldXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnO1xuICB9LFxuKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xuXG4vKipcbiAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oSlF1ZXJ5LCBhbmd1bGFyLklBdHRyaWJ1dGVzKTogc3RyaW5nfSBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5nbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJGF0dHJzJywgJ2dtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCddO1xuZnVuY3Rpb24gZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMsIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMpO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgY29tcG9uZW50IHRvIGRpc3BsYXkgcmVzdWx0cyBvZiB0aGUge0BsaW5rIGltcG9ydCgnbmdlby9xdWVyeVJlc3VsdCcpLmRlZmF1bHR9IGluIGFcbiAqIGdyaWQgYW5kIHNob3dzIHJlbGF0ZWQgZmVhdHVyZXMgb24gdGhlIG1hcCB1c2luZ1xuICogdGhlIHtAbGluayBpbXBvcnQoJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJykuRmVhdHVyZU92ZXJsYXlNZ3J9LlxuICpcbiAqIFlvdSBjYW4gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgY29tcG9uZW50J3MgdGVtcGxhdGUgYnkgc2V0dGluZyB0aGVcbiAqIHZhbHVlIGBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxgLlxuICpcbiAqIEZlYXR1cmVzIGRpc3BsYXllZCBvbiB0aGUgbWFwIHVzZSBhIGRlZmF1bHQgc3R5bGUgYnV0IHlvdSBjYW4gb3ZlcnJpZGUgdGhlc2VcbiAqIHN0eWxlcyBieSBwYXNzaW5nIG9sLnN0eWxlLlN0eWxlIG9iamVjdHMgYXMgYXR0cmlidXRlcyBvZiB0aGlzIGNvbXBvbmVudC5cbiAqXG4gKiBOb3RlOiB0aGUgZm9sbG93aW5nIG5nLWNsYXNzIG5lZWQgdG8gYmUgcHJlc2VudCBpbiB0aGUgaW50ZXJmYWNlIDxib2R5PiBlbGVtZW50IHRvIGRpc3BsYXkgdGhlIGZvb3RlclxuICogd2hlbiB0aGUgZ3JpZCBpcyBhY3RpdmUgKGluaXRpYWxseSB0aGVyZSBzaG91bGQgYmUgdGhlIGNvZGUgZm9yIHRoZSBwcm9maWxlIHRvb2wpOlxuICogICAgICA8Ym9keSBuZy1jbGFzcz1cIntcbiAqICAgICAgICAnZ21mLXByb2ZpbGUtY2hhcnQtYWN0aXZlJzogISFwcm9maWxlQ2hhcnRBY3RpdmUsXG4gKiAgICAgICAgJ2dtZi1xdWVyeS1ncmlkLWFjdGl2ZSc6ICEhcXVlcnlHcmlkQWN0aXZlXG4gKiAgICAgIH1cIj5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgPGdtZi1kaXNwbGF5cXVlcnlncmlkIGdtZi1kaXNwbGF5cXVlcnlncmlkLW1hcD1cImN0cmwubWFwXCI+PC9nbWYtZGlzcGxheXF1ZXJ5Z3JpZD5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gZ21mLWRpc3BsYXlxdWVyeWdyaWQtYWN0aXZlIFRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC5cbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IGdtZi1kaXNwbGF5cXVlcnlncmlkLW1hcCBUaGUgbWFwLlxuICogQG5nZG9jIGNvbXBvbmVudFxuICogQG5nbmFtZSBnbWZEaXNwbGF5cXVlcnlncmlkXG4gKi9cbmNvbnN0IHF1ZXJ5R3JpZENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdhY3RpdmUnOiAnPT9nbWZEaXNwbGF5cXVlcnlncmlkQWN0aXZlJyxcbiAgICAnZ2V0TWFwRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRNYXAnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnZ21mRGlzcGxheXF1ZXJ5Z3JpZCcsIHF1ZXJ5R3JpZENvbXBvbmVudCk7XG5cbi8qKlxuICogQ29udHJvbGxlciBmb3IgdGhlIHF1ZXJ5IGdyaWQuXG4gKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9xdWVyeS9NYXBRdWVyZW50JykuUXVlcnlSZXN1bHR9IG5nZW9RdWVyeVJlc3VsdCBuZ2VvIHF1ZXJ5IHJlc3VsdC5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5NYXBRdWVyZW50fSBuZ2VvTWFwUXVlcmVudCBuZ2VvIG1hcCBxdWVyZW50IHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfSAkdGltZW91dCBBbmd1bGFyIHRpbWVvdXQgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvUXVlcnlPcHRpb25zfSBuZ2VvUXVlcnlPcHRpb25zIFRoZSBvcHRpb25zLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mQ3N2RmlsZW5hbWV9IGdtZkNzdkZpbGVuYW1lIFRoZSBDU1YgZmlsZSBuYW1lLlxuICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9uc30gZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gKiBAY2xhc3NcbiAqIEBoaWRkZW5cbiAqIEBuZ2RvYyBjb250cm9sbGVyXG4gKiBAbmduYW1lIEdtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWVyeUdyaWRDb250cm9sbGVyKFxuICAkc2NvcGUsXG4gIG5nZW9RdWVyeVJlc3VsdCxcbiAgbmdlb01hcFF1ZXJlbnQsXG4gICR0aW1lb3V0LFxuICBuZ2VvUXVlcnlPcHRpb25zLFxuICBnbWZDc3ZGaWxlbmFtZSxcbiAgJGVsZW1lbnQsXG4gIGdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zLFxuKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zfVxuICAgKi9cbiAgdGhpcy5vcHRpb25zID0gZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICovXG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy4kdGltZW91dF8gPSAkdGltZW91dDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9xdWVyeS9NYXBRdWVyZW50JykuUXVlcnlSZXN1bHR9XG4gICAqL1xuICB0aGlzLm5nZW9RdWVyeVJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9xdWVyeS9NYXBRdWVyZW50JykuTWFwUXVlcmVudH1cbiAgICovXG4gIHRoaXMubmdlb01hcFF1ZXJlbnRfID0gbmdlb01hcFF1ZXJlbnQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vZG93bmxvYWQvQ3N2JykuRG93bmxvYWRDc3ZTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5uZ2VvQ3N2RG93bmxvYWRfID0gZG93bmxvYWRDc3ZTZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7SlF1ZXJ5fVxuICAgKi9cbiAgdGhpcy4kZWxlbWVudF8gPSAkZWxlbWVudDtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMubWF4UmVzdWx0cyA9IG5nZW9RdWVyeU9wdGlvbnMubGltaXQgIT09IHVuZGVmaW5lZCA/IG5nZW9RdWVyeU9wdGlvbnMubGltaXQgOiA1MDtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgR3JpZFNvdXJjZT59XG4gICAqL1xuICB0aGlzLmdyaWRTb3VyY2VzID0ge307XG5cbiAgLyoqXG4gICAqIElEcyBvZiB0aGUgZ3JpZCBzb3VyY2VzIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgbG9hZGVkLlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAqL1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY3VycmVudGx5IHNob3duIHF1ZXJ5IHNvdXJjZS5cbiAgICpcbiAgICogQHR5cGUgez9zdHJpbmd8bnVtYmVyfVxuICAgKi9cbiAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgbWFwcGluZyBiZXR3ZWVuIHJvdyB1aWQgYW5kIHRoZSBjb3JyZXNwb25kaW5nIGZlYXR1cmUgZm9yIGVhY2hcbiAgICogc291cmNlLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgT2JqZWN0PHN0cmluZywgaW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj4+fVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfID0ge307XG5cbiAgLy8gU3R5bGVzIGZvciBkaXNwbGF5ZWQgZmVhdHVyZXMgKGZlYXR1cmVzKSBhbmQgc2VsZWN0ZWQgZmVhdHVyZXNcbiAgLy8gKGhpZ2hsaWdodEZlYXR1cmVzXykgKHVzZXIgY2FuIHNldCBib3RoIHN0eWxlcykuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9Db2xsZWN0aW9uJykuZGVmYXVsdDxpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICovXG4gIHRoaXMuZmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9Db2xsZWN0aW9uJykuZGVmYXVsdDxpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICovXG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuXG4gIC8qKlxuICAgKiBGaWxlbmFtZVxuICAgKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZkNzdkZpbGVuYW1lfVxuICAgKi9cbiAgdGhpcy5maWxlbmFtZV8gPSBnbWZDc3ZGaWxlbmFtZTtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcF8gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTdW0gb3ZlciBhbGwgdGFicyBvZiB0aGUgb2J0YWluZWQgcmVzdWx0c1xuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgdGhpcy5zdW1PZkZlYXR1cmVzID0gMDtcblxuICAvKipcbiAgICogU3VtIG92ZXIgYWxsIHRhYnMgb2YgdGhlIGF2YWlsYWJsZSByZXN1bHRzXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA9IDA7XG5cbiAgLy8gV2F0Y2ggdGhlIG5nZW8gcXVlcnkgcmVzdWx0IHNlcnZpY2UuXG4gIHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKFxuICAgICgpID0+IG5nZW9RdWVyeVJlc3VsdCxcbiAgICAobmV3UXVlcnlSZXN1bHQsIG9sZFF1ZXJ5UmVzdWx0KSA9PiB7XG4gICAgICAvLyBPcGVuIHRoZSBwYW5lbCBiZWZvcmUgcmVzdWx0cyBmb3IgZmlyc3QgcmVxdWVzdCAoZGlzcGxheSB0aGUgc3Bpbm5lcilcbiAgICAgIGlmIChuZ2VvUXVlcnlSZXN1bHQucGVuZGluZykge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgICAgICAgIHN0YXRlOiB0cnVlLFxuICAgICAgICAgIG5vRXJyb3I6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1F1ZXJ5UmVzdWx0ICE9PSBvbGRRdWVyeVJlc3VsdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGFfKCk7XG4gICAgICB9XG4gICAgfSxcbiAgKTtcblxuICAvKipcbiAgICogQW4gdW5yZWdpc3RlciBmdW5jdGlvbiByZXR1cm5lZCBmcm9tIGAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbmAgZm9yXG4gICAqIFwib24tc2VsZWN0XCIgY2hhbmdlcyAod2hlbiByb3dzIGFyZSBzZWxlY3RlZC91bnNlbGVjdGVkKS5cbiAgICpcbiAgICogQHR5cGUgez9mdW5jdGlvbigpOiB2b2lkfVxuICAgKi9cbiAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7PygpID0+IG9sTWFwfVxuICAgKi9cbiAgdGhpcy5nZXRNYXBGbiA9IG51bGw7XG59XG5cbi8qKlxuICogSW5pdCB0aGUgY29udHJvbGxlclxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuZ2V0TWFwRm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0TWFwRm4nKTtcbiAgfVxuICBjb25zdCBmZWF0dXJlc092ZXJsYXkgPSBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldEZlYXR1cmVzKHRoaXMuZmVhdHVyZXNfKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLmZlYXR1cmVzU3R5bGUpKTtcbiAgY29uc3QgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5ID0gbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gIGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheS5zZXRGZWF0dXJlcyh0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXyk7XG4gIGNvbnN0IGhpZ2hsaWdodEZlYXR1cmVTdHlsZSA9IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNlbGVjdGVkRmVhdHVyZVN0eWxlKTtcbiAgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGhpZ2hsaWdodEZlYXR1cmVTdHlsZSk7XG4gIGNvbnN0IG1hcEZuID0gdGhpcy5nZXRNYXBGbjtcbiAgaWYgKG1hcEZuKSB7XG4gICAgY29uc3QgbWFwID0gbWFwRm4oKTtcbiAgICBpZiAoIShtYXAgaW5zdGFuY2VvZiBvbE1hcCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbWFwIHR5cGUnKTtcbiAgICB9XG4gICAgdGhpcy5tYXBfID0gbWFwO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGdyaWQgc291cmNlcyBpbiB0aGUgb3JkZXIgdGhleSB3ZXJlIGxvYWRlZC5cbiAqXG4gKiBAcmV0dXJucyB7R3JpZFNvdXJjZVtdfSBHcmlkIHNvdXJjZXMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEdyaWRTb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5sb2FkZWRHcmlkU291cmNlcy5tYXAoKHNvdXJjZUxhYmVsKSA9PiB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXSk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGF0YV8gPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNsb3NlIGlmIHRoZXJlIGFyZSBubyByZXN1bHRzXG4gIGlmIChcbiAgICAodGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZyB8fCB0aGlzLm5nZW9RdWVyeVJlc3VsdC50b3RhbCA9PT0gMCkgJiZcbiAgICAhdGhpcy5oYXNPbmVXaXRoVG9vTWFueVJlc3VsdHNfKClcbiAgKSB7XG4gICAgY29uc3Qgb2xkQWN0aXZlID0gdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIGlmIChvbGRBY3RpdmUpIHtcbiAgICAgIC8vIGRvbid0IGNsb3NlIGlmIHRoZXJlIGFyZSBwZW5kaW5nIHF1ZXJpZXNcbiAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICAgIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgICAgICBzdGF0ZTogdGhpcy5hY3RpdmUsXG4gICAgICAgIG5vRXJyb3I6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGVuZGluZyA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmc7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA9IDA7XG4gIHRoaXMuc3VtT2ZGZWF0dXJlcyA9IDA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICovXG4gIGNvbnN0IGNvdW50ZWRTb3VyY2VzID0gW107XG4gIHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgaWYgKCFjb3VudGVkU291cmNlcy5pbmNsdWRlcyhzb3VyY2UubGFiZWwpKSB7XG4gICAgICB0aGlzLnN1bU9mRmVhdHVyZXMgKz0gc291cmNlLmZlYXR1cmVzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UucmVxdWVzdFBhcnRuZXJzIHx8ICFzb3VyY2UucmVxdWVzdFBhcnRuZXJzLnNvbWUoKGxhYmVsKSA9PiBjb3VudGVkU291cmNlcy5pbmNsdWRlcyhsYWJlbCkpKSB7XG4gICAgICBpZiAoc291cmNlLnRvdGFsRmVhdHVyZUNvdW50IDwgMCB8fCB0aGlzLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyA8IDApIHtcbiAgICAgICAgLy8gQXQgbGVhc3Qgb25lIHF1ZXJ5IHdpdGhvdXQgYW55IGNvdW50ID0+IHdlIGNhbid0IGRpc3BsYXkgdGhlIHRvdGFsIGNvdW50XG4gICAgICAgIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN1bU9mQXZhaWxhYmxlUmVzdWx0cyArPSBzb3VyY2UudG90YWxGZWF0dXJlQ291bnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGNvdW50ZWRTb3VyY2VzLnB1c2goc291cmNlLmxhYmVsKTtcbiAgfSk7XG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgc3RhdGU6IHRydWUsXG4gIH0pO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgbGV0IHNvdXJjZXMgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzO1xuICAvLyBtZXJnZSBzb3VyY2VzIGlmIHJlcXVlc3RlZFxuICBpZiAoT2JqZWN0LmtleXModGhpcy5vcHRpb25zLm1lcmdlVGFicyB8fCB7fSkubGVuZ3RoID4gMCkge1xuICAgIHNvdXJjZXMgPSB0aGlzLmdldE1lcmdlZFNvdXJjZXNfKHNvdXJjZXMpO1xuICB9XG5cbiAgLy8gY3JlYXRlIGdyaWRzIChvbmx5IGZvciBzb3VyY2Ugd2l0aCBmZWF0dXJlcyBvciB3aXRoIHRvbyBtYW55IHJlc3VsdHMpXG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgaWYgKHNvdXJjZS50b29NYW55UmVzdWx0cyAmJiBzb3VyY2UuZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm1ha2VHcmlkXyhudWxsLCBzb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3VyY2UuaWQgPSB0aGlzLmVzY2FwZVZhbHVlKHNvdXJjZS5pZCk7XG4gICAgICBjb25zdCBmZWF0dXJlcyA9IHNvdXJjZS5mZWF0dXJlcztcbiAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdERhdGFfKHNvdXJjZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKHRoaXMubG9hZGVkR3JpZFNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gaWYgbm8gZ3JpZHMgd2VyZSBjcmVhdGVkLCBkbyBub3Qgc2hvd1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICBub0Vycm9yOiB0cnVlLFxuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGtlZXAgdGhlIGZpcnN0IGV4aXN0aW5nIG5hdmlnYXRpb24gdGFiIG9wZW5cbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwgfHwgIShgJHt0aGlzLnNlbGVjdGVkVGFifWAgaW4gdGhpcy5ncmlkU291cmNlcykpIHtcbiAgICAvLyBzZWxlY3RpbmcgdGhlIHRhYiBpcyBkb25lIGluIGEgdGltZW91dCwgYmVjYXVzZSBvdGhlcndpc2UgaW4gcmFyZSBjYXNlc1xuICAgIC8vIGBuZy1jbGFzc2AgbWlnaHQgc2V0IHRoZSBgYWN0aXZlYCBjbGFzcyBvbiBtdWx0aXBsZSB0YWJzLlxuICAgIHRoaXMuJHRpbWVvdXRfKCgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0U291cmNlSWQgPSB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzWzBdO1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5ncmlkU291cmNlc1tmaXJzdFNvdXJjZUlkXSk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59IElmIG9uZSBvZiB0aGUgc291cmNlIGhhcyB0b28gbWFueSByZXN1bHRzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5oYXNPbmVXaXRoVG9vTWFueVJlc3VsdHNfID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcy5zb21lKChzb3VyY2UpID0+IHNvdXJjZS50b29NYW55UmVzdWx0cyk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIHdpdGggYWxsIHN5bWJvbHMgYW5kIHNwYWNlcyByZXBsYWNlZCBieSBhbiB1bmRlcnNjb3JlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gdmFsdWUgQSB2YWx1ZSB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bWJlcn0gdmFsdWUgQW4gZXNjYXBlZCB2YWx1ZS5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZXNjYXBlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgLy8gV29yay1hcm91bmQgZm9yIE51bWJlci5pc0ludGVnZXIoKSB3aGVuIG5vdCBhbHdheXMgZ2V0dGluZyBhIG51bWJlciAuLi5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0b0VzY2FwZSA9IC9bLVtcXF0ve30oKSorPy5cXFxcXiQgfF0vZztcbiAgICBpZiAodmFsdWUubWF0Y2godG9Fc2NhcGUpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSh0b0VzY2FwZSwgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGlmIHRoZSBnaXZlbiBncmlkIHNvdXJjZSBpcyBzZWxlY3RlZD9cbiAqXG4gKiBAcGFyYW0ge0dyaWRTb3VyY2V9IGdyaWRTb3VyY2UgR3JpZCBzb3VyY2UuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gSXMgc2VsZWN0ZWQ/XG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmlzU2VsZWN0ZWQgPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYiA9PT0gZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWw7XG59O1xuXG4vKipcbiAqIFRyeSB0byBtZXJnZSB0aGUgbWVyZ2VhYmxlIHNvdXJjZXMuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlW119IHNvdXJjZXMgU291cmNlcy5cbiAqIEByZXR1cm5zIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlW119IFRoZSBtZXJnZWQgc291cmNlcy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVyZ2VkU291cmNlc18gPSBmdW5jdGlvbiAoc291cmNlcykge1xuICAvKiogQHR5cGUge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2VbXX0gKi9cbiAgY29uc3QgYWxsU291cmNlcyA9IFtdO1xuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsIGltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2U+fSAqL1xuICBjb25zdCBtZXJnZWRTb3VyY2VzID0ge307XG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgdGhpcyBzb3VyY2UgY2FuIGJlIG1lcmdlZFxuICAgIGNvbnN0IG1lcmdlZFNvdXJjZSA9IHRoaXMuZ2V0TWVyZ2VkU291cmNlXyhzb3VyY2UsIG1lcmdlZFNvdXJjZXMpO1xuICAgIGlmIChtZXJnZWRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIC8vIHRoaXMgc291cmNlIHNob3VsZCBub3QgYmUgbWVyZ2VkLCBhZGQgYXMgaXNcbiAgICAgIGFsbFNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIH1cbiAgfSk7XG4gIGZvciAoY29uc3QgbWVyZ2VkU291cmNlSWQgaW4gbWVyZ2VkU291cmNlcykge1xuICAgIGFsbFNvdXJjZXMucHVzaChtZXJnZWRTb3VyY2VzW21lcmdlZFNvdXJjZUlkXSk7XG4gIH1cbiAgcmV0dXJuIGFsbFNvdXJjZXM7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBzb3VyY2Ugc2hvdWxkIGJlIG1lcmdlZC4gSWYgc28sIGFuIGFydGlmaWNpYWwgc291cmNlXG4gKiB0aGF0IHdpbGwgY29udGFpbiB0aGUgZmVhdHVyZXMgb2YgYWxsIG1lcmdlYWJsZSBzb3VyY2VzIGlzIHJldHVybmVkLiBJZiBub3QsXG4gKiBgbnVsbGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSBzb3VyY2UgU291cmNlLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlPn0gbWVyZ2VkU291cmNlc1xuICogICAgTWVyZ2VkIHNvdXJjZXMuXG4gKiBAcmV0dXJucyB7P2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9IEEgbWVyZ2VkIHNvdXJjZSBvZiBudWxsIGlmIHRoZVxuICogICAgc291cmNlIHNob3VsZCBub3QgYmUgbWVyZ2VkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRNZXJnZWRTb3VyY2VfID0gZnVuY3Rpb24gKHNvdXJjZSwgbWVyZ2VkU291cmNlcykge1xuICBsZXQgbWVyZ2VTb3VyY2VJZCA9IG51bGw7XG4gIGZvciAoY29uc3QgY3VycmVudE1lcmdlU291cmNlSWQgaW4gdGhpcy5vcHRpb25zLm1lcmdlVGFicyB8fCB7fSkge1xuICAgIGNvbnN0IHNvdXJjZUxhYmVscyA9IHRoaXMub3B0aW9ucy5tZXJnZVRhYnNbY3VycmVudE1lcmdlU291cmNlSWRdO1xuICAgIGNvbnN0IGNvbnRhaW5zU291cmNlID0gc291cmNlTGFiZWxzLnNvbWUoKHNvdXJjZUxhYmVsKSA9PiBzb3VyY2VMYWJlbCA9PSBzb3VyY2UubGFiZWwpO1xuICAgIGlmIChjb250YWluc1NvdXJjZSkge1xuICAgICAgbWVyZ2VTb3VyY2VJZCA9IGN1cnJlbnRNZXJnZVNvdXJjZUlkO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChtZXJnZVNvdXJjZUlkID09PSBudWxsKSB7XG4gICAgLy8gdGhpcyBzb3VyY2Ugc2hvdWxkIG5vdCBiZSBtZXJnZWRcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgbGV0IG5ld1JlcXVlc3QgPSB0cnVlO1xuXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gKi9cbiAgbGV0IG1lcmdlU291cmNlO1xuICBpZiAobWVyZ2VTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgbWVyZ2VTb3VyY2UgPSBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdO1xuICAgIGlmIChzb3VyY2UucmVxdWVzdFBhcnRuZXJzKSB7XG4gICAgICBuZXdSZXF1ZXN0ID0gIXNvdXJjZS5yZXF1ZXN0UGFydG5lcnMuc29tZSgobGFiZWwpID0+IG1lcmdlU291cmNlLm1lcmdlQ29tcG9zYW50cy5pbmNsdWRlcyhsYWJlbCkpO1xuICAgIH1cbiAgICBtZXJnZVNvdXJjZS5tZXJnZUNvbXBvc2FudHMucHVzaChzb3VyY2UubGFiZWwpO1xuICB9IGVsc2Uge1xuICAgIG1lcmdlU291cmNlID0ge1xuICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgaWQ6IG1lcmdlU291cmNlSWQsXG4gICAgICBsYWJlbDogbWVyZ2VTb3VyY2VJZCxcbiAgICAgIGZlYXR1cmVzQ291bnQ6IDAsXG4gICAgICAvL3RoZSBzdW0gb2YgdGhlIG9idGFpbmVkIHJlc3VsdHMgb2YgdGhlIHF1ZXJ5IGlzIGNvbXB1dGVkIGxhdGVyXG4gICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIHRvb01hbnlSZXN1bHRzOiBmYWxzZSxcbiAgICAgIG1lcmdlQ29tcG9zYW50czogW3NvdXJjZS5sYWJlbF0sXG4gICAgfTtcbiAgICBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdID0gbWVyZ2VTb3VyY2U7XG4gIH1cblxuICAvLyBhZGQgZmVhdHVyZXMgb2Ygc291cmNlIHRvIG1lcmdlIHNvdXJjZVxuICBzb3VyY2UuZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gIH0pO1xuXG4gIC8vIGlmIG9uZSBvZiB0aGUgc291cmNlIGhhcyB0b28gbWFueSByZXN1bHRzLCB0aGUgcmVzdWx0aW5nIG1lcmdlZCBzb3VyY2Ugd2lsbFxuICAvLyBhbHNvIGJlIG1hcmtlZCB3aXRoIGB0b29NYW55UmVzdWx0c2AuXG4gIG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzID0gbWVyZ2VTb3VyY2UudG9vTWFueVJlc3VsdHMgfHwgc291cmNlLnRvb01hbnlSZXN1bHRzO1xuXG4gIC8vIGZvciBsYXllcnMgY2FsbGVkIHdpdGggdGhlIHByZXZpb3VzIHJlcXVlc3QgdGhlIHRvdGFsRmVhdHVyZUNvdW50IChhdmFpbGFibGUgcmVzdWx0cykgYW5kIHRoZSBsaW1pdCAob2J0YWluZWQgcmVzdWx0cylcbiAgLy8gYXJlIHN0aWxsIHZhbGlkXG4gIGlmIChuZXdSZXF1ZXN0KSB7XG4gICAgaWYgKHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA9XG4gICAgICAgIG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICsgc291cmNlLnRvdGFsRmVhdHVyZUNvdW50XG4gICAgICAgICAgOiBzb3VyY2UudG90YWxGZWF0dXJlQ291bnQ7XG4gICAgfVxuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzQ291bnQgKz0gc291cmNlLmZlYXR1cmVzQ291bnQ7XG4gIH1cbiAgcmV0dXJuIG1lcmdlU291cmNlO1xufTtcblxuLyoqXG4gKiBDb2xsZWN0IGFsbCBmZWF0dXJlcyBpbiB0aGUgcXVlcnlSZXN1bHQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gc291cmNlIFJlc3VsdCBzb3VyY2UuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNvbGxlY3REYXRhXyA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgY29uc3QgZmVhdHVyZXMgPSBzb3VyY2UuZmVhdHVyZXM7XG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj5bXX0gKi9cbiAgY29uc3QgYWxsUHJvcGVydGllcyA9IFtdO1xuICAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1xuICBjb25zdCBmZWF0dXJlR2VvbWV0cmllc05hbWVzID0gW107XG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgaW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59ICovXG4gIGNvbnN0IGZlYXR1cmVzRm9yU291cmNlID0ge307XG4gIGxldCBwcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cnlOYW1lO1xuICBmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG4gICAgcHJvcGVydGllcyA9IGZlYXR1cmUuZ2V0UHJvcGVydGllcygpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEtlZXBzIGRpc3RpbmN0IGdlb21ldHJ5IG5hbWVzIHRvIHJlbW92ZSB0aGVtZSBsYXRlci5cbiAgICAgIGZlYXR1cmVHZW9tZXRyeU5hbWUgPSBmZWF0dXJlLmdldEdlb21ldHJ5TmFtZSgpO1xuICAgICAgaWYgKCFmZWF0dXJlR2VvbWV0cmllc05hbWVzLmluY2x1ZGVzKGZlYXR1cmVHZW9tZXRyeU5hbWUpKSB7XG4gICAgICAgIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMucHVzaChmZWF0dXJlR2VvbWV0cnlOYW1lKTtcbiAgICAgIH1cbiAgICAgIGFsbFByb3BlcnRpZXMucHVzaChwcm9wZXJ0aWVzKTtcbiAgICAgIGZlYXR1cmVzRm9yU291cmNlW2dldFJvd1VpZChwcm9wZXJ0aWVzKV0gPSBmZWF0dXJlO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMuY2xlYW5Qcm9wZXJ0aWVzXyhhbGxQcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cmllc05hbWVzKTtcbiAgaWYgKGFsbFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGdyaWRDcmVhdGVkID0gdGhpcy5tYWtlR3JpZF8oYWxsUHJvcGVydGllcywgc291cmNlKTtcbiAgICBpZiAoZ3JpZENyZWF0ZWQpIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tgJHtzb3VyY2UubGFiZWx9YF0gPSBmZWF0dXJlc0ZvclNvdXJjZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCB1bndhbnRlZCBjb2x1bW5zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nfG51bWJlcnxib29sZWFuPltdfSBhbGxQcm9wZXJ0aWVzIEEgcm93LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmVhdHVyZUdlb21ldHJpZXNOYW1lcyBHZW9tZXRyeSBuYW1lcy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYW5Qcm9wZXJ0aWVzXyA9IGZ1bmN0aW9uIChhbGxQcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cmllc05hbWVzKSB7XG4gIGFsbFByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydGllcykgPT4ge1xuICAgIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuZm9yRWFjaCgoZmVhdHVyZUdlb21ldHJ5TmFtZSkgPT4ge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbZmVhdHVyZUdlb21ldHJ5TmFtZV07XG4gICAgfSk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMuYm91bmRlZEJ5O1xuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLm5nZW9fZmVhdHVyZV90eXBlXztcbiAgfSk7XG4gIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlRW1wdHlDb2x1bW5zID09PSB0cnVlKSB7XG4gICAgdGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNGbl8oYWxsUHJvcGVydGllcyk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIGNvbHVtbnMgdGhhdCB3aWxsIGJlIGNvbXBsZXRlbHkgZW1wdHkgYmV0d2VlbiBlYWNoIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmd8bnVtYmVyfGJvb2xlYW4+W119IGFsbFByb3BlcnRpZXMgQSByb3cuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUVtcHR5Q29sdW1uc0ZuXyA9IGZ1bmN0aW9uIChhbGxQcm9wZXJ0aWVzKSB7XG4gIC8vIEtlZXAgYWxsIGtleXMgdGhhdCBjb3JyZXNwb25kIHRvIGF0IGxlYXN0IG9uZSB2YWx1ZSBpbiBhIHByb3BlcnRpZXMgb2JqZWN0LlxuICAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1xuICBjb25zdCBrZXlzVG9LZWVwID0gW107XG4gIGxldCBpLCBrZXk7XG4gIGZvciAoa2V5IGluIGFsbFByb3BlcnRpZXNbMF0pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsbFByb3BlcnRpZXNbaV1ba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXNUb0tlZXAucHVzaChrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gR2V0IGFsbCBrZXlzIHRoYXQgcHJldmlvdXNseSBhbHdheXMgcmVmZXJzIGFsd2F5cyB0byBhbiBlbXB0eSB2YWx1ZS5cbiAgbGV0IGtleVRvUmVtb3ZlO1xuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnRpZXMpID0+IHtcbiAgICBrZXlUb1JlbW92ZSA9IFtdO1xuICAgIGZvciAoa2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgIGlmICgha2V5c1RvS2VlcC5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIGtleVRvUmVtb3ZlLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZXNlIGtleXMuXG4gICAga2V5VG9SZW1vdmUuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBkZWxldGUgcHJvcGVydGllc1trZXldO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHs/T2JqZWN0PHN0cmluZywgc3RyaW5nfG51bWJlcnxib29sZWFuPltdfSBkYXRhIEdyaWQgcm93cy5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gc291cmNlIFF1ZXJ5IHNvdXJjZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgYSBncmlkIHdhcyBjcmVhdGVkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5tYWtlR3JpZF8gPSBmdW5jdGlvbiAoZGF0YSwgc291cmNlKSB7XG4gIGNvbnN0IHNvdXJjZUxhYmVsID0gYCR7c291cmNlLmxhYmVsfWA7XG4gIGxldCBncmlkQ29uZmlnID0gbnVsbDtcbiAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICBncmlkQ29uZmlnID0gdGhpcy5nZXRHcmlkQ29uZmlndXJhdGlvbl8oZGF0YSk7XG4gICAgaWYgKGdyaWRDb25maWcgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKCF0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZUxhYmVsKSkge1xuICAgIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMucHVzaChzb3VyY2VMYWJlbCk7XG4gIH1cbiAgdGhpcy5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF0gPSB7XG4gICAgc291cmNlOiBzb3VyY2UsXG4gIH07XG4gIGlmIChncmlkQ29uZmlnKSB7XG4gICAgdGhpcy5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF0uY29uZmlndXJhdGlvbiA9IGdyaWRDb25maWc7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nfG51bWJlcnxib29sZWFuPltdfSBkYXRhIEdyaWQgcm93cy5cbiAqIEByZXR1cm5zIHs/aW1wb3J0KCduZ2VvL2dyaWQvQ29uZmlnJykuZGVmYXVsdH0gR3JpZCBjb25maWcuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEdyaWRDb25maWd1cmF0aW9uXyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZGF0YScpO1xuICB9XG4gIGNvbnN0IGNsb25lID0ge307XG4gIE9iamVjdC5hc3NpZ24oY2xvbmUsIGRhdGFbMF0pO1xuICAvLyBAdHMtaWdub3JlXG4gIGRlbGV0ZSBjbG9uZS5vbF91aWQ7XG4gIGNvbnN0IGNvbHVtbnMgPSBPYmplY3Qua2V5cyhjbG9uZSk7XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ25nZW8vZG93bmxvYWQvQ3N2JykuR3JpZENvbHVtbkRlZltdfSAqL1xuICBjb25zdCBjb2x1bW5EZWZzID0gW107XG4gIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgY29sdW1uRGVmcy5wdXNoKFxuICAgICAgLyoqIEB0eXBlIHtpbXBvcnQoJ25nZW8vZG93bmxvYWQvQ3N2JykuR3JpZENvbHVtbkRlZn0gKi8ge1xuICAgICAgICBuYW1lOiBjb2x1bW4sXG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xuICBpZiAoY29sdW1uRGVmcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvR3JpZENvbmZpZyhkYXRhLCBjb2x1bW5EZWZzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBubyBjb2x1bW5zLCBkbyBub3Qgc2hvdyBncmlkXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50bHkgc2hvd24gZ3JpZCBzb3VyY2UuXG4gKlxuICogQHJldHVybnMge0dyaWRTb3VyY2V8bnVsbH0gR3JpZCBzb3VyY2UuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEFjdGl2ZUdyaWRTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZFNvdXJjZXNbYCR7dGhpcy5zZWxlY3RlZFRhYn1gXTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgZmVhdHVyZSBhbmQgc291cmNlIGFuZCByZW1vdmUgYWxsIGZlYXR1cmVzXG4gKiBmcm9tIHRoZSBtYXAuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICBwYW5lbHMub3BlbkZvb3RlclBhbmVsKCdxdWVyeXJlc3VsdCcsIHtcbiAgICBzdGF0ZTogZmFsc2UsXG4gICAgbm9FcnJvcjogdHJ1ZSxcbiAgfSk7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICB0aGlzLmdyaWRTb3VyY2VzID0ge307XG4gIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gIHRoaXMudG9vTWFueVJlc3VsdHMgPSBmYWxzZTtcbiAgdGhpcy5mZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5uZ2VvTWFwUXVlcmVudF8uY2xlYXIoKTtcbiAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfID0ge307XG4gIGlmICh0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXykge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IHRoZSB0YWIgZm9yIHRoZSBnaXZlbiBncmlkIHNvdXJjZS5cbiAqXG4gKiBAcGFyYW0ge0dyaWRTb3VyY2V9IGdyaWRTb3VyY2UgR3JpZCBzb3VyY2UuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdFRhYiA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIGNvbnN0IHNvdXJjZSA9IGdyaWRTb3VyY2Uuc291cmNlO1xuICB0aGlzLnNlbGVjdGVkVGFiID0gc291cmNlLmxhYmVsO1xuICBpZiAodGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8pIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXygpO1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gbnVsbDtcbiAgfVxuICBpZiAoZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKFxuICAgICAgKCkgPT4gZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdGVkUm93cyxcbiAgICAgIChuZXdTZWxlY3RlZCwgb2xkU2VsZWN0ZWRSb3dzKSA9PiB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdTZWxlY3RlZCkgIT09IE9iamVjdC5rZXlzKG9sZFNlbGVjdGVkUm93cykpIHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZF8oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9XG4gIHRoaXMudXBkYXRlRmVhdHVyZXNfKGdyaWRTb3VyY2UpO1xuICB0aGlzLnJlZmxvd0dyaWRfKCk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUucmVmbG93R3JpZF8gPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRoaXMgaXMgYSBcIndvcmstYXJvdW5kXCIgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGdyaWQgaXMgcmVuZGVyZWQgY29ycmVjdGx5LlxuICAvLyBXaGVuIGEgcGFuZSBpcyBhY3RpdmF0ZWQgYnkgc2V0dGluZyBgdGhpcy5zZWxlY3RlZFRhYmAsIHRoZSBjbGFzcyBgYWN0aXZlYFxuICAvLyBpcyBub3QgeWV0IHNldCBvbiB0aGUgcGFuZS4gVGhhdCdzIHdoeSB0aGUgY2xhc3MgaXMgc2V0IG1hbnVhbGx5LCBhbmRcbiAgLy8gYWZ0ZXIgdGhlIHBhbmUgaXMgc2hvd24gKGluIHRoZSBuZXh0IGRpZ2VzdCBsb29wKSwgdGhlIGdyaWQgdGFibGUgY2FuXG4gIC8vIGJlIHJlZnJlc2hlZC5cbiAgY29uc3QgaWQgPSB0aGlzLmVzY2FwZVZhbHVlKHRoaXMuc2VsZWN0ZWRUYWIgfHwgJycpO1xuICBjb25zdCBhY3RpdmVQYW5lID0gdGhpcy4kZWxlbWVudF8uZmluZChgZGl2LnRhYi1wYW5lIyR7aWR9YCk7XG4gIGFjdGl2ZVBhbmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgdGhpcy4kdGltZW91dF8oKCkgPT4ge1xuICAgIGFjdGl2ZVBhbmUuZmluZCgnZGl2Lm5nZW8tZ3JpZC10YWJsZS1jb250YWluZXIgdGFibGUnKS50cmlnZ2VyKCdyZWZsb3cnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIHRoZSByb3cgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5vblNlbGVjdGlvbkNoYW5nZWRfID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBncmlkU291cmNlID0gdGhpcy5ncmlkU291cmNlc1tgJHt0aGlzLnNlbGVjdGVkVGFifWBdO1xuICB0aGlzLnVwZGF0ZUZlYXR1cmVzXyhncmlkU291cmNlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHcmlkU291cmNlfSBncmlkU291cmNlIEdyaWQgc291cmNlXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZUZlYXR1cmVzXyA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIHRoaXMuZmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmNsZWFyKCk7XG4gIGlmICghZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNvdXJjZUxhYmVsID0gYCR7Z3JpZFNvdXJjZS5zb3VyY2UubGFiZWx9YDtcbiAgY29uc3QgZmVhdHVyZXNGb3JTb3VyY2UgPSB0aGlzLmZlYXR1cmVzRm9yU291cmNlc19bc291cmNlTGFiZWxdO1xuICBjb25zdCBzZWxlY3RlZFJvd3MgPSBncmlkU291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRSb3dzO1xuICBmb3IgKGNvbnN0IHJvd0lkIGluIGZlYXR1cmVzRm9yU291cmNlKSB7XG4gICAgY29uc3QgZmVhdHVyZSA9IGZlYXR1cmVzRm9yU291cmNlW3Jvd0lkXTtcbiAgICBpZiAocm93SWQgaW4gc2VsZWN0ZWRSb3dzKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5wdXNoKGZlYXR1cmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZlYXR1cmVzXy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGlmIGEgcm93IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdyaWQgaXMgc2VsZWN0ZWQ/XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IElzIG9uZSBzZWxlY3RlZD9cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNPbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkQ291bnQoKSA+IDA7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHNlbGVjdGVkIHJvd3Mgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHNlbGVjdGVkIHJvd3MuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkUm93Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlID09PSBudWxsIHx8IHNvdXJjZS5jb25maWd1cmF0aW9uID09PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkQ291bnQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgYWxsIHJvd3Mgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZ3JpZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdEFsbCgpO1xuICB9XG59O1xuXG4vKipcbiAqIERlc2VsZWN0IGFsbCByb3dzIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdyaWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLnVuc2VsZWN0QWxsKCk7XG4gIH1cbn07XG5cbi8qKlxuICogSW52ZXJ0IHRoZSBzZWxlY3Rpb24gb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZ3JpZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaW52ZXJ0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLmludmVydFNlbGVjdGlvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIFpvb20gdG8gdGhlIHNlbGVjdGVkIGZlYXR1cmVzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS56b29tVG9TZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXBfKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgY29uc3QgZXh0ZW50ID0gb2xFeHRlbnQuY3JlYXRlRW1wdHkoKTtcbiAgICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmICghZ2VvbWV0cnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdlb21ldHJ5Jyk7XG4gICAgICB9XG4gICAgICBvbEV4dGVudC5leHRlbmQoZXh0ZW50LCBnZW9tZXRyeS5nZXRFeHRlbnQoKSk7XG4gICAgfSk7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMubWFwXy5nZXRTaXplKCk7XG4gICAgaWYgKCFzaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgIH1cbiAgICB0aGlzLm1hcF8uZ2V0VmlldygpLmZpdChleHRlbnQsIHtcbiAgICAgIHNpemUsXG4gICAgICBtYXhab29tOiB0aGlzLm9wdGlvbnMubWF4UmVjZW50ZXJab29tLFxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0IGEgQ1NWIGRvd25sb2FkIGZvciB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmRvd25sb2FkQ3N2ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGNvbHVtbkRlZnMgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5jb2x1bW5EZWZzO1xuICAgIGlmICghY29sdW1uRGVmcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbHVtbkRlZnMnKTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgdGhpcy5uZ2VvQ3N2RG93bmxvYWRfLnN0YXJ0RG93bmxvYWQoc2VsZWN0ZWRSb3dzLCBjb2x1bW5EZWZzLCB0aGlzLmZpbGVuYW1lXyk7XG4gIH1cbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZEaXNwbGF5cXVlcnlncmlkQ29udHJvbGxlcicsIFF1ZXJ5R3JpZENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImRpc3BsYXlxdWVyeWdyaWRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==