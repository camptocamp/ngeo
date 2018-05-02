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
            >{{'Only' | translate}} {{ctrl.sumOfFeatures}} {{'of' | translate}} {{ctrl.sumOfAvailableResults}}
            {{'results displayed, as the maximum number is reached. Please refine your query.' | translate
            }}</span
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
                <i class="fa fa-search-plus"></i> <span translate>Zoom to</span>
              </button>
            </li>

            <li ng-show="ctrl.isOneSelected()" class="ng-hide">
              <button
                class="btn btn-link btn-sm"
                title="{{'Export selection as CSV' | translate}}"
                ng-click="ctrl.downloadCsv()"
              >
                <i class="fa fa-download"></i> <span translate>Export as CSV</span>
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
      <i class="fa fa-spin"
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
      this.sumOfAvailableResults += source.totalFeatureCount;
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
      limit: 0,
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
    mergeSource.limit += source.limit;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hNQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNzRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9kaXNwbGF5cXVlcnlncmlkLmpzIiwid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5zY3NzIiwid2VicGFjazovL25nZW8vLi9zcmMvcXVlcnkvZ3JpZENvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvcXVlcnkvZ3JpZENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL2Rpc3BsYXlxdWVyeWdyaWQuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZkRhdGFzb3VyY2VNYW5hZ2VyIGZyb20gJ2dtZi9kYXRhc291cmNlL01hbmFnZXInO1xuaW1wb3J0IGdtZkxheWVydHJlZUNvbXBvbmVudCBmcm9tICdnbWYvbGF5ZXJ0cmVlL2NvbXBvbmVudCc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuaW1wb3J0IGdtZlF1ZXJ5R3JpZENvbXBvbmVudCBmcm9tICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCc7XG5pbXBvcnQgZ21mVGhlbWVNYW5hZ2VyIGZyb20gJ2dtZi90aGVtZS9NYW5hZ2VyJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzJztcbmltcG9ydCBuZ2VvR3JpZE1vZHVsZSBmcm9tICduZ2VvL2dyaWQvbW9kdWxlJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudCc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5pbXBvcnQgbmdlb1F1ZXJ5Q29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvY29tcG9uZW50JztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mRGF0YXNvdXJjZU1hbmFnZXIubmFtZSxcbiAgZ21mTGF5ZXJ0cmVlQ29tcG9uZW50Lm5hbWUsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBnbWZRdWVyeUdyaWRDb21wb25lbnQubmFtZSxcbiAgZ21mVGhlbWVNYW5hZ2VyLm5hbWUsXG4gIGdtZlRoZW1lVGhlbWVzLm5hbWUsXG4gIG5nZW9HcmlkTW9kdWxlLm5hbWUsXG4gIG5nZW9NYXBNb2R1bGUubmFtZSxcbiAgLy8gZm9yIG5nZW8ubWFwLkZlYXR1cmVPdmVybGF5LCBwZXJoYXBzIHJlbW92ZSBtZVxuICBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLFxuICBuZ2VvUXVlcnlDb21wb25lbnQubmFtZSxcbl0pO1xuXG4vKipcbiAqIERlbW8sIE5PVCBVU0VELlxuICogQSBzYW1wbGUgY29tcG9uZW50IHRvIGRpc3BsYXkgdGhlIHJlc3VsdC5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3BhcnRpYWxzL3F1ZXJ5cmVzdWx0Lmh0bWwnKSxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2dtZmFwcFF1ZXJ5cmVzdWx0JywgcXVlcnlyZXN1bHRDb21wb25lbnQpO1xuXG5RdWVyeXJlc3VsdENvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdlb1F1ZXJ5UmVzdWx0J107XG5cbi8qKlxuICogRGVtbywgTk9UIFVTRUQuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fSBuZ2VvUXVlcnlSZXN1bHQgUXVlcnkgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBRdWVyeXJlc3VsdENvbnRyb2xsZXIobmdlb1F1ZXJ5UmVzdWx0KSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH1cbiAgICovXG4gIHRoaXMucmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xufVxubXlNb2R1bGUuY29udHJvbGxlcignZ21mYXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJywgUXVlcnlyZXN1bHRDb250cm9sbGVyKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnZ21mVGhlbWVzJywgJ2dtZkRhdGFTb3VyY2VzTWFuYWdlcicsICdnbWZUaGVtZU1hbmFnZXInLCAnZGVmYXVsdFRoZW1lJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3RoZW1lL1RoZW1lcycpLlRoZW1lc1NlcnZpY2V9IGdtZlRoZW1lcyBUaGUgZ21mIHRoZW1lcyBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9kYXRhc291cmNlL01hbmFnZXInKS5EYXRhc291cmNlTWFuYWdlcn0gZ21mRGF0YVNvdXJjZXNNYW5hZ2VyIFRoZSBnbWZcbiAqICAgICBkYXRhIHNvdXJjZXMgbWFuYWdlciBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi90aGVtZS9NYW5hZ2VyJykuVGhlbWVNYW5hZ2VyU2VydmljZX0gZ21mVGhlbWVNYW5hZ2VyIGdtZiBUaGVtZSBNYW5hZ2VyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFRoZW1lIFRoZSBkZWZhdWx0IHRoZW1lLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihnbWZUaGVtZXMsIGdtZkRhdGFTb3VyY2VzTWFuYWdlciwgZ21mVGhlbWVNYW5hZ2VyLCBkZWZhdWx0VGhlbWUpIHtcbiAgZ21mVGhlbWVzLmxvYWRUaGVtZXMoKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM3NjM1LCAxMTUyNjQwXSxcbiAgICAgIHpvb206IDMsXG4gICAgfSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAgICovXG4gIHRoaXMuZGltZW5zaW9ucyA9IHt9O1xuXG4gIC8vIEluaXQgdGhlIGRhdGFzb3VyY2VzIHdpdGggb3VyIG1hcC5cbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERhdGFzb3VyY2VNYXAodGhpcy5tYXApO1xuICAvLyBHaXZlIHRoZSBkaW1lbnNpb25zIHRvIHRoZSBnbWZEYXRhU291cmNlc01hbmFnZXJcbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERpbWVuc2lvbnModGhpcy5kaW1lbnNpb25zKTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QWN0aXZlID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZlRoZW1lW118dW5kZWZpbmVkfVxuICAgKiBleHBvcnRcbiAgICovXG4gIHRoaXMudGhlbWVzID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvdGhlbWVzJykuR21mVGhlbWV9IFRoZSBzZWxlY3RlZCB0aGVtZS5cbiAgICovXG4gIHRoaXMuc2VsZWN0ZWRUaGVtZSA9IG51bGw7XG4gIHRoaXMudXBkYXRlVGhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ21mVGhlbWVNYW5hZ2VyLmFkZFRoZW1lKHRoaXMuc2VsZWN0ZWRUaGVtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5xdWVyeUdyaWRBY3RpdmUgPSB0cnVlO1xuICBnbWZUaGVtZXMuZ2V0VGhlbWVzT2JqZWN0KCkudGhlbigodGhlbWVzKSA9PiB7XG4gICAgaWYgKHRoZW1lcykge1xuICAgICAgdGhpcy50aGVtZXMgPSB0aGVtZXM7XG5cbiAgICAgIC8vIFNlbGVjdCBkZWZhdWx0IHRoZW1lO1xuICAgICAgdGhlbWVzLmZvckVhY2goKHRoZW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGVtZS5uYW1lID09PSBkZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ2dtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zJywge1xuICBmZWF0dXJlc1N0eWxlOiB7XG4gICAgZmlsbDoge1xuICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XSxcbiAgICB9LFxuICAgIGNpcmNsZToge1xuICAgICAgZmlsbDoge1xuICAgICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAwLjZdLFxuICAgICAgfSxcbiAgICAgIHJhZGl1czogNSxcbiAgICAgIHN0cm9rZToge1xuICAgICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICAgICAgd2lkdGg6IDIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3Ryb2tlOiB7XG4gICAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICAgIHdpZHRoOiAyLFxuICAgIH0sXG4gIH0sXG59KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHN2Z1NwaW5uZXIgZnJvbSAnZ21mL2ljb25zL3NwaW5uZXJfc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQgYDxkaXYgY2xhc3M9XCJnbWYtZGlzcGxheXF1ZXJ5Z3JpZCBwYW5lbFwiIG5nLXNob3c9XCJjdHJsLmFjdGl2ZVwiPlxuICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBuZy1jbGljaz1cImN0cmwuY2xlYXIoKVwiPiZ0aW1lczs8L2Rpdj5cblxuICA8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICA8bGlcbiAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICBuZy1jbGljaz1cImN0cmwuc2VsZWN0VGFiKGdyaWRTb3VyY2UpXCJcbiAgICA+XG4gICAgICA8YVxuICAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgaHJlZj1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgICAgICBuZy1jbGFzcz1cInsnYWN0aXZlJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxuICAgICAgICBkYXRhLXRhcmdldD1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxuICAgICAgICBhcmlhLWNvbnRyb2xzPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcbiAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwidGFiXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4+IHt7Z3JpZFNvdXJjZS5zb3VyY2UubGFiZWwgfCB0cmFuc2xhdGV9fSAoe3tncmlkU291cmNlLnNvdXJjZS5mZWF0dXJlcy5sZW5ndGh9fSkgPC9zcGFuPlxuICAgICAgPC9hPlxuICAgIDwvbGk+XG4gIDwvdWw+XG5cbiAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XG4gICAgPGRpdlxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxuICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgIGNsYXNzPVwidGFiLXBhbmVcIlxuICAgICAgbmctY2xhc3M9XCJ7J2FjdGl2ZScgOiBjdHJsLmlzU2VsZWN0ZWQoZ3JpZFNvdXJjZSl9XCJcbiAgICAgIGlkPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcbiAgICA+XG4gICAgICA8bmdlby1ncmlkIG5nZW8tZ3JpZC1jb25maWd1cmF0aW9uPVwiZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uXCI+IDwvbmdlby1ncmlkPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgbmctc2hvdz1cIiFjdHJsLnBlbmRpbmcgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkuY29uZmlndXJhdGlvbiAhPT0gbnVsbFwiXG4gICAgICAgIGNsYXNzPVwicm93XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC01IG15LWF1dG9cIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cImN0cmwuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXygpXCIgY2xhc3M9XCJnbWYtcXVlcnktZ3JpZC10b28tbWFueSB0ZXh0LXdhcm5pbmdcIlxuICAgICAgICAgICAgPnt7J09ubHknIHwgdHJhbnNsYXRlfX0ge3tjdHJsLnN1bU9mRmVhdHVyZXN9fSB7eydvZicgfCB0cmFuc2xhdGV9fSB7e2N0cmwuc3VtT2ZBdmFpbGFibGVSZXN1bHRzfX1cbiAgICAgICAgICAgIHt7J3Jlc3VsdHMgZGlzcGxheWVkLCBhcyB0aGUgbWF4aW11bSBudW1iZXIgaXMgcmVhY2hlZC4gUGxlYXNlIHJlZmluZSB5b3VyIHF1ZXJ5LicgfCB0cmFuc2xhdGVcbiAgICAgICAgICAgIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC03XCIgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibmF2IGp1c3RpZnktY29udGVudC1lbmRcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5nLWhpZGVcIiBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tc20gbmctYmluZGluZ1wiPlxuICAgICAgICAgICAgICAgIHt7Y3RybC5nZXRTZWxlY3RlZFJvd0NvdW50KCl9fSA8c3BhbiB0cmFuc2xhdGU+c2VsZWN0ZWQgZWxlbWVudChzKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGkgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCIgY2xhc3M9XCJuZy1oaWRlXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3snWm9vbSB0byBzZWxlY3Rpb24nIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC56b29tVG9TZWxlY3Rpb24oKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaC1wbHVzXCI+PC9pPiA8c3BhbiB0cmFuc2xhdGU+Wm9vbSB0bzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGkgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCIgY2xhc3M9XCJuZy1oaWRlXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3snRXhwb3J0IHNlbGVjdGlvbiBhcyBDU1YnIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC5kb3dubG9hZENzdigpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZG93bmxvYWRcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5FeHBvcnQgYXMgQ1NWPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRyb3B1cCBidG4gYnRuLWRlZmF1bHQgYnRuLXNtIGRyb3Bkb3duLXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiB0cmFuc2xhdGU+U2VsZWN0PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBuZy1jbGljaz1cImN0cmwuc2VsZWN0QWxsKClcIiB0cmFuc2xhdGU+QWxsPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgbmctY2xpY2s9XCJjdHJsLnVuc2VsZWN0QWxsKClcIiB0cmFuc2xhdGU+Tm9uZTwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIG5nLWNsaWNrPVwiY3RybC5pbnZlcnRTZWxlY3Rpb24oKVwiIHRyYW5zbGF0ZT5SZXZlcnNlIHNlbGVjdGlvbjwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBuZy1zaG93PVwiY3RybC5wZW5kaW5nXCIgY2xhc3M9XCJzcGlubmVyLWdyaWRcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc3BpblwiXG4gICAgICAgID4ke3N2Z1NwaW5uZXIoJzNyZW0nKX08L2k+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YDtcbiIsIlF1ZXJ5R3JpZENvbnRyb2xsZXIuJGluamVjdCA9IFtcbiAgJyRzY29wZScsXG4gICduZ2VvUXVlcnlSZXN1bHQnLFxuICAnbmdlb01hcFF1ZXJlbnQnLFxuICAnJHRpbWVvdXQnLFxuICAnbmdlb1F1ZXJ5T3B0aW9ucycsXG4gICdnbWZDc3ZGaWxlbmFtZScsXG4gICckZWxlbWVudCcsXG4gICdnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucycsXG5dO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZG93bmxvYWRDc3ZTZXJ2aWNlIGZyb20gJ25nZW8vZG93bmxvYWQvQ3N2JztcbmltcG9ydCBuZ2VvR3JpZENvbXBvbmVudCBmcm9tICduZ2VvL2dyaWQvY29tcG9uZW50JztcbmltcG9ydCBuZ2VvR3JpZENvbmZpZywge2dldFJvd1VpZH0gZnJvbSAnbmdlby9ncmlkL0NvbmZpZyc7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBuZ2VvUXVlcnlNYXBRdWVyZW50IGZyb20gJ25nZW8vcXVlcnkvTWFwUXVlcmVudCc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24nO1xuaW1wb3J0ICogYXMgb2xFeHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IHtidWlsZFN0eWxlfSBmcm9tICduZ2VvL29wdGlvbnMnO1xuaW1wb3J0IHBhbmVscyBmcm9tICdnbWZhcGkvc3RvcmUvcGFuZWxzJztcbmltcG9ydCAnYm9vdHN0cmFwL2pzL3NyYy9kcm9wZG93bic7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vZ3JpZENvbXBvbmVudC5odG1sJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhIGdyaWQgdGFiLlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEdyaWRTb3VyY2VcbiAqIEBwcm9wZXJ0eSB7aW1wb3J0KCduZ2VvL2dyaWQvQ29uZmlnJykuZGVmYXVsdH0gW2NvbmZpZ3VyYXRpb25dIENvbmZpZ3VyYXRpb24gdXNlZCB0byBpbml0aWFsaXplIGEgZ3JpZC5cbiAqIEBwcm9wZXJ0eSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gc291cmNlIFJlc3VsdHMgb2YgdGhlIHF1ZXJ5XG4gKiAgICBzb3VyY2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZRdWVyeUdyaWRDb21wb25lbnQnLCBbbmdlb0dyaWRDb21wb25lbnQubmFtZSwgbmdlb1F1ZXJ5TWFwUXVlcmVudC5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZShcbiAgJ2dtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGVtcGxhdGUgVVJMLlxuICAgKi9cbiAgKCRlbGVtZW50LCAkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5nbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGV1cmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCc7XG4gIH0sXG4pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCcsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtmdW5jdGlvbihKUXVlcnksIGFuZ3VsYXIuSUF0dHJpYnV0ZXMpOiBzdHJpbmd9IGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCBUZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckYXR0cnMnLCAnZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsJ107XG5mdW5jdGlvbiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwoJGVsZW1lbnQsICRhdHRycywgZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwoJGVsZW1lbnQsICRhdHRycyk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjb21wb25lbnQgdG8gZGlzcGxheSByZXN1bHRzIG9mIHRoZSB7QGxpbmsgaW1wb3J0KCduZ2VvL3F1ZXJ5UmVzdWx0JykuZGVmYXVsdH0gaW4gYVxuICogZ3JpZCBhbmQgc2hvd3MgcmVsYXRlZCBmZWF0dXJlcyBvbiB0aGUgbWFwIHVzaW5nXG4gKiB0aGUge0BsaW5rIGltcG9ydCgnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InKS5GZWF0dXJlT3ZlcmxheU1ncn0uXG4gKlxuICogWW91IGNhbiBvdmVycmlkZSB0aGUgZGVmYXVsdCBjb21wb25lbnQncyB0ZW1wbGF0ZSBieSBzZXR0aW5nIHRoZVxuICogdmFsdWUgYGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybGAuXG4gKlxuICogRmVhdHVyZXMgZGlzcGxheWVkIG9uIHRoZSBtYXAgdXNlIGEgZGVmYXVsdCBzdHlsZSBidXQgeW91IGNhbiBvdmVycmlkZSB0aGVzZVxuICogc3R5bGVzIGJ5IHBhc3Npbmcgb2wuc3R5bGUuU3R5bGUgb2JqZWN0cyBhcyBhdHRyaWJ1dGVzIG9mIHRoaXMgY29tcG9uZW50LlxuICpcbiAqIE5vdGU6IHRoZSBmb2xsb3dpbmcgbmctY2xhc3MgbmVlZCB0byBiZSBwcmVzZW50IGluIHRoZSBpbnRlcmZhY2UgPGJvZHk+IGVsZW1lbnQgdG8gZGlzcGxheSB0aGUgZm9vdGVyXG4gKiB3aGVuIHRoZSBncmlkIGlzIGFjdGl2ZSAoaW5pdGlhbGx5IHRoZXJlIHNob3VsZCBiZSB0aGUgY29kZSBmb3IgdGhlIHByb2ZpbGUgdG9vbCk6XG4gKiAgICAgIDxib2R5IG5nLWNsYXNzPVwie1xuICogICAgICAgICdnbWYtcHJvZmlsZS1jaGFydC1hY3RpdmUnOiAhIXByb2ZpbGVDaGFydEFjdGl2ZSxcbiAqICAgICAgICAnZ21mLXF1ZXJ5LWdyaWQtYWN0aXZlJzogISFxdWVyeUdyaWRBY3RpdmVcbiAqICAgICAgfVwiPlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICA8Z21mLWRpc3BsYXlxdWVyeWdyaWQgZ21mLWRpc3BsYXlxdWVyeWdyaWQtbWFwPVwiY3RybC5tYXBcIj48L2dtZi1kaXNwbGF5cXVlcnlncmlkPlxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBnbWYtZGlzcGxheXF1ZXJ5Z3JpZC1hY3RpdmUgVGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LlxuICogQGh0bWxBdHRyaWJ1dGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH0gZ21mLWRpc3BsYXlxdWVyeWdyaWQtbWFwIFRoZSBtYXAuXG4gKiBAbmdkb2MgY29tcG9uZW50XG4gKiBAbmduYW1lIGdtZkRpc3BsYXlxdWVyeWdyaWRcbiAqL1xuY29uc3QgcXVlcnlHcmlkQ29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXIgYXMgY3RybCcsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ2FjdGl2ZSc6ICc9P2dtZkRpc3BsYXlxdWVyeWdyaWRBY3RpdmUnLFxuICAgICdnZXRNYXBGbic6ICcmZ21mRGlzcGxheXF1ZXJ5Z3JpZE1hcCcsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCdnbWZEaXNwbGF5cXVlcnlncmlkJywgcXVlcnlHcmlkQ29tcG9uZW50KTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciB0aGUgcXVlcnkgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH0gbmdlb1F1ZXJ5UmVzdWx0IG5nZW8gcXVlcnkgcmVzdWx0LlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLk1hcFF1ZXJlbnR9IG5nZW9NYXBRdWVyZW50IG5nZW8gbWFwIHF1ZXJlbnQgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9ICR0aW1lb3V0IEFuZ3VsYXIgdGltZW91dCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9RdWVyeU9wdGlvbnN9IG5nZW9RdWVyeU9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZDc3ZGaWxlbmFtZX0gZ21mQ3N2RmlsZW5hbWUgVGhlIENTViBmaWxlIG5hbWUuXG4gKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zfSBnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEBjbGFzc1xuICogQGhpZGRlblxuICogQG5nZG9jIGNvbnRyb2xsZXJcbiAqIEBuZ25hbWUgR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXJ5R3JpZENvbnRyb2xsZXIoXG4gICRzY29wZSxcbiAgbmdlb1F1ZXJ5UmVzdWx0LFxuICBuZ2VvTWFwUXVlcmVudCxcbiAgJHRpbWVvdXQsXG4gIG5nZW9RdWVyeU9wdGlvbnMsXG4gIGdtZkNzdkZpbGVuYW1lLFxuICAkZWxlbWVudCxcbiAgZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnMsXG4pIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnN9XG4gICAqL1xuICB0aGlzLm9wdGlvbnMgPSBnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucztcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH1cbiAgICovXG4gIHRoaXMubmdlb1F1ZXJ5UmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5NYXBRdWVyZW50fVxuICAgKi9cbiAgdGhpcy5uZ2VvTWFwUXVlcmVudF8gPSBuZ2VvTWFwUXVlcmVudDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9kb3dubG9hZC9Dc3YnKS5Eb3dubG9hZENzdlNlcnZpY2V9XG4gICAqL1xuICB0aGlzLm5nZW9Dc3ZEb3dubG9hZF8gPSBkb3dubG9hZENzdlNlcnZpY2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtKUXVlcnl9XG4gICAqL1xuICB0aGlzLiRlbGVtZW50XyA9ICRlbGVtZW50O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgdGhpcy5tYXhSZXN1bHRzID0gbmdlb1F1ZXJ5T3B0aW9ucy5saW1pdCAhPT0gdW5kZWZpbmVkID8gbmdlb1F1ZXJ5T3B0aW9ucy5saW1pdCA6IDUwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBHcmlkU291cmNlPn1cbiAgICovXG4gIHRoaXMuZ3JpZFNvdXJjZXMgPSB7fTtcblxuICAvKipcbiAgICogSURzIG9mIHRoZSBncmlkIHNvdXJjZXMgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBsb2FkZWQuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICovXG4gIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMgPSBbXTtcblxuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjdXJyZW50bHkgc2hvd24gcXVlcnkgc291cmNlLlxuICAgKlxuICAgKiBAdHlwZSB7P3N0cmluZ3xudW1iZXJ9XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkVGFiID0gbnVsbDtcblxuICAvKipcbiAgICogQSBtYXBwaW5nIGJldHdlZW4gcm93IHVpZCBhbmQgdGhlIGNvcnJlc3BvbmRpbmcgZmVhdHVyZSBmb3IgZWFjaFxuICAgKiBzb3VyY2UuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBPYmplY3Q8c3RyaW5nLCBpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pj59XG4gICAqL1xuICB0aGlzLmZlYXR1cmVzRm9yU291cmNlc18gPSB7fTtcblxuICAvLyBTdHlsZXMgZm9yIGRpc3BsYXllZCBmZWF0dXJlcyAoZmVhdHVyZXMpIGFuZCBzZWxlY3RlZCBmZWF0dXJlc1xuICAvLyAoaGlnaGxpZ2h0RmVhdHVyZXNfKSAodXNlciBjYW4gc2V0IGJvdGggc3R5bGVzKS5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL0NvbGxlY3Rpb24nKS5kZWZhdWx0PGltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL0NvbGxlY3Rpb24nKS5kZWZhdWx0PGltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD4+fVxuICAgKi9cbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG5cbiAgLyoqXG4gICAqIEZpbGVuYW1lXG4gICAqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mQ3N2RmlsZW5hbWV9XG4gICAqL1xuICB0aGlzLmZpbGVuYW1lXyA9IGdtZkNzdkZpbGVuYW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwXyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFN1bSBvdmVyIGFsbCB0YWJzIG9mIHRoZSBvYnRhaW5lZCByZXN1bHRzXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLnN1bU9mRmVhdHVyZXMgPSAwO1xuXG4gIC8qKlxuICAgKiBTdW0gb3ZlciBhbGwgdGFicyBvZiB0aGUgYXZhaWxhYmxlIHJlc3VsdHNcbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzID0gMDtcblxuICAvLyBXYXRjaCB0aGUgbmdlbyBxdWVyeSByZXN1bHQgc2VydmljZS5cbiAgdGhpcy4kc2NvcGVfLiR3YXRjaENvbGxlY3Rpb24oXG4gICAgKCkgPT4gbmdlb1F1ZXJ5UmVzdWx0LFxuICAgIChuZXdRdWVyeVJlc3VsdCwgb2xkUXVlcnlSZXN1bHQpID0+IHtcbiAgICAgIC8vIE9wZW4gdGhlIHBhbmVsIGJlZm9yZSByZXN1bHRzIGZvciBmaXJzdCByZXF1ZXN0IChkaXNwbGF5IHRoZSBzcGlubmVyKVxuICAgICAgaWYgKG5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgICAgICAgc3RhdGU6IHRydWUsXG4gICAgICAgICAgbm9FcnJvcjogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobmV3UXVlcnlSZXN1bHQgIT09IG9sZFF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YV8oKTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBBbiB1bnJlZ2lzdGVyIGZ1bmN0aW9uIHJldHVybmVkIGZyb20gYCRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uYCBmb3JcbiAgICogXCJvbi1zZWxlY3RcIiBjaGFuZ2VzICh3aGVuIHJvd3MgYXJlIHNlbGVjdGVkL3Vuc2VsZWN0ZWQpLlxuICAgKlxuICAgKiBAdHlwZSB7P2Z1bmN0aW9uKCk6IHZvaWR9XG4gICAqL1xuICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/KCkgPT4gb2xNYXB9XG4gICAqL1xuICB0aGlzLmdldE1hcEZuID0gbnVsbDtcbn1cblxuLyoqXG4gKiBJbml0IHRoZSBjb250cm9sbGVyXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5nZXRNYXBGbikge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZXRNYXBGbicpO1xuICB9XG4gIGNvbnN0IGZlYXR1cmVzT3ZlcmxheSA9IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBmZWF0dXJlc092ZXJsYXkuc2V0RmVhdHVyZXModGhpcy5mZWF0dXJlc18pO1xuICBmZWF0dXJlc092ZXJsYXkuc2V0U3R5bGUoYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuZmVhdHVyZXNTdHlsZSkpO1xuICBjb25zdCBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkgPSBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5LnNldEZlYXR1cmVzKHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfKTtcbiAgY29uc3QgaGlnaGxpZ2h0RmVhdHVyZVN0eWxlID0gYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2VsZWN0ZWRGZWF0dXJlU3R5bGUpO1xuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0U3R5bGUoaGlnaGxpZ2h0RmVhdHVyZVN0eWxlKTtcbiAgY29uc3QgbWFwRm4gPSB0aGlzLmdldE1hcEZuO1xuICBpZiAobWFwRm4pIHtcbiAgICBjb25zdCBtYXAgPSBtYXBGbigpO1xuICAgIGlmICghKG1hcCBpbnN0YW5jZW9mIG9sTWFwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBtYXAgdHlwZScpO1xuICAgIH1cbiAgICB0aGlzLm1hcF8gPSBtYXA7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgZ3JpZCBzb3VyY2VzIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgbG9hZGVkLlxuICpcbiAqIEByZXR1cm5zIHtHcmlkU291cmNlW119IEdyaWQgc291cmNlcy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0R3JpZFNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLm1hcCgoc291cmNlTGFiZWwpID0+IHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdKTtcbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEYXRhXyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gY2xvc2UgaWYgdGhlcmUgYXJlIG5vIHJlc3VsdHNcbiAgaWYgKFxuICAgICh0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nIHx8IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnRvdGFsID09PSAwKSAmJlxuICAgICF0aGlzLmhhc09uZVdpdGhUb29NYW55UmVzdWx0c18oKVxuICApIHtcbiAgICBjb25zdCBvbGRBY3RpdmUgPSB0aGlzLmFjdGl2ZTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgaWYgKG9sZEFjdGl2ZSkge1xuICAgICAgLy8gZG9uJ3QgY2xvc2UgaWYgdGhlcmUgYXJlIHBlbmRpbmcgcXVlcmllc1xuICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nO1xuICAgICAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgICAgIHN0YXRlOiB0aGlzLmFjdGl2ZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzID0gMDtcbiAgdGhpcy5zdW1PZkZlYXR1cmVzID0gMDtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgKi9cbiAgY29uc3QgY291bnRlZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICBpZiAoIWNvdW50ZWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZS5sYWJlbCkpIHtcbiAgICAgIHRoaXMuc3VtT2ZGZWF0dXJlcyArPSBzb3VyY2UuZmVhdHVyZXMubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZS5yZXF1ZXN0UGFydG5lcnMgfHwgIXNvdXJjZS5yZXF1ZXN0UGFydG5lcnMuc29tZSgobGFiZWwpID0+IGNvdW50ZWRTb3VyY2VzLmluY2x1ZGVzKGxhYmVsKSkpIHtcbiAgICAgIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzICs9IHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudDtcbiAgICB9XG4gICAgY291bnRlZFNvdXJjZXMucHVzaChzb3VyY2UubGFiZWwpO1xuICB9KTtcbiAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICBwYW5lbHMub3BlbkZvb3RlclBhbmVsKCdxdWVyeXJlc3VsdCcsIHtcbiAgICBzdGF0ZTogdHJ1ZSxcbiAgfSk7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICBsZXQgc291cmNlcyA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXM7XG4gIC8vIG1lcmdlIHNvdXJjZXMgaWYgcmVxdWVzdGVkXG4gIGlmIChPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMubWVyZ2VUYWJzIHx8IHt9KS5sZW5ndGggPiAwKSB7XG4gICAgc291cmNlcyA9IHRoaXMuZ2V0TWVyZ2VkU291cmNlc18oc291cmNlcyk7XG4gIH1cblxuICAvLyBjcmVhdGUgZ3JpZHMgKG9ubHkgZm9yIHNvdXJjZSB3aXRoIGZlYXR1cmVzIG9yIHdpdGggdG9vIG1hbnkgcmVzdWx0cylcbiAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICBpZiAoc291cmNlLnRvb01hbnlSZXN1bHRzICYmIHNvdXJjZS5mZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubWFrZUdyaWRfKG51bGwsIHNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvdXJjZS5pZCA9IHRoaXMuZXNjYXBlVmFsdWUoc291cmNlLmlkKTtcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gc291cmNlLmZlYXR1cmVzO1xuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0RGF0YV8oc291cmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodGhpcy5sb2FkZWRHcmlkU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBpZiBubyBncmlkcyB3ZXJlIGNyZWF0ZWQsIGRvIG5vdCBzaG93XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICBwYW5lbHMub3BlbkZvb3RlclBhbmVsKCdxdWVyeXJlc3VsdCcsIHtcbiAgICAgIHN0YXRlOiBmYWxzZSxcbiAgICAgIG5vRXJyb3I6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8ga2VlcCB0aGUgZmlyc3QgZXhpc3RpbmcgbmF2aWdhdGlvbiB0YWIgb3BlblxuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCB8fCAhKGAke3RoaXMuc2VsZWN0ZWRUYWJ9YCBpbiB0aGlzLmdyaWRTb3VyY2VzKSkge1xuICAgIC8vIHNlbGVjdGluZyB0aGUgdGFiIGlzIGRvbmUgaW4gYSB0aW1lb3V0LCBiZWNhdXNlIG90aGVyd2lzZSBpbiByYXJlIGNhc2VzXG4gICAgLy8gYG5nLWNsYXNzYCBtaWdodCBzZXQgdGhlIGBhY3RpdmVgIGNsYXNzIG9uIG11bHRpcGxlIHRhYnMuXG4gICAgdGhpcy4kdGltZW91dF8oKCkgPT4ge1xuICAgICAgY29uc3QgZmlyc3RTb3VyY2VJZCA9IHRoaXMubG9hZGVkR3JpZFNvdXJjZXNbMF07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmdyaWRTb3VyY2VzW2ZpcnN0U291cmNlSWRdKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gSWYgb25lIG9mIHRoZSBzb3VyY2UgaGFzIHRvbyBtYW55IHJlc3VsdHMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmhhc09uZVdpdGhUb29NYW55UmVzdWx0c18gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlLnRvb01hbnlSZXN1bHRzKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgd2l0aCBhbGwgc3ltYm9scyBhbmQgc3BhY2VzIHJlcGxhY2VkIGJ5IGFuIHVuZGVyc2NvcmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB2YWx1ZSBBIHZhbHVlIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVtYmVyfSB2YWx1ZSBBbiBlc2NhcGVkIHZhbHVlLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5lc2NhcGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAvLyBXb3JrLWFyb3VuZCBmb3IgTnVtYmVyLmlzSW50ZWdlcigpIHdoZW4gbm90IGFsd2F5cyBnZXR0aW5nIGEgbnVtYmVyIC4uLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHRvRXNjYXBlID0gL1stW1xcXS97fSgpKis/LlxcXFxeJCB8XS9nO1xuICAgIGlmICh2YWx1ZS5tYXRjaCh0b0VzY2FwZSkgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHRvRXNjYXBlLCAnXycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgaWYgdGhlIGdpdmVuIGdyaWQgc291cmNlIGlzIHNlbGVjdGVkP1xuICpcbiAqIEBwYXJhbSB7R3JpZFNvdXJjZX0gZ3JpZFNvdXJjZSBHcmlkIHNvdXJjZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBJcyBzZWxlY3RlZD9cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNTZWxlY3RlZCA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiID09PSBncmlkU291cmNlLnNvdXJjZS5sYWJlbDtcbn07XG5cbi8qKlxuICogVHJ5IHRvIG1lcmdlIHRoZSBtZXJnZWFibGUgc291cmNlcy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2VbXX0gc291cmNlcyBTb3VyY2VzLlxuICogQHJldHVybnMge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2VbXX0gVGhlIG1lcmdlZCBzb3VyY2VzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRNZXJnZWRTb3VyY2VzXyA9IGZ1bmN0aW9uIChzb3VyY2VzKSB7XG4gIC8qKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZVtdfSAqL1xuICBjb25zdCBhbGxTb3VyY2VzID0gW107XG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgaW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZT59ICovXG4gIGNvbnN0IG1lcmdlZFNvdXJjZXMgPSB7fTtcbiAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAvLyBjaGVjayBpZiB0aGlzIHNvdXJjZSBjYW4gYmUgbWVyZ2VkXG4gICAgY29uc3QgbWVyZ2VkU291cmNlID0gdGhpcy5nZXRNZXJnZWRTb3VyY2VfKHNvdXJjZSwgbWVyZ2VkU291cmNlcyk7XG4gICAgaWYgKG1lcmdlZFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgLy8gdGhpcyBzb3VyY2Ugc2hvdWxkIG5vdCBiZSBtZXJnZWQsIGFkZCBhcyBpc1xuICAgICAgYWxsU291cmNlcy5wdXNoKHNvdXJjZSk7XG4gICAgfVxuICB9KTtcbiAgZm9yIChjb25zdCBtZXJnZWRTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgYWxsU291cmNlcy5wdXNoKG1lcmdlZFNvdXJjZXNbbWVyZ2VkU291cmNlSWRdKTtcbiAgfVxuICByZXR1cm4gYWxsU291cmNlcztcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHNvdXJjZSBzaG91bGQgYmUgbWVyZ2VkLiBJZiBzbywgYW4gYXJ0aWZpY2lhbCBzb3VyY2VcbiAqIHRoYXQgd2lsbCBjb250YWluIHRoZSBmZWF0dXJlcyBvZiBhbGwgbWVyZ2VhYmxlIHNvdXJjZXMgaXMgcmV0dXJuZWQuIElmIG5vdCxcbiAqIGBudWxsYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2V9IHNvdXJjZSBTb3VyY2UuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvV2ZzUGVybWFsaW5rJykuUXVlcnlSZXN1bHRTb3VyY2U+fSBtZXJnZWRTb3VyY2VzXG4gKiAgICBNZXJnZWQgc291cmNlcy5cbiAqIEByZXR1cm5zIHs/aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9XZnNQZXJtYWxpbmsnKS5RdWVyeVJlc3VsdFNvdXJjZX0gQSBtZXJnZWQgc291cmNlIG9mIG51bGwgaWYgdGhlXG4gKiAgICBzb3VyY2Ugc2hvdWxkIG5vdCBiZSBtZXJnZWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZV8gPSBmdW5jdGlvbiAoc291cmNlLCBtZXJnZWRTb3VyY2VzKSB7XG4gIGxldCBtZXJnZVNvdXJjZUlkID0gbnVsbDtcbiAgZm9yIChjb25zdCBjdXJyZW50TWVyZ2VTb3VyY2VJZCBpbiB0aGlzLm9wdGlvbnMubWVyZ2VUYWJzIHx8IHt9KSB7XG4gICAgY29uc3Qgc291cmNlTGFiZWxzID0gdGhpcy5vcHRpb25zLm1lcmdlVGFic1tjdXJyZW50TWVyZ2VTb3VyY2VJZF07XG4gICAgY29uc3QgY29udGFpbnNTb3VyY2UgPSBzb3VyY2VMYWJlbHMuc29tZSgoc291cmNlTGFiZWwpID0+IHNvdXJjZUxhYmVsID09IHNvdXJjZS5sYWJlbCk7XG4gICAgaWYgKGNvbnRhaW5zU291cmNlKSB7XG4gICAgICBtZXJnZVNvdXJjZUlkID0gY3VycmVudE1lcmdlU291cmNlSWQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKG1lcmdlU291cmNlSWQgPT09IG51bGwpIHtcbiAgICAvLyB0aGlzIHNvdXJjZSBzaG91bGQgbm90IGJlIG1lcmdlZFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICBsZXQgbmV3UmVxdWVzdCA9IHRydWU7XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSAqL1xuICBsZXQgbWVyZ2VTb3VyY2U7XG4gIGlmIChtZXJnZVNvdXJjZUlkIGluIG1lcmdlZFNvdXJjZXMpIHtcbiAgICBtZXJnZVNvdXJjZSA9IG1lcmdlZFNvdXJjZXNbbWVyZ2VTb3VyY2VJZF07XG4gICAgaWYgKHNvdXJjZS5yZXF1ZXN0UGFydG5lcnMpIHtcbiAgICAgIG5ld1JlcXVlc3QgPSAhc291cmNlLnJlcXVlc3RQYXJ0bmVycy5zb21lKChsYWJlbCkgPT4gbWVyZ2VTb3VyY2UubWVyZ2VDb21wb3NhbnRzLmluY2x1ZGVzKGxhYmVsKSk7XG4gICAgfVxuICAgIG1lcmdlU291cmNlLm1lcmdlQ29tcG9zYW50cy5wdXNoKHNvdXJjZS5sYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgbWVyZ2VTb3VyY2UgPSB7XG4gICAgICBmZWF0dXJlczogW10sXG4gICAgICBpZDogbWVyZ2VTb3VyY2VJZCxcbiAgICAgIGxhYmVsOiBtZXJnZVNvdXJjZUlkLFxuICAgICAgbGltaXQ6IDAsXG4gICAgICAvL3RoZSBzdW0gb2YgdGhlIG9idGFpbmVkIHJlc3VsdHMgb2YgdGhlIHF1ZXJ5IGlzIGNvbXB1dGVkIGxhdGVyXG4gICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIHRvb01hbnlSZXN1bHRzOiBmYWxzZSxcbiAgICAgIG1lcmdlQ29tcG9zYW50czogW3NvdXJjZS5sYWJlbF0sXG4gICAgfTtcbiAgICBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdID0gbWVyZ2VTb3VyY2U7XG4gIH1cblxuICAvLyBhZGQgZmVhdHVyZXMgb2Ygc291cmNlIHRvIG1lcmdlIHNvdXJjZVxuICBzb3VyY2UuZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gIH0pO1xuXG4gIC8vIGlmIG9uZSBvZiB0aGUgc291cmNlIGhhcyB0b28gbWFueSByZXN1bHRzLCB0aGUgcmVzdWx0aW5nIG1lcmdlZCBzb3VyY2Ugd2lsbFxuICAvLyBhbHNvIGJlIG1hcmtlZCB3aXRoIGB0b29NYW55UmVzdWx0c2AuXG4gIG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzID0gbWVyZ2VTb3VyY2UudG9vTWFueVJlc3VsdHMgfHwgc291cmNlLnRvb01hbnlSZXN1bHRzO1xuXG4gIC8vIGZvciBsYXllcnMgY2FsbGVkIHdpdGggdGhlIHByZXZpb3VzIHJlcXVlc3QgdGhlIHRvdGFsRmVhdHVyZUNvdW50IChhdmFpbGFibGUgcmVzdWx0cykgYW5kIHRoZSBsaW1pdCAob2J0YWluZWQgcmVzdWx0cylcbiAgLy8gYXJlIHN0aWxsIHZhbGlkXG4gIGlmIChuZXdSZXF1ZXN0KSB7XG4gICAgaWYgKHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA9XG4gICAgICAgIG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICsgc291cmNlLnRvdGFsRmVhdHVyZUNvdW50XG4gICAgICAgICAgOiBzb3VyY2UudG90YWxGZWF0dXJlQ291bnQ7XG4gICAgfVxuICAgIG1lcmdlU291cmNlLmxpbWl0ICs9IHNvdXJjZS5saW1pdDtcbiAgfVxuICByZXR1cm4gbWVyZ2VTb3VyY2U7XG59O1xuXG4vKipcbiAqIENvbGxlY3QgYWxsIGZlYXR1cmVzIGluIHRoZSBxdWVyeVJlc3VsdCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSBzb3VyY2UgUmVzdWx0IHNvdXJjZS5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY29sbGVjdERhdGFfID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICBjb25zdCBmZWF0dXJlcyA9IHNvdXJjZS5mZWF0dXJlcztcbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPltdfSAqL1xuICBjb25zdCBhbGxQcm9wZXJ0aWVzID0gW107XG4gIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gIGNvbnN0IGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMgPSBbXTtcbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn0gKi9cbiAgY29uc3QgZmVhdHVyZXNGb3JTb3VyY2UgPSB7fTtcbiAgbGV0IHByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyeU5hbWU7XG4gIGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcbiAgICBwcm9wZXJ0aWVzID0gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gS2VlcHMgZGlzdGluY3QgZ2VvbWV0cnkgbmFtZXMgdG8gcmVtb3ZlIHRoZW1lIGxhdGVyLlxuICAgICAgZmVhdHVyZUdlb21ldHJ5TmFtZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnlOYW1lKCk7XG4gICAgICBpZiAoIWZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuaW5jbHVkZXMoZmVhdHVyZUdlb21ldHJ5TmFtZSkpIHtcbiAgICAgICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5wdXNoKGZlYXR1cmVHZW9tZXRyeU5hbWUpO1xuICAgICAgfVxuICAgICAgYWxsUHJvcGVydGllcy5wdXNoKHByb3BlcnRpZXMpO1xuICAgICAgZmVhdHVyZXNGb3JTb3VyY2VbZ2V0Um93VWlkKHByb3BlcnRpZXMpXSA9IGZlYXR1cmU7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5jbGVhblByb3BlcnRpZXNfKGFsbFByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMpO1xuICBpZiAoYWxsUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZ3JpZENyZWF0ZWQgPSB0aGlzLm1ha2VHcmlkXyhhbGxQcm9wZXJ0aWVzLCBzb3VyY2UpO1xuICAgIGlmIChncmlkQ3JlYXRlZCkge1xuICAgICAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfW2Ake3NvdXJjZS5sYWJlbH1gXSA9IGZlYXR1cmVzRm9yU291cmNlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIHVud2FudGVkIGNvbHVtbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmd8bnVtYmVyfGJvb2xlYW4+W119IGFsbFByb3BlcnRpZXMgQSByb3cuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmZWF0dXJlR2VvbWV0cmllc05hbWVzIEdlb21ldHJ5IG5hbWVzLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhblByb3BlcnRpZXNfID0gZnVuY3Rpb24gKGFsbFByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMpIHtcbiAgYWxsUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5mb3JFYWNoKChmZWF0dXJlR2VvbWV0cnlOYW1lKSA9PiB7XG4gICAgICBkZWxldGUgcHJvcGVydGllc1tmZWF0dXJlR2VvbWV0cnlOYW1lXTtcbiAgICB9KTtcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMubmdlb19mZWF0dXJlX3R5cGVfO1xuICB9KTtcbiAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVFbXB0eUNvbHVtbnMgPT09IHRydWUpIHtcbiAgICB0aGlzLnJlbW92ZUVtcHR5Q29sdW1uc0ZuXyhhbGxQcm9wZXJ0aWVzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgY29sdW1ucyB0aGF0IHdpbGwgYmUgY29tcGxldGVseSBlbXB0eSBiZXR3ZWVuIGVhY2ggcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj5bXX0gYWxsUHJvcGVydGllcyBBIHJvdy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlRW1wdHlDb2x1bW5zRm5fID0gZnVuY3Rpb24gKGFsbFByb3BlcnRpZXMpIHtcbiAgLy8gS2VlcCBhbGwga2V5cyB0aGF0IGNvcnJlc3BvbmQgdG8gYXQgbGVhc3Qgb25lIHZhbHVlIGluIGEgcHJvcGVydGllcyBvYmplY3QuXG4gIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gIGNvbnN0IGtleXNUb0tlZXAgPSBbXTtcbiAgbGV0IGksIGtleTtcbiAgZm9yIChrZXkgaW4gYWxsUHJvcGVydGllc1swXSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBhbGxQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxsUHJvcGVydGllc1tpXVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5c1RvS2VlcC5wdXNoKGtleSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBHZXQgYWxsIGtleXMgdGhhdCBwcmV2aW91c2x5IGFsd2F5cyByZWZlcnMgYWx3YXlzIHRvIGFuIGVtcHR5IHZhbHVlLlxuICBsZXQga2V5VG9SZW1vdmU7XG4gIGFsbFByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydGllcykgPT4ge1xuICAgIGtleVRvUmVtb3ZlID0gW107XG4gICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgaWYgKCFrZXlzVG9LZWVwLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAga2V5VG9SZW1vdmUucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlc2Uga2V5cy5cbiAgICBrZXlUb1JlbW92ZS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2tleV07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0gez9PYmplY3Q8c3RyaW5nLCBzdHJpbmd8bnVtYmVyfGJvb2xlYW4+W119IGRhdGEgR3JpZCByb3dzLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL1dmc1Blcm1hbGluaycpLlF1ZXJ5UmVzdWx0U291cmNlfSBzb3VyY2UgUXVlcnkgc291cmNlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhIGdyaWQgd2FzIGNyZWF0ZWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLm1ha2VHcmlkXyA9IGZ1bmN0aW9uIChkYXRhLCBzb3VyY2UpIHtcbiAgY29uc3Qgc291cmNlTGFiZWwgPSBgJHtzb3VyY2UubGFiZWx9YDtcbiAgbGV0IGdyaWRDb25maWcgPSBudWxsO1xuICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgIGdyaWRDb25maWcgPSB0aGlzLmdldEdyaWRDb25maWd1cmF0aW9uXyhkYXRhKTtcbiAgICBpZiAoZ3JpZENvbmZpZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoIXRoaXMubG9hZGVkR3JpZFNvdXJjZXMuaW5jbHVkZXMoc291cmNlTGFiZWwpKSB7XG4gICAgdGhpcy5sb2FkZWRHcmlkU291cmNlcy5wdXNoKHNvdXJjZUxhYmVsKTtcbiAgfVxuICB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXSA9IHtcbiAgICBzb3VyY2U6IHNvdXJjZSxcbiAgfTtcbiAgaWYgKGdyaWRDb25maWcpIHtcbiAgICB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXS5jb25maWd1cmF0aW9uID0gZ3JpZENvbmZpZztcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmd8bnVtYmVyfGJvb2xlYW4+W119IGRhdGEgR3JpZCByb3dzLlxuICogQHJldHVybnMgez9pbXBvcnQoJ25nZW8vZ3JpZC9Db25maWcnKS5kZWZhdWx0fSBHcmlkIGNvbmZpZy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0R3JpZENvbmZpZ3VyYXRpb25fID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkYXRhJyk7XG4gIH1cbiAgY29uc3QgY2xvbmUgPSB7fTtcbiAgT2JqZWN0LmFzc2lnbihjbG9uZSwgZGF0YVswXSk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgZGVsZXRlIGNsb25lLm9sX3VpZDtcbiAgY29uc3QgY29sdW1ucyA9IE9iamVjdC5rZXlzKGNsb25lKTtcblxuICAvKiogQHR5cGUge2ltcG9ydCgnbmdlby9kb3dubG9hZC9Dc3YnKS5HcmlkQ29sdW1uRGVmW119ICovXG4gIGNvbnN0IGNvbHVtbkRlZnMgPSBbXTtcbiAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBjb2x1bW5EZWZzLnB1c2goXG4gICAgICAvKiogQHR5cGUge2ltcG9ydCgnbmdlby9kb3dubG9hZC9Dc3YnKS5HcmlkQ29sdW1uRGVmfSAqLyB7XG4gICAgICAgIG5hbWU6IGNvbHVtbixcbiAgICAgIH0sXG4gICAgKTtcbiAgfSk7XG4gIGlmIChjb2x1bW5EZWZzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbmV3IG5nZW9HcmlkQ29uZmlnKGRhdGEsIGNvbHVtbkRlZnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIG5vIGNvbHVtbnMsIGRvIG5vdCBzaG93IGdyaWRcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnRseSBzaG93biBncmlkIHNvdXJjZS5cbiAqXG4gKiBAcmV0dXJucyB7R3JpZFNvdXJjZXxudWxsfSBHcmlkIHNvdXJjZS5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0QWN0aXZlR3JpZFNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkU291cmNlc1tgJHt0aGlzLnNlbGVjdGVkVGFifWBdO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgY3VycmVudCBzZWxlY3RlZCBmZWF0dXJlIGFuZCBzb3VyY2UgYW5kIHJlbW92ZSBhbGwgZmVhdHVyZXNcbiAqIGZyb20gdGhlIG1hcC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgIHN0YXRlOiBmYWxzZSxcbiAgICBub0Vycm9yOiB0cnVlLFxuICB9KTtcbiAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gIHRoaXMuZ3JpZFNvdXJjZXMgPSB7fTtcbiAgdGhpcy5sb2FkZWRHcmlkU291cmNlcyA9IFtdO1xuICB0aGlzLnNlbGVjdGVkVGFiID0gbnVsbDtcbiAgdGhpcy50b29NYW55UmVzdWx0cyA9IGZhbHNlO1xuICB0aGlzLmZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLm5nZW9NYXBRdWVyZW50Xy5jbGVhcigpO1xuICB0aGlzLmZlYXR1cmVzRm9yU291cmNlc18gPSB7fTtcbiAgaWYgKHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgdGhlIHRhYiBmb3IgdGhlIGdpdmVuIGdyaWQgc291cmNlLlxuICpcbiAqIEBwYXJhbSB7R3JpZFNvdXJjZX0gZ3JpZFNvdXJjZSBHcmlkIHNvdXJjZS5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0VGFiID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgY29uc3Qgc291cmNlID0gZ3JpZFNvdXJjZS5zb3VyY2U7XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBzb3VyY2UubGFiZWw7XG4gIGlmICh0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXykge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKCk7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSBudWxsO1xuICB9XG4gIGlmIChncmlkU291cmNlLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gdGhpcy4kc2NvcGVfLiR3YXRjaENvbGxlY3Rpb24oXG4gICAgICAoKSA9PiBncmlkU291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRSb3dzLFxuICAgICAgKG5ld1NlbGVjdGVkLCBvbGRTZWxlY3RlZFJvd3MpID0+IHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld1NlbGVjdGVkKSAhPT0gT2JqZWN0LmtleXMob2xkU2VsZWN0ZWRSb3dzKSkge1xuICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkXygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH1cbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG4gIHRoaXMucmVmbG93R3JpZF8oKTtcbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5yZWZsb3dHcmlkXyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhpcyBpcyBhIFwid29yay1hcm91bmRcIiB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBpcyByZW5kZXJlZCBjb3JyZWN0bHkuXG4gIC8vIFdoZW4gYSBwYW5lIGlzIGFjdGl2YXRlZCBieSBzZXR0aW5nIGB0aGlzLnNlbGVjdGVkVGFiYCwgdGhlIGNsYXNzIGBhY3RpdmVgXG4gIC8vIGlzIG5vdCB5ZXQgc2V0IG9uIHRoZSBwYW5lLiBUaGF0J3Mgd2h5IHRoZSBjbGFzcyBpcyBzZXQgbWFudWFsbHksIGFuZFxuICAvLyBhZnRlciB0aGUgcGFuZSBpcyBzaG93biAoaW4gdGhlIG5leHQgZGlnZXN0IGxvb3ApLCB0aGUgZ3JpZCB0YWJsZSBjYW5cbiAgLy8gYmUgcmVmcmVzaGVkLlxuICBjb25zdCBpZCA9IHRoaXMuZXNjYXBlVmFsdWUodGhpcy5zZWxlY3RlZFRhYiB8fCAnJyk7XG4gIGNvbnN0IGFjdGl2ZVBhbmUgPSB0aGlzLiRlbGVtZW50Xy5maW5kKGBkaXYudGFiLXBhbmUjJHtpZH1gKTtcbiAgYWN0aXZlUGFuZS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB0aGlzLiR0aW1lb3V0XygoKSA9PiB7XG4gICAgYWN0aXZlUGFuZS5maW5kKCdkaXYubmdlby1ncmlkLXRhYmxlLWNvbnRhaW5lciB0YWJsZScpLnRyaWdnZXIoJ3JlZmxvdycpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gdGhlIHJvdyBzZWxlY3Rpb24gaGFzIGNoYW5nZWQuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLm9uU2VsZWN0aW9uQ2hhbmdlZF8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGdyaWRTb3VyY2UgPSB0aGlzLmdyaWRTb3VyY2VzW2Ake3RoaXMuc2VsZWN0ZWRUYWJ9YF07XG4gIHRoaXMudXBkYXRlRmVhdHVyZXNfKGdyaWRTb3VyY2UpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dyaWRTb3VyY2V9IGdyaWRTb3VyY2UgR3JpZCBzb3VyY2VcbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRmVhdHVyZXNfID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgdGhpcy5mZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uY2xlYXIoKTtcbiAgaWYgKCFncmlkU291cmNlLmNvbmZpZ3VyYXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc291cmNlTGFiZWwgPSBgJHtncmlkU291cmNlLnNvdXJjZS5sYWJlbH1gO1xuICBjb25zdCBmZWF0dXJlc0ZvclNvdXJjZSA9IHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tzb3VyY2VMYWJlbF07XG4gIGNvbnN0IHNlbGVjdGVkUm93cyA9IGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RlZFJvd3M7XG4gIGZvciAoY29uc3Qgcm93SWQgaW4gZmVhdHVyZXNGb3JTb3VyY2UpIHtcbiAgICBjb25zdCBmZWF0dXJlID0gZmVhdHVyZXNGb3JTb3VyY2Vbcm93SWRdO1xuICAgIGlmIChyb3dJZCBpbiBzZWxlY3RlZFJvd3MpIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgaWYgYSByb3cgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZ3JpZCBpcyBzZWxlY3RlZD9cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gSXMgb25lIHNlbGVjdGVkP1xuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pc09uZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRDb3VudCgpID4gMDtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgcm93cyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBncmlkLlxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgcm93cy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRSb3dDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRDb3VudCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhbGwgcm93cyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBncmlkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0QWxsKCk7XG4gIH1cbn07XG5cbi8qKlxuICogRGVzZWxlY3QgYWxsIHJvd3Mgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgZ3JpZC5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24udW5zZWxlY3RBbGwoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbnZlcnQgdGhlIHNlbGVjdGlvbiBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBncmlkLlxuICovXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pbnZlcnRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24uaW52ZXJ0U2VsZWN0aW9uKCk7XG4gIH1cbn07XG5cbi8qKlxuICogWm9vbSB0byB0aGUgc2VsZWN0ZWQgZmVhdHVyZXMuXG4gKi9cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnpvb21Ub1NlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcF8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBjb25zdCBleHRlbnQgPSBvbEV4dGVudC5jcmVhdGVFbXB0eSgpO1xuICAgIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmZvckVhY2goKGZlYXR1cmUpID0+IHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgIH1cbiAgICAgIG9sRXh0ZW50LmV4dGVuZChleHRlbnQsIGdlb21ldHJ5LmdldEV4dGVudCgpKTtcbiAgICB9KTtcbiAgICBjb25zdCBzaXplID0gdGhpcy5tYXBfLmdldFNpemUoKTtcbiAgICBpZiAoIXNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgfVxuICAgIHRoaXMubWFwXy5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgc2l6ZSxcbiAgICAgIG1heFpvb206IHRoaXMub3B0aW9ucy5tYXhSZWNlbnRlclpvb20sXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnQgYSBDU1YgZG93bmxvYWQgZm9yIHRoZSBzZWxlY3RlZCBmZWF0dXJlcy5cbiAqL1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZG93bmxvYWRDc3YgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgY29uc3QgY29sdW1uRGVmcyA9IHNvdXJjZS5jb25maWd1cmF0aW9uLmNvbHVtbkRlZnM7XG4gICAgaWYgKCFjb2x1bW5EZWZzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29sdW1uRGVmcycpO1xuICAgIH1cbiAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZFJvd3MoKTtcbiAgICB0aGlzLm5nZW9Dc3ZEb3dubG9hZF8uc3RhcnREb3dubG9hZChzZWxlY3RlZFJvd3MsIGNvbHVtbkRlZnMsIHRoaXMuZmlsZW5hbWVfKTtcbiAgfVxufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyJywgUXVlcnlHcmlkQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImRpc3BsYXlxdWVyeWdyaWRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9