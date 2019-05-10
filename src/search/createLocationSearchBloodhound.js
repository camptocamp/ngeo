/* global Bloodhound */

import angular from 'angular';
import * as olProj from 'ol/proj.js';

import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import olGeomPoint from 'ol/geom/Point.js';
import olFeature from 'ol/Feature.js';

import 'corejs-typeahead';


/**
 * @typedef {Object} Item
 * @property {string} label
 * @property {string} label_no_html
 * @property {string} label_simple
 * @property {string} featureId
 * @property {number} x
 * @property {number} y
 * @property {string} geom_st_box2d
 * @property {olGeomPoint} geometry
 * @property {?number[]} bbox
 */


/**
 * @typedef {Object} Result
 * @property {Item} attrs
 */


/**
 * @typedef {Object} Results
 * @property {Result[]} results
 */


/**
 * @typedef {Object} LocationSearchOptions
 * @property {number} [limit=50] The maximum number of results to retrieve per request.
 * @property {string} [origins] A comma separated list of origins.
 * Possible origins are: zipcode,gg25,district,kantone,gazetteer,address,parcel
 * Per default all origins are used.
 * @property {import('ol/proj/Projection').default} [targetProjection] Target projection.
 * @property {Bloodhound.BloodhoundOptions<Results>} [options] Optional Bloodhound options. If `undefined`,
 * the default Bloodhound config will be used.
 * @property {Bloodhound.RemoteOptions<Results>} [remoteOptions] Optional Bloodhound remote options.
 * Only used if `remote` is not defined in `options`.
 * @property {function(string, JQueryAjaxSettings): JQueryAjaxSettings} [prepare] Optional function to
 * prepare the request.
 */


/**
 * @param {LocationSearchOptions=} opt_options Options.
 * @return {Bloodhound<olFeature<import('ol/geom/Geometry.js').default>[]>} The Bloodhound object.
 * @private
 * @hidden
 */
function createLocationSearchBloodhound(opt_options) {
  /** @type {LocationSearchOptions} */
  const options = opt_options || {};

  const sourceProjection = olProj.get(EPSG21781);
  const targetProjection = options.targetProjection;

  /**
   * @param {string} bbox Bbox string.
   * @return {?import("ol/extent.js").Extent} Parsed extent.
   */
  const parseBbox = (bbox) => {
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

  /**
   * @param {string} label
   */
  const removeHtmlTags = label => label.replace(/<\/?[ib]>/g, '');

  /**
   * @param {string} label
   */
  const extractName = (label) => {
    const regex = /<b>(.*?)<\/b>/g;
    const match = regex.exec(label);
    if (match !== null) {
      return match[1];
    } else {
      return label;
    }
  };

  /** @type {Bloodhound.BloodhoundOptions<olFeature<import('ol/geom/Geometry.js').default>[]|Results>} */
  const bloodhoundOptions = {
    remote: {
      url: 'https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText=%QUERY',
      prepare: (query, settings) => {
        if (settings.url) {
          settings.url = settings.url.replace('%QUERY', query);
          if (options.limit !== undefined) {
            settings.url += `&limit=${options.limit}`;
          }
          if (options.origins !== undefined) {
            settings.url += `&origins=${options.origins}`;
          }
        }

        return (options.prepare !== undefined) ? options.prepare(query, settings) : settings;
      },
      transform: (parsedResponse_) => {
        const parsedResponse = /** @type {Results} */(parsedResponse_);
        const features = parsedResponse.results.map((result) => {
          const attrs = result.attrs;

          // note that x and y are switched!
          const point = new olGeomPoint([attrs.y, attrs.x]);
          let bbox = parseBbox(attrs.geom_st_box2d);
          if (targetProjection !== undefined) {
            point.transform(sourceProjection, targetProjection);
            if (bbox !== null) {
              bbox = olProj.transformExtent(bbox, sourceProjection, targetProjection);
            }
          }

          attrs.geometry = point;
          attrs.bbox = bbox;

          // create a label without HTML tags
          const label = attrs.label;
          attrs.label_no_html = removeHtmlTags(label);
          attrs.label_simple = extractName(label);

          const feature = new olFeature(attrs);
          feature.setId(attrs.featureId);

          return feature;
        });

        return features;
      }
    },
    // datumTokenizer is required by the Bloodhound constructor but it
    // is not used when only a remote is passsed to Bloodhound.
    datumTokenizer: (datum) => {
      return [];
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  };

  // The options objects are cloned to avoid updating the passed object
  /** @type {Bloodhound.BloodhoundOptions<Results>} */
  const bhOptions = Object.assign({}, options.options || {
    /**
     * @param {any} datum
     */
    datumTokenizer: (datum) => {
      return [];
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });
  const remoteOptions = Object.assign({}, options.remoteOptions || {});

  if (bhOptions.remote) {
    // Move the remote options to opt_remoteOptions
    Object.assign(remoteOptions, bhOptions.remote);
    delete bhOptions.remote;
  }

  Object.assign(bloodhoundOptions, bhOptions);
  Object.assign(bloodhoundOptions.remote, remoteOptions);

  return /** @type {Bloodhound<olFeature<import('ol/geom/Geometry.js').default>[]>} */(
    new Bloodhound(bloodhoundOptions)
  );
}


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoCreateLocationSearchBloodhound', []);

module.value('ngeoCreateLocationSearchBloodhound', createLocationSearchBloodhound);


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
 * @typedef {function(LocationSearchOptions=):Bloodhound<olFeature<import('ol/geom/Geometry.js').default>[]>}
 * @ngdoc service
 * @ngname search.createLocationSearchBloodhound
 * @private
 */
export function createLocationSearchBloodhoundFunction() {}


export default module;
