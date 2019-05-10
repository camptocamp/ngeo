import angular from 'angular';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olObservable from 'ol/Observable.js';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerLayer from 'ol/layer/Layer.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import ngeoLayerHelper from 'ngeo/map/LayerHelper.js';


/**
 * @typedef {Object} BackgroundEventDetails
 * @property {import("ol/layer/Base.js").default} current
 * @property {?import("ol/layer/Base.js").default} previous
 */


/**
 * @typedef {import("ngeo/CustomEvent.js").default<BackgroundEventDetails>} BackgroundEvent
 */


/**
 * @private
 * @hidden
 */
const BACKGROUNDLAYERGROUP_NAME = 'background';


/**
 * Provides a service for setting/unsetting background layers
 * in maps.
 *
 * The notion of background/base layers doesn't exist in OpenLayers. This
 * service adds that notion.
 *
 * Setting a background layer to map is done with the `set` function:
 *
 *     ngeoBackgroundLayerMgr.set(map, layer);
 *
 * To unset the background layer pass `null` as the `layer` argument:
 *
 *     ngeoBackgroundLayerMgr.set(map, null);
 *
 * The `get` function returns the current background layer of the map passed
 * as an argument. `null` is returned if the map doesn't have a background
 * layer.
 *
 * The background layer is always added at index 0 in the map's layers
 * collection. When a background layer is set it is inserted (at index 0)
 * if the map does not already have a background layer, otherwise the
 * new background layer replaces the previous one at index 0.
 *
 * Users can subscribe to a 'change' event to get notified when the background
 * layer changes:
 *
 *     ngeoBackgroundLayerMgr.on('change', function(e) {
 *       // do something with the layer
 *       let layer = ngeoBackgroundLayerMgr.get();
 *       // know which layer was used before
 *       let previous = e.previous
 *     });
 *
 * See our live examples:
 * [../examples/backgroundlayer.html](../examples/backgroundlayer.html)
 * [../examples/backgroundlayerdropdown.html](../examples/backgroundlayerdropdown.html)
 * @hidden
 */
export class MapBackgroundLayerManager extends olObservable {
  /**
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Themes service.
   * @ngInject
   */
  constructor(ngeoLayerHelper) {
    super();

    /**
     * Object used to track if maps have background layers.
     * @type {Object<string, boolean>}
     * @private
     */
    this.mapUids_ = {};

    /**
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;
  }

  /**
   * Return the current background layer of a given map. `null` is returned if
   * the map does not have a background layer.
   * @param {import("ol/Map.js").default} map Map.
   * @return {?import("ol/layer/Base.js").default} layer The background layer.
   */
  get(map) {
    const mapUid = olUtilGetUid(map).toString();
    return mapUid in this.mapUids_ ? this.ngeoLayerHelper_.getGroupFromMap(map,
      BACKGROUNDLAYERGROUP_NAME).getLayers().item(0) : null;
  }

  /**
   * Set the background layer of a map. If `layer` is `null` the background layer
   * is removed.
   * @param {import("ol/Map.js").default} map The map.
   * @param {import("ol/layer/Base.js").default} layer The new background layer.
   * @return {?import("ol/layer/Base.js").default} The previous background layer.
   */
  set(map, layer) {
    const ZIndex = -200;
    const mapUid = olUtilGetUid(map).toString();
    const previous = this.get(map);
    if (layer !== null) {
      layer.setZIndex(ZIndex);
      this.ngeoLayerHelper_.setZIndexToFirstLevelChildren(layer, ZIndex);
    }

    const bgGroup = this.ngeoLayerHelper_.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);

    if (previous !== null) {
      console.assert(mapUid in this.mapUids_);
      if (layer !== null) {
        bgGroup.getLayers().setAt(0, layer);
      } else {
        bgGroup.getLayers().removeAt(0);
        delete this.mapUids_[mapUid];
      }
    } else if (layer !== null) {
      bgGroup.getLayers().insertAt(0, layer);
      this.mapUids_[mapUid] = true;
    }
    /** @type {BackgroundEvent} */
    const event = new ngeoCustomEvent('change', {
      current: layer,
      previous: previous
    });
    this.dispatchEvent(event);

    return previous;
  }

  /**
   * Return the current background layer overlay of a given map, used by the opacity slider.
   * `null` is returned if the map does not have an opacity background layer.
   * @param {import("ol/Map.js").default} map Map.
   * @return {?import("ol/layer/Base.js").default} layer The opacity background layer.
   */
  getOpacityBgLayer(map) {
    const mapUid = olUtilGetUid(map).toString();
    return mapUid in this.mapUids_ ? this.ngeoLayerHelper_.getGroupFromMap(map,
      BACKGROUNDLAYERGROUP_NAME).getLayers().item(1) : null;
  }

  /**
   * Set an background layer overlay, used by the opacity slider.
   * @param {import("ol/Map.js").default} map The map.
   * @param {import("ol/layer/Base.js").default} layer The opacity background layer.
   */
  setOpacityBgLayer(map, layer) {
    const bgGroup = this.ngeoLayerHelper_.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
    const opacityBackgroundLayer = this.getOpacityBgLayer(map);
    if (opacityBackgroundLayer) {
      const previous = bgGroup.getLayers().remove(opacityBackgroundLayer);
      layer.setOpacity(previous ? previous.getOpacity() : 0);
      layer.setVisible(previous ? previous.getVisible() : true);
    }
    const ZIndex = -100;
    layer.setZIndex(ZIndex);
    this.ngeoLayerHelper_.setZIndexToFirstLevelChildren(layer, ZIndex);

    const index = bgGroup.getLayers().getArray().indexOf(layer);
    if (index === -1) {
      bgGroup.getLayers().push(layer);
    }
  }

  /**
   * @param {import("ol/Map.js").default} map The map.
   * @param {Object<string, string>} dimensions The global dimensions object.
   */
  updateDimensions(map, dimensions) {
    const baseBgLayer = this.get(map);
    if (baseBgLayer) {
      let layers = [baseBgLayer];
      if (baseBgLayer instanceof olLayerGroup) {
        // Handle the first level of layers of the base background layer.
        layers = baseBgLayer.getLayers().getArray();
      }

      layers.forEach((layer) => {
        if (layer instanceof olLayerLayer) {
          let hasUpdates = false;
          /** @type {Object<string, string>} */
          const updatedDimensions = {};
          for (const key in layer.get('dimensions')) {
            const value = dimensions[key];
            if (value !== undefined) {
              updatedDimensions[key] = value;
              hasUpdates = true;
            }
          }
          if (hasUpdates) {
            const source = layer.getSource();
            if (source instanceof olSourceWMTS) {
              source.updateDimensions(updatedDimensions);
              source.refresh();
            } else if (source instanceof olSourceTileWMS || source instanceof olSourceImageWMS) {
              source.updateParams(updatedDimensions);
              source.refresh();
            }
          }
        }
      });
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoBackgroundLayerMgr', [
  ngeoLayerHelper.name
]);
module.service('ngeoBackgroundLayerMgr', MapBackgroundLayerManager);


export default module;
