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

import './popupservice.css';
import 'bootstrap/js/src/tooltip';
import angular from 'angular';
import ngeoMessagePopup from 'ngeo/message/Popup';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMessagePopup.name]);

/**
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {import('ngeo/message/Popup').PopupFactory} ngeoCreatePopup Popup service.
 * @ngInject
 * @class
 */
function MainController($sce, ngeoCreatePopup) {
  /**
   * @type {angular.ISCEService}
   */
  this.sce_ = $sce;

  /**
   * @type {import('ngeo/message/Popup').PopupFactory}
   */
  this.createPopup_ = ngeoCreatePopup;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 */
MainController.prototype.simplePopup = function () {
  const popup = this.createPopup_();
  popup.setAutoDestroy(true);
  popup.setTitle('Simple popup');
  const content = this.sce_.trustAsHtml('This is a simple 400x300 px popup.');
  popup.setContent(content);
  popup.setWidth('400px');
  popup.setHeight('300px');
  popup.setOpen(true);
};

/**
 */
MainController.prototype.iframePopup = function () {
  const popup = this.createPopup_();
  popup.setAutoDestroy(true);
  popup.addClass('popup-with-iframe');
  popup.setTitle('Iframe popup');
  popup.setUrl('https://geomapfish.org/');
  popup.setSize('400px', '300px');
  popup.setOpen(true);
};

/**
 */
MainController.prototype.heavyPopup = function () {
  const popup = this.createPopup_();
  popup.setAutoDestroy(true);
  popup.setTitle('This is a popup with lots and lots of content and a very long title');
  const content = this.sce_.trustAsHtml(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget' +
      'quam at ex euismod bibendum et eget enim. Nulla sodales tortor ac' +
      'sagittis aliquet. Ut malesuada quam vitae pulvinar porta. Nunc id' +
      'magna id risus malesuada elementum eget id purus. Curabitur vel augue' +
      'blandit, faucibus nulla quis, consequat tellus. Phasellus commodo,' +
      'tellus et vulputate ultricies, nulla libero ornare arcu, quis' +
      'fermentum sem diam quis tellus. Aliquam ut sapien tristique, lacinia' +
      'ante et, lacinia arcu. Quisque sagittis eros at quam blandit' +
      'gravida. Nulla sit amet enim semper, efficitur eros sit amet,' +
      'porttitor libero. Fusce quis tellus est. Quisque ornare, ex eget' +
      'luctus pharetra, nisl leo lobortis purus, sed tristique neque leo eget' +
      'odio. Maecenas lobortis nisl ac magna mollis, ac pulvinar risus' +
      'convallis. Donec ullamcorper sollicitudin maximus. Quisque bibendum' +
      'elit sit amet ultrices ornare. Donec aliquam felis id urna ultrices' +
      'scelerisque.'
  );
  popup.setContent(content);
  popup.setOpen(true);
};

/**
 */
MainController.prototype.openPopupWithContent = function () {
  const popup = this.createPopup_();
  const content = this.sce_.trustAsHtml('This popup was opened using the <code>open</code> method.');
  popup.open({
    autoDestroy: true,
    content: content,
    height: '200px',
    title: 'Opened with "open"',
    width: '300px',
  });
};

/**
 */
MainController.prototype.openPopupWithUrl = function () {
  const popup = this.createPopup_();
  popup.open({
    autoDestroy: true,
    cls: 'popup-with-iframe',
    height: '300px',
    title: 'Opened with "open" and "iframe"',
    url: 'https://geomapfish.org/',
    width: '400px',
  });
};

myModule.controller('MainController', MainController);

export default myModule;
