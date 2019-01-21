import {setGeometryType} from 'ngeo/format/Attribute.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';

export default class {


  /**
   * A format that reads the complexType from a WFS DescribeFeatureType
   * response for a single set of attributes and return an array of
   * `Attribute`.
   */


  /**
   * @param {Array.<Object>} complexTypeElements Complex type element
   * @return {Array.<Attribute>} Attributes
   */
  read(complexTypeElements) {
    return complexTypeElements.map(this.readFromComplexTypeElement_);
  }


  /**
   * @param {Object} object Complex type element
   * @return {Attribute} Attribute
   * @private
   */
  readFromComplexTypeElement_(object) {

    const name = console.assert(typeof object['name'] == 'string');
    const alias = 'alias' in object ? object['alias'] : null;
    const required = object['minOccurs'] != '0';

    const attribute = {
      name,
      alias,
      required
    };

    const type = console.assert(typeof object['type'] == 'string');

    if (!setGeometryType(attribute, type)) {
      if (type === 'gml:TimeInstantType' || type === 'dateTime') {
        attribute.type = ngeoFormatAttributeType.DATETIME;
      } else if (type === 'date') {
        attribute.type = ngeoFormatAttributeType.DATE;
      } else if (type === 'time') {
        attribute.type = ngeoFormatAttributeType.TIME;
      } else if (type === 'decimal' || type === 'double') {
        attribute.type = ngeoFormatAttributeType.NUMBER;
        attribute.numType = ngeoFormatXSDAttribute.NumberType.FLOAT;
      } else if (type === 'integer' || type === 'long') {
        attribute.type = ngeoFormatAttributeType.NUMBER;
        attribute.numType = ngeoFormatXSDAttribute.NumberType.INTEGER;
      } else if (type === 'boolean') {
        attribute.type = ngeoFormatAttributeType.BOOLEAN;
      } else {
        attribute.type = ngeoFormatAttributeType.TEXT;
      }
    }

    return attribute;
  }

}
