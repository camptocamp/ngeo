'use strict';

var jsdocType = require("jsdoc/tag/type")

exports.defineTags = function(dictionary) {

  dictionary.defineTag('ngname', {
    onTagged : function(doclet, tag) {
      doclet.ngname = tag.value;
    }
  });

  dictionary.defineTag('htmlAttribute', {
    onTagged : function(doclet, tag) {
      if (!doclet.htmlAttributes) {
          doclet.htmlAttributes = [];
      }
      var type = jsdocType.parse(tag.value, true, true)
      doclet.htmlAttributes.push({
          'name': type.name,
          'type': {
              'names': type.type,
          },
          'description': type.text,
          'optional': type.optional,
          'nullable': type.nullable,
          'variable': type.variable
      });
    }
  });

};
