import olFormatXML from 'ol/format/XML.js';
import * as olXml from 'ol/xml.js';

/**
 * @private
 * @hidden
 * @type {Array.<string>}
 */
const NAMESPACE_URIS_ = [null, 'http://www.w3.org/2001/XMLSchema'];

/**
 * @typedef {Object.<string, import("ol/xml.js").Parser>} parserStructure
 */

/**
 * typedef {Object.<string, parserStructure>} parsersStructure
 * @typedef {Object<string, Object<string, import("ol/xml.js").Parser>>} parsersStructure
 */

/**
 * @param {Array<string>} namespaceURIs Namespace URIs.
 * @param {parserStructure} structure Structure.
 * @return {Object<string, parserStructure>} Namespaced structure.
 * @private
 * @hidden
 */
function makeStructureNS(namespaceURIs, structure) {
  return /** @type {parsersStructure} */ (
    /** @type {any} */ (olXml.makeStructureNS(namespaceURIs, structure))
  );
}

/**
 * @type {parsersStructure}
 * @private
 * @hidden
 */
const PARSERS_ = makeStructureNS(NAMESPACE_URIS_, {
  element: olXml.makeObjectPropertyPusher(readElement_),
  complexType: olXml.makeObjectPropertyPusher(readComplexType_),
});

/**
 * @type {parsersStructure}
 * @private
 * @hidden
 */
const COMPLEX_TYPE_PARSERS_ = makeStructureNS(NAMESPACE_URIS_, {
  complexContent: olXml.makeObjectPropertySetter(readComplexContent_),
});

/**
 * @type {parsersStructure}
 * @private
 * @hidden
 */
const COMPLEX_CONTENT_PARSERS_ = makeStructureNS(NAMESPACE_URIS_, {
  extension: olXml.makeObjectPropertySetter(readExtension_),
});

/**
 * @type {parsersStructure}
 * @private
 * @hidden
 */
const EXTENSION_PARSERS_ = makeStructureNS(NAMESPACE_URIS_, {
  sequence: olXml.makeObjectPropertySetter(readSequence_),
});

/**
 * @type {parsersStructure}
 * @private
 * @hidden
 */
const SEQUENCE_PARSERS_ = makeStructureNS(NAMESPACE_URIS_, {
  element: olXml.makeObjectPropertyPusher(readElement_),
});

/**
 * Format for reading WFS DescribeFeatureType data.
 * @private
 * @hidden
 */
class WFSDescribeFeatureType extends olFormatXML {
  constructor() {
    super();
  }
}

/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 */
WFSDescribeFeatureType.prototype.read;

/**
 * @inheritDoc
 */
WFSDescribeFeatureType.prototype.readFromDocument = function (doc) {
  for (let n = doc.firstChild; n; n = n.nextSibling) {
    if (n.nodeType == Node.ELEMENT_NODE) {
      return this.readFromNode(n);
    }
  }
  return null;
};

/**
 * @inheritDoc
 */
WFSDescribeFeatureType.prototype.readFromNode = function (node) {
  let result = {};
  result = olXml.pushParseAndPop(result, PARSERS_, node, []);
  return result;
};

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Attributes.
 */
function readElement_(node, objectStack) {
  /** @type {!Object.<string, string>} */
  const attributes = {};
  for (let i = 0, len = node.attributes.length; i < len; i++) {
    const attribute = node.attributes.item(i);
    attributes[attribute.name] = attribute.value;
  }
  if (objectStack.length === 1) {
    // remove namespace from type
    attributes['type'] = attributes['type'].split(':').pop();
  }
  return attributes;
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readComplexType_(node, objectStack) {
  const name = node.getAttribute('name');
  const object = olXml.pushParseAndPop({'name': name}, COMPLEX_TYPE_PARSERS_, node, objectStack);
  // flatten
  object['complexContent'] = object['complexContent']['extension']['sequence']['element'];
  return object;
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readComplexContent_(node, objectStack) {
  return olXml.pushParseAndPop({}, COMPLEX_CONTENT_PARSERS_, node, objectStack);
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readExtension_(node, objectStack) {
  return olXml.pushParseAndPop({}, EXTENSION_PARSERS_, node, objectStack);
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readSequence_(node, objectStack) {
  return olXml.pushParseAndPop({}, SEQUENCE_PARSERS_, node, objectStack);
}

export default WFSDescribeFeatureType;
