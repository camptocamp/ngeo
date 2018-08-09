/**
 * @module app.search
 */
const exports = {};

import './search.css';
import googAsserts from 'goog/asserts.js';

import ngeoMapModule from 'ngeo/map/module.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import * as olProj from 'ol/proj.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoSearchModule.name
]);


/**
 * @type {!angular.Component}
 */
exports.searchComponent = {
  bindings: {
    'map': '=appSearchMap'
  },
  controller: 'AppSearchController',
  template:
      '<input type="text" placeholder="search…" ' +
      'ngeo-search="$ctrl.options" ' +
      'ngeo-search-datasets="$ctrl.datasets" ' +
      'ngeo-search-listeners="$ctrl.listeners">'
};


exports.module.component('appSearch', exports.searchComponent);


/**
 * @constructor
 * @param {angular.JQLite} $element Element.
 * @param {angular.Scope} $rootScope Angular root scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @ngInject
 */
exports.SearchController = function($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
  /**
   * @private
   * @type {angular.JQLite}
   */
  this.$element = $element;


  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = this.createVectorLayer_();

  /** @type {Bloodhound} */
  const bloodhoundEngine = this.createAndInitBloodhound_(
    ngeoSearchCreateGeoJSONBloodhound);

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.options = /** @type {TypeaheadOptions} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined
  });

  /**
   * @type {Array.<TypeaheadDataset>}
   * @export
   */
  this.datasets = [{
    source: bloodhoundEngine.ttAdapter(),
    display: (suggestion) => {
      const feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label');
    },
    templates: {
      header: () => '<div class="ngeo-header">Addresses</div>',
      suggestion: (suggestion) => {
        const feature = /** @type {ol.Feature} */ (suggestion);

        // A scope for the ng-click on the suggestion's « i » button.
        const scope = $rootScope.$new(true);
        scope['feature'] = feature;
        scope['click'] = function(event) {
          window.alert(feature.get('label'));
          event.stopPropagation();
        };

        const html = `<p>${feature.get('label')
        }<button ng-click="click($event)">i</button></p>`;
        return $compile(html)(scope);
      }
    }
  }];

  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    select: exports.SearchController.select_.bind(this)
  });
};


/**
 * @export
 */
exports.SearchController.prototype.$onInit = function() {
  // Empty the search field on focus and blur.
  const input = this.$element.find('input');
  input.on('focus blur', () => {
    input.val('');
  });
};


/**
 * @return {ol.layer.Vector} The vector layer.
 * @private
 */
exports.SearchController.prototype.createVectorLayer_ = function() {
  const vectorLayer = new olLayerVector({
    source: new olSourceVector()
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map);
  return vectorLayer;
};


/**
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
exports.SearchController.prototype.createAndInitBloodhound_ = function(ngeoSearchCreateGeoJSONBloodhound) {
  const url = 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch?query=%QUERY';
  const bloodhound = ngeoSearchCreateGeoJSONBloodhound(url, undefined, olProj.get('EPSG:3857'), EPSG21781);
  bloodhound.initialize();
  return bloodhound;
};


/**
 * @param {jQuery.Event} event Event.
 * @param {Object} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {app.search.SearchController}
 * @private
 */
exports.SearchController.select_ = function(event, suggestion, dataset) {
  const feature = /** @type {ol.Feature} */ (suggestion);
  const featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  const size = this.map.getSize();
  googAsserts.assert(size !== undefined);
  const source = this.vectorLayer_.getSource();
  source.clear(true);
  source.addFeature(feature);
  this.map.getView().fit(featureGeometry, {
    size: size,
    maxZoom: 16
  });
};


exports.module.controller('AppSearchController', exports.SearchController);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4
    })
  });

};


exports.module.controller('MainController', exports.MainController);


export default exports;
