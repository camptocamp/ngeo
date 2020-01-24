import GeoJSON from 'ol/format/GeoJSON.js';
import Autocomplete from '@trevoreyre/autocomplete-js';


/**
 * @typedef {Object} SearchOptions
 * @property {HTMLElement} container
 * @property {string} url
 * @property {import("ol/source/Vector").default<any>} source
 * @property {import("ol/View").default} view
 */

export default class Search {

  /**
   * @param {SearchOptions} options API options.
   */
  constructor(options) {

    this.format_ = new GeoJSON();

    this.url_ = new URL(options.url);

    this.source_ = options.source;

    this.view_ = options.view;

    const input = document.createElement('input');
    input.className = 'api-search-input';
    const ul = document.createElement('ul');
    ul.className = 'api-search-results';

    options.container.append(input, ul);

    this.autocomplete_ = new Autocomplete(options.container, {
      search: this.search_.bind(this),
      getResultValue: this.getResultValue_.bind(this),
      onSubmit: this.onSubmit_.bind(this)
    });
  }

  /**
   * @param {string} input
   */
  search_(input) {
    return new Promise(resolve => {
      if (input.length >= 1) {
        this.url_.searchParams.set('query', input);
        fetch(this.url_.href)
          .then(response => response.json())
          .then(collection => collection.features)
          .then(features => resolve(features.filter(this.hasGeometry_)));
      } else {
        resolve([]);
      }
    });
  }

  /**
   * @param {import("geojson").Feature} feature
   */
  hasGeometry_(feature) {
    return feature.geometry !== null;
  }

  /**
   * @param {import("geojson").Feature} result
   */
  getResultValue_(result) {
    return result.properties.label;
  }

  /**
   * @param {import("geojson").Feature} result
   */
  onSubmit_(result) {
    this.source_.clear();
    const feature = this.format_.readFeature(result);
    this.source_.addFeature(feature);
    this.view_.fit(this.source_.getExtent());
  }

}
