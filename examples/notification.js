/**
 */

import './notification.css';
import 'jquery-ui/ui/widgets/tooltip.js';
import angular from 'angular';
import ngeoMessageMessage from 'ngeo/message/Message.js';

import ngeoMessageNotification from 'ngeo/message/Notification.js';


/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMessageNotification.name,
]);


/**
 * @param {import("ngeo/message/Notification.js").default} ngeoNotification Ngeo notification service.
 * @ngInject
 * @constructor
 */
exports.MainController = function(ngeoNotification) {

  /**
   * @type {import("ngeo/message/Notification.js").default}
   * @export
   */
  this.notification = ngeoNotification;

  /**
   * @type {number}
   * @private
   */
  this.i_ = 1;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


/**
 * Demonstrates how to display multiple messages at once with the notification
 * service.
 * @export
 */
exports.MainController.prototype.notifyMulti = function() {
  this.notification.notify([{
    msg: ['Error #', this.i_++].join(''),
    type: ngeoMessageMessage.Type.ERROR
  }, {
    msg: ['Warning #', this.i_++].join(''),
    type: ngeoMessageMessage.Type.WARNING
  }, {
    msg: ['Information #', this.i_++].join(''),
    type: ngeoMessageMessage.Type.INFORMATION
  }, {
    msg: ['Success #', this.i_++].join(''),
    type: ngeoMessageMessage.Type.SUCCESS
  }]);
};


/**
 * Demonstrates how to display a message in an other target than the original
 * one defined by the notification service.
 * @export
 */
exports.MainController.prototype.notifyTarget = function() {
  this.notification.notify({
    msg: 'Error in an other target',
    target: angular.element('#my-messages'),
    type: ngeoMessageMessage.Type.ERROR
  });
};

/**
 * Demonstrates how to display a message for a specific number of seconds.
 * @export
 */
exports.MainController.prototype.notifyQuick = function() {
  this.notification.notify({
    delay: 1000,
    msg: 'Lasts one second',
    type: ngeoMessageMessage.Type.SUCCESS
  });
};


module.controller('MainController', exports.MainController);


export default exports;
