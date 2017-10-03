/**
 * @module ngeo location search namespace
 */
goog.provide('ngeo.search.createLocationSearchBloodhound');

goog.require('ol.obj');
goog.require('ol.proj');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.geom.Point');
goog.require('ol.Feature');


/**
 * @param {ngeox.search.LocationSearchOptions=} opt_options Options.
 * @return {Bloodhound} The Bloodhound object.
 */
ngeo.search.createLocationSearchBloodhound = function(opt_options) {
  const options = opt_options || {};

  const sourceProjection = ol.proj.get('EPSG:21781');
  const targetProjection = options.targetProjection;

  /**
   * @param {string} bbox Bbox string.
   * @return {?ol.Extent} Parsed extent.
   */
  const parseBbox = function(bbox) {
    const regex = /BOX\((.*?) (.*?),(.*?) (.*?)\)/g;
    const match = regex.exec(bbox);
    if (match !== null) {
      return [
        parseFloat(match[1]),
        parseFloat(match[2]),
        parseFloat(match[3]),
        parseFloat(match[4])
      ];
    } else {
      return null;
    }
  };

  const removeHtmlTags = function(label) {
    return label.replace(/<\/?[ib]>/g, '');
  };

  const extractName = function(label) {
    const regex = /<b>(.*?)<\/b>/g;
    const match = regex.exec(label);
    if (match !== null) {
      return match[1];
    } else {
      return label;
    }
  };

  const bloodhoundOptions = /** @type {BloodhoundOptions} */ ({
    remote: {
      url: 'https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText=%QUERY',
      prepare(query, settings) {
        settings.url = settings.url.replace('%QUERY', query);
        if (options.limit !== undefined) {
          settings.url += `&limit=${options.limit}`;
        }
        if (options.origins !== undefined) {
          settings.url += `&origins=${options.origins}`;
        }

        return (options.prepare !== undefined) ?
          options.prepare(query, settings) : settings;
      },
      transform(/** @type{geoAdminx.SearchLocationResponse} */ parsedResponse) {
        const features = parsedResponse.results.map((/** @type{geoAdminx.SearchLocationResult} */ result) => {
          const attrs = result.attrs;

          // note that x and y are switched!
          const point = new ol.geom.Point([attrs.y, attrs.x]);
          let bbox = parseBbox(attrs.geom_st_box2d);
          if (targetProjection !== undefined) {
            point.transform(sourceProjection, targetProjection);
            if (bbox !== null) {
              bbox = ol.proj.transformExtent(bbox, sourceProjection, targetProjection);
            }
          }

          attrs['geometry'] = point;
          attrs['bbox'] = bbox;

          // create a label without HTML tags
          const label = attrs.label;
          attrs['label_no_html'] = removeHtmlTags(label);
          attrs['label_simple'] = extractName(label);

          const feature = new ol.Feature(attrs);
          feature.setId(attrs.featureId);

          return feature;
        });

        return features;
      }
    },
    // datumTokenizer is required by the Bloodhound constructor but it
    // is not used when only a remote is passsed to Bloodhound.
    datumTokenizer: ol.nullFunction,
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });

  // the options objects are cloned to avoid updating the passed object
  const bhOptions = ol.obj.assign({}, options.options || {});
  const remoteOptions = ol.obj.assign({}, options.remoteOptions || {});

  if (bhOptions.remote) {
    // move the remote options to opt_remoteOptions
    ol.obj.assign(remoteOptions, bhOptions.remote);
    delete bhOptions.remote;
  }

  ol.obj.assign(bloodhoundOptions, bhOptions);
  ol.obj.assign(bloodhoundOptions.remote, remoteOptions);

  return new Bloodhound(bloodhoundOptions);
};


/**
 * @type {!angular.Module}
 */
ngeo.search.createLocationSearchBloodhound.module = angular.module('ngeoCreateLocationSearchBloodhound', []);

ngeo.search.createLocationSearchBloodhound.module.value(
  'ngeoCreateLocationSearchBloodhound',
  ngeo.search.createLocationSearchBloodhound);


/**
 * Provides a function that creates a Bloodhound engine
 * for the GeoAdmin Location Search API, which creates `ol.Feature` objects
 * as suggestions.
 *
 * See: http://api3.geo.admin.ch/services/sdiservices.html#search
 *
 * Example:
 *
 *     let bloodhound = ngeoCreateLocationSearchBloodhound({
 *       targetProjection: ol.proj.get('EPSG:3857'),
 *       limit: 10
 *     });
 *     bloodhound.initialize();
 *
 * @typedef {function(ngeox.search.LocationSearchOptions=):Bloodhound}
 * @ngdoc service
 * @ngname search.createLocationSearchBloodhound
 */
ngeo.search.createLocationSearchBloodhound.Function;
