goog.module('ngeo.proj.EPSG21781');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
goog.require('ol.proj.proj4');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.somerc');

if (typeof ol.proj.proj4.get() == 'function') {
  const epsg21781def = [
    '+proj=somerc',
    '+lat_0=46.95240555555556',
    '+lon_0=7.439583333333333',
    '+k_0=1',
    '+x_0=600000',
    '+y_0=200000',
    '+ellps=bessel',
    '+towgs84=674.374,15.056,405.346,0,0,0,0',
    '+units=m',
    '+no_defs'
  ].join(' ');
  const epsg21781extent = [420000, 30000, 900000, 350000];

  ol.proj.proj4.get().defs('EPSG:21781', epsg21781def);
  ol.proj.get('EPSG:21781').setExtent(epsg21781extent);
}

exports = 'EPSG:21781';
