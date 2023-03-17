import {setGeometryType} from 'ngeo/format/Attribute.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import {FormatNumberType} from 'ngeo/format/XSDAttribute.js';

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
   * @param {Array.<Object>} complexTypeElements Complex type element
   * @return {Array.<import('ngeo/format/Attribute.js').Attribute>} Attributes
   */
  read(complexTypeElements) {
    return complexTypeElements.map(this.readFromComplexTypeElement_);
  }

  /**
   * @param {Object} object Complex type element
   * @return {import('ngeo/format/Attribute.js').Attribute} Attribute
   * @private
   */
  readFromComplexTypeElement_(object) {
    const name = object['name'];
    const alias = 'alias' in object ? object['alias'] : null;
    const required = object['minOccurs'] != '0';

    /** @type {import('ngeo/format/Attribute.js').Attribute} */
    const attribute = {
      type: null,
      name,
      alias,
      required,
    };

    const type = object['type'];

    if (!setGeometryType(attribute, type)) {
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

    return attribute;
  }
}
