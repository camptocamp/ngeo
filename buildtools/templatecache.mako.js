## -*- coding: utf-8 -*-
<%doc>
    This is a Mako template that generates Angular code putting the contents of
    HTML partials into Angular's $templateCache. The generated code is then built
    with the rest of JavaScript code. The generated script is not used at all in
    development mode, where HTML partials are loaded through Ajax.
</%doc>
<%
  import re
  import os
  import glob
  import htmlmin
  _partials = {}
  for p in partials.strip().split():
      dest_folder, source_folder = p.split(":")
      filenames = []
      filenames += glob.glob("{}/*.html".format(source_folder))
      filenames += glob.glob("{}/**/*.html".format(source_folder))
      for filename in filenames:
          f = file(filename)
          content = unicode(f.read().decode('utf8'))
          content = re.sub(r"'", "\\'", content)
          content = htmlmin.minify(content, remove_comments=True)
          name = os.path.join(dest_folder, filename[len(source_folder) + 1:])
          _partials[name.replace("\\", "/")] = content
%>\
/**
 * ngeo template cache.
 *
 * GENERATED FILE. DO NOT EDIT.
 */

goog.require('${app}');

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

  ${app}.module.run(runner);
})();
