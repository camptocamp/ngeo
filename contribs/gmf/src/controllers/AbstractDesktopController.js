/**
 * @module gmf.controllers.AbstractDesktopController
 */
import angular from 'angular';
import gmfControllersAbstractAPIController from 'gmf/controllers/AbstractAPIController.js';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';
import gmfEditingModule from 'gmf/editing/module.js';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';
import gmfPrintComponent from 'gmf/print/component.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfRasterComponent from 'gmf/raster/component.js';
import ngeoDrawFeatures from 'ngeo/draw/features.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import gmfImportModule from 'gmf/import/module.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import * as olEvents from 'ol/events.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';

/**
 * Desktop application abstract controller.
 *
 * This file includes `goog.require`'s for desktop components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
 * @param {angular.IScope} $scope Scope.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @constructor
 * @extends {gmf.controllers.AbstractAppController}
 * @ngdoc controller
 * @ngInject
 * @export
 */
const exports = function(config, $scope, $injector) {

  gmfControllersAbstractAPIController.call(this, config, $scope, $injector);

  /**
   * @type {boolean}
   * @export
   */
  this.dataPanelActive = true;

  /**
   * @type {boolean}
   * @export
   */
  this.loginActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.modalShareShown = false;

  /**
   * @type {boolean}
   * @export
   */
  this.editFeatureActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.routingfeatureActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.googleStreetViewActive = false;

  $scope.$watch(() => this.googleStreetViewActive, (newVal) => {
    this.setDataPanelMaxResizableWidth_();
  });

  /**
   * @type {!import("ol/style/Style.js").default}
   * @export
   */
  this.googleStreetViewStyle = new olStyleStyle({
    text: new olStyleText({
      fill: new olStyleFill({color: '#279B61'}),
      font: 'normal 30px FontAwesome',
      offsetY: -15,
      stroke: new olStyleStroke({color: '#ffffff', width: 3}),
      text: '\uf041'
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.importDataSourceActive = false;

  const body = $('body');

  // initialize tooltips
  body.tooltip({
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="tooltip"]'
  });

  // deactivate tooltips on touch device
  body.on('touchstart.detectTouch', () => {
    body.tooltip('destroy');
    body.off('touchstart.detectTouch');
  });

  const ngeoFeatureHelper = $injector.get('ngeoFeatureHelper');

  /**
   * @type {import("ol/layer/Vector.js").default}
   * @export
   */
  this.editFeatureVectorLayer = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: new olCollection()
    }),
    style: (feature, resolution) => ngeoFeatureHelper.createEditingStyles(feature)
    // style: ngeoFeatureHelper.createEditingStyles.bind(ngeoFeatureHelper)
  });
  this.editFeatureVectorLayer.setMap(this.map);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.misc.ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  const editFeatureActivate = new ngeoMiscToolActivate(this, 'editFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', editFeatureActivate, false);

  const googleStreetViewActivate = new ngeoMiscToolActivate(
    this,
    'googleStreetViewActive'
  );
  ngeoToolActivateMgr.registerTool('mapTools', googleStreetViewActivate, false);

  /**
   * @type {ScaleselectorOptions}
   * @export
   */
  this.scaleSelectorOptions = {
    dropup: true
  };

  /**
   * @type {import("ol/geom/LineString.js").default}
   * @export
   */
  this.profileLine = null;

  // Close the login panel on successful login.
  $scope.$watch(() => this.gmfUser.username, (newVal) => {
    if (newVal !== null && this.loginActive) {
      this.loginActive = false;
    }
  });

  /**
   * @type {number}
   * @private
   */
  this.dataPanelMinResizableWidth_ = 320;

  // Make the data panel (on the left) resizable...
  const dataPanelCls = 'gmf-app-data-panel';
  const $dataPanel = $(`.${dataPanelCls}`)
    .resizable({
      'ghost': true,
      'handles': 'e',
      'minWidth': this.dataPanelMinResizableWidth_,
      'stop': (event, ui) => {
        this.map.updateSize();
      }
    });

  /**
   * @type {jQuery}
   * @private
   */
  this.$dataPanel_ = $dataPanel;

  // ... and collapsible when the handle is clicked.
  const $resizableEastHandle = $dataPanel
    .find('.ui-resizable-e')
    .on('click', (evt) => {
      this.dataPanelActive = !this.dataPanelActive;
      this.$scope.$apply();
    });

  // Add an extra element to act as a button to be clicked on for
  // collapse/expand
  $('<div>', {
    'class': `${dataPanelCls}-toggle-btn btn prime btn-sm`
  })
    .appendTo($resizableEastHandle)
    .append(
      $('<span>', {
        'class': `fa fa-angle-double-left ${dataPanelCls}-collapse-btn`
      })
    )
    .append(
      $('<span>', {
        'class': `fa fa-angle-double-right ${dataPanelCls}-expand-btn`
      })
    );

  // Listen to window resize to set the max resizable width
  // accordingly, and set it also right away.
  const ngeoDebounce = $injector.get('ngeoDebounce');
  olEvents.listen(
    window,
    'resize',
    ngeoDebounce(this.setDataPanelMaxResizableWidth_.bind(this), 50, true)
  );
  this.setDataPanelMaxResizableWidth_();
};

olUtilInherits(exports, gmfControllersAbstractAPIController);

/**
 * Set the data panel (on the left) maximum resizable width depending
 * on the current size of the window, taking into consideration the
 * width the right panel can have.
 *
 * If, after resizing, the size of the data panel would be too big,
 * resize it as well.
 * @private
 */
exports.prototype.setDataPanelMaxResizableWidth_ = function() {

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

  if (this.$dataPanel_.width() > maxWidth) {
    this.$dataPanel_.width(maxWidth);
    this.map.updateSize();
  }
};

exports.module = angular.module('GmfAbstractDesktopControllerModule', [
  gmfControllersAbstractAPIController.module.name,
  gmfContextualdataModule.name,
  gmfEditingModule.name,
  gmfPermalinkShareComponent.name,
  gmfPrintComponent.name,
  gmfProfileModule.name,
  gmfRasterComponent.name,
  ngeoDrawFeatures.name,
  gmfImportModule.name,
]);

exports.module.controller(
  'AbstractDesktopController',
  exports);

exports.module.value('ngeoMeasurePrecision', 3);
exports.module.value('ngeoMeasureDecimals', 0);


export default exports;
