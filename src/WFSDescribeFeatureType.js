/**
 * @module ngeo.WFSDescribeFeatureType
 */
import googAsserts from 'goog/asserts.js';
import * as olBase from 'ol/index.js';
import olFormatXML from 'ol/format/XML.js';
import * as olXml from 'ol/xml.js';

/**
 * @classdesc
 * Format for reading WFS DescribeFeatureType data.
 *
 * @constructor
 * @extends {ol.format.XML}
 * @api
 */
const exports = function() {

  olFormatXML.call(this);

};

olBase.inherits(exports, olFormatXML);


/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 * @api
 */
exports.prototype.read;


/**
 * @inheritDoc
 */
exports.prototype.readFromDocument = function(doc) {
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
exports.prototype.readFromNode = function(node) {
  let result = {};
  result = olXml.pushParseAndPop(
    result,
    exports.PARSERS_,
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
    exports.COMPLEX_TYPE_PARSERS_,
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
    exports.COMPLEX_CONTENT_PARSERS_,
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
    exports.EXTENSION_PARSERS_,
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
    exports.SEQUENCE_PARSERS_,
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
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
exports.PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  exports.NAMESPACE_URIS_, {
    'element': olXml.makeObjectPropertyPusher(
      exports.readElement_
    ),
    'complexType': olXml.makeObjectPropertyPusher(
      exports.readComplexType_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
exports.COMPLEX_TYPE_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  exports.NAMESPACE_URIS_, {
    'complexContent': olXml.makeObjectPropertySetter(
      exports.readComplexContent_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
exports.COMPLEX_CONTENT_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  exports.NAMESPACE_URIS_, {
    'extension': olXml.makeObjectPropertySetter(
      exports.readExtension_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
exports.EXTENSION_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  exports.NAMESPACE_URIS_, {
    'sequence': olXml.makeObjectPropertySetter(
      exports.readSequence_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
exports.SEQUENCE_PARSERS_ = googAsserts.assert(olXml.makeStructureNS(
  exports.NAMESPACE_URIS_, {
    'element': olXml.makeObjectPropertyPusher(
      exports.readElement_
    )
  }));


export default exports;
