// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
} from 'gmf/controllers/AbstractAPIController';
import gmfContextualdataModule from 'gmf/contextualdata/module';
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered';
import gmfDrawingModule from 'gmf/drawing/module';
import ngeoEditingModule from 'ngeo/editing/module';
import gmfFiltersModule from 'gmf/filters/module';
import gmfHeaderModule from 'gmf/header/module';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent';
import ngeoPrintModule from 'ngeo/print/module';
import ngeoProfileModule from 'ngeo/profile/module';
import gmfRasterComponent from 'gmf/raster/component';
import ngeoMapswipeModule from 'ngeo/map/swipe';
import ngeoDrawFeatures from 'ngeo/draw/features';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoQueryPanelComponent from 'ngeo/query/panelComponent';
import gmfImportModule from 'gmf/import/module';
import gmfFileDropZoneModule from 'gmf/dropfile/module';
import 'ngeo/canvas/DesktopElement';
import 'ngeo/canvas/ToolButtonsImplElements';
import olCollection from 'ol/Collection';
import {listen} from 'ol/events';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';

import 'gmfapi/index';
import panels from 'gmfapi/store/panels';
import user, {LoginMessageState} from 'gmfapi/store/user';

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
    this.queryGrid = false;

    /**
     * To toggle the activation query grid in the HTML, shouldn't be touch (it's managed by angular).
     *
     * @type {boolean}
     */
    this.queryGridActive = false;

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

    /**
     * @type {boolean}
     */
    this.mapillaryStreetViewActive = false;

    /**
     * @type {boolean}
     * @export
     */
    this.filterSelectorActive = false;

    /**
     * Set the clearing of the ngeoQuery after the deactivation of the query
     *
     * @type {boolean}
     */
    this.queryAutoClear = true;

    /**
     * @type {boolean}
     */
    this.contextdataActive;

    /**
     * @type {boolean}
     */
    this.printPanelActive = false;

    /**
     * @type {boolean}
     */
    this.printActive = false;

    /**
     * @type {boolean}
     */
    this.drawFeatureActive = false;

    /**
     * @type {boolean}
     */
    this.drawProfilePanelActive = false;

    /**
     * @type {boolean}
     */
    this.routingPanelActive = false;

    const $timeout = $injector.get('$timeout');

    panels.getActiveToolPanel().subscribe({
      next: (panel) => {
        this.printPanelActive = panel === 'print';
        this.drawFeatureActive = panel === 'draw';
        this.drawProfilePanelActive = panel === 'profile';
        this.routingPanelActive = panel === 'routing';
        this.editFeatureActivate = panel === 'edit';
        this.googleStreetViewActive = panel === 'googlestreetview';
        this.mapillaryStreetViewActive = panel === 'mapillary';

        $timeout(() => {}); // this triggered on DOM click, we call $timeout to force Angular diggest

        if (panel === null || !panel.includes('auth')) {
          user.setLoginMessage(LoginMessageState.EMPTY);
        }
      },
    });

    user.getLoginMessage().subscribe({
      next: (message) => {
        this.loginInfoMessage = message;
        if (message) {
          // Open the auth panel if a message is displayed
          panels.openToolPanel('auth');
        }
      },
    });

    // Don't deactivate ngeoQuery on print activation
    $scope.$watch(
      () => this.printPanelActive,
      (newVal) => {
        // Clear queries if another panel is open but not if user go back to the
        // map form the print.
        if (!newVal && !this.queryActive) {
          this.ngeoMapQuerent_.clear();
        }
        this.queryAutoClear = !newVal;
        this.printActive = newVal;
      }
    );

    $scope.$watch(
      () => this.googleStreetViewActive || this.mapillaryStreetViewActive,
      (newVal) => {
        this.setDataPanelMaxResizableWidth_();
        if (newVal) {
          this.toolsPanelWidth = this.checkPanelWidth_(this.toolsPanelWidth, this.$toolsPanel_);
          const maxAvailable = this.$toolsPanel_.resizable('option', 'maxWidth');
          if (maxAvailable < this.streetViewWidth_) {
            this.$toolsPanel_.width(this.toolsPanelWidth);
          }
        }
      }
    );

    /**
     * @type {import('ol/style/Style').default}
     */
    this.streetViewStyle = new olStyleStyle({
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

    if ($injector.has('gmfQueryGrid')) {
      this.queryGrid = $injector.get('gmfQueryGrid');
    }

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
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
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
     *
     * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
     */
    this.ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

    /**
     * @type {import('gmf/datasource/DataSourceBeingFiltered').DataSourceBeingFiltered}
     */
    this.gmfDataSourceBeingFiltered = $injector.get('gmfDataSourceBeingFiltered');

    /**
     * The gmf layer being swipe.
     *
     * @type {import('gmf/datasource/LayerBeingSwipe').LayerBeingSwipe}
     */
    this.gmfLayerBeingSwipe = $injector.get('gmfLayerBeingSwipe');

    const editFeatureActivate = new ngeoMiscToolActivate(this, 'editFeatureActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', editFeatureActivate, false);

    const googleStreetViewActivate = new ngeoMiscToolActivate(this, 'googleStreetViewActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', googleStreetViewActivate, false);

    const mapillaryStreetViewActivate = new ngeoMiscToolActivate(this, 'mapillaryStreetViewActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', mapillaryStreetViewActivate, false);

    const contextdataActivate = new ngeoMiscToolActivate(this, 'contextdataActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', contextdataActivate, false);

    const drawFeatureActivate = new ngeoMiscToolActivate(this, 'drawFeatureActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', drawFeatureActivate, false);

    const drawProfilePanelActivate = new ngeoMiscToolActivate(this, 'drawProfilePanelActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', drawProfilePanelActivate, false);

    const printPanelActivate = new ngeoMiscToolActivate(this, 'printPanelActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', printPanelActivate, false);

    const routingPanelActive = new ngeoMiscToolActivate(this, 'routingPanelActive');
    this.ngeoToolActivateMgr.registerTool('mapTools', routingPanelActive, false);

    /**
     * @type {?import('ol/geom/LineString').default}
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

    /**
     * @type {number}
     * @private
     */
    this.toolsPanelMinResizableWidth_ = 280;

    /**
     * @type {number}
     * @private
     */
    this.toolsPanelWidth = 280;

    /**
     * @type {number}
     * @private
     */
    this.dataPanelWidth_ = 320;

    /**
     * @type {number}
     * @private
     */
    this.appBarWidth_ = 32;

    /**
     * @type {number}
     * @private
     */
    this.minimumMapWidth_ = 120;

    /**
     * @type {number}
     * @private
     */
    this.streetViewWidth_ = 400;

    // Make the data panel (on the left) resizable...
    const dataPanelCls = 'gmf-app-data-panel';
    const $dataPanel = $(`.${dataPanelCls}`).resizable({
      ghost: true,
      handles: 'e',
      minWidth: this.dataPanelMinResizableWidth_,
      stop: (event, ui) => {
        this.map.updateSize();
        this.dataPanelWidth_ = ui.size.width;
        this.setToolsPanelMaxResizableWidth_(ui.size.width);
      },
    });

    /**
     * @type {JQuery}
     * @private
     */
    this.$dataPanel_ = $dataPanel;

    // ... and collapsible when the handle is clicked.
    const $resizableEastHandle = $dataPanel.find('.ui-resizable-e').on('click touchstart', (evt) => {
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

    $scope.$watch(
      () => this.dataPanelActive,
      (newVal) => {
        if (!newVal) {
          this.setToolsPanelMaxResizableWidth_(this.dataPanelMinResizableWidth_);
        } else {
          this.dataPanelWidth_ = this.checkPanelWidth_(this.dataPanelWidth_, this.$dataPanel_);
          this.setToolsPanelMaxResizableWidth_(this.dataPanelWidth_);
        }
      }
    );

    // Make the tools panel (on the right) resizable.
    const toolsPanelCls = 'gmf-app-tools-content';
    const $toolsPanel = $(`.${toolsPanelCls}`).resizable({
      ghost: true,
      handles: 'w',
      minWidth: this.toolsPanelMinResizableWidth_,
      stop: (event, ui) => {
        this.map.updateSize();
        this.toolsPanelWidth = ui.size.width;
        this.setDataPanelMaxResizableWidth_(ui.size.width);
      },
      disabled: true,
    });

    /**
     * @type {JQuery}
     * @private
     */
    this.$toolsPanel_ = $toolsPanel;

    /**
     * @param {boolean} active
     */
    const showRightPanelResize = (active) => {
      this.$toolsPanel_.resizable(active ? 'enable' : 'disable');
    };

    $scope.$watch(
      () => this.toolsActive,
      (newVal) => {
        showRightPanelResize(newVal);
        if (!newVal) {
          this.setDataPanelMaxResizableWidth_(this.toolsPanelMinResizableWidth_);
        } else {
          this.toolsPanelWidth = this.checkPanelWidth_(this.toolsPanelWidth, this.$toolsPanel_);
          const maxWidth = this.$toolsPanel_.resizable('option', 'maxWidth');
          if (
            (this.googleStreetViewActive || this.mapillaryStreetViewActive) &&
            (!maxWidth || this.streetViewWidth_ < maxWidth)
          ) {
            this.setDataPanelMaxResizableWidth_(this.streetViewWidth_);
          } else {
            this.setDataPanelMaxResizableWidth_(this.toolsPanelWidth);
          }
        }
      }
    );

    // Make the tools panel (on the right) resizable and collapsible when the handle is clicked.
    const $resizableToolsHandle = $toolsPanel.find('.ui-resizable-w').on('click', (evt) => {
      this.toolsActive = false;
      this.loginActive = false;
      this.printActive = false;
      this.drawFeatureActive = false;
      this.filterSelectorActive = false;
      this.editFeatureActive = false;
      this.drawProfilePanelActive = false;
      this.googleStreetViewActive = false;
      this.mapillaryStreetViewActive = false;
      this.queryPanelActive = false;
      this.importDataSourceActive = false;
      this.$toolsPanel_.resizable('disable');
      this.$scope.$apply();
    });

    // Add an extra element to act as a button to be clicked on for
    // collapse/expand
    $('<div>', {
      'class': `${toolsPanelCls}-toggle-btn btn prime btn-sm`,
    })
      .appendTo($resizableToolsHandle)
      .append(
        $('<span>', {
          'class': `fa fa-angle-double-right ${toolsPanelCls}-collapse-btn`,
        })
      );

    // Listen to window resize to set the max resizable width
    // accordingly, and set it also right away.
    const ngeoDebounce = $injector.get('ngeoDebounce');
    listen(window, 'resize', ngeoDebounce(this.setDataPanelMaxResizableWidth_.bind(this), 50, true));
    listen(window, 'resize', ngeoDebounce(this.setToolsPanelMaxResizableWidth_.bind(this), 50, true));
    this.setDataPanelMaxResizableWidth_();
    this.setToolsPanelMaxResizableWidth_();
  }

  /**
   * Set the data panel (on the left) maximum resizable width depending
   * on the current size of the window, taking into consideration the
   * width the right panel can have.
   *
   * If, after resizing, the size of the data panel would be too big,
   * resize it as well.
   *
   * @param {number} [opt_newToolsPanelWidth]
   * @private
   * @hidden
   */
  setDataPanelMaxResizableWidth_(opt_newToolsPanelWidth) {
    const maxWidth = this.findMaxWidth_(
      this.$toolsPanel_,
      this.dataPanelMinResizableWidth_,
      opt_newToolsPanelWidth
    );
    this.$dataPanel_.resizable('option', 'maxWidth', maxWidth);
    this.dataPanelWidth_ = this.checkPanelWidth_(this.dataPanelWidth_, this.$dataPanel_);
  }

  /**
   * Set the tools panel (on the right) maximum resizable width depending
   * on the current size of the window, taking into consideration the
   * width the left panel has.
   *
   * If, after resizing, the size of the data panel would be too big,
   * resize it as well.
   *
   * @param {number} [opt_newDataPanelWidth]
   * @private
   * @hidden
   */
  setToolsPanelMaxResizableWidth_(opt_newDataPanelWidth) {
    const maxWidth = this.findMaxWidth_(
      this.$dataPanel_,
      this.toolsPanelMinResizableWidth_,
      opt_newDataPanelWidth
    );
    this.$toolsPanel_.resizable('option', 'maxWidth', maxWidth);
    this.toolsPanelWidth = this.checkPanelWidth_(this.toolsPanelWidth, this.$toolsPanel_);
  }

  /**
   * Check if the panel size is not exceeding its maximum allowed and
   * resize it to present maxSize if necessary
   *
   * @param {number} panelSize
   * @param {JQuery} panelToResize
   * @returns {number}
   * @private
   * @hidden
   */
  checkPanelWidth_(panelSize, panelToResize) {
    const maxWidth = panelToResize.resizable('option', 'maxWidth');
    if (panelSize !== 0 && !panelSize) {
      throw new Error('Missing width');
    }
    if (panelSize > maxWidth) {
      panelToResize.width(maxWidth);
      panelSize = maxWidth;
      this.map.updateSize();
    }
    return panelSize;
  }

  /**
   * Get the new maximum size for the other panel
   *
   * @param {JQuery} resizedPanel
   * @param {number} otherPanelMinResizableWidth
   * @param {number} newPanelWidth
   * @returns {number}
   * @private
   * @hidden
   */
  findMaxWidth_(resizedPanel, otherPanelMinResizableWidth, newPanelWidth) {
    const windowWidth = window.innerWidth;
    // resizedPanel.width() often has not the new value yet after resizing,
    // so take the newPanelWidth taken from the event, if existing
    const panelWidth = newPanelWidth ? newPanelWidth : resizedPanel.width();
    let maxWidth = windowWidth - panelWidth - this.minimumMapWidth_ - this.appBarWidth_;
    if (maxWidth < otherPanelMinResizableWidth) {
      maxWidth = otherPanelMinResizableWidth;
    }
    return maxWidth;
  }
}
/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('GmfAbstractDesktopControllerModule', [
  gmfControllersAbstractAPIController.name,
  gmfContextualdataModule.name,
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDrawingModule.name,
  ngeoEditingModule.name,
  gmfFiltersModule.name,
  gmfHeaderModule.name,
  gmfImportModule.name,
  gmfPermalinkShareComponent.name,
  ngeoPrintModule.name,
  ngeoProfileModule.name,
  gmfRasterComponent.name,
  gmfFileDropZoneModule.name,
  ngeoDrawFeatures.name,
  ngeoMapswipeModule.name,
  ngeoQueryPanelComponent.name,
]);

myModule.controller('AbstractDesktopController', AbstractDesktopController);

myModule.value('ngeoSnappingSource', new olSourceVector());

export default myModule;
