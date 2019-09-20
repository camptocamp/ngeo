/* global google */

import angular from 'angular';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import * as olArray from 'ol/array.js';
import {listen, unlistenByKey} from 'ol/events.js';
import * as olProj from 'ol/proj.js';
import olFeature from 'ol/Feature.js';
import olGeomPoint from 'ol/geom/Point.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoGooglestreetview', [
  ngeoMapFeatureOverlayMgr.name
]);


module.value('ngeoGooglestreetviewTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoGooglestreetviewTemplateUrl;
    return templateUrl !== undefined ? templateUrl :
      'ngeo/googlestreetview';
  });


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/googlestreetview', require('./component.html'));
  });


/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoGooglestreetviewTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoGooglestreetviewTemplateUrl($attrs, ngeoGooglestreetviewTemplateUrl) {
  return ngeoGooglestreetviewTemplateUrl($attrs);
}


/**
 * Example:
 *
 *             <ngeo-googlestreetview
 *                 active="mainCtrl.googleStreetViewActive"
 *                 feature-style="mainCtrl.googleStreetViewStyle"
 *                 map="mainCtrl.map">
 *             </ngeo-googlestreetview>
 */
class GoogleStreetviewController {

  /**
   * @param {JQuery} $element Element.
   * @param {angular.IScope} $scope Scope.
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo
   *    FeatureOverlay manager.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoGooglestreetviewController
   */
  constructor($element, $scope, ngeoFeatureOverlayMgr) {

    // Binding properties

    /**
     * @type {boolean}
     */
    this.active = false;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );

    /**
     * Style for the feature.
     * @type {?import("ol/style/Style.js").StyleLike}
     */
    this.featureStyle = null;

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * @type {number}
     */
    this.radius = -1;


    // Injected properties

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;


    // Inner properties

    /**
     * @type {olFeature<import("ol/geom/Geometry.js").default>}
     * @private
     */
    this.feature_ = new olFeature();

    /**
     * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
     * @private
     */
    this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The current location in the OpenLayers' map view projection.
     * @type {?import("ol/coordinate.js").Coordinate}
     * @private
     */
    this.location = null;

    /**
     * Flag that determines whether there's data at a given location or not.
     * @type {boolean}
     */
    this.noDataAtLocation = false;

    /**
     * @type {google.maps.StreetViewPanorama}
     * @private
     */
    this.panorama_ = new google.maps.StreetViewPanorama(
      $element[0],
      {
        pov: {
          heading: 0,
          pitch: 0
        },
        visible: false,
        zoom: 1
      }
    );

    /**
     * @type {?google.maps.MapsEventListener}
     * @private
     */
    this.panoramaListener_ = null;

    /**
     * @type {import("ol/geom/Point.js").default}
     * @private
     */
    this.point_ = new olGeomPoint([0, 0]);

    this.feature_.setGeometry(this.point_);

    /**
     * @type {google.maps.StreetViewService}
     * @private
     */
    this.streetViewService_ = new google.maps.StreetViewService();

    /**
     * @type {boolean}
     * @private
     */
    this.panoramaPositionChanging_ = false;
  }

  /**
   * Called on initialization of the controller.
   */
  $onInit() {

    // === Watchers ===

    // (1) Watch for any change in the location
    this.scope_.$watch(
      () => this.location,
      this.handleLocationChange_.bind(this)
    );

    // (2) Watch for both the active and location. When we have both, the
    //     state is considered 'ready'.
    this.scope_.$watch(
      () => {
        const isActive = this.active;
        const hasLocation = this.location !== null;
        return isActive && hasLocation;
      },
      this.handleReadyChange_.bind(this)
    );

    // (3) Watcher to manage the visibility of the panorama.
    this.scope_.$watch(
      () => {
        const isActive = this.active;
        const hasLocation = this.location !== null;
        const hasData = this.noDataAtLocation === false;
        return isActive && hasLocation && hasData;
      },
      (show, oldShow) => {
        if (show === oldShow) {
          return;
        }

        this.panorama_.setVisible(show);

        if (show) {
          this.panoramaListener_ = google.maps.event.addListener(
            this.panorama_,
            'position_changed',
            this.handlePanoramaPositionChange_.bind(this)
          );
        } else if (this.panoramaListener_) {
          google.maps.event.removeListener(this.panoramaListener_);
          this.panoramaListener_ = null;
        }
      }
    );


    // Other initialization
    if (this.featureStyle) {
      this.feature_.setStyle(this.featureStyle);
    }

  }

  /**
   * Called when the 'active' property of this component changes.
   * @param {boolean} active Active.
   * @private
   */
  handleActiveChange_(active) {
    if (!this.map) {
      throw new Error('Missing map');
    }

    const keys = this.listenerKeys_;

    if (active) {
      keys.push(listen(this.map, 'click', this.handleMapClick_, this));
    } else {
      keys.forEach(unlistenByKey);
      keys.length = 0;
    }
  }

  /**
   * Called when the 'location' property of this component changes.
   * @param {?import("ol/coordinate.js").Coordinate} location Location, in OL map view projection.
   * @param {?import("ol/coordinate.js").Coordinate} oldLocation The previous location.
   * @private
   */
  handleLocationChange_(location, oldLocation) {

    // (1) No need to do anything if the old value equals the new value
    if (location === oldLocation || (
      Array.isArray(location) && Array.isArray(oldLocation) &&
        olArray.equals(location, oldLocation)
    )) {
      return;
    }

    // (2) Update point coordinates
    this.point_.setCoordinates(location);

    // (3) Update StreetView location
    if (location && !this.panoramaPositionChanging_) {
      const lonLat = this.toLonLat_(location);
      this.streetViewService_.getPanorama({
        location: {
          lat: lonLat[1],
          lng: lonLat[0]
        },
        radius: this.radius
      }, this.handleStreetViewServiceGetPanorama_.bind(this));
    }
  }

  /**
   * Called when the map is clicked while this component is active. Update the
   * location accordingly.
   * @param {Event|import('ol/events/Event.js').default} evt The map browser event being fired.
   * @private
   */
  handleMapClick_(evt) {
    if (evt instanceof MapBrowserEvent) {
      this.location = evt.coordinate;
      this.scope_.$apply();
    }
  }

  /**
   * Called when the component 'virtual ready' state changes.
   *
   * When ready:
   *  - add the feature to the overlay
   *
   * When not ready:
   *  - remove the feature from the overlay
   *
   * @param {boolean} ready Whether the component is ready or not.
   * @param {boolean} oldReady Previous ready value.
   * @private
   */
  handleReadyChange_(ready, oldReady) {

    if (ready === oldReady) {
      return;
    }

    if (ready) {
      this.featureOverlay_.addFeature(this.feature_);
    } else {
      this.featureOverlay_.removeFeature(this.feature_);
    }
  }

  /**
   * @param {?google.maps.StreetViewPanoramaData} data Data.
   * @param {google.maps.StreetViewStatus} status Status.
   * @private
   */
  handleStreetViewServiceGetPanorama_(data, status) {
    if (!data) {
      throw new Error('Missing data');
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
   * Called when the panorama position changes. Update the location.
   * @private
   */
  handlePanoramaPositionChange_() {
    this.panoramaPositionChanging_ = true;
    const position = this.panorama_.getPosition();
    const lonLat = [position.lng(), position.lat()];
    const location = this.fromLonLat_(lonLat);
    this.location = location;
    this.scope_.$apply();
    this.panoramaPositionChanging_ = false;
  }


  // Utility methods

  /**
   * @param {import("ol/coordinate.js").Coordinate} lonLat LonLat coordinate.
   * @return {import("ol/coordinate.js").Coordinate} Map view projection coordinate.
   */
  fromLonLat_(lonLat) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    return olProj.fromLonLat(lonLat, this.map.getView().getProjection());
  }

  /**
   * @param {import("ol/coordinate.js").Coordinate} coordinate Map view projection coordinate.
   * @return {import("ol/coordinate.js").Coordinate} LonLat coordinate.
   */
  toLonLat_(coordinate) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    return olProj.toLonLat(coordinate, this.map.getView().getProjection());
  }
}


module.component('ngeoGooglestreetview', {
  bindings: {
    'active': '<',
    'featureStyle': '<?',
    'map': '<',
    'radius': '<?'
  },
  controller: GoogleStreetviewController,
  templateUrl: ngeoGooglestreetviewTemplateUrl
});


export default module;
