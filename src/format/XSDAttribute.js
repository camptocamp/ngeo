/**
 * @module ngeo.format.XSDAttribute
 */
import googAsserts from 'goog/asserts.js';
import ngeoFormatAttribute from 'ngeo/format/Attribute.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import * as olBase from 'ol/index.js';
import olFormatXML from 'ol/format/XML.js';

/**
 * @classdesc
 * Reads attributes that are defined in XSD format and return them as a list.
 *
 * @constructor
 * @struct
 * @extends {ol.format.XML}
 */
const exports = function() {
  olFormatXML.call(this);
};

olBase.inherits(exports, olFormatXML);


/**
 * @param {Document|Node|string} source Source.
 * @return {Array.<ngeox.Attribute>} The parsed result.
 * @override
 */
exports.prototype.read = function(source) {
  return (
    /** @type {Array.<ngeox.Attribute>} */ olFormatXML.prototype.read.call(this, source)
  );
};


/**
 * @param {Document} doc Document.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @override
 */
exports.prototype.readFromDocument = function(doc) {
  googAsserts.assert(doc.nodeType == Node.DOCUMENT_NODE,
    'doc.nodeType should be DOCUMENT');
  for (let n = doc.firstChild; n; n = n.nextSibling) {
    if (n.nodeType == Node.ELEMENT_NODE) {
      return this.readFromNode(n);
    }
  }
  return null;
};


/**
 * @param {Node} node Node.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @override
 */
exports.prototype.readFromNode = function(node) {
  googAsserts.assert(node.nodeType == Node.ELEMENT_NODE,
    'node.nodeType should be ELEMENT');
  googAsserts.assert(node.localName == 'schema',
    'localName should be schema');

  let elements = node.getElementsByTagName('element');
  if (!elements.length) {
    elements = node.getElementsByTagName('xsd:element');
  }
  const attributes = [];

  let attribute;
  for (let i = 0, ii = elements.length; i < ii; i++) {
    attribute = this.readFromElementNode_(elements[i]);
    if (attribute) {
      attributes.push(attribute);
    }
  }

  return attributes;
};


/**
 * @param {Node} node Node.
 * @return {?ngeox.Attribute} An attribute object.
 * @private
 */
exports.prototype.readFromElementNode_ = function(node) {

  const name = node.getAttribute('name');
  googAsserts.assertString(name, 'name should be defined in element node.');

  const alias = node.getAttribute('alias');
  const nillable = node.getAttribute('nillable');
  const required = !(nillable === true || nillable === 'true');

  const attribute = {
    name,
    alias,
    required
  };

  const type = node.getAttribute('type');
  if (type) {
    if (!ngeoFormatAttribute.setGeometryType(attribute, type)) {
      this.setAttributeByXsdType_(attribute, type);
    }
  } else {

    // Attribute has no type defined on 'element' node.  Try:

    // (1) Enumerations
    let enumerations = node.getElementsByTagName('enumeration');
    if (!enumerations.length) {
      enumerations = node.getElementsByTagName('xsd:enumeration');
    }
    if (enumerations.length) {
      attribute.type = ngeoFormatAttributeType.SELECT;
      const choices = [];
      for (let i = 0, ii = enumerations.length; i < ii; i++) {
        choices.push(enumerations[i].getAttribute('value'));
      }
      attribute.choices = choices;
    } else {
      // (2) Other types with restrictions
      let restrictions = node.getElementsByTagName('restriction');
      if (!restrictions.length) {
        restrictions = node.getElementsByTagName('xsd:restriction');
      }
      if (restrictions.length && restrictions[0]) {
        const restrictionNode = restrictions[0];
        this.setAttributeByXsdType_(
          attribute,
          restrictionNode.getAttribute('base')
        );
        // MaxLength
        let maxLengths = node.getElementsByTagName('maxLength');
        if (!maxLengths.length) {
          maxLengths = node.getElementsByTagName('xsd:maxLength');
        }
        if (maxLengths.length && maxLengths[0]) {
          attribute.maxLength = Number(maxLengths[0].getAttribute('value'));
        }
      }
    }
  }

  if (!attribute.type) {
    return null;
  }

  googAsserts.assert(attribute.type);

  return attribute;
};


/**
 * Set the `type` and `numType` properties of an attribute depending on the
 * given xsdType.
 *
 * @param {ngeox.AttributeBase} attribute Attribute.
 * @param {string} type The xsd type.
 * @private
 */
exports.prototype.setAttributeByXsdType_ = function(
  attribute, type
) {
  if (type === 'xsd:boolean') {
    attribute.type = ngeoFormatAttributeType.BOOLEAN;
  } else if (type === 'xsd:date') {
    attribute.type = ngeoFormatAttributeType.DATE;
  } else if (type === 'xsd:dateTime') {
    attribute.type = ngeoFormatAttributeType.DATETIME;
  } else if (type === 'xsd:time') {
    attribute.type = ngeoFormatAttributeType.TIME;
  } else if (type === 'xsd:decimal' || type === 'xsd:double') {
    attribute.type = ngeoFormatAttributeType.NUMBER;
    attribute.numType = exports.NumberType.FLOAT;
  } else if (type === 'xsd:integer') {
    attribute.type = ngeoFormatAttributeType.NUMBER;
    attribute.numType = exports.NumberType.INTEGER;
  } else if (type === 'xsd:string') {
    attribute.type = ngeoFormatAttributeType.TEXT;
  }
};


/**
 * Returns the first geometry attribute among a given list of attributes.
 * @param {Array.<ngeox.Attribute>} attributes The list of attributes.
 * @return {?ngeox.Attribute} A geometry attribute object.
 */
exports.getGeometryAttribute = function(attributes) {
  let geomAttribute = null;
  for (let i = 0, ii = attributes.length; i < ii; i++) {
    if (attributes[i].type === ngeoFormatAttributeType.GEOMETRY) {
      geomAttribute = attributes[i];
      break;
    }
  }
  return geomAttribute;
};


/**
 * @enum {string}
 * @export
 */
exports.NumberType = {
  /**
   * @type {string}
   * @export
   */
  FLOAT: 'float',
  /**
   * @type {string}
   * @export
   */
  INTEGER: 'integer'
};


export default exports;
