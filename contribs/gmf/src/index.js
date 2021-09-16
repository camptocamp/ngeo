// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
 * The default template base URL for modules, used as-is by the template cache.
 *
 * @type {string}
 */

/**
 * @hidden
 */
export const DATALAYERGROUP_NAME = 'data';

/**
 * @hidden
 */
export const EXTERNALLAYERGROUP_NAME = 'external';

/**
 * @hidden
 */
export const COORDINATES_LAYER_NAME = 'gmfCoordinatesLayerName';

/**
 * @enum {string}
 * @hidden
 */
export const PermalinkParam = {
  BG_LAYER: 'baselayer_ref',
  BG_LAYER_OPACITY: 'baselayer_opacity',
  EXTERNAL_DATASOURCES_NAMES: 'eds_n',
  EXTERNAL_DATASOURCES_URLS: 'eds_u',
  FEATURES: 'rl_features',
  MAP_CROSSHAIR: 'map_crosshair',
  MAP_SWIPE: 'map_swipe',
  MAP_SWIPE_VALUE: 'map_swipe_value',
  MAP_TOOLTIP: 'map_tooltip',
  MAP_X: 'map_x',
  MAP_Y: 'map_y',
  MAP_Z: 'map_zoom',
  TREE_GROUPS: 'tree_groups',
  WFS_LAYER: 'wfs_layer',
  WFS_NGROUPS: 'wfs_ngroups',
  WFS_SHOW_FEATURES: 'wfs_showFeatures',
};
