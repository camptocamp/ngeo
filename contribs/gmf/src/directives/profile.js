goog.provide('gmf.ProfileController');
goog.provide('gmf.profileDirective');

goog.require('gmf');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.profileDirective');
goog.require('ol.Feature');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');


ngeo.module.value('gmfProfileTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfProfileTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/profile.html';
    });


/**
 * TODO description and example.
 *
 * @htmlAttribute {ol.Map} gmf-profile-map The map.
 * @htmlAttribute {Object.<string, gmfx.ProfileLineConfiguration>}
 *     gmf-profile-linesconfiguration The configuration of the lines. Each keys
 *     will be used as requested elevation layers names.
 * @htmlAttribute {ol.geom.LineString} gmf-profile-line. The linestring geometry
 *     to use to draw the profile.
 * @param {string} gmfProfileTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfProfile
 */
gmf.profileDirective = function(gmfProfileTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfProfileController',
    controllerAs: 'ctrl',
    templateUrl: gmfProfileTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfProfileMap',
      'getLinesConfigurationFn': '&gmfProfileLinesconfiguration',
      'line': '<gmfProfileLine'
    }
  };
};


gmf.module.directive('gmfProfile', gmf.profileDirective);


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {string} gmfProfileUrl URL of GMF service JSON profile.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfProfileController
 */
gmf.ProfileController = function($scope, $http, ngeoFeatureOverlayMgr,
    gmfProfileUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.gmfProfileUrl_ = gmfProfileUrl;

  var map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  var linesConfiguration = this['getLinesConfigurationFn']();
  goog.asserts.assertInstanceof(linesConfiguration, Object);

  /**
   * Keep an array of all layer names to sent it to the server.
   * @type {Array.<string>}
   * @private
   */
  this.layerNames_ = [];

  var name, lineConfig;
  for (name in linesConfiguration) {
    this.layerNames_.push(name);

    lineConfig = linesConfiguration[name];
    if (!lineConfig.zExtractor) {
      lineConfig.zExtractor = this.getZFactory_(name);
    }
  }

  /**
   * @type {ngeox.profile.ProfileOptions}
   * @export
   */
  this.profileOptions = {
    linesConfiguration: /** ngeox.profile.LinesConfiguration */ (linesConfiguration),
    distanceExtractor: this.getDist_
  };

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  this.featureOverlay_.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({color: '#ffffff'})
      })
    }));

  /**
   * @type {ol.Feature}
   * @private
   */
  this.snappedPoint_ = new ol.Feature();
  this.featureOverlay_.addFeature(this.snappedPoint_);

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.line;

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.profileData = [];

  // Watch the lineto update the profileData (data for the chart).
  $scope.$watch(
    function() {
      return this.line;
    }.bind(this),
    function(oldLine, newLine) {
      if (oldLine !== newLine) {
        this.update_();
      }
    }.bind(this));
};


/**
 * @private
 */
gmf.ProfileController.prototype.update_ = function() {
  if (this.line) {
    this.getJsonProfile_();
  } else {
    this.profileData = [];
  }
};


gmf.ProfileController.prototype.getJsonProfile_ = function() {
//  var geom = {
//    'type': 'LineString',
//    'coordinates': this.line.getCoordinates()
//  };
//
//  var data = {
//    'layers': this.layers_,
//    'geom': geom,
//    'nbPoints': 100
//  };
//
//  this.$http_.post(this.gmfProfileUrl_, form_data).then(
//    this.getProfileDataSuccess_.bind(this),
//    this.getProfileDataError_.bind(this)
//  );
  this.$http_.get('data/profile.json').then(
    this.getProfileDataSuccess_.bind(this),
    this.getProfileDataError_.bind(this)
  );
};


/**
 * @param {*} resp FIXME
 * @private
 */
gmf.ProfileController.prototype.getProfileDataSuccess_ = function(resp) {
  //this.profileData = resp.dat;
  this.profileData = resp.data['profile'];
};


/**
 * @param {*} resp FIXME
 * @private
 */
gmf.ProfileController.prototype.getProfileDataError_ = function(resp) {
  console.error('Can not get JSON profile. ' + resp.statusText);
};


/**
 * @param {string} layerName name of the elevation layer.
 * @return {function(Object):number} Z extractor function.
 * @private
 */
gmf.ProfileController.prototype.getZFactory_ = function(layerName) {
  /**
   * Generic GMF extractor for the 'given' value in 'values' in profileData.
   * @param {Object} item The item.
   * @return {number} The elevation.
   * @private
   */
  var getZFn = function(item) {
    if ('values' in item && layerName in item['values']) {
      return parseFloat(item['values'][layerName]);
    }
    return 0;
  };
  return getZFn;
};


/**
 * Extractor for the 'dist' value in profileData.
 * @param {Object} item The item.
 * @return {number} The distance.
 * @private
 */
gmf.ProfileController.prototype.getDist_ = function(item) {
  if ('dist' in item) {
    return item['dist'];
  }
  return 0;
};

gmf.module.controller('GmfProfileController', gmf.ProfileController);
