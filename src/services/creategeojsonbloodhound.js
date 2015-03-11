/**
 * @fileoverview Provides a function that creates a Bloodhound engine
 * expecting GeoJSON responses from the search web service, and creating
 * `ol.Feature` objects as suggestions.
 *
 * Example #1:
 *
 * var bloodhound = ngeoCreateGeoJSONBloodhound(
 *   'http://example.com/fulltextsearch?query=%QUERY',
 *   ol.proj.get('EPSG:3857'));
 * bloodhound.initialize();
 *
 * Example #2:
 *
 * var bloodhound = ngeoCreateGeoJSONBloodhound({
 *   remote: {
 *     limit: 10,
 *     url: mySearchEngineUrl,
 *     replace: function(url, query) {
 *       return url +
 *           '?qtext=' + encodeURIComponent(query) +
 *           '&lang=' + gettextCatalog.currentLanguage;
 *     }
 *   }
 * }, ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:21781'));
 * bloodhound.initialize
 */

goog.provide('ngeo.CreateGeoJSONBloodhound');

goog.require('ngeo');
goog.require('ol.format.GeoJSON');


/**
 * @typedef {function(string, ol.proj.Projection=,
 *     ol.proj.Projection=):Bloodhound}
 */
ngeo.CreateGeoJSONBloodhound;


/**
 * @param {BloodhoundOptions|string} options Bloodhound options or a URL to the
 *     search service. If a URL is provided then default Bloodhound options are
 *     used.
 * @param {ol.proj.Projection=} opt_featureProjection Feature projection.
 * @param {ol.proj.Projection=} opt_dataProjection Data projection.
 * @return {Bloodhound} The Bloodhound object.
 */
ngeo.createGeoJSONBloodhound = function(options, opt_featureProjection,
    opt_dataProjection) {
  var geojsonFormat = new ol.format.GeoJSON();
  var bloodhoundOptions = /** @type {BloodhoundOptions} */ ({
    remote: {
      url: goog.isString(options) ? options : '',
      ajax: {
        dataType: 'jsonp'
      },
      filter: function(parsedResponse) {
        var featureCollection = /** @type {GeoJSONFeatureCollection} */
            (parsedResponse);
        return geojsonFormat.readFeatures(featureCollection, {
          featureProjection: opt_featureProjection,
          dataProjection: opt_dataProjection
        });
      }
    },
    // datumTokenizer is required by the Bloodhound constructor but it
    // is not used when only a remote is passsed to Bloodhound.
    datumTokenizer: goog.nullFunction,
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });
  if (!goog.isString(options)) {
    goog.object.extend(bloodhoundOptions, options);
  }
  return new Bloodhound(bloodhoundOptions);
};


ngeoModule.value('ngeoCreateGeoJSONBloodhound', ngeo.createGeoJSONBloodhound);
