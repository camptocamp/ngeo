// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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
 * @property {string[]} [choices] The list of possible values for the attribute.
 * @property {number} [maxLength] Specifies the maximum number of character for the attribute value.
 * @property {string} [name] The attribute name.
 * @property {string} [alias] The attribute alias
 * @property {boolean} [readonly] Whether the attribute's value should be prevented from being edited
 *    or not. Defaults to `false`.
 * @property {boolean} [required] Whether the attribute is required to have a value set or not.
 *    Defaults to `false`.
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
