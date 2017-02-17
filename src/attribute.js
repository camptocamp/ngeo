goog.provide('ngeo.Attribute');


/**
 * Set the `type` and `geomType` properties of an attribute if the given
 * type is a geometry one.
 *
 * @param {ngeox.AttributeBase} attribute Attribute.
 * @param {string} type Type.
 * @return {boolean} Whether both attribute type and geomType were set.
 */
ngeo.Attribute.setGeometryType = function(attribute, type) {
  const geomRegex =
    /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
  if (geomRegex.exec(type)) {
    attribute.type = ngeo.AttributeType.GEOMETRY;
    if (/^gml:Point/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.POINT;
    } else if (/^gml:LineString/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.LINE_STRING;
    } else if (/^gml:Polygon/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.POLYGON;
    } else if (/^gml:MultiPoint/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.MULTI_POINT;
    } else if (/^gml:MultiLineString/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.MULTI_LINE_STRING;
    } else if (/^gml:MultiPolygon/.exec(type)) {
      attribute.geomType = ol.geom.GeometryType.MULTI_POLYGON;
    }
  }
  return !!attribute.type && !!attribute.geomType;
};
