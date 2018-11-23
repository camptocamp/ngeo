/**
 * @module gmf.disclaimer.component
 */
import * as olBase from 'ol/index.js';
import * as olEvents from 'ol/events.js';
import olLayerBase from 'ol/layer/Base.js';
import olLayerGroup from 'ol/layer/Group.js';
import gmfBase from 'gmf/index.js';
import googAsserts from 'goog/asserts.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMessageMessage from 'ngeo/message/Message.js';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';

import 'angular-sanitize';

/**
 * @type {angular.IModule}
 */
const exports = angular.module('gmfDisclaimer', [
  'ngSanitize',
  ngeoMapLayerHelper.module.name,
  ngeoMessageDisclaimer.module.name,
  ngeoMiscEventHelper.module.name,
]);


/**
 * @constructor
 * @private
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!angular.ISCEService} $sce Angular sce service.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!ngeox.PopupFactory} ngeoCreatePopup Popup service.
 * @param {!ngeo.message.Disclaimer} ngeoDisclaimer Ngeo Disclaimer service.
 * @param {!ngeo.misc.EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {!ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisclaimerController
 */
exports.Controller_ = function($element, $scope, $sce, $timeout,
  gettextCatalog, ngeoCreatePopup, ngeoDisclaimer, ngeoEventHelper, ngeoLayerHelper) {

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
   * @type {!angular.ISCEService}
   * @private
   */
  this.sce_ = $sce;

  /**
   * @type {!angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

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
exports.Controller_.prototype.$onInit = function() {
  this.dataLayerGroup_ = this.ngeoLayerHelper_.getGroupFromMap(this.map,
    gmfBase.DATALAYERGROUP_NAME);
  this.registerLayer_(this.dataLayerGroup_);
};

/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleLayersAdd_ = function(evt) {
  this.timeout_(() => {
    const layer = evt.element;
    googAsserts.assertInstanceof(layer, olLayerBase);
    this.registerLayer_(layer);
  });
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleLayersRemove_ = function(evt) {
  const layer = evt.element;
  googAsserts.assertInstanceof(layer, olLayerBase);
  this.unregisterLayer_(layer);
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
exports.Controller_.prototype.registerLayer_ = function(layer) {

  const layerUid = olBase.getUid(layer);

  if (layer instanceof olLayerGroup) {

    // (1) Listen to added/removed layers to this group
    this.eventHelper_.addListenerKey(
      layerUid,
      olEvents.listen(
        layer.getLayers(),
        'add',
        this.handleLayersAdd_,
        this
      )
    );
    this.eventHelper_.addListenerKey(
      layerUid,
      olEvents.listen(
        layer.getLayers(),
        'remove',
        this.handleLayersRemove_,
        this
      )
    );

    // (2) Register existing layers in the group
    layer.getLayers().forEach((layer) => {
      this.registerLayer_(layer);
    });

  } else {

    // Show disclaimer messages for this layer
    const disclaimers = layer.get('disclaimers');
    if (disclaimers && Array.isArray(disclaimers)) {
      disclaimers.forEach((disclaimer) => {
        this.showDisclaimerMessage_(disclaimer);
      });
    }
  }
};


/**
 * @param {ol.layer.Base} layer Layer.
 * @private
 */
exports.Controller_.prototype.unregisterLayer_ = function(layer) {

  const layerUid = olBase.getUid(layer);

  if (layer instanceof olLayerGroup) {

    // (1) Clear event listeners
    this.eventHelper_.clearListenerKey(layerUid);

    // (2) Unregister existing layers in the group
    layer.getLayers().forEach(layer => this.unregisterLayer_(layer));

  } else {

    // Close disclaimer messages for this layer
    const disclaimers = layer.get('disclaimers');
    if (disclaimers && Array.isArray(disclaimers)) {
      disclaimers.forEach((disclaimer) => {
        this.closeDisclaimerMessage_(disclaimer);
      });
    }
  }

};


exports.Controller_.prototype.$onDestroy = function() {
  this.unregisterLayer_(this.dataLayerGroup_);
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
exports.Controller_.prototype.showDisclaimerMessage_ = function(msg) {
  msg = this.gettextCatalog_.getString(msg);
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
      type: ngeoMessageMessage.Type.WARNING
    });
  }
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
exports.Controller_.prototype.closeDisclaimerMessage_ = function(msg) {
  msg = this.gettextCatalog_.getString(msg);
  if (this.external) {
    this.visibility = false;
    this.msgs_.length = 0;
    this.msg = '';
  } else {
    this.disclaimer_.close({
      popup: this.popup,
      msg: msg,
      target: this.element_,
      type: ngeoMessageMessage.Type.WARNING
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
exports.component_ = {
  controller: exports.Controller_,
  bindings: {
    'popup': '<?gmfDisclaimerPopup',
    'map': '=gmfDisclaimerMap',
    'external': '<?gmfDisclaimerExternal',
    'visibility': '=?gmfDisclaimerExternalVisibility',
    'msg': '=?gmfDisclaimerExternalMsg'
  }
};


exports.component('gmfDisclaimer', exports.component_);


export default exports;
