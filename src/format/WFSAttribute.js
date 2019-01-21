import googAsserts from 'goog/asserts.js';
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

    const name = googAsserts.assertString(object['name']);
    const alias = 'alias' in object ?
      googAsserts.assertString(object['alias']) : null;
    const required = object['minOccurs'] != '0';

    const attribute = {
      name,
      alias,
      required
    };

    const type = googAsserts.assertString(object['type']);

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
