/**
 */
import googAsserts from 'goog/asserts.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olFormatXML from 'ol/format/XML.js';
import * as olXml from 'ol/xml.js';

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

};

olUtilInherits(exports, olFormatXML);


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
exports.readElement_ = function(node, objectStack) {
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
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
exports.readComplexType_ = function(node, objectStack) {
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
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
exports.readComplexContent_ = function(
  node, objectStack
) {
  return olXml.pushParseAndPop(
    {},
    COMPLEX_CONTENT_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
exports.readExtension_ = function(node, objectStack) {
  return olXml.pushParseAndPop(
    {},
    EXTENSION_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {!Object.<string, string>} Object.
 */
exports.readSequence_ = function(node, objectStack) {
  return olXml.pushParseAndPop(
    {},
    SEQUENCE_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @const
 * @private
 * @type {Array.<string>}
 */
exports.NAMESPACE_URIS_ = [
  null,
  'http://www.w3.org/2001/XMLSchema'
];


/**
 * @const
 * @type {!Object.<string, !Object.<string, !import("ol/XmlParser.js").default>>}
 * @private
 */
exports.PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
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
exports.COMPLEX_TYPE_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
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
exports.COMPLEX_CONTENT_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
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
exports.EXTENSION_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
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
exports.SEQUENCE_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  NAMESPACE_URIS_, {
    'element': olXml.makeObjectPropertyPusher(
      readElement_
    )
  }));


export default exports;
