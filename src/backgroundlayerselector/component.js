Controller.$inject = ['$scope', 'ngeoBackgroundLayerMgr', 'gmfThemes', 'gmfBackgroundLayerSelectorOptions'];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status';
import gmfThemeThemes from 'gmf/theme/Themes';
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr';
import {listen, unlistenByKey} from 'ol/events';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfBackgroundlayerselector', [
  gmfThemeThemes.name,
  ngeoMapBackgroundLayerMgr.name,
]);
myModule.value(
  'gmfBackgroundlayerselectorTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfBackgroundlayerselectorTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/backgroundlayerselector';
  },
);
myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/backgroundlayerselector', require('./component.html'));
    },
  ],
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfBackgroundlayerselectorTemplateUrl
 *    Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
gmfBackgroundlayerselectorTemplateUrl.$inject = [
  '$element',
  '$attrs',
  'gmfBackgroundlayerselectorTemplateUrl',
];
function gmfBackgroundlayerselectorTemplateUrl($element, $attrs, gmfBackgroundlayerselectorTemplateUrl) {
  return gmfBackgroundlayerselectorTemplateUrl($element, $attrs);
}

/**
 * Provide a "background layer selector" component.
 *
 * Example:
 *
 *      <gmf-backgroundlayerselector
 *        gmf-backgroundlayerselector-map="::ctrl.map"
 *        gmf-backgroundlayerselector-select="onBackgroundSelected()">
 *      </gmf-backgroundlayerselector>
 *
 * Used metadata:
 *
 *  - `thumbnail`: The URL used for the icon.
 *
 * Used functionalities:
 *
 *  - `default_basemap`: Base maps to use by default.
 *
 * @htmlAttribute {import('ol/Map').default} [gmf]-backgroundlayerselector-map The map.
 * @htmlAttribute {Function} gmf-backgroundlayerselector-select Function called
 *     when a layer was selected by the user.
 * @ngdoc component
 * @ngname gmfBackgroundlayerselector
 */
const backgroundlayerselectorComponent = {
  controller: 'GmfBackgroundlayerselectorController as ctrl',
  bindings: {
    'map': '=gmfBackgroundlayerselectorMap',
    'select': '&?gmfBackgroundlayerselectorSelect',
  },
  templateUrl: gmfBackgroundlayerselectorTemplateUrl,
};
myModule.component('gmfBackgroundlayerselector', backgroundlayerselectorComponent);

/**
 * @class
 * @hidden
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes Themes service.
 * @param {import('gmf/options').gmfBackgroundLayerSelectorOptions} gmfBackgroundLayerSelectorOptions The options
 * @ngInject
 * @ngdoc controller
 * @ngname GmfBackgroundlayerselectorController
 */
export function Controller($scope, ngeoBackgroundLayerMgr, gmfThemes, gmfBackgroundLayerSelectorOptions) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('gmf/options').gmfBackgroundLayerSelectorOptions}
   */
  this.options = gmfBackgroundLayerSelectorOptions;

  /**
   * Function called when a layer was selected by the user.
   *
   * @type {?Function}
   */
  this.select = null;

  /**
   * @type {?import('ol/layer/Base').default}
   */
  this.bgLayer = null;

  /**
   * @type {?import('ol/layer/Base').default[]}
   */
  this.bgLayers = null;

  /**
   * @type {?import('ol/layer/Base').default}
   */
  this.opacityLayer = null;

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];
  this.listenerKeys_.push(listen(gmfThemes, 'change', this.handleThemesChange_, this));

  /**
   * @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  this.listenerKeys_.push(
    listen(
      this.backgroundLayerMgr_,
      'change',
      /** @type {import('ol/events').ListenerFunction} */
      (event) => {
        this.bgLayer =
          /** @type {import('ngeo/map/BackgroundLayerMgr').BackgroundEvent} */
          event.detail.current;
      },
    ),
  );
  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Initialize the controller.
 */
Controller.prototype.$onInit = function () {
  this.handleThemesChange_();
};

/**
 * Called when the themes changes. Set (or reset) the background layers.
 */
Controller.prototype.handleThemesChange_ = function () {
  this.gmfThemes_.getBgLayers().then((layers) => {
    this.bgLayers = layers;
    if (this.options.opacityLayer !== undefined) {
      const opacityLayer = layers.find((layer) => layer.get('label') === this.options.opacityLayer);
      if (opacityLayer !== undefined) {
        this.setOpacityBgLayer(opacityLayer);

        // Reorder for the UI the bgArray copy with the opacity layer at the end
        this.bgLayers = this.bgLayers.slice();
        const indexOpa = this.bgLayers.findIndex((layer) => layer === this.opacityLayer);
        this.bgLayers.splice(indexOpa, 1);
        this.bgLayers.push(opacityLayer);
      }
    }
  });
};

/**
 * Getter/setter for background layer overlay, used by opacity slider.
 *
 * @param {number|undefined} val The opacity.
 * @returns {number} The background layer opacity.
 */
Controller.prototype.getSetBgLayerOpacity = function (val) {
  if (!this.opacityLayer) {
    throw new Error('Missing opacityLayer');
  }
  if (val !== undefined) {
    this.opacityLayer.setOpacity(val);
    this.opacityLayer.setVisible(val !== 0);
    this.bgLayer.setVisible(val !== 1);
  }
  return this.opacityLayer.getOpacity();
};

/**
 * @param {import('ol/layer/Base').default} layer Layer.
 * @param {boolean} [opt_silent] Do not notify listeners.
 */
Controller.prototype.setLayer = function (layer, opt_silent) {
  gmfBackgroundlayerStatus.touchedByUser = true;
  const opacity = this.opacityLayer ? this.opacityLayer.getOpacity() : 0;
  this.bgLayer = layer;
  this.backgroundLayerMgr_.set(this.map, layer);
  layer.setVisible(opacity !== 1);
  if (this.opacityLayer) {
    this.opacityLayer.setVisible(opacity !== 0);
    this.opacityLayer.setOpacity(opacity);
  }
  if (!opt_silent && this.select) {
    this.select();
  }
};

/**
 * Set a background layer overlay, used by the opacity slider.
 *
 * @param {import('ol/layer/Base').default} layer The opacity background layer.
 */
Controller.prototype.setOpacityBgLayer = function (layer) {
  const opacity = this.opacityLayer ? this.opacityLayer.getOpacity() : 0;
  layer.setOpacity(opacity);
  this.opacityLayer = layer;
  this.opacityLayer.setVisible(opacity !== 0);
  if (this.bgLayer) {
    this.bgLayer.setVisible(opacity !== 1);
  }
  this.backgroundLayerMgr_.setOpacityBgLayer(this.map, layer);
};
Controller.prototype.handleDestroy_ = function () {
  this.listenerKeys_.forEach(unlistenByKey);
  this.listenerKeys_.length = 0;
};
myModule.controller('GmfBackgroundlayerselectorController', Controller);
export default myModule;
