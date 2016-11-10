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
 * You can also display the disclaimer messages in popups or use them in another
 * context. The example below show you how to display the disclaimer messages
 * in a ngeo-modal window (external case).
 *
 * Example:
 *
 *      <gmf-disclaimer
 *        gmf-disclaimer-map="::ctrl.map"
 *        gmf-disclaimer-external="::true"
 *        gmf-disclaimer-external-msg="disclaimerMsg"
 *        gmf-disclaimer-external-visibility="disclaimerVisibility">
 *      </gmf-disclaimer>
 *      <ngeo-modal ng-model="disclaimerVisibility"
 *                  ngeo-modal-destroy-content-on-hide="true">
 *       <div class="modal-header">
 *         <button type="button" class="close" data-dismiss="modal"
 *                 aria-hidden="true">&times;</button>
 *       </div>
 *       <div class="modal-body">
 *         <div ng-bind-html="disclaimerMsg"></div>
 *       </div>
 *     </ngeo-modal>
 *
 * @htmlAttribute {boolean} gmf-disclaimer-popup Whether to show the disclaimer
 *     messages in popups or not. Defaults to `false`.
 * @htmlAttribute {boolean?} gmf-disclaimer-external Whether to use disclaimer
 *     messages elsewhere or not. Default to `false`. If true, you should use
 *     the gmf-disclaimer-external-msg and the
 *     gmf-disclaimer-external-visibility too.
 * @htmlAttribute {boolean?} gmf-disclaimer-external-visibility variable that
 *     will be set to true if the disclaimers contain a new message. To uses it,
 *     you must set the gmf-disclaimer-external to true.
 * @htmlAttribute {string?} gmf-disclaimer-external-msg variable that will
 *     contains the disclaimer messages. To uses it, you must set the
 *     gmf-disclaimer-external to true.
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
      'popupIn': '<?gmfDisclaimerPopup',
      'map': '=gmfDisclaimerMap',
      'external': '<?gmfDisclaimerExternal',
      'visibility': '=?gmfDisclaimerExternalVisibility',
      'msg': '=?gmfDisclaimerExternalMsg'
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
 * @param {angular.$sce} $sce Angular sce service.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @param {ngeo.Disclaimer} ngeoDisclaimer Ngeo Disclaimer service.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisclaimerController
 */
gmf.DisclaimerController = function($element, $scope, $sce, ngeoCreatePopup,
    ngeoDisclaimer, ngeoEventHelper, ngeoLayerHelper) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.popup = this['popupIn'] === true;

  /**
   * @type {boolean}
   * @private
   */
  this.external_ = this['external'] === true;

  /**
   * Visibility that is set to true when a new msg is there.
   * @type {boolean}
   * @export
   */
  this.visibility = false;

  /**
   * Trusted html messages that can be displayed as html.
   * @type {string}
   * @export
   */
  this.msg;

  /**
   * @type {Array<string>}
   * @export
   */
  this.msgs_ = [];

  /**
   * @private
   * @type {angular.$sce}
   */
  this.sce_ = $sce;

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
  if (this.external) {
    if (this.msgs_.indexOf(msg) < 0) {
      this.msgs_.push(msg);
    }
    this.msg = '' + this.sce_.trustAsHtml(this.msgs_.join('<br />'));
    this.visibility = true;
  } else {
    this.disclaimer_.alert({
      popup: this.popup,
      msg: msg,
      target: this.element_,
      type: ngeo.MessageType.WARNING
    });
  }
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
gmf.DisclaimerController.prototype.closeDisclaimerMessage_ = function(msg) {
  if (this.external) {
    this.visibility = false;
    this.msgs_.length = 0;
    this.msg = '';
  } else {
    this.disclaimer_.close({
      popup: this.popup,
      msg: msg,
      target: this.element_,
      type: ngeo.MessageType.WARNING
    });
  }
};


gmf.module.controller('GmfDisclaimerController', gmf.DisclaimerController);
