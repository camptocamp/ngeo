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
import 'mapillary-js/dist/mapillary.min.css';

/**
 * Service for streetview functionality with Mapillary
 */
export default class MapillaryService extends StreetviewService {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {?import('ol/Map').default} map The map
   * @param {(newCoordinates: import('ol/coordinate').Coordinate | null) => void} handlePanoramaPositionChange Position change handler
   * @param {string} clientId The key to access the mapillary api
   * @ngInject
   */
  constructor($scope, map, handlePanoramaPositionChange, clientId) {
    super($scope, map, handlePanoramaPositionChange);
    const config = {
      component: {
        cover: false,
        sequence: {
          visible: false,
        },
      },
    };
    this.mapillaryElement = document.getElementById('mly');
    this.mapillaryElement.hidden = true;

    import(/* webpackChunkName: "mapillary" */ 'mapillary-js/src/Mapillary').then((Mapillary) => {
      this.Mapillary = Mapillary;

      this.mly = new Mapillary.Viewer('mly', clientId, null, config);
      window.addEventListener('resize', () => {
        this.mly.resize();
      });
    });

    /**
     * @param {import('mapillary-js/src/graph/Node').default} node
     */
    this.mapillaryEventHandler_ = (node) => {
      const newCoordinates = this.fromLonLat_([node.originalLatLon.lon, node.originalLatLon.lat]);
      super.panoramaPositionChange(newCoordinates);
      this.mly.resize();
    };
  }

  /**
   * Resize the image.
   */
  resize() {
    if (this.mly) {
      this.mly.resize();
    }
  }

  /**
   * Get image for the given location.
   * @param {import('ol/coordinate').Coordinate} coordinates Map view projection coordinates.
   */
  getPanorama(coordinates) {
    const lonLat = this.toLonLat_(coordinates);
    this.mly.moveCloseTo(lonLat[1], lonLat[0]).then(
      /**
       * @param {any} node
       */
      (node) => {
        this.noDataAtLocation = false;
        this.scope_.$apply();
      },
      /**
       * @param {any} error
       */
      (error) => {
        this.noDataAtLocation = true;
        this.scope_.$apply();
      }
    );
  }

  /**
   * Toggle visibility of streetview / add or remove its event handler
   * @param {boolean} show If the streetview is to show
   */
  toggleShow(show) {
    if (show) {
      this.mly.on(this.Mapillary.Viewer.nodechanged, this.mapillaryEventHandler_);
    } else {
      this.mly.off(this.Mapillary.Viewer.nodechanged, this.mapillaryEventHandler_);
    }
    this.mapillaryElement.hidden = !show;
  }
}
