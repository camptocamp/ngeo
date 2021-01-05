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

import './disclaimer.css';
import 'bootstrap/js/src/tooltip.js';
import angular from 'angular';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';

import {MessageType} from 'ngeo/message/Message.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMessageDisclaimer.name]);

/**
 * @param {import("ngeo/message/Disclaimer.js").MessageDisclaimerService} ngeoDisclaimer Ngeo disclaimer
 *    service.
 * @ngInject
 * @constructor
 */
function MainController(ngeoDisclaimer) {
  /**
   * @type {import("ngeo/message/Disclaimer.js").MessageDisclaimerService}
   */
  this.disclaimer = ngeoDisclaimer;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {string}
   */
  this.successMsg_ = 'Disclaimer with success style';

  /**
   * @type {string}
   */
  this.infoMsg_ = 'Disclaimer with info style';
  /**
   * @type {string}
   */
  this.warningMsg_ = 'Disclaimer with warning style';

  /**
   * @type {string}
   */
  this.errorMsg_ = 'Disclaimer with error style';

  /**
   * @type {string[]}
   */
  this.inMapMsgs_ = [
    'Disclaimer inside the map',
    'An other message ',
    'Map contributors',
    'This is a long message inside a map',
  ];

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 */
MainController.prototype.success = function () {
  this.disclaimer.success(this.successMsg_);
};

/**
 */
MainController.prototype.info = function () {
  this.disclaimer.info(this.infoMsg_);
};

/**
 */
MainController.prototype.warn = function () {
  this.disclaimer.warn(this.warningMsg_);
};

/**
 */
MainController.prototype.error = function () {
  this.disclaimer.error(this.errorMsg_);
};

/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 */
MainController.prototype.inMap = function () {
  this.inMapMsgs_.forEach((message) => {
    this.disclaimer.alert({
      msg: message,
      target: '#disclaimers-in-map',
      type: MessageType.WARNING,
    });
  });
};

/**
 * Demonstrates how to close disclaimer messages using JavaScript, i.e.
 * instead of clicking on the close button.
 */
MainController.prototype.closeAll = function () {
  this.disclaimer.close({
    msg: this.successMsg_,
    type: MessageType.SUCCESS,
  });

  this.disclaimer.close({
    msg: this.infoMsg_,
    type: MessageType.INFORMATION,
  });

  this.disclaimer.close({
    msg: this.warningMsg_,
    type: MessageType.WARNING,
  });

  this.disclaimer.close({
    msg: this.errorMsg_,
    type: MessageType.ERROR,
  });

  this.inMapMsgs_.forEach((message) => {
    this.disclaimer.close({
      msg: message,
      type: MessageType.WARNING,
    });
  });
};

myModule.controller('MainController', MainController);

export default myModule;
