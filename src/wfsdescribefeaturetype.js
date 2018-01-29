goog.provide('ngeo.WFSDescribeFeatureType');

goog.require('goog.asserts');
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
ngeo.WFSDescribeFeatureType = function() {

  ol.format.XML.call(this);

};
ol.inherits(ngeo.WFSDescribeFeatureType, ol.format.XML);


/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 * @api
 */
ngeo.WFSDescribeFeatureType.prototype.read;


/**
 * @inheritDoc
 */
ngeo.WFSDescribeFeatureType.prototype.readFromDocument = function(doc) {
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
ngeo.WFSDescribeFeatureType.prototype.readFromNode = function(node) {
  let result = {};
  result = ol.xml.pushParseAndPop(
    result,
    ngeo.WFSDescribeFeatureType.PARSERS_,
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
ngeo.WFSDescribeFeatureType.readElement_ = function(node, objectStack) {
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
ngeo.WFSDescribeFeatureType.readComplexType_ = function(node, objectStack) {
  const name = node.getAttribute('name');
  const object = ol.xml.pushParseAndPop(
    {'name': name},
    ngeo.WFSDescribeFeatureType.COMPLEX_TYPE_PARSERS_,
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
ngeo.WFSDescribeFeatureType.readComplexContent_ = function(
  node, objectStack
) {
  return ol.xml.pushParseAndPop(
    {},
    ngeo.WFSDescribeFeatureType.COMPLEX_CONTENT_PARSERS_,
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
ngeo.WFSDescribeFeatureType.readExtension_ = function(node, objectStack) {
  return ol.xml.pushParseAndPop(
    {},
    ngeo.WFSDescribeFeatureType.EXTENSION_PARSERS_,
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
ngeo.WFSDescribeFeatureType.readSequence_ = function(node, objectStack) {
  return ol.xml.pushParseAndPop(
    {},
    ngeo.WFSDescribeFeatureType.SEQUENCE_PARSERS_,
    node,
    objectStack
  );
};


/**
 * @const
 * @private
 * @type {Array.<string>}
 */
ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_ = [
  null,
  'http://www.w3.org/2001/XMLSchema'
];


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
ngeo.WFSDescribeFeatureType.PARSERS_ = goog.asserts.assert(ol.xml.makeStructureNS(
  ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_, {
    'element': ol.xml.makeObjectPropertyPusher(
      ngeo.WFSDescribeFeatureType.readElement_
    ),
    'complexType': ol.xml.makeObjectPropertyPusher(
      ngeo.WFSDescribeFeatureType.readComplexType_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
ngeo.WFSDescribeFeatureType.COMPLEX_TYPE_PARSERS_ = goog.asserts.assert(ol.xml.makeStructureNS(
  ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_, {
    'complexContent': ol.xml.makeObjectPropertySetter(
      ngeo.WFSDescribeFeatureType.readComplexContent_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
ngeo.WFSDescribeFeatureType.COMPLEX_CONTENT_PARSERS_ = goog.asserts.assert(ol.xml.makeStructureNS(
  ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_, {
    'extension': ol.xml.makeObjectPropertySetter(
      ngeo.WFSDescribeFeatureType.readExtension_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
ngeo.WFSDescribeFeatureType.EXTENSION_PARSERS_ = goog.asserts.assert(ol.xml.makeStructureNS(
  ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_, {
    'sequence': ol.xml.makeObjectPropertySetter(
      ngeo.WFSDescribeFeatureType.readSequence_
    )
  }));


/**
 * @const
 * @type {!Object.<string, !Object.<string, !ol.XmlParser>>}
 * @private
 */
ngeo.WFSDescribeFeatureType.SEQUENCE_PARSERS_ = goog.asserts.assert(ol.xml.makeStructureNS(
  ngeo.WFSDescribeFeatureType.NAMESPACE_URIS_, {
    'element': ol.xml.makeObjectPropertyPusher(
      ngeo.WFSDescribeFeatureType.readElement_
    )
  }));
