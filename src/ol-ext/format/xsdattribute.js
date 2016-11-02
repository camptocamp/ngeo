goog.provide('ngeo.format.XSDAttribute');

goog.require('ol.format.XML');


/**
 * @classdesc
 * Reads attributes that are defined in XSD format and return them as a list.
 *
 * @constructor
 * @struct
 * @extends {ol.format.XML}
 * @export
 */
ngeo.format.XSDAttribute = function() {
  ol.format.XML.call(this);
};
ol.inherits(ngeo.format.XSDAttribute, ol.format.XML);


/**
 * @param {Document|Node|string} source Source.
 * @return {Array.<ngeox.Attribute>} The parsed result.
 */
ngeo.format.XSDAttribute.prototype.read = function(source) {
  return /** @type {Array.<ngeox.Attribute>} */ (
    ol.format.XML.prototype.read.call(this, source)
  );
};


/**
 * @param {Document} doc Document.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 */
ngeo.format.XSDAttribute.prototype.readFromDocument = function(doc) {
  goog.asserts.assert(doc.nodeType == goog.dom.NodeType.DOCUMENT,
      'doc.nodeType should be DOCUMENT');
  for (var n = doc.firstChild; n; n = n.nextSibling) {
    if (n.nodeType == goog.dom.NodeType.ELEMENT) {
      return this.readFromNode(n);
    }
  }
  return null;
};


/**
 * @param {Node} node Node.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 */
ngeo.format.XSDAttribute.prototype.readFromNode = function(node) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
      'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'schema',
      'localName should be schema');

  var elements = node.getElementsByTagName('element');
  if (!elements.length) {
    elements = node.getElementsByTagName('xsd:element');
  }
  var attributes = [];

  var attribute;
  for (var i = 0, ii = elements.length; i < ii; i++) {
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

  var name = node.getAttribute('name');
  goog.asserts.assert(name, 'name should be defined in element node.');

  var nillable = node.getAttribute('nillable');
  var required = !(nillable === true || nillable === 'true');

  var attribute = {
    name: name,
    required: required
  };

  var type = node.getAttribute('type');
  if (type) {
    var geomRegex =
      /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
    if (geomRegex.exec(type)) {
      attribute.type = ngeo.format.XSDAttributeType.GEOMETRY;
      if (/^gml:Point/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.POINT;
      } else if (/^gml:LineString/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.LINE_STRING;
      } else if (/^gml:Polygon/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.POLYGON;
      } else if (/^gml:MultiPoint/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.MULTI_POINT;
      } else if (/^gml:MultiLineString/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.MULTI_LINE_STRING;
      } else if (/^gml:MultiPolygon/.exec(type)) {
        attribute.geomType = ol.geom.GeometryType.MULTI_POLYGON;
      }
    } else if (type === 'xsd:string') {
      attribute.type = ngeo.format.XSDAttributeType.TEXT;
    } else if (type === 'xsd:date') {
      attribute.type = ngeo.format.XSDAttributeType.DATE;
    } else if (type === 'xsd:dateTime') {
      attribute.type = ngeo.format.XSDAttributeType.DATETIME;
    } else {
      return null;
    }
  } else {
    var enumerations = node.getElementsByTagName('enumeration');
    if (!enumerations.length) {
      enumerations = node.getElementsByTagName('xsd:enumeration');
    }
    if (enumerations.length) {
      attribute.type = ngeo.format.XSDAttributeType.SELECT;
      var choices = [];
      for (var i = 0, ii = enumerations.length; i < ii; i++) {
        choices.push(enumerations[i].getAttribute('value'));
      }
      attribute.choices = choices;
    } else {
      return null;
    }
  }

  goog.asserts.assert(attribute.type);

  return attribute;
};


/**
 * Returns the first geometry attribute among a given list of attributes.
 * @param {Array.<ngeox.Attribute>} attributes The list of attributes.
 * @return {?ngeox.Attribute} A geometry attribute object.
 * @export
 */
ngeo.format.XSDAttribute.getGeometryAttribute = function(attributes) {
  var geomAttribute = null;
  for (var i = 0, ii = attributes.length; i < ii; i++) {
    if (attributes[i].type === ngeo.format.XSDAttributeType.GEOMETRY) {
      geomAttribute = attributes[i];
      break;
    }
  }
  return geomAttribute;
};


/**
 * @enum {string}
 */
ngeo.format.XSDAttributeType = {
  /**
   * @type {string}
   */
  DATE: 'date',
  /**
   * @type {string}
   */
  DATETIME: 'datetime',
  /**
   * @type {string}
   */
  GEOMETRY: 'geometry',
  /**
   * @type {string}
   */
  SELECT: 'select' ,
  /**
   * @type {string}
   */
  TEXT: 'text'
};
