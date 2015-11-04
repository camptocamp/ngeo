<%doc>
    This is a Mako template that generates Angular code putting the contents of
    HTML partials into Angular's $templateCache. The generated code is then built
    with the rest of JavaScript code. The generated script is not used at all in
    development mode, where HTML partials are loaded through Ajax.
</%doc>
<%
  import re
  import os
  import htmlmin
  _partials = {}
  basedirparts = basedir.split('/')
  for p in partials.split(' '):
      parts = basedirparts + [p]
      f = file(os.path.join(*parts))
      content = unicode(f.read().decode('utf8'))
      content = re.sub(r"'", "\\'", content)
      content = htmlmin.minify(content, remove_comments=True)
      _partials[p] = content
%>\
/**
 * @fileoverview ngeo template cache.
 *
 * GENERATED FILE. DO NOT EDIT.
 */

goog.require('ngeo');

(function() {
  /**
   * @param {angular.$cacheFactory.Cache} $templateCache
   * @ngInject
   */
  var runner = function($templateCache) {
  % for partial in _partials:
    $templateCache.put('${partial}', '${_partials[partial]}');
  %endfor
  };

  ngeoModule.run(runner);
})();
