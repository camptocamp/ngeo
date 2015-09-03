<%doc>
    This is a Mako template that generates Angular code putting the contents of
    HTML partials into Angular's $templateCache. The generated code is then built
    with the rest of JavaScript code. The generated script is not used at all in
    development mode, where HTML partials are loaded through Ajax.
</%doc>
<%
  import re
  import os
  fspaths = fs_paths.split()
  urlpaths = url_paths.split()
  if len(fspaths) != len(urlpaths):
    raise Exception('fs_paths and url_paths lengths do not match')
  _partials = {}
  for fspath, urlpath in zip(fspaths, urlpaths):
      if urlpath in _partials:
          raise Exception('Duplicate keys (%s)' % urlpath)
      f = file(fspath)
      content = unicode(f.read().decode('utf8'))
      content = re.sub(r'>\s*<' , '><', content)
      content = re.sub(r'\s\s+', ' ', content)
      content = re.sub(r'\n', '', content)
      content = re.sub(r"'", "\\'", content)
      _partials[urlpath] = content
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
