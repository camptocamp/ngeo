goog.provide('ngeo.CustomEvent');
goog.require('ol.events.Event');


/**
 * @constructor
 * @extends {ol.events.Event}
 * @param {string} type Event type.
 * @param {T} detail Event Detail.
 * @template T
 */
ngeo.CustomEvent = function(type, detail = {}) {

  ol.events.Event.call(this, type);

  /**
   * @type {T}
   */
  this.detail = detail;

};
ol.inherits(ngeo.CustomEvent, ol.events.Event);
