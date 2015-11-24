exports.defineTags = function(dictionary) {
  dictionary.defineTag('ngname', {
    onTagged : function(doclet, tag) {
      doclet.ngname = tag.value;
    }
  });
};
