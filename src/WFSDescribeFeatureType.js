// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import olFormatXML from 'ol/format/XML.js';
import * as olXml from 'ol/xml.js';

/**
 * @private
 * @hidden
 * @type {Array<?string>}
 */
const NAMESPACE_URIS_ = [null, 'http://www.w3.org/2001/XMLSchema'];

/**
 * @typedef {Object<string, import("ol/xml.js").Parser>} parserStructure
 */

/**
 * typedef {Object<string, parserStructure>} parsersStructure
 * @typedef {Object<string, Object<string, import("ol/xml.js").Parser>>} parsersStructure
 */

/**
 * @param {Array<?string>} namespaceURIs Namespace URIs.
 * @param {parserStructure} structure Structure.
 * @return {Object<string, parserStructure>} Namespaced structure.
 * @private
 * @hidden
 */
function makeStructureNS(namespaceURIs, structure) {
  return /** @type {parsersStructure} */ (
    /** @type {any} */ (olXml.makeStructureNS(/** @type {string[]} */ (namespaceURIs), structure))
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
class WFSDescribeFeatureType extends olFormatXML {}

/**
 * Read a WFS DescribeFeatureType document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WFS DescribeFeatureType.
 */
WFSDescribeFeatureType.prototype.read;

/**
 * @param {Document} doc Document.
 * @return {Object} Object
 */
WFSDescribeFeatureType.prototype.readFromDocument = function (doc) {
  /** @type {?Node|ChildNode} */
  let node;
  for (node = doc.firstChild; node; node = node.nextSibling) {
    if (node && node.nodeType == Node.ELEMENT_NODE) {
      return this.readFromNode(/** @type {Element} */ (node));
    }
  }
  return null;
};

/**
 * @param {Element} node Node.
 * @return {Object} Object
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
 * @param {Array<*>} objectStack Object stack.
 * @return {Object<string, string>} Attributes.
 */
function readElement_(node, objectStack) {
  /** @type {Object<string, string>} */
  const attributes = {};
  for (let i = 0, len = node.attributes.length; i < len; i++) {
    const attribute = node.attributes.item(i);
    if (!attribute) {
      throw new Error('Missing attribute');
    }
    attributes[attribute.name] = attribute.value;
  }
  if (objectStack.length === 1) {
    // remove namespace from type
    const attribute = attributes.type.split(':').pop();
    if (!attribute) {
      throw new Error('Missing attribute');
    }
    attributes.type = attribute;
  }
  return attributes;
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object<string, ?string>} Object.
 */
function readComplexType_(node, objectStack) {
  const name = node.getAttribute('name');
  /** @type {Object<string, ?string>} */
  const object = olXml.pushParseAndPop({name: name}, COMPLEX_TYPE_PARSERS_, node, objectStack);
  // flatten
  // @ts-ignore
  object.complexContent = object.complexContent.extension.sequence.element;
  return object;
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object<string, string>} Object.
 */
function readComplexContent_(node, objectStack) {
  return olXml.pushParseAndPop({}, COMPLEX_CONTENT_PARSERS_, node, objectStack);
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object<string, string>} Object.
 */
function readExtension_(node, objectStack) {
  return olXml.pushParseAndPop({}, EXTENSION_PARSERS_, node, objectStack);
}

/**
 * @private
 * @hidden
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object<string, string>} Object.
 */
function readSequence_(node, objectStack) {
  return olXml.pushParseAndPop({}, SEQUENCE_PARSERS_, node, objectStack);
}

export default WFSDescribeFeatureType;
