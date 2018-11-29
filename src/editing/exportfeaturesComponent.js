/**
 * @module ngeo.editing.exportfeaturesComponent
 */
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomLineString from 'ol/geom/LineString.js';

const exports = angular.module('ngeoExportfeatures', [
  ngeoMiscFeatureHelper.module.name
]);

/**
 * Directive used to export vector features in different types of format.
 * To configure which formats to use, define the `ngeoExportFeatureFormats`
 * value, as such:
 *
 *     app.module.value('ngeoExportFeatureFormats', [
 *         ngeo.misc.FeatureHelper.FormatType.KML,
 *         ngeo.misc.FeatureHelper.FormatType.GPX
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
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoExportfeatures
 */
exports.directive_ = function() {
  return {
    controller: 'ngeoExportfeaturesController as efCtrl',
    scope: true,
    bindToController: {
      'features': '=ngeoExportfeaturesFeatures'
    }
  };
};


exports.directive('ngeoExportfeatures', exports.directive_);


/**
 * @param {angular.JQLite} $element Element.
 * @param {angular.IInjectorService} $injector Main injector.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {ngeo.misc.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoExportfeaturesController
 */
exports.Controller_ = function($element, $injector, $scope,
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

  const uid = olUtilGetUid(this);
  const id = ['ngeo-exportfeature', uid].join('-');

  /**
   * @type {string}
   * @private
   */
  this.id_ = id;

  /**
   * @type {ngeo.misc.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  let formats;
  if ($injector.has('ngeoExportFeatureFormats')) {
    formats = $injector.get('ngeoExportFeatureFormats');
  } else {
    formats = [ngeoMiscFeatureHelper.FormatType.KML];
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
    const $menu = $('<ul />', {
      'class': 'dropdown-menu',
      'aria-labelledby': id
    }).appendTo($element.parent()[0]);

    this.menu_ = $menu;
    let $item;

    formats.forEach((format) => {
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
    });
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
exports.Controller_.prototype.handleElementClick_ = function() {

  const features = this.features.getArray();

  if (this.formats_.length === 1) {
    this.featureHelper_.export(features, this.formats_[0]);
  } else if (features.length === 1) {
    const feature = features[0];
    const geom = feature.getGeometry();
    let $item;
    this.formats_.forEach((format, i) => {
      $item = this.items_[i];
      if (format === ngeoMiscFeatureHelper.FormatType.GPX) {
        if (geom instanceof olGeomPoint ||
            geom instanceof olGeomLineString) {
          $item.removeClass('disabled');
        } else {
          $item.addClass('disabled');
        }
      }
    });
  }
};


/**
 * Called when a menu item is clicked. Export the features to the selected
 * format.
 * @param {string} format Format.
 * @param {jQuery.Event} event Event.
 * @private
 */
exports.Controller_.prototype.handleMenuItemClick_ = function(format, event) {
  if (!$(event.target.parentElement).hasClass('disabled')) {
    const features = this.features.getArray();
    this.featureHelper_.export(features, format);
  }
};


/**
 * Cleanup event listeners and remove the menu from DOM, if any.
 * @private
 */
exports.Controller_.prototype.handleDestroy_ = function() {
  const id = this.id_;

  this.element_.off(['click', id].join('.'));

  if (this.menu_) {
    this.menu_.remove();
    this.items_.forEach(($item) => {
      $item.off(['click', id].join('.'));
    });
    this.items_.length = 0;
    this.menu_ = null;
  }
};


exports.controller(
  'ngeoExportfeaturesController', exports.Controller_);


export default exports;
