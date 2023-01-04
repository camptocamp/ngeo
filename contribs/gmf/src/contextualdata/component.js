import angular from 'angular';
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import olOverlay from 'ol/Overlay.js';
import * as olProj from 'ol/proj.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfContextualdata', [gmfRasterRasterService.name]);

/**
 * Provide a directive responsible of displaying contextual data after a right
 * click on the map.
 *
 * This directive doesn't require being rendered in a visible DOM element.
 * It's usually added to the element where the map directive is also added.
 *
 * Example:
 *
 *     <gmf-map gmf-map-map="mainCtrl.map"
 *         gmf-contextualdata
 *         gmf-contextualdata-map="::mainCtrl.map"
 *         gmf-contextualdata-projections="::[21781,4326]">
 *
 * The content of the popover is managed in a partial that must be defined
 * using the `gmfContextualdatacontentTemplateUrl` value. See
 * {@link import("gmf/contextualdatacontentDirective.js").default} for more details.
 *
 * One can also provide a `gmf-contextualdata-callback` attribute in order to
 * do some additional computing on the coordinate or the values received for
 * the raster service. The callback function is called with the coordinate of
 * the clicked point and the response data from the server. It is intended to
 * return an object of additional properties to add to the scope.
 *
 * See the [../examples/contribs/gmf/contextualdata.html](../examples/contribs/gmf/contextualdata.html)
 * example for a usage sample.
 *
 * @htmlAttribute {import("ol/Map.js").default} map The map.
 * @htmlAttribute {Array<number>} projections The list of projections.
 * @htmlAttribute {Function} callback A function called after server
 *    (raster) data is received in case some additional computing is required.
 *    Optional.
 * @return {angular.IDirective} The directive specs.
 * @ngdoc directive
 * @ngname gmfContextualdata
 */
function contextualDataComponent() {
  return {
    restrict: 'A',
    scope: false,
    controller: 'GmfContextualdataController as cdCtrl',
    bindToController: {
      'map': '<gmfContextualdataMap',
      'projections': '<gmfContextualdataProjections',
      'callback': '<gmfContextualdataCallback',
    },
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {ContextualdataController} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      controller.init();
    },
  };
}

module.directive('gmfContextualdata', contextualDataComponent);

/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angular.IScope} $scope Scope.
 * @param {import("gmf/raster/RasterService.js").RasterService} gmfRaster Gmf Raster service
 * @param {angular.auto.IInjectorService} $injector Angular injector service.
 *
 * @constructor
 * @hidden
 * @ngdoc controller
 * @ngInject
 */
export function ContextualdataController($compile, $timeout, $scope, gmfRaster, $injector) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {Array<number>}
   */
  this.projections;

  /**
   * @type {function(import("ol/coordinate.js").Coordinate, Object):Object}
   */
  this.callback;

  /**
   * @type {import("ol/Overlay.js").default}
   * @private
   */
  this.overlay_;

  /**
   * @type {angular.ICompileService}
   * @private
   */
  this.$compile_ = $compile;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {import("gmf/raster/RasterService.js").RasterService}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {Object}
   * @private
   */
  this.gmfContextualdataOptions_ = $injector.has('gmfContextualdataOptions')
    ? $injector.get('gmfContextualdataOptions')
    : {};

  document.body.addEventListener('mousedown', this.hidePopover.bind(this));
}

/**
 *
 */
ContextualdataController.prototype.init = function () {
  this.preparePopover_();

  const mapDiv = this.map.getTargetElement();
  console.assert(mapDiv);
  mapDiv.addEventListener('contextmenu', this.handleMapContextMenu_.bind(this));

  this.map.on('pointerdown', this.hidePopover.bind(this));
};

/**
 * @param {!Event} event Event.
 * @private
 */
ContextualdataController.prototype.handleMapContextMenu_ = function (event) {
  this.$scope_.$apply(() => {
    const pixel = this.map.getEventPixel(event);
    const coordinate = this.map.getCoordinateFromPixel(pixel);
    this.setContent_(coordinate);
    event.preventDefault();
    this.hidePopover();
    this.showPopover();

    // Use timeout to let the popover content to be rendered before displaying it.
    this.timeout_(() => {
      this.overlay_.setPosition(coordinate);
    });
  });
};

ContextualdataController.prototype.setContent_ = function (coordinate) {
  const scope = this.$scope_.$new(true);
  this.$compile_(this.content_)(scope);

  const mapProjection = this.map.getView().getProjection().getCode();
  this.projections.forEach((proj) => {
    const coord = olProj.transform(coordinate, mapProjection, `EPSG:${proj}`);
    scope[`coord_${proj}`] = coord;
    scope[`coord_${proj}_eastern`] = coord[0];
    scope[`coord_${proj}_northern`] = coord[1];
  });

  const getRasterSuccess = (resp) => {
    Object.assign(scope, resp);
    if (this.callback) {
      Object.assign(scope, this.callback.call(this, coordinate, resp));
    }
  };
  const getRasterError = () => {
    console.error('Error on getting the raster.');
  };
  this.gmfRaster_
    .getRaster(coordinate, this.gmfContextualdataOptions_.rasterParams)
    .then(getRasterSuccess, getRasterError);
};

/**
 * @private
 */
ContextualdataController.prototype.preparePopover_ = function () {
  const container = document.createElement('DIV');
  container.classList.add('popover');
  container.classList.add('bs-popover-bottom');
  container.classList.add('gmf-contextualdata');
  container.style.position = 'relative';
  const arrow = document.createElement('DIV');
  arrow.classList.add('arrow');
  container.appendChild(arrow);
  this.content_ = document.createElement('DIV');
  this.content_.setAttribute('gmf-contextualdatacontent', '');
  this.content_.classList.add('popover-body');
  container.appendChild(this.content_);

  this.overlay_ = new olOverlay({
    element: container,
    stopEvent: true,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
    positioning: 'top-center',
  });
  this.map.addOverlay(this.overlay_);
};

ContextualdataController.prototype.showPopover = function () {
  this.overlay_.getElement().style.display = 'block';
};

ContextualdataController.prototype.hidePopover = function () {
  this.overlay_.getElement().style.display = 'none';
};

module.controller('GmfContextualdataController', ContextualdataController);

/**
 * Provide a directive responsible of formatting the content of the popover for
 * the contextual data directive.
 *
 * Its main purpose is to configure the template to be used.
 * Integrators should ensure that the template values match the configuration
 * of the contextual data directive.
 *
 * For each projection the following expressions can be used (replace xxxx by
 * the relevant projection code:
 *  - {{coord_xxxx}},
 *  - {{coord_xxxx_eastern}},
 *  - {{coord_xxxx_northern}}
 *
 * Tip: one should use the `ngeoNumberCoordinates` and `ngeoDMSCoordinates`.
 *
 * The raster service is requested to query additional information. The
 * integrators can also use `{{xxxx}}` where `xxxx` will be replaced by
 * the name of the raster layers (for example 'srtm').
 *
 * See the [../examples/contribs/gmf/contextualdata.html](../examples/contribs/gmf/contextualdata.html)
 * example for a usage sample.
 *
 * @param {string} gmfContextualdatacontentTemplateUrl Url to template.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfContextualdatacontent
 */
function contextualDataComponentContent(gmfContextualdatacontentTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: gmfContextualdatacontentTemplateUrl,
  };
}

module.directive('gmfContextualdatacontent', contextualDataComponentContent);

export default module;
