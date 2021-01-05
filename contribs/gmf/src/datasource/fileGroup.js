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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfDatasourceFileGroup', []);

/**
 * The "gmfDatasourceFileGroup" angular value serves as a placeholder
 * for the ngeo FileGroup data source that is created when the user
 * adds geospatial files to the map (KML files, for example).
 *
 * It is used in the GMF Snapping to be able for drawn/edited features
 * to be snapped onto features that were imported in such a manner.
 *
 * @typedef {Object} DatasourceFileGroup
 * @property {import("ngeo/datasource/FileGroup.js").default|null} fileGroup
 */

myModule.value('gmfDatasourceFileGroup', {
  fileGroup: null,
});

export default myModule;
