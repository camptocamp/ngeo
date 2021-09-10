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
import 'bootstrap/js/src/tooltip';
import gmfAuthenticationModule from 'gmf/authentication/module';

import gmfEditingEditFeatureSelectorComponent from 'gmf/editing/editFeatureSelectorComponent';

import gmfLayertreeComponent from 'gmf/layertree/component';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';

import gmfMapComponent from 'gmf/map/component';

import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';
import options from './options';

import user from 'ngeo/store/user.ts';

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
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager gmf Tree Manager
 *    service.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @ngInject
 * @class
 */
function MainController($scope, gmfThemes, gmfTreeManager, ngeoFeatureHelper, ngeoToolActivateMgr) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import('gmf/authentication/Service').User}
   */
  this.gmfUser = null;

  /**
   * @type {Subscription[]}
   * @private
   */
  this.subscriptions_ = [];

  this.subscriptions_.push(
    user.getProperties().subscribe({
      next: (value) => (this.gmfUser = value),
    })
  );

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.featureHelper_ = ngeoFeatureHelper;

  gmfThemes.loadThemes();

  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager = gmfTreeManager;

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.vectorLayer = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: new olCollection(),
    }),
    style: (feature, resolution) =>
      ngeoFeatureHelper.createEditingStyles(
        /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (feature)
      ),
  });

  /**
   * @type {import('ol/Map').default}
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

/**
 * Clear subscriptions.
 */
MainController.prototype.$onDestroy = function () {
  this.subscriptions_.forEach((sub) => sub.unsubscribe());
};

myModule.controller('MainController', MainController);

myModule.constant('defaultTheme', 'Edit');
options(myModule);

export default myModule;
