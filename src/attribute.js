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
      attribute.geomType = 'Point';
    } else if (/^gml:LineString|^gml:Curve/.exec(type)) {
      attribute.geomType = 'LineString';
    } else if (/^gml:Polygon|^gml:Surface/.exec(type)) {
      attribute.geomType = 'Polygon';
    } else if (/^gml:MultiPoint/.exec(type)) {
      attribute.geomType = 'MultiPoint';
    } else if (/^gml:MultiLineString|^gml:MultiCurve/.exec(type)) {
      attribute.geomType = 'MultiLineString';
    } else if (/^gml:MultiPolygon|^gml:MultiSurface/.exec(type)) {
      attribute.geomType = 'MultiPolygon';
    }
  }
  return !!attribute.type && !!attribute.geomType;
};
