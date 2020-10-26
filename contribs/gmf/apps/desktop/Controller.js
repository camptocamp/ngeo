// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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
import {isEventUsinCtrlKey} from 'ngeo/utils.js';
import gmfControllersAbstractDesktopController, {
  AbstractDesktopController,
} from 'gmf/controllers/AbstractDesktopController.js';
import appBase from '../appmodule.js';

if (!window.requestAnimationFrame) {
  alert(
    'Your browser is not supported, please update it or use another one. You will be redirected.\n\n' +
      "Votre navigateur n'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. " +
      'Vous allez être redirigé.\n\n' +
      'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. ' +
      'Sie werden weitergeleitet.'
  );
  window.location.href = 'https://geomapfish.org/';
}

/**
 * @private
 */
class Controller extends AbstractDesktopController {
  /**
   * @param {JQueryEventObject} event keydown event.
   */
  onKeydown(event) {
    if (event && isEventUsinCtrlKey(event) && event.key === 'p') {
      this.printPanelActive = true;
      event.preventDefault();
    }
  }
}

/**
 * @hidden
 */
const module = angular.module('Appdesktop', [appBase.name, gmfControllersAbstractDesktopController.name]);

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
