goog.provide('ngeo.ExportfeaturesController');
goog.provide('ngeo.exportfeaturesDirective');

goog.require('ngeo');


/**
 * Directive used to export vector features in different types of format.
 * To configure which formats to use, define the `ngeoExportFeatureFormats`
 * constant, as such:
 *
 *     app.module.constant('ngeoExportFeatureFormats', [
 *         ngeo.FeatureHelper.FormatType.KML,
 *         ngeo.FeatureHelper.FormatType.GPX
 *     ]);
 *
 * Example:
 *
 *     <button
 *       ngeo-exportfeatures
 *       ngeo-exportfeatures-features="ctrl.features"
 *       class="btn btn-link">Export</button>
 *
 * @htmlAttribute {ol.Collection.<ol.Feature>} ngeo-exportfeatures-features The
 *     features to export
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoExportfeatures
 */
ngeo.exportfeaturesDirective = function() {
  return {
    controller: 'ngeoExportfeaturesController',
    scope: true,
    bindToController: {
      'features': '=ngeoExportfeaturesFeatures'
    },
    controllerAs: 'efCtrl'
  };
};


ngeo.module.directive('ngeoExportfeatures', ngeo.exportfeaturesDirective);


/**
 * @param {angular.JQLite} $element Element.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoExportfeaturesController
 */
ngeo.ExportfeaturesController = function($element, $injector, $scope,
    ngeoFeatureHelper) {

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.features;

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = $element;

  var uid = goog.getUid(this);
  var id = ['ngeo-exportfeature', uid].join('-');

  /**
   * @type {string}
   * @private
   */
  this.id_ = id;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  var formats;
  if ($injector.has('ngeoExportFeatureFormats')) {
    formats = $injector.get('ngeoExportFeatureFormats');
  } else {
    formats = [ngeo.FeatureHelper.FormatType.KML];
  }

  /**
   * @type {?jQuery}
   * @private
   */
  this.menu_ = null;

  /**
   * @type {Array.<jQuery>}
   * @private
   */
  this.items_ = [];

  // build the drop-down menu and items if there's more than one format
  if (formats.length > 1) {
    $element.attr('id', id);
    var $menu = $('<ul />', {
      'class': 'dropdown-menu',
      'aria-labelledby': id
    }).appendTo($element.parent()[0]);

    this.menu_ = $menu;
    var $item;

    formats.forEach(function(format) {
      $item = $('<li />')
        .appendTo($menu)
        .append($('<a />', {
          'href': '#',
          'text': format
        })
        .on(
          ['click', id].join('.'),
          this.handleMenuItemClick_.bind(this, format)
        )
      );
      this.items_.push($item);
    }, this);
  }

  /**
   * @type {Array.<string>}
   * @private
   */
  this.formats_ = formats;

  $element.on(['click', id].join('.'), this.handleElementClick_.bind(this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};


/**
 * Called when the element bound to this directive is clicked. Use the feature
 * helper to export the feature(s) depending on the format(s) available(s).
 * If there's only one, the call to the export method is direct, otherwise
 * a drop-down menu is show to let the user choose the format of the export.
 * Finally, if there's only one feature in the collection to export and there's
 * more than one format set, some formats may not support the type of geometry.
 * If that's the case, then disable each format item in the drop-down menu
 * that doesn't support the type of geometry.
 * @private
 */
ngeo.ExportfeaturesController.prototype.handleElementClick_ = function() {

  var features = this.features.getArray();

  if (this.formats_.length === 1) {
    this.featureHelper_.export(features, this.formats_[0]);
  } else if (features.length === 1) {
    var feature = features[0];
    var geom = feature.getGeometry();
    var $item;
    this.formats_.forEach(function(format, i) {
      $item = this.items_[i];
      if (format === ngeo.FeatureHelper.FormatType.GPX) {
        if (geom instanceof ol.geom.Point ||
            geom instanceof ol.geom.LineString) {
          $item.removeClass('disabled');
        } else {
          $item.addClass('disabled');
        }
      }
    }, this);
  }
};


/**
 * Called when a menu item is clicked. Export the features to the selected
 * format.
 * @param {string} format Format.
 * @private
 */
ngeo.ExportfeaturesController.prototype.handleMenuItemClick_ = function(
    format) {
  var features = this.features.getArray();
  this.featureHelper_.export(features, format);
};


/**
 * Cleanup event listeners and remove the menu from DOM, if any.
 * @private
 */
ngeo.ExportfeaturesController.prototype.handleDestroy_ = function() {
  var id = this.id_;

  this.element_.off(['click', id].join('.'));

  if (this.menu_) {
    this.menu_.remove();
    this.items_.forEach(function($item) {
      $item.off(['click', id].join('.'));
    }, this);
    this.items_.length = 0;
    this.menu_ = null;
  }
};


ngeo.module.controller(
    'ngeoExportfeaturesController', ngeo.ExportfeaturesController);
