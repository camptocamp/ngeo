import angular from 'angular';
import gmfControllersAbstractAppController, {
  AbstractAppController,
  getLocationIcon,
} from 'gmf/controllers/AbstractAppController.js';
import gmfMobileMeasureModule from 'gmf/mobile/measure/module.js';
import gmfMobileNavigationModule from 'gmf/mobile/navigation/module.js';
import gmfQueryWindowComponent from 'gmf/query/windowComponent.js';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';
import * as olProj from 'ol/proj.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olControlZoom from 'ol/control/Zoom.js';
import olControlRotate from 'ol/control/Rotate.js';
import * as olInteraction from 'ol/interaction.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * Mobile application abstract controller.
 *
 * This file includes `import`'s mobile components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
export class AbstractMobileController extends AbstractAppController {
  /**
   * @param {import('gmf/controllers/AbstractAppController.js').Config} config A part of the application
   *     config.
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor(config, $scope, $injector) {
    const viewConfig = {
      projection: olProj.get(`EPSG:${config.srid || 21781}`),
    };
    Object.assign(viewConfig, config.mapViewConfig || {});

    super(
      config,
      new olMap({
        pixelRatio: config.mapPixelRatio,
        layers: [],
        view: new olView(viewConfig),
        controls: config.mapControls || [
          new olControlScaleLine(),
          new olControlZoom({
            zoomInTipLabel: '',
            zoomOutTipLabel: '',
          }),
          new olControlRotate({
            label: getLocationIcon(),
            tipLabel: '',
          }),
        ],
        interactions: config.mapInteractions || olInteraction.defaults({pinchRotate: true}),
      }),
      $scope,
      $injector
    );

    /**
     * @type {import("ol/style/Style.js").default}
     */
    this.customMeasureStyle = new olStyleStyle({
      fill: new olStyleFill({
        color: 'rgba(255, 128, 128, 0.2)',
      }),
      stroke: new olStyleStroke({
        color: 'rgba(255, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
      }),
      image: new olStyleRegularShape({
        stroke: new olStyleStroke({
          color: 'rgba(255, 0, 0, 0.7)',
          width: 2,
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0,
      }),
    });

    /**
     * @type {boolean}
     */
    this.leftNavVisible = false;

    /**
     * @type {boolean}
     */
    this.rightNavVisible = false;

    /**
     * @type {boolean}
     */
    this.searchOverlayVisible = false;

    /**
     * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners}
     */
    this.searchListeners = /** @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners} */ ({
      open: function () {
        this.searchOverlayVisible = true;
      }.bind(this),
      close: function () {
        this.searchOverlayVisible = false;
      }.bind(this),
    });

    const positionFeatureStyle =
      config.positionFeatureStyle ||
      new olStyleStyle({
        image: new olStyleCircle({
          radius: 6,
          fill: new olStyleFill({color: 'rgba(230, 100, 100, 1)'}),
          stroke: new olStyleStroke({color: 'rgba(230, 40, 40, 1)', width: 2}),
        }),
      });

    const accuracyFeatureStyle =
      config.accuracyFeatureStyle ||
      new olStyleStyle({
        fill: new olStyleFill({color: 'rgba(100, 100, 230, 0.3)'}),
        stroke: new olStyleStroke({color: 'rgba(40, 40, 230, 1)', width: 2}),
      });

    /**
     * @type {import('ngeo/geolocation/mobile.js').MobileGeolocationDirectiveOptions}
     */
    this.mobileGeolocationOptions = {
      positionFeatureStyle: positionFeatureStyle,
      accuracyFeatureStyle: accuracyFeatureStyle,
      zoom: config.geolocationZoom,
      autorotate: config.autorotate,
    };

    this.manageResize = true;
    this.resizeTransition = 500;

    // Close right nave on successful login.
    $scope.$watch(
      () => this.gmfUser.username,
      (newVal) => {
        if (newVal !== null && this.navIsVisible()) {
          this.rightNavVisible = false;
        }
      }
    );

    /**
     * @const {string}
     */
    this.redirectUrl = $injector.get('redirectUrl');
  }

  /**
   */
  toggleLeftNavVisibility() {
    this.leftNavVisible = !this.leftNavVisible;
  }

  /**
   */
  toggleRightNavVisibility() {
    this.rightNavVisible = !this.rightNavVisible;
  }

  /**
   * Hide both navigation menus.
   */
  hideNav() {
    this.leftNavVisible = this.rightNavVisible = false;
  }

  /**
   * @return {boolean} Return true if one of the navigation menus is visible,
   * otherwise false.
   */
  navIsVisible() {
    return this.leftNavVisible || this.rightNavVisible;
  }

  /**
   * Open the menu with corresponding to the data-target attribute value.
   * @param {string} target the data-target value.
   */
  openNavMenu(target) {
    const navElements = document.getElementsByClassName('gmf-mobile-nav-button');
    for (let i = 0; i < navElements.length; i++) {
      const element = /** @type HTMLElement */ (navElements[i]);
      if (element.dataset && element.dataset.target === target) {
        element.click();
      }
    }
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('GmfAbstractMobileControllerModule', [
  gmfControllersAbstractAppController.name,
  gmfMobileMeasureModule.name,
  gmfMobileNavigationModule.name,
  gmfQueryWindowComponent.name,
  ngeoGeolocationMobile.name,
]);

module.controller('AbstractMobileController', AbstractMobileController);

module.value('isMobile', true);

module.value('ngeoQueryOptions', {
  'tolerance': 10,
});

export default module;
