goog.provide('gmf.ContextualdataController');
goog.provide('gmf.contextualdataDirective');
goog.provide('gmf.contextualdatacontentDirective');

goog.require('gmf');
goog.require('gmf.Altitude');
goog.require('ol.Overlay');
goog.require('ol.proj');


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
gmf.contextualdataDirective = function() {
  return {
    restrict: 'A',
    scope: false,
    controller: 'GmfContextualdataController',
    controllerAs: 'cdCtrl',
    bindToController: {
      'map': '<gmfContextualdataMap',
      'projections': '<gmfContextualdataProjections',
      'callback': '<gmfContextualdataCallback'
    },
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         * @param {gmf.ContextualdataController} controller Controller.
         */
        function(scope, element, attrs, controller) {
          controller.init();
        }
  };
};

gmf.module.directive('gmfContextualdata', gmf.contextualdataDirective);


/**
 *
 * @param {angular.$compile} $compile Angular compile service.
 * @param {!angular.Scope} $scope Scope.
 * @param {gmf.Altitude} gmfAltitude Gmf altitude service
 *
 * @constructor
 * @ngInject
 */
gmf.ContextualdataController = function($compile, $scope, gmfAltitude) {

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
   * @type {gmf.Altitude}
   * @private
   */
  this.gmfAltitude_ = gmfAltitude;

  this.preparePopover_();

  angular.element('body').on('mousedown', this.hidePopover.bind(this));
};

/**
 *
 */
gmf.ContextualdataController.prototype.init = function() {
  var mapDiv = this.map.getTargetElement();
  goog.asserts.assertElement(mapDiv);

  goog.events.listen(mapDiv, goog.events.EventType.CONTEXTMENU,
        this.handleMapContextMenu_, false, this);
};

/**
 * @param {Event} evt Event.
 * @private
 */
gmf.ContextualdataController.prototype.handleMapContextMenu_ = function(evt) {
  this.$scope_.$apply(function() {
    var pixel = this.map.getEventPixel(evt);
    var coordinate = this.map.getCoordinateFromPixel(pixel);
    this.setContent_(coordinate);
    evt.preventDefault();
    this.hidePopover();
    this.showPopover();
    this.overlay_.setPosition(coordinate);
  }.bind(this));
};


gmf.ContextualdataController.prototype.setContent_ = function(coordinate) {
  var scope = this.$scope_.$new(true);
  this.$compile_(this.content_)(scope);

  var mapProjection = this.map.getView().getProjection().getCode();
  this.projections.forEach(function(proj) {
    var coord = ol.proj.transform(coordinate, mapProjection, 'EPSG:' + proj);
    scope['coord_' + proj] = coord;
    scope['coord_' + proj + '_eastern'] = coord[0];
    scope['coord_' + proj + '_northern'] = coord[1];
  });

  var getAltitudeSuccess = function(resp) {
    goog.object.extend(scope, resp);
    if (this.callback) {
      goog.object.extend(scope, this.callback.call(this, coordinate, resp));
    }
  }.bind(this);
  var getAltitudeError = function(resp) {
    console.error('Error on getting altitude.');
  };
  this.gmfAltitude_.getAltitude(coordinate).then(
      getAltitudeSuccess,
      getAltitudeError
  );
};


/**
 * @private
 */
gmf.ContextualdataController.prototype.preparePopover_ = function() {

  var container = document.createElement('DIV');
  container.classList.add('popover', 'bottom', 'gmf-contextualdata');
  angular.element(container).css('position', 'relative');
  var arrow = document.createElement('DIV');
  arrow.classList.add('arrow');
  container.appendChild(arrow);
  this.content_ = document.createElement('DIV');
  this.content_.setAttribute('gmf-contextualdatacontent', '');
  this.content_.classList.add('popover-content');
  container.appendChild(this.content_);

  this.overlay_ = new ol.Overlay({
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

gmf.ContextualdataController.prototype.showPopover = function() {
  var element = /** @type {Object} */ (this.overlay_.getElement());
  angular.element(element).css('display', 'block');
};

gmf.ContextualdataController.prototype.hidePopover = function() {
  var element = /** @type {Object} */ (this.overlay_.getElement());
  angular.element(element).css('display', 'none');
};

gmf.module.controller('GmfContextualdataController', gmf.ContextualdataController);


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
gmf.contextualdatacontentDirective = function(
    gmfContextualdatacontentTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: gmfContextualdatacontentTemplateUrl
  };
};

gmf.module.directive('gmfContextualdatacontent', gmf.contextualdatacontentDirective);
