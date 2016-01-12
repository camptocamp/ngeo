goog.provide('gmf.proj.EPSG21781');

goog.require('ol.proj');

if (typeof proj4 == 'function') {
  var epsg21781def = [
    '+proj=somerc',
    '+lat_0=46.95240555555556',
    '+lon_0=7.439583333333333',
    '+k_0=1',
    '+x_0=600000',
    '+y_0=200000',
    '+ellps=bessel',
    '+towgs84=674.4,15.1,405.3,0,0,0,0',
    '+units=m',
    '+no_defs'
  ].join(' ');

  var extent = [420000, 30000, 900000, 350000];
  proj4.defs('epsg:21781', epsg21781def);
  proj4.defs('EPSG:21781', epsg21781def);
  ol.proj.get('epsg:21781').setExtent(extent);
  ol.proj.get('EPSG:21781').setExtent(extent);
}
