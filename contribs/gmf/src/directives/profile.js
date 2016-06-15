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
 * @htmlAttribute {ol.Map} gmf-profile-map TODO
 * @htmlAttribute {ol.Collection.<ol.Feature>} gmf-profile-features TODO
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
   * @type {ngeox.profile.ProfileOptions}
   * @export
   */
  this.profileOptions = {
    linesConfiguration: {
      'aster': {
        color: '#00F',
        zExtractor: this.getAsterZ_
      },
      'srtm': {
        color: '#0F0',
        zExtractor: this.getSrtmZ_
      }
    },
    distanceExtractor: this.getDist_
  };

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

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
//    'layers': ['srtm', 'aster'],
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


gmf.ProfileController.prototype.getProfileDataSuccess_ = function(resp) {
  //this.profileData = resp.dat;
  this.profileData = resp.data['profile'];
};


gmf.ProfileController.prototype.getProfileDataError_ = function(resp) {
  console.error('Can not get JSON profile. ' + resp.statusText);
};


/**
 * TODO
 * @param {Object} item The item.
 * @return {number} The elevation.
 * @private
 */
gmf.ProfileController.prototype.getAsterZ_ = function(item) {
  if ('values' in item && 'aster' in item['values']) {
    return parseFloat(item['values']['aster']);
  }
  return 0;
};


/**
 * TODO
 * @param {Object} item The item.
 * @return {number} The elevation.
 * @private
 */
gmf.ProfileController.prototype.getSrtmZ_ = function(item) {
  if ('values' in item && 'srtm' in item['values']) {
    return parseFloat(item['values']['srtm']);
  }
  return 0;
};


/**
 * TODO
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
