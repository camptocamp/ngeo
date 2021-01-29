// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import {setGeometryType} from 'ngeo/format/Attribute.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import {FormatNumberType} from 'ngeo/format/XSDAttribute.js';

/**
 * @typedef {Object} Element
 * @property {string} name
 * @property {string} alias
 * @property {string} [minOccurs]
 * @property {string} type
 */

/**
 * @hidden
 */
export default class {
  /**
   * A format that reads the complexType from a WFS DescribeFeatureType
   * response for a single set of attributes and return an array of
   * `Attribute`.
   */

  /**
   * @param {Element[]} complexTypeElements Complex type element
   * @return {Array<import('ngeo/format/Attribute.js').Attribute>} Attributes
   */
  read(complexTypeElements) {
    return complexTypeElements.map(this.readFromComplexTypeElement_);
  }

  /**
   * @param {import('ngeo/format/Attribute.js').Attribute} attribute
   * @param {string} type the type
   */
  setAttributeType(attribute, type) {
    if (type === 'gml:TimeInstantType' || type === 'dateTime') {
      attribute.type = ngeoFormatAttributeType.DATETIME;
    } else if (type === 'date') {
      attribute.type = ngeoFormatAttributeType.DATE;
    } else if (type === 'time') {
      attribute.type = ngeoFormatAttributeType.TIME;
    } else if (type === 'decimal' || type === 'double') {
      attribute.type = ngeoFormatAttributeType.NUMBER;
      attribute.numType = FormatNumberType.FLOAT;
    } else if (type === 'integer' || type === 'long') {
      attribute.type = ngeoFormatAttributeType.NUMBER;
      attribute.numType = FormatNumberType.INTEGER;
    } else if (type === 'boolean') {
      attribute.type = ngeoFormatAttributeType.BOOLEAN;
    } else {
      attribute.type = ngeoFormatAttributeType.TEXT;
    }
  }

  /**
   * @param {Element} object Complex type element
   * @return {import('ngeo/format/Attribute.js').Attribute} Attribute
   * @private
   */
  readFromComplexTypeElement_(object) {
    const name = object.name;
    const alias = object.alias || null;
    const required = object.minOccurs != '0';

    /** @type {import('ngeo/format/Attribute.js').Attribute} */
    const attribute = {
      name,
      alias,
      required,
    };

    const type = object.type;

    if (!setGeometryType(attribute, type)) {
      this.setAttributeType(attribute, type);
    }

    return attribute;
  }
}
