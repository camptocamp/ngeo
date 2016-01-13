goog.provide('ngeo.WMSLayerFromCap');


/**
 * @typedef {{
 *   Abstract: string,
 *   BoundingBox: Array.<{srs: string, crs: string, extent: ol.Extent}>,
 *   CRS: Array.<string>,
 *   SRS: Array.<string>,
 *   EX_GeographicBoundingBox: ol.Extent,
 *   LatLonBoundingBox: ol.Extent,
 *   Layer: (undefined|Array.<ngeo.WMSCapLayer>),
 *   Name: string,
 *   wmsUrl: string,
 *   wmsVersion: string,
 *   id: string,
 *   isInvalid: boolean,
 *   Title: string
 * }}
 */
ngeo.WMSCapLayer;



/**
 * @constructor
 * @param {ol.Map} map
 * @param {Object} capabilities
 * @param {string} fileUrl
 * @export
 */
ngeo.WMSLayerFromCap = function(map, capabilities, fileUrl) {

  /**
   * @private
   */
  this.map_ = map;

  /**
   * @private
   * @type {string}
   */
  this.wmsVersion_ = capabilities.version;

  /**
   * @private
   * @type {string}
   */
  this.fileUrl_ = fileUrl;
};


/**
 * Test if the layer can be displayed with a specific projection.
 * @param {ngeo.WMSCapLayer} layer
 * @param {string} projCode
 * @return {boolean}
 */
ngeo.WMSLayerFromCap.prototype.canUseProj = function(layer, projCode) {
  var projCodeList = layer.CRS || layer.SRS || [];
  return (projCodeList.indexOf(projCode.toUpperCase()) !== -1 ||
      projCodeList.indexOf(projCode.toLowerCase()) !== -1);
};


/**
 * Go through all layers, assign needed properties,
 * and remove useless layers (no name or bad crs without childs).
 * @param {ngeo.WMSCapLayer} layer
 * @param {string|undefined} projCode
 * @return {ngeox.LayerItem|undefined}
 */
ngeo.WMSLayerFromCap.prototype.getChildLayers = function(layer, projCode) {
  // If projCode is undefined that means the parent layer can be
  // displayed with the current map projection, since it's an herited
  // property no need to test again.
  // We don't have proj codes list for wms 1.1.1 so we assume the
  // layer can be displayed (wait for
  // https://github.com/openlayers/ol3/pull/2944)
  var invalid = false;
  var id, extent;

  if (this.wmsVersion_ == '1.3.0' && projCode) {
    if (!this.canUseProj(layer, projCode)) {
      invalid = true;
      layer.Abstract = 'layer_invalid_no_crs';
    } else {
      projCode = undefined;
    }
  }

  // If the WMS layer has no name, it can't be displayed
  if (!layer.Name) {
    invalid = true;
    layer.Abstract = 'layer_invalid_no_name';
  }

  if (!invalid) {
    id = 'WMS||' + this.fileUrl_ + '||' + layer.Name;
    extent = this.getLayerExtentFromGetCap(layer);
  }

  // Go through the child to get valid layers
  var children = [];
  if (layer.Layer) {
    for (var i = 0; i < layer.Layer.length; i++) {
      var l = this.getChildLayers(layer.Layer[i], projCode);
      if (l) {
        children.push(l);
      } else {
        layer.Layer.splice(i, 1);
        i--;
      }
    }

    // No valid child
    if (layer.Layer.length === 0) {
      layer.Layer = undefined;
    }
  }

  if (invalid && !layer.Layer) {
    return undefined;
  }

  return {
    url: this.fileUrl_,
    children: children.length > 0 ? children : undefined,
    label: layer.Title,
    details: layer.Abstract,
    id: id,
    type: 'wms',
    raw: layer,
    layer: undefined,
    extent: extent
  };
};


/**
 * Get the layer extent defines in the GetCapabilities.
 * @param {ngeo.WMSCapLayer} layer
 * @return {ol.Extent|undefined}
 */
ngeo.WMSLayerFromCap.prototype.getLayerExtentFromGetCap = function(layer) {
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
