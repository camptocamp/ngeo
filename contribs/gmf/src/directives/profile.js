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
 * @param {angular.JQLite} $element Element.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {string} gmfProfileJsonUrl URL of GMF service JSON profile.
 * @param {string} gmfProfileCsvUrl URL of GMF service CSV profile.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfProfileController
 */
gmf.ProfileController = function($scope, $http, $element, ngeoFeatureOverlayMgr,
    gmfProfileJsonUrl, gmfProfileCsvUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.$element_ = $element;

  /**
   * @type {string}
   * @private
   */
  this.gmfProfileJsonUrl_ = gmfProfileJsonUrl;

  /**
   * @type {string}
   * @private
   */
  this.gmfProfileCsvUrl_ = gmfProfileCsvUrl;

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
   * @type {number}
   * @private
   */
  this.nbPoints_ = 100;

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

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


/**
 * Request the profile.
 * @private
 */
gmf.ProfileController.prototype.getJsonProfile_ = function() {
  var geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates()
  };

  var params = {
    'layers': this.layerNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_
  };

  this.$http_({
    url: this.gmfProfileJsonUrl_,
    method: 'POST',
    params: params,
    paramSerializer: '$httpParamSerializerJQLike',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(
    this.getProfileDataSuccess_.bind(this),
    this.getProfileDataError_.bind(this)
  );
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getProfileDataSuccess_ = function(resp) {
  //this.profileData = resp.dat;
  this.profileData = resp.data['profile'];
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getProfileDataError_ = function(resp) {
  console.error('Can not get JSON profile.');
};


/**
 * Request the csv profile with the current profile data.
 * @export
 */
gmf.ProfileController.prototype.downloadCsv = function() {
  if (this.profileData.lenght === 0) {
    return;
  }
  var geom = {
    'type': 'LineString',
    'coordinates': this.line.getCoordinates()
  };

  var params = {
    'layers': this.layerNames_.join(','),
    'geom': JSON.stringify(geom),
    'nbPoints': this.nbPoints_
  };

  this.$http_({
    url: this.gmfProfileCsvUrl_,
    method: 'POST',
    params: params,
    paramSerializer: '$httpParamSerializerJQLike',
    headers: {
      'Content-Type': 'text/csv;'
    }
  }).then(
    this.getCsvSuccess_.bind(this),
    this.getCsvError_.bind(this)
  );
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getCsvSuccess_ = function(resp) {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/csv,' + encodeURI(resp.data);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'profile.csv';
  hiddenElement.click();
  hiddenElement.remove();
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.ProfileController.prototype.getCsvError_ = function(resp) {
  console.error('Can not get CSV profile.');
};


/**
 * Print profile as an image.
 * @export
 */
gmf.ProfileController.prototype.downloadImage = function() {
  if (this.profileData.lenght === 0) {
    return;
  }
  var title = 'Profile';
  var content = /** @type {string} */ (this.$element_.find('.profile').html());
  var printWindow = window.open();
  printWindow.document.write('<html><head><title>' + title + '</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(content);
  printWindow.document.write('</body></html>');
  printWindow.document.close(); // Necessary for IE >= 10.
  printWindow.focus(); // Necessary for IE >= 10.
  printWindow.print();
  printWindow.close();
};


gmf.module.controller('GmfProfileController', gmf.ProfileController);
