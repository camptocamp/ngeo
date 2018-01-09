goog.provide('gmf.disclaimer.component');

goog.require('ol');
goog.require('ol.events');
goog.require('ol.layer.Base');
goog.require('ol.layer.Group');
goog.require('gmf');
goog.require('ngeo.message.Message');
goog.require('ngeo.message.Disclaimer');
goog.require('ngeo.misc.EventHelper');
goog.require('ngeo.map.LayerHelper');

/**
 * @type {angular.Module}
 */
gmf.disclaimer.component = angular.module('gmfDisclaimer', [
]);

gmf.module.requires.push(gmf.disclaimer.component.name);


/**
 * @constructor
 * @private
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$sce} $sce Angular sce service.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeox.PopupFactory} ngeoCreatePopup Popup service.
 * @param {!ngeo.message.Disclaimer} ngeoDisclaimer Ngeo Disclaimer service.
 * @param {!ngeo.misc.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {!ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisclaimerController
 */
gmf.disclaimer.component.Controller_ = function($element, $scope, $sce, $timeout,
  ngeoCreatePopup, ngeoDisclaimer, ngeoEventHelper, ngeoLayerHelper) {

  /**
   * @type {?ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean|undefined}
   * @export
   */
  this.external;

  /**
   * @type {boolean|undefined}
   * @export
   */
  this.popup;

  /**
   * Visibility that is set to true when a new msg is there.
   * @type {boolean}
   * @export
   */
  this.visibility = false;

  /**
   * Trusted html messages that can be displayed as html.
   * @type {string|undefined}
   * @export
   */
  this.msg;

  /**
   * @type {!Array<string>}
   * @export
   */
  this.msgs_ = [];

  /**
   * @type {!angular.$sce}
   * @private
   */
  this.sce_ = $sce;

  /**
   * @type {!angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!angular.JQLite}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {!ngeox.PopupFactory}
   * @private
   */
  this.createPopup_ = ngeoCreatePopup;

  /**
   * @type {!ngeo.message.Disclaimer}
   * @private
   */
  this.disclaimer_ = ngeoDisclaimer;

  /**
   * @type {!ngeo.misc.EventHelper}
   * @private
   */
  this.eventHelper_ = ngeoEventHelper;

  /**
   * @type {!ngeo.map.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = null;
};


/**
 * Initialise the controller.
 */
gmf.disclaimer.component.Controller_.prototype.$onInit = function() {
  this.dataLayerGroup_ = this.ngeoLayerHelper_.getGroupFromMap(this.map,
    gmf.DATALAYERGROUP_NAME);
  this.registerLayer_(this.dataLayerGroup_);
};

/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.disclaimer.component.Controller_.prototype.handleLayersAdd_ = function(evt) {
  this.timeout_(() => {
    const layer = evt.element;
    goog.asserts.assertInstanceof(layer, ol.layer.Base);
    this.registerLayer_(layer);
  });
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
gmf.disclaimer.component.Controller_.prototype.handleLayersRemove_ = function(evt) {
  const layer = evt.element;
  goog.asserts.assertInstanceof(layer, ol.layer.Base);
  this.unregisterLayer_(layer);
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
gmf.disclaimer.component.Controller_.prototype.registerLayer_ = function(layer) {

  const layerUid = ol.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Listen to added/removed layers to this group
    this.eventHelper_.addListenerKey(
      layerUid,
      ol.events.listen(
        layer.getLayers(),
        'add',
        this.handleLayersAdd_,
        this
      )
    );
    this.eventHelper_.addListenerKey(
      layerUid,
      ol.events.listen(
        layer.getLayers(),
        'remove',
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
    const disclaimers = layer.get('disclaimers');
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
gmf.disclaimer.component.Controller_.prototype.unregisterLayer_ = function(layer) {

  const layerUid = ol.getUid(layer);

  if (layer instanceof ol.layer.Group) {

    // (1) Clear event listeners
    this.eventHelper_.clearListenerKey(layerUid);

    // (2) Unregister existing layers in the group
    layer.getLayers().forEach(this.unregisterLayer_, this);

  } else {

    // Close disclaimer messages for this layer
    const disclaimers = layer.get('disclaimers');
    if (disclaimers && Array.isArray(disclaimers)) {
      disclaimers.forEach(function(disclaimer) {
        this.closeDisclaimerMessage_(disclaimer);
      }, this);
    }
  }

};


gmf.disclaimer.component.Controller_.prototype.$onDestroy = function() {
  this.unregisterLayer_(this.dataLayerGroup_);
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
gmf.disclaimer.component.Controller_.prototype.showDisclaimerMessage_ = function(msg) {
  if (this.external) {
    if (this.msgs_.indexOf(msg) < 0) {
      this.msgs_.push(msg);
    }
    this.msg = `${this.sce_.trustAsHtml(this.msgs_.join('<br />'))}`;
    this.visibility = true;
  } else {
    this.disclaimer_.alert({
      popup: this.popup,
      msg: msg,
      target: this.element_,
      type: ngeo.message.Message.Type.WARNING
    });
  }
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
gmf.disclaimer.component.Controller_.prototype.closeDisclaimerMessage_ = function(msg) {
  if (this.external) {
    this.visibility = false;
    this.msgs_.length = 0;
    this.msg = '';
  } else {
    this.disclaimer_.close({
      popup: this.popup,
      msg: msg,
      target: this.element_,
      type: ngeo.message.Message.Type.WARNING
    });
  }
};


/**
 * Provide a "disclaimer" component for GeoMapFish that is bound to the
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
 *      <ngeo-modal ng-model="disclaimerVisibility">
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
 *
 * @ngdoc component
 * @ngname gmfDisclaimer
 */
gmf.disclaimer.component.component_ = {
  controller: gmf.disclaimer.component.Controller_,
  bindings: {
    'popup': '<?gmfDisclaimerPopup',
    'map': '=gmfDisclaimerMap',
    'external': '<?gmfDisclaimerExternal',
    'visibility': '=?gmfDisclaimerExternalVisibility',
    'msg': '=?gmfDisclaimerExternalMsg'
  }
};


gmf.disclaimer.component.component('gmfDisclaimer', gmf.disclaimer.component.component_);
