
goog.provide('ngeo.CreateGeoJSONBloodhound');

goog.require('goog.array');
goog.require('ngeo');
goog.require('ol.format.GeoJSON');


/**
 * Provides a function that creates a Bloodhound engine
 * expecting GeoJSON responses from the search web service, and creating
 * `ol.Feature` objects as suggestions.
 *
 * @example
 * var bloodhound = ngeoCreateGeoJSONBloodhound(
 *   'http://example.com/fulltextsearch?query=%QUERY',
 *   aFilterFunction,
 *   ol.proj.get('EPSG:3857'));
 * bloodhound.initialize();
 *
 * @example
 * var bloodhound = ngeoCreateGeoJSONBloodhound({
 *   remote: {
 *     url: mySearchEngineUrl,
 *     replace: function(url, query) {
 *       return url +
 *           '?qtext=' + encodeURIComponent(query) +
 *           '&lang=' + gettextCatalog.currentLanguage;
 *     }
 *   }
 * }, undefined, ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:21781'));
 * bloodhound.initialize
 *
 * @typedef {function(string, (function(GeoJSONFeature): boolean)=,
 * ol.proj.Projection=, ol.proj.Projection=):Bloodhound}
 */
ngeo.CreateGeoJSONBloodhound;


/**
 * @param {BloodhoundOptions|string} options Bloodhound options or a URL to the
 *     search service. If a URL is provided then default Bloodhound options are
 *     used.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter function to filter
 * results.
 * @param {ol.proj.Projection=} opt_featureProjection Feature projection.
 * @param {ol.proj.Projection=} opt_dataProjection Data projection.
 * @return {Bloodhound} The Bloodhound object.
 */
ngeo.createGeoJSONBloodhound = function(options, opt_filter,
    opt_featureProjection, opt_dataProjection) {
  var geojsonFormat = new ol.format.GeoJSON();
  var bloodhoundOptions = /** @type {BloodhoundOptions} */ ({
    remote: {
      url: goog.isString(options) ? options : '',
      prepare: function(query, settings) {
        settings.url = settings.url.replace('%QUERY', query);
        settings.dataType = 'jsonp';
        return settings;
      },
      transform: function(parsedResponse) {
        /** @type {GeoJSONFeatureCollection} */
        var featureCollection = /** @type {GeoJSONFeatureCollection} */
            (parsedResponse);
        if (goog.isDef(opt_filter)) {
          featureCollection = /** @type {GeoJSONFeatureCollection} */ ({
            type: 'FeatureCollection',
            features: goog.array.filter(featureCollection.features, opt_filter)
          });
        }

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
