import angular from 'angular';
import appURL from './url.js';
import './profile.css';
import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';

import gmfMapComponent from 'gmf/map/component.js';

import gmfProfileModule from 'gmf/profile/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfPermalinkPermalink.name,
  gmfMapComponent.name,
  gmfProfileModule.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
]);

module.value('gmfProfileJsonUrl', appURL.PROFILE);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
function MainController($scope, ngeoFeatureOverlayMgr) {
  /**
   * @type {import("ol/geom/LineString.js").default}
   */
  this.profileLine = null;

  /**
   * @type {Object.<string, import('gmf/profile/component.js').ProfileLineConfiguration>}
   */
  this.profileLinesconfiguration = {
    'aster': {
      'color': '#0404A0',
    },
    'srtm': {
      'color': '#04A004',
    },
  };

  this.profileOptions = {
    styleDefs: 'svg {background-color: #D3E5D7};',
  };

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
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
   * @type {import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   */
  const features = new olCollection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(lineStyle);

  // Initialize the feature overlay manager with the map.
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * Draw line interaction.
   * @type {import("ol/interaction/Draw.js").default}
   */
  this.drawLine = new olInteractionDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
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

  this.drawLine.on('drawstart', () => {
    this.clear_();
  });

  this.drawLine.on('drawend', (e) => {
    // Update the profile with the new geometry
    this.profileLine = e.feature.getGeometry();
    $scope.$digest();
  });
}

module.controller('MainController', MainController);

export default module;
