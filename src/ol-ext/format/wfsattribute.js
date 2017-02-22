goog.provide('ngeo.format.WFSAttribute');

goog.require('ngeo.Attribute');


ngeo.format.WFSAttribute = class {


  /**
   * A format that reads the complexType from a WFS DescribeFeatureType
   * response for a single set of attributes and return an array of
   * `ngeox.Attribute`.
   */


  /**
   * @param {Array.<Object>} complexTypeElements Complex type element
   * @return {Array.<ngeox.Attribute>} Attributes
   * @export
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
    const required = object['minOccurs'] != '0';

    const attribute = {
      name,
      required
    };

    const type = goog.asserts.assertString(object['type']);

    if (!ngeo.Attribute.setGeometryType(attribute, type)) {
      if (type === 'gml:TimeInstantType') {
        attribute.type = ngeo.AttributeType.DATETIME;
      } else {
        attribute.type = ngeo.AttributeType.TEXT;
      }
    }

    return attribute;
  }

};
