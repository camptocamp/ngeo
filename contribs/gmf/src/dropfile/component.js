// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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
import {MessageType} from 'ngeo/message/Message';
import gmfExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager';

/**
 * This function handles drag and drop on the element. It is used on the map
 *
 * <div
 *   ngeo-map="ctrl.map"
 *   ngeo-map-manage-resize="ctrl.manageResize"
 *   ngeo-map-resize-transition="ctrl.resizeTransition"
 *   gmf-file-drop-zone>
 * </div>
 *
 * Displays a 'drop here' div on dragover/dragenter and removes it on dragleave/drop
 * On drop the file is added to the external datasources if it is valid
 * Otherwise an alert message is shown
 * This function is enabled for desktop only in AbstractDesktopController.js with
 *
 *     module.value('gmfFileDropEnabled', true);
 *
 *
 * @ngInject
 * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
 * @param {import('ngeo/message/Notification').MessageNotification} ngeoNotification Ngeo notification
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfFileDropZone
 */
const fileDrop = function (gmfExternalDataSourcesManager, ngeoNotification, gettextCatalog) {
  return {
    restrict: 'A',
    template: '<div class="drop-zone-off" id="drop-zone"><p>{{"Drop file here." | translate}}</p></div>',
    /**
     * @param {angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: function ($scope, element, attrs) {
      // @ts-ignore: scope ......
      if ($scope.ctrl.fileDropEnabled !== true) {
        return;
      }

      element.bind('dragover', processDrag_);
      element.bind('dragenter', processDrag_);
      element.bind('dragleave', processDrag_);

      element.bind(
        'drop',
        processDrop_.bind(this, element, gmfExternalDataSourcesManager, ngeoNotification, gettextCatalog)
      );
    },
  };
};

/**
 * Function to display and hide the 'drop-zone' element, which covers the element
 */
function processDrag_() {
  if (event !== null) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (event.type === 'dragenter' || event.type === 'dragleave') {
    const dropZone = document.getElementById('drop-zone');

    if (event.type === 'dragenter') {
      dropZone.classList.remove('drop-zone-off');
      dropZone.classList.add('drop-zone');
    }
    if (event.type === 'dragleave') {
      dropZone.classList.remove('drop-zone');
      dropZone.classList.add('drop-zone-off');
    }
  }
}

/**
 * This function handles the drop event
 * For a valid file, the file is added to the external source
 * For an invalid file an alert message is dsplayed
 * If an element with 'gmf-app-map-messages' (disclaimers) exists the message is added to it
 * otherwise it is placed directly on the element
 * the message desappears after a delay of 4 seconds
 *
 * @param {JQuery} element Element.
 * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
 * @param {import('ngeo/message/Notification').MessageNotification} ngeoNotification Ngeo notification
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog
 * @param {JQuery.DropEvent} event drop event.
 * @private
 * @hidden
 */
function processDrop_(element, gmfExternalDataSourcesManager, ngeoNotification, gettextCatalog, event) {
  if (event !== null) {
    event.preventDefault();
  }
  const dropZone = document.getElementById('drop-zone');
  dropZone.classList.remove('drop-zone');
  dropZone.classList.add('drop-zone-off');
  const file = event.originalEvent.dataTransfer.files[0];
  gmfExternalDataSourcesManager.createAndAddDataSourceFromFile(file, (success) => {
    if (!success) {
      const div = document.createElement('DIV');
      div.id = 'file-alert';

      const alertElements = document.getElementsByClassName('gmf-app-map-messages');
      if (alertElements && alertElements.length > 0) {
        div.classList.add('gmf-file-alert-contained');
        alertElements[0].insertBefore(div, alertElements[0].childNodes[0]);
      } else {
        div.classList.add('gmf-file-alert-alone');
        element[0].appendChild(div);
      }
      const delay = 4000;
      ngeoNotification.notify({
        msg: gettextCatalog.getString('This file can not be imported!'),
        type: MessageType.ERROR,
        target: '#file-alert',
        delay: delay,
      });

      setTimeout(function () {
        const el = document.getElementById('file-alert');
        el.remove();
      }, delay);
    }
  });
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfFileDropZone', [gmfExternalDataSourcesManager.name]);

myModule.directive('gmfFileDropZone', fileDrop);

export default myModule;
