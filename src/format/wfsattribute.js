goog.provide('ngeo.format.WFSAttribute');

goog.require('goog.asserts');
goog.require('ngeo.format.Attribute');
goog.require('ngeo.format.AttributeType');
goog.require('ngeo.format.XSDAttribute');


ngeo.format.WFSAttribute = class {


  /**
   * A format that reads the complexType from a WFS DescribeFeatureType
   * response for a single set of attributes and return an array of
   * `ngeox.Attribute`.
   */


  /**
   * @param {Array.<Object>} complexTypeElements Complex type element
   * @return {Array.<ngeox.Attribute>} Attributes
   */
  read(complexTypeElements) {
    return complexTypeElements.map(this.readFromComplexTypeElement_);
  }


  /**
   * @param {Object} object Complex type element
   * @return {ngeox.Attribute} Attribute
   * @private
   */
  readFromComplexTypeElement_(object) {

    const name = goog.asserts.assertString(object['name']);
    const alias = 'alias' in object ?
      goog.asserts.assertString(object['alias']) : null;
    const required = object['minOccurs'] != '0';

    const attribute = {
      name,
      alias,
      required
    };

    const type = goog.asserts.assertString(object['type']);

    if (!ngeo.format.Attribute.setGeometryType(attribute, type)) {
      if (type === 'gml:TimeInstantType' || type === 'dateTime') {
        attribute.type = ngeo.format.AttributeType.DATETIME;
      } else if (type === 'date') {
        attribute.type = ngeo.format.AttributeType.DATE;
      } else if (type === 'time') {
        attribute.type = ngeo.format.AttributeType.TIME;
      } else if (type === 'decimal' || type === 'double') {
        attribute.type = ngeo.format.AttributeType.NUMBER;
        attribute.numType = ngeo.format.XSDAttribute.NumberType.FLOAT;
      } else if (type === 'integer' || type === 'long') {
        attribute.type = ngeo.format.AttributeType.NUMBER;
        attribute.numType = ngeo.format.XSDAttribute.NumberType.INTEGER;
      } else if (type === 'boolean') {
        attribute.type = ngeo.format.AttributeType.BOOLEAN;
      } else {
        attribute.type = ngeo.format.AttributeType.TEXT;
      }
    }

    return attribute;
  }

};
