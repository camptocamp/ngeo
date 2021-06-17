// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import {appendParams as olUriAppendParams} from 'ol/uri.js';

/**
 * @typedef {Object} ComparisonFilter
 * @property {string} property The type of operator for the comparison filter.
 * @property {string} operator The name of the property for the comparison filter.
 * @property {string} value The value for the comparison filter that must match the combinaison of
 * the operator and property.
 */

/**
 * Service that provides methods to get, insert, update and delete vector
 * features with the use of a GeoMapFish Protocol as back-end.
 *
 * The GeoJSON format is used when obtaining or sending features.
 *
 * @class
 * @param {angular.IHttpService} $http Angular http service.
 * @param {string} gmfLayersUrl URL to the GeoMapFish layers service.
 * @ngInject
 * @hidden
 */
export function EditingEditFeature($http, gmfLayersUrl) {
  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * URL to the GeoMapFish layers service. Required in applications that use:
   * - the editfeature tools
   * - the objectediting tools
   *
   * @type {string}
   */
  this.baseUrl_ = gmfLayersUrl;
}

/**
 * Build a query to the MapFish protocol to fetch features from a list
 * of layer ids inside a specified extent.
 *
 * @param {number[]} layerIds List of layer ids to get the features from.
 * @param {import("ol/extent.js").Extent} extent The extent where to get the features from.
 * @return {angular.IPromise<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>[]>} Promise.
 */
EditingEditFeature.prototype.getFeaturesInExtent = function (layerIds, extent) {
  const url = olUriAppendParams(`${this.baseUrl_}/${layerIds.join(',')}`, {
    'bbox': extent.join(','),
  });
  return this.http_
    .get(url)
    .then(
      (response) =>
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (
          new olFormatGeoJSON().readFeatures(response.data)
        )
    );
};

/**
 * Build a query to the MapFish protocol to fetch features from a list
 * of layer ids and a list of comparison filters.
 *
 * This method is called in the ObjectEditing service, which is injected in
 * the permalink service, i.e. it's always called. Since we don't have to
 * define the url to the GMF Protocol (layers) a dummy promise returns an
 * empty array of features if the url is not defined.
 *
 * @param {string[]} layerIds List of layer ids to get the features from.
 * @param {ComparisonFilter[]} filters List of comparison filters
 * @return {angular.IPromise<import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>[]>} Promise.
 */
EditingEditFeature.prototype.getFeaturesWithComparisonFilters = function (layerIds, filters) {
  const properties = [];
  /** @type {Object<string, string>} */
  const params = {};

  for (const filter of filters) {
    params[`${filter.property}__${filter.operator}`] = filter.value;
    properties.push(filter.property);
  }

  params.queryable = properties.join(',');

  const url = olUriAppendParams(`${this.baseUrl_}/${layerIds.join(',')}`, params);

  return this.http_
    .get(url)
    .then(
      (response) =>
        /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (
          new olFormatGeoJSON().readFeatures(response.data)
        )
    );
};

/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>[]} features List of features to insert.
 * @return {angular.IHttpPromise<ArrayBuffer|Document|Node|string>} Promise.
 */
EditingEditFeature.prototype.insertFeatures = function (layerId, features) {
  const url = `${this.baseUrl_}/${layerId}`;
  const geoJSON = new olFormatGeoJSON().writeFeatures(features);
  return this.http_.post(url, geoJSON, {
    headers: {'Content-Type': 'application/geo+json'},
    withCredentials: true,
  });
};

/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>} feature The feature to update.
 * @return {angular.IHttpPromise<ArrayBuffer|Document|Node|string>} Promise.
 */
EditingEditFeature.prototype.updateFeature = function (layerId, feature) {
  const url = `${this.baseUrl_}/${layerId.toString()}/${feature.getId()}`;
  const geoJSON = new olFormatGeoJSON().writeFeature(feature);
  return this.http_.put(url, geoJSON, {
    headers: {'Content-Type': 'application/geo+json'},
    withCredentials: true,
  });
};

/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {import("ol/Feature.js").default<import("ol/geom/Geometry.js").default>} feature The feature to delete.
 * @return {angular.IHttpPromise<ArrayBuffer|Document|Node|string>} Promise.
 */
EditingEditFeature.prototype.deleteFeature = function (layerId, feature) {
  const url = `${this.baseUrl_}/${layerId.toString()}/${feature.getId()}`;
  return this.http_.delete(url, {
    withCredentials: true,
  });
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfEditFeature', []);
myModule.service('gmfEditFeature', EditingEditFeature);

export default myModule;
