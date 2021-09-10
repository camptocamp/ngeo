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
import ngeoMapBackgroundLayerMgr from 'ngeo/map/BackgroundLayerMgr';
import ngeoMapComponent from 'ngeo/map/component';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';
import ngeoMapRecenter from 'ngeo/map/recenter';
import ngeoMapResizemap from 'ngeo/map/resizemap';
import ngeoMapScaleselector from 'ngeo/map/scaleselector';

/**
 * Also related to the map but not included in the module:
 *  - ngeo.map.FeatureOverlay (already required by ngeo.map.FeatureOverlayMgr)
 *
 * @type {angular.IModule}
 */
export default angular.module('ngeoMapModule', [
  ngeoMapBackgroundLayerMgr.name,
  ngeoMapComponent.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMapRecenter.name,
  ngeoMapResizemap.name,
  ngeoMapScaleselector.name,
]);
