goog.module('ngeo.proj.EPSG32631');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
goog.require('ol.proj.proj4');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.utm');

if (typeof ol.proj.proj4.get() == 'function') {
  const epsg32631def = [
    '+proj=utm',
    '+zone=31',
    '+ellps=WGS84',
    '+datum=WGS84',
    '+units=m',
    '+no_defs'
  ].join(' ');
  const epsg32631extent = [166021.44, 0.00, 534994.66, 9329005.18];

  ol.proj.proj4.get().defs('EPSG:32631', epsg32631def);
  ol.proj.get('EPSG:32631').setExtent(epsg32631extent);
}

exports = 'EPSG:32631';
