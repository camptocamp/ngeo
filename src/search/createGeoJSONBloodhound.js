/**
 * @module ngeo.search.createGeoJSONBloodhound
 */
import * as olBase from 'ol/index.js';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import * as olObj from 'ol/obj.js';

import 'corejs-typeahead';


/**
 * @param {string} url an URL to a search service.
 * @param {(function(GeoJSONFeature): boolean)=} opt_filter function to filter
 *     results.
 * @param {ol.proj.Projection=} opt_featureProjection Feature projection.
 * @param {ol.proj.Projection=} opt_dataProjection Data projection.
 * @param {BloodhoundOptions=} opt_options optional Bloodhound options. If
 *     undefined, the default Bloodhound config will be used.
 * @param {BloodhoundRemoteOptions=} opt_remoteOptions optional Bloodhound
 * remote options. Effective only if `remote` is not defined in `opt_options`.
 * @return {Bloodhound} The Bloodhound object.
 */
const exports = function(url, opt_filter, opt_featureProjection,
  opt_dataProjection, opt_options, opt_remoteOptions) {
  const geojsonFormat = new olFormatGeoJSON();
  const bloodhoundOptions = /** @type {BloodhoundOptions} */ ({
    remote: {
      url,
      prepare(query, settings) {
        settings.url = settings.url.replace('%QUERY', query);
        return settings;
      },
      transform(parsedResponse) {
        /** @type {GeoJSONFeatureCollection} */
        let featureCollection = /** @type {GeoJSONFeatureCollection} */
            (parsedResponse);
        if (opt_filter !== undefined) {
          featureCollection = /** @type {GeoJSONFeatureCollection} */ ({
            type: 'FeatureCollection',
            features: featureCollection.features.filter(opt_filter)
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
    datumTokenizer: olBase.nullFunction,
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });

  // the options objects are cloned to avoid updating the passed object
  const options = olObj.assign({}, opt_options || {});
  const remoteOptions = olObj.assign({}, opt_remoteOptions || {});

  if (options.remote) {
    // move the remote options to opt_remoteOptions
    olObj.assign(remoteOptions, options.remote);
    delete options.remote;
  }

  olObj.assign(bloodhoundOptions, options);
  olObj.assign(bloodhoundOptions.remote, remoteOptions);

  return new Bloodhound(bloodhoundOptions);
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoSearchCreategeojsonbloodhound', []);

exports.module.value(
  'ngeoSearchCreateGeoJSONBloodhound',
  exports);


/**
 * Provides a function that creates a Bloodhound engine
 * expecting GeoJSON responses from the search web service, which creates
 * `ol.Feature` objects as suggestions.
 *
 * Example:
 *
 *     let bloodhound = createGeoJSONBloodhound(
 *       'http://example.com/fulltextsearch?query=%QUERY',
 *       aFilterFunction,
 *       ol.proj.get('EPSG:3857'));
 *     bloodhound.initialize();
 *
 *     let bloodhound = createGeoJSONBloodhound(
 *       '',
 *       undefined,
 *       ol.proj.get('EPSG:3857'),
 *       ol.proj.get('EPSG:21781'),
 *       {
 *         remote: {
 *           url: mySearchEngineUrl,
 *           replace: function(url, query) {
 *             return url +
 *                 '?qtext=' + encodeURIComponent(query) +
 *                 '&lang=' + gettextCatalog.currentLanguage;
 *           }
 *         }
 *       }
 *     );
 *     bloodhound.initialize();
 *
 * @typedef {function(string, (function(GeoJSONFeature): boolean)=,
 * ol.proj.Projection=, ol.proj.Projection=, BloodhoundOptions=,
 * BloodhoundRemoteOptions=):Bloodhound}
 * @ngdoc service
 * @ngname search.createGeoJSONBloodhound
 */
exports.Function;


export default exports;
