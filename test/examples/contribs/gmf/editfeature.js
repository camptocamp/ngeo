


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi');


app.module.value('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/layers/');


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {gmfx.User} gmfUser User.
 * @constructor
 */
app.MainController = function($scope, gmfEditFeature, gmfUser) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {gmf.EditFeature}
   * @export
   */
  this.editFeature_ = gmfEditFeature;

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {ol.source.ImageWMS}
   * @private
   */
  this.wmsSource_ = new ol.source.ImageWMS({
    url: 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy',
    params: {'LAYERS': 'point'}
  });

  /**
   * @type {ol.layer.Image}
   * @private
   */
  this.wmsLayer_ = new ol.layer.Image({
    source: this.wmsSource_
  });

  /**
   * @type {number}
   * @private
   */
  this.pixelBuffer_ = 10;

  /**
   * @type {number}
   * @private
   */
  this.layerId_ = 113;

  /**
   * @type {ol.Feature}
   * @export
   */
  this.feature = null;

  /**
   * @type {boolean}
   * @export
   */
  this.pending = false;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      this.wmsLayer_
    ],
    view: new ol.View({
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2
    })
  });

  this.map.on('singleclick', this.handleMapSingleClick_, this);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
};


/**
 * @param {ol.MapBrowserEvent} evt MapBrowser event
 * @private
 */
app.MainController.prototype.handleMapSingleClick_ = function(evt) {

  // (1) Launch query to fetch new features
  var coordinate = evt.coordinate;
  var map = this.map;
  var view = map.getView();
  var resolution = view.getResolution();
  var buffer = resolution * this.pixelBuffer_;
  var extent = ol.extent.buffer(
    [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
    buffer
  );

  this.editFeature_.getFeatures([this.layerId_], extent).then(
    this.handleGetFeatures_.bind(this));

  // (2) Clear any previously selected feature
  this.feature = null;

  // (3) Pending
  this.pending = true;

  this.scope_.$apply();
};


/**
 * @param {Array.<ol.Feature>} features Features.
 * @private
 */
app.MainController.prototype.handleGetFeatures_ = function(features) {
  this.pending = false;

  if (features.length) {
    this.feature = features[0];
  }
};


/**
 * Insert a new feature at a random location.
 * @export
 */
app.MainController.prototype.insertFeature = function() {

  this.pending = true;

  // (1) Create a randomly located feature
  var map = this.map;
  var view = map.getView();
  var resolution = view.getResolution();
  var buffer = resolution * -50; // 50 pixel buffer inside the extent
  var size = /** @type {!Array.<number>} */ (map.getSize());
  var extent = ol.extent.buffer(
    view.calculateExtent(size),
    buffer
  );
  var bottomLeft = ol.extent.getBottomLeft(extent);
  var topRight = ol.extent.getTopRight(extent);
  var left = bottomLeft[0];
  var bottom = bottomLeft[1];
  var right = topRight[0];
  var top = topRight[1];
  var deltaX = right - left;
  var deltaY = top - bottom;
  var coordinate = [
    left + Math.random() * deltaX,
    right + Math.random() * deltaY
  ];

  var feature = new ol.Feature({
    'geometry': new ol.geom.Point(coordinate),
    'name': 'New point'
  });

  // (2) Launch request
  this.editFeature_.insertFeatures(
    this.layerId_,
    [feature]
  ).then(
    this.handleEditFeature_.bind(this)
  );
};


/**
 * Update the currently selected feature with a new name.
 * @export
 */
app.MainController.prototype.updateFeature = function() {

  console.assert(this.feature);

  this.pending = true;

  // (1) Update name
  this.feature.set('name', 'Updated name');

  // (2) Launch request
  this.editFeature_.updateFeature(
    this.layerId_,
    this.feature
  ).then(
    this.handleEditFeature_.bind(this)
  );

  // (3) Reset selected feature
  this.feature = null;
};


/**
 * Delete currently selected feature.
 * @export
 */
app.MainController.prototype.deleteFeature = function() {

  console.assert(this.feature);

  // (1) Launch request
  this.editFeature_.deleteFeature(
    this.layerId_,
    this.feature
  ).then(
    this.handleEditFeature_.bind(this)
  );

  // (2) Reset selected feature
  this.feature = null;
};


/**
 * Called after an insert, update or delete request.
 * @param {angular.$http.Response} resp Ajax response.
 * @private
 */
app.MainController.prototype.handleEditFeature_ = function(resp) {
  this.pending = false;
  this.refreshWMSLayer_();
};


/**
 * @private
 */
app.MainController.prototype.refreshWMSLayer_ = function() {
  this.wmsSource_.updateParams({
    'random': Math.random()
  });
};


app.module.controller('MainController', app.MainController);
