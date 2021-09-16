// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService';
import ngeoRoutingNominatimInputComponent from 'ngeo/routing/NominatimInputComponent';
import * as olProj from 'ol/proj';
import olFeature from 'ol/Feature';
import olCollection from 'ol/Collection';
import olSourceVector from 'ol/source/Vector';
import olLayerVector from 'ol/layer/Vector';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olGeomPoint from 'ol/geom/Point';
import olInteractionModify from 'ol/interaction/Modify';
import olInteractionDraw from 'ol/interaction/Draw';
import 'ngeo/sass/font.scss';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoRoutingFeatureComponent', [
  ngeoRoutingNominatimService.name,
  ngeoRoutingNominatimInputComponent.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/routing/routingfeature', require('./routingfeature.html'));
  }
);

myModule.value(
  'ngeoRoutingFeatureTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingFeatureTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingFeatureTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.IQService} $q Angular q service
 * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService service for
 *    Nominatim
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoRoutingFeatureController
 */
export class Controller {
  /**
   * @param {angular.IScope} $scope
   * @param {angular.ITimeoutService} $timeout
   * @param {angular.IQService} $q
   * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService
   */
  constructor($scope, $timeout, $q, ngeoNominatimService) {
    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {import('ngeo/routing/NominatimService').NominatimService}
     * @private
     */
    this.ngeoNominatimService_ = ngeoNominatimService;

    /**
     * @type {?import('ol/Map').default}
     * @private
     */
    this.map = null;

    /**
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     */
    this.feature = null;

    /**
     * @type {string}
     */
    this.featureLabel = '';

    /**
     * @type {string}
     */
    this.fillColor = '';

    /**
     * @type {string}
     */
    this.strokeColor = '';

    /**
     * @type {?function(olFeature<import('ol/geom/Geometry').default>): void}
     */
    this.onChange = null;

    /**
     * @type {import('ol/Collection').default<olFeature<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.vectorFeatures_ = new olCollection();

    /**
     * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
     * @private
     */
    this.vectorSource_ = new olSourceVector({
      features: this.vectorFeatures_,
    });

    /**
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.vectorLayer_ = new olLayerVector({
      source: this.vectorSource_,
      style: (feature, resolution) => {
        return [
          new olStyleStyle({
            text: new olStyleText({
              fill: new olStyleFill({
                color: this.fillColor || '#000000',
              }),
              font: '900 24px "Font Awesome 5 Free"',
              stroke: new olStyleStroke({
                width: 3,
                color: this.strokeColor || '#000000',
              }),
              offsetY: -15,
              text: '\uf041', // map-marker
            }),
          }),
        ];
      },
    });

    /**
     * Interaction for moving start and end.
     *
     * @type {import('ol/interaction/Modify').default}
     * @private
     */
    this.modifyFeature_ = new olInteractionModify({
      features: this.vectorFeatures_,
    });

    /**
     * @type {?import('ol/interaction/Draw').default}
     * @private
     */
    this.draw_ = null;

    /**
     * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} selected Selected result.
     */
    this.onSelect = this.onSelect_.bind(this);

    /**
     * @type {string}
     */
    this.errorMessage = '';
  }

  $onInit() {
    if (!this.map) {
      return;
    }
    this.map.addLayer(this.vectorLayer_);

    // setup modify interaction
    this.modifyFeature_.setActive(true);
    this.map.addInteraction(this.modifyFeature_);

    this.modifyFeature_.on(
      /** @type {import('ol/Observable').EventTypes} */ ('modifyend'),
      /** @type {function(?): ?} */ (
        /**
         * @param {import('ol/interaction/Modify').ModifyEvent} event
         */
        (event) => {
          const feature = event.features.getArray()[0];
          this.vectorSource_.clear();
          this.snapFeature_(/** @type {olFeature<import('ol/geom/Point').default>} */ (feature));
        }
      )
    );

    this.scope_.$watch(
      () => this.feature,
      (newVal, oldVal) => {
        if (newVal) {
          this.onFeatureChange_();
        }
        if (newVal === null) {
          this.vectorSource_.clear();
          this.featureLabel = '';
        }
      }
    );
  }

  /**
   * Cleanup, mostly relevant for vias.
   */
  $onDestroy() {
    if (!this.map) {
      return;
    }
    this.map.removeLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(false);
    this.map.removeInteraction(this.modifyFeature_);
  }

  /**
   */
  set() {
    if (!this.map) {
      return;
    }
    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }

    this.draw_ = new olInteractionDraw({
      features: this.vectorFeatures_,
      type: 'Point',
    });

    this.draw_.on(/** @type {import('ol/Observable').EventTypes} */ ('drawstart'), () => {
      if (this.feature) {
        this.vectorSource_.removeFeature(this.feature);
      }
    });

    this.draw_.on(
      /** @type {import('ol/Observable').EventTypes} */ ('drawend'),
      /** @type {function(?): ?} */ (
        /**
         * @param {import('lib/ol.interaction.Draw').DrawEvent} event
         */
        (event) => {
          if (this.draw_ && this.map) {
            this.map.removeInteraction(this.draw_);
          }
          this.snapFeature_(/** @type {olFeature<import('ol/geom/Point').default>} */ (event.feature));
          this.modifyFeature_.setActive(true);
        }
      )
    );

    this.modifyFeature_.setActive(false);
    this.map.addInteraction(this.draw_);
  }

  /**
   * @param {import('ol/coordinate').Coordinate} coordinate LonLat coordinate.
   * @param {string} label Feature name/label.
   * @private
   */
  setFeature_(coordinate, label) {
    if (!this.map) {
      return;
    }
    const transformedCoordinate = olProj.fromLonLat(coordinate, this.map.getView().getProjection());
    if (label === '') {
      label = transformedCoordinate.join('/');
    }
    this.feature = /** @type {?olFeature<import('ol/geom/Geometry').default>} */ (
      new olFeature({
        geometry: new olGeomPoint(transformedCoordinate),
        name: label,
      })
    );
  }

  onFeatureChange_() {
    if (!this.feature) {
      return;
    }
    // Update label
    this.featureLabel = /** @type {string} */ (this.feature.get('name') || '');

    // Update vector source
    this.vectorSource_.clear();
    this.vectorSource_.addFeature(this.feature);

    // Notify others
    if (this.onChange) {
      this.timeout_(() => {
        if (this.feature && this.onChange) {
          this.onChange(this.feature);
        }
      });
    }
  }

  /**
   * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} selected Selected result.
   * @private
   */
  onSelect_(selected) {
    const coordinate = selected.coordinate.map(parseFloat);
    const label = selected.label;
    this.setFeature_(coordinate, label);
    const newCoordinates = /** @type {import('ol/geom/Point').default} */ (
      this.feature.getGeometry()
    ).getCoordinates();
    this.map.getView().setCenter(newCoordinates);
  }

  /**
   * Snaps a feature to the street network using the getNearest
   * function of the routing service. Replaces the feature.
   *
   * @param {olFeature<import('ol/geom/Point').default>} feature Feature to snap
   * @private
   */
  snapFeature_(feature) {
    const coord = this.getLonLatFromPoint_(feature);
    if (!coord) {
      return;
    }
    /** @type {Object<string, string>} */
    const config = {};

    /**
     * @param {angular.IHttpResponse<import('./NominatimService').NominatimSearchResponseResult>} resp
     */
    const onSuccess = (resp) => {
      const lon = parseFloat(resp.data.lon);
      const lat = parseFloat(resp.data.lat);
      const coordinate = [lon, lat];
      const label = resp.data.display_name;
      this.setFeature_(coordinate, label);
    };

    /**
     * @param {angular.IHttpResponse<import('./NominatimService').NominatimSearchResponseResult>} resp
     */
    const onError = (resp) => {
      this.errorMessage = 'Error: nominatim server not responding.';
      console.log(resp);
    };

    this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess, onError);
  }

  /**
   * Converts feature point into LonLat coordinate.
   *
   * @param {olFeature<import('ol/geom/Point').default>} point Feature point to convert
   * @returns {?import('ol/coordinate').Coordinate} LonLat coordinate
   * @private
   */
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return olProj.toLonLat(coords, projection);
  }
}

/**
 * Provides a text input and draw interaction to allow a user to create and modify a ol.Feature
 * (point geometry).
 *
 * The text input is provided by {@link import('ngeo/nominatimInputComponent').default} and includes
 * Nominatim search.
 *
 * Example:
 *
 *     <ngeo-routing-feature
 *         ngeo-routing-feature-map="ctrl.map"
 *         ngeo-routing-feature-feature="ctrl.feature"
 *         ngeo-routing-feature-fill-color="#6BE62E"
 *         ngeo-routing-feature-stroke-color="#4CB01E"
 *         ngeo-routing-feature-on-change="ctrl.handleChange">
 *
 * Is used in in the partial of {@link import('ngeo/routingComponent').default}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example for a usage sample.
 *
 * @htmlAttribute {import('ol/Map').default} ngeo-routing-feature-map The map.
 * @htmlAttribute {olFeature<import('ol/geom/Geometry').default>} ngeo-routing-feature-feature The feature.
 * @htmlAttribute {string} ngeo-routing-feature-fill-color The marker fill color.
 * @htmlAttribute {string} ngeo-routing-feature-stroke-color The marker stroke color.
 * @htmlAttribute {function(olFeature<import('ol/geom/Geometry').default>)} ngeo-routing-feature-on-change Event fired when
 *    feature changes.
 * @ngdoc directive
 * @ngname ngeoRoutingFeature
 */
const routingFeatureComponent = {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingFeatureMap',
    'feature': '=ngeoRoutingFeatureFeature',
    'fillColor': '<?ngeoRoutingFeatureFillColor',
    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',
    'onChange': '=?ngeoRoutingFeatureOnChange',
  },
  templateUrl: ngeoRoutingFeatureTemplateUrl,
};

myModule.component('ngeoRoutingFeature', routingFeatureComponent);

export default myModule;
