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

/* global google */
import {StreetviewService} from './Service';

/**
 * Service for streetview functionality with Google Street View
 */
export default class GoogleStreetviewService extends StreetviewService {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {?import('ol/Map').default} map The map
   * @param {(newCoordinates: import('ol/coordinate').Coordinate | null) => void}handlePanoramaPositionChange Position change handler
   * @param {number} radius The radius
   * @param {JQuery} $element Element
   * @ngInject
   */
  constructor($scope, map, handlePanoramaPositionChange, radius, $element) {
    super($scope, map, handlePanoramaPositionChange);

    /**
     * radius for which images are searched
     *
     * @type {number}
     * @private
     */
    this.radius_ = radius;

    /**
     * @type {google.maps.StreetViewService}
     * @private
     */
    this.streetViewService_ = new google.maps.StreetViewService();

    /**
     * @type {google.maps.StreetViewPanorama}
     * @private
     */
    this.panorama_ = new google.maps.StreetViewPanorama($element[0], {
      pov: {
        heading: 0,
        pitch: 0,
      },
      visible: false,
      zoom: 1,
    });

    /**
     * @type {?google.maps.MapsEventListener}
     * @private
     */
    this.panoramaListener_ = null;
  }

  /**
   * Called when the panorama position changes. Update the location.
   *
   * @private
   */
  positionChange_() {
    const position = this.panorama_.getPosition();
    const newCoordinates = this.fromLonLat_([position.lng(), position.lat()]);
    super.panoramaPositionChange(newCoordinates);
  }

  /**
   * @param {?google.maps.StreetViewPanoramaData} data Data.
   * @param {google.maps.StreetViewStatus} status Status.
   * @private
   */
  handleStreetViewServiceGetPanorama_(data, status) {
    if (!data) {
      this.noDataAtLocation = true;
      this.scope_.$apply();
      return;
    }
    if (!data.location) {
      throw new Error('Missing data.location');
    }
    if (!data.location.latLng) {
      throw new Error('Missing data.location.latLng');
    }
    const panorama = this.panorama_;

    if (status === google.maps.StreetViewStatus.OK) {
      this.noDataAtLocation = false;
      panorama.setPosition(data.location.latLng);
    } else {
      this.noDataAtLocation = true;
    }

    this.scope_.$apply();
  }

  /**
   * Get image for the given location.
   *
   * @param {import('ol/coordinate').Coordinate} coordinates Map view projection coordinates.
   */
  getPanorama(coordinates) {
    const lonLat = this.toLonLat_(coordinates);
    this.streetViewService_.getPanorama(
      {
        location: {
          lat: lonLat[1],
          lng: lonLat[0],
        },
        radius: this.radius_,
      },
      this.handleStreetViewServiceGetPanorama_.bind(this)
    );
  }

  /**
   * Toggle visibility of streetview / add or remove its listener
   *
   * @param {boolean} show If the streetview is to show
   */
  toggleShow(show) {
    this.panorama_.setVisible(show);

    if (show) {
      this.panoramaListener_ = google.maps.event.addListener(
        this.panorama_,
        'position_changed',
        this.positionChange_.bind(this)
      );
    } else if (this.panoramaListener_) {
      google.maps.event.removeListener(this.panoramaListener_);
      this.panoramaListener_ = null;
    }
  }
}
