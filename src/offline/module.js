// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import ngeoOfflineComponent from 'ngeo/offline/component.js';
import ngeoOfflineNetworkStatus from 'ngeo/offline/NetworkStatus.js';
import ngeoOfflineServiceManager from 'ngeo/offline/ServiceManager.js';
import downloader from 'ngeo/offline/Downloader.js';
import restorer from 'ngeo/offline/Restorer.js';
import mode from 'ngeo/offline/Mode.js';
import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoOfflineModule', [
  ngeoOfflineComponent.name,
  ngeoOfflineNetworkStatus.module.name,
  ngeoOfflineServiceManager.module.name,
  downloader.module.name,
  restorer.module.name,
  mode.module.name,
]);

exports.value('ngeoOfflineGutter', 96);

export default exports;
