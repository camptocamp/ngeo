// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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
import 'mapillary-js/dist/mapillary.css';
import {buffer} from 'ol/extent';

const MLY_METADATA_ENDPOINT = 'https://graph.mapillary.com';

/**
 * Service for streetview functionality with Mapillary
 */
export default class MapillaryService extends StreetviewService {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.ITimeoutService} $timeout
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {?import('ol/Map').default} map The map
   * @param {(newCoordinates: import('ol/coordinate').Coordinate | null) => void} handlePanoramaPositionChange Position change handler
   * @param {string} clientId The key to access the mapillary api
   * @ngInject
   */
  constructor($scope, $timeout, $http, map, handlePanoramaPositionChange, accessToken) {
    super($scope, map, handlePanoramaPositionChange);

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * Angular $http service.
     * @private
     */
    this.$http_ = $http;

    /**
     * The key to access the mapillary api.
     * @private
     */
    this.accessToken_ = accessToken;

    /**
     * Container of the mapillary viewer.
     */
    this.mapillaryElement = document.getElementById('mly');
    this.mapillaryElement.hidden = true;

    import(/* webpackChunkName: "mapillary" */ 'mapillary-js/src/Mapillary').then((Mapillary) => {
      this.Mapillary = Mapillary;

      this.mly = new Mapillary.Viewer({
        accessToken: this.accessToken_,
        container: 'mly',
        component: {
          cover: false,
          sequence: {
            visible: false,
          },
        },
      });
      window.addEventListener('resize', () => {
        this.resize();
      });
    });

    /**
     * @param {import('mapillary-js/src/viewer/events/ViewerImageEvent').ViewerImageEvent} evt
     */
    this.mapillaryEventHandler_ = (evt) => {
      const coordinates = evt.image.computedLngLat;
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
    const [lng, lat] = this.toLonLat_(coordinates);
    this.searchImage_(lng, lat).then(
      /**
       * @param {string} imageId
       */
      (imageId) => {
        this.noDataAtLocation = !imageId;
      },
      () => {
        // On error
        this.noDataAtLocation = true;
      }
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
   * @param {number} lng A longitude value.
   * @param {number} lat A latitude value.
   * @return {angular.IPromise<string>} Promise with the first imageId found or null.
   * @private
   */
  searchImage_(lng, lat) {
    const bbox = buffer([lng, lat, lng, lat], 0.001);
    const baseUrl = `${MLY_METADATA_ENDPOINT}/images`;
    const path = `${baseUrl}?access_token=${this.accessToken_}&fields=id&bbox=${bbox}&limit=1`;
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
      }
    );
  }
}
