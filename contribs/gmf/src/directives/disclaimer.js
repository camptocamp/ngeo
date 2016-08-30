goog.provide('gmf.DisclaimerController');
goog.provide('gmf.disclaimerDirective');

goog.require('gmf');
goog.require('ngeo.Disclaimer');
goog.require('ngeo.EventHelper');
goog.require('ngeo.LayerHelper');


/**
 * Provide a "disclaimer" directive for GeoMapFish that is bound to the
 * layers added and removed from a map.
 *
 * Example:
 *
 *      <gmf-disclaimer
 *        gmf-disclaimer-map="::ctrl.map">
 *      </gmf-disclaimer>
 *
 * @htmlAttribute {boolean} gmf-disclaimer-modal Whether to show the disclaimer
 *     messages in modals or not. Defaults to `false`.
 * @htmlAttribute {ol.Map=} gmf-disclaimer-map The map.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisclaimer
 */
gmf.disclaimerDirective = function() {

  return {
    restrict: 'E',
    scope: {
      'modalIn': '<?gmfDisclaimerModal',
      'map': '=gmfDisclaimerMap'
    },
    bindToController: true,
    controller: 'GmfDisclaimerController',
    controllerAs: 'dclCtrl'
  };
};


gmf.module.directive('gmfDisclaimer', gmf.disclaimerDirective);


/**
 * @constructor
 * @param {angular.JQLite} $element Element.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @param {ngeo.Disclaimer} ngeoDisclaimer Ngeo Disclaimer service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisclaimerController
 */
gmf.DisclaimerController = function($element, $scope, ngeoCreatePopup,
    ngeoDisclaimer, ngeoEventHelper, ngeoLayerHelper) {

  /**
   * @type {boolean}
   * @export
   */
  this.modal = this['modalIn'] === true;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = $element;

  /**
   * @private
   * @type {ngeo.CreatePopup}
   */
  this.createPopup_ = ngeoCreatePopup;

  /**
   * @type {ngeo.Disclaimer}
   * @private
   */
  this.disclaimer_ = ngeoDisclaimer;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.eventHelper_ = ngeoEventHelper;

  /**
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = ngeoLayerHelper.getGroupFromMap(this.map,
      gmf.DATALAYERGROUP_NAME);

  this.registerLayer_(this.dataLayerGroup_);

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.DisclaimerController.prototype.handleLayersAdd_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.registerLayer_(layer);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.DisclaimerController.prototype.handleLayersRemove_ = function(evt) {
  var layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.unregisterLayer_(layer);
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.DisclaimerController.prototype.registerLayer_ = function(layer) {

  var layerUid = goog.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Listen to added/removed layers to this group
    this.eventHelper_.addListenerKey(
      layerUid,
      ol.events.listen(
        layer.getLayers(),
        ol.Collection.EventType.ADD,
        this.handleLayersAdd_,
        this
      )
    );
    this.eventHelper_.addListenerKey(
      layerUid,
      ol.events.listen(
        layer.getLayers(),
        ol.Collection.EventType.REMOVE,
        this.handleLayersRemove_,
        this
      )
    );

    // (2) Register existing layers in the group
    layer.getLayers().forEach(function(layer) {
      this.registerLayer_(layer);
    }, this);

  } else {

    // Show disclaimer messages for this layer
    var disclaimers = layer.get('disclaimers');
    if (disclaimers && Array.isArray(disclaimers)) {
      disclaimers.forEach(function(disclaimer) {
        this.showDisclaimerMessage_(disclaimer);
      }, this);
    }
  }
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.DisclaimerController.prototype.unregisterLayer_ = function(layer) {

  var layerUid = goog.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Clear event listeners
    this.eventHelper_.clearListenerKey(layerUid);

    // (2) Unregister existing layers in the group
    layer.getLayers().forEach(this.unregisterLayer_, this);

  } else {

    // Close disclaimer messages for this layer
    var disclaimers = layer.get('disclaimers');
    if (disclaimers && Array.isArray(disclaimers)) {
      disclaimers.forEach(function(disclaimer) {
        this.closeDisclaimerMessage_(disclaimer);
      }, this);
    }
  }

};


/**
 * @private
 */
gmf.DisclaimerController.prototype.handleDestroy_ = function() {
  this.unregisterLayer_(this.dataLayerGroup_);
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
gmf.DisclaimerController.prototype.showDisclaimerMessage_ = function(msg) {
  this.disclaimer_.alert({
    modal: this.modal,
    msg: msg,
    target: this.element_,
    type: ngeo.MessageType.WARNING
  });
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
gmf.DisclaimerController.prototype.closeDisclaimerMessage_ = function(msg) {
  this.disclaimer_.close({
    modal: this.modal,
    msg: msg,
    target: this.element_,
    type: ngeo.MessageType.WARNING
  });
};


gmf.module.controller('GmfDisclaimerController', gmf.DisclaimerController);
