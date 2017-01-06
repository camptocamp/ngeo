goog.provide('ngeo.DecorateGeolocation');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that adds a "tracking" property (using
 * `Object.defineProperty`) to the `ol.Geolocation` instance, making it
 * possible to activate/deactivate the tracking mode.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="geolocation.tracking" />
 *
 * See our live example: [../examples/geolocation.html](../examples/geolocation.html)
 *
 * @typedef {function(ol.Geolocation)}
 * @ngdoc service
 * @ngname ngeoDecorateGeolocation
 */
ngeo.DecorateGeolocation;


/**
 * @param {ol.Geolocation} geolocation Geolocation to decorate.
 * @ngInject
 */
ngeo.decorateGeolocation = function(geolocation) {
  goog.asserts.assertInstanceof(geolocation, ol.Geolocation);

  Object.defineProperty(geolocation, 'tracking', {
    get: () => geolocation.getTracking(),
    set: (val) => {
      geolocation.setTracking(val);
    }
  });
};


ngeo.module.value('ngeoDecorateGeolocation', ngeo.decorateGeolocation);
