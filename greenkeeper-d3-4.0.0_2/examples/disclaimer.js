


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.Disclaimer} ngeoDisclaimer Ngeo disclaimer service.
 * @constructor
 */
app.MainController = function(ngeoDisclaimer) {

  /**
   * @type {ngeo.Disclaimer}
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
app.MainController.prototype.success = function() {
  this.disclaimer.success(this.successMsg_);
};


/**
 * @export
 */
app.MainController.prototype.info = function() {
  this.disclaimer.info(this.infoMsg_);
};


/**
 * @export
 */
app.MainController.prototype.warn = function() {
  this.disclaimer.warn(this.warningMsg_);
};


/**
 * @export
 */
app.MainController.prototype.error = function() {
  this.disclaimer.error(this.errorMsg_);
};


/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 * @export
 */
app.MainController.prototype.inMap = function() {
  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.alert({
      msg: message,
      target: angular.element('#disclaimers-in-map'),
      type: ngeo.MessageType.WARNING
    });
  }, this);
};


/**
 * Demonstrates how to close disclaimer messages using JavaScript, i.e.
 * instead of clicking on the close button.
 * @export
 */
app.MainController.prototype.closeAll = function() {

  this.disclaimer.close({
    msg: this.successMsg_,
    type: ngeo.MessageType.SUCCESS
  });

  this.disclaimer.close({
    msg: this.infoMsg_,
    type: ngeo.MessageType.INFORMATION
  });

  this.disclaimer.close({
    msg: this.warningMsg_,
    type: ngeo.MessageType.WARNING
  });

  this.disclaimer.close({
    msg: this.errorMsg_,
    type: ngeo.MessageType.ERROR
  });

  this.inMapMsgs_.forEach(function(message) {
    this.disclaimer.close({
      msg: message,
      type: ngeo.MessageType.WARNING
    });
  }, this);

};


app.module.controller('MainController', app.MainController);
