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


/**
 * Application entry point.
 *
 * This file includes `import`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import './sass/desktop.scss';
import './sass/vars_desktop.scss';

import angular from 'angular';
import gmfControllersAbstractDesktopController, {AbstractDesktopController}
  from 'gmf/controllers/AbstractDesktopController.js';
import appBase from '../appmodule.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

if (!window.requestAnimationFrame) {
  alert('Your browser is not supported, please update it or use another one. You will be redirected.\n\n'
    + 'Votre navigateur n\'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. '
    + 'Vous allez être redirigé.\n\n'
    + 'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. '
    + 'Sie werden weitergeleitet.');
  window.location.href = 'https://geomapfish.org/';
}


/**
 * @private
 */
class Controller extends AbstractDesktopController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor($scope, $injector) {
    super({
      srid: 2056,
      mapViewConfig: {
        center: [2632464, 1185457],
        zoom: 3,
        resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05],
        constrainResolution: true,
        extent: [2485071.54, 175346.36, 2828515.78, 1299941.84],
      }
    }, $scope, $injector);

    /**
     * @type {string[]}
     */
    this.searchCoordinatesProjections = [EPSG21781, EPSG2056, 'EPSG:4326'];

    /**
     * @type {number[]}
     */
    this.scaleSelectorValues = [1000000, 500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200];

    /**
     * @type {string[]}
     */
    this.elevationLayers = ['aster', 'srtm'];

    /**
     * @type {Object<string, import('gmf/mobile/measure/pointComponent.js').LayerConfig>}
     */
    this.elevationLayersConfig = {};

    /**
     * @type {string}
     */
    this.selectedElevationLayer = this.elevationLayers[0];

    /**
     * @type {Object<string, import('gmf/profile/component.js').ProfileLineConfiguration>}
     */
    this.profileLinesconfiguration = {
      'aster': {color: '#0000A0'},
      'srtm': {color: '#00A000'},
    };

    /**
     * @type {Array<import('gmf/map/mousepositionComponent.js').MousePositionProjection>}
     */
    this.mousePositionProjections = [{
      code: EPSG2056,
      label: 'CH1903+ / LV95',
      filter: 'ngeoNumberCoordinates::{x}, {y} m'
    }, {
      code: EPSG21781,
      label: 'CH1903 / LV03',
      filter: 'ngeoNumberCoordinates::{x}, {y} m'
    }, {
      code: 'EPSG:4326',
      label: 'WGS84',
      filter: 'ngeoDMSCoordinates:2'
    }];

    // Allow angular-gettext-tools to collect the strings to translate
    /** @type {angular.gettext.gettextCatalog} */
    const gettextCatalog = $injector.get('gettextCatalog');
    gettextCatalog.getString('Add a theme');
    gettextCatalog.getString('Add a sub theme');
    gettextCatalog.getString('Add a layer');
  }
}

/**
 * @hidden
 */
const module = angular.module('Appdesktop', [
  appBase.name,
  gmfControllersAbstractDesktopController.name,
]);


module.value('gmfContextualdatacontentTemplateUrl', 'gmf/contextualdata');
module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/contextualdata', require('./contextualdata.html'));
  }
);

module.controller('DesktopController', Controller);

export default module;
