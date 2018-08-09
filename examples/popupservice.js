/**
 * @module app.popupservice
 */
const exports = {};

import './popupservice.css';
import 'jquery-ui/ui/widgets/tooltip.js';
import ngeoMessagePopup from 'ngeo/message/Popup.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMessagePopup.module.name,
]);


/**
 * @param {angular.$sce} $sce Angular sce service.
 * @param {ngeox.PopupFactory} ngeoCreatePopup Popup service.
 * @ngInject
 * @constructor
 */
exports.MainController = function($sce, ngeoCreatePopup) {

  /**
   * @private
   * @type {angular.$sce}
   */
  this.sce_ = $sce;

  /**
   * @private
   * @type {ngeox.PopupFactory}
   */
  this.createPopup_ = ngeoCreatePopup;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


/**
 * @export
 */
exports.MainController.prototype.simplePopup = function() {
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
 * @export
 */
exports.MainController.prototype.iframePopup = function() {
  const popup = this.createPopup_();
  popup.setAutoDestroy(true);
  popup.addClass('popup-with-iframe');
  popup.setTitle('Iframe popup');
  popup.setUrl('http://geomapfish.org/');
  popup.setSize('400px', '300px');
  popup.setOpen(true);
};


/**
 * @export
 */
exports.MainController.prototype.heavyPopup = function() {
  const popup = this.createPopup_();
  popup.setAutoDestroy(true);
  popup.setTitle(
    'This is a popup with lots and lots of content and a very long title');
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
 * @export
 */
exports.MainController.prototype.openPopupWithContent = function() {
  const popup = this.createPopup_();
  const content = this.sce_.trustAsHtml(
    'This popup was opened using the <code>open</code> method.');
  popup.open({
    autoDestroy: true,
    content: content,
    height: '200px',
    title: 'Opened with "open"',
    width: '300px'
  });
};


/**
 * @export
 */
exports.MainController.prototype.openPopupWithUrl = function() {
  const popup = this.createPopup_();
  popup.open({
    autoDestroy: true,
    cls: 'popup-with-iframe',
    height: '300px',
    title: 'Opened with "open" and "iframe"',
    url: 'http://geomapfish.org/',
    width: '400px'
  });
};


exports.module.controller('MainController', exports.MainController);


export default exports;
