// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

/**
 * @constructor
 * @param {angular.IQService} $q .
 * @param {angular.IHttpService} $http .
 * @param {angular.gettext.gettextFunction} gettext .
 * @ngInject
 * @hidden
 */
export function FileService($q, $http, gettext) {
  // Test the validity of the file size
  /**
   * @param {number} fileSize
   */
  this.isValidFileSize = function (fileSize) {
    return fileSize <= 20000000; // 20 Mo
  };

  /**
   * @param {string} fileContent
   */
  this.isWmsGetCap = function (fileContent) {
    return /<(WMT_MS_Capabilities|WMS_Capabilities)/.test(fileContent);
  };

  /**
   * @param {string} fileContent
   */
  this.isWmtsGetCap = function (fileContent) {
    return fileContent.includes('<Capabilities');
  };

  /**
   * @param {string} fileContent
   */
  this.isKml = function (fileContent) {
    return fileContent.includes('<kml') && fileContent.includes('</kml>');
  };

  /**
   * @param {string} fileContent
   */
  this.isGpx = function (fileContent) {
    return fileContent.includes('<gpx') && fileContent.includes('</gpx>');
  };

  /** @type {?FileReader} */
  let fileReader = null;
  /**
   * @param {Blob} file .
   * @return {angular.IPromise<string>} .
   */
  this.read = function (file) {
    const defer = $q.defer();
    if (fileReader && fileReader.readyState === FileReader.LOADING) {
      fileReader.abort();
    }
    fileReader = new FileReader();
    fileReader.onload = function (evt) {
      const target = evt.target;
      if (!(target instanceof FileReader)) {
        throw new Error('Wrong target type');
      }
      defer.resolve(target.result);
    };
    fileReader.onerror = function (evt) {
      const target = evt.target;
      if (!(target instanceof FileReader)) {
        throw new Error('Wrong target type');
      }
      const err = target.error;
      if (!err) {
        throw new Error('Missing error');
      }
      console.error('Reading file failed: ', err);
      defer.reject({
        'message': err.code == 20 ? gettext('Operation canceled') : gettext('Read failed'),
        'reason': err.message,
      });
    };
    fileReader.onprogress = function (evt) {
      defer.notify(evt);
    };
    // Read the file
    fileReader.readAsText(file);
    return defer.promise;
  };

  /** @type {angular.IDeferred<unknown>} */
  let canceler;
  /**
   * @param {string} url .
   * @param {angular.IDeferred<unknown>=} opt_cancelP .
   * @return {angular.IPromise<Blob>} .
   */
  this.load = function (url, opt_cancelP) {
    if (canceler) {
      canceler.resolve();
    }
    canceler = opt_cancelP || $q.defer();

    // Angularjs doesn't handle onprogress event
    const defer = $q.defer();
    $http
      .get(url, {
        timeout: canceler.promise,
      })
      .then(
        (response) => {
          defer.resolve(response.data);
        },
        (reason) => {
          console.error('Uploading file failed: ', reason);
          defer.reject({
            'message': gettext('Upload failed'),
            'reason': reason,
          });
        }
      );
    return defer.promise;
  };
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoFile', []);

myModule.service('ngeoFile', FileService);

export default myModule;
