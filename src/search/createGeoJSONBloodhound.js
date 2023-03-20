/* global Bloodhound */

import angular from 'angular';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';

import 'corejs-typeahead';

/**
 * @param {string} url an URL to a search service.
 * @param {(function(GeoJSON.Feature): boolean)=} opt_filter function to filter results.
 * @param {import("ol/proj/Projection.js").default=} opt_featureProjection Feature projection.
 * @param {import("ol/proj/Projection.js").default=} opt_dataProjection Data projection.
 * @param {Bloodhound.BloodhoundOptions=} opt_options optional Bloodhound options. If
 *     undefined, the default Bloodhound config will be used.
 * @param {Bloodhound.RemoteOptions=} opt_remoteOptions optional Bloodhound
 * remote options. Effective only if `remote` is not defined in `opt_options`.
 * @return {Bloodhound} The Bloodhound object.
 * @hidden
 */
export function createGeoJSONBloodhound(
  url,
  opt_filter,
  opt_featureProjection,
  opt_dataProjection,
  opt_options,
  opt_remoteOptions
) {
  const geojsonFormat = new olFormatGeoJSON();
  const bloodhoundOptions = /** @type {Bloodhound.BloodhoundOptions} */ ({
    remote: {
      url,
      prepare(query, settings) {
        settings.url = settings.url.replace('%QUERY', query);
        return settings;
      },
      transform(parsedResponse) {
        /** @type {GeoJSON.FeatureCollection} */
        let featureCollection = parsedResponse;
        if (opt_filter !== undefined) {
          featureCollection = {
            type: 'FeatureCollection',
            features: featureCollection.features.filter(opt_filter),
          };
        }

        return geojsonFormat.readFeatures(featureCollection, {
          featureProjection: opt_featureProjection,
          dataProjection: opt_dataProjection,
        });
      },
    },
    // datumTokenizer is required by the Bloodhound constructor but it
    // is not used when only a remote is passsed to Bloodhound.
    datumTokenizer: (datum) => {
      return [];
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
  });

  // The options objects are cloned to avoid updating the passed object
  /** @type {Bloodhound.BloodhoundOptions} */
  const options = Object.assign(
    {},
    opt_options || {
      datumTokenizer: (datum) => {
        return [];
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
    }
  );
  /** @type {Bloodhound.RemoteOptions} */
  const remoteOptions = Object.assign(
    {},
    opt_remoteOptions || {
      url: '',
    }
  );

  if (options.remote) {
    // Move the remote options to opt_remoteOptions
    Object.assign(remoteOptions, options.remote);
    delete options.remote;
  }

  Object.assign(bloodhoundOptions, options);
  Object.assign(bloodhoundOptions.remote, remoteOptions);

  return new Bloodhound(bloodhoundOptions);
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoSearchCreategeojsonbloodhound', []);

module.value('ngeoSearchCreateGeoJSONBloodhound', createGeoJSONBloodhound);

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
 * @typedef {function(string, (function(import("geojson").Feature): boolean)=, import("ol/proj/Projection.js").default=, import("ol/proj/Projection.js").default=, Bloodhound.Options=, Bloodhound.RemoteOptions=):Bloodhound}
 */

export default module;
