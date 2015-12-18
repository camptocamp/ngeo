goog.provide('ngeo.SourceLoaderController');

goog.require('ngeo');



/**
 * @constructor
 * @export
 */
ngeo.SourceLoaderController = function() {

  /**
   * @type {Array.<string>}
   * @export
   */
  this.availableLayers = [];
};


/**
 * @param {string} url
 * @export
 */
ngeo.SourceLoaderController.prototype.connect = function(url) {
  this.availableLayers = [url + 'fakelayer1', url + 'fakelayer2'];
};


ngeoModule.controller('ngeoSourceLoaderController', ngeo.SourceLoaderController);
