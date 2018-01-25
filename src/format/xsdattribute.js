goog.provide('ngeo.format.XSDAttribute');

goog.require('ngeo');
goog.require('ngeo.format.Attribute');
goog.require('ngeo.format.AttributeType');
goog.require('ol');
goog.require('ol.format.XML');
goog.require('goog.asserts');


/**
 * @classdesc
 * Reads attributes that are defined in XSD format and return them as a list.
 *
 * @constructor
 * @struct
 * @extends {ol.format.XML}
 */
ngeo.format.XSDAttribute = function() {
  ol.format.XML.call(this);
};
ol.inherits(ngeo.format.XSDAttribute, ol.format.XML);


/**
 * @param {Document|Node|string} source Source.
 * @return {Array.<ngeox.Attribute>} The parsed result.
 * @override
 */
ngeo.format.XSDAttribute.prototype.read = function(source) {
  return /** @type {Array.<ngeox.Attribute>} */ (
    ol.format.XML.prototype.read.call(this, source)
  );
};


/**
 * @param {Document} doc Document.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @override
 */
ngeo.format.XSDAttribute.prototype.readFromDocument = function(doc) {
  goog.asserts.assert(doc.nodeType == Node.DOCUMENT_NODE,
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
ngeo.format.XSDAttribute.prototype.readFromNode = function(node) {
  goog.asserts.assert(node.nodeType == Node.ELEMENT_NODE,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'schema',
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
ngeo.format.XSDAttribute.prototype.readFromElementNode_ = function(node) {

  const name = node.getAttribute('name');
  goog.asserts.assertString(name, 'name should be defined in element node.');

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
    if (!ngeo.format.Attribute.setGeometryType(attribute, type)) {
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
      attribute.type = ngeo.format.AttributeType.SELECT;
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

  goog.asserts.assert(attribute.type);

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
ngeo.format.XSDAttribute.prototype.setAttributeByXsdType_ = function(
  attribute, type
) {
  if (type === 'xsd:boolean') {
    attribute.type = ngeo.format.AttributeType.BOOLEAN;
  } else if (type === 'xsd:date') {
    attribute.type = ngeo.format.AttributeType.DATE;
  } else if (type === 'xsd:dateTime') {
    attribute.type = ngeo.format.AttributeType.DATETIME;
  } else if (type === 'xsd:time') {
    attribute.type = ngeo.format.AttributeType.TIME;
  } else if (type === 'xsd:decimal') {
    attribute.type = ngeo.format.AttributeType.NUMBER;
    attribute.numType = ngeo.format.XSDAttribute.NumberType.FLOAT;
  } else if (type === 'xsd:integer') {
    attribute.type = ngeo.format.AttributeType.NUMBER;
    attribute.numType = ngeo.format.XSDAttribute.NumberType.INTEGER;
  } else if (type === 'xsd:string') {
    attribute.type = ngeo.format.AttributeType.TEXT;
  }
};


/**
 * Returns the first geometry attribute among a given list of attributes.
 * @param {Array.<ngeox.Attribute>} attributes The list of attributes.
 * @return {?ngeox.Attribute} A geometry attribute object.
 */
ngeo.format.XSDAttribute.getGeometryAttribute = function(attributes) {
  let geomAttribute = null;
  for (let i = 0, ii = attributes.length; i < ii; i++) {
    if (attributes[i].type === ngeo.format.AttributeType.GEOMETRY) {
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
ngeo.format.XSDAttribute.NumberType = {
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
