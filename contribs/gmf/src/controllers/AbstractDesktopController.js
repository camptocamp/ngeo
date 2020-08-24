// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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
import gmfControllersAbstractAPIController, {
  AbstractAPIController,
} from 'gmf/controllers/AbstractAPIController.js';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered.js';
import gmfEditingModule from 'gmf/editing/module.js';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';
import gmfPrintModule from 'gmf/print/module.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfRasterComponent from 'gmf/raster/component.js';
import ngeoMapswipeModule from 'ngeo/map/swipe.js';
import ngeoDrawFeatures from 'ngeo/draw/features.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoQueryPanelComponent from 'ngeo/query/panelComponent.js';
import gmfImportModule from 'gmf/import/module.js';
import olCollection from 'ol/Collection.js';
import {listen} from 'ol/events.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';

import 'gmf/controllers/vars_desktop.scss';
import 'gmf/controllers/desktop.scss';

/**
 * Desktop application abstract controller.
 *
 * This file includes `import`'s for desktop components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
export class AbstractDesktopController extends AbstractAPIController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor($scope, $injector) {
    super($scope, $injector);

    /**
     * @type {boolean}
     */
    this.dataPanelActive = true;

    /**
     * @type {boolean}
     */
    this.loginActive = false;

    /**
     * @type {boolean}
     */
    this.toolsActive = false;

    /**
     * @type {boolean}
     */
    this.modalShareShown = false;

    /**
     * @type {boolean}
     */
    this.editFeatureActive = false;

    /**
     * @type {boolean}
     */
    this.queryPanelActive = false;

    /**
     * @type {boolean}
     */
    this.googleStreetViewActive = false;

    $scope.$watch(
      () => this.googleStreetViewActive,
      (newVal) => {
        this.setDataPanelMaxResizableWidth_();
      }
    );

    /**
     * @type {import("ol/style/Style.js").default}
     */
    this.googleStreetViewStyle = new olStyleStyle({
      text: new olStyleText({
        fill: new olStyleFill({color: '#279B61'}),
        font: '900 30px "Font Awesome 5 Free"',
        offsetY: -15,
        stroke: new olStyleStroke({color: '#ffffff', width: 3}),
        text: '\uf041',
      }),
    });

    /**
     * @type {boolean}
     */
    this.importDataSourceActive = false;

    const body = $('body');

    // initialize tooltips
    body.tooltip(
      /** @type {Bootstrap.TooltipOption} */ ({
        container: 'body',
        trigger: 'hover',
        selector: '[data-toggle="tooltip"]',

        // Avoid error in config type checking with IE11
        sanitizeFn: $injector.get('$sanitize'),
      })
    );

    // deactivate tooltips on touch device
    body.on('touchstart.detectTouch', () => {
      body.tooltip('dispose');
      body.off('touchstart.detectTouch');
    });

    const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');

    /**
     * @type {import("ol/layer/Vector.js").default}
     */
    this.editFeatureVectorLayer = new olLayerVector({
      source: new olSourceVector({
        wrapX: false,
        features: new olCollection(),
      }),
      style: (feature, resolution) => ngeoFeatureHelper.createEditingStyles(feature),
      // style: ngeoFeatureHelper.createEditingStyles.bind(ngeoFeatureHelper)
    });
    this.editFeatureVectorLayer.setMap(this.map);

    /**
     * The ngeo ToolActivate manager service.
     * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
     */
    const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

    /**
     * @type {import('gmf/datasource/DataSourceBeingFiltered.js').DataSourceBeingFiltered}
     */
    this.gmfDataSourceBeingFiltered = $injector.get('gmfDataSourceBeingFiltered');

    /**
     * The gmf layer being swipe.
     * @type {import('gmf/datasource/LayerBeingSwipe.js').LayerBeingSwipe}
     */
    this.gmfLayerBeingSwipe = $injector.get('gmfLayerBeingSwipe');

    const editFeatureActivate = new ngeoMiscToolActivate(this, 'editFeatureActive');
    ngeoToolActivateMgr.registerTool('mapTools', editFeatureActivate, false);

    const googleStreetViewActivate = new ngeoMiscToolActivate(this, 'googleStreetViewActive');
    ngeoToolActivateMgr.registerTool('mapTools', googleStreetViewActivate, false);

    /**
     * @type {import('ngeo/map/scaleselector.js').ScaleselectorOptions}
     */
    this.scaleSelectorOptions = {
      dropup: true,
    };

    /**
     * @type {?import("ol/geom/LineString.js").default}
     */
    this.profileLine = null;

    // Close the login panel on successful login, after the new themes
    // have finished loading.
    $scope.$watch(
      () => this.gmfUser.username,
      (newVal) => {
        if (newVal !== null && this.loginActive) {
          this.postLoading = true;
          this.gmfThemes.getThemesObject().finally(() => {
            this.postLoading = false;
            this.loginActive = false;
          });
        }
      }
    );

    /**
     * @type {number}
     * @private
     */
    this.dataPanelMinResizableWidth_ = 320;

    // Make the data panel (on the left) resizable...
    const dataPanelCls = 'gmf-app-data-panel';
    const $dataPanel = $(`.${dataPanelCls}`).resizable({
      'ghost': true,
      'handles': 'e',
      'minWidth': this.dataPanelMinResizableWidth_,
      'stop': (event, ui) => {
        this.map.updateSize();
      },
    });

    /**
     * @type {JQuery}
     * @private
     */
    this.$dataPanel_ = $dataPanel;

    // ... and collapsible when the handle is clicked.
    const $resizableEastHandle = $dataPanel.find('.ui-resizable-e').on('click', (evt) => {
      this.dataPanelActive = !this.dataPanelActive;
      this.$scope.$apply();
    });

    // Add an extra element to act as a button to be clicked on for
    // collapse/expand
    $('<div>', {
      'class': `${dataPanelCls}-toggle-btn btn prime btn-sm`,
    })
      .appendTo($resizableEastHandle)
      .append(
        $('<span>', {
          'class': `fa fa-angle-double-left ${dataPanelCls}-collapse-btn`,
        })
      )
      .append(
        $('<span>', {
          'class': `fa fa-angle-double-right ${dataPanelCls}-expand-btn`,
        })
      );

    // Listen to window resize to set the max resizable width
    // accordingly, and set it also right away.
    const ngeoDebounce = $injector.get('ngeoDebounce');
    listen(window, 'resize', ngeoDebounce(this.setDataPanelMaxResizableWidth_.bind(this), 50, true));
    this.setDataPanelMaxResizableWidth_();
  }

  /**
   * Set the data panel (on the left) maximum resizable width depending
   * on the current size of the window, taking into consideration the
   * width the right panel can have.
   *
   * If, after resizing, the size of the data panel would be too big,
   * resize it as well.
   * @private
   * @hidden
   */
  setDataPanelMaxResizableWidth_() {
    let rightPanelWidth = 320;
    if (this.googleStreetViewActive) {
      rightPanelWidth += 140;
    }

    const minimumMapWidth = 120;
    const windowWidth = window.innerWidth;

    let maxWidth = windowWidth - rightPanelWidth - minimumMapWidth;
    if (maxWidth < this.dataPanelMinResizableWidth_) {
      maxWidth = this.dataPanelMinResizableWidth_;
    }

    this.$dataPanel_.resizable('option', 'maxWidth', maxWidth);

    const width = this.$dataPanel_.width();
    if (!width) {
      throw new Error('Missing width');
    }
    if (width > maxWidth) {
      this.$dataPanel_.width(maxWidth);
      this.map.updateSize();
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('GmfAbstractDesktopControllerModule', [
  ngeoQueryPanelComponent.name,
  gmfControllersAbstractAPIController.name,
  gmfContextualdataModule.name,
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfEditingModule.name,
  gmfPermalinkShareComponent.name,
  gmfPrintModule.name,
  gmfProfileModule.name,
  gmfRasterComponent.name,
  ngeoDrawFeatures.name,
  gmfImportModule.name,
  ngeoMapswipeModule.name,
]);

module.controller('AbstractDesktopController', AbstractDesktopController);

module.value('ngeoMeasurePrecision', 3);
module.value('ngeoMeasureDecimals', 0);
module.value('ngeoMeasureSpherical', false);

module.value('ngeoSnappingTolerance', 20);
module.value('ngeoSnappingSource', new olSourceVector());

export default module;
