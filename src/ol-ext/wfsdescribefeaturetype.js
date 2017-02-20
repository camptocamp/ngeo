goog.provide('ol.format.WFSDescribeFeatureType');

goog.require('ol');
goog.require('ol.format.XML');
goog.require('ol.xml');


/**
 * @classdesc
 * Format for reading WFS DescribeFeatureType data.
 *
 * @constructor
 * @extends {ol.format.XML}
 * @api
 */
ol.format.WFSDescribeFeatureType = function() {

  ol.format.XML.call(this);

};
ol.inherits(ol.format.WFSDescribeFeatureType, ol.format.XML);


/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 * @api
 */
ol.format.WFSDescribeFeatureType.prototype.read;


/**
 * @inheritDoc
 */
ol.format.WFSDescribeFeatureType.prototype.readFromDocument = function(doc) {
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
ol.format.WFSDescribeFeatureType.prototype.readFromNode = function(node) {
  let result = {};
  result = ol.xml.pushParseAndPop(
    result,
    ol.format.WFSDescribeFeatureType.PARSERS_,
    node,
    []
  );
  return result;
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object} Attributes.
 */
ol.format.WFSDescribeFeatureType.readElement_ = function(node, objectStack) {
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
 * @return {T} Object.
 * @template T
 */
ol.format.WFSDescribeFeatureType.readComplexType_ = function(node, objectStack) {
  const name = node.getAttribute('name');
  const object = ol.xml.pushParseAndPop(
    {'name': name},
    ol.format.WFSDescribeFeatureType.COMPLEX_TYPE_PARSERS_,
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
 * @return {T} Object.
 * @template T
 */
ol.format.WFSDescribeFeatureType.readComplexContent_ = function(
  node, objectStack
) {
  return ol.xml.pushParseAndPop(
    {},
    ol.format.WFSDescribeFeatureType.COMPLEX_CONTENT_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {T} Object.
 * @template T
 */
ol.format.WFSDescribeFeatureType.readExtension_ = function(node, objectStack) {
  return ol.xml.pushParseAndPop(
    {},
    ol.format.WFSDescribeFeatureType.EXTENSION_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {T} Object.
 * @template T
 */
ol.format.WFSDescribeFeatureType.readSequence_ = function(node, objectStack) {
  return ol.xml.pushParseAndPop(
    {},
    ol.format.WFSDescribeFeatureType.SEQUENCE_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @const
 * @private
 * @type {Array.<string>}
 */
ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_ = [
  null,
  'http://www.w3.org/2001/XMLSchema'
];


/**
 * @const
 * @type {Object.<string, !Object.<string, ol.XmlParser>>}
 * @private
 */
ol.format.WFSDescribeFeatureType.PARSERS_ = ol.xml.makeStructureNS(
    ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_, {
      'element': ol.xml.makeObjectPropertyPusher(
        ol.format.WFSDescribeFeatureType.readElement_
      ),
      'complexType': ol.xml.makeObjectPropertyPusher(
        ol.format.WFSDescribeFeatureType.readComplexType_
      )
    });


/**
 * @const
 * @type {Object.<string, !Object.<string, ol.XmlParser>>}
 * @private
 */
ol.format.WFSDescribeFeatureType.COMPLEX_TYPE_PARSERS_ = ol.xml.makeStructureNS(
    ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_, {
      'complexContent': ol.xml.makeObjectPropertySetter(
        ol.format.WFSDescribeFeatureType.readComplexContent_
      )
    });


/**
 * @const
 * @type {Object.<string, !Object.<string, ol.XmlParser>>}
 * @private
 */
ol.format.WFSDescribeFeatureType.COMPLEX_CONTENT_PARSERS_ = ol.xml.makeStructureNS(
    ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_, {
      'extension': ol.xml.makeObjectPropertySetter(
        ol.format.WFSDescribeFeatureType.readExtension_
      )
    });


/**
 * @const
 * @type {Object.<string, !Object.<string, ol.XmlParser>>}
 * @private
 */
ol.format.WFSDescribeFeatureType.EXTENSION_PARSERS_ = ol.xml.makeStructureNS(
    ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_, {
      'sequence': ol.xml.makeObjectPropertySetter(
        ol.format.WFSDescribeFeatureType.readSequence_
      )
    });


/**
 * @const
 * @type {Object.<string, !Object.<string, ol.XmlParser>>}
 * @private
 */
ol.format.WFSDescribeFeatureType.SEQUENCE_PARSERS_ = ol.xml.makeStructureNS(
    ol.format.WFSDescribeFeatureType.NAMESPACE_URIS_, {
      'element': ol.xml.makeObjectPropertyPusher(
        ol.format.WFSDescribeFeatureType.readElement_
      )
    });
