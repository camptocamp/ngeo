goog.provide('app.GmfImportHelper');


/**
 * @constructor
 * @param {angular.$q} $q Q.
 */
app.GmfImportHelper = function($q) {
  this.$q_ = $q;

  this.urls = [
    {'name': 'geoadmin', 'url': 'https://wms.geo.admin.ch/'},
    {'name': 'ASIT VD WMTS', 'url': 'https://ows.asitvd.ch/wmts1.0.0/WMTSCapabilities.xml'},
    {'name': 'heig', 'url': 'http://ogc.heig-vd.ch/mapserver/wms'}
  ];
};


/**
 * @return {Object} the options
 */
app.GmfImportHelper.prototype.createOptions = function() {
  return {
    'urls': this.urls,
    //'isValidUrl': gaUrlUtils.isValid,
    'addPreviewLayer': function(map, layer) {
      return; // FIXME
    },
    'removePreviewLayer': function(map, layer) {
      return; // FIXME
    },
    //'transformExtent': gaMapUtils.intersectWithDefaultExtent,
    'transformUrl': (url) => {
      // Transform the url before loading it.
      if (/(wms|service\.svc|osm)/i.test(url)) {
        // Append WMS GetCapabilities default parameters
        url += '?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0';
      }
      return this.$q_.when(url);
    }
  };
};
