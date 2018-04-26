/**
 * @module app.disclaimer
 */
const exports = {};

import './disclaimer.css';
import 'jquery-ui/ui/widgets/tooltip.js';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';

import ngeoMessageMessage from 'ngeo/message/Message.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMessageDisclaimer.module.name,
]);


/**
 * @param {ngeo.message.Disclaimer} ngeoDisclaimer Ngeo disclaimer service.
 * @ngInject
 * @constructor
 */
exports.MainController = function(ngeoDisclaimer) {

  /**
   * @type {ngeo.message.Disclaimer}
   * @export
   */
  this.disclaimer = ngeoDisclaimer;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4
    })
  });

  /**
   * @type {string}
   * @private
   */
  this.successMsg_ = 'Disclaimer with success style';

  /**
   * @type {string}
   * @private
   */
  this.infoMsg_ = 'Disclaimer with info style';
  /**
   * @type {string}
   * @private
   */
  this.warningMsg_ = 'Disclaimer with warning style';

  /**
   * @type {string}
   * @private
   */
  this.errorMsg_ = 'Disclaimer with error style';

  /**
   * @type {Array.<string>}
   * @private
   */
  this.inMapMsgs_ = [
    'Disclaimer inside the map',
    'An other message ',
    'Map contributors',
    'This is a long message inside a map'
  ];

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
};


/**
 * @export
 */
exports.MainController.prototype.success = function() {
  this.disclaimer.success(this.successMsg_);
};


/**
 * @export
 */
exports.MainController.prototype.info = function() {
  this.disclaimer.info(this.infoMsg_);
};


/**
 * @export
 */
exports.MainController.prototype.warn = function() {
  this.disclaimer.warn(this.warningMsg_);
};


/**
 * @export
 */
exports.MainController.prototype.error = function() {
  this.disclaimer.error(this.errorMsg_);
};


/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 * @export
 */
exports.MainController.prototype.inMap = function() {
  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.alert({
      msg: message,
      target: angular.element('#disclaimers-in-map'),
      type: ngeoMessageMessage.Type.WARNING
    });
  }, this);
};


/**
 * Demonstrates how to close disclaimer messages using JavaScript, i.e.
 * instead of clicking on the close button.
 * @export
 */
exports.MainController.prototype.closeAll = function() {

  this.disclaimer.close({
    msg: this.successMsg_,
    type: ngeoMessageMessage.Type.SUCCESS
  });

  this.disclaimer.close({
    msg: this.infoMsg_,
    type: ngeoMessageMessage.Type.INFORMATION
  });

  this.disclaimer.close({
    msg: this.warningMsg_,
    type: ngeoMessageMessage.Type.WARNING
  });

  this.disclaimer.close({
    msg: this.errorMsg_,
    type: ngeoMessageMessage.Type.ERROR
  });

  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.close({
      msg: message,
      type: ngeoMessageMessage.Type.WARNING
    });
  }, this);

};


exports.module.controller('MainController', exports.MainController);


export default exports;
