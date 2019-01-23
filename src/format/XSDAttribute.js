import {setGeometryType} from 'ngeo/format/Attribute.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import olFormatXML from 'ol/format/XML.js';


/**
 * @enum {string}
 * @export
 */
const NumberType = {
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


/**
 * Reads attributes that are defined in XSD format and return them as a list.
 */
class XSDAttribute extends olFormatXML {
  constructor() {
    super();
  }

  /**
   * @param {Document|Node|string} source Source.
   * @return {Array.<Attribute>} The parsed result.
   * @override
   */
  read(source) {
    return (
      /** @type {Array.<Attribute>} */ olFormatXML.prototype.read.call(this, source)
    );
  }


  /**
   * @param {Document} doc Document.
   * @return {Array.<Attribute>} List of attributes.
   * @override
   */
  readFromDocument(doc) {
    console.assert(doc.nodeType == Node.DOCUMENT_NODE,
      'doc.nodeType should be DOCUMENT');
    for (let n = doc.firstChild; n; n = n.nextSibling) {
      if (n.nodeType == Node.ELEMENT_NODE) {
        return this.readFromNode(n);
      }
    }
    return null;
  }


  /**
   * @param {Node} node Node.
   * @return {Array.<Attribute>} List of attributes.
   * @override
   */
  readFromNode(node) {
    console.assert(node.nodeType == Node.ELEMENT_NODE,
      'node.nodeType should be ELEMENT');
    console.assert(node.localName == 'schema',
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
  }

  /**
   * @param {Node} node Node.
   * @return {?Attribute} An attribute object.
   * @private
   */
  readFromElementNode_(node) {

    const name = node.getAttribute('name');
    console.assert(typeof name, 'name should be defined in element node.' == 'string');

    const alias = node.getAttribute('alias');
    const nillable = node.getAttribute('nillable');
    const required = !(nillable === true || nillable === 'true');

    const readonlyEls = node.getElementsByTagName('readonly');
    const readonly = readonlyEls[0] ?
      readonlyEls[0].getAttribute('value') === 'true' :
      false;

    const attribute = {
      name,
      alias,
      readonly,
      required
    };

    const type = node.getAttribute('type');
    if (type) {
      if (!setGeometryType(attribute, type)) {
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

    console.assert(attribute.type);

    return attribute;
  }


  /**
   * Set the `type` and `numType` properties of an attribute depending on the
   * given xsdType.
   *
   * @param {AttributeBase} attribute Attribute.
   * @param {string} type The xsd type.
   * @private
   */
  setAttributeByXsdType_(attribute, type) {
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
      attribute.numType = NumberType.FLOAT;
    } else if (type === 'xsd:integer') {
      attribute.type = ngeoFormatAttributeType.NUMBER;
      attribute.numType = NumberType.INTEGER;
    } else if (type === 'xsd:string') {
      attribute.type = ngeoFormatAttributeType.TEXT;
    }
  }
}


/**
 * Returns the first geometry attribute among a given list of attributes.
 * @param {Array.<Attribute>} attributes The list of attributes.
 * @return {?Attribute} A geometry attribute object.
 */
export function getGeometryAttribute(attributes) {
  let geomAttribute = null;
  for (let i = 0, ii = attributes.length; i < ii; i++) {
    if (attributes[i].type === ngeoFormatAttributeType.GEOMETRY) {
      geomAttribute = attributes[i];
      break;
    }
  }
  return geomAttribute;
}


export default XSDAttribute;
