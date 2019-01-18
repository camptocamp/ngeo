/**
 */

import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';


/**
 * geomType: Set only if the attribute is a geometry type. Determines the type of geometry.
 *
 * numType: Set only if the attribute is a number type. Determines the type of number.
 *
 * type: The attribute type, which determines how to render it.
 *
 * @typedef {{
 *   geomType: (string|undefined),
 *   numType: (string|undefined),
 *   type: (string|undefined),
 * }} AttributeBase
 */


/**
 * A feature attribute definition.
 *
 * choices: The list of possible values for the attribute.
 *
 * maxLength: Specifies the maximum number of character for the attribute value.
 *
 * name: The attribute name.
 *
 * alias: The attribute alias.
 *
 * readonly: Whether the attribute's value should be prevented from being edited
 * or not. Defaults to `false`.
 *
 * required: Whether the attribute is required to have a value set or not. Defaults to `false`.
 *
 * type: The attribute type, which determines how to render it.
 *
 * format: The format used in the date, time and datetime type.
 *
 * mask: The mask used in the date, time and datetime type.
 *
 * @typedef {{
 *   choices: (Array.<string>|undefined),
 *   maxLength: (number|undefined),
 *   name: (string|null),
 *   alias: (string|null),
 *   readonly: (boolean|undefined),
 *   required: (boolean|undefined),
 *   type: (string),
 *   format: (string|undefined),
 *   mask: (string|undefined)
 * }} Attribute
 * @extends AttributeBase
 */


const exports = {};


/**
 * Set the `type` and `geomType` properties of an attribute if the given
 * type is a geometry one.
 *
 * @param {AttributeBase} attribute Attribute.
 * @param {string} type Type.
 * @return {boolean} Whether both attribute type and geomType were set.
 */
function setGeometryType(attribute, type) {
  const geomRegex =
    /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
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
};


export default exports;
