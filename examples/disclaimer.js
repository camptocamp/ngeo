goog.provide('app.disclaimer');

// webpack: import './disclaimer.css';
// webpack: import './common_dependencies.js';
// webpack: import 'jquery-ui/ui/widgets/tooltip.js';
goog.require('ngeo.message.Disclaimer');
goog.require('ngeo.message.Message');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.disclaimer.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.message.Disclaimer.module.name,
]);


/**
 * @param {ngeo.message.Disclaimer} ngeoDisclaimer Ngeo disclaimer service.
 * @ngInject
 * @constructor
 */
app.disclaimer.MainController = function(ngeoDisclaimer) {

  /**
   * @type {ngeo.message.Disclaimer}
   * @export
   */
  this.disclaimer = ngeoDisclaimer;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
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
app.disclaimer.MainController.prototype.success = function() {
  this.disclaimer.success(this.successMsg_);
};


/**
 * @export
 */
app.disclaimer.MainController.prototype.info = function() {
  this.disclaimer.info(this.infoMsg_);
};


/**
 * @export
 */
app.disclaimer.MainController.prototype.warn = function() {
  this.disclaimer.warn(this.warningMsg_);
};


/**
 * @export
 */
app.disclaimer.MainController.prototype.error = function() {
  this.disclaimer.error(this.errorMsg_);
};


/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 * @export
 */
app.disclaimer.MainController.prototype.inMap = function() {
  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.alert({
      msg: message,
      target: angular.element('#disclaimers-in-map'),
      type: ngeo.message.Message.Type.WARNING
    });
  }, this);
};


/**
 * Demonstrates how to close disclaimer messages using JavaScript, i.e.
 * instead of clicking on the close button.
 * @export
 */
app.disclaimer.MainController.prototype.closeAll = function() {

  this.disclaimer.close({
    msg: this.successMsg_,
    type: ngeo.message.Message.Type.SUCCESS
  });

  this.disclaimer.close({
    msg: this.infoMsg_,
    type: ngeo.message.Message.Type.INFORMATION
  });

  this.disclaimer.close({
    msg: this.warningMsg_,
    type: ngeo.message.Message.Type.WARNING
  });

  this.disclaimer.close({
    msg: this.errorMsg_,
    type: ngeo.message.Message.Type.ERROR
  });

  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.close({
      msg: message,
      type: ngeo.message.Message.Type.WARNING
    });
  }, this);

};


app.disclaimer.module.controller('MainController', app.disclaimer.MainController);
