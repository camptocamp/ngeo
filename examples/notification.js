goog.provide('notification');

goog.require('ngeo');
goog.require('ngeo.Notification');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @constructor
 */
app.MainController = function(ngeoNotification) {

  /**
   * @type {ngeo.Notification}
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
app.MainController.prototype.notifyMulti = function() {
  this.notification.notify([{
    msg: ['Error #', this.i_++].join(''),
    type: ngeo.NotificationType.ERROR
  }, {
    msg: ['Warning #', this.i_++].join(''),
    type: ngeo.NotificationType.WARNING
  }, {
    msg: ['Information #', this.i_++].join(''),
    type: ngeo.NotificationType.INFORMATION
  }, {
    msg: ['Success #', this.i_++].join(''),
    type: ngeo.NotificationType.SUCCESS
  }]);
};


/**
 * Demonstrates how to display a message in an other target than the original
 * one defined by the notification service.
 * @export
 */
app.MainController.prototype.notifyTarget = function() {
  this.notification.notify({
    msg: 'Error in an other target',
    target: angular.element('#my-messages'),
    type: ngeo.NotificationType.ERROR
  });
};

/**
 * Demonstrates how to display a message for a specific number of seconds.
 * @export
 */
app.MainController.prototype.notifyQuick = function() {
  this.notification.notify({
    delay: 1000,
    msg: 'Lasts one second',
    type: ngeo.NotificationType.SUCCESS
  });
};


app.module.controller('MainController', app.MainController);
