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
import gmfRasterRasterService from 'gmf/raster/RasterService';

import ngeoMiscDebounce from 'ngeo/misc/debounce';

import {listen, unlistenByKey} from 'ol/events';
import MapBrowserEvent from 'ol/MapBrowserEvent';

import 'bootstrap/js/src/dropdown';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfRasterComponent', [gmfRasterRasterService.name, ngeoMiscDebounce.name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/raster/widgetComponent', require('./widgetComponent.html'));
  }
);

myModule.value(
  'gmfElevationwidgetTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfElevationwidgetTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/raster/widgetComponent';
  }
);

/**
 * @hidden
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfElevationwidgetTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfElevationwidgetTemplateUrl($attrs, gmfElevationwidgetTemplateUrl) {
  return gmfElevationwidgetTemplateUrl($attrs);
}

/**
 * Provide a directive that set a value each 500ms with the elevation under the
 * mouse cursor position on the map. The value must come from the elevation
 * service of a c2cgeoportal server. The server's URL must be defined as
 * config value of the application.
 *
 * Example:
 *
 *      <span gmf-elevation
 *            gmf-elevation-active="elevationActive"
 *            gmf-elevation-elevation="elevationValue"
 *            gmf-elevation-layer="mainCtrl.elevationLayer"
 *            gmf-elevation-map="::mainCtrl.map">
 *            {{elevationValue}}
 *      </span>
 *
 *  For value in meter `elevationLayersConfig` can be an empty object, complex example:
 *
 *      elevationLayersConfig = {
 *          '<layer>': {
 *              'filter': 'ngeoUnitPrefix',
 *              'args': ['m²', 'square'],
 *              'postfix': '<notice>',
 *              'separator': ''
 *          }
 *      };
 *
 *
 * @htmlAttribute {boolean} gmf-elevation-active A boolean to set active or deactivate the component.
 * @htmlAttribute {number} gmf-elevation-elevation The value to set with the elevation value.
 * @htmlAttribute {string} gmf-elevation-layer Elevation layer to use.
 * @htmlAttribute {import('ol/Map').default} gmf-elevation-map The map.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfElevation
 */
function rasterComponent() {
  return {
    restrict: 'A',
    controller: 'GmfElevationController as ctrl',
    bindToController: true,
    scope: {
      'active': '<gmfElevationActive',
      'elevation': '=gmfElevationElevation',
      'loading': '=?gmfElevationLoading',
      'layer': '<gmfElevationLayer',
      'map': '=gmfElevationMap',
    },
    link: (scope, element, attr) => {
      // @ts-ignore: scope ......
      const ctrl = scope.ctrl;

      // Watch active or not.
      scope.$watch(
        () => ctrl.active,
        (active) => {
          ctrl.toggleActive_(active);
        }
      );

      // Watch current layer.
      scope.$watch(
        () => ctrl.layer,
        (layer) => {
          ctrl.layer = layer;
          ctrl.elevation = null;
        }
      );
    },
  };
}

myModule.directive('gmfElevation', rasterComponent);

/**
 * @hidden
 * @param {angular.IScope} $scope Scope.
 * @param {angular.IFilterService} $filter Angular filter.
 * @param {import('ngeo/misc/debounce').miscDebounce<function(Event|import('ol/events/Event').default): void>} ngeoDebounce Ngeo debounce factory
 * @param {import('gmf/raster/RasterService').RasterService} gmfRaster Gmf Raster service
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('gmf/options').gmfElevationOptions} gmfElevationOptions The options
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfElevationController
 */
export function Controller($scope, $filter, ngeoDebounce, gmfRaster, gettextCatalog, gmfElevationOptions) {
  /**
   * @type {import('gmf/options').gmfElevationOptions}
   */
  this.options = gmfElevationOptions;

  this.filter_ = $filter;
  this.ngeoDebounce_ = ngeoDebounce;
  this.gmfRaster_ = gmfRaster;
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {?string}
   */
  this.elevation = null;

  /**
   * @type {string}
   */
  this.layer = '';

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {boolean}
   */
  this.inViewport_ = false;

  /**
   * @type {boolean}
   */
  this.loading = false;
}

/**
 * Activate or deactivate the listeners of the component.
 * @param {boolean} active true to make requests.
 * @private
 */
Controller.prototype.toggleActive_ = function (active) {
  this.clear_();
  active ? this.activate_() : this.deactivate_();
};

/**
 * Activate the listeners of the component.
 */
Controller.prototype.activate_ = function () {
  if (this.listenerKeys_.length) {
    throw new Error('Unexpexted listenerKeys');
  }
  if (!this.map) {
    throw new Error('Missing map');
  }

  // Moving the mouse clears previously displayed elevation
  this.listenerKeys_.push(listen(this.map, 'pointermove', this.onPointerMove_.bind(this)));

  // Launch the raster service request when the user stops moving the mouse for less short delay.
  this.listenerKeys_.push(
    listen(this.map, 'pointermove', this.ngeoDebounce_(this.afterPointerMove_.bind(this), 500, true))
  );

  // Clear the elevation and set inViewport_ to false.
  this.listenerKeys_.push(listen(this.map.getViewport(), 'mouseout', this.onMouseout_.bind(this)));
};

/**
 * Deactivate the listeners of the component
 */
Controller.prototype.deactivate_ = function () {
  this.listenerKeys_.forEach(unlistenByKey);
  this.listenerKeys_.length = 0;
};

/**
 * Clears previously displayed raster info and set inViewport_ to true.
 */
Controller.prototype.onPointerMove_ = function () {
  this.scope_.$apply(() => {
    this.clear_();
    this.inViewport_ = true;
    this.loading = true;
  });
};

/**
 * Set the state of the component and query the raster service with the coordinate.
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.afterPointerMove_ = function (evt) {
  if (this.inViewport_ && evt instanceof MapBrowserEvent) {
    const params = {
      'layers': this.layer,
    };
    this.gmfRaster_
      .getRaster(evt.coordinate, params)
      .then(this.getRasterSuccess_.bind(this), this.getRasterError_.bind(this));
  }
};

/**
 * Clears previously displayed raster info and set inViewport_ to false.
 */
Controller.prototype.onMouseout_ = function () {
  this.scope_.$apply(() => {
    this.clear_();
    this.inViewport_ = false;
  });
};

/**
 * @param {Object<string, number>} resp Response of the get Raster service.
 */
Controller.prototype.getRasterSuccess_ = function (resp) {
  if (this.layer === undefined) {
    throw new Error('Missing layer');
  }
  const value = resp[this.layer];
  if (value !== undefined && value !== null) {
    const options = (this.options.layersConfig || {})[this.layer] || {};
    const filter = options.filter || 'number';
    const custom_args = options.args || [];
    /** @type {string} */
    const postfix = options.hasOwnProperty('postfix') ? options.postfix : 'm';
    /** @type {string} */
    const separator =
      postfix.length > 0 ? (options.hasOwnProperty('separator') ? options.separator : '\u00a0') : '';
    const args = Array.prototype.concat([value], custom_args);
    const elevation = /** @type {string} */ (this.filter_(filter)(...args));
    if (typeof elevation != 'string') {
      throw new Error('Wrong elevation type');
    }
    this.elevation = elevation + separator + postfix;
  } else {
    const gettextCatalog = this.gettextCatalog;
    this.elevation = gettextCatalog.getString('No value');
  }
  this.loading = false;
};

Controller.prototype.getRasterError_ = function () {
  console.error('Error on getting the raster.');
  this.clear_();
};

/**
 * Clear the state.
 */
Controller.prototype.clear_ = function () {
  this.elevation = null;
  this.loading = false;
};

myModule.controller('GmfElevationController', Controller);

/**
 * Provides a component which encapsulates the elevation component (see above)
 * in a button with dropdown menu to be included in a application directly.
 *
 * Example:
 *  <gmf-elevationwidget
 *      gmf-elevationwidget-map="::mainCtrl.map"
 *      gmf-elevationwidget-active="mainCtrl.showInfobar">
 *  </gmf-elevationwidget>
 *
 * @htmlAttribute {import('ol/Map').default} gmf-elevationwidget-map The map.
 * @htmlAttribute {boolean} gmf-elevationwidget-active Whether to activate the elevation component.
 *
 * @ngdoc component
 * @ngname gmfElevationwidget
 */
const rasterWidgetComponent = {
  controller: 'gmfElevationwidgetController as ctrl',
  bindings: {
    'map': '<gmfElevationwidgetMap',
    'active': '<gmfElevationwidgetActive',
  },
  templateUrl: gmfElevationwidgetTemplateUrl,
};
myModule.component('gmfElevationwidget', rasterWidgetComponent);

/**
 * @class
 * @hidden
 * @nginject
 * @ngdoc controller
 * @param {import('gmf/options').gmfElevationOptions} gmfElevationOptions The options.
 */
export function WidgetController(gmfElevationOptions) {
  this.options = gmfElevationOptions;
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {boolean}
   */
  this.show = this.options.layers && this.options.layers.length > 0;

  /**
   * @type {string}
   */
  this.selectedElevationLayer = this.show ? this.options.layers[0] : '';
}

myModule.controller('gmfElevationwidgetController', WidgetController);

export default myModule;
