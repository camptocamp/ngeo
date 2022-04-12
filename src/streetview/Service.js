// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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

import * as olProj from 'ol/proj.js';

/**
 * Abstract service for streetview
 * @hidden
 */
export class StreetviewService {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {?import("ol/Map.js").default} map The map
   * @param {(newCoordinates: import("ol/coordinate.js").Coordinate | null) => void} handlePanoramePositionChange Position change handler. Executes the necessary changes in the component.
   */
  constructor($scope, map, handlePanoramePositionChange) {
    this.scope_ = $scope;
    this.map_ = map;
    this.handlePanoramaPositionChange_ = handlePanoramePositionChange;
    this.noDataAtLocation = false;
  }

  /**
   * Get image for the given location.
   * @param {import("ol/coordinate.js").Coordinate} coordinates Map view projection coordinates.
   */
  getPanorama(coordinates) {}

  /**
   * Toggle visibility of streetview / add or remove its event handler
   * @param {boolean} show If the streetview is to show
   */
  toggleShow(show) {}

  /**
   * Set new position on the map.
   * @param {import("ol/coordinate.js").Coordinate} newCoordinates array of longitude and latitude.
   */
  panoramaPositionChange(newCoordinates) {
    this.handlePanoramaPositionChange_(newCoordinates);
  }

  // Utility methods

  /**
   * @param {import("ol/coordinate.js").Coordinate} lonLat LonLat coordinate.
   * @return {import("ol/coordinate.js").Coordinate} Map view projection coordinate.
   */
  fromLonLat_(lonLat) {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    return olProj.fromLonLat(lonLat, this.map_.getView().getProjection());
  }

  /**
   * @param {import("ol/coordinate.js").Coordinate} coordinate Map view projection coordinate.
   * @return {import("ol/coordinate.js").Coordinate} LonLat coordinate.
   */
  toLonLat_(coordinate) {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    return olProj.toLonLat(coordinate, this.map_.getView().getProjection());
  }

  /**
   * @param {import("ol/extent.js").Extent} extent Extent in EPSG:2056 to reproject.
   * @return {import("ol/extent.js").Extent} LonLat extent.
   */
  extentToLonLat_(extent) {
    if (!this.map_) {
      throw new Error('Missing map');
    }
    return olProj.transformExtent(
      extent,
      this.map_.getView().getProjection(),
      new olProj.Projection({code: 'EPSG:4326'})
    );
  }
}
