goog.provide('gmfapp.editfeature');

// webpack: import './editfeature.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('gmf');
goog.require('gmf.authentication.module');
goog.require('gmf.editing.EditFeature');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.extent');
goog.require('ol.geom.Point');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Image');
goog.require('ol.source.OSM');
goog.require('ol.source.ImageWMS');


/** @type {!angular.Module} **/
gmfapp.editfeature.module = angular.module('gmfapp', [
  gmf.authentication.module.name,
  gmf.editing.EditFeature.module.name,
  gmf.map.component.name,
]);


gmfapp.editfeature.module.value(
  'authenticationBaseUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi');


gmfapp.editfeature.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

gmfapp.editfeature.constant('defaultTheme', 'Demo');
gmfapp.editfeature.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.editing.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {gmfx.User} gmfUser User.
 * @constructor
 * @ngInject
 */
gmfapp.editfeature.MainController = function($scope, gmfEditFeature, gmfUser) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {gmf.editing.EditFeature}
   * @export
   */
  this.editFeature_ = gmfEditFeature;

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  /**
   * @type {ol.source.ImageWMS}
   * @private
   */
  this.wmsSource_ = new ol.source.ImageWMS({
    url: 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
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
      projection: 'EPSG:21781',
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
gmfapp.editfeature.MainController.prototype.handleMapSingleClick_ = function(evt) {

  // (1) Launch query to fetch new features
  const coordinate = evt.coordinate;
  const map = this.map;
  const view = map.getView();
  const resolution = view.getResolution();
  const buffer = resolution * this.pixelBuffer_;
  const extent = ol.extent.buffer(
    [coordinate[0], coordinate[1], coordinate[0], coordinate[1]],
    buffer
  );

  this.editFeature_.getFeaturesInExtent([this.layerId_], extent).then(
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
gmfapp.editfeature.MainController.prototype.handleGetFeatures_ = function(features) {
  this.pending = false;

  if (features.length) {
    this.feature = features[0];
  }
};


/**
 * Insert a new feature at a random location.
 * @export
 */
gmfapp.editfeature.MainController.prototype.insertFeature = function() {

  this.pending = true;

  // (1) Create a randomly located feature
  const map = this.map;
  const view = map.getView();
  const resolution = view.getResolution();
  const buffer = resolution * -50; // 50 pixel buffer inside the extent
  const size = /** @type {!Array.<number>} */ (map.getSize());
  const extent = ol.extent.buffer(
    view.calculateExtent(size),
    buffer
  );
  const bottomLeft = ol.extent.getBottomLeft(extent);
  const topRight = ol.extent.getTopRight(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  const right = topRight[0];
  const top = topRight[1];
  const deltaX = right - left;
  const deltaY = top - bottom;
  const coordinate = [
    left + Math.random() * deltaX,
    right + Math.random() * deltaY
  ];

  const feature = new ol.Feature({
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
gmfapp.editfeature.MainController.prototype.updateFeature = function() {

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
gmfapp.editfeature.MainController.prototype.deleteFeature = function() {

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
gmfapp.editfeature.MainController.prototype.handleEditFeature_ = function(resp) {
  this.pending = false;
  this.refreshWMSLayer_();
};


/**
 * @private
 */
gmfapp.editfeature.MainController.prototype.refreshWMSLayer_ = function() {
  this.wmsSource_.updateParams({
    'random': Math.random()
  });
};


gmfapp.editfeature.module.controller('MainController', gmfapp.editfeature.MainController);
