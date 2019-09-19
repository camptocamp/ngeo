import angular from 'angular';
import {numberSafeCompareFunction} from 'ol/array.js';
import olMap from 'ol/Map.js';
import {listen, unlistenByKey} from 'ol/events.js';
import 'bootstrap/js/src/dropdown.js';


/**
 * Options to configure the scale selector.
 *
 * @typedef {Object} ScaleselectorOptions
 * @property {boolean} [dropup] True to get a drop menu that opens imself to the top, instead of the bottom.
 */


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoScaleselector', []);


module.value('ngeoScaleselectorTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs.ngeoScaleselectorTemplateurl;
    return templateUrl !== undefined ? templateUrl :
      'ngeo/map/scaleselector';
  });


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/map/scaleselector', require('./scaleselector.html'));
  });


/**
 * Provides the "ngeoScaleselector" directive, a widget for
 * selecting map scales.
 *
 * Example:
 *
 *     <div ngeo-scaleselector="ctrl.scales" ngeo-scaleselector-map="ctrl.map">
 *     </div>
 *
 * The expression passed to the ngeo-scaleselector attribute should return an
 * array of this form:
 *
 *    [20000, 10000, 5000, 2500]
 *
 * That directive's partial uses Bootstrap's `dropdown` and `dropdown-menu`
 * classes, and `data-toggle="dropdown"`, so it is meant to be used with
 * Bootstrap's "dropdown" jQuery plugin.
 *
 * You can pass options to configure the behaviors of this element. Options is
 * a {@link ScaleselectorOptions} object.
 *
 * Example:
 *
 *     <div ngeo-scaleselector="ctrl.scales"
 *       ngeo-scaleselector-map="ctrl.map"
 *       ngeo-scaleselector-options="ctrl.scaleSelectorOptions">
 *     </div>
 *
 * By default the directive uses "scaleselector.html" as its templateUrl. This
 * can be changed by redefining the "ngeoScaleselectorTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. That scope
 * includes a reference to the directive's controller: the "scaleselectorCtrl"
 * scope property.
 *
 * The directive doesn't create any watcher. In particular the object including
 * the scales information is now watched.
 *
 * See our live example: [../examples/scaleselector.html](../examples/scaleselector.html)
 *
 * @htmlAttribute {number[]} ngeo-scaleselector The available scales.
 * @htmlAttribute {import("ol/Map.js").default} ngeo-scaleselector-map The map.
 * @htmlAttribute {ScaleselectorOptions} ngeo-scaleselector-options
 *    Optional. The configuration options.
 * @param {string|function(JQuery=, angular.IAttributes=): string} ngeoScaleselectorTemplateUrl Template URL
 *    for the directive.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoScaleselector
 */
const mapScaleselectorComponent = function(ngeoScaleselectorTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoScaleselectorController',
    templateUrl: ngeoScaleselectorTemplateUrl
  };
};


module.directive('ngeoScaleselector', mapScaleselectorComponent);


/**
 * @private
 * @hidden
 */
class ScaleselectorController {
  /**
   * @param {angular.IScope} $scope Directive scope.
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @ngInject
   */
  constructor($scope, $element, $attrs) {

    const scalesExpr = $attrs.ngeoScaleselector;

    /**
     * The zoom level/scale map object.
     * @type {number[]}
     */
    this.scales = /** @type {number[]} */
      ($scope.$eval(scalesExpr));
    console.assert(this.scales !== undefined);

    /**
     * @type {number[]}
     */
    this.zoomLevels = [];

    $scope.$watch(() => Object.keys(this.scales).length,
      /**
       * @param {number} newLength
       */
      (newLength) => {
        this.zoomLevels = Object.keys(this.scales).map(Number);
        this.zoomLevels.sort(numberSafeCompareFunction);
      }
    );

    const mapExpr = $attrs.ngeoScaleselectorMap;

    /**
     * @type {import("ol/Map.js").default}
     * @private
     */
    this.map_ = /** @type {import("ol/Map.js").default} */ ($scope.$eval(mapExpr));
    console.assert(this.map_ instanceof olMap);

    const optionsExpr = $attrs.ngeoScaleselectorOptions;
    const options = $scope.$eval(optionsExpr);

    /**
     * @type {ScaleselectorOptions}
     */
    this.options = getOptions_(options);

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.resolutionChangeKey_ = null;

    /**
     * @type {number|undefined}
     */
    this.currentScale = undefined;

    const view = this.map_.getView();
    if (view !== null) {
      const currentZoom = this.map_.getView().getZoom();
      if (currentZoom !== undefined) {
        this.currentScale = this.getScale(currentZoom);
      }
    }

    listen(this.map_, 'change:view', this.handleViewChange_, this);

    this.registerResolutionChangeListener_();

    // @ts-ignore
    $scope.scaleselectorCtrl = this;
  }


  /**
   * @param {number} zoom Zoom level.
   * @return {number} Scale.
   */
  getScale(zoom) {
    return this.scales[zoom];
  }

  /**
   * @param {number} zoom Zoom level.
   */
  changeZoom(zoom) {
    this.map_.getView().setZoom(zoom);
  }

  /**
   * @param {?Event|import("ol/events/Event.js").default} e OpenLayers object event.
   * @private
   */
  handleResolutionChange_(e) {
    const view = this.map_.getView();
    const currentScale = this.scales[/** @type {number} */ (view.getZoom())];

    // handleResolutionChange_ is a change:resolution listener. The listener
    // may be executed outside the Angular context, for example when the user
    // double-clicks to zoom on the map.
    //
    // But it may also be executed inside the Angular context, when a function
    // in Angular context calls setZoom or setResolution on the view, which
    // is for example what happens when this controller's changeZoom function
    // is called.
    //
    // For that reason we use $applyAsync instead of $apply here.

    if (currentScale !== undefined) {
      this.$scope_.$applyAsync(() => {
        this.currentScale = currentScale;
      });
    }
  }

  /**
   * @param {Event|import("ol/events/Event.js").default} e OpenLayers object event.
   * @private
   */
  handleViewChange_(e) {
    this.registerResolutionChangeListener_();
    this.handleResolutionChange_(null);
  }

  /**
   * @private
   */
  registerResolutionChangeListener_() {
    if (this.resolutionChangeKey_ !== null) {
      unlistenByKey(this.resolutionChangeKey_);
    }
    const view = this.map_.getView();
    this.resolutionChangeKey_ = listen(view, 'change:resolution', this.handleResolutionChange_, this);
  }
}


/**
 * @param {?} options Options after expression evaluation.
 * @return {ScaleselectorOptions} Options object.
 * @private
 */
function getOptions_(options) {
  let dropup = false;
  if (options !== undefined) {
    dropup = options.dropup == true;
  }
  return /** @type {ScaleselectorOptions} */ ({
    dropup: dropup
  });
}


module.controller('NgeoScaleselectorController', ScaleselectorController);


export default module;
