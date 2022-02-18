// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
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
import './profile.css';
import gmfPermalinkPermalink from 'gmf/permalink/Permalink';

import gmfMapComponent from 'gmf/map/component';

import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import gmfProfileModule from 'gmf/profile/module';
import ngeoMapModule from 'ngeo/map/module';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olInteractionDraw from 'ol/interaction/Draw';
import olLayerTile from 'ol/layer/Tile';
import olSourceOSM from 'ol/source/OSM';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import options from './options';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfPermalinkPermalink.name,
  gmfMapComponent.name,
  gmfProfileModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
]);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @class
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {?import('ol/geom/LineString').default}
   */
  this.profileLine = null;

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2600000, 1200000],
      zoom: 3,
    }),
  });

  const lineStyle = new olStyleStyle({
    stroke: new olStyleStroke({
      color: '#ffcc33',
      width: 2,
    }),
  });

  /**
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/LineString').default>>}
   */
  const features = new olCollection();

  const overlay = ngeoMapFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(lineStyle);

  // Initialize the feature overlay manager with the map.
  ngeoMapFeatureOverlayMgr.init(this.map);

  /**
   * Draw line interaction.
   *
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawLine = new olInteractionDraw({
    type: 'LineString',
    features: features,
  });

  this.drawLine.setActive(false);
  this.map.addInteraction(this.drawLine);

  /**
   * Toggle activation of the draw line interaction.
   */
  this.toggleDrawLineActive = function () {
    if (this.drawLine.getActive()) {
      this.drawLine.setActive(false);
      this.clear_();
    } else {
      this.drawLine.setActive(true);
    }
  };

  this.clear_ = function () {
    features.clear(); // For the draw overlay.
    this.profileLine = null; // To reset the profile.
  };

  this.drawLine.on(/** @type {import('ol/Observable').EventTypes} */ ('drawstart'), () => {
    this.clear_();
  });

  this.drawLine.on(
    /** @type {import('ol/Observable').EventTypes} */ ('drawend'),
    /** @type {function(?): ?} */ (
      /**
       * @param {import('lib/ol.interaction.Draw').DrawEvent} e
       */
      (e) => {
        // Update the profile with the new geometry
        this.profileLine = /** @type {?import('ol/geom/LineString').default} */ (e.feature.getGeometry());
        $scope.$digest();
      }
    )
  );
}

myModule.controller('MainController', MainController);

myModule.constant('ngeoProfileOptions', {
  styleDefs: 'svg {background-color: #D3E5D7};',
  linesConfiguration: {
    'aster': {
      'color': '#0404A0',
    },
    'srtm': {
      'color': '#04A004',
    },
  },
});
options(myModule);

export default myModule;
