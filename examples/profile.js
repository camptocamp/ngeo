goog.provide('profile');


goog.require('ngeo');
goog.require('ngeo.mapDirective');
goog.require('ngeo.profileDirective');
goog.require('ol');
goog.require('ol.Attribution');
goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.GeometryLayout');
goog.require('ol.geom.LineString');
goog.require('ol.layer.Image');
goog.require('ol.layer.Vector');
goog.require('ol.proj');
goog.require('ol.proj.Projection');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.Vector');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @param {angular.$http} $http The $http angular service.
 * @param {angular.Scope} $scope The $scope angular service.
 */
app.MainController = function($http, $scope) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  var projection = new ol.proj.Projection({
    code: 'EPSG:21781',
    units: 'meters',
    extent: [485869.5728, 76443.1884, 837076.5648, 299941.7864]
  });
  var extent = [420000, 30000, 900000, 350000];

  var source = new ol.source.Vector();

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
          attributions: [new ol.Attribution({
            html: '&copy; ' +
                '<a href="http://www.geo.admin.ch/internet/geoportal/' +
                'en/home.html">' +
                'Pixelmap 1:500000 / geo.admin.ch</a>'
          })],
          params: {
            'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
            'FORMAT': 'image/jpeg'
          },
          serverType: /** @type {ol.source.wms.ServerType} */ ('mapserver')
        })
      }),
      new ol.layer.Vector({
        source: source
      })
    ],
    view: new ol.View({
      projection: projection,
      extent: extent,
      zoom: 0,
      center: [0, 0]
    })
  });

  var map = this.map;

  var vectorLayer = new ol.layer.Vector({
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

  $http.get('data/profile.json').then(function(resp) {
    var data = resp.data['profile'];
    this.profileData = data;

    var i;
    var len = data.length;
    var lineString = new ol.geom.LineString([],
        /** @type {ol.geom.GeometryLayout} */ ('XYM'));
    for (i = 0; i < len; i++) {
      var p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new ol.Feature(lineString));

    map.getView().fit(source.getExtent(),
        /** @type {ol.Size} */ (this.map.getSize()));
  }.bind(this));


  // Using closures for hoverCallback and outCallback since
  // wrapping in angular.bind leads to a closure error.
  // See PR https://github.com/google/closure-compiler/pull/867
  var that = this;

  map.on('pointermove', function(evt) {
    if (evt.dragging) {
      return;
    }
    var coordinate = map.getEventCoordinate(evt.originalEvent);
    that.snapToGeometry(coordinate, source.getFeatures()[0].getGeometry());
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
  var typedFunctionsFactory = function(type, key, opt_childKey) {
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

  var types = {
    number: 1,
    string: ''
  };


  /**
   * @type {ngeox.profile.ElevationExtractor}
   */
  var elevationExtractor = {
    z: typedFunctionsFactory(types.number, 'mnt', 'values'),
    dist: typedFunctionsFactory(types.number, 'dist')
  };


  /**
   * @type {ngeox.profile.PoiExtractor}
   */
  var poiExtractor = {
    sort: typedFunctionsFactory(types.number, 'sort'),
    id: typedFunctionsFactory(types.string, 'id'),
    dist: typedFunctionsFactory(types.number, 'dist'),
    title: typedFunctionsFactory(types.string, 'title'),
    /**
      * @param {Object} item POI.
      * @param {number=} opt_z Z value.
      * @return {number} Z value.
      */
    z: function(item, opt_z) {
      if (opt_z !== undefined) {
        item['z'] = opt_z;
      }
      return item['z'];
    }
  };

  /**
   * @param {Object} point Point.
   */
  var hoverCallback = function(point) {
    // An item in the list of points given to the profile.
    that.point = point;
    that.snappedPoint_.setGeometry(new ol.geom.Point([point.x, point.y]));
  };

  var outCallback = function() {
    that.point = null;
    that.snappedPoint_.setGeometry(null);
  };


  /**
   * @type {Object}
   * @export
   */
  this.profileOptions = {
    elevationExtractor: elevationExtractor,
    poiExtractor: poiExtractor,
    hoverCallback: hoverCallback,
    outCallback: outCallback
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
  var closestPoint = geometry.getClosestPoint(coordinate);
  // compute distance to line in pixels
  var dx = closestPoint[0] - coordinate[0];
  var dy = closestPoint[1] - coordinate[1];
  var dist = Math.sqrt(dx * dx + dy * dy);
  var pixelDist = dist / this.map.getView().getResolution();

  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }
  this.scope_.$apply();
};


app.module.controller('MainController', app.MainController);
