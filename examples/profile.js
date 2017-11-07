goog.provide('app.profile');

/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.profileDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.GeometryLayout');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.layer.Image');
goog.require('ol.layer.Vector');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @param {angular.$http} $http The $http angular service.
 * @param {angular.Scope} $scope The $scope angular service.
 * @ngInject
 */
app.MainController = function($http, $scope) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  const source = new ol.source.Vector();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: 'http://wms.geo.admin.ch/',
          crossOrigin: 'anonymous',
          attributions: '&copy; ' +
            '<a href="http://www.geo.admin.ch/internet/geoportal/' +
            'en/home.html">Pixelmap 1:500000 / geo.admin.ch</a>',
          params: {
            'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
            'FORMAT': 'image/jpeg'
          },
          serverType: /** @type {ol.source.WMSServerType} */ ('mapserver')
        })
      }),
      new ol.layer.Vector({
        source
      })
    ],
    view: new ol.View({
      projection: 'EPSG:21781',
      extent: [420000, 30000, 900000, 350000],
      zoom: 0,
      center: [0, 0]
    })
  });

  const map = this.map;

  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
  });

  this.snappedPoint_ = new ol.Feature();
  vectorLayer.getSource().addFeature(this.snappedPoint_);

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.profilePoisData = [
    {sort: 1, dist: 1000, title: 'First POI', id: 12345},
    {sort: 2, dist: 3000, title: 'Second POI', id: 12346}
  ];

  /**
   * @type {Object|undefined}
   * @export
   */
  this.profileData = undefined;

  $http.get('data/profile.json').then((resp) => {
    const data = resp.data['profile'];
    this.profileData = data;

    let i;
    const len = data.length;
    const lineString = new ol.geom.LineString([],
      /** @type {ol.geom.GeometryLayout} */ ('XYM'));
    for (i = 0; i < len; i++) {
      const p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new ol.Feature(lineString));

    const size = /** @type {ol.Size} */ (this.map.getSize());
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
   * @param {T} type An object of the expected result type.
   * @param {string} key Key used for retrieving the value.
   * @param {string=} opt_childKey Key of a child object.
   * @template T
   * @return {function(Object): T} Getter function.
   */
  const typedFunctionsFactory = function(type, key, opt_childKey) {
    return (
    /**
         * @param {Object} item
         * @return {T}
         * @template T
         */
      function(item) {
        if (opt_childKey !== undefined) {
          item = item[opt_childKey];
        }
        return item[key];
      });
  };

  const types = {
    number: 1,
    string: ''
  };


  const distanceExtractor = typedFunctionsFactory(types.number, 'dist');


  const linesConfiguration = {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values')
    }
  };


  /**
   * @type {ngeox.profile.PoiExtractor}
   */
  const poiExtractor = {
    sort: typedFunctionsFactory(types.number, 'sort'),
    id: typedFunctionsFactory(types.string, 'id'),
    dist: typedFunctionsFactory(types.number, 'dist'),
    title: typedFunctionsFactory(types.string, 'title'),
    /**
      * @param {Object} item POI.
      * @param {number=} opt_z Z value.
      * @return {number} Z value.
      */
    z(item, opt_z) {
      if (opt_z !== undefined) {
        item['z'] = opt_z;
      }
      return item['z'];
    }
  };

  /**
   * @param {Object} point Point.
   */
  const hoverCallback = function(point) {
    // An item in the list of points given to the profile.
    this.point = point;
    this.snappedPoint_.setGeometry(new ol.geom.Point([point.x, point.y]));
  }.bind(this);

  const outCallback = function() {
    this.point = null;
    this.snappedPoint_.setGeometry(null);
  }.bind(this);


  /**
   * @type {Object}
   * @export
   */
  this.profileOptions = {
    distanceExtractor,
    linesConfiguration,
    poiExtractor,
    hoverCallback,
    outCallback
  };

  /**
   * @type {Object}
   * @export
   */
  this.point = null;

  /**
   * @type {number|undefined}
   * @export
   */
  this.profileHighlight = undefined;
};


/**
 * @param {ol.Coordinate} coordinate The current pointer coordinate.
 * @param {ol.geom.Geometry|undefined} geometry The geometry to snap to.
 */
app.MainController.prototype.snapToGeometry = function(coordinate, geometry) {
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


app.module.controller('MainController', app.MainController);
