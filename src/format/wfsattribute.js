goog.provide('ngeo.format.WFSAttribute');

goog.require('goog.asserts');
goog.require('ngeo.format.Attribute');
goog.require('ngeo.format.AttributeType');


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
      if (type === 'gml:TimeInstantType') {
        attribute.type = ngeo.format.AttributeType.DATETIME;
      } else if (type === 'double') {
        attribute.type = ngeo.format.AttributeType.NUMBER;
      } else {
        attribute.type = ngeo.format.AttributeType.TEXT;
      }
    }

    return attribute;
  }

};
