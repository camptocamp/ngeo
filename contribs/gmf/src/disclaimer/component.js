import angular from 'angular';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import olLayerBase from 'ol/layer/Base.js';
import olLayerGroup from 'ol/layer/Group.js';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import {MessageType} from 'ngeo/message/Message.js';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';

import 'angular-sanitize';


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDisclaimer', [
  'ngSanitize',
  ngeoMapLayerHelper.name,
  ngeoMessageDisclaimer.name,
  ngeoMiscEventHelper.name,
]);


/**
 *
 * @param {import("ol/layer/Base.js").default} layer Layer
 * @param {function(string):void} func Function
 */
function forEachDisclaimer(layer, func) {
  const disclaimers = layer.get('disclaimers');
  if (disclaimers && Array.isArray(disclaimers)) {
    disclaimers.forEach(func);
  }
}


/**
 * Used metadata:
 *
 *  * `disclaimer`: The disclaimer text for this element.
 *      For WMS and WMTS layers, layer groups and themes.
 *
 * @param {!JQuery} $element Element.
 * @param {!angular.ISCEService} $sce Angular sce service.
 * @param {!angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!import("ngeo/message/Disclaimer.js").MessageDisclaimerService} ngeoDisclaimer Ngeo Disclaimer
 *    service.
 * @param {!import("ngeo/misc/EventHelper.js").EventHelper} ngeoEventHelper Ngeo Event Helper.
 * @param {!import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDisclaimerController
 */
function DisclaimerController(
  $element, $sce, $timeout, gettextCatalog, ngeoDisclaimer, ngeoEventHelper, ngeoLayerHelper
) {

  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {boolean|undefined}
   */
  this.layerVisibility;

  /**
   * @type {boolean|undefined}
   */
  this.external;

  /**
   * @type {boolean|undefined}
   */
  this.popup;

  /**
   * Visibility that is set to true when a new msg is there.
   * @type {boolean}
   */
  this.visibility = false;

  /**
   * Trusted html messages that can be displayed as html.
   * @type {string|undefined}
   */
  this.msg;

  /**
   * @type {!Array<string>}
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
   * @type {!angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {!JQuery}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {!import("ngeo/message/Disclaimer.js").MessageDisclaimerService}
   * @private
   */
  this.disclaimer_ = ngeoDisclaimer;

  /**
   * @type {!import("ngeo/misc/EventHelper.js").EventHelper}
   * @private
   */
  this.eventHelper_ = ngeoEventHelper;

  /**
   * @type {!import("ngeo/map/LayerHelper.js").LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {?import("ol/layer/Group.js").default}
   * @private
   */
  this.dataLayerGroup_ = null;
}


/**
 * Initialise the controller.
 */
DisclaimerController.prototype.$onInit = function() {
  this.layerVisibility = this.layerVisibility !== undefined ? this.layerVisibility : true;

  this.dataLayerGroup_ = this.ngeoLayerHelper_.getGroupFromMap(this.map, DATALAYERGROUP_NAME);
  this.registerLayer_(this.dataLayerGroup_);
};

/**
 * @param {import("ol/Collection.js").CollectionEvent} evt Event.
 * @private
 */
DisclaimerController.prototype.handleLayersAdd_ = function(evt) {
  this.timeout_(() => {
    const layer = evt.element;
    console.assert(layer instanceof olLayerBase);
    this.registerLayer_(layer);
  });
};


/**
 * @param {import("ol/Collection.js").CollectionEvent} evt Event.
 * @private
 */
DisclaimerController.prototype.handleLayersRemove_ = function(evt) {
  const layer = evt.element;
  console.assert(layer instanceof olLayerBase);
  this.unregisterLayer_(layer);
};


/**
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @private
 */
DisclaimerController.prototype.registerLayer_ = function(layer) {

  const layerUid = olUtilGetUid(layer);

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

    if (this.layerVisibility) {
      // Show disclaimer messages for this layer
      forEachDisclaimer(layer, (disclaimer) => {
        if (layer.getVisible()) {
          this.showDisclaimerMessage_(disclaimer);
        }
      });

      const listenerKey = olEvents.listen(layer, 'change:visible', (event) => {
        const layer = event.target;
        if (layer.getVisible()) {
          forEachDisclaimer(layer, (disclaimer) => {
            this.showDisclaimerMessage_(disclaimer);
          });
        } else {
          forEachDisclaimer(layer, (disclaimer) => {
            this.closeDisclaimerMessage_(disclaimer);
          });
        }
      });
      this.eventHelper_.addListenerKey(layerUid, listenerKey);
    } else {
      // Show disclaimer messages for this layer
      forEachDisclaimer(layer, (disclaimer) => {
        this.showDisclaimerMessage_(disclaimer);
      });
    }
  }
};


/**
 * @param {import("ol/layer/Base.js").default} layer Layer.
 * @private
 */
DisclaimerController.prototype.unregisterLayer_ = function(layer) {

  const layerUid = olUtilGetUid(layer);

  if (layer instanceof olLayerGroup) {

    // (1) Clear event listeners
    this.eventHelper_.clearListenerKey(layerUid);

    // (2) Unregister existing layers in the group
    layer.getLayers().forEach(layer => this.unregisterLayer_(layer));

  } else {

    // Close disclaimer messages for this layer
    forEachDisclaimer(layer, (disclaimer) => {
      this.closeDisclaimerMessage_(disclaimer);
    });
  }

};


DisclaimerController.prototype.$onDestroy = function() {
  this.unregisterLayer_(this.dataLayerGroup_);
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
DisclaimerController.prototype.showDisclaimerMessage_ = function(msg) {
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
      type: MessageType.WARNING
    });
  }
};


/**
 * @param {string} msg Disclaimer message.
 * @private
 */
DisclaimerController.prototype.closeDisclaimerMessage_ = function(msg) {
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
      type: MessageType.WARNING
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
 *       <div class="modal-header ui-draggable-handle">
 *         <button type="button" class="close" data-dismiss="modal"
 *                 aria-hidden="true">&times;</button>
 *       </div>
 *       <div class="modal-body">
 *         <div ng-bind-html="disclaimerMsg"></div>
 *       </div>
 *     </ngeo-modal>
 *
 * @htmlAttribute {boolean?} gmf-disclaimer-layer-visibility Only display the disclaimer
 *     if the layer is visible. Defaults to `true`.
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
 * @htmlAttribute {import("ol/Map.js").default=} gmf-disclaimer-map The map.
 *
 * @ngdoc component
 * @ngname gmfDisclaimer
 */
const disclaimerComponent = {
  controller: DisclaimerController,
  bindings: {
    'layerVisibility': '<?gmfDisclaimerLayerVisibility',
    'popup': '<?gmfDisclaimerPopup',
    'map': '=gmfDisclaimerMap',
    'external': '<?gmfDisclaimerExternal',
    'visibility': '=?gmfDisclaimerExternalVisibility',
    'msg': '=?gmfDisclaimerExternalMsg'
  }
};


module.component('gmfDisclaimer', disclaimerComponent);


export default module;
