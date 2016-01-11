goog.provide('ngeo.LayerFromCap');


/**
 * @typedef {{
 *   Abstract: string,
 *   BoundingBox: Array.<{srs: string, crs: string, extent: ol.Extent}>,
 *   CRS: Array.<string>,
 *   SRS: Array.<string>,
 *   EX_GeographicBoundingBox: ol.Extent,
 *   LatLonBoundingBox: ol.Extent,
 *   Layer: (undefined|Array.<ngeo.CapLayer>),
 *   Name: string,
 *   wmsUrl: string,
 *   wmsVersion: string,
 *   id: string,
 *   isInvalid: boolean,
 *   Title: string
 * }}
 */
ngeo.CapLayer;



/**
 * @constructor
 * @param {ol.Map} map
 * @export
 */
ngeo.LayerFromCap = function(map) {

  /**
   * @private
   */
  this.map_ = map;
};


/**
 * Test if the layer can be displayed with a specific projection.
 * @param {ngeo.CapLayer} layer
 * @param {string} projCode
 * @return {boolean}
 */
ngeo.LayerFromCap.prototype.canUseProj = function(layer, projCode) {
  var projCodeList = layer.CRS || layer.SRS || [];
  return (projCodeList.indexOf(projCode.toUpperCase()) !== -1 ||
      projCodeList.indexOf(projCode.toLowerCase()) !== -1);
};


/**
 * Go through all layers, assign needed properties,
 * and remove useless layers (no name or bad crs without childs).
 * @param {ngeo.CapLayer} layer
 * @param {string|undefined} projCode
 * @param {string} wmsVersion
 * @param {string} fileUrl
 * @return {ngeo.CapLayer|undefined}
 */
ngeo.LayerFromCap.prototype.getChildLayers = function(layer, projCode,
    wmsVersion, fileUrl) {
  // If projCode is undefined that means the parent layer can be
  // displayed with the current map projection, since it's an herited
  // property no need to test again.
  // We don't have proj codes list for wms 1.1.1 so we assume the
  // layer can be displayed (wait for
  // https://github.com/openlayers/ol3/pull/2944)
  if (wmsVersion == '1.3.0' && projCode) {
    if (!this.canUseProj(layer, projCode)) {
      layer.isInvalid = true;
      layer.Abstract = 'layer_invalid_no_crs';
    } else {
      projCode = undefined;
    }
  }

  // If the WMS layer has no name, it can't be displayed
  if (!layer.Name) {
    layer.isInvalid = true;
    layer.Abstract = 'layer_invalid_no_name';
  }

  if (!layer.isInvalid) {
    layer.wmsUrl = fileUrl;
    layer.wmsVersion = wmsVersion;
    layer.id = 'WMS||' + layer.wmsUrl + '||' + layer.Name;
    layer.extent = this.getLayerExtentFromGetCap(layer);
  }

  // Go through the child to get valid layers
  if (layer.Layer) {
    for (var i = 0; i < layer.Layer.length; i++) {
      var l = this.getChildLayers(layer.Layer[i], projCode, wmsVersion,
          fileUrl);
      if (!l) {
        layer.Layer.splice(i, 1);
        i--;
      }
    }

    // No valid child
    if (layer.Layer.length === 0) {
      layer.Layer = undefined;
    }
  }

  if (layer.isInvalid && !layer.Layer) {
    return undefined;
  }

  return layer;
};


/**
 * Get the layer extent defines in the GetCapabilities.
 * @param {ngeo.CapLayer} layer
 * @return {ol.Extent}
 */
ngeo.LayerFromCap.prototype.getLayerExtentFromGetCap = function(layer) {
  var projCode = this.map_.getView().getProjection().getCode();
  if (layer.BoundingBox) {
    for (var i = 0, ii = layer.BoundingBox.length; i < ii; i++) {
      var bbox = layer.BoundingBox[i];
      var code = bbox.crs || bbox.srs;
      if (code && code.toUpperCase() == projCode.toUpperCase()) {
        return bbox.extent;
      }
    }
  }
  var extent = layer.EX_GeographicBoundingBox || layer.LatLonBoundingBox;
  if (extent) {
    return ol.proj.transformExtent(extent, 'EPSG:4326', projCode);
  }
};
