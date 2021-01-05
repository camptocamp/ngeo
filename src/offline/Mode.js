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

import angular from 'angular';

class Mode {
  /**
   * @param {import("ngeo/offline/Configuration.js").default} ngeoOfflineConfiguration
   * ngeo offline configuration service.
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineState
   */
  constructor(ngeoOfflineConfiguration) {
    /**
     * Offline mode is enabled or not.
     * @type {boolean}
     * @private
     */
    this.enabled_ = false;

    /**
     * Offline component.
     * @type {?import("ngeo/offline/component.js").Controller}
     * @private
     */
    this.component_ = null;

    /**
     * @private
     * @type {import("ngeo/offline/Configuration.js").default}
     */
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
  }

  /**
   * Return if we are in offline mode.
   * @return {boolean} whether offline mode is enabled
   * @export
   */
  isEnabled() {
    return this.enabled_;
  }

  /**
   * Enable offline mode. ATM we cannot escape from the offline mode.
   * @export
   */
  enable() {
    this.enabled_ = true;
  }

  /**
   *
   * @param {import("ngeo/offline/component.js").Controller} component Offline component.
   * @export
   */
  registerComponent(component) {
    this.component_ = component;
  }

  /**
   * @export
   */
  activateOfflineMode() {
    if (!this.component_) {
      throw new Error('The component is not registered');
    }
    this.component_.activateOfflineMode();
  }

  /**
   * @return {boolean} True if data are accessible offline.
   * @export
   */
  hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineData();
  }
}

/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoOfflineMode', []);
module.service('ngeoOfflineMode', Mode);
Mode.module = module;

export default Mode;
