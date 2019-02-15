// see https://github.com/camptocamp/cgxp/blob/master/core/src/script/CGXP/api/Map.js

/**
 * @module api/Map.js
 */

import OLMap from 'ol/Map.js';
import Feature from 'ol/Feature.js';
import Overlay from 'ol/Overlay.js';
import Point from 'ol/geom/Point.js';
import {Icon, Style} from 'ol/style.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';

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

import * as constants from './constants.js';

import {getFeaturesFromLayer} from './Querent.js';
import * as themes from './Themes.js';


/**
 * @private
 * @hidden
 */
class Map {

  /**
   * @param {Object} options API options.
   * @property {string} div
   * @property {import("ol/coordinate.js").Coordinate} center
   * @property {number} [zoom=10]
   * @property {boolean} [showCoords=true]
   * TODO: more options
   */
  constructor(options) {

    /**
     * @private
     * @type {View}
     */
    this.view_ = new View({
      projection: getProjection(constants.projection),
      extent: constants.extent,
      resolutions: constants.resolutions,
      zoom: options.zoom !== undefined ? options.zoom : 10
    });

    if (options.center !== undefined) {
      this.view_.setCenter(options.center);
    } else {
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
      this.map_.addControl(new OverviewMap({
        collapsed: !options.miniMapExpanded,
        view: new View({
          projection: this.view_.getProjection(),
          resolutions: this.view_.getResolutions()
        })
      }));
    }

    if (options.addLayerSwitcher) {
      this.map_.addControl(new LayerSwitcher());
    }

    // Get background layer first...
    themes.getBackgroundLayers().then((layers) => {
      for (const layer of layers) {
        if (layer.get('config.name') === constants.backgroundLayer) {
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
     * @type {VectorSource}
     */
    this.vectorSource_ = new VectorSource();

    /**
     * @private
     * @type {VectorLayer}
     */
    this.vectorLayer_ = new VectorLayer({
      zIndex: 1,
      source: this.vectorSource_
    });

    this.map_.addLayer(this.vectorLayer_);

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
    overlayCloser.addEventListener('click', (event) => {
      this.overlay_.setPosition(undefined);
      return false;
    });
    const overlayContent = document.createElement('div');
    overlayContent.className = 'ol-popup-content';

    overlayContainer.appendChild(overlayCloser);
    overlayContainer.appendChild(overlayContent);

    return overlayContainer;
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
   * @param {Object} options Options.
   * @property {import("ol/coordinate.js").Coordinate} position
   * @property {string} [icon]
   * @property {import("ol/size.js").Size} [size]
   */
  addMarker(options = {}) {
    const marker = new Feature({
      geometry: new Point(options.position ? options.position : this.view_.getCenter())
    });
    if (options.icon) {
      // FIXME: use size?
      marker.setStyle(new Style({
        image: new Icon({
          src: options.icon
        })
      }));
    }
    this.vectorSource_.addFeature(marker);
  }

  /**
   * @param {string} layer Name of the layer to fetch the features from
   * @param {Array.<string>} ids List of ids
   * @param {boolean} [highlight=false] Whether to add the features on
   *     the map or not.
   */
  recenterOnObjects(layer, ids, highlight = false) {
    getFeaturesFromLayer(layer, ids)
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
   * @property {Array.<string>} [attr=['title', 'description']]
   * @property {function()} [success]
   * @property {function()} [error]
   */
  addCustomLayer(type, name, url, options = {}) {
    fetch(url)
      .then(response => response.text())
      .then((text) => {
        const attr = options.attr || ['title', 'description'];
        const lines = text.split(/\r\n|\r|\n/);
        const columns = lines.shift().split('\t');
        for (const line of lines) {
          if (line) {
            const values = zip(columns, line.split('\t'));
            const marker = new Feature({
              geometry: new Point(values.point.split(',').map(parseFloat))
            });
            marker.setProperties(filterByKeys(values, attr));
            marker.setId(values.id);
            // FIXME: handle values.iconSize
            // FIXME: handle values.iconOffset
            marker.setStyle(new Style({
              image: new Icon({
                src: values.icon
              })
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
   * @param {string} id Identifier.
   */
  selectObject(id) {
    const feature = this.vectorSource_.getFeatureById(id);
    if (feature) {
      const coordinates = /** @type {import('ol/geom/Point.js').default} */(feature.getGeometry()).getCoordinates();
      const properties = feature.getProperties();
      const content = this.overlay_.getElement().querySelector('.ol-popup-content');
      content.innerHTML += `<div><b>${properties.title}</b></div>`;
      content.innerHTML += `<p>${properties.description}</p>`;
      this.overlay_.setPosition(coordinates);

      this.view_.setCenter(coordinates);
    }
  }

}


/**
 * @param {Array.<string>} keys Keys.
 * @param {Array.<*>} values Values.
 * @returns {Object<string, *>} Object.
 * @private
 * @hidden
 */
function zip(keys, values) {
  const obj = {};
  keys.forEach((key, index) => {
    obj[key] = values[index];
  });
  return obj;
}


/**
 * @param {Object.<string, *>} obj Object.
 * @param {Array.<string>} keys keys.
 * @returns {Object<string, *>} Object.
 * @private
 * @hidden
 */
function filterByKeys(obj, keys) {
  const filtered = {};
  keys.forEach((key) => {
    filtered[key] = obj[key];
  });
  return filtered;
}


export default Map;
