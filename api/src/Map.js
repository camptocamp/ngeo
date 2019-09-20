// see https://github.com/camptocamp/cgxp/blob/master/core/src/script/CGXP/api/Map.js

/**
 * @module api/Map.js
 */

import OLMap from 'ol/Map.js';
import Feature from 'ol/Feature.js';
import Overlay from 'ol/Overlay.js';
import Point from 'ol/geom/Point.js';
import {Icon, Style} from 'ol/style.js';
import {createDefaultStyle} from 'ol/style/Style.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import SelectInteraction from 'ol/interaction/Select.js';

import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import ScaleLine from 'ol/control/ScaleLine.js';
import OverviewMap from 'ol/control/OverviewMap.js';

// @ts-ignore there is no existing types for ol-layerswitcher
import LayerSwitcher from 'ol-layerswitcher';

import {
  createEmpty as olExtentCreateEmpty,
  extend as olExtentExtend,
  getCenter,
  isEmpty as olExtentIsEmpty
} from 'ol/extent.js';
import {get as getProjection} from 'ol/proj.js';

import constants from './constants.js';

import {getFeaturesFromIds, getFeaturesFromCoordinates} from './Querent.js';
import * as themes from './Themes.js';


/**
 * @typedef {Object} MarkerOptions
 * @property {[number, number]} [position]
 * @property {string} [icon]
 */

/**
 * @typedef {Object} MapOptions
 * @property {string} div
 * @property {import("ol/coordinate.js").Coordinate} center
 * @property {number} [zoom=10]
 * @property {boolean} [showCoords=true]
 * @property {boolean} [addMiniMap=false]
 * @property {boolean} [miniMapExpanded=true]
 * @property {boolean} [addLayerSwitcher=false]
 * @property {string[]} [layers]
 * @property {string[]} [backgroundLayers]
 */

/**
 * @type {Array<string>}
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
    /** @type {import('ol/View.js').ViewOptions} */
    const viewOptions = {
      projection: getProjection(constants.projection),
      resolutions: constants.resolutions,
      zoom: options.zoom !== undefined ? options.zoom : 10
    };
    if (constants.extent) {
      viewOptions.extent = constants.extent;
    }
    /**
     * @private
     * @type {View}
     */
    this.view_ = new View(viewOptions);

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
      view: this.view_
    });

    /**
     * @private
     * @type {Overlay}
     */
    this.overlay_ = new Overlay({
      autoPan: true,
      autoPanAnimation: {
        duration: 80
      },
      element: this.createOverlayDomTree_()
    });
    this.map_.addOverlay(this.overlay_);

    this.map_.addControl(new ScaleLine());

    if (options.showCoords) {
      this.map_.addControl(new MousePosition({
        coordinateFormat: createStringXY(0)
      }));
    }
    if (options.addMiniMap) {
      const resolutions = this.view_.getResolutions();
      if (!resolutions) {
        throw new Error('Missing resolutions');
      }
      this.map_.addControl(new OverviewMap({
        collapsed: !options.miniMapExpanded,
        layers: [],
        view: new View({
          projection: this.view_.getProjection(),
          resolutions,
        })
      }));
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
            this.map_.addLayer(layer);
          }
        });
      }
    });

    /**
     * @private
     * @type {VectorSource<import("ol/geom/Geometry.js").default>}
     */
    this.vectorSource_ = new VectorSource();

    /**
     * @private
     * @type {VectorLayer}
     */
    this.vectorLayer_ = new VectorLayer({
      zIndex: 1,
      style: [],
      source: this.vectorSource_
    });

    this.map_.addLayer(this.vectorLayer_);

    this.selectInteraction_ = new SelectInteraction({
      filter: (feature) => {
        const hasId = feature.getId() !== undefined;
        const hasTitle = feature.get('title') !== undefined;
        const hasDescription = feature.get('description') !== undefined;
        return hasId && hasTitle && hasDescription;
      },
      style: () => []
    });
    this.map_.addInteraction(this.selectInteraction_);

    this.selectInteraction_.on('select', (event) => {
      const selected = event.selected[0];
      if (selected) {
        this.selectObject(selected.getId());
      }
    });


    this.map_.on('singleclick', (event) => {
      const resolution = this.map_.getView().getResolution();
      if (resolution === undefined) {
        throw new Error('Missing resolution');
      }
      const visibleLayers = this.map_.getLayers().getArray().filter(layer => layer.getVisible());
      const visibleLayersName = visibleLayers.map(layer => layer.get('config.name'));

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
    });
  }

  /**
   * @private
   * @return {HTMLElement} overlay container element.
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
   * @return {OLMap}
   */
  getMap() {
    return this.map_;
  }

  /**
   * @param {import("ol/coordinate.js").Coordinate} center Center.
   * @param {number} zoom Zoom.
   */
  recenter(center, zoom) {
    this.view_.setCenter(center);
    this.view_.setZoom(zoom);
  }

  /**
   * @param {MarkerOptions} options Options.
   * @property {import("ol/coordinate.js").Coordinate} position
   * @property {string} [icon]
   * @property {import("ol/size.js").Size} [size]
   */
  addMarker(options = {}) {
    const position = options.position ? options.position : this.view_.getCenter();
    if (!position) {
      throw new Error('Missing positon');
    }
    const marker = new Feature({
      geometry: new Point(position)
    });
    if (options.icon) {
      // FIXME: use size?
      const image = new Icon({
        src: options.icon
      });
      marker.setStyle(new Style({
        image
      }));
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
   * @param {Object} [options] Options
   * @property {string[]} [attr=['title', 'description']]
   * @property {function()} [success]
   * @property {function()} [error]
   */
  addCustomLayer(type, name, url, options = {}) {
    fetch(url)
      .then(response => response.text())
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
            const values = zip(columns, line.split('\t'));
            // reverse to order of the coordinates to be compatible with the old api.
            const marker = new Feature({
              geometry: new Point(values.point.split(',').reverse().map(parseFloat))
            });
            marker.setProperties(filterByKeys(values, attr));
            marker.setId(values.id);
            let anchor;
            if (values.iconOffset) {
              // flip the sign of the value to be compatible with the old api.
              anchor = values.iconOffset.split(',').map(parseFloat).map(
                /**
                 * @param {number} val
                 */
                val => val * Math.sign(val)
              );
            }
            const image = new Icon({
              src: values.icon,
              anchorXUnits: 'pixels',
              anchorYUnits: 'pixels',
              anchor: anchor
            });
            marker.setStyle(new Style({
              image
            }));
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
   * @param {import("ol/coordinate.js").Coordinate} position
   * @param {boolean} table Display all properties in a table
   */
  selectObject(id, position = null, table = false) {
    const feature = this.vectorSource_.getFeatureById(id);
    if (feature) {
      if (!position) {
        const point = feature.getGeometry();
        if (!(point instanceof Point)) {
          throw new Error('Wrong geometry type');
        }
        position = point.getCoordinates();
      }
      const geometryName = feature.getGeometryName();
      const properties = feature.getProperties();
      let contentHTML = '';
      if (table) {
        contentHTML += '<table><tbody>';
        for (const key in properties) {
          if (!EXCLUDE_PROPERTIES.includes(key) && key !== geometryName && properties[key] !== undefined) {
            contentHTML += '<tr>';
            contentHTML += `<th>${key}</th>`;
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
    }
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
 * @param {Array<*>} values Values.
 * @return {Object<string, *>} Object.
 * @private
 * @hidden
 */
function zip(keys, values) {
  /** @type {Object<string, *>} */
  const obj = {};
  keys.forEach((key, index) => {
    obj[key] = values[index];
  });
  return obj;
}


/**
 * @param {Object<string, *>} obj Object.
 * @param {string[]} keys keys.
 * @return {Object<string, *>} Object.
 * @private
 * @hidden
 */
function filterByKeys(obj, keys) {
  /** @type {Object<string, *>} */
  const filtered = {};
  keys.forEach((key) => {
    filtered[key] = obj[key];
  });
  return filtered;
}


export default Map;
