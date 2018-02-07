goog.provide('ngeo.googlestreetview.component');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.map.FeatureOverlayMgr');
goog.require('ol.array');
goog.require('ol.events');
goog.require('ol.proj');
goog.require('ol.Feature');
goog.require('ol.Observable');
goog.require('ol.geom.Point');


/**
 * @type {!angular.Module}
 */
ngeo.googlestreetview.component = angular.module('ngeoGooglestreetview', [
  ngeo.map.FeatureOverlayMgr.module.name
]);

/**
 * @private
 */
ngeo.googlestreetview.component.Controller_ = class {

  /**
   * @param {angular.JQLite} $element Element.
   * @param {!angular.Scope} $scope Scope.
   * @param {!ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
   *     manager.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoGooglestreetviewController
   */
  constructor($element, $scope, ngeoFeatureOverlayMgr) {

    // Binding properties

    /**
     * @type {boolean}
     * @export
     */
    this.active;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );

    /**
     * Style for the feature.
     * @type {ol.style.Style|Array.<ol.style.Style>|
     *     ol.FeatureStyleFunction|ol.StyleFunction|undefined}
     * @export
     */
    this.featureStyle;

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * @type {number|undefined}
     * @export
     */
    this.radius;


    // Injected properties

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;


    // Inner properties

    /**
     * @type {!ol.Feature}
     * @private
     */
    this.feature_ = new ol.Feature();

    /**
     * @type {!ngeo.map.FeatureOverlay}
     * @private
     */
    this.featureOverlay_ = goog.asserts.assert(
      ngeoFeatureOverlayMgr.getFeatureOverlay()
    );

    /**
     * @type {Array.<!ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The current location in the OpenLayers' map view projection.
     * @type {?ol.Coordinate}
     * @private
     */
    this.location = null;

    /**
     * Flag that determines whether there's data at a given location or not.
     * @type {boolean}
     * @export
     */
    this.noDataAtLocation = false;

    /**
     * @type {!google.maps.StreetViewPanorama}
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
     * @type {ol.geom.Point}
     * @private
     */
    this.point_ = new ol.geom.Point([0, 0]);

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

    const keys = this.listenerKeys_;

    if (active) {
      keys.push(
        ol.events.listen(this.map, 'click', this.handleMapClick_, this)
      );
    } else {
      ol.Observable.unByKey(keys);
      keys.length = 0;
    }
  }

  /**
   * Called when the 'location' property of this component changes.
   * @param {?ol.Coordinate} location Location, in OL map view projection.
   * @param {?ol.Coordinate} oldLocation The previous location.
   * @private
   */
  handleLocationChange_(location, oldLocation) {

    // (1) No need to do anything if the old value equals the new value
    if (location === oldLocation || (
      Array.isArray(location) && Array.isArray(oldLocation) &&
        ol.array.equals(location, oldLocation)
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
   * @param {ol.MapBrowserEvent} evt The map browser event being fired.
   * @private
   */
  handleMapClick_(evt) {
    this.location = evt.coordinate;
    this.scope_.$apply();
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
   * @param {google.maps.StreetViewPanoramaData} data Data.
   * @param {google.maps.StreetViewStatus} status Status.
   * @private
   */
  handleStreetViewServiceGetPanorama_(data, status) {

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
   * @param {!ol.Coordinate} lonLat LonLat coordinate.
   * @return {ol.Coordinate} Map view projection coordinate.
   */
  fromLonLat_(lonLat) {
    return ol.proj.fromLonLat(
      lonLat,
      this.map.getView().getProjection()
    );
  }

  /**
   * @param {!ol.Coordinate} coordinate Map view projection coordinate.
   * @return {ol.Coordinate} LonLat coordinate.
   */
  toLonLat_(coordinate) {
    return ol.proj.toLonLat(
      coordinate,
      this.map.getView().getProjection()
    );
  }
};


ngeo.googlestreetview.component.component('ngeoGooglestreetview', {
  bindings: {
    'active': '<',
    'featureStyle': '<?',
    'map': '<',
    'radius': '<?'
  },
  controller: ngeo.googlestreetview.component.Controller_,
  templateUrl: () => `${ngeo.baseModuleTemplateUrl}/googlestreetview/component.html`
});
