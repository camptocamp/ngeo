goog.provide('gmf.DisplayquerygridController');
goog.provide('gmf.displayquerygridDirective');

goog.require('gmf');
goog.require('ngeo.FeatureOverlay');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Collection');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


ngeo.module.value('gmfDisplayquerygridTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayquerygridTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayquerygrid.html';
    });


/**
 * TODO (decription from query window below)
 * Provide a directive to display results of the {@link ngeo.queryResult} in a
 * grid and shows related features on the map using
 * the {@link ngeo.FeatureOverlayMgr}.
 *
 * You can override the default directive's template by setting the
 * value `gmfDisplayquerygridTemplateUrl`.
 *
 * Features displayed on the map use a default style but you can override these
 * styles by passing ol.style.Style objects as attributes of this directive.
 *
 * Example:
 *
 *      <gmf-displayquerygrid
 *        gmf-displayquerygrid-featuresstyle="ctrl.styleForAllFeatures"
 *        gmf-displayquerygrid-selectedfeaturestyle="ctrl.styleForTheCurrentFeature">
 *      </gmf-displayquerygrid>
 *
 * @htmlAttribute {ol.style.Style} gmf-displayquerygrid-featuresstyle A style
 *     object for all features from the result of the query.
 * @htmlAttribute {ol.style.Style} selectedfeaturestyle A style
 *     object for the current displayed feature.
 * @param {string} gmfDisplayquerygridTemplateUrl URL to a template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayquerygrid
 */
gmf.displayquerygridDirective = function(
    gmfDisplayquerygridTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfDisplayquerygridController',
    controllerAs: 'ctrl',
    templateUrl: gmfDisplayquerygridTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',
      'selectedFeatureStyleFn': '&gmfDisplayquerygridSourceselectedfeaturestyle'
    }
  };
};


gmf.module.directive('gmfDisplayquerygrid', gmf.displayquerygridDirective);


/**
 * TODO
 *
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfDisplayquerygridController
 */
gmf.DisplayquerygridController = function($scope, ngeoQueryResult,
    ngeoFeatureOverlayMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.ngeoQueryResult = ngeoQueryResult;

  /**
   * @type {boolean}
   * @export
   */
  this.tooManyResults = false;

  /**
   * @type {!Object.<number|string, gmfx.GridSource>}
   * @export
   */
  this.gridSources = {};

  /**
   * @type {number}
   * @export
   */
  this.selectedTab = -1;

  /**
   * TODO param to bind with the directive attributes.
   * @type {boolean}
   * @private
   */
  this.removeEmptyColumns_ = false;

  /**
   * TODO param to bind with the directive attributes.
   * @type {number}
   * @export
   */
  this.maxResults = 200;

  // ****************** UNUSED for now (all things below) ******************* //
  // Styles for displayed features (features) and selected features
  // (highlightFeatures_) (user can set both styles).
  /**
   * @type {ol.Collection}
   * @private
   */
  this.features_ = new ol.Collection();

  var featuresOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  var featuresStyle = this['featuresStyleFn']();
  if (featuresStyle !== undefined) {
    goog.asserts.assertInstanceof(featuresStyle, ol.style.Style);
    featuresOverlay.setStyle(featuresStyle);
  }
  featuresOverlay.setFeatures(this.features_);

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.highlightFeatureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {ol.Collection}
   * @private
   */
  this.highlightFeatures_ = new ol.Collection();
  this.highlightFeatureOverlay_.setFeatures(this.highlightFeatures_);

  var highlightFeatureStyle = this['selectedFeatureStyleFn']();
  if (highlightFeatureStyle !== undefined) {
    goog.asserts.assertInstanceof(highlightFeatureStyle, ol.style.Style);
  } else {
    var fill = new ol.style.Fill({color: [255, 0, 0, 0.6]});
    var stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
    highlightFeatureStyle = new ol.style.Style({
      fill: fill,
      image: new ol.style.Circle({fill: fill, radius: 5, stroke: stroke}),
      stroke: stroke
    });
  }
  this.highlightFeatureOverlay_.setStyle(highlightFeatureStyle);

  // ************************************************************************ //

  // Watch the ngeo query result service.
  this.$scope_.$watchCollection(
      function() {
        return ngeoQueryResult;
      },
      function(newQueryResult, oldQueryResult) {
        if (newQueryResult !== oldQueryResult) {
          this.updateData_();
        }
      }.bind(this));
};


/**
 * @private
 */
gmf.DisplayquerygridController.prototype.updateData_ = function() {
  // Don't make grid if there are too many results
  if (this.ngeoQueryResult.total > this.maxResults) {
    this.tooManyResults = true;
    return;
  }
  // And clear grid if there is no result anymore.
  if (this.ngeoQueryResult.total === 0) {
    this.clear();
  }

  // Create grids (only for source with features)
  var sources = this.ngeoQueryResult.sources;
  sources.forEach(function(source) {
    var features = source.features;
    if (features.length > 0) {
      this.collectData_(source);
    }
  }.bind(this));

  // Keep the first existing navigation tab open.
  var ids = Object.keys(this.gridSources);
  if (!this.selectedTab || ids.indexOf('' + this.selectedTab) === -1) {
    this.selectedTab = parseInt(ids[0], 10);
  }
};


/**
 * Collect all features in the queryResult object.
 * @param {ngeox.QueryResultSource} source TODO.
 * @private
 */
gmf.DisplayquerygridController.prototype.collectData_ = function(source) {
  var features = source.features;
  var allProperties = [];
  var featureGeometriesNames = [];
  var properties, featureGeometryName;
  features.forEach(function(feature) {
    properties = feature.getProperties();
    if (properties !== undefined) {
      // Keeps distinct geometry names to remove theme later.
      featureGeometryName = feature.getGeometryName();
      if (featureGeometriesNames.indexOf(featureGeometryName) === -1) {
        featureGeometriesNames.push(featureGeometryName);
      }

      allProperties.push(properties);
      this.features_.push(feature);
    }
  }.bind(this));

  this.cleanProperties_(allProperties, featureGeometriesNames);
  if (allProperties.length > 0) {
    this.makeGrid_(allProperties, source);
  }
};


/**
 * Remove all unwanted column
 * @param {Array.<Object>} allProperties TODO.
 * @param {Array.<string>} featureGeometriesNames TODO.
 * @private
 */
gmf.DisplayquerygridController.prototype.cleanProperties_ = function(
    allProperties, featureGeometriesNames) {
  allProperties.forEach(function(properties) {
    featureGeometriesNames.forEach(function(featureGeometryName) {
      delete properties[featureGeometryName];
    });
    delete properties['boundedBy'];
  });

  if (this.removeEmptyColumns_ === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};


/**
 * Remove columns that will be completely empty between each properties.
 * @param {Array.<Object>} allProperties TODO.
 * @private
 */
gmf.DisplayquerygridController.prototype.removeEmptyColumnsFn_ = function(
    allProperties) {
  // Keep all keys that correspond to at least one value in a properties object.
  var keysToKeep = [];
  var i, key;
  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }
  // Get all keys that previously always refers always to an empty value.
  var keyToRemove;
  allProperties.forEach(function(properties) {
    keyToRemove = [];
    for (key in properties) {
      if (keysToKeep.indexOf(key) === -1) {
        keyToRemove.push(key);
      }
    }
    // Remove these keys.
    keyToRemove.forEach(function(key) {
      delete properties[key];
    });
  });
};


/**
 * @param {Array.<Object>} data TODO.
 * @param {ngeox.QueryResultSource} source TODO.
 * @private
 */
gmf.DisplayquerygridController.prototype.makeGrid_ = function(data, source) {
  var sourceId = source.id;
  this.gridSources[sourceId] = {
    configuration: this.getGridConfiguration_(data, sourceId),
    source: source
  };
};


/**
 * @param {Object} data TODO
 * @param {number|string} gridSourceId TODO
 * @return {Object} TODO
 * @private
 */
gmf.DisplayquerygridController.prototype.getGridConfiguration_ = function(
    data, gridSourceId) {
  var columns = Object.keys(data[0]);
  var columnDefs = [];

  columns.forEach(function(column) {
    columnDefs.push({
      'name': column
    });
  });

  return {
    'data': data,
    'columnDefs': columnDefs
  };
};


/**
 * Remove the current selected feature and source and remove all features
 * from the map.
 * @export
 */
gmf.DisplayquerygridController.prototype.clear = function() {
  this.gridSources = {};
  this.selectedTab = -1;
  this.tooManyResults = false;
  this.features_.clear();
  this.highlightFeatures_.clear();
};


/**
 * @param {gmfx.GridSource} gridSource TODO
 * @export
 */
gmf.DisplayquerygridController.prototype.onSelectTab = function(gridSource) {
  var source = gridSource.source;
  this.selectedTab = parseInt(source.id, 10);
};


gmf.module.controller('GmfDisplayquerygridController',
    gmf.DisplayquerygridController);
