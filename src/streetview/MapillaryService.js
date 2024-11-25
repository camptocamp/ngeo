// The MIT License (MIT)
//
// Copyright (c) 2021-2024 Camptocamp SA
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
import {StreetviewService} from './Service';
import MapillaryGraphQueryCreator from './MapillaryGraphQueryCreator';
import {buffer} from 'ol/extent';
const MLY_METADATA_ENDPOINT = 'https://graph.mapillary.com';

/**
 * Service for streetview functionality with Mapillary
 */
export default class MapillaryService extends StreetviewService {
  /**
   * @param {angular.IScope} $scope Angular Scope.
   * @param {angular.ITimeoutService} $timeout Angular $timeout.
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {?import('ol/Map').default} map The map.
   * @param {(newCoordinates: import('ol/coordinate').Coordinate | null) => void} handlePanoramaPositionChange Position change handler.
   * @param {string} accessToken The key to access the mapillary api.
   * @param {number} bufferSize The size to add to the bbox buffer.
   * @param {string} organizationId The id of the organization to get images from.
   */
  constructor(
    $scope,
    $timeout,
    $http,
    map,
    handlePanoramaPositionChange,
    accessToken,
    bufferSize,
    organizationId,
  ) {
    super($scope, map, handlePanoramaPositionChange);

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * Angular $http service.
     *
     * @private
     */
    this.$http_ = $http;

    /**
     * The key to access the mapillary api.
     *
     * @private
     */
    this.accessToken_ = accessToken;

    /**
     * The size of the buffer (in pixel) to add to the coordinate points to create the request bbox.
     *
     * @private
     */
    this.bufferSizePx_ = bufferSize || 10;

    /**
     * The organization to get images from (filter images by organisation_id).
     *
     * @private
     */
    this.organizationId = organizationId;

    /**
     * Container of the mapillary viewer.
     */
    this.mapillaryElement = document.getElementById('mly');
    this.mapillaryElement.hidden = true;
    import(/* webpackChunkName: "mapillary" */ 'mapillary-js').then((Mapillary) => {
      const viewerOptions = {
        accessToken: this.accessToken_,
        container: 'mly',
        component: {
          cover: false,
          sequence: {
            visible: false,
          },
        },
      };

      if (this.organizationId) {
        const queryCreator = new MapillaryGraphQueryCreator(this.organizationId);

        const dataProvider = new Mapillary.GraphDataProvider(
          {
            accessToken: this.accessToken_,
          },
          undefined,
          undefined,
          queryCreator,
        );
        viewerOptions.dataProvider = dataProvider;
      }

      this.Mapillary = Mapillary;
      this.mly = new Mapillary.Viewer(viewerOptions);

      window.addEventListener('resize', () => {
        this.resize();
      });
    });

    /**
     * @param {import('mapillary-js/src/viewer/events/ViewerImageEvent').ViewerImageEvent} evt
     */
    this.mapillaryEventHandler_ = (evt) => {
      const coordinates = evt.image.originalLngLat;
      const newCoordinates = this.fromLonLat_([coordinates.lng, coordinates.lat]);
      super.panoramaPositionChange(newCoordinates);
      this.mly.resize();
    };
  }

  /**
   * Resize the image.
   */
  resize() {
    if (this.mly) {
      this.$timeout_(() => {
        this.mly.resize();
      }, 20);
    }
  }

  /**
   * Get image for the given location.
   *
   * @param {import('ol/coordinate').Coordinate} coordinates Map view projection coordinates.
   */
  getPanorama(coordinates) {
    // 1. Get the map resolution
    const view = this.map_.getView();
    const resolution = view.getResolution(); // map unit (m) per pixel

    // 2. Calculate the buffer for tolerance in meter
    const bufferSizeInMeters = this.bufferSizePx_ * resolution;

    // 3. Create a buffer from coordinate points in EPSG:2056 (meter units)
    const coord_easting = coordinates[0];
    const coord_northing = coordinates[1];
    const bufferAreaInMeter = buffer(
      [coord_easting, coord_northing, coord_easting, coord_northing],
      bufferSizeInMeters,
    );

    // 4. Convert the buffer to WSG:84 (° units) and use it for the image request bbox
    const bbox = this.extentToLonLat_(bufferAreaInMeter);
    this.searchImage_(bbox).then(
      /**
       * @param {string} imageId
       */
      (imageId) => {
        this.noDataAtLocation = !imageId;
      },
      () => {
        // On error
        this.noDataAtLocation = true;
      },
    );
  }

  /**
   * Toggle visibility of streetview / add or remove its event handler
   *
   * @param {boolean} show If the streetview is to show
   */
  toggleShow(show) {
    if (show) {
      this.mly.on('image', this.mapillaryEventHandler_);
    } else {
      this.mly.off('image', this.mapillaryEventHandler_);
    }
    this.mapillaryElement.hidden = !show;
  }

  /**
   * @param {import("ol/extent.js").Extent} bbox A bounding box in LatLong projection
   * @returns {angular.IPromise<string>} Promise with the first imageId found or null.
   * @private
   */
  searchImage_(bbox) {
    const baseUrl = `${MLY_METADATA_ENDPOINT}/images`;
    const params = new URLSearchParams([
      ['access_token', this.accessToken_],
      ['fields', 'id'],
      ['bbox', bbox],
      ['limit', '1'],
    ]);
    if (this.organizationId) {
      params.append('organization_id', this.organizationId);
    }
    const path = `${baseUrl}?${params.toString()}`;
    return this.$http_.get(path).then(
      /**
       * @param {any} response object.
       */
      (response) => {
        const firstImage = response.data.data[0];
        if (!firstImage) {
          return null;
        }
        const imageId = firstImage['id'];
        this.mly.moveTo(imageId);
        return imageId;
      },
      /**
       * @param {any} error object.
       */
      (error) => {
        console.error(error);
        return null;
      },
    );
  }
}
MapillaryService.$inject = [
  '$scope',
  '$timeout',
  '$http',
  'map',
  'handlePanoramaPositionChange',
  'accessToken',
  'bufferSize',
];
