import googAsserts from 'goog/asserts.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olFormatXML from 'ol/format/XML.js';
import * as olXml from 'ol/xml.js';


/**
 * @const
 * @private
 * @type {Array.<string>}
 */
const NAMESPACE_URIS_ = [
  null,
  'http://www.w3.org/2001/XMLSchema'
];


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
const PARSERS_ = console.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'element': olXml.makeObjectPropertyPusher(
      readElement_
    ),
    'complexType': olXml.makeObjectPropertyPusher(
      readComplexType_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
const COMPLEX_TYPE_PARSERS_ = console.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'complexContent': olXml.makeObjectPropertySetter(
      readComplexContent_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
const COMPLEX_CONTENT_PARSERS_ = console.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'extension': olXml.makeObjectPropertySetter(
      readExtension_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
const EXTENSION_PARSERS_ = console.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'sequence': olXml.makeObjectPropertySetter(
      readSequence_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
const SEQUENCE_PARSERS_ = console.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'element': olXml.makeObjectPropertyPusher(
      readElement_
    )
  }));


/**
 * @classdesc
 * Format for reading WFS DescribeFeatureType data.
 *
 * @constructor
 * @extends {import("ol/format/XML.js").default}
 * @api
 */
function WFSDescribeFeatureType() {

  olFormatXML.call(this);

}

olUtilInherits(WFSDescribeFeatureType, olFormatXML);


/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 * @api
 */
WFSDescribeFeatureType.prototype.read;


/**
 * @inheritDoc
 */
WFSDescribeFeatureType.prototype.readFromDocument = function(doc) {
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
WFSDescribeFeatureType.prototype.readFromNode = function(node) {
  let result = {};
  result = olXml.pushParseAndPop(
    result,
    PARSERS_,
    node,
    []
  );
  return result;
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Attributes.
 */
function readElement_(node, objectStack) {
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
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readComplexType_(node, objectStack) {
  const name = node.getAttribute('name');
  const object = olXml.pushParseAndPop(
    {'name': name},
    COMPLEX_TYPE_PARSERS_,
    node, objectStack
  );
  // flatten
  object['complexContent'] =
    object['complexContent']['extension']['sequence']['element'];
  return object;
}


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readComplexContent_(
  node, objectStack
) {
  return olXml.pushParseAndPop(
    {},
    COMPLEX_CONTENT_PARSERS_,
    node,
    objectStack
  );
}


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readExtension_(node, objectStack) {
  return olXml.pushParseAndPop(
    {},
    EXTENSION_PARSERS_,
    node,
    objectStack
  );
}


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
function readSequence_(node, objectStack) {
  return olXml.pushParseAndPop(
    {},
    SEQUENCE_PARSERS_,
    node,
    objectStack
  );
}


export default WFSDescribeFeatureType;
