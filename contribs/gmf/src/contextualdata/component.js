/**
 * @module gmf.contextualdata.component
 */
import gmfRasterRasterService from 'gmf/raster/RasterService.js';
import googAsserts from 'goog/asserts.js';
import olOverlay from 'ol/Overlay.js';
import * as olProj from 'ol/proj.js';
import * as olEvents from 'ol/events.js';
import * as olObj from 'ol/obj.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('gmfContextualdata', [
  gmfRasterRasterService.module.name,
]);


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
 * {@link gmf.contextualdatacontentDirective} for more details.
 *
 * One can also provide a `gmf-contextualdata-callback` attribute in order to
 * do some additional computing on the coordinate or the values received for
 * the raster service. The callback function is called with the coordinate of
 * the clicked point and the response data from the server. It is intended to
 * return an object of additional properties to add to the scope.
 *
 * See the [../examples/contribs/gmf/contextualdata.html](../examples/contribs/gmf/contextualdata.html) example for a usage sample.
 *
 * @htmlAttribute {ol.Map} map The map.
 * @htmlAttribute {Array<number>} projections The list of projections.
 * @htmlAttribute {Function} callback A function called after server
 *    (raster) data is received in case some additional computing is required.
 *    Optional.
 * @return {angular.Directive} The directive specs.
 * @ngdoc directive
 * @ngname gmfContextualdata
 */
exports.directive_ = function() {
  return {
    restrict: 'A',
    scope: false,
    controller: 'GmfContextualdataController as cdCtrl',
    bindToController: {
      'map': '<gmfContextualdataMap',
      'projections': '<gmfContextualdataProjections',
      'callback': '<gmfContextualdataCallback'
    },
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {gmf.contextualdata.component.Controller_} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      controller.init();
    }
  };
};

exports.directive('gmfContextualdata',
  exports.directive_);


/**
 *
 * @param {angular.$compile} $compile Angular compile service.
 * @param {!angular.Scope} $scope Scope.
 * @param {gmf.raster.RasterService} gmfRaster Gmf Raster service
 *
 * @constructor
 * @private
 * @ngdoc controller
 * @ngInject
 */
exports.Controller_ = function($compile, $scope, gmfRaster) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Array<number>}
   * @export
   */
  this.projections;

  /**
   * @type {function(ol.Coordinate, Object):Object}
   * @export
   */
  this.callback;

  /**
   * @type {ol.Overlay}
   * @private
   */
  this.overlay_;

  /**
   * @type {angular.$compile}
   * @private
   */
  this.$compile_ = $compile;

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {gmf.raster.RasterService}
   * @private
   */
  this.gmfRaster_ = gmfRaster;

  angular.element('body').on('mousedown', this.hidePopover.bind(this));
};

/**
 *
 */
exports.Controller_.prototype.init = function() {
  this.preparePopover_();

  const mapDiv = this.map.getTargetElement();
  googAsserts.assertElement(mapDiv);

  olEvents.listen(mapDiv, 'contextmenu',
    this.handleMapContextMenu_, this);
};

/**
 * @param {!Event} event Event.
 * @private
 */
exports.Controller_.prototype.handleMapContextMenu_ = function(event) {
  this.$scope_.$apply(() => {
    const pixel = this.map.getEventPixel(event);
    const coordinate = this.map.getCoordinateFromPixel(pixel);
    this.setContent_(coordinate);
    event.preventDefault();
    this.hidePopover();
    this.showPopover();
    this.overlay_.setPosition(coordinate);
  });
};

exports.Controller_.prototype.setContent_ = function(coordinate) {
  const scope = this.$scope_.$new(true);
  this.$compile_(this.content_)(scope);

  const mapProjection = this.map.getView().getProjection().getCode();
  this.projections.forEach((proj) => {
    const coord = olProj.transform(coordinate, mapProjection, `EPSG:${proj}`);
    scope[`coord_${proj}`] = coord;
    scope[`coord_${proj}_eastern`] = coord[0];
    scope[`coord_${proj}_northern`] = coord[1];
  });

  const getRasterSuccess = function(resp) {
    olObj.assign(scope, resp);
    if (this.callback) {
      olObj.assign(scope, this.callback.call(this, coordinate, resp));
    }
  }.bind(this);
  const getRasterError = function(resp) {
    console.error('Error on getting the raster.');
  };
  this.gmfRaster_.getRaster(coordinate).then(
    getRasterSuccess,
    getRasterError
  );
};


/**
 * @private
 */
exports.Controller_.prototype.preparePopover_ = function() {

  const container = document.createElement('DIV');
  container.classList.add('popover');
  container.classList.add('bottom');
  container.classList.add('gmf-contextualdata');
  angular.element(container).css('position', 'relative');
  const arrow = document.createElement('DIV');
  arrow.classList.add('arrow');
  container.appendChild(arrow);
  this.content_ = document.createElement('DIV');
  this.content_.setAttribute('gmf-contextualdatacontent', '');
  this.content_.classList.add('popover-content');
  container.appendChild(this.content_);

  this.overlay_ = new olOverlay({
    element: container,
    stopEvent: true,
    autoPan: true,
    autoPanAnimation: /** @type {olx.animation.PanOptions} */ ({
      duration: 250
    }),
    positioning: 'top-center'
  });
  this.map.addOverlay(this.overlay_);
};

exports.Controller_.prototype.showPopover = function() {
  const element = /** @type {Object} */ (this.overlay_.getElement());
  angular.element(element).css('display', 'block');
};

exports.Controller_.prototype.hidePopover = function() {
  const element = /** @type {Object} */ (this.overlay_.getElement());
  angular.element(element).css('display', 'none');
};

exports.controller('GmfContextualdataController', exports.Controller_);


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
 * See the [../examples/contribs/gmf/contextualdata.html](../examples/contribs/gmf/contextualdata.html) example for a usage sample.
 *
 * @param {string} gmfContextualdatacontentTemplateUrl Url to template.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfContextualdatacontent
 */
exports.contentDirective_ = function(
  gmfContextualdatacontentTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: gmfContextualdatacontentTemplateUrl
  };
};

exports.directive('gmfContextualdatacontent', exports.contentDirective_);


export default exports;
