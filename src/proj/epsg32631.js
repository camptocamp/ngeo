goog.module('ngeo.proj.EPSG32631');
goog.module.declareLegacyNamespace();

goog.require('ol.proj');
/** @suppress {extraRequire} */
goog.require('ol.proj.proj4');
const utm = goog.require('ngeo.proj.utm');
// webpack: import proj4 from 'proj4';

const epsg32631def = [
  `+proj=${utm}`,
  '+zone=31',
  '+ellps=WGS84',
  '+datum=WGS84',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg32631extent = [166021.44, 0.00, 534994.66, 9329005.18];

proj4.defs('EPSG:32631', epsg32631def);
// webpack: olProjProj4.register(proj4);
ol.proj.get('EPSG:32631').setExtent(epsg32631extent);

exports = 'EPSG:32631';
