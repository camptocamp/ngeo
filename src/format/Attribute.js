import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';

/**
 * geomType: Set only if the attribute is a geometry type. Determines the type of geometry.
 *
 * numType: Set only if the attribute is a number type. Determines the type of number.
 *
 * type: The attribute type, which determines how to render it.
 *
 * @typedef {Object} AttributeBase
 * @property {string} [geomType]
 * @property {string} [numType]
 * @property {string} [type]
 */

/**
 * A feature attribute definition.
 *
 * extends AttributeBase
 * @typedef {Object} Attribute
 * @property {string} [geomType] (AttributeBase)
 * @property {string} [numType] (AttributeBase)
 * @property {string} [type] (AttributeBase)
 * @property {Array.<string>} [choices] The list of possible values for the attribute.
 * @property {number} [maxLength] Specifies the maximum number of character for the attribute value.
 * @property {string|null} name The attribute name.
 * @property {string|null} alias The attribute alias
 * @property {boolean} [readonly] Whether the attribute's value should be prevented from being edited
 *    or not. Defaults to `false`.
 * @property {boolean} [required] Whether the attribute is required to have a value set or not.
 *    Defaults to `false`.
 * @property {string} type The attribute type, which determines how to render it.
 * @property {string} [format] The format used in the date, time and datetime type.
 * @property {string} [mask] The mask used in the date, time and datetime type.
 */

/**
 * Set the `type` and `geomType` properties of an attribute if the given
 * type is a geometry one.
 *
 * @param {AttributeBase} attribute Attribute.
 * @param {string} type Type.
 * @return {boolean} Whether both attribute type and geomType were set.
 * @hidden
 */
export function setGeometryType(attribute, type) {
  const geomRegex = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
  if (geomRegex.exec(type)) {
    attribute.type = ngeoFormatAttributeType.GEOMETRY;
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
}

export default null;
