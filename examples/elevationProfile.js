import './elevationProfile.css';
import angular from 'angular';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceVector from 'ol/source/Vector.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoProfileElevationComponent from 'ngeo/profile/elevationComponent.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoProfileElevationComponent.name]);

/**
 * @constructor
 * @param {angular.IHttpService} $http The $http angular service.
 * @param {angular.IScope} $scope The $scope angular service.
 * @ngInject
 */
function MainController($http, $scope) {
  /**
   * @type {angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  const source = new olSourceVector();

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerImage({
        source: new olSourceImageWMS({
          projection: undefined, // should be removed in next OL version
          url: 'http://wms.geo.admin.ch/',
          crossOrigin: 'anonymous',
          attributions:
            '&copy; ' +
            '<a href="http://www.geo.admin.ch/internet/geoportal/' +
            'en/home.html">Pixelmap 1:500000 / geo.admin.ch</a>',
          params: {
            'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
            'FORMAT': 'image/jpeg',
          },
          serverType: /** @type {import("ol/source/WMSServerType.js").default} */ ('mapserver'),
        }),
      }),
      new olLayerVector({
        source,
      }),
    ],
    view: new olView({
      projection: EPSG21781,
      extent: [420000, 30000, 900000, 350000],
      zoom: 0,
      center: [0, 0],
    }),
  });

  const map = this.map;

  const vectorLayer = new olLayerVector({
    source: new olSourceVector(),
  });

  this.snappedPoint_ = new olFeature();
  /** @type {olSourceVector} */ (vectorLayer.getSource()).addFeature(this.snappedPoint_);

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {Array.<Object>}
   */
  this.profilePoisData = [
    {sort: 1, dist: 1000, title: 'First POI', id: 12345},
    {sort: 2, dist: 3000, title: 'Second POI', id: 12346},
  ];

  /**
   * @type {Object|undefined}
   */
  this.profileData = undefined;

  $http.get('data/profile.json').then((resp) => {
    const data = resp.data['profile'];
    this.profileData = data;

    let i;
    const len = data.length;
    const lineString = new olGeomLineString(
      [],
      /** @type {import("ol/geom/GeometryLayout.js").default} */ ('XYM')
    );
    for (i = 0; i < len; i++) {
      const p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new olFeature(lineString));

    const size = /** @type {import("ol/size.js").Size} */ (this.map.getSize());
    map.getView().fit(source.getExtent(), {size});
  });

  map.on('pointermove', (evt) => {
    if (evt.dragging) {
      return;
    }
    const coordinate = map.getEventCoordinate(evt.originalEvent);
    this.snapToGeometry(coordinate, source.getFeatures()[0].getGeometry());
  });

  /**
   * Factory for creating simple getter functions for extractors.
   * If the value is in a child property, the opt_childKey must be defined.
   * The type parameter is used by closure to type the returned function.
   * @param {any} type An object of the expected result type.
   * @param {string} key Key used for retrieving the value.
   * @param {string=} opt_childKey Key of a child object.
   * @return {function(Object): any} Getter function.
   */
  const typedFunctionsFactory = function (type, key, opt_childKey) {
    return (
      /**
       * @param {Object} item
       * @return {any}
       */
      function (item) {
        if (opt_childKey !== undefined) {
          item = item[opt_childKey];
        }
        return item[key];
      }
    );
  };

  const types = {
    number: 1,
    string: '',
  };

  const distanceExtractor = typedFunctionsFactory(types.number, 'dist');

  const linesConfiguration = {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values'),
    },
  };

  /** @type function({Object}): number */
  const sort = typedFunctionsFactory(types.number, 'sort');
  /** @type function({Object}): string */
  const id = typedFunctionsFactory(types.string, 'id');
  /** @type function({Object}): number */
  const dist = typedFunctionsFactory(types.number, 'dist');
  /** @type function({Object}): string */
  const title = typedFunctionsFactory(types.string, 'title');

  /**
   * @type {import('ngeo/profile/elevationComponent.js').PoiExtractor}
   */
  const poiExtractor = {
    sort,
    id,
    dist,
    title,
    /**
     * @param {Object} item POI.
     * @param {number=} opt_z Z value.
     * @return {number} Z value.
     */
    z: (item, opt_z) => {
      if (opt_z !== undefined) {
        item['z'] = opt_z;
      }
      return item['z'];
    },
  };

  /**
   * @param {Object} point Point.
   */
  const hoverCallback = function (point) {
    // An item in the list of points given to the profile.
    this.point = point;
    this.snappedPoint_.setGeometry(new olGeomPoint([point.x, point.y]));
  }.bind(this);

  const outCallback = function () {
    this.point = null;
    this.snappedPoint_.setGeometry(null);
  }.bind(this);

  /**
   * @type {Object}
   */
  this.profileOptions = {
    distanceExtractor,
    linesConfiguration,
    poiExtractor,
    hoverCallback,
    outCallback,
  };

  /**
   * @type {Object}
   */
  this.point = null;

  /**
   * @type {number|undefined}
   */
  this.profileHighlight = undefined;
}

/**
 * @param {import("ol/coordinate.js").Coordinate} coordinate The current pointer coordinate.
 * @param {import("ol/geom/Geometry.js").default|undefined} geometry The geometry to snap to.
 */
MainController.prototype.snapToGeometry = function (coordinate, geometry) {
  const closestPoint = geometry.getClosestPoint(coordinate);
  // compute distance to line in pixels
  const dx = closestPoint[0] - coordinate[0];
  const dy = closestPoint[1] - coordinate[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const pixelDist = dist / this.map.getView().getResolution();

  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }
  this.scope_.$apply();
};

module.controller('MainController', MainController);

export default module;
