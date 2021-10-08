// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import './notification.css';
import 'bootstrap/js/src/tooltip';
import angular from 'angular';
import {MessageType} from 'ngeo/message/Message';

import ngeoMessageNotification from 'ngeo/message/Notification';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext']);

/**
 * @ngInject
 * @class
 */
function MainController() {
  /**
   * @type {number}
   */
  this.i_ = 1;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 * Demonstrates how to display multiple messages at once with the notification
 * service.
 */
MainController.prototype.notifyMulti = function () {
  ngeoMessageNotification.notify([
    {
      msg: ['Error #', this.i_++].join(''),
      type: MessageType.ERROR,
    },
    {
      msg: ['Warning #', this.i_++].join(''),
      type: MessageType.WARNING,
    },
    {
      msg: ['Information #', this.i_++].join(''),
      type: MessageType.INFORMATION,
    },
    {
      msg: ['Success #', this.i_++].join(''),
      type: MessageType.SUCCESS,
    },
  ]);
};

MainController.prototype.success = function (msg) {
  ngeoMessageNotification.success(msg);
};

MainController.prototype.warn = function (msg) {
  ngeoMessageNotification.warn(msg);
};

MainController.prototype.info = function (msg) {
  ngeoMessageNotification.info(msg);
};

MainController.prototype.error = function (msg) {
  ngeoMessageNotification.error(msg);
};

MainController.prototype.clear = function () {
  ngeoMessageNotification.clear();
};

/**
 * Demonstrates how to display a message in an other target than the original
 * one defined by the notification service.
 */
MainController.prototype.notifyTarget = function () {
  ngeoMessageNotification.notify({
    msg: 'Error in an other target',
    target: document.querySelector('#my-messages'),
    type: MessageType.ERROR,
  });
};

/**
 * Demonstrates how to display a message for a specific number of seconds.
 */
MainController.prototype.notifyQuick = function () {
  ngeoMessageNotification.notify({
    delay: 1000,
    msg: 'Lasts one second',
    type: MessageType.SUCCESS,
  });
};

myModule.controller('MainController', MainController);

export default myModule;
