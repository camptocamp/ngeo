goog.provide('ngeo.proj.EPSG32631');

goog.require('ol.proj');

if (typeof proj4 == 'function') {
  var epsg32631def = [
    '+proj=utm',
    '+zone=31',
    '+ellps=WGS84',
    '+datum=WGS84',
    '+units=m',
    '+no_defs'
  ].join(' ');
  var epsg32631extent = [166021.44, 0.00, 534994.66, 9329005.18];

  proj4.defs('epsg:32631', epsg32631def);
  proj4.defs('EPSG:32631', epsg32631def);
  ol.proj.get('epsg:32631').setExtent(epsg32631extent);
  ol.proj.get('EPSG:32631').setExtent(epsg32631extent);
}
