goog.provide('gmf.lidarPanelComponent');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.Overlay');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.obj');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');


ngeo.module.value('gmfLidarPanelTemplateUrl',
  /**
     * @param {!angular.JQLite} $element Element.
     * @param {!angular.Attributes} $attrs Attributes.
     * @return {string} Template.
     */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfLidarPanelTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/lidarpanel.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLidarPanelTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLidarPanelTemplateUrl($element, $attrs, gmfLidarPanelTemplateUrl) {
  return gmfLidarPanelTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a lidar profile panel. This profile use the given
 * LineString geometry to request the pytree get_profile service.
 * The 'map' attribute is used to display on the map the
 * information that concern the hovered point (in the profile and on the map)
 * of the line.
 * This lidar profile relies on the ngeo.lidarprofile (d3)
 *
 * Example:
 *
 *      <gmf-profile
 *        gmf-profile-active="ctrl.profileActive"
 *        gmf-profile-line="ctrl.profileLine"
 *        gmf-profile-map="::ctrl.map"
 *      </gmf-profile>
 *
 *
 * @htmlAttribute {boolean} gmf-lidar-profile-active Active the component.
 * @htmlAttribute {ol.geom.LineString} gmf-profile-line The linestring geometry
 *     to use to draw the profile.
 * @htmlAttribute {ol.Map?} gmf-profile-map An optional map.
 * @htmlAttribute {ol.style.Style?} gmf-profile-hoverpointstyle Optional style
 *     for the 'on Hover' point on the line.
 * @htmlAttribute {Object.<string, *>?} gmf-profile-options Optional options
 *     object like {@link ngeox.profile.ProfileOptions} but without any
 *     mandatory value. Will be passed to the ngeo profile component. Providing
 *     'distanceExtractor', hoverCallback, outCallback
 *     or i18n will override native gmf profile values.
 *
 * @ngdoc component
 * @ngname gmfLidarPanel
 */
gmf.lidarPanelComponent = {
  controller: 'gmfLidarPanelController',
  bindings: {
    'active': '=gmfLidarPanelActive',
    'map': '=gmfLidarPanelMap',
    'line': '=gmfLidarPanelLine',
  },
  templateUrl: gmfLidarPanelTemplateUrl
};


gmf.module.component('gmfLidarPanel', gmf.lidarPanelComponent);


/**
 * @param {gmf.gmfLidarProfileConfig} gmfLidarProfileConfig gmf gmfLidarProfileConfig.
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.JQLite} $element Element.
 * @param {angular.$filter} $filter Angular filter
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {string} pytreeLidarProfileJsonUrl URL of Pytree service arraybuffer profile.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLidarPanelController
 */
gmf.LidarPanelController = function(gmfLidarProfileConfig) {
  this.gmfLidarProfileConfig = gmfLidarProfileConfig;

  /**
  * @type {ol.geom.LineString}
  * @export
  */
  this.line;

  /**
  * @type {int}
  * @export
  */
  this.profilWidth;

  /**
  * @type {boolean}
  * @export
  */
  this.autoWidth = true;

};

/**
 * Init the controller
 */
gmf.LidarPanelController.prototype.$onInit = function() {
  this.gmfLidarProfileConfig.initProfileConfig().then((resp) => {
    this.ready = true;
    this.line = this.line;
    this.active = this.active;
    this.map = this.map;
    this.getPointAttributes();
  });
};

gmf.LidarPanelController.prototype.getProfileConfig = function() {
  return this.gmfLidarProfileConfig.profileConfig;
};

gmf.LidarPanelController.prototype.getClassification = function() {
  return this.gmfLidarProfileConfig.profileConfig.classification;
};

gmf.LidarPanelController.prototype.getPointAttributes = function() {
  const attr = [];
  for (const key in this.gmfLidarProfileConfig.profileConfig.pointAttributes) {
    if (this.gmfLidarProfileConfig.profileConfig.pointAttributes[key].visible == 1) {
      attr.push(this.gmfLidarProfileConfig.profileConfig.pointAttributes[key]);
    }
  }
  this.pointAttributes = {
    availableOptions: attr,
    selectedOption: this.gmfLidarProfileConfig.profileConfig.pointAttributes[this.gmfLidarProfileConfig.profileConfig.defaultPointAttribute]
  };
};

gmf.LidarPanelController.prototype.getDefaultAttribute = function() {
  return this.gmfLidarProfileConfig.profileConfig.defaultAttribute;
};

gmf.LidarPanelController.prototype.setDefaultAttribute = function(material) {
  this.gmfLidarProfileConfig.profileConfig.defaultAttribute = material;
  if (this.line) {
    ngeo.lidarProfile.plot2canvas.changeStyle(material);
  }
};

gmf.LidarPanelController.prototype.getWidth = function() {
  this.profilWidth = this.gmfLidarProfileConfig.profileConfig.profilWidth;
  return this.gmfLidarProfileConfig.profileConfig.profilWidth;
};

gmf.LidarPanelController.prototype.setClassification = function(classification, key) {
  this.gmfLidarProfileConfig.profileConfig.classification[key].visible = classification.visible;
  if (this.line) {
    ngeo.lidarProfile.plot2canvas.setClassActive(this.gmfLidarProfileConfig.profileConfig.classification,
      this.gmfLidarProfileConfig.profileConfig.defaultAttribute);
  }
};

gmf.LidarPanelController.prototype.setWidth = function(profileWidth) {
  this.gmfLidarProfileConfig.profileConfig.profilWidth = profileWidth;
  if (this.line) {
    this.gmfLidarProfileConfig.olLinestring = this.line;
    this.gmfLidarProfileConfig.map = this.map;
    ngeo.lidarProfile.setOptions(this.gmfLidarProfileConfig);
    ngeo.lidarProfile.loader.getProfileByLOD(0, true, this.gmfLidarProfileConfig.profileConfig.minLOD);
  }
};

gmf.LidarPanelController.prototype.setAutoWidth = function(autoWidth) {
  this.gmfLidarProfileConfig.profileConfig.autoWidth = autoWidth;
  if (this.line) {
    this.gmfLidarProfileConfig.olLinestring = this.line;
    this.gmfLidarProfileConfig.map = this.map;
    ngeo.lidarProfile.setOptions(this.gmfLidarProfileConfig);
    ngeo.lidarProfile.loader.getProfileByLOD(0, true, this.gmfLidarProfileConfig.profileConfig.minLOD);
  }
};

gmf.LidarPanelController.prototype.csvExport = function() {
  if (this.line) {
    ngeo.lidarProfile.utils.getPointsInProfileAsCSV(ngeo.lidarProfile.loader.profilePoints);
  }
};

gmf.LidarPanelController.prototype.pngExport = function() {
  if (this.line) {
    ngeo.lidarProfile.utils.exportToImageFile('png');
  }
};


gmf.module.controller('gmfLidarPanelController', gmf.LidarPanelController);
