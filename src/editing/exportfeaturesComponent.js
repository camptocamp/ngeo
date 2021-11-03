// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoMiscFeatureHelper, {FeatureFormatType} from 'ngeo/misc/FeatureHelper';
import {getUid as olUtilGetUid} from 'ol/util';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoExportfeatures', [ngeoMiscFeatureHelper.name]);

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
 * @htmlAttribute {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
 *    ngeo-exportfeatures-features The features to export
 * @returns {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoExportfeatures
 */
function editingExportFeaturesComponent() {
  return {
    controller: 'ngeoExportfeaturesController as efCtrl',
    scope: true,
    bindToController: {
      'features': '=ngeoExportfeaturesFeatures',
    },
  };
}

myModule.directive('ngeoExportfeatures', editingExportFeaturesComponent);

/**
 * @param {JQuery} $element Element.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoExportfeaturesController
 */
export function Controller($element, $injector, $scope, ngeoFeatureHelper) {
  /**
   * @type {?import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  this.features = null;

  /**
   * @type {JQuery}
   */
  this.element_ = $element;

  const uid = olUtilGetUid(this);
  const id = ['ngeo-exportfeature', uid].join('-');

  /**
   * @type {string}
   */
  this.id_ = id;

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /** @type {string[]} */
  let formats;
  if ($injector.has('ngeoExportFeatureFormats')) {
    formats = $injector.get('ngeoExportFeatureFormats');
  } else {
    formats = [FeatureFormatType.KML];
  }

  /**
   * @type {?JQuery}
   */
  this.menu_ = null;

  /**
   * @type {JQuery[]}
   */
  this.items_ = [];

  // build the drop-down menu and items if there's more than one format
  if (formats.length > 1) {
    $element.attr('id', id);
    const $menu = $('<div />', {
      'class': 'dropdown-menu',
      'aria-labelledby': id,
    }).appendTo($element.parent()[0]);

    this.menu_ = $menu;

    formats.forEach((format) => {
      const item = $('<a />', {
        'href': '#',
        'class': 'dropdown-item',
        'text': format,
      });
      item.appendTo($menu);
      item.on(`click.${id}`, this.handleMenuItemClick_.bind(this, format));
      this.items_.push(item);
    });
  }

  /**
   * @type {string[]}
   */
  this.formats_ = formats;

  $element.on(['click', id].join('.'), this.handleElementClick_.bind(this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Called when the element bound to this directive is clicked. Use the feature
 * helper to export the feature(s) depending on the format(s) available(s).
 * If there's only one, the call to the export method is direct, otherwise
 * a drop-down menu is show to let the user choose the format of the export.
 * Finally, if there's only one feature in the collection to export and there's
 * more than one format set, some formats may not support the type of geometry.
 * If that's the case, then disable each format item in the drop-down menu
 * that doesn't support the type of geometry.
 */
Controller.prototype.handleElementClick_ = function () {
  if (!this.features) {
    throw new Error('Missing features');
  }

  const features = this.features.getArray();

  if (this.formats_.length === 1) {
    this.featureHelper_.export(features, this.formats_[0]);
  } else if (features.length === 1) {
    const feature = features[0];
    const geometry = feature.getGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }
    const geometryType = geometry.getType();
    let $item;
    this.formats_.forEach((format, i) => {
      $item = this.items_[i];
      if (format === FeatureFormatType.GPX) {
        if (geometryType === 'Point' || geometryType === 'LineString') {
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
 *
 * @param {string} format Format.
 * @param {JQuery.Event} event Event.
 */
Controller.prototype.handleMenuItemClick_ = function (format, event) {
  if (!this.features) {
    throw new Error('Missing features');
  }
  if (!event.target.parentElement) {
    throw new Error('Missing event.target.parentElement');
  }
  if (!$(event.target.parentElement).hasClass('disabled')) {
    const features = this.features.getArray();
    this.featureHelper_.export(features, format);
  }
};

/**
 * Cleanup event listeners and remove the menu from DOM, if any.
 */
Controller.prototype.handleDestroy_ = function () {
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

myModule.controller('ngeoExportfeaturesController', Controller);

export default myModule;
