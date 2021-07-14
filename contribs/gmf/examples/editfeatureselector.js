// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import angular from 'angular';
import './editfeatureselector.css';
import './gmf-hidden.inc.css';
import 'bootstrap/js/src/tooltip.js';
import gmfAuthenticationModule from 'gmf/authentication/module.js';

import gmfEditingEditFeatureSelectorComponent from 'gmf/editing/editFeatureSelectorComponent.js';

import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import EPSG2056 from 'ngeo/proj/EPSG_2056.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import options from './options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfAuthenticationModule.name,
  gmfEditingEditFeatureSelectorComponent.name,
  gmfLayertreeComponent.name,
  gmfLayertreeTreeManager.name,
  gmfMapComponent.name,
  gmfThemeThemes.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf themes service.
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager gmf Tree Manager
 *    service.
 * @param {import('gmf/authentication/Service.js').User} gmfUser User.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @ngInject
 * @class
 */
function MainController($scope, gmfThemes, gmfTreeManager, gmfUser, ngeoFeatureHelper, ngeoToolActivateMgr) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import('gmf/authentication/Service.js').User}
   */
  this.gmfUser = gmfUser;

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
   */
  this.featureHelper_ = ngeoFeatureHelper;

  gmfThemes.loadThemes();

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {import("ol/layer/Vector.js").default<import("ol/source/Vector.js").default<import("ol/geom/Geometry.js").default>>}
   */
  this.vectorLayer = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: new olCollection(),
    }),
    style: (feature, resolution) =>
      ngeoFeatureHelper.createEditingStyles(
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (feature)
      ),
  });

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 2,
    }),
  });

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      // Add 'Edit' theme, i.e. the one with id 73
      for (let i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].id === 73) {
          this.gmfTreeManager.setFirstLevelGroups(themes[i].children);
          break;
        }
      }

      // Add layer vector after
      this.map.addLayer(this.vectorLayer);
    }
  });

  /**
   * @type {boolean}
   */
  this.editFeatureSelectorActive = true;

  const editFeatureSelectorToolActivate = new ngeoMiscToolActivate(this, 'editFeatureSelectorActive');
  ngeoToolActivateMgr.registerTool('mapTools', editFeatureSelectorToolActivate, true);

  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, false);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

myModule.controller('MainController', MainController);

myModule.constant('defaultTheme', 'Edit');
options(myModule);

export default myModule;
