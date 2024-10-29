// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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

// see https://github.com/camptocamp/cgxp/blob/master/core/src/script/CGXP/api/Map.js

/**
 * @module api/Map.js
 */

import OLMap from 'ol/Map';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style, {createDefaultStyle} from 'ol/style/Style';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import SelectInteraction from 'ol/interaction/Select';

import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import ScaleLine from 'ol/control/ScaleLine';
import OverviewMap from 'ol/control/OverviewMap';
import createProjections from 'ngeo/proj/utils';

// @ts-ignore: there is no existing types for ol-layerswitcher
import LayerSwitcher from 'ol-layerswitcher';

import {
  createEmpty as olExtentCreateEmpty,
  extend as olExtentExtend,
  getCenter,
  isEmpty as olExtentIsEmpty,
} from 'ol/extent';
import {get as getProjection} from 'ol/proj';

import constants, {dynamicUrl} from './constants';

import {getFeaturesFromIds, getFeaturesFromCoordinates} from './Querent';
import * as themes from 'api/Themes';
import Search from 'api/Search';

/**
 * @typedef {Object} MarkerOptions
 * @property {[number, number]} [position] coordinates of the marker.
 * @property {string} [icon] image path for the marker.
 */

/**
 * @typedef {Object} MapOptions
 * @property {string} div target to render the map into.
 * @property {import('ol/coordinate').Coordinate} center coordinater of the map's center.
 * @property {number} [zoom=10] initial zoom.
 * @property {boolean} [showCoords=true] show coordinates or not.
 * @property {boolean} [addMiniMap=false] with mini map or not.
 * @property {boolean} [miniMapExpanded=true] allow mini map expand or not.
 * @property {boolean} [addLayerSwitcher=false] with or without layer switcher.
 * @property {boolean} [searchDiv] div containing the search element.
 * @property {string[]} [layers] layers on the map.
 * @property {string[]} [backgroundLayers] backgrounds on the map.
 */

/**
 * Attr is ['title', 'description'] by default
 *
 * @typedef {Object} CustomLayer
 * @property {string[]} [attr] attributes of the layer.
 * @property {function(): void} [success] success callback.
 * @property {function(): void} [error] error callback.
 */

/**
 * @type {string[]}
 */
const EXCLUDE_PROPERTIES = ['boundedBy'];

/**
 * @private
 * @hidden
 */
class Map {
  /**
   * @param {MapOptions} options API options.
   */
  constructor(options) {
    const request = new XMLHttpRequest();
    request.open('GET', dynamicUrl.dynamicUrl, false);
    request.send(null);

    if (request.status !== 200) {
      throw new Error('Error on getting the dynamic configuration');
    }

    Object.assign(constants, JSON.parse(request.responseText)['constants']);
    createProjections(constants.projections);

    /** @type {import('ol/View').ViewOptions} */
    const viewOptions = {
      projection: getProjection(constants.projection),
      resolutions: constants.resolutions,
      zoom: options.zoom !== undefined ? options.zoom : 10,
    };
    if (constants.extent) {
      viewOptions.extent = constants.extent;
    }
    /**
     * @private
     * @type {View}
     */
    this.view_ = new View(viewOptions);

    const constraints = this.view_.getConstraints();
    const centerConstraint = constraints.center;
    constraints.center = (coord, resolution, size) => {
      const newCenter = centerConstraint(coord, resolution, size);

      const correctionX = ((newCenter[0] / resolution - size[0] / 2 + 0.5) % 1) - 0.5;
      const correctionY = ((newCenter[1] / resolution - size[1] / 2 + 0.5) % 1) - 0.5;

      newCenter[0] -= correctionX * resolution;
      newCenter[1] -= correctionY * resolution;

      return newCenter;
    };

    if (options.center !== undefined) {
      this.view_.setCenter(options.center);
    } else if (constants.extent) {
      this.view_.setCenter(getCenter(constants.extent));
    }

    /**
     * @private
     * @type {OLMap}
     */
    this.map_ = new OLMap({
      target: options.div,
      view: this.view_,
    });

    /**
     * @private
     * @type {Overlay}
     */
    this.overlay_ = new Overlay({
      autoPan: true,
      autoPanAnimation: {
        duration: 80,
      },
      element: this.createOverlayDomTree_(),
    });
    this.map_.addOverlay(this.overlay_);

    this.map_.addControl(
      new ScaleLine({
        // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
        dpi: 96,
      }),
    );

    if (options.showCoords) {
      this.map_.addControl(
        new MousePosition({
          coordinateFormat: createStringXY(0),
        }),
      );
    }
    if (options.addMiniMap) {
      const resolutions = this.view_.getResolutions();
      if (!resolutions) {
        throw new Error('Missing resolutions');
      }
      themes.getBackgroundLayers().then((layers) => {
        // The options is an array for backward compatibility reason.
        const backgroundLayer = options.backgroundLayers || [constants.backgroundLayer];
        for (const layer of layers) {
          if (backgroundLayer.includes(layer.get('config.name'))) {
            this.map_.addControl(
              new OverviewMap({
                collapsed: !options.miniMapExpanded,
                // @ts-ignore: Group didn't extent Layer
                layers: [layer],
                view: new View({
                  projection: this.view_.getProjection(),
                  resolutions,
                }),
              }),
            );
          }
        }
      });
    }

    if (options.addLayerSwitcher) {
      this.map_.addControl(new LayerSwitcher());
    }

    // Get background layer first...
    themes.getBackgroundLayers().then((layers) => {
      // The options is an array for backward compatibility reason.
      const backgroundLayer = options.backgroundLayers || [constants.backgroundLayer];
      for (const layer of layers) {
        if (backgroundLayer.includes(layer.get('config.name'))) {
          // we don't want the background layer in the layerswitch so we remove the title.
          layer.set('title', undefined);
          this.map_.addLayer(layer);
        }
      }

      // ... then get overlay layers (if defined)
      const overlayLayerNames = options.layers;
      if (overlayLayerNames && overlayLayerNames.length) {
        themes.getOverlayLayers(overlayLayerNames).then((layers) => {
          for (const layer of layers) {
            if (layer !== null) {
              this.map_.addLayer(layer);
            }
          }
        });
      }
    });

    /**
     * @private
     * @type {VectorSource<import('ol/geom/Geometry').default>}
     */
    this.vectorSource_ = new VectorSource();

    /**
     * @private
     * @type {VectorLayer<VectorSource<import('ol/geom/Geometry').default>>}
     */
    this.vectorLayer_ = new VectorLayer({
      zIndex: 1,
      style: [],
      source: this.vectorSource_,
    });

    this.map_.addLayer(this.vectorLayer_);

    this.selectInteraction_ = new SelectInteraction({
      filter: (feature) => {
        const hasId = feature.getId() !== undefined;
        const hasTitle = feature.get('title') !== undefined;
        const hasDescription = feature.get('description') !== undefined;
        return hasId && hasTitle && hasDescription;
      },
      style: null,
    });
    this.map_.addInteraction(this.selectInteraction_);

    this.selectInteraction_.on(
      /** @type {import('ol/Observable').EventTypes} */ ('select'),
      /** @type {function(any): any} */ (
        /**
         * @param {import('lib/ol.interaction.Select').SelectEvent} event
         */
        (event) => {
          const selected = event.selected[0];
          if (selected) {
            this.selectObject(selected.getId());
          }
        }
      ),
    );

    this.map_.on(
      /** @type {import('ol/Observable').EventTypes} */ ('singleclick'),
      /** @type {function(?): ?} */ (
        /**
         * @param {import('ol/MapBrowserEvent').default<unknown>} event
         */
        (event) => {
          const resolution = this.map_.getView().getResolution();
          if (resolution === undefined) {
            throw new Error('Missing resolution');
          }
          const visibleLayers = this.map_
            .getLayers()
            .getArray()
            .filter((layer) => layer.getVisible());
          const visibleLayersName = visibleLayers.map((layer) => layer.get('config.name'));

          this.clearSelection();

          for (const layer of constants.queryableLayers) {
            if (visibleLayersName.includes(layer)) {
              getFeaturesFromCoordinates(layer, event.coordinate, resolution).then((feature) => {
                if (feature) {
                  this.vectorSource_.addFeature(feature);
                  this.selectObject(feature.getId(), event.coordinate, true);
                }
              });
            }
          }
        }
      ),
    );

    if (options.searchDiv) {
      const element = document.querySelector(`#${options.searchDiv}`);
      if (element) {
        const vectorLayer = new VectorLayer({
          zIndex: 1,
          source: new VectorSource(),
        });
        this.map_.addLayer(vectorLayer);

        new Search({
          container: /** @type {HTMLElement} */ (element),
          url: constants.searchUrl,
          source: vectorLayer.getSource(),
          view: this.map_.getView(),
        });
      } else {
        throw new Error('Invalid searchDiv option');
      }
    }
  }

  /**
   * @private
   * @returns {HTMLElement} overlay container element.
   */
  createOverlayDomTree_() {
    const overlayContainer = document.createElement('div');
    overlayContainer.className = 'ol-popup';
    const overlayCloser = document.createElement('div');
    overlayCloser.className = 'ol-popup-closer';
    overlayCloser.addEventListener('click', () => {
      this.clearSelection();
      return false;
    });
    const overlayContent = document.createElement('div');
    overlayContent.className = 'ol-popup-content';

    overlayContainer.appendChild(overlayCloser);
    overlayContainer.appendChild(overlayContent);

    return overlayContainer;
  }

  /**
   * @returns {OLMap}
   */
  getMap() {
    return this.map_;
  }

  /**
   * @param {import('ol/coordinate').Coordinate} center Center.
   * @param {number} zoom Zoom.
   */
  recenter(center, zoom) {
    this.view_.setCenter(center);
    this.view_.setZoom(zoom);
  }

  /**
   * @param {MarkerOptions} options Options.
   */
  addMarker(options = {}) {
    const position = options.position ? options.position : this.view_.getCenter();
    if (!position) {
      throw new Error('Missing positon');
    }
    const marker = new Feature({
      geometry: new Point(position),
    });
    if (options.icon) {
      // FIXME: use size?
      const image = new Icon({
        src: options.icon,
      });
      marker.setStyle(
        new Style({
          image,
        }),
      );
    } else {
      marker.setStyle(createDefaultStyle);
    }
    this.vectorSource_.addFeature(marker);
  }

  /**
   * @param {string} layer Name of the layer to fetch the features from
   * @param {string[]} ids List of ids
   * @param {boolean} [highlight=false] Whether to add the features on the map or not.
   */
  recenterOnObjects(layer, ids, highlight = false) {
    getFeaturesFromIds(layer, ids)
      .then((features) => {
        if (!features.length) {
          console.error('Could not recenter: no objects were found.');
          return;
        }
        const extent = olExtentCreateEmpty();
        for (const feature of features) {
          if (highlight) {
            feature.setStyle(createDefaultStyle);
          }
          const geom = feature.getGeometry();
          if (geom) {
            olExtentExtend(extent, geom.getExtent());
          }
        }
        if (!olExtentIsEmpty(extent)) {
          this.view_.fit(extent);
        }
        if (highlight) {
          this.vectorSource_.addFeatures(features);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * @param {string} type Layer type, only 'text' format is supported.
   * @param {string} name Name.
   * @param {string} url URL.
   * @param {CustomLayer} [options] Options
   */
  addCustomLayer(type, name, url, options = {}) {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const attr = options.attr || ['title', 'description'];
        const lines = text.split(/\r\n|\r|\n/);
        const shiftedLines = lines.shift();
        if (!shiftedLines) {
          throw new Error('Missing shiftedLines');
        }
        const columns = shiftedLines.split('\t');
        for (const line of lines) {
          if (line) {
            const values = /** @type {Object<string, string>} */ (
              /** @type {any} */ (zip(columns, line.split('\t')))
            );
            // reverse to order of the coordinates to be compatible with the old api.
            const marker = new Feature({
              geometry: new Point(values.point.split(',').reverse().map(parseFloat)),
            });
            // @ts-ignore: Template don't look to work :-(
            marker.setProperties(filterByKeys(values, attr));
            marker.setId(values.id);
            let anchor;
            if (values.iconOffset) {
              // flip the sign of the value to be compatible with the old api.
              anchor = values.iconOffset
                .split(',')
                .map(parseFloat)
                .map(
                  /**
                   * @param {number} val
                   * @returns {number}
                   */
                  (val) => val * Math.sign(val),
                );
            }
            const image = new Icon({
              src: values.icon,
              anchorXUnits: 'pixels',
              anchorYUnits: 'pixels',
              anchor: anchor,
            });
            marker.setStyle(
              new Style({
                image,
              }),
            );
            this.vectorSource_.addFeature(marker);
          }
        }
        this.view_.fit(this.vectorSource_.getExtent());
      })
      .then(() => {
        if (options.success) {
          options.success();
        }
      })
      .catch(() => {
        if (options.error) {
          options.error();
        }
      });
  }

  /**
   * @param {string|number} id Identifier.
   * @param {import('ol/coordinate').Coordinate} position
   * @param {boolean} table Display all properties in a table
   */
  selectObject(id, position = null, table = false) {
    const feature = this.vectorSource_.getFeatureById(id);
    if (!feature) {
      console.error(`No feature with id ${id}`);
    }
    if (!position) {
      const point = feature.getGeometry();
      if (!(point instanceof Point)) {
        throw new Error('Wrong geometry type');
      }
      position = point.getCoordinates();
    }
    const geometryName = feature.getGeometryName();
    const properties = feature.getProperties();
    themes.getLocalePromise().then((translations) => {
      let contentHTML = '';
      if (table) {
        contentHTML += '<table><tbody>';
        for (const key in properties) {
          if (!EXCLUDE_PROPERTIES.includes(key) && key !== geometryName && properties[key] !== undefined) {
            contentHTML += '<tr>';
            contentHTML += `<th>${translations[key] || key}</th>`;
            contentHTML += `<td>${properties[key]}</td>`;
            contentHTML += '</tr>';
          }
        }
        contentHTML += '</tbody></table>';
      } else {
        contentHTML += `<div><b>${properties.title}</b></div>`;
        contentHTML += `<p>${properties.description}</p>`;
      }
      const element = this.overlay_.getElement();
      if (!element) {
        throw new Error('Missing element');
      }
      const content = element.querySelector('.ol-popup-content');
      if (!content) {
        throw new Error('Missing content');
      }
      content.innerHTML = contentHTML;
      this.overlay_.setPosition(position);
    });
  }

  /**
   *
   */
  clearSelection() {
    // clear the selected features
    this.selectInteraction_.getFeatures().clear();
    // hide the overlay
    this.overlay_.setPosition(undefined);
  }
}

/**
 * @param {string[]} keys Keys.
 * @param {T[]} values Values.
 * @returns {Object<string, T>} Object.
 * @template T
 * @private
 * @hidden
 */
function zip(keys, values) {
  /** @type {Object<string, T>} */
  const obj = {};
  keys.forEach((key, index) => {
    obj[key] = values[index];
  });
  return obj;
}

/**
 * @param {Object<string, T>} obj Object.
 * @param {string[]} keys keys.
 * @returns {Object<string, T>} Object.
 * @template T
 * @private
 * @hidden
 */
function filterByKeys(obj, keys) {
  /** @type {Object<string, T>} */
  const filtered = {};
  keys.forEach((key) => {
    filtered[key] = obj[key];
  });
  return filtered;
}

export default Map;
