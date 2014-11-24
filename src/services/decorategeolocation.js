goog.provide('ngeo.DecorateGeolocation');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @typedef {function(ol.Geolocation)}
 */
ngeo.DecorateGeolocation;


/**
 * This service provides a function that adds a "tracking" property (using
 * `Object.defineProperty`) to the `ol.Geolocation` instance, making it
 * possible to activate/deactivate the tracking mode.
 *
 * Example:
 * <input type="checkbox" ngModel="geolocation.tracking" />
 *
 * @param {ol.Geolocation} geolocation Geolocation to decorate.
 * @ngInject
 */
ngeo.decorateGeolocation = function(geolocation) {
  goog.asserts.assertInstanceof(geolocation, ol.Geolocation);

  Object.defineProperty(geolocation, 'tracking', {
    get: function() {
      return geolocation.getTracking();
    },
    set: function(val) {
      geolocation.setTracking(val);
    }
  });
};


ngeoModule.value('ngeoDecorateGeolocation', ngeo.decorateGeolocation);
